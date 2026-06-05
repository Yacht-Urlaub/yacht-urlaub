import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { destinations } from './DestinationDetail'
import { destinationsEn } from '../data/destinationenEn'
import { useLang, enDestSlugs } from '../i18n'

const enDestPath: Record<string, string> = Object.fromEntries(Object.entries(enDestSlugs).map(([slug, id]) => [id, slug]))

// Einheitliches Raster: alle 8 Destinationen, beste Bilder
const grid = [
  { id: 'kroatien', img: '/images/Destinationsbilder/blick-auf-den-hafen-von-hvar-bei-yacht-urlaub.png' },
  { id: 'griechenland', img: '/images/packages/Griechenland/gallery/Navajo Bucht - Griechenland.jpg' },
  { id: 'balearen', img: '/images/Destinationsbilder/blick-auf-palma-de-mallorca.jpg' },
  { id: 'kanaren', img: '/images/destinationen/kanaren/header_M71_7842_.jpg' },
  { id: 'karibik-bvi', img: '/images/packages/Karibik-BVI/gallery/Sandy Cay.jpg' },
  { id: 'karibik-windward-islands', img: '/images/Destinationsbilder/grenadinen-und-st-vincent.jpg' },
  { id: 'thailand', img: '/images/Destinationsbilder/schnorcheln-in-thailand.jpg' },
  { id: 'seychellen', img: '/images/Destinationsbilder/Seychellen.webp' },
]

export default function DestinationenOverview({ standalone = false }: { standalone?: boolean }) {
  const navigate = useNavigate()
  const lang = useLang()
  const list = lang === 'en' ? destinationsEn : destinations
  const destHref = (id: string) => lang === 'en' ? `/en/destinations/${enDestPath[id] ?? id}` : `/destinationen/${id}`

  return (
    <section id="destinationen" style={{ background: 'var(--navy)', padding: standalone ? '80px 0' : '80px 0' }}>
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
            {lang === 'en' ? 'From the Croatian coast to the paradise of the Seychelles — click a destination for all details.' : 'Von der kroatischen Küste bis zu den paradiesischen Seychellen — klicken Sie auf eine Destination für alle Details.'}
          </p>
        </motion.div>

        {/* Einheitliches Raster */}
        <div className="dest-grid">
          {grid.map((item, i) => {
            const d = list.find(x => x.id === item.id)
            if (!d) return null
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                onClick={() => navigate(destHref(item.id))}
                className="dest-card"
                aria-label={`Destination ${d.name}`}
              >
                <img
                  src={item.img} alt={d.name} loading="lazy"
                  onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
                />
                <span className="dest-card-shade" aria-hidden />
                <span className="dest-card-season">{d.country} {d.bestTime}</span>
                <span className="dest-card-bottom">
                  <span className="dest-card-name">{d.name}</span>
                  <span className="dest-card-cta">{lang === 'en' ? 'Learn more' : 'Mehr erfahren'} <span className="dest-card-arrow">→</span></span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <style>{`
        .dest-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        .dest-card {
          position: relative;
          display: block;
          aspect-ratio: 3 / 4;
          border: none;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          padding: 0;
          background: rgba(255,255,255,0.04);
          box-shadow: 0 6px 24px rgba(0,0,0,0.25);
          outline-offset: 3px;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
        }
        .dest-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .dest-card img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dest-card:hover img { transform: scale(1.07); }
        .dest-card-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(10,24,38,0.92) 0%, rgba(10,24,38,0.25) 45%, rgba(10,24,38,0.08) 70%, transparent 100%);
          transition: background 0.3s ease;
        }
        .dest-card:hover .dest-card-shade {
          background: linear-gradient(to top, rgba(10,24,38,0.95) 0%, rgba(10,24,38,0.4) 55%, rgba(10,24,38,0.12) 80%, transparent 100%);
        }
        .dest-card-season {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(10,24,38,0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.9);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          padding: 5px 11px;
          border-radius: 20px;
          white-space: nowrap;
        }
        .dest-card-bottom {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 1.1rem 1.2rem;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          text-align: left;
        }
        .dest-card-name {
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 1.18rem;
          font-weight: 700;
          line-height: 1.25;
          text-shadow: 0 2px 12px rgba(0,0,0,0.4);
        }
        .dest-card-cta {
          color: var(--blue-light, #7fc4ff);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.25s ease, transform 0.3s ease;
        }
        .dest-card:hover .dest-card-cta { opacity: 1; transform: translateY(0); }
        .dest-card-arrow { display: inline-block; transition: transform 0.25s ease; }
        .dest-card:hover .dest-card-arrow { transform: translateX(4px); }

        @media (max-width: 1000px) {
          .dest-grid { grid-template-columns: repeat(2, 1fr); }
          .dest-card { aspect-ratio: 4 / 3; }
          .dest-card-cta { opacity: 1; transform: none; }
        }
        @media (max-width: 520px) {
          .dest-grid { grid-template-columns: 1fr; gap: 12px; }
          .dest-card { aspect-ratio: 16 / 10; }
        }
      `}</style>
    </section>
  )
}
