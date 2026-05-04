import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ease = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center overflow-hidden px-4 py-20 text-center sm:px-6 md:min-h-screen">
      <div className="absolute inset-x-3 top-[15%] bottom-[8%] -z-10 mx-auto max-w-[1120px] opacity-80 sm:inset-x-6 md:top-[18%] md:bottom-[12%]">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.9, ease }}
          className="absolute inset-0 rounded-[24px] border border-white/[0.07] md:rounded-[32px]"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.015) 44%, rgba(255,255,255,0.045))',
            boxShadow: '0 40px 120px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        />
        <div className="absolute left-[8%] top-[14%] hidden h-24 w-48 rounded-[18px] border border-white/[0.08] bg-white/[0.035] backdrop-blur-md md:block">
          <div className="m-5 h-2 w-20 rounded-full bg-white/25" />
          <div className="mx-5 mt-4 grid grid-cols-4 gap-2">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-8 rounded-md bg-white/[0.06]" />
            ))}
          </div>
        </div>
        <div className="absolute right-[9%] bottom-[12%] hidden h-28 w-56 rounded-[18px] border border-white/[0.08] bg-white/[0.035] backdrop-blur-md md:block">
          <div className="m-5 h-2 w-24 rounded-full bg-white/25" />
          <div className="mx-5 mt-5 flex items-end gap-2">
            {[42, 68, 50, 84, 58, 74].map((height, i) => (
              <span
                key={i}
                className="w-full rounded-t-md bg-white/[0.08]"
                style={{ height }}
              />
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.7, ease }}
        className="mb-6 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-8 md:text-[13px]"
      >
        Creative Agency
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
        className="mx-auto max-w-[min(100%,18rem)] font-syne text-[clamp(1.85rem,7.8vw,2.55rem)] font-[800] leading-[1.08] text-white sm:max-w-[21rem] sm:text-[clamp(2.2rem,6vw,2.85rem)] md:hidden"
      >
        <span className="block">We</span>
        <span className="block">Design</span>
        <span className="block">Digital</span>
        <span className="block text-[0.86em]">Experiences.</span>
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease }}
        className="mx-auto hidden max-w-[1120px] font-syne text-[clamp(60px,5vw,80px)] font-[800] leading-[0.95] text-white md:block"
      >
        We Design Digital
        <br />
        Experiences.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease }}
        className="mt-6 max-w-[480px] px-1 font-sans text-[15px] leading-[1.7] text-text-secondary sm:text-[17px] md:mt-8"
      >
        Brands, interfaces, and products crafted for
        people who care about the details.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease }}
        className="mt-8 flex w-full max-w-[340px] flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
      >
        <Link to="/portfolio" className="w-full sm:w-auto">
          <button className="w-full rounded-full bg-white px-8 py-3.5 font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 sm:w-auto">
            View Our Work
          </button>
        </Link>
        <Link to="/contact" className="w-full sm:w-auto">
          <button className="w-full rounded-full border border-white/[0.15] px-8 py-3.5 font-sans text-[15px] font-medium text-white transition-opacity duration-150 hover:opacity-85 sm:w-auto">
            Get Started
          </button>
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 items-center gap-6 text-[11px] uppercase tracking-[0.16em] text-white/35 md:flex"
      >
        <span>Strategy</span>
        <span className="h-px w-14 bg-white/15" />
        <span>Design</span>
        <span className="h-px w-14 bg-white/15" />
        <span>Launch</span>
      </motion.div>
    </section>
  );
}
