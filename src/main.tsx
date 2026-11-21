import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import './prerendered'
import './index.css'
import App from './App.tsx'

// Nach einem neuen Deploy gibt es die alten JS-Chunks (Datei-Hashes) nicht mehr: ein
// noch offener Tab, der dann eine Seite nachladen will, scheitert sonst und bleibt
// leer. Einmal neu laden holt die aktuelle Version (sessionStorage-Sperre gegen
// Endlosschleifen, z. B. bei dauerhaft fehlender Verbindung).
window.addEventListener('vite:preloadError', () => {
  try {
    if (sessionStorage.getItem('chunk-reload')) return
    sessionStorage.setItem('chunk-reload', '1')
  } catch { /* Speicher gesperrt: trotzdem einmal neu laden */ }
  window.location.reload()
})

// Lief die Seite danach einige Sekunden fehlerfrei, darf ein spaeterer Fehler wieder neu laden.
window.addEventListener('load', () => {
  setTimeout(() => { try { sessionStorage.removeItem('chunk-reload') } catch { /* egal */ } }, 5000)
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
