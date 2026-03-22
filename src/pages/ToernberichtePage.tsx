import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const berichte = [
  {
    id: 'istrien-2020',
    title: 'Istrien 2020 — Sonne, Meer & Trüffel',
    destination: 'Kroatien · Istrien',
    date: 'August 2020',
    teaser: 'Acht Tage durch die unberührten Buchten Istriens — von Pula bis Rovinj. Ein Törn voller kulinarischer Entdeckungen und versteckter Ankerplätze.',
    headerImg: '/images/Berichte/Istrien2020/Foto1.jpg',
    gallery: Array.from({ length: 13 }, (_, i) => `/images/Berichte/Istrien2020/Foto${i + 1}.jpg`),
    content: `Istrien im August — das bedeutet türkisblaues Wasser, Olivenöl, Trüffel und unvergessliche Sonnenuntergänge über dem Adriatischen Meer. Unser Törn startete im Hafen von Pula, einer Stadt, die mit ihrem beeindruckenden römischen Amphitheater Weltgeschichte atmet.

Die erste Nacht verbrachten wir in der ruhigen Bucht von Medulin, wo wir die Yacht eingerichtet und den Sonnenuntergang mit einem Glas lokalem Malvazija genossen haben.

Tag zwei führte uns nach Rovinj — zweifellos eine der schönsten Städte Kroatiens. Die pastellfarbenen Häuser, die engen Gassen und der Kirchturm von Sv. Eufemija sind ein Anblick, den man nie vergisst. Wir schlenderten durch die Altstadt und fanden eine versteckte Taverna, in der wir frischen Fisch mit Trüffelöl probierten.

Den Höhepunkt bildete der Besuch des Nationalparks Brijuni — eine Inselgruppe mit reicher Geschichte, die einst Tito's Sommerresidenz war.`,
  },
  {
    id: 'bvi-2019',
    title: 'Karibik-BVI — Inselhüpfen im Paradies',
    destination: 'Karibik · Britische Jungferninseln',
    date: 'Januar 2019',
    teaser: 'Zwei Wochen in den BVIs — von Tortola bis Anegada. Konstante Passatwinde, kristallklares Wasser und die legendäre Soggy Dollar Bar.',
    headerImg: '/images/Berichte/BVI Play.jpg',
    gallery: ['/images/Berichte/BVI Play.jpg', '/images/Berichte/ImmonialBVI.webp'],
    content: `Die Britischen Jungferninseln im Januar — perfektes Segeln mit 15-20 Knoten Passatwind, Sonnenschein und Temperaturen um 28°C. Was will man mehr?

Unser Törn startete auf Tortola, wo wir unsere Lagoon 43 übernahmen. Das erste Ziel war The Baths auf Virgin Gorda — bizarre Granitfelsen, zwischen denen man in Grotten und Pools schnorcheln kann. Ein absolutes Highlight.

Jost Van Dyke und die legendäre Soggy Dollar Bar: Man ankert vor der Insel und schwimmt ans Ufer — deshalb zahlt man mit durchnässten Dollarscheinen. Der Painkiller-Cocktail ist Pflicht.

Anegada, die flachste Insel der BVIs, war unser Fernziel. Das Riff davor hat schon Hunderte Schiffe verspeist — wir navigierten vorsichtig durch die Kanäle und wurden mit dem besten Hummer der Karibik belohnt.`,
  },
]

type Bericht = typeof berichte[0]

function BerichtDetail({ b, onBack }: { b: Bericht; onBack: () => void }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: '480px', overflow: 'hidden' }}>
        <img src={b.headerImg} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/Sail-Away.jpg' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,35,56,0.3) 0%, rgba(15,35,56,0.75) 100%)' }} />
        <div className="container" style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '3rem' }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', cursor: 'pointer', padding: 0, marginBottom: '1rem', textAlign: 'left', fontFamily: 'Open Sans, sans-serif' }}>
            ← Alle Törnberichte
          </button>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{b.destination} · {b.date}</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>{b.title}</h1>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '4rem' }}>
          <div>
            <p style={{ fontSize: '1.1rem', color: 'var(--gray)', fontStyle: 'italic', lineHeight: 1.8, marginBottom: '2rem', borderLeft: '3px solid var(--blue)', paddingLeft: '1.25rem' }}>
              {b.teaser}
            </p>
            {b.content.split('\n\n').map((para, i) => (
              <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.9, color: 'var(--text)', marginBottom: '1.25rem' }}>{para}</p>
            ))}

            {/* Gallery */}
            {b.gallery.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '1rem' }}>Fotos</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {b.gallery.map((img, i) => (
                    <div key={img} onClick={() => setLightbox(i)} style={{ aspectRatio: '4/3', overflow: 'hidden', cursor: 'pointer', borderRadius: '3px', background: '#eee' }}>
                      <img src={img} alt="" loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                        onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '1.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1rem', marginBottom: '1.25rem' }}>Törn-Details</h3>
              {[
                { label: '📍 Destination', val: b.destination },
                { label: '📅 Zeitraum', val: b.date },
              ].map(s => (
                <div key={s.label} style={{ marginBottom: '0.75rem' }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{s.label}</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--navy)', fontWeight: 600 }}>{s.val}</p>
                </div>
              ))}
            </div>
            <a href="/#kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Ähnlichen Törn anfragen →
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button onClick={e => { e.stopPropagation(); setLightbox(i => Math.max(0, i! - 1)) }}
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>‹</button>
            <motion.img key={lightbox} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              src={b.gallery[lightbox]} alt="" onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain' }} />
            <button onClick={e => { e.stopPropagation(); setLightbox(i => Math.min(b.gallery.length - 1, i! + 1)) }}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px' }}>›</button>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function ToernberichtePage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [selected, setSelected] = useState<Bericht | null>(null)

  return (
    <main style={{ paddingTop: '72px' }}>
      <AnimatePresence mode="wait">
        {selected ? (
          <BerichtDetail key={selected.id} b={selected} onBack={() => { setSelected(null); window.scrollTo(0, 0) }} />
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Header */}
            <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
              <div className="container">
                <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Erfahrungsberichte</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>Törnberichte</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.8 }}>
                  Authentische Reiseberichte direkt von unseren Törns — persönlich, ehrlich und voller Inspiration für Ihre nächste Segelreise.
                </p>
              </div>
            </div>

            {/* Grid */}
            <section className="section" style={{ background: 'var(--gray-light)' }}>
              <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '2rem' }}>
                  {berichte.map((b, i) => (
                    <motion.article
                      key={b.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 }}
                      onClick={() => { setSelected(b); window.scrollTo(0, 0) }}
                      className="card-hover"
                      style={{ background: '#fff', borderRadius: '4px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}
                    >
                      <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                        <img src={b.headerImg} alt={b.title} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                          onError={e => { (e.target as HTMLImageElement).src = '/images/Sail-Away.jpg' }}
                        />
                      </div>
                      <div style={{ padding: '1.75rem' }}>
                        <p style={{ color: 'var(--blue)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{b.destination} · {b.date}</p>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>{b.title}</h2>
                        <p style={{ color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{b.teaser}</p>
                        <span style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>Bericht lesen →</span>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
