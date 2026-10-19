import { useState } from 'react'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './Icons'

// Kojen-Angebot Dubrovnik, Kroatien — Juni 2027. Einmaliges Termin-
// Angebot, daher (anders als die Packages) nicht in components/Packages.tsx
// gepflegt, sondern eigenständig hier, nach dem Muster von KohChangOffer.tsx
// und PhuketOffer.tsx. Klappt standardmäßig zu, der Button setzt die Reise-
// Auswahl im bestehenden Buchungsformular der Seite und scrollt dorthin.
//
// Unterschied zu den beiden Thailand-Angeboten: gebucht wird hier eine
// einzelne Koje (pro Person) in einer Doppelkabine, nicht die ganze Kabine —
// und die Reise findet nur statt, wenn sich mindestens 5 Teilnehmer finden
// (statt "Alleinreisende zahlen den Kabinenpreis").

const WHATSAPP_NUMBER = '436602652481'

const days = {
  de: [
    { date: 'Sa 12.06.', place: 'ACI Marina Dubrovnik', text: 'Check-in ab 17:00 in der ACI Marina in Komolac, ganz hinten in der geschützten Rijeka dubrovačka. Kabinen beziehen, Einweisung durch Manuel, Einkauf für die ersten Tage und erstes Abendessen in der Marina.' },
    { date: 'So 13.06.', place: 'Dubrovnik · Koločep · Lopud', text: 'Unter der Dubrovnik-Brücke hinaus aufs Meer und an den Stadtmauern der Altstadt vorbei, mit Blick auf Lokrum. Badestopp an der Blue Cave an der Südküste von Koločep, hinein geht es schwimmend. Am Nachmittag nach Lopud: zu Fuß über die Insel zur Sandbucht Šunj, Nacht vor Anker.' },
    { date: 'Mo 14.06.', place: 'Šipanska Luka → Ston', text: 'Vormittags Kaffee im kleinen Hafen von Šipanska Luka auf Šipan, der größten Elaphiten-Insel. Dann durch den Stonski kanal nach Ston: Spaziergang auf den mittelalterlichen Mauern über dem Ort, die alten Salinen und frische Austern aus Mali Ston zum Abendessen.' },
    { date: 'Di 15.06.', place: 'Korčula', text: 'Längste Etappe entlang der Südküste der Halbinsel Pelješac, mit Badestopp in einer der Buchten unterwegs. Am Abend in Korčula: die Altstadt auf ihrer Halbinsel mit engen Gassen, Stadtmauer und Kathedrale. Abendessen in der Altstadt.' },
    { date: 'Mi 16.06.', place: 'Polače · Nationalpark Mljet', text: 'Über den Mljetski kanal in die geschützte Bucht von Polače mit den Resten eines römischen Palasts. Von hier in den Nationalpark Mljet: per Rad oder zu Fuß zu den Salzseen Veliko und Malo jezero, mit dem Boot zur Klosterinsel St. Maria. Bei ruhigem Wetter alternativ über den Naturpark Lastovo (gestrichelt, zusätzlich ca. 30 sm).' },
    { date: 'Do 17.06.', place: 'Okuklje → Slano', text: 'Entlang der grünen Nordküste von Mljet, Mittags- und Badestopp in der rundum geschützten Bucht von Okuklje. Am Nachmittag hinüber zum Festland nach Slano, einem ruhigen Ort in einer tiefen Bucht. Abendessen an der Uferpromenade.' },
    { date: 'Fr 18.06.', place: 'Gruž · Dubrovnik → Marina', text: 'Durch den Koločepski kanal zurück Richtung Dubrovnik, Stopp im Hafen Gruž mit seinem Markt. Von dort in die Altstadt: Rundgang auf der Stadtmauer und durch den Stradun. Am Abend zurück in die ACI Marina, Abschiedsessen an Land.' },
    { date: 'Sa 19.06.', place: 'ACI Marina Dubrovnik', text: 'Check-out bis 09:00.' },
  ],
  en: [
    { date: 'Sat 12 Jun', place: 'ACI Marina Dubrovnik', text: "Check-in from 17:00 at ACI Marina in Komolac, tucked away at the end of the sheltered Rijeka dubrovačka. Settle into your berth, briefing by Manuel, shopping for the first few days and a first dinner at the marina." },
    { date: 'Sun 13 Jun', place: 'Dubrovnik · Koločep · Lopud', text: 'Out to sea under the Dubrovnik bridge and past the city walls of the old town, with a view of Lokrum. Swim stop at the Blue Cave on the south coast of Koločep — you swim in. In the afternoon on to Lopud: walk across the island to the sandy bay of Šunj, night at anchor.' },
    { date: 'Mon 14 Jun', place: 'Šipanska Luka → Ston', text: 'Morning coffee at the small harbour of Šipanska Luka on Šipan, the largest of the Elaphiti Islands. Then through the Ston Channel to Ston: a walk along the medieval walls above the town, the old salt pans and fresh oysters from Mali Ston for dinner.' },
    { date: 'Tue 15 Jun', place: 'Korčula', text: 'The longest leg, along the south coast of the Pelješac peninsula, with a swim stop in one of the bays along the way. In the evening at Korčula: the old town on its own little peninsula, with narrow lanes, city walls and cathedral. Dinner in the old town.' },
    { date: 'Wed 16 Jun', place: 'Polače · Mljet National Park', text: 'Through the Mljet Channel into the sheltered bay of Polače, with the remains of a Roman palace. From here into Mljet National Park: by bike or on foot to the salt lakes Veliko and Malo Jezero, by boat to the monastery island of St. Mary. In calm weather, an alternative route via Lastovo Nature Park is possible (dashed, an extra approx. 30 nm).' },
    { date: 'Thu 17 Jun', place: 'Okuklje → Slano', text: 'Along the green north coast of Mljet, with a lunch and swim stop in the fully sheltered bay of Okuklje. In the afternoon across to the mainland at Slano, a quiet spot in a deep bay. Dinner on the waterfront promenade.' },
    { date: 'Fri 18 Jun', place: 'Gruž · Dubrovnik → Marina', text: 'Through the Koločep Channel back towards Dubrovnik, with a stop at the port of Gruž and its market. From there into the old town: a walk along the city walls and down the Stradun. Back to ACI Marina in the evening, farewell dinner on land.' },
    { date: 'Sat 19 Jun', place: 'ACI Marina Dubrovnik', text: 'Check-out by 09:00.' },
  ],
}

