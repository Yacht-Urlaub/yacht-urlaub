#!/usr/bin/env node
//
// Pflegt <lastmod> in public/sitemap.xml und public/sitemap-en.xml.
//
// Warum: Suchmaschinen und KI-Crawler (u. a. OAI-SearchBot von ChatGPT Search,
// Googlebot, Bingbot) nutzen <lastmod>, um zu entscheiden, welche Seiten sie
// neu abrufen. Ein lastmod ist aber nur dann hilfreich, wenn es stimmt: ein
// bei jedem Deploy aktualisiertes Datum (oder das Git-Datum, das sich bei
// jeder Regenerierung aller Snapshots fuer ALLE Seiten aendert) wird von
// Crawlern mit der Zeit ignoriert.
//
// Loesung: pro Seite wird ein Hash ueber den inhaltlich relevanten Teil des
// vorgerenderten Snapshots gebildet (Title, Meta, JSON-LD, sichtbarer
// Body-Inhalt; ohne Skript-/Stylesheet-Tags mit buildabhaengigen Hashes). Nur
// wenn sich dieser Hash gegenueber scripts/sitemap-lastmod.json aendert, wird
// das Datum auf heute gesetzt. Reine Build-Aenderungen (neue JS-Chunk-Hashes)
// lassen lastmod unberuehrt.
//
// Ablauf (nach dem Prerender, siehe CLAUDE.md):
//
//   node scripts/update-sitemap-lastmod.cjs
//
// Braucht die frisch erzeugten Snapshots in public/<pfad>/index.html bzw.
// prerendered/home-*.html. Das Manifest wird mit committet.

const { readFile, writeFile } = require('node:fs/promises')
const { existsSync } = require('node:fs')
const crypto = require('node:crypto')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const MANIFEST = path.join(__dirname, 'sitemap-lastmod.json')

const SITES = [
  { sitemap: 'public/sitemap.xml', base: 'https://www.yacht-urlaub.net', host: 'de' },
  { sitemap: 'public/sitemap-en.xml', base: 'https://www.yacht-holiday.net', host: 'en' },
]
// Pfade, die es auf beiden Domains gibt: die EN-Fassung liegt unter public/__en/
const COLLIDES = new Set(['/faq', '/yoga'])

function snapshotFile(host, urlPath) {
  if (urlPath === '/') return path.join(ROOT, 'prerendered', `home-${host}.html`)
  const dir = host === 'en' && COLLIDES.has(urlPath) ? path.join('public', '__en', urlPath) : path.join('public', urlPath)
  return path.join(ROOT, dir, 'index.html')
}

// Nur das behalten, was sich bei einer echten Inhaltsaenderung aendert.
function normalise(html) {
  return html
    .replace(/<script\b[^>]*\bsrc=[^>]*>\s*<\/script>/g, '') // gebundelte JS-Chunks (Hash im Dateinamen)
    .replace(/<link\b[^>]*>/g, m => (/rel="(canonical|alternate)"/.test(m) ? m : '')) // preload/stylesheet raus, canonical/hreflang bleiben
    .replace(/<style\b[\s\S]*?<\/style>/g, '')
    .replace(/\/assets\/[\w.-]*?-[A-Za-z0-9_-]{8}\.(js|css)/g, '/assets/x.$1')
    .replace(/\sdata-rh="true"/g, '')
    // Domain-Bestaetigung (Meta) steht auf jeder Seite, ist aber kein Seiteninhalt.
    .replace(/<meta name="facebook-domain-verification"[^>]*>/g, '')
    // Cookie-Banner (Titel + Text) steht in jedem Snapshot, ist aber Boilerplate:
    // eine Textaenderung dort soll nicht fuer alle Seiten ein neues lastmod setzen.
    .replace(/🍪[\s\S]*?<\/p><\/div>/g, '')
    // Inline-Styles enthalten Animationszwischenstaende (translateY(3.63px), opacity)
    // und sind nie inhaltlich -> pro Lauf zufaellig verschieden.
    .replace(/\sstyle="[^"]*"/g, '')
    // <input type="date" min="<heute>"> aendert sich taeglich, ohne dass sich Inhalt aendert.
    .replace(/\smin="\d{4}-\d{2}-\d{2}"/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

const sha = s => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16)
const today = () => new Date().toISOString().slice(0, 10)

async function main() {
  const manifest = existsSync(MANIFEST) ? JSON.parse(await readFile(MANIFEST, 'utf-8')) : {}
  const next = {}
  let changed = 0
  let added = 0

  for (const { sitemap, base, host } of SITES) {
    const file = path.join(ROOT, sitemap)
    const xml = await readFile(file, 'utf-8')
    const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
    let out = xml

    for (const loc of urls) {
      const urlPath = loc.replace(base, '') || '/'
      const snap = snapshotFile(host, urlPath)
      if (!existsSync(snap)) {
        console.error(`Snapshot fehlt fuer ${loc}: ${path.relative(ROOT, snap)} — zuerst prerender.cjs ausfuehren.`)
        process.exit(1)
      }
      const hash = sha(normalise(await readFile(snap, 'utf-8')))
      const prev = manifest[loc]
      let lastmod
      if (!prev) { lastmod = today(); added++ }
      else if (prev.hash !== hash) { lastmod = today(); changed++; console.log('geaendert:', loc) }
      else lastmod = prev.lastmod
      next[loc] = { hash, lastmod }

      // <url><loc>…</loc></url> bzw. mit bestehendem <lastmod> -> einheitlich ersetzen
      const re = new RegExp(`<url><loc>${loc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</loc>(?:<lastmod>[^<]*</lastmod>)?</url>`)
      out = out.replace(re, `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`)
    }
    await writeFile(file, out, 'utf-8')
  }

  const sorted = Object.fromEntries(Object.entries(next).sort(([a], [b]) => a.localeCompare(b)))
  await writeFile(MANIFEST, JSON.stringify(sorted, null, 2) + '\n', 'utf-8')
  console.log(`lastmod: ${added} neu, ${changed} geaendert, ${Object.keys(next).length - added - changed} unveraendert.`)
}

main()
