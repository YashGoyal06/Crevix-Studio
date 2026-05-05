import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function ProjectCard3D({ project }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [10, -10]);
  const rotateY = useTransform(smoothX, [0, 1], [-10, 10]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(ellipse at ${x} ${y}, rgba(255,255,255,0.12) 0%, transparent 60%)`
  );

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
    setIsHovered(false);
  }, [mouseX, mouseY]);

  const Wrapper = project.comingSoon ? motion.div : motion.a;
  const wrapperProps = project.comingSoon
    ? {}
    : { href: project.href, target: '_blank', rel: 'noreferrer' };

  return (
    <Wrapper
      ref={cardRef}
      {...wrapperProps}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative block ${project.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative overflow-hidden rounded-[18px] border border-white/[0.07]"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      >
        <div
          className="relative aspect-[16/10] overflow-hidden"
          style={{ background: project.gradient || '#080808' }}
        >
          {/* Dimmed Screenshot */}
          {!project.comingSoon && (
            <motion.img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 h-full w-full object-cover object-top opacity-30"
              animate={{ scale: isHovered ? 1.08 : 1, opacity: isHovered ? 0.45 : 0.30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          )}

          {/* Abstract blobs for coming soon */}
          {project.comingSoon && (
            <>
              <motion.div
                className="absolute rounded-full blur-[80px] opacity-35"
                style={{
                  width: '180px', height: '180px',
                  backgroundColor: project.color,
                  left: '15%', top: '25%',
                }}
                animate={{ x: [0, 25, 0], y: [0, -15, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute rounded-full blur-[60px] opacity-20"
                style={{
                  width: '120px', height: '120px',
                  backgroundColor: project.color,
                  right: '15%', bottom: '20%',
                }}
                animate={{ x: [0, -15, 0], y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '36px 36px',
                }}
              />
            </>
          )}

          <motion.div
            className="pointer-events-none absolute inset-0 z-10"
            style={{ background: glare }}
          />

          {/* Heavy Gradient Overlay for Readability */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.9) 100%)',
            }}
          />

          {/* Badges */}
          <div className="absolute left-4 top-4 z-20 rounded-full border border-white/[0.12] bg-black/50 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-white/70 backdrop-blur-md">
            {project.category}
          </div>

          {project.comingSoon ? (
            <div
              className="absolute right-4 top-4 z-20 rounded-full border bg-black/50 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.12em] backdrop-blur-md"
              style={{ color: project.color, borderColor: `${project.color}25` }}
            >
              Soon
            </div>
          ) : (
            <motion.div
              className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.12] bg-black/50 text-sm text-white/60 backdrop-blur-md"
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.2 }}
            >
              ↗
            </motion.div>
          )}

          {/* Info */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-6">
            <div className="mb-1.5 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.color }} />
              <span className="font-sans text-[10px] uppercase tracking-[0.14em]" style={{ color: project.color }}>
                {project.comingSoon ? 'Upcoming' : 'Live Prototype'}
              </span>
            </div>

            <h3 className="font-syne text-[22px] font-[800] leading-[1.1] text-white md:text-[26px]">
              {project.name}
            </h3>

            <p className="mt-1.5 font-sans text-[12px] leading-[1.6] text-white/60 md:text-[13px]">
              {project.description}
            </p>

            <motion.div
              className="mt-3 flex flex-wrap gap-1.5"
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 6 }}
              transition={{ duration: 0.3 }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 font-sans text-[10px] text-white/50"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Wrapper>
  );
}
