import { useState } from 'react'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './Icons'

// Kabinen-Angebot Phuket, Thailand — Februar 2027. Einmaliges Termin-
// Angebot, daher (anders als die Packages) nicht in components/Packages.tsx
// gepflegt, sondern eigenständig hier, nach dem Muster von KohChangOffer.tsx.
// Klappt standardmäßig zu, der Button setzt die Reise-Auswahl im bestehenden
// Buchungsformular der Seite und scrollt dorthin.

const WHATSAPP_NUMBER = '436602652481'

const days = {
  de: [
    { date: 'Di 02.02.', place: 'Ao Po Grand Marina', text: 'Check-in ab 15:00 in der Ao Po Grand Marina an der Nordostküste Phukets. Kabinen beziehen, Einweisung durch Philip, Einkauf für die ersten Tage und erstes Abendessen in der Marina.' },
    { date: 'Mi 03.02.', place: 'Koh Phanak', text: 'Erster Schlag in die Phang-Nga-Bucht mit ihren Kalksteinfelsen. Mit dem Beiboot in die Meereshöhlen und versteckten „Hongs“ (Lagunen im Felsinneren) von Koh Phanak. Abendessen an Bord, Nacht vor Anker.' },
    { date: 'Do 04.02.', place: 'Koh Roi', text: 'Kurzer Hüpfer zur kleinen, unberührten Insel mit begehbarer Höhle, Sandstrand und Korallen zum Schnorcheln. Wer mag, fährt früh morgens den Abstecher zu James Bond Island (Khao Phing Kan) und zum Stelzendorf Koh Panyee, bevor die Ausflugsboote kommen (zusätzlich ca. 20 sm). Abendessen unter Sternen.' },
    { date: 'Fr 05.02.', place: 'Koh Hong (Krabi)', text: 'Nördlich um Koh Yao Noi herum, Badestopp an Koh Pakbia. Am Nachmittag mit dem Beiboot durch die schmale Felsöffnung in die smaragdgrüne Lagune von Koh Hong (je nach Tide). Nacht vor Anker an der Lagunenseite.' },
    { date: 'Sa 06.02.', place: 'Railay', text: 'Entlang der Küste von Krabi nach Railay: West Railay mit feinem Sand, weltbekannten Kletterfelsen und Sonnenuntergang, zu Fuß zum Phra Nang Beach. Abendessen mit den Füßen im Sand; Ao Nang zum Bummeln liegt gleich nebenan.' },
    { date: 'So 07.02.', place: 'Koh Poda · Chicken Island', text: 'Inseltag vor Krabi: weiße Strände auf Koh Poda, die Sandbank von Koh Tup und der „Hühnerkopf“-Felsen von Chicken Island. Schnorcheln im klaren Wasser, ruhige Nacht vor Anker.' },
    { date: 'Mo 08.02.', place: 'Koh Phi Phi Don', text: 'Über offenes Wasser nach Phi Phi. Tonsai Village mit Restaurants, Bars und Läden, Wanderung zum Phi Phi Viewpoint, Wasser und Proviant auffüllen. Abends die Feuershows an der Loh-Dalum-Bucht.' },
    { date: 'Di 09.02.', place: 'Koh Phi Phi Leh · Monkey Beach', text: 'Früh los, bevor die Ausflugsboote kommen: mit dem Beiboot in die Pileh-Lagune. Die Maya Bay erreicht man nur über den Ponton in der Loh-Samah-Bucht und einen kurzen Steg; Baden ist dort nicht erlaubt. Nachmittags Schnorcheln an der Monkey Beach, Nacht wieder vor Phi Phi Don.' },
    { date: 'Mi 10.02.', place: 'Koh Rang Yai', text: 'Längste Etappe zurück Richtung Phuket, mit Mittags- und Schnorchelstopp an Koh Khai. Danach weiter nach Koh Rang Yai: Palmenstrände und ruhiges, klares Wasser zum Schwimmen.' },
    { date: 'Do 11.02.', place: 'Koh Yao Noi', text: 'Westküste von Koh Yao Noi: ländliche Insel mit Kautschukplantagen und Fischerdörfern, mit dem Roller die Insel erkunden. Abendessen in einem der ruhigen Resorts an Land.' },
    { date: 'Fr 12.02.', place: 'Koh Naka Yai → Marina', text: 'Letzter Badestopp an Koh Naka Yai mit Cocktail in der Reggae-Bar am Strand, am Nachmittag zurück in die Ao Po Grand Marina. Abschiedsessen an Land.' },
    { date: 'Sa 13.02.', place: 'Ao Po Grand Marina', text: 'Check-out bis 09:00.' },
  ],
  en: [
    { date: 'Tue 02 Feb', place: 'Ao Po Grand Marina', text: "Check-in from 15:00 at Ao Po Grand Marina on Phuket's north-east coast. Settle into your cabin, briefing by Philip, shopping for the first few days and a first dinner at the marina." },
    { date: 'Wed 03 Feb', place: 'Koh Phanak', text: 'First leg into Phang Nga Bay with its limestone cliffs. Take the dinghy into the sea caves and hidden "hongs" (lagoons inside the rock) of Koh Phanak. Dinner on board, night at anchor.' },
    { date: 'Thu 04 Feb', place: 'Koh Roi', text: 'A short hop to the small, unspoilt island with a walk-in cave, sandy beach and coral for snorkelling. Early risers can take the detour to James Bond Island (Khao Phing Kan) and the stilted village of Koh Panyee before the tour boats arrive (an extra approx. 20 nm). Dinner under the stars.' },
    { date: 'Fri 05 Feb', place: 'Koh Hong (Krabi)', text: 'North around Koh Yao Noi, with a swim stop at Koh Pakbia. In the afternoon, take the dinghy through the narrow rock opening into the emerald-green lagoon of Koh Hong (tide-dependent). Night at anchor off the lagoon.' },
    { date: 'Sat 06 Feb', place: 'Railay', text: 'Along the Krabi coast to Railay: West Railay with fine sand, world-famous climbing cliffs and sunset, a short walk to Phra Nang Beach. Dinner with your feet in the sand; Ao Nang is right next door for strolling.' },
    { date: 'Sun 07 Feb', place: 'Koh Poda · Chicken Island', text: 'An island day off Krabi: white beaches on Koh Poda, the Koh Tup sandbank and the "chicken head" rock of Chicken Island. Snorkelling in clear water, a quiet night at anchor.' },
    { date: 'Mon 08 Feb', place: 'Koh Phi Phi Don', text: 'Across open water to Phi Phi. Tonsai Village with restaurants, bars and shops, a hike up to the Phi Phi Viewpoint, restock water and supplies. Fire shows on Loh Dalum Bay in the evening.' },
    { date: 'Tue 09 Feb', place: 'Koh Phi Phi Leh · Monkey Beach', text: 'An early start before the tour boats arrive: dinghy into the Pileh Lagoon. Maya Bay can only be reached via the pontoon in Loh Samah Bay and a short jetty; swimming is not allowed there. Snorkelling at Monkey Beach in the afternoon, another night off Phi Phi Don.' },
    { date: 'Wed 10 Feb', place: 'Koh Rang Yai', text: 'The longest leg, back towards Phuket, with a lunch and snorkelling stop at Koh Khai. Then on to Koh Rang Yai: palm-lined beaches and calm, clear water for swimming.' },
    { date: 'Thu 11 Feb', place: 'Koh Yao Noi', text: 'The west coast of Koh Yao Noi: a rural island with rubber plantations and fishing villages, explore the island by scooter. Dinner at one of the quiet resorts on land.' },
    { date: 'Fri 12 Feb', place: 'Koh Naka Yai → Marina', text: 'A last swim stop at Koh Naka Yai with a cocktail at the beach reggae bar, back to Ao Po Grand Marina in the afternoon. Farewell dinner on land.' },
    { date: 'Sat 13 Feb', place: 'Ao Po Grand Marina', text: 'Check-out by 09:00.' },
  ],
}

