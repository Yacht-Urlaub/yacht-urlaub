import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const faqs = [
  {
    cat: 'Allgemein',
    items: [
      { q: 'Brauche ich Segelerfahrung für einen Törn?', a: 'Nein! Unsere Skippered-Törns sind ideal für Einsteiger. Der erfahrene Skipper übernimmt die Navigation — Sie lernen so viel oder so wenig wie Sie möchten. Wer selbst segeln möchte, benötigt einen entsprechenden Segelschein.' },
      { q: 'Wie viele Personen passen auf eine Yacht?', a: 'Je nach Yachtgröße zwischen 4 und 12 Personen. Bei Gruppenreisen empfehlen wir 6-8 Personen für maximalen Komfort. Wir helfen Ihnen, die passende Yacht für Ihre Gruppe zu finden.' },
      { q: 'Was ist im Törn-Preis enthalten?', a: 'In der Regel sind enthalten: die Yacht mit Skipper, Bettwäsche und Handtücher, Versicherung sowie je nach Paket auch Halbpension. Getränke, Hafengebühren und persönliche Ausgaben sind separat.' },
      { q: 'Wann ist die beste Reisezeit?', a: 'Das hängt von der Destination ab. In Kroatien und Griechenland ist Mai bis September ideal. In der Karibik ist November bis April die beste Saison. Auf den Seychellen empfehlen wir April-Mai oder Oktober-November.' },
    ]
  },
  {
    cat: 'Buchung & Zahlung',
    items: [
      { q: 'Wie buche ich einen Törn?', a: 'Am einfachsten über unser Kontaktformular oder telefonisch. Wir beraten Sie persönlich und erstellen ein individuelles Angebot. Danach erhalten Sie eine Buchungsbestätigung und Rechnung.' },
      { q: 'Welche Zahlungsmethoden akzeptieren Sie?', a: 'Wir akzeptieren Überweisung, Kreditkarte (Visa, Mastercard) und PayPal. In der Regel ist eine Anzahlung von 30% bei Buchung fällig, der Rest 8 Wochen vor Abreise.' },
      { q: 'Was passiert bei einer Stornierung?', a: 'Unsere Stornobedingungen sind in den AGB geregelt. Bei Stornierung bis 60 Tage vor Abreise fallen 30% Stornogebühr an, danach 50-100%. Wir empfehlen eine Reiserücktrittsversicherung.' },
      { q: 'Kann ich den Törn umbuchen?', a: 'Umbuchungen sind grundsätzlich möglich, sofern noch Plätze verfügbar sind. Kontaktieren Sie uns so früh wie möglich — wir finden gemeinsam eine Lösung.' },
    ]
  },
  {
    cat: 'An Bord',
    items: [
      { q: 'Was muss ich mitnehmen?', a: 'Wir empfehlen: leichte Kleidung, Badebekleidung, Sonnenschutz, Segelhandschuhe, rutschfeste Schuhe und eine Windjacke. Eine detaillierte Packliste erhalten Sie nach der Buchung.' },
      { q: 'Gibt es auf der Yacht WLAN?', a: 'Viele unserer Yachten haben WLAN an Bord. In abgelegenen Buchten kann die Verbindung jedoch schwach sein — das ist Teil des echten Segelerlebnisses! Lokale SIM-Karten empfehlen sich als Backup.' },
      { q: 'Sind Haustiere erlaubt?', a: 'In Einzelfällen und nach Absprache. Bitte kontaktieren Sie uns vorab — wir klären das mit dem jeweiligen Skipper und der Charter-Gesellschaft.' },
      { q: 'Was passiert bei schlechtem Wetter?', a: 'Sicherheit hat oberste Priorität. Bei schlechtem Wetter bleiben wir im Hafen oder suchen eine geschützte Bucht auf. Der Skipper trifft alle Entscheidungen zur Sicherheit der Crew.' },
    ]
  },
  {
    cat: 'Charter',
    items: [
      { q: 'Welchen Segelschein brauche ich für Bareboat-Charter?', a: 'In den meisten Revieren ist ein anerkannter Segelschein (z.B. SKS, SRC) und Logbuch-Nachweis erforderlich. Gerne beraten wir Sie, welcher Schein für Ihr gewünschtes Revier nötig ist.' },
      { q: 'Kann ich eine Yacht auch ohne Skipper chartern?', a: 'Ja, Bareboat-Charter ist möglich wenn Sie über den entsprechenden Segelschein und Erfahrung verfügen. Alternativ bieten wir Co-Skipper-Service an.' },
    ]
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-mid)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '1.25rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: open ? 'var(--blue)' : 'var(--navy)', lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: '1.2rem', color: 'var(--blue)', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.25rem', color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.8 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
}

export default function FaqPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="FAQ – Häufige Fragen zu Yachtreisen"
        description="Antworten auf die häufigsten Fragen: Brauche ich Segelerfahrung? Was kostet ein Törn? Welcher Segelschein? Alles über Buchung, An Bord und Charter bei Yacht-Urlaub."
        canonical="/faq"
        schema={faqSchema}
      />
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Häufige Fragen</p>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>FAQ</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '500px', lineHeight: 1.8 }}>
            Antworten auf die häufigsten Fragen rund um Ihren Yacht-Urlaub. Nicht gefunden? Kontaktieren Sie uns direkt.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {faqs.map((cat, i) => (
            <motion.div
              key={cat.cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ marginBottom: '3rem' }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--blue)' }}>
                {cat.cat}
              </h2>
              {cat.items.map(item => <FaqItem key={item.q} {...item} />)}
            </motion.div>
          ))}

          {/* CTA */}
          <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '2.5rem', textAlign: 'center', marginTop: '2rem' }}>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
              Noch Fragen?
            </h3>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Wir beraten Sie gerne persönlich — telefonisch oder per E-Mail.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-navy">+43 1 997 15 82</a>
              <Link to="/#kontakt" className="btn btn-primary">Nachricht senden →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
