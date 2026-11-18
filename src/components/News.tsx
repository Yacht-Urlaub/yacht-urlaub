import { useLang } from '../i18n'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from '../router'
import { bfActive, bfText } from '../blackFriday'

type Offer = {
  img?: string
  visual?: 'bf'
  tag: string
  title: string
  text: string
  cta?: string
  href?: string
}

// Das Event "Sail into the Seasons – Vienna Edition"
// richtet sich nur an den deutschsprachigen Markt (Event in Wien) — deshalb
// nur in offersDe, kein Pendant in offersEn. Es fand am 14.11.2026 statt;
// die Karte ist jetzt ein Dankeschoen ohne Anmelde-Link (cta/href optional).
const offersEn: Offer[] = [
  {
    img: '/images/news/charter-modelle-2027.webp',
    tag: 'New 2027',
    title: 'SAILING ON YOUR SCHEDULE: NEW START DAYS FOR 2027',
    text: 'Alongside the classic Saturday charter, now also Wednesday starts and extended 10-day cruises. More weekends at sea, less hustle in the marina.',
    cta: 'Learn more',
    href: '/en/news/charter-models-2027',
  },
]

const offersDe: Offer[] = [
  {
    img: '/images/events/sail-into-the-seasons-2026/praesentation.webp',
    tag: 'Rückblick',
    title: 'SAIL INTO THE SEASONS – VIENNA EDITION',
    text: 'Vielen Dank an alle, die am 14. November in Wien mit uns Segelfeeling erlebt haben – und an Rumzentrum.at für die Rum-Verkostung! Die Fotos vom Event folgen in Kürze.',
  },
  {
    img: '/images/news/charter-modelle-2027.webp',
    tag: 'Neu 2027',
    title: 'SEGELN, WANN ES IHNEN PASST: NEUE STARTTAGE 2027',
    text: 'Neben dem klassischen Samstags-Charter jetzt auch Start am Mittwoch und verlängerte Törns mit 10 Tagen. Mehr Wochenende auf See, weniger Trubel in der Marina.',
    cta: 'Mehr erfahren',
    href: '/news/charter-modelle-2027',
  },
]

export default function News() {
  const lang = useLang()
  const t = bfText[lang]
  // Black-Friday-Karte ganz links, bis zum Ablauf der Aktion (27.11.2026)
  const bfCard: Offer = { visual: 'bf', tag: t.newsTag, title: t.newsTitle, text: t.newsText, cta: t.newsCta, href: t.pkHref }
  const base = lang === 'en' ? offersEn : offersDe
  const offers = bfActive() ? [bfCard, ...base] : base
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="news" className="section" style={{ background: '#fff' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
              {lang === 'en' ? 'Latest' : 'Aktuelles'}
            </p>
            <h2 className="section-title">{lang === 'en' ? 'News & offers' : 'Top-News & Angebote'}</h2>
          </div>
          <Link to="/news" style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{lang === 'en' ? 'All offers →' : 'Alle Angebote →'}</Link>
        </motion.div>

        <div className="news-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(offers.length, 3)}, 1fr)`, gap: '2rem' }}>
          {offers.map((o, i) => {
            const external = !!o.href && o.href.startsWith('http')
            return (
            <motion.article
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              style={{
                background: '#fff',
                borderRadius: '4px',
                overflow: 'hidden',
                boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
                border: '1px solid #eee',
                display: 'flex', flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
                {o.visual === 'bf' ? (
                  <div aria-hidden="true" className="bf-visual">
                    <svg viewBox="0 0 600 120" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '38%' }}>
                      <path d="M0 70 Q75 40 150 70 T300 70 T450 70 T600 70 V120 H0Z" fill="#77B7E5" opacity=".10" />
                      <path d="M0 85 Q75 60 150 85 T300 85 T450 85 T600 85 V120 H0Z" fill="#3061AC" opacity=".35" />
                    </svg>
                    <img src="/images/events/black-friday-2026/segel.webp" alt="" width={72} height={152} loading="lazy" decoding="async"
                      style={{ position: 'absolute', right: '9%', bottom: '14%', height: '46%', width: 'auto', filter: 'drop-shadow(0 0 18px rgba(119,183,229,.35))' }} />
                    <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', color: '#fff' }}>
                      <div style={{ fontSize: 'clamp(1.6rem, 4.2vw, 2.4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '0.02em' }}>BLACK<br />FRIDAY</div>
                      <div style={{ marginTop: '0.55rem', color: '#77B7E5', fontWeight: 800, fontSize: 'clamp(1.2rem, 3vw, 1.7rem)' }}>{t.off}</div>
                    </div>
                  </div>
                ) : (
                <img
                  src={o.img}
                  alt={o.title}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
                />
                )}
                <span style={{
                  position: 'absolute', top: '1rem', left: '1rem',
                  background: 'var(--blue)', color: '#fff',
                  padding: '3px 10px', fontSize: '0.65rem', fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '2px',
                }}>
                  {o.tag}
                </span>
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                  {o.title}
                </h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: o.href ? '1.25rem' : 0 }}>{o.text}</p>
                {o.href && o.cta && (external ? (
                  <a href={o.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{o.cta} →</a>
                ) : (
                  <Link to={o.href} style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{o.cta} →</Link>
                ))}
              </div>
            </motion.article>
          )})}
        </div>
      </div>

      <style>{`
        .bf-visual { position: absolute; inset: 0; background: radial-gradient(circle at 85% 20%, #173564 0, #0a1424 50%, #04080f 100%); font-family: 'DM Sans', sans-serif; }
        @media (max-width: 900px) {
          .news-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