const gallery = {
  de: [
    { src: '/images/kabinen/phuket/gallery/g-pileh-lagune-luft.webp', alt: 'Pileh-Lagune an Koh Phi Phi Leh aus der Luft' },
    { src: '/images/kabinen/phuket/gallery/g-phra-nang-beach.webp', alt: 'Kalksteinfelsen am Phra Nang Beach, Railay' },
    { src: '/images/kabinen/phuket/gallery/g-longtail-pileh.webp', alt: 'Longtail-Boote im türkisen Wasser der Pileh-Lagune' },
    { src: '/images/kabinen/phuket/gallery/g-sandbank-krabi.webp', alt: 'Sandbank zwischen zwei Inseln vor Krabi' },
    { src: '/images/kabinen/phuket/gallery/g-tonsai-loh-dalum.webp', alt: 'Tonsai- und Loh-Dalum-Bucht auf Koh Phi Phi Don' },
  ],
  en: [
    { src: '/images/kabinen/phuket/gallery/g-pileh-lagune-luft.webp', alt: 'Pileh Lagoon off Koh Phi Phi Leh from the air' },
    { src: '/images/kabinen/phuket/gallery/g-phra-nang-beach.webp', alt: 'Limestone cliffs at Phra Nang Beach, Railay' },
    { src: '/images/kabinen/phuket/gallery/g-longtail-pileh.webp', alt: 'Longtail boats in the turquoise water of Pileh Lagoon' },
    { src: '/images/kabinen/phuket/gallery/g-sandbank-krabi.webp', alt: 'Sandbank between two islands off Krabi' },
    { src: '/images/kabinen/phuket/gallery/g-tonsai-loh-dalum.webp', alt: 'Tonsai and Loh Dalum bays on Koh Phi Phi Don' },
  ],
}

