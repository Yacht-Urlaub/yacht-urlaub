import { motion } from 'framer-motion'
import { Link } from '../router'
import { useLang } from '../i18n'

// Sektions-Teaser wie auf der Originalseite: 4 runde Verlinkungen
const teasersEn = [
  { id: 'crew', heading: 'Crew', img: '/images/teaser/crew.png', title: 'Manuel Göschl', text: 'and his team', href: '/en/contact/crew' },
  { id: 'destinationen', heading: 'Destinations', img: '/images/teaser/destinationen.jpg', title: 'Our destinations', text: 'Learn more about Croatia, Greece and other sailing areas..', href: '/en/destinations' },
  { id: 'yachten', heading: 'Yachts', img: '/images/teaser/yachten.jpg', title: 'Our yacht categories', text: 'Learn more about sailing monohulls, sailing catamarans, motor yachts, power catamarans ...', href: '/en/yachts' },
]

const teasersDe = [
  {
    id: 'crew',
    heading: 'Crew',
    img: '/images/teaser/crew.png',
    title: 'Manuel Göschl',
    text: 'und sein Team',
    href: '/crew',
  },
  {
    id: 'destinationen',
    heading: 'Destinationen',
    img: '/images/teaser/destinationen.jpg',
    title: 'Unsere Destinationen',
    text: 'Erfahren Sie mehr über Kroatien, Griechenland und andere Reviere..',
    href: '/destinationen',
  },
  {
    id: 'yachten',
    heading: 'Yachten',
    img: '/images/teaser/yachten.jpg',
    title: 'Unsere Yacht-Kategorien',
    text: 'Erfahren Sie mehr über Einrumpf-Segler, Katamaran-Segler, Motoryachten, Motor-Katamaran ...',
    href: '/yachten',
  },
  {
    id: 'toernberichte',
    heading: 'Törnberichte',
    img: '/images/teaser/toernberichte.jpg',
    title: 'Lesen Sie mehr ...',
    text: 'Berichte unserer Mitreisenden, Charter-Gäste oder Skipper',
    href: '/toernberichte',
  },
]

export default function SektionTeaser() {
  const lang = useLang()
  const teasers = lang === 'en' ? teasersEn : teasersDe
  return (
    <section className="section" style={{ background: 'var(--gray-light)' }}>
      <div className="container">
        <div className="teaser-circle-grid" style={{ ['--cols']: teasers.length } as React.CSSProperties}>
          {teasers.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ textAlign: 'center' }}
            >
              <Link to={t.href} className="teaser-circle-link">
                <h2 className="teaser-circle-heading">{t.heading}</h2>
                <span className="teaser-circle-img">
                  <img src={t.img} alt={t.title} loading="lazy"
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                </span>
                <span className="teaser-circle-title">{t.title}</span>
                <span className="teaser-circle-text">{t.text}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .teaser-circle-grid {
          display: grid;
          grid-template-columns: repeat(var(--cols, 4), minmax(0, 260px));
          gap: 2.5rem;
          justify-content: center;
        }
        .teaser-circle-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          gap: 0;
        }
        .teaser-circle-heading {
          font-family: 'DM Sans', sans-serif;
          font-size: clamp(1.1rem, 1.8vw, 1.45rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--blue);
          margin-bottom: 1.75rem;
          transition: color 0.2s;
        }
        .teaser-circle-img {
          width: clamp(160px, 16vw, 220px);
          height: clamp(160px, 16vw, 220px);
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid #fff;
          box-shadow: 0 8px 30px rgba(7, 27, 47, 0.18);
          margin-bottom: 1.5rem;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.3s ease;
        }
        .teaser-circle-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .teaser-circle-link:hover .teaser-circle-img {
          transform: translateY(-6px);
          border-color: var(--blue);
          box-shadow: 0 16px 40px rgba(2, 132, 199, 0.28);
        }
        .teaser-circle-link:hover .teaser-circle-img img { transform: scale(1.08); }
        .teaser-circle-link:hover .teaser-circle-heading { color: var(--navy); }
        .teaser-circle-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: var(--blue);
          margin-bottom: 0.4rem;
        }
        .teaser-circle-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-style: italic;
          color: var(--gray);
          line-height: 1.6;
          max-width: 260px;
        }
        @media (max-width: 900px) {
          .teaser-circle-grid { grid-template-columns: 1fr 1fr; gap: 2.5rem 1.5rem; }
        }
        @media (max-width: 520px) {
          .teaser-circle-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  )
}
