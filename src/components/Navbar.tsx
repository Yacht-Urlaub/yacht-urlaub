import { useState, useEffect } from 'react'

const nav = [
  {
    label: 'Törns', items: [
      { label: 'Jetzt buchen', href: '#toerns', sub: ['Dalmatien', 'Kornaten', 'Istrien', 'Griechenland', 'Karibik-BVI', 'Kabinen Angebote', 'Grenadinen'] },
      { label: 'Für Einsteiger', href: '#einsteiger' },
      { label: 'Für Freunde', href: '#freunde' },
      { label: 'Für Familien', href: '#familien' },
      { label: 'Luxury', href: '#luxury' },
      { label: 'Individuell planen', href: '#individuell' },
      { label: 'Törnberichte', href: '#toernberichte' },
      { label: 'Anfrage starten', href: '#kontakt' },
    ]
  },
  {
    label: 'Charter', items: [
      { label: 'Yacht-Charter anfragen', href: '#charter' },
      { label: 'Skipper- und Bord-Service', href: '#skipper' },
    ]
  },
  {
    label: 'Destinationen', items: [
      { label: 'Törnberichte', href: '#toernberichte' },
      { label: 'Kroatien', href: '#kroatien' },
      { label: 'Griechenland', href: '#griechenland' },
      { label: 'Balearen', href: '#balearen' },
      { label: 'Kanaren', href: '#kanaren' },
      { label: 'Karibik-BVI', href: '#karibik' },
      { label: 'Karibik-Windward Islands', href: '#windward' },
      { label: 'Thailand', href: '#thailand' },
      { label: 'Seychellen', href: '#seychellen' },
    ]
  },
  {
    label: 'Yachten', items: [
      { label: 'Segelyacht (Monohull)', href: '#segelyacht' },
      { label: 'Segel-Katamaran', href: '#katamaran' },
      { label: 'Motoryacht (Monohull)', href: '#motoryacht' },
      { label: 'Motor-Katamaran', href: '#motorkat' },
    ]
  },
  {
    label: 'Kontakt', items: [
      { label: 'Anfrage starten', href: '#kontakt' },
      { label: 'Crew', href: '#crew' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Für Reisebüros/Affiliate-Partner', href: '#partner' },
    ]
  },
]

export default function Navbar() {
  const [open, setOpen] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(18,43,64,0.97)' : 'rgba(18,43,64,0.85)',
      backdropFilter: 'blur(8px)',
      transition: 'background 0.3s',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <a href="#home">
          <img src="/logo.png" alt="Yacht-Urlaub" style={{ height: '42px', filter: 'brightness(0) invert(1)' }} />
        </a>

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
                fontFamily: 'Open Sans, sans-serif',
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
                  background: '#fff', minWidth: '220px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  borderTop: '3px solid var(--blue)',
                  zIndex: 100,
                }}>
                  {item.items.map(sub => (
                    <a key={sub.label} href={sub.href} style={{
                      display: 'block', padding: '10px 18px',
                      fontSize: '0.82rem', color: '#333', fontWeight: 400,
                      borderBottom: '1px solid #f0f0f0',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#f0f7fb'; e.currentTarget.style.color = 'var(--blue)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = '#333' }}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          <a href="#kontakt" className="btn btn-primary" style={{ marginLeft: '12px', fontSize: '0.75rem', padding: '9px 20px' }}>
            Jetzt buchen
          </a>
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
              {item.items.map(sub => (
                <a key={sub.label} href={sub.href} onClick={() => setMobileOpen(false)} style={{
                  display: 'block', padding: '10px 32px', color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                }}>
                  {sub.label}
                </a>
              ))}
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
