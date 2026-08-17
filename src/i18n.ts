// Zentrale i18n: Sprache, Routen-Mapping DE↔EN, UI-Wörterbuch
import { createContext, useContext } from 'react'

export type Lang = 'de' | 'en'

export const LanguageContext = createContext<Lang>('de')
export const useLang = () => useContext(LanguageContext)

/* ==========================================================================
 * Zwei Domains, eine Anwendung
 *
 * Deutsch laeuft auf yacht-urlaub.net, Englisch auf yacht-holiday.net.
 * Intern behaelt die Anwendung durchgehend die Pfade mit /en-Praefix
 * ("interner Pfad"). Auf der englischen Domain faellt dieses Praefix in der
 * Adresszeile weg ("Href-Pfad"), damit die ueber Jahre etablierten Adressen
 * von yacht-holiday.net unveraendert bleiben: /cruises, /destinations/croatia,
 * /yachts und so weiter.
 *
 *   interner Pfad   /en/cruises   <-- Routen, routePairs, canonicalPath
 *   Href-Pfad       /cruises      <-- Adresszeile auf der EN-Domain
 *
 * toInternal() und toHref() rechnen zwischen beiden um. Alles andere im
 * Code arbeitet weiter mit internen Pfaden und muss davon nichts wissen.
 * ========================================================================== */

export const BASE_DE = 'https://www.yacht-urlaub.net'
export const BASE_EN = 'https://www.yacht-holiday.net'

/** Kontaktadresse je Sprache. Der englische Auftritt nennt seit Jahren
 *  office@yacht-holiday.net — diese Adresse steht in der alten Korrespondenz
 *  und bleibt deshalb auf der englischen Domain stehen. Rechtstexte
 *  (Impressum, Datenschutz, AGB) sind davon ausgenommen: sie nennen die
 *  Adresse des Medieninhabers und laufen ohnehin nur auf Deutsch. */
export const MAIL: Record<Lang, string> = {
  de: 'info@yacht-urlaub.net',
  en: 'office@yacht-holiday.net',
}

/** Hosts, die den englischen Auftritt ausliefern.
 *
 *  en-test.yacht-urlaub.net  Testhost bei Netlify — damit laesst sich der
 *                            englische Betrieb pruefen, bevor die echte
 *                            Domain umgezogen ist.
 *  en.localhost              lokal: "npm run dev" oder "vite preview" unter
 *                            http://en.localhost:PORT aufrufen, dann laeuft
 *                            die Anwendung im englischen Modus. */
export const EN_HOSTS = [
  'yacht-holiday.net',
  'www.yacht-holiday.net',
  'en-test.yacht-urlaub.net',
  'en.localhost',
]

export function isEnHost(hostname?: string): boolean {
  const h = hostname ?? (typeof window === 'undefined' ? '' : window.location.hostname)
  return EN_HOSTS.includes(h)
}

/** Adresszeile → interner Pfad (auf der EN-Domain wird /en ergaenzt) */
export function toInternal(pathname: string): string {
  if (!isEnHost()) return pathname
  if (pathname === '/' || pathname === '') return '/en'
  return pathname.startsWith('/en/') || pathname === '/en' ? pathname : `/en${pathname}`
}

/** Interner Pfad → Adresszeile (auf der EN-Domain faellt /en weg) */
export function toHref(pathname: string): string {
  if (!isEnHost()) return pathname
  return stripEn(pathname)
}

/** Entfernt das /en-Praefix unabhaengig vom aktuellen Host */
export function stripEn(pathname: string): string {
  if (pathname === '/en') return '/'
  return pathname.startsWith('/en/') ? pathname.slice(3) : pathname
}

export function langFromPath(pathname: string): Lang {
  if (isEnHost()) return 'en'
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de'
}

