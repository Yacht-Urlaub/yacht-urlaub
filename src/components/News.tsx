import { useLang } from '../i18n'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from '../router'

// Das Event "Sail into the Seasons – Vienna Edition" (siehe EventPopup.tsx)
// richtet sich nur an den deutschsprachigen Markt (Event in Wien) — deshalb
// nur in offersDe, kein Pendant in offersEn.
const offersEn = [
  {
    img: '/images/news/charter-modelle-2027.webp',
    tag: 'New 2027',
    title: 'SAILING ON YOUR SCHEDULE: NEW START DAYS FOR 2027',
    text: 'Alongside the classic Saturday charter, now also Wednesday starts and extended 10-day cruises. More weekends at sea, less hustle in the marina.',
    cta: 'Learn more',
    href: '/en/news/charter-models-2027',
  },
  {
    img: '/images/news/beach-bikini-jump.jpg',
    tag: 'Cabins',
    title: 'CABIN OFFERS',
    text: 'Discover exclusive cabin offers for your dream yacht holiday – individual and unforgettable!',
    cta: 'View offers',
    href: '/en/cabin-offers',
  },
]

const offersDe = [
  {
    img: '/images/events/sail-into-the-seasons-2026/event-hochformat.webp',
    imgZoom: 'auto 270%',
    imgPosition: 'center bottom',
    tag: 'Event',
    title: 'SAIL INTO THE SEASONS – VIENNA EDITION',
    text: 'Segelfeeling mitten in Wien: 14. November 2026, Einlass 13:30 Uhr. Mit Tombola und Rum-Verkostung von Rumzentrum.at. Teilnahme gratis, Anmeldung bis 7.11.2026 erforderlich.',
    cta: 'Jetzt anmelden',
    href: 'https://form.jotform.com/262641756081055',
  },
  {
    img: '/images/news/charter-modelle-2027.webp',
    tag: 'Neu 2027',
    title: 'SEGELN, WANN ES IHNEN PASST: NEUE STARTTAGE 2027',
    text: 'Neben dem klassischen Samstags-Charter jetzt auch Start am Mittwoch und verlängerte Törns mit 10 Tagen. Mehr Wochenende auf See, weniger Trubel in der Marina.',
    cta: 'Mehr erfahren',
    href: '/news/charter-modelle-2027',
  },
  {
    img: '/images/news/beach-bikini-jump.jpg',
    tag: 'Kabinen',
    title: 'KABINEN-ANGEBOTE',
    text: 'Entdecken Sie exklusive Kabinenangebote für Ihren Traum-Yachturlaub – individuell und unvergesslich! Jetzt stöbern & buchen!',
    cta: 'Angebote ansehen',
    href: '/kabinen',
  },
]

export default function News() {
  const lang = useLang()
  const offers = lang === 'en' ? offersEn : offersDe
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
            const external = o.href.startsWith('http')
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
              <div
                role="img" aria-label={o.title}
                style={{
                  position: 'relative', aspectRatio: '16/10', overflow: 'hidden',
                  backgroundImage: `url(${o.img})`,
                  backgroundSize: o.imgZoom ?? 'cover',
                  backgroundPosition: o.imgPosition ?? 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
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
                <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.75, flex: 1, marginBottom: '1.25rem' }}>{o.text}</p>
                {external ? (
                  <a href={o.href} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{o.cta} →</a>
                ) : (
                  <Link to={o.href} style={{ color: 'var(--blue)', fontSize: '0.82rem', fontWeight: 600 }}>{o.cta} →</Link>
                )}
              </div>
            </motion.article>
          )})}
        </div>
      </div>

      <style>{`
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
