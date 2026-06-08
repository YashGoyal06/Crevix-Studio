import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Copy, Check, Sun, Moon } from 'lucide-react';

export default function LogoLightbox({ logo, onClose, onPrev, onNext }) {
  const [copiedColor, setCopiedColor] = useState(null);
  const [previewTheme, setPreviewTheme] = useState('brand'); // 'brand', 'dark', 'light'

  // Disable body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Keyboard navigation (Escape to close, Left/Right arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  // Copy hex color to clipboard
  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  // Determine current background class based on toggle
  const getBgClass = () => {
    if (previewTheme === 'dark') return 'bg-[#080808]';
    if (previewTheme === 'light') return 'bg-[#f8fafc]';
    return logo.bgColor; // 'brand' theme
  };

  const isLightBg = getBgClass().includes('[#f5f6f8]') || 
                    getBgClass().includes('[#fcf8f7]') || 
                    getBgClass().includes('[#fafbff]') || 
                    getBgClass().includes('[#f8fafc]') || 
                    getBgClass().includes('[#fdfcf7]');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />

      {/* Main Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex h-full max-h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#0c0c0e] shadow-2xl md:flex-row"
      >
        {/* Left Section: Interactive Logo Display */}
        <div className={`relative flex flex-1 items-center justify-center p-8 transition-colors duration-300 ${getBgClass()}`}>
          {/* Logo */}
          <motion.div
            key={logo.id + previewTheme}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex h-[240px] w-[240px] items-center justify-center sm:h-[300px] sm:w-[300px]"
          >
            <img
              src={logo.image}
              alt={logo.name}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>

          {/* Theme Toggles */}
          <div className="absolute bottom-6 left-6 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-md">
            <button
              onClick={() => setPreviewTheme('brand')}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                previewTheme === 'brand' ? 'bg-white text-black' : 'text-white hover:bg-white/5'
              }`}
            >
              Default
            </button>
            <button
              onClick={() => setPreviewTheme('dark')}
              aria-label="Preview on Dark Backdrop"
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                previewTheme === 'dark' ? 'bg-white text-black' : 'text-white hover:bg-white/5'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setPreviewTheme('light')}
              aria-label="Preview on Light Backdrop"
              className={`flex h-6 w-6 items-center justify-center rounded-full transition-all ${
                previewTheme === 'light' ? 'bg-white text-black' : 'text-white hover:bg-white/5'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Section: Case Study Sheet */}
        <div className="flex w-full flex-col justify-between border-t border-white/[0.08] bg-[#0d0d0f] p-6 sm:p-8 md:w-[400px] md:border-l md:border-t-0 lg:w-[450px]">
          {/* Top Row: Close and Navigation */}
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d4af37]">
              Case Study
            </span>
            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 hover:scale-105"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Core Story */}
          <div className="my-6 overflow-y-auto pr-1">
            <span className="font-sans text-[12px] uppercase tracking-[0.1em] text-text-secondary">
              {logo.category}
            </span>
            <h2 className="mt-1 font-syne text-[32px] font-extrabold leading-tight text-white sm:text-[40px]">
              {logo.name}
            </h2>

            <div className="my-5 h-px w-full bg-white/10" />

            <div className="space-y-6">
              {/* Concept */}
              <div>
                <h4 className="font-sans text-[11px] uppercase tracking-widest text-[#8e8e93]">
                  Design Concept
                </h4>
                <p className="mt-2 font-sans text-[14px] leading-relaxed text-text-secondary">
                  {logo.concept}
                </p>
              </div>

              {/* Typography */}
              <div>
                <h4 className="font-sans text-[11px] uppercase tracking-widest text-[#8e8e93]">
                  Primary Typography
                </h4>
                <div className="mt-2 flex items-center justify-between rounded-xl bg-white/[0.03] p-3 border border-white/[0.04]">
                  <span className="font-sans text-[14px] font-medium text-white">
                    {logo.typography}
                  </span>
                  <span className="font-sans text-[12px] text-text-secondary">Aa</span>
                </div>
              </div>

              {/* Colors */}
              <div>
                <h4 className="mb-2.5 font-sans text-[11px] uppercase tracking-widest text-[#8e8e93]">
                  Color Palette (Click to Copy)
                </h4>
                <div className="flex flex-wrap gap-3">
                  {logo.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCopyColor(color)}
                      className="group/swatch relative flex items-center gap-2 rounded-xl bg-white/[0.03] p-2 pr-3 border border-white/[0.04] transition-all hover:bg-white/[0.07]"
                      title={`Copy ${color}`}
                    >
                      <div
                        className="h-6 w-6 rounded-lg border border-white/10"
                        style={{ backgroundColor: color }}
                      />
                      <span className="font-sans text-[12px] font-semibold tracking-wider text-white/80">
                        {color}
                      </span>
                      <div className="text-white/40 transition-colors group-hover/swatch:text-white">
                        {copiedColor === color ? (
                          <Check className="h-3.5 w-3.5 text-green-400" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="mb-2 font-sans text-[11px] uppercase tracking-widest text-[#8e8e93]">
                  Style Attributes
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {logo.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="rounded-full bg-white/[0.05] px-3 py-1 text-[11px] text-white/70 border border-white/[0.03]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Row: Quick Navigation Controls */}
          <div className="flex items-center justify-between border-t border-white/[0.08] pt-5">
            <button
              onClick={onPrev}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-[13px] text-white transition-all hover:bg-white/10 hover:translate-x-[-2px]"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-sans text-[13px] text-white transition-all hover:bg-white/10 hover:translate-x-[2px]"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
