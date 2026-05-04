import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const serviceData = [
  {
    title: 'Website Development',
    desc1: 'We craft digital platforms that blend engineering precision with creative design. Every line of code is intentional, every animation is purposeful, and every interaction is optimized for conversion.',
    desc2: 'From blazing-fast marketing sites to complex web applications, we deliver experiences that perform as beautifully as they look.',
    features: ['Custom React / Next.js Development', 'Performance-first architecture', 'Responsive, mobile-first design', 'CMS integration & headless builds', 'Advanced animations with GSAP & Framer'],
    flip: false,
  },
  {
    title: 'UI/UX Design',
    desc1: 'Great design is invisible. It guides users without effort, communicates trust without words, and converts without pressure. We start with research and end with pixel-perfect design systems.',
    desc2: 'Our process bridges strategy and aesthetics — resulting in interfaces that delight users and achieve business goals simultaneously.',
    features: ['User research & journey mapping', 'Wireframing & interactive prototypes', 'Full Figma design systems', 'Usability testing', 'Handoff-ready specs for developers'],
    flip: true,
  },
  {
    title: 'Branding & Creative',
    desc1: 'Your brand is your first impression, your last memory, and everything in between. We build identities that are distinct, consistent, and built to scale across every medium.',
    desc2: 'From logo marks to full brand guidelines — we create visual languages that speak before you say a word.',
    features: ['Logo design & brand mark', 'Full brand guidelines document', 'Typography & color systems', 'Social media kit & templates', 'Brand strategy & positioning'],
    flip: false,
  },
];

const ServiceSection = ({ svc, index }) => (
  <div className={`flex flex-col ${svc.flip ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-start gap-16 py-24`}>
    {/* Text side */}
    <div className="flex-1">
      <RevealOnScroll>
        <p className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-4">
          Service 0{index + 1}
        </p>
        <h2 className="font-syne font-bold text-[36px] text-white mb-8">{svc.title}</h2>
      </RevealOnScroll>

      <RevealOnScroll delay={0.08}>
        <p className="font-sans text-[15px] text-text-secondary leading-[1.75] mb-5">{svc.desc1}</p>
        <p className="font-sans text-[15px] text-text-secondary leading-[1.75] mb-10">{svc.desc2}</p>
      </RevealOnScroll>

      <RevealOnScroll delay={0.16}>
        <ul className="space-y-3 mb-10">
          {svc.features.map((f, i) => (
            <li key={i} className="flex items-center gap-3 font-sans text-[15px] text-[#C9C9C9]">
              <span className="text-white/40">✓</span>
              {f}
            </li>
          ))}
        </ul>
      </RevealOnScroll>

      <RevealOnScroll delay={0.24}>
        <Link to="/contact" className="font-sans text-[15px] text-white/60 hover:text-white transition-colors duration-150">
          Start This Project →
        </Link>
      </RevealOnScroll>
    </div>

    {/* Visual placeholder — clean dark surface */}
    <div className="flex-1 w-full">
      <div className="rounded-[16px] w-full aspect-[4/3] flex items-center justify-center"
        style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="font-sans text-[13px] text-text-muted tracking-[0.15em] uppercase">Coming Soon</span>
      </div>
    </div>
  </div>
);

export default function Services() {
  return (
    <Layout>
      {/* Page hero */}
      <section className="pt-28 pb-16 max-w-[1280px] mx-auto px-6 text-center">
        <RevealOnScroll>
          <p className="font-sans text-[13px] text-text-secondary tracking-[0.15em] uppercase mb-6">Our Capabilities</p>
          <h1 className="font-syne font-[800] text-[64px] text-white mb-6">We Do Three Things.</h1>
          <p className="font-sans text-[18px] text-text-secondary">And we do them better than anyone else.</p>
          <div className="w-[80px] h-[1px] bg-white/20 mx-auto mt-8" />
        </RevealOnScroll>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 divide-y divide-white/[0.05]">
        {serviceData.map((s, i) => <ServiceSection key={i} svc={s} index={i} />)}
      </div>

      {/* CTA Banner */}
      <section className="py-36">
        <div className="max-w-[1280px] mx-auto px-6">
          <RevealOnScroll>
            <div className="rounded-[16px] p-16 text-center"
              style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h2 className="font-syne font-bold text-[36px] text-white mb-4">Ready to build something exceptional?</h2>
              <p className="font-sans text-[16px] text-text-secondary mb-10">Start with a free 30-minute consultation.</p>
              <Link to="/contact">
                <button className="px-10 py-4 rounded-full bg-white text-[#080808] font-sans font-medium text-[15px] hover:opacity-85 transition-opacity duration-150">
                  Book a Free Call
                </button>
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  );
}
