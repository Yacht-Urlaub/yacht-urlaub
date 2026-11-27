/**
 * Yachtmodelle: Daten und Texte, die mehrere Ansichten teilen.
 * Die Modelldaten selbst stehen in src/data/yachtModels.json (Vorlage: Artefakt
 * "Yachtmodelle"); Ablauf zum Aktualisieren: docs/yachtmodelle.md.
 */
import raw from '../../data/yachtModels.json'

export interface Model {
  id: string
  name: string
  brand: string
  typ: 'Katamaran' | 'Segelyacht'
  len: number
  year: string
  badges: string[]
  src: string
  tagline: string
  videos: { id: string; title: string; by: string }[]
  tours: { id: string; title: string; by: string }[]
  key: [string, string][]
  glance: string[]
  plus: string[]
  minus: string[]
  facts: [string, string][]
  life: [string, string, string][]
  layouts: { v: string; cab: string; bath: string; fit: string; note?: string }[]
  /** Grundrisse der Werft (lokal unter public/images/yachtmodelle/plans/), mit Beschriftung */
  plans?: { img: string; caption: string; w?: number; h?: number }[]
  fitYes: string[]
  fitNo: string[]
  faq: [string, string][]
  tech: [string, string][]
  images: { src: string; alt: string; w?: number; h?: number }[]
  /** Vorschaubild (1280 px) und Kartenbild (640 px), Werft-Foto; liegen lokal unter public/images/yachtmodelle/ */
  poster?: string
  card?: string
  reviere: string[]
  reviereText?: string
  extras: string[]
  /** true = Modell ist ausgeblendet (keine Seite, nicht in Übersicht/Sitemap/Schema). Daten und Übersetzung bleiben erhalten. */
  hidden?: boolean
}

/** Alle Modelle inkl. ausgeblendeter (nur fuer Pruefskripte/Daten; die Seiten nutzen MODELS). */
export const ALL_MODELS: Model[] = raw as unknown as Model[]

/** Sichtbare Modelle. Hanse ist seit 27.11.2026 ausgeblendet (`hidden: true` in yachtModels.json): Rechtsstreit
 *  zwischen der Hansewerft und ihren Fotografen, bis zur Klaerung nichts von Hanse zeigen. Wieder einblenden:
 *  `hidden` entfernen, Sitemaps und Snapshots ergaenzen (docs/yachtmodelle.md). */
export const MODELS: Model[] = ALL_MODELS.filter(m => !m.hidden)

// Pfade, Werften-/Ausstattungstexte und Oberflaechentexte je Sprache: siehe lang.ts

/** Wert einer Kennzahl aus model.key. Labels deutsch; bei einem englisch lokalisierten Modell
 *  (siehe lang.ts) werden die englischen Gegenstuecke mitgesucht. */
const KEY_EN: Record<string, string> = { Länge: 'Length', Kabinen: 'Cabins', Gäste: 'Guests', Kojen: 'Berths' }
export const keyValue = (m: Model, labels: string[]) => {
  for (const l of labels) {
    const k = m.key.find(y => y[1] === l || y[1] === KEY_EN[l])
    if (k) return k[0]
  }
  return '–'
}

/** Meta-Description, je Modell einzigartig: Suchbegriff ("<Name> chartern" / "Charter the <Name>"), Eckdaten und
 *  was die Seite bietet; danach - falls Platz ist - der erste Satz der Tagline. Ziel: 100-158 Zeichen,
 *  damit Suchergebnisse und Link-Vorschauen den Satz nicht abschneiden.
 *  Erwartet bei lang === 'en' ein englisch lokalisiertes Modell (lang.ts localizeModel). */
