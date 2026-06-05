import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { MapPinIcon } from '../components/Icons'
import { packages } from '../components/Packages'
import { packagesEn } from '../data/packagesEn'
import { useLang, enPkgSlugs } from '../i18n'
import type { PriceBlock, Addon } from '../components/Packages'

const h2Style = { fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: 'clamp(1.3rem, 2.5vw, 1.7rem)', marginBottom: '1.25rem' } as const

// Sidebar-Bild + Partnerlogo pro Package (wie auf der Originalseite)
const KROATIEN_EXTRA = {
  img: '/images/packages/dalmatien/gallery/Kat-Bug.webp',
  alt: 'Sonnenuntergang am Segel-Katamaran',
  logo: '/images/partner/yacht-urlaub-partner-kroatien.jpg',
  logoAlt: 'Kroatien – Voller Leben',
}
const sidebarExtras: Record<string, { img: string; alt: string; logo: string; logoAlt: string }> = {
  dalmatien: KROATIEN_EXTRA,
  kornaten: KROATIEN_EXTRA,
  istrien: KROATIEN_EXTRA,
  'karibik-bvi': {
    img: '/images/packages/Karibik-BVI/gallery/Sandy Spit.jpg',
    alt: 'Sandy Spit – Britische Jungferninseln',
    logo: '/images/partner/bvi.jpg',
    logoAlt: "The British Virgin Islands – Nature's little secrets",
  },
}
const h3Style = { fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' } as const
const pStyle = { color: '#444', fontSize: '0.93rem', lineHeight: 1.75, whiteSpace: 'pre-line' } as const

function AddonCard({ addon }: { addon: Addon }) {
  const lang = useLang()
  const s = L[lang]
  return (
    <div style={{ background: '#fff', borderRadius: '6px', padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.07)', display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{addon.name}</h4>
      <p style={{ color: 'var(--blue)', fontFamily: 'DM Sans, sans-serif', fontSize: '1.45rem', fontWeight: 700, marginBottom: '0.15rem' }}>{s.plus} € {addon.price},-</p>
      <p style={{ color: 'var(--gray)', fontSize: '0.75rem', marginBottom: '0.85rem' }}>{s.pp}</p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', marginTop: 'auto' }}>
        {addon.details.map(d => (
          <li key={d} style={{ color: '#555', fontSize: '0.8rem', lineHeight: 1.45 }}>{d}</li>
        ))}
      </ul>
    </div>
  )
}

function PriceBlockSection({ block }: { block: PriceBlock }) {
  const lang = useLang()
  const s = L[lang]
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{ ...h2Style, marginBottom: '0.25rem' }}>{s.prices}</h2>
      {block.label && <p style={{ color: 'var(--gray)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '1.25rem' }}>{block.label}</p>}

      {/* Basis-Preis */}
      <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '6px', padding: '2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', marginTop: '1rem', marginBottom: '1rem' }}>
        <div>
          <p style={{ fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.8, marginBottom: '0.2rem' }}>{s.base}</p>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.6rem', fontWeight: 700, lineHeight: 1 }}>{s.from} € {block.base},-</p>
          <p style={{ fontSize: '0.85rem', opacity: 0.85, marginTop: '0.3rem' }}>{s.pp}*</p>
        </div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {block.baseIncludes.map(b => (
            <li key={b} style={{ fontSize: '0.9rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ color: '#7fc4ff' }}>✔</span> {b}
            </li>
          ))}
        </ul>
        <Link to={s.buchen} className="btn btn-gold" style={{ marginLeft: 'auto', fontSize: '0.85rem' }}>{lang === 'en' ? '▶ Book now!' : '▶ Jetzt buchen!'}</Link>
      </div>

      {block.notes.map(n => (
        <p key={n} style={{ color: 'var(--gray)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '0.35rem' }}>{n}</p>
      ))}

      {/* ZUSATZpakete */}
      {block.zusatz.length > 0 && (
        <>
          <p style={{ color: 'var(--navy)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', margin: '1.75rem 0 1rem' }}>
            {s.zusatz}
          </p>
          <div className="pkg-addon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {block.zusatz.map(a => <AddonCard key={a.name} addon={a} />)}
          </div>
        </>
      )}

      {/* PREMIUMpakete */}
      {block.premium.length > 0 && (
        <>
          <p style={{ color: 'var(--navy)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.06em', margin: '1.75rem 0 1rem' }}>
            {s.premium}
          </p>
          <div className="pkg-addon-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {block.premium.map(a => <AddonCard key={a.name} addon={a} />)}
          </div>
        </>
      )}
    </div>
  )
}

const L = {
  de: { included: 'inkludiert sind:', facts: 'Reise-Facts:', route: 'Die Route', detail: 'Ihre Reise im Detail',
    map: 'Routenkarte', maps: 'Routenkarten', impressions: 'Eindrücke', prices: 'Preise', base: 'Basis-Preis',
    pp: 'pro Person', from: 'ab', zusatz: 'Diese ZUSATZpakete sind optional bei Buchung wählbar',
    premium: 'Diese PREMIUMpakete sind optional bei Buchung wählbar', plus: 'zzgl.',
    hints: 'Generelle Hinweise', faqQ: '„Was kostet mich die gesamte Reise?" –', faqL: 'Verweis zu den FAQs »',
    book: '▶ JETZT BUCHEN!', dates: '▶ FREIE TERMINE & PREISE', indiv: 'Individueller Törn?',
    indivSub: 'Sie möchten lieber eine eigene Route, andere Termine oder ein individuelles Angebot?',
    start: 'ANFRAGE STARTEN', notFound: 'Package nicht gefunden', home: 'Zur Startseite',
    buchen: '/buchen', planer: '/urlaubsplaner', faq: '/faq' },
  en: { included: 'included:', facts: 'Facts:', route: 'The route', detail: 'Your journey details',
    map: 'Route map', maps: 'Route maps', impressions: 'Gallery', prices: 'Prices', base: 'Base price',
    pp: 'per person', from: 'from', zusatz: 'Following ADDITIONAL packages are available',
    premium: 'Following PREMIUM packages are available', plus: 'plus',
    hints: 'General information', faqQ: '"What does the whole trip cost?" –', faqL: 'see our FAQs »',
    book: '▶ BOOK NOW!', dates: '▶ CHECK PRICE & AVAILABILITY', indiv: 'Bespoke cruise?',
    indivSub: 'Prefer your own route, different dates or an individual quote?',
    start: 'GET A QUOTE', notFound: 'Package not found', home: 'Back to homepage',
    buchen: '/en/book-now', planer: '/en/holiday-planner', faq: '/en/faq' },
}

export default function PackageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const lang = useLang()
  const s = L[lang]
  const list = lang === 'en' ? packagesEn : packages
  const pid = lang === 'en' ? (enPkgSlugs[id ?? ''] ?? id) : id
  const pkg = list.find(p => p.id === pid)
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (!pkg) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--navy)' }}>{s.notFound}</h1>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem', display: 'inline-block' }}>{s.home}</Link>
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
          src={pkg.heroImg}
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
              <MapPinIcon size={12} style={{ verticalAlign: '-2px', marginRight: '4px' }} />{pkg.country}
            </span>
          </div>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 4vw, 2.8rem)', color: '#fff', marginBottom: '0' }}>
            {pkg.title}
          </h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ padding: '4rem 20px' }}>
        {pkg.heroIntro && (
          <p style={{ ...pStyle, fontSize: '1.02rem', marginBottom: '2.5rem', maxWidth: '860px' }}>{pkg.heroIntro}</p>
        )}

        <div className="pkg-main-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '4rem', marginBottom: '4rem' }}>

          {/* Left */}
          <div>
            <p style={{ color: '#555', fontSize: '1rem', lineHeight: 1.8, marginBottom: '2.5rem' }}>{pkg.subtitle}</p>

            {/* Inkludiert */}
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', fontStyle: 'italic', marginBottom: '1rem' }}>{s.included}</h2>
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
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', fontStyle: 'italic', marginBottom: '1rem' }}>{s.facts}</h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {pkg.facts.map(fact => (
                  <li key={fact} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>✔</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <Link to={s.buchen} className="btn btn-primary" style={{ fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              {s.book}
            </Link>
          </div>

          {/* Right: Price badge + Route */}
          <div>
            {(() => {
              const extra = sidebarExtras[pkg.id]
              if (extra) {
                return (
                  <div style={{ marginBottom: '1.5rem' }}>
                    {/* Bild mit überlappender Preis-Bubble (wie Original) */}
                    <div style={{ position: 'relative', paddingTop: '2.25rem', paddingLeft: '2.25rem' }}>
                      <img
                        src={extra.img}
                        alt={extra.alt}
                        loading="lazy"
                        style={{ width: '100%', borderRadius: '12px', display: 'block', boxShadow: '0 6px 24px rgba(7,27,47,0.18)' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                      <div style={{
                        position: 'absolute', top: 0, left: 0,
                        width: '118px', height: '118px', borderRadius: '50%',
                        background: 'var(--blue)', color: '#fff',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 6px 20px rgba(2,132,199,0.4)', textAlign: 'center', lineHeight: 1.15,
                      }}>
                        <span style={{ fontSize: '0.72rem', opacity: 0.9 }}>{s.from}</span>
                        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.55rem', fontWeight: 700 }}>€ {pkg.price},-</span>
                        <span style={{ fontSize: '0.7rem', opacity: 0.9 }}>{s.pp}</span>
                      </div>
                    </div>
                    {/* Partnerlogo */}
                    <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                      <img
                        src={extra.logo}
                        alt={extra.logoAlt}
                        title={extra.logoAlt}
                        loading="lazy"
                        style={{ maxWidth: '70%', maxHeight: '120px', objectFit: 'contain' }}
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    </div>
                  </div>
                )
              }
              return (
                <div style={{
                  background: 'var(--blue)', color: '#fff', borderRadius: '6px',
                  padding: '2rem', textAlign: 'center', marginBottom: '1.5rem',
                }}>
                  <p style={{ fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', opacity: 0.85 }}>{s.from}</p>
                  <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '3rem', fontWeight: 700, lineHeight: 1, marginBottom: '0.3rem' }}>
                    € {pkg.price},-
                  </p>
                  <p style={{ fontSize: '0.85rem', opacity: 0.85 }}>{s.pp}{pkg.priceNote ? ` (${pkg.priceNote})` : ''}</p>
                </div>
              )
            })()}

            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {s.detail}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600, fontStyle: 'italic', marginBottom: '0.4rem' }}>{s.route}</p>
              <p style={{ fontSize: '0.85rem', color: '#444', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{pkg.route}</p>
            </div>
          </div>
        </div>

        {/* Routenkarten */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={h2Style}>{pkg.routeMaps.length > 1 ? s.maps : s.map}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {pkg.routeMaps.map(map => (
              <figure key={map.src}>
                <img
                  src={map.src}
                  alt={map.caption}
                  loading="lazy"
                  style={{ maxWidth: '100%', borderRadius: '4px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                {pkg.routeMaps.length > 1 && (
                  <figcaption style={{ color: 'var(--gray)', fontSize: '0.8rem', marginTop: '0.5rem' }}>{map.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>

        {/* {s.detail} */}
        <div style={{ marginBottom: '4rem', maxWidth: '860px' }}>
          <h2 style={h2Style}>{s.detail}</h2>
          {pkg.detailSections.map((section, si) => (
            <div key={si} style={{ marginBottom: '2.5rem' }}>
              {section.heading && (
                <h3 style={{ ...h3Style, fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--blue)', marginBottom: '0.75rem' }}>{section.heading}</h3>
              )}
              {section.intro && <p style={{ ...pStyle, marginBottom: '1.5rem' }}>{section.intro}</p>}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {section.stops.map(stop => (
                  <div key={stop.name}>
                    <h4 style={h3Style}>{stop.name}</h4>
                    <p style={pStyle}>{stop.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Link to={s.buchen} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>{s.dates}</Link>
        </div>

        {/* Unterkunft */}
        {pkg.accommodations.map(acc => (
          <div key={acc.title} style={{ marginBottom: '4rem' }}>
            <h2 style={h2Style}>{acc.title}</h2>
            <div style={{ maxWidth: '860px' }}>
              {acc.paragraphs.map(p => (
                <p key={p} style={{ ...pStyle, marginBottom: '1rem' }}>{p}</p>
              ))}
            </div>
            {acc.layouts.length > 0 && (
              <div className="pkg-layout-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(acc.layouts.length, 4)}, 1fr)`, gap: '1.25rem', margin: '1.5rem 0' }}>
                {acc.layouts.map(l => (
                  <figure key={l.src} style={{ background: '#fff', borderRadius: '6px', padding: '0.75rem', boxShadow: '0 2px 10px rgba(0,0,0,0.07)' }}>
                    <img src={l.src} alt={l.caption} loading="lazy" style={{ width: '100%', borderRadius: '3px' }}
                      onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
                    <figcaption style={{ color: 'var(--gray)', fontSize: '0.75rem', marginTop: '0.5rem', lineHeight: 1.4 }}>{l.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {acc.link && (
              <Link to={acc.link.to} className="btn btn-ghost" style={{ fontSize: '0.8rem', marginTop: '0.5rem', display: 'inline-block' }}>
                {acc.link.label} →
              </Link>
            )}
          </div>
        ))}

        {/* Anreise */}
        <div style={{ marginBottom: '4rem', maxWidth: '860px' }}>
          <h2 style={h2Style}>{pkg.arrival.heading}</h2>
          {pkg.arrival.paragraphs.map(p => (
            <p key={p} style={{ ...pStyle, marginBottom: '0.65rem' }}>{p}</p>
          ))}
        </div>

        {/* Generelle Hinweise */}
        <div style={{ marginBottom: '4rem', maxWidth: '860px', background: 'var(--gray-light)', borderRadius: '6px', padding: '2rem' }}>
          <h2 style={{ ...h2Style, fontSize: '1.2rem' }}>{s.hints}</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {pkg.hints.map(hint => (
              <li key={hint} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.87rem', lineHeight: 1.6 }}>
                <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>•</span>
                {hint}
              </li>
            ))}
            <li style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: '#444', fontSize: '0.87rem', lineHeight: 1.6 }}>
              <span style={{ color: 'var(--blue)', marginTop: '2px', flexShrink: 0 }}>•</span>
              <span>
                {s.faqQ} <Link to={s.faq} style={{ color: 'var(--blue)', fontWeight: 600 }}>{s.faqL}</Link>
              </span>
            </li>
          </ul>
        </div>

        {/* Eindrücke (Galerie) */}
        <h2 style={h2Style}>{s.impressions}</h2>
        <div className="pkg-gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '4rem' }}>
          {pkg.gallery.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setLightbox(i)}
              style={{
                aspectRatio: '4/3',
                overflow: 'hidden', cursor: 'pointer', borderRadius: '6px', background: '#eee',
              }}
            >
              <img
                src={img.src} alt={img.alt} loading="lazy" title={img.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }}
              />
            </motion.div>
          ))}
        </div>

        {/* Preise */}
        {pkg.priceBlocks.map((block, i) => (
          <PriceBlockSection key={i} block={block} />
        ))}

        {/* CTA */}
        <div style={{ textAlign: 'center', background: 'var(--gray-light)', borderRadius: '6px', padding: '3rem 2rem' }}>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            Individueller Törn?
          </h2>
          <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {s.indivSub}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to={s.planer} className="btn btn-ghost" style={{ fontSize: '0.9rem', padding: '14px 32px' }}>
              ANFRAGE STARTEN
            </Link>
            <Link to={s.buchen} className="btn btn-primary" style={{ fontSize: '0.9rem', padding: '14px 32px' }}>
              {s.dates}
            </Link>
          </div>
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
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', zIndex: 1 }}>‹</button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
              src={pkg.gallery[lightbox].src} alt={pkg.gallery[lightbox].alt}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: '2px' }}
            />
            <button onClick={e => { e.stopPropagation(); setLightbox(i => (i! + 1) % pkg.gallery.length) }}
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', zIndex: 1 }}>›</button>
            <button onClick={() => setLightbox(null)}
              style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
            <p style={{ position: 'absolute', bottom: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textAlign: 'center', width: '100%' }}>
              {pkg.gallery[lightbox].alt} &nbsp;·&nbsp; {lightbox + 1} / {pkg.gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .pkg-main-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .pkg-addon-grid { grid-template-columns: 1fr 1fr !important; }
          .pkg-layout-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .pkg-gallery-grid { grid-template-columns: 1fr 1fr !important; }
          .pkg-addon-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
