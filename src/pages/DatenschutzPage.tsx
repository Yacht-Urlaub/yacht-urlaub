import SEO from '../components/SEO'
import { useLang, MAIL } from '../i18n'

const dse = {
  de: {
    seoTitle: 'Datenschutzerklärung',
    seoDesc: 'Datenschutzerklärung von Yacht-Urlaub gemäß DSGVO. Informationen zur Erhebung, Verarbeitung und Nutzung personenbezogener Daten.',
    tag: 'Rechtliches', h1: 'Datenschutzerklärung',

    h1_: '1. Verantwortlicher',
    adresse: 'Lassallestraße 7b, 1020 Wien, Österreich',
    mailL: 'E-Mail', telL: 'Telefon',

    h2_: '2. Erhebung und Verwendung personenbezogener Daten',
    p2: 'Wir erheben personenbezogene Daten nur, soweit dies zur Bereitstellung unserer Dienstleistungen erforderlich ist oder Sie uns diese freiwillig übermitteln. Dies geschieht insbesondere in folgenden Fällen:',
    li2: [
      ['Kontaktformular:', ' Name, E-Mail-Adresse, Telefonnummer, Reisedaten und Nachricht. Diese Daten verwenden wir ausschließlich zur Bearbeitung Ihrer Anfrage.'],
      ['Newsletter-Anmeldung:', ' E-Mail-Adresse sowie ggf. Vorname. Die Verarbeitung erfolgt auf Basis Ihrer ausdrücklichen Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).'],
      ['Cookies:', ' Technische und analytische Cookies zur Optimierung unseres Angebots.'],
    ],

    h3_: '3. Cookies',
    p3a: 'Wir verwenden Cookies zur Wiedererkennung und Optimierung unseres Angebots. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch notwendig, andere helfen uns dabei, das Nutzungsverhalten zu analysieren und unser Angebot zu verbessern.',
    p3b: 'Sie können Cookies in Ihrem Browser jederzeit deaktivieren oder löschen. Bitte beachten Sie, dass die Deaktivierung bestimmter Cookies die Funktionalität der Website einschränken kann.',

    h4_: '4. Google Analytics',
    p4a: 'Diese Website verwendet Google Analytics, einen Webanalysedienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google Analytics verwendet Cookies, um eine Analyse der Benutzung der Website zu ermöglichen. Die durch das Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.',
    p4b: 'Auf dieser Website ist IP-Anonymisierung aktiviert, sodass Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt wird.',
    p4c: 'Sie können der Erfassung durch Google Analytics widersprechen, indem Sie das Browser-Add-on zur Deaktivierung von Google Analytics herunterladen und installieren:',

    h5_: '5. Newsletter',
    p5a: 'Unser Newsletter-Versand erfolgt über das Double Opt-in Verfahren. Das bedeutet, dass wir Ihnen erst dann einen Newsletter per E-Mail zusenden, wenn Sie ausdrücklich bestätigt haben, dass Sie den Newsletter-Service aktivieren möchten.',
    p5b: 'Für den Versand unseres Newsletters nutzen wir den Dienst Mailchimp der Rocket Science Group LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA. Ihre E-Mail-Adresse und weitere für den Newsletter-Versand relevante Daten werden auf Servern von Mailchimp gespeichert.',
    p5c: 'Eine Abmeldung vom Newsletter ist jederzeit möglich. Einen entsprechenden Link finden Sie am Ende jedes Newsletters.',

    h6_: '6. Social Media',
    p6a: 'Auf unserer Website befinden sich Verlinkungen zu folgenden sozialen Netzwerken:',
    p6b: 'Beim Klick auf einen der Verlinkungsbuttons werden Sie direkt zur jeweiligen Plattform weitergeleitet. Beim Aufruf der jeweiligen Seite gelten die Datenschutzbestimmungen des jeweiligen Anbieters. Wir haben keinen Einfluss auf die erhobenen Daten und Datenverarbeitungsvorgänge der sozialen Netzwerke.',

    h7_: '7. Zahlungsabwicklung',
    p7: 'Für die Abwicklung von Zahlungen nutzen wir folgende Zahlungsdienstleister: PayPal, Sofortüberweisung/Klarna, Visa, Mastercard und American Express (AMEX). Die Übertragung Ihrer Zahlungsdaten erfolgt verschlüsselt. Wir haben keinen Zugriff auf Ihre vollständigen Zahlungsdaten — diese werden ausschließlich durch den jeweiligen Zahlungsdienstleister verarbeitet. Es gelten die Datenschutzbestimmungen des jeweiligen Anbieters.',

    h8_: '8. Ihre Rechte',
    p8: 'Sie haben gegenüber uns folgende Rechte hinsichtlich der Sie betreffenden personenbezogenen Daten:',
    li8: [
      ['Auskunft', ' über die bei uns gespeicherten personenbezogenen Daten'],
      ['Berichtigung', ' unrichtiger oder unvollständiger Daten'],
      ['Löschung', ' Ihrer bei uns gespeicherten Daten'],
      ['Einschränkung der Verarbeitung', ' Ihrer Daten'],
      ['Datenübertragbarkeit', ' in einem gängigen, maschinenlesbaren Format'],
      ['Widerspruch', ' gegen die Verarbeitung Ihrer Daten'],
    ],
    p8b: 'Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:',

    h9_: '9. Datensicherheit',
    p9: 'Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',

    h10_: '10. Änderungen dieser Datenschutzerklärung',
    p10: 'Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.',
    stand: 'Stand: März 2026',
  },

  en: {
    seoTitle: 'Privacy policy',
    seoDesc: 'Privacy policy of Yacht-Holiday under the GDPR. Information on the collection, processing and use of personal data.',
    tag: 'Legal', h1: 'Privacy policy',

    h1_: '1. Controller',
    adresse: 'Lassallestraße 7b, 1020 Vienna, Austria',
    mailL: 'Email', telL: 'Phone',

    h2_: '2. Collection and use of personal data',
    p2: 'We collect personal data only where this is necessary to provide our services or where you supply it to us voluntarily. This applies in particular in the following cases:',
    li2: [
      ['Contact form:', ' name, email address, telephone number, travel details and message. We use this data solely to process your enquiry.'],
      ['Newsletter sign-up:', ' email address and, where applicable, first name. Processing is based on your explicit consent (Art. 6(1)(a) GDPR).'],
      ['Cookies:', ' technical and analytical cookies used to improve our offering.'],
    ],

    h3_: '3. Cookies',
    p3a: 'We use cookies to recognise returning visitors and to improve our offering. Cookies are small text files stored on your device. Some cookies are technically necessary; others help us analyse how the site is used and improve it.',
    p3b: 'You can disable or delete cookies in your browser at any time. Please note that disabling certain cookies may limit the functionality of this website.',

    h4_: '4. Google Analytics',
    p4a: 'This website uses Google Analytics, a web analytics service provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google Analytics uses cookies to enable an analysis of how the website is used. The information generated by the cookie about your use of this website is generally transmitted to a Google server in the USA and stored there.',
    p4b: 'IP anonymisation is enabled on this website, so your IP address is truncated by Google beforehand within member states of the European Union or in other states party to the Agreement on the European Economic Area.',
    p4c: 'You can object to being recorded by Google Analytics by downloading and installing the browser add-on that deactivates Google Analytics:',

    h5_: '5. Newsletter',
    p5a: 'Our newsletter is sent using the double opt-in procedure. This means we will only send you a newsletter by email once you have expressly confirmed that you wish to activate the newsletter service.',
    p5b: 'To send our newsletter we use the Mailchimp service of the Rocket Science Group LLC, 675 Ponce de Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA. Your email address and other data relevant to sending the newsletter are stored on Mailchimp servers.',
    p5c: 'You can unsubscribe from the newsletter at any time. A corresponding link is included at the end of every newsletter.',

    h6_: '6. Social media',
    p6a: 'Our website contains links to the following social networks:',
    p6b: 'Clicking one of the link buttons takes you directly to the platform concerned. Once you are on that page, the privacy provisions of the respective provider apply. We have no influence over the data collected by the social networks or over how they process it.',

    h7_: '7. Payment processing',
    p7: 'For processing payments we use the following payment service providers: PayPal, Sofortüberweisung/Klarna, Visa, Mastercard and American Express (AMEX). Your payment data is transmitted in encrypted form. We have no access to your complete payment data — it is processed exclusively by the respective payment service provider. The privacy provisions of the respective provider apply.',

    h8_: '8. Your rights',
    p8: 'You have the following rights in relation to the personal data concerning you:',
    li8: [
      ['Access', ' to the personal data we hold about you'],
      ['Rectification', ' of inaccurate or incomplete data'],
      ['Erasure', ' of the data we hold about you'],
      ['Restriction of processing', ' of your data'],
      ['Data portability', ' in a commonly used, machine-readable format'],
      ['Objection', ' to the processing of your data'],
    ],
    p8b: 'To exercise your rights, please contact:',

    h9_: '9. Data security',
    p9: 'For security reasons and to protect the transmission of confidential content, this website uses SSL/TLS encryption. You can recognise an encrypted connection by the browser address bar changing from “http://” to “https://” and by the padlock symbol in your browser bar.',

    h10_: '10. Changes to this privacy policy',
    p10: 'We reserve the right to amend this privacy policy so that it always complies with current legal requirements, or in order to reflect changes to our services. The new privacy policy will then apply to your next visit.',
    stand: 'Last updated: March 2026',
  },
}

