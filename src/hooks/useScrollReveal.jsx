import { motion } from 'framer-motion';

export const RevealOnScroll = ({ children, delay = 0, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)', scale: 0.985 }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
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
