import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const offers = [
  {
    img: '/images/Destinationsbilder/Seychellen_Drohne_klein.jpg',
    tag: 'Angebot',
    title: 'DEIN PLATZ AN DER SONNE',
    text: '18.04. – 28.04.2026 ab Mahé, Seychellen inklusive Skipper, Katamaran-Komfort und unvergesslicher Momente.',
    cta: 'Mehr erfahren',
    href: '#seychellen',
  },
  {
    img: '/images/news/Dalmatia_kat.webp',
    tag: 'Familie',
    title: 'VORTEILE FÜR FAMILIEN IN KROATIEN',
    text: 'Unser Partner MySea ermöglicht allen Familien günstiger durch die Inselwelt Kroatiens zu segeln.',
    cta: 'Mehr erfahren',
    href: '#familien',
  },
  {
    img: '/images/news/beach-bikini-jump.jpg',
    tag: 'Kabinen',
    title: 'KABINEN-ANGEBOTE',
    text: 'Entdecken Sie exklusive Kabinenangebote für Ihren Traum-Yachturlaub – individuell und unvergesslich!',
    cta: 'Angebote ansehen',
    href: '#kabinen',
  },
]

export default function News() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="news" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Aktuelles
            </p>
            <h2 className="section-title">Top-News &amp; Angebote</h2>
          </div>
          <a href="#toerns" style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>Alle Angebote →</a>
        </motion.div>

        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {offers.map((o, i) => (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: '#fff',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                border: '1px solid #eee',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                <img
                  src={o.img}
                  alt={o.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/slider/Front.jpg' }}
                />
                <span style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: 'var(--blue)', color: '#fff',
                  padding: '3px 10px', fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px',
                }}>
                  {o.tag}
                </span>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {o.title}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: '1.25rem' }}>{o.text}</p>
                <a href={o.href} style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{o.cta} →</a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .news-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
