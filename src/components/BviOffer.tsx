import { useState } from 'react'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './Icons'
import Lightbox, { type LightboxState } from './Lightbox'

// Kojen-Angebot British Virgin Islands — Februar/März 2027. Einmaliges
// Termin-Angebot, daher (anders als die Packages) nicht in
// components/Packages.tsx gepflegt, sondern eigenständig hier, nach dem
// Muster von DubrovnikOffer.tsx (selbes Boot: Katamaran Bali, selber
// Skipper Manuel, selbe "Koje statt ganze Kabine"-Logik, Reise nur fix
// ab Mindestteilnehmerzahl).

const WHATSAPP_NUMBER = '436602652481'

const days = {
  de: [
    { date: 'Sa 27.02.', place: 'Hodge’s Creek Marina, Tortola', text: 'Check-in ab 17:00 in der Hodge’s Creek Marina an der geschützten Südostküste von Tortola. Kabinen beziehen, Einweisung durch Manuel, Einkauf für die ersten Tage und erstes Abendessen in der Marina.' },
    { date: 'So 28.02.', place: 'Peter Island', text: 'An Road Town vorbei über den Sir Francis Drake Channel nach Peter Island. Baden und Schnorcheln am Palmenstrand der Deadman’s Bay, Nacht in einer ruhigen Bucht an der Nordseite.' },
    { date: 'Mo 01.03.', place: 'Salt Island · Cooper Island', text: 'Vormittags Schnorcheln am Wrack der RMS Rhone vor Salt Island, 1867 im Hurrikan gesunken. Nachmittags nach Cooper Island: Schildkröten in der Manchioneel Bay, Sundowner im Beach Club, Nacht an der Mooring.' },
    { date: 'Di 02.03.', place: 'The Baths · Spanish Town', text: 'Früh hinüber nach Virgin Gorda in den Nationalpark The Baths: durch die Felsengänge zwischen den Granitblöcken bis zum Strand der Devil’s Bay. Am Nachmittag in den Yachthafen von Spanish Town.' },
    { date: 'Mi 03.03.', place: 'North Sound · Bitter End', text: 'Entlang der Westküste von Virgin Gorda in den North Sound, die große geschützte Lagune. Sundowner auf Saba Rock und Abendessen am Bitter End.' },
    { date: 'Do 04.03.', place: 'Anegada', text: 'Durch das Riff hinaus nach Anegada, der einzigen flachen Koralleninsel der BVI. Mit dem Taxi zum Cow Wreck Beach, am Abend frischer Hummer direkt am Strand von Setting Point.' },
    { date: 'Fr 05.03.', place: 'Marina Cay', text: 'Zurück Richtung Tortola zur kleinen Insel Marina Cay vor Beef Island. Schnorcheln am Riff rund um die Insel und Sundowner an der Strandbar.' },
    { date: 'Sa 06.03.', place: 'Cane Garden Bay, Tortola', text: 'Entlang der grünen Nordküste von Tortola in die weite Cane Garden Bay. Baden am Palmenstrand und Besuch der alten Rumdestillerie Callwood, die seit über 200 Jahren Rum brennt.' },
    { date: 'So 07.03.', place: 'Jost Van Dyke', text: 'Hinüber nach Jost Van Dyke: an Land geht es schwimmend zur Soggy Dollar Bar an der White Bay, der Heimat des Painkillers. Am Abend in Great Harbour, Live-Musik im legendären Foxy’s.' },
    { date: 'Mo 08.03.', place: 'Jost Van Dyke → Marina', text: 'Um das Westende von Tortola und durch den Sir Francis Drake Channel zurück. Am Abend Ankunft in der Hodge’s Creek Marina, Abschiedsessen an Land.' },
    { date: 'Di 09.03.', place: 'Hodge’s Creek Marina, Tortola', text: 'Check-out bis 10:00.' },
  ],
  en: [
    { date: 'Sat 27 Feb', place: 'Hodge’s Creek Marina, Tortola', text: 'Check-in from 17:00 at Hodge’s Creek Marina on the sheltered south-east coast of Tortola. Settle into your cabins, briefing by Manuel, shopping for the first few days and a first dinner at the marina.' },
    { date: 'Sun 28 Feb', place: 'Peter Island', text: 'Past Road Town through the Sir Francis Drake Channel to Peter Island. Swimming and snorkelling at the palm-lined beach of Deadman’s Bay, night in a quiet bay on the north side.' },
    { date: 'Mon 1 Mar', place: 'Salt Island · Cooper Island', text: 'Morning snorkelling at the wreck of the RMS Rhone off Salt Island, sunk in a hurricane in 1867. In the afternoon on to Cooper Island: turtles in Manchioneel Bay, sundowners at the beach club, night on a mooring.' },
    { date: 'Tue 2 Mar', place: 'The Baths · Spanish Town', text: 'Early crossing to Virgin Gorda and the Baths National Park: through the rock passages between the granite boulders down to the beach at Devil’s Bay. In the afternoon into the marina at Spanish Town.' },
    { date: 'Wed 3 Mar', place: 'North Sound · Bitter End', text: 'Along the west coast of Virgin Gorda into the North Sound, the large sheltered lagoon. Sundowners on Saba Rock and dinner at Bitter End.' },
    { date: 'Thu 4 Mar', place: 'Anegada', text: 'Through the reef out to Anegada, the only low coral island of the BVI. By taxi to Cow Wreck Beach, fresh lobster right on the beach at Setting Point in the evening.' },
    { date: 'Fri 5 Mar', place: 'Marina Cay', text: 'Back towards Tortola to the small island of Marina Cay off Beef Island. Snorkelling on the reef around the island and sundowners at the beach bar.' },
    { date: 'Sat 6 Mar', place: 'Cane Garden Bay, Tortola', text: 'Along Tortola’s green north coast into the wide Cane Garden Bay. Swimming at the palm beach and a visit to the old Callwood Rum Distillery, making rum here for over 200 years.' },
    { date: 'Sun 7 Mar', place: 'Jost Van Dyke', text: 'Across to Jost Van Dyke: you swim ashore to the Soggy Dollar Bar at White Bay, home of the Painkiller. In the evening at Great Harbour, live music at the legendary Foxy’s.' },
    { date: 'Mon 8 Mar', place: 'Jost Van Dyke → Marina', text: 'Around the western tip of Tortola and back through the Sir Francis Drake Channel. Arrival at Hodge’s Creek Marina in the evening, farewell dinner on land.' },
    { date: 'Tue 9 Mar', place: 'Hodge’s Creek Marina, Tortola', text: 'Check-out by 10:00.' },
  ],
}

