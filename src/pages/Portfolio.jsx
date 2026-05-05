import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const filters = ['All', 'Web Development', 'UI/UX', 'Branding'];

const projects = [
  { id: 1, name: 'SipScene', cat: 'Web Development', sub: 'Restaurant & Cloud Kitchen Prototype', gradient: 'linear-gradient(135deg,#1a0f05,#2d180a,#1a0f05)', tall: true, href: 'https://sip-scene-mauve.vercel.app/', image: '/Sipscene-ss.png' },
  { id: 2, name: 'Achievers Academy', cat: 'Web Development', sub: 'Coaching Institute Prototype', gradient: 'linear-gradient(135deg,#051424,#0a203a,#051424)', tall: true, href: 'https://achievers-academy-nu.vercel.app/', image: '/achievers-academy-ss.png' },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = projects.filter((p) => activeFilter === 'All' || p.cat === activeFilter);

  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-36 md:pt-28">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-16">
            <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Selected Work</p>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Our Portfolio.</h1>
          </div>
        </RevealOnScroll>

        {/* Filter pills */}
        <RevealOnScroll>
          <div className="mb-12 flex gap-3 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible md:mb-20">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`shrink-0 rounded-full px-5 py-2.5 font-sans text-[13px] font-medium transition-all duration-150 sm:px-6 ${
                  activeFilter === f
                    ? 'bg-white text-[#080808]'
                    : 'text-text-secondary border border-white/[0.08] hover:text-white hover:border-white/[0.15]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.a
                href={project.href || '#'}
                target={project.href ? "_blank" : "_self"}
                rel="noreferrer"
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0, 1] }}
                className={`group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[16px] block ${project.tall ? 'md:row-span-2 md:min-h-[480px]' : 'md:min-h-[260px]'}`}
                style={{ background: project.image ? `url(${project.image}) center/cover no-repeat` : project.gradient }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Category */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-sans tracking-wider uppercase text-white/50 bg-white/[0.05] border border-white/[0.06]">
                  {project.cat}
                </div>

                {/* Arrow */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center text-white/50 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ↗
                </div>

                {/* Bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)', padding: '60px 20px 20px' }}>
                  <h3 className="font-syne font-bold text-[22px] text-white">{project.name}</h3>

                  <div className="max-h-16 overflow-hidden transition-all duration-250 md:max-h-0 md:group-hover:max-h-16">
                    <p className="font-sans text-[12px] text-white/50 mt-1 mb-3">{project.sub}</p>
                    <span className="text-[12px] font-sans text-white/50 hover:text-white transition-colors duration-150">
                      View →
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </Layout>
  );
}
