import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from '../router'

const STORAGE_KEY = 'yu_cookie_consent'

export type ConsentState = 'accepted' | 'rejected' | null

export function getConsent(): ConsentState {
  try {
    return (localStorage.getItem(STORAGE_KEY) as ConsentState) ?? null
  } catch {
    return null
  }
}

export function setConsent(value: 'accepted' | 'rejected') {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {}
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (getConsent() === null) setVisible(true)
  }, [])

  const accept = () => {
    setConsent('accepted')
    setVisible(false)
    // Trigger GA load if script is deferred
    window.dispatchEvent(new Event('cookie-consent-accepted'))
  }

  const reject = () => {
    setConsent('rejected')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 32 }}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9000,
            background: 'rgba(13, 30, 46, 0.97)',
            backdropFilter: 'blur(10px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 -8px 40px rgba(0,0,0,0.3)',
          }}
        >
          <div className="container" style={{ padding: '1.5rem 24px' }}>
            {/* Main row */}
            <div style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem', flexWrap: 'wrap',
            }}>
              {/* Text */}
              <div style={{ flex: '1 1 400px' }}>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', fontFamily: 'DM Sans, sans-serif' }}>
                  🍪 Wir verwenden Cookies
                </p>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                  Wir setzen Cookies ein, um Ihnen die beste Erfahrung auf unserer Website zu bieten und die Nutzung zu analysieren (Google Analytics).{' '}
                  <button
                    onClick={() => setShowDetails(v => !v)}
                    style={{ background: 'none', border: 'none', color: 'var(--blue-light)', cursor: 'pointer', fontSize: '0.8rem', padding: 0, textDecoration: 'underline' }}
                  >
                    {showDetails ? 'Details verbergen' : 'Details anzeigen'}
                  </button>
                  {' '}Weitere Informationen finden Sie in unserer{' '}
                  <Link to="/datenschutz" style={{ color: 'var(--blue-light)', textDecoration: 'underline' }}>
                    Datenschutzerklärung
                  </Link>.
                </p>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0, flexWrap: 'wrap' }}>
                <button
                  onClick={reject}
                  style={{
                    padding: '10px 22px', borderRadius: '2px',
                    background: 'transparent', border: '1.5px solid rgba(255,255,255,0.25)',
                    color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem', fontWeight: 600,
                    letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
                >
                  Nur notwendige
                </button>
                <button
                  onClick={accept}
                  style={{
                    padding: '10px 22px', borderRadius: '2px',
                    background: 'var(--blue)', border: '1.5px solid var(--blue)',
                    color: '#fff', fontSize: '0.78rem', fontWeight: 700,
                    letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
                    fontFamily: 'DM Sans, sans-serif', transition: 'all 0.2s',
                    boxShadow: '0 2px 12px rgba(27,122,158,0.4)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--navy)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.borderColor = 'var(--blue)' }}
                >
                  Alle akzeptieren
                </button>
              </div>
            </div>

            {/* Details panel */}
            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{
                    marginTop: '1.25rem',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    paddingTop: '1.25rem',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '1rem',
                  }}>
                    {[
                      {
                        name: 'Notwendige Cookies',
                        required: true,
                        desc: 'Technisch erforderlich für den Betrieb der Website (Session, Sicherheit). Können nicht deaktiviert werden.',
                      },
                      {
                        name: 'Google Analytics',
                        required: false,
                        desc: 'Anonymisierte Nutzungsanalyse (Seitenaufrufe, Verweildauer). Kein personenbezogener Bezug. Anbieter: Google Ireland Ltd.',
                      },
                      {
                        name: 'Marketing / Social',
                        required: false,
                        desc: 'Cookies von Facebook, Instagram und LinkedIn für Social-Media-Funktionen (nur bei direkter Interaktion).',
                      },
                    ].map(c => (
                      <div key={c.name} style={{
                        background: 'rgba(255,255,255,0.04)', borderRadius: '4px',
                        padding: '1rem', border: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                          <span style={{ color: '#fff', fontSize: '0.82rem', fontWeight: 700 }}>{c.name}</span>
                          <span style={{
                            fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '10px',
                            background: c.required ? 'rgba(27,122,158,0.3)' : 'rgba(255,255,255,0.1)',
                            color: c.required ? 'var(--blue-light)' : 'rgba(255,255,255,0.5)',
                            letterSpacing: '0.05em',
                          }}>
                            {c.required ? 'Erforderlich' : 'Optional'}
                          </span>
                        </div>
                        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', lineHeight: 1.6 }}>{c.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
