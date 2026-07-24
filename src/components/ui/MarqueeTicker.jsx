import { motion } from 'framer-motion';
import { Sparkles, Code2, Palette, Layers, Globe2, Cpu, Zap } from 'lucide-react';

const defaultItems = [
  { text: 'Web Development', icon: Code2, highlight: true },
  { text: 'UI / UX Design', icon: Palette, highlight: false },
  { text: 'Brand Identity', icon: Layers, highlight: true },
  { text: 'Digital Strategy', icon: Globe2, highlight: false },
  { text: 'Creative Technology', icon: Cpu, highlight: true },
  { text: 'Interactive Web Apps', icon: Zap, highlight: false },
  { text: 'Custom E-Commerce', icon: Sparkles, highlight: true },
];

export default function MarqueeTicker({ items = defaultItems, speed = 25, className = "" }) {
  // Repeat items multiple times to ensure seamless infinite loop across large screens
  const tickerList = [...items, ...items, ...items, ...items];

  return (
    <div className={`relative w-full overflow-hidden border-y border-[#B88C3A]/20 bg-[#071D18]/80 py-4 backdrop-blur-md ${className}`}>
      {/* Left & Right Smooth Edge Fade Mask */}
      <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-[#071D18] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-[#071D18] to-transparent" />

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
          className="flex whitespace-nowrap gap-4 items-center"
        >
          {tickerList.map((item, idx) => {
            const IconComponent = item.icon || Sparkles;
            return (
              <div
                key={idx}
                className="group flex items-center gap-2.5 rounded-full border border-[#B88C3A]/25 bg-[#0D3B2E]/60 px-5 py-2 transition-all duration-300 hover:border-[#C69A45] hover:bg-[#0D3B2E] hover:shadow-[0_0_15px_rgba(198,154,69,0.25)] hover:scale-105"
              >
                <IconComponent className="h-3.5 w-3.5 text-[#C69A45] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
                <span className="font-syne text-xs font-semibold uppercase tracking-[0.2em] text-[#E0D8C3] transition-colors group-hover:text-white">
                  {item.text}
                </span>
                <span className="ml-1 inline-block h-1.5 w-1.5 rounded-full bg-[#B88C3A]/40 group-hover:bg-[#C69A45]" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
