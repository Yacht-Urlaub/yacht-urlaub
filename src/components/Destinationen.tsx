import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import DestinationDetail, { destinations } from './DestinationDetail'

const grid = [
  { id: 'kroatien', img: '/images/Destinationsbilder/blick-auf-den-hafen-von-hvar-bei-yacht-urlaub.png', wide: true },
  { id: 'griechenland', img: '/images/Destinationsbilder/akropolis-von-rhodos-bei-yacht-urlaub.jpg', wide: false },
  { id: 'balearen', img: '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg', wide: false },
  { id: 'karibik-bvi', img: '/images/Destinationsbilder/sandy-cay-mit-2-katamarane-davor-bei-yacht-urlaub.png', wide: false },
  { id: 'seychellen', img: '/images/Destinationsbilder/Header/seychelles1.jpg', wide: false },
  { id: 'thailand', img: '/images/Destinationsbilder/katamaran-in-thailand.jpg', wide: false },
]

export default function Destinationen() {
  const [selected, setSelected] = useState<string | null>(null)
  const dest = selected ? destinations.find(d => d.id === selected) : null

  return (
    <section id="destinationen" style={{ background: 'var(--navy)' }}>
      <AnimatePresence mode="wait">
        {dest ? (
          <DestinationDetail key={dest.id} dest={dest} onBack={() => setSelected(null)} />
        ) : (
          <motion.div
            key="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="section"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                style={{ marginBottom: '3rem', textAlign: 'center' }}
              >
                <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
                  Unsere Segelgebiete
                </p>
                <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: '1rem' }}>
                  Destinationen
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto', fontSize: '0.92rem', lineHeight: 1.8 }}>
                  Von der kroatischen Küste bis zu den paradiesischen Seychellen — klicken Sie auf eine Destination für mehr Details.
                </p>
              </motion.div>

              {/* Mosaic grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto', gap: '8px' }}>
                {grid.map((item, i) => {
                  const d = destinations.find(x => x.id === item.id)!
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.5, delay: i * 0.07 }}
                      onClick={() => setSelected(item.id)}
                      style={{
                        position: 'relative', overflow: 'hidden',
                        gridColumn: item.wide ? 'span 2' : 'span 1',
                        aspectRatio: item.wide ? '2/1' : '4/3',
                        borderRadius: '3px', cursor: 'pointer',
                      }}
                    >
                      <img
                        src={item.img}
                        alt={d.name}
                        loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(to top, rgba(18,43,64,0.85) 0%, rgba(18,43,64,0.1) 55%, transparent 100%)',
                        transition: 'background 0.3s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(18,43,64,0.92) 0%, rgba(18,43,64,0.3) 70%, transparent 100%)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(to top, rgba(18,43,64,0.85) 0%, rgba(18,43,64,0.1) 55%, transparent 100%)')}
                      />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem' }}>
                        <h3 style={{ color: '#fff', fontSize: item.wide ? '1.3rem' : '1rem', fontWeight: 700, marginBottom: '2px', fontFamily: 'DM Sans, sans-serif' }}>{d.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem' }}>{d.country} · {d.bestTime}</p>
                        <span style={{ display: 'inline-block', marginTop: '0.5rem', color: 'var(--blue-light)', fontSize: '0.72rem', fontWeight: 600 }}>Mehr erfahren →</span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* More destinations row */}
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                {[
                  { id: 'kanaren', name: 'Kanaren', flag: '🇪🇸', time: 'Ganzjährig', img: '/images/Destinationsbilder/grenadinen-und-st-vincent.jpg' },
                  { id: 'windward', name: 'Grenadinen', flag: '🏝️', time: 'Nov – Apr', img: '/images/Destinationsbilder/grenadinen-und-st-vincent.jpg' },
                ].map(item => (
                  <div key={item.id} style={{ flex: 1, position: 'relative', overflow: 'hidden', aspectRatio: '3/1', borderRadius: '3px', cursor: 'pointer', background: 'rgba(255,255,255,0.05)' }}>
                    <img src={item.img} alt={item.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', padding: '1.5rem', gap: '1rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.flag}</span>
                      <div>
                        <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700 }}>{item.name}</h3>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem' }}>{item.time}</p>
                      </div>
                      <span style={{ color: 'var(--blue-light)', fontSize: '0.78rem', fontWeight: 600, marginLeft: 'auto' }}>Anfragen →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          #destinationen .container > div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          #destinationen .container > div[style*="repeat(3, 1fr)"] > div[style*="span 2"] {
            grid-column: span 2 !important;
          }
        }
        @media (max-width: 560px) {
          #destinationen .container > div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          #destinationen .container > div[style*="repeat(3, 1fr)"] > div[style*="span 2"] {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  )
}
