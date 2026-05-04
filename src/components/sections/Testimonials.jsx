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
    <section className="py-36 max-w-[1280px] mx-auto px-6">
      <RevealOnScroll>
        <p className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-4">What Clients Say</p>
        <h2 className="font-syne font-bold text-[44px] text-white mb-20">Words From Real Clients.</h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <RevealOnScroll key={i} delay={i * 0.08}>
            <div className="rounded-[16px] p-10 h-full flex flex-col border-l-2 border-white/[0.15]"
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
