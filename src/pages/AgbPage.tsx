import SEO from '../components/SEO'
import { useLang, MAIL } from '../i18n'

const agb = {
  de: {
    seoTitle: 'AGB – Allgemeine Geschäftsbedingungen',
    seoDesc: 'Allgemeine Geschäftsbedingungen von YACHT-URLAUB Ing. Manuel Göschl, MBA. Unsere AGB stehen als PDF zum Download bereit.',
    tag: 'Rechtliches', h1: 'Allgemeine Geschäftsbedingungen',
    pdfText: 'Unsere Allgemeinen Geschäftsbedingungen stehen Ihnen als PDF zum Download bereit.',
    pdfBtn: 'AGB als PDF herunterladen →',
    hinweis: 'Mit der Buchung einer Reise oder Dienstleistung über YACHT-URLAUB akzeptieren Sie unsere Allgemeinen Geschäftsbedingungen. Wir empfehlen Ihnen, die AGB vor der Buchung sorgfältig zu lesen.',
    fragenH: 'Fragen zu unseren AGB?',
    fragen: 'Bei Fragen stehen wir Ihnen gerne zur Verfügung:',
    zeiten: 'Mo–Fr: 10:00–19:00 Uhr',
    zeitenSa: 'Sa: 13:00–17:00 Uhr',
  },
  en: {
    seoTitle: 'Terms and conditions',
    seoDesc: 'General terms and conditions of YACHT-URLAUB Ing. Manuel Göschl, MBA. Our terms are available for download as a PDF.',
    tag: 'Legal', h1: 'General terms and conditions',
    // Das PDF liegt nur auf Deutsch vor — das gehoert auf der englischen
    // Seite dazugesagt, sonst ist der Klick eine Ueberraschung.
    pdfText: 'Our general terms and conditions are available for download as a PDF (in German).',
    pdfBtn: 'Download terms as PDF →',
    hinweis: 'By booking a trip or a service through YACHT-URLAUB you accept our general terms and conditions. We recommend reading them carefully before booking.',
    fragenH: 'Questions about our terms?',
    fragen: 'We are happy to help:',
    zeiten: 'Mon–Fri: 10:00–19:00',
    zeitenSa: 'Sat: 13:00–17:00',
  },
}

export default function AgbPage() {
  const lang = useLang()
  const s = agb[lang]

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

            {/* PDF Download */}
            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '2.5rem', textAlign: 'center', marginBottom: '3rem' }}>
              <p style={{ fontSize: '1.05rem', color: 'var(--text)', lineHeight: 1.85, marginBottom: '1.75rem' }}>
                {s.pdfText}
              </p>
              <a
                href="/agb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                {s.pdfBtn}
              </a>
            </div>

            {/* Acceptance note */}
            <div style={{ borderLeft: '3px solid var(--blue)', paddingLeft: '1.25rem', marginBottom: '3rem' }}>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85 }}>
                {s.hinweis}
              </p>
            </div>

            {/* Contact */}
            <div style={{ background: 'var(--gray-light)', borderRadius: '6px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.1rem', marginBottom: '1rem' }}>
                {s.fragenH}
              </h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85, marginBottom: '0.5rem' }}>
                {s.fragen}
              </p>
              <p style={{ fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.85 }}>
                <a href="tel:+43199715820" style={{ color: 'var(--blue)', fontWeight: 600 }}>+43 1 997 15 82</a>
                {' '}|{' '}
                <a href={`mailto:${MAIL[lang]}`} style={{ color: 'var(--blue)', fontWeight: 600 }}>{MAIL[lang]}</a>
              </p>
              <p style={{ fontSize: '0.82rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                {s.zeiten} &nbsp;·&nbsp; {s.zeitenSa}
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
