import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export type Destination = {
  id: string
  name: string
  country: string
  headerImg: string
  mapImg: string
  intro: string
  highlights: string[]
  bestTime: string
  difficulty: string
  distance: string
  gallery: string[]
  regions: { name: string; desc: string }[]
  infoTable?: {
    area?: string
    population?: string
    capital?: string
    language?: string
    currency?: string
    timezone?: string
    religion?: string
    season?: string
  }
  extendedSections?: { heading: string; text: string }[]
}

const infoLabels: Record<string, string> = {
  area: 'Fläche',
  population: 'Einwohner',
  capital: 'Hauptstadt',
  language: 'Sprache',
  currency: 'Währung',
  timezone: 'Zeitzone',
  religion: 'Religion',
  season: 'Beste Reisezeit',
}

export const destinations: Destination[] = [
  {
    id: 'kroatien',
    name: 'Kroatien',
    country: '🇭🇷',
    headerImg: '/images/Destinationsbilder/Header/Header_TB_Dalmatien.jpg',
    mapImg: '/images/Destinationsbilder/landkarte_europa_Kroatien_gross.jpg',
    intro: 'Kroatien ist das klassische Segelrevier für Einsteiger und Profis gleichermaßen. Mit über 1.200 Inseln, klarem türkisblauen Wasser, historischen Städten und traumhaften Buchten ist dieses Mittelmeerparadies das beliebteste Segelziel Europas. An der nördlichen sowie mittleren Adria bietet Kroatien ein Segelrevier mit über 5.800 Küstenkilometern und 4.000 km Inselküsten.',
    highlights: ['1.200+ Inseln und Inselchen', 'Historische Städte (Dubrovnik, Split, Hvar)', 'Klares türkisblaues Wasser (22–25°C im Sommer)', 'Ausgezeichnete Marina-Infrastruktur', 'Köstliche dalmatinische Küche', 'Nationalpark Kornaten mit über 80 Inseln'],
    bestTime: 'April – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Über 5.800 km Küstenlinie',
    gallery: [
      '/images/Destinationsbilder/blick-auf-den-hafen-von-hvar-bei-yacht-urlaub.png',
      '/images/Destinationsbilder/dubrovnik-aus-der-himmelsperspektive-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Dubrovnik.jpg',
      '/images/Destinationsbilder/Hvar.webp',
      '/images/Destinationsbilder/enge-gasse-mit-blick-aufs-meer-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Header/Header_TB_Dubrovnik.jpg',
      '/images/Destinationsbilder/Header/Header_TB_Kornaten.jpg',
      '/images/Destinationsbilder/Header/Kroatien Bucht.webp',
    ],
    regions: [
      { name: 'Dalmatien (ab Split)', desc: 'Die bekannteste Segelregion: von Split oder Trogir zu den Inseln Hvar, Vis, Korčula, Brač und Šolta – bis hinunter nach Dubrovnik.' },
      { name: 'Kornaten (ab Zadar/Biograd/Šibenik)', desc: 'Einzigartiger Nationalpark mit über 80 unbewohnten Kalksteininseln – karg, ursprünglich und faszinierend.' },
      { name: 'Istrien (ab Pula oder Krk)', desc: 'Die nordwestliche Halbinsel mit venezianischem Flair, Rovinj, Pula und der ruhigen Kvarner-Bucht – ideal für Einsteiger.' },
    ],
    infoTable: {
      area: '56.594 km²',
      population: '4,5 Millionen',
      capital: 'Zagreb',
      language: 'Kroatisch (Deutsch und Englisch gesprochen)',
      currency: 'Euro (€)',
      timezone: 'MEZ / MESZ',
      religion: 'Überwiegend Katholisch',
      season: 'April – Oktober',
    },
    extendedSections: [
      {
        heading: 'Klima & Beste Reisezeit',
        text: 'Das mediterrane Klima Kroatiens sorgt im Sommer für bis zu 35°C und Wassertemperaturen von 22–25°C. Die Hauptsaison läuft von Juni bis September. In der Vor- und Nachsaison (April/Mai und September/Oktober) ist das Klima deutlich milder mit 15–22°C und weniger Touristen – ideal für entspanntes Segeln ohne Gedränge in den Marinas.',
      },
      {
        heading: 'Sehenswürdigkeiten & Highlights',
        text: 'Split mit dem imposanten Diokletianpalast (UNESCO-Welterbe) ist das Tor zur süddalmatinischen Küste. Dubrovnik, die „Perle der Adria", beeindruckt mit ihren mittelalterlichen Stadtmauern. Hvar ist bekannt für Nachtleben, historisches Kastell und wunderschöne Strände. Die abgelegene Insel Vis – bis 1989 Militärgebiet – und die Blaue Grotte auf der Nachbarinsel Biševo sind einzigartig. Korčula gilt als Geburtsort von Marco Polo. Mljet begeistert mit seinem Nationalpark und den idyllischen Salzseen.',
      },
      {
        heading: 'Küche & Kulinarik',
        text: 'Die dalmatinische Küche begeistert mit frischem Fisch und Meeresfrüchten, Pršut (dalmatinischem Rohschinken) und hervorragenden lokalen Weinen. Typische Getränke sind Sliwowitz (Pflaumenschnaps), Kruškovac (Birnenschnaps) und Pelinkovac (Kräuterlikör). Die Küstentavernen – Konobas – bieten rustikale und authentische Gerichte direkt am Wasser.',
      },
      {
        heading: 'Navigation & Winde',
        text: 'Die drei wichtigsten Winde: Mistral (nordwestlicher Seewind, tagsüber auffrischend – der „Freund der Segler"), Jugo (südlicher Langzeitwind mit langer Welle, kündigt sich durch dunstigen Himmel an) und Bora (nordöstlicher Fallwind, besonders in Istrien stark). Der Mistral sorgt im Sommer für herrliche Segelwinde mit 15–25 Knoten.',
      },
    ],
  },
  {
    id: 'griechenland',
    name: 'Griechenland',
    country: '🇬🇷',
    headerImg: '/images/Destinationsbilder/Header/header_greece.jpg',
    mapImg: '/images/Destinationsbilder/landkarte_europa_Griechenland_gross.jpg',
    intro: 'Griechenland ist ein Paradies für anspruchsvolle Segler. Mit über 14.000 Kilometern Küstenlinie, tausenden teils unbewohnter Inseln und 250–300 Sonnentagen im Jahr bietet das Land unvergessliche Segelerlebnisse – von den Ionischen Inseln im Westen bis zu den Kykladen und der Ägäis. Jede Inselgruppe hat ihren eigenen, unverwechselbaren Charakter.',
    highlights: ['14.000+ km Küstenlinie', 'Antike Tempel und Stätten', 'Berühmter Meltemi-Wind (15–25 Knoten)', 'Authentische griechische Tavernas', 'Kristallklares Ägäis-Wasser (24°C im Sommer)', '250–300 Sonnentage pro Jahr'],
    bestTime: 'April – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ionisches Meer bis östliche Ägäis',
    gallery: [
      '/images/Destinationsbilder/akropolis-von-rhodos-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/Akropolis1.webp',
      '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/korfu.jpg',
      '/images/packages/Griechenland/gallery/santorini-1776236_1920.jpg',
      '/images/packages/Griechenland/gallery/Mykonos.jpg',
      '/images/packages/Griechenland/gallery/Naxos Beach.jpg',
      '/images/packages/Griechenland/gallery/hydra.jpg',
    ],
    regions: [
      { name: 'Ionische Inseln', desc: 'Korfu, Kefalonia, Lefkada, Zakynthos, Paxos – üppig grüne Inseln mit venezianischen Festungen und ruhigem Segeln, ideal für Familien.' },
      { name: 'Kykladen', desc: 'Mykonos, Santorini, Naxos, Paros – das ikonische Griechenland mit weißen Häusern, blauen Kuppeln und lebhaftem Nachtleben.' },
      { name: 'Dodekanes', desc: 'Rhodos, Kos, Patmos, Kalymnos – beeindruckende Geschichte, mittelalterliche Altstädte und schöne einsame Buchten im östlichen Ägäis.' },
    ],
    infoTable: {
      area: '131.957 km²',
      population: '10,8 Millionen',
      capital: 'Athen',
      language: 'Griechisch (Englisch gesprochen)',
      currency: 'Euro (€)',
      timezone: 'OEZ / OESZ (+1 Std. gegenüber MEZ)',
      religion: 'Griechisch-Orthodox',
      season: 'April – Oktober',
    },
    extendedSections: [
      {
        heading: 'Inselgruppen im Überblick',
        text: 'Die Dodekanes im südöstlichen Ägäis mit Rhodos (mittelalterliche Altstadt, Palast des Großmeisters) und Kos. Die Kykladen: Mykonos mit weißen Häusern und lebhaftem Nachtleben; Naxos, die größte und grünste Zyklade mit Kastell und herrlichen Stränden; Santorini mit spektakulären Sonnenuntergängen, dramatischen Klippen und den ikonischen blauen Kuppeln; Paros mit malerischen Dörfern und Windsurfen. Die Ionischen Inseln: Korfu mit venezianischen Festungen, Zakynthos mit Caretta-Caretta-Meeresschildkröten, Lefkada mit dem berühmten Strand Porto Katsiki sowie Paxos und Antipaxos mit idealen Ankerbuchten.',
      },
      {
        heading: 'Klima & Wind',
        text: 'Griechenland bietet 250–300 Sonnentage im Jahr. Die Hochsaison Juli/August bringt 25–30°C (Wassertemperatur: 24°C). Der Meltemi-Wind, ein beständiger Nordwind, frischt im Sommer auf der Ägäis auf und sorgt für hervorragende Segelwinde mit 15–25 Knoten, aber auch für kurze, steile Wellen. Mai, Juni und September sind mit milderen Winden ideal für anspruchsvolle Segler und bieten ruhigere Marinas.',
      },
      {
        heading: 'Küche & Kultur',
        text: 'Die griechische Küche besticht mit frischen Zutaten, mediterranen Aromen und herzhaften Gerichten: Souvlaki, Tzatziki, Spanakopita und Baklava. Das reiche kulturelle Erbe reicht von der Athener Akropolis bis zu den Ritterburgen auf den Inseln. Traditionelle Panegyri-Feste zu Ehren der Heiligen, farbenfrohe Karnevalsumzüge und musikerfüllte Abende in den Tavernen prägen das lebendige Inselleben.',
      },
    ],
  },
  {
    id: 'balearen',
    name: 'Balearen',
    country: '🇪🇸',
    headerImg: '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
    mapImg: '/images/Destinationsbilder/landkarte_europa_balearen_900.jpg',
    intro: 'Die Balearen sind vielseitiger und wandlungsfähiger als viele andere Mittelmeerziele. Mallorca, Ibiza, Menorca und Formentera – vier Inseln mit völlig unterschiedlichem Charakter, verbunden durch kristallklares Wasser, traumhafte Calas und mediterranes Flair. Ca. drei Flugstunden von München oder Wien entfernt, vereinen die Balearen pulsierendes Nachtleben und ruhige Naturreservate auf engstem Raum.',
    highlights: ['Traumstrände und versteckte Calas', 'Lebhaftes Nachtleben auf Ibiza (Pacha, Amnesia)', 'UNESCO-Biosphärenreservat Menorca', 'UNESCO-Welterbe Dalt Vila auf Ibiza', 'Ausgezeichnete Marinas', 'Kulinarische Vielfalt – von Paella bis Ensaimada'],
    bestTime: 'April – Oktober',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ca. 400 km zwischen den Inseln',
    gallery: [
      '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg',
      '/images/Destinationsbilder/alcúdia-bucht.jpg',
      '/images/Destinationsbilder/bucht-auf-ibiza.jpg',
      '/images/Destinationsbilder/espalmador-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/cabrera-bei-yacht-urlaub (2).jpg',
      '/images/Destinationsbilder/Header/Header_TB_Mallorca.jpg',
    ],
    regions: [
      { name: 'Mallorca', desc: 'Die größte Insel mit Palma und seiner beeindruckenden Kathedrale, der Sierra de Tramuntana (UNESCO) und unzähligen Calas wie Es Trenc und Cala Mondragó.' },
      { name: 'Ibiza & Formentera', desc: 'Ibiza: Weltruhm durch Nachtleben (Pacha, Amnesia, Ushuaïa) und das UNESCO-Welterbe Dalt Vila; Formentera hat die schönsten Strände Europas (Ses Illetes, Llevant).' },
      { name: 'Menorca & Cabrera', desc: 'Menorca: UNESCO-Biosphärenreservat mit unberührten Buchten (Cala Macarella, Cala Mitjana) und dem historischen Ciutadella. Cabrera: Naturschutzgebiet mit vielfältiger Tierwelt.' },
    ],
    infoTable: {
      area: '4.992 km²',
      population: '1,1 Millionen',
      capital: 'Palma de Mallorca',
      language: 'Spanisch, Katalanisch (Deutsch und Englisch gesprochen)',
      currency: 'Euro (€)',
      timezone: 'MEZ / MESZ',
      religion: 'Überwiegend Katholisch',
      season: 'Mai – September (Hauptsaison)',
    },
    extendedSections: [
      {
        heading: 'Die vier Inseln im Überblick',
        text: 'Mallorca bietet dramatische Küstenlinien, versteckte Calas (Es Trenc, Cala Mondragó) und das historische Palma mit seiner gotischen Kathedrale La Seu. Ibiza ist für sein Nachtleben ebenso bekannt wie für ruhige Buchten (Cala Comte, Cala d\'Hort) und die UNESCO-Altstadt Dalt Vila. Menorca überrascht als UNESCO-Biosphärenreservat mit traumhaften Buchten (Cala Macarella, Cala Mitjana) und dem venezianisch geprägten Ciutadella. Formentera mit kristallklarem Wasser und weißen Sandstränden (Playa de Ses Illetes, Playa de Llevant) ist ideal zum Schnorcheln und Tauchen. Cabrera ist ein Archipel-Schutzgebiet mit vielfältiger Tierwelt.',
      },
      {
        heading: 'Küche, Getränke & Feste',
        text: 'Die balearische Küche umfasst Paella in allen Variationen, Tapas (Patatas Bravas, Albóndigas, Pimientos de Padrón) und die süßen Ensaimada-Schnecken. Typische Getränke: Hierbas (traditioneller Kräuterlikör), Gin Xoriguer aus Menorca – als „Pomada" mit Limonade serviert – sowie lokale Vino Tinto-Weine aus Mallorca. Das Fest Sant Joan (23. Juni), besonders auf Menorca mit Feuerwerk, Freudenfeuern, traditionellen Tänzen und spektakulären Pferdeumzügen, ist ein kulturelles Highlight.',
      },
    ],
  },
  {
    id: 'karibik',
    name: 'Karibik-BVI',
    country: '🏝️',
    headerImg: '/images/Destinationsbilder/Header/caribbean.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-der-britischen-jungferninseln.jpg',
    intro: 'Die Britischen Jungferninseln sind das Segelparadies schlechthin. Konstante Passatwinde mit 15–20 Knoten, türkisblaues Wasser, weiße Sandstrände und entspannte Strandbar-Kultur machen die BVIs zum Traumziel jedes Seglers. Über 60 Inseln, Inselchen und Riffe laden ein – jede mit eigenem Charakter und einzigartigen Ankerplätzen.',
    highlights: ['Konstante Passatwinde 15–20 Knoten', 'Legendäre Soggy Dollar Bar (Jost Van Dyke)', 'The Baths auf Virgin Gorda', 'Sandy Cay & Sandy Spit', 'Hummer-Dinner auf Anegada', 'Cristallklares Wasser – Sichtweite 30+ m'],
    bestTime: 'November – April',
    difficulty: 'Einsteiger bis Fortgeschrittene',
    distance: 'Ca. 60 Seemeilen Hauptrevier',
    gallery: [
      '/images/Destinationsbilder/entertainment-in-den-bvis-bei-yacht-urlaub.png',
      '/images/Destinationsbilder/cocktails-auf-der-yacht-bei-yacht-urlaub.jpg',
      '/images/Destinationsbilder/grill-am-strand-bei-yacht-urlaub.png',
      '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
      '/images/packages/Karibik-BVI/gallery/the baths.jpg',
      '/images/packages/Karibik-BVI/gallery/Sandy Spit.jpg',
      '/images/packages/Karibik-BVI/gallery/marina_cay.jpg',
      '/images/packages/Karibik-BVI/gallery/Norman island.jpg',
    ],
    regions: [
      { name: 'Tortola', desc: 'Die Hauptinsel der BVI mit dem größten Yachthafen Road Town – Ausgangspunkt der meisten Törns.' },
      { name: 'Virgin Gorda', desc: 'Heimat der legendären The Baths – bizarre Granitfelsformationen am Strand mit Grotten und Pools zum Schnorcheln.' },
      { name: 'Jost Van Dyke & Anegada', desc: 'Jost Van Dyke: klein, entspannt und mit der berühmtesten Strandbar der Karibik (Soggy Dollar Bar). Anegada: flache Koralleninsel mit dem besten Hummer der Karibik.' },
    ],
    infoTable: {
      area: 'Ca. 153 km²',
      population: 'Ca. 30.000',
      capital: 'Road Town (Tortola)',
      language: 'Englisch',
      currency: 'US-Dollar (USD)',
      timezone: 'AST (UTC-4, keine Sommerzeit)',
      religion: 'Überwiegend Christlich',
      season: 'November – April',
    },
    extendedSections: [
      {
        heading: 'Warum die BVI?',
        text: 'Die BVIs gelten als „Seglerhauptstadt der Karibik" – nicht ohne Grund. Konstante Passatwinde, kurze Überfahrten zwischen den Inseln (oft nur 1–2 Stunden), ausgezeichnete Infrastruktur für Segler und das unvergessliche Licht der Karibik machen jede Woche auf den BVIs zu einem Erlebnis, das man nie vergisst. Das Wassersportangebot ist exzellent: Schnorcheln, Tauchen, Kitesurfen und Stand-Up-Paddling.',
      },
      {
        heading: 'Highlights & Ankerplätze',
        text: 'The Baths auf Virgin Gorda mit gigantischen Granitfelsen und versteckten Grotten sind ein absolutes Must-See. Die Soggy Dollar Bar auf Jost Van Dyke – man ankert und schwimmt ans Ufer, zahlt mit nassen Scheinen. Sandy Cay und Sandy Spit: zwei winzige Sandbänke mit Palmen, die genau dem karibischen Klischee entsprechen. Norman Island mit Piratenschatz-Legende und hervorragenden Schnorchelspots an den „Indians".',
      },
    ],
  },
  {
    id: 'seychellen',
    name: 'Seychellen',
    country: '🏝️',
    headerImg: '/images/Destinationsbilder/Header/seychelles1.jpg',
    mapImg: '/images/Destinationsbilder/DSC_0009.JPG',
    intro: 'Die Seychellen sind das ultimative Luxus-Segelziel im Indischen Ozean. 115 Inseln auf 400 km² – Granitinseln, Korallenformationen und natürlich gewachsene Inseln bieten eine einzigartige Naturkulisse. Zwischen Mahé, Praslin und La Digue warten Granitfelsen, palmgesäumte Strände und eine faszinierende Unterwasserwelt auf Entdecker, die das Paradies suchen.',
    highlights: ['Einzigartige Granitfelsen (Anse Source d\'Argent)', 'Aldabra-Riesenschildkröten', 'Anse Lazio – einer der schönsten Strände der Welt', 'Vallée de Mai auf Praslin (UNESCO)', 'Coco de Mer – die größte Nuss der Welt', 'Wassertemperatur ganzjährig 27–30°C'],
    bestTime: 'Oktober – Dezember & Februar – April',
    difficulty: 'Fortgeschrittene',
    distance: 'Ca. 100 Seemeilen Hauptrevier',
    gallery: [
      '/images/Destinationsbilder/Seychellen.webp',
      '/images/Destinationsbilder/Header/seychelles1.jpg',
      '/images/Destinationsbilder/DSC_0009.JPG',
    ],
    regions: [
      { name: 'Mahé', desc: 'Die Hauptinsel mit der pulsierenden Hauptstadt Victoria, Stränden wie Beau Vallon und Anse Intendance sowie dem Morne Seychellois Nationalpark.' },
      { name: 'Praslin', desc: 'Heimat des Vallée de Mai (UNESCO-Welterbe) mit urzeitlichen Palmenwäldern, dem Anse Lazio und Anse Georgette – zwei der schönsten Strände der Welt.' },
      { name: 'La Digue & weitere', desc: 'La Digue: fast autofreie Insel mit dem berühmten Anse Source d\'Argent. Curieuse: Riesenschildkröten und Mangroven. Silhouette: Regenwald und dramatische Berge. Frégate: Luxusinsel mit Wildtierschutz.' },
    ],
    infoTable: {
      area: '455 km²',
      population: 'Ca. 90.000',
      capital: 'Victoria (Mahé)',
      language: 'Seychellois Kreol, Englisch, Französisch (Deutsch gesprochen)',
      currency: 'Seychellische Rupie (1 SCR ≈ € 0,067)',
      timezone: '+4 Std. gegenüber MEZ (keine Sommerzeit)',
      religion: 'Überwiegend Katholisch',
      season: 'Oktober–Dezember & Februar–April',
    },
    extendedSections: [
      {
        heading: 'Die wichtigsten Inseln',
        text: 'Mahé – die Hauptinsel mit der lebhaften Hauptstadt Victoria, den Stränden Beau Vallon und Anse Intendance sowie Wanderwegen im Morne Seychellois Nationalpark. Praslin – Heimat des UNESCO-Welterbes Vallée de Mai mit urzeitlichen Palmenwäldern; Anse Lazio gilt als einer der schönsten Strände der Welt. La Digue – die fast autofreie Insel mit dem berühmten Anse Source d\'Argent und charakteristischen Granitfelsen. Curieuse beherbergt Riesenschildkröten und Mangrovengebiete. Silhouette besticht mit Regenwald und dramatischen Bergen. Frégate ist eine exklusive Privatinsel mit Wildtierschutzprogramm.',
      },
      {
        heading: 'Klima & Naturwunder',
        text: 'Die Seychellen liegen nahe dem Äquator – das tropische Klima bringt das ganze Jahr Temperaturen zwischen 26–32°C. Die Wassertemperatur beträgt 27–28°C im Winter und 28–30°C im Sommer. Pro Tag scheint die Sonne rund 10 Stunden. Der Aldabra-Atoll beherbergt die weltweit größte Population der Aldabra-Riesenschildkröte. Die endemische Coco de Mer-Palme auf Praslin produziert die größte Nuss der Welt – ein Naturwunder, das nirgendwo sonst auf der Erde vorkommt.',
      },
    ],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: '🇹🇭',
    headerImg: '/images/Destinationsbilder/Header/thailand-header.jpg',
    mapImg: '/images/Destinationsbilder/geographische-lage-von-thailand.gif',
    intro: 'Stellen Sie sich vor, Sie segeln entlang sanfter Wellen, umgeben von der puren Schönheit Thailands – kristallklares türkisfarbenes Wasser, malerische Buchten und einsame Sandstrände. Thailand bietet ein einzigartiges Segelerlebnis in Südostasien mit stabilen Winden und warmen Temperaturen von durchschnittlich 28°C in der besten Reisezeit von November bis April.',
    highlights: ['Dramatische Kalksteinfelsen (Phang Nga Bay)', 'Phi Phi Inseln', 'Similan-Inseln Nationalpark (Tauchen)', 'Exotische Küche & Thai-Kultur', 'Stabile Winde & 28°C Wassertemperatur', 'Einzigartige Ankerplätze in Kalkstein-Lagunen'],
    bestTime: 'November – April',
    difficulty: 'Fortgeschrittene',
    distance: 'Andamanensee & Golf von Thailand',
    gallery: [
      '/images/Destinationsbilder/katamaran-in-thailand.jpg',
      '/images/Destinationsbilder/schnorcheln-in-thailand.jpg',
      '/images/Destinationsbilder/Header/thailand-header.jpg',
    ],
    regions: [
      { name: 'Phuket & Andamanensee', desc: 'Ausgangspunkt für die meisten Törns: Kalksteinfelsen der Phang Nga Bay, Phi-Phi-Inseln und die Similan-Inseln (weltbestes Schnorcheln und Tauchen).' },
      { name: 'Koh Samui & Golf von Thailand', desc: 'Tropisches Inselparadies mit Koh Phangan und Koh Tao – idyllische Ankerplätze und bunte Korallenriffe in ruhigem Fahrwasser.' },
      { name: 'Koh Chang & Ostküste', desc: 'Nahe der kambodschanischen Grenze: unberührte Natur, Regenwald und traditionelle Fischerdörfer mit den ruhigen Nachbarinseln Koh Mak und Koh Kood.' },
    ],
    infoTable: {
      area: '513.515 km²',
      population: 'Ca. 67 Millionen',
      capital: 'Bangkok (Krung Thep)',
      language: 'Thai (Englisch gesprochen)',
      currency: 'Baht (THB)',
      timezone: '+6 Std. gegenüber MEZ (keine Sommerzeit)',
      religion: 'Überwiegend Buddhistisch',
      season: 'November – April',
    },
    extendedSections: [
      {
        heading: 'Startpunkte & Reviere',
        text: 'Phuket ist das Tor zur Andamanensee mit den Kalksteinfelsen der Phang Nga Bay, den Phi-Phi-Inseln und den Similan-Inseln – einem Taucher- und Schnorchelparadies mit über 30 m Sichtweite. Koh Samui im Golf von Thailand bietet ein ruhigeres Revier mit den Nachbarinseln Koh Phangan und Koh Tao. Koh Chang nahe der kambodschanischen Grenze ist ideal für Segler, die Einsamkeit und unberührte Natur suchen.',
      },
      {
        heading: 'Küche & Kultur',
        text: 'Die thailändische Küche begeistert mit ihrer perfekten Balance aus süßen, sauren, scharfen und salzigen Aromen. Klassiker sind Pad Thai (gebratene Reisnudeln mit Garnelen) und Mango Sticky Rice. Das Songkran-Fest im April (Thai-Neujahr mit riesigen Wasserschlachten) und das Loy Krathong-Fest im November (schwimmende Licht-Laternen zu Ehren der Wassergöttin) sind kulturelle Erlebnisse. Thailand grenzt an Myanmar, Laos, Kambodscha und Malaysia und bietet über 900 km Westküstenlinie.',
      },
    ],
  },
]