const yachtDetails = {
  de: [
    { src: '/images/kabinen/phuket/flybridge.webp', alt: 'Flybridge mit Liegefläche und Lounge', caption: 'Flybridge mit Lounge' },
    { src: '/images/kabinen/phuket/vordeck.webp', alt: 'Vordeck mit Sonnenpolstern und Trampolin', caption: 'Vordeck & Trampolin' },
    { src: '/images/kabinen/phuket/salon.webp', alt: 'Salon mit Pantry', caption: 'Salon & Pantry' },
    { src: '/images/kabinen/phuket/doppelkabine.webp', alt: 'Doppelkabine mit Klimaanlage', caption: 'Doppelkabine' },
  ],
  en: [
    { src: '/images/kabinen/phuket/flybridge.webp', alt: 'Flybridge with sun deck and lounge', caption: 'Flybridge with lounge' },
    { src: '/images/kabinen/phuket/vordeck.webp', alt: 'Foredeck with sun pads and trampoline', caption: 'Foredeck & trampoline' },
    { src: '/images/kabinen/phuket/salon.webp', alt: 'Salon with galley', caption: 'Salon & galley' },
    { src: '/images/kabinen/phuket/doppelkabine.webp', alt: 'Double cabin with air conditioning', caption: 'Double cabin' },
  ],
}

