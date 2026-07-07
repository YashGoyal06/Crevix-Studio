import { RevealOnScroll } from '../../hooks/useScrollReveal';

const services = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Website Development',
    body: 'Blazing-fast, responsive, and built to convert. From landing pages to full-scale web applications.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <rect x="3" y="3" width="18" height="18" rx="3" /><rect x="7" y="7" width="4" height="4" rx="1" /><line x1="15" y1="7" x2="17" y2="7" /><line x1="15" y1="11" x2="17" y2="11" /><line x1="7" y1="15" x2="17" y2="15" />
      </svg>
    ),
    title: 'UI/UX Design',
    body: 'Research-backed interfaces that feel frictionless, look stunning, and drive real results.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-white">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Brand Identity',
    body: 'Logos, systems, and visual language that make your brand impossible to ignore.',
  },
];

export default function ServicesGrid() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-14 sm:px-6 md:py-22">
      <RevealOnScroll>
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">What We Do</p>
        <h2 className="mb-10 max-w-[760px] font-syne text-[34px] font-bold leading-[1.05] text-white md:mb-20 md:text-[44px]">
          Three Services. Zero Compromise.
        </h2>
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <RevealOnScroll key={i} delay={i * 0.08}>
            <div
              className="group rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10"
              style={{
                background: '#0E0E0E',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}
            >
              <div className="mb-5 md:mb-6">{s.icon}</div>
              <h3 className="mb-3 font-syne text-[19px] font-bold text-white md:mb-4 md:text-[20px]">{s.title}</h3>
              <p className="font-sans text-[14px] leading-[1.7] text-text-secondary md:text-[15px]">{s.body}</p>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </section>
  );
}
