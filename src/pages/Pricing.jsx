import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/cartStore';
import { useAuth } from '../context/authStore';
import { addOns, designServices, webPlans } from '../data/pricing';

const PricingCard = ({ plan, onBuyNow, onAddToCart, purchaseStatus }) => {
  const isWebPlan = plan.type === 'Website Plan';

  return (
    <motion.div
      whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`group relative flex flex-col rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10 ${
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
      <div className="pointer-events-none absolute inset-0 rounded-[16px] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {plan.featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase"
          style={{ background: '#1A1A1A', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.15)' }}>
          <span className="text-gradient">Most Popular</span>
        </div>
      )}
      {purchaseStatus === 'full' && (
        <div className="absolute right-4 top-4 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3 py-1 text-[11px] font-sans uppercase tracking-[0.1em] text-emerald-200">
          Plan Purchased
        </div>
      )}
      {purchaseStatus === 'advance' && (
        <div className="absolute right-4 top-4 rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-[11px] font-sans uppercase tracking-[0.1em] text-amber-200">
          Advance Given
        </div>
      )}

      <div className="mb-8">
        <p className="font-syne font-bold text-[18px] text-white mb-3">{plan.name}</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-syne text-[38px] font-[800] leading-none text-white md:text-[44px]">{plan.price}</span>
            <span className="font-sans text-[13px] text-white/40">Full Amount</span>
          </div>
          {isWebPlan && (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-syne text-[22px] font-bold text-white/80">{plan.advance}</span>
              <span className="font-sans text-[12px] text-white/30 italic">Start with Advance</span>
            </div>
          )}
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

      <div className="space-y-3">
        {isWebPlan ? (
          <>
            {purchaseStatus === 'full' ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-center">
                <p className="font-sans text-[14px] font-bold text-emerald-400">Full Amount Done</p>
              </div>
            ) : purchaseStatus === 'advance' ? (
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onBuyNow(plan, false, true)}
                className="block w-full rounded-full bg-emerald-500 py-3.5 text-center font-sans text-[15px] font-bold text-white transition-opacity duration-150 hover:opacity-90"
              >
                Complete Payment
              </motion.button>
            ) : (
              <>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onBuyNow(plan, true)}
                  className="block w-full rounded-full bg-white py-3.5 text-center font-sans text-[15px] font-bold text-[#080808] transition-opacity duration-150 hover:opacity-90"
                >
                  Pay Advance
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onBuyNow(plan, false)}
                  className="block w-full rounded-full border border-white/[0.12] py-3.5 text-center font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/[0.2] hover:bg-white/5"
                >
                  Pay Full Amount
                </motion.button>
                <p className="px-2 text-center font-sans text-[11px] leading-relaxed text-white/40">
                  Start with a small advance or pay full amount. <span className="text-amber-400/60">Advance valid for 7 days.</span> Remaining can be completed later.
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <motion.button
              type="button"
              onClick={() => onBuyNow(plan)}
              className={`block w-full rounded-full py-3.5 text-center font-sans text-[15px] font-medium transition-opacity duration-150 hover:opacity-85 ${
                plan.featured
                  ? 'bg-white text-[#080808]'
                  : 'border border-white/[0.12] text-white hover:border-white/[0.2]'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {purchaseStatus === 'full' ? 'Renew Plan' : 'Buy Now'}
                <motion.span whileHover={{ x: 3 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>→</motion.span>
              </span>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onAddToCart(plan)}
              className="mt-3 block w-full rounded-full border border-white/[0.1] py-3.5 text-center font-sans text-[15px] font-medium text-white/65 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
              whileHover={{ y: -1 }}
              transition={{ duration: 0.2 }}
            >
              Add to Cart
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
};

const ServiceCard = ({ item, onAddToCart }) => (
  <div className="rounded-[16px] p-6 text-center transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10"
    style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
    <h3 className="font-syne font-bold text-[18px] text-white mb-3">{item.name}</h3>
    <div className="font-syne font-[800] text-[28px] text-white mb-2 md:text-[32px]">{item.price}</div>
    {item.unit && <p className="font-sans text-[13px] leading-[1.6] text-text-secondary">{item.unit}</p>}
    <button
      type="button"
      onClick={() => onAddToCart(item)}
      className="mt-6 w-full rounded-full border border-white/[0.1] py-3 text-center font-sans text-[14px] font-medium text-white/65 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
    >
      Add to Cart
    </button>
  </div>
);

export default function Pricing() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [toast, setToast] = useState('');
  const purchasedItems = useMemo(() => {
    if (!user?.id || typeof window === 'undefined') return [];
    try {
      const key = `crevix-purchases-${user.id}`;
      const stored = window.localStorage.getItem(key);
      const parsed = stored ? JSON.parse(stored) : [];
      return parsed.map(item => typeof item === 'string' ? { id: item, status: 'full' } : item);
    } catch {
      return [];
    }
  }, [user?.id]);

  const lastCheckout = useMemo(() => {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(window.localStorage.getItem('crevix-last-checkout') || 'null');
    } catch {
      return null;
    }
  }, []);

  const showAddedToast = (name) => {
    setToast(`${name} added to cart`);
  };

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleBuyNow = (item, isAdvance = false, isRemaining = false) => {
    if (item.paymentLink) {
      window.location.href = item.paymentLink;
      return;
    }
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout', { state: { items: [item], isAdvance, isRemaining } });
  };

  const handleAddToCart = (item) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pricing' } });
      return;
    }
    addItem(item);
    showAddedToast(item.name);
  };

  return (
    <Layout>
      {toast && (
        <div className="fixed right-4 top-24 z-[120] rounded-full border border-white/[0.12] bg-[#111111]/95 px-5 py-3 font-sans text-[14px] text-white shadow-2xl backdrop-blur-md">
          {toast}
        </div>
      )}

      <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-20 text-center sm:px-6 md:pb-12 md:pt-28">
        <RevealOnScroll>
          <div className="mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-widest text-amber-200">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500"></span>
              </span>
              Prices Increase After May 15th
            </div>
          </div>
          <h1 className="mb-4 font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Honest Pricing.</h1>
          <p className="font-sans text-[16px] leading-[1.6] text-text-secondary md:text-[18px]">Websites, design support, and online ordering setup without hidden fees.</p>
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
              <PricingCard
                plan={p}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
                purchaseStatus={purchasedItems.find(item => item.id === p.id)?.status}
              />
            </RevealOnScroll>
          ))}
        </div>
      </section>


      {/* Design Services */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Design Services</p>
            <h2 className="font-syne text-[32px] font-bold leading-[1.08] text-white md:text-[44px]">Design Work That Supports The Launch.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {designServices.map((s, i) => (
              <ServiceCard key={i} item={s} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* Add-ons */}
      <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-12">
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Add-ons</p>
            <h2 className="font-syne text-[32px] font-bold leading-[1.08] text-white md:text-[44px]">Upgrade Only What You Need.</h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {addOns.map((item, i) => (
            <RevealOnScroll key={item.name} delay={i * 0.04}>
              <div className="h-full rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1"
                style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="mb-3 font-syne text-[17px] font-bold leading-tight text-white">{item.name}</p>
                <p className="font-sans text-[15px] text-text-secondary">{item.price}</p>
                <button
                  type="button"
                  onClick={() => handleAddToCart(item)}
                  className="mt-6 w-full rounded-full border border-white/[0.1] py-3 text-center font-sans text-[14px] font-medium text-white/65 transition-colors duration-150 hover:border-white/[0.22] hover:text-white"
                >
                  Add to Cart
                </button>
              </div>
            </RevealOnScroll>
          ))}
        </div>
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
