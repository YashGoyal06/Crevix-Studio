import { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const projects = [
  {
    id: 1,
    name: 'SipScene',
    category: 'Web Development',
    sub: 'Restaurant & Cloud Kitchen Prototype',
    description: 'A warm, inviting digital experience for a modern café — complete with an interactive menu, gallery, and WhatsApp ordering.',
    tags: ['React', 'Responsive', 'Menu System', 'Gallery'],
    image: '/Sipscene-ss.png',
    href: 'https://sip-scene-mauve.vercel.app/',
    color: '#D4A574',
  },
  {
    id: 2,
    name: 'Achievers Academy',
    category: 'Web Development',
    sub: 'Coaching Institute Prototype',
    description: 'A trust-building platform for a coaching institute — showcasing results, faculty, and course details with a premium feel.',
    tags: ['React', 'Education', 'Lead Gen', 'SEO'],
    image: '/achievers-academy-ss.png',
    href: 'https://achievers-academy-nu.vercel.app/',
    color: '#5B9BD5',
  },
];

/* ── 3D Tilt Card ── */
function PortfolioCard({ project, index }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [8, -8]);
  const rotateY = useTransform(smoothX, [0, 1], [-8, 8]);
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

  const isEven = index % 2 === 0;

  return (
    <RevealOnScroll>
      <div
        className={`flex flex-col gap-8 md:gap-12 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
      >
        {/* ── Image Card ── */}
        <motion.a
          ref={cardRef}
          href={project.href}
          target="_blank"
          rel="noreferrer"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="group relative block flex-1 cursor-pointer"
          style={{ perspective: '1200px' }}
        >
          <motion.div
            className="relative overflow-hidden rounded-[20px] border border-white/[0.08]"
            style={{
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }}
            whileHover={{ scale: 1.015 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">
              <motion.img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover object-top"
                animate={{ scale: isHovered ? 1.05 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Glare */}
              <motion.div
                className="pointer-events-none absolute inset-0 z-10"
                style={{ background: glare }}
              />

              {/* Vignette */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.6) 100%)',
                }}
              />

              {/* Arrow */}
              <motion.div
                className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.15] bg-black/40 text-lg text-white/70 backdrop-blur-md"
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7, rotate: isHovered ? 0 : -45 }}
                transition={{ duration: 0.3 }}
              >
                ↗
              </motion.div>

              {/* Live badge */}
              <motion.div
                className="absolute bottom-5 left-5 z-20 flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/50 px-3.5 py-1.5 backdrop-blur-md"
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
                transition={{ duration: 0.3 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ backgroundColor: project.color }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: project.color }} />
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-white/70">Live Demo</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.a>

        {/* ── Info Panel ── */}
        <div className="flex flex-1 flex-col justify-center lg:max-w-[420px]">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6" style={{ backgroundColor: project.color }} />
            <span
              className="font-sans text-[11px] uppercase tracking-[0.15em]"
              style={{ color: project.color }}
            >
              {project.category}
            </span>
          </div>

          <h2 className="mb-3 font-syne text-[32px] font-[800] leading-[1.05] text-white md:text-[42px]">
            {project.name}
          </h2>

          <p className="mb-6 font-sans text-[14px] leading-[1.75] text-text-secondary md:text-[15px]">
            {project.description}
          </p>

          {/* Tags */}
          <div className="mb-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 font-sans text-[11px] text-white/50"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 font-sans text-[14px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85"
          >
            View Live Site
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </RevealOnScroll>
  );
}

/* ── Page ── */
export default function Portfolio() {
  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-36 md:pt-28">
        <RevealOnScroll>
          <div className="mb-16 text-center md:mb-24">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">
                Selected Work
              </p>
              <span className="h-px w-8 bg-white/20" />
            </div>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">
              Our Portfolio.
            </h1>
            <p className="mx-auto mt-5 max-w-[520px] font-sans text-[15px] leading-[1.7] text-text-secondary">
              Real prototypes built from scratch. Each project is a fully deployed, production-ready experience.
            </p>
          </div>
        </RevealOnScroll>

        {/* Projects — alternating layout */}
        <div className="flex flex-col gap-20 md:gap-28">
          {projects.map((project, i) => (
            <PortfolioCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll>
          <div className="mt-24 rounded-[20px] border border-white/[0.06] bg-white/[0.02] p-10 text-center md:mt-36 md:p-16">
            <p className="mb-3 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary">
              Ready to start?
            </p>
            <h3 className="mb-4 font-syne text-[28px] font-bold text-white md:text-[36px]">
              Let's build something together.
            </h3>
            <p className="mx-auto mb-8 max-w-[440px] font-sans text-[14px] leading-[1.7] text-text-secondary">
              Have a project in mind? We'd love to bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85"
            >
              Get in Touch
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
}
