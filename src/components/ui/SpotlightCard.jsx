import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

/**
 * Premium SpotlightCard Component.
 * Features:
 * - Tracks mouse position coordinates dynamically inside the card.
 * - Applies a smooth spring physics controller (`useSpring`) to eliminate mouse jitter.
 * - Renders a mouse-controlled radial gradient spotlight glow.
 * - Soft-glow blends seamlessly over dark card backgrounds.
 */
export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(198, 154, 69, 0.12)", 
  size = 350,
  borderGlowColor = "rgba(198, 154, 69, 0.15)"
}) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-[16px] bg-[#081a15] border border-white/[0.04] transition-all duration-300 ${className}`}
    >
      {/* Outer border glow following mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-[16px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${borderGlowColor}, transparent 80%)`,
        }}
      />

      {/* Inner background glow following mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
