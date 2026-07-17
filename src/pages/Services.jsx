import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const serviceData = [
  {
    title: 'Website Development',
    desc1: 'We craft digital platforms that blend engineering precision with creative design. Every line of code is intentional, every animation is purposeful, and every interaction is optimized for conversion.',
    desc2: 'From blazing-fast marketing sites to complex web applications, we deliver experiences that perform as beautifully as they look.',
    features: ['Custom React / Next.js Development', 'Performance-first architecture', 'Responsive, mobile-first design', 'CMS integration & headless builds', 'Advanced animations with GSAP & Framer'],
    visual: 'web',
    flip: false,
  },
  {
    title: 'UI/UX Design',
    desc1: 'Great design is invisible. It guides users without effort, communicates trust without words, and converts without pressure. We start with research and end with pixel-perfect design systems.',
    desc2: 'Our process bridges strategy and aesthetics — resulting in interfaces that delight users and achieve business goals simultaneously.',
    features: ['User research & journey mapping', 'Wireframing & interactive prototypes', 'Full Figma design systems', 'Usability testing', 'Handoff-ready specs for developers'],
    visual: 'ux',
    flip: true,
  },
  {
    title: 'Brand Identity and Design',
    desc1: 'Your brand is your first impression, your last memory, and everything in between. We build identities that are distinct, consistent, and built to scale across every medium.',
    desc2: 'From logo marks to full brand guidelines — we create visual languages that speak before you say a word.',
    features: ['Logo design & brand mark', 'Full brand guidelines document', 'Typography & color systems', 'Social media kit & templates', 'Brand strategy & positioning'],
    visual: 'brand',
    flip: false,
  },
    {
    title: 'Social Media Handling',
    desc1: 'Social media is where your brand lives in real time. We manage the calendar, the content, and the conversation — turning followers into a community that actually engages with what you post.',
    desc2: 'From platform strategy to daily execution, we keep your presence consistent, on-brand, and built for growth across every channel that matters.',
    features: ['Content calendar & scheduling', 'Platform-specific creative (Instagram, LinkedIn, X)', 'Community management & engagement', 'Analytics & performance reporting', 'Paid social campaign support'],
    visual: 'web',
    flip: true,
  },
];

