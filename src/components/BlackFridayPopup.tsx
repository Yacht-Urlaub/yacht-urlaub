import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '../router'
import { useLang, toInternal } from '../i18n'
import { BF_END as END, BF_CODE as CODE, bfText } from '../blackFriday'
import { getConsent, onConsentChange } from '../consent'

// Black-Friday-Popup 2026 (ersetzt das Event-Popup "Sail into the Seasons").
// - erscheint 4 Sekunden nach dem Seitenaufruf, einmal pro Besucher (bis zum
//   Schliessen, localStorage) — aber erst, wenn im Cookie-Banner eine Wahl
//   getroffen wurde (sonst verdeckt es den Banner); dann zaehlen die 4 s ab
//   der Entscheidung
// - blendet sich nach dem 27.11.2026, 23:59 (MEZ) automatisch aus
// - deutsch und englisch; nicht auf den Seiten, die selbst Ziel der Buttons
//   sind, und nicht auf den Rechtstexten
// Wird erst nach dem Timer ins DOM gehaengt — damit landet es nie im
// statischen Snapshot (scripts/prerender.cjs).
const KEY = 'bf26_closed'
const EXCLUDED = [
  '/buchen', '/urlaubsplaner', '/impressum', '/datenschutz', '/agb',
  '/en/book-now', '/en/holiday-planner', '/en/imprint', '/en/data-privacy', '/en/terms',
]

