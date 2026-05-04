import { Link } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const webPlans = [
  {
    name: 'Starter',
    price: '₹1,999',
    period: '/mo',
    features: ['1 Page', 'Responsive Design', 'Basic Design'],
  },
  {
    name: 'Growth',
    price: '₹3,999',
    period: '/mo',
    features: ['3–5 Pages', 'Custom UI', 'Advanced Animations', 'Contact Form', 'SEO Setup'],
    featured: true,
  },
  {
    name: 'Studio',
    price: '₹6,999',
    period: '/mo',
    features: ['Full Website', 'Advanced UI/UX', 'Premium Animations', 'SEO Setup', 'Priority Support', 'Custom Integrations'],
  },
];

const designServices = [
  { name: 'Poster Design',     price: '₹199+',   unit: 'Per poster' },
  { name: 'Logo Design',       price: '₹499+',   unit: 'Per logo mark' },
  { name: 'Social Media Pack', price: '₹999/mo', unit: 'Monthly package' },
];

const PricingCard = ({ plan }) => (
  <div
    className={`relative flex flex-col rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10 ${
      plan.featured ? '' : ''
    }`}
    style={{
      background: plan.featured ? '#141414' : '#0E0E0E',
      border: plan.featured ? 'none' : '1px solid rgba(255,255,255,0.06)',
      borderTop: plan.featured ? '1px solid #FFFFFF' : undefined,
      boxShadow: plan.featured ? '0 24px 48px rgba(0,0,0,0.4)' : 'none',
    }}
    onMouseEnter={(e) => {
      if (!plan.featured) e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={(e) => {
      if (!plan.featured) e.currentTarget.style.boxShadow = 'none';
    }}
  >
    {plan.featured && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase"
        style={{ background: '#1A1A1A', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' }}>
        <span className="text-gradient">Most Popular</span>
      </div>
    )}

    <div className="mb-8">
      <p className="font-syne font-bold text-[18px] text-white mb-3">{plan.name}</p>
      <div className="flex flex-wrap items-end gap-1">
        <span className="font-syne text-[38px] font-[800] leading-none text-white md:text-[44px]">{plan.price}</span>
        <span className="font-sans text-text-secondary mb-1">{plan.period}</span>
      </div>
    </div>

    <ul className="space-y-4 flex-1 mb-10">
      {plan.features.map((f, i) => (
        <li key={i} className="flex items-start gap-3 font-sans text-[14px] leading-[1.55] text-[#C9C9C9]">
          <span className="mt-[2px] text-white/30">✓</span>
          {f}
        </li>
      ))}
    </ul>

    <Link
      to="/contact"
      className={`block w-full rounded-full py-3.5 text-center font-sans text-[15px] font-medium transition-opacity duration-150 hover:opacity-85 ${
        plan.featured
          ? 'bg-white text-[#080808]'
          : 'border border-white/[0.12] text-white hover:border-white/[0.2]'
      }`}
    >
      Get Started →
    </Link>
  </div>
);

export default function Pricing() {
  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-20 text-center sm:px-6 md:pb-12 md:pt-28">
        <RevealOnScroll>
          <h1 className="mb-4 font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Honest Pricing.</h1>
          <p className="font-sans text-[16px] leading-[1.6] text-text-secondary md:text-[18px]">No hidden fees. No surprises. Just great work.</p>
        </RevealOnScroll>
      </section>

      {/* Website Plans */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
        <RevealOnScroll>
          <p className="mb-10 text-center font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-14 md:text-[13px]">Website Packages</p>
        </RevealOnScroll>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {webPlans.map((p, i) => (
            <RevealOnScroll key={i} delay={i * 0.08}>
              <PricingCard plan={p} />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Design Services */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
        <RevealOnScroll>
          <p className="mb-10 text-center font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-12 md:text-[13px]">À La Carte Design</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designServices.map((s, i) => (
              <div key={i} className="rounded-[16px] p-6 text-center transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10"
                style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
                <h3 className="font-syne font-bold text-[18px] text-white mb-3">{s.name}</h3>
                <div className="font-syne font-[800] text-[32px] text-white mb-1">{s.price}</div>
                <p className="font-sans text-[13px] text-text-secondary">{s.unit}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer CTA */}
      <RevealOnScroll>
        <div className="px-4 py-14 pb-20 text-center md:py-20 md:pb-36">
          <p className="font-sans text-[15px] text-text-secondary mb-3">Not sure which plan fits?</p>
          <Link to="/contact" className="font-sans text-[16px] text-white/60 hover:text-white transition-colors duration-150">
            Book a Free Strategy Call →
          </Link>
        </div>
      </RevealOnScroll>
    </Layout>
  );
}
