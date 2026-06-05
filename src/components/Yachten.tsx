import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { yachtCards, yachtCategories } from '../data/yachten'
import { yachtCardsEn, yachtCategoriesEn } from '../data/yachtenEn'
import { useLang } from '../i18n'

const validTabs = yachtCategories.map(c => c.id)

export default function Yachten() {
  const lang = useLang()
  const cards = lang === 'en' ? yachtCardsEn : yachtCards
  const cats = lang === 'en'
    ? yachtCategories.map(c => yachtCategoriesEn.find(e => e.id === c.id) ?? c)
    : yachtCategories
  const [searchParams] = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [activeTab, setActiveTab] = useState(validTabs.includes(tabParam ?? '') ? tabParam! : 'monohull')
  const [lightbox, setLightbox] = useState<string | null>(null)

  useEffect(() => {
    if (tabParam && validTabs.includes(tabParam)) setActiveTab(tabParam)
  }, [tabParam])

  const cat = cats.find(c => c.id === activeTab)!

  return (
    <div>
      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Yacht-Kategorien
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.9rem, 4.5vw, 2.9rem)', color: '#fff', marginBottom: '0.75rem' }}>
            {lang === 'en' ? 'Our yachts - the right one for everybody' : 'Unsere Yachten - für jeden das Richtige'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '560px', margin: '0 auto' }}>
            {lang === 'en' ? 'You can book the following yacht categories with us. Each type has its advantages and strengths. An overview:' : 'Bei uns gibt es folgende Yacht-Kategorien zu buchen. Jede Art hat ihre Vorteile und Stärken. Ein Überblick:'}
          </p>
        </div>
      </div>

      {/* Kategorie-Übersicht (1:1 vom Original) */}
      <section style={{ background: 'var(--gray-light)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="yacht-card-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
            {cards.map(card => (
              <div key={card.id}
                onClick={() => { setActiveTab(card.id); document.getElementById('yacht-detail')?.scrollIntoView({ behavior: 'smooth' }) }}
                style={{
                  background: '#fff', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer',
                  boxShadow: activeTab === card.id ? '0 0 0 3px var(--blue), 0 6px 24px rgba(2,132,199,0.18)' : '0 2px 14px rgba(0,0,0,0.08)',
                  transition: 'box-shadow 0.2s', display: 'flex', flexDirection: 'column',
                }}>
                <div style={{ height: '140px', overflow: 'hidden' }}>
                  <img src={card.img} alt={card.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={e => { (e.target as HTMLImageElement).src = '/images/yachten/Header_Yacht.jpg' }} />
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>{card.title}</h2>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem', flex: 1, marginBottom: '1rem' }}>
                    {card.specs.map(s => {
                      const ci = s.indexOf(':')
                      return (
                        <li key={s} style={{ fontSize: '0.76rem', color: '#555', lineHeight: 1.5 }}>
                          <strong style={{ color: 'var(--navy)' }}>{s.slice(0, ci + 1)}</strong>{s.slice(ci + 1)}
                        </li>
                      )
                    })}
                  </ul>
                  <span className="btn btn-primary" style={{ fontSize: '0.72rem', padding: '8px 14px', alignSelf: 'flex-start' }}>
                    {lang === 'en' ? 'Gallery & details' : 'Galerie & Details'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail der gewählten Kategorie */}
      <section id="yacht-detail" style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <AnimatePresence mode="wait">
            <motion.div key={cat.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>

              {/* Kopf */}
              <div className="yacht-head-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'center', marginBottom: '3rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: '0.15rem' }}>{cat.name}</h2>
                  {cat.sub && <p style={{ color: 'var(--blue)', fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>{cat.sub}</p>}
                  <p style={{ color: '#444', fontSize: '0.97rem', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{cat.intro}</p>
                </div>
                {cat.front && (
                  <figure>
                    <img src={cat.front.src} alt={cat.front.caption || cat.name} loading="lazy"
                      style={{ width: '100%', borderRadius: '6px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                    {cat.front.caption && <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.45rem', fontStyle: 'italic' }}>{cat.front.caption}</figcaption>}
                  </figure>
                )}
              </div>

              {/* Varianten (Original-Kategorielogik statt Einzelmodelle) */}
              {cat.variants.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>{lang === 'en' ? 'Types' : 'Varianten'}</h3>
                  <div className="yacht-variant-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(cat.variants.length, 4)}, 1fr)`, gap: '1.5rem', marginBottom: '3.5rem' }}>
                    {cat.variants.map(v => (
                      <div key={v.title} style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                        <h4 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--blue)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>{v.title}</h4>
                        {v.img && (
                          <figure style={{ marginBottom: '1rem' }}>
                            <img src={v.img} alt={v.caption || v.title} loading="lazy"
                              onClick={() => setLightbox(v.img)}
                              style={{ width: '100%', borderRadius: '4px', background: '#fff', cursor: 'zoom-in' }}
                              onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                            {v.caption && <figcaption style={{ color: 'var(--gray)', fontSize: '0.72rem', marginTop: '0.35rem' }}>{v.caption}</figcaption>}
                          </figure>
                        )}
                        <p style={{ color: 'var(--navy)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>{lang === 'en' ? 'Equipment' : 'Ausstattung'}</p>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          {v.ausstattung.map(a => (
                            <li key={a} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: '#555', fontSize: '0.8rem', lineHeight: 1.5 }}>
                              <span style={{ color: 'var(--blue)', flexShrink: 0 }}>✔</span> {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Eindrücke */}
              {cat.eindruecke.length > 0 && (
                <>
                  <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1.5rem' }}>{lang === 'en' ? 'Impressions' : 'Eindrücke'}</h3>
                  <div className="yacht-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '3.5rem' }}>
                    {cat.eindruecke.map(img => (
                      <div key={img} onClick={() => setLightbox(img)} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'zoom-in', borderRadius: '3px', background: '#eee' }}>
                        <img src={img} alt={cat.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Hersteller (dezent in s/w) */}
              {cat.logos.length > 0 && (
                <div style={{ borderTop: '1px solid var(--gray-mid)', paddingTop: '2rem', marginBottom: '2rem' }}>
                  <p style={{ color: 'var(--gray)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '1.25rem', textAlign: 'center' }}>
                    {lang === 'en' ? 'Our yacht builders' : 'Unsere Yachtbauer'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    {cat.logos.map(logo => (
                      <img key={logo} src={logo} alt="Yachtbauer" loading="lazy"
                        style={{ height: '40px', objectFit: 'contain', filter: 'grayscale(1) opacity(0.55)', transition: 'filter 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0) opacity(1)')}
                        onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(1) opacity(0.55)')}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs (wie Original) */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem' }}>
                <Link to={lang === 'en' ? '/en/holiday-planner' : '/urlaubsplaner'} className="btn btn-primary" style={{ fontSize: '0.85rem', padding: '13px 28px' }}>
                  {lang === 'en' ? 'Bespoke cruise — HOLIDAY PLANNER' : 'Individueller Törn — URLAUBSPLANER'}
                </Link>
                <Link to={lang === 'en' ? '/en/charter/yacht-charter' : '/charter'} className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '13px 28px' }}>
                  {lang === 'en' ? 'Yacht charter — GET A QUOTE' : 'Yacht-Charter — ANFRAGE STARTEN'}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
            <motion.img initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} src={lightbox} alt=""
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '3px' }} />
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1000px) { .yacht-card-grid { grid-template-columns: 1fr 1fr !important; } .yacht-variant-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 900px) { .yacht-head-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 600px) {
          .yacht-card-grid, .yacht-variant-grid { grid-template-columns: 1fr !important; }
          .yacht-gallery-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </div>
  )
}
