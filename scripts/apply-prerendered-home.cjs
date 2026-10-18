#!/usr/bin/env node
//
// Letzter Schritt von `npm run build`: setzt die vorab gerenderten
// Startseiten-Snapshots (prerendered/home-de.html, -en.html) an ihren
// Platz im dist/-Ordner. Laeuft bei jedem Deploy mit, braucht aber keine
// neuen Abhaengigkeiten und keinen Browser — nur ein Datei-Kopiervorgang,
// also kein zusaetzliches Risiko fuer den Netlify-Build.
//
// Die Snapshots selbst entstehen separat, lokal, per
// scripts/prerender.cjs (siehe Kommentar dort) und werden eingecheckt.
//
// public/index.html ginge hier nicht: das wuerde mit der index.html
// kollidieren, die Vite selbst aus dem Projekt-Root generiert.
//
// Sicherheitscheck: der Snapshot traegt den <script src="/assets/index-
// HASH.js">-Verweis vom Build, gegen den er mit scripts/prerender.cjs
// erzeugt wurde. Aendert sich seither der Quellcode, baut Vite beim
// naechsten `npm run build` einen neuen Hash und loescht die alte Datei —
// der eingefrorene Snapshot zeigt dann ins Leere und wuerde JEDEN
// Besucher der Startseite mit einer kaputten Seite empfangen. Deshalb hier
// vorher pruefen, ob die referenzierte Datei tatsaechlich existiert, und
// im Zweifel GAR NICHTS einspielen (dist/index.html bleibt dann Vites
// eigene, funktionierende, nur nicht vorab gerenderte Startseite) statt
// einen kaputten Build auszuliefern. Nach so einer Warnung:
// scripts/prerender.cjs neu laufen lassen und den Snapshot neu committen.

const { existsSync, copyFileSync, mkdirSync, readFileSync } = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const PRERENDERED = path.join(ROOT, 'prerendered')
const DIST = path.join(ROOT, 'dist')

const jobs = [
  { src: 'home-de.html', dest: 'index.html' },
  { src: 'home-en.html', dest: path.join('__en', 'index.html') },
]

function referencedAssetsExist(html) {
  const refs = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map(m => m[1])
  return refs.every(ref => existsSync(path.join(DIST, ref)))
}

for (const { src, dest } of jobs) {
  const srcPath = path.join(PRERENDERED, src)
  const destPath = path.join(DIST, dest)
  if (!existsSync(srcPath)) {
    console.warn(`apply-prerendered-home: ${src} fehlt, ueberspringe (noch nicht generiert?)`)
    continue
  }
  const html = readFileSync(srcPath, 'utf-8')
  if (!referencedAssetsExist(html)) {
    console.warn(`apply-prerendered-home: ${src} verweist auf Assets, die im aktuellen Build nicht mehr existieren (Quellcode seither geaendert?) — ueberspringe. Bitte scripts/prerender.cjs neu laufen lassen und den Snapshot neu committen.`)
    continue
  }
  mkdirSync(path.dirname(destPath), { recursive: true })
  copyFileSync(srcPath, destPath)
  console.log(`apply-prerendered-home: ${src} -> dist/${dest}`)
}
