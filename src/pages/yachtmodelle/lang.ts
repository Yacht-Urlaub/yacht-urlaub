/**
 * Yachtmodelle: Zweisprachigkeit (Deutsch / Englisch).
 *
 * Die Modelldaten (src/data/yachtModels.json) liegen auf Deutsch vor und bleiben die einzige Quelle.
 * Die englischen Texte stehen in src/data/yachtModels.en.json als Woerterbuch "deutscher Satz -> englischer
 * Satz". localizeModel() uebersetzt damit ein Modell beim Rendern. Fehlt ein Satz im Woerterbuch, bleibt
 * er deutsch stehen - scripts/check-yachtmodelle-en.cjs findet solche Luecken (laeuft vor jedem Release,
 * siehe docs/yachtmodelle.md). Reine Zahlen mit Einheit ("11,4 m", "1.120 l", "2 × 45 PS") rechnet
 * trStr() selbst um (Dezimalpunkt, Tausenderkomma, PS -> hp).
 *
 * Logik (Filter, Vergleich, Typ-Unterscheidung) arbeitet weiter mit den deutschen Schluesseln
 * (typ === 'Katamaran'); angezeigt wird immer ein Label der Sprache (typLabel).
 */
import { use } from 'react'
import { BASE_DE, BASE_EN, stripEn, type Lang } from '../../i18n'
import { MODELS, type Model } from './data'

/** Das englische Woerterbuch (ca. 150 KB) wird nur auf der englischen Seite nachgeladen und
 *  ist deshalb kein Teil des Chunks, den deutsche Besucher laden. useEnglishTexts() haelt die
 *  Seite (Suspense in App.tsx) an, bis es da ist; Aufruf am Anfang jeder Seite. */
let DICT: Record<string, string> = {}
let dictLoaded = false
let dictPromise: Promise<void> | null = null
export function useEnglishTexts(lang: Lang): void {
  if (lang !== 'en' || dictLoaded) return
  dictPromise ??= import('../../data/yachtModels.en.json').then(m => {
    DICT = m.default as Record<string, string>
    dictLoaded = true
  })
  use(dictPromise)
}

/** Zahl mit Einheit ins Englische: 1.120 -> 1,120 | 11,4 -> 11.4 | PS -> hp */
function numEn(s: string): string {
  return s
    .replace(/\d[\d.,]*\d|\d/g, tok => (/^\d{1,3}(\.\d{3})+$/.test(tok) ? tok.replace(/\./g, ',') : tok.replace(/,/g, '.')))
    .replace(/\bPS\b/g, 'hp')
}

/** Deutscher Satz -> Satz in der Zielsprache. */
export function trStr(s: string, lang: Lang): string {
  if (lang === 'de' || !s) return s
  return DICT[s] ?? numEn(s)
}

const tr2 = (p: [string, string], lang: Lang): [string, string] => [trStr(p[0], lang), trStr(p[1], lang)]

export function localizeModel(m: Model, lang: Lang): Model {
  if (lang === 'de') return m
  const t = (s: string) => trStr(s, lang)
  return {
    ...m,
    year: t(m.year),
    badges: m.badges.map(t),
    tagline: t(m.tagline),
    videos: m.videos.map(v => ({ ...v, title: t(v.title), by: t(v.by) })),
    tours: m.tours.map(v => ({ ...v, title: t(v.title), by: t(v.by) })),
    key: m.key.map(p => tr2(p, lang)),
    glance: m.glance.map(t),
    plus: m.plus.map(t),
    minus: m.minus.map(t),
    facts: m.facts.map(p => tr2(p, lang)),
    life: m.life.map(([a, b, c]) => [t(a), t(b), c] as [string, string, string]),
    layouts: m.layouts.map(l => ({ ...l, v: t(l.v), cab: t(l.cab), bath: t(l.bath), fit: t(l.fit), note: l.note ? t(l.note) : l.note })),
    plans: m.plans?.map(p => ({ ...p, caption: t(p.caption) })),
    fitYes: m.fitYes.map(t),
    fitNo: m.fitNo.map(t),
    faq: m.faq.map(p => tr2(p, lang)),
    tech: m.tech.map(p => tr2(p, lang)),
    images: m.images.map(i => ({ ...i, alt: t(i.alt) })),
    reviere: m.reviere.map(t),
    reviereText: m.reviereText ? t(m.reviereText) : m.reviereText,
    extras: m.extras.map(t),
  }
}

