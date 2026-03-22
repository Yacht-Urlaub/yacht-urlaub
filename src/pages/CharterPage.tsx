import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const services = [
  {
    icon: '⛵',
    title: 'Yacht-Charter',
    subtitle: 'Bareboat & Skippered',
    desc: 'Mieten Sie Ihre Traumyacht — mit oder ohne Skipper. Wir bieten eine umfangreiche Flotte von Segelyachten, Katamaranen und Motoryachten in den schönsten Segelrevieren der Welt.',
    features: ['Bareboat-Charter ab Segelschein', 'Skippered Charter für Einsteiger', 'Flotte von 35 – 60 Fuß', 'Alle Reviere weltweit', 'Flexible Buchungsbedingungen'],
    img: '/images/charter/yachtchartern-bei-yacht-urlaub.jpg',
    cta: 'Charter anfragen',
  },
  {
    icon: '👨‍✈️',
    title: 'Skipper- & Bord-Service',
    subtitle: 'Professionelle Crew',
    desc: 'Sie möchten segeln, aber ohne den Stress des Skipperns? Unser erfahrenes Skipper-Team übernimmt die Navigation — Sie genießen einfach den Urlaub.',
    features: ['Erfahrene, mehrsprachige Skipper', 'Hostess & Koch auf Anfrage', 'Sicherheitsbriefing inklusive', 'Lokales Revier-Know-how', 'Tagesweise buchbar'],
    img: '/images/team_destinationen/skipper-manuel-goeschl.jpg',
    cta: 'Skipper anfragen',
  },
]

const partners = [
  { name: 'ACI Marinas', img: '/images/charter/ACI.jpg' },
  { name: 'Sealogy', img: '/images/charter/Sealogy Logo.webp' },
]

const confidence = [
  { img: '/images/charter/Charter Confidence YU 2026.webp', alt: 'Charter Confidence 2026' },
]

export default function CharterPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Yacht-Charter & Skipper-Service"
        description="Yacht-Charter mit oder ohne Skipper: Bareboat-Charter ab Segelschein, Skippered Charter für Einsteiger, professioneller Skipper- und Bord-Service. Flotte von 35–60 Fuß weltweit."
        canonical="/charter"
        image="/images/charter/yachtchartern-bei-yacht-urlaub.jpg"
      />
      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img src="/images/charter/header.png" alt="Charter" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/monohull.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.85) 0%, rgba(15,35,56,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Yacht mieten
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            Charter
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', maxWidth: '480px', lineHeight: 1.8 }}>
            Ihre Traumyacht wartet — mit oder ohne Skipper, in den schönsten Segelrevieren der Welt.
          </motion.p>
        </div>
      </div>

      {/* Services */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="charter-service-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center',
                marginBottom: '5rem',
                direction: i % 2 === 1 ? 'rtl' : 'ltr',
              }}
            >
              <div style={{ direction: 'ltr' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>{s.icon}</span>
                <p style={{ color: 'var(--blue)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>{s.subtitle}</p>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '1.25rem' }}>{s.title}</h2>
                <p style={{ color: 'var(--gray)', lineHeight: 1.85, marginBottom: '1.5rem', fontSize: '0.95rem' }}>{s.desc}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '2rem' }}>
                  {s.features.map(f => (
                    <li key={f} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.88rem', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--blue)', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/#kontakt" className="btn btn-primary">{s.cta} →</Link>
              </div>
              <div style={{ direction: 'ltr', borderRadius: '4px', overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src={s.img} alt={s.title} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/katamaran.jpg' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Charter Confidence */}
      <section style={{ background: 'var(--gray-light)', padding: '3rem 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--gray)', fontSize: '0.78rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 600 }}>Ihre Sicherheit</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {confidence.map(c => (
              <img key={c.alt} src={c.img} alt={c.alt} loading="lazy"
                style={{ height: '60px', objectFit: 'contain' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ))}
            {partners.map(p => (
              <img key={p.name} src={p.img} alt={p.name} loading="lazy"
                style={{ height: '44px', objectFit: 'contain', filter: 'grayscale(0.3)' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '5rem 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
              Bereit für Ihren Charter?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Rufen Sie uns an oder schreiben Sie uns — wir finden die perfekte Yacht für Sie.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-outline">+43 1 997 15 82</a>
              <Link to="/#kontakt" className="btn btn-primary">Anfrage starten →</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .charter-service-row { grid-template-columns: 1fr !important; direction: ltr !important; gap: 2rem !important; margin-bottom: 3rem !important; }
        }
      `}</style>
    </main>
  )
}
