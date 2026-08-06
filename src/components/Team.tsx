import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from '../router'

const team = [
  {
    name: 'Manuel Göschl, MBA',
    role: 'Gründer & Skipper',
    img: '/images/team_destinationen/Manuel neu blau.webp',
    text: 'Seit über 10 Jahren bringt Manuel seine Leidenschaft fürs Segeln und sein betriebswirtschaftliches Know-how zusammen. Für ihn ist jeder Törn eine neue Geschichte.',
  },
  {
    name: 'Rebecca',
    role: 'Destinationsexpertin',
    img: '/images/team_destinationen/Rebecca.jpg',
    text: 'Rebecca kennt die schönsten Buchten der Karibik und Kroatiens aus erster Hand. Sie plant Routen, die unvergessliche Momente garantieren.',
  },
  {
    name: 'Toni Liebscher',
    role: 'Skipper',
    img: '/images/team_destinationen/skipper-toni-liebscher.jpg',
    text: 'Als erfahrener Skipper hat Toni tausende Seemeilen unter dem Kiel. Sicherheit, Komfort und Spaß an Bord — das ist seine Mission.',
  },
]

const cards = [
  {
    title: 'Törnberichte',
    text: 'Reiseberichte direkt von unseren Törns — authentisch, persönlich und voller Inspiration.',
    img: '/images/team_destinationen/toernbericht NEU.jpg',
    cta: 'Berichte lesen',
    href: '/toernberichte',
  },
  {
    title: 'Destinationen',
    text: 'Alles was Sie über unsere Segelreviere wissen müssen — Tipps, Häfen, Highlights.',
    img: '/images/team_destinationen/destinationen.jpg',
    cta: 'Destinationen entdecken',
    href: '/destinationen',
  },
  {
    title: 'Charter',
    text: 'Yacht und Crew mieten — für Gruppen, Events oder einfach zum exklusiven Segeln.',
    img: '/images/team_destinationen/crewcharter/crewcharter.jpg',
    cta: 'Charter anfragen',
    href: '/charter',
  },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem' }}
        >
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Unser Team
          </p>
          <h2 className="section-title">Menschen hinter dem Törn</h2>
          <p className="section-subtitle">Wir sind leidenschaftliche Segler mit jahrelanger Erfahrung — und freuen uns darauf, Sie an Bord zu begrüßen.</p>
        </motion.div>

        {/* Team members */}
        <div className="team-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '4rem' }}>
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 1.25rem', border: '3px solid var(--gray-light)' }}>
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/team_destinationen/Foto.jpg' }}
                />
              </div>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.3rem' }}>{t.name}</h3>
              <p style={{ color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{t.role}</p>
              <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75 }}>{t.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Info cards */}
        <div className="team-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: '4px',
                aspectRatio: '4/3', cursor: 'pointer',
              }}
            >
              <img
                src={c.img}
                alt={c.title}
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).src = '/images/Sail-Away.jpg' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(18,43,64,0.85) 0%, transparent 60%)' }} />
              <div style={{ position: 'absolute', bottom: 0, padding: '1.5rem' }}>
                <h3 style={{ color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', marginBottom: '0.5rem' }}>{c.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1rem' }}>{c.text}</p>
                <Link to={c.href} style={{ color: 'var(--blue-light)', fontSize: '0.78rem', fontWeight: 600 }}>{c.cta} →</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .team-grid { grid-template-columns: 1fr 1fr !important; }
          .team-cards-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
