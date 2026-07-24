import Navbar from './Navbar';
import Footer from './Footer';
import { NoiseOverlay } from '../ui/NoiseOverlay';
import { AmbientBackground } from '../ui/AmbientBackground';
import { motion } from 'framer-motion';

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen">
      <AmbientBackground />
      <NoiseOverlay />
      <Navbar />
      <main className="relative z-10 pt-0">
        {children}
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
