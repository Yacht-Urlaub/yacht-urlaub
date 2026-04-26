import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const packages = [
  {
    title: 'Segeln in Dalmatien ab Split',
    region: 'Kroatien · Dalmatien',
    text: 'Segelurlaub in Dalmatien ab Split oder Trogir zu den Inseln Hvar, Vis, Korčula, Brač und Šolta.',
    img: '/images/packages/dalmatien/gallery/Split 1.jpg',
    href: '/destinationen/kroatien',
  },
  {
    title: 'Karibik-Package (BVI)',
    region: 'Karibik · Britische Jungferninseln',
    text: 'Ihr Traum-Segelurlaub auf einer Segelyacht oder Katamaran in den britischen Jungferninseln.',
    img: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg',
    href: '/destinationen/karibik',
  },
  {
    title: 'Segeln in Griechenland',
    region: 'Griechenland · Ägäis & Ionische Inseln',
    text: 'Auswahl aus 4 Routen für einen Segelurlaub in der Ägäis oder den Ionischen Inseln.',
    img: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg',
    href: '/destinationen/griechenland',
  },
  {
    title: 'Grenadinen-Package',
    region: 'Karibik · St. Vincent & Grenadinen',
    text: 'Segelurlaub auf einer Segelyacht oder einem Katamaran in den Grenadinen.',
    img: '/images/Destinationsbilder/sonnenuntergang-grenadinen.jpg',
    href: '/destinationen/karibik',
  },
  {
    title: 'Segeln in die Kornaten',
    region: 'Kroatien · Kornaten',
    text: 'Segelurlaub ab Zadar, Biograd oder Šibenik in die traumhafte Inselwelt der Kornaten.',
    img: '/images/Destinationsbilder/Header/Kroatien Bucht.webp',
    href: '/destinationen/kroatien',
  },
  {
    title: 'Segeln ab Pula oder Krk',
    region: 'Kroatien · Istrien',
    text: 'Segelurlaub in Istrien und in der Marina Punat ab Pula oder Punat auf Krk.',
    img: '/images/Destinationsbilder/bucht-in-den-dodekanes-bei-yacht-urlaub.jpg',
    href: '/destinationen/kroatien',
  },
]

export default function BuchenPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-light)' }}>
      <SEO
        title="Jetzt buchen – Verfügbare Packages finden | Yacht-Urlaub"
        description="Segelurlaub direkt online buchen: Startdatum und Dauer wählen, verfügbare Yachten und Packages finden und sofort buchen."
        canonical="/buchen"
        image="/images/Zielgruppen/Freunde 1.jpg"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}
          >
            Jetzt buchen
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}
          >
            Verfügbare Packages zum Wunschtermin finden
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}
          >
            Wähle Startdatum und Reisedauer — wir zeigen dir alle verfügbaren Yachten und Packages.
          </motion.p>
        </div>
      </div>

      {/* Planyo Widget via iframe */}
      <div className="container" style={{ maxWidth: '960px', padding: '2.5rem 1.5rem 0' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          style={{
            background: '#fff',
            borderRadius: '6px',
            boxShadow: '0 4px 32px rgba(0,0,0,0.10)',
            overflow: 'hidden',
          }}
        >
          <iframe
            src="/buchen-widget.html"
            title="Yacht buchen"
            style={{
              width: '100%',
              height: '1400px',
              border: 'none',
              display: 'block',
            }}
          />
        </motion.div>

        {/* Kabinen-Angebote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{
            margin: '1.5rem 0',
            background: 'linear-gradient(135deg, #1a6eb5 0%, #0f3d6e 100%)',
            borderRadius: '6px',
            padding: '1.25rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 500 }}>
            Aktuelle Kabinenangebote (für Alleinreisende oder kleine Gruppen)
          </p>
          <Link to="/news" style={{
            background: '#fff',
            color: '#1a6eb5',
            padding: '8px 20px',
            borderRadius: '3px',
            fontSize: '0.82rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>
            Jetzt stöbern →
          </Link>
        </motion.div>
      </div>

      {/* Packages Overview */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Segel-Packages
            </p>
            <h2 className="section-title">Alle Packages auf einen Blick</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="pkg-grid">
            {packages.map((pkg, i) => (
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
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', fontSize: '1.1rem', lineHeight: 1.3, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
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
                    ⚓ Zum Angebot
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
    </main>
  )
}