const gallery = {
  de: [
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-trampolin-altstadt.webp', alt: 'Entspannen auf dem Trampolin vor der Altstadt von Dubrovnik' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-korcula-oben.webp', alt: 'Altstadt von Korčula von oben' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-mljet-klosterinsel.webp', alt: 'Klosterinsel St. Maria im Großen See, Nationalpark Mljet' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-ston-festung.webp', alt: 'Festung Veliki Kaštio in Ston mit den Stadtmauern im Hintergrund' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-dubrovnik-lovrijenac.webp', alt: 'Festung Lovrijenac und die Bucht unter den Stadtmauern von Dubrovnik' },
    { type: 'video' as const, src: '/images/kabinen/dubrovnik/gallery/g-video-korcula.mp4', poster: '/images/kabinen/dubrovnik/gallery/g-video-poster.webp', alt: 'Abendspaziergang durch die Altstadt von Korčula' },
  ],
  en: [
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-trampolin-altstadt.webp', alt: "Relaxing on the trampoline in front of Dubrovnik's old town" },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-korcula-oben.webp', alt: 'Old town of Korčula from above' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-mljet-klosterinsel.webp', alt: "Monastery island of St. Mary in the Great Lake, Mljet National Park" },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-ston-festung.webp', alt: 'Veliki Kaštio fortress in Ston with the city walls in the background' },
    { type: 'img' as const, src: '/images/kabinen/dubrovnik/gallery/g-dubrovnik-lovrijenac.webp', alt: "Lovrijenac Fortress and the bay beneath Dubrovnik's city walls" },
    { type: 'video' as const, src: '/images/kabinen/dubrovnik/gallery/g-video-korcula.mp4', poster: '/images/kabinen/dubrovnik/gallery/g-video-poster.webp', alt: 'Evening stroll through the old town of Korčula' },
  ],
}

