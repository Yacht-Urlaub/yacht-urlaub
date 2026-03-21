import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const reviews = [
  { name: 'Alexandra', img: '/images/Bewertungen/Alexandra.png', text: 'Ein unvergessliches Erlebnis! Das Team von Yacht-Urlaub hat alles perfekt organisiert. Vom Skipper bis zur Route — einfach traumhaft.' },
  { name: 'Markus', img: '/images/Bewertungen/Markus.png', text: 'Schon zum dritten Mal gebucht und immer wieder begeistert. Die Qualität der Yachten und der Service sind einfach unschlagbar.' },
  { name: 'Stefanie', img: '/images/Bewertungen/Stefanie.png', text: 'Als Familie mit Kindern war ich anfangs skeptisch, aber es war das beste Urlaub, das wir je hatten. Die Kinder wollen gar nicht mehr heim!' },
  { name: 'Wolfgang', img: '/images/Bewertungen/Wolfgang.png', text: 'Der Törn durch die Grenadinen war ein absoluter Traum. Professionelle Betreuung, tolle Mitsegler und unvergessliche Buchten.' },
  { name: 'Gloria', img: '/images/Bewertungen/Gloria.png', text: 'Seychellen mit Yacht-Urlaub — das ist Luxus pur. Jede Bucht atemberaubend schön, der Skipper war ein absoluter Profi.' },
  { name: 'Dani', img: '/images/Bewertungen/Dani.png', text: 'Für uns als Einsteiger war es perfekt. Keine Vorkenntnisse nötig, der Skipper erklärt alles geduldig. Wir kommen definitiv wieder!' },
  { name: 'Reinhard', img: '/images/Bewertungen/Reinhard.png', text: 'Kroatien mit Freunden — besser geht es nicht. Die Planung war unkompliziert, die Yacht top und die Kulisse unvergleichlich.' },
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
              <img
                src={r.img}
                alt={r.name}
                loading="lazy"
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', display: 'block' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
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