const cache: Partial<Record<Lang, Model[]>> = {}
/** Alle Modelle in der Sprache (gleiche Reihenfolge wie MODELS, gleiche ids). */
export function modelsFor(lang: Lang): Model[] {
  if (lang === 'de') return MODELS
  return (cache[lang] ??= MODELS.map(m => localizeModel(m, lang)))
}

/** "A, B und C" / "A, B and C" aus den Werften, die sichtbare Modelle haben (Reihenfolge wie BRANDS_L) */
export function brandList(models: Model[], lang: Lang): string {
  const names = Object.keys(BRANDS_L[lang]).filter(b => models.some(m => m.brand === b))
  const and = lang === 'en' ? ' and ' : ' und '
  return names.length < 2 ? names.join('') : `${names.slice(0, -1).join(', ')}${and}${names[names.length - 1]}`
}

export const typLabel = (typ: Model['typ'], lang: Lang) =>
  lang === 'en' ? (typ === 'Katamaran' ? 'Catamaran' : 'Sailing yacht') : typ

export const typPlural = (typ: Model['typ'], lang: Lang) =>
  lang === 'en' ? (typ === 'Katamaran' ? 'Catamarans' : 'Sailing yachts') : (typ === 'Katamaran' ? 'Katamarane' : 'Segelyachten')

/** Interner Pfad der Uebersicht / eines Modells (englisch mit /en-Praefix, siehe i18n.ts) */
export const basePath = (lang: Lang) => (lang === 'en' ? '/en/yacht-models' : '/yachtmodelle')
export const pathFor = (id: string, lang: Lang) => `${basePath(lang)}/${id}`

/** Absolute Adresse (fuer Schema/Canonical-artige Angaben): richtige Domain je Sprache */
export const absUrl = (internalPath: string, lang: Lang) =>
  lang === 'en' ? `${BASE_EN}${stripEn(internalPath)}` : `${BASE_DE}${internalPath}`

export const BRANDS_L: Record<Lang, Record<string, string>> = {
  de: {
    Lagoon: 'Der Weltmarktführer bei Fahrtenkatamaranen – in fast jedem Charterrevier zu Hause.',
    Bali: 'Katamarane mit „Open Space“: große Tür zum Cockpit und festes Vordeck statt Netzen.',
    'Fountaine Pajot': 'Französische Fahrtenkatamarane aus der Nähe von La Rochelle – mit Doppelsteuerstand, offenen Salons und optionalem Hybridantrieb.',
    Jeanneau: 'Sun-Odyssey-Fahrtenyachten mit sicheren Laufdecks und die Luxuslinie Jeanneau Yachts.',
    Beneteau: 'Oceanis und First – die bekanntesten Fahrten- und Sportyachten aus Frankreich.',
    Bavaria: 'Deutsche Segelyachten mit viel Raum und großen Betten.',
    Hanse: 'Easy Sailing aus Greifswald: große Cockpits, alle Leinen zum Steuerstand.',
    Dufour: 'Französische Fahrtenyachten nach der Idee „Instinctive Sailing“: sportlich zu segeln und viel Leben im Freien.',
  },
  en: {
    Lagoon: 'The world market leader in cruising catamarans – at home in almost every charter area.',
    Bali: 'Catamarans with "Open Space": a big door to the cockpit and a solid foredeck instead of nets.',
    'Fountaine Pajot': 'French cruising catamarans from near La Rochelle – with a double helm station, open saloons and optional hybrid drive.',
    Jeanneau: 'Sun Odyssey cruising yachts with safe side decks, plus the luxury Jeanneau Yachts line.',
    Beneteau: 'Oceanis and First – the best-known cruising and sport yachts from France.',
    Bavaria: 'German sailing yachts with lots of space and big beds.',
    Hanse: 'Easy sailing from Greifswald: large cockpits, all lines led to the helm.',
    Dufour: 'French cruising yachts built on the idea of "Instinctive Sailing": sporty to sail with plenty of life outdoors.',
  },
}

