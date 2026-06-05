import { motion } from 'framer-motion'

export default function WhatsApp() {
  return (
    <motion.a
      href="https://wa.me/436602652481"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Kontakt"
      className="whatsapp-fab"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
        width: '56px', height: '56px', borderRadius: '50%',
        background: '#25d366',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
        fontSize: '1.6rem',
      }}
    >
      💬
      <style>{`
        @media (max-width: 768px) {
          .whatsapp-fab { display: none !important; }
        }
      `}</style>
    </motion.a>
  )
}
