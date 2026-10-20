import { useState } from 'react'
import { useLang } from '../i18n'
import { WhatsAppIcon } from './Icons'
import Lightbox, { type LightboxState } from './Lightbox'

// Kabinen-Angebot Koh Chang, Thailand — Dezember 2026. Einmaliges Termin-
// Angebot, daher (anders als die Packages) nicht in components/Packages.tsx
// gepflegt, sondern eigenständig hier. Klappt standardmäßig zu, der Button
// setzt die Reise-Auswahl im bestehenden Buchungsformular der Seite und
// scrollt dorthin.

const WHATSAPP_NUMBER = '436602652481'

const days = {
  de: [
    { date: 'Mi 09.12.', place: 'Koh Chang Marina', text: 'Check-in ab 15:00. Kabine beziehen, Einkauf für die ersten Tage und erstes Abendessen am Hafen.' },
    { date: 'Do 10.12.', place: 'Koh Wai', text: 'Keine Straßen, keine Bankomaten, kaum Internet. Korallenriffe an der Nordküste, Schnorcheln direkt vom Boot.' },
    { date: 'Fr 11.12.', place: 'Koh Mak · Ao Kao', text: 'Kokos- und Bananenplantagen, mit Rad oder Roller über die Insel. Am Abend kleine Strandbars an der Südwestküste.' },
    { date: 'Sa 12.12.', place: 'Koh Kut · Ao Tapao', text: 'Erster Stopp an der Westküste von Koh Kut: langer Sandstrand und klares Wasser.' },
    { date: 'So 13.12.', place: 'Koh Kut · Ao Klong Chao', text: 'Dschungel und Wasserfälle. Mit dem Kajak den Klong-Chao-Fluss hinauf zum Wasserfall.' },
    { date: 'Mo 14.12.', place: 'Koh Kut · Ao Jark', text: 'Ruhige Badebuchten im Süden der Insel, Abendessen vor Anker.' },
    { date: 'Di 15.12.', place: 'Koh Rang', text: 'Meeresnationalpark und das beste Schnorchel- und Tauchrevier des Archipels. Nacht vor einer unbewohnten Insel.' },
    { date: 'Mi 16.12.', place: 'Koh Kham', text: 'Kleine Insel vor Koh Mak mit Sandstrand und Riff, nur wenige Seemeilen entfernt.' },
    { date: 'Do 17.12.', place: 'Koh Mak · Ao Suan Yai', text: '2 km weißer Sandstrand an der Nordwestküste, Aussichtspunkt mit Blick bis Koh Chang.' },
    { date: 'Fr 18.12.', place: 'Koh Ngam', text: 'Kleine Inselgruppe mit Sandbank und Riffen, ideal für einen entspannten Badetag.' },
    { date: 'Sa 19.12.', place: 'Bang Bao → Marina', text: 'Fischerdorf auf Stelzen mit Markt und Seafood-Restaurants. Am Abend zurück in die Marina.' },
    { date: 'So 20.12.', place: 'Koh Chang Marina', text: 'Check-out bis 09:00.' },
  ],
  en: [
    { date: 'Wed 09 Dec', place: 'Koh Chang Marina', text: 'Check-in from 15:00. Settle into the cabin, shop for the first few days and enjoy a first dinner at the harbour.' },
    { date: 'Thu 10 Dec', place: 'Koh Wai', text: 'No roads, no ATMs, barely any internet. Coral reefs off the north coast, snorkelling straight from the boat.' },
    { date: 'Fri 11 Dec', place: 'Koh Mak · Ao Kao', text: 'Coconut and banana plantations, explore the island by bike or scooter. Small beach bars on the south-west coast in the evening.' },
    { date: 'Sat 12 Dec', place: 'Koh Kut · Ao Tapao', text: 'First stop on the west coast of Koh Kut: a long sandy beach and clear water.' },
    { date: 'Sun 13 Dec', place: 'Koh Kut · Ao Klong Chao', text: 'Jungle and waterfalls. Kayak up the Klong Chao river to the waterfall.' },
    { date: 'Mon 14 Dec', place: 'Koh Kut · Ao Jark', text: 'Quiet swimming bays in the south of the island, dinner at anchor.' },
    { date: 'Tue 15 Dec', place: 'Koh Rang', text: 'Marine national park and the archipelago’s best snorkelling and diving spot. A night off an uninhabited island.' },
    { date: 'Wed 16 Dec', place: 'Koh Kham', text: 'Small island off Koh Mak with a sandy beach and reef, just a few nautical miles away.' },
    { date: 'Thu 17 Dec', place: 'Koh Mak · Ao Suan Yai', text: '2 km of white sandy beach on the north-west coast, a viewpoint looking all the way to Koh Chang.' },
    { date: 'Fri 18 Dec', place: 'Koh Ngam', text: 'Small island group with a sandbank and reefs, ideal for a relaxed beach day.' },
    { date: 'Sat 19 Dec', place: 'Bang Bao → Marina', text: 'Stilted fishing village with a market and seafood restaurants. Back to the marina in the evening.' },
    { date: 'Sun 20 Dec', place: 'Koh Chang Marina', text: 'Check-out by 09:00.' },
  ],
}

