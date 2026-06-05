import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { destinations } from '../data/destinationen'
import type { Destination, DestBlock } from '../data/destinationen'
import { packages } from './Packages'
import { CalendarIcon } from './Icons'

export { destinations }
export type { Destination }

// Kurze Absätze ohne Satzzeichen am Ende = Zwischenüberschriften (z.B. "Split", "Hvar")
function isSubheading(b: DestBlock, next?: DestBlock) {
  return b.t === 'p' && b.x.length < 65 && !/[.!?:]$/.test(b.x.trim()) && next?.t === 'p'
}

export default function DestinationDetail({ dest, onBack }: { dest: Destination; onBack: () => void }) {
  const [lightbox, setLightbox] = useState<string | null>(null)
  const teasers = dest.packageIds.map(pid => packages.find(p => p.id === pid)).filter((p): p is NonNullable<typeof p> => !!p)
  const images = dest.blocks.filter(b => b.t === 'i')

  // Aufeinanderfolgende Bilder zu Gruppen zusammenfassen
  const grouped: (DestBlock | DestBlock[])[] = []
  for (const b of dest.blocks) {
    const last = grouped[grouped.length - 1]
    if (b.t === 'i' && Array.isArray(last)) last.push(b)
    else if (b.t === 'i') grouped.push([b])
    else grouped.push(b)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '440px', overflow: 'hidden', background: 'var(--navy)' }}>
        <img src={dest.headerImg} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(18,43,64,0.4) 0%, rgba(18,43,64,0.72) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '1rem', textAlign: 'left', fontFamily: 'DM Sans, sans-serif' }}>
            ← Alle Destinationen
          </button>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
            {dest.country} Destination
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#fff' }}>{dest.title}</h1>
        </div>
      </div>

      {/* Package-Teaser (wie auf der Originalseite) */}
      {teasers.length > 0 && (
        <section style={{ background: 'var(--gray-light)', padding: '3rem 0' }}>
          <div className="container">
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '1.5rem' }}>
              Unsere Packages in {dest.name}
            </h2>
            <div className="dest-teaser-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(teasers.length, 3)}, 1fr)`, gap: '1.5rem' }}>
              {teasers.map(pkg => (
                <div key={pkg.id} style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 2px 14px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '150px', overflow: 'hidden' }}>
                    <img src={pkg.cardImg} alt={pkg.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={e => { (e.target as HTMLImageElement).src = '/images/packages/default-header-image.jpg' }} />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
                      {pkg.title}
                    </h3>
                    <p style={{ color: '#555', fontSize: '0.8rem', lineHeight: 1.55, flex: 1, marginBottom: '1rem' }}>{pkg.subtitle}</p>
                    <Link to={`/packages/${pkg.id}`} className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '9px 16px', alignSelf: 'flex-start' }}>
                      ▶ ZUM ANGEBOT
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container" style={{ padding: '4rem 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '4rem' }} className="dest-detail-grid">
          {/* Hauptinhalt (1:1 vom Original) */}
          <div>
            {grouped.map((g, gi) => {
              if (Array.isArray(g)) {
                return (
                  <div key={gi} className="dest-img-grid" style={{ display: 'grid', gridTemplateColumns: g.length > 1 ? '1fr 1fr' : '1fr', gap: '1rem', margin: '1.75rem 0' }}>
                    {g.map(img => (
                      <figure key={img.x}>
                        <img src={img.x} alt={img.c || dest.name} loading="lazy"
                          onClick={() => setLightbox(img.x)}
                          style={{ width: '100%', borderRadius: '5px', cursor: 'zoom-in', boxShadow: '0 2px 14px rgba(0,0,0,0.1)' }}
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                        {img.c && <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.4rem', fontStyle: 'italic' }}>{img.c}</figcaption>}
                      </figure>
                    ))}
                  </div>
                )
              }
              const b = g
              const idx = dest.blocks.indexOf(b)
              const next = dest.blocks[idx + 1]
              if (b.t === 'h') {
                return (
                  <h2 key={gi} style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', margin: gi === 0 ? '0 0 1.25rem' : '2.5rem 0 1.25rem', lineHeight: 1.3 }}>
                    {b.x}
                  </h2>
                )
              }
              if (b.t === 'li') {
                return (
                  <div key={gi} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>•</span>
                    <span>{b.x}</span>
                  </div>
                )
              }
              if (isSubheading(b, next)) {
                return (
                  <h3 key={gi} style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, margin: '1.5rem 0 0.5rem' }}>
                    {b.x}
                  </h3>
                )
              }
              return (
                <p key={gi} style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                  {b.x}
                </p>
              )
            })}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '4px', padding: '2rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', marginBottom: '1.25rem' }}>Reisedaten</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <span style={{ color: 'var(--blue-light, #7fc4ff)', display: 'flex' }}><CalendarIcon size={20} /></span>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Ideale Reisezeit</p>
                  <p style={{ fontSize: '0.88rem', color: '#fff', fontWeight: 600 }}>{dest.bestTime || 'auf Anfrage'}</p>
                </div>
              </div>
            </div>

            {dest.mapImg && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.6rem' }}>Geografie</h3>
                <img src={dest.mapImg} alt={`Geografische Lage ${dest.name}`} loading="lazy" style={{ width: '100%', borderRadius: '4px', cursor: 'zoom-in' }}
                  onClick={() => setLightbox(dest.mapImg)}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
              </div>
            )}

            {dest.info.length > 0 && (
              <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '1.5rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.85rem' }}>
                  Allgemeine Informationen
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <tbody>
                    {dest.info.map(line => {
                      const ci = line.indexOf(':')
                      const [k, v] = ci > 0 ? [line.slice(0, ci), line.slice(ci + 1).trim()] : ['', line]
                      return (
                        <tr key={line} style={{ borderBottom: '1px solid #e2e8ee' }}>
                          {k && <td style={{ padding: '0.5rem 0.5rem 0.5rem 0', color: '#666', fontWeight: 600, verticalAlign: 'top', whiteSpace: 'nowrap' }}>{k}</td>}
                          <td colSpan={k ? 1 : 2} style={{ padding: '0.5rem 0', color: 'var(--navy)' }}>{v}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <Link to="/urlaubsplaner" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
              Törn nach {dest.name} anfragen →
            </Link>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} src={lightbox} alt=""
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '2px' }} />
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
            <p style={{ position: 'absolute', bottom: '1.25rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', width: '100%', textAlign: 'center' }}>
              {images.find(im => im.x === lightbox)?.c || ''}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .dest-detail-grid { grid-template-columns: 1fr !important; }
          .dest-teaser-grid { grid-template-columns: 1fr !important; }
          .dest-img-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
