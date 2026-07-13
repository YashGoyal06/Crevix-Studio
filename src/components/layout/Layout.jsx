import Navbar from './Navbar';
import Footer from './Footer';
import { NoiseOverlay } from '../ui/NoiseOverlay';
import { AmbientBackground } from '../ui/AmbientBackground';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AmbientBackground />
      <NoiseOverlay />
      <Navbar />
      <main className="relative z-10 pt-0">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </motion.div>
  );
}
