import { useLang } from '../i18n'

/**
 * Pflichthinweis fuer reCAPTCHA.
 *
 * Google laesst zu, das Badge unten rechts auszublenden — verlangt dann
 * aber diesen Hinweis sichtbar im Formularablauf. Ausgeblendet ist es hier,
 * weil unten rechts schon der Schnellzugriff (Telefon/E-Mail/WhatsApp) und
 * auf dem Telefon zusaetzlich der WhatsApp-Knopf sitzen; das Badge haette
 * sich darueber gelegt. Das Ausblenden steht in src/index.css.
 */
export default function RecaptchaHinweis({ align = 'left' }: { align?: 'left' | 'center' }) {
  const lang = useLang()
  const linkStyle: React.CSSProperties = { color: 'inherit', textDecoration: 'underline' }

  return (
    <p style={{
      fontSize: '0.7rem',
      color: 'var(--gray)',
      lineHeight: 1.6,
      marginTop: '0.9rem',
      textAlign: align,
    }}>
      {lang === 'en' ? (
        <>
          This site is protected by reCAPTCHA and the Google{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>Privacy Policy</a>{' '}and{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={linkStyle}>Terms of Service</a>{' '}apply.
        </>
      ) : (
        <>
          Diese Seite ist durch reCAPTCHA geschützt. Es gelten die{' '}
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={linkStyle}>Datenschutzerklärung</a>{' '}und die{' '}
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={linkStyle}>Nutzungsbedingungen</a>{' '}von Google.
        </>
      )}
    </p>
  )
}
