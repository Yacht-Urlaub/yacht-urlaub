import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const groups = [
  {
    title: 'Zum ersten Mal hier?',
    subtitle: 'Für Einsteiger',
    text: 'Noch nie gesegelt? Perfekt. Spüren Sie das Kribbeln, wenn sich die Yacht in Bewegung setzt – sicher begleitet von einem erfahrenen Skipper.',
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    cta: 'Einsteiger-Törns',
    href: '#einsteiger',
  },
  {
    title: 'Mit Freunden',
    subtitle: 'Für Freunde',
    text: 'Auf eurer Yacht erlebt ihr gemeinsam, was sonst nur in Filmen passiert. Sonne, Meer, Freiheit — und das gemeinsam.',
    img: '/images/Zielgruppen/Freunde 1.jpg',
    cta: 'Freunde-Törns',
    href: '#freunde',
  },
  {
    title: 'Familien-Törns',
    subtitle: 'Für Familien',
    text: 'Ein Segelabenteuer, das Kinder staunen und Eltern durchatmen lässt. Unvergessliche Momente für die ganze Familie.',
    img: '/images/Zielgruppen/Familie 1.jpg',
    cta: 'Familien-Törns',
    href: '#familien',
  },
  {
    title: 'Luxury',
    subtitle: 'Für Anspruchsvolle',
    text: 'Gönnen Sie sich Meer mit Stil. An Bord unserer Luxusyachten wird jeder Sonnenuntergang zur Privataufführung.',
    img: '/images/Zielgruppen/Entdecker 3.jpg',
    cta: 'Luxury-Törns',
    href: '#luxury',
  },
]

function Card({ g, i }: { g: typeof groups[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: i * 0.12 }}
      style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        cursor: 'pointer',
        aspectRatio: '3/4',
      }}
    >
      <img
        src={g.img}
        alt={g.title}
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(18,43,64,0.9) 0%, rgba(18,43,64,0.3) 50%, transparent 100%)',
      }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem' }}>
        <p style={{ color: 'var(--blue-light)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{g.subtitle}</p>
        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: '#fff', fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.25 }}>{g.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{g.text}</p>
        <a href={g.href} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '9px 18px' }}>{g.cta} →</a>
      </div>
    </motion.div>
  )
}

export default function Zielgruppen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="toerns" className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Unsere Törns
          </p>
          <h2 className="section-title">Dein perfekter Segeltörn</h2>
          <p className="section-subtitle">Von der ersten Segelstunde bis zum Luxuserlebnis — wir haben den passenden Törn für jeden.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {groups.map((g, i) => <Card key={g.title} g={g} i={i} />)}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #toerns .container > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          #toerns .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
