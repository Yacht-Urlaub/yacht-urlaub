import SEO from '../components/SEO'

export default function AgbPage() {

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="AGB – Allgemeine Geschäftsbedingungen"
        description="Allgemeine Geschäftsbedingungen von YACHT-URLAUB Ing. Manuel Göschl, MBA. Unsere AGB stehen als PDF zum Download bereit."
      />

      {/* Header Banner */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Rechtliches</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>Allgemeine Geschäftsbedingungen</h1>
        </div>
      </div>

      {/* Content */}
      <section style={{ background: '#fff', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>

            {/* PDF Download */}
            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                Unsere Allgemeinen Geschäftsbedingungen stehen Ihnen als PDF zum Download bereit.
              </p>
              <a
                href="/agb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                AGB als PDF herunterladen →
              </a>
            </div>

            {/* Acceptance note */}
            <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: '1.25rem', marginBottom: '3rem' }}>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85 }}>
                Mit der Buchung einer Reise oder Dienstleistung über YACHT-URLAUB akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen. Wir empfehlen Ihnen, die AGB vor der Buchung sorgfältig zu lesen.
              </p>
            </div>

            {/* Contact */}
            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                Fragen zu unseren AGB?
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85, marginBottom: '0.5rem' }}>
                Bei Fragen stehen wir Ihnen gerne zur Verfügung:
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85 }}>
                <a href="tel:+43199715820" style={{ color: 'var(--blue)', fontWeight: 600 }}>+43 1 997 15 82</a>
                {' '}|{' '}
                <a href="mailto:info@yacht-urlaub.net" style={{ color: 'var(--blue)', fontWeight: 600 }}>info@yacht-urlaub.net</a>
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                Mo–Fr: 10:00–19:00 Uhr &nbsp;·&nbsp; Sa: 13:00–17:00 Uhr
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
