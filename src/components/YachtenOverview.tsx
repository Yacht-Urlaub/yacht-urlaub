import { motion } from 'framer-motion'
import { useNavigate } from '../navigate'

const types = [
  { label: 'Segelyacht', sub: 'Monohull', img: '/images/yachten/monohull.jpg', href: '/yachten?tab=monohull' },
  { label: 'Segel-Katamaran', sub: 'Mehr Komfort', img: '/images/yachten/katamaran.jpg', href: '/yachten?tab=katamaran' },
  { label: 'Motoryacht', sub: 'Monohull', img: '/images/yachten/motoryacht.jpg', href: '/yachten?tab=motoryacht' },
  { label: 'Motor-Katamaran', sub: 'Power & Komfort', img: '/images/yachten/motoryacht-katamaran.jpg', href: '/yachten?tab=motorkat' },
]

export default function YachtenOverview() {
  const navigate = useNavigate()

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <p className="section-label">Unsere Flotte</p>
            <h2 className="section-title">Yachten</h2>
            <p className="section-subtitle">Von der klassischen Segelyacht bis zum Luxus-Katamaran — wir finden die richtige Yacht für Ihren Törn.</p>
          </div>
          <button onClick={() => navigate('/yachten')} className="btn btn-ghost" style={{ flexShrink: 0 }}>
            Alle Yachten ansehen →
          </button>
        </motion.div>

        <div className="yachten-overview-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {types.map((t, i) => (
            <motion.div
              key={t.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => navigate(t.href)}
              className="card-hover"
              style={{
                position: 'relative', overflow: 'hidden', borderRadius: '4px',
                aspectRatio: '3/4', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={t.img} alt={t.label} loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,35,56,0.9) 0%, rgba(15,35,56,0.2) 50%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                <p style={{ color: 'var(--blue-light)', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{t.sub}</p>
                <h3 style={{ color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{t.label}</h3>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', fontWeight: 600 }}>Details ansehen →</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .yachten-overview-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .yachten-overview-grid { grid-template-columns: 1fr 1fr !important; gap: 0.75rem !important; }
        }
      `}</style>
    </section>
  )
}
