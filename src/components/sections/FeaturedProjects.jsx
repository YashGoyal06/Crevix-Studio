import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../../hooks/useScrollReveal';

const projects = [
  {
    id: 'sipscene',
    name: 'SipScene',
    category: 'Restaurant / Cloud Kitchen',
    gradient: 'linear-gradient(135deg, #1a0f05 0%, #2d180a 50%, #1a0f05 100%)',
    tall: true,
    href: 'https://sip-scene-mauve.vercel.app/',
    image: '/Sipscene-ss.png',
  },
  {
    id: 'achievers',
    name: 'Achievers Academy',
    category: 'Coaching Institute',
    gradient: 'linear-gradient(135deg, #051424 0%, #0a203a 50%, #051424 100%)',
    href: 'https://achievers-academy-nu.vercel.app/',
    image: '/achievers-academy-ss.png',
  },
];

const ProjectCard = ({ project }) => (
  <motion.a
    href={project.href || '#'}
    target={project.href ? "_blank" : "_self"}
    rel="noreferrer"
    whileHover={{ scale: 1.015, y: -6 }}
    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    className={`group relative min-h-[260px] cursor-pointer overflow-hidden rounded-[16px] block md:min-h-0 ${project.tall ? 'md:row-span-2' : ''}`}
    style={{
      background: project.image ? `url(${project.image}) center/cover no-repeat` : project.gradient,
    }}
  >
    <motion.div
      className="absolute inset-0 opacity-60"
      animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
      transition={{ duration: 14, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.12), transparent 35%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.08), transparent 40%)',
        backgroundSize: '140% 140%',
      }}
    />

    <motion.div
      className="absolute -left-12 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-white/[0.08] blur-3xl"
      animate={{ x: [0, 26, 0] }}
      transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Category badge */}
    <div className="absolute top-5 left-5 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase text-white/60 bg-white/[0.06] border border-white/[0.08]">
      {project.category}
    </div>

    {/* Arrow — appears on hover */}
    <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/[0.08] flex items-center justify-center text-white/60 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
      ↗
    </div>

    {/* Bottom gradient overlay */}
    <div className="absolute bottom-0 left-0 right-0 h-28"
      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.72), transparent)' }} />

    {/* Title */}
    <div className="absolute bottom-6 left-6">
      <h3 className="font-syne font-bold text-[24px] text-white">{project.name}</h3>
    </div>
  </motion.a>
);

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-36">
      <RevealOnScroll>
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Selected Work</p>
        <h2 className="mb-10 font-syne text-[34px] font-bold leading-[1.05] text-white md:mb-20 md:text-[44px]">Work We're Proud Of.</h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2" style={{ gridAutoRows: '230px' }}>
        <RevealOnScroll className="md:row-span-2">
          <ProjectCard project={projects[0]} />
        </RevealOnScroll>
        <RevealOnScroll delay={0.08} className="md:row-span-2">
          <ProjectCard project={projects[1]} />
        </RevealOnScroll>
      </div>

      <RevealOnScroll>
        <div className="flex justify-center mt-16">
          <Link to="/portfolio" className="font-sans text-[15px] text-white/60 hover:text-white transition-colors duration-150">
            View All Projects →
          </Link>
        </div>
      </RevealOnScroll>
    </section>
  );
}