export const EQUIP_L: Record<Lang, Record<Model['typ'], Record<string, string[]>>> = {
  de: {
    Katamaran: {
      Wohlfühlen: ['Bettwäsche und Handtücher (je nach Flotte)', 'Warmwasser', 'Kühlschrank und Gefrierfach', 'Bimini als Sonnenschutz', 'Cockpittisch für die ganze Crew'],
      'Spaß am Wasser': ['Badeplattform und Badeleiter', 'Beiboot mit Außenborder', 'Sonnenpolster'],
    },
    Segelyacht: {
      Wohlfühlen: ['Bettwäsche und Handtücher (je nach Flotte)', 'Warmwasser', 'Kühlschrank', 'Sprayhood und Bimini', 'Cockpittisch'],
      'Spaß am Wasser': ['Badeplattform und Badeleiter', 'Beiboot mit Außenborder'],
    },
  },
  en: {
    Katamaran: {
      Comfort: ['Bed linen and towels (depending on fleet)', 'Hot water', 'Fridge and freezer compartment', 'Bimini for sun protection', 'Cockpit table for the whole crew'],
      'Fun on the water': ['Swim platform and bathing ladder', 'Dinghy with outboard', 'Sun cushions'],
    },
    Segelyacht: {
      Comfort: ['Bed linen and towels (depending on fleet)', 'Hot water', 'Fridge', 'Sprayhood and bimini', 'Cockpit table'],
      'Fun on the water': ['Swim platform and bathing ladder', 'Dinghy with outboard'],
    },
  },
}

export const EXTRAS_L: Record<Lang, string[]> = {
  de: ['Klimaanlage', 'Generator', 'Wassermacher', 'SUP-Board', 'Schnorchelausrüstung', 'Skipper', 'Hostess oder Koch'],
  en: ['Air conditioning', 'Generator', 'Watermaker', 'SUP board', 'Snorkelling gear', 'Skipper', 'Hostess or cook'],
}

