import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useLang, enPkgSlugs } from '../i18n'
import { packagesEn } from '../data/packagesEn'

export type Stop = { name: string; text: string }
export type DetailSection = { heading?: string; intro?: string; stops: Stop[] }
export type Addon = { name: string; price: string; details: string[] }
export type PriceBlock = {
  label?: string
  base: string
  baseIncludes: string[]
  notes: string[]
  zusatz: Addon[]
  premium: Addon[]
}
export type Accommodation = {
  title: string
  paragraphs: string[]
  layouts: { src: string; caption: string }[]
  link?: { label: string; to: string }
}
export type GalleryImage = { src: string; alt: string }

export type Package = {
  id: string
  title: string
  subtitle: string
  cardImg: string
  heroImg: string
  heroIntro?: string
  price: string
  priceNote?: string
  tags: string[]
  country: string
  included: string[]
  facts: string[]
  route: string
  routeMaps: { src: string; caption: string }[]
  detailSections: DetailSection[]
  accommodations: Accommodation[]
  arrival: { heading: string; paragraphs: string[] }
  hints: string[]
  priceBlocks: PriceBlock[]
  gallery: GalleryImage[]
}

// Kabinenpläne (Original-Grafiken der alten Website)
const MONO_LAYOUTS = [
  { src: '/images/yachten/41Cr.jpg', caption: 'Beispiel für 4 Personen (= Mindestteilnehmeranzahl)' },
  { src: '/images/yachten/1515592333.jpg', caption: 'Beispiel für 6 Personen' },
  { src: '/images/yachten/55Cr.jpg', caption: 'Beispiel für 8 Personen' },
]
const KAT_LAYOUTS = [
  { src: '/images/yachten/Lagoon 380.jpg', caption: 'Beispiel für 6 Personen (= Mindestteilnehmeranzahl für Katamaran)' },
  { src: '/images/yachten/Lagoon 400 S2 skizze.png', caption: 'Beispiel für 6 Personen (mit Premium-Upgrade)' },
  { src: '/images/yachten/Lagoon 450-4.jpg', caption: 'Beispiel für 8 Personen' },
  { src: '/images/yachten/Lagoon 620-6.jpg', caption: 'Beispiel für 10-12 Personen' },
]

// Unterkunftstexte (1:1 von der Originalseite)
const SEGELYACHT_UNTERKUNFT: Accommodation = {
  title: 'Segelyacht als Unterkunft',
  paragraphs: [
    'Unsere Yachten bestehen aus einem komfortablen Innenraum mit vollwertiger Küche, geräumigen Esstisch, größzügige Doppelbettkabinen, Innennassräume mit Dusche und WC, außen Cockpit mit Esstisch, Relaxbereich und Badeplattform mit Außendusche. Die Belegung erfolgt entsprechend den Kabinenplätzen, während der Salon allen Gästen frei zur Verfügung steht!',
  ],
  layouts: MONO_LAYOUTS,
  link: { label: 'Mehr Details zu Segel-Yachten', to: '/yachten?tab=monohull' },
}
const SEGELYACHT_UNTERKUNFT_MONO_ONLY: Accommodation = {
  title: 'Segelyacht als Unterkunft',
  paragraphs: [
    'Unsere Yachten bestehen aus einem komfortablen Innenraum mit vollwertiger Küche, geräumigen Esstisch, größzügige Doppelbettkabinen, Innennassräume mit Dusche und WC, außen Cockpit mit Esstisch, Relaxbereich und Badeplattform mit Außendusche.',
    'Bei diesem Package kommen Segel-Monohulls (Einrumpfer-Yachten) zum Einsatz. Die Belegung erfolgt entsprechend den Kabinenplätzen. Der Salon bleibt frei zur Verfügung für alle!',
  ],
  layouts: MONO_LAYOUTS,
  link: { label: 'Mehr Details zu Segel-Yachten', to: '/yachten?tab=monohull' },
}
const KATAMARAN_UNTERKUNFT: Accommodation = {
  title: 'Segel-Katamaran als Unterkunft',
  paragraphs: [
    'Unsere Segel-Katamarane bieten einen großzügigen und komfortablen Innenraum mit einer voll ausgestatteten Küche, einem geräumigen Esstisch sowie lichtdurchfluteten Doppelbettkabinen. Jeder Rumpf verfügt über eigene Nassräume mit Dusche und WC. Draußen lädt das weitläufige Cockpit mit Esstisch und Relaxbereich zum Verweilen ein, während die große Badeplattform mit Außendusche direkten Zugang zum Wasser ermöglicht.',
    'Im Vorderbereich eines jeden Katamarans befinden sich zusätzliche Relaxbereiche zum Sonnen und Entspannen. Bei größeren Katamaranen ab acht Personen stehen außerdem erweiterte Aufenthaltsbereiche zur Verfügung, die zusätzlichen Komfort und Raum für geselliges Beisammensein bieten.',
    'Die Belegung erfolgt entsprechend den Kabinenplätzen, während der Salon allen Gästen frei zur Verfügung steht!',
  ],
  layouts: KAT_LAYOUTS,
  link: { label: 'Mehr Details zu Katamaran-Yachten', to: '/yachten?tab=katamaran' },
}

