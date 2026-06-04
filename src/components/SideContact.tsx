import { useLocation } from 'react-router-dom'

const HIDDEN_ON = ['/', '/impressum', '/datenschutz', '/agb']

const items = [
  {
    id: 'phone',
    icon: '📞',
    label: '+43 1 997 15 82',
    href: 'tel:+43199715820',
    color: 'var(--navy)',
  },
  {
    id: 'mail',
    icon: '✉',
    label: 'E-Mail schreiben',
    href: 'mailto:office@yacht-urlaub.at',
    color: '#0369a1',
  },
  {
    id: 'whatsapp',
    icon: '💬',
    label: 'WhatsApp',
    href: 'https://wa.me/436602652481',
    color: '#1a7a40',
    external: true,
  },
  {
    id: 'anfrage',
    icon: '⚓',
    label: 'Anfrage starten',
    href: '#kontakt',
    color: 'var(--blue)',
  },
]

export default function SideContact() {
  const { pathname } = useLocation()
  if (HIDDEN_ON.includes(pathname)) return null

  return (
    <>
      <div className="side-contact" style={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 890,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
      }}>
        {items.map(item => (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            rel={item.external ? 'noopener noreferrer' : undefined}
            className={`side-contact-item side-contact-${item.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: item.color,
              color: '#fff',
              textDecoration: 'none',
              padding: '11px 13px',
              width: '44px',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              transition: 'width 0.28s cubic-bezier(0.25, 0.1, 0.25, 1)',
              borderRadius: '0 4px 4px 0',
              boxShadow: '2px 2px 12px rgba(0,0,0,0.18)',
            }}
          >
            <span style={{ fontSize: '1rem', flexShrink: 0, lineHeight: 1 }}>{item.icon}</span>
            <span className="side-contact-label" style={{
              fontSize: '0.75rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.02em',
              opacity: 0,
              transition: 'opacity 0.18s ease',
              whiteSpace: 'nowrap',
            }}>
              {item.label}
            </span>
          </a>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .side-contact { display: none !important; }
        }
        .side-contact-item:hover {
          width: 170px !important;
        }
        .side-contact-item:hover .side-contact-label {
          opacity: 1 !important;
        }
      `}</style>
    </>
  )
}
