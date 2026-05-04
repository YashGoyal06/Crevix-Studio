import { RevealOnScroll } from '../../hooks/useScrollReveal';

const stats = [
  { number: '150+', label: 'Projects' },
  { number: '98%',  label: 'Satisfaction' },
  { number: '5 Yrs', label: 'Experience' },
  { number: '24/7',  label: 'Support' },
];

export default function WhyUs() {
  return (
    <section className="py-20 md:py-36" style={{ background: '#0A0A0A' }}>
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <RevealOnScroll>
          <div className="grid grid-cols-2 overflow-hidden rounded-[16px] border border-white/[0.06] md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={i} className="border-white/[0.06] p-5 text-center odd:border-r [&:nth-child(-n+2)]:border-b md:border-b-0 md:border-r md:p-8 md:text-left md:last:border-r-0">
                <div className="mb-2 font-syne text-[34px] font-[800] leading-none text-white sm:text-[42px] md:mb-3 md:text-[56px]">
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
