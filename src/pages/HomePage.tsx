import Hero from '../components/Hero'
import Zielgruppen from '../components/Zielgruppen'
import News from '../components/News'
import DestinationenOverview from '../components/DestinationenOverview'
import YachtenOverview from '../components/YachtenOverview'
import Bewertungen from '../components/Bewertungen'
import Team from '../components/Team'
import Kontakt from '../components/Kontakt'

export default function HomePage() {
  return (
    <main>
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
