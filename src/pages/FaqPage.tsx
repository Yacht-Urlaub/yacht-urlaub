import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'

const faqs = [
  {
    cat: 'Über Yacht-Urlaub',
    items: [
      {
        q: 'Wie lange gibt es Yacht-Urlaub.net bereits?',
        a: 'Yacht-Urlaub.net ist seit 2013 erfolgreich am Markt. In dieser Zeit haben wir tausende begeisterte Gäste an Bord begrüßen dürfen und uns als einer der führenden Anbieter für Segel- und Yachtreisen im deutschsprachigen Raum etabliert.',
      },
      {
        q: 'Warum setzt sich Yacht-Urlaub.net gegen Preisdumping ein?',
        a: 'Der Yachtcharter-Markt leidet unter Druck durch Discount-Portale und unseriöse Angebote, die häufig in schlechtem Service, versteckten Kosten, schlecht gewarteten Yachten oder gar Charterabsagen enden. Als Mitgründer der European Yachting Alliance setzen wir aktiv Maßstäbe für faire Standards, transparente Preise und sichere Buchungen. Seriosität und Qualität sparen am Ende mehr Geld als vermeintliche Billigangebote.',
      },
      {
        q: 'Ist Yacht-Urlaub.net ein vertrauenswürdiger Anbieter?',
        a: 'Ja. Wir sind Trusted Shops zertifiziert und tragen das Charter Confidence Seal von Sealogy. Wir sind 100 % eigenfinanziert und unabhängig und haben die European Yachting Alliance mitgegründet, die sich für Transparenz und Fairness im Yachtcharter einsetzt. Zahlreiche Google-Bewertungen unserer Gäste sprechen für sich.',
      },
      {
        q: 'Warum sollte ich meinen Urlaub über einen seriösen Anbieter buchen?',
        a: 'Professionelle Agenturen bieten geprüfte Eigner und Flotten, transparente Preise, Trusted Shops Käuferschutz, persönliche Beratung, Unterstützung bei Problemen und exklusiv geprüfte Yachten. Billige Online-Portale sparen im Vorfeld wenige Euro – kosten aber häufig deutlich mehr, wenn Probleme auftreten.',
      },
    ],
  },
  {
    cat: 'Anreise & Logistik',
    items: [
      {
        q: 'Wie reise ich zum Heimathafen der Yacht an?',
        a: 'Die Anreise erfolgt individuell. Bei entfernteren Zielen empfehlen wir eine Flugreise. Unsere Heimathäfen werden strategisch so gewählt, dass sie gut erreichbar sind. Wir helfen gerne bei der Flugplanung und arbeiten mit Skyscanner zusammen, um die besten Flugoptionen zu finden.',
      },
      {
        q: 'Wie oft gehen wir während der Reise an Land?',
        a: 'Landausflüge sind täglich geplant, je nach Route und Wetterlage. Wenn wir in Buchten ankern, nutzt die Crew das motorisierte Dinghy, um ans Ufer zu gelangen und die Umgebung zu erkunden. In Marinas und Häfen ist der Landgang direkt möglich.',
      },
    ],
  },
  {
    cat: 'An Bord',
    items: [
      {
        q: 'Wer begleitet uns auf der Yacht?',
        a: 'An Bord sind die gebuchten Gäste, der Skipper (verantwortlich für Sicherheit und Wohlbefinden der Crew, rund um die Uhr verfügbar) sowie optionaler Bord-Service, sofern gebucht. Der Skipper ist Ihr Gastgeber, Guide und Sicherheitsverantwortlicher in einem.',
      },
      {
        q: 'Wie sind die Kabinen und die Unterbringung an Bord?',
        a: 'Die Kabinenaufteilung variiert je nach Yachttyp (Segelboot, Katamaran, Motoryacht) und Besatzungszahl. Katamarane bieten besonders viel Platz und separate Kabinen in beiden Rümpfen. Detaillierte Grundrisse helfen Ihnen, sich die Unterbringung vorzustellen. Auf Wunsch senden wir Ihnen die Deckpläne Ihrer Yacht.',
      },
      {
        q: 'Wo übernachten wir während der Reise?',
        a: 'Sie schlafen in den modernen Kabinen der Yacht für alle gebuchten Nächte. Das Schlafen unter dem Sternenhimmel auf Deck ist optional. Das Gepäck reist die gesamte Reise mit. Das Zuhause auf der Reise ist die Yacht – außer bei Landausflügen.',
      },
      {
        q: 'Wo verbringt man die Nächte – Hafen, Bucht oder offenes Meer?',
        a: 'Typischerweise entweder in idyllischen Buchten vor Anker oder in gut ausgestatteten Marinas und sicheren Stadthäfen. Die Planung richtet sich nach Route, Wetter und Wünschen der Crew. Buchtenanker bieten Ruhe und Natur; Marinas ermöglichen Zugang zu Restaurants und Einrichtungen. In der Karibik, Thailand und den Seychellen ankern wir meist in Buchten oder an Bojen.',
      },
      {
        q: 'Gibt es Duschen an Bord?',
        a: 'Ja – sowohl Innen- als auch Außenduschen sind vorhanden und werden von den Wassertanks der Yacht versorgt. In besuchten Häfen und Marinas stehen zusätzlich Duschen zur Verfügung. Beim Ankern in Buchten ist das Meer oft die erfrischendste Alternative.',
      },
      {
        q: 'Ist WLAN während des Törns verfügbar?',
        a: 'WLAN kann optional gebucht werden und ist überall dort verfügbar, wo Mobilfunknetze existieren. In abgelegenen Buchten kann die Verbindung schwach oder nicht vorhanden sein – was für viele Gäste Teil des echten Segelerlebnisses ist. Eine lokale SIM-Karte als Backup empfiehlt sich.',
      },
      {
        q: 'Wie sieht es mit der Stromversorgung aus?',
        a: 'In Häfen und Marinas: 230V Strom (normale europäische Steckdosen). Beim Ankern in Buchten: 12V-Anschlüsse sowie USB-Anschlüsse zum Laden von Smartphones. Für größere Geräte empfiehlt sich ein eigener Adapter oder Powerbank.',
      },
      {
        q: 'Was ist ein Dinghy?',
        a: 'Ein Dinghy ist ein aufblasbares Beiboot, das Landausflüge ermöglicht, wenn die Hauptyacht vor Anker liegt oder an einer Boje befestigt ist. Es dient als Transportmittel zu Stränden, Grotten und Dörfern. Seit 2017 setzen wir verstärkt auf umweltfreundliche Elektromotoren für das Dinghy.',
      },
      {
        q: 'Was muss ich mitnehmen?',
        a: 'Keine Spezialausrüstung erforderlich. Empfohlen: leichte Kleidung, Badebekleidung, Sonnenschutz, rutschfeste Bootsschuhe (keine schwarzen Sohlen), Windjacke und ein kleiner Tagesrucksack. Eine detaillierte Packliste erhalten Sie ca. 2–3 Monate vor Abreise im Pre-Törn-Briefing.',
      },
      {
        q: 'Was passiert bei schlechtem Wetter?',
        a: 'Sicherheit hat oberste Priorität. Der Zeitpunkt der Törns wird so gewählt, dass schlechtes Wetter unwahrscheinlich ist. Bei unerwarteten Wetterbedingungen bleiben wir im Hafen oder suchen eine geschützte Bucht auf. Der Skipper trifft alle Entscheidungen zur Sicherheit der Crew. Alternativer Plan: Landausflüge und Kulturerkundungen.',
      },
      {
        q: 'Welche Unterschiede gibt es zwischen Segelyacht und Motoryacht?',
        a: 'Beide Typen haben eigene Motoren. Motoryachten bieten mehr Platz, stärkere Motoren (bis zu 40+ Knoten) und sind schneller, aber lauter und teurer im Betrieb. Segelyachten sind ruhiger, günstiger, nutzen Windkraft und reduzieren den Dieselverbrauch erheblich. Die Wahl hängt von persönlichem Geschmack und gewünschtem Erlebnis ab.',
      },
      {
        q: 'Was unterscheidet einen Hafen von einer Marina?',
        a: 'Marinas bieten überlegene Infrastruktur: Duschen, Strom- und Wasseranschlüsse, Supermarkt in der Nähe und Sicherheitsdienst – typischerweise für kleinere Fahrzeuge. Häfen sind stadtnäher mit weniger Annehmlichkeiten, meist öffentlich verwaltet; Marinas häufig privat betrieben.',
      },
    ],
  },
  {
    cat: 'Verpflegung',
    items: [
      {
        q: 'Wie funktioniert die Verpflegung an Bord?',
        a: 'Zwei Optionen: Bordservice (Crew-Service mit Mahlzeiten) oder Selbstverpflegung. An Bord stehen immer zwei Kühlschränke, 2–3 Gaskocher und ein Backofen zur Verfügung. Erste Proviantbestellung kann über unseren Partner vororganisiert oder selbst erledigt werden. Weitere Einkaufsmöglichkeiten bieten sich während des Törns. In Häfen locken lokale Restaurants.',
      },
      {
        q: 'Was ist die Bordkassa?',
        a: 'Alle Gäste zahlen zu Törnbeginn einen vereinbarten Betrag ein, der für gemeinsame Ausgaben genutzt wird: Proviant, Liegeplatz- und Marinagebühren, Kraftstoff. Am Ende erfolgt eine Abrechnung mit Rückzahlung oder Nachzahlung. Alternativ buchbar als Fixpreis-Paket im Voraus.',
      },
      {
        q: 'Was genau ist der Bordservice?',
        a: 'Der optionale Bordservice umfasst Frühstück, Mittagessen (und Abendessen auf Wunsch). Die Crew kümmert sich um die Pantry und den Komfort der Gäste. Er erfordert einen eigenen Schlafplatz (wird automatisch eingeplant). Menüwünsche sind verhandelbar; Allergien und Unverträglichkeiten müssen vorab mitgeteilt werden.',
      },
    ],
  },
  {
    cat: 'Buchung & Kosten',
    items: [
      {
        q: 'Wie kann ich meinen Yacht-Urlaub buchen?',
        a: 'Zwei Wege: Paket-Buchung (fertiges Segelpaket direkt buchen) oder Individualanfrage (Urlaubsplaner oder Kontaktformular). Zahlungsstruktur: 25% bei Buchung, 25% zu einem späteren Zeitpunkt, 50% sechs Wochen vor Abreise. Kreditkarte wird akzeptiert. Für Individualanfragen erhalten Sie passende Yacht-Vorschläge mit 7-tägiger unverbindlicher Optionsfrist.',
      },
      {
        q: 'Welche Zahlungsmethoden akzeptieren Sie?',
        a: 'Wir akzeptieren Kreditkarte (VISA, Mastercard, AMEX), giropay und Überweisung. Eine Reiserücktrittsversicherung ist optional buchbar und wird empfohlen.',
      },
      {
        q: 'Was ist die Kaution?',
        a: 'Die Kaution deckt potenzielle Schäden durch Gäste (verstopfte Toiletten, beschädigte Teile, verlorene Gegenstände). Nautisches Verschulden des Skippers ist ausgeschlossen. Die Kaution wird per Kreditkartenreservierung hinterlegt und nach dem Törn freigegeben. Die Höhe steht in der Buchungsbestätigung. Kautionsversicherungen können die Summe reduzieren.',
      },
      {
        q: 'Was kostet mich die gesamte Reise?',
        a: 'Kostenbestandteile: Grundpreis (Yacht/Übernachtungen/Skipper gemäß Angebot) + Endreinigung (€20–40 p.P.) + Liegegebühren (€0–120/Nacht je nach Saison, Marina oder Bucht) + Extras (WLAN, SUP, Bordservice) + Proviant (€150–400 p.P.) + Kraftstoff (bei Segelyacht 7 Tage ca. €30–60 p.P.) + Anreisekosten. Ein Kraftstoffpaket-Festpreis lohnt sich oft.',
      },
      {
        q: 'Was passiert bei einer Stornierung?',
        a: 'Unsere Stornobedingungen sind in den AGB geregelt. Grundsätzlich gilt: Je früher storniert wird, desto geringer die Stornogebühren. Wir empfehlen ausdrücklich den Abschluss einer Reiserücktrittsversicherung.',
      },
    ],
  },
  {
    cat: 'Segeln & Charter',
    items: [
      {
        q: 'Sind Segelkenntnisse erforderlich?',
        a: 'Nein, für einen Törn mit Skipper sind keinerlei Vorkenntnisse nötig. Vorhandene Erfahrung ist willkommen und kann weiterentwickelt werden. Für Bareboat-Charter (ohne Skipper) ist ein anerkannter Segelschein (z.B. SKS) und Logbuch-Nachweis erforderlich.',
      },
      {
        q: 'Kann ich selbst segeln und die Yacht steuern?',
        a: 'Keine Verpflichtung, aber herzlich eingeladen! Jeder darf das Steuer übernehmen, Segel trimmen und aktiv mithelfen. Eine hervorragende Gelegenheit, praktische Segelerfahrung zu sammeln und das Erlebnis noch tiefer zu genießen.',
      },
      {
        q: 'Kann ich eine Yacht auch ohne Skipper chartern?',
        a: 'Ja, Bareboat-Charter ist möglich, wenn Sie über den entsprechenden Segelschein und ausreichend Erfahrung verfügen. Alternativ bieten wir Co-Skipper-Service an – ein erfahrener Skipper begleitet Sie als Unterstützung, während Sie selbst das Ruder übernehmen.',
      },
    ],
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid var(--gray-mid)' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          padding: '1.25rem 0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
          fontFamily: 'DM Sans, sans-serif',
        }}
      >
        <span style={{ fontSize: '0.95rem', fontWeight: 600, color: open ? 'var(--blue)' : 'var(--navy)', lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: '1.2rem', color: 'var(--blue)', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{ paddingBottom: '1.25rem', color: 'var(--gray)', fontSize: '0.9rem', lineHeight: 1.8 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.flatMap(cat =>
    cat.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    }))
  ),
}

