import { useState } from 'react'

/** Klick-zum-Abspielen-Platzhalter: lädt kein YouTube-iFrame (und damit keine Cookies/Tracking-Requests),
 * bevor der Nutzer aktiv klickt. Kein Autoplay, keine Blockierung anderer Seitenfunktionen. */
export default function YouTubeFacade({ videoId, title, start = 0 }: { videoId: string; title: string; start?: number }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div style={{ maxWidth: '640px', margin: '1.75rem auto' }}>
      <div style={{ position: 'relative', aspectRatio: '16 / 9', borderRadius: '6px', overflow: 'hidden', background: '#000', boxShadow: '0 2px 14px rgba(0,0,0,0.15)' }}>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?start=${start}&autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label={`Video abspielen: ${title}`}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', padding: 0, cursor: 'pointer', background: 'none' }}
          >
            <img
              src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
            />
            <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>
              <span style={{ width: '68px', height: '68px', borderRadius: '50%', background: 'rgba(214,30,30,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 18px rgba(0,0,0,0.35)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </span>
          </button>
        )}
      </div>
      {title && (
        <p style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.4rem', fontStyle: 'italic', textAlign: 'center' }}>{title}</p>
      )}
    </div>
  )
}
