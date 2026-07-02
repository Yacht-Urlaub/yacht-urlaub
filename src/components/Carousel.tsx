import { useState } from 'react'

type Slide = { x: string; c?: string }

const arrowBase: React.CSSProperties = {
  position: 'absolute', top: '50%', transform: 'translateY(-50%)',
  width: '38px', height: '38px', borderRadius: '50%', border: 'none',
  background: 'rgba(7,27,47,0.6)', color: '#fff', fontSize: '1.35rem', lineHeight: 1,
  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
}

/** Kompaktes Bilder-Karussell (max-width, zentriert). Bei 1 Bild ohne Steuerung. */
export default function Carousel({ images, onOpen, maxWidth = 640 }: { images: Slide[]; onOpen?: (src: string) => void; maxWidth?: number }) {
  const [idx, setIdx] = useState(0)
  if (!images.length) return null
  const n = images.length
  const cur = images[idx % n]
  const multi = n > 1
  return (
    <div style={{ maxWidth: `${maxWidth}px`, margin: '1.75rem auto' }}>
      <div style={{ position: 'relative' }}>
        <figure style={{ margin: 0 }}>
          <img
            key={idx}
            src={cur.x}
            alt={cur.c || ''}
            loading="lazy"
            onClick={() => onOpen?.(cur.x)}
            style={{ width: '100%', borderRadius: '6px', display: 'block', cursor: onOpen ? 'zoom-in' : 'default', boxShadow: '0 2px 14px rgba(0,0,0,0.1)' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          {cur.c && (
            <figcaption style={{ color: 'var(--gray)', fontSize: '0.78rem', marginTop: '0.4rem', fontStyle: 'italic', textAlign: 'center' }}>{cur.c}</figcaption>
          )}
        </figure>
        {multi && (
          <>
            <button onClick={() => setIdx(i => (i - 1 + n) % n)} aria-label="Vorheriges Bild" style={{ ...arrowBase, left: '0.5rem' }}>‹</button>
            <button onClick={() => setIdx(i => (i + 1) % n)} aria-label="Nächstes Bild" style={{ ...arrowBase, right: '0.5rem' }}>›</button>
          </>
        )}
      </div>
      {multi && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '0.75rem' }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)} aria-label={`Bild ${i + 1}`}
              style={{ width: (idx % n) === i ? '22px' : '8px', height: '8px', borderRadius: '4px', border: 'none', cursor: 'pointer', padding: 0, background: (idx % n) === i ? 'var(--blue)' : 'var(--gray-mid)', transition: 'all 0.25s' }} />
          ))}
        </div>
      )}
    </div>
  )
}