const gallery = {
  de: [
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-strand-yacht.webp', alt: 'Weißer Sandstrand bei The Baths mit Yacht vor Anker' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-white-bay.webp', alt: 'White Bay auf Jost Van Dyke' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-grotte.webp', alt: 'Durch die Felsengrotten von The Baths' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-anegada-hummer.webp', alt: 'Frischer Hummer auf Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-loblolly-bay.webp', alt: 'Loblolly Bay auf Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-cooper-manchioneel.webp', alt: 'Manchioneel Bay auf Cooper Island von oben' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-anegada-reef-hotel.webp', alt: 'Steg am Anegada Reef Hotel' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-soggy-dollar.webp', alt: 'Soggy Dollar Bar an der White Bay, Jost Van Dyke' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-cow-wreck-beach.webp', alt: 'Strandbar am Cow Wreck Beach, Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-3.webp', alt: 'Granitfelsen und Sandstrand von The Baths, Virgin Gorda' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-palmenstrand.webp', alt: 'Palmenstrand mit türkisem Wasser in den BVI' },
  ],
  en: [
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-strand-yacht.webp', alt: 'White sandy beach at the Baths with a yacht at anchor' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-white-bay.webp', alt: 'White Bay on Jost Van Dyke' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-grotte.webp', alt: 'Through the rock grottoes of the Baths' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-anegada-hummer.webp', alt: 'Fresh lobster on Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-loblolly-bay.webp', alt: 'Loblolly Bay on Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-cooper-manchioneel.webp', alt: 'Manchioneel Bay on Cooper Island from above' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-anegada-reef-hotel.webp', alt: 'Jetty at the Anegada Reef Hotel' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-soggy-dollar.webp', alt: 'Soggy Dollar Bar at White Bay, Jost Van Dyke' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-cow-wreck-beach.webp', alt: 'Beach bar at Cow Wreck Beach, Anegada' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-baths-3.webp', alt: 'Granite boulders and sandy beach at the Baths, Virgin Gorda' },
    { src: '/images/kabinen/karibik-bvi/gallery/g-palmenstrand.webp', alt: 'Palm-lined beach with turquoise water in the BVI' },
  ],
}

