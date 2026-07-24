import { useState, useEffect } from 'react';
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

  useEffect(() => {
    document.body.classList.add('bg-forest-page');
    return () => {
      document.body.classList.remove('bg-forest-page');
    };
  }, []);

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

      {/* Ambient background glow & forest base */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #0D3B2E 0%, #071D18 50%, #0D3B2E 100%)',
        }} 
      />

      <div
        className="fixed left-1/2 top-1/3 -translate-x-1/2 h-[700px] w-[700px] rounded-full blur-[180px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(184,140,58,.14), transparent 70%)",
        }}
      />

      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 md:pb-36 md:pt-32">
        <RevealOnScroll>
          <div className="mb-16 text-center md:mb-20">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#B88C3A]/50" />
              <p className="uppercase tracking-[0.35em] text-[#B88C3A] text-xs font-semibold">
                OUR PORTFOLIO
              </p>
              <span className="h-px w-10 bg-[#B88C3A]/50" />
            </div>

            <h1 className="font-syne text-5xl md:text-7xl font-bold leading-tight text-[#F4EFE5]">
              Our{" "}
              <span className="bg-gradient-to-r from-[#D8D2C4] via-[#D2BC7A] to-[#B88C3A] bg-clip-text text-transparent">
                Showcase.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#D8D2C4]/75">
              A curated collection of bespoke web products and premium brand identities, designed with precision and digital craft.
            </p>
          </div>
        </RevealOnScroll>

        {/* Animated Segmented Control Tabs */}
        <RevealOnScroll>
          <div className="mb-16 flex justify-center">
            <div className="relative flex items-center gap-1.5 rounded-full border border-[#B88C3A]/30 bg-[#082A22]/70 p-1.5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
              <button
                onClick={() => setActiveTab('web')}
                className={`relative rounded-full px-7 py-3 font-syne text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  activeTab === 'web' ? 'text-[#071D18]' : 'text-[#D8D2C4]/70 hover:text-white'
                }`}
              >
                {activeTab === 'web' && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-[#B88C3A] shadow-[0_0_20px_rgba(184,140,58,0.4)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Web Products</span>
              </button>
              <button
                onClick={() => setActiveTab('brand')}
                className={`relative rounded-full px-7 py-3 font-syne text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  activeTab === 'brand' ? 'text-[#071D18]' : 'text-[#D8D2C4]/70 hover:text-white'
                }`}
              >
                {activeTab === 'brand' && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 rounded-full bg-[#B88C3A] shadow-[0_0_20px_rgba(184,140,58,0.4)]"
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
          <div className="mt-24 rounded-3xl border border-[#6F8A6E]/30 bg-[#6F8A6E] backdrop-blur-xl p-10 text-center md:mt-36 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          

            <h3 className="mb-4 font-syne text-3xl font-bold text-[#F4EFE5] md:text-5xl">
              Let's build something together.
            </h3>

            <p className="mx-auto mb-8 max-w-md text-base md:text-lg leading-relaxed text-[#D8D2C4]/75">
              Have a project in mind? We'd love to bring your vision to life with world-class design & engineering.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-[#B88C3A] px-9 py-4 font-syne text-sm font-bold text-[#071D18] transition-all duration-300 hover:bg-[#D2BC7A] hover:shadow-[0_0_30px_rgba(184,140,58,0.35)] hover:-translate-y-1"
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

