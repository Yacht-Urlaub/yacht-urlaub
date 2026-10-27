import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { useLang, isEnHost, BASE_DE, BASE_EN } from '../i18n'
import SEO from '../components/SEO'

const kl = {
  de: {
    kicker: 'Aktuelles · Neu für 2027',
    h1: 'Segelsaison 2027: mehr Freiheit bei Ihren Charterterminen',
    lead: 'Nicht jeder Urlaub beginnt am Samstag. Für 2027 bieten wir bei ausgewählten Yachten in Kroatien neben dem klassischen Wochencharter auch Starts am Mittwoch und verlängerte Törns mit 10 Tagen an. So passt der Törn zu Ihrem Kalender.',
    meta: ['Kroatien', 'Saison 2027', 'Segelyacht & Katamaran'],
    overviewKicker: 'Auf einen Blick',
    overviewH2: 'Vier Wege an Bord',
    overviewIntro: 'Die Übersicht zeigt, wann Sie an Bord gehen und wann Sie zurück im Hafen sind. Mit Start am Mittwoch verbringen Sie das Wochenende auf See, während in den Marinas Wechseltag ist.',
    weekdays: ['Sa', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So', 'Mo', 'Di', 'Mi', 'Do', 'Fr'],
    weekend: [0, 1, 7, 8],
    legend: ['Klassischer Törn', 'Neue Modelle 2027', 'Letzte Nacht an Bord im Hafen', 'Wochenende'],
    timelineAlt: 'Vergleich der vier Charter-Modelle über zwei Wochen, Samstag bis Freitag der Folgewoche',
    models: [
      {
        days: 'Samstag → Samstag', nights: '7 Tage', neu: false, barFrom: 2, barTo: 8, lastFrom: 8, lastTo: 9,
        title: 'Klassischer Wochencharter',
        checkin: 'Samstag', rueckkehr: 'Freitag, Übernachtung an Bord bis Samstagmorgen',
        text: 'Der beliebteste Weg in den Segelurlaub: eine volle Woche, geplant von Wochenende zu Wochenende.',
      },
      {
        days: 'Mittwoch → Mittwoch', nights: '7 Tage', neu: true, barFrom: 6, barTo: 12, lastFrom: 12, lastTo: 13,
        title: 'Mittwochs-Charter',
        checkin: 'Mittwoch', rueckkehr: 'Dienstag, Übernachtung an Bord bis Mittwochmorgen',
        text: 'Übernahme und Rückgabe unter der Woche. Das Wochenende verbringen Sie auf See statt im Trubel der Wechseltage.',
      },
      {
        days: 'Samstag → Mittwoch', nights: '10 Tage', neu: true, barFrom: 2, barTo: 12, lastFrom: 12, lastTo: 13,
        title: 'Verlängerter Törn ab Samstag',
        checkin: 'Samstag', rueckkehr: 'Dienstag, Übernachtung an Bord bis Mittwochmorgen',
        text: 'Anreise am Wochenende und mehr als eine Woche auf See. Am folgenden Samstag gibt es keinen Check-out-Stress.',
      },
      {
        days: 'Mittwoch → Samstag', nights: '10 Tage', neu: true, barFrom: 6, barTo: 15, lastFrom: 15, lastTo: 16,
        title: 'Verlängerter Törn ab Mittwoch',
        checkin: 'Mittwoch', rueckkehr: 'Freitag der Folgewoche, Übernachtung an Bord bis Samstagmorgen',
        text: 'Ein ganzes Wochenende auf See und danach eine volle Woche an der Küste. Zurück am Freitag, wie bei einem klassischen Charter.',
      },
    ],
    modelNote: 'Die neuen Starttage gelten für ausgewählte Yachten. Wir prüfen die Verfügbarkeit für Ihren Wunschtermin.',
    checkinLabel: 'Check-in', rueckkehrLabel: 'Rückkehr', neuTag: 'Neu',
    modelCta: 'Dieses Modell anfragen ↓',
    whyKicker: 'Ihr Vorteil',
    whyH2: 'Warum über Yacht-Urlaub buchen?',
    whyIntro: 'Wir kennen die Flotten und wissen, welche Yacht an welchem Tag starten kann. Sie sagen uns Ihre Wunschtermine, wir finden die passende Kombination.',
    why: [
      { title: 'Persönliche Beratung', text: 'Kostenlos und unverbindlich, ein Ansprechpartner von der Anfrage bis zur Rückkehr.' },
      { title: 'Antwort in 24 Stunden', text: 'Wir prüfen Starttage und Verfügbarkeit und melden uns mit passenden Yachten.' },
      { title: 'Über 10 Jahre Erfahrung', text: 'Trusted Shops zertifiziert und mit 5 Sternen auf Google bewertet.' },
      { title: 'Alles aus einer Hand', text: 'Auf Wunsch mit Skipper, Bord-Service oder als Crew-Charter.' },
    ],
    ctaH2: 'Ihre Wunschdauer ist nicht dabei?',
    ctaText: 'Sprechen Sie uns an. Auch individuelle Charterzeiträume sind oft möglich. Nennen Sie uns Ihre Termine, wir prüfen die Möglichkeiten für Sie.',
    ctaBtn: 'Jetzt unverbindlich anfragen →',
    ctaWa: 'WhatsApp schreiben',
    ctaTel: 'oder anrufen: +43 1 997 15 82',
    imgAlt: 'Crew entspannt bei Sonnenuntergang auf dem Vordeck eines Katamarans vor der kroatischen Küste',
  },
  en: {
    kicker: 'Latest · New for 2027',
    h1: 'Sailing season 2027: more freedom for your charter dates',
    lead: "Not every holiday has to start on a Saturday. For 2027 we're offering Wednesday starts and extended 10-day cruises on selected yachts in Croatia, alongside the classic weekly charter. So the cruise fits your calendar, not the other way round.",
    meta: ['Croatia', 'Season 2027', 'Sailing yacht & catamaran'],
    overviewKicker: 'At a glance',
    overviewH2: 'Four ways on board',
    overviewIntro: 'The overview shows when you board and when you are back in the marina. Starting on a Wednesday means you spend the weekend at sea, while the marinas are busy with changeover.',
    weekdays: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    weekend: [0, 1, 7, 8],
    legend: ['Classic cruise', 'New models 2027', 'Last night on board in the marina', 'Weekend'],
    timelineAlt: 'Comparison of the four charter models over two weeks, Saturday to the Friday of the following week',
    models: [
      {
        days: 'Saturday → Saturday', nights: '7 days', neu: false, barFrom: 2, barTo: 8, lastFrom: 8, lastTo: 9,
        title: 'Classic weekly charter',
        checkin: 'Saturday', rueckkehr: 'Friday, overnight on board until Saturday morning',
        text: 'The most popular way into a sailing holiday: a full week, planned from weekend to weekend.',
      },
      {
        days: 'Wednesday → Wednesday', nights: '7 days', neu: true, barFrom: 6, barTo: 12, lastFrom: 12, lastTo: 13,
        title: 'Wednesday charter',
        checkin: 'Wednesday', rueckkehr: 'Tuesday, overnight on board until Wednesday morning',
        text: 'Handover and return mid-week. You spend the weekend at sea instead of amid the changeover rush.',
      },
      {
        days: 'Saturday → Wednesday', nights: '10 days', neu: true, barFrom: 2, barTo: 12, lastFrom: 12, lastTo: 13,
        title: 'Extended cruise from Saturday',
        checkin: 'Saturday', rueckkehr: 'Tuesday, overnight on board until Wednesday morning',
        text: 'Arrive over the weekend and spend more than a week at sea. No check-out stress on the following Saturday.',
      },
      {
        days: 'Wednesday → Saturday', nights: '10 days', neu: true, barFrom: 6, barTo: 15, lastFrom: 15, lastTo: 16,
        title: 'Extended cruise from Wednesday',
        checkin: 'Wednesday', rueckkehr: 'Friday the following week, overnight on board until Saturday morning',
        text: 'A full weekend at sea followed by a full week along the coast. Back on Friday, just like a classic charter.',
      },
    ],
    modelNote: 'The new start days apply to selected yachts. We check availability for your preferred dates.',
    checkinLabel: 'Check-in', rueckkehrLabel: 'Return', neuTag: 'New',
    modelCta: 'Request this model ↓',
    whyKicker: 'Your benefit',
    whyH2: 'Why book through Yacht-Urlaub?',
    whyIntro: 'We know the fleets and which yacht can start on which day. Tell us your preferred dates and we will find the right combination.',
    why: [
      { title: 'Personal advice', text: 'Free and non-binding, one contact person from your enquiry to your return.' },
      { title: 'Reply within 24 hours', text: 'We check start days and availability and get back to you with suitable yachts.' },
      { title: 'Over 10 years of experience', text: 'Trusted Shops certified and rated 5 stars on Google.' },
      { title: 'Everything from one source', text: 'On request with skipper, on-board service or as a crewed charter.' },
    ],
    ctaH2: 'Your preferred duration is not listed?',
    ctaText: 'Just ask us. Individual charter periods are often possible too. Tell us your dates and we will check the options for you.',
    ctaBtn: 'Request a free quote →',
    ctaWa: 'Message us on WhatsApp',
    ctaTel: 'or call: +43 1 997 15 82',
    imgAlt: 'Crew relaxing at sunset on the foredeck of a catamaran off the Croatian coast',
  },
}

export default function NewsCharterModelle2027Page() {
  const lang = useLang()
  const s = kl[lang]
  const base = isEnHost() ? BASE_EN : BASE_DE
  const path = lang === 'en' ? '/news/charter-models-2027' : '/news/charter-modelle-2027'
  const url = `${base}${path}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: s.h1,
    description: s.lead,
    image: `${base}/images/news/charter-modelle-2027.jpg`,
    datePublished: '2026-10-27',
    dateModified: '2026-10-27',
    author: { '@type': 'Organization', name: lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub' },
    publisher: { '@type': 'Organization', name: lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub' },
    mainEntityOfPage: url,
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title={lang === 'en'
          ? 'Sailing season 2027: new charter start days in Croatia'
          : 'Segelsaison 2027: neue Charter-Starttage in Kroatien'}
        description={lang === 'en'
          ? 'From 2027, book Wednesday starts and extended 10-day cruises on selected yachts in Croatia, alongside the classic weekly charter.'
          : 'Ab 2027 buchbar: Mittwochs-Starts und verlängerte 10-Tage-Törns bei ausgewählten Yachten in Kroatien, zusätzlich zum klassischen Wochencharter.'}
        image="/images/news/charter-modelle-2027.webp"
        schema={schema}
      />

      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '380px', overflow: 'hidden' }}>
        <img
          src="/images/news/charter-modelle-2027.webp"
          alt={s.imgAlt}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
          onError={e => { (e.target as HTMLImageElement).src = '/images/packages/dalmatien/gallery/Sailing.png' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,35,56,0.9) 0%, rgba(15,35,56,0.55) 60%, rgba(15,35,56,0.15) 100%)' }} />
        <div className="container" style={{ position: 'relative', padding: '4rem 0' }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            {s.kicker}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4.4vw, 3rem)', lineHeight: 1.12, color: '#fff', maxWidth: '17em', marginBottom: '1rem', fontWeight: 700 }}>
            {s.h1}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: 'rgba(255,255,255,0.88)', fontSize: '1.05rem', maxWidth: '36em' }}>
            {s.lead}
          </motion.p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1.25rem' }}>
            {s.meta.map(m => (
              <span key={m} style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '2px', padding: '4px 10px' }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Vier Wege an Bord */}
      <section className="section" style={{ background: 'var(--gray-light)' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>
            {s.overviewKicker}
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)', color: 'var(--navy)', lineHeight: 1.25, marginBottom: '0.6rem', fontWeight: 700 }}>
            {s.overviewH2}
          </h2>
          <p style={{ maxWidth: '64ch', color: 'var(--text)', marginBottom: '2rem' }}>{s.overviewIntro}</p>

          {/* Zeitstrahl-Vergleich */}
          <div
            role="img"
            aria-label={s.timelineAlt}
            style={{ background: '#fff', border: '1px solid #eee', borderRadius: '4px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '20px', overflowX: 'auto', marginBottom: '2.5rem' }}
          >
            <div className="charter-timeline-grid" style={{ display: 'grid', gridTemplateColumns: '158px repeat(14, minmax(30px, 1fr))', rowGap: '10px', minWidth: '640px', alignItems: 'center' }}>
              <span />
              {s.weekdays.map((d, i) => (
                <span key={i} style={{
                  fontSize: '12px', fontWeight: 600, color: s.weekend.includes(i) ? 'var(--navy)' : 'var(--gray)',
                  background: s.weekend.includes(i) ? 'var(--blue-pale, #e0f2fe)' : 'transparent',
                  borderRadius: '2px', textAlign: 'center', padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em',
                }}>
                  {d}
                </span>
              ))}
              {s.models.map(m => (
                <Fragment key={m.title}>
                  <span style={{ gridColumn: 1, fontSize: '14px', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.25, paddingRight: '12px' }}>
                    {m.title}
                    <small style={{ display: 'block', fontWeight: 400, color: 'var(--gray)', fontSize: '12.5px' }}>{m.days} · {m.nights}</small>
                  </span>
                  <span style={{ gridColumn: `${m.barFrom} / ${m.barTo}`, height: '24px', background: m.neu ? 'var(--blue)' : 'var(--navy)', borderRadius: '3px 0 0 3px' }} />
                  <span style={{ gridColumn: `${m.lastFrom} / ${m.lastTo}`, height: '24px', background: 'var(--blue-light)', opacity: 0.55, borderRadius: '0 3px 3px 0' }} />
                </Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 20px', marginTop: '14px', fontSize: '12.5px', color: 'var(--gray)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><i style={{ width: 14, height: 14, borderRadius: 2, display: 'inline-block', background: 'var(--navy)' }} />{s.legend[0]}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><i style={{ width: 14, height: 14, borderRadius: 2, display: 'inline-block', background: 'var(--blue)' }} />{s.legend[1]}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><i style={{ width: 14, height: 14, borderRadius: 2, display: 'inline-block', background: 'var(--blue-light)', opacity: 0.55 }} />{s.legend[2]}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}><i style={{ width: 14, height: 14, borderRadius: 2, display: 'inline-block', background: 'var(--blue-pale, #e0f2fe)' }} />{s.legend[3]}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '1.5rem' }} className="charter-models-grid">
            {s.models.map((m, i) => (
              <motion.article
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: '#fff', border: '1px solid #eee', borderRadius: '4px',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.06)', padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '0.8rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>{m.days}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--navy)', background: 'var(--blue-pale, #e0f2fe)', borderRadius: '20px', padding: '2px 10px', whiteSpace: 'nowrap' }}>{m.nights}</span>
                </div>
                <h3 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', color: 'var(--navy)', lineHeight: 1.3, fontWeight: 700 }}>
                  {m.title}
                  {m.neu && (
                    <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'var(--gold)', color: 'var(--navy)', borderRadius: '2px', padding: '2px 8px', marginLeft: '8px', verticalAlign: '3px' }}>
                      {s.neuTag}
                    </span>
                  )}
                </h3>
                <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 14px', margin: 0, padding: '0.8rem 0', borderTop: '1px solid #eee', borderBottom: '1px solid #eee', fontSize: '0.92rem' }}>
                  <dt style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.checkinLabel}</dt>
                  <dd style={{ margin: 0 }}>{m.checkin}</dd>
                  <dt style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.rueckkehrLabel}</dt>
                  <dd style={{ margin: 0 }}>{m.rueckkehr}</dd>
                </dl>
                <p style={{ fontSize: '0.95rem', color: 'var(--text)' }}>{m.text}</p>
                <a href="#kontakt" style={{ color: 'var(--blue)', fontSize: '0.85rem', fontWeight: 600, marginTop: 'auto', textDecoration: 'none' }}>{s.modelCta}</a>
              </motion.article>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '1.75rem' }}>{s.modelNote}</p>
        </div>
      </section>

      {/* Warum über Yacht-Urlaub buchen */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <p style={{ color: 'var(--blue)', fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.4rem' }}>
            {s.whyKicker}
          </p>
          <h2 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 2.6vw, 1.75rem)', color: 'var(--navy)', lineHeight: 1.25, marginBottom: '0.6rem', fontWeight: 700 }}>
            {s.whyH2}
          </h2>
          <p style={{ maxWidth: '64ch', color: 'var(--text)', marginBottom: '2.5rem' }}>{s.whyIntro}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '1.5rem' }} className="charter-why-grid">
            {s.why.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
              >
                <span style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Sans, sans-serif', fontWeight: 700 }}>
                  {i + 1}
                </span>
                <b style={{ color: 'var(--navy)', fontSize: '1rem' }}>{w.title}</b>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.65 }}>{w.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{
            background: 'var(--navy)', color: '#fff', borderRadius: '4px', padding: '2.25rem',
            display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>{s.ctaH2}</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '52ch' }}>{s.ctaText}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '240px' }}>
              <a href="#kontakt" className="btn btn-gold" style={{ textAlign: 'center' }}>{s.ctaBtn}</a>
              <a href="https://wa.me/436602652481" target="_blank" rel="noopener noreferrer" className="btn" style={{ background: 'var(--whatsapp, #25d366)', color: 'var(--navy)', textAlign: 'center' }}>{s.ctaWa}</a>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textAlign: 'center' }}>{s.ctaTel}</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .charter-why-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        }
        @media (max-width: 640px) {
          .charter-models-grid { grid-template-columns: 1fr !important; }
          .charter-why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
