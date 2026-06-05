import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SEO from '../components/SEO'
import { faqsEn } from '../data/faqEn'
import { useLang } from '../i18n'

// FAQ 1:1 von yacht-urlaub.net/faq übernommen
const faqs: { q: string; a: string }[] = [
  { q: "Wie lange gibt es Yacht-Urlaub.net bereits?", a: "Wir sind seit 2013 erfolgreich am Markt und haben seither tausende zufriedene Gäste an Bord willkommen geheißen." },
  { q: "Warum setzt sich Yacht-Urlaub.net gegen Preisdumping und unseriöse Angebote ein?", a: "Der Yachtchartermarkt wird zunehmend von Billigportalen, Preisdumping und zweifelhaften Angeboten unter Druck gesetzt. Das führt oft zu:\n• mangelndem Service,\n• versteckten Zusatzkosten,\n• schlecht gewarteten Yachten,\n• und im schlimmsten Fall: kompletten Charterausfällen.\nAls Mitgründer der European Yachting Alliance setzen wir uns aktiv für faire Marktstandards, transparente Preise und sichere Buchungen ein.\nDer in unserem Newsletter empfohlene Artikel auf Yacht.de vom November 2025 zeigt eindrücklich, welche Risiken extrem niedrige Onlinepreise bergen: Yacht.de Artikel lesen" },
  { q: "Ist Yacht-Urlaub.net ein vertrauenswürdiger Anbieter?", a: "Ja. Yacht-Urlaub.net ist:\n• Trusted Shops zertifiziert\n• Träger des Charter Confidence Siegels der Sealogy (ehem. E.I.S.)\n• 100 % eigenfinanziert\n• Mitgründer der European Yachting Alliance (EYA) – einer Initiative für Transparenz, Fairness und Seriosität im europäischen Yachtchartermarkt.\nDiese Unabhängigkeit garantiert, dass wir ausschließlich mit geprüften Eignern und professionellen Flottenbetreibern zusammenarbeiten." },
  { q: "Warum sollte ich meinen Urlaub über einen seriösen Anbieter wie Yacht-Urlaub.net buchen?", a: "Eine professionelle Agentur bietet:\n• geprüfte Eigner & Flotten\n• transparente Preise ohne versteckte Gebühren\n• Absicherung durch Trusted Shops\n• persönliche Beratung & Betreuung\n• Hilfe im Problemfall\n• Zugang zu exklusiven, geprüften Yachten\nUnsere Erfahrung seit 2013 zeigt: Seriosität und Qualität sparen im Yacht-Charter-Bereich mehr Geld als vermeintliche Billigangebote." },
  { q: "Wie reise ich zum Heimathafen der Yacht an? Gibt es einen Flughafen in der Nähe?", a: "Die Anreise zum Heimathafen erfolgt individuell. Falls sich ein Flughafen in der Nähe befindet, ist die Anreise per Flugzeug die angenehmste Option, vorallem wenn eine Anreise mit dem Auto/Bus/Zug zu weit ist. Unsere Heimathäfen sind so gewählt, dass sie gut erreichbar sind.\nUnser Partner für Flüge» helfen bei der Planung." },
  { q: "Wie oft gehen wir während der Reise an Land?", a: "Während Ihrer Reise sind täglich Landgänge geplant, abhängig von der jeweiligen Route. In den Buchten, in denen wir ankern, können Sie das motorisierte Beiboot (Dinghy) nutzen, um ans Ufer zu gelangen und die Umgebung zu erkunden." },
  { q: "Wer begleitet uns auf der Yacht?", a: "An Bord befinden sich die mitreisenden Personen laut Buchung sowie der Skipper, der für Ihre Sicherheit und das Wohl aller Gäste verantwortlich ist. Der Skipper steht Ihnen rund um die Uhr zur Verfügung. Sollte ein Bordservice gebucht werden, ist dieser ebenfalls mit an Bord." },
  { q: "Wie sind die Kabinen und die Unterbringung an Bord der Yacht?", a: "Je nach gebuchtem Bootstyp (Segelyacht, Katamaran oder Motoryacht) und der Anzahl der mitreisenden Personen variieren die Kabinen und Ausstattungen an Bord. Detaillierte schematische Darstellungen (siehe Abbildung) des Innenraums der Yachten helfen, sich die Unterbringung besser vorzustellen." },
  { q: "Wo übernachten wir während der Reise?", a: "Die Nächte verbringen Sie auf einer modernen Yacht. Alle gebuchten Nächte sind in komfortablen Kabinen vorgesehen. Wenn Sie möchten, können Sie auch unter freiem Himmel an Deck schlafen. Ihr gesamtes Gepäck wird während der gesamten Woche mitgenommen, und das Leben an Bord spielt sich – außer bei den Landgängen – hauptsächlich auf der Yacht ab.\nZu unserer Yacht-Sektion für weitere Details, Bilder und Informationen." },
  { q: "Wo verbringt man die Nächte – im Hafen, vor Anker in einer Bucht oder gar am offenen Meer?", a: "In der Regel verbringt man die Nächte entweder in idyllischen Buchten vor Anker oder in gut ausgestatteten Marinas bzw. sicheren Stadt-Häfen. Die genaue Planung hängt von der Route, den Wetterbedingungen und den Wünschen der Crew ab. Während Ankerbuchten Ruhe und Naturerlebnis bieten, ermöglichen Häfen Landgänge und einfachen Zugang zu Restaurants, sanitären Einrichtungen und Bars.  Speziell in der Karibik, in Thailand oder auf den Seychellen erfolgen die Übernachtungen meist vor Anker oder an einer Boje. Für den täglichen Transfer an Land stehen das Beiboot oder optional gemietete Stand-Up-Paddles zur Verfügung." },
  { q: "Gibt es Duschen an Bord der Yacht?", a: "An Bord stehen sowohl vollwertige Innen- als auch Außenduschen zur Verfügung. Diese werden über den bordeigenen Wassertank versorgt. Zusätzlich haben Sie die Möglichkeit, in den Häfen und Marinas, die während des Törns angelaufen werden, weitere Duschen zu nutzen." },
  { q: "Ist WLAN während des Törns verfügbar?", a: "WLAN kann optional hinzugebucht werden und ist rund um die Uhr verfügbar, solange das mobile Netz in der Region verfügbar ist. Bitte beachten Sie, dass die Netzabdeckung je nach Standort variieren kann." },
  { q: "Welche Unterschiede gibt es zwischen einer Segelyacht und einer Motoryacht?", a: "Beide Yachtarten sind motorisiert. Motoryachten bieten mehr Platz und sind mit stärkeren Motoren ausgestattet, die Geschwindigkeiten von bis zu 40 Knoten und mehr ermöglichen. Segelyachten sind etwas leiser während der Fahrt, günstiger und nutzen Windkraft, sodass Sie auch ohne Dieselverbrauch unterwegs sein können. Je nach Wunsch können Sie bei einem individuellen Törn zwischen beiden Yachtarten wählen." },
  { q: "Was unterscheidet einen Hafen von einer Marina?", a: "Beide Begriffe beziehen sich auf Orte, an denen Schiffe festgemacht werden. Eine Marina bietet jedoch eine bessere Infrastruktur, einschließlich Duschen, Strom- und Wasseranschlüssen sowie oft einem kleinen Supermarkt in der Nähe. Marinas sind meist für kleinere Schiffe und Yachten ausgelegt und bieten zusätzliche Sicherheitsvorkehrungen. Häfen hingegen sind häufig zentrumsnäher und bieten weniger Ausstattung. In großen Städten gibt es sowohl Häfen als auch Marinas, wobei Marinas oft privat betrieben werden, während Häfen in der Regel von der Stadt oder dem Staat verwaltet werden." },
  { q: "Sind Segelkenntnisse erforderlich?", a: "Es werden keine Vorkenntnisse im Segeln vorausgesetzt. Natürlich sind bereits vorhandene Segelerfahrungen willkommen, und wir freuen uns, diese bei Interesse weiter auszubauen. Auch für Anfänger ist diese Reise eine großartige Gelegenheit, die Welt des Segelns kennenzulernen und in einen aktiven Segelurlaub einzutauchen." },
  { q: "Kann ich selbst Segeln und die Yacht steuern?", a: "Selbstverständlich! Es besteht keine Verpflichtung zu Segeln, aber jeder ist herzlich eingeladen, das Steuer zu übernehmen, die Segel zu trimmen und aktiv in die Welt des Segelns einzutauchen. Dies ist eine tolle Möglichkeit, praktische Erfahrungen zu sammeln und den Segeltörn noch intensiver zu genießen." },
  { q: "Welche Ausrüstung benötige ich für meinen Segelurlaub?", a: "Für Ihren Segelurlaub ist keine spezielle Ausrüstung erforderlich. Eine empfohlene Packliste wird Ihnen im Vorfeld zur Verfügung gestellt, meist während der Vorbesprechung 2-3 Monate vor Reiseantritt. So können Sie sicherstellen, dass Sie alles Notwendige dabei haben, um den Törn zu genießen." },
  { q: "Wie gehen wir bei schlechtem Wetter vor?", a: "Da ein Yacht-Urlaub überwiegend draußen stattfindet, ist er natürlich wetterabhängig. Die Reisezeiträume werden so gewählt, dass Schlechtwetter unwahrscheinlich ist, aber es kann natürlich immer zu unerwarteten Wetterbedingungen kommen. Sollte Schlechtwetter eintreten, wird ein alternativer, wettergerechter Plan vorgeschlagen, wie zum Beispiel spannende Landausflüge, um die Zeit optimal zu nutzen und das Erlebnis weiterhin angenehm zu gestalten." },
  { q: "Wie funktioniert die Verpflegung?", a: "Zusammengefasst: Bordservice oder Selbstversorgung.\nEs gibt 2 Kühlschränke an Bord, die jederzeit in Betrieb sind. Der Ersteinkauf kann bei unserem Partner bestellt werden und steht dann bereits an Bord bereit. Natürlich kann der Einkauf auch selbst organisiert werden. Während des Aufenthaltes gibt es regelmäßig Gelegenheiten zum Einkaufen.\nEs gibt jeden Abend die Möglichkeit, die lokale Gastronomie kennenzulernen, auf Wunsch kann Ihnen Ihr Skipper etwas empfehlen. Es besteht aber auch die Möglichkeit an Bord zu kochen.\n2-3 Kochplatten (Gasherd) und ein Backrohr stehen zur Verfügung. Optional kann auch ein Bordservice gebucht werden. Somit wird für das Wohl der Gäste an Bord gesorgt." },
  { q: "Was ist eigentlich die Bordkassa?", a: "In die Bordkassa zahlen zu Beginn der Reise alle Gäste an Bord einen bestimmten Betrag ein, der gemeinsam vereinbart und bei der Endabrechnung den Ausgaben entsprechend abgestimmt wird. Dieser Betrag wird verwendet für die gemeinsamen Einkäufe (Proviant etc.), Anlege- und Marinagebühren sowie den Spritverbrauch. Alternativ können im Vorfeld die entsprechenden Pauschalen gebucht werden." },
  { q: "Was genau ist der Bordservice?", a: "Ein Bordservice kann bei der Buchung dazu gebucht werden.\nUnser Bordservice kümmert sich um Ihr leibliches Wohl und ist für die Sauberkeit der Pantry (Bootsküche) verantwortlich. Sie werden verwöhnt mit Frühstück und Mittagslunch und wenn gebucht, wird Ihnen auch das Abendessen an Bord serviert.\nBei Buchung muss eine geeignete Schlafkoje miteingerechnet werden. Diese wird bei der Auswahl der Yacht automatisch von uns berücksichtigt. Menüwünsche können vor oder auch während der Reise mit  unserem Bordservice abgesprochen und abgestimmt werden. Etwaig vorhandene Allergien oder Intoleranzen sind uns vor der Reise mitzuteilen, um diese berücksichtigen zu können.\nDer Skipper wird von der Bordkassa mitverpflegt." },
  { q: "Was ist denn ein Dinghy?", a: "Ein Beiboot (auch Dinghy genannt) ist unser Schlauchboot, welches uns erlaubt an Land zu gehen, sollten wir mal vor Anker oder an einer Boje liegen. Es kann nicht nur als Transportmittel, sondern auch als Zeitvertreib dienen, um auch mal die Bucht zu erkunden, in kleine Höhlen zu fahren oder auch den Einkauf zu erledigen. Praktischerweise bieten wir auch Beibootmotoren (oder auch Außenborder oder Dinghymotor genannt) zum Mieten an, damit das Paddeln zu vielleicht fortgeschrittener Stunde nicht so anstrengend wird. Seit der Saison 2017 setzen wir auch umweltschonende Elektromotoren ein." },
  { q: "Wie sieht es mit der Stromversorgung aus?", a: "Wenn die Yacht in einem Hafen oder einer Marina anliegt, haben wir an Bord grundsätzlich 230V Strom (normale europäische Steckdosen). Liegen wir in einer Bucht, gibt es 12V Anschluss mit USB-Stecker, womit man bspw. bequem sein Smartphone aufladen kann." },
  { q: "Wie kann ich meinen Yacht-Urlaub buchen?", a: "Es gibt zwei einfache Möglichkeiten, Ihren Yacht-Urlaub zu buchen:\n• Buchung eines Törn-Package:\n Wählen Sie ein Törn-Package aus und buchen Sie direkt über die \"JETZT BUCHEN\"-Funktion Ihren Segelurlaub.\n• Individuelle Anfrage: \n Nutzen Sie unseren Urlaubsplaner oder senden Sie uns eine Anfrage über das Formular, wenn Sie einen individuellen Törn wünschen.\nNach Abschluss der Buchung eines Törn-Package wird Ihre Yacht reserviert, und Sie erhalten eine Bestätigung in Form einer Rechnung. Die Zahlung erfolgt üblicherweise zu 25% bei Buchung, 25% später und zu weiteren 50% sechs Wochen vor Reiseantritt. Sobald die erste Zahlung eingegangen ist, ist Ihre Yacht bzw. die gebuchten Plätze fix gebucht. Sie können auch bequem per Kreditkarte zahlen. Eine Reiserücktrittsversicherung kann optional abgeschlossen werden – fragen Sie uns nach Angeboten bei der Buchung.\nWenn Sie eine Anfrage für einen individuellen Törn stellen, suchen wir für Sie die passenden Yachten heraus und senden Ihnen ein aktuelles Angebot zu. Sie haben dann sieben Tage Zeit, Ihre favorisierten Yachten unverbindlich zu reservieren (dies nennt man \"Option\"). Geben Sie uns so schnell wie möglich Bescheid, damit wir Ihnen Preis und Verfügbarkeit garantieren können.\nErst nach Ihrer Bestätigung wird die Buchung fixiert und die detaillierten Vorbereitungen beginnen. In einer optionalen Törn-Besprechung haben Sie außerdem die Möglichkeit, Ihren Skipper oder Ihre Skipperin kennenzulernen." },
  { q: "Was ist die Kaution?", a: "Die Kaution sichert mögliche Schäden ab wie - ganz klassisch - verstopfte Toiletten, gebrochene Fenster, verlorene Gegenstände, Schäden am Beiboot oder anderem Equipment, die durch Gäste an Bord entstehen. Schäden aufgrund nautischer Versäumnisse durch den Skipper sind natürlich nicht davon betroffen. Das Ganze klärt auch ganz klar der Crewvertrag ab, der am Beginn der Reise zwischen allen unterzeichnet wird. Sie wird in der Regel per Kreditkartenreservierung hinterlegt und am Ende der Reise wieder freigegeben. Es fließt also in Wahrheit kein Geld. Wie hoch der Betrag ist, seht ihr auf der Buchungsbestätigung.\nDie Kaution kann im Übrigen versichert werden, abhängig unseres Partners vor Ort auch zeitgleich mit einer Reduktion der zu hinterlegbaren Summe. Sprecht uns vor dem Check-In darauf an." },
  { q: "Was kostet mich die gesamte Reise?", a: "Die Kosten für einen Yacht-Urlaub lassen sich in folgende Parts unterteilen:\n• Basis-Preis\n Yacht/Übernachtungen/Skipper je nach Angebot\n• Endreinigung\n Ein fixer Bestandteil, der pro Person auf ca. €20,- - €40,- kommt.\n• Anlegegebühren\n je nach Saison und Zwischenstopps von Tag zu Tag unterschiedlich. Je nach Art des Platzes (Marina/Hafen/Bucht), Region und Saison €0,- - €120,- /pro Nacht und Yacht.\n• Extras\n Es können viele Extras von WLAN bis Stand-Up Paddle oder Außenborder bis hin zu Bordservice gebucht werden. Die Preise sind im jeweiligen Angebot ersichtlich (wenn verfügbar).\n• Proviant/Essen\n Abhängig von den Bedürfnissen der Crew pro Person ca. €150,- - €400,-\n• Spritkosten\n Bei Segelyachten 7 Tage pro Person ca. €30,- - €60,-. Für eine Preisgarantie empfehlen wir die Spritpauschale.\n• Anreise\n Zur Preisabschätzung für Flüge oder Busanreise helfen unsere Partner - bitte den Links folgen." },
]

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0)
  const lang = useLang()
  const list = lang === 'en' ? faqsEn : faqs

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: list.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <main style={{ paddingTop: '72px' }}>
      <SEO
        title="FAQ – Häufige Fragen zum Yacht-Urlaub"
        description="Alle Antworten rund um Ihren Segelurlaub: Buchung, Anreise, Leben an Bord, Bordkassa, Kaution, Verpflegung, Kosten und mehr."
        canonical="/faq"
        schema={schema}
      />

      {/* Hero */}
      <div style={{ background: 'var(--navy)', padding: '4rem 0 3.5rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--blue-light)', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
            Gut zu wissen
          </p>
          <h1 style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#fff', marginBottom: '0.75rem' }}>FAQ</h1>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>
            {lang === 'en' ? 'Frequently asked questions about your yacht holiday — and our answers.' : 'Häufig gestellte Fragen rund um Ihren Yacht-Urlaub — und unsere Antworten.'}
          </p>
        </div>
      </div>

      {/* Accordion */}
      <section style={{ background: 'var(--gray-light)', padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '820px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {list.map((f, i) => (
              <div key={f.q} style={{ background: '#fff', borderRadius: '6px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: '100%', textAlign: 'left', padding: '1.15rem 1.5rem',
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                    fontFamily: 'DM Sans, sans-serif',
                  }}
                >
                  <span style={{ color: 'var(--navy)', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.45 }}>{f.q}</span>
                  <span style={{ color: 'var(--blue)', fontSize: '1.2rem', flexShrink: 0, transform: open === i ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p style={{ padding: '0 1.5rem 1.35rem', color: '#444', fontSize: '0.9rem', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Noch Fragen? */}
          <div style={{ marginTop: '3rem', background: 'var(--navy)', borderRadius: '6px', padding: '2.5rem', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'DM Sans, sans-serif', color: '#fff', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              {lang === 'en' ? 'Still have questions? We are happy to hear from you!' : 'Bei noch offenen Fragen freuen wir uns über Ihre Nachricht!'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              {lang === 'en' ? 'Call us or write to us — we reply personally.' : 'Rufen Sie uns an oder schreiben Sie uns — wir antworten persönlich.'}
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+43199715820" className="btn btn-outline">+43 1 997 15 82</a>
              <a href="#kontakt" className="btn btn-primary">{lang === 'en' ? 'Send a message →' : 'Nachricht senden →'}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}