#!/usr/bin/env node
//
// Erzeugt statische HTML-Snapshots pro Seite fuer Crawler, die kein
// JavaScript ausfuehren — WhatsApp, Telegram, iMessage, Slack, LinkedIn,
// aber auch die meisten KI-Crawler (GPTBot, CCBot, ClaudeBot, ...).
// Ohne das liefert Netlify fuer jede URL denselben generischen SPA-
// Fallback (index.html) aus; Title/Description/Bild der jeweiligen Seite
// werden erst nach dem React-Mount im Browser gesetzt, also nie von
// nicht-JS-Crawlern gesehen.
//
// Ablauf: dist/ (fertiger Vite-Build) lokal statisch ausliefern, jede
// Route per Headless-Chromium einmal laden, das fertig gerenderte HTML
// einsammeln und nach public/<pfad>/index.html schreiben. Vite kopiert
// alles aus public/ beim naechsten Build unveraendert nach dist/ —
// dafuer ist kein zusaetzlicher Schritt im Netlify-Build noetig, und
// Playwright muss dort nie installiert werden.
//
// Die Startseite bleibt aussen vor: public/index.html wuerde mit Vites
// eigener, aus index.html generierter dist/index.html kollidieren.
// /faq und /yoga existieren unter demselben Pfad auf beiden Domains –
// die englische Fassung landet deshalb unter public/__en/... und wird
// in netlify.toml per host-gebundenem Rewrite ausgeliefert.
//
// Ausfuehren, wann immer sich Inhalt oder SEO-Text einer Seite aendert
// (nach `npm run build`, braucht ein fertiges dist/):
//
//   GLOBAL_NM=$(npm root -g) NODE_PATH="$GLOBAL_NM" node scripts/prerender.cjs
//
// (Playwright ist absichtlich kein devDependency — ein `npm install`
// im Netlify-Build soll nicht jedes Mal einen Chromium-Download machen.
// Lokal/im Sandbox ist das Paket global verfuegbar. .cjs statt .mjs,
// weil ESM-`import` NODE_PATH ignoriert — nur CommonJS `require` findet
// das global installierte Paket darueber.)

const { chromium } = require('playwright')
const { createServer } = require('node:http')
const { readFile, writeFile, mkdir, stat } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const PORT = 48173
const CHROMIUM_PATH = '/opt/pw-browsers/chromium'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
}

// Reihenfolge wie bei jedem echten Static-Host: exakte Datei, dann
// <pfad>/index.html (Verzeichnis-Aufruf), erst dann der SPA-Fallback auf
// die Root-index.html. Ohne den mittleren Schritt wuerde JEDE Unterseite
// hier beim Rendern faelschlich die Root-Seite bekommen, sobald dort schon
// ein vorab eingefrorener Snapshot liegt (siehe apply-prerendered-home.cjs)
// statt der von Vite frisch gebauten, bootfaehigen App-Huelle.
async function resolveFile(urlPath) {
  const direct = path.join(DIST, urlPath)
  if (existsSync(direct) && (await stat(direct)).isFile()) return direct
  const asIndex = path.join(DIST, urlPath, 'index.html')
  if (existsSync(asIndex) && (await stat(asIndex)).isFile()) return asIndex
  return path.join(DIST, 'index.html')
}

async function serveStatic() {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url ?? '/').split('?')[0])
      const filePath = await resolveFile(urlPath)
      const ext = path.extname(filePath)
      const data = await readFile(filePath)
      res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
      res.end(data)
    } catch {
      res.writeHead(404)
      res.end('Not found')
    }
  })
  await new Promise(resolve => server.listen(PORT, resolve))
  return server
}

function parseSitemap(xml, baseUrl) {
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(m => m[1].replace(baseUrl, ''))
    .map(p => (p === '' ? '/' : p))
}

// Pfade, die es auf beiden Domains identisch gibt — dort braucht die
// englische Fassung einen eigenen Namespace, siehe Kopfkommentar.
const COLLIDES_WITH_DE = new Set(['/', '/faq', '/yoga'])

async function main() {
  if (!existsSync(DIST)) {
    console.error('dist/ fehlt — zuerst `npm run build` ausfuehren.')
    process.exit(1)
  }

  const [deXml, enXml] = await Promise.all([
    readFile(path.join(ROOT, 'public/sitemap.xml'), 'utf-8'),
    readFile(path.join(ROOT, 'public/sitemap-en.xml'), 'utf-8'),
  ])
  const dePaths = parseSitemap(deXml, 'https://www.yacht-urlaub.net')
  const enPaths = parseSitemap(enXml, 'https://www.yacht-holiday.net')

  const server = await serveStatic()
  const browser = await chromium.launch({
    executablePath: existsSync(CHROMIUM_PATH) ? CHROMIUM_PATH : undefined,
  })

  let written = 0
  async function snapshot(host, urlPath, outPath) {
    const page = await browser.newPage()
    await page.goto(`http://${host}:${PORT}${urlPath}`, { waitUntil: 'load', timeout: 20000 })
    await page.waitForTimeout(700)
    const html = await page.evaluate(() => '<!doctype html>\n' + document.documentElement.outerHTML)
    await page.close()
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, html, 'utf-8')
    written++
  }

  for (const p of dePaths) {
    if (p === '/') {
      // dist/index.html wird von Vite selbst erzeugt — public/index.html
      // wuerde damit kollidieren. Landet stattdessen in prerendered/ und
      // wird von scripts/apply-prerendered-home.cjs nach dist/ kopiert.
      await snapshot('localhost', p, path.join(ROOT, 'prerendered/home-de.html'))
      console.log('DE', p, '(-> prerendered/, siehe apply-prerendered-home.cjs)')
      continue
    }
    await snapshot('localhost', p, path.join(ROOT, 'public', p, 'index.html'))
    console.log('DE', p)
  }

  for (const p of enPaths) {
    if (p === '/') {
      await snapshot('en.localhost', p, path.join(ROOT, 'prerendered/home-en.html'))
      console.log('EN', p, '(-> prerendered/, siehe apply-prerendered-home.cjs)')
      continue
    }
    const useNamespace = COLLIDES_WITH_DE.has(p)
    const outDir = useNamespace ? path.join(ROOT, 'public/__en', p) : path.join(ROOT, 'public', p)
    await snapshot('en.localhost', p, path.join(outDir, 'index.html'))
    console.log('EN', p, useNamespace ? '(-> __en, siehe netlify.toml)' : '')
  }

  await browser.close()
  server.close()
  console.log(`\n${written} Snapshots geschrieben.`)
}

main()