const goodToKnow = {
  de: [
    ['Klima im Februar', 'Trockenzeit und beste Segelsaison an der Andamanensee. Rund 32 °C Luft, ca. 28–29 °C Wasser, ruhige See und Nordostwind.'],
    ['Einreise', 'Für österreichische und deutsche Staatsbürger visumfrei. Vor Abflug online die Thailand Digital Arrival Card (TDAC) ausfüllen.'],
    ['Bargeld', 'Thai Baht mitnehmen. Nationalparkgebühren werden bar bezahlt, auf Koh Phanak, Koh Roi und Koh Rang Yai gibt es keine Bankomaten.'],
    ['Zeitverschiebung', '+6 Stunden gegenüber MEZ.'],
    ['Gepäck', 'Weiche Reisetasche statt Hartschalenkoffer. Schnorchelbrille und riffschonende Sonnencreme einpacken: In thailändischen Nationalparks sind Sonnencremes mit Oxybenzon, Octinoxat, 4-MBC und Butylparaben verboten.'],
  ],
  en: [
    ['Climate in February', 'Dry season and the best sailing season on the Andaman Sea. Around 32 °C air, approx. 28–29 °C water, calm seas and north-easterly wind.'],
    ['Entry requirements', 'Visa-free for Austrian and German citizens. Fill in the Thailand Digital Arrival Card (TDAC) online before departure.'],
    ['Cash', 'Bring Thai Baht. National park fees are paid in cash; there are no ATMs on Koh Phanak, Koh Roi or Koh Rang Yai.'],
    ['Time difference', '+6 hours compared to CET.'],
    ['Luggage', 'Soft travel bag instead of a hard-shell suitcase. Pack snorkelling gear and reef-safe sunscreen: sunscreens containing oxybenzone, octinoxate, 4-MBC and butylparaben are banned in Thai national parks.'],
  ],
}

