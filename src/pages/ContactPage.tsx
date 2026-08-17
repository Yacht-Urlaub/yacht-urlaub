import { useState } from 'react'
import SEO from '../components/SEO'
import { useLang, MAIL } from '../i18n'
import { sendForm } from '../lib/sendForm'
import RecaptchaHinweis from '../components/RecaptchaHinweis'

const L = {
  de: {
    title: 'Kontakt', label: 'Kontakt',
    intro: 'Sie haben Fragen oder möchten uns direkt erreichen? Schreiben Sie uns – wir melden uns schnellstmöglich bei Ihnen.',
    name: 'Name *', email: 'E-Mail *', phone: 'Telefon', message: 'Ihre Nachricht *',
    messagePh: 'Wie können wir Ihnen helfen?',
    send: 'Nachricht senden', sending: 'Wird gesendet …',
    okH: 'Vielen Dank!', okT: 'Ihre Nachricht wurde gesendet. Wir melden uns so bald wie möglich bei Ihnen.',
    err: 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut – oder rufen Sie uns direkt an.',
    infoH: 'Direkter Kontakt', phoneL: 'Telefon', mailL: 'E-Mail', newReq: 'Neue Nachricht',
  },
  en: {
    title: 'Contact', label: 'Contact',
    intro: 'Do you have questions or want to reach us directly? Send us a message – we will get back to you as soon as possible.',
    name: 'Name *', email: 'Email *', phone: 'Phone', message: 'Your message *',
    messagePh: 'How can we help you?',
    send: 'Send message', sending: 'Sending …',
    okH: 'Thank you!', okT: 'Your message has been sent. We will get back to you as soon as possible.',
    err: 'Something went wrong. Please try again later – or give us a call.',
    infoH: 'Direct contact', phoneL: 'Phone', mailL: 'Email', newReq: 'New message',
  },
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)',
  fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box', fontFamily: 'DM Sans, sans-serif',
}
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.4rem', letterSpacing: '0.02em',
}

export default function ContactPage() {
  const lang = useLang()
  const s = L[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Wie alle anderen Formulare ueber sendForm — dort haengt der
    // reCAPTCHA-Schutz, und der Formularname landet in der Mail.
    setStatus(await sendForm('kontakt', form) ? 'ok' : 'error')
  }

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO
        title={lang === 'en' ? 'Contact | Yacht-Holiday' : 'Kontakt | Yacht-Urlaub'}
        description={s.intro}
      />

      {/* Header */}
      <section style={{ background: 'var(--navy)', color: '#fff', padding: '3.5rem 0 3rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>{s.label}</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 3rem)', marginBottom: '1rem' }}>{s.title}</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '640px' }}>{s.intro}</p>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container">
          <div className="kontakt-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '3rem', alignItems: 'start' }}>
            {/* Formular */}
            <div style={{ background: '#fff', borderRadius: '8px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 2px 20px rgba(7,27,47,0.07)' }}>
              {status === 'ok' ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✅</div>
                  <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{s.okH}</h2>
                  <p style={{ color: 'var(--gray)', marginBottom: '1.5rem' }}>{s.okT}</p>
                  <button onClick={() => { setForm({ name: '', email: '', phone: '', message: '' }); setStatus('idle') }} className="btn btn-ghost" style={{ fontSize: '0.82rem' }}>{s.newReq}</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <div className="form-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                    <div>
                      <label style={labelStyle}>{s.name}</label>
                      <input required value={form.name} onChange={set('name')} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>{s.phone}</label>
                      <input value={form.phone} onChange={set('phone')} style={inputStyle} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <label style={labelStyle}>{s.email}</label>
                    <input required type="email" value={form.email} onChange={set('email')} style={inputStyle} />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>{s.message}</label>
                    <textarea required value={form.message} onChange={set('message')} placeholder={s.messagePh} rows={6} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  {status === 'error' && (
                    <p style={{ color: '#c0392b', fontSize: '0.85rem', marginBottom: '1rem' }}>{s.err}</p>
                  )}
                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ fontSize: '0.85rem', opacity: status === 'sending' ? 0.7 : 1 }}>
                    {status === 'sending' ? s.sending : s.send}
                  </button>
                  <RecaptchaHinweis />
                </form>
              )}
            </div>

            {/* Direkter Kontakt */}
            <div style={{ background: 'var(--navy)', color: '#fff', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.15rem', marginBottom: '1.25rem' }}>{s.infoH}</h2>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{s.phoneL}</p>
              <p style={{ marginBottom: '1.25rem' }}><a href="tel:+43199715820" style={{ color: '#fff', fontWeight: 600 }}>+43 1 997 15 82</a></p>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>{s.mailL}</p>
              <p><a href={`mailto:${MAIL[lang]}`} style={{ color: '#fff', fontWeight: 600 }}>{MAIL[lang]}</a></p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .kontakt-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
