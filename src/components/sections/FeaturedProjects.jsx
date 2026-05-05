import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../../hooks/useScrollReveal';

const projects = [
  {
    id: 'sipscene',
    name: 'SipScene',
    category: 'Restaurant / Cloud Kitchen',
    description: 'A warm, inviting digital experience for a modern café — complete with an interactive menu, gallery, and WhatsApp ordering.',
    tags: ['React', 'Responsive', 'Menu System'],
    image: '/Sipscene-ss.png',
    href: 'https://sip-scene-mauve.vercel.app/',
    color: '#D4A574',
  },
  {
    id: 'achievers',
    name: 'Achievers Academy',
    category: 'Coaching Institute',
    description: 'A trust-building platform for a coaching institute — showcasing results, faculty, and course details with a premium feel.',
    tags: ['React', 'Education', 'Lead Gen'],
    image: '/achievers-academy-ss.png',
    href: 'https://achievers-academy-nu.vercel.app/',
    color: '#5B9BD5',
  },
];

/* ── Single 3D Card ── */
function ProjectCard3D({ project, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [12, -12]);
  const rotateY = useTransform(smoothX, [0, 1], [-12, 12]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(ellipse at ${x} ${y}, rgba(255,255,255,0.15) 0%, transparent 65%)`
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

  return (
    <RevealOnScroll delay={index * 0.12}>
      <motion.a
        ref={cardRef}
        href={project.href}
        target="_blank"
        rel="noreferrer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative block cursor-pointer"
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[20px] border border-white/[0.08]"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* ── Screenshot ── */}
          <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
            <motion.img
              src={project.image}
              alt={project.name}
              className="h-full w-full object-cover object-top"
              animate={{ scale: isHovered ? 1.06 : 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Glare overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: glare }}
            />

            {/* Dark vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
              }}
            />

            {/* Category badge — floats on hover */}
            <motion.div
              className="absolute left-5 top-5 z-20 rounded-full border border-white/[0.15] bg-black/40 px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
              animate={{ y: isHovered ? 0 : 0, opacity: 1 }}
            >
              {project.category}
            </motion.div>

            {/* External link arrow */}
            <motion.div
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] bg-black/40 text-white/70 backdrop-blur-md"
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
              transition={{ duration: 0.25 }}
            >
              ↗
            </motion.div>

            {/* Bottom info overlay */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
              <motion.div
                className="mb-2 flex items-center gap-2"
                style={{ transform: 'translateZ(40px)' }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="font-sans text-[11px] uppercase tracking-[0.15em]"
                  style={{ color: project.color }}
                >
                  Prototype
                </span>
              </motion.div>

              <h3
                className="font-syne text-[28px] font-[800] leading-[1.1] text-white md:text-[36px]"
                style={{ transform: 'translateZ(60px)' }}
              >
                {project.name}
              </h3>

              <motion.p
                className="mt-2 max-w-[420px] font-sans text-[13px] leading-[1.65] text-white/50 md:text-[14px]"
                animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 4 }}
                transition={{ duration: 0.35 }}
              >
                {project.description}
              </motion.p>

              {/* Tech tags */}
              <motion.div
                className="mt-4 flex flex-wrap gap-2"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.1] bg-white/[0.04] px-3 py-1 font-sans text-[11px] text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Bottom bar — "View Live Site" */}
          <motion.div
            className="flex items-center justify-between border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-4 md:px-8"
            animate={{ backgroundColor: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(10,10,10,1)' }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans text-[13px] text-white/40 group-hover:text-white/70 transition-colors duration-200">
              View Live Site
            </span>
            <motion.span
              className="text-[14px] text-white/40 group-hover:text-white transition-colors duration-200"
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.25 }}
            >
              →
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.a>
    </RevealOnScroll>
  );
}

/* ── Main Section ── */
export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-36">
      <RevealOnScroll>
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-white/20" />
          <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">
            Selected Work
          </p>
        </div>
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <h2 className="font-syne text-[34px] font-bold leading-[1.05] text-white md:text-[48px]">
            Work We're Proud Of.
          </h2>
          <p className="max-w-[380px] font-sans text-[14px] leading-[1.7] text-text-secondary md:text-right">
            Real prototypes. Built from scratch. Deployed live.
          </p>
        </div>
      </RevealOnScroll>

      {/* 3D Cards Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard3D key={project.id} project={project} index={i} />
        ))}
      </div>

      <RevealOnScroll>
        <div className="mt-16 flex flex-col items-center gap-4 md:mt-24">
          <p className="font-sans text-[13px] text-white/30">
            More projects launching soon.
          </p>
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-6 py-3 font-sans text-[14px] text-white/60 transition-all duration-200 hover:border-white/[0.2] hover:bg-white/[0.06] hover:text-white"
          >
            View Full Portfolio
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
