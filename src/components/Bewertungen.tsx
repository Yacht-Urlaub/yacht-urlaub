import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Google-Rezensionen — wortgenau von den Original-Screenshots übernommen
const reviews = [
  {
    name: 'Gloria',
    color: '#d6336c',
    text: 'Wir wollten schon lange mal einen Segelurlaub machen, bisher scheiterte es aber immer an der Organisation. Bis ich auf Yacht-Urlaub gestoßen bin. Eine kurze E-Mail genügte und prompt wurden mir mehrere Törnvorschläge angeboten. Das Spezielle dabei war allerdings, dass wir zwei Taucher mit von der Partie hatten und das war bei einigen Anbietern bereits ein No-Go. Nicht so für Yacht-Urlaub und Manuel Göschl. Er hat uns gleich entsprechende Boote und das passende Reviere angeboten und war selbst von der Idee recht angetan. Dem entsprechend war es dann auch ein perfekter Urlaub für uns alle. Unsere Segelyacht war in einem Top-Zustand, alles war super organisiert und Manuel, der selbst unser Skipper war, immer bester Laune. Ich kann Yacht-Urlaub nur weiterempfehlen. Ihr habt die 5 Sterne voll verdient!',
  },
  {
    name: 'Markus und Alexandra',
    color: '#6741d9',
    text: "Es war ein super Segeltörn in Kroatien (Region Split-Dubrovnik). Einen besseren Skipper als Manuel G. kann man gar nicht bekommen. Sehr zuvorkommend, hilfsbereit und für jeden Scherz zu haben. Von der fachlichen Kompentenz und den lokalen örtlichen Kenntnissen, brauche ich gar nicht erst anfangen zu schreiben.... Einfach Perfekt! Wir freuen uns schon auf's nächste mal :-) Lg Markus",
  },
  {
    name: 'Reinhard',
    color: '#e8590c',
    text: 'Familientörn Kroatien Ende August haben wir eine Woche unter Manuels kompetenter Leitung auf See verbracht. Gestartet in Trogir steuerten wir zuerst den nördlichsten Punkt unserer Reise an (Sali), um dann über die großartigen Kornaten wieder zu unserem Ausgangspunkt zurückzukehren. Für uns als Familientörn war es die erste Reise dieser Art, und wir können es nur wärmstens weiterempfehlen. Besondere Highlights für uns: flexible Planung der Reiseroute, tolle Buchten, gutes Essen, gute Stimmung an Board, Einblicke ins Segeln. Danke Manuel, liebe Grüße, deine Bohnencrew ;)',
  },
  {
    name: 'Stefanie',
    color: '#0c8599',
    text: 'Wir hatten eine super Zeit bei unserem Kroatien Trip. Manuel war ein toller Skipper und hat auch im Vorfeld Spitzenarbeit geleistet und unseren Trip komplett organisiert. Wir waren alle Neulinge auf dem Gebiet und zum ersten Mal auf einem Segelboot unterwegs, aber selbst das war kein Problem und wir hatten eine supercoole Kroatien-Segel-Woche.',
  },
  {
    name: 'Alexandra',
    color: '#795548',
    text: 'Der Segeltörn in den Kornaten war ein wunderschöner Urlaub, weit ab vom Massentourismus! Unser Skipper Manuel ist sehr kompetent und ging auf unsere Wünsche bzgl. Ankerplätze wunderbar ein! Das war sicher nicht unser letzter Segeltörn und ich würde jederzeit wieder mit Manuel segeln. Hab mich gut betreut und jederzeit sicher gefühlt!',
  },
]

const Stars = () => (
  <div style={{ display: 'flex', gap: '2px', marginTop: '2px' }} aria-label="5 von 5 Sternen">
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#fbbc04">
        <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
)

export default function Bewertungen() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Auto-Rotation alle 8 Sekunden
  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setActive(a => (a + 1) % reviews.length), 8000)
    return () => clearInterval(t)
  }, [paused])

  const r = reviews[active]
  const initials = r.name.split(/\s+und\s+|\s+/).map(n => n[0]).slice(0, 2).join('')

  return (
    <section className="section" style={{ background: '#fff' }}>
      <div className="container" style={{ maxWidth: '920px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <img src="/images/Bewertungen/Google5star.webp" alt="5 Sterne auf Google" loading="lazy" style={{ height: '28px', marginBottom: '1rem' }}
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--navy)', marginBottom: '0.5rem' }}>
            Das sagen unsere Gäste ...
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: '0.9rem' }}>Echte Google-Rezensionen — im Original-Wortlaut.</p>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
        >
          {/* Zurück */}
          <button
            onClick={() => setActive(a => (a - 1 + reviews.length) % reviews.length)}
            aria-label="Vorherige Bewertung"
            className="review-arrow"
          >‹</button>

          {/* Card */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--gray-light)', borderRadius: '12px',
                  padding: 'clamp(1.5rem, 4vw, 2.5rem)', margin: 0,
                  boxShadow: '0 2px 20px rgba(7,27,47,0.07)',
                  minHeight: '260px', display: 'flex', flexDirection: 'column',
                }}
              >
                <figcaption style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.25rem' }}>
                  <span aria-hidden style={{
                    width: '52px', height: '52px', borderRadius: '50%', flexShrink: 0,
                    background: r.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 700, fontSize: '1.15rem',
                  }}>{initials}</span>
                  <span>
                    <span style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontWeight: 700, color: 'var(--navy)', fontSize: '1rem' }}>{r.name}</span>
                    <Stars />
                  </span>
                  <svg aria-label="Google" width="22" height="22" viewBox="0 0 24 24" style={{ marginLeft: 'auto', flexShrink: 0, opacity: 0.85 }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </figcaption>
                <blockquote style={{ margin: 0, color: '#444', fontSize: '0.95rem', lineHeight: 1.85 }}>
                  {r.text}
                </blockquote>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Weiter */}
          <button
            onClick={() => setActive(a => (a + 1) % reviews.length)}
            aria-label="Nächste Bewertung"
            className="review-arrow"
          >›</button>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '1.5rem' }}>
          {reviews.map((rev, i) => (
            <button
              key={rev.name + i}
              onClick={() => setActive(i)}
              aria-label={`Bewertung ${i + 1} anzeigen`}
              style={{
                width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px',
                border: 'none', cursor: 'pointer', padding: 0,
                background: i === active ? 'var(--blue)' : 'var(--gray-mid)',
                transition: 'all 0.25s',
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="https://www.google.com/search?q=yacht-urlaub.net+bewertungen" target="_blank" rel="noopener noreferrer"
            className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>
            Alle Bewertungen auf Google lesen →
          </a>
        </div>
      </div>

      <style>{`
        .review-arrow {
          width: 42px; height: 42px; border-radius: 50%; flex-shrink: 0;
          border: 1.5px solid var(--gray-mid); background: #fff;
          color: var(--blue); font-size: 1.5rem; line-height: 1;
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center;
        }
        .review-arrow:hover { background: var(--blue); color: #fff; border-color: var(--blue); }
        @media (max-width: 640px) { .review-arrow { display: none; } }
      `}</style>
    </section>
  )
}