const gallery = {
  de: [
    { src: '/images/kabinen/koh-chang/gallery/g-bucht-katamaran.webp', alt: 'Katamaran vor Anker in einer Bucht' },
    { src: '/images/kabinen/koh-chang/gallery/g-steg.webp', alt: 'Holzsteg zum Palmenstrand' },
    { src: '/images/kabinen/koh-chang/gallery/g-strand-palmen.webp', alt: 'Weißer Sandstrand unter Palmen' },
    { src: '/images/kabinen/koh-chang/gallery/g-deck-sonnenuntergang.webp', alt: 'Sonnenuntergang vom Vordeck' },
    { src: '/images/kabinen/koh-chang/gallery/g-schaukel.webp', alt: 'Schaukel am Strand' },
    { src: '/images/kabinen/koh-chang/gallery/g-katamaran-anker.webp', alt: 'Island Spirit 410 auf türkisem Wasser' },
    { src: '/images/kabinen/koh-chang/gallery/g-buddha.webp', alt: 'Goldener Buddha über der Küste' },
    { src: '/images/kabinen/koh-chang/gallery/g-herz-sunset.webp', alt: 'Sonnenuntergang am Strand' },
    { src: '/images/kabinen/koh-chang/gallery/g-schaukel-abend.webp', alt: 'Strandschaukel am Abend' },
  ],
  en: [
    { src: '/images/kabinen/koh-chang/gallery/g-bucht-katamaran.webp', alt: 'Catamaran at anchor in a bay' },
    { src: '/images/kabinen/koh-chang/gallery/g-steg.webp', alt: 'Wooden jetty to a palm-fringed beach' },
    { src: '/images/kabinen/koh-chang/gallery/g-strand-palmen.webp', alt: 'White sandy beach under palm trees' },
    { src: '/images/kabinen/koh-chang/gallery/g-deck-sonnenuntergang.webp', alt: 'Sunset seen from the foredeck' },
    { src: '/images/kabinen/koh-chang/gallery/g-schaukel.webp', alt: 'Swing on the beach' },
    { src: '/images/kabinen/koh-chang/gallery/g-katamaran-anker.webp', alt: 'Island Spirit 410 on turquoise water' },
    { src: '/images/kabinen/koh-chang/gallery/g-buddha.webp', alt: 'Golden Buddha above the coastline' },
    { src: '/images/kabinen/koh-chang/gallery/g-herz-sunset.webp', alt: 'Sunset on the beach' },
    { src: '/images/kabinen/koh-chang/gallery/g-schaukel-abend.webp', alt: 'Beach swing in the evening' },
  ],
}

const goodToKnow = {
  de: [
    ['Klima im Dezember', 'Trockenzeit und beste Segelsaison. Rund 30 °C Luft, ca. 28 °C Wasser, beständiger Nordostwind.'],
    ['Einreise', 'Für österreichische und deutsche Staatsbürger visumfrei. Vor Abflug online die Thailand Digital Arrival Card (TDAC) ausfüllen.'],
    ['Bargeld', 'Thai Baht mitnehmen. Auf Koh Wai und Koh Rang gibt es keine Bankomaten.'],
    ['Zeitverschiebung', '+6 Stunden gegenüber MEZ.'],
    ['Gepäck', 'Weiche Reisetasche statt Hartschalenkoffer. Riffschonende Sonnencreme und Schnorchelbrille einpacken.'],
  ],
  en: [
    ['Climate in December', 'Dry season and the best sailing season. Around 30 °C air, approx. 28 °C water, steady north-easterly wind.'],
    ['Entry requirements', 'Visa-free for Austrian and German citizens. Fill in the Thailand Digital Arrival Card (TDAC) online before departure.'],
    ['Cash', 'Bring Thai Baht. There are no ATMs on Koh Wai or Koh Rang.'],
    ['Time difference', '+6 hours compared to CET.'],
    ['Luggage', 'Soft travel bag instead of a hard-shell suitcase. Pack reef-safe sunscreen and snorkelling gear.'],
  ],
}

