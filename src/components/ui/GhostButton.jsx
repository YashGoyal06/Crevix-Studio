import { motion } from 'framer-motion';

export const GhostButton = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`px-9 py-4 rounded-full font-sans text-[15px] font-medium text-white border border-white/20 hover:border-white/40 transition-colors duration-300 flex items-center gap-2 ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {children}
    </motion.button>
  );
};
