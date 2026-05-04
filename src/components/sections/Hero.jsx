import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../../hooks/useScrollReveal';

const ease = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease }}
        className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-8"
      >
        Creative Agency
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
        className="font-syne font-[800] text-[44px] md:text-[80px] leading-[0.95] text-white max-w-[800px]"
      >
        We Design Digital
        <br />
        Experiences.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease }}
        className="font-sans text-[17px] text-text-secondary leading-[1.75] max-w-[480px] mt-8"
      >
        Brands, interfaces, and products crafted for
        people who care about the details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
        className="flex items-center gap-3 mt-10"
      >
        <Link to="/portfolio">
          <button className="px-8 py-3.5 rounded-full bg-white text-[#080808] text-[15px] font-sans font-medium hover:opacity-85 transition-opacity duration-150">
            View Our Work
          </button>
        </Link>
        <Link to="/contact">
          <button className="px-8 py-3.5 rounded-full text-white text-[15px] font-sans font-medium border border-white/[0.15] hover:opacity-85 transition-opacity duration-150">
            Get Started
          </button>
        </Link>
      </motion.div>
    </section>
  );
}
