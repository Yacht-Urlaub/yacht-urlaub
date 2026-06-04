import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { packages } from '../components/Packages'

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const pkg = packages.find(p => p.id === id)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!pkg) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--navy)' }}>Package nicht gefunden</h1>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>Zur Startseite</Link>
        </div>
      </main>
    )
  }

  return (
    <main>
      <SEO
        title={`${pkg.title} | Yacht-Urlaub`}
        description={pkg.subtitle}
        canonical={`/packages/${pkg.id}`}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '380px', overflow: 'hidden', background: 'var(--navy)' }}>
        <img
          src={pkg.cardImg}
          alt={pkg.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(13,30,46,0.85) 0%, rgba(13,30,46,0.4) 60%, transparent 100%)' }} />
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
            {pkg.tags.map(tag => (
              <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 600, letterSpacing: '0.04em' }}>
                {tag}
              </span>
            ))}
            <span style={{ background: 'rgba(26,110,181,0.5)', color: '#fff', fontSize: '0.72rem', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>
              📍 {pkg.country}
            </span>
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0' }}>
            {pkg.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ padding: '4rem 20px' }}>
        <div className="pkg-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '4rem', marginBottom: '4rem' }}>

          {/* Left */}
          <div>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>{pkg.subtitle}</p>

            {/* Inkludiert */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', fontStyle: 'italic', marginBottom: '1rem' }}>inkludiert:</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {pkg.included.map(item => (
                  <li key={item} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>✔</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reise-Facts */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', fontStyle: 'italic', marginBottom: '1rem' }}>Reise-Facts:</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {pkg.facts.map(fact => (
                  <li key={fact} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>✔</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <Link to="/buchen" className="btn btn-primary" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              ▶ JETZT BUCHEN!
            </Link>
          </div>

          {/* Right: Price badge + Route */}
          <div>
            <div style={{
              background: 'var(--blue)', color: '#fff', borderRadius: '6px',
              padding: '2rem', textAlign: 'center', marginBottom: '1.5rem',
            }}>
              <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', opacity: 0.85 }}>ab</p>
              <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '3rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.3rem' }}>
                € {pkg.price},-
              </p>
              <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>pro Person{pkg.priceNote ? ` (${pkg.priceNote})` : ''}</p>
            </div>

            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Ihre Reise im Detail
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.4rem' }}>Die Route</p>
              <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.6 }}>{pkg.route}</p>
            </div>
          </div>
        </div>

        {/* Route map */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Routenkarte</h2>
          <img
            src={pkg.routeMap}
            alt={`Route ${pkg.title}`}
            style={{ maxWidth: '100%', borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Gallery */}
        <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>Fotogalerie</h2>
        <div className="pkg-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '4rem' }}>
          {pkg.gallery.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightbox(i)}
              style={{
                aspectRatio: i % 5 === 0 ? '16/9' : '4/3',
                gridColumn: i % 5 === 0 ? 'span 2' : 'span 1',
                overflow: 'hidden', cursor: 'pointer', borderRadius: '3px', background: '#eee',
              }}
            >
              <img
                src={img} alt="" loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
              />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--gray-light)', borderRadius: '6px', padding: '3rem 2rem' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Bereit für {pkg.title}?
          </h2>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Prüfen Sie jetzt freie Termine und buchen Sie Ihren Traumurlaub direkt online.
          </p>
          <Link to="/buchen" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
            ▶ FREIE TERMINE &amp; PREISE
          </Link>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button onClick={e => { e.stopPropagation(); setLightbox(i => (i! - 1 + pkg.gallery.length) % pkg.gallery.length) }}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>‹</button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              src={pkg.gallery[lightbox]} alt=""
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '2px' }}
            />
            <button onClick={e => { e.stopPropagation(); setLightbox(i => (i! + 1) % pkg.gallery.length) }}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>›</button>
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
            <p style={{ position: 'absolute', bottom: '1.5rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>{lightbox + 1} / {pkg.gallery.length}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .pkg-main-grid { }
        @media (max-width: 900px) { .pkg-main-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
        @media (max-width: 600px) { .pkg-gallery-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </main>
  )
}
