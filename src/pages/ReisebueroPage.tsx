import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { useLang } from '../i18n'

// Inhalte 1:1 von yacht-urlaub.net/kontakt/partner
const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '4px', border: '1px solid var(--gray-mid)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' } as const
const labelStyle = { fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '5px', display: 'block' } as const

const rl = {
  de: { tag: 'Partner werden', h1: 'Für Reisebüros / Affiliate-Partner', h2: 'Partner werden',
    text: 'Sie sind von unseren Produkten begeistert und möchten diese auch Ihren Kunden anbieten? Wir bieten attraktive Konditionen und auch automatisierte Buchungsprozesse an.',
    contact: 'Kontaktieren Sie uns!', name: 'Name *', mail: 'E-Mail *', tel: 'Telefonnummer', msg: 'Nachricht *',
    send: 'Senden', sending: 'wird gesendet …', thanks: 'Vielen Dank! Ihre Anfrage wurde übermittelt — wir melden uns schnellstmöglich.',
    call: 'Rufen Sie uns an! Wir beraten Sie gerne' },
  en: { tag: 'Become a partner', h1: 'For Travel Agencies / Affiliate-Partner', h2: 'Become a partner',
    text: 'You are excited about our products and would like to offer them to your customers as well? We offer attractive conditions and automated booking processes.',
    contact: 'Contact us!', name: 'Name *', mail: 'Email *', tel: 'Telephone number', msg: 'Message *',
    send: 'Send', sending: 'sending …', thanks: 'Thank you! Your inquiry has been sent — we will get back to you shortly.',
    call: 'Give us a call! We are happy to advise you' },
}

export default function ReisebueroPage() {
  const lang = useLang()
  const s = rl[lang]
  const [form, setForm] = useState({ name: '', email: '', telefon: '', nachricht: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    const body = new URLSearchParams({ 'form-name': 'partner-anfrage', ...form })
    try {
      await fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      setSent(true)
    } finally { setSending(false) }
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en' ? "For travel agencies / affiliate partners | Yacht-Holiday" : "Für Reisebüros / Affiliate-Partner | Yacht-Urlaub"}
        description="Partner werden: Sie sind von unseren Produkten begeistert und möchten diese auch Ihren Kunden anbieten? Wir bieten attraktive Konditionen und automatisierte Buchungsprozesse."
        canonical="/reisebuero"
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '4.5rem 0 4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Partner werden
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4.5vw, 2.8rem)', color: '#fff', marginBottom: '1rem' }}>
            {s.h1}
          </h1>
        </div>
      </div>

      {/* Inhalt + Formular */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.4rem', marginBottom: '1rem' }}>{s.h2}</h2>
            <p style={{ color: '#444', fontSize: '0.97rem', lineHeight: 1.85, marginBottom: '2.5rem' }}>
              {s.text}
            </p>

            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1.5rem' }}>{s.contact}</h2>
            {sent ? (
              <div style={{ background: '#ecfdf5', border: '1px solid #10b981', borderRadius: '6px', padding: '2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</p>
                <p style={{ color: 'var(--gray)', fontSize: '0.92rem' }}>{s.thanks}</p>
              </div>
            ) : (
              <form name="partner-anfrage" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}
                style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
                <input type="hidden" name="form-name" value="partner-anfrage" />
                <p style={{ display: 'none' }}><input name="bot-field" /></p>
                <div className="partner-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={labelStyle}>{s.name}</label>
                    <input required name="name" value={form.name} onChange={e => set('name', e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>{s.mail}</label>
                    <input required type="email" name="email" value={form.email} onChange={e => set('email', e.target.value)} style={inputStyle} />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={labelStyle}>{s.tel}</label>
                  <input type="tel" name="telefon" value={form.telefon} onChange={e => set('telefon', e.target.value)} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>{s.msg}</label>
                  <textarea required name="nachricht" rows={5} value={form.nachricht} onChange={e => set('nachricht', e.target.value)} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={sending} className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '13px 36px', opacity: sending ? 0.6 : 1 }}>
                  {sending ? s.sending : s.send}
                </button>
              </form>
            )}

            <div style={{ marginTop: '2.5rem', textAlign: 'center', color: 'var(--gray)', fontSize: '0.9rem' }}>
              <p style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: '0.3rem' }}>{s.call}</p>
              <p>
                <a href="tel:+43199715820" style={{ color: 'var(--blue)', fontWeight: 600 }}>+43 1 997 15 82</a>
                {' · '}
                <a href="mailto:info@yacht-urlaub.net" style={{ color: 'var(--blue)', fontWeight: 600 }}>info@yacht-urlaub.net</a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) { .partner-form-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
