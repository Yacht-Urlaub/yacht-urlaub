import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

// Original Google-Rezensionen als Screenshots (1:1 von der Originalseite)
const reviews = [
  '/images/Bewertungen/Alexandra.png',
  '/images/Bewertungen/Wolfgang.png',
  '/images/Bewertungen/Dani.png',
  '/images/Bewertungen/Gloria.png',
  '/images/Bewertungen/Markus.png',
  '/images/Bewertungen/Reinhard.png',
  '/images/Bewertungen/Stefanie.png',
]

export default function Bewertungen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <img src="/images/Bewertungen/Google5star.webp" alt="5 Sterne auf Google" loading="lazy" style={{ height: '28px', marginBottom: '1rem' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '0.75rem' }}>
            Das sagen unsere Gäste ...
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>
            Echte Google-Rezensionen unserer Mitsegler — unverändert im Original.
          </p>
        </motion.div>

        <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', maxWidth: '1040px', margin: '0 auto' }}>
          {reviews.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.1 }}
              style={{ background: '#fff', borderRadius: '8px', padding: '0.75rem', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}
            >
              <img src={img} alt="Google-Rezension eines Gastes" loading="lazy"
                style={{ width: '100%', display: 'block', borderRadius: '4px' }}
                onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a href="https://www.google.com/search?q=yacht-urlaub.net+bewertungen" target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
            Alle Bewertungen auf Google lesen →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) { .review-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
