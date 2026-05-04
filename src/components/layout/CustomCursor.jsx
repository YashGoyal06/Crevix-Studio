import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursorGlow } from '../../hooks/useCursorGlow';

export const CustomCursor = () => {
  const { mousePosition, isHovering } = useCursorGlow();
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const hidden = mousePosition.x === -100;

  return (
    <>
      {/* Small dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: mousePosition.x - 4,
          translateY: mousePosition.y - 4,
          opacity: hidden ? 0 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0 }}
      />
      
      {/* Lagging ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width:  isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          border: isHovering ? '1px solid transparent' : '1px solid rgba(255,255,255,0.35)',
        }}
        transition={{ duration: 0.15 }}
      >
        {/* Gradient fill on hover */}
        <motion.div 
          className="absolute inset-0 rounded-full"
          style={{ background: 'linear-gradient(135deg, #6D28D9, #BE185D, #EA580C)' }}
          animate={{ opacity: isHovering ? 0.3 : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
};
