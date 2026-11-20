import { useParams, useLocation } from 'react-router-dom'
import { Link, Navigate } from '../router'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { packages } from '../components/Packages'
import { packagesEn } from '../data/packagesEn'
import { cruisesEn } from '../data/cruisesEn'
import { useLang, enPkgSlugs, isEnHost, BASE_DE, BASE_EN } from '../i18n'

const enPkgPath: Record<string, string> = Object.fromEntries(Object.entries(enPkgSlugs).map(([slug, id]) => [id, slug]))

type Section = {
  heading?: string
  small?: boolean
  paragraphs: string[]
  listTitle?: string
  list?: string[]
  afterList?: string[]
  img?: string
  imgAlt?: string
  reverse?: boolean
}

type ToernPage = {
  id: string
  breadcrumb: string
  h1: string
  heroImg: string
  heroSet?: string // srcset fuer das Hero-Bild (responsive Varianten)
  heroPos?: string // object-position, damit das Motiv im 440-px-Band sitzt
  ogImg?: string // eigenes Vorschaubild (JPG) statt heroImg
  faqHeading?: string
  seoTitle: string
  seoDesc: string
  packageTeasers: string[] // Package-IDs → echte Angebote
  extraTeaser?: { title: string; to: string; label: string; img: string }
  banner?: { img: string; title: string; text: string; footer: string }
  sections: Section[]
  faq?: { q: string; a: string }[]
  luxury?: boolean
}

