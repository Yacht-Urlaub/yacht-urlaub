import { useEffect } from 'react'
import SEO from '../components/SEO'

export default function DatenschutzPage() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const headingStyle: React.CSSProperties = {
    fontFamily: 'Playfair Display, serif',
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
    marginBottom: '0.75rem',
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="Datenschutzerklärung"
        description="Datenschutzerklärung von Yacht-Urlaub gemäß DSGVO. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten."
        canonical="/datenschutz"
      />

      {/* Header Banner */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Rechtliches</p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>Datenschutzerklärung</h1>
        </div>
      </div>

      {/* Content */}
      <section style={{ background: '#fff', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>

            {/* 1. Verantwortlicher */}
            <h2 style={headingStyle}>1. Verantwortlicher</h2>
            <p style={textStyle}>
              <strong>YACHT-URLAUB Ing. Manuel Göschl, MBA</strong><br />
              Lassallestraße 7b, 1020 Wien, Österreich<br />
              E-Mail: <a href="mailto:info@yacht-urlaub.net" style={{ color: 'var(--blue)' }}>info@yacht-urlaub.net</a><br />
              Telefon: <a href="tel:+43199715820" style={{ color: 'var(--blue)' }}>+43 1 997 15 82</a>
            </p>

            <div style={dividerStyle} />

            {/* 2. Erhebung */}
            <h2 style={headingStyle}>2. Erhebung und Verwendung personenbezogener Daten</h2>
            <p style={textStyle}>
              Wir erheben personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienstleistungen erforderlich ist oder Sie uns diese freiwillig übermitteln. Dies geschieht insbesondere in folgenden Fällen:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Kontaktformular:</strong> Name, E-Mail-Adresse, Telefonnummer, Reisedaten und Nachricht. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Newsletter-Anmeldung:</strong> E-Mail-Adresse sowie ggf. Vorname. Die Verarbeitung erfolgt auf Basis Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Cookies:</strong> Technische und analytische Cookies zur Optimierung unseres Angebots.</li>
            </ul>

            <div style={dividerStyle} />

            {/* 3. Cookies */}
            <h2 style={headingStyle}>3. Cookies</h2>
            <p style={textStyle}>
              Wir verwenden Cookies zur Wiedererkennung und Optimierung unseres Angebots. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch notwendig, andere helfen uns dabei, das Nutzungsverhalten zu analysieren und unser Angebot zu verbessern.
            </p>
            <p style={textStyle}>
              Sie können Cookies in Ihrem Browser jederzeit deaktivieren oder löschen. Bitte beachten Sie, dass die Deaktivierung bestimmter Cookies die Funktionalität der Website einschränken kann.
            </p>

            <div style={dividerStyle} />

            {/* 4. Google Analytics */}
            <h2 style={headingStyle}>4. Google Analytics</h2>
            <p style={textStyle}>
              Diese Website verwendet Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies, um eine Analyse der Benutzung der Website zu ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
            </p>
            <p style={textStyle}>
              Auf dieser Website ist IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.
            </p>
            <p style={textStyle}>
              Sie können der Erfassung durch Google Analytics widersprechen, indem Sie das Browser-Add-on zur Deaktivierung von Google Analytics herunterladen und installieren:{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>

            <div style={dividerStyle} />

            {/* 5. Newsletter */}
            <h2 style={headingStyle}>5. Newsletter</h2>
            <p style={textStyle}>
              Unser Newsletter-Versand erfolgt über das Double Opt-in Verfahren. Das bedeutet, dass wir Ihnen erst dann einen Newsletter per E-Mail zusenden, wenn Sie ausdrücklich bestätigt haben, dass Sie den Newsletter-Service aktivieren möchten.
            </p>
            <p style={textStyle}>
              Für den Versand unseres Newsletters nutzen wir den Dienst Mailchimp der Rocket Science Group LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA. Ihre E-Mail-Adresse und weitere für den Newsletter-Versand relevante Daten werden auf Servern von Mailchimp gespeichert.
            </p>
            <p style={textStyle}>
              Eine Abmeldung vom Newsletter ist jederzeit möglich. Einen entsprechenden Link finden Sie am Ende jedes Newsletters.
            </p>

            <div style={dividerStyle} />

            {/* 6. Social Media */}
            <h2 style={headingStyle}>6. Social Media</h2>
            <p style={textStyle}>
              Auf unserer Website befinden sich Verlinkungen zu folgenden sozialen Netzwerken:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}>Facebook (<a href="https://facebook.com/yachturlaub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>facebook.com/yachturlaub</a>)</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}>Instagram</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}>YouTube</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}>LinkedIn</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}>XING</li>
            </ul>
            <p style={textStyle}>
              Beim Klick auf einen der Verlinkungsbuttons werden Sie direkt zur jeweiligen Plattform weitergeleitet. Beim Aufruf der jeweiligen Seite gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Wir haben keinen Einfluss auf die erhobenen Daten und Datenverarbeitungsvorgänge der sozialen Netzwerke.
            </p>

            <div style={dividerStyle} />

            {/* 7. Zahlungsabwicklung */}
            <h2 style={headingStyle}>7. Zahlungsabwicklung</h2>
            <p style={textStyle}>
              Für die Abwicklung von Zahlungen nutzen wir folgende Zahlungsdienstleister: PayPal, Sofortüberweisung/Klarna, Visa, Mastercard und American Express (AMEX). Die Übertragung Ihrer Zahlungsdaten erfolgt verschlüsselt. Wir haben keinen Zugriff auf Ihre vollständigen Zahlungsdaten — diese werden ausschließlich durch den jeweiligen Zahlungsdienstleister verarbeitet. Es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
            </p>

            <div style={dividerStyle} />

            {/* 8. Ihre Rechte */}
            <h2 style={headingStyle}>8. Ihre Rechte</h2>
            <p style={textStyle}>
              Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:
            </p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Auskunft</strong> über die bei uns gespeicherten personenbezogenen Daten</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Berichtigung</strong> unrichtiger oder unvollständiger Daten</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Löschung</strong> Ihrer bei uns gespeicherten Daten</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Einschränkung der Verarbeitung</strong> Ihrer Daten</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Datenübertragbarkeit</strong> in einem gängigen, maschinenlesbaren Format</li>
              <li style={{ ...textStyle, marginBottom: '0.35rem' }}><strong>Widerspruch</strong> gegen die Verarbeitung Ihrer Daten</li>
            </ul>
            <p style={textStyle}>
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{' '}
              <a href="mailto:info@yacht-urlaub.net" style={{ color: 'var(--blue)' }}>info@yacht-urlaub.net</a>
            </p>

            <div style={dividerStyle} />

            {/* 9. Datensicherheit */}
            <h2 style={headingStyle}>9. Datensicherheit</h2>
            <p style={textStyle}>
              Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>

            <div style={dividerStyle} />

            {/* 10. Änderungen */}
            <h2 style={headingStyle}>10. Änderungen dieser Datenschutzerklärung</h2>
            <p style={textStyle}>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--gray)', marginTop: '2rem' }}>Stand: März 2026</p>

          </div>
        </div>
      </section>
    </main>
  )
}
