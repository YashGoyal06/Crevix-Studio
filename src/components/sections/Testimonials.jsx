import { RevealOnScroll } from '../../hooks/useScrollReveal';

const testimonials = [
  {
    quote: 'Crevix rebuilt our entire digital presence. What they delivered was miles beyond what we imagined possible.',
    name: 'Aryan Mehta',
    role: 'CEO at Luminary Co.',
  },
  {
    quote: 'The team understood our vision instantly. Delivered ahead of schedule with insane quality. Recommend 100%.',
    name: 'Sofia Reyes',
    role: 'Head of Product, Vault',
  },
  {
    quote: 'We went from invisible to industry-recognized in 90 days. Crevix is genuinely in a different league.',
    name: 'James Okafor',
    role: 'Founder, Orion Architecture',
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-22">
      <RevealOnScroll>
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">What Clients Say</p>
        <h2 className="mb-10 font-syne text-[34px] font-bold leading-[1.05] text-white md:mb-20 md:text-[44px]">Words From Real Clients.</h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <RevealOnScroll key={i} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-[16px] border-l-2 border-white/[0.15] p-6 sm:p-8 md:p-10"
              style={{ background: '#0E0E0E' }}>
              {/* Stars at top */}
              <div className="text-white/30 text-sm mb-6 tracking-wider">★★★★★</div>

              <p className="font-sans text-[15px] text-[#C9C9C9] leading-[1.8] flex-1 mb-8">{t.quote}</p>

              <div>
                <p className="font-syne font-bold text-[14px] text-white">{t.name}</p>
                <p className="font-sans text-[12px] text-text-secondary mt-1">{t.role}</p>
              </div>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
