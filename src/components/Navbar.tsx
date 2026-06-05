import { useState } from 'react'
import { Link } from 'react-router-dom'

const nav = [
  {
    label: 'Törns', href: '/toerns', items: [
      { label: 'Alle Törns', href: '/toerns' },
      { label: 'Für Einsteiger', href: '/toerns/einsteiger' },
      { label: 'Für Freunde', href: '/toerns/freunde' },
      { label: 'Für Familien', href: '/toerns/familien' },
      { label: 'Luxury', href: '/toerns/luxury' },
      { label: 'Kabinen-Angebote', href: '/kabinen' },
      { label: 'Urlaubsplaner', href: '/urlaubsplaner' },
      { label: 'Törnberichte', href: '/toernberichte' },
    ]
  },
  {
    label: 'Charter', href: '/charter', items: [
      { label: 'Yacht-Charter anfragen', href: '/charter' },
      { label: 'Skipper- und Bord-Service', href: '/skipper' },
    ]
  },
  {
    label: 'Destinationen', href: '/destinationen', items: [
      { label: 'Alle Destinationen', href: '/destinationen' },
      { label: 'Kroatien', href: '/destinationen/kroatien' },
      { label: 'Griechenland', href: '/destinationen/griechenland' },
      { label: 'Balearen', href: '/destinationen/balearen' },
      { label: 'Kanaren', href: '/destinationen/kanaren' },
      { label: 'Karibik-BVI', href: '/destinationen/karibik-bvi' },
      { label: 'Karibik-Windward Islands', href: '/destinationen/karibik-windward-islands' },
      { label: 'Thailand', href: '/destinationen/thailand' },
      { label: 'Seychellen', href: '/destinationen/seychellen' },
    ]
  },
  {
    label: 'Yachten', href: '/yachten', items: [
      { label: 'Alle Yachten', href: '/yachten' },
      { label: 'Segelyacht (Monohull)', href: '/yachten?tab=monohull' },
      { label: 'Segel-Katamaran', href: '/yachten?tab=katamaran' },
      { label: 'Motoryacht (Monohull)', href: '/yachten?tab=motoryacht' },
      { label: 'Motor-Katamaran', href: '/yachten?tab=motorkat' },
    ]
  },
  {
    label: 'Kontakt', href: '#kontakt', items: [
      { label: 'Anfrage starten', href: '#kontakt' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Unser Team', href: '/crew' },
      { label: 'Für Reisebüros/Affiliate-Partner', href: '/reisebuero' },
    ]
  },
]

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#071b2f',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="Yacht-Urlaub" style={{ height: '68px', filter: 'brightness(0) invert(1)' }} />
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {nav.map(item => (
            <div
              key={item.label}
              style={{ position: 'relative' }}
              onMouseEnter={() => setOpen(item.label)}
              onMouseLeave={() => setOpen(null)}
            >
              <button style={{
                background: 'none', border: 'none', color: 'rgba(255,255,255,0.88)',
                padding: '8px 14px', fontSize: '0.82rem', fontWeight: 600,
                letterSpacing: '0.06em', textTransform: 'uppercase', cursor: 'pointer',
                fontFamily: 'DM Sans, sans-serif',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.88)')}
              >
                {item.label} <span style={{ fontSize: '0.6rem', marginLeft: '2px' }}>▾</span>
              </button>
              {open === item.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: '#071b2f',
                  minWidth: '220px',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.35)',
                  borderTop: '3px solid var(--gold)',
                  zIndex: 100,
                }}>
                  {item.items.map(sub => {
                    const isHash = sub.href.startsWith('#')
                    const linkStyle: React.CSSProperties = {
                      display: 'block', padding: '10px 18px',
                      fontSize: '0.82rem', color: 'rgba(255,255,255,0.82)', fontWeight: 400,
                      borderBottom: '1px solid rgba(255,255,255,0.07)',
                      transition: 'background 0.15s, color 0.15s', textDecoration: 'none',
                    }
                    const hoverIn = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = 'rgba(245,158,11,0.15)'; e.currentTarget.style.color = 'var(--gold-light)' }
                    const hoverOut = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'rgba(255,255,255,0.82)' }
                    return isHash
                      ? <a key={sub.label} href={sub.href} onClick={() => setOpen(null)} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{sub.label}</a>
                      : <Link key={sub.label} to={sub.href} onClick={() => setOpen(null)} style={linkStyle} onMouseEnter={hoverIn} onMouseLeave={hoverOut}>{sub.label}</Link>
                  })}
                </div>
              )}
            </div>
          ))}
          <Link to="/urlaubsplaner" className="btn btn-primary" style={{ marginLeft: '12px', fontSize: '0.75rem', padding: '9px 20px' }}>
            Urlaub planen
          </Link>
          <div style={{ marginLeft: '12px', display: 'flex', gap: '6px' }}>
            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.4)', color: '#fff', padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px' }}>DE</button>
            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.5)', padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px' }}>EN</button>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="mobile-nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: 'var(--navy)', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {nav.map(item => (
            <div key={item.label}>
              <div style={{ padding: '12px 20px', color: 'rgba(255,255,255,0.6)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>
                {item.label}
              </div>
              {item.items.map(sub => {
                const mobileStyle = { display: 'block', padding: '10px 32px', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none' }
                return sub.href.startsWith('#')
                  ? <a key={sub.label} href={sub.href} onClick={() => setMobileOpen(false)} style={mobileStyle}>{sub.label}</a>
                  : <Link key={sub.label} to={sub.href} onClick={() => setMobileOpen(false)} style={mobileStyle}>{sub.label}</Link>
              })}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
      `}</style>
    </header>
  )
}
