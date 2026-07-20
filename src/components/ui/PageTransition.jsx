import { motion } from 'framer-motion';

/**
 * Premium PageTransition component.
 * Features:
 * - Fade (opacity 0 -> 1 -> 0)
 * - Blur (blur 12px -> 0px -> 8px)
 * - Scale (scale 0.98 -> 1 -> 1.02)
 * - Custom cubic bezier ease-out curve for smooth entry/exit.
 * 
 * Next.js App Router Compatibility:
 * To use in Next.js App Router, add the "use client" directive at the top of the file
 * and render this component inside a template.js file (e.g. app/template.js) to automatically
 * wrap and animate page mount/unmount sequences.
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
