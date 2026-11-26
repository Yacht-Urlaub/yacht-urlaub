#!/usr/bin/env node
//
// Erzeugt die lokalen Modellbilder fuer /yachtmodelle aus Fotos der Werft-Websites
// (public/images/yachtmodelle/<id>.jpg = 1280x720, <id>-card.jpg = 640x400).
//
// Quellen stehen in scripts/yachtmodelle-photos.json (Modell-ID -> Foto-URL auf der
// Werft-Seite). Es wird bewusst ein Aussenfoto/Segelfoto gewaehlt, kein Video-Vorschaubild.
//
// Warum lokal: Die Seite darf vor dem Klick auf ein Video keine Verbindung zu Dritten
// aufbauen (DSGVO, siehe docs/yachtmodelle.md); die Bilder werden deshalb einmalig geholt
// und mit ausgeliefert.
//
// Hanse hat nach Angabe des Betreibers keine Rechte an den eigenen Bildern: fuer Hanse
// (und Modelle ohne Eintrag in der JSON) gibt es kein Bild, die Seite zeigt die Illustration.
//
// Aufruf (braucht Netzzugriff auf die Werft-Hosts, curl und ImageMagick `convert`):
//
//   node scripts/yachtmodelle-photos.cjs            # nur fehlende Bilder
//   node scripts/yachtmodelle-photos.cjs --force    # alle neu
//
// Danach in src/data/yachtModels.json `poster`/`card` eintragen (Muster
// /images/yachtmodelle/<id>.jpg bzw. <id>-card.jpg) und den Snapshot-Ablauf aus CLAUDE.md laufen lassen.

const { execFileSync } = require('node:child_process')
const { existsSync, readFileSync, mkdtempSync } = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'public/images/yachtmodelle')
const photos = JSON.parse(readFileSync(path.join(__dirname, 'yachtmodelle-photos.json'), 'utf-8'))
const models = JSON.parse(readFileSync(path.join(ROOT, 'src/data/yachtModels.json'), 'utf-8'))
const force = process.argv.includes('--force')
const tmp = mkdtempSync(path.join(os.tmpdir(), 'ym-photos-'))

for (const m of models) {
  const url = photos[m.id]
  if (!url || m.brand === 'Hanse') continue
  const poster = path.join(OUT, `${m.id}.jpg`)
  const card = path.join(OUT, `${m.id}-card.jpg`)
  if (!force && existsSync(poster) && existsSync(card)) continue
  const src = path.join(tmp, `${m.id}.img`)
  try {
    execFileSync('curl', ['-sSf', '-m', '40', '-A', 'Mozilla/5.0', '-o', src, url], { stdio: 'ignore' })
  } catch {
    console.warn(`! ${m.id}: Download fehlgeschlagen (${url})`)
    continue
  }
  const conv = (size, out, q) => execFileSync('convert', [`${src}[0]`, '-auto-orient', '-resize', `${size}^`, '-gravity', 'center',
    '-extent', size, '-strip', '-interlace', 'Plane', '-quality', String(q), out])
  conv('1280x720', poster, 80)
  conv('640x400', card, 78)
  console.log(`+ ${m.id}`)
}
