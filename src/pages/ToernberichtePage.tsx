import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { toernberichte } from '../data/toernberichte'
import { toernberichteEn } from '../data/toernberichteEn'
import { useLang } from '../i18n'

const dd = {
  de: {
    seoTitle: 'Törnberichte – Reiseberichte unserer Segeltörns | Yacht-Urlaub',
    seoDescription: 'Authentische Törnberichte unserer Gäste und Skipper: Karibik, Kroatien, Griechenland, Balearen, Sizilien, Sardinien, Kuba und mehr.',
    eyebrow: 'Erlebnisse aus erster Hand',
    heading: 'Törnberichte',
    intro: 'Authentische Reiseberichte unserer Törns — von der Karibik bis Kroatien, im Original-Tagebuchstil.',
    more: '▶ MEHR INFOS',
    base: '/toernberichte',
  },
  en: {
    seoTitle: 'Trip Reports – Real Stories From Our Sailing Charters | Yacht-Holiday',
    seoDescription: 'Authentic trip reports from our guests and skippers: the Caribbean, Croatia, Greece, the Balearics, Sicily, Sardinia, Cuba, and more.',
    eyebrow: 'First-hand stories',
    heading: 'Trip Reports',
    intro: 'Authentic stories from our sailing trips — from the Caribbean to Croatia, told just as our guests experienced them.',
    more: '▶ READ MORE',
    base: '/en/trip-reports',
  },
}

export default function ToernberichtePage() {
  const lang = useLang()
  const s = dd[lang]
  const list = lang === 'en' ? toernberichteEn : toernberichte

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={s.seoTitle}
        description={s.seoDescription}
        canonical={s.base}
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '4rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {s.eyebrow}
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '0.75rem' }}>
            {s.heading}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '520px', margin: '0 auto' }}>
            {s.intro}
          </p>
        </div>
      </div>

      {/* Berichte-Grid (Reihenfolge wie auf der Originalseite) */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container">
          <div className="tb-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {list.map((tb, i) => (
              <motion.div
                key={tb.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}
              >
                <Link to={`${s.base}/${tb.slug}`} style={{ display: 'block', height: '200px', overflow: 'hidden' }}>
                  <img
                    src={tb.cardImg}
                    alt={tb.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                  />
                </Link>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {tb.title}
                  </h2>
                  <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, marginBottom: '1.25rem' }}>
                    {tb.teaser}
                  </p>
                  <Link
                    to={`${s.base}/${tb.slug}`}
                    className="btn btn-primary"
                    style={{ fontSize: '0.75rem', padding: '9px 18px', alignSelf: 'flex-start' }}
                  >
                    {s.more}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .tb-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .tb-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