const yachtDetails = {
  de: [
    { src: '/images/kabinen/karibik-bvi/hero.webp', alt: 'Katamaran Bali 4.2 von oben', caption: 'Bali 4.2 von oben' },
    { src: '/images/kabinen/karibik-bvi/flybridge.webp', alt: 'Flybridge mit Liegefläche und Steuerstand', caption: 'Flybridge mit Liegefläche' },
    { src: '/images/kabinen/karibik-bvi/cockpit.webp', alt: 'Vorderes Cockpit mit Sonnenpolstern und Tisch', caption: 'Vorderes Cockpit & Sonnenpolster' },
    { src: '/images/kabinen/karibik-bvi/salon.webp', alt: 'Salon mit Esstisch und Sitzecke', caption: 'Salon' },
    { src: '/images/kabinen/karibik-bvi/doppelkabine.webp', alt: 'Doppelkabine mit Fenster', caption: 'Doppelkabine' },
  ],
  en: [
    { src: '/images/kabinen/karibik-bvi/hero.webp', alt: 'Catamaran Bali 4.2 seen from above', caption: 'Bali 4.2 from above' },
    { src: '/images/kabinen/karibik-bvi/flybridge.webp', alt: 'Flybridge with sun deck and helm station', caption: 'Flybridge with sun deck' },
    { src: '/images/kabinen/karibik-bvi/cockpit.webp', alt: 'Front cockpit with sun pads and table', caption: 'Foredeck & sun pads' },
    { src: '/images/kabinen/karibik-bvi/salon.webp', alt: 'Salon with dining table and seating area', caption: 'Salon' },
    { src: '/images/kabinen/karibik-bvi/doppelkabine.webp', alt: 'Double cabin with window', caption: 'Double cabin' },
  ],
}

const goodToKnow = {
  de: [
    ['Klima im Februar/März', 'Trockenzeit in der Karibik: rund 27–29 °C Luft und um die 25–26 °C Wasser. Der Passat weht beständig aus Ost bis Nordost, ideal zum Segeln.'],
    ['Einreise', 'Die BVI sind britisches Überseegebiet. Nötig ist ein Reisepass, der noch mindestens 6 Monate gültig ist. Bei Anreise über die USA zusätzlich ESTA.'],
    ['Bezahlen', 'Bezahlt wird in US-Dollar, meist auch mit Karte. Für Moorings, Strandbars und Taxis etwas Bargeld in Dollar einstecken.'],
    ['Nationalparks & Steuern', 'Nationalpark-Gebühr (z. B. für The Baths und das Wrack der RMS Rhone), Cruising Tax und VISAR sind im Kojenpreis bereits enthalten.'],
    ['Gepäck', 'Weiche Reisetasche statt Hartschalenkoffer. Schnorchelbrille, riffschonende Sonnencreme und leichte Kleidung für die Abende einpacken.'],
  ],
  en: [
    ['Climate in February/March', 'Dry season in the Caribbean: around 27–29 °C air and about 25–26 °C water. The trade wind blows steadily from east to north-east, ideal for sailing.'],
    ['Entry requirements', 'The BVI are a British Overseas Territory. A passport valid for at least 6 more months is required. An additional ESTA is needed when entering via the US.'],
    ['Paying', 'Payment is in US dollars, cards are widely accepted too. Bring a bit of cash in dollars for moorings, beach bars and taxis.'],
    ['National parks & taxes', 'The national park fee (e.g. for the Baths and the wreck of the RMS Rhone), cruising tax and VISAR are already included in the berth price.'],
    ['Luggage', 'Soft travel bag instead of a hard-shell suitcase. Pack snorkelling gear, reef-safe sunscreen and light clothing for the evenings.'],
  ],
}