// Inhalte 1:1 von yacht-urlaub.net übernommen
const toernData: Record<string, ToernPage> = {
  einsteiger: {
    id: 'einsteiger',
    breadcrumb: 'für Einsteiger',
    h1: 'Segeltörn für Einsteiger',
    heroImg: '/images/Zielgruppen/beach-blue-sky-cheerful.jpg',
    seoTitle: 'Segeltörn für Einsteiger – entspannt, sicher & ohne Vorkenntnisse | Yacht-Urlaub',
    seoDesc: 'Segelurlaub für Einsteiger mit erfahrenem Skipper: Keine Vorkenntnisse nötig. Traumhafte Buchten, türkisblaues Meer, Baden und Schnorcheln – wir kümmern uns um den Rest.',
    packageTeasers: ['dalmatien', 'kornaten', 'istrien'],
    sections: [
      {
        heading: 'Segelurlaub für Einsteiger – entspannt, sicher & ohne Vorkenntnisse',
        paragraphs: [
          'Ein Segelurlaub für Einsteiger ist viel mehr als nur Segeln. Für die meisten Gäste bedeutet er Urlaub am Wasser, traumhafte Buchten, türkisblaues Meer, Baden, Schnorcheln und das Entdecken von Küsten, Inseln und Kulturen – und nicht das aktive Segelsetzen.',
          'Tatsächlich besteht ein Segelurlaub nur zu etwa 5 % aus echtem "Segeln". Die restliche Zeit genießen Sie entspannte Tage an Bord, schwimmen in kristallklarem Wasser, gehen an Land essen oder erkunden charmante Hafenstädte. Gesegelt wird, wenn Wind und Route es zulassen – ganz entspannt und immer sicher begleitet.',
          'Gerade für Einsteiger ist ein Segelurlaub die ideale Art zu reisen: jeden Tag ein neuer Ort, kein Kofferpacken, kein Hotelwechsel – und dennoch maximaler Komfort und Erholung.',
        ],
        img: '/images/packages/Einsteiger/gallery/IMG_7874.jpg',
        imgAlt: 'Segelurlaub für Einsteiger',
      },
      {
        heading: 'Segelurlaub mit Skipper – perfekt für Anfänger',
        paragraphs: [
          'Für Einsteiger empfehlen wir einen Segelurlaub mit erfahrenem Skipper. Der Skipper übernimmt Navigation, Sicherheit und das Handling der Yacht – Sie genießen den Urlaub.',
        ],
        listTitle: 'Vorteile für Anfänger:',
        list: [
          'Keine Segelkenntnisse nötig',
          'Maximale Sicherheit auf See',
          'Lokales Insiderwissen zu Buchten & Häfen',
          'Flexible Routen je nach Wetter & Wunsch',
          'Entspannter Urlaub ohne Verantwortung',
        ],
        afterList: [
          'Auf Wunsch erklärt der Skipper gerne die Grundlagen des Segelns – ganz ohne Druck. So können Sie erste Erfahrungen sammeln oder einfach nur entspannen und genießen.',
          'Ein Segelurlaub für Einsteiger ist damit eine der komfortabelsten und abwechslungsreichsten Urlaubsformen, die es gibt – egal ob in Kroatien, Griechenland oder anderen Segelrevieren.',
        ],
        img: '/images/packages/dalmatien/gallery/WP_20150818_001.jpg',
        imgAlt: 'Segelurlaub mit Skipper',
        reverse: true,
      },
      {
        heading: 'Was bedeutet „Segelurlaub" wirklich?',
        paragraphs: [
          'Der Begriff Segelurlaub wird oft missverstanden. Es geht dabei nicht um sportliches Segeln oder körperliche Anstrengung. Vielmehr ist Segelurlaub ein Synonym für entschleunigten Urlaub auf dem Meer.',
        ],
        listTitle: 'Ein typischer Tag sieht so aus:',
        list: [
          'Frühstück mit Blick auf eine ruhige Bucht',
          'Baden & Schnorcheln direkt von der Yacht',
          'Weiterfahrt zu einer Insel oder Küstenstadt',
          'Mittagessen an Bord oder in einer Taverne',
          'Sonnenuntergang im Hafen oder vor Anker',
        ],
        afterList: [
          'Ob Katamaran oder Segelyacht – Sie bestimmen das Tempo. Wer möchte, darf gerne beim Segeln mithelfen. Wer lieber entspannt, lässt sich treiben. Alles kann, nichts muss.',
          'Gerade für Paare, Freunde, Familien oder kleine Gruppen ist Segelurlaub eine perfekte Kombination aus Natur, Kultur, Erholung und Freiheit – und damit ideal für Segel-Einsteiger.',
        ],
        img: '/images/Zielgruppen/keine_zuordnung.jpg',
        imgAlt: 'Entspannter Tag an Bord',
      },
    ],
    faq: [
      { q: 'Brauche ich Segelerfahrung?', a: 'Nein, für einen Segelurlaub mit Skipper sind keinerlei Vorkenntnisse nötig.' },
      { q: 'Ist Segelurlaub anstrengend?', a: 'Nein – der Fokus liegt auf Erholung, Baden, Genuss und Natur.' },
      { q: 'Ist Segelurlaub für Anfänger sicher?', a: 'Ja, mit professionellem Skipper und geprüften Yachten sehr sicher.' },
    ],
  },

  freunde: {
    id: 'freunde',
    breadcrumb: 'für Freunde',
    h1: 'Segeltörn für Freunde',
    heroImg: '/images/Zielgruppen/Freunde Snap.jpg',
    seoTitle: 'Segeltörn für Freunde – Mit Freunden segeln und feiern | Yacht-Urlaub',
    seoDesc: 'Segeltörns für Freundesgruppen: Geburtstag, Junggesellenabschied oder einfach Urlaub mit Freunden. Kommt an Bord einer unserer modernen Yachten!',
    packageTeasers: ['dalmatien', 'karibik-bvi', 'griechenland'],
    extraTeaser: {
      title: 'SailAway Party-Flotte',
      to: '/sailaway',
      label: 'MEHR ERFAHREN',
      img: '/images/sailaway/header.jpg',
    },
    sections: [
      {
        heading: 'Mit Freunden segeln und feiern',
        paragraphs: [
          'Erlebe mit deinen Freunden ein Abenteuer, über das ihr noch lange erzählen werdet. Egal ob zu einem besonderen Anlass – Geburtstag, Junggesellenabschied oder einfach nur eine Woche Urlaub mit Freunden – kommt an Bord einer unserer modernen Yachten! Feier mit deinen Liebsten eine Party wie nie zuvor! - Wer kann schon sagen, dass er danach auf einer Yacht mitten auf dem Meer aufgewacht ist?',
          'Besucht die zahlreichen Bars, Clubs und Tavernen und relaxt am nächsten Tag in einer gemütlichen Bucht umgeben von türkisblauem Wasser. Ihr werdet euch fragen, ob es nur ein schöner Traum ist oder einer der besten Urlaube, die ihr je gemacht habt!',
        ],
        img: '/images/Zielgruppen/freunde2.jpg',
        imgAlt: 'Freunde auf der Yacht',
      },
      {
        paragraphs: [
          'Mit Yacht-Urlaub wird euer einzigartiges Erlebnis mit Freunden unvergesslich sein.',
          'Hoch die Gläser und ab ins Abenteuer!',
        ],
        img: '/images/Zielgruppen/Freunde3.jpg',
        imgAlt: 'Feiern an Bord',
        reverse: true,
      },
      {
        paragraphs: [
          'Bucht bei Yacht-Urlaub, ganz einfach, weil ihr frei entscheiden könnt, auf welcher Art von Yacht ihr euer Wunsch-Reiseziel erleben wollt. Ihr könnt euch entspannt zurücklehnen, während unsere erfahrenen Skipper euch durch die sieben Weltmeere bringen. Dabei beraten wir euch gerne, welches Ziel am besten zu euren Wünschen passt! Legt ihr viel Wert auf ein wenig Kulinarik und Kultur? Oder wollt ihr einfach nur die Nacht zum Tage machen und feiern? Alles ist möglich! Auf unseren erprobten Routen werdet ihr nichts von alle dem vermissen.',
        ],
        img: '/images/Zielgruppen/Freunde im Wasser.jpg',
        imgAlt: 'Freunde im Wasser',
      },
    ],
  },

  familien: {
    id: 'familien',
    breadcrumb: 'für Familien',
    h1: 'Segeltörn für Familien',
    heroImg: '/images/Zielgruppen/familie.jpeg',
    seoTitle: 'Segeltörn für Familien – Der perfekte Familienurlaub auf dem Wasser | Yacht-Urlaub',
    seoDesc: 'Familienfreundliche Segeltörns: Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen. Sicherheit, Spaß und gemeinsame Erlebnisse.',
    packageTeasers: ['griechenland', 'kornaten', 'istrien'],
    banner: {
      img: '/images/partner/Club15.webp',
      title: 'Entdecken Sie den Club der 15 % – Exklusive Vorteile für Familien!',
      text: 'Segeln Sie durch Kroatien und genießen Sie 15 % Rabatt auf zahlreiche Yachthäfen, Bojenfelder, Restaurants, Nationalparks und mehr. Diese exklusive mySea-Initiative wurde gemeinsam mit kroatischen Liegeplatzpartnern ins Leben gerufen, um Familien den Traum vom Segelurlaub noch erschwinglicher zu machen. Wir als Yacht-Urlaub machen Ihnen den Zugang zu der Aktion ohne weiteren Aufwand möglich.',
      footer: 'Weil unvergessliche Abenteuer auf dem Wasser für alle leistbar bleiben sollten!',
    },
    sections: [
      {
        heading: 'Der perfekte Familienurlaub auf dem Wasser',
        paragraphs: [
          'Ein Familienurlaub sollte unvergesslich sein – voller Abenteuer, Entspannung und gemeinsamer Erlebnisse. Mit unseren familienfreundlichen Segeltörns entdecken Sie die schönsten Strände, spannende Städte und faszinierende Unterwasserwelten. Kleine Piraten dürfen das Steuer übernehmen, während die Eltern die Seele baumeln lassen.',
          'Buchen Sie Ihren Familienurlaub bei Yacht-Urlaub, weil wir wissen worauf es ankommt. Unsere erfahrenen Skipper führen Sie an jene Orte, die Sie immer schon mal sehen wollten. Dabei achten wir auf das Wohlbefinden jeder Altersgruppe.',
          'Genießen Sie unbeschwerte Tage auf dem Meer mit Yacht-Urlaub – denn wir wissen, worauf es beim Familiensegeln ankommt. Lassen Sie den Alltag hinter sich und starten Sie in Ihr nächstes großes Abenteuer!',
          'Yachturlaub - ist mit Kindern der perfekte Urlaub! Spaß, Abenteuer, Erholung und Genuß inklusive!',
          'Jetzt Familien-Segeltörn planen und einzigartige Erinnerungen schaffen!',
        ],
        img: '/images/Zielgruppen/familie_bug kl.webp',
        imgAlt: 'Familie am Bug der Yacht',
      },
      {
        heading: 'Warum ein Segeltörn mit der Familie?',
        small: true,
        paragraphs: [],
        list: [
          'Erlebnis pur: Schwimmen in versteckten Buchten, spannende Landgänge und kinderfreundliche Ausflüge.',
          'Sicherheit & Komfort: Unsere erfahrenen Skipper sorgen für eine entspannte Reise – für Groß und Klein.',
          'Flexibilität & Individualität: Wir passen die Route Ihren Wünschen an, damit jeder auf seine Kosten kommt.',
          'Kulinarische Vielfalt: Kochen an Bord oder ein Besuch in handverlesenen Restaurants – ganz nach Ihrem Geschmack.',
        ],
        img: '/images/Zielgruppen/Familie 1.jpg',
        imgAlt: 'Familie auf dem Segelboot',
        reverse: true,
      },
    ],
  },

  luxury: {
    id: 'luxury',
    breadcrumb: 'Luxury',
    h1: 'Luxus-Yachttrip',
    heroImg: '/images/luxury/hero-luxury-1600.webp',
    heroSet: '/images/luxury/hero-luxury-800.webp 800w, /images/luxury/hero-luxury-1600.webp 1600w, /images/luxury/hero-luxury-2000.webp 2000w',
    heroPos: '50% 58%',
    ogImg: '/images/luxury/og-luxury.jpg',
    seoTitle: 'Luxus-Yachttrip – Luxury Yachtreise für Genießer | Yacht-Urlaub',
    seoDesc: 'Luxus-Motoryacht NIKITA (Riva 100 Corsaro, 29,90 m) chartern: 5 Kabinen für 10 Gäste, 5 Crew, Watertoys inklusive – ab € 100.000 pro Woche.',
    packageTeasers: [],
    luxury: true,
    faqHeading: 'Häufige Fragen zur NIKITA',
    faq: [
      { q: 'Was kostet die Charter der Luxus-Motoryacht NIKITA?', a: 'In der Nebensaison (01.06. – 22.06. und 07.09. – 21.09.) kostet die Charter € 100.000 pro Woche, in der Hauptsaison (22.06. – 07.09.) € 110.000 pro Woche.' },
      { q: 'Für wie viele Gäste ist die NIKITA ausgelegt?', a: 'Die NIKITA bietet Platz für 10 Gäste in 5 Kabinen mit 5 Bädern. Dazu kommen 5 Crewmitglieder: Kapitän, Techniker, Hostess, Koch und Deckhand.' },
      { q: 'Welche technischen Daten hat die Riva 100 Corsaro?', a: 'Länge 29,90 m, Breite 6,70 m, Tiefgang 2,26 m, Antrieb 2 x MAN R V12 1900 mHP, Höchstgeschwindigkeit 28 Knoten. Die NIKITA ist seit 2022 in Charter.' },
      { q: 'Welche Watertoys sind an Bord?', a: 'Inklusive an Bord sind ein Chase Boat Sacs Strider 10M mit 2x Mercury 350, ein Waydoo Flyer eFoil, ein Seabob F5 rs, ein SUP Paddle Board, ein Wakeboard und Schnorchel-Ausrüstung.' },
    ],
    sections: [
      {
        heading: 'Luxury Yachtreise für Genießer',
        paragraphs: [
          'Willkommen bei Ihrem Luxury Yachting Partner!',
          'Erleben Sie die unberührte Schönheit der adriatischen Küste mit unserem exklusiven Motoryachtcharter. Entdecken Sie malerische Buchten, erleben Sie die vielfältige Kulinarik und entspannen Sie am Strand oder an Bord während Sie die atemberaubende Natur Kroatiens genießen.',
          'Mit mehr als 1.200 Inseln vor der Küste Kroatiens zählt dieses Gebiet zu den schönsten und attraktivsten in ganz Europa. Tauchen Sie ein in azurblaues Meer, das zum Schnorcheln einlädt und erkunden Sie malerische Riffe sowie eine Vielzahl an traumhaften Buchten.',
        ],
      },
      {
        heading: 'Erstklassige Motoryachtvermietung',
        paragraphs: [
          'Bei uns können Sie eine Luxus-Motoryacht chartern, die keinerlei Wünsche offen lässt, um die beeindruckende Küstenlandschaft und unvergleichliche Schönheit Kroatiens in vollen Zügen genießen.',
          'Unsere Yachtvermietung bietet Ihnen exklusiven Luxus und Komfort, um ein individuell zugeschnittenes Chartererlebnis zu ermöglichen.',
          'Lehnen Sie sich entspannt zurück und genießen Sie die atemberaubende Natur, die kulturellen Highlights, das pulsierende Nachtleben und die unzähligen kulinarischen Delikatessen Kroatiens.',
        ],
      },
      {
        heading: 'Einzigartige Urlaubsstimmung',
        paragraphs: [
          'Genießen Sie Luxus und Komfort auf einer unserer erstklassigen Motoryachten. Unsere erfahrene Crew kümmert sich um Ihr Wohlergehen und Ihr Captain führt Sie zu den verborgenen Schätzen Kroatiens, während Sie sich an Bord in exklusiver Atmosphäre entspannen.',
          'Buchen Sie noch heute Ihren nächsten Urlaub voller Entspannung, Abenteuer und Kulinarik umgeben von einem luxuriösen Ambiente. Ein Urlaubserlebnis ganz nach Ihren Wünschen wartet auf Sie!',
        ],
      },
    ],
  },
}

