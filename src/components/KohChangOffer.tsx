import { useState } from 'react'
import { WhatsAppIcon } from './Icons'

// Kabinen-Angebot Koh Chang, Thailand — Dezember 2026. Einmaliges Termin-
// Angebot, daher (anders als die Packages) nicht in components/Packages.tsx
// gepflegt, sondern eigenständig hier. Klappt standardmäßig zu, der Button
// setzt die Reise-Auswahl im bestehenden Buchungsformular der Seite und
// scrollt dorthin.

const WHATSAPP_NUMBER = '436602652481'
const WHATSAPP_MSG = 'Hallo! Ich interessiere mich für das Kabinen-Angebot Koh Chang (09.–20.12.2026) und hätte dazu noch eine Frage.'

const days: { date: string; place: string; text: string }[] = [
  { date: 'Mi 09.12.', place: 'Koh Chang Marina', text: 'Check-in ab 15:00. Kabine beziehen, Einkauf für die ersten Tage und erstes Abendessen am Hafen.' },
  { date: 'Do 10.12.', place: 'Koh Wai', text: 'Keine Straßen, keine Bankomaten, kaum Internet. Korallenriffe an der Nordküste, Schnorcheln direkt vom Boot.' },
  { date: 'Fr 11.12.', place: 'Koh Mak · Ao Kao', text: 'Kokos- und Bananenplantagen, mit Rad oder Roller über die Insel. Am Abend kleine Strandbars an der Südwestküste.' },
  { date: 'Sa 12.12.', place: 'Koh Kut · Ao Tapao', text: 'Erster Stopp an der Westküste von Koh Kut: langer Sandstrand und klares Wasser.' },
  { date: 'So 13.12.', place: 'Koh Kut · Ao Klong Chao', text: 'Dschungel und Wasserfälle. Mit dem Kajak den Klong-Chao-Fluss hinauf zum Wasserfall.' },
  { date: 'Mo 14.12.', place: 'Koh Kut · Ao Jark', text: 'Ruhige Badebuchten im Süden der Insel, Abendessen vor Anker.' },
  { date: 'Di 15.12.', place: 'Koh Rang', text: 'Meeresnationalpark und das beste Schnorchel- und Tauchrevier des Archipels. Nacht vor einer unbewohnten Insel.' },
  { date: 'Mi 16.12.', place: 'Koh Kham', text: 'Kleine Insel vor Koh Mak mit Sandstrand und Riff, nur wenige Seemeilen entfernt.' },
  { date: 'Do 17.12.', place: 'Koh Mak · Ao Suan Yai', text: '2 km weißer Sandstrand an der Nordwestküste, Aussichtspunkt mit Blick bis Koh Chang.' },
  { date: 'Fr 18.12.', place: 'Koh Ngam', text: 'Kleine Inselgruppe mit Sandbank und Riffen, ideal für einen entspannten Badetag.' },
  { date: 'Sa 19.12.', place: 'Bang Bao → Marina', text: 'Fischerdorf auf Stelzen mit Markt und Seafood-Restaurants. Am Abend zurück in die Marina.' },
  { date: 'So 20.12.', place: 'Koh Chang Marina', text: 'Check-out bis 09:00.' },
]

const gallery = [
  { src: '/images/kabinen/koh-chang/gallery/g-bucht-katamaran.webp', alt: 'Katamaran vor Anker in einer Bucht' },
  { src: '/images/kabinen/koh-chang/gallery/g-steg.webp', alt: 'Holzsteg zum Palmenstrand' },
  { src: '/images/kabinen/koh-chang/gallery/g-strand-palmen.webp', alt: 'Weißer Sandstrand unter Palmen' },
  { src: '/images/kabinen/koh-chang/gallery/g-deck-sonnenuntergang.webp', alt: 'Sonnenuntergang vom Vordeck' },
  { src: '/images/kabinen/koh-chang/gallery/g-schaukel.webp', alt: 'Schaukel am Strand' },
  { src: '/images/kabinen/koh-chang/gallery/g-katamaran-anker.webp', alt: 'Island Spirit 410 auf türkisem Wasser' },
  { src: '/images/kabinen/koh-chang/gallery/g-buddha.webp', alt: 'Goldener Buddha über der Küste' },
  { src: '/images/kabinen/koh-chang/gallery/g-herz-sunset.webp', alt: 'Sonnenuntergang am Strand' },
  { src: '/images/kabinen/koh-chang/gallery/g-schaukel-abend.webp', alt: 'Strandschaukel am Abend' },
]