const yachtDetails = {
  de: [
    { src: '/images/kabinen/dubrovnik/flybridge.webp', alt: 'Flybridge mit Sonnenliegefläche', caption: 'Flybridge mit Liegefläche' },
    { src: '/images/kabinen/dubrovnik/cockpit.webp', alt: 'Vorderes Cockpit mit Sonnenpolstern', caption: 'Vorderes Cockpit & Sonnenpolster' },
    { src: '/images/kabinen/dubrovnik/salon.webp', alt: 'Salon mit Esstisch', caption: 'Salon & Pantry' },
    { src: '/images/kabinen/dubrovnik/doppelkabine.webp', alt: 'Doppelkabine', caption: 'Doppelkabine' },
  ],
  en: [
    { src: '/images/kabinen/dubrovnik/flybridge.webp', alt: 'Flybridge with sun deck', caption: 'Flybridge with sun deck' },
    { src: '/images/kabinen/dubrovnik/cockpit.webp', alt: 'Front cockpit with sun pads', caption: 'Foredeck & sun pads' },
    { src: '/images/kabinen/dubrovnik/salon.webp', alt: 'Salon with dining table', caption: 'Salon & galley' },
    { src: '/images/kabinen/dubrovnik/doppelkabine.webp', alt: 'Double cabin', caption: 'Double cabin' },
  ],
}

const goodToKnow = {
  de: [
    ['Klima im Juni', 'Frühsommer an der Adria: rund 26–28 °C Luft und um die 22–23 °C Wasser. Tagsüber meist der Maestral, ein angenehmer Nordwestwind, der nachmittags auffrischt.'],
    ['Einreise', 'Kroatien gehört zur EU und zum Schengen-Raum. Für österreichische und deutsche Staatsbürger reicht der Personalausweis.'],
    ['Bezahlen', 'Bezahlt wird in Euro, meist auch mit Karte. Für kleine Konobas, Bojenfelder und Bootstaxis etwas Bargeld einstecken.'],
    ['Nationalpark Mljet', 'Der Eintritt (Salzseen, Klosterinsel St. Maria) wird vor Ort in Polače bezahlt und kommt aus der Bordkasse.'],
    ['Gepäck', 'Weiche Reisetasche statt Hartschalenkoffer. Badeschuhe gegen Seeigel, Schnorchelbrille und Sonnenschutz einpacken.'],
  ],
  en: [
    ['Climate in June', 'Early summer on the Adriatic: around 26–28 °C air and about 22–23 °C water. Mostly the Maestral during the day, a pleasant north-westerly wind that picks up in the afternoon.'],
    ['Entry requirements', 'Croatia is part of the EU and the Schengen area. A national ID card is sufficient for Austrian and German citizens.'],
    ['Paying', 'Payment is in euros, cards are widely accepted too. Bring a bit of cash for small konobas, mooring fields and water taxis.'],
    ['Mljet National Park', "The entrance fee (salt lakes, St. Mary's monastery island) is paid on site in Polače and comes out of the ship's kitty."],
    ['Luggage', 'Soft travel bag instead of a hard-shell suitcase. Pack reef shoes against sea urchins, snorkelling gear and sun protection.'],
  ],
}

