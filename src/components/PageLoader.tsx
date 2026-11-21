import { useEffect, useState } from 'react'
import { useLang } from '../i18n'

// Suspense-Fallback fuer lazy-geladene Routen (siehe App.tsx). Wird nur
// echten Browsern angezeigt, waehrend ein Seiten-Chunk nachlaedt —
// Crawler bekommen ausschliesslich die fertig vorgerenderten Snapshots zu
// sehen (scripts/prerender.cjs wartet den Seitenaufbau ab, bevor es
// schreibt), daher ist dieser Ladezustand fuer SEO irrelevant.
//
// Aufbau fuer den Fall "langsame Verbindung":
//  - Der Loader blendet erst nach 250 ms ein: bei schnellen Seitenwechseln
//    flackert so nichts.
//  - Danach in Stufen kurze Texte (2,5 s / 7 s / 15 s), damit das Warten nicht
//    nach Stillstand aussieht; nach 15 s gibt es einen Ausweg (neu laden / anrufen).
//  - Logo in den Markenfarben (Maske + Verlauf), animierter Ring statt Schwanken.
const T = {
  de: {
    label: 'Seite wird geladen',
    s1: 'Wir setzen die Segel …',
    s2: 'Gleich geht es los – die Verbindung ist gerade etwas langsam.',
    s3: 'Das dauert länger als gewöhnlich.',
    reload: 'Seite neu laden',
    call: 'Oder rufen Sie uns an:',
  },
  en: {
    label: 'Loading page',
    s1: 'Hoisting the sails …',
    s2: 'Almost there – the connection is a little slow right now.',
    s3: 'This is taking longer than usual.',
    reload: 'Reload page',
    call: 'Or call us:',
  },
}

export default function PageLoader() {
  const t = T[useLang()]
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 2500),
      setTimeout(() => setStage(2), 7000),
      setTimeout(() => setStage(3), 15000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  const text = stage === 1 ? t.s1 : stage === 2 ? t.s2 : stage === 3 ? t.s3 : ''

  return (
    <div className="page-loader" role="status" aria-live="polite">
      <div className="pl-ring" aria-hidden="true">
        <svg className="pl-svg" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="pl-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#77B7E5" />
              <stop offset="100%" stopColor="#0275b2" />
            </linearGradient>
          </defs>
          <circle className="pl-track" cx="60" cy="60" r="54" />
          <circle className="pl-arc" cx="60" cy="60" r="54" pathLength="100" stroke="url(#pl-grad)" />
        </svg>
        <span className="pl-sail" />
      </div>

      <span className="pl-sr">{t.label}</span>
      {text && <p key={stage} className="pl-text">{text}</p>}

      {stage === 3 && (
        <div className="pl-help">
          <button type="button" className="btn btn-primary pl-reload" onClick={() => window.location.reload()}>
            {t.reload}
          </button>
          <p className="pl-call">
            {t.call} <a href="tel:+43199715820">+43 1 997 15 82</a>
          </p>
        </div>
      )}

      <style>{`
        .page-loader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.25rem;
          min-height: 70vh;
          padding: 4rem 1.5rem;
          text-align: center;
          animation: pl-in 0.35s ease 0.25s both;
        }
        @keyframes pl-in { from { opacity: 0; } to { opacity: 1; } }

        .pl-ring { position: relative; width: 112px; height: 112px; }
        .pl-svg { width: 100%; height: 100%; animation: pl-spin 1.6s linear infinite; }
        .pl-track { fill: none; stroke: #dbe6f2; stroke-width: 5; }
        .pl-arc {
          fill: none; stroke-width: 5; stroke-linecap: round;
          stroke-dasharray: 8 92;
          animation: pl-dash 1.6s ease-in-out infinite;
        }
        @keyframes pl-spin { to { transform: rotate(360deg); } }
        @keyframes pl-dash {
          0%   { stroke-dasharray: 6 94;  stroke-dashoffset: 0; }
          50%  { stroke-dasharray: 52 48; stroke-dashoffset: -22; }
          100% { stroke-dasharray: 6 94;  stroke-dashoffset: -100; }
        }

        /* Segel-Logo in Markenfarben: das vorhandene PNG dient als Maske, gefuellt
           mit einem Verlauf (Hellblau -> Seitenblau -> Logoblau). */
        .pl-sail {
          position: absolute; left: 50%; top: 50%;
          width: 34px; height: 72px;
          transform: translate(-50%, -50%);
          background: linear-gradient(180deg, #77B7E5 0%, #0275b2 58%, #3061AC 100%);
          -webkit-mask: url(/logo-icon-loader.png) center / contain no-repeat;
          mask: url(/logo-icon-loader.png) center / contain no-repeat;
        }

        .pl-text {
          margin: 0; max-width: 22rem; min-height: 1.5em;
          color: var(--gray); font-size: 0.95rem; line-height: 1.5;
          animation: pl-fade 0.5s ease both;
        }
        @keyframes pl-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        .pl-help { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; animation: pl-fade 0.5s ease both; }
        .pl-reload { font-size: 0.85rem; padding: 11px 28px; }
        .pl-call { margin: 0; color: var(--gray); font-size: 0.85rem; }
        .pl-call a { color: var(--blue); font-weight: 700; }

        .pl-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

        @media (prefers-reduced-motion: reduce) {
          .page-loader { animation: none; }
          .pl-svg, .pl-arc, .pl-text, .pl-help { animation: none; }
          .pl-arc { stroke-dasharray: 30 70; }
        }
      `}</style>
    </div>
  )
}
