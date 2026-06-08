import { motion } from 'framer-motion';

export default function LogoCard({ logo, onClick }) {
  // Check if background is light or dark to style overlay elements
  const isLightBg = logo.bgColor.includes('[#f5f6f8]') || 
                    logo.bgColor.includes('[#fcf8f7]') || 
                    logo.bgColor.includes('[#fafbff]') || 
                    logo.bgColor.includes('[#f8fafc]') || 
                    logo.bgColor.includes('[#fdfcf7]');

  return (
    <motion.button
      onClick={onClick}
      className={`group relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.06] ${logo.bgColor} outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/50`}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      aria-label={`View design case study for ${logo.name}`}
    >
      {/* Dynamic gradient glow overlay on hover */}
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${logo.colors[0]} 0%, transparent 70%)`
        }}
      />

      {/* Main Logo Container */}
      <div className="relative flex h-[60%] w-[60%] items-center justify-center transition-transform duration-500 ease-out group-hover:scale-110">
        <img
          src={logo.image}
          alt={logo.name + ' Brand Logo Design by Crevix Studio'}
          className="max-h-full max-w-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Info Card Overlay (Always visible but expands and reveals details on hover) */}
      <div 
        className={`absolute bottom-0 left-0 right-0 flex flex-col justify-end p-5 transition-all duration-300 ${
          isLightBg ? 'bg-gradient-to-t from-black/5 to-transparent' : 'bg-gradient-to-t from-black/40 to-transparent'
        }`}
      >
        <span className={`font-sans text-[10px] uppercase tracking-[0.15em] opacity-60 transition-opacity duration-300 ${
          isLightBg ? 'text-black/80' : 'text-white/80'
        }`}>
          {logo.category}
        </span>
        
        <div className="mt-1 flex items-center justify-between">
          <h3 className={`font-syne text-[18px] font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-1 ${
            isLightBg ? 'text-[#080808]' : 'text-white'
          }`}>
            {logo.name}
          </h3>
          
          <span className={`font-sans text-[13px] opacity-0 transition-all duration-300 group-hover:opacity-100 ${
            isLightBg ? 'text-[#080808]' : 'text-white'
          }`}>
            →
          </span>
        </div>

        {/* Style tags visible on hover */}
        <div className="mt-3 flex flex-wrap gap-1.5 opacity-0 max-h-0 overflow-hidden transition-all duration-300 group-hover:opacity-100 group-hover:max-h-[30px]">
          {logo.tags.slice(0, 2).map((tag, idx) => (
            <span 
              key={idx} 
              className={`rounded-full px-2.5 py-0.5 text-[9px] font-medium ${
                isLightBg 
                  ? 'bg-black/10 text-black/80' 
                  : 'bg-white/10 text-white/90'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  );
}
