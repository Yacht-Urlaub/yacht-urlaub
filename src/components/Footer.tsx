import { Link } from 'react-router-dom'
import { FacebookIcon, InstagramIcon, YouTubeIcon, LinkedInIcon, XingIcon } from './Icons'
import { useLang } from '../i18n'

const colsEn = [
  {
    title: 'Cruises',
    links: [
      { label: 'For beginners', href: '/en/cruises/for-beginners' },
      { label: 'For friends', href: '/en/cruises/for-friends' },
      { label: 'For families', href: '/en/cruises/for-families' },
      { label: 'Luxury', href: '/en/cruises/luxury' },
      { label: 'Cabin offers', href: '/en/cabin-offers' },
      { label: 'Get a quote', href: '#kontakt' },
    ],
  },
  {
    title: 'Yachts & charter',
    links: [
      { label: 'Sailing yacht', href: '/en/yachts?tab=monohull' },
      { label: 'Sailing catamaran', href: '/en/yachts?tab=katamaran' },
      { label: 'Motor yacht', href: '/en/yachts?tab=motoryacht' },
      { label: 'Power catamaran', href: '/en/yachts?tab=motorkat' },
      { label: 'Yacht charter', href: '/en/charter/yacht-charter' },
      { label: 'Crew charter', href: '/en/charter/crew-charter' },
    ],
  },
  {
    title: 'Destinations',
    links: [
      { label: 'Croatia', href: '/en/destinations/croatia' },
      { label: 'Greece', href: '/en/destinations/greece' },
      { label: 'Balearic Islands', href: '/en/destinations/balearic-islands' },
      { label: 'Canary Islands', href: '/en/destinations/canaries' },
      { label: 'Caribbean - BVI', href: '/en/destinations/caribbean-british-virgin-islands' },
      { label: 'Caribbean - Windward Islands', href: '/en/destinations/caribbean-windward-islands' },
      { label: 'Seychelles', href: '/en/destinations/seychelles' },
      { label: 'Thailand', href: '/en/destinations/thailand' },
      { label: 'FAQ', href: '/en/faq' },
      { label: 'Our team', href: '/en/contact/crew' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Imprint', href: '/en/imprint' },
      { label: 'Data privacy', href: '/en/data-privacy' },
      { label: 'Terms & conditions', href: '/en/terms' },
      { label: 'Travel agencies & partners', href: '/en/contact/travel-agencies' },
    ],
  },
]

const colsDe = [
  {
    title: 'Törns',
    links: [
      { label: 'Für Einsteiger', href: '/toerns/einsteiger' },
      { label: 'Für Freunde', href: '/toerns/freunde' },
      { label: 'Für Familien', href: '/toerns/familien' },
      { label: 'Luxury', href: '/toerns/luxury' },
      { label: 'SailAway Partyflotte', href: '/sailaway' },
      { label: 'Kabinen-Angebote', href: '/kabinen' },
      { label: 'Törnberichte', href: '/toernberichte' },
      { label: 'Anfrage starten', href: '#kontakt' },
    ],
  },
  {
    title: 'Yachten & Charter',
    links: [
      { label: 'Segelyacht', href: '/yachten?tab=monohull' },
      { label: 'Segel-Katamaran', href: '/yachten?tab=katamaran' },
      { label: 'Motoryacht', href: '/yachten?tab=motoryacht' },
      { label: 'Motor-Katamaran', href: '/yachten?tab=motorkat' },
      { label: 'Yacht-Charter', href: '/charter' },
      { label: 'Skipper- & Bord-Service', href: '/skipper' },
      { label: 'Crew-Charter', href: '/charter' },
    ],
  },
  {
    title: 'Destinationen',
    links: [
      { label: 'Kroatien', href: '/destinationen/kroatien' },
      { label: 'Griechenland', href: '/destinationen/griechenland' },
      { label: 'Balearen', href: '/destinationen/balearen' },
      { label: 'Kanaren', href: '/destinationen/kanaren' },
      { label: 'Karibik-BVI', href: '/destinationen/karibik-bvi' },
      { label: 'Karibik-Windward Islands', href: '/destinationen/karibik-windward-islands' },
      { label: 'Seychellen', href: '/destinationen/seychellen' },
      { label: 'Thailand', href: '/destinationen/thailand' },
      { label: 'Törnberichte', href: '/toernberichte' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Unser Team', href: '/crew' },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutz', href: '/datenschutz' },
      { label: 'AGB', href: '/agb' },
      { label: 'Reisebüros & Partner', href: '/reisebuero' },
    ],
  },
]

const socials = [
  { icon: <FacebookIcon size={15} />, label: 'Facebook', href: 'https://www.facebook.com/yachturlaub/' },
  { icon: <InstagramIcon size={15} />, label: 'Instagram', href: 'https://www.instagram.com/yacht.holiday/' },
  { icon: <YouTubeIcon size={15} />, label: 'YouTube', href: 'https://www.youtube.com/channel/UCyCd7UCoTB8TOTZFsGboTGQ' },
  { icon: <LinkedInIcon size={15} />, label: 'LinkedIn', href: 'https://www.linkedin.com/company/yacht-urlaub' },
  { icon: <XingIcon size={15} />, label: 'XING', href: 'https://www.xing.com/companies/yacht-urlaub' },
]

export default function Footer() {
  const lang = useLang()
  const cols = lang === 'en' ? colsEn : colsDe
  return (
    <footer style={{ background: '#0d1e2e', color: 'rgba(255,255,255,0.65)', fontFamily: 'DM Sans, sans-serif' }}>
      {/* Newsletter bar */}
      <div style={{ background: 'var(--blue)', padding: '2.5rem 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: 'DM Sans, sans-serif', fontSize: '1.3rem', marginBottom: '0.3rem' }}>{lang === 'en' ? 'Newsletter — offers & news' : 'Newsletter — Angebote & Neuigkeiten'}</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>{lang === 'en' ? 'No spam. Just real sailing dreams.' : 'Kein Spam. Nur echte Segelträume.'}</p>
          </div>
          <form
            action="https://yacht-urlaub.us10.list-manage.com/subscribe/post?u=cefebb6fcf8136469892f293c&amp;id=13f58451c3"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            target="_blank"
            style={{ display: 'flex', gap: '0.75rem', flex: '1 1 280px', maxWidth: '420px', flexWrap: 'wrap' }}
          >
            <input
              type="email"
              name="EMAIL"
              id="mce-EMAIL"
              required
              placeholder={lang === 'en' ? 'Your e-mail address' : 'Ihre E-Mail-Adresse'}
              style={{ padding: '10px 16px', borderRadius: '3px', border: 'none', fontSize: '0.85rem', flex: '1 1 180px', minWidth: 0, outline: 'none', fontFamily: 'DM Sans, sans-serif' }}
            />
            {/* Honeypot gegen Formular-Bots — darf nicht ausgefüllt werden */}
            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
              <input type="text" name="b_cefebb6fcf8136469892f293c_13f58451c3" tabIndex={-1} defaultValue="" />
            </div>
            <button type="submit" id="mc-embedded-subscribe" className="btn btn-navy" style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
              {lang === 'en' ? 'Sign me up!' : 'Ich bin dabei!'}
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="container" style={{ padding: '3.5rem 20px 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginBottom: '3rem' }}>
          {cols.map(col => (
            <div key={col.title}>
              <h4 style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    {l.href.startsWith('#')
                      ? <a href={l.href} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>{l.label}</a>
                      : <Link to={l.href} style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s' }} onMouseEnter={e => (e.currentTarget.style.color = '#fff')} onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>{l.label}</Link>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link to={lang === 'en' ? '/en' : '/'}><img src={lang === 'en' ? '/logo-en.png' : '/logo.png'} alt={lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub'} style={{ height: '32px', filter: 'brightness(0) invert(1) opacity(0.7)' }} /></Link>
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

          {/* Trust-Siegel & Zahlungsanbieter */}
          <div style={{ display: 'flex', gap: '1.1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <img
              src="/images/logos/trusted-shops.png"
              alt={lang === 'en' ? 'Trusted Shops certified' : 'Trusted Shops zertifiziert'}
              title={lang === 'en' ? 'Trusted Shops certified' : 'Trusted Shops zertifiziert'}
              loading="lazy"
              style={{ height: '46px', width: 'auto', flexShrink: 0 }}
            />
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>{lang === 'en' ? 'Payment:' : 'Zahlung:'}</span>
              <img
                src="/images/logos/payment-methods.png"
                alt="Mastercard, Visa, American Express, giropay"
                loading="lazy"
                style={{ height: '42px', width: 'auto', background: '#fff', borderRadius: '6px', padding: '7px 12px' }}
              />
            </div>
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
