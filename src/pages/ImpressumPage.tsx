import SEO from '../components/SEO'
import { useLang, MAIL } from '../i18n'

const imp = {
  de: {
    seoTitle: 'Impressum',
    seoDesc: 'Impressum und rechtliche Angaben von YACHT-URLAUB Ing. Manuel Göschl, MBA',
    tag: 'Rechtliches', h1: 'Impressum',
    ecg: 'Angaben gemäß § 5 ECG',
    form: 'Unternehmensform: Einzelunternehmen',
    bueroWien: 'Büro Wien', wien: '1020 Wien, Österreich',
    leitung: 'Geschäftsführung', weitra: '3970 Weitra, Österreich',
    bueroKroatien: 'Kroatien-Büro', opatija: '51 410 Opatija, Kroatien',
    kontakt: 'Kontakt', tel: 'Telefon', mail: 'E-Mail',
    zeiten: 'Öffnungszeiten', mofr: 'Mo–Fr: 10:00–19:00 Uhr', sa: 'Sa: 13:00–17:00 Uhr',
    haftungH: 'Haftungsausschluss',
    haftung: 'Der Betreiber behält sich das Recht vor, Inhalte oder Design der Website ohne Vorankündigung zu ändern. Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.',
    urheberH: 'Urheberrecht',
    urheber: 'Alle Inhalte dieser Website unterliegen dem Urheberrecht. Die Verwendung von Texten und Bildern zur Veröffentlichung, Vervielfältigung oder kommerziellen Nutzung ist ohne schriftliche Genehmigung untersagt.',
    osH: 'Online-Streitbeilegung',
    os: 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:',
    osBereit: 'Wir sind bereit, an außergerichtlichen Schlichtungsverfahren teilzunehmen.',
  },
  en: {
    seoTitle: 'Imprint',
    seoDesc: 'Imprint and legal information of YACHT-URLAUB Ing. Manuel Göschl, MBA',
    tag: 'Legal', h1: 'Imprint',
    ecg: 'Information pursuant to § 5 of the Austrian E-Commerce Act (ECG)',
    form: 'Legal form: sole proprietorship',
    bueroWien: 'Vienna office', wien: '1020 Vienna, Austria',
    leitung: 'Management', weitra: '3970 Weitra, Austria',
    bueroKroatien: 'Croatia office', opatija: '51 410 Opatija, Croatia',
    kontakt: 'Contact', tel: 'Phone', mail: 'Email',
    zeiten: 'Opening hours', mofr: 'Mon–Fri: 10:00–19:00', sa: 'Sat: 13:00–17:00',
    haftungH: 'Disclaimer',
    haftung: 'The operator reserves the right to change the content or design of this website without prior notice. Despite careful review of the content, we accept no liability for the content of external links. The operators of the linked pages are solely responsible for their content.',
    urheberH: 'Copyright',
    urheber: 'All content on this website is protected by copyright. Using texts and images for publication, reproduction or commercial purposes without written permission is prohibited.',
    osH: 'Online dispute resolution',
    os: 'The European Commission provides a platform for online dispute resolution (ODR):',
    osBereit: 'We are willing to take part in out-of-court dispute resolution proceedings.',
  },
}

export default function ImpressumPage() {
  const lang = useLang()
  const s = imp[lang]

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

            <h2 style={headingStyle}>{s.ecg}</h2>
            <p style={textStyle}><strong>YACHT-URLAUB Ing. Manuel Göschl, MBA</strong></p>
            <p style={textStyle}>{s.form}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.bueroWien}</h2>
            <p style={textStyle}>Lassallestraße 7b</p>
            <p style={textStyle}>{s.wien}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.leitung}</h2>
            <p style={textStyle}>Kühlhofberg 399</p>
            <p style={textStyle}>{s.weitra}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.bueroKroatien}</h2>
            <p style={textStyle}>Marsala Tita</p>
            <p style={textStyle}>{s.opatija}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.kontakt}</h2>
            <p style={textStyle}>{s.tel}: <a href="tel:+43199715820" style={{ color: 'var(--blue)' }}>+43 1 997 15 82</a></p>
            <p style={textStyle}>WhatsApp: <a href="https://wa.me/436602652481" style={{ color: 'var(--blue)' }}>+43 660 2652481</a></p>
            <p style={textStyle}>{s.mail}: <a href={`mailto:${MAIL[lang]}`} style={{ color: 'var(--blue)' }}>{MAIL[lang]}</a></p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.zeiten}</h2>
            <p style={textStyle}>{s.mofr}</p>
            <p style={textStyle}>{s.sa}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.haftungH}</h2>
            <p style={textStyle}>{s.haftung}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.urheberH}</h2>
            <p style={textStyle}>{s.urheber}</p>

            <div style={dividerStyle} />

            <h2 style={headingStyle}>{s.osH}</h2>
            <p style={textStyle}>
              {s.os}{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--blue)' }}>
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p style={textStyle}>{s.osBereit}</p>

          </div>
        </div>
      </section>
    </main>
  )
}
