import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export const RevealOnScroll = ({ children, delay = 0, className = "", direction = "up" }) => {
  const getInitial = () => {
    switch (direction) {
      case "left":
        return { opacity: 0, x: 50, filter: 'blur(10px)', scale: 0.985 };
      case "right":
        return { opacity: 0, x: -50, filter: 'blur(10px)', scale: 0.985 };
      case "scale":
        return { opacity: 0, scale: 0.9, filter: 'blur(10px)' };
      case "rotate":
        return { opacity: 0, y: 40, rotate: 2, filter: 'blur(10px)', scale: 0.985 };
      case "up":
      default:
        return { opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.985 };
    }
  };

  const getWhileInView = () => {
    switch (direction) {
      case "left":
      case "right":
        return { opacity: 1, x: 0, filter: 'blur(0px)', scale: 1 };
      case "scale":
        return { opacity: 1, scale: 1, filter: 'blur(0px)' };
      case "rotate":
        return { opacity: 1, y: 0, rotate: 0, filter: 'blur(0px)', scale: 1 };
      case "up":
      default:
        return { opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getWhileInView()}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ 
        duration: 0.85, 
        ease: [0.16, 1, 0.3, 1], 
        delay: delay 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
    >
      {children}
    </motion.div>
  );
};

export const Parallax = ({ children, offset = 50, className = "" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