const t = {
  de: {
    tag: 'Kojen-Angebot · Kroatien',
    title: 'Dubrovnik: 7 Nächte zwischen Elaphiten, Korčula und Mljet',
    badgeDate: '12.–19.06.2027', badgeCabins: '4 Doppelkabinen',
    close: 'Details schließen', show: 'Details anzeigen',
    perCabin: 'pro Koje (pro Person)',
    intro: 'Mit dem Katamaran ab Dubrovnik durch die süddalmatinische Inselwelt: die Altstadt vom Wasser aus, die Elaphiten mit Blue Cave und Sandstrand auf Lopud, die Austern von Ston, das mittelalterliche Korčula und der Nationalpark Mljet mit seinen Salzseen. Kurze Etappen, ruhige Buchten und Frühsommer-Wetter im Juni. Gebucht wird die einzelne Koje – ideal für Alleinreisende, Paare und kleine Gruppen.',
    skipperName: 'Ihr Skipper: Manuel', skipperText: 'führt die Yacht und begleitet Sie die gesamte Reise.',
    priceLabel: 'Preis pro Koje (pro Person)', priceOld: 'statt € 1.980,–', pricePP: 'Doppelkabine zu zweit: € 2.780,–',
    minHint: 'Die Reise findet ab 5 Teilnehmern statt.',
    checkin: 'Check-in', checkinVal: 'Sa, 12.06.2027 ab 17:00',
    checkout: 'Check-out', checkoutVal: 'Sa, 19.06.2027 bis 09:00',
    port: 'Hafen', portVal: 'ACI Marina Dubrovnik, Komolac',
    deposit: 'Kaution', depositVal: '€ 500,–',
    participants: 'Teilnehmer', participantsVal: 'mind. 5 Personen',
    requestBtn: 'Koje anfragen', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: 'Hallo! Ich interessiere mich für das Kojen-Angebot Dubrovnik (12.–19.06.2027) und hätte dazu noch eine Frage.',
    gallery: 'Eindrücke',
    yacht: 'Die Yacht', model: 'Modell', year: 'Baujahr', length: 'Länge', lengthVal: '12,35 m',
    cabins: 'Kabinen', cabinsVal: '4', berths: 'Kojen', berthsVal: '8 + 2', wc: 'WC', wcVal: '4',
    yachtText: 'Der Bali 4.1 (Baujahr 2020) ist ein 12,35 m langer Katamaran mit vier Doppelkabinen und vier Bädern, zugelassen für 10 Personen. Typisch Bali: ein großes vorderes Cockpit statt Trampolin, ein offener Salon, der direkt ins Achtercockpit übergeht, und eine Flybridge mit Liegefläche. Dazu nur 1,10 m Tiefgang für flache Ankerbuchten wie vor Lopud oder in Okuklje.',
    equipment: 'Ausstattung',
    equipmentList: ['Autopilot, GPS-Kartenplotter auf der Flybridge, elektrische Winsch', 'Pantry mit Backofen, Herd, Kühlschrank und Tiefkühlfach, Warmwasser', 'Beiboot, Badeplattform mit Heckdusche, Bimini, Cockpittisch', 'Sonnenpolster für Vordeck und Kajütdach, Außenlautsprecher, Inverter'],
    layoutCaption: 'Grundriss Bali 4.1 (4 Kabinen)',
    route: 'Die Route', routeText: 'Rundtörn ab der ACI Marina Dubrovnik über die Elaphiten, Ston und Korčula zum Nationalpark Mljet und zurück: insgesamt rund 120 Seemeilen, mit optionalem Abstecher nach Lastovo (gestrichelt). Meist 2 bis 4 Stunden pro Tag unterwegs, die längste Etappe (Ston – Korčula, ca. 30 sm) dauert 5 bis 6 Stunden.',
    routeMapAlt: 'Routenkarte (Abstecher Lastovo gestrichelt): ACI Marina Dubrovnik – Dubrovnik Altstadt – Koločep – Lopud – Šipanska Luka – Ston – Korčula – Polače – Okuklje – Slano – Gruž – ACI Marina Dubrovnik',
    routeNote: 'Routenänderungen je nach Wind und Wetter vorbehalten. Die Entscheidung trifft der Skipper vor Ort.',
    included: 'Im Kojenpreis enthalten',
    includedList: ['Koje in einer Doppelkabine für 7 Nächte', 'Skipper Manuel an Bord', 'Katamaran Bali 4.1 für die gesamte Reise'],
    notIncluded: 'Nicht enthalten',
    notIncludedList: ['An- und Abreise', 'Bordkasse: Verpflegung, Diesel, Liegegebühren in Fremdhäfen und Bojenfeldern, Kurtaxe, Eintritt Nationalpark Mljet', 'Kaution € 500,– (wird nach der Reise rückerstattet)'],
    optional: 'Optional zubuchbar (pro Yacht)',
    optionalList: ['Kajak (2 Personen) € 150,– / Woche', 'Stand-up-Paddle (SUP) € 120,– / Woche', 'Bordgrill € 180,– / Woche', 'WLAN an Bord € 25,– / Woche'],
    arrival: 'Anreise',
    a1t: 'Fliegen', a1: 'Im Sommer gibt es Direktflüge ab Wien (VIE) und vielen deutschen Flughäfen nach Dubrovnik (DBV). Vom Flughafen sind es mit dem Taxi rund 30 Minuten bis zur ACI Marina in Komolac.',
    a2t: 'Fahren', a2: 'Ab Wien rund 1.000 km über Zagreb und die Autobahn A1 bis Ploče, weiter über die Pelješac-Brücke ohne Grenzübertritt nach Bosnien. Parkplätze direkt in der ACI Marina (kostenpflichtig).',
    a3t: 'Check-in', a3: 'Ab 17:00 an Bord. Flüge und Transfers organisieren Sie individuell. Mit dem Auto empfehlen wir eine Zwischenübernachtung oder eine frühe Abfahrt.',
    goodToKnow: 'Gut zu wissen',
    ctaTitle: '4 Doppelkabinen · ab 5 Teilnehmern', ctaSub: '12.–19.06.2027 · € 1.390,– pro Koje',
    waFooterPre: 'Fragen zu diesem Törn? Schreiben Sie uns gerne ',
    waFooterLink: 'auf WhatsApp', waFooterPost: '.',
    waFooterMsg: 'Hallo! Ich habe eine Frage zum Kojen-Angebot Dubrovnik (12.–19.06.2027).',
  },
  en: {
    tag: 'Berth offer · Croatia',
    title: 'Dubrovnik: 7 nights between the Elaphiti Islands, Korčula and Mljet',
    badgeDate: '12–19 Jun 2027', badgeCabins: '4 double cabins',
    close: 'Close details', show: 'Show details',
    perCabin: 'per berth (per person)',
    intro: "Sail from Dubrovnik by catamaran through the islands of southern Dalmatia: the old town from the water, the Elaphiti Islands with the Blue Cave and sandy beach on Lopud, the oysters of Ston, medieval Korčula and Mljet National Park with its salt lakes. Short legs, calm bays and early-summer weather in June. You book a single berth — ideal for solo travellers, couples and small groups.",
    skipperName: 'Your skipper: Manuel', skipperText: 'sails the yacht and accompanies you for the whole trip.',
    priceLabel: 'Price per berth (per person)', priceOld: 'instead of € 1,980.–', pricePP: 'Double cabin for two: € 2,780.–',
    minHint: 'This trip runs with a minimum of 5 participants.',
    checkin: 'Check-in', checkinVal: 'Sat, 12 Jun 2027 from 17:00',
    checkout: 'Check-out', checkoutVal: 'Sat, 19 Jun 2027 until 09:00',
    port: 'Port', portVal: 'ACI Marina Dubrovnik, Komolac',
    deposit: 'Deposit', depositVal: '€ 500.–',
    participants: 'Participants', participantsVal: 'min. 5 people',
    requestBtn: 'Request berth', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: "Hi! I'm interested in the Dubrovnik berth offer (12–19 Jun 2027) and have a question about it.",
    gallery: 'Gallery',
    yacht: 'The yacht', model: 'Model', year: 'Year built', length: 'Length', lengthVal: '12.35 m',
    cabins: 'Cabins', cabinsVal: '4', berths: 'Berths', berthsVal: '8 + 2', wc: 'Heads', wcVal: '4',
    yachtText: "The Bali 4.1 (built 2020) is a 12.35 m catamaran with four double cabins and four heads, certified for 10 people. Typically Bali: a large forward cockpit instead of a trampoline, an open salon that flows straight into the aft cockpit, and a flybridge with a sun deck. Plus a shallow draft of just 1.10 m for flat anchorages like those off Lopud or in Okuklje.",
    equipment: 'Equipment',
    equipmentList: ['Autopilot, GPS chartplotter on the flybridge, electric winch', "Galley with oven, stove, fridge and freezer compartment, hot water", 'Dinghy, swim platform with aft shower, bimini, cockpit table', 'Sun pads for foredeck and coachroof, outdoor speakers, inverter'],
    layoutCaption: 'Layout Bali 4.1 (4 cabins)',
    route: 'The route', routeText: 'A round trip from ACI Marina Dubrovnik via the Elaphiti Islands, Ston and Korčula to Mljet National Park and back: around 120 nautical miles in total, with an optional detour to Lastovo (dashed). Usually 2 to 4 hours of sailing per day, with the longest leg (Ston – Korčula, approx. 30 nm) taking 5 to 6 hours.',
    routeMapAlt: "Route map (detour to Lastovo dashed): ACI Marina Dubrovnik – Dubrovnik old town – Koločep – Lopud – Šipanska Luka – Ston – Korčula – Polače – Okuklje – Slano – Gruž – ACI Marina Dubrovnik",
    routeNote: 'Route subject to change depending on wind and weather. The skipper decides on site.',
    included: 'Included in the berth price',
    includedList: ['Berth in a double cabin for 7 nights', 'Skipper Manuel on board', 'Catamaran Bali 4.1 for the whole trip'],
    notIncluded: 'Not included',
    notIncludedList: ['Travel to/from the marina', "Ship's kitty: food, diesel, mooring fees in other harbours and buoy fields, tourist tax, Mljet National Park entrance fee", 'Deposit € 500.– (refunded after the trip)'],
    optional: 'Optional add-ons (per yacht)',
    optionalList: ['Kayak (2 people) € 150.– / week', 'Stand-up paddleboard (SUP) € 120.– / week', 'BBQ € 180.– / week', 'WiFi on board € 25.– / week'],
    arrival: 'Getting there',
    a1t: 'Flying', a1: "In summer there are direct flights from Vienna (VIE) and many German airports to Dubrovnik (DBV). From the airport it's about 30 minutes by taxi to ACI Marina in Komolac.",
    a2t: 'Driving', a2: 'From Vienna around 1,000 km via Zagreb and the A1 motorway to Ploče, then across the Pelješac Bridge without crossing into Bosnia. Parking directly at ACI Marina (fee applies).',
    a3t: 'Check-in', a3: 'On board from 17:00. You organise flights and transfers yourself. If driving, we recommend an overnight stop en route or an early start.',
    goodToKnow: 'Good to know',
    ctaTitle: '4 double cabins · from 5 participants', ctaSub: '12–19 Jun 2027 · € 1,390.– per berth',
    waFooterPre: 'Questions about this trip? Feel free to message us ',
    waFooterLink: 'on WhatsApp', waFooterPost: '.',
    waFooterMsg: "Hi! I have a question about the Dubrovnik berth offer (12–19 Jun 2027).",
  },
}