const LUXURY_HIGHLIGHTS = [
  '/images/luxury/nikita-17.webp',
  '/images/luxury/nikita_int-6.webp',
  '/images/luxury/nikita-8-1.webp',
]
const LUXURY_IMPRESSIONEN = [
  '/images/luxury/nikita-5.webp',
  '/images/luxury/nikita-4.webp',
  '/images/luxury/nikita-2.webp',
  '/images/luxury/nikita-14.webp',
  '/images/luxury/nikita-10.webp',
  '/images/luxury/nikita_int-10.webp',
  '/images/luxury/nikita_int-1.webp',
]

// Alt-Texte je Sprache fuer die NIKITA-Bilder
const LUX_ALT: Record<'de' | 'en', Record<string, string>> = {
  de: {
    '/images/luxury/nikita-17.webp': 'Salon der Motoryacht NIKITA mit großer Sitzlandschaft und Panoramafenstern',
    '/images/luxury/nikita_int-6.webp': 'Doppelkabine an Bord der NIKITA mit Panoramafenster',
    '/images/luxury/nikita-8-1.webp': 'Riva 100 Corsaro NIKITA in voller Fahrt auf dem Meer',
    '/images/luxury/bilder_nikita.webp': 'NIKITA – Riva 100 Corsaro: absolute Privatsphäre, fangfrische Köstlichkeiten und aufregende Watertoys',
    '/images/luxury/nikita-5.webp': 'Heck der NIKITA mit Badeplattform, auf der sich eine Frau sonnt',
    '/images/luxury/nikita-4.webp': 'Entspannen auf der Badeplattform der NIKITA mit Blick auf eine grüne Küste',
    '/images/luxury/nikita-2.webp': 'Sonnenliegen und Sitzbereich auf dem Vordeck der NIKITA',
    '/images/luxury/nikita-14.webp': 'Flybridge der NIKITA mit Sitzgruppe und Bar',
    '/images/luxury/nikita-10.webp': 'Außensteuerstand der NIKITA unter dem Hardtop',
    '/images/luxury/nikita_int-10.webp': 'Bad mit Marmor und Doppelwaschbecken an Bord der NIKITA',
    '/images/luxury/nikita_int-1.webp': 'Fitnessbereich mit Hanteln an Bord der NIKITA',
  },
  en: {
    '/images/luxury/nikita-17.webp': 'Salon of the motor yacht NIKITA with a large lounge area and panoramic windows',
    '/images/luxury/nikita_int-6.webp': 'Double cabin aboard NIKITA with a panoramic window',
    '/images/luxury/nikita-8-1.webp': 'Riva 100 Corsaro NIKITA at speed on the open sea',
    '/images/luxury/bilder_nikita.webp': 'NIKITA – Riva 100 Corsaro: absolute privacy, freshly caught delicacies and exciting water toys',
    '/images/luxury/nikita-5.webp': 'Stern of NIKITA with the swim platform and a woman sunbathing',
    '/images/luxury/nikita-4.webp': 'Relaxing on the swim platform of NIKITA with a view of a green coastline',
    '/images/luxury/nikita-2.webp': 'Sun loungers and seating area on the foredeck of NIKITA',
    '/images/luxury/nikita-14.webp': 'Flybridge of NIKITA with seating area and bar',
    '/images/luxury/nikita-10.webp': 'Outdoor helm station of NIKITA under the hardtop',
    '/images/luxury/nikita_int-10.webp': 'Marble bathroom with double basin aboard NIKITA',
    '/images/luxury/nikita_int-1.webp': 'Gym area with dumbbells aboard NIKITA',
  },
}