const t = {
  de: {
    tag: 'Kabinen-Angebot · Thailand',
    title: 'Koh Chang: 11 Nächte Inselhüpfen im Golf von Thailand',
    badgeDate: '09.–20.12.2026', badgeCabins: '3 Doppelkabinen',
    close: 'Details schließen', show: 'Details anzeigen',
    perCabin: 'pro Doppelkabine',
    intro: 'Mit dem Katamaran durch den Koh-Chang-Archipel: Koh Wai, Koh Mak, Koh Kut und der Meeresnationalpark Koh Rang. Kurze Etappen, ruhige Ankerbuchten und Dezember-Trockenzeit. Gebucht wird die ganze Doppelkabine, auch als Einzelperson.',
    skipperName: 'Ihr Skipper: Manuel', skipperText: 'führt die Yacht und begleitet Sie die gesamte Reise.',
    priceLabel: 'Preis pro Doppelkabine', priceOld: 'statt € 4.900,–', pricePP: 'entspricht € 1.775,– p. P. bei 2 Personen',
    soloHint: 'Alleinreisende zahlen den Kabinenpreis und haben die Kabine für sich.',
    checkin: 'Check-in', checkinVal: 'Mi, 09.12.2026 ab 15:00',
    checkout: 'Check-out', checkoutVal: 'So, 20.12.2026 bis 09:00',
    port: 'Hafen', portVal: 'Koh Chang, Thailand',
    deposit: 'Kaution', depositVal: '€ 1.500,–',
    requestBtn: 'Kabine anfragen', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: 'Hallo! Ich interessiere mich für das Kabinen-Angebot Koh Chang (09.–20.12.2026) und hätte dazu noch eine Frage.',
    gallery: 'Eindrücke',
    yacht: 'Die Yacht', model: 'Modell', year: 'Baujahr', length: 'Länge', lengthVal: '12,63 m',
    cabins: 'Kabinen', cabinsVal: '4', berths: 'Kojen', berthsVal: '6 + 1 Skipper', wc: 'WC', wcVal: '2',
    yachtText: 'Katamarane liegen ruhig vor Anker und bieten viel Platz an Deck: großes Cockpit, Trampolin am Bug und geringer Tiefgang (ca. 1,4 m) für flache Buchten. Die zwei WCs teilen sich die Gäste.',
    layoutCaption: 'Grundriss Island Spirit 410',
    route: 'Die Route', routeText: 'Rundtörn ab Koh Chang durch die südlichen Inseln, meist 2 bis 4 Stunden unter Segeln pro Tag.',
    routeMapAlt: 'Routenkarte Koh Chang, 11 Nächte', legendAlt: 'Legende: Startmarina, Zwischenstopp, Hauptroute, Fähre, Flughafen',
    routeNote: 'Routenänderungen je nach Wind und Wetter vorbehalten. Die Entscheidung trifft der Skipper vor Ort.',
    included: 'Im Kabinenpreis enthalten',
    includedList: ['Doppelkabine für 11 Nächte (1 oder 2 Personen)', 'Skipper an Bord', 'Katamaran Island Spirit 410 für die gesamte Reise'],
    notIncluded: 'Nicht enthalten',
    notIncludedList: ['An- und Abreise', 'Bordkasse: Verpflegung, Diesel, Liege- und Nationalparkgebühren', 'Kaution € 1.500,– (wird nach der Reise rückerstattet)'],
    arrival: 'Anreise',
    a1t: '1 · Flug', a1: 'Ab Wien (VIE) oder München (MUC) mit Umstieg in Bangkok nach Trat (TDX). Ab ca. € 700,–.',
    a2t: '2 · Taxi & Fähre', a2: 'Das Taxi bringt Sie vom Flughafen durchgehend bis zur Marina und fährt mit der Autofähre nach Koh Chang mit.',
    a3t: '3 · Check-in', a3pre: 'Ab 15:00 an Bord. Flüge und Transfers organisieren Sie individuell. Wir empfehlen, ', a3bold: 'mind.', a3post: ' 1 Tag früher anzureisen.',
    goodToKnow: 'Gut zu wissen',
    ctaTitle: 'Nur 3 Doppelkabinen verfügbar', ctaSub: '09.–20.12.2026 · € 3.550,– pro Kabine',
  },
  en: {
    tag: 'Cabin offer · Thailand',
    title: 'Koh Chang: 11 nights island-hopping in the Gulf of Thailand',
    badgeDate: '09–20 Dec 2026', badgeCabins: '3 double cabins',
    close: 'Close details', show: 'Show details',
    perCabin: 'per double cabin',
    intro: 'Sail the Koh Chang archipelago by catamaran: Koh Wai, Koh Mak, Koh Kut and the Koh Rang marine national park. Short legs, calm anchorages and the December dry season. You book the whole double cabin, even as a solo traveller.',
    skipperName: 'Your skipper: Manuel', skipperText: 'sails the yacht and accompanies you for the whole trip.',
    priceLabel: 'Price per double cabin', priceOld: 'instead of € 4,900.–', pricePP: 'equals € 1,775.– p.p. for 2 people',
    soloHint: 'Solo travellers pay the cabin price and have the cabin to themselves.',
    checkin: 'Check-in', checkinVal: 'Wed, 09 Dec 2026 from 15:00',
    checkout: 'Check-out', checkoutVal: 'Sun, 20 Dec 2026 until 09:00',
    port: 'Port', portVal: 'Koh Chang, Thailand',
    deposit: 'Deposit', depositVal: '€ 1,500.–',
    requestBtn: 'Request cabin', waBtn: 'WhatsApp +43 660 2652481',
    waMsg: "Hi! I'm interested in the Koh Chang cabin offer (09–20 Dec 2026) and have a question about it.",
    gallery: 'Gallery',
    yacht: 'The yacht', model: 'Model', year: 'Year built', length: 'Length', lengthVal: '12.63 m',
    cabins: 'Cabins', cabinsVal: '4', berths: 'Berths', berthsVal: '6 + 1 skipper', wc: 'Heads', wcVal: '2',
    yachtText: 'Catamarans ride calmly at anchor and offer plenty of space on deck: a large cockpit, a bow trampoline and a shallow draft (approx. 1.4 m) for shallow bays. The two heads are shared by all guests.',
    layoutCaption: 'Layout Island Spirit 410',
    route: 'The route', routeText: 'A round trip from Koh Chang through the southern islands, usually 2 to 4 hours of sailing per day.',
    routeMapAlt: 'Route map Koh Chang, 11 nights', legendAlt: 'Legend: starting marina, stopover, main route, ferry, airport',
    routeNote: 'Route subject to change depending on wind and weather. The skipper decides on site.',
    included: 'Included in the cabin price',
    includedList: ['Double cabin for 11 nights (1 or 2 people)', 'Skipper on board', 'Catamaran Island Spirit 410 for the whole trip'],
    notIncluded: 'Not included',
    notIncludedList: ['Travel to/from the marina', "Ship's kitty: food, diesel, mooring and national park fees", 'Deposit € 1,500.– (refunded after the trip)'],
    arrival: 'Getting there',
    a1t: '1 · Flight', a1: 'From Vienna (VIE) or Munich (MUC) with a stopover in Bangkok to Trat (TDX). From approx. € 700.–.',
    a2t: '2 · Taxi & ferry', a2: 'The taxi takes you all the way from the airport to the marina, crossing to Koh Chang by car ferry.',
    a3t: '3 · Check-in', a3pre: 'On board from 15:00. You organise flights and transfers yourself. We recommend arriving ', a3bold: 'at least', a3post: ' 1 day early.',
    goodToKnow: 'Good to know',
    ctaTitle: 'Only 3 double cabins available', ctaSub: '09–20 Dec 2026 · € 3,550.– per cabin',
  },
}

