import { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useCursorGlow } from '../../hooks/useCursorGlow';

export const CustomCursor = () => {
  const { mousePosition, isHovering } = useCursorGlow();
  const [cursorText, setCursorText] = useState('');
  const [isMagnetic, setIsMagnetic] = useState(false);
  const magneticRef = useRef({ x: 0, y: 0 });
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor-text]');
      if (target) {
        setCursorText(target.getAttribute('data-cursor-text'));
      } else {
        setCursorText('');
      }

      const magneticTarget = e.target.closest('[data-magnetic]');
      if (magneticTarget) {
        setIsMagnetic(true);
        const rect = magneticTarget.getBoundingClientRect();
        magneticRef.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      } else {
        setIsMagnetic(false);
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  useEffect(() => {
    if (isMagnetic) {
      // Pull cursor towards magnetic target, but keep some mouse influence
      const pullX = magneticRef.current.x + (mousePosition.x - magneticRef.current.x) * 0.35;
      const pullY = magneticRef.current.y + (mousePosition.y - magneticRef.current.y) * 0.35;
      cursorX.set(pullX);
      cursorY.set(pullY);
    } else {
      cursorX.set(mousePosition.x);
      cursorY.set(mousePosition.y);
    }
  }, [mousePosition, isMagnetic, cursorX, cursorY]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  const hidden = mousePosition.x === -100;

  return (
    <>
      {/* Small dot — instant follow */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9999]"
        style={{
          translateX: mousePosition.x - 3,
          translateY: mousePosition.y - 3,
          opacity: hidden ? 0 : (isHovering || cursorText) ? 0 : 1,
        }}
        transition={{ duration: 0 }}
      />
      
      {/* Dynamic triangle / ring container */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          opacity: hidden ? 0 : 1,
        }}
        animate={{
          width:  cursorText ? 100 : (isHovering || isMagnetic) ? 56 : 36,
          height: cursorText ? 100 : (isHovering || isMagnetic) ? 56 : 36,
          rotate: (isHovering || isMagnetic) ? 180 : 0,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      >
        {!cursorText && (
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 40 40"
            className="absolute inset-0 pointer-events-none fill-none"
            style={{
              stroke: 'white',
              strokeWidth: 1.5,
              opacity: (isHovering || isMagnetic) ? 0.6 : 0.25,
            }}
          >
            <polygon points="20,6 35,32 5,32" />
          </svg>
        )}

        {cursorText && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full rounded-full bg-white flex items-center justify-center"
          >
            <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-black text-center px-2">
              {cursorText}
            </span>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};
