import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.25, 0.1, 0.0, 1.0];

export default function IntroLoader({ onComplete }) {
  const [phase, setPhase] = useState('hold');

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase('exit'), 3600),
      setTimeout(() => onComplete?.(), 4300),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ background: '#0D3B2E' }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={() => { if (phase === 'exit') setPhase('done'); }}
        >
          {/* Noise grain */}
          <div
            className="fixed inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
            }}
          />

          <div className="relative flex flex-col items-center select-none">
            {/* CREVIX */}
            <motion.div
              className="uppercase tracking-[0.25em] text-[#D8D2C4] leading-none"
              style={{ fontSize: 'clamp(52px, 8.5vw, 128px)', fontFamily: '"Playfair Display", serif', fontWeight: 800 }}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.3, duration: 0.9, ease }}
            >
              CREVIX
            </motion.div>

            {/* STUDIO */}
            <motion.div
              className="uppercase tracking-[0.25em] text-[#D8D2C4] leading-none mt-2"
              style={{ fontSize: 'clamp(52px, 8.5vw, 128px)', fontFamily: '"Playfair Display", serif', fontWeight: 800 }}
              initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.7, duration: 0.9, ease }}
            >
              STUDIO
            </motion.div>

            {/* Single subtle line */}
            <motion.div
              className="mt-6"
              style={{
                height: 1,
                background: 'rgba(216, 210, 196, 0.25)',
                width: '100%',
              }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 2.4, duration: 0.6, ease }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
