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
  plans?: { img: string; caption: string }[]
  fitYes: string[]
  fitNo: string[]
  faq: [string, string][]
  tech: [string, string][]
  images: { src: string; alt: string }[]
  /** Vorschaubild (1280 px) und Kartenbild (640 px), Werft-Foto; liegen lokal unter public/images/yachtmodelle/ */
  poster?: string
  card?: string
  reviere: string[]
  reviereText?: string
  extras: string[]
}

export const MODELS: Model[] = raw as unknown as Model[]

export const BASE_PATH = '/yachtmodelle'

export const BRANDS: Record<string, string> = {
  Lagoon: 'Der Weltmarktführer bei Fahrtenkatamaranen – in fast jedem Charterrevier zu Hause.',
  Bali: 'Katamarane mit „Open Space“: große Tür zum Cockpit und festes Vordeck statt Netzen.',
  Jeanneau: 'Sun-Odyssey-Fahrtenyachten mit sicheren Laufdecks und die Luxuslinie Jeanneau Yachts.',
  Beneteau: 'Oceanis und First – die bekanntesten Fahrten- und Sportyachten aus Frankreich.',
  Bavaria: 'Deutsche Segelyachten mit viel Raum und großen Betten.',
  Hanse: 'Easy Sailing aus Greifswald: große Cockpits, alle Leinen zum Steuerstand.',
  Dufour: 'Französische Fahrtenyachten nach der Idee „Instinctive Sailing“: sportlich zu segeln und viel Leben im Freien.',
}

export const EQUIP: Record<Model['typ'], Record<string, string[]>> = {
  Katamaran: {
    Wohlfühlen: ['Bettwäsche und Handtücher (je nach Flotte)', 'Warmwasser', 'Kühlschrank und Gefrierfach', 'Bimini als Sonnenschutz', 'Cockpittisch für die ganze Crew'],
    'Spaß am Wasser': ['Badeplattform und Badeleiter', 'Beiboot mit Außenborder', 'Sonnenpolster'],
  },
  Segelyacht: {
    Wohlfühlen: ['Bettwäsche und Handtücher (je nach Flotte)', 'Warmwasser', 'Kühlschrank', 'Sprayhood und Bimini', 'Cockpittisch'],
    'Spaß am Wasser': ['Badeplattform und Badeleiter', 'Beiboot mit Außenborder'],
  },
}

export const EXTRAS = ['Klimaanlage', 'Generator', 'Wassermacher', 'SUP-Board', 'Schnorchelausrüstung', 'Skipper', 'Hostess oder Koch']

export const plural = (t: Model['typ']) => (t === 'Katamaran' ? 'Katamarane' : 'Segelyachten')

export const modelPath = (id: string) => `${BASE_PATH}/${id}`

/** Wert einer Kennzahl ("Kabinen", "Länge" ...) aus model.key */
export const keyValue = (m: Model, labels: string[]) => {
  for (const l of labels) {
    const k = m.key.find(y => y[1] === l)
    if (k) return k[0]
  }
  return '–'
}

/** Meta-Description: "<Name>: <Tagline>", sonst nur die Tagline. Maximal ~150 Zeichen,
 *  damit Suchergebnisse und Link-Vorschauen den Satz nicht mitten drin abschneiden. */
export function modelDescription(m: Model): string {
  const full = `${m.name}: ${m.tagline}`
  return full.length <= 150 ? full : m.tagline
}

export function modelTitle(m: Model): string {
  return `${m.name} – ${m.typ} chartern`
}

/** Vergleichbare Modelle gleichen Typs, nach Laenge nahe an m */
export function similarModels(m: Model): Model[] {
  return MODELS.filter(x => x.typ === m.typ)
    .sort((a, b) => Math.abs(a.len - m.len) - Math.abs(b.len - m.len))
    .slice(0, 4)
    .sort((a, b) => a.len - b.len)
}

export function faqsFor(m: Model): [string, string][] {
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
