import { motion } from 'framer-motion';

export const GradientButton = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative px-9 py-4 rounded-full font-sans text-[15px] font-medium text-white overflow-hidden group ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-signature opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {/* Glow shadow intensifies on hover */}
      <div className="absolute inset-0 rounded-full bg-gradient-signature blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10" />
    </motion.button>
  );
};