export default function FaqPage() {
  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="FAQ – Häufige Fragen zu Yachtreisen"
        description="Antworten auf die häufigsten Fragen: Brauche ich Segelerfahrung? Was kostet ein Törn? Bordkassa, Kaution, Wetter, Kabinen, WLAN und mehr. Seit 2013 am Markt."
        canonical="/faq"
        schema={faqSchema}
      />
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '5rem 0 4rem' }}>
        <div className="container">
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Häufige Fragen</p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem' }}>FAQ</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', maxWidth: '500px', lineHeight: 1.8 }}>
            Antworten auf die häufigsten Fragen rund um Ihren Yacht-Urlaub. Seit 2013 begleiten wir Sie von der ersten Anfrage bis zur Rückkehr.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          {faqs.map((cat, i) => (
            <motion.div
              key={cat.cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              style={{ marginBottom: '3rem' }}
            >
              <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '2px solid var(--blue)' }}>
                {cat.cat}
              </h2>
              {cat.items.map(item => <FaqItem key={item.q} {...item} />)}
            </motion.div>
          ))}

          {/* CTA */}
          <div style={{ background: 'var(--gray-light)', borderRadius: '4px', padding: '2.5rem', textAlign: 'center', marginTop: '2rem' }}>
            <h3 style={{ fontFamily: 'DM Sans, sans-serif', color: 'var(--navy)', fontSize: '1.3rem', marginBottom: '0.75rem' }}>
              Noch Fragen?
            </h3>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Wir beraten Sie gerne persönlich — telefonisch Mo–Fr 10–19 Uhr, Sa 13–17 Uhr.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-navy">+43 1 997 15 82</a>
              <a href="#kontakt" className="btn btn-primary">Nachricht senden →</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
