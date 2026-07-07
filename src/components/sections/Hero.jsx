import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

const ease = [0.25, 0.1, 0.0, 1.0];

export default function Hero() {
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.45);
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const glowX = useTransform(smoothX, (v) => `${v * 100}%`);
  const glowY = useTransform(smoothY, (v) => `${v * 100}%`);
  const dynamicGlow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.14), transparent 46%)`);

  const handlePointerMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width);
    pointerY.set((event.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = () => {
    pointerX.set(0.5);
    pointerY.set(0.45);
  };

  return (
    <section
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className="relative flex min-h-[calc(100svh-72px)] flex-col items-center justify-center overflow-hidden px-4 py-16 text-center sm:px-6 md:min-h-screen md:py-20"
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-transparent via-[#080808]/20 to-[#080808]/90" />
      <motion.div
        className="absolute inset-0 -z-10 opacity-80"
        style={{ background: dynamicGlow }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[980px]">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7, ease }}
          className="mb-6 inline-flex rounded-full border border-white/[0.16] bg-white/[0.03] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.18em] text-text-secondary md:mb-8 md:text-[12px]"
        >
          Creative Agency
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="mx-auto max-w-[min(100%,19rem)] font-syne text-[clamp(2rem,8vw,2.7rem)] font-bold uppercase tracking-wider leading-[1.15] text-white sm:max-w-[22rem] sm:text-[clamp(2.3rem,6vw,2.95rem)] md:hidden"
        >
          <span className="block">Digital</span>
          <span className="block text-gradient">Design</span>
          <span className="block">Studio.</span>
        </motion.h1>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="mx-auto hidden max-w-[900px] font-syne text-[clamp(60px,5.2vw,84px)] font-bold uppercase tracking-wider leading-[1.08] text-white md:block"
        >
          We Are A Digital
          <br />
          <span className="text-gradient">Design Studio.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7, ease }}
          className="mt-6 max-w-[560px] px-1 font-sans text-[15px] leading-[1.75] text-text-secondary sm:text-[17px] md:mt-8 mx-auto"
        >
          High-converting websites, premium design systems, and smooth product experiences crafted for modern brands.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6, ease }}
          className="mt-8 flex w-full max-w-[340px] flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
        >
          <Link to="/portfolio" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -2, x: 1, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              data-magnetic
              className="w-full rounded-full bg-white px-8 py-3.5 font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 sm:w-auto"
            >
              View Our Work
            </motion.button>
          </Link>
          <Link to="/pricing" className="w-full sm:w-auto">
            <motion.button
              whileHover={{ y: -2, x: -1, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              data-magnetic
              className="w-full rounded-full border border-white/[0.15] px-8 py-3.5 font-sans text-[15px] font-medium text-white transition-opacity duration-150 hover:opacity-85 sm:w-auto"
            >
              Choose Your Plan
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7, ease }}
          className="mt-5 flex flex-wrap items-center justify-center gap-3"
        >
          {['Fast Delivery', 'Mobile Optimized', 'Conversion Focused'].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/[0.13] bg-white/[0.02] px-3.5 py-1.5 font-sans text-[12px] text-white/75"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

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