/** Oberflaechentexte der beiden Seiten */
export const UI = {
  de: {
    lang: 'de-DE', ytHl: 'de', site: 'Yacht-Urlaub',
    crumbRoot: 'Yachtmodelle',
    ovTitle: 'Yachtmodelle: Katamarane & Segelyachten zum Chartern',
    ovDesc: (n: number, brands: string) => `${n} Charteryachten: Katamarane und Segelyachten von ${brands} – mit Grundrissen, Videos und 3D-Rundgängen.`,
    ovH1: 'Yachtmodelle zum Chartern: finden Sie die Yacht, die zu Ihrer Crew passt',
    ovLead: (n: number, brands: string) => `${n} Katamarane und Segelyachten von ${brands} – mit Grundrissen, Kabinenversionen, Videos und 3D-Rundgängen. Sie sehen auf einen Blick, wie viele Kabinen und Bäder eine Yacht hat, wie sie sich segelt und für welche Crew sie passt.`,
    type: 'Typ', all: 'Alle', allYards: 'Alle Werften', yard: 'Werft',
    only3d: (n: number) => `Mit 3D-Rundgang (${n})`,
    search: 'Modell suchen',
    model: ['Modell', 'Modelle'], viewModel: 'Modell ansehen →', badge3d: '3D-Rundgang',
    empty: 'Kein Modell passt zu Ihrer Auswahl.', reset: 'Filter zurücksetzen',
    // Einbettungen
    illu: (n: string) => `${n}, Illustration`,
    picCard: (m: Model, len: string) => `${m.name} – ${m.typ} von ${m.brand}, ${len} m`,
    picPoster: (m: Model) => `${m.name} – ${m.typ} von ${m.brand} zum Chartern`,
    tourTitle: (t: string) => `3D-Rundgang: ${t}`, videoTitle: (t: string) => `Video: ${t}`,
    tourStart: '3D-Rundgang starten', tourStartAria: (t: string) => `3D-Rundgang starten: ${t}`, videoPlay: (t: string) => `Video abspielen: ${t}`,
    noteTour: 'Mit dem Klick laden Sie den 3D-Rundgang von Matterport. Dabei werden Daten an Matterport übertragen. ',
    noteVideo: 'Mit dem Klick laden Sie das Video von YouTube (Datenschutzmodus). Dabei werden Daten an YouTube übertragen. ',
    noteLink: 'Mehr in der Datenschutzerklärung',
    // Detail
    ctaAvail: 'Verfügbarkeit anfragen →', cta3d: '3D-Rundgang', ctaCabins: 'Kabinen ansehen',
    noVideo: (n: string) => `Ein Video zur ${n} folgt. Bis dahin zeigen wir Ihnen gerne Bilder und Grundrisse persönlich.`,
    subnavAria: 'Auf dieser Seite', sLife: 'Leben an Bord', sPlans: 'Grundrisse', s3d: '3D', sFaq: 'FAQ', sAll: 'Alle Modelle', sAsk: 'Anfragen',
    trust: ['Persönliche Beratung', '5 Sterne auf Google', 'Trusted Shops zertifiziert', 'Antwort innerhalb von 24 Stunden'],
    kickGlance: 'Auf einen Blick', h2Overview: (n: string) => `${n} chartern: der Überblick`,
    love: 'Das werden Sie lieben', know: 'Gut zu wissen', factsH: 'Steckbrief', pricePerWeek: 'Preis pro Woche', onRequest: 'auf Anfrage', askNow: 'Jetzt anfragen',
    kickPics: 'Bilder', h2Pics: 'Eindrücke von Bord', galAria: 'Bildergalerie',
    kickLife: 'Leben an Bord', h2Life: (n: string) => `So fühlt sich eine Woche auf der ${n} an`,
    kickPlans: 'Grundrisse & Kabinen', h2Plans: (n: string) => `So ist die ${n} aufgeteilt`,
    plansIntro: (n: string, c: number) => `Die Werft baut die ${n} in ${c === 1 ? 'dieser Version' : `${c} Versionen`}. Welche Version eine bestimmte Charteryacht hat, steht in unserem Angebot.`,
    planAlt: (n: string, cap: string) => `Grundriss der ${n} – ${cap}`,
    plansSoon: 'Grundrisse folgen.', plansSoonText: ' Bis dahin finden Sie die Versionen in der Übersicht unten, die genauen Pläne schicken wir Ihnen gern mit dem Angebot.',
    thVersion: 'Version', thCabins: 'Kabinen', thBaths: 'Bäder', thFits: 'Passt zu', thNote: 'Hinweis',
    skipperQ: 'Mit Skipper unterwegs?',
    skipperCat: 'Auf vielen Katamaranen gibt es dafür eine Bugkabine mit eigenem Zugang vom Deck – ob sie vorhanden ist, hängt von der Yacht ab. Wir sagen Ihnen im Angebot genau, wie viele Kabinen für Ihre Gäste frei bleiben.',
    skipperMono: 'Auf Segelyachten belegt der Skipper meist eine Kabine oder schläft im Salon. Planen Sie dafür eine Kabine ein – wir beraten Sie gern, welche Version zu Ihrer Gruppe passt.',
    cmpYard: 'Werft', cmpLen: 'Länge', cmpCab: 'Kabinen', cmpGuests: 'Gäste', cmpIdeal: 'Ideal, wenn Sie …',
    kick3d: '3D-Rundgang', h23d: 'Gehen Sie selbst an Bord',
    tourText: (n: string) => `Laufen Sie durch Salon, Kabinen und Bäder einer echten ${n} – so, als wären Sie schon an Bord.`,
    tourBul: ['Mit der Puppenhaus-Ansicht sehen Sie die ganze Raumaufteilung auf einen Blick.', 'Auf dem Handy einfach mit dem Finger drehen und weitergehen.', 'Die Ausstattung einzelner Charteryachten kann abweichen.'],
    tourBy: 'Rundgang: ',
    kickVid: 'Rundgang', h2Vid: 'Kommen Sie mit an Bord',
    kickEq: 'Ausstattung', h2Eq: 'Was Sie an Bord erwartet',
    eqIntro: 'Typische Ausstattung von Charteryachten dieser Art. Die genaue Liste hängt von der Yacht ab, Sie bekommen sie mit dem Angebot.',
    eqOpt: 'Je nach Yacht oder als Extra',
    kickAreas: 'Reviere', h2Areas: (n: string) => `Wo Sie die ${n} segeln`,
    areasDefault: (n: string) => `Für Ihren Wunschtermin prüfen wir, in welchen Revieren eine ${n} frei ist – vom Mittelmeer bis in die Karibik.`,
    kickCmp: 'Vergleich', h2Cmp: (p: string) => `Ähnliche ${p} im Vergleich`, moreOf: (b: string) => `Weitere ${b}-Modelle`,
    kickFit: 'Fazit', h2Fit: (n: string) => `Ist die ${n} das Richtige für Sie?`, fitYesH: 'Ja, wenn Sie …', fitNoH: 'Eher nicht, wenn Sie …',
    kickFaq: 'Häufige Fragen', h2Faq: (n: string) => `Fragen zur ${n}`, techH: 'Technische Daten für Interessierte',
    kickAsk: 'Anfrage', h2Ask: (n: string) => `${n} anfragen`,
    askText: 'Sagen Sie uns, wann und wo Sie segeln möchten und wie viele Sie sind. Wir suchen die passende Yacht und melden uns innerhalb von 24 Stunden mit einem Angebot.',
    disclaimer: 'Angaben nach Werft- und Händlerdaten, ohne Gewähr. Ausstattung je nach Yacht verschieden.',
    // Formular
    fName: 'Name', fMail: 'E-Mail', fPeriod: 'Zeitraum', fPeriodPh: 'z. B. Juni 2027, 1 Woche', fPeople: 'Personen', fPeoplePh: 'z. B. 6',
    fArea: 'Revier', fAreaPh: 'z. B. Kroatien oder noch offen', fSkipper: 'Skipper', skOpts: ['Mit Skipper', 'Ohne Skipper', 'Weiß ich noch nicht'],
    fMsg: 'Nachricht', fMsgPh: 'Wünsche, Kinder an Bord, Anlass …',
    errName: 'Bitte geben Sie Ihren Namen ein.', errMail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    errSend: (mail: string) => `Das Absenden hat leider nicht geklappt. Bitte versuchen Sie es später noch einmal oder schreiben Sie uns an ${mail}.`,
    sending: 'Wird gesendet …', send: 'Anfrage senden',
    formPriv1: 'Mit dem Absenden verarbeiten wir Ihre Angaben, um Ihre Anfrage zu beantworten. Mehr dazu in der ', formPriv2: 'Datenschutzerklärung',
    thanks: (n: string) => `Danke, ${n}!`,
    thanksText: (m: string, area: string, period: string, people: string, sk: string) => `Ihre Anfrage zur ${m} (${area || 'Revier offen'}, ${period || 'Zeitraum offen'}, ${people || '?'} Personen, ${sk}) ist bei uns. Sie hören innerhalb von 24 Stunden von uns.`,
    privacyPath: '/datenschutz',
  },
  en: {
    lang: 'en-GB', ytHl: 'en', site: 'Yacht-Holiday',
    crumbRoot: 'Yacht models',
    ovTitle: 'Yacht models: charter catamarans & sailing yachts',
    ovDesc: (n: number, brands: string) => `${n} charter yachts: catamarans and sailing yachts from ${brands} – with floor plans, videos and 3D tours.`,
    ovH1: 'Yacht models to charter: find the yacht that suits your crew',
    ovLead: (n: number, brands: string) => `${n} catamarans and sailing yachts from ${brands} – with floor plans, cabin versions, videos and 3D tours. See at a glance how many cabins and bathrooms a yacht has, how it sails and which crew it suits.`,
    type: 'Type', all: 'All', allYards: 'All yards', yard: 'Yard',
    only3d: (n: number) => `With 3D tour (${n})`,
    search: 'Search models',
    model: ['model', 'models'], viewModel: 'View model →', badge3d: '3D tour',
    empty: 'No model matches your selection.', reset: 'Reset filters',
    illu: (n: string) => `${n}, illustration`,
    picCard: (m: Model, len: string) => `${m.name} – ${m.typ === 'Katamaran' ? 'catamaran' : 'sailing yacht'} by ${m.brand}, ${len} m`,
    picPoster: (m: Model) => `${m.name} – ${m.typ === 'Katamaran' ? 'catamaran' : 'sailing yacht'} by ${m.brand} for charter`,
    tourTitle: (t: string) => `3D tour: ${t}`, videoTitle: (t: string) => `Video: ${t}`,
    tourStart: 'Start 3D tour', tourStartAria: (t: string) => `Start 3D tour: ${t}`, videoPlay: (t: string) => `Play video: ${t}`,
    noteTour: 'By clicking you load the 3D tour from Matterport. Data is transferred to Matterport in the process. ',
    noteVideo: 'By clicking you load the video from YouTube (privacy-enhanced mode). Data is transferred to YouTube in the process. ',
    noteLink: 'More in the privacy policy',
    ctaAvail: 'Check availability →', cta3d: '3D tour', ctaCabins: 'View cabins',
    noVideo: (n: string) => `A video of the ${n} is coming soon. Until then we are happy to show you pictures and floor plans in person.`,
    subnavAria: 'On this page', sLife: 'Life on board', sPlans: 'Floor plans', s3d: '3D', sFaq: 'FAQ', sAll: 'All models', sAsk: 'Enquire',
    trust: ['Personal advice', '5 stars on Google', 'Trusted Shops certified', 'Reply within 24 hours'],
    kickGlance: 'At a glance', h2Overview: (n: string) => `Charter the ${n}: the overview`,
    love: 'What you will love', know: 'Good to know', factsH: 'Fact sheet', pricePerWeek: 'Price per week', onRequest: 'on request', askNow: 'Enquire now',
    kickPics: 'Pictures', h2Pics: 'Impressions from on board', galAria: 'Image gallery',
    kickLife: 'Life on board', h2Life: (n: string) => `What a week on the ${n} feels like`,
    kickPlans: 'Floor plans & cabins', h2Plans: (n: string) => `How the ${n} is laid out`,
    plansIntro: (n: string, c: number) => `The yard builds the ${n} in ${c === 1 ? 'this version' : `${c} versions`}. Which version a particular charter yacht has is stated in our offer.`,
    planAlt: (n: string, cap: string) => `Floor plan of the ${n} – ${cap}`,
    plansSoon: 'Floor plans to follow.', plansSoonText: ' Until then you will find the versions in the overview below; we are happy to send you the exact plans with the offer.',
    thVersion: 'Version', thCabins: 'Cabins', thBaths: 'Bathrooms', thFits: 'Suits', thNote: 'Note',
    skipperQ: 'Sailing with a skipper?',
    skipperCat: 'Many catamarans have a bow cabin with its own access from the deck for this – whether it is available depends on the yacht. Our offer tells you exactly how many cabins stay free for your guests.',
    skipperMono: 'On sailing yachts the skipper usually takes a cabin or sleeps in the saloon. Allow for a cabin – we are happy to advise which version suits your group.',
    cmpYard: 'Yard', cmpLen: 'Length', cmpCab: 'Cabins', cmpGuests: 'Guests', cmpIdeal: 'Ideal if you …',
    kick3d: '3D tour', h23d: 'Step on board yourself',
    tourText: (n: string) => `Walk through the saloon, cabins and bathrooms of a real ${n} – as if you were already on board.`,
    tourBul: ['With the dollhouse view you see the whole layout at a glance.', 'On a phone simply swipe with your finger and walk on.', 'The equipment of individual charter yachts may differ.'],
    tourBy: 'Tour: ',
    kickVid: 'Video tour', h2Vid: 'Come aboard',
    kickEq: 'Equipment', h2Eq: 'What to expect on board',
    eqIntro: 'Typical equipment of charter yachts of this kind. The exact list depends on the yacht; you receive it with the offer.',
    eqOpt: 'Depending on the yacht or as an extra',
    kickAreas: 'Areas', h2Areas: (n: string) => `Where you can sail the ${n}`,
    areasDefault: (n: string) => `For your preferred dates we check in which areas a ${n} is available – from the Mediterranean to the Caribbean.`,
    kickCmp: 'Comparison', h2Cmp: (p: string) => `Similar ${p.toLowerCase()} compared`, moreOf: (b: string) => `More ${b} models`,
    kickFit: 'Verdict', h2Fit: (n: string) => `Is the ${n} right for you?`, fitYesH: 'Yes, if you …', fitNoH: 'Probably not if you …',
    kickFaq: 'Frequently asked questions', h2Faq: (n: string) => `Questions about the ${n}`, techH: 'Technical data for the curious',
    kickAsk: 'Enquiry', h2Ask: (n: string) => `Enquire about the ${n}`,
    askText: 'Tell us when and where you would like to sail and how many of you there are. We find the right yacht and get back to you within 24 hours with an offer.',
    disclaimer: 'Information based on yard and dealer data, without guarantee. Equipment varies by yacht.',
    fName: 'Name', fMail: 'Email', fPeriod: 'Dates', fPeriodPh: 'e.g. June 2027, 1 week', fPeople: 'People', fPeoplePh: 'e.g. 6',
    fArea: 'Area', fAreaPh: 'e.g. Croatia or still open', fSkipper: 'Skipper', skOpts: ['With skipper', 'Without skipper', 'Not sure yet'],
    fMsg: 'Message', fMsgPh: 'Wishes, children on board, occasion …',
    errName: 'Please enter your name.', errMail: 'Please enter a valid email address.',
    errSend: (mail: string) => `Sending failed, unfortunately. Please try again later or write to us at ${mail}.`,
    sending: 'Sending …', send: 'Send enquiry',
    formPriv1: 'By submitting we process your details to answer your enquiry. More in the ', formPriv2: 'privacy policy',
    thanks: (n: string) => `Thank you, ${n}!`,
    thanksText: (m: string, area: string, period: string, people: string, sk: string) => `Your enquiry about the ${m} (${area || 'area open'}, ${period || 'dates open'}, ${people || '?'} people, ${sk}) has reached us. You will hear from us within 24 hours.`,
    privacyPath: '/en/data-privacy',
  },
} as const