// Technische Daten der NIKITA — fruehere Bilder (NikitaFacts.png), jetzt als
// Text, damit Suchmaschinen und KI sie lesen koennen.
const LUX_SPECS: Record<'de' | 'en', [string, string][]> = {
  de: [
    ['Belegung', '10 Gäste + 5 Crew'],
    ['Crew an Bord', 'Kapitän, Techniker, Hostess, Koch & Deckhand'],
    ['Kojen', '10'],
    ['Unterbringung', '5 Kabinen, 5 Bäder, 1 Skipper-Kabine'],
    ['In Charter seit', '2022'],
    ['Länge', '29,90 m'],
    ['Breite', '6,70 m'],
    ['Tiefgang', '2,26 m'],
    ['Verdrängung', '99.000 kg'],
    ['Motor', '2 x MAN R V12 1900 mHP'],
    ['Dieseltank', '9.500 l'],
    ['Wassertank', '2.000 l'],
    ['Max. Geschwindigkeit', '28 Knoten'],
    ['Beiboot', 'Chase Boat Sacs Strider 10M'],
    ['Entertainment', 'Fusion & Sonos Hi-End in Salon, Cockpit und Fly · TV in Salon und allen Kabinen inkl. Apple TV · Hi-Speed Internet Netzwerk'],
  ],
  en: [
    ['Occupancy', '10 guests + 5 crew'],
    ['Crew on board', 'Captain, engineer, hostess, chef & deckhand'],
    ['Berths', '10'],
    ['Accommodation', '5 cabins, 5 bathrooms, 1 skipper’s cabin'],
    ['In charter since', '2022'],
    ['Length', '29.90 m'],
    ['Beam', '6.70 m'],
    ['Draught', '2.26 m'],
    ['Displacement', '99,000 kg'],
    ['Engines', '2 x MAN R V12 1900 mHP'],
    ['Diesel tank', '9,500 l'],
    ['Water tank', '2,000 l'],
    ['Max. speed', '28 knots'],
    ['Tender', 'Chase Boat Sacs Strider 10M'],
    ['Entertainment', 'Fusion & Sonos hi-end in salon, cockpit and flybridge · TV in the salon and all cabins incl. Apple TV · high-speed internet network'],
  ],
}
const LUX_TOYS: Record<'de' | 'en', string[]> = {
  de: ['Chase Boat Sacs Strider 10M mit 2x Mercury 350', 'Waydoo Flyer eFoil', 'Seabob F5 rs', 'SUP Paddle Board', 'Wakeboard', 'Schnorchel-Ausrüstung'],
  en: ['Chase Boat Sacs Strider 10M with 2x Mercury 350', 'Waydoo Flyer eFoil', 'Seabob F5 rs', 'SUP paddle board', 'Wakeboard', 'Snorkelling equipment'],
}

