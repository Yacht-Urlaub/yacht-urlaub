import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageContext, langFromPath, canonicalPath, isEnHost, toInternal, toHref } from './i18n'
import { lazy, Suspense, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Kontakt from './components/Kontakt'
import WhatsApp from './components/WhatsApp'
import CookieBanner from './components/CookieBanner'
import SideContact from './components/SideContact'

// Jede Unterseite ein eigenes, erst bei Bedarf geladenes JS-Chunk statt
// eines einzigen ~1,4-MB-Bundles fuer die gesamte Seite (siehe
// scripts/prerender.cjs — das wartet beim Snapshot explizit auf diese
// Chunks, daher bleibt das statische HTML fuer Crawler unveraendert
// vollstaendig).
const HomePage = lazy(() => import('./pages/HomePage'))
const DestinationenPage = lazy(() => import('./pages/DestinationenPage'))
const DestinationPage = lazy(() => import('./pages/DestinationPage'))
const YachtenPage = lazy(() => import('./pages/YachtenPage'))
const CharterPage = lazy(() => import('./pages/CharterPage'))
const ToernberichtePage = lazy(() => import('./pages/ToernberichtePage'))
const FaqPage = lazy(() => import('./pages/FaqPage'))
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'))
const DatenschutzPage = lazy(() => import('./pages/DatenschutzPage'))
const AgbPage = lazy(() => import('./pages/AgbPage'))
const ToernsPage = lazy(() => import('./pages/ToernsPage'))
const ToernDetailPage = lazy(() => import('./pages/ToernDetailPage'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsCharterModelle2027Page = lazy(() => import('./pages/NewsCharterModelle2027Page'))
const BuchenPage = lazy(() => import('./pages/BuchenPage'))
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'))
const KabinenPage = lazy(() => import('./pages/KabinenPage'))
const UrlaubsplanerPage = lazy(() => import('./pages/UrlaubsplanerPage'))
const CrewPage = lazy(() => import('./pages/CrewPage'))
const ReisebueroPage = lazy(() => import('./pages/ReisebueroPage'))
const SkipperPage = lazy(() => import('./pages/SkipperPage'))
const SailAwayPage = lazy(() => import('./pages/SailAwayPage'))
const ToernberichtDetailPage = lazy(() => import('./pages/ToernberichtDetailPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const YogaPage = lazy(() => import('./pages/YogaPage'))

function LangProvider({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return <LanguageContext.Provider value={langFromPath(pathname)}>{children}</LanguageContext.Provider>
}

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  // Sprachwechsel = gleiche Seite ⇒ Scrollposition behalten
  const key = canonicalPath(toInternal(pathname))
  useLayoutEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior, block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [key, hash])
  return null
}

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
}

function AnimatedRoutes() {
  const location = useLocation()
  const internal = toInternal(location.pathname)
  const enHost = isEnHost()
  // Globale "Anfrage starten"-Sektion auf Seiten ausblenden, die selbst ein Formular sind
  const hideKontakt = ['/urlaubsplaner', '/en/holiday-planner', '/kontakt', '/en/contact'].includes(internal)
  const isYogaPage = internal === '/yoga' || internal === '/en/yoga'
  return (
    <AnimatePresence mode="wait">
      <motion.div key={canonicalPath(internal)} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Suspense fallback={null}>
        <Routes location={location}>
          {/* Deutsche Routen gibt es nur auf der deutschen Domain */}
          {!enHost && <>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinationen" element={<DestinationenPage />} />
          <Route path="/destinationen/:id" element={<DestinationPage />} />
          <Route path="/yachten" element={<YachtenPage />} />
          <Route path="/charter" element={<CharterPage />} />
          <Route path="/toerns" element={<ToernsPage />} />
          <Route path="/toerns/:id" element={<ToernDetailPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/charter-modelle-2027" element={<NewsCharterModelle2027Page />} />
          <Route path="/buchen" element={<BuchenPage />} />
          <Route path="/packages/:id" element={<PackageDetailPage />} />
          <Route path="/toernberichte" element={<ToernberichtePage />} />
          <Route path="/toernberichte/:slug" element={<ToernberichtDetailPage />} />
          <Route path="/kabinen" element={<KabinenPage />} />
          <Route path="/urlaubsplaner" element={<UrlaubsplanerPage />} />
          <Route path="/crew" element={<CrewPage />} />
          <Route path="/reisebuero" element={<ReisebueroPage />} />
          <Route path="/skipper" element={<SkipperPage />} />
          <Route path="/sailaway" element={<SailAwayPage />} />
          <Route path="/yoga" element={<YogaPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AgbPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          </>}
          {/* ── Englische Routen ──
              Auf yacht-holiday.net ohne /en-Praefix registriert, damit die
              gewachsenen Adressen (/cruises, /destinations/croatia, /yachts …)
              unveraendert bleiben. toHref() nimmt das Praefix dort weg. */}
          <Route path={toHref('/en')} element={<HomePage />} />
          <Route path={toHref("/en/destinations")} element={<DestinationenPage />} />
          <Route path={toHref("/en/destinations/:id")} element={<DestinationPage />} />
          <Route path={toHref("/en/yachts")} element={<YachtenPage />} />
          <Route path={toHref("/en/cruises/book-now/:id")} element={<PackageDetailPage />} />
          <Route path={toHref("/en/faq")} element={<FaqPage />} />
          <Route path={toHref("/en/book-now")} element={<BuchenPage />} />
          <Route path={toHref("/en/cruises")} element={<ToernsPage />} />
          <Route path={toHref("/en/cruises/:id")} element={<ToernDetailPage />} />
          <Route path={toHref("/en/cabin-offers")} element={<KabinenPage />} />
          <Route path={toHref("/en/holiday-planner")} element={<UrlaubsplanerPage />} />
          <Route path={toHref("/en/charter/yacht-charter")} element={<CharterPage />} />
          <Route path={toHref("/en/charter/crew-charter")} element={<SkipperPage />} />
          <Route path={toHref("/en/contact/crew")} element={<CrewPage />} />
          <Route path={toHref("/en/contact/travel-agencies")} element={<ReisebueroPage />} />
          <Route path={toHref("/en/imprint")} element={<ImpressumPage />} />
          <Route path={toHref("/en/data-privacy")} element={<DatenschutzPage />} />
          <Route path={toHref("/en/terms")} element={<AgbPage />} />
          <Route path={toHref("/en/contact")} element={<ContactPage />} />
          <Route path={toHref("/en/yoga")} element={<YogaPage />} />
          <Route path={toHref("/en/trip-reports")} element={<ToernberichtePage />} />
          <Route path={toHref("/en/trip-reports/:slug")} element={<ToernberichtDetailPage />} />
          <Route path={toHref("/en/news/charter-models-2027")} element={<NewsCharterModelle2027Page />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        </Suspense>
        {!hideKontakt && <Kontakt showYoga={isYogaPage} />}
        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LangProvider>
      <ScrollToTop />
      <Navbar />
      <AnimatedRoutes />
      <SideContact />
      <WhatsApp />
      <CookieBanner />
      </LangProvider>
    </BrowserRouter>
  )
}
