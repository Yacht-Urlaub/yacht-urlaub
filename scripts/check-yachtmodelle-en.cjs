#!/usr/bin/env node
//
// Prueft die englische Fassung der Yachtmodelle (siehe src/pages/yachtmodelle/lang.ts):
//  - jeder uebersetzbare deutsche Text in src/data/yachtModels.json hat einen Eintrag in
//    src/data/yachtModels.en.json (Woerterbuch "deutscher Satz -> englischer Satz"), oder ist eine
//    reine Zahl mit Einheit, die lang.ts selbst umrechnet ("11,4 m", "1.120 l", "2 x 45 PS")
//  - kein Eintrag ist leer oder enthaelt deutsche Sonderzeichen (ae/oe/ue/ss-Zeichen)
//  - Eintraege, die kein Modell mehr verwendet, werden als veraltet gemeldet
//
// Aufruf:  node scripts/check-yachtmodelle-en.cjs      (Exit-Code 1 bei fehlenden Uebersetzungen)
// Laeuft nach jeder Aenderung an yachtModels.json (neues Modell, geaenderter Text), siehe docs/yachtmodelle.md.

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const models = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/yachtModels.json'), 'utf-8'))
const dict = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/yachtModels.en.json'), 'utf-8'))

const used = new Set()
const add = s => { if (s) used.add(s) }
for (const m of models) {
  for (const k of ['year', 'tagline', 'reviereText']) add(m[k])
  for (const k of ['badges', 'glance', 'plus', 'minus', 'fitYes', 'fitNo', 'reviere', 'extras']) (m[k] || []).forEach(add)
  for (const k of ['key', 'facts', 'tech', 'faq']) (m[k] || []).forEach(p => { add(p[0]); add(p[1]) })
  ;(m.life || []).forEach(p => { add(p[0]); add(p[1]) })
  ;(m.layouts || []).forEach(l => ['v', 'bath', 'fit', 'note', 'cab'].forEach(k => add(l[k])))
  ;[...(m.videos || []), ...(m.tours || [])].forEach(v => { add(v.title); add(v.by) })
  ;(m.plans || []).forEach(p => add(p.caption))
  ;(m.images || []).forEach(i => add(i.alt))
}

// Reine Zahl mit Einheit: lang.ts (numEn) rechnet sie um, kein Woerterbucheintrag noetig
const mech = /^[\d\s,.\-–/×x+()²]*(m|m²|l|kg|t|PS|kW|hp|ft|kn)?[\d\s,.\-–/×x+()²]*(m|m²|l|kg|t|PS|kW|hp|ft)?$/

const missing = [...used].filter(s => !mech.test(s) && !(s in dict))
const stale = Object.keys(dict).filter(s => !used.has(s))
const bad = Object.entries(dict).filter(([, en]) => !en.trim() || /[äöüÄÖÜß]/.test(en))

console.log(`${used.size} Texte, ${Object.keys(dict).length} Woerterbucheintraege`)
if (missing.length) { console.log(`\nFEHLT (${missing.length}):`); missing.forEach(s => console.log('  ' + s)) }
if (bad.length) { console.log(`\nLEER ODER MIT UMLAUT (${bad.length}):`); bad.forEach(([de, en]) => console.log(`  ${de}\n    -> ${en}`)) }
if (stale.length) { console.log(`\nVERALTET, wird nicht mehr verwendet (${stale.length}):`); stale.forEach(s => console.log('  ' + s)) }
if (!missing.length && !bad.length) console.log('OK: alle Texte uebersetzt.')
process.exit(missing.length || bad.length ? 1 : 0)
