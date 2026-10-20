import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export type LightboxImage = { src: string; alt: string }
export type LightboxState = { images: LightboxImage[]; index: number }

// Gemeinsame Bild-Vergrößerung fuer die Kabinen-Angebotskarten (Koh Chang,
// Phuket, Dubrovnik). Gleiches Muster wie die Galerie-Lightbox auf
// PackageDetailPage.tsx, hier aber generisch fuer beliebige Bildgruppen
// (Intro-Foto, Skipper-Portrait, Galerie, Yacht-Detailfotos, Grundriss,
// Routenkarte) nutzbar.
export default function Lightbox({
  state, onClose, onPrev, onNext, label,
}: {
  state: LightboxState | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  label: string
}) {
  useEffect(() => {
    if (!state) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && state.images.length > 1) onPrev()
      if (e.key === 'ArrowRight' && state.images.length > 1) onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, onClose, onPrev, onNext])

  const multi = !!state && state.images.length > 1

  return (
    <AnimatePresence>
      {state && (
        <motion.div
          role="dialog" aria-modal="true" aria-label={label}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {multi && (
            <button type="button" onClick={e => { e.stopPropagation(); onPrev() }}
              aria-label="Vorheriges Bild"
              style={{ position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', zIndex: 1 }}>‹</button>
          )}
          <motion.img
            key={state.index}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.2 }}
            src={state.images[state.index].src} alt={state.images[state.index].alt}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '82vh', objectFit: 'contain', borderRadius: '2px' }}
          />
          {multi && (
            <button type="button" onClick={e => { e.stopPropagation(); onNext() }}
              aria-label="Nächstes Bild"
              style={{ position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: '2.5rem', cursor: 'pointer', padding: '8px 16px', borderRadius: '4px', zIndex: 1 }}>›</button>
          )}
          <button type="button" onClick={onClose} aria-label="Schließen"
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
          {multi && (
            <p style={{ position: 'absolute', bottom: '1.5rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textAlign: 'center', width: '100%' }}>
              {state.images[state.index].alt} &nbsp;·&nbsp; {state.index + 1} / {state.images.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