const factStyle = { background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column' as const, gap: '0.35rem' }
const factLabel = { fontSize: '0.72rem', color: 'var(--gray)', textTransform: 'uppercase' as const, letterSpacing: '0.06em' }
const factValue = { fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }
const h2Style = { fontFamily: 'DM Sans, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }

export default function KohChangOffer({ onRequest }: { onRequest: () => void }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ maxWidth: '980px', margin: '0 auto 3rem', background: '#fff', border: '1px solid var(--gray-mid)', borderRadius: '10px', overflow: 'hidden' }}>

      {/* Kopfzeile — immer sichtbar, Klick klappt auf/zu */}
      <button
        type="button"
        className="kc-header"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          all: 'unset', boxSizing: 'border-box', cursor: 'pointer', width: '100%',
          display: 'grid', gridTemplateColumns: 'minmax(0,180px) minmax(0,1fr) auto',
          gap: '1.5rem', alignItems: 'center', padding: '1.25rem 1.5rem',
        }}
      >
        <img src="/images/kabinen/koh-chang/island-spirit-410.webp" alt="Island Spirit 410 unter Segeln" loading="lazy"
          style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '6px', display: 'block' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 0, textAlign: 'left' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--blue)' }}>
            Kabinen-Angebot · Thailand
          </span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.1rem, 2.4vw, 1.5rem)', lineHeight: 1.2, fontWeight: 800, color: 'var(--navy)' }}>
            Koh Chang: 11 Nächte Inselhüpfen im Golf von Thailand
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', fontSize: '0.82rem', fontWeight: 600, color: '#3d4a5c' }}>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>09.–20.12.2026</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>Island Spirit 410</span>
            <span style={{ padding: '4px 11px', borderRadius: '999px', background: 'var(--gray-light)' }}>3 Doppelkabinen</span>
          </div>
        </div>
        <div className="kc-header-price" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: '#9aa1ac', textDecoration: 'line-through' }}>€ 4.900,–</span>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.7rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 3.550,–</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>pro Doppelkabine</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--blue)' }}>
            {open ? 'Details schließen' : 'Details anzeigen'}
            <span aria-hidden="true" style={{
              display: 'inline-block', width: '8px', height: '8px',
              borderRight: '2px solid var(--blue)', borderBottom: '2px solid var(--blue)',
              transform: open ? 'rotate(-135deg) translate(-1px,-1px)' : 'rotate(45deg) translate(-1px,-1px)',
              transition: 'transform 0.2s',
            }} />
          </span>
        </div>
      </button>

      {open && (
        <div style={{ borderTop: '1px solid var(--gray-mid)', padding: 'clamp(1.25rem, 4vw, 2.5rem)', display: 'flex', flexDirection: 'column', gap: '3rem' }}>

          {/* Intro */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2rem', alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <img src="/images/kabinen/koh-chang/island-spirit-410.webp" alt="Island Spirit 410 Katamaran" loading="lazy"
                style={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', borderRadius: '8px', display: 'block' }} />
              <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                Mit dem Katamaran durch den Koh-Chang-Archipel: Koh Wai, Koh Mak, Koh Kut und der Meeresnationalpark Koh Rang. Kurze Etappen, ruhige Ankerbuchten und Dezember-Trockenzeit. Gebucht wird die ganze Doppelkabine, auch als Einzelperson.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img src="/images/kabinen/koh-chang/skipper-manuel.webp" alt="Skipper Manuel" loading="lazy"
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', objectPosition: '50% 20%', flexShrink: 0 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.9rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Ihr Skipper: Manuel</span>
                  <span style={{ color: 'var(--gray)' }}>führt die Yacht und begleitet Sie die gesamte Reise.</span>
                </div>
              </div>
            </div>
            <aside style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Preis pro Doppelkabine</span>
                <span style={{ fontSize: '1rem', color: '#9aa1ac', textDecoration: 'line-through' }}>statt € 4.900,–</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '2.3rem', fontWeight: 800, lineHeight: 1, color: 'var(--navy)' }}>€ 3.550,–</span>
                <span style={{ fontSize: '0.88rem', color: '#3d4a5c' }}>entspricht € 1.775,– p. P. bei 2 Personen</span>
              </div>
              <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', padding: '0.7rem 0.85rem', borderRadius: '6px', background: '#fbf4d6', fontSize: '0.85rem', lineHeight: 1.4, color: '#5a4a10' }}>
                <span aria-hidden="true" style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                Alleinreisende zahlen den Kabinenpreis und haben die Kabine für sich.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.55rem 1rem', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--gray)' }}>Check-in</span><span style={{ fontWeight: 600 }}>Mi, 09.12.2026 ab 15:00</span>
                <span style={{ color: 'var(--gray)' }}>Check-out</span><span style={{ fontWeight: 600 }}>So, 20.12.2026 bis 09:00</span>
                <span style={{ color: 'var(--gray)' }}>Hafen</span><span style={{ fontWeight: 600 }}>Koh Chang, Thailand</span>
                <span style={{ color: 'var(--gray)' }}>Kaution</span><span style={{ fontWeight: 600 }}>€ 1.500,–</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <a href="#buchungsformular" onClick={onRequest} className="btn btn-primary" style={{ textAlign: 'center', fontSize: '0.92rem' }}>
                  Kabine anfragen
                </a>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textAlign: 'center', padding: '13px', borderRadius: '6px', border: '1.5px solid var(--blue)', color: 'var(--blue)', fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                  <WhatsAppIcon size={17} />WhatsApp +43 660 2652481
                </a>
              </div>
            </aside>
          </section>

          {/* Galerie */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>Eindrücke</h2>
            <div style={{ columns: '3 220px', columnGap: '10px' }}>
              {gallery.map(img => (
                <img key={img.src} src={img.src} alt={img.alt} loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '8px', margin: '0 0 10px', breakInside: 'avoid' }}
                  onError={e => { (e.target as HTMLImageElement).parentElement!.style.display = 'none' }} />
              ))}
            </div>
          </section>

          {/* Yacht */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>Die Yacht</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              <div style={factStyle}><span style={factLabel}>Modell</span><span style={factValue}>Island Spirit 410</span></div>
              <div style={factStyle}><span style={factLabel}>Baujahr</span><span style={factValue}>2017</span></div>
              <div style={factStyle}><span style={factLabel}>Länge</span><span style={factValue}>12,63 m</span></div>
              <div style={factStyle}><span style={factLabel}>Kabinen</span><span style={factValue}>4</span></div>
              <div style={factStyle}><span style={factLabel}>Kojen</span><span style={factValue}>6 + 1 Skipper</span></div>
              <div style={factStyle}><span style={factLabel}>WC</span><span style={factValue}>2</span></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '1.5rem', alignItems: 'center' }}>
              <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.75, color: 'var(--gray)' }}>
                Katamarane liegen ruhig vor Anker und bieten viel Platz an Deck: großes Cockpit, Trampolin am Bug und geringer Tiefgang (ca. 1,4 m) für flache Buchten. Die zwei WCs teilen sich die Gäste.
              </p>
              <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <img src="/images/kabinen/koh-chang/grundriss.webp" alt="Grundriss Island Spirit 410" loading="lazy"
                  style={{ width: '100%', display: 'block', borderRadius: '6px', border: '1px solid var(--gray-mid)' }} />
                <figcaption style={{ fontSize: '0.75rem', color: 'var(--gray)' }}>Grundriss Island Spirit 410</figcaption>
              </figure>
            </div>
          </section>

          {/* Route */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h2 style={h2Style}>Die Route</h2>
              <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--gray)' }}>Rundtörn ab Koh Chang durch die südlichen Inseln, meist 2 bis 4 Stunden unter Segeln pro Tag.</p>
            </div>
            <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--gray-mid)' }}>
              <img src="/images/kabinen/koh-chang/routenkarte-koh-chang.webp" alt="Routenkarte Koh Chang, 11 Nächte" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
              <img src="/images/kabinen/koh-chang/routenkarte-legende.webp" alt="Legende: Startmarina, Zwischenstopp, Hauptroute, Fähre, Flughafen" loading="lazy" style={{ display: 'block', width: '100%', height: 'auto' }} />
            </div>
            <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column' }}>
              {days.map(d => (
                <li key={d.date} style={{ display: 'grid', gridTemplateColumns: '64px minmax(0,1fr)', gap: '1rem', padding: '0.9rem 0', borderTop: '1px solid var(--gray-mid)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{d.date.split(' ')[0]}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--gray)' }}>{d.date.split(' ')[1]}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: 700, fontStyle: 'italic', color: 'var(--blue)' }}>{d.place}</span>
                    <span style={{ fontSize: '0.86rem', lineHeight: 1.55, color: 'var(--gray)' }}>{d.text}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--gray)' }}>Routenänderungen je nach Wind und Wetter vorbehalten. Die Entscheidung trifft der Skipper vor Ort.</p>
          </section>

          {/* Leistungen */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
            <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>Im Kabinenpreis enthalten</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5, color: '#444' }}>
                <li>Doppelkabine für 11 Nächte (1 oder 2 Personen)</li>
                <li>Skipper an Bord</li>
                <li>Katamaran Island Spirit 410 für die gesamte Reise</li>
              </ul>
            </div>
            <div style={{ background: 'var(--gray-light)', border: '1px solid var(--gray-mid)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--navy)' }}>Nicht enthalten</h3>
              <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.88rem', lineHeight: 1.5, color: '#444' }}>
                <li>An- und Abreise</li>
                <li>Bordkasse: Verpflegung, Diesel, Liege- und Nationalparkgebühren</li>
                <li>Kaution € 1.500,– (wird nach der Reise rückerstattet)</li>
              </ul>
            </div>
          </section>

          {/* Anreise */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>Anreise</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>1 · Flug</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>Ab Wien (VIE) oder München (MUC) mit Umstieg in Bangkok nach Trat (TDX). Ab ca. € 700,–.</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>2 · Taxi &amp; Fähre</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>Das Taxi bringt Sie vom Flughafen durchgehend bis zur Marina und fährt mit der Autofähre nach Koh Chang mit.</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '0.9rem', borderTop: '3px solid var(--gold)' }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>3 · Check-in</span>
                <span style={{ fontSize: '0.88rem', lineHeight: 1.55 }}>Ab 15:00 an Bord. Flüge und Transfers organisieren Sie individuell. Wir empfehlen, <strong>mind.</strong> 1 Tag früher anzureisen.</span>
              </div>
            </div>
          </section>

          {/* Gut zu wissen */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <h2 style={h2Style}>Gut zu wissen</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1px', background: 'var(--gray-mid)', border: '1px solid var(--gray-mid)', borderRadius: '8px', overflow: 'hidden' }}>
              {[
                ['Klima im Dezember', 'Trockenzeit und beste Segelsaison. Rund 30 °C Luft, ca. 28 °C Wasser, beständiger Nordostwind.'],
                ['Einreise', 'Für österreichische und deutsche Staatsbürger visumfrei. Vor Abflug online die Thailand Digital Arrival Card (TDAC) ausfüllen.'],
                ['Bargeld', 'Thai Baht mitnehmen. Auf Koh Wai und Koh Rang gibt es keine Bankomaten.'],
                ['Zeitverschiebung', '+6 Stunden gegenüber MEZ.'],
                ['Gepäck', 'Weiche Reisetasche statt Hartschalenkoffer. Riffschonende Sonnencreme und Schnorchelbrille einpacken.'],
              ].map(([title, text]) => (
                <div key={title} style={{ background: '#fff', padding: '1.1rem', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--navy)' }}>{title}</span>
                  <span style={{ fontSize: '0.85rem', lineHeight: 1.55, color: 'var(--gray)' }}>{text}</span>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section style={{ background: 'var(--navy)', color: '#fff', borderRadius: '8px', padding: '1.75rem 1.75rem', display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.2rem', fontWeight: 800 }}>Nur 3 Doppelkabinen verfügbar</span>
              <span style={{ fontSize: '0.88rem', opacity: 0.85 }}>09.–20.12.2026 · € 3.550,– pro Kabine</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <a href="#buchungsformular" onClick={onRequest} className="btn btn-gold">Kabine anfragen</a>
              <a href="tel:+4319971582" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff' }}>+43 1 997 15 82</a>
            </div>
          </section>

        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .kc-header { grid-template-columns: 1fr !important; gap: 1rem !important; }
          .kc-header-price { align-items: flex-start !important; text-align: left !important; }
        }
      `}</style>
    </div>
  )
}
