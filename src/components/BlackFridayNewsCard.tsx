import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from '../router'
import { useLang } from '../i18n'
import { BF_END, BF_CODE, bfText } from '../blackFriday'

// Top-News-Karte zur Black-Friday-Aktion (Startseite, ganz links).
// Der Countdown wird erst im Browser berechnet und beim Prerender (window.
// __PRERENDER__) bewusst ausgelassen: im statischen Snapshot steht deshalb
// keine veraltete Zahl, sondern nur "Nur bis 27. November". Nach dem Ende der Aktion rendert News.tsx die
// Karte gar nicht mehr (bfActive()).
function remaining() {
  const ms = Math.max(0, BF_END.getTime() - Date.now())
  const mins = Math.floor(ms / 60000)
  return { d: Math.floor(mins / 1440), h: Math.floor((mins % 1440) / 60), m: mins % 60 }
}

export default function BlackFridayNewsCard({ index = 0 }: { index?: number }) {
  const lang = useLang()
  const t = bfText[lang]
  const c = t.card
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // scripts/prerender.cjs setzt diese Kennung: kein Countdown im Snapshot
    if ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) return
    setLeft(remaining())
    const id = setInterval(() => setLeft(remaining()), 30000)
    return () => clearInterval(id)
  }, [])

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(BF_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch { /* Zwischenablage nicht verfuegbar: Code bleibt sichtbar */ }
  }

  return (
    <motion.article
      aria-labelledby="bfn-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="bfn-card"
    >
      <div className="bfn-vis">
        <img src="/images/events/black-friday-2026/freunde-im-wasser.webp" alt={c.imgAlt} width={900} height={675} loading="lazy" decoding="async" />
        <span className="bfn-tag"><i className="bfn-dot" aria-hidden="true" />{left ? c.cd(left.d, left.h, left.m) : c.kicker}</span>
        <span className="bfn-badge" aria-hidden="true"><b>{t.off}</b><small>{c.badge}</small></span>
        <div className="bfn-cap">
          <h3 id="bfn-title">{c.head}</h3>
          <p>{c.sub}</p>
        </div>
      </div>

      <div className="bfn-body">
        <p className="bfn-txt">{c.text}</p>
        <div className="bfn-code">
          <div><span>{c.codeLabel}</span><b>{BF_CODE}</b></div>
          <button type="button" onClick={copyCode} className="bfn-copy">{copied ? t.copied : (lang === 'en' ? 'Copy' : 'Kopieren')}</button>
        </div>
        <span className="bfn-sr" role="status" aria-live="polite">{copied ? t.srCopied : ''}</span>
        <Link to={t.pkHref} className="bfn-cta">{t.newsCta} →</Link>
        <Link to={t.planHref} className="bfn-sec">{t.ctaPlan}</Link>
      </div>

      <style>{`
        .bfn-card{display:flex;flex-direction:column;border-radius:14px;overflow:hidden;background:#fff;border:1px solid #dbe6f2;box-shadow:0 10px 34px rgba(7,27,47,.16)}
        .bfn-vis{position:relative;aspect-ratio:16/10;background:#0a1f3d;overflow:hidden}
        .bfn-vis img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 40%}
        .bfn-vis:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(7,27,47,.55) 0%,rgba(7,27,47,.12) 38%,rgba(7,27,47,.88) 100%)}
        .bfn-tag{position:absolute;z-index:2;top:14px;left:14px;display:flex;gap:6px;align-items:center;background:#fff;color:#0a2a52;font-weight:700;font-size:12px;padding:5px 11px;border-radius:20px}
        .bfn-dot{width:8px;height:8px;border-radius:50%;background:#e5484d;animation:bfn-pulse 1.6s infinite}
        @keyframes bfn-pulse{0%{box-shadow:0 0 0 0 rgba(229,72,77,.6)}70%{box-shadow:0 0 0 8px rgba(229,72,77,0)}100%{box-shadow:0 0 0 0 rgba(229,72,77,0)}}
        .bfn-badge{position:absolute;z-index:2;right:12px;top:12px;width:78px;height:78px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;transform:rotate(6deg);background:radial-gradient(circle at 30% 25%,#9fd2f2,#3a8fd0);color:#06203f;border:3px solid #fff;box-shadow:0 6px 18px rgba(0,0,0,.35)}
        .bfn-badge b{font-size:27px;line-height:1;font-weight:900}
        .bfn-badge small{font-size:9.5px;font-weight:700;letter-spacing:.08em}
        .bfn-cap{position:absolute;z-index:2;left:16px;right:16px;bottom:14px;color:#fff}
        .bfn-cap h3{margin:0;font-family:'DM Sans',sans-serif;font-size:clamp(1.45rem,6vw,1.75rem);line-height:1;font-weight:900;letter-spacing:.01em;color:#fff}
        .bfn-cap p{margin:5px 0 0;color:#a9d4f3;font-weight:700;font-size:.88rem}
        .bfn-body{padding:16px 18px 16px;display:flex;flex-direction:column;flex:1}
        .bfn-txt{margin:0 0 12px;color:#4b5b70;font-size:.88rem;line-height:1.55;flex:1}
        .bfn-code{display:flex;align-items:center;justify-content:space-between;gap:10px;border:2px dashed #3061AC;background:#eef6fc;border-radius:10px;padding:8px 12px;margin-bottom:12px}
        .bfn-code span{display:block;color:#5b6b80;font-size:12px}
        .bfn-code b{color:#3061AC;font-size:1.1rem;letter-spacing:.12em}
        .bfn-copy{border:0;background:#3061AC;color:#fff;font:700 13px 'DM Sans',sans-serif;padding:9px 13px;border-radius:7px;cursor:pointer;min-height:36px}
        .bfn-copy:hover{filter:brightness(1.1)}
        .bfn-copy:focus-visible,.bfn-cta:focus-visible,.bfn-sec:focus-visible{outline:3px solid #77B7E5;outline-offset:2px}
        .bfn-cta{display:block;text-align:center;background:#3061AC;color:#fff;font-weight:700;font-size:.95rem;padding:12px;border-radius:10px;box-shadow:0 6px 16px rgba(48,97,172,.35);transition:filter .15s}
        .bfn-cta:hover{filter:brightness(1.1)}
        .bfn-sec{display:block;text-align:center;color:#3061AC;font-weight:700;font-size:.85rem;margin-top:8px;padding:2px}
        .bfn-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
        @media (prefers-reduced-motion:reduce){.bfn-dot{animation:none}}
      `}</style>
    </motion.article>
  )
}