const tdl = {
  de: { home: 'Start', toerns: 'Törns', toernsHref: '/toerns', all: '← Alle Törns', offer: '▶ ZUM ANGEBOT',
    book: 'Anfrage starten', planer: 'Urlaubsplanung starten', planHref: '/urlaubsplaner',
    highlights: 'Die Highlights unserer Luxury-Packages', prices: 'Preise', off: 'Nebensaison / Woche',
    peak: 'Hauptsaison / Woche', impr: 'Impressionen', luxCta: 'Zur Luxury-Yachtreise Buchung',
    luxBtn: 'URLAUBSPLANUNG STARTEN', sailaway: 'Die Party-Flottille für alle zwischen 21 und 35.',
    faqH: 'Häufige Einsteiger Fragen:', faqAll: 'zu den FAQs »', faqHref: '/faq',
    specs: 'Technische Daten', toys: 'Watertoys inklusive an Bord', more: 'Mehr entdecken',
    moreMotor: 'Motoryachten im Überblick', moreHr: 'Segeln in Kroatien' },
  en: { home: 'Home', toerns: 'Cruises', toernsHref: '/en/cruises', all: '← All cruises', offer: '▶ OUR OFFER',
    book: 'Start your inquiry', planer: 'Start your holiday planning', planHref: '/en/holiday-planner',
    highlights: 'The highlights of our luxury packages', prices: 'Prices', off: 'Off-season / week',
    peak: 'Peak-season / week', impr: 'Impressions', luxCta: 'Book your luxury yacht trip',
    luxBtn: 'START YOUR HOLIDAY PLANNING', sailaway: 'The party flotilla for everyone between 21 and 35.',
    faqH: 'Frequently asked beginner questions:', faqAll: 'to the FAQs »', faqHref: '/en/faq',
    specs: 'Specifications', toys: 'Water toys on board (included)', more: 'Discover more',
    moreMotor: 'Motor yachts at a glance', moreHr: 'Sailing in Croatia' },
}