const factStyle = { background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }
const factLabel = { fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }
const factValue = { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }
const h2Style = { fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }

export default function KohChangOffer({ onRequest }: { onRequest: () => void }) {
  const lang = useLang()
  const s = t[lang]
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)
  const openLightbox = (images: LightboxState['images'], index: number) => setLightbox({ images, index })
  const lightboxPrev = () => setLightbox(s => s && { ...s, index: (s.index - 1 + s.images.length) % s.images.length })
  const lightboxNext = () => setLightbox(s => s && { ...s, index: (s.index + 1) % s.images.length })

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 3rem' }}>
    <div style={{ background: '#fff', border: '1px solid var(--gray-mid)', borderRadius: '10px', overflow: 'hidden' }}>

      {/* Kopfzeile — immer sichtbar, Klick klappt auf/zu */}
      <button
        type="button"
        className="kc-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) auto',
          gap: '1.5rem', alignItems: 'center', padding: '1.25rem 1.5rem',
        }}
      >
        <img src="/images/kabinen/koh-chang/island-spirit-410.webp" alt="Island Spirit 410 unter Segeln" loading="lazy"
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
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>Island Spirit 410</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>{s.badgeCabins}</span>
          </div>
        </div>
        <div className="kc-header-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#9aa1ac', textDecoration: 'line-through' }}>€ 4.900,–</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 3.550,–</span>
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
              <img src="/images/kabinen/koh-chang/island-spirit-410.webp" alt="Island Spirit 410 Katamaran" loading="lazy"
                onClick={() => openLightbox([{ src: '/images/kabinen/koh-chang/island-spirit-410.webp', alt: 'Island Spirit 410 Katamaran' }], 0)}
                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '8px', display: 'block', cursor: 'zoom-in' }} />
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                {s.intro}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src="/images/kabinen/koh-chang/skipper-manuel.webp" alt="Skipper Manuel" loading="lazy"
                  onClick={() => openLightbox([{ src: '/images/kabinen/koh-chang/skipper-manuel.webp', alt: 'Skipper Manuel' }], 0)}
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 20%', flexShrink: 0, cursor: 'zoom-in' }} />
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
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.3rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 3.550,–</span>
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
              {gallery[lang].map((img, i) => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy"
                  onClick={() => openLightbox(gallery[lang], i)}
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid', cursor: 'zoom-in' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              ))}
            </div>
          </section>

          {/* Yacht */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>{s.yacht}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={factStyle}><span style={factLabel}>{s.model}</span><span style={factValue}>Island Spirit 410</span></div>
              <div style={factStyle}><span style={factLabel}>{s.year}</span><span style={factValue}>2017</span></div>
              <div style={factStyle}><span style={factLabel}>{s.length}</span><span style={factValue}>{s.lengthVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.cabins}</span><span style={factValue}>{s.cabinsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.berths}</span><span style={factValue}>{s.berthsVal}</span></div>
              <div style={factStyle}><span style={factLabel}>{s.wc}</span><span style={factValue}>{s.wcVal}</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                {s.yachtText}
              </p>
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <img src="/images/kabinen/koh-chang/grundriss.webp" alt={s.layoutCaption} loading="lazy"
                  onClick={() => openLightbox([{ src: '/images/kabinen/koh-chang/grundriss.webp', alt: s.layoutCaption }], 0)}
                  style={{ width: '100%', display: 'block', borderRadius: '6px', border: '1px solid var(--gray-mid)', cursor: 'zoom-in' }} />
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
              <img src="/images/kabinen/koh-chang/routenkarte-koh-chang.webp" alt={s.routeMapAlt} loading="lazy"
                onClick={() => openLightbox([{ src: '/images/kabinen/koh-chang/routenkarte-koh-chang.webp', alt: s.routeMapAlt }, { src: '/images/kabinen/koh-chang/routenkarte-legende.webp', alt: s.legendAlt }], 0)}
                style={{ display: 'block', width: '100%', height: 'auto', cursor: 'zoom-in' }} />
              <img src="/images/kabinen/koh-chang/routenkarte-legende.webp" alt={s.legendAlt} loading="lazy"
                onClick={() => openLightbox([{ src: '/images/kabinen/koh-chang/routenkarte-koh-chang.webp', alt: s.routeMapAlt }, { src: '/images/kabinen/koh-chang/routenkarte-legende.webp', alt: s.legendAlt }], 1)}
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
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
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
    </div>

      <Lightbox state={lightbox} onClose={() => setLightbox(null)} onPrev={lightboxPrev} onNext={lightboxNext} label={s.gallery} />

      <style>{`
        @media (max-width: 640px) {
          .kc-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .kc-header-price { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
