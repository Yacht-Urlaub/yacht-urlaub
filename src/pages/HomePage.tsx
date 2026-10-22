import SEO from '../components/SEO'
import { useLang, isEnHost, BASE_DE, BASE_EN, MAIL } from '../i18n'
import Hero from '../components/Hero'
import Zielgruppen from '../components/Zielgruppen'
import Packages from '../components/Packages'
import News from '../components/News'
import Bewertungen from '../components/Bewertungen'
import SektionTeaser from '../components/SektionTeaser'
import Partner from '../components/Partner'
import EventPopup from '../components/EventPopup'

export default function HomePage() {
  const lang = useLang()
  const base = isEnHost() ? BASE_EN : BASE_DE
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: lang === 'en' ? 'Yacht-Holiday' : 'Yacht-Urlaub',
    description: lang === 'en' ? 'Quality sailing and yacht trips since over 10 years' : 'Segel- und Yachtreisen mit Qualität seit über 10 Jahren',
    url: base,
    telephone: '+43-1-997-15-82',
    email: MAIL[lang],
    founder: { '@type': 'Person', name: 'Manuel Göschl' },
    areaServed: lang === 'en'
      ? ['Croatia', 'Greece', 'Balearic Islands', 'Caribbean', 'Seychelles', 'Thailand']
      : ['Kroatien', 'Griechenland', 'Balearen', 'Karibik', 'Seychellen', 'Thailand'],
    sameAs: [
      'https://www.facebook.com/yachturlaub/',
      'https://www.instagram.com/yacht.holiday/',
      'https://www.linkedin.com/company/yacht-urlaub',
    ],
  }
  return (
    <main>
      <SEO
        title={lang === 'en' ? "Yacht-Holiday – A Taste of Paradise | Sailing holidays" : "Yacht-Urlaub – A Taste of Paradise | Segel- & Yachtreisen"}
        description={lang === 'en'
          ? 'Yacht-Holiday: over 10 years of quality sailing and yacht trips. From Croatia to the Caribbean, Seychelles and Thailand — for beginners, families and luxury travellers.'
          : 'Yacht-Urlaub: Seit über 10 Jahren Segel- und Yachtreisen mit Qualität. Von Kroatien bis Karibik, Seychellen und Thailand – für Einsteiger, Familien und Luxury-Reisende.'}
        schema={homeSchema}
      />
      <Hero />
      <Zielgruppen />
      <Bewertungen />
      <Packages />
      <News />
      <SektionTeaser />
      <Partner />
      <EventPopup />
    </main>
  )
}
