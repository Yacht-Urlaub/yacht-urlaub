import { Link } from 'react-router-dom'

const cols = [
  {
    title: 'Törns',
    links: [
      { label: 'Für Einsteiger', href: '/#toerns' },
      { label: 'Für Freunde', href: '/#toerns' },
      { label: 'Für Familien', href: '/#toerns' },
      { label: 'Luxury', href: '/#toerns' },
      { label: 'Törnberichte', href: '/toernberichte' },
      { label: 'Anfrage starten', href: '/#kontakt' },
    ],
  },
  {
    title: 'Yachten & Charter',
    links: [
      { label: 'Segelyacht', href: '/yachten?tab=monohull' },
      { label: 'Katamaran', href: '/yachten?tab=katamaran' },
      { label: 'Motoryacht', href: '/yachten?tab=motoryacht' },
      { label: 'Yacht-Charter', href: '/charter' },
      { label: 'Crew-Charter', href: '/charter' },
    ],
  },
  {
    title: 'Charter',
    links: [
      { label: 'Yacht-Charter', href: '/charter' },
      { label: 'Crew-Charter', href: '/charter' },
    ],
  },
  {
    title: 'Destinationen',
    links: [
      { label: 'Kroatien', href: '/destinationen/kroatien' },
      { label: 'Griechenland', href: '/destinationen/griechenland' },
      { label: 'Balearen', href: '/destinationen/balearen' },
      { label: 'Karibik-BVI', href: '/destinationen/karibik' },
      { label: 'Seychellen', href: '/destinationen/seychellen' },
      { label: 'Thailand', href: '/destinationen/thailand' },
      { label: 'Törnberichte', href: '/toernberichte' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
    ],
  },
]

const socials = [
  { icon: 'f', label: 'Facebook', href: 'https://www.facebook.com/yachturlaub/' },
  { icon: '📸', label: 'Instagram', href: 'https://www.instagram.com/yacht.holiday/' },
  { icon: '▶', label: 'YouTube', href: 'https://www.youtube.com/channel/UCyCd7UCoTB8TOTZFsGboTGQ' },
  { icon: 'in', label: 'LinkedIn', href: 'https://www.linkedin.com/company/yacht-urlaub' },
  { icon: 'X', label: 'XING', href: 'https://www.xing.com/companies/yacht-urlaub' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0d1e2e', color: 'rgba(255,255,255,0.65)', fontFamily: 'Open Sans, sans-serif' }}>
      {/* Newsletter bar */}
      <div style={{ background: 'var(--blue)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', marginBottom: '0.3rem' }}>Newsletter — Angebote &amp; Neuigkeiten</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>Kein Spam. Nur echte Segelträume.</p>
          </div>
          <form
            name="newsletter"
            data-netlify="true"
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', gap: '0.75rem', flex: '0 0 auto' }}
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              style={{ padding: '10px 16px', borderRadius: '3px', border: 'none', fontSize: '0.85rem', width: '240px', outline: 'none', fontFamily: 'Open Sans, sans-serif' }}
            />
            <button type="submit" className="btn btn-navy" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              Ich bin dabei!
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container" style={{ padding: '3.5rem 20px 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.href} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to="/"><img src="/logo.png" alt="Yacht-Urlaub" style={{ height: '32px', filter: 'brightness(0) invert(1) opacity(0.7)' }} /></Link>
            <p style={{ fontSize: '0.78rem' }}>© YACHT-URLAUB Ing. Manuel Göschl, MBA</p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Zahlungsanbieter */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginRight: '4px' }}>Zahlung:</span>
            {['Visa', 'MC', 'AMEX'].map(p => (
              <span key={p} style={{
                background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)',
                padding: '3px 8px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 600,
              }}>{p}</span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div:first-of-type { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          footer .container > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
