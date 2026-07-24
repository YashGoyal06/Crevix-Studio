import { useState, useEffect } from 'react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import TeamGrid from '../components/Team/TeamGrid';
import { teamSections } from '../data/teamData';
import TeamModal from '../components/Team/TeamModal';

export default function Team() {
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    document.body.classList.add('bg-forest-page');
    return () => {
      document.body.classList.remove('bg-forest-page');
    };
  }, []);

  return (
    <Layout>
      {/* ── Page background with gradient effect ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'linear-gradient(135deg, #0D3B2E 0%, #071D18 50%, #0D3B2E 100%)',
      }} />

      <div
        className="fixed left-1/2 top-1/3 -translate-x-1/2 h-[700px] w-[700px] rounded-full blur-[180px] pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(184,140,58,.14), transparent 70%)",
        }}
      />

      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pb-20 pt-24 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-20">

            <h1 className="font-syne text-[40px] font-bold uppercase tracking-wider leading-[1.15] text-white md:text-[64px]">
              Meet The People <span className="bg-gradient-to-r from-[#C69A45] via-[#F5E6BF] to-[#B88C3A] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(198,154,69,0.3)]">Behind Crevix.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-4xl font-sans text-[15px] leading-[1.75] text-text-secondary md:text-[17px]">
              A focused studio team across strategy, technology, design, PR, and social media.
            </p>
          </div>
        </RevealOnScroll>

        <div className="space-y-14 md:space-y-18">
          {teamSections.map((section) => (
            <section key={section.title}>
              <RevealOnScroll>
                <h2 className="mb-8 text-center font-syne text-[24px] font-[800] leading-tight text-white md:text-[32px]">
                  {section.title}
                </h2>
              </RevealOnScroll>

              <TeamGrid members={section.members} onMemberClick={setSelectedMember} />
            </section>
          ))}
        </div>
      </section>

      {selectedMember && (
        <TeamModal key={selectedMember.id} member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}
    </Layout>
  );
}