export const packages: Package[] = [
  // ─────────────────────────────────── DALMATIEN ───────────────────────────────────
  {
    id: 'dalmatien',
    title: 'Segeln in Dalmatien ab Split',
    subtitle: 'Segelurlaub in Dalmatien ab Split oder Trogir zu den Inseln Hvar, Vis, Korčula, Brač und Šolta',
    cardImg: '/images/packages/dalmatien/gallery/Segeln in Dalmatien.png',
    heroImg: '/images/packages/dalmatien/split.jpg',
    price: '620',
    priceNote: '7 Tage',
    tags: ['Freunde', 'Einsteiger', 'Entdecker'],
    country: 'Kroatien',
    included: [
      'alle Nächtigungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'fixe Route mit Häfen und Buchten',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7, 10 oder 14 Tage',
      'ideal für Reisegruppe mit 4 - 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: 'Start Marina Split (Umgebung) – Brac – Hvar – Korčula – Vis – Solta – Zielort Split (Umgebung)',
    routeMaps: [{ src: '/images/packages/dalmatien/dalmatien_route.png', caption: 'Dalmatien Route ab Trogir/Split' }],
    detailSections: [
      {
        heading: 'Details zur Dalmatien-Route',
        intro:
          "Split bzw. Trogir sind ideale Ausgangshäfen für einen Segeltörn zu den beliebten Inseln Hvar, Korčula und Vis. Unter Kennern auch als 'Kulinarik-Package' bekannt führt die Route zu den besten Konobas mit regionalen Köstlichkeiten Kroatiens. Kulturelle Höhepunkte sind ebenso die namensgleichen Inselhauptstädte Hvar, Korčula und Vis. Ein Ausflug in die blaue Grotte, sowie Relaxen in schönen Buchten auf Brač und Solta stehen ebenfalls am Wochenplan.",
        stops: [
          {
            name: 'Split',
            text: 'Split ist Hauptstadt Dalmatiens und die zweitgrößte Stadt Kroatiens. Sie zählt etwa 170.000 Einwohner und ist Verkehrsknotenpunkt für alle wichtigen Fährverbindungen der mittleren Adria. Der Hafen ist ebenso imposant und geschäftig wie das historische Zentrum der Stadt, welches zum UNESCO Weltkulturerbe gehört. Das Wahrzeichen dabei ist der Diokletianspalast aus dem 2. Jhdt. Shoppen und Bummeln, am Hafen einen Kaffee genießen, den täglich geöffneten Markt besuchen, die Sehenswürdigkeiten der Altstadt entdecken oder an einen der zahlreichen Veranstaltungen teilnehmen, Split hat für jeden Geschmack etwas zu bieten.',
          },
          {
            name: 'Brac / Milna / Bol - das goldene Horn',
            text: 'Auf Brac bietet die Stadt Milna einen attraktiven Zwischenstop für Genießer und Bummler. Bei Bol liegt das goldene Horn. Der schönste Strand der Adria, so sagt man, bei dem geankert wird. Wer möchte kann von der Segelyacht direkt zum Strand schwimmen und kleinen Spaziergang wagen.',
          },
          {
            name: 'Hvar',
            text: 'Die Insel Hvar mit ihrer gleichnamigen Stadt ist ein attraktives Reiseziel in Dalmatien. Die erste Siedlung entwickelte sich bereits im 1. Jahrtausend vor Christus. Zentrum von Hvar Stadt ist der Platz Pjaca mit der Kathedrale Sveti Stjepan. Unzählige Konobas, Bars und lokale Geschäfte sind in Hvar zu finden. Erklimmen Sie die byzantinische Festung Španjola, welche einen herrlichen Überblick über die Stadt, den Hafen und die umliegenden Inseln bietet. Die Insel Hvar bietet neben dem Hauptort auch zahlreiche schöne Buchten, die zu einem Badestopp einladen.',
          },
          {
            name: 'Korčula',
            text: 'Die Stadt Korčula ist für viele das Juwel Kroatiens. Imposant liegt die Altstadt auf einer Halbinsel gegenüber eines hohen Gebirgsmassivs (ca. 1000m). Laut Überlieferungen wurde Marco Polo in Korčula geboren, dem zu seinem Ehren ein Museum und ein Turm gewidmet ist. Eines der Wahrzeichen Korčulas ist die im 15. Jhdt. errichtete Kathedrale Sv. Marko. Über die Sommermonate gibt es unzählige Veranstaltungen und Events. Besonderes Highlight bieten dabei die kirchlichen Prozessionen, die speziell in Korčula einen hohen Stellenwert besitzen.',
          },
          {
            name: 'Vis',
            text: 'Die ehemalige Militärinsel ist heute eines der beliebtesten Reiseziele in der Adria. Vis wurde erst 1989 dem Tourismus zugänglich gemacht. Die zwei großen Orte am Meer sind die Stadt Vis auf der Nordseite und Komiza auf der Westseite. Vis Stadt besitzt neben einem Militärmuseum auch einen ehemaligen U-Boot Bunker. Erkundet mit einem Motorroller die gesamte Insel auf den gut ausgebauten Straßen. Vis war auch Schauplatz der berühmten Seeschlacht von Lissa zwischen Italien und Österreich im 19. Jhdt. Tauchschulen auf Vis bieten Ausflüge zu Schiffswracks und anderen spektakulären Unterwasserobjekten an.',
          },
          {
            name: 'Bisevo / Blaue Grotte',
            text: 'Auf Bisevo befindet sich eines der schönsten Naturattraktionen der Route - die blaue Grotte. Fahren Sie mit dem Beiboot in die Naturhöhle, die ein seltenes Farbschauspiel bietet. Das Sonnenlicht scheint durch das kristallklare Wasser in die Höhle. Die Höhle ist bis zu 15 Metern hoch, der Eingang jedoch nur wenige Meter, sodass Sie mit dem Beiboot die Höhle selbst erkunden und das bläuliche Farbenschauspiel bewundern können. Wetterbedingt kann die Route angepasst werden.',
          },
        ],
      },
    ],
    accommodations: [SEGELYACHT_UNTERKUNFT, KATAMARAN_UNTERKUNFT],
    arrival: {
      heading: 'Anreise zum Ausgangshafen',
      paragraphs: [
        'Die Marinas in der Nähe von Split sind per Flugzeug (Flghf. Split-Trogir) und mit dem Auto durch die nahegelegene Autobahn A1 von Wien (7,5h) / München (9h) oder mit dem Bus bequem zu erreichen. Wir helfen gerne bei der Planung!',
      ],
    },
    hints: [
      'In Kroatien gilt der €uro',
      'Nicht im Basispreis inkludiert sind Endreinigung (ca. €40,- pro Person), Spritverbrauch, fakultative Ausflüge, Anlegegebühren in Fremdhäfen, kroatische Kurtaxe, persönliche Ausgaben und Reiseversicherungen sowie Trinkgelder jeglicher Art.',
      'Skipper wird von der Bordkassa mitverpflegt.',
      'Kroatien ist Teil des Schengen-Raums. Für die Crewliste benötigen Sie einen gültigen Reisepass oder Personalausweis.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        label: 'für 7 Tage',
        base: '620',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer zur Durchführung: 4 Personen (6 für Katamarane). Für Einzelreisende oder 2 Personen: Mitsegler in der Yacht-Urlaub Törnbörse finden oder Kabinenangebote ansehen.',
          'Ohne gebuchte ZUSATZpakete sind Endreinigung (~€200,- pro Yacht) und Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen. Die Crew wird von Bordkassa mitverpflegt.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '40', details: ['inkludiert den Spritverbrauch'] },
          { name: 'Comfort-Package', price: '60', details: ['Beibootmotor', 'WLAN an Bord', 'Bettleinen', 'Endreinigung'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '350', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '390', details: ['2 Mahlzeiten am Tag (inkludiert Frühstück und Mittagssnack)', '+ Sauberkeit in der Küche / Entsorgung des Mülls'] },
          { name: 'Einzelkabine', price: '550', details: ['Einzelbelegung (buchbar im zweiten Buchungsschritt)'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/dalmatien/gallery/dalmatien_gallery5.jpg', alt: 'Hafen von Vis' },
      { src: '/images/packages/dalmatien/gallery/WP_20150818_003.jpg', alt: 'Gemeinsames Abendessen in Vis' },
      { src: '/images/packages/dalmatien/gallery/milna.jpg', alt: 'Milna auf Brac' },
      { src: '/images/Zielgruppen/Sunset Hula Hula.jpg', alt: 'Sonnenuntergang in der Hula Hula Bar in Hvar' },
      { src: '/images/packages/dalmatien/gallery/dalmatien_gallery4.jpg', alt: 'Tor zur Altstadt von Korcula' },
      { src: '/images/packages/dalmatien/gallery/dalmatien_gallery6.jpg', alt: 'Sonnenuntergang mit einer Yacht auf Mljet' },
      { src: '/images/packages/dalmatien/gallery/Split 1.jpg', alt: 'Hafenkai von Split' },
      { src: '/images/Zielgruppen/Freunde im Wasser.jpg', alt: 'Freunde im Wasser' },
      { src: '/images/packages/dalmatien/gallery/Makarska Kai.jpg', alt: 'Anlegen am Hafenkai von Makarska' },
    ],
  },

  // ─────────────────────────────────── KARIBIK BVI ───────────────────────────────────
  {
    id: 'karibik-bvi',
    title: 'Karibik-Package (BVI)',
    subtitle: 'Segelurlaub in der Karibik auf einer Segelyacht oder einem Katamaran in den britischen Jungferninseln',
    cardImg: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
    heroImg: '/images/packages/Karibik-BVI/karibik_header.png',
    heroIntro:
      'Stellen Sie sich vor: Sie stehen barfuß am Deck einer Segelyacht, der warme Passatwind streicht durch Ihr Haar, während die Sonne langsam hinter den palmengesäumten Inseln untergeht. Der Duft von frisch gegrilltem Hummer liegt in der Luft, und das türkisfarbene Wasser glitzert im letzten Licht des Tages. Willkommen in Ihrem Karibik-Abenteuer!',
    price: '950',
    priceNote: '7 Tage',
    tags: ['Freunde', 'Entdecker'],
    country: 'Karibik',
    included: [
      'alle Übernachtungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'ortskundige Reiseleitung',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7 - 21 Tage',
      'flexible Reisedaten (täglicher Check-In / Check-Out möglich)',
      'Mindestteilnehmer: 4 Personen (Katamaran: 6 Pers)',
    ],
    route:
      'Road Town - North Sound (Virgin Gorda) - The Baths (Virgin Gorda) - Beef Island - The Dogs - Jost van Dyke - Anegada - Spanish Town - Norman Island - Peter Island - Cooper/Salt Island',
    routeMaps: [{ src: '/images/packages/Karibik-BVI/Karibik_mit Legende.jpg', caption: 'Karibik-Route (BVI)' }],
    detailSections: [
      {
        heading: 'Segelabenteuer in den Britischen Jungferninseln – Karibik von ihrer schönsten Seite',
        intro:
          'Weiße Sandstrände, türkisblaues Wasser, eine faszinierende Unterwasserwelt, frisch gegrillter Hummer und ein legendärer Painkiller-Cocktail – die perfekten Zutaten für einen Traumurlaub in einer der schönsten Segelregionen der Welt. Die Britischen Jungferninseln gehören zu den begehrtesten Segelrevieren weltweit und bieten eine hervorragende Infrastruktur für Segelurlauber. Gastfreundlichkeit, exzellente Kulinarik und die entspannte karibische Lebensart machen dieses Segelrevier einzigartig.\nVerbringen Sie 14 Tage auf einer modernen Segelyacht mit abwechslungsreichem Inselhopping. Jeden Morgen erwartet Sie ein neues Paradies mit unberührten Stränden, geschützten Buchten und lebhaften Beach-Bars.',
        stops: [
          {
            name: 'Road Town – Der Startpunkt Ihres Karibik-Abenteuers',
            text: 'Die Hauptstadt der Britischen Jungferninseln ist der Ausgangspunkt Ihrer Reise. Nach Ihrer Ankunft am Flughafen und einem kurzen Transfer lernen Sie hier Ihren Skipper kennen und gehen an Bord. Tortola, die größte Insel des Archipels, ist ein lebendiges Zentrum mit zahlreichen Einkaufsmöglichkeiten. Besonders beliebt sind der J.R. O’Neal Botanic Garden sowie die zahlreichen Märkte und Boutiquen.',
          },
          {
            name: 'Trellis Bay, Marina Cay & Scrub Island – Karibische Atmosphäre und Luxus',
            text: 'In Trellis Bay, nur wenige Minuten vom Flughafen entfernt, genießen Sie Ihren ersten karibischen Cocktail mit Blick auf das türkisfarbene Meer. Ein besonderes Highlight ist die monatlich stattfindende Full Moon Party, eine der berühmtesten Veranstaltungen der Region.\nPer Fähre gelangen Sie nach Marina Cay und Scrub Island, wo luxuriöse Resorts, erstklassige Restaurants und entspannte Strandbars auf Sie warten. Eine dieser Marinas kann auch als Startpunkt Ihrer Segelreise dienen.',
          },
          {
            name: 'Peter Island, Cooper Island & Salt Island – Ein Paradies für Segler und Schnorchler',
            text: 'Nur wenige Seemeilen von Road Town entfernt liegt diese traumhafte Inselgruppe. Die geschützten Buchten bieten ideale Ankerplätze, während die weißen Sandstrände und luxuriösen Resorts zum Entspannen einladen. Schnorchler erwartet eine beeindruckende Unterwasserwelt, die zu den schönsten der Karibik zählt.',
          },
          {
            name: 'Norman Island – Die geheimnisvolle Schatzinsel',
            text: 'Die Küsten von Norman Island sind geprägt von mystischen Höhlen und natürlichen Schwimmbecken. Die berühmten Pelican Islands sind ein Muss für alle, die die faszinierende Unterwasserwelt der Karibik erkunden möchten. Abends geht es zum legendären Willy T’s, einem schwimmenden Restaurant auf einem 30 Meter langen Schoner, wo karibische Spezialitäten und Cocktails serviert werden.',
          },
          {
            name: 'Spanish Town – Das Tor zu Virgin Gorda',
            text: 'Die zweitgrößte Stadt der Britischen Jungferninseln bietet eine moderne Marina mit zahlreichen Einkaufsmöglichkeiten. Von hier aus starten Touren über Virgin Gorda, sei es zu Fuß oder mit dem Fahrrad.',
          },
          {
            name: 'The Baths – Ein Naturwunder der Karibik',
            text: 'Die imposanten Granitfelsen von The Baths und der angrenzende Traumstrand Devil’s Bay sind ein wahres Paradies. Die spektakulären Felsformationen laden nicht nur zum Baden und Schnorcheln, sondern auch zum Klettern und Erkunden ein.',
          },
          {
            name: 'Gorda Sound – Bitter End Club, Saba Rock & Leverick Bay',
            text: 'Die Region rund um den Bitter End Yacht Club und das exklusive Saba Rock Resort gehört zu den schönsten Anlaufpunkten der Route. Eine perfekte Kombination aus erstklassiger Infrastruktur und idyllischer Umgebung macht diesen Ort zum Highlight jeder Segelreise.\nIn der Leverick Bay Marina lassen sich Vorräte auffüllen und ein exzellentes Dinner genießen. Ein besonderes Erlebnis ist die berühmte Piraten-Show „Aaarh!“, die ein Stück Seefahrer-Geschichte lebendig werden lässt.',
          },
          {
            name: 'Anegada – Die Koralleninsel der BVIs',
            text: 'Anegada ist die einzige Insel des Archipels mit korallinem Ursprung und begeistert mit einzigartiger Flora und Fauna. Im Anegada Reef Resort werden fangfrische Hummer-Spezialitäten serviert. Ein weiteres Highlight ist die hier ansässige Flamingo-Population, die sich bei einer Inseltour beobachten lässt.',
          },
          {
            name: 'Cane Garden Bay – Das Surferparadies von Tortola',
            text: 'Diese Bucht ist bekannt für ihre perfekten Surfbedingungen. Selbst wer nicht selbst auf das Brett steigt, wird von den spektakulären Wellen und den Surfern in Aktion begeistert sein. Der flach abfallende Sandstrand lädt zum Entspannen ein, während karibische Strandbars für kühle Getränke sorgen.',
          },
          {
            name: 'Jost Van Dyke – Die Partyinsel der Karibik',
            text: 'Diese Insel ist berühmt für ihre legendären Strandpartys. Besonders bekannt sind die Bars Soggy Dollar und Foxy’s, die rund um die Uhr für ausgelassene Stimmung sorgen. Beim Soggy Dollar bestellen Gäste traditionell ihren Painkiller-Cocktail mit nassen Dollarscheinen, die sie zuvor im Meer getragen haben.',
          },
          {
            name: 'Sandy Cay & Sandy Spit – Postkartenmotive zum Greifen nah',
            text: 'Diese kleinen Inseln gehören zu den malerischsten Orten der Britischen Jungferninseln. Das flache, türkisblaue Wasser lädt zum Schnorcheln ein, während die einsamen Strände und schattigen Palmenplätze ein perfektes Karibik-Feeling vermitteln.',
          },
        ],
      },
    ],
    accommodations: [
      {
        title: 'Ihre Yacht als Unterkunft',
        paragraphs: [
          'Unsere Yachten bestehen aus einem komfortablen Innenraum mit vollwertiger Küche, geräumigem Esstisch, größzügigen Doppelbettkabinen sowie Innennassräumen mit Dusche und WC. Das Außencockpit besticht mit Esstisch, Relaxbereich sowie Badeplattform mit Außendusche. Und wie immer gilt bei Yacht-Urlaub: Der Salon bleibt frei zur Verfügung für alle!',
        ],
        layouts: [],
        link: { label: 'Mehr Details zu Yachten', to: '/yachten' },
      },
    ],
    arrival: {
      heading: 'Anreise',
      paragraphs: [
        'Road Town auf der Insel Tortola wird bequem per Flugzeug (EIS - Beef Island) angeflogen. Sie können auch auf St. Thomas (STT) auf den amerikansichen Jungferninseln landen und dann mit der Fähre nach Tortola übersetzen. Fragen Sie uns für Details. Wir helfen gerne bei der Planung!',
      ],
    },
    hints: [
      'Die Währung in den britischen Jungferninseln ist US-Dollar: €1 ~ $1,1. Heben Sie das Geld am Besten vor Ort ab. Es gibt ausreichend Geldautomaten.',
      'Nicht im Basispreis inkludiert sind Endreinigung (ab €200,- pro Yacht), Spritverbrauch, fakultative Ausflüge, Anlegegebühren außerhalb des Heimathafens, persönliche Ausgaben und Reiseversicherungen, lokale Touristentaxen sowie Trinkgelder jeglicher Art.',
      'Skipper wird von der Bordkassa mitverpflegt.',
      'Für das Einkaufen stehen ausgezeichnet ausgestattete Supermärkte zur Verfügung.',
      'Sie benötigen als EU-Bürger einen noch 6 Monate gültigen Reisepass bei der Ausreise.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        label: 'für 7 Tage',
        base: '950',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer zur Durchführung: 4 Personen (6 für Katamarane). Für Einzelreisende oder 2 Personen: Mitsegler in der Yacht-Urlaub Törnbörse finden oder Kabinenangebote ansehen. Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Cruising Tax BVI ($6,- pro Person und Tag), National Parks Gebühren ($25-$35 pro Woche), sowie VISAR ($2,- pro Person) sind vor Ort direkt zu entrichten',
          '***Sprit nach Verbrauch und Endreinigung (€200,- pro Yacht) sind alternativ von der Bordkassa zu zahlen.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '50', details: ['inkludiert den Spritverbrauch***'] },
          { name: 'Comfort-Package', price: '80', details: ['Dinghymotor***', 'WLAN an Bord', 'Bettleinen', 'Endreinigung***'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '299', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '499', details: ['inkl. Frühstück und Mittagssnack'] },
          { name: 'Einzelkabine', price: '400', details: ['Einzelbelegung'] },
          { name: 'Katamaran-Upgrade', price: '500', details: ['Upgrade zu einem Katamaran - auf Anfrage'] },
        ],
      },
      {
        label: 'für 14 Tage',
        base: '1500',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer zur Durchführung: 4 Personen (6 für Katamarane). Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Cruising Tax BVI ($6,- pro Person und Tag), National Parks Gebühren ($25-$35 pro Woche), sowie VISAR ($2,- pro Person) sind vor Ort direkt zu entrichten',
          '***Sprit nach Verbrauch und Endreinigung (€200,- pro Yacht) sind alternativ von der Bordkassa zu zahlen.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '60', details: ['inkludiert den Spritverbrauch***'] },
          { name: 'Comfort-Package', price: '80', details: ['Außenbootmotor', 'WLAN an Bord', 'Bettleinen', 'Endreinigung***'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '399', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '699', details: ['inkl. Frühstück und Mittagssnack'] },
          { name: 'Einzelkabine', price: '800', details: ['Einzelbelegung'] },
          { name: 'Katamaran-Upgrade', price: '900', details: ['Upgrade zum Katamaran - auf Anfrage'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/Karibik-BVI/gallery/relaxing-auf-sandy-cay-bei-yacht-urlaub (2).jpg', alt: 'Relaxing auf Sandy Cay' },
      { src: '/images/packages/Karibik-BVI/gallery/1495014128.jpg', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/Indians.jpg', alt: 'The Indians' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_1149_279.png', alt: 'Segeln in der Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_1180_309.png', alt: 'Segeln in der Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg', alt: 'Sandy Cay' },
      { src: '/images/packages/Karibik-BVI/gallery/14950141218.jpg', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/Willie Ts.png', alt: 'Willy T’s' },
      { src: '/images/packages/Karibik-BVI/gallery/Willy_T_T-Shirt.jpg', alt: 'Willy T T-Shirt' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_0353_695.png', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_0436_774.png', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_0889_150.png', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_0905_1234.png', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_0927_1256.png', alt: 'Karibik' },
      { src: '/images/packages/Karibik-BVI/gallery/DSC_1014_144.png', alt: 'Karibik' },
    ],
  },

  // ─────────────────────────────────── GRIECHENLAND ───────────────────────────────────
  {
    id: 'griechenland',
    title: 'Segeln in Griechenland',
    subtitle: 'Auswahl aus 4 Routen für einen Segelurlaub in der Ägäis oder im Ionischen Meer',
    cardImg: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
    heroImg: '/images/packages/Griechenland/gallery/Greece_Sunset_header.webp',
    price: '690',
    tags: ['Freunde', 'Familie', 'Entdecker'],
    country: 'Griechenland',
    included: [
      'alle Nächtigungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'fixe Route mit Häfen und Buchten',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7, 10 oder 14 Tage',
      'ideal für Reisegruppen mit 4 - 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route:
      'In der Ägäis:\nRoute A1 (für Fortgeschrittene): Lavrion – Kea – Kythnos – Syros – Serifos – Sifnos (als Option bzw. bei 14 Tage: Mykonos/Paros/Naxos/Milos)\nRoute A2 (für Einsteiger): Athen – Egina – Poros – Hydra – Dokos – Spetses (– Porto Cheli)\nRoute B: Kos – Kalimnos – Leros – Lipsi – Patmos oder Rhodos – Symi – Tilos – Nisiros\n\nIm ionischen Meer:\nRoute C: Lefkas – Lakka – Parga – Ithaka – Kefalonia – Zakynthos (bei Wunsch Option ab Corfu – Gaios (Paxos) – Plataria – Syvota od. 14 Tage)',
    routeMaps: [
      { src: '/images/packages/Griechenland/Griechenland_Route_A_v3.4_mit_Legende.png', caption: 'Route A (Kykladen / Saronischer Golf)' },
      { src: '/images/packages/Griechenland/Griechenland_Route_B_v3.3_mit_Legende.png', caption: 'Route B (Dodekanes)' },
      { src: '/images/packages/Griechenland/Griechenland_RouteC_v1.3_mit Legende.png', caption: 'Route C (Ionisches Meer)' },
    ],
    detailSections: [
      {
        heading: 'Packagebeschreibung',
        intro:
          'Unser Griechenland-Package umfasst 3 Routen. Route A und B finden in der Ägäis statt. Die Route C hingegen im ionischen Meer, wo Sie gemäßigtere Bedingungen vorfinden. Egal für welche Route Sie sich letztendlich entscheiden: Der griechischen Leichtigkeit und Gastfreundlichkeit werden Sie überall begnegen. Unsere Stammgäste wissen: Griechenland lässt sich nicht in einem Urlaub erkunden. Selbst Erfahrene Griechenland-Urlauber finden immer wieder neue Flecken. Lassen Sie sich von Wind und Wellen und heimischen Kultur treiben, dann sind Sie hier richtig!',
        stops: [],
      },
      {
        heading: 'Details zur Route A1 ab Lavrion',
        intro:
          'Die Route A führt Sie in die Kykladen, vorbei an typisch griechische Inseln, wo nur Einheimische Ihren Urlaub verbringen. Lassen Sie sich von der Landschaft der Ägäis faszinieren. Entdecken Sie die griechische Leichtigkeit. Wir bringen Sie zu entlegenen Buchten, einsamen Sandstränden und typisch ursprüngliche Tavernen, wo Sie noch mit dem Wirt persönlich bei einem Glas Wein Geschichten austauschen können.',
        stops: [
          {
            name: 'Athen',
            text: 'In der griechischen Hauptstadt stehen die Erbgüter vergangener Tage im Vordergrund. Zu bestaunen gibt es hier die berühmte Akropolis, den Syntagma-Platz, die alte Universität, die Akademie und die Nationalbibliothek. Besucht man das Olympiastadion, gibt es die praktische Möglichkeit in das nicht weit entfernte Einkaufszentrum zu gehen, in die große Mall Athens. Die Stadt der Götter bietet außerdem den idealen Einstieg in das typisch griechische Nachtleben mit belebten Restaurants, einladenden Bars und gemütlichen Musiktavernen.',
          },
          {
            name: 'Lavrion',
            text: 'Die Hafenstadt Lavrion bietet alles, was das Seglerherz begehrt. Man kann hier wunderbar schnorcheln, tauchen, schwimmen, bummeln, speisen und feiern. Zu besichtigen sind der Hafen, der Fischmarkt sowie ein riesiges Bergbaugebiet.',
          },
          {
            name: 'Kea',
            text: 'Die erste Station des Inselhoppings führt uns nach Kea. Vor der Küste dieser Insel liegt das Wrack des Schwesternschiffs der berühmten Titanic – die Britannic. Sie wurde während des Ersten Weltkrieges hier versenkt und kann unter Wasser bestaunt werden. Auf Kea findet man etwas Ruhe, da hier der Tourismus weniger fortgeschritten ist. Nichts desto trotz kann man einigen Wassersportarten nachgehen, und auch für Fischer ist Kea einen Stop wert.',
          },
          {
            name: 'Syros',
            text: 'Diese Insel ist eine Perle der griechischen Kultur. Die kleinen Ortschaften haben ihren traditionellen Charakter beibehalten, dennoch können Sie von erstklassigen Restaurants bis hin zu einer anregenden Abendunterhaltung alles finden. Sogar ein Casino kann hier besucht werden. Die zahlreichen Höhlen und naturbelassenen Strände laden zum Erkunden und Verweilen ein.',
          },
          {
            name: 'Mykonos',
            text: 'Die Insel Mykonos ist zwar als Partyinsel bekannt, bietet allerdings durchaus ein romantisches wie verträumtes Ambiente. Wie auf einem Postkartenmotiv erstrecken sich weiße, quaderförmige Häuser und malerische Straßen über die kleinen Dörfer. Windmühlen, kleine Kirchen und eine atemberaubende Landschaft bieten unvergleichliche Fotomotive. Wer gerne möchte, kann sich natürlich ins Partyleben stürzen und eine Flasche Sekt oder einen Aperol zum Sonnenuntergang genießen.',
          },
          {
            name: 'Naxos',
            text: 'Ein weißer Strand, uralte Ruinen, Museen und eine wunderschöne Altstadt erwarten Sie auf Naxos. Die Insel lädt zu einem ausgiebigen Wanderausflug ein und lässt in Sachen Kultur und Geschichte nichts aus. Ein historisches Burgenviertel, welches von der Eroberung durch die Venezianer zeugt, sowie ein gewaltiges Portal eines nicht fertig gestellten Tempels sind nur zwei von vielen Sehenswürdigkeiten, die Sie auf Naxos besichtigen können. Wer sich sportlich betätigen will, kann sich ebenso beim Surfen beweisen.',
          },
          {
            name: 'Paros',
            text: 'Auf Paros lässt sich die traditionelle, griechische Atmosphäre miterleben. Doch obwohl der Eindruck entsteht, die Zeit sei auf dieser Insel stehen geblieben, ergeben sich auch hier zahlreiche Möglichkeiten einer vielschichtigen Freizeitgestaltung. Neben Radfahren, Kytesurfing und dem Besuch von Wasserparks kann man weite Sandstrände sowie umschlossene Sandbuchten finden.',
          },
          {
            name: 'Milos',
            text: 'Durch vergangene vulkanische Begebenheiten haben sich auf Milos unterschiedliche Erscheinungsbilder der Strände ergeben, die nicht abwechslungsreicher sein könnten. Vom Fels- und Kies- bis zum Sandstrand lässt sich hier ein spannender Badetag verbringen. Ademes ist das größere Dorf auf Milos und bietet eine gute Infrastruktur sowie reges Leben bei Tag wie bei Nacht, während man in Pollonia eine ruhigere Atmosphäre vorfindet.',
          },
          {
            name: 'Kythnos',
            text: 'Kythnos beherbergt zahlreiche Weingärten, heilende Quellen und ruhige, aber moderne Dörfer. Es bietet wie gewohnt viel Leben bei Nacht und eine gute Küche. Nicht zu versäumen ist hierbei der Käse aus regionaler Produktion. Untertags laufen wir eine schöne Sandstrandbucht an, am Abend geht es dann in einen geschützten typisch-griechischen Hafen.',
          },
        ],
      },
      {
        heading: 'Details zur Route A2 ab Athen',
        stops: [
          {
            name: 'Athen',
            text: 'Die Reise beginnt in der historischen Metropole Athen, wo sich Moderne und Antike vereinen. Nutzen Sie die Gelegenheit, um die Akropolis und die lebendigen Straßen von Plaka zu erkunden, bevor Sie in See stechen. Der Hafen von Athen bietet eine perfekte Ausgangsbasis für Ihre Segeltour durch den Saronischen Golf.',
          },
          {
            name: 'Ägina',
            text: 'Die erste Station ist die Insel Ägina, berühmt für ihre Pistazien und den antiken Aphaia-Tempel. Entspannen Sie an einem der schönen Strände oder schlendern Sie durch das charmante Städtchen. Hier können Sie die typische griechische Gastfreundschaft genießen und sich in lokalen Tavernen kulinarisch verwöhnen lassen.',
          },
          {
            name: 'Poros',
            text: 'Weiter geht es zur Insel Poros, die durch einen schmalen Kanal von der Peloponnes getrennt ist. Die Stadt Poros beeindruckt mit ihrer malerischen Uferpromenade und den traditionellen weißen Häusern. Ein Spaziergang zum Uhrturm der Insel bietet Ihnen einen herrlichen Ausblick über den Hafen und die umliegenden Buchten.',
          },
          {
            name: 'Hydra',
            text: 'Hydra ist eine autofreie Insel, deren malerische Architektur und unberührte Natur Besucher in ihren Bann zieht. Die engen, steingepflasterten Gassen und die vielen Kunstgalerien verleihen Hydra einen einzigartigen Charme. Genießen Sie einen entspannten Nachmittag bei einem Spaziergang oder in einem der Cafés direkt am Wasser.',
          },
          {
            name: 'Dokos',
            text: 'Die unbewohnte Insel Dokos ist ein idyllischer Ort für eine ruhige Nacht vor Anker. Diese abgeschiedene Insel bietet kristallklares Wasser und eine ruhige Atmosphäre, perfekt zum Schwimmen und Schnorcheln. Hier erleben Sie die Natur Griechenlands in ihrer ursprünglichsten Form.',
          },
          {
            name: 'Spetses',
            text: 'Die elegante Insel Spetses ist bekannt für ihre neoklassizistische Architektur und ihre reiche maritime Geschichte. Die lebendige Hafenpromenade lädt zum Flanieren ein, und in den zahlreichen Tavernen können Sie fangfrischen Fisch genießen. Spetses ist ein idealer Ort, um den Tag in stilvollem Ambiente ausklingen zu lassen.',
          },
          {
            name: 'Optional: Porto Cheli',
            text: 'Auf Wunsch, oder wenn es das Wetter zulässt, können Sie Ihre Route um Porto Cheli erweitern, eine lebhafte Küstenstadt auf dem Festland. Mit einer modernen Marina und vielen Freizeitmöglichkeiten ist Porto Cheli ein beliebtes Ziel für Segler und bietet eine ausgezeichnete Infrastruktur für Wassersportler.',
          },
        ],
      },
      {
        heading: 'Details zur Route B ab Kos od. Rhodos',
        intro:
          'Die Route im Dodekanes bietet perfektes Inselhopping und dabei die Küche und Lokalitäten der Griechen kennenlernen. Als Startpunkt zählt Kos, wo wir sowohl Richtung den Norden als auch gen Süden unsere Tour starten können - wetterabhängig. Weit weg von Maßentourismus können Sie diese traumhafte Inseln entdecken.',
        stops: [
          {
            name: 'Kos',
            text: 'Kos ist die drittgrößte der Dodekanes Inseln und dürfte den meisten schon mal zu Ohren gekommen sein. Aufgrund ihrer sehr länglichen Form spielt sich hier viel in Küstennähe ab und lässt dadurch ein pures Urlaubsgefühl aufkommen. Wem die insgesamt 20 km Strandlänge nicht als Grund für einen Besuch ausreichen, der wird spätestens beim Bummeln durch die entzückenden Boutiquen oder bei einem Erfrischungsgetränk in den kleinen Tavernen überzeugt sein, die richtige Wahl getroffen zu haben. Hier bleibt nur zu raten: mischen Sie sich unter das Volk und erleben Sie die griechische Lebensmentalität in vollen Zügen!',
          },
          {
            name: 'Rhodos',
            text: 'Weiß strahlende Hauser, türkisblaues Meer und malerische Küsten – die griechische Insel Rhodos ist für viele der Inbegriff eines Urlaubsparadieses. Hier warten nicht nur traumhafte Strände auf Sie, sondern zudem kulturelle Vielfalt und Gastfreundlichkeit. Wer den Spuren der Zeit nachgehen möchte, kann hier antike Ruinen und Bauwerke aus der Zeit der Besatzung durch die Ritter des Johanniterordens während der Kreuzzüge bewundern. In der Altstadt Rhodos finden sich darüber hinaus die mittelalterliche Ritterstraße sowie der festungsartige Großmeisterpalast. Bekannt unter dem Namen „Sonneninsel“ der Ägäis, können Sie hier fast ganzjährig mit strahlendem Sonnenschein und sommerlichen Temperaturen rechnen. Als größte der griechischen Dodekanes-Inseln bietet sie gleichermaßen für Erholungssuchende, Abenteurer oder aber auch Genießer genau das Richtige.',
          },
          {
            name: 'Symi',
            text: 'Symi befindet sich rund 9 km westlich des türkischen Festlandes und knapp 23 km nördlich der Insel Rhodos. Mit farbenfrohen Häusern entlang der Küste und insgesamt 364 Klöstern und Kapellen hat Symi einiges zu bieten. Das wohl bedeutendste Kloster ist das Panormitis, welches dem heiligen Michael geweiht ist und ein Museum beherbergt. Bis zum Ende des 19. Jahrhunderts waren vor allem der Schiffsbau und die Schwammtaucherei von großer Bedeutung. Tauchen Sie hier also mal in die Tiefe und halten Sie die Augen offen!',
          },
          {
            name: 'Tilos',
            text: 'Die kleine und romantische Insel Tilos bezaubert nicht nur die Besucher, sondern wird als eine Quelle der Inspiration für Poeten und Maler bezeichnet. Unberührte Natur, Hügel und Täler mit sprudelnden Quellen sowie seltene Vogelarten und ein lebhaftes Meeresleben machen die Insel zu einen Naturpark, der durch internationale Verträge geschützt wird. Ebenso befinden sich hier einmalige kulturelle Schätze, darunter byzantinische Monumente, mittelalterliche Befestigungen, Höhlen und Kirchen. Genießen Sie hier einen Moment der Stille und vergessen Sie Ihre Sorgen.',
          },
          {
            name: 'Mandraki',
            text: 'Mandraki ist der Hauptort der Vulkaninsel Nisyros und liegt an der Nordküste gleich neben dem Hafen. Trotz ihrer kleinen Größe besitzt die Insel ein spektakuläres Alleinstellungsmerkmal: den Krater in der Caldera. Im 19. bis hin ins 20. Jahrhundert ist auf der Insel Schwefel zur Gewinnung von Schwefelsäure als wichtige Grundchemikalie in größerem Stil abgebaut worden. Heute ist der Krater am Südende der Caldera vor allem eine touristische Attraktion, aber nicht ausschließlich, denn der Vulkan ist nach wie vor aktiv und wird deshalb seit dem Jahr 2000 geophysikalisch überwacht.',
          },
          {
            name: 'Kalymnos',
            text: 'Die bergige Insel Kalymnos ist ein großartiger Ort für Entdecker. Idyllische Badebuchten, die in das tiefblaue Meer führen, sowie bizarre Grotten und aufragende Kalkfelsen laden die Inselbesucher förmlich zu einer Erkundungstour ein. Verweilen Sie hier an einem der schönen Sand- und Kieselstrände oder gehen Sie auf eine Klettertour und genießen Sie den atemberaubenden Ausblick!',
          },
          {
            name: 'Leros',
            text: 'Leros – auch genannt die Insel der Artemis – ist ein kleines Paradies, in dem sich insbesondere Naturliebhaber wohlfühlen werden. Unberührte Orte, bedeckt von Kiefern, Eukalyptusbäumen, Eichen und Olivenhainen machen die Insel zu einer grünen Oase für Erholungssuchende. Ein eindrucksvolles Highlight der Insel ist die von den Johannitern erbaute imposante Festung aus dem 14.Jahrhundert.',
          },
          {
            name: 'Lipsi',
            text: 'Lipsi ist ein kleiner Landstreifen, der von 24 Inselchen umgeben ist. An diesem Ort geht kein Tag vorbei, ohne dass man etwas Neues und Faszinierendes entdeckt. Durchfahren Sie die türkisblauen Meeresengen und erforschen Sie die lebhafte Fauna und Flora des Gebiets. Tauchen Sie unter Wasser und bestaunen Sie den bunten Meeresboden, entdecken Sie versteckte Buchten und Höhlenformationen oder legen Sie an einem der zahlreichen Strände an. Wenn Sie Glück haben, werden Sie dabei von einem Delphin begleitet!',
          },
          {
            name: 'Patmos',
            text: 'Obwohl Patmos eine sehr kleine Insel der Inselgruppe Dodekanes ist, ist sie dennoch eine der bedeutendsten der Ägäis. Auf ihr ist eines der wichtigsten Klöster der griechisch-orthodoxen Kirchen beheimatet und dient daher als Ziel für viele Pilgerreisende. Der Ort gilt als Schöpfungsort der Offenbarung des Johannes. Durch die hügelige Struktur der Insel können zudem einige traumhafte Aussichtspunkte besucht werden. Die zerklüftete Küste bietet darüber hinaus eine Vielzahl von kleinen Buchten, in denen man ankern kann, um die Umgebung zu erforschen.',
          },
        ],
      },
      {
        heading: 'Details zur Route C ab Corfu od. Lefkas',
        intro:
          'Während die Routen A und B in der Ägäis eher für schon erfahrene Gäste geeignet sind, findet man im ionischen Meer gemäßigte Bedingungen vor. Perfekt für einen ruhigeren Bade- und Erholungsurlaub.',
        stops: [
          {
            name: 'Korfu',
            text: 'Die Stadt Korfu, auch Kérkyra genannt, liegt auf der gleichnamigen Insel Korfu und galt schon zu Zeiten der Monarchie als beliebtes Urlaubsziel. Korfu hat eine belebte Geschichte. Als Teil des römischen Reiches und unter der Herrschaft der Venezianer, unterbrochen von osmanischen Belagerungen, war Korfu Hauptstadt der Ionischen Inselrepublik. Erst seit 1864 gehört sie zu Griechenland und ist seit 2007 Teil des UNESCO Weltkulturerbes. Wie Sie vielleicht bereits vermuten, hier gibt es viel zu entdecken! Von der alten Festung über die geschichtsträchtige Altstadt bis hin zum Artemistempel und der neuen Festung. Um einen Segeltörn in das Ionische Meer zu starten, gibt es keinen besseren Start- und Endpunkt.',
          },
          {
            name: 'Gaios (Paxos)',
            text: 'Gaios ist der Hauptort der Insel Paxos und gleichzeitig das Zentrum der Kunst und Kultur von Paxos. Die griechische Insel ist eine der wenigen, die nicht von den Türken besetzt war. Das malerische Städtchen liegt in einer Bucht mit zwei vorgelagerten Inseln. Es bietet einen angenehmen Plateia (Stadtplatz), enge Gassen und ist insbesondere für Tagesausflüge bei Touristen beliebt.',
          },
          {
            name: 'Lakka (Paxos)',
            text: 'Lakka ist das Pendant zu Gaios auf Paxos. Hier wird in der seichten Bucht geankert und geschnorchelt, manche üben sich auch im Fischen. Das traditionelle Fischerdorf ist weitgehend Autofrei, bietet herrliche Tavernen, ebenso wie gute Einkaufsmöglichkeiten. Nicht umsonst ist hier eine der beliebtesten Buchten im ionischen Meer.',
          },
          {
            name: 'Lefkas',
            text: 'Die Insel Lefkas oder auch Lefkada genannt, ist mit einer Brücke direkt mit dem Festland verbunden und bietet einen alternativen Ausgangspunkt für einen Segelurlaub im ionischen Meer. Aber auch als Zwischenstopp hat Lefkas seinen Reiz, denn der große Massentourismus ist woanders zu finden. Die eng stehenden Häuser rund um den Spyridon Platz sind bunt und verleihen der Stadt einen sehr lebhaften Ausdruck.',
          },
          {
            name: 'Parga',
            text: 'Die Stadt Parga hat eine ähnlich durchlebte Vergangenheit wie Korfu. Hier regierten die Byzantiner, Venezianer, Osmanen und sogar die Engländer und Italiener. Erst 1913 kam Parga zu Griechenland. Spektakuläres Highlight ist die im Jahr 1570 errichtete venezianische Festung, die hoch über der Bucht einen grandiosen Ausblick bietet. Aber auch die engen Gassen mit den unzähligen kleinen Bars und Tavernen machen Parga zu einer Attraktion auf dieser Route.',
          },
          {
            name: 'Ithaka',
            text: 'Obwohl die Insel Ithaka mit seinen 3000 Einwohnern eine der kleinsten im ionischen Meer vor der Westküste Griechenlands ist, ist sie dennoch wohl eine der berühmtesten. Die rund 2800 Jahre alten Werke „Ilias“ und „Odyssee“ von Homer haben diesen grünen Ort zum literarischen Denkmal gemacht. Wandern auch Sie auf den Spuren von Odysseus und entdecken Sie dabei die sagenumwobene Arethusa Quelle oder erforschen Sie die Nymphen-Grotte. Machen Sie Halt auf dem Platia von Stavros und schießen Sie ein Foto vor dem berühmten Odysseus Denkmal. Abends laden Sie die entzückenden Strandtavernen bei einem gemütlichen Miteinander zum Ausruhen ein.',
          },
          {
            name: 'Navagio Bucht auf Kefalonia',
            text: 'Ein ganz besonderes Highlight für jedes Auge ist die Navagio Bucht auf Kefalonia. Oftmals bezeichnet als der schönste Strand Zakynthos, hält der Strand was er verspricht! Wie aus einem paradiesischen Postkartenmotiv herausgeschnitten, versteckt sich dieser Ort zwischen hohen Felswänden und gibt dem Erscheinungsbild hierdurch ein noch spektakuläreres Aussehen. Der Strand an sich besteht aus abertausenden Steinchen und ist nur von dem ihn umgebenen türkisblauem Meer zugänglich. Ebenso steht mitten am Strand ein großes hölzernes Wrack, welches wie aus einem Piratenfilm die eigene Fantasie anregt. Entdecken Sie das Geheimnis hinter dem Wrack und werden Sie selbst zum Abenteurer!',
          },
        ],
      },
    ],
    accommodations: [
      {
        ...SEGELYACHT_UNTERKUNFT,
        paragraphs: [
          'Unsere Segelyachten bestehen aus einem komfortablen Innenraum mit vollwertiger Küche, geräumigen Esstisch, größzügige Doppelbettkabinen, Innennassräume mit Dusche und WC, außen Cockpit mit Esstisch, Relaxbereich und Badeplattform mit Außendusche.',
          'Die Belegung erfolgt entsprechend den Kabinenplätzen. Der Salon bleibt frei zur Verfügung für alle!',
        ],
      },
      KATAMARAN_UNTERKUNFT,
    ],
    arrival: {
      heading: 'Anreise',
      paragraphs: [
        'Alle unsere griechischen Startmarinas sind mit dem Flugzeug durch nahegelegene Flughäfen sehr leicht zu erreichen.',
        'Route A: Flughafen Athen (ATH)',
        'Route B: Flughäfen Kos (KGS) oder Rhodos (RHO)',
        'Route C: Flughäfen Corfu (CFU) oder Preveza (PVK)',
        'Mit unseren Partnern vor Ort organisieren wir gerne auch einen Transfer direkt zu Ihrer Yacht.',
      ],
    },
    hints: [
      'In Griechenland gilt der €uro als Währung.',
      'Nicht im Basispreis inkludiert sind Endreinigung (ca. €120,- pro Yacht), Spritverbrauch, fakultative Ausflüge, Anlegegebühren, persönliche Ausgaben und Reiseversicherungen sowie Trinkgelder jeglicher Art.',
      'Skipper wird von der Bordkassa mitverpflegt.',
      'Sie benötigen einen gültigen Reisepass für Einreise und Crewliste.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        base: '690',
        baseIncludes: ['Segelyacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer zur Durchführung: 4 Personen (6 für Katamarane). Für Einzelreisende oder 2 Personen: Mitsegler in der Yacht-Urlaub Törnbörse finden oder Kabinenangebote ansehen.',
          'Ohne gebuchte ZUSATZpakete sind Endreinigung (~€200,- pro Yacht) und Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen. Die Crew wird von Bordkassa mitverpflegt.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '50', details: ['inkludiert den Spritverbrauch'] },
          { name: 'Comfort-Package', price: '50', details: ['Beibootmotor', 'WLAN an Bord', 'Bettleinen', 'Endreinigung'] },
          { name: 'Gebühren-Package', price: '100', details: ['inkludiert alle Anlegegebühren'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '250', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '399', details: ['2 Mahlzeiten am Tag (inkludiert Frühstück und Mittagssnack)', '+ Sauberkeit in der Küche / Entsorgung des Mülls'] },
          { name: 'Einzelkabine', price: '550', details: ['Einzelbelegung (buchbar im zweiten Buchungsschritt)'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/Griechenland/gallery/Mykonos.jpg', alt: 'Mykonos' },
      { src: '/images/packages/Griechenland/gallery/BlaueBucht.jpg', alt: 'Blaue Bucht' },
      { src: '/images/packages/Griechenland/gallery/Poseidon.jpg', alt: 'Poseidon-Tempel' },
      { src: '/images/packages/Griechenland/gallery/20181008_184812.jpg', alt: 'Segeln in Griechenland' },
      { src: '/images/packages/Griechenland/gallery/hydra.jpg', alt: 'Hydra' },
      { src: '/images/packages/Griechenland/gallery/Poros.jpg', alt: 'Poros' },
      { src: '/images/packages/Griechenland/gallery/bar-water.jpg', alt: 'Bar am Wasser' },
      { src: '/images/packages/Griechenland/gallery/image (87).jpg', alt: 'Segelurlaub in Griechenland' },
      { src: '/images/packages/Griechenland/gallery/Sonnenuntergang.jpg', alt: 'Sonnenuntergang' },
    ],
  },

  // ─────────────────────────────────── GRENADINEN ───────────────────────────────────
  {
    id: 'karibik-grenadinen',
    title: 'Grenadinen-Package',
    subtitle: 'Segelurlaub auf einer Segelyacht oder einem Katamaran in die Grenadinen',
    cardImg: '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg',
    heroImg: '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg',
    price: '900',
    priceNote: '7 Tage',
    tags: ['Freunde', 'Entdecker'],
    country: 'Karibik – Grenadinen',
    included: [
      'alle Übernachtungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'ortskundige Reiseleitung',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7 - 21 Tage',
      'flexible Reisedaten (täglicher Check-In / Check-Out möglich)',
      'Mindestteilnehmer: 4 Personen',
    ],
    route:
      "Startmarina St. George's / St.Vincent - Carriacou - Union Island - Mayreau - Bequia - St. Vincent - Mustique - Tobago Cays - Petite St. Vincent - St. George's / St. Vincent",
    routeMaps: [{ src: '/images/packages/Karibik-Grenadinen/Grenadinen_Route_v1.3_mit Legende.png', caption: 'Grenadinen-Route' }],
    detailSections: [
      {
        heading: 'Details zu Ihrer Route',
        intro:
          'Die Sorgen über Bord werfen, die Zehen in den Sand stecken und das Leben in vollen Zügen auskosten ist das Motto für einen Segelurlaub in den Grenadinen. Die Inselkette zwischen dem Karibischen Meer und dem Atlantik lädt mit ihren weißen Sandstränden und dem tiefblauen Wasser zum Verweilen ein. Für Abenteuer sorgt die geführte Wanderung auf den aktiven Vulkan La Soufrière. Als Erfrischung dienen die frischen Kokosnüsse direkt von der Palme und beim Segeltörn entspannen Sie in der gemütlichen Hängematte am Vordeck. Buchen Sie Ihren Traumurlaub auf unserer komfortablen Yacht und bewundern Sie jeden Tag den atemberaubenden Sonnenuntergang von einer anderen Insel aus. Das Grenadinen-Package ist für Genießer und Entdecker, die die Leichtigkeit der Karibik in vollen Zügen erleben möchten und auch auf den Spuren so mancher Piraten ☠️ aus Fiktion und der Geschichte wandeln wollen.',
        stops: [
          {
            name: "Saint George's (Grenada)",
            text: 'Die Hauptstadt von Grenada liegt im Südwesten der karibischen Insel und dient als Ausgangspunkt. Bevor es losgeht, kann die schöne Altstadt mit dem Fort George besichtigt werden. Der Ort bietet auch sehr gute Möglichkeiten zum Einkaufen für den bevorstehenden Törn. Landausflüge lassen sich von hier aus ebenfalls mit dem Taxi oder dem eigenen Mietauto organisieren.',
          },
          {
            name: 'Blue Lagoon (St. Vincent)',
            text: 'An der Südseite von St. Vincent befindet sich die Blue Lagoon. Die nette Marina bietet den idealen Ausgangspunkt für unseren Törn. Die einzigartigen schwarzen Sandstrände und die unglaubliche Vegetation lockte vor Jahren sogar Hollywood an. Auf St. Vincent wurden einige Szenen für Fluch der Karibik ☠️ gedreht und wir kennen sogar den einzigen Einheimischen der Insel, der bei Fluch der Karibik mitspielen durfte. Ein absolutes Highlight ist die Vulkantour auf den Soufriere mit unserem Guide. Alleine die Fahrt nach Norden ist schon ein Abenteuer für sich. Die Wanderung auf den Vulkan führt anfangs durch den Dschungel und dann weiter über Lavagestein bis zum großen Krater des Vulkans. Nach dem großen Abenteuer und 3h Wanderung haben wir uns etwas zu Essen verdient und dann geht es ab zum Strand.',
          },
          {
            name: 'Tyrrel Bay (Carriacou)',
            text: 'Auf der Insel Carriacou ist auf der Westseite die vom Passatwind gut geschützte Tyrrel Bay, wo wir erstmals ausklarieren (abmelden von Hoheitsgebiet Grenada). Die Bucht bietet den typischen karibischen Scharm mit kleinen Bars und netten Restaurants.',
          },
          {
            name: 'Sandy Island',
            text: 'Einen kurzen Badestopp auf Sandy Island sollte man auf alle Fälle einplanen. Weißer Sandstrand, Palmen mit Kokosnüssen, glasklares Wasser – einfach "welcome in the caribbean".',
          },
          {
            name: 'Clifton (Union Island)',
            text: 'Die kleine Stadt auf der Südwestseite von Union Island bietet eine der wenigen Marinas auf der Tour. Hier müssen wir wieder einklarieren, denn wir sind jetzt im Staatsgebiet von „St. Vincent and the Grenadines“. Pünktlich um 17:00 Uhr beginnt die Happy Hour im Anchorage Yacht Club, wo standesgemäß Rumpunsch serviert wird. Auch hier bekommt man sofort die Freundlichkeit und den Spirit der einheimischen Bevölkerung zu spüren. Die typisch karibische Steel Drum Band bei Lambi gehört genauso dazu, wie frischer Fisch vom Grill.',
          },
          {
            name: 'Salt Whistle Bay (Mayreau)',
            text: 'Die Bucht ist wohl einer der schönsten Plätze der Tour – weißer Sandstrand, Palmen – und über den schmalen Sandstrand sieht man Richtung Tobago Cays. Hier bietet sich die erste gute Möglichkeit ein Lobster Dinner zu genießen und danach gehts zum Feiern in die "last bar before jungle".',
          },
          {
            name: 'Admiralty Bay (Bequia)',
            text: "Vor Port Elizabeth, wird geankert, danach gehts mit dem Dinghy zum Steg um die Stadt zu erkunden und Vorräte aufzufüllen. Einst nutzte auch Edward Teach, besser bekannt als 'Blackbeard ☠️', diesen Hafen als strategischen Stützpunkt und zum Aufrüsten seiner zuvor gekaperten La Concorde. Am Abend wird gemütlich in der Hängematte am Vordeck relaxed oder an Land ein Cocktail geschlürft und die karibische Abendstimmung eingefangen.",
          },
          {
            name: 'Byahaut Point (St. Vincent)',
            text: 'Der absolute Geheimtipp ist die Bucht bei Byahaut Point: anlegen an der einzigen Boje oder per Anker mit Landleine. Am einsamen schwarzen Sandstrand wohnt ein Einheimischer alleine in seiner Hütte. Sobald er uns sieht, kommt er mit seinem Surfbrett angepaddelt. Es gibt frische Kokosnüsse von seinem eigenen Baum und am Abend ein großes Lagerfeuer. Und am liebsten alles im Tausch gegen große Batterien oder Lebensmittel. Ein bisschen Trinkgeld müssen wir ihm fast immer aufdrängen.',
          },
          {
            name: 'Mustique',
            text: 'Ein Abstecher nach Mustique sollte man auf alle Fälle machen. Mustique ist eine private Insel für die High Society. Jeder, der es sich leisten kann, kauft sich hier ein Haus. Wir legen uns einfach an eine Boje, genießen den Strand, und am Abend gibts dann Sundowner im Restaurant mit Blick auf unsere Yacht und das Meer.',
          },
          {
            name: 'Petite Tabac',
            text: 'Why is the rum gone? Auf Petite Tabac wurden Elisabeth und Capain Jack Sparrow ☠️ im Film Fluch der Karibik ausgesetzt. Alleine deswegen muss man einmal auf Petite Tabac gewesen sein.',
          },
          {
            name: 'Tobago Cays',
            text: 'Die Tobago Cays sind das absolute Highlight des Törns. Daher sollte man hier auch 2 Tage einplanen. Lobster Dinner am Strand, schnorcheln am Riff, die kleinen Inseln erkunden oder einfach nur das Leben genießen. Mit Schildkröten und Rochen um die Wette schwimmen und die Fische beobachten. Karibik pur - Einfach herrlich!',
          },
          {
            name: 'Palm Island',
            text: 'Der wohl weißeste Sand der ganzen Karibik ist auf der kleinen Insel Palm Island zu finden. Ein kurzer Stopp lohnt sich alle mal.',
          },
          {
            name: 'Petite St. Vincent',
            text: 'Ankern direkt vor der Bar und dann die Insel erkunden und wieder den Sonnenuntergang mit einem Rum-Punch in der Hand genießen.',
          },
          {
            name: "St. George's (Grenada)",
            text: 'Und wieder zurück nach Grenada. Vielleicht hat man bei der Heimfahrt noch Glück und erwischt einen Schwarm Barakudas. Unser Rekord liegt bei 7 gefangenen Fischen: 5 Barakudas, 1 Maimei und 1 Tuna.',
          },
        ],
      },
    ],
    accommodations: [
      {
        title: 'Unsere Yachten',
        paragraphs: [
          'Unsere Yachten bestehen aus einem komfortablen Innenraum mit vollwertiger Küche, geräumigen Esstisch, größzügige Doppelbettkabinen, Innennassräume mit Dusche und WC, außen Cockpit mit Esstisch, Relaxbereich und Badeplattform mit Außendusche.',
        ],
        layouts: [],
        link: { label: 'Mehr Details zu Yachten', to: '/yachten' },
      },
    ],
    arrival: {
      heading: 'Anreise',
      paragraphs: [
        'Grenada (GND) oder St. Vincent (SVD) können bequem per Flugzeug von verschiedenen Destinationen Europas angeflogen werden.',
      ],
    },
    hints: [
      'Die Währung in Grenada bzw. in St. Vincent und den Grenadinen ist der ostkaribische Dollar (1 EC$ ~ € 0,33)',
      'Nicht im Basispreis inkludiert sind Endreinigung, Spritverbrauch, fakultative Ausflüge, Anlegegebühren, persönliche Ausgaben sowie Trinkgelder jeglicher Art. Dies kann tlw. durch Buchung div. Pauschalen (Comfort-Package, Spritpauschale,...) abgedeckt werden.',
      'Der Yacht-Urlaub Skipper wird von der Bordkassa mitverpflegt.',
      'Sie benötigen einen gültigen Reisepass für die Einreise.',
      'Wir empfehlen den Abschluss einer Reiseversicherung und beraten Sie gerne.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        label: 'für 7 Tage',
        base: '900',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer: 4 Personen. (Für Einzelreisende und Kleinstgruppen: Mitsegler in der Yacht-Urlaub Törnbörse finden) Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Ohne gebuchte ZUSATZpakete sind Endreinigung (~€150,- pro Yacht) und Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '60', details: ['inkludiert den Spritverbrauch'] },
          { name: 'Comfort-Package', price: '50', details: ['Dinghymotor', 'WLAN an Bord', 'Bettleinen', 'Endreinigung'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '299', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '390', details: ['inkl. Frühstück und Mittagssnack'] },
          { name: 'Einzelkabine', price: '400', details: ['Einzelbelegung'] },
        ],
      },
      {
        label: 'für 14 Tage',
        base: '1500',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '*Mindestteilnehmer: 4 Personen. Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Ohne gebuchte ZUSATZpakete sind Endreinigung (~€150,- pro Yacht) und Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '60', details: ['inkludiert den Spritverbrauch'] },
          { name: 'Comfort-Package', price: '100', details: ['Beibootmotor', 'WLAN an Bord', 'Bettwäsche', 'Endreinigung'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '598', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '780', details: ['inkl. Frühstück und Mittagssnack'] },
          { name: 'Einzelkabine', price: '800', details: ['Einzelbelegung'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg', alt: 'Tobago Cays' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/Kat_overfly.png', alt: 'Katamaran von oben' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/IMG_6907B.JPG', alt: 'Segelurlaub in den Grenadinen' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/sundowner.jpg', alt: 'Sundowner' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/Lobster_tobago.jpg', alt: 'Lobster Dinner' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/SandyIsland.jpg', alt: 'Sandy Island' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/Wallilabou2.jpg', alt: 'Wallilabou' },
      { src: '/images/packages/Karibik-Grenadinen/gallery/Wallilabou1.jpg', alt: 'Wallilabou' },
    ],
  },

  // ─────────────────────────────────── KORNATEN ───────────────────────────────────
  {
    id: 'kornaten',
    title: 'Segeln in die Kornaten',
    subtitle: 'Segelurlaub ab Zadar, Biograd oder Šibenik in die traumhafte Inselwelt der Kornaten',
    cardImg: '/images/packages/Kornaten/gallery/Telascica.webp',
    heroImg: '/images/packages/Kornaten/gallery/Telascica.webp',
    price: '620',
    tags: ['Familie', 'Einsteiger', 'Entdecker'],
    country: 'Kroatien',
    included: [
      'alle Nächtigungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'fixe Route mit Häfen und Buchten',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7, 10 oder 14 Tage',
      'ideal für Reisegruppen mit 4 - 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route:
      'Startmarina Zadar (o. Umgebung) – Murter – Kornaten – Dugi Otok – Žirje / Kaprije – Skradin (Nationalpark Krka) – Zielort Zadar (o. Umgebung)',
    routeMaps: [{ src: '/images/packages/Kornaten/Kornaten mit Legende.png', caption: 'Kornaten-Route' }],
    detailSections: [
      {
        heading: 'Details zu Ihrer Route',
        intro:
          'Erleben Sie einen unvergesslichen Segelurlaub in der vielfältigen Inselwelt Dalmatiens, in den Kornaten und dem Nationalpark Kornati.\nDer Nationalpark Kornati besteht aus 89 Inseln und ist eine der beliebtesten Urlaubsdestinationen Kroatiens. Einsame Buchten, glasklares Wasser, laue Sommerwinde, Schnorchelparadies und regionale Kulinarik - mit diesen Worten lässt sich unser Kornaten-Package am besten zusammenfassen. Buchen Sie noch heute Ihren Segeltörn auf einer Yacht!',
        stops: [
          {
            name: 'Zadar',
            text: 'Die Universitätsstadt Zadar ist der Ausgangspunkt für die Kornaten-Route. Bevor es in die Natur geht, besichtigen Sie die geschichtsträchtige Altstadt von Zadar. Berühmte Sehenswürdigkeiten sind die Kirche Sveti Donat aus dem 9. Jahrhundert, sowie die romanische Basilika Sveti Stošija. Ein besonderes Highlight ist die Meeresorgel am Hafen, die unverwechselbare Klangbilder verbreitet.',
          },
          {
            name: 'Murter',
            text: 'Die Insel Murter ist durch eine kleine Brücke mit dem Festland verbunden und bietet auf ihrer Westseite einen traumhaften Blick auf die Kornaten. Murter ist bekannt für seine Olivenölproduktion, welche bereits am Kaiserschloss in Wien genutzt wurde. Neben dem Olivenöl können Sie auch köstliche lokale Spezialitäten in den verschiedenen Restaurants in Murter genießen. Nicht zu vergessen sind die schönen Buchten auf der Westseite der Insel.',
          },
          {
            name: 'Dugi Otok',
            text: 'Dugi Otok heißt zu deutsch "lange Insel" und ist auch eine der größten Inseln in der direkten Umgebung. Die Westküste ist geprägt von einer spektakulären Steilküste, die sowohl von der Yacht aus, als auch von Landseite bewundert werden kann. Der inoffizielle Hauptort im Ostteil der Insel ist Sali, welcher einen geschützten Hafen und einige Restaurants am Hafenkai bietet. Auch das Nachtleben kommt mit der allseits beliebten Bar "Maritimo" in Sali nicht zu kurz. Hier treffen sich die Einheimischen genauso gerne, wie unsere Gäste, die hierher immer wieder gerne kommen.\nIm Süden der Insel befindet sich der Nationalpark Telašćica mit dem Salzsee "Mir". Der gesamte Park ist eine riesige Erholungsoase, vorallem in den Abendstunden, wenn die Tagesgäste vom Festland schon wieder verschwunden sind. Der schönste Sandstrand der Route befindet sich ebenfalls auf Dugi Otok - im nördlichen Teil der Insel.',
          },
          {
            name: 'Kornaten',
            text: 'Eine der Höhepunkte der Route sind die Kornaten und der Nationalpark Kornati. Die Kornaten bestehen aus ca. 150 Inseln und Riffen, zum Nationalpark gehören 90 Inseln inkl. dem streng geschützten Meeresboden in diesem Gebiet. Die Kornaten sind ein Erholungsgebiet der besonderen Art fernab vom Massentourismus, mit wenig bewohnten Inseln, unzähligen Buchten und einer einmaligen Landschaft. In den Kornaten befindet sich auch die Marina Piskera, die neben ausgezeichneten Restaurants eine gute Infrastruktur besitzt.',
          },
          {
            name: 'Skradin (Nationalpark Krka)',
            text: 'Skradin befindet sich am Festland und liegt am Süsswasserfluss Krka. Um mit der Yacht nach Skradin zu gelangen, fährt man ab Sibenik flussaufwärts, vorbei an Muschelfarmen und am Prokljan See. Skradin selbst ist ein kleines Städtchen mit einem der schönsten Häfen Kroatiens. Von dort starten regelmäßig Ausflugsboote zum Nationalpark Krka. Im Nationalpark befinden sich die imposanten Krka Wasserfälle, der höchste mit 45m auf 17 Stufen. Die einzigartige Artenvielfalt von Pflanzen und Tieren lässt sich am besten bei einer Wanderung auf einem der zahlreichen beschilderten Wanderpfade entdecken. Sehenswert ist auch das Franziskanerkloster Visovac.',
          },
          {
            name: 'Žirje/Kaprije',
            text: 'Die Inseln Kaprije und Žirje bieten traumhafte einsame Buchten für Schnorchler und Taucher. Dünn besiedelt bieten sie idyllische Landschaften und eine reiche Unterwasserwelt, die Sie mit der Tauchstation vor Ort erkunden können. In einem geschützten Unterwassermuseum können Sie dabei Antikamphoren bestaunen, die auf einem gesunkenen Antikschiff (2. Jhdt. v.Chr.) gefunden wurden.',
          },
          {
            name: 'Vodice',
            text: "Der belebte Ort Vodice, deutsch übersetzt 'Wässerchen', liegt am Festland und bekam seinen Namen durch die Versorgung der umliegenden Gegenden mit Trinkwasser. Vodice bietet für einen geselligen Abend eine Vielzahl an Bars und Clubs, in der Sie die Nacht zum Tag machen können. Das Ambiente der Stadt ist typisch kroatisch, doch auch sehr touristisch. Ein perfekter Ausgleich für den sonst eher naturbehafteten Törn in den Kornaten und den besuchten Nationalparks.",
          },
        ],
      },
    ],
    accommodations: [SEGELYACHT_UNTERKUNFT_MONO_ONLY, KATAMARAN_UNTERKUNFT],
    arrival: {
      heading: 'Anreise',
      paragraphs: [
        'Die Startmarina im Raum Zadar sind mit dem Auto durch die nahegelegene Autobahn A1 von Wien (6h) / München (8h), mit dem Bus oder per Flugzeug (Flghf. Zadar) bequem zu erreichen. Zadar hat ebenfalls einen Flughafen (ZAD). Wir helfen gerne bei der Planung!',
      ],
    },
    hints: [
      'In Kroatien gilt der €uro',
      'Nicht im Basispreis inkludiert sind Endreinigung (ca. €40,- pro Person), Spritverbrauch, fakultative Ausflüge, Anlegegebühren in Fremdhäfen, kroatische Kurtaxe, persönliche Ausgaben und Reiseversicherungen sowie Trinkgelder jeglicher Art.',
      'Skipper wird von der Bordkassa mitverpflegt.',
      'Kroatien ist Teil des Schengen-Raums. Für die Crewliste benötigen Sie einen gültigen Reisepass oder Personalausweis.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        base: '620',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '* Mindestteilnehmer: 4 Personen | Bei Buchung 1-3 Personen werden Personen hinzugebucht. Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Für Einzelreisende und Kleinstgruppen: Mitsegler in der Yacht-Urlaub Törnbörse finden',
          'Ohne gebuchte ZUSATZpakete sind Endreinigung (~€150,- pro Yacht) und Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen.',
        ],
        zusatz: [
          { name: 'Spritpauschale', price: '40', details: ['inkludiert den Spritverbrauch'] },
          { name: 'Comfort-Package', price: '50', details: ['Beibootmotor', 'WLAN an Bord', 'Bettleinen', 'Endreinigung'] },
          { name: 'Diving-Package', price: '100', details: ['mobile Tauchbasis', 'beinhaltet 2 Tauchgänge mit Ausrüstung und Instruktor', '(buchbar im zweiten Buchungsschritt)'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '250', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '350', details: ['2 Mahlzeiten am Tag (inkludiert Frühstück und Mittagssnack)', '+ Sauberkeit in der Küche / Entsorgung des Mülls'] },
          { name: 'Einzelkabine', price: '330', details: ['Einzelbelegung (buchbar im zweiten Buchungsschritt)'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/Kornaten/gallery/Mono Kornaten.png', alt: 'Segelyacht in den Kornaten' },
      { src: '/images/packages/Kornaten/gallery/Dugi Otok.png', alt: 'Dugi Otok' },
      { src: '/images/packages/Kornaten/gallery/Dugi Otok Wrack.png', alt: 'Wrack bei Dugi Otok' },
      { src: '/images/packages/Kornaten/gallery/image (99).jpg', alt: 'Kornaten' },
      { src: '/images/packages/Kornaten/gallery/image (6).jpg', alt: 'Kornaten' },
      { src: '/images/packages/Kornaten/gallery/zadar-bei-yacht-urlaub.jpg', alt: 'Zadar' },
      { src: '/images/packages/Kornaten/gallery/image (6).png', alt: 'Kornaten' },
      { src: '/images/packages/Kornaten/gallery/image (93).jpg', alt: 'Kornaten' },
      { src: '/images/packages/Kornaten/gallery/20180909_131842.jpg', alt: 'Kornaten' },
    ],
  },

  // ─────────────────────────────────── ISTRIEN ───────────────────────────────────
  {
    id: 'istrien',
    title: 'Segeln ab Pula oder Krk',
    subtitle: 'Segelurlaub in Istrien und in der Kvarner Bucht ab Pula oder Punat auf Krk',
    cardImg: '/images/packages/Istrien/gallery/Istrien.webp',
    heroImg: '/images/packages/Istrien/20190502_091737.jpg',
    price: '620',
    tags: ['Familie', 'Einsteiger'],
    country: 'Kroatien',
    included: [
      'alle Nächtigungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'fixe Route mit Häfen und Buchten',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7, 10 oder 14 Tage',
      'ideal für Reisegruppen mit 4 - 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: 'Pula/Krk – Cres – Lošinj – Ist – Molat – Silba – Rab – Krk/Pula',
    routeMaps: [{ src: '/images/packages/Istrien/Istrien mit Legende.png', caption: 'Istrien-Route' }],
    detailSections: [
      {
        heading: 'Details zu Ihrer Route',
        intro:
          'Das Istrien-Package führt zu den schönsten Plätzen Istriens und der Kvarner Bucht. Von Krk oder Pula geht die Reise über die Inseln Lošinj und Rab sowie auf die vom Tourismus schon etwas entfernten Kleininseln Ist, Molat, Silba, Olib und Ilovik. Entdecken Sie die bezaubernden Städtchen und Dörfer und tauchen Sie in echte kroatische Traditionen ein. Die Route bietet vorallem für leidenschaftliche Segler schöne Distanzen und abwechslungsreiche Landschaften.',
        stops: [
          {
            name: 'Pula',
            text: 'In der größten Stadt Istriens sind zahlreiche römische Sehenswürdigkeiten zu entdecken allen voran das Amphitheater (errichtet 2 v. Chr. bis 14 n. Chr.), welches bereits beim Einlaufen in die Marina zu sehen ist. Besichtigen Sie bei einem Rundgang durch die Stadt den Augustustempel und verweilen Sie in einem der umliegenden Cafes oder Restaurants.',
          },
          {
            name: 'Cres',
            text: 'Die längliche Insel in der Kvarner Bucht und der gleichnamige Hauptort der Insel bieten viele Schätze für Yacht-Urlauber. Der Ort Cres schmiegt sich in eine Bucht auf der westlichen Seite der Insel. Die gotischen Gassen waren einst zur Zeit der Venezianer (16. Jhdt.) von einer Stadtmauer umschlossen. Teile der Mauer sowie die Stadttore sind noch heute gut erhalten. Etwas südlich von Cres befindet sich das idyllische Valun mit seinen malerischen Gassen, seiner Uferpromenade und den kleinen kroatischen Restaurants, auch Konobas genannt.',
          },
          {
            name: 'Lošinj',
            text: 'Die Insel Lošinj liegt in der Kvarner Bucht südlich der Insel Cres und ist für ihr besonders wohltuendes mediterranes Mikroklima bekannt. Mali Lošinj, das Zentrum der Insel und eine der größten Inselstädte Kroatiens, ist dank seiner gut ausgestatteten Marina, der umliegenden Konobas und Bars ein beliebtes Reiseziel für Segel-Urlauber. Wer es ruhiger haben möchte, besucht per Fuß (3 km) oder per Yacht das idyllische Veli Lošinj am südlichen Ende der Insel.',
          },
          {
            name: 'Ilovik',
            text: 'Je nach Windverhältnissen bietet Ilovik zwei geschützte Buchten, eine im Süden, die andere bei der einzigen Siedlung Iloviks zwischen der Insel Ilovik und der Insel Sveti Petar. Auf Sveti Petar sind Ruinen eines Benediktinerklosters sowie der Dorffriedhof zu finden, infolge dessen müssen die Verstorbenen der Insel ihren letzten Weg mit dem Boot zurücklegen.',
          },
          {
            name: 'Ist',
            text: 'Die Insel Ist und der gleichnamige Ort bieten gute Ankermöglichkeiten für eine Segelyacht. Mit dem Dinghy (kleines Beiboot) besuchen Sie das kleine Städtchen fernab des Massentourismus. Auf Ist lebt man in erster Linie vom Fischfang. Lernen Sie hier das ursprüngliche Leben und die kroatische Gemütlichkeit kennen.',
          },
          {
            name: 'Molat',
            text: 'Molat ist die größere Nachbarinsel von Ist und besticht durch seine V-förmige Gestalt, die nach Südosten offen ist. Tief in der Bucht Brgulje finden Sie perfekte Verhältnisse zum Schnorcheln im kristallklaren Wasser. Die Insel Molat zählt nur ca. 200 Einwohner, die meisten im Inselstädtchen Molat. Genießen Sie am Abend in einem der wenigen Restaurants eine der typischen Speisen Kroatiens: Peka vom Lamm oder vom Oktopus.',
          },
          {
            name: 'Silba',
            text: 'Auch bekannt als "Tor zu Dalmatien" ist Silba die nördlichste Insel Dalmatiens. Straßen für Autos gibt es hier nicht, die wichtigsten Läden für den täglichen Bedarf sind jedoch vorhanden. Für Segel-Urlauber bietet Silba türkisblaue Kies- und Sandstrände, welche in einsamen Buchten nur darauf warten, von Ihnen entdeckt zu werden.',
          },
          {
            name: 'Rab',
            text: 'Die bekannte und beliebte Insel Rab verzaubert bereits beim Einfahren in den gleichnamigen Ort Rab durch ihren schönen Anblick. Neben einer vollwertigen Marina laden zahlreiche Geschäfte zum Shoppen ein. Besuchen Sie den romanischen Glockenturm (12.Jhdt.) und die Domkirche Sv. Marija, zwei der vielen kulturellen Sehenswürdigkeiten auf Rab. Im nördlichen Teil der Insel befinden sich schöne Badebuchten, die zum Schwimmen und Schnorcheln einladen.',
          },
        ],
      },
    ],
    accommodations: [SEGELYACHT_UNTERKUNFT_MONO_ONLY],
    arrival: {
      heading: 'Anreise zum Starthafen',
      paragraphs: [
        'Die Marina Punat (auf Krk) ist mit dem Flugzeug (Flghf. Rijeka) oder per Auto von Wien (6h) / München (6,5h) gut zu erreichen.',
        'Die Marina Pula ist mit dem Flugzeug (Flghf. Pula), mit dem Bus oder per Auto von Wien (6,5h) / München (6,5h) gut zu erreichen.',
      ],
    },
    hints: [
      'In Kroatien gilt der €uro',
      'Nicht im Basispreis inkludiert sind Endreinigung (ca. €40,- pro Person), Spritverbrauch, fakultative Ausflüge, Anlegegebühren in Fremdhäfen, kroatische Kurtaxe, persönliche Ausgaben und Reiseversicherungen sowie Trinkgelder jeglicher Art.',
      'Skipper wird von der Bordkassa mitverpflegt.',
      'Kroatien ist Teil des Schengen-Raums. Für die Crewliste benötigen Sie einen gültigen Reisepass oder Personalausweis.',
      'Änderungen vorbehalten',
    ],
    priceBlocks: [
      {
        base: '620',
        baseIncludes: ['Yacht', 'Skipper'],
        notes: [
          '* Mindestteilnehmer: 4 Personen | Bei Buchung 1-3 Personen werden Personen hinzugebucht. Alle angegebenen Preise sind Endpreise gemäß § 19 UStG',
          'Für Einzelreisende und Kleinstgruppen: Mitsegler in der Yacht-Urlaub Törnbörse finden',
          'Ohne gebuchtes Comfort-Package sind Endreinigung/Permit sowie Sprit nach Verbrauch von der Bordkassa vor Ort zu zahlen.',
        ],
        zusatz: [
          { name: 'Comfort-Package', price: '120', details: ['Beibootmotor', 'WLAN an Bord', 'Endreinigung + Bettwäsche', 'Marinagebühren im Heimathafen', 'Sprit/Diesel'] },
        ],
        premium: [
          { name: 'Premium-Yacht-Upgrade', price: '250', details: ['Neuwertige Yacht garantiert (max. 3 Jahre)'] },
          { name: 'Bord-Service', price: '350', details: ['2 Mahlzeiten am Tag (inkludiert Frühstück und Mittagssnack)', '+ Sauberkeit in der Küche / Entsorgung des Mülls'] },
          { name: 'Einzelkabine', price: '330', details: ['Einzelbelegung (buchbar im zweiten Buchungsschritt)'] },
        ],
      },
    ],
    gallery: [
      { src: '/images/packages/Istrien/gallery/image (102).jpg', alt: 'Segeln in Istrien' },
      { src: '/images/packages/Istrien/gallery/sophie.jpg', alt: 'Segelurlaub in Istrien' },
      { src: '/images/packages/Istrien/gallery/Rab.png', alt: 'Rab' },
      { src: '/images/packages/Istrien/gallery/Amphitheater.jpg', alt: 'Amphitheater Pula' },
      { src: '/images/packages/Istrien/gallery/Istrien.png', alt: 'Istrien' },
      { src: '/images/packages/Istrien/gallery/Krk.png', alt: 'Krk' },
      { src: '/images/packages/Istrien/gallery/image (13).png', alt: 'Kvarner Bucht' },
      { src: '/images/packages/Istrien/gallery/Kleine Insel somewhere.png', alt: 'Kleine Insel' },
      { src: '/images/packages/Istrien/gallery/mali-losinj-2295423_1920.jpg', alt: 'Mali Lošinj' },
    ],
  },
]

const enPkgPath: Record<string, string> = Object.fromEntries(Object.entries(enPkgSlugs).map(([slug, id]) => [id, slug]))

export default function Packages() {
  const lang = useLang()
  const list = lang === 'en' ? packagesEn : packages
  const pkgHref = (pid: string) => lang === 'en' ? `/en/cruises/book-now/${enPkgPath[pid] ?? pid}` : `/packages/${pid}`
  return (
    <section style={{ background: '#f4f6f8', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Direkt buchbar
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '0.75rem' }}>
            {lang === 'en' ? 'All packages at a glance' : 'Alle Packages auf einen Blick'}
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            {lang === 'en' ? 'From Croatia to the Caribbean — pick your dream sailing area and book directly online.' : 'Von Kroatien bis Karibik — wählen Sie Ihr Traumrevier und buchen Sie direkt online.'}
          </p>
        </div>

        <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {list.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}
            >
              {/* Image */}
              <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={pkg.cardImg}
                  alt={pkg.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/packages/default-header-image.jpg' }}
                />
                <div style={{
                  position: 'absolute', top: '0.75rem', right: '0.75rem',
                  background: 'var(--blue)', color: '#fff',
                  borderRadius: '50%', width: '64px', height: '64px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.62rem', fontWeight: 700, textAlign: 'center', lineHeight: 1.2,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <span style={{ fontSize: '0.58rem' }}>{lang === 'en' ? 'from' : 'ab'}</span>
                  <span style={{ fontSize: '0.9rem' }}>€ {pkg.price}</span>
                  <span style={{ fontSize: '0.56rem' }}>{lang === 'en' ? 'p. pers.' : 'pro Pers.'}</span>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '1rem', fontWeight: 700,
                  color: 'var(--blue)', fontStyle: 'italic', marginBottom: '0.6rem', lineHeight: 1.3,
                }}>
                  {pkg.title.toUpperCase()}
                </h3>
                <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                  {pkg.subtitle}
                </p>
                <Link
                  to={pkgHref(pkg.id)}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', alignSelf: 'flex-start' }}
                >
                  {lang === 'en' ? '▶ TO THE OFFER' : '▶ ZUM ANGEBOT'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .packages-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .packages-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
