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
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background: 'radial-gradient(ellipse at center, #0F4535 0%, #08241C 55%, #04120E 100%)',
          }}
          animate={{ opacity: phase === 'exit' ? 0 : 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          onAnimationComplete={() => { if (phase === 'exit') setPhase('done'); }}
        >
          {/* Ambient Gold Mesh Glow */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle at 50% 48%, rgba(198, 154, 69, 0.18) 0%, rgba(13, 59, 46, 0.1) 50%, transparent 80%)',
            }}
          />

          {/* Textured Luxury Noise Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              transform: 'translateZ(0)',
            }}
          />

          {/* Subtle Decorative Concentric Rings */}
          <div className="absolute pointer-events-none w-[500px] h-[500px] rounded-full border border-[#B88C3A]/10 opacity-30 animate-pulse" />
          <div className="absolute pointer-events-none w-[750px] h-[750px] rounded-full border border-[#B88C3A]/5 opacity-20" />

          <div className="relative flex flex-col items-center select-none z-10 px-4">
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
