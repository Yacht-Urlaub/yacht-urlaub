import { useParams } from 'react-router-dom'
import { Link, Navigate } from '../router'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { toernberichte } from '../data/toernberichte'
import { toernberichteEn } from '../data/toernberichteEn'
import { useLang } from '../i18n'

const dd = {
  de: {
    base: '/toernberichte', home: 'Start', list: 'Törnberichte',
    ctaHeading: 'Lust auf Ihren eigenen Törn?',
    ctaText: 'Starten Sie jetzt Ihre unverbindliche Anfrage — oder stöbern Sie weiter in unseren Törnberichten.',
    ctaRequest: 'ANFRAGE STARTEN', ctaBack: '← Alle Törnberichte', planer: '/urlaubsplaner',
    seoSuffix: 'Törnbericht',
  },
  en: {
    base: '/en/trip-reports', home: 'Home', list: 'Trip Reports',
    ctaHeading: 'Ready for your own adventure?',
    ctaText: 'Start your no-obligation inquiry now — or keep browsing our trip reports for more inspiration.',
    ctaRequest: 'GET A QUOTE', ctaBack: '← All Trip Reports', planer: '/en/holiday-planner',
    seoSuffix: 'Trip Report',
  },
}

export default function ToernberichtDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const lang = useLang()
  const s = dd[lang]
  const list = lang === 'en' ? toernberichteEn : toernberichte
  const tb = list.find(t => t.slug === slug)
  const [lightbox, setLightbox] = useState<string | null>(null)

  if (!tb) return <Navigate to={s.base} replace />

  const images = tb.blocks.filter(b => b.t === 'i')

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={`${tb.title} – ${s.seoSuffix} | ${lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub'}`}
        description={tb.teaser}
        image={tb.hero}
      />

      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden', background: 'var(--navy)' }}>
        <img
          src={tb.hero}
          alt={tb.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).style.opacity = '0' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,27,47,0.92) 0%, rgba(7,27,47,0.35) 55%, rgba(7,27,47,0.25) 100%)' }} />
        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '2.5rem' }}>
          <nav style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.85rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
            <Link to={lang === 'en' ? '/en' : '/'} style={{ color: 'rgba(255,255,255,0.6)' }}>{s.home}</Link>
            <span>›</span>
            <Link to={s.base} style={{ color: 'rgba(255,255,255,0.6)' }}>{s.list}</Link>
          </nav>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.7rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0.4rem', lineHeight: 1.2 }}>
            {tb.title}
          </motion.h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>{tb.teaser}</p>
        </div>
      </div>

      {/* Video (z.B. BVI-Bericht) */}
      {tb.video && (
        <section style={{ background: 'var(--navy)', padding: '3rem 0' }}>
          <div className="container" style={{ maxWidth: '860px' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${tb.video}`}
                title={tb.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Bericht (1:1 vom Original, Tagebuch-Charakter) */}
      <article style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          {tb.blocks.map((b, i) => {
            if (b.t === 'h') {
              return (
                <h2 key={i} style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', margin: '2.5rem 0 1rem', lineHeight: 1.3 }}>
                  {b.x}
                </h2>
              )
            }
            if (b.t === 'i') {
              return (
                <figure key={i} style={{ margin: '1.75rem 0' }}>
                  <img
                    src={b.x}
                    alt={b.c || tb.title}
                    loading="lazy"
                    onClick={() => setLightbox(b.x)}
                    style={{ width: '100%', borderRadius: '5px', cursor: 'zoom-in', boxShadow: '0 2px 16px rgba(0,0,0,0.1)' }}
                    onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                  />
                  {b.c && (
                    <figcaption style={{ color: 'var(--gray)', fontSize: '0.8rem', marginTop: '0.5rem', fontStyle: 'italic' }}>
                      {b.c}
                    </figcaption>
                  )}
                </figure>
              )
            }
            return (
              <p key={i} style={{ color: '#444', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                {b.x}
              </p>
            )
          })}
        </div>
      </article>

      {/* CTA */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            {s.ctaHeading}
          </h2>
          <p style={{ color: 'var(--gray)', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
            {s.ctaText}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={s.planer} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '13px 30px' }}>
              {s.ctaRequest}
            </Link>
            <Link to={s.base} className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '13px 30px' }}>
              {s.ctaBack}
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
          >
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              src={lightbox} alt=""
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '3px' }}
            />
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
            <p style={{ position: 'absolute', bottom: '1.25rem', color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', width: '100%', textAlign: 'center' }}>
              {images.find(im => im.x === lightbox)?.c || ''}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
