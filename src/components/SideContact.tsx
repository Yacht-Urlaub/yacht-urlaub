import { Link } from '../router'
import { useLang, MAIL } from '../i18n'

const items = [
  {
    id: 'phone',
    label: '+43 1 997 15 82',
    href: 'tel:+43199715820',
    hover: '#0284c7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
  {
    id: 'mail',
    label: 'E-Mail schreiben',
    href: 'mailto:info@yacht-urlaub.net',
    hover: '#0284c7',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/436602652481',
    hover: '#25d366',
    external: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    id: 'anfrage',
    label: 'Anfrage starten',
    href: '/urlaubsplaner',
    hover: 'var(--gold, #f59e0b)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="3" />
        <line x1="12" y1="22" x2="12" y2="8" />
        <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
      </svg>
    ),
  },
]

export default function SideContact() {
  const lang = useLang()
  const labels: Record<string, string> = lang === 'en'
    ? { phone: '+43 1 997 15 82', mail: 'Write an e-mail', whatsapp: 'WhatsApp', anfrage: 'Get a quote' }
    : { phone: '+43 1 997 15 82', mail: 'E-Mail schreiben', whatsapp: 'WhatsApp', anfrage: 'Anfrage starten' }
  return (
    <>
      <div className="side-contact" style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 890,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        padding: '10px 0 10px 10px',
      }}>
        {items.map(item => {
          const inner = (
            <>
              <span className="side-contact-label">{labels[item.id] ?? item.label}</span>
              <span className="side-contact-icon">{item.icon}</span>
            </>
          )
          const style = { ['--hover-bg' as string]: item.hover }
          const target = item.id === 'anfrage' && lang === 'en' ? '/en/holiday-planner'
            : item.id === 'mail' ? `mailto:${MAIL[lang]}`
            : item.href
          return target.startsWith('/') ? (
            <Link key={item.id} to={target} aria-label={item.label} className="side-contact-item" style={style}>
              {inner}
            </Link>
          ) : (
            <a
              key={item.id}
              href={target}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              aria-label={item.label}
              className="side-contact-item"
              style={style}
            >
              {inner}
            </a>
          )
        })}
      </div>

      <style>{`
        .side-contact-item {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 0;
          height: 46px;
          width: 46px;
          margin-left: auto;
          color: #fff;
          text-decoration: none;
          background: rgba(13, 30, 46, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-right: none;
          border-radius: 14px 0 0 14px;
          box-shadow: 0 4px 18px rgba(7, 27, 47, 0.25);
          overflow: hidden;
          white-space: nowrap;
          transition: width 0.3s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, box-shadow 0.25s ease;
        }
        .side-contact-icon {
          width: 46px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .side-contact-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          padding-left: 16px;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.2s ease 0.08s, transform 0.25s ease 0.08s;
        }
        .side-contact-item:hover {
          width: 188px;
          background: var(--hover-bg);
          box-shadow: 0 6px 24px rgba(7, 27, 47, 0.35);
        }
        .side-contact-item:hover .side-contact-label {
          opacity: 1;
          transform: translateX(0);
        }
        /* Mobil: kompakte runde Buttons unten rechts */
        @media (max-width: 768px) {
          .side-contact {
            top: auto !important;
            bottom: 1.25rem !important;
            right: 0.85rem !important;
            transform: none !important;
            padding: 0 !important;
            gap: 8px !important;
          }
          .side-contact-item {
            width: 44px !important;
            height: 44px;
            border-radius: 50% !important;
            border-right: 1px solid rgba(255, 255, 255, 0.12);
            justify-content: center;
          }
          .side-contact-item:hover { width: 44px !important; }
          .side-contact-label { display: none !important; }
          .side-contact-icon { width: 44px; height: 44px; }
          /* WhatsApp im Marken-Grün, damit er sofort erkennbar ist */
          .side-contact-item[aria-label="WhatsApp"] {
            background: #25d366;
            border-color: rgba(255, 255, 255, 0.25);
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45);
          }
        }
      `}</style>
    </>
  )
}