const t = {
  de: {
    tag: 'Kojen-Angebot · Karibik',
    title: 'British Virgin Islands: 10 Nächte zwischen Tortola, Jost Van Dyke, Anegada und Virgin Gorda',
    heroAlt: 'Katamaran Bali 4.2 von oben',
    badgeDate: '27.02.–09.03.2027', badgeCabins: '4 Doppelkabinen',
    close: 'Details schließen', show: 'Details anzeigen',
    perCabin: 'pro Koje (pro Person)',
    intro: 'Mit dem Katamaran ab Tortola durch die British Virgin Islands: Schnorcheln am Wrack der RMS Rhone, die Granitfelsen von The Baths auf Virgin Gorda, Hummer und endlose Strände auf Anegada, Sundowner auf Marina Cay und Painkiller an der White Bay auf Jost Van Dyke. Kurze Etappen, türkises Wasser und konstanter Passatwind, während bei uns noch Winter ist. Gebucht wird die einzelne Koje – ideal für Alleinreisende, Paare und kleine Gruppen.',
    skipperName: 'Ihr Skipper: Manuel', skipperText: 'führt die Yacht und begleitet Sie die gesamte Reise.',
    priceLabel: 'Preis pro Koje (pro Person)', priceOld: 'statt € 2.910,–', pricePP: 'Doppelkabine zu zweit: € 4.660,–',
    minHint: 'Die Reise findet ab 6 Teilnehmern statt.',
    checkin: 'Check-in', checkinVal: 'Sa, 27.02.2027 ab 17:00',
    checkout: 'Check-out', checkoutVal: 'Di, 09.03.2027 bis 10:00',
    port: 'Hafen', portVal: 'Hodge’s Creek Marina, Tortola',
    deposit: 'Kaution', depositVal: '€ 1.000,–',
    participants: 'Teilnehmer', participantsVal: 'mind. 6 Personen',
    requestBtn: 'Koje anfragen', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: 'Hallo! Ich interessiere mich für das Kojen-Angebot British Virgin Islands (27.02.–09.03.2027) und hätte dazu noch eine Frage.',
    gallery: 'Eindrücke',
    yacht: 'Die Yacht', model: 'Modell', year: 'Baujahr', length: 'Länge', lengthVal: '12,85 m',
    cabins: 'Kabinen', cabinsVal: '4 + 1', berths: 'Kojen', berthsVal: '8 + 2 + 1', wc: 'WC', wcVal: '4 + 1',
    yachtText: 'Der Bali 4.2 (Baujahr 2024) ist ein rund 12,85 m langer Katamaran mit vier Doppelkabinen und vier Bädern für die Gäste, dazu eine eigene Skipperkabine mit WC. Typisch Bali: ein großes vorderes Cockpit statt Trampolin, ein offener Salon, der direkt ins Achtercockpit übergeht, und eine Flybridge mit Liegefläche. Dazu wenig Tiefgang für die flachen Riffbuchten vor Anegada und Jost Van Dyke.',
    equipment: 'Ausstattung',
    equipmentList: ['Autopilot, GPS-Kartenplotter auf der Flybridge, elektrische Winsch', 'Pantry mit Backofen, Herd, Kühlschrank und Tiefkühlfach, Warmwasser', 'Beiboot, Badeplattform mit Heckdusche, Bimini, Cockpittisch', 'Sonnenpolster für Vordeck und Kajütdach, Außenlautsprecher, Inverter'],
    layoutCaption: 'Grundriss Bali 4.2 (4 Doppelkabinen + Skipperkabine)',
    route: 'Die Route', routeText: 'Rundtörn ab der Hodge’s Creek Marina auf Tortola über Peter Island, Salt Island und Cooper Island zu The Baths auf Virgin Gorda, durch den North Sound nach Anegada und über Marina Cay, Cane Garden Bay und Jost Van Dyke zurück: insgesamt rund 100 Seemeilen. Meist 1 bis 3 Stunden pro Tag unterwegs, die längste Etappe (Jost Van Dyke – Hodge’s Creek, ca. 20 sm) dauert 3 bis 4 Stunden.',
    routeMapAlt: 'Routenkarte British Virgin Islands: Tortola – Peter Island – Salt Island – Cooper Island – The Baths – Spanish Town – Bitter End – Anegada – Marina Cay – Cane Garden Bay – Jost Van Dyke – Tortola',
    routeNote: 'Routenänderungen je nach Wind und Wetter vorbehalten. Die Entscheidung trifft der Skipper vor Ort.',
    included: 'Im Kojenpreis enthalten',
    includedList: ['Koje in einer Doppelkabine für 10 Nächte', 'Skipper Manuel an Bord', 'Katamaran Bali 4.2 für die gesamte Reise', 'Nationalpark-Gebühr, BVI Cruising Tax und Seenotrettung (VISAR)', 'Bettwäsche, Handtücher, Endreinigung, Beiboot mit Außenborder'],
    notIncluded: 'Nicht enthalten',
    notIncludedList: ['An- und Abreise (Flug nach Tortola)', 'Bordkasse: Verpflegung, Diesel, Moorings und Liegegebühren in Fremdhäfen', 'Kaution € 1.000,– (wird nach der Reise rückerstattet)'],
    arrival: 'Anreise',
    a1t: 'Fliegen', a1: 'Von Wien und Deutschland mit Umstieg, zum Beispiel über Antigua, St. Maarten oder San Juan, weiter mit einem Regionalflug nach Tortola (EIS). Vom Flughafen auf Beef Island sind es mit dem Taxi rund 15 Minuten bis zur Hodge’s Creek Marina.',
    a2t: 'Fähre', a2: 'Alternativ über St. Thomas (US Virgin Islands) und weiter mit der Fähre nach Road Town auf Tortola. Für die Einreise über die USA ist eine ESTA-Genehmigung nötig. Transfer zur Marina optional zubuchbar.',
    a3t: 'Check-in', a3: 'Ab 17:00 an Bord. Flüge organisieren Sie individuell. Wegen der langen Anreise empfehlen wir, schon einen Tag früher anzureisen und eine Nacht auf Tortola zu verbringen.',
    goodToKnow: 'Gut zu wissen',
    ctaTitle: '4 Doppelkabinen · ab 6 Teilnehmern', ctaSub: '27.02.–09.03.2027 · € 2.330,– pro Koje',
    waFooterPre: 'Fragen zu diesem Törn? Schreiben Sie uns gerne ',
    waFooterLink: 'auf WhatsApp', waFooterPost: '.',
    waFooterMsg: 'Hallo! Ich habe eine Frage zum Kojen-Angebot British Virgin Islands (27.02.–09.03.2027).',
    photoCredit: 'Foto: ', photoCreditName: 'David Stanley', photoCreditPlace: ', Nanaimo, Kanada',
  },
  en: {
    tag: 'Berth offer · Caribbean',
    title: 'British Virgin Islands: 10 nights between Tortola, Jost Van Dyke, Anegada and Virgin Gorda',
    heroAlt: 'Catamaran Bali 4.2 seen from above',
    badgeDate: '27 Feb–9 Mar 2027', badgeCabins: '4 double cabins',
    close: 'Close details', show: 'Show details',
    perCabin: 'per berth (per person)',
    intro: "Sail by catamaran from Tortola through the British Virgin Islands: snorkelling at the wreck of the RMS Rhone, the granite boulders of the Baths on Virgin Gorda, lobster and endless beaches on Anegada, sundowners on Marina Cay and a Painkiller at White Bay on Jost Van Dyke. Short legs, turquoise water and a steady trade wind, while it's still winter back home. You book a single berth — ideal for solo travellers, couples and small groups.",
    skipperName: 'Your skipper: Manuel', skipperText: 'sails the yacht and accompanies you for the whole trip.',
    priceLabel: 'Price per berth (per person)', priceOld: 'instead of € 2,910.–', pricePP: 'Double cabin for two: € 4,660.–',
    minHint: 'This trip runs with a minimum of 6 participants.',
    checkin: 'Check-in', checkinVal: 'Sat, 27 Feb 2027 from 17:00',
    checkout: 'Check-out', checkoutVal: 'Tue, 9 Mar 2027 until 10:00',
    port: 'Port', portVal: 'Hodge’s Creek Marina, Tortola',
    deposit: 'Deposit', depositVal: '€ 1,000.–',
    participants: 'Participants', participantsVal: 'min. 6 people',
    requestBtn: 'Request berth', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: "Hi! I'm interested in the British Virgin Islands berth offer (27 Feb–9 Mar 2027) and have a question about it.",
    gallery: 'Gallery',
    yacht: 'The yacht', model: 'Model', year: 'Year built', length: 'Length', lengthVal: '12.85 m',
    cabins: 'Cabins', cabinsVal: '4 + 1', berths: 'Berths', berthsVal: '8 + 2 + 1', wc: 'Heads', wcVal: '4 + 1',
    yachtText: "The Bali 4.2 (built 2024) is a roughly 12.85 m catamaran with four double cabins and four heads for guests, plus a separate skipper's cabin with its own toilet. Typically Bali: a large forward cockpit instead of a trampoline, an open salon that flows straight into the aft cockpit, and a flybridge with a sun deck. Plus a shallow draft for the flat, reef-lined bays off Anegada and Jost Van Dyke.",
    equipment: 'Equipment',
    equipmentList: ['Autopilot, GPS chartplotter on the flybridge, electric winch', 'Galley with oven, stove, fridge and freezer compartment, hot water', 'Dinghy, swim platform with aft shower, bimini, cockpit table', 'Sun pads for foredeck and coachroof, outdoor speakers, inverter'],
    layoutCaption: "Layout Bali 4.2 (4 double cabins + skipper's cabin)",
    route: 'The route', routeText: 'A round trip from Hodge’s Creek Marina on Tortola via Peter Island, Salt Island and Cooper Island to the Baths on Virgin Gorda, through the North Sound to Anegada and back via Marina Cay, Cane Garden Bay and Jost Van Dyke: around 100 nautical miles in total. Usually 1 to 3 hours of sailing per day, with the longest leg (Jost Van Dyke – Hodge’s Creek, approx. 20 nm) taking 3 to 4 hours.',
    routeMapAlt: 'Route map of the British Virgin Islands: Tortola – Peter Island – Salt Island – Cooper Island – The Baths – Spanish Town – Bitter End – Anegada – Marina Cay – Cane Garden Bay – Jost Van Dyke – Tortola',
    routeNote: 'Route subject to change depending on wind and weather. The skipper decides on site.',
    included: 'Included in the berth price',
    includedList: ['Berth in a double cabin for 10 nights', 'Skipper Manuel on board', 'Catamaran Bali 4.2 for the whole trip', 'National park fee, BVI cruising tax and sea rescue cover (VISAR)', 'Bed linen, towels, final cleaning, dinghy with outboard'],
    notIncluded: 'Not included',
    notIncludedList: ['Travel to/from Tortola (flights)', "Ship's kitty: food, diesel, moorings and mooring fees in other harbours", 'Deposit € 1,000.– (refunded after the trip)'],
    arrival: 'Getting there',
    a1t: 'Flying', a1: "From Vienna and Germany with a connection, for example via Antigua, St. Maarten or San Juan, then on by regional flight to Tortola (EIS). From the airport on Beef Island it's about 15 minutes by taxi to Hodge’s Creek Marina.",
    a2t: 'Ferry', a2: 'Alternatively via St. Thomas (US Virgin Islands) and then on by ferry to Road Town on Tortola. Entering via the US requires an ESTA authorisation. Transfer to the marina optionally bookable.',
    a3t: 'Check-in', a3: 'On board from 17:00. You organise your flights yourself. Given the long journey, we recommend arriving a day early and spending a night on Tortola.',
    goodToKnow: 'Good to know',
    ctaTitle: '4 double cabins · from 6 participants', ctaSub: '27 Feb–9 Mar 2027 · € 2,330.– per berth',
    waFooterPre: 'Questions about this trip? Feel free to message us ',
    waFooterLink: 'on WhatsApp', waFooterPost: '.',
    waFooterMsg: "Hi! I have a question about the British Virgin Islands berth offer (27 Feb–9 Mar 2027).",
    photoCredit: 'Photo: ', photoCreditName: 'David Stanley', photoCreditPlace: ', Nanaimo, Canada',
  },
}

