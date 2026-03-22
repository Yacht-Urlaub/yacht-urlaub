import SEO from '../components/SEO'
import Hero from '../components/Hero'
import Zielgruppen from '../components/Zielgruppen'
import News from '../components/News'
import DestinationenOverview from '../components/DestinationenOverview'
import YachtenOverview from '../components/YachtenOverview'
import Bewertungen from '../components/Bewertungen'
import Team from '../components/Team'
import Kontakt from '../components/Kontakt'

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
  return (
    <main>
      <SEO
        title="Yacht-Urlaub – A Taste of Paradise | Segel- & Yachtreisen"
        description="Yacht-Urlaub: Seit über 10 Jahren Segel- und Yachtreisen mit Qualität. Von Kroatien bis Karibik, Seychellen und Thailand – für Einsteiger, Familien und Luxury-Reisende."
        canonical="/"
        schema={homeSchema}
      />
      <Hero />
      <Zielgruppen />
      <News />
      <DestinationenOverview />
      <YachtenOverview />
      <Bewertungen />
      <Team />
      <Kontakt />
    </main>
  )
}
