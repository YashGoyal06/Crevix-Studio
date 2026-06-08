import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import Meta from '../components/ui/Meta';
import { ProjectCard3D } from '../components/ui/ProjectCard3D';
import { projects } from '../data/projects';
import { designs } from '../data/designs';
import LogoCard from '../components/ui/LogoCard';
import LogoLightbox from '../components/ui/LogoLightbox';

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('web'); // 'web' or 'brand'
  const [selectedLogo, setSelectedLogo] = useState(null);

  const handlePrevLogo = () => {
    if (!selectedLogo) return;
    const currentIndex = designs.findIndex((d) => d.id === selectedLogo.id);
    const prevIndex = (currentIndex - 1 + designs.length) % designs.length;
    setSelectedLogo(designs[prevIndex]);
  };

  const handleNextLogo = () => {
    if (!selectedLogo) return;
    const currentIndex = designs.findIndex((d) => d.id === selectedLogo.id);
    const nextIndex = (currentIndex + 1) % designs.length;
    setSelectedLogo(designs[nextIndex]);
  };

  return (
    <Layout>
      <Meta 
        title="Our Portfolio" 
        description="Explore our curated collection of premium web prototypes, SaaS dashboards, and digital brand identities designed by Crevix Studio."
      />
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-36 md:pt-28">
        <RevealOnScroll>
          <div className="mb-16 text-center md:mb-20">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-white/20" />
              <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">
                Portfolio
              </p>
              <span className="h-px w-8 bg-white/20" />
            </div>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">
              Our Showcase.
            </h1>
            <p className="mx-auto mt-5 max-w-[550px] font-sans text-[15px] leading-[1.7] text-text-secondary">
              A curated collection of bespoke web products and premium brand identities, designed with precision and digital craft.
            </p>
          </div>
        </RevealOnScroll>

        {/* Animated Segmented Control Tabs */}
        <RevealOnScroll>
          <div className="mb-16 flex justify-center">
            <div className="relative flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.02] p-1.5 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('web')}
                className={`relative rounded-full px-6 py-2.5 font-sans text-[11px] sm:text-[12px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                  activeTab === 'web' ? 'text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === 'web' && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Web Products</span>
              </button>
              <button
                onClick={() => setActiveTab('brand')}
                className={`relative rounded-full px-6 py-2.5 font-sans text-[11px] sm:text-[12px] font-bold tracking-wider uppercase transition-colors duration-300 ${
                  activeTab === 'brand' ? 'text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {activeTab === 'brand' && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Brand Identity</span>
              </button>
            </div>
          </div>
        </RevealOnScroll>

        {/* Showcase Grid Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'web' ? (
            <motion.div
              key="web-projects"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {projects.map((project, i) => (
                <RevealOnScroll key={project.id} delay={i * 0.05}>
                  <ProjectCard3D project={project} />
                </RevealOnScroll>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="brand-designs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {designs.map((design, i) => (
                <RevealOnScroll key={design.id} delay={i * 0.04}>
                  <LogoCard
                    logo={design}
                    onClick={() => setSelectedLogo(design)}
                  />
                </RevealOnScroll>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox / Modal for Brand Case Studies */}
        <AnimatePresence>
          {selectedLogo && (
            <LogoLightbox
              logo={selectedLogo}
              onClose={() => setSelectedLogo(null)}
              onPrev={handlePrevLogo}
              onNext={handleNextLogo}
            />
          )}
        </AnimatePresence>

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

