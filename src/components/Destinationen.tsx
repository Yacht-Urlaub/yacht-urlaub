import { motion } from 'framer-motion'

const destinations = [
  { name: 'Kroatien', sub: 'Dalmatien · Kornaten · Istrien', img: '/images/Destinationsbilder/kroatien-dalmatien.jpg', href: '#kroatien' },
  { name: 'Griechenland', sub: 'Ionisches Meer · Ägäis', img: '/images/Destinationsbilder/griechenland-jonici.jpg', href: '#griechenland' },
  { name: 'Balearen', sub: 'Mallorca · Ibiza · Menorca', img: '/images/Destinationsbilder/balearen-palma-mallorca.jpg', href: '#balearen' },
  { name: 'Kanaren', sub: 'Gran Canaria · Lanzarote', img: '/images/Destinationsbilder/kanaren-atlantis.jpg', href: '#kanaren' },
  { name: 'Karibik-BVI', sub: 'Britische Jungferninseln', img: '/images/Destinationsbilder/karibik-bvi.jpg', href: '#karibik' },
  { name: 'Windward Islands', sub: 'Grenadinen · St. Lucia', img: '/images/Destinationsbilder/karibik-windward-islands.jpg', href: '#windward' },
  { name: 'Thailand', sub: 'Phuket · Phi Phi · Similan', img: '/images/Destinationsbilder/thailand-header.jpg', href: '#thailand' },
  { name: 'Seychellen', sub: 'Mahé · Praslin · La Digue', img: '/images/Destinationsbilder/Seychellen_Drohne_klein.jpg', href: '#seychellen' },
]

export default function Destinationen() {
  return (
    <section id="destinationen" className="section" style={{ background: 'var(--navy)' }}>
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
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: '#fff', marginBottom: '1rem' }}>
            Destinationen
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '560px', margin: '0 auto', fontSize: '0.92rem', lineHeight: 1.8 }}>
            Von der kroatischen Küste bis zu den paradiesischen Seychellen — wir bringen Sie an die schönsten Segelreviere der Welt.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}>
          {destinations.map((d, i) => (
            <motion.a
              key={d.name}
              href={d.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              style={{
                position: 'relative', overflow: 'hidden',
                aspectRatio: '4/3', borderRadius: '3px',
                display: 'block', cursor: 'pointer',
              }}
            >
              <img
                src={d.img}
                alt={d.name}
                loading="lazy"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                onError={e => { (e.target as HTMLImageElement).src = '/images/Front.jpg' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(18,43,64,0.85) 0%, rgba(18,43,64,0.1) 60%, transparent 100%)',
                transition: 'background 0.3s',
              }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.2rem' }}>
                <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '2px' }}>{d.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem' }}>{d.sub}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #destinationen .container > div:last-child { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          #destinationen .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
