import { RevealOnScroll } from '../../hooks/useScrollReveal';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

const benefits = [
  {
    title: 'Fast Launch Cycles',
    description: 'Clear process with milestone-based delivery.',
  },
  {
    title: 'Mobile-First Builds',
    description: 'Every page is optimized for phone users first.',
  },
  {
    title: 'Conversion Focused',
    description: 'Design and copy choices aligned with business goals.',
  },
  {
    title: 'Post-Launch Support',
    description: 'Smooth handover with help for updates and iterations.',
  },
];

export default function WhyUs() {
  const scrollingBenefits = [...benefits, ...benefits];
  const forwardControls = useAnimationControls();
  const reverseControls = useAnimationControls();

  useEffect(() => {
    forwardControls.start({
      x: ['0%', '-50%'],
      transition: { duration: 26, repeat: Infinity, ease: 'linear' },
    });
    reverseControls.start({
      x: ['-50%', '0%'],
      transition: { duration: 30, repeat: Infinity, ease: 'linear' },
    });
  }, [forwardControls, reverseControls]);

  return (
    <section className="py-20 md:py-36" style={{ background: '#0A0A0A' }}>
      <RevealOnScroll>
        <div className="w-full overflow-hidden border-y border-white/[0.1] bg-[linear-gradient(150deg,rgba(14,14,14,0.95),rgba(11,11,11,0.92))] py-7 md:py-10">
          <div className="mb-6 px-5 text-center md:mb-8">
            <p className="font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary">Why Crevix</p>
          </div>

          <motion.div
            className="flex w-max items-stretch gap-4 px-5 md:gap-6 md:px-8"
            animate={forwardControls}
            onHoverStart={() => forwardControls.stop()}
            onHoverEnd={() => {
              forwardControls.start({
                x: ['0%', '-50%'],
                transition: { duration: 26, repeat: Infinity, ease: 'linear' },
              });
            }}
          >
            {scrollingBenefits.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="w-[280px] rounded-[14px] border border-white/[0.1] bg-white/[0.03] p-5 md:w-[340px] md:rounded-[16px] md:p-6"
              >
                <p className="font-syne text-[22px] font-bold leading-[1.1] text-white md:text-[28px]">{item.title}</p>
                <p className="mt-3 font-sans text-[14px] leading-[1.75] text-text-secondary md:text-[15px]">
                  {item.description}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="mt-4 flex w-max items-stretch gap-4 px-5 md:mt-6 md:gap-6 md:px-8"
            animate={reverseControls}
            onHoverStart={() => reverseControls.stop()}
            onHoverEnd={() => {
              reverseControls.start({
                x: ['-50%', '0%'],
                transition: { duration: 30, repeat: Infinity, ease: 'linear' },
              });
            }}
          >
            {scrollingBenefits.map((item, index) => (
              <div
                key={`reverse-${item.title}-${index}`}
                className="w-[240px] rounded-[14px] border border-white/[0.08] bg-white/[0.02] p-4 md:w-[300px] md:rounded-[16px] md:p-5"
              >
                <p className="font-syne text-[18px] font-bold leading-[1.15] text-white md:text-[23px]">{item.title}</p>
                <p className="mt-2 font-sans text-[13px] leading-[1.7] text-text-secondary md:text-[14px]">{item.description}</p>
              </div>
            ))}
          </motion.div>

          <div className="mt-7 px-5 md:mt-9 md:px-8">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
}