export default function ToernDetailPage() {
  const { id } = useParams<{ id: string }>()
  const lang = useLang()
  const s = tdl[lang]
  const data = id ? (lang === 'en' ? (cruisesEn[id] as unknown as ToernPage) : toernData[id]) : null

  if (!data) return <Navigate to={s.toernsHref} replace />

  const pkgList = lang === 'en' ? packagesEn : packages
  const pkgHref = (pid: string) => lang === 'en' ? `/en/cruises/book-now/${enPkgPath[pid] ?? pid}` : `/packages/${pid}`
  const teaserPackages = data.packageTeasers
    .map(pid => pkgList.find(p => p.id === pid))
    .filter((p): p is NonNullable<typeof p> => !!p)

  const { pathname } = useLocation()
  const base = isEnHost() ? BASE_EN : BASE_DE
  const pageUrl = `${base}${pathname.replace(/\/+$/, '') || '/'}`
  const en = lang === 'en'
  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: s.home, item: `${base}/` },
        { '@type': 'ListItem', position: 2, name: s.toerns, item: `${base}${en ? '/cruises' : '/toerns'}` },
        { '@type': 'ListItem', position: 3, name: data.breadcrumb, item: pageUrl },
      ],
    },
  ]
  if (data.faq && data.faq.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: data.faq.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }
  if (data.luxury) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: en ? 'Luxury motor yacht NIKITA (Riva 100 Corsaro) – yacht charter' : 'Luxus-Motoryacht NIKITA (Riva 100 Corsaro) – Yachtcharter',
      description: data.seoDesc,
      image: [`${base}/images/luxury/og-luxury.jpg`, `${base}/images/luxury/nikita-17.webp`],
      url: pageUrl,
      brand: { '@type': 'Brand', name: 'Riva' },
      additionalProperty: [
        { '@type': 'PropertyValue', name: en ? 'Length' : 'Länge', value: en ? '29.90 m' : '29,90 m' },
        { '@type': 'PropertyValue', name: en ? 'Guests' : 'Gäste', value: '10' },
        { '@type': 'PropertyValue', name: en ? 'Crew' : 'Crew', value: '5' },
        { '@type': 'PropertyValue', name: en ? 'Top speed' : 'Höchstgeschwindigkeit', value: en ? '28 knots' : '28 Knoten' },
      ],
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: '100000',
        highPrice: '110000',
        offerCount: 2,
        url: pageUrl,
        availability: 'https://schema.org/InStock',
      },
    })
  }

  const faqBlock = data.faq && (
        <section className="section" style={{ background: 'var(--gray-light)' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', color: 'var(--navy)', marginBottom: '1.5rem' }}>
              {data.faqHeading ?? s.faqH}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              {data.faq.map(f => (
                <div key={f.q} style={{ background: '#fff', borderRadius: '6px', padding: '1.25rem 1.5rem' }}>
                  <p style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.35rem' }}>{f.q}</p>
                  <p style={{ color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.6 }}>{f.a}</p>
                </div>
              ))}
            </div>
            <Link to={s.faqHref} style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '0.9rem' }}>{s.faqAll}</Link>
          </div>
        </section>
  )

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={data.seoTitle}
        description={data.seoDesc}
        image={data.ogImg ?? data.heroImg}
        schema={schema}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden' }}>
        <img
          src={data.heroImg}
          srcSet={data.heroSet}
          sizes={data.heroSet ? '100vw' : undefined}
          alt={data.h1}
          fetchPriority="high"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: data.heroPos }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.88) 0%, rgba(15,35,56,0.45) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            <Link to={lang === 'en' ? '/en' : '/'} style={{ color: 'rgba(255,255,255,0.6)' }}>{s.home}</Link>
            <span>›</span>
            <Link to={s.toernsHref} style={{ color: 'rgba(255,255,255,0.6)' }}>{s.toerns}</Link>
            <span>›</span>
            <span style={{ color: '#fff' }}>{data.breadcrumb}</span>
          </motion.nav>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1.5rem', maxWidth: '650px', lineHeight: 1.25 }}>
            {data.h1}
          </motion.h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
            {data.luxury ? (
              <Link to={s.planHref} className="btn btn-primary" style={{ marginRight: '1rem' }}>{s.planer}</Link>
            ) : (
              // "Anfrage starten" scrollt zum Anfrageformular am Seitenende (#kontakt),
              // nicht auf die Buchen-Seite — gleiches Muster wie Navbar/Footer.
              <a href="#kontakt" className="btn btn-primary" style={{ marginRight: '1rem' }}>{s.book}</a>
            )}
            <Link to={s.toernsHref} style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>{s.all}</Link>
          </motion.div>
        </div>
      </div>

      {/* Package-Teaser (echte Angebote wie auf der Originalseite) */}
      {teaserPackages.length > 0 && (
        <section style={{ background: 'var(--gray-light)', padding: '3.5rem 0' }}>
          <div className="container">
            <div className="teaser-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(teaserPackages.length + (data.extraTeaser ? 1 : 0), 4)}, 1fr)`, gap: '1.5rem' }}>
              {teaserPackages.map(pkg => (
                <div key={pkg.id} style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={pkg.cardImg} alt={pkg.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).src = '/images/packages/default-header-image.jpg' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                      {pkg.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '0.8rem', lineHeight: 1.55, flex: 1, marginBottom: '1rem' }}>{pkg.subtitle}</p>
                    <Link to={pkgHref(pkg.id)} className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '9px 16px', alignSelf: 'flex-start' }}>
                      {s.offer}
                    </Link>
                  </div>
                </div>
              ))}
              {data.extraTeaser && (
                <div style={{ background: 'var(--navy)', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={data.extraTeaser.img} alt={data.extraTeaser.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                      {data.extraTeaser.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.55, flex: 1, marginBottom: '1rem' }}>
                      {s.sailaway}
                    </p>
                    <Link to={data.extraTeaser.to} className="btn btn-gold" style={{ fontSize: '0.72rem', padding: '9px 16px', alignSelf: 'flex-start' }}>
                      {data.extraTeaser.label}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* mySea-Banner (Familien) */}
      {data.banner && (
        <section style={{ background: '#fff', padding: '3rem 0 0' }}>
          <div className="container">
            <div className="banner-grid" style={{ background: 'var(--blue-pale, #eaf4fb)', borderRadius: '6px', padding: '2rem', display: 'grid', gridTemplateColumns: '140px 1fr', gap: '2rem', alignItems: 'center' }}>
              <img src={data.banner.img} alt="Club der 15 %" loading="lazy" style={{ width: '100%', borderRadius: '4px' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.6rem' }}>{data.banner.title}</h2>
                <p style={{ color: '#444', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '0.6rem' }}>{data.banner.text}</p>
                <p style={{ color: 'var(--blue)', fontSize: '0.9rem', fontWeight: 700 }}>{data.banner.footer}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {data.sections.map((section, i) => (
        <section key={i} className="section" style={{ background: i % 2 === 0 ? '#fff' : 'var(--gray-light)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: section.img ? '1fr 1fr' : '1fr',
              gap: '4rem',
              alignItems: 'center',
              direction: section.reverse ? 'rtl' : 'ltr',
              maxWidth: section.img ? undefined : '860px',
            }} className="content-grid">
              <div style={{ direction: 'ltr' }}>
                {section.heading && (
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: section.small ? '1.3rem' : 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '1.25rem', lineHeight: 1.3 }}>
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map(p => (
                  <p key={p} style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '0.9rem', fontWeight: ['Erstklassige Motoryachtvermietung', 'Einzigartige Urlaubsstimmung', 'Willkommen bei Ihrem Luxury Yachting Partner!', 'Hoch die Gläser und ab ins Abenteuer!', 'Jetzt Familien-Segeltörn planen und einzigartige Erinnerungen schaffen!'].includes(p) ? 700 : 400 }}>
                    {p}
                  </p>
                ))}
                {section.listTitle && (
                  <p style={{ color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, margin: '1rem 0 0.6rem' }}>{section.listTitle}</p>
                )}
                {section.list && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                    {section.list.map(item => {
                      const ci = item.indexOf(':')
                      return (
                        <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--gray)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>✔</span>
                          {ci > 0 && ci < 30
                            ? <span><strong style={{ color: 'var(--navy)' }}>{item.slice(0, ci + 1)}</strong>{item.slice(ci + 1)}</span>
                            : item}
                        </li>
                      )
                    })}
                  </ul>
                )}
                {section.afterList?.map(p => (
                  <p key={p} style={{ color: 'var(--gray)', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '0.9rem' }}>{p}</p>
                ))}
              </div>
              {section.img && (
                <div style={{ direction: 'ltr', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                  <img
                    src={section.img}
                    alt={section.imgAlt || ''}
                    loading="lazy"
                    style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* FAQ (Einsteiger; bei Luxury hinter den Daten, siehe unten) */}
      {!data.luxury && faqBlock}

      {/* Luxury: Highlights, NIKITA, Preise, Impressionen */}
      {data.luxury && (
        <>
          <section className="section" style={{ background: 'var(--gray-light)' }}>
            <div className="container">
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center' }}>
                {s.highlights}
              </h2>
              <div className="luxury-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                {LUXURY_HIGHLIGHTS.map(img => (
                  <div key={img} style={{ borderRadius: '6px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
                    <img src={img} alt={LUX_ALT[lang][img]} width={1140} height={749} loading="lazy" decoding="async" style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section" style={{ background: 'var(--navy)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', marginBottom: '0.25rem', letterSpacing: '0.05em' }}>
                «NIKITA»
              </h2>
              <p style={{ color: 'var(--gold)', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '2.5rem' }}>
                RIVA 100 CORSARO
              </p>
              <img src="/images/luxury/bilder_nikita.webp" alt={LUX_ALT[lang]['/images/luxury/bilder_nikita.webp']} width={1140} height={528} loading="lazy" decoding="async"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px', marginBottom: '1.5rem' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>{s.specs}</h3>
              <dl className="luxury-facts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem 2rem', textAlign: 'left', maxWidth: '980px', margin: '0 auto 2rem' }}>
                {LUX_SPECS[lang].map(([k, v]) => (
                  <div key={k} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '0.6rem' }}>
                    <dt style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.2rem' }}>{k}</dt>
                    <dd style={{ margin: 0, color: '#fff', fontSize: '0.92rem', lineHeight: 1.55 }}>{v}</dd>
                  </div>
                ))}
              </dl>
              <div style={{ maxWidth: '980px', margin: '0 auto 2.5rem', textAlign: 'left', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.25rem 1.5rem' }}>
                <p style={{ color: 'var(--gold)', fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.6rem' }}>{s.toys}</p>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', color: '#fff', fontSize: '0.92rem', lineHeight: 1.7, columns: '2 260px' }}>
                  {LUX_TOYS[lang].map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.5rem', marginBottom: '1.5rem' }}>{s.prices}</h3>
              <div className="luxury-prices" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: '720px', margin: '0 auto' }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>{s.off}</p>
                  <p style={{ color: '#fff', fontSize: '0.82rem', marginBottom: '0.75rem' }}>01.06. – 22.06. &amp; 07.09. – 21.09.</p>
                  <p style={{ color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 700 }}>€ 100 000,-</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '1.75rem' }}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>{s.peak}</p>
                  <p style={{ color: '#fff', fontSize: '0.82rem', marginBottom: '0.75rem' }}>22.06. – 07.09.</p>
                  <p style={{ color: 'var(--gold)', fontFamily: 'DM Sans, sans-serif', fontSize: '1.8rem', fontWeight: 700 }}>€ 110 000,-</p>
                </div>
              </div>
            </div>
          </section>

          <section className="section" style={{ background: '#fff' }}>
            <div className="container">
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: 'var(--navy)', marginBottom: '2rem', textAlign: 'center' }}>
                {s.impr}
              </h2>
              <div className="luxury-impressionen" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {LUXURY_IMPRESSIONEN.map(img => (
                  <div key={img} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '6px', background: '#eee' }}>
                    <img src={img} alt={LUX_ALT[lang][img]} width={900} height={601} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <p style={{ color: 'var(--gray)', fontSize: '0.95rem', marginBottom: '1rem' }}>{s.luxCta}</p>
                <Link to={s.planHref} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '14px 36px' }}>
                  {s.luxBtn}
                </Link>
              </div>
              <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--gray)', fontSize: '0.9rem' }}>
                {s.more}:{' '}
                <Link to={en ? '/en/yachts?tab=motoryacht' : '/yachten?tab=motoryacht'} style={{ color: 'var(--blue)', fontWeight: 600 }}>{s.moreMotor}</Link>
                {' · '}
                <Link to={en ? '/en/destinations/croatia' : '/destinationen/kroatien'} style={{ color: 'var(--blue)', fontWeight: 600 }}>{s.moreHr}</Link>
              </p>
            </div>
          </section>
        </>
      )}

      {data.luxury && faqBlock}

      <style>{`
        @media (max-width: 1000px) { .teaser-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 900px) {
          .content-grid { grid-template-columns: 1fr !important; direction: ltr !important; }
          .luxury-grid { grid-template-columns: 1fr !important; }
          .luxury-facts, .luxury-prices { grid-template-columns: 1fr !important; }
          .banner-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .teaser-grid { grid-template-columns: 1fr !important; }
          .luxury-impressionen { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </main>
  )
}
