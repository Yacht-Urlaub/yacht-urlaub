// Suspense-Fallback fuer lazy-geladene Routen (siehe App.tsx). Wird nur
// echten Browsern kurz angezeigt, waehrend ein Seiten-Chunk nachlaedt —
// Crawler bekommen ausschliesslich die fertig vorgerenderten Snapshots zu
// sehen (scripts/prerender.cjs wartet den Seitenaufbau ab, bevor es
// schreibt), daher ist dieser Ladezustand fuer SEO irrelevant.
export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-label="Seite wird geladen">
      <img src="/logo-icon-loader.png" alt="" className="page-loader-icon" />
      <style>{`
        .page-loader {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          padding: 4rem 0;
        }
        .page-loader-icon {
          width: 44px;
          height: auto;
          transform-origin: 85% 100%;
          animation: page-loader-sway 1.8s ease-in-out infinite;
        }
        @keyframes page-loader-sway {
          0%, 100% { transform: rotate(-7deg); }
          50% { transform: rotate(7deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .page-loader-icon { animation: none; }
        }
      `}</style>
    </div>
  )
}
