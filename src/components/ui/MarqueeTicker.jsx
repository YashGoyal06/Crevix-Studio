import { motion } from 'framer-motion';

const defaultItems = [
  'WEB DEVELOPMENT',
  'UI / UX DESIGN',
  'BRAND IDENTITY',
  'DIGITAL STRATEGY',
  'CREATIVE TECHNOLOGY',
  'INTERACTIVE WEB APPS',
  'CUSTOM E-COMMERCE',
];

export default function MarqueeTicker({ items = defaultItems, speed = 30, className = "" }) {
  // Repeat items to ensure seamless infinite loop on any screen width
  const tickerList = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden border-y border-[#B88C3A]/15 bg-[#071D18]/90 py-3.5 backdrop-blur-sm ${className}`}>
      {/* Soft Bilateral Edge Blur Mask */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-28 bg-gradient-to-r from-[#071D18] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-28 bg-gradient-to-l from-[#071D18] to-transparent" />

      {/* Marquee Motion Track */}
      <div className="flex w-full overflow-hidden">
        <motion.div
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex whitespace-nowrap items-center"
        >
          {tickerList.map((text, idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-syne text-xs font-semibold tracking-[0.35em] text-[#C69A45]/90 transition-colors duration-300 hover:text-white">
                {text}
              </span>
              <span className="mx-10 text-[10px] text-[#B88C3A]/30">
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