export default function BlackFridayPopup() {
  const lang = useLang()
  const { pathname } = useLocation()
  const internal = toInternal(pathname)
  const t = bfText[lang]
  const allowed = !EXCLUDED.includes(internal)

  const [open, setOpen] = useState(false)
  // Cookie-Entscheidung liegt vor (gespeichert oder gerade im Banner getroffen)
  const [decided, setDecided] = useState(() => getConsent() !== null)
  const [copied, setCopied] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => onConsentChange(() => setDecided(true)), [])

  useEffect(() => {
    if (!allowed || !decided || new Date() > END) return
    try { if (localStorage.getItem(KEY)) return } catch { /* Speicher gesperrt: trotzdem zeigen */ }
    const timer = setTimeout(() => setOpen(true), 4000)
    return () => clearTimeout(timer)
  }, [allowed, decided])

  function close() {
    setOpen(false)
    try { localStorage.setItem(KEY, '1') } catch { /* egal */ }
  }

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* Zwischenablage nicht verfuegbar: Code bleibt sichtbar */ }
  }

  if (!allowed || !open) return null

  return (
    <div
      id="bf26-overlay" role="dialog" aria-modal="true" aria-labelledby="bf26-title"
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      <div id="bf26-box">
        <button ref={closeRef} id="bf26-close" type="button" aria-label={t.close} onClick={close}>&times;</button>

        <div className="bf26-sujet">
          <svg className="bf26-waves" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 70 Q75 40 150 70 T300 70 T450 70 T600 70 V120 H0Z" fill="#77B7E5" opacity=".10" />
            <path d="M0 85 Q75 60 150 85 T300 85 T450 85 T600 85 V120 H0Z" fill="#3061AC" opacity=".35" />
          </svg>
          <img className="bf26-sail" src="/images/events/black-friday-2026/segel.webp" alt="" aria-hidden="true" width={72} height={152} decoding="async" />
          <div className="bf26-kicker">{t.kicker}</div>
          <div id="bf26-title" className="bf26-head">BLACK<br />FRIDAY</div>
          <div className="bf26-sub">{t.sub}</div>
        </div>

        <div className="bf26-body">
          <div className="bf26-offer">
            <div className="bf26-big">{t.off}</div>
            <div>
              <strong>{t.allPkgs}</strong><br />
              {t.withCode}{' '}
              <button type="button" className="bf26-code" onClick={copyCode} title={t.copy}>
                {copied ? t.copied : CODE}
              </button>
              <small>{t.valid}</small>
            </div>
          </div>
          <div className="bf26-offer">
            <div className="bf26-big bf26-icon">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#3061AC" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="5" r="2.2" /><path d="M12 7.2V21M7 11h10M4.5 14.5c.8 3.8 3.8 6.5 7.5 6.5s6.7-2.7 7.5-6.5" />
              </svg>
            </div>
            <div>
              <strong>{t.dealsH}</strong><br />
              {t.dealsT}
            </div>
          </div>

          <div className="bf26-ctas">
            <Link to={t.pkHref} className="bf26-btn bf26-btn-main" onClick={close}>{t.ctaPk}</Link>
            <Link to={t.planHref} className="bf26-btn bf26-btn-line" onClick={close}>{t.ctaPlan}</Link>
          </div>
          <span className="bf26-sr" role="status" aria-live="polite">{copied ? t.srCopied : ''}</span>
        </div>
      </div>

      <style>{`
        #bf26-overlay{position:fixed;inset:0;z-index:99999;background:rgba(5,14,28,.72);display:flex;align-items:center;justify-content:center;padding:16px;font-family:'DM Sans',sans-serif}
        #bf26-box{position:relative;width:100%;max-width:480px;max-height:calc(100vh - 32px);overflow:auto;border-radius:14px;background:#fff;box-shadow:0 20px 60px rgba(0,0,0,.45);animation:bf26in .35s ease-out}
        @keyframes bf26in{from{transform:translateY(20px);opacity:0}to{transform:none;opacity:1}}
        #bf26-close{position:absolute;top:8px;right:10px;z-index:2;width:36px;height:36px;border:0;border-radius:50%;background:rgba(255,255,255,.15);color:#fff;font-size:26px;line-height:1;cursor:pointer;font-family:inherit}
        #bf26-close:hover{background:rgba(255,255,255,.3)}
        #bf26-close:focus-visible,.bf26-code:focus-visible,.bf26-btn:focus-visible{outline:3px solid #77B7E5;outline-offset:2px}
        .bf26-sujet{position:relative;overflow:hidden;padding:34px 28px 46px;background:radial-gradient(circle at 85% 20%,#173564 0,#0a1424 50%,#04080f 100%);color:#fff}
        .bf26-waves{position:absolute;left:0;bottom:0;width:100%;height:70px}
        .bf26-sail{position:absolute;right:30px;bottom:18px;width:72px;height:auto;filter:drop-shadow(0 0 18px rgba(119,183,229,.35))}
        .bf26-kicker{display:inline-block;padding:4px 10px;border:1px solid #77B7E5;border-radius:20px;color:#77B7E5;font-size:12px;letter-spacing:.12em;text-transform:uppercase}
        .bf26-head{margin:14px 0 8px;font-size:56px;line-height:.92;font-weight:900;letter-spacing:.02em}
        .bf26-sub{color:#77B7E5;font-size:16px;font-weight:600}
        .bf26-body{padding:22px 24px 24px;color:#04080f}
        .bf26-offer{display:flex;gap:14px;align-items:center;padding:12px 0;border-bottom:1px solid #e9ecf1;font-size:15px;line-height:1.45}
        .bf26-offer:last-of-type{border-bottom:0}
        .bf26-offer small{display:block;color:#5f6a7a;font-size:12px}
        .bf26-big{flex:0 0 76px;font-size:30px;font-weight:900;color:#3061AC;text-align:center}
        .bf26-icon{display:flex;justify-content:center}
        .bf26-code{display:inline-block;padding:1px 8px;border:1.5px dashed #3061AC;border-radius:4px;background:#eef6fc;color:#3061AC;font:inherit;font-weight:800;letter-spacing:.08em;cursor:pointer}
        .bf26-ctas{display:flex;gap:10px;margin-top:16px;flex-wrap:wrap}
        .bf26-btn{flex:1 1 180px;padding:13px 14px;border-radius:8px;text-align:center;font-weight:700;font-size:15px;text-decoration:none;transition:filter .15s}
        .bf26-btn:hover{filter:brightness(1.08)}
        .bf26-btn-main{border:2px solid #3061AC;background:#3061AC;color:#fff}
        .bf26-btn-line{border:2px solid #3061AC;color:#3061AC;background:#fff}
        .bf26-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
        @media (max-width:480px){.bf26-head{font-size:44px}.bf26-sail{width:46px;right:18px;bottom:auto;top:56px}}
        @media (prefers-reduced-motion:reduce){#bf26-box{animation:none}}
      `}</style>
    </div>
  )
}
