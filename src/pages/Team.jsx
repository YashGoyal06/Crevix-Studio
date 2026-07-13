import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import TeamGrid from '../components/Team/TeamGrid';
import { teamSections } from '../data/teamData';

export default function Team() {
  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mx-auto mb-12 max-w-[760px] text-center md:mb-20">
            <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Our Team</p>
            <h1 className="font-syne text-[40px] font-bold uppercase tracking-wider leading-[1.15] text-white md:text-[64px]">
              Meet The People <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Behind Crevix.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-[620px] font-sans text-[15px] leading-[1.75] text-text-secondary md:text-[17px]">
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

              <TeamGrid members={section.members} />
            </section>
          ))}
        </div>
      </section>
    </Layout>
  );
}