function LightboxDest({ imgs, index, onClose, onPrev, onNext }: { imgs: string[]; index: number; onClose: () => void; onPrev: () => void; onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <button onClick={e => { e.stopPropagation(); onPrev() }} style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>‹</button>
      <motion.img key={index} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} src={imgs[index]} alt="" onClick={e => e.stopPropagation()} style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '2px' }} />
      <button onClick={e => { e.stopPropagation(); onNext() }} style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>›</button>
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
    </motion.div>
  )
}

export default function DestinationDetail({ dest, onBack }: { dest: Destination; onBack: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src={dest.headerImg} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,43,64,0.4) 0%, rgba(18,43,64,0.7) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '1rem', textAlign: 'left', fontFamily: 'DM Sans, sans-serif' }}>
            ← Alle Destinationen
          </button>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
            {dest.country} Destination
          </p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}>{dest.name}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem' }} className="dest-detail-grid">
          {/* Main content */}
          <div>
            <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.9, marginBottom: '2.5rem' }}>{dest.intro}</p>

            {/* Highlights */}
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Highlights</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2.5rem' }}>
              {dest.highlights.map(h => (
                <li key={h} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9rem', color: '#444' }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '1rem' }}>✓</span> {h}
                </li>
              ))}
            </ul>

            {/* Regionen */}
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Regionen & Packages</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
              {dest.regions.map(r => (
                <div key={r.name} style={{ padding: '1.25rem', background: 'var(--gray-light)', borderLeft: '3px solid var(--blue)', borderRadius: '0 4px 4px 0' }}>
                  <h3 style={{ fontSize: '0.95rem', color: 'var(--navy)', fontWeight: 700, marginBottom: '0.4rem' }}>{r.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#555', lineHeight: 1.7 }}>{r.desc}</p>
                </div>
              ))}
            </div>

            {/* Extended Sections */}
            {dest.extendedSections?.map(section => (
              <div key={section.heading} style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1rem' }}>{section.heading}</h2>
                <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.85 }}>{section.text}</p>
              </div>
            ))}

            {/* General Info Table */}
            {dest.infoTable && (
              <div style={{ marginTop: '2rem', marginBottom: '2.5rem' }}>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Allgemeine Informationen</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <tbody>
                    {Object.entries(dest.infoTable).map(([key, val]) => (
                      <tr key={key} style={{ borderBottom: '1px solid #e8ecf0' }}>
                        <td style={{ padding: '0.75rem 1rem 0.75rem 0', color: '#666', fontWeight: 600, width: '40%', verticalAlign: 'top' }}>{infoLabels[key] ?? key}</td>
                        <td style={{ padding: '0.75rem 0', color: 'var(--navy)' }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Gallery */}
            {dest.gallery.length > 0 && (
              <>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.25rem' }}>Fotogalerie</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {dest.gallery.map((img, i) => (
                    <div key={img} onClick={() => setLightbox(i)} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', borderRadius: '3px', background: '#eee' }}>
                      <img src={img} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '4px', padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Reisedaten</h3>
              {[
                { icon: '📅', label: 'Beste Reisezeit', val: dest.bestTime },
                { icon: '⚓', label: 'Schwierigkeit', val: dest.difficulty },
                { icon: '🗺️', label: 'Revier', val: dest.distance },
              ].map(s => (
                <div key={s.label} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '1.1rem' }}>{s.icon}</span>
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                    <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{s.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {dest.mapImg && (
              <img src={dest.mapImg} alt={`Karte ${dest.name}`} loading="lazy" style={{ width: '100%', borderRadius: '4px', marginBottom: '1.5rem' }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            )}

            <a href="#kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Törn nach {dest.name} anfragen →
            </a>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <LightboxDest imgs={dest.gallery} index={lightbox} onClose={() => setLightbox(null)}
            onPrev={() => setLightbox(i => (i! - 1 + dest.gallery.length) % dest.gallery.length)}
            onNext={() => setLightbox(i => (i! + 1) % dest.gallery.length)}
          />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .dest-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
