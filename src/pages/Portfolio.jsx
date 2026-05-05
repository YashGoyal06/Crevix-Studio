import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import Meta from '../components/ui/Meta';
import { ProjectCard3D } from '../components/ui/ProjectCard3D';
import { projects } from '../data/projects';

export default function Portfolio() {
  return (
    <Layout>
      <Meta 
        title="Our Portfolio" 
        description="Explore our curated collection of premium web prototypes, SaaS dashboards, and digital products built by Crevix Studio."
      />
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-36 md:pt-28">
        <RevealOnScroll>
          <div className="mb-16 text-center md:mb-24">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">
                Portfolio
              </p>
              <span className="h-px w-8 bg-white/20" />
            </div>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">
              Our Projects.
            </h1>
            <p className="mx-auto mt-5 max-w-[520px] font-sans text-[15px] leading-[1.7] text-text-secondary">
              A collection of high-end prototypes and production-ready experiences, built with precision and craft.
            </p>
          </div>
        </RevealOnScroll>

        {/* Seamless Grid — All 5 projects */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 0.08}>
              <ProjectCard3D project={project} />
            </RevealOnScroll>
          ))}
        </div>

        {/* Bottom CTA */}
        <RevealOnScroll>
          <div className="mt-24 rounded-[24px] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent p-10 text-center md:mt-36 md:p-16">
            <p className="mb-3 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary">
              Ready to start?
            </p>
            <h3 className="mb-4 font-syne text-[28px] font-bold text-white md:text-[42px]">
              Let's build something together.
            </h3>
            <p className="mx-auto mb-8 max-w-[440px] font-sans text-[14px] leading-[1.7] text-text-secondary md:text-[16px]">
              Have a project in mind? We'd love to bring your vision to life.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 font-sans text-[15px] font-semibold text-[#080808] transition-opacity duration-150 hover:opacity-90"
            >
              Get in Touch
              <span className="ml-1">→</span>
            </a>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
}
