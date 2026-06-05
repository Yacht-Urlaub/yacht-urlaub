import { motion } from 'framer-motion'
import { useLang } from '../i18n'

// Partner-Logos 1:1 von der Originalseite (yacht-urlaub.net)
const partner = [
  { id: 'bvi', img: '/images/partner/bvi.jpg', alt: 'The British Virgin Islands – Nature\'s little secrets' },
  { id: 'jam', img: '/images/partner/jamyachtsupply.png', alt: 'JAM Yacht Supply – Supplies & Provisions for Yacht in Croatia', href: 'http://www.jamyachtsupply.com/?af=YachtUrlaub' },
  { id: 'rumzentrum', img: '/images/partner/rumzentrum.png', alt: 'Rumzentrum.at', href: 'https://rumzentrum.at/' },
  { id: 'italia', img: '/images/partner/italia.png', alt: 'Italia' },
  { id: 'spanien', img: '/images/partner/spanien.gif', alt: 'España – I need Spain' },
  { id: 'kroatien', img: '/images/partner/yacht-urlaub-partner-kroatien.jpg', alt: 'Kroatien – Voller Leben' },
  { id: 'greece', img: '/images/partner/greece.jpg', alt: 'Griechenland' },
  { id: 'skyscanner', img: '/images/partner/skyscanner.jpg', alt: 'Skyscanner', href: 'https://skyscanner.pxf.io/c/2944578/1027991/13416?associateid=AFF_TRA_19354_00001' },
]

export default function Partner() {
  const lang = useLang()
  return (
    <section style={{ background: '#fff', padding: '4.5rem 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '2.75rem' }}
        >
          <p style={{ color: 'var(--blue)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {lang === 'en' ? 'Strong together' : 'Gemeinsam stark'}
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)', color: 'var(--navy)' }}>
            {lang === 'en' ? 'Our partners' : 'Unsere Partner'}
          </h2>
        </motion.div>

        <div className="partner-logo-row">
          {partner.map((p, i) => {
            const img = (
              <motion.img
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                src={p.img}
                alt={p.alt}
                title={p.alt}
                loading="lazy"
                className="partner-logo"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )
            return p.href ? (
              <a key={p.id} href={p.href} target="_blank" rel="noopener noreferrer sponsored" aria-label={p.alt}>
                {img}
              </a>
            ) : (
              <span key={p.id}>{img}</span>
            )
          })}
        </div>
      </div>

      <style>{`
        .partner-logo-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 2.5rem 3.5rem;
          max-width: 1040px;
          margin: 0 auto;
        }
        .partner-logo {
          height: clamp(54px, 6vw, 78px);
          width: auto;
          max-width: 170px;
          object-fit: contain;
          filter: grayscale(1) opacity(0.6);
          transition: filter 0.25s ease, transform 0.25s ease;
        }
        .partner-logo:hover {
          filter: grayscale(0) opacity(1);
          transform: scale(1.06);
        }
        @media (max-width: 640px) {
          .partner-logo-row { gap: 1.75rem 2rem; }
          .partner-logo { filter: none; height: 48px; max-width: 130px; }
        }
      `}</style>
    </section>
  )
}
