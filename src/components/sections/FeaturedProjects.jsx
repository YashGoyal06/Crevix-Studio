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
  {
    id: 'ironpulse',
    name: 'IronPulse Fitness',
    category: 'Fitness / Gym',
    description: 'A high-energy brand experience for a fitness studio — memberships, trainer profiles, and class schedules.',
    tags: ['Branding', 'Web App', 'Booking'],
    gradient: 'linear-gradient(135deg, #1a0a0a 0%, #2d1414 30%, #1a0808 100%)',
    color: '#E85D5D',
    comingSoon: true,
  },
  {
    id: 'nestview',
    name: 'NestView Realty',
    category: 'Real Estate',
    description: 'A premium property listing platform — virtual tours, lead capture, and an elegant browsing experience.',
    tags: ['UI/UX', 'Listings', 'CRM'],
    gradient: 'linear-gradient(135deg, #0a1a12 0%, #14302a 30%, #0a1a12 100%)',
    color: '#5DD99A',
    comingSoon: true,
  },
  {
    id: 'cloudnine',
    name: 'CloudNine SaaS',
    category: 'SaaS Dashboard',
    description: 'An analytics dashboard for a SaaS product — clean data viz, user management, and real-time metrics.',
    tags: ['Dashboard', 'Charts', 'Dark UI'],
    gradient: 'linear-gradient(135deg, #0c0a1f 0%, #1a1440 30%, #0c0a1f 100%)',
    color: '#A78BFA',
    comingSoon: true,
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

  const Wrapper = project.comingSoon ? motion.div : motion.a;
  const wrapperProps = project.comingSoon
    ? {}
    : { href: project.href, target: '_blank', rel: 'noreferrer' };

  return (
    <RevealOnScroll delay={index * 0.1}>
      <Wrapper
        ref={cardRef}
        {...wrapperProps}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`group relative block ${project.comingSoon ? 'cursor-default' : 'cursor-pointer'}`}
        style={{ perspective: '1200px' }}
      >
        <motion.div
          className="relative overflow-hidden rounded-[20px] border border-white/[0.08]"
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: project.comingSoon ? 1.01 : 1.02 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        >
          {/* ── Visual area ── */}
          <div
            className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]"
            style={project.comingSoon ? { background: project.gradient } : {}}
          >
            {/* Screenshot (live projects) */}
            {!project.comingSoon && (
              <motion.img
                src={project.image}
                alt={project.name}
                className="h-full w-full object-cover object-top"
                animate={{ scale: isHovered ? 1.06 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            )}

            {/* Abstract shapes for coming soon */}
            {project.comingSoon && (
              <>
                <motion.div
                  className="absolute rounded-full blur-[80px] opacity-40"
                  style={{
                    width: '200px', height: '200px',
                    backgroundColor: project.color,
                    left: '20%', top: '30%',
                  }}
                  animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute rounded-full blur-[60px] opacity-25"
                  style={{
                    width: '150px', height: '150px',
                    backgroundColor: project.color,
                    right: '15%', bottom: '20%',
                  }}
                  animate={{ x: [0, -20, 0], y: [0, 15, 0], scale: [1, 0.85, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />
                {/* Grid pattern overlay */}
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                  }}
                />
              </>
            )}

            {/* Glare overlay */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: glare }}
            />

            {/* Dark vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: project.comingSoon
                  ? 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.7) 100%)'
                  : 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.85) 100%)',
              }}
            />

            {/* Category badge */}
            <motion.div
              className="absolute left-5 top-5 z-20 rounded-full border border-white/[0.15] bg-black/40 px-3.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
            >
              {project.category}
            </motion.div>

            {/* Coming soon badge OR arrow */}
            {project.comingSoon ? (
              <motion.div
                className="absolute right-5 top-5 z-20 rounded-full border border-white/[0.12] bg-black/50 px-3.5 py-1.5 font-sans text-[10px] uppercase tracking-[0.14em] backdrop-blur-md"
                style={{ color: project.color, borderColor: `${project.color}30` }}
              >
                Coming Soon
              </motion.div>
            ) : (
              <motion.div
                className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.15] bg-black/40 text-white/70 backdrop-blur-md"
                animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
                transition={{ duration: 0.25 }}
              >
                ↗
              </motion.div>
            )}

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
                  {project.comingSoon ? 'Upcoming' : 'Prototype'}
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

          {/* Bottom bar */}
          <motion.div
            className="flex items-center justify-between border-t border-white/[0.06] bg-[#0a0a0a] px-6 py-4 md:px-8"
            animate={{ backgroundColor: isHovered ? 'rgba(255,255,255,0.03)' : 'rgba(10,10,10,1)' }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-sans text-[13px] text-white/40 group-hover:text-white/70 transition-colors duration-200">
              {project.comingSoon ? 'In Development' : 'View Live Site'}
            </span>
            <motion.span
              className="text-[14px] text-white/40 group-hover:text-white transition-colors duration-200"
              animate={{ x: isHovered && !project.comingSoon ? 4 : 0 }}
              transition={{ duration: 0.25 }}
            >
              {project.comingSoon ? '◆' : '→'}
            </motion.span>
          </motion.div>
        </motion.div>
      </Wrapper>
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

      {/* Live Projects — 2 col */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {projects.filter(p => !p.comingSoon).map((project, i) => (
          <ProjectCard3D key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Divider */}
      <RevealOnScroll>
        <div className="my-16 flex items-center gap-4 md:my-24">
          <span className="h-px flex-1 bg-white/[0.06]" />
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-white/25">Coming Soon</span>
          <span className="h-px flex-1 bg-white/[0.06]" />
        </div>
      </RevealOnScroll>

      {/* Coming Soon Projects — 3 col */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.filter(p => p.comingSoon).map((project, i) => (
          <ProjectCard3D key={project.id} project={project} index={i + 2} />
        ))}
      </div>

      <RevealOnScroll>
        <div className="mt-16 flex flex-col items-center gap-4 md:mt-24">
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
