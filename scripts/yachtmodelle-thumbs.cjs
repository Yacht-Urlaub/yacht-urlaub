#!/usr/bin/env node
//
// Erzeugt die lokalen Vorschaubilder fuer /yachtmodelle aus dem Hauptvideo je Modell
// (public/images/yachtmodelle/<id>.jpg = 1280 px breit, <id>-card.jpg = 640x400).
//
// Warum lokal: Die Seite darf vor dem Klick auf ein Video keine Verbindung zu YouTube
// aufbauen (DSGVO, siehe docs/yachtmodelle.md). Deshalb werden die Vorschaubilder der
// OFFIZIELLEN Hersteller-Videos einmalig geholt und mit ausgeliefert.
//
// Aufruf (braucht Netzzugriff auf i.ytimg.com, curl und ImageMagick `convert`):
//
//   node scripts/yachtmodelle-thumbs.cjs            # nur fehlende Bilder
//   node scripts/yachtmodelle-thumbs.cjs --force    # alle neu
//
// Modelle mit eigenem Foto (images[0]) nehmen dieses statt des Video-Vorschaubilds.
// Danach in src/data/yachtModels.json `poster`/`card` eintragen (der Pfad steht schon dort,
// wenn die Datei dem Muster folgt) und den Snapshot-Ablauf aus CLAUDE.md laufen lassen.

const { execFileSync } = require('node:child_process')
const { existsSync, readFileSync, statSync, writeFileSync, mkdtempSync } = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public/images/yachtmodelle')
const models = JSON.parse(readFileSync(path.join(ROOT, 'src/data/yachtModels.json'), 'utf-8'))
// Hanse hat nach Angabe des Betreibers keine Rechte an den eigenen Bildern: von diesen Werften werden
// keine Fremdbilder uebernommen (nur eigene Fotos).
const NO_THIRD_PARTY_IMAGES = new Set(['Hanse'])
const force = process.argv.includes('--force')
const tmp = mkdtempSync(path.join(os.tmpdir(), 'ym-thumbs-'))

function download(videoId) {
  for (const name of ['maxresdefault', 'sddefault', 'hqdefault']) {
    const file = path.join(tmp, `${videoId}-${name}.jpg`)
    try {
      execFileSync('curl', ['-sSf', '-m', '25', '-o', file, `https://i.ytimg.com/vi/${videoId}/${name}.jpg`], { stdio: 'ignore' })
      if (statSync(file).size > 6000) return file
    } catch { /* naechste Groesse probieren */ }
  }
  return null
}

let made = 0
for (const m of models) {
  const poster = path.join(OUT, `${m.id}.jpg`)
  const card = path.join(OUT, `${m.id}-card.jpg`)
  if (!force && existsSync(poster) && existsSync(card)) continue
  if (NO_THIRD_PARTY_IMAGES.has(m.brand) && !(m.images && m.images[0])) continue
  let src = null
  if (m.images && m.images[0]) src = path.join(ROOT, 'public', m.images[0].src)
  else if (m.videos && m.videos[0]) src = download(m.videos[0].id)
  if (!src) { console.warn(`kein Bild fuer ${m.id}`); continue }
  execFileSync('convert', [src, '-resize', '1280x>', '-strip', '-interlace', 'Plane', '-quality', '78', poster])
  execFileSync('convert', [src, '-resize', '640x400^', '-gravity', 'center', '-extent', '640x400', '-strip', '-interlace', 'Plane', '-quality', '74', card])
  made++
}
console.log(`${made} Modelle neu erzeugt.`)
