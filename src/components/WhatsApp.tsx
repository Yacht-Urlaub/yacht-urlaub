import { motion } from 'framer-motion'
import { WhatsAppIcon } from './Icons'

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
      whileHover={{ scale: 1.08, y: -2 }}
      style={{
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999,
        width: '58px', height: '58px', borderRadius: '50%',
        background: 'linear-gradient(135deg, #2ee06e 0%, #25d366 45%, #1bb358 100%)',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 24px rgba(37,211,102,0.45), inset 0 1px 0 rgba(255,255,255,0.35)',
        border: '1px solid rgba(255,255,255,0.25)',
      }}
    >
      <WhatsAppIcon size={30} />
      <style>{`
        @media (max-width: 768px) {
          .whatsapp-fab { display: none !important; }
        }
      `}</style>
    </motion.a>
  )
}