const t = {
  de: {
    tag: 'Kabinen-Angebot · Thailand',
    title: 'Phuket: 11 Nächte Inselhüpfen in der Phang-Nga-Bucht',
    badgeDate: '02.–13.02.2027', badgeCabins: '4 Doppelkabinen',
    close: 'Details schließen', show: 'Details anzeigen',
    perCabin: 'pro Doppelkabine',
    intro: 'Mit dem Katamaran ab Phuket durch die Phang-Nga-Bucht und zu den Inseln vor Krabi: Kalksteinfelsen, versteckte Lagunen, Railay und Koh Phi Phi. Kurze Etappen, ruhige Ankerbuchten und Februar-Trockenzeit. Gebucht wird die ganze Doppelkabine, auch als Einzelperson.',
    skipperName: 'Ihr Skipper: Philip', skipperText: 'führt die Yacht und begleitet Sie die gesamte Reise.',
    priceLabel: 'Preis pro Doppelkabine', priceOld: 'statt € 6.900,–', pricePP: 'entspricht € 2.800,– p. P. bei 2 Personen',
    soloHint: 'Alleinreisende zahlen den Kabinenpreis und haben die Kabine für sich.',
    checkin: 'Check-in', checkinVal: 'Di, 02.02.2027 ab 15:00',
    checkout: 'Check-out', checkoutVal: 'Sa, 13.02.2027 bis 09:00',
    port: 'Hafen', portVal: 'Ao Po Grand Marina, Phuket',
    deposit: 'Kaution', depositVal: '€ 2.000,–',
    requestBtn: 'Kabine anfragen', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: 'Hallo! Ich interessiere mich für das Kabinen-Angebot Phuket (02.–13.02.2027) und hätte dazu noch eine Frage.',
    gallery: 'Eindrücke',
    yacht: 'Die Yacht', model: 'Modell', year: 'Baujahr', length: 'Länge', lengthVal: '13,94 m',
    cabins: 'Kabinen', cabinsVal: '5 + 1 Vorpiek', berths: 'Kojen', berthsVal: '10 + 2', wc: 'WC', wcVal: '5',
    yachtText: 'Der Fountaine Pajot Saona 47 „Maravelle“ ist die Quintet-Version mit fünf Doppelkabinen, fünf WCs und einer Skipper-Vorpiek mit eigener Toilette. Für diesen Törn sind 4 Doppelkabinen buchbar. Viel Platz an Deck mit Cockpit, Flybridge und Trampolin, dazu nur 1,30 m Tiefgang für die flachen Buchten der Phang-Nga-Bucht.',
    equipment: 'Ausstattung',
    equipmentList: ['Klimaanlage, Generator und Wassermacher', 'Elektrische WCs, Bugstrahlruder, Autopilot', 'Beiboot mit Außenborder und hydraulischem Lift, Schnorchelausrüstung', 'Flybridge, Bimini, Cockpit-Kühlschrank, Bluetooth-Soundsystem'],
    layoutCaption: 'Grundriss Saona 47 Quintet',
    route: 'Die Route', routeText: 'Rundtörn ab Phuket durch die Phang-Nga-Bucht, entlang der Küste von Krabi bis Koh Phi Phi und zurück über die Yao-Inseln: insgesamt rund 105 Seemeilen, mit optionalem Abstecher zu James Bond Island (gestrichelt). Meist 2 bis 4 Stunden pro Tag unterwegs, die längste Etappe (Phi Phi – Koh Rang Yai, ca. 25 sm) dauert 5 bis 6 Stunden.',
    routeMapAlt: 'Routenkarte (Abstecher James Bond Island und Koh Panyee gestrichelt): Ao Po – Koh Phanak – Koh Roi – Koh Hong – Railay – Koh Poda – Koh Phi Phi – Koh Rang Yai – Koh Yao Noi – Koh Naka Yai – Ao Po',
    routeNote: 'Routenänderungen je nach Wind und Wetter vorbehalten. Die Entscheidung trifft der Skipper vor Ort.',
    included: 'Im Kabinenpreis enthalten',
    includedList: ['Doppelkabine für 11 Nächte (1 oder 2 Personen)', 'Skipper Philip an Bord', 'Katamaran Saona 47 „Maravelle“ für die gesamte Reise'],
    notIncluded: 'Nicht enthalten',
    notIncludedList: ['An- und Abreise', 'Bordkasse: Verpflegung, Diesel, Liege- und Nationalparkgebühren (z. B. Phi Phi, Phang-Nga-Bucht)', 'Kaution € 2.000,– (wird nach der Reise rückerstattet)'],
    optional: 'Optional zubuchbar (pro Yacht)',
    optionalList: ['Kajak € 20,– / Tag', 'Stand-up-Paddle (SUP) € 25,– / Tag', 'Bordgrill € 40,– / Woche', 'WLAN an Bord € 150,– / Woche'],
    arrival: 'Anreise',
    a1t: '1 · Flug', a1: 'Ab Wien (VIE) oder München (MUC) mit einem Umstieg (z. B. Bangkok, Doha oder Dubai) direkt nach Phuket (HKT). Ab ca. € 700,–.',
    a2t: '2 · Taxi', a2: 'Vom Flughafen Phuket sind es mit dem Taxi nur rund 30 bis 40 Minuten bis zur Ao Po Grand Marina an der Nordostküste der Insel.',
    a3t: '3 · Check-in', a3pre: 'Ab 15:00 an Bord. Flüge und Transfers organisieren Sie individuell. Wir empfehlen, ', a3bold: 'mind.', a3post: ' 1 Tag früher anzureisen.',
    goodToKnow: 'Gut zu wissen',
    ctaTitle: 'Nur 4 Doppelkabinen verfügbar', ctaSub: '02.–13.02.2027 · € 5.600,– pro Kabine',
    waFooterPre: 'Fragen zu diesem Törn? Schreiben Sie uns gerne ',
    waFooterLink: 'auf WhatsApp', waFooterPost: '.',
    waFooterMsg: 'Hallo! Ich habe eine Frage zum Kabinen-Angebot Phuket (02.–13.02.2027).',
  },
  en: {
    tag: 'Cabin offer · Thailand',
    title: 'Phuket: 11 nights island-hopping in Phang Nga Bay',
    badgeDate: '02–13 Feb 2027', badgeCabins: '4 double cabins',
    close: 'Close details', show: 'Show details',
    perCabin: 'per double cabin',
    intro: 'Sail from Phuket through Phang Nga Bay and the islands off Krabi by catamaran: limestone cliffs, hidden lagoons, Railay and Koh Phi Phi. Short legs, calm anchorages and the February dry season. You book the whole double cabin, even as a solo traveller.',
    skipperName: 'Your skipper: Philip', skipperText: 'sails the yacht and accompanies you for the whole trip.',
    priceLabel: 'Price per double cabin', priceOld: 'instead of € 6,900.–', pricePP: 'equals € 2,800.– p.p. for 2 people',
    soloHint: 'Solo travellers pay the cabin price and have the cabin to themselves.',
    checkin: 'Check-in', checkinVal: 'Tue, 02 Feb 2027 from 15:00',
    checkout: 'Check-out', checkoutVal: 'Sat, 13 Feb 2027 until 09:00',
    port: 'Port', portVal: 'Ao Po Grand Marina, Phuket',
    deposit: 'Deposit', depositVal: '€ 2,000.–',
    requestBtn: 'Request cabin', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: "Hi! I'm interested in the Phuket cabin offer (02–13 Feb 2027) and have a question about it.",
    gallery: 'Gallery',
    yacht: 'The yacht', model: 'Model', year: 'Year built', length: 'Length', lengthVal: '13.94 m',
    cabins: 'Cabins', cabinsVal: '5 + 1 forepeak', berths: 'Berths', berthsVal: '10 + 2', wc: 'Heads', wcVal: '5',
    yachtText: "The Fountaine Pajot Saona 47 'Maravelle' is the Quintet version with five double cabins, five heads and a skipper's forepeak with its own toilet. 4 double cabins are bookable for this trip. Plenty of space on deck with a cockpit, flybridge and trampoline, plus a shallow draft of just 1.30 m for the shallow bays of Phang Nga Bay.",
    equipment: 'Equipment',
    equipmentList: ['Air conditioning, generator and water maker', 'Electric toilets, bow thruster, autopilot', 'Dinghy with outboard and hydraulic lift, snorkelling gear', 'Flybridge, bimini, cockpit fridge, Bluetooth sound system'],
    layoutCaption: 'Layout Saona 47 Quintet',
    route: 'The route', routeText: 'A round trip from Phuket through Phang Nga Bay, along the Krabi coast to Koh Phi Phi and back via the Yao Islands: around 105 nautical miles in total, with an optional detour to James Bond Island (dashed). Usually 2 to 4 hours of sailing per day, with the longest leg (Phi Phi – Koh Rang Yai, approx. 25 nm) taking 5 to 6 hours.',
    routeMapAlt: 'Route map (detour to James Bond Island and Koh Panyee dashed): Ao Po – Koh Phanak – Koh Roi – Koh Hong – Railay – Koh Poda – Koh Phi Phi – Koh Rang Yai – Koh Yao Noi – Koh Naka Yai – Ao Po',
    routeNote: 'Route subject to change depending on wind and weather. The skipper decides on site.',
    included: 'Included in the cabin price',
    includedList: ['Double cabin for 11 nights (1 or 2 people)', 'Skipper Philip on board', "Catamaran Saona 47 'Maravelle' for the whole trip"],
    notIncluded: 'Not included',
    notIncludedList: ['Travel to/from the marina', "Ship's kitty: food, diesel, mooring and national park fees (e.g. Phi Phi, Phang Nga Bay)", 'Deposit € 2,000.– (refunded after the trip)'],
    optional: 'Optional add-ons (per yacht)',
    optionalList: ['Kayak € 20.– / day', 'Stand-up paddleboard (SUP) € 25.– / day', 'BBQ € 40.– / week', 'WiFi on board € 150.– / week'],
    arrival: 'Getting there',
    a1t: '1 · Flight', a1: 'From Vienna (VIE) or Munich (MUC) with one stopover (e.g. Bangkok, Doha or Dubai) direct to Phuket (HKT). From approx. € 700.–.',
    a2t: '2 · Taxi', a2: "From Phuket airport it's only around 30 to 40 minutes by taxi to Ao Po Grand Marina on the island's north-east coast.",
    a3t: '3 · Check-in', a3pre: 'On board from 15:00. You organise flights and transfers yourself. We recommend arriving ', a3bold: 'at least', a3post: ' 1 day early.',
    goodToKnow: 'Good to know',
    ctaTitle: 'Only 4 double cabins available', ctaSub: '02–13 Feb 2027 · € 5,600.– per cabin',
    waFooterPre: 'Questions about this trip? Feel free to message us ',
    waFooterLink: 'on WhatsApp', waFooterPost: '.',
    waFooterMsg: "Hi! I have a question about the Phuket cabin offer (02–13 Feb 2027).",
  },
}

