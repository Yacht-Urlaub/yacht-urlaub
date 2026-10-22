import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n'

// Zeitlich begrenztes Ankündigungs-Popup für ein einzelnes Event.
// Erscheint einmal pro Browser-Session (sessionStorage) und nur bis zum
// Anmeldeschluss. Für ein neues Event: STORAGE_KEY, ANMELDESCHLUSS und
// den Inhalt unten anpassen (oder die Komponente duplizieren).
const STORAGE_KEY = 'yu_event_popup_seen_sail-into-the-seasons-2026'
const ANMELDESCHLUSS = new Date('2026-11-07T23:59:59')

const ep = {
  de: {
    bildAlt: "Einladung zum Event „Sail into the Seasons – Vienna Edition“: Segelfeeling mitten in Wien am 14. November 2026, Einlass 13:30 Uhr, im District Living Vienna, Donau-City-Straße 3, 1220 Wien. Mit Tombola und Rum-Verkostung von Rumzentrum.at, Teilnahme kostenlos, Anmeldung bis 7. November 2026 erforderlich.",
    titel: 'Jetzt Platz sichern – Teilnahme gratis',
    frist: 'Anmeldung bitte bis 7.11.2026',
    button: 'Zur Anmeldung',
    schliessen: 'Popup schließen',
    label: 'Sail into the Seasons – Vienna Edition',
  },
  en: {
    bildAlt: "Invitation to the 'Sail into the Seasons – Vienna Edition' event: sailing feeling in the heart of Vienna on 14 November 2026, doors open 1:30 pm, at District Living Vienna, Donau-City-Straße 3, 1220 Vienna. Includes a raffle and rum tasting by Rumzentrum.at, free admission, registration required by 7 November 2026.",
    titel: 'Reserve your spot now – free to attend',
    frist: 'Please register by 7 Nov 2026',
    button: 'Register now',
    schliessen: 'Close popup',
    label: 'Sail into the Seasons – Vienna Edition',
  },
}

export default function EventPopup() {
  const lang = useLang()
  const t = ep[lang]
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (new Date() > ANMELDESCHLUSS) return
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch {}
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  function close() {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, '1')
    } catch {}
  }

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog" aria-modal="true" aria-label={t.label}
          style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        >
          <motion.button
            type="button" aria-label={t.schliessen} onClick={close}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, padding: 0, background: 'rgba(7,27,47,0.7)', cursor: 'pointer' }}
          />
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', width: '100%', maxWidth: 880, maxHeight: 'calc(100vh - 32px)', overflow: 'auto', background: '#fff', borderRadius: 6, boxShadow: '0 24px 64px rgba(7,27,47,0.35)' }}
          >
            <picture>
              <source media="(max-width: 700px)" srcSet="/images/events/sail-into-the-seasons-2026/event-hochformat.webp" />
              <img
                src="/images/events/sail-into-the-seasons-2026/event-querformat.webp"
                alt={t.bildAlt}
                style={{ display: 'block', width: '100%', height: 'auto' }}
              />
            </picture>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px 24px', padding: '20px 24px', flexWrap: 'wrap' }}>
              <div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--navy)' }}>{t.titel}</p>
                <p style={{ margin: '2px 0 0', fontSize: 14, color: '#64748b' }}>{t.frist}</p>
              </div>
              <a
                href="https://form.jotform.com/262641756081055" target="_blank" rel="noopener"
                onClick={close}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, minHeight: 52, padding: '0 28px', background: 'var(--gold)', color: 'var(--navy)', fontSize: 17, fontWeight: 700, textDecoration: 'none', borderRadius: 6, whiteSpace: 'nowrap' }}
              >
                {t.button}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" /><path d="M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <button
              type="button" onClick={close} aria-label={t.schliessen}
              style={{ position: 'absolute', top: 12, right: 12, width: 44, height: 44, borderRadius: '50%', border: 0, background: '#fff', color: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(7,27,47,0.3)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12" /><path d="M18 6L6 18" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
