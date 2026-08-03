// Zentrale i18n: Sprache, Routen-Mapping DE↔EN, UI-Wörterbuch
import { createContext, useContext } from 'react'

export type Lang = 'de' | 'en'

export const LanguageContext = createContext<Lang>('de')
export const useLang = () => useContext(LanguageContext)

export function langFromPath(pathname: string): Lang {
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
