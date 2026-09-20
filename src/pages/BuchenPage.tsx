import { useEffect, useState } from 'react'
import { Link } from '../router'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang } from '../i18n'
import PackagesGrid from '../components/PackagesGrid'

const bl = {
  de: { seoT: 'Jetzt buchen – Verfügbare Packages finden | Yacht-Urlaub',
    tag: 'Jetzt buchen', h1: 'Verfügbare Packages zum Wunschtermin finden',
    sub: 'Wähle Startdatum und Reisedauer — wir zeigen dir alle verfügbaren Yachten und Packages.' },
  en: { seoT: 'Book now – find available packages | Yacht-Holiday',
    tag: 'Book now', h1: 'Find available packages for your preferred dates',
    sub: 'Choose your start date and duration — we will show you all available yachts and packages.' },
}

export default function BuchenPage() {
  const lang = useLang()
  const s = bl[lang]

  // Der Planyo-Suchwidget (buchen-widget.html) meldet per postMessage, wie
  // hoch er wirklich sein muss — anfangs nur die Suchleiste, erst nach dem
  // Absenden der Suche wird auf die volle Höhe für die Ergebnisse erweitert.
  const [widgetHeight, setWidgetHeight] = useState(260)
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin) return
      if (e.data?.source === 'buchen-widget' && typeof e.data.height === 'number') {
        setWidgetHeight(e.data.height)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <main style={{ paddingTop: '72px', minHeight: '100vh', background: 'var(--gray-light)' }}>
      <SEO
        title={s.seoT}
        description="Segelurlaub direkt online buchen: Startdatum und Dauer wählen, verfügbare Yachten und Packages finden und sofort buchen."
        image="/images/Zielgruppen/Freunde 1.jpg"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '3rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}
          >
            {s.tag}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff', marginBottom: '1rem' }}
          >
            {s.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto' }}
          >
            {s.sub}
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
            title={lang === 'en' ? 'Book a yacht' : 'Yacht buchen'}
            style={{
              width: '100%',
              height: widgetHeight + 'px',
              border: 'none',
              display: 'block',
              transition: 'height 0.35s ease',
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
            {lang === 'en' ? 'Current cabin offers (for solo travellers or small groups)' : 'Aktuelle Kabinenangebote (für Alleinreisende oder kleine Gruppen)'}
          </p>
          <Link to={lang === 'en' ? '/en/cabin-offers' : '/kabinen'} style={{
            background: '#fff',
            color: '#1a6eb5',
            padding: '8px 20px',
            borderRadius: '3px',
            fontSize: '0.82rem',
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}>
            {lang === 'en' ? 'Browse now →' : 'Jetzt stöbern →'}
          </Link>
        </motion.div>
      </div>

      <PackagesGrid />
    </main>
  )
}
