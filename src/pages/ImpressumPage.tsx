import SEO from '../components/SEO'

export default function ImpressumPage() {

  const headingStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    color: 'var(--navy)',
    fontSize: '1.1rem',
    marginBottom: '0.75rem',
    marginTop: '0',
  }

  const dividerStyle: React.CSSProperties = {
    borderTop: '1px solid #e2e8f0',
    margin: '2rem 0',
  }

  const textStyle: React.CSSProperties = {
    fontSize: '0.92rem',
    color: 'var(--text)',
    lineHeight: 1.85,
    marginBottom: '0.4rem',
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Impressum"
        description="Impressum und rechtliche Angaben von YACHT-URLAUB Ing. Manuel Göschl, MBA"
      />

      {/* Header Banner */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Rechtliches</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>Impressum</h1>
        </div>
      </div>

      {/* Content */}
      <section style={{ background: '#fff', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>

            <h2 style={headingStyle}>Angaben gemäß § 5 ECG</h2>
            <p style={textStyle}><strong>YACHT-URLAUB Ing. Manuel Göschl, MBA</strong></p>
            <p style={textStyle}>Unternehmensform: Einzelunternehmen</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Büro Wien</h2>
            <p style={textStyle}>Lassallestraße 7b</p>
            <p style={textStyle}>1020 Wien, Österreich</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Geschäftsführung</h2>
            <p style={textStyle}>Kühlhofberg 399</p>
            <p style={textStyle}>3970 Weitra, Österreich</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Kroatien-Büro</h2>
            <p style={textStyle}>Marsala Tita</p>
            <p style={textStyle}>51 410 Opatija, Kroatien</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Kontakt</h2>
            <p style={textStyle}>Telefon: <a href="tel:+43199715820" style={{ color: 'var(--blue)' }}>+43 1 997 15 82</a></p>
            <p style={textStyle}>WhatsApp: <a href="https://wa.me/436602652481" style={{ color: 'var(--blue)' }}>+43 660 2652481</a></p>
            <p style={textStyle}>E-Mail: <a href="mailto:info@yacht-urlaub.net" style={{ color: 'var(--blue)' }}>info@yacht-urlaub.net</a></p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Öffnungszeiten</h2>
            <p style={textStyle}>Mo–Fr: 10:00–19:00 Uhr</p>
            <p style={textStyle}>Sa: 13:00–17:00 Uhr</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Haftungsausschluss</h2>
            <p style={textStyle}>
              Der Betreiber behält sich das Recht vor, Inhalte oder Design der Website ohne Vorankündigung zu ändern. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Urheberrecht</h2>
            <p style={textStyle}>
              Alle Inhalte dieser Website unterliegen dem Urheberrecht. Die Verwendung von Texten und Bildern zur Veröffentlichung, Vervielfältigung oder kommerziellen Nutzung ist ohne schriftliche Genehmigung untersagt.
            </p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>Online-Streitbeilegung</h2>
            <p style={textStyle}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p style={textStyle}>
              Wir sind bereit, an außergerichtlichen Schlichtungsverfahren teilzunehmen.
            </p>

          </div>
        </div>
      </section>
    </main>
  )
}
