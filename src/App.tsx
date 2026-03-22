import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
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

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
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
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <WhatsApp />
    </BrowserRouter>
  )
}