/** Routen-Paare: deutsche Route ↔ englische Route (Slugs wie auf yacht-holiday.net) */
export const routePairs: [de: string, en: string][] = [
  ['/', '/en'],
  ['/toerns', '/en/cruises'],
  ['/toerns/einsteiger', '/en/cruises/for-beginners'],
  ['/toerns/freunde', '/en/cruises/for-friends'],
  ['/toerns/familien', '/en/cruises/for-families'],
  ['/toerns/luxury', '/en/cruises/luxury'],
  ['/packages/dalmatien', '/en/cruises/book-now/dalmatia-croatia'],
  ['/packages/kornaten', '/en/cruises/book-now/kornati-croatia'],
  ['/packages/istrien', '/en/cruises/book-now/dalmatia-croatia'], // kein EN-Pendant
  ['/packages/griechenland', '/en/cruises/book-now/greece'],
  ['/packages/karibik-bvi', '/en/cruises/book-now/caribbean-bvi'],
  ['/packages/karibik-grenadinen', '/en/cruises/book-now/caribbean-grenadines'],
  ['/kabinen', '/en/cabin-offers'],
  ['/urlaubsplaner', '/en/holiday-planner'],
  ['/buchen', '/en/book-now'],
  ['/toernberichte', '/en/trip-reports'],
  ['/toernberichte/segelurlaub-in-der-karibik-a-taste-of-paradise', '/en/trip-reports/caribbean-a-taste-of-paradise'],
  ['/toernberichte/istrien-und-die-kvarner-bucht', '/en/trip-reports/istria-and-the-kvarner-gulf'],
  ['/toernberichte/britische-jungferninseln', '/en/trip-reports/british-virgin-islands'],
  ['/toernberichte/von-sardinien-bis-korsika', '/en/trip-reports/sardinia-to-corsica'],
  ['/toernberichte/eine-faszinierende-reise-durch-die-inselwelt-der-dodekanes-in-der-aegaeis', '/en/trip-reports/the-dodecanese'],
  ['/toernberichte/sizilien', '/en/trip-reports/sicily'],
  ['/toernberichte/von-split-nach-dubrovnik', '/en/trip-reports/split-to-dubrovnik'],
  ['/toernberichte/die-inselwelt-der-kornaten', '/en/trip-reports/the-kornati-islands'],
  ['/toernberichte/kuba-eine-insel-voller-schaetze', '/en/trip-reports/cuba-an-island-full-of-treasures'],
  ['/toernberichte/pororoz-piran-novigrad', '/en/trip-reports/portoroz-piran-novigrad'],
  ['/toernberichte/mallorca-menorca-cabrera', '/en/trip-reports/mallorca-menorca-cabrera'],
  ['/toernberichte/auf-in-die-kornaten', '/en/trip-reports/off-to-the-kornati-islands'],
  ['/toernberichte/auf-den-spuren-der-kultur-in-sueddalmatien', '/en/trip-reports/southern-dalmatia'],
  ['/destinationen', '/en/destinations'],
  ['/destinationen/kroatien', '/en/destinations/croatia'],
  ['/destinationen/griechenland', '/en/destinations/greece'],
  ['/destinationen/balearen', '/en/destinations/balearic-islands'],
  ['/destinationen/kanaren', '/en/destinations/canaries'],
  ['/destinationen/karibik-bvi', '/en/destinations/caribbean-british-virgin-islands'],
  ['/destinationen/karibik-windward-islands', '/en/destinations/caribbean-windward-islands'],
  ['/destinationen/thailand', '/en/destinations/thailand'],
  ['/destinationen/seychellen', '/en/destinations/seychelles'],
  ['/yachten', '/en/yachts'],
  ['/charter', '/en/charter/yacht-charter'],
  ['/skipper', '/en/charter/crew-charter'],
  ['/crew', '/en/contact/crew'],
  ['/reisebuero', '/en/contact/travel-agencies'],
  ['/faq', '/en/faq'],
  ['/impressum', '/en/imprint'],
  ['/datenschutz', '/en/data-privacy'],
  ['/agb', '/en/terms'],
  ['/kontakt', '/en/contact'],
  ['/yoga', '/en/yoga'],
]

/** EN-Destination-Slug → interne ID */
export const enDestSlugs: Record<string, string> = {
  croatia: 'kroatien',
  greece: 'griechenland',
  'balearic-islands': 'balearen',
  canaries: 'kanaren',
  'caribbean-british-virgin-islands': 'karibik-bvi',
  'caribbean-windward-islands': 'karibik-windward-islands',
  thailand: 'thailand',
  seychelles: 'seychellen',
}

/** EN-Package-Slug → interne ID */
export const enPkgSlugs: Record<string, string> = {
  'dalmatia-croatia': 'dalmatien',
  'kornati-croatia': 'kornaten',
  greece: 'griechenland',
  'caribbean-bvi': 'karibik-bvi',
  'caribbean-grenadines': 'karibik-grenadinen',
}

const enCruiseToDe: Record<string, string> = {
  'for-beginners': 'einsteiger', 'for-friends': 'freunde', 'for-families': 'familien', luxury: 'luxury',
}

/** Normalisiert einen Pfad auf sein DE-Pendant — gleiche Seite in beiden Sprachen ⇒ gleicher Key */
export function canonicalPath(pathname: string): string {
  if (!pathname.startsWith('/en')) return pathname
  for (const [de, en] of routePairs) {
    if (pathname === en) return de
  }
  let m = pathname.match(/^\/en\/cruises\/book-now\/([^/]+)$/)
  if (m) return `/packages/${enPkgSlugs[m[1]] ?? m[1]}`
  m = pathname.match(/^\/en\/destinations\/([^/]+)$/)
  if (m) return `/destinationen/${enDestSlugs[m[1]] ?? m[1]}`
  m = pathname.match(/^\/en\/cruises\/([^/]+)$/)
  if (m) return `/toerns/${enCruiseToDe[m[1]] ?? m[1]}`
  return pathname
}

