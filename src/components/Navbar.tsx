import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '../router'
import { useLang, switchLangUrl } from '../i18n'

const navEn = [
  {
    label: 'Cruises', href: '/en/cruises', items: [
      { label: 'All cruises', href: '/en/cruises' },
      { label: 'For beginners', href: '/en/cruises/for-beginners' },
      { label: 'For friends', href: '/en/cruises/for-friends' },
      { label: 'For families', href: '/en/cruises/for-families' },
      { label: 'Luxury', href: '/en/cruises/luxury' },
      { label: 'Yoga retreat', href: '/en/yoga' },
      { label: 'Cabin offers', href: '/en/cabin-offers' },
      { label: 'Holiday planner', href: '/en/holiday-planner' },
      { label: 'Trip reports', href: '/en/trip-reports' },
    ]
  },
  {
    label: 'Charter', href: '/en/charter/yacht-charter', items: [
      { label: 'Yacht charter', href: '/en/charter/yacht-charter' },
      { label: 'Crew charter', href: '/en/charter/crew-charter' },
    ]
  },
  {
    label: 'Destinations', href: '/en/destinations', items: [
      { label: 'All destinations', href: '/en/destinations' },
      { label: 'Croatia', href: '/en/destinations/croatia' },
      { label: 'Greece', href: '/en/destinations/greece' },
      { label: 'Balearic Islands', href: '/en/destinations/balearic-islands' },
      { label: 'Canary Islands', href: '/en/destinations/canaries' },
      { label: 'Caribbean - BVI', href: '/en/destinations/caribbean-british-virgin-islands' },
      { label: 'Caribbean - Windward Islands', href: '/en/destinations/caribbean-windward-islands' },
      { label: 'Thailand', href: '/en/destinations/thailand' },
      { label: 'Seychelles', href: '/en/destinations/seychelles' },
    ]
  },
  {
    label: 'Yachts', href: '/en/yachts', items: [
      { label: 'Sailing yacht (monohull)', href: '/en/yachts?tab=monohull' },
      { label: 'Sailing catamaran', href: '/en/yachts?tab=katamaran' },
      { label: 'Motor yacht (monohull)', href: '/en/yachts?tab=motoryacht' },
      { label: 'Power catamaran', href: '/en/yachts?tab=motorkat' },
    ]
  },
  {
    label: 'Contact', href: '#kontakt', items: [
      { label: 'Contact form', href: '/en/contact' },
      { label: 'Get a quote', href: '#kontakt' },
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Our team', href: '/en/contact/crew' },
      { label: 'For travel agencies / affiliates', href: '/en/contact/travel-agencies' },
    ]
  },
]

