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

const { existsSync, copyFileSync, mkdirSync } = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const PRERENDERED = path.join(ROOT, 'prerendered')
const DIST = path.join(ROOT, 'dist')

const jobs = [
  { src: 'home-de.html', dest: 'index.html' },
  { src: 'home-en.html', dest: path.join('__en', 'index.html') },
]

for (const { src, dest } of jobs) {
  const srcPath = path.join(PRERENDERED, src)
  const destPath = path.join(DIST, dest)
  if (!existsSync(srcPath)) {
    console.warn(`apply-prerendered-home: ${src} fehlt, ueberspringe (noch nicht generiert?)`)
    continue
  }
  mkdirSync(path.dirname(destPath), { recursive: true })
  copyFileSync(srcPath, destPath)
  console.log(`apply-prerendered-home: ${src} -> dist/${dest}`)
}
