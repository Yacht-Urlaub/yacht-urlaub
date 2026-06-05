import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Kontakt from './components/Kontakt'
import WhatsApp from './components/WhatsApp'
import CookieBanner from './components/CookieBanner'
import SideContact from './components/SideContact'
import HomePage from './pages/HomePage'
import DestinationenPage from './pages/DestinationenPage'
import DestinationPage from './pages/DestinationPage'
import YachtenPage from './pages/YachtenPage'
import CharterPage from './pages/CharterPage'
import ToernberichtePage from './pages/ToernberichtePage'
import FaqPage from './pages/FaqPage'
import ImpressumPage from './pages/ImpressumPage'
import DatenschutzPage from './pages/DatenschutzPage'
import AgbPage from './pages/AgbPage'
import ToernsPage from './pages/ToernsPage'
import ToernDetailPage from './pages/ToernDetailPage'
import NewsPage from './pages/NewsPage'
import BuchenPage from './pages/BuchenPage'
import PackageDetailPage from './pages/PackageDetailPage'
import KabinenPage from './pages/KabinenPage'
import UrlaubsplanerPage from './pages/UrlaubsplanerPage'
import CrewPage from './pages/CrewPage'
import ReisebueroPage from './pages/ReisebueroPage'
import SkipperPage from './pages/SkipperPage'
import SailAwayPage from './pages/SailAwayPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

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
          <Route path="/toerns" element={<ToernsPage />} />
          <Route path="/toerns/:id" element={<ToernDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/buchen" element={<BuchenPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/toernberichte" element={<ToernberichtePage />} />
          <Route path="/kabinen" element={<KabinenPage />} />
          <Route path="/urlaubsplaner" element={<UrlaubsplanerPage />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/reisebuero" element={<ReisebueroPage />} />
          <Route path="/skipper" element={<SkipperPage />} />
          <Route path="/sailaway" element={<SailAwayPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AgbPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Kontakt />
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <SideContact />
      <WhatsApp />
      <CookieBanner />
    </BrowserRouter>
  )
}
