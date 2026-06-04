import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const categories = [
  {
    id: 'einsteiger',
    subtitle: 'Für Einsteiger',
    title: 'Zum ersten Mal hier?',
    text: 'Noch nie gesegelt? Perfekt. Spüren Sie das Kribbeln, wenn sich die Yacht in Bewegung setzt – sicher begleitet von einem erfahrenen Skipper.',
    img: '/images/Zielgruppen/Einsteiger 1.jpg',
    cta: 'Einsteiger-Törns',
  },
  {
    id: 'freunde',
    subtitle: 'Für Freunde',
    title: 'Mit Freunden',
    text: 'Auf eurer Yacht erlebt ihr gemeinsam, was sonst nur in Filmen passiert. Sonne, Meer, Freiheit — und das gemeinsam.',
    img: '/images/Zielgruppen/Freunde 1.jpg',
    cta: 'Freunde-Törns',
  },
  {
    id: 'familien',
    subtitle: 'Für Familien',
    title: 'Familien-Törns',
    text: 'Ein Segelabenteuer, das Kinder staunen und Eltern durchatmen lässt. Unvergessliche Momente für die ganze Familie.',
    img: '/images/Zielgruppen/Familie 1.jpg',
    cta: 'Familien-Törns',
  },
  {
    id: 'luxury',
    subtitle: 'Für Anspruchsvolle',
    title: 'Luxury',
    text: 'Gönnen Sie sich Meer mit Stil. An Bord unserer Luxusyachten wird jeder Sonnenuntergang zur Privataufführung.',
    img: '/images/Zielgruppen/Entdecker 3.jpg',
    cta: 'Luxury-Törns',
  },
]

const highlights = [
  { icon: '⚓', label: 'Skipper inklusive', desc: 'Erfahrene, mehrsprachige Skipper' },
  { icon: '🌊', label: 'Alle Reviere', desc: 'Kroatien, Griechenland, Karibik, Seychellen' },
  { icon: '🛡️', label: 'Sicher reisen', desc: 'RYA-zertifizierte Skipper, Sicherheitsbriefing' },
  { icon: '✨', label: 'Rundum-Sorglos', desc: 'Von der Buchung bis zur Rückkehr alles geregelt' },
]

export default function ToernsPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Unsere Törns – Segeltörns für jeden | Yacht-Urlaub"
        description="Von der ersten Segelstunde bis zum Luxuserlebnis: Einsteiger-Törns, Familien-Törns, Freunde-Törns und Luxury-Törns mit erfahrenen Skippern weltweit."
        canonical="/toerns"
        image="/images/Zielgruppen/Einsteiger 1.jpg"
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden' }}>
        <img
          src="/images/Zielgruppen/Freunde 1.jpg"
          alt="Unsere Törns"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.85) 0%, rgba(15,35,56,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Unsere Törns
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            Dein perfekter Segeltörn
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', maxWidth: '520px', lineHeight: 1.7 }}>
            Von der ersten Segelstunde bis zum Luxuserlebnis — wir haben den passenden Törn für jeden.
          </motion.p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div style={{ background: 'var(--navy)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {highlights.map(h => (
            <div key={h.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{h.icon}</span>
              <div>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.82rem' }}>{h.label}</div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.75rem' }}>{h.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) {
            .highlights-bar { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 480px) {
            .highlights-bar { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>

      {/* Category Cards */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              Für jeden der Richtige
            </p>
            <h2 className="section-title">Wähle deinen Törn</h2>
            <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
              Egal ob du zum ersten Mal auf See gehst oder erfahrener Segler bist — bei uns findest du den Törn, der perfekt zu dir passt.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: '4px',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                  aspectRatio: '3/4',
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.title}
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
                  <p style={{ color: 'var(--blue-light)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{cat.subtitle}</p>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.4rem', marginBottom: '0.75rem', lineHeight: 1.25 }}>{cat.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.82rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{cat.text}</p>
                  <Link to={`/toerns/${cat.id}`} className="btn btn-outline" style={{ fontSize: '0.72rem', padding: '9px 18px' }}>
                    {cat.cta} →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <style>{`
          @media (max-width: 900px) {
            .toerns-grid { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 560px) {
            .toerns-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '700px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <p style={{ color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>
              Kein passender Törn dabei?
            </p>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '1.25rem' }}>
              Dein individueller Törn nach Maß
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              Wir planen deinen Traumtörn ganz nach deinen Wünschen — Reisezeit, Zielgebiet, Yacht und Crew. Kontaktiere uns für ein persönliches Angebot.
            </p>
            <a href="#kontakt" className="btn btn-primary">Jetzt anfragen</a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
