import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export type Package = {
  id: string
  title: string
  subtitle: string
  cardImg: string
  price: string
  priceNote?: string
  tags: string[]
  country: string
  included: string[]
  facts: string[]
  route: string
  routeMap: string
  gallery: string[]
}

export const packages: Package[] = [
  {
    id: 'dalmatien',
    title: 'Segeln in Dalmatien ab Split',
    subtitle: 'Segelurlaub in Dalmatien ab Split oder Trogir zu den Inseln Hvar, Vis, Korčula, Brač und Šolta',
    cardImg: '/images/packages/dalmatien/gallery/Segeln in Dalmatien.png',
    price: '620',
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
      'ideal für Reisegruppe mit 4 – 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: 'Start Marina Split (Umgebung) – Brač – Hvar – Korčula – Vis – Šolta – Zielort Split (Umgebung)',
    routeMap: '/images/packages/dalmatien/Dalmatien_Karte_v4.2_EN_mit_Legende.png',
    gallery: [
      '/images/packages/dalmatien/gallery/Segeln in Dalmatien.png',
      '/images/packages/dalmatien/gallery/dalmatien_gallery1.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery2.jpg',
      '/images/packages/dalmatien/gallery/dalmatien_gallery3.jpg',
      '/images/packages/dalmatien/gallery/Split.jpg',
      '/images/packages/dalmatien/gallery/milna.jpg',
      '/images/packages/dalmatien/gallery/Kat-Bug.webp',
      '/images/packages/dalmatien/gallery/G00815721.jpg',
    ],
  },
  {
    id: 'karibik-bvi',
    title: 'Karibik-Package (BVI)',
    subtitle: 'Ihr Traum-Segelurlaub auf einer Segelyacht oder Katamaran in den britischen Jungferninseln',
    cardImg: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
    price: '950',
    priceNote: '7 Tage',
    tags: ['Freunde', 'Entdecker'],
    country: 'Karibik – Britische Jungferninseln',
    included: [
      'alle Übernachtungen auf komfortabler Yacht',
      'deutschsprachiger YACHT-URLAUB Skipper mit langjähriger Erfahrung',
      'ortskundige Reiseleitung',
      'Tipps für Restaurants und Aktivitäten',
      'ausführliche Reiseunterlagen',
    ],
    facts: [
      'Reisedauer: 7 – 21 Tage',
      'flexible Reisedaten (täglicher Check-In / Check-Out möglich)',
      'Mindestteilnehmer: 4 Personen (Katamaran: 6 Pers.)',
    ],
    route: 'Road Town → North Sound (Virgin Gorda) → The Baths → Beef Island → The Dogs → Jost van Dyke → Anegada → Norman Island → Peter Island → Cooper/Salt Island',
    routeMap: '/images/packages/Karibik-BVI/Karibik_Karte_v2.4_EN_mit_Legende.png',
    gallery: [
      '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
      '/images/packages/Karibik-BVI/gallery/the baths.jpg',
      '/images/packages/Karibik-BVI/gallery/Sandy Spit.jpg',
      '/images/packages/Karibik-BVI/gallery/Norman island.jpg',
      '/images/packages/Karibik-BVI/gallery/DSC_0353_695.webp',
      '/images/packages/Karibik-BVI/gallery/DSC_0889_150.webp',
      '/images/packages/Karibik-BVI/gallery/Willie Ts.webp',
      '/images/packages/Karibik-BVI/gallery/marina_cay.jpg',
    ],
  },
  {
    id: 'griechenland',
    title: 'Segeln in Griechenland',
    subtitle: 'Auswahl aus 4 Routen für einen Segelurlaub in der Ägäis oder im Ionischen Meer',
    cardImg: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
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
      'ideal für Reisegruppen mit 4 – 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: '4 Routen: A1 Kykladen (Lavrion–Kea–Kythnos–Syros–Serifos–Sifnos) · A2 Saronischer Golf (Athen–Egina–Poros–Hydra–Spetses) · B Dodekanes (Kos–Kalymnos–Leros–Patmos) · C Ionisches Meer (Lefkas–Parga–Ithaka–Kefalonia–Zakynthos)',
    routeMap: '/images/packages/Griechenland/Griechenland_Karte_v3.3_EN_mit_Legende.png',
    gallery: [
      '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
      '/images/packages/Griechenland/gallery/santorini-1776236_1920.jpg',
      '/images/packages/Griechenland/gallery/Mykonos.jpg',
      '/images/packages/Griechenland/gallery/hydra.jpg',
      '/images/packages/Griechenland/gallery/Naxos Beach.jpg',
      '/images/packages/Griechenland/gallery/Sonnenuntergang.jpg',
      '/images/packages/Griechenland/gallery/BlaueBucht.jpg',
      '/images/packages/Griechenland/gallery/Greece_Sunset_header.webp',
    ],
  },
  {
    id: 'karibik-grenadinen',
    title: 'Grenadinen-Package',
    subtitle: 'Segelurlaub auf einer Segelyacht oder einem Katamaran in die Grenadinen',
    cardImg: '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg',
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
      'Reisedauer: 7 – 21 Tage',
      'flexible Reisedaten (täglicher Check-In / Check-Out möglich)',
      'Mindestteilnehmer: 4 Personen',
    ],
    route: "St. George's / St. Vincent → Carriacou → Union Island → Mayreau → Tobago Cays → Mustique → Bequia → Petite St. Vincent → St. George's",
    routeMap: '/images/packages/Karibik-Grenadinen/Grenadinen_Route_v1.2_EN_mit_Legende.png',
    gallery: [
      '/images/packages/Karibik-Grenadinen/gallery/Tobago.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/SandyIsland.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Lobster_tobago.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/bay-601526_1920.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/sonnenuntergang-grenadinen.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Hammock-22_RMT8726.jpg',
      '/images/packages/Karibik-Grenadinen/gallery/Grenadinen_Panorama.png',
      '/images/packages/Karibik-Grenadinen/gallery/Wallilabou1.jpg',
    ],
  },
  {
    id: 'kornaten',
    title: 'Segeln in die Kornaten',
    subtitle: 'Segelurlaub ab Zadar, Biograd oder Šibenik in die traumhafte Inselwelt der Kornaten',
    cardImg: '/images/packages/Kornaten/gallery/Telascica.webp',
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
      'ideal für Reisegruppen mit 4 – 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: 'Startmarina Zadar (o. Umgebung) – Murter – Kornaten – Dugi Otok – Žirje / Kaprije – Skradin (Nationalpark Krka) – Zielort Zadar (o. Umgebung)',
    routeMap: '/images/packages/Kornaten/Kornaten_Karte_v2.4_EN_mit_Legende.png',
    gallery: [
      '/images/packages/Kornaten/gallery/Telascica.webp',
      '/images/packages/Kornaten/gallery/Dugi Otok.webp',
      '/images/packages/Kornaten/gallery/Mono Kornaten.webp',
      '/images/packages/Kornaten/gallery/image (93).jpg',
      '/images/packages/Kornaten/gallery/20180909_131842.jpg',
      '/images/packages/Kornaten/gallery/Stand-Up 2.jpg',
      '/images/packages/Kornaten/gallery/unnamed.jpg',
      '/images/packages/Kornaten/gallery/image (99).jpg',
    ],
  },
  {
    id: 'istrien',
    title: 'Segeln ab Pula oder Krk',
    subtitle: 'Segelurlaub in Istrien und in der Kvarner Bucht ab Pula oder Punat auf Krk',
    cardImg: '/images/packages/Istrien/gallery/Istrien.webp',
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
      'ideal für Reisegruppen mit 4 – 12 Personen',
      'Start immer ab Samstag, in der Nebensaison auch ab Mittwoch möglich',
    ],
    route: 'Start Pula oder Punat (Krk) – Lošinj – Rab – Pag – Dugi Otok – Kornaten – Šibenik – Zielort Zadar oder retour',
    routeMap: '/images/packages/Istrien/Istrien_Karte_v2.3_EN_mit_Legende.jpg',
    gallery: [
      '/images/packages/Istrien/gallery/Istrien.webp',
      '/images/packages/Istrien/gallery/Krk.webp',
      '/images/packages/Istrien/gallery/Rab.webp',
      '/images/packages/Istrien/gallery/mali-losinj-2295423_1920.jpg',
      '/images/packages/Istrien/gallery/Amphitheater.jpg',
      '/images/packages/Istrien/gallery/20160512_091758_5D3_9096.jpg',
      '/images/packages/Istrien/gallery/Kleine Insel somewhere.webp',
      '/images/packages/Istrien/gallery/image (94).jpg',
    ],
  },
]

export default function Packages() {
  return (
    <section style={{ background: '#f4f6f8', padding: '5rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Direkt buchbar
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '0.75rem' }}>
            Alle Packages auf einen Blick
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '1rem', maxWidth: '560px', margin: '0 auto' }}>
            Von Kroatien bis Karibik — wählen Sie Ihr Traumrevier und buchen Sie direkt online.
          </p>
        </div>

        <div className="packages-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {packages.map((pkg, i) => (
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
                  <span style={{ fontSize: '0.58rem' }}>ab</span>
                  <span style={{ fontSize: '0.9rem' }}>€ {pkg.price}</span>
                  <span style={{ fontSize: '0.56rem' }}>pro Pers.</span>
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
                  to={`/packages/${pkg.id}`}
                  className="btn btn-primary"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', alignSelf: 'flex-start' }}
                >
                  ▶ ZUM ANGEBOT
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