const navDe = [
  {
    label: 'Törns', href: '/toerns', items: [
      { label: 'Alle Törns', href: '/toerns' },
      { label: 'Für Einsteiger', href: '/toerns/einsteiger' },
      { label: 'Für Freunde', href: '/toerns/freunde' },
      { label: 'Für Familien', href: '/toerns/familien' },
      { label: 'Luxury', href: '/toerns/luxury' },
      { label: 'Yoga-Retreat', href: '/yoga' },
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
      { label: 'Segelyacht (Monohull)', href: '/yachten?tab=monohull' },
      { label: 'Segel-Katamaran', href: '/yachten?tab=katamaran' },
      { label: 'Motoryacht (Monohull)', href: '/yachten?tab=motoryacht' },
      { label: 'Motor-Katamaran', href: '/yachten?tab=motorkat' },
    ]
  },
  {
    label: 'Kontakt', href: '#kontakt', items: [
      { label: 'Kontaktformular', href: '/kontakt' },
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
  const [mobileCat, setMobileCat] = useState<string | null>(null)
  const lang = useLang()
  const { pathname } = useLocation()
  const nav = lang === 'en' ? navEn : navDe
  // Die Sprachen liegen auf verschiedenen Domains, der Wechsel ist also ein
  // echter Seitenaufruf und kein Routenwechsel innerhalb der Anwendung.
  const switchTo = (target: 'de' | 'en') => {
    if (target !== lang) window.location.assign(switchLangUrl(pathname, target))
  }

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: '#071b2f',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 4px 30px rgba(0,0,0,0.25)',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        {/* Logo: volles Wort-Logo, sobald Platz da ist; kompaktes Icon im engen Zwischenbereich, damit nichts gestaucht wird */}
        <Link to={lang === 'en' ? '/en' : '/'} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <img
            className="logo-full"
            src={lang === 'en' ? '/logo-en.png' : '/logo.png'}
            alt={lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub'}
            style={{ height: '68px', filter: 'brightness(0) invert(1)' }}
          />
          <img
            className="logo-compact"
            src="/logo-icon.png"
            alt={lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub'}
            style={{ height: '40px', display: 'none' }}
          />
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
          <Link to={lang === 'en' ? '/en/holiday-planner' : '/urlaubsplaner'} className="btn btn-primary" style={{ marginLeft: '12px', fontSize: '0.75rem', padding: '9px 20px' }}>
            {lang === 'en' ? 'Plan your holiday' : 'Urlaub planen'}
          </Link>
          <div style={{ marginLeft: '12px', display: 'flex', gap: '6px' }}>
            {(['de', 'en'] as const).map(l => (
              <button key={l} onClick={() => switchTo(l)} aria-label={l === 'de' ? 'Deutsch' : 'English'} style={{
                background: lang === l ? 'rgba(255,255,255,0.12)' : 'none',
                border: `1px solid rgba(255,255,255,${lang === l ? 0.5 : 0.2})`,
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                padding: '4px 10px', fontSize: '0.72rem', cursor: 'pointer', borderRadius: '2px',
              }}>{l.toUpperCase()}</button>
            ))}
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
          <div style={{ display: 'flex', gap: '8px', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {(['de', 'en'] as const).map(l => (
              <button key={l} onClick={() => { switchTo(l); setMobileOpen(false) }} style={{
                background: lang === l ? 'rgba(255,255,255,0.12)' : 'none',
                border: `1px solid rgba(255,255,255,${lang === l ? 0.5 : 0.2})`,
                color: lang === l ? '#fff' : 'rgba(255,255,255,0.5)',
                padding: '6px 14px', fontSize: '0.78rem', cursor: 'pointer', borderRadius: '3px',
              }}>{l.toUpperCase()}</button>
            ))}
          </div>
          {nav.map(item => {
            const expanded = mobileCat === item.label
            const closeMenu = () => { setMobileOpen(false); setMobileCat(null) }
            return (
            <div key={item.label}>
              <button
                onClick={() => setMobileCat(expanded ? null : item.label)}
                aria-expanded={expanded}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '14px 20px', color: 'rgba(255,255,255,0.75)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif' }}
              >
                {item.label}
                <span style={{ fontSize: '0.7rem', display: 'inline-block', transition: 'transform 0.2s', transform: expanded ? 'rotate(180deg)' : 'none' }}>▾</span>
              </button>
              {expanded && item.items.map(sub => {
                const mobileStyle = { display: 'block', padding: '11px 32px', color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', borderBottom: '1px solid rgba(255,255,255,0.05)', textDecoration: 'none' }
                return sub.href.startsWith('#')
                  ? <a key={sub.label} href={sub.href} onClick={closeMenu} style={mobileStyle}>{sub.label}</a>
                  : <Link key={sub.label} to={sub.href} onClick={closeMenu} style={mobileStyle}>{sub.label}</Link>
              })}
            </div>
          )})}
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav-toggle { display: block !important; }
        }
        @media (max-width: 1150px) and (min-width: 1025px) {
          .logo-full { display: none !important; }
          .logo-compact { display: block !important; }
        }
      `}</style>
    </header>
  )
}