export default function DatenschutzPage() {
  const lang = useLang()
  const s = dse[lang]

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
    marginBottom: '0.75rem',
  }

  const liStyle: React.CSSProperties = { ...textStyle, marginBottom: '0.35rem' }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO title={s.seoTitle} description={s.seoDesc} />

      {/* Header Banner */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>{s.tag}</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff' }}>{s.h1}</h1>
        </div>
      </div>

      {/* Content */}
      <section style={{ background: '#fff', padding: '4rem 0 6rem' }}>
        <div className="container">
          <div style={{ maxWidth: '860px', margin: '0 auto', padding: '0 24px' }}>

            {/* 1. Verantwortlicher */}
            <h2 style={headingStyle}>{s.h1_}</h2>
            <p style={textStyle}>
              <strong>YACHT-URLAUB Ing. Manuel Göschl, MBA</strong><br />
              {s.adresse}<br />
              {s.mailL}: <a href={`mailto:${MAIL[lang]}`} style={{ color: 'var(--blue)' }}>{MAIL[lang]}</a><br />
              {s.telL}: <a href="tel:+43199715820" style={{ color: 'var(--blue)' }}>+43 1 997 15 82</a>
            </p>

            <div style={dividerStyle} />

            {/* 2. Erhebung */}
            <h2 style={headingStyle}>{s.h2_}</h2>
            <p style={textStyle}>{s.p2}</p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              {s.li2.map(([b, rest]) => (
                <li key={b} style={liStyle}><strong>{b}</strong>{rest}</li>
              ))}
            </ul>

            <div style={dividerStyle} />

            {/* 3. Cookies */}
            <h2 style={headingStyle}>{s.h3_}</h2>
            <p style={textStyle}>{s.p3a}</p>
            <p style={textStyle}>{s.p3b}</p>

            <div style={dividerStyle} />

            {/* 4. Google Analytics */}
            <h2 style={headingStyle}>{s.h4_}</h2>
            <p style={textStyle}>{s.p4a}</p>
            <p style={textStyle}>{s.p4b}</p>
            <p style={textStyle}>
              {s.p4c}{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>

            <div style={dividerStyle} />

            {/* 5. Newsletter */}
            <h2 style={headingStyle}>{s.h5_}</h2>
            <p style={textStyle}>{s.p5a}</p>
            <p style={textStyle}>{s.p5b}</p>
            <p style={textStyle}>{s.p5c}</p>

            <div style={dividerStyle} />

            {/* 6. Social Media */}
            <h2 style={headingStyle}>{s.h6_}</h2>
            <p style={textStyle}>{s.p6a}</p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              <li style={liStyle}>Facebook (<a href="https://facebook.com/yachturlaub" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>facebook.com/yachturlaub</a>)</li>
              <li style={liStyle}>Instagram</li>
              <li style={liStyle}>YouTube</li>
              <li style={liStyle}>LinkedIn</li>
              <li style={liStyle}>XING</li>
            </ul>
            <p style={textStyle}>{s.p6b}</p>

            <div style={dividerStyle} />

            {/* 7. Zahlungsabwicklung */}
            <h2 style={headingStyle}>{s.h7_}</h2>
            <p style={textStyle}>{s.p7}</p>

            <div style={dividerStyle} />

            {/* 8. Ihre Rechte */}
            <h2 style={headingStyle}>{s.h8_}</h2>
            <p style={textStyle}>{s.p8}</p>
            <ul style={{ paddingLeft: '1.25rem', marginBottom: '0.75rem' }}>
              {s.li8.map(([b, rest]) => (
                <li key={b} style={liStyle}><strong>{b}</strong>{rest}</li>
              ))}
            </ul>
            <p style={textStyle}>
              {s.p8b}{' '}
              <a href={`mailto:${MAIL[lang]}`} style={{ color: 'var(--blue)' }}>{MAIL[lang]}</a>
            </p>

            <div style={dividerStyle} />

            {/* 9. Datensicherheit */}
            <h2 style={headingStyle}>{s.h9_}</h2>
            <p style={textStyle}>{s.p9}</p>

            <div style={dividerStyle} />

            {/* 10. Änderungen */}
            <h2 style={headingStyle}>{s.h10_}</h2>
            <p style={textStyle}>{s.p10}</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--gray)', marginTop: '2rem' }}>{s.stand}</p>

          </div>
        </div>
      </section>
    </main>
  )
}
