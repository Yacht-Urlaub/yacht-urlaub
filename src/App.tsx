import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsApp from './components/WhatsApp'
import HomePage from './pages/HomePage'
import DestinationenPage from './pages/DestinationenPage'
import DestinationPage from './pages/DestinationPage'
import YachtenPage from './pages/YachtenPage'
import CharterPage from './pages/CharterPage'
import ToernberichtePage from './pages/ToernberichtePage'
import FaqPage from './pages/FaqPage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/destinationen" element={<DestinationenPage />} />
        <Route path="/destinationen/:id" element={<DestinationPage />} />
        <Route path="/yachten" element={<YachtenPage />} />
        <Route path="/charter" element={<CharterPage />} />
        <Route path="/toernberichte" element={<ToernberichtePage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <WhatsApp />
    </BrowserRouter>
  )
}