const factStyle = { background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }
const factLabel = { fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }
const factValue = { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }
const h2Style = { fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }

export default function PhuketOffer({ onRequest }: { onRequest: () => void }) {
  const lang = useLang()
  const s = t[lang]
  const [open, setOpen] = useState(false)

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 3rem' }}>
    <div style={{ background: '#fff', border: '1px solid var(--gray-mid)', borderRadius: '10px', overflow: 'hidden' }}>

      {/* Kopfzeile — immer sichtbar, Klick klappt auf/zu */}
      <button
        type="button"
        className="ph-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) auto',
          gap: '1.5rem', alignItems: 'center', padding: '1.25rem 1.5rem',
        }}
      >
        <img src="/images/kabinen/phuket/hero.webp" alt="Saona 47 Maravelle vor Anker" loading="lazy"
          style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0, textAlign: 'left' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>
            {s.tag}
          </span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', lineHeight: 1.2, fontWeight: 800, color: 'var(--navy)' }}>
            {s.title}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 600, color: '#3d4a5c' }}>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>{s.badgeDate}</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>Saona 47 „Maravelle“</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>{s.badgeCabins}</span>
          </div>
        </div>
        <div className="ph-header-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#9aa1ac', textDecoration: 'line-through' }}>€ 6.900,–</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 5.600,–</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{s.perCabin}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)' }}>
            {open ? s.close : s.show}
            <span aria-hidden="true" style={{
              display: 'inline-block', width: '8px', height: '8px',
              borderRight: '2px solid var(--blue)', borderBottom: '2px solid var(--blue)',
              transform: open ? 'rotate(-135deg) translate(-1px,-1px)' : 'rotate(45deg) translate(-1px,-1px)',
              transition: 'transform 0.2s',
            }} />
          </span>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--gray-mid)', padding: 'clamp(1.25rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Intro */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <img src="/images/kabinen/phuket/hero.webp" alt="Saona 47 Maravelle vor Anker" loading="lazy"
                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                {s.intro}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src="/images/kabinen/phuket/skipper-philip.webp" alt="Skipper Philip" loading="lazy"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 30%', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy)' }}>{s.skipperName}</span>
                  <span style={{ color: 'var(--gray)' }}>{s.skipperText}</span>
                </div>
              </div>
            </div>
            <aside style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>{s.priceLabel}</span>
                <span style={{ fontSize: '1rem', color: '#9aa1ac', textDecoration: 'line-through' }}>{s.priceOld}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.3rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 5.600,–</span>
                <span style={{ fontSize: '0.88rem', color: '#3d4a5c' }}>{s.pricePP}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.7rem 0.85rem', borderRadius: '6px', background: '#fbf4d6', fontSize: '0.85rem', lineHeight: 1.4, color: '#5a4a10' }}>
                <span aria-hidden="true" style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {s.soloHint}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.55rem 1rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gray)' }}>{s.checkin}</span><span style={{ fontWeight: 600 }}>{s.checkinVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.checkout}</span><span style={{ fontWeight: 600 }}>{s.checkoutVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.port}</span><span style={{ fontWeight: 600 }}>{s.portVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.deposit}</span><span style={{ fontWeight: 600 }}>{s.depositVal}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="#buchungsformular" onClick={onRequest} className="btn btn-primary" style={{ textAlign: 'center', fontSize: '0.92rem' }}>
                  {s.requestBtn}
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.waMsg)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textAlign: 'center', padding: '13px', borderRadius: '6px', border: '1.5px solid var(--blue)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                  <WhatsAppIcon size={17} />{s.waBtn}
                </a>
              </div>
            </aside>
          </section>

          {/* Galerie */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.gallery}</h2>
            <div style={{ columns: '3 220px', columnGap: '10px' }}>
              {gallery[lang].map(img => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              ))}
            </div>
          </section>

          {/* Yacht */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.yacht}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={factStyle}><span style={factLabel}>{s.model}</span><span style={factValue}>Saona 47 Quintet</span></div>
              <div style={factStyle}><span style={factLabel}>{s.year}</span><span style={factValue}>2019 (Refit 2024)</span></div>
              <div style={factStyle}><span style={factLabel}>{s.length}</span><span style={factValue}>{s.lengthVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.cabins}</span><span style={factValue}>{s.cabinsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.berths}</span><span style={factValue}>{s.berthsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.wc}</span><span style={factValue}>{s.wcVal}</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem' }}>
              {yachtDetails[lang].map(img => (
                <figure key={img.src} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <img src={img.src} alt={img.alt} loading="lazy"
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', borderRadius: '8px' }} />
                  <figcaption style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{img.caption}</figcaption>
                </figure>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                  {s.yachtText}
                </p>
                <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)' }}>{s.equipment}</span>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.86rem', lineHeight: 1.5, color: '#444' }}>
                    {s.equipmentList.map(item => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <img src="/images/kabinen/phuket/grundriss.webp" alt={s.layoutCaption} loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '6px', border: '1px solid var(--gray-mid)' }} />
                <figcaption style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>{s.layoutCaption}</figcaption>
              </figure>
            </div>
          </section>

          {/* Route */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={h2Style}>{s.route}</h2>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--gray)' }}>{s.routeText}</p>
            </div>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--gray-mid)' }}>
              <img src="/images/kabinen/phuket/routenkarte.svg" alt={s.routeMapAlt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {days[lang].map(d => (
                <li key={d.date} style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr)', gap: '1rem', padding: '0.9rem 0', borderTop: '1px solid var(--gray-mid)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d.date.split(' ')[0]}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{d.date.split(' ').slice(1).join(' ')}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--blue)' }}>{d.place}</span>
                    <span style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--gray)' }}>{d.text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--gray)' }}>{s.routeNote}</p>
          </section>

          {/* Leistungen */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>{s.included}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5, color: '#444' }}>
                {s.includedList.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>{s.notIncluded}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5, color: '#444' }}>
                {s.notIncludedList.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>{s.optional}</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5, color: '#444' }}>
                {s.optionalList.map(item => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>

          {/* Anreise */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.arrival}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.a1t}</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{s.a1}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.a2t}</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{s.a2}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.a3t}</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{s.a3pre}<strong>{s.a3bold}</strong>{s.a3post}</span>
              </div>
            </div>
          </section>

          {/* Gut zu wissen */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.goodToKnow}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              {goodToKnow[lang].map(([title, text]) => (
                <div key={title} style={{ background: '#fff', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)' }}>{title}</span>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--gray)' }}>{text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'var(--navy)', color: '#fff', borderRadius: '8px', padding: '1.75rem 1.75rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', fontWeight: 800 }}>{s.ctaTitle}</span>
              <span style={{ fontSize: '0.88rem', opacity: 0.85 }}>{s.ctaSub}</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="#buchungsformular" onClick={onRequest} className="btn btn-gold">{s.requestBtn}</a>
              <a href="tel:+4319971582" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>+43 1 997 15 82</a>
            </div>
          </section>

        </div>
      )}
    </div>

      <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--gray)', margin: '0.85rem 0 0' }}>
        {s.waFooterPre}
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.waFooterMsg)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>
          {s.waFooterLink}
        </a>
        {s.waFooterPost}
      </p>

      <style>{`
        @media (max-width: 640px) {
          .ph-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .ph-header-price { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
