import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const reviews = [
  { name: 'Alexandra M.', color: '#0284c7', text: 'Ein unvergessliches Erlebnis! Das Team hat alles perfekt organisiert. Vom Skipper bis zur Route — einfach traumhaft. Sehr gerne wieder!' },
  { name: 'Markus T.', color: '#0f2d47', text: 'Schon zum dritten Mal gebucht und immer wieder begeistert. Die Qualität der Yachten und der persönliche Service sind unschlagbar.' },
  { name: 'Stefanie B.', color: '#0ea5e9', text: 'Als Familie mit Kindern war ich anfangs skeptisch, aber es war der beste Urlaub, den wir je hatten. Die Kinder wollen gar nicht mehr heim!' },
  { name: 'Wolfgang K.', color: '#075985', text: 'Der Törn durch die Grenadinen war ein absoluter Traum. Professionelle Betreuung, tolle Mitsegler und unvergessliche Buchten.' },
  { name: 'Gloria S.', color: '#0369a1', text: 'Seychellen mit Yacht-Urlaub — das ist Luxus pur. Jede Bucht atemberaubend schön, der Skipper war ein absoluter Profi.' },
  { name: 'Daniel F.', color: '#1e40af', text: 'Für uns als Einsteiger war es perfekt. Keine Vorkenntnisse nötig, der Skipper erklärt alles geduldig. Wir kommen definitiv wieder!' },
  { name: 'Reinhard L.', color: '#0c4a6e', text: 'Kroatien mit Freunden — besser geht es nicht. Die Planung war unkompliziert, die Yacht top und die Kulisse unvergleichlich.' },
]

export default function Bewertungen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [active, setActive] = useState(0)

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
          <img src="/images/Bewertungen/Google5star.webp" alt="5 Sterne Google" loading="lazy" style={{ height: '28px', marginBottom: '1rem' }} onError={() => {}} />
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Was unsere Gäste sagen
          </p>
          <h2 className="section-title">Über 500 begeisterte Segler</h2>
        </motion.div>

        {/* Avatar row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {reviews.map((r, i) => (
            <motion.button
              key={r.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onClick={() => setActive(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                borderRadius: '50%',
                outline: active === i ? '3px solid var(--blue)' : '3px solid transparent',
                outlineOffset: '2px',
                transition: 'outline 0.2s',
              }}
            >
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: r.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: '1.1rem',
                fontFamily: 'DM Sans, sans-serif',
              }}>
                {r.name.charAt(0)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Active review */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}
        >
          <p style={{ fontSize: '1.4rem', color: 'var(--blue)', marginBottom: '1rem' }}>❝</p>
          <p style={{ fontSize: '1rem', lineHeight: 1.85, color: '#444', marginBottom: '1.25rem', fontStyle: 'italic' }}>
            {reviews[active].text}
          </p>
          <p style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9rem' }}>{reviews[active].name}</p>
        </motion.div>
      </div>
    </section>
  )
}
