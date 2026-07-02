import { useLang } from '../i18n'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useRef, useEffect } from 'react'

export default function Hero() {
  const lang = useLang()
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])
  return (
    <section id="home" style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline preload="auto"
        poster="/header-poster.jpg"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      >
        <source src="/header-opt.mp4" type="video/mp4" />
        <source src="/header.webm" type="video/webm" />
      </video>

      {/* Overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(7,27,47,0.65) 0%, rgba(7,27,47,0.25) 45%, rgba(7,27,47,0.78) 100%)',
      }} />

      {/* Content */}
      <div className="container" style={{
        position: 'relative', height: '100%',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        textAlign: 'center', color: '#fff',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: 0.8 }}
        >
          {lang === 'en' ? 'For more than 10 years' : 'Seit über 10 Jahren'}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2.4rem, 6vw, 5rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '0.5rem' }}
        >
          Yacht-Urlaub
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.1rem, 3vw, 1.8rem)', fontStyle: 'italic', marginBottom: '2.5rem', opacity: 0.9 }}
        >
          A Taste of Paradise
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.9, opacity: 0.85, marginBottom: '2.5rem' }}
        >
          {lang === 'en' ? 'High-quality sailing holidays with skipper — from Croatia to the Caribbean, for beginners to luxury.' : 'Segel- und Yachtreisen mit Qualität — von Kroatien bis Karibik, für Einsteiger bis Luxury.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <Link to={lang === 'en' ? '/en/holiday-planner' : '/urlaubsplaner'} className="btn btn-gold" style={{ fontSize: '0.82rem', padding: '14px 32px' }}>
            {lang === 'en' ? 'Plan your holiday →' : 'Urlaub planen →'}
          </Link>
          <a href="#toerns" className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '14px 32px' }}>
            {lang === 'en' ? 'Our trips' : 'Törns entdecken'}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.6 }}
        >
          <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Entdecken</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.5)' }}
          />
        </motion.div>
      </div>
    </section>
  )
}
