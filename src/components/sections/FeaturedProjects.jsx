import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../../hooks/useScrollReveal';
import { ProjectCard3D } from '../ui/ProjectCard3D';
import { projects } from '../../data/projects';

export default function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-22">
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

      {/* Seamless Grid — All 5 projects */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <RevealOnScroll key={project.id} delay={i * 0.08}>
            <ProjectCard3D project={project} />
          </RevealOnScroll>
        ))}
      </div>

      <RevealOnScroll>
        <div className="mt-16 flex justify-center md:mt-20">
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