export function modelDescription(m: Model, lang: 'de' | 'en' = 'de'): string {
  const cab = keyValue(m, ['Kabinen'])
  const en = lang === 'en'
  const len = en ? String(m.len).replace(/\.(\d)$/, '.$10') : String(m.len).replace('.', ',').replace(/,(\d)$/, ',$10')
  const extras = en
    ? ['Floor plans', ...(m.videos.length ? ['video'] : []), ...(m.tours.length ? ['3D tour'] : [])]
    : ['Grundrisse', ...(m.videos.length ? ['Video'] : []), ...(m.tours.length ? ['3D-Rundgang'] : [])]
  const list = extras.length > 1 ? `${extras.slice(0, -1).join(', ')} & ${extras[extras.length - 1]}` : extras[0]
  const typ = en ? (m.typ === 'Katamaran' ? 'catamaran' : 'sailing yacht') : m.typ
  const base = en
    ? `Charter the ${m.name}: ${typ} by ${m.brand} with ${cab} cabins, ${len} m. ${list} – request an offer now.`
    : `${m.name} chartern: ${typ} von ${m.brand} mit ${cab} Kabinen, ${len} m. ${list} – jetzt Angebot anfragen.`
  const first = m.tagline.split(/(?<=[.!?])\s/)[0]
  const withTag = `${base} ${first}`
  return withTag.length <= 158 ? withTag : base
}

export function modelTitle(m: Model, lang: 'de' | 'en' = 'de'): string {
  if (lang === 'en') return `${m.name} – ${m.typ === 'Katamaran' ? 'catamaran' : 'sailing yacht'} charter`
  return `${m.name} – ${m.typ} chartern`
}

/** Vergleichbare Modelle gleichen Typs, nach Laenge nahe an m */
export function similarModels(m: Model, pool: Model[] = MODELS): Model[] {
  return pool.filter(x => x.typ === m.typ)
    .sort((a, b) => Math.abs(a.len - m.len) - Math.abs(b.len - m.len))
    .slice(0, 4)
    .sort((a, b) => a.len - b.len)
}

export function faqsFor(m: Model, lang: 'de' | 'en' = 'de'): [string, string][] {
  if (lang === 'en') {
    const base: [string, string][] = m.typ === 'Katamaran'
      ? [['Do you get seasick on a catamaran?', 'Much less often than on a monohull. A catamaran hardly heels and lies calmly at anchor.']]
      : [['Does the yacht heel when sailing?', 'Yes, that is part of the sailing feel. If you prefer it calmer, plan shorter legs in suitable wind – or choose a catamaran.']]
    return [
      ...m.faq,
      ...base,
      ['Can I charter with or without a skipper?', 'Both are possible. Without a skipper you need a valid boat licence and experience, and depending on the area a radio certificate too. With a skipper, your skipper takes care of navigation and manoeuvres – and you enjoy the week.'],
      [`What does a week on the ${m.name} cost?`, 'It depends on area, season and year of build. We send you an offer including all extra costs, so you know in advance what the week will cost.'],
    ]
  }
  const base: [string, string][] = m.typ === 'Katamaran'
    ? [['Wird man auf einem Katamaran seekrank?', 'Deutlich seltener als auf einer Segelyacht. Ein Katamaran legt sich kaum zur Seite und liegt vor Anker ruhig.']]
    : [['Legt sich die Yacht beim Segeln auf die Seite?', 'Ja, das gehört zum Segelgefühl dazu. Wer es ruhiger mag, plant kürzere Etappen bei passendem Wind – oder wählt einen Katamaran.']]
  return [
    ...m.faq,
    ...base,
    ['Kann ich mit oder ohne Skipper chartern?', 'Beides ist möglich. Ohne Skipper brauchen Sie einen gültigen Bootsführerschein und Erfahrung, je nach Revier auch ein Funkzeugnis. Mit Skipper übernimmt er Navigation und Manöver – und Sie genießen die Woche.'],
    [`Was kostet eine Woche auf der ${m.name}?`, 'Das hängt von Revier, Saison und Baujahr ab. Sie bekommen von uns ein Angebot mit allen Nebenkosten, damit Sie vorher wissen, was die Woche kostet.'],
  ]
}