const ServiceVisual = ({ type, title }) => {
  if (type === 'web') {
    return (
      <div className="glass-surface light-sweep relative aspect-[4/3] min-h-[240px] w-full overflow-hidden rounded-[16px] p-4 sm:p-6">
        <div className="flex items-center gap-2 border-b border-white/[0.07] pb-3 sm:pb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
          <span className="ml-2 h-2 w-24 rounded-full bg-white/[0.08] sm:ml-4 sm:w-36" />
        </div>
        <div className="grid h-[calc(100%-40px)] grid-cols-1 gap-4 pt-4 sm:h-[calc(100%-48px)] sm:grid-cols-[1fr_0.8fr] sm:gap-5 sm:pt-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="h-4 w-28 rounded-full bg-white/20 sm:h-5 sm:w-32" />
            <div className="h-3 w-full rounded-full bg-white/[0.08]" />
            <div className="h-3 w-4/5 rounded-full bg-white/[0.08]" />
            <div className="grid grid-cols-2 gap-3 pt-2 sm:pt-4">
              <span className="h-12 rounded-xl bg-white/[0.055] sm:h-20" />
              <span className="h-12 rounded-xl bg-white/[0.055] sm:h-20" />
            </div>
          </div>
          <div className="relative min-h-[96px] rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4 sm:min-h-0">
            <div className="absolute inset-x-4 top-4 h-12 rounded-xl bg-gradient-to-br from-[#6D28D9]/35 via-[#BE185D]/25 to-[#EA580C]/30 sm:top-5 sm:h-24" />
            <div className="absolute bottom-4 left-4 right-4 space-y-2 sm:bottom-5">
              <span className="block h-2 rounded-full bg-white/25" />
              <span className="block h-2 w-2/3 rounded-full bg-white/[0.12]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'ux') {
    return (
      <div className="glass-surface light-sweep relative aspect-[4/3] min-h-[260px] w-full overflow-hidden rounded-[16px] p-4 sm:p-6">
        <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-[0.75fr_1fr] sm:gap-5">
          <div className="grid grid-cols-2 gap-3 sm:block sm:space-y-3">
            {['Research', 'Flow', 'Prototype', 'Handoff'].map((item, i) => (
              <div key={item} className="rounded-xl border border-white/[0.07] bg-white/[0.035] p-3 sm:p-4">
                <div className="mb-2 flex items-center justify-between sm:mb-3">
                  <span className="font-sans text-[10px] uppercase tracking-[0.12em] text-white/45 sm:text-[11px] sm:tracking-[0.14em]">{item}</span>
                  <span className="h-2 w-2 rounded-full bg-white/25" />
                </div>
                <span className="block h-2 rounded-full bg-white/[0.08]" style={{ width: `${72 - i * 8}%` }} />
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-[#080808]/40 p-4 sm:p-5">
            <div className="mb-4 h-16 rounded-2xl bg-white/[0.055] sm:mb-5 sm:h-28" />
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2, 3, 4, 5].map((item) => (
                <span key={item} className="h-9 rounded-xl bg-white/[0.045] sm:h-16" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-surface light-sweep relative aspect-[4/3] min-h-[240px] w-full overflow-hidden rounded-[16px] p-4 sm:p-6">
      <div className="grid h-full grid-cols-[0.85fr_1fr] gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="rounded-2xl border border-white/[0.08] bg-white/[0.035] p-3 sm:p-5">
          <div className="flex h-full items-center justify-center rounded-xl bg-gradient-to-br from-white/[0.12] to-white/[0.025]">
            <span className="font-syne text-[40px] font-[800] text-white sm:text-[54px]">C</span>
          </div>
        </div>
        <div className="space-y-3 sm:space-y-5">
          <div>
            <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.12em] text-white/45 sm:text-[11px] sm:tracking-[0.14em]">{title}</p>
            <div className="h-3 w-20 rounded-full bg-white/20 sm:w-28" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {['#6D28D9', '#BE185D', '#EA580C', '#14B8A6'].map((color) => (
              <span key={color} className="h-10 rounded-xl border border-white/[0.08] sm:h-16" style={{ background: color }} />
            ))}
          </div>
          <div className="space-y-2 pt-1 sm:pt-2">
            <span className="block h-2 rounded-full bg-white/[0.12]" />
            <span className="block h-2 w-3/4 rounded-full bg-white/[0.08]" />
            <span className="block h-2 w-1/2 rounded-full bg-white/[0.06]" />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceSection = ({ svc, index }) => (
  <div className={`flex flex-col ${svc.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-8 py-14 md:gap-12 md:py-20 lg:gap-16 lg:py-24`}>
    {/* Text side */}
    <div className="flex-1">
      <RevealOnScroll>
        <p className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-4">
          Service 0{index + 1}
        </p>
        <h2 className="mb-6 font-syne text-[30px] font-bold leading-[1.08] text-white md:mb-8 md:text-[36px]">{svc.title}</h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08}>
        <p className="font-sans text-[15px] text-text-secondary leading-[1.75] mb-5">{svc.desc1}</p>
        <p className="font-sans text-[15px] text-text-secondary leading-[1.75] mb-10">{svc.desc2}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.16}>
        <ul className="space-y-3 mb-10">
          {svc.features.map((f, i) => (
            <li key={i} className="flex items-start gap-3 font-sans text-[14px] leading-[1.55] text-[#C9C9C9] md:text-[15px]">
              <span className="mt-[2px] text-white/40">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll delay={0.24}>
       <Link to="/contact" className="group inline-flex items-center gap-1.5 font-sans text-[15px] text-white/60 transition-colors duration-300 ease-out hover:text-white">
          Start This Project →
          <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
        </Link>
      </RevealOnScroll>
    </div>

    <div className="flex-1 w-full">
      <RevealOnScroll delay={0.1}>
        <ServiceVisual type={svc.visual} title={svc.title} />
      </RevealOnScroll>
    </div>
  </div>
);

export default function Services() {
  return (
    <Layout>
      {/* Page hero */}
      <section className="mx-auto max-w-[1280px] px-4 pb-10 pt-20 text-center sm:px-6 md:pb-16 md:pt-28">
        <RevealOnScroll>
          <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Our Capabilities</p>
          <h1 className="mb-5 font-syne text-[40px] font-bold uppercase tracking-wider leading-[1.15] text-white md:mb-6 md:text-[64px]">We Do Three Things.</h1>
          <p className="font-sans text-[16px] leading-[1.6] text-text-secondary md:text-[18px]">And we do them better than anyone else.</p>
          <div className="w-[80px] h-[1px] bg-white/20 mx-auto mt-8" />
        </RevealOnScroll>
      </section>

      <div className="mx-auto max-w-[1280px] divide-y divide-white/[0.05] px-4 sm:px-6">
        {serviceData.map((s, i) => <ServiceSection key={i} svc={s} index={i} />)}
      </div>

      {/* CTA Banner */}
      <section className="py-20 md:py-36">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <RevealOnScroll>
            <div className="rounded-[16px] p-6 text-center sm:p-10 md:p-16"
              style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="mb-4 font-syne text-[28px] font-bold leading-[1.12] text-white md:text-[36px]">Ready to build something exceptional?</h2>
              <p className="mb-8 font-sans text-[15px] leading-[1.6] text-text-secondary md:mb-10 md:text-[16px]">Start with a free 30-minute consultation.</p>
              <Link to="/contact" className="group inline-flex items-center gap-1.5 font-sans text-[15px] text-white/60 transition-colors duration-300 ease-out hover:text-white">
                Book a Free Call →
                <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  );
}
