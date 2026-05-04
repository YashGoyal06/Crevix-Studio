import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../../hooks/useScrollReveal';

const projects = [
  {
    id: 'luminary',
    name: 'Luminary',
    category: 'E-commerce',
    gradient: 'linear-gradient(135deg, #1a0533 0%, #2d0a4e 50%, #1a0533 100%)',
    tall: true,
  },
  {
    id: 'vault',
    name: 'Vault',
    category: 'Fintech',
    gradient: 'linear-gradient(135deg, #0a1f1a 0%, #0d2e24 50%, #0a1f1a 100%)',
  },
  {
    id: 'orion',
    name: 'Orion Studio',
    category: 'Architecture',
    gradient: 'linear-gradient(135deg, #0f0c20 0%, #1a1730 50%, #0f0c20 100%)',
  },
];

const ProjectCard = ({ project }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.25 }}
    className={`relative overflow-hidden rounded-[16px] group cursor-pointer ${project.tall ? 'row-span-2' : ''}`}
    style={{
      background: project.gradient,
      minHeight: project.tall ? 500 : 230,
    }}
  >
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
      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />

    {/* Title */}
    <div className="absolute bottom-6 left-6">
      <h3 className="font-syne font-bold text-[24px] text-white">{project.name}</h3>
    </div>
  </motion.div>
);

export default function FeaturedProjects() {
  return (
    <section className="py-36 max-w-[1280px] mx-auto px-6">
      <RevealOnScroll>
        <p className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-4">Selected Work</p>
        <h2 className="font-syne font-bold text-[44px] text-white mb-20">Work We're Proud Of.</h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ gridAutoRows: '230px' }}>
        <RevealOnScroll className="row-span-2">
          <ProjectCard project={projects[0]} />
        </RevealOnScroll>
        <RevealOnScroll delay={0.08}>
          <ProjectCard project={projects[1]} />
        </RevealOnScroll>
        <RevealOnScroll delay={0.16}>
          <ProjectCard project={projects[2]} />
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
