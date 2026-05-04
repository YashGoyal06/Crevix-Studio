import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = "", hoverEffect = false }) => {
  return (
    <motion.div
      className={`glass-card relative overflow-hidden group ${className}`}
      whileHover={hoverEffect ? { y: -6 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {/* Gradient border effect on hover */}
      {hoverEffect && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[20px] border-gradient" />
      )}
      
      {/* Bottom gradient line */}
      {hoverEffect && (
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-signature opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
