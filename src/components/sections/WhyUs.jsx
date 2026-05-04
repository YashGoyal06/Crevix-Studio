import { RevealOnScroll } from '../../hooks/useScrollReveal';

const stats = [
  { number: '150+', label: 'Projects' },
  { number: '98%',  label: 'Satisfaction' },
  { number: '5 Yrs', label: 'Experience' },
  { number: '24/7',  label: 'Support' },
];

export default function WhyUs() {
  return (
    <section className="py-36" style={{ background: '#0A0A0A' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <RevealOnScroll>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.06]">
            {stats.map((s, i) => (
              <div key={i} className="px-8 py-6 first:pl-0 text-center md:text-left">
                <div className="font-syne font-[800] text-[56px] leading-none text-white mb-3">
                  {s.number}
                </div>
                <div className="font-sans text-[13px] text-text-secondary tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