export function switchLangPath(pathname: string, target: Lang): string {
  // exakte Paare zuerst
  for (const [de, en] of routePairs) {
    if (target === 'en' && pathname === de) return en
    if (target === 'de' && pathname === en) return de
  }
  // dynamische Pfade (Packages/Destinationen mit Slugs) generisch
  if (target === 'en') return pathname.startsWith('/en') ? pathname : '/en'
  return pathname.startsWith('/en') ? '/' : pathname
}

/** Deutsch/englisches Gegenstueck eines internen Pfades — oder null, wenn es
 *  fuer diese Seite kein echtes Pendant gibt. Streng, weil das Ergebnis in
 *  hreflang-Angaben landet: eine geratene Zuordnung waere dort schlechter als
 *  gar keine. */
export function langPair(pathname: string): { de: string; en: string } | null {
  const de = canonicalPath(pathname)
  if (de === pathname && pathname.startsWith('/en')) return null // nicht aufloesbar
  for (const [d, e] of routePairs) if (d === de) return { de: d, en: e }

  let m = de.match(/^\/packages\/([^/]+)$/)
  if (m) {
    const en = Object.entries(enPkgSlugs).find(([, id]) => id === m![1])?.[0]
    return en ? { de, en: `/en/cruises/book-now/${en}` } : null
  }
  m = de.match(/^\/destinationen\/([^/]+)$/)
  if (m) {
    const en = Object.entries(enDestSlugs).find(([, id]) => id === m![1])?.[0]
    return en ? { de, en: `/en/destinations/${en}` } : null
  }
  m = de.match(/^\/toerns\/([^/]+)$/)
  if (m) {
    const en = Object.entries(enCruiseToDe).find(([, id]) => id === m![1])?.[0]
    return en ? { de, en: `/en/cruises/${en}` } : null
  }
  return null
}

/** Vollstaendige Adresse einer Seite in der Zielsprache — inklusive
 *  Domainwechsel, weil die Sprachen auf verschiedenen Domains liegen. */
export function switchLangUrl(pathname: string, target: Lang): string {
  const internal = toInternal(pathname)
  const pair = langPair(internal)
  if (target === 'en') {
    const en = pair ? pair.en : switchLangPath(internal, 'en')
    return `${BASE_EN}${stripEn(en)}`
  }
  const de = pair ? pair.de : switchLangPath(internal, 'de')
  return `${BASE_DE}${de}`
}

/** UI-Wörterbuch für gemeinsame Komponenten */
export const t = {
  de: {
    nav: {
      toerns: 'Törns', charter: 'Charter', destinationen: 'Destinationen', yachten: 'Yachten',
      kontakt: 'Kontakt', planen: 'Urlaub planen',
      alleToerns: 'Alle Törns', einsteiger: 'Für Einsteiger', freunde: 'Für Freunde',
      familien: 'Für Familien', luxury: 'Luxury', kabinen: 'Kabinen-Angebote',
      urlaubsplaner: 'Urlaubsplaner', toernberichte: 'Törnberichte',
      yachtCharter: 'Yacht-Charter anfragen', skipper: 'Skipper- und Bord-Service',
      alleDest: 'Alle Destinationen', alleYachten: 'Alle Yachten',
      segelyacht: 'Segelyacht (Monohull)', segelkat: 'Segel-Katamaran',
      motoryacht: 'Motoryacht (Monohull)', motorkat: 'Motor-Katamaran',
      anfrage: 'Anfrage starten', faq: 'FAQ', team: 'Unser Team',
      reisebuero: 'Für Reisebüros/Affiliate-Partner',
    },
    common: {
      mehrErfahren: 'Mehr erfahren', zumAngebot: 'ZUM ANGEBOT', jetztBuchen: 'JETZT BUCHEN!',
      jetztAnfragen: 'Jetzt anfragen', senden: 'Senden', zurueck: 'Zurück', weiter: 'Weiter',
    },
  },
  en: {
    nav: {
      toerns: 'Cruises', charter: 'Charter', destinationen: 'Destinations', yachten: 'Yachts',
      kontakt: 'Contact', planen: 'Plan your holiday',
      alleToerns: 'All cruises', einsteiger: 'For beginners', freunde: 'For friends',
      familien: 'For families', luxury: 'Luxury', kabinen: 'Cabin offers',
      urlaubsplaner: 'Holiday planner', toernberichte: 'Trip reports',
      yachtCharter: 'Yacht charter', skipper: 'Crew charter',
      alleDest: 'All destinations', alleYachten: 'All yachts',
      segelyacht: 'Sailing yacht (monohull)', segelkat: 'Sailing catamaran',
      motoryacht: 'Motor yacht (monohull)', motorkat: 'Power catamaran',
      anfrage: 'Get a quote', faq: 'FAQ', team: 'Our team',
      reisebuero: 'For travel agencies / affiliates',
    },
    common: {
      mehrErfahren: 'Learn more', zumAngebot: 'TO THE OFFER', jetztBuchen: 'BOOK NOW!',
      jetztAnfragen: 'Get a quote', senden: 'Send', zurueck: 'Back', weiter: 'Next',
    },
  },
} as const