const factStyle = { background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }
const factLabel = { fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }
const factValue = { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }
const h2Style = { fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }

const PLAETZE = 8 // Gästeplätze (Skipper hat eigene Kabine)
const GEBUCHT = 0 // Buchungsstand: Anzahl gebuchter Plätze
const MIN_TEILNEHMER = 6 // Reise findet ab dieser Teilnehmerzahl fix statt

export default function BviOffer({ onRequest }: { onRequest: () => void }) {
  const lang = useLang()
  const s = t[lang]
  const [open, setOpen] = useState(() => typeof window !== 'undefined' && window.location.hash === '#bvi')
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const openLightbox = (images: LightboxState['images'], index: number) => setLightbox({ images, index })
  const lightboxPrev = () => setLightbox(s => s && { ...s, index: (s.index - 1 + s.images.length) % s.images.length })
  const lightboxNext = () => setLightbox(s => s && { ...s, index: (s.index + 1) % s.images.length })
  const bookedPct = (GEBUCHT / PLAETZE) * 100
  const minMarkerPct = (MIN_TEILNEHMER / PLAETZE) * 100
  const bookedLabel = lang === 'en' ? `${GEBUCHT}/${PLAETZE} booked` : `${GEBUCHT}/${PLAETZE} gebucht`
  const freeLabel = GEBUCHT >= PLAETZE
    ? (lang === 'en' ? 'fully booked' : 'ausgebucht')
    : (lang === 'en' ? `${PLAETZE - GEBUCHT} spots left` : `noch ${PLAETZE - GEBUCHT} frei`)
  const minMarkerLabel = lang === 'en' ? `guaranteed from ${MIN_TEILNEHMER}` : `ab ${MIN_TEILNEHMER} fix`

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 3rem' }}>
    <div style={{ background: '#fff', border: '1px solid var(--gray-mid)', borderRadius: '10px', overflow: 'hidden' }}>

      {/* Kopfzeile — immer sichtbar, Klick klappt auf/zu */}
      <button
        type="button"
        className="bvi-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) auto',
          gap: '1.5rem', alignItems: 'center', padding: '1.25rem 1.5rem',
        }}
      >
        <img src="/images/kabinen/karibik-bvi/hero.webp" alt={s.heroAlt} loading="lazy"
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
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>Katamaran Bali 4.2</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>{s.badgeCabins}</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 0.9rem', marginTop: '1.25rem' }}>
            <div style={{ position: 'relative', width: '240px', maxWidth: '100%', height: '10px', borderRadius: '999px', background: '#e8ecf3' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${bookedPct}%`, borderRadius: '999px', background: 'var(--blue)' }} />
              <div style={{ position: 'absolute', left: `${minMarkerPct}%`, top: '-5px', bottom: '-5px', width: '2px', background: 'var(--gold)' }} />
              <span style={{ position: 'absolute', left: `${minMarkerPct}%`, top: '-19px', transform: 'translateX(-50%)', fontSize: '0.69rem', fontWeight: 700, color: '#8a6d00', whiteSpace: 'nowrap' }}>
                {minMarkerLabel}
              </span>
            </div>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#3d4a5c' }}>
              <strong style={{ color: 'var(--blue)' }}>{bookedLabel}</strong> · {freeLabel}
            </span>
          </div>
        </div>
        <div className="bvi-header-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#9aa1ac', textDecoration: 'line-through' }}>€ 2.910,–</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 2.330,–</span>
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

      {/* Inhalt bleibt immer im DOM — nur per CSS versteckt, nicht per {open && ...}
          aus dem Baum entfernt. Suchmaschinen und KI-Crawler klicken nie auf
          "Details anzeigen"; ohne das waeren Route, Preise und Leistungen fuer
          sie unsichtbar. */}
      <div style={{ display: open ? 'flex' : 'none', borderTop: '1px solid var(--gray-mid)', padding: 'clamp(1.25rem, 4vw, 2.5rem)', flexDirection: 'column', gap: '3rem' }}>

          {/* Intro */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <img src="/images/kabinen/karibik-bvi/hero.webp" alt={s.heroAlt} loading="lazy"
                onClick={() => openLightbox([{ src: '/images/kabinen/karibik-bvi/hero.webp', alt: s.heroAlt }], 0)}
                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '8px', display: 'block', cursor: 'zoom-in' }} />
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                {s.intro}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src="/images/kabinen/dubrovnik/skipper-manuel.webp" alt="Skipper Manuel" loading="lazy"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 20%', flexShrink: 0 }} />
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
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.3rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 2.330,–</span>
                <span style={{ fontSize: '0.88rem', color: '#3d4a5c' }}>{s.pricePP}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.7rem 0.85rem', borderRadius: '6px', background: '#fbf4d6', fontSize: '0.85rem', lineHeight: 1.4, color: '#5a4a10' }}>
                <span aria-hidden="true" style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                {s.minHint}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.55rem 1rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gray)' }}>{s.checkin}</span><span style={{ fontWeight: 600 }}>{s.checkinVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.checkout}</span><span style={{ fontWeight: 600 }}>{s.checkoutVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.port}</span><span style={{ fontWeight: 600 }}>{s.portVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.deposit}</span><span style={{ fontWeight: 600 }}>{s.depositVal}</span>
                <span style={{ color: 'var(--gray)' }}>{s.participants}</span><span style={{ fontWeight: 600 }}>{s.participantsVal}</span>
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
              {gallery[lang].map(item => item.src.includes('g-soggy-dollar') ? (
                <figure key={item.src} style={{ position: 'relative', margin: '0 0 10px', breakInside: 'avoid' }}>
                  <img src={item.src} alt={item.alt} loading="lazy"
                    onClick={() => openLightbox(gallery[lang], gallery[lang].findIndex(g => g.src === item.src))}
                    style={{ width: '100%', display: 'block', borderRadius: '8px', cursor: 'zoom-in' }}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                  <figcaption style={{ position: 'absolute', right: '8px', bottom: '6px', fontSize: '0.65rem', lineHeight: 1.3, color: '#fff', background: 'rgba(7,27,47,0.55)', padding: '2px 6px', borderRadius: '4px' }}>
                    {s.photoCredit}
                    <a href="https://www.flickr.com/people/79721788@N00" target="_blank" rel="noopener noreferrer nofollow" style={{ color: '#fff' }}>{s.photoCreditName}</a>
                    {s.photoCreditPlace}
                  </figcaption>
                </figure>
              ) : (
                <img key={item.src} src={item.src} alt={item.alt} loading="lazy"
                  onClick={() => openLightbox(gallery[lang], gallery[lang].findIndex(g => g.src === item.src))}
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid', cursor: 'zoom-in' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              ))}
            </div>
          </section>

          {/* Yacht */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.yacht}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={factStyle}><span style={factLabel}>{s.model}</span><span style={factValue}>Bali 4.2</span></div>
              <div style={factStyle}><span style={factLabel}>{s.year}</span><span style={factValue}>2024</span></div>
              <div style={factStyle}><span style={factLabel}>{s.length}</span><span style={factValue}>{s.lengthVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.cabins}</span><span style={factValue}>{s.cabinsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.berths}</span><span style={factValue}>{s.berthsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.wc}</span><span style={factValue}>{s.wcVal}</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '0.75rem' }}>
              {yachtDetails[lang].map((img, i) => (
                <figure key={img.src} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <img src={img.src} alt={img.alt} loading="lazy"
                    onClick={() => openLightbox(yachtDetails[lang], i)}
                    style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block', borderRadius: '8px', cursor: 'zoom-in' }} />
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
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <img src="/images/kabinen/karibik-bvi/grundriss.webp" alt={s.layoutCaption} loading="lazy"
                  onClick={() => openLightbox([{ src: '/images/kabinen/karibik-bvi/grundriss.webp', alt: s.layoutCaption }], 0)}
                  style={{ width: '100%', maxWidth: '240px', display: 'block', borderRadius: '6px', border: '1px solid var(--gray-mid)', cursor: 'zoom-in' }} />
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
              <img src="/images/kabinen/karibik-bvi/routenkarte.webp" alt={s.routeMapAlt} loading="lazy"
                onClick={() => openLightbox([{ src: '/images/kabinen/karibik-bvi/routenkarte.webp', alt: s.routeMapAlt }], 0)}
                style={{ display: 'block', width: '100%', height: 'auto', cursor: 'zoom-in' }} />
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
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>{s.a3}</span>
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
    </div>

      <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--gray)', margin: '0.85rem 0 0' }}>
        {s.waFooterPre}
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(s.waFooterMsg)}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontWeight: 600 }}>
          {s.waFooterLink}
        </a>
        {s.waFooterPost}
      </p>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onPrev={lightboxPrev} onNext={lightboxNext} label={s.gallery} />

      <style>{`
        @media (max-width: 640px) {
          .bvi-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .bvi-header-price { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
