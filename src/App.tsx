import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Zielgruppen from './components/Zielgruppen'
import News from './components/News'
import Destinationen from './components/Destinationen'
import Bewertungen from './components/Bewertungen'
import Team from './components/Team'
import Kontakt from './components/Kontakt'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Zielgruppen />
        <News />
        <Destinationen />
        <Bewertungen />
        <Team />
        <Kontakt />
      </main>
      <Footer />
      <WhatsApp />
    </>
  )
}