const factStyle = { background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }
const factLabel = { fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }
const factValue = { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }
const h2Style = { fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }

export default function DubrovnikOffer({ onRequest }: { onRequest: () => void }) {
  const lang = useLang()
  const s = t[lang]
  const [open, setOpen] = useState(false)

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 3rem' }}>
    <div style={{ background: '#fff', border: '1px solid var(--gray-mid)', borderRadius: '10px', overflow: 'hidden' }}>

      {/* Kopfzeile — immer sichtbar, Klick klappt auf/zu */}
      <button
        type="button"
        className="db-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) auto',
          gap: '1.5rem', alignItems: 'center', padding: '1.25rem 1.5rem',
        }}
      >
        <img src="/images/kabinen/dubrovnik/hero.webp" alt="Katamaran Bali 4.1 vor Anker" loading="lazy"
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
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>Katamaran Bali 4.1</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>{s.badgeCabins}</span>
          </div>
        </div>
        <div className="db-header-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#9aa1ac', textDecoration: 'line-through' }}>€ 1.980,–</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 1.390,–</span>
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
              <img src="/images/kabinen/dubrovnik/hero.webp" alt="Katamaran Bali 4.1 vor Anker" loading="lazy"
                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
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
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.3rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 1.390,–</span>
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
              {gallery[lang].map(item => item.type === 'video' ? (
                <video key={item.src} src={item.src} poster={item.poster} aria-label={item.alt}
                  muted autoPlay loop playsInline preload="none"
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid' }} />
              ) : (
                <img key={item.src} src={item.src} alt={item.alt} loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              ))}
            </div>
          </section>

          {/* Yacht */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.yacht}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={factStyle}><span style={factLabel}>{s.model}</span><span style={factValue}>Bali 4.1</span></div>
              <div style={factStyle}><span style={factLabel}>{s.year}</span><span style={factValue}>2020</span></div>
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
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                <img src="/images/kabinen/dubrovnik/grundriss.webp" alt={s.layoutCaption} loading="lazy"
                  style={{ width: '100%', maxWidth: '240px', display: 'block', borderRadius: '6px', border: '1px solid var(--gray-mid)' }} />
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
              <img src="/images/kabinen/dubrovnik/routenkarte.svg" alt={s.routeMapAlt} loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
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

      <style>{`
        @media (max-width: 640px) {
          .db-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .db-header-price { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
