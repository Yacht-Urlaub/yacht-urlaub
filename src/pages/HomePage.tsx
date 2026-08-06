import SEO from '../components/SEO'
import { useLang } from '../i18n'
import Hero from '../components/Hero'
import Zielgruppen from '../components/Zielgruppen'
import Packages from '../components/Packages'
import News from '../components/News'
import Bewertungen from '../components/Bewertungen'
import SektionTeaser from '../components/SektionTeaser'
import Partner from '../components/Partner'

const homeSchema = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Yacht-Urlaub',
  description: 'Segel- und Yachtreisen mit Qualität seit über 10 Jahren',
  url: 'https://www.yacht-urlaub.net',
  telephone: '+43-1-997-15-82',
  email: 'info@yacht-urlaub.net',
  founder: { '@type': 'Person', name: 'Manuel Göschl' },
  areaServed: ['Kroatien', 'Griechenland', 'Balearen', 'Karibik', 'Seychellen', 'Thailand'],
  sameAs: [
    'https://www.facebook.com/yachturlaub/',
    'https://www.instagram.com/yacht.holiday/',
    'https://www.linkedin.com/company/yacht-urlaub',
  ],
}

export default function HomePage() {
  const lang = useLang()
  return (
    <main>
      <SEO
        title={lang === 'en' ? "Yacht-Holiday – A Taste of Paradise | Sailing holidays" : "Yacht-Urlaub – A Taste of Paradise | Segel- & Yachtreisen"}
        description="Yacht-Urlaub: Seit über 10 Jahren Segel- und Yachtreisen mit Qualität. Von Kroatien bis Karibik, Seychellen und Thailand – für Einsteiger, Familien und Luxury-Reisende."
        schema={homeSchema}
      />
      <Hero />
      <Zielgruppen />
      <Bewertungen />
      <Packages />
      <News />
      <SektionTeaser />
      <Partner />
    </main>
  )
}
