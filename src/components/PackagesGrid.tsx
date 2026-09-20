import { Link } from '../router'
import { motion } from 'framer-motion'
import { useLang } from '../i18n'
import { AnchorIcon } from './Icons'

// Ursprünglich nur auf /buchen, jetzt zusätzlich auf /toerns (bzw.
// /en/cruises) eingesetzt — bewusst derselbe Block, nicht neu gestaltet.
//
// Wichtig: Diese Liste (Titel/Region/Text) ist eine EIGENE, von Hand
// gepflegte Kurzfassung — unabhängig von den ausführlichen Package-Daten in
// components/Packages.tsx (packages) und data/packagesEn.ts (packagesEn),
// die auf der Startseite, den Destinationsseiten und den einzelnen
// Package-Detailseiten verwendet werden. Wer hier Titel/Beschreibung ändert,
// sollte auch dort und auf allen Seiten nachziehen, die Packages verlinken
// oder bewerben (u.a. Zielgruppen-Seiten wie /toerns/einsteiger), sonst
// laufen die Texte auseinander.
const packagesListEn = [
  { title: 'Sailing in Croatia from Split', region: 'Croatia · Dalmatia',
    text: 'Sailing vacations from Split or Trogir to Hvar, Vis, Korcula, Brac and Solta.',
    img: '/images/packages/dalmatien/gallery/Split 1.jpg', href: '/en/cruises/book-now/dalmatia-croatia' },
  { title: 'Caribbean package (BVI)', region: 'Caribbean · British Virgin Islands',
    text: 'Your sailing holidays on a monohull or catamaran in the British Virgin Islands.',
    img: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg', href: '/en/cruises/book-now/caribbean-bvi' },
  { title: 'Sailing in Greece', region: 'Greece · Aegean & Ionian Sea',
    text: 'Sailing holiday in the Aegean or the Ionian sea — choice of 4 routes.',
    img: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg', href: '/en/cruises/book-now/greece' },
  { title: 'Grenadines-Package', region: 'Caribbean · St. Vincent & Grenadines',
    text: 'Sailing vacation on a monohull or catamaran in the Grenadines.',
    img: '/images/Destinationsbilder/sonnenuntergang-grenadinen.jpg', href: '/en/cruises/book-now/caribbean-grenadines' },
  { title: 'Sailing into the Kornati islands', region: 'Croatia · Kornati',
    text: 'Sailing holiday in the Kornati islands from Zadar.',
    img: '/images/Destinationsbilder/Header/Kroatien Bucht.webp', href: '/en/cruises/book-now/kornati-croatia' },
]

const packagesListDe = [
  {
    title: 'Segeln in Dalmatien ab Split',
    region: 'Kroatien · Dalmatien',
    text: 'Segelurlaub in Dalmatien ab Split oder Trogir zu den Inseln Hvar, Vis, Korčula, Brač und Šolta.',
    img: '/images/packages/dalmatien/gallery/Split 1.jpg',
    href: '/packages/dalmatien',
  },
  {
    title: 'Karibik-Package (BVI)',
    region: 'Karibik · Britische Jungferninseln',
    text: 'Ihr Traum-Segelurlaub auf einer Segelyacht oder Katamaran in den britischen Jungferninseln.',
    img: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
    href: '/packages/karibik-bvi',
  },
  {
    title: 'Segeln in Griechenland',
    region: 'Griechenland · Ägäis & Ionische Inseln',
    text: 'Auswahl aus 4 Routen für einen Segelurlaub in der Ägäis oder den Ionischen Inseln.',
    img: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
    href: '/packages/griechenland',
  },
  {
    title: 'Grenadinen-Package',
    region: 'Karibik · St. Vincent & Grenadinen',
    text: 'Segelurlaub auf einer Segelyacht oder einem Katamaran in den Grenadinen.',
    img: '/images/Destinationsbilder/sonnenuntergang-grenadinen.jpg',
    href: '/packages/karibik-grenadinen',
  },
  {
    title: 'Segeln in die Kornaten',
    region: 'Kroatien · Kornaten',
    text: 'Segelurlaub ab Zadar, Biograd oder Šibenik in die traumhafte Inselwelt der Kornaten.',
    img: '/images/Destinationsbilder/Header/Kroatien Bucht.webp',
    href: '/packages/kornaten',
  },
  {
    title: 'Segeln ab Pula oder Krk',
    region: 'Kroatien · Istrien',
    text: 'Segelurlaub in Istrien und in der Marina Punat ab Pula oder Punat auf Krk.',
    img: '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
    href: '/packages/istrien',
  },
]

export default function PackagesGrid() {
  const lang = useLang()
  const pkgList = lang === 'en' ? packagesListEn : packagesListDe
  return (
    <section className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {lang === 'en' ? 'Sailing packages' : 'Segel-Packages'}
          </p>
          <h2 className="section-title">{lang === 'en' ? 'All packages at a glance' : 'Alle Packages auf einen Blick'}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="pkg-grid">
          {pkgList.map((pkg, i) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              style={{
                background: '#fff',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={pkg.img}
                  alt={pkg.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(18,43,64,0.85) 0%, transparent 55%)',
                  display: 'flex', alignItems: 'flex-end', padding: '1rem',
                }}>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.1rem', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {pkg.title}
                  </h3>
                </div>
              </div>
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <p style={{ color: 'var(--blue)', fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {pkg.region}
                </p>
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7, flex: 1, marginBottom: '1rem' }}>{pkg.text}</p>
                <Link to={pkg.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  background: 'var(--blue)', color: '#fff',
                  padding: '7px 16px', borderRadius: '3px',
                  fontSize: '0.75rem', fontWeight: 600,
                  alignSelf: 'flex-start',
                }}>
                  <AnchorIcon size={14} style={{ verticalAlign: '-2px', marginRight: '5px' }} />{lang === 'en' ? 'To the offer' : 'Zum Angebot'}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .pkg-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .pkg-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
