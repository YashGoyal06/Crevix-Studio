import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import { useCart } from '../context/cartStore';
import { useAuth } from '../context/authStore';
import { supabase } from '../lib/supabaseClient';
import { addOns, designServices, designPackages, webPlans } from '../data/pricing';

// Purchase status badge configurations
const STATUS_BADGES = {
  full: {
    text: 'Plan Purchased',
    classes: 'border-[rgba(16,185,129,0.25)] bg-[rgba(16,185,129,0.1)] text-success',
  },
  advance: {
    text: 'Advance Given',
    classes: 'border-[rgba(245,158,11,0.25)] bg-[rgba(245,158,11,0.1)] text-warning',
  },
};

const PricingCard = ({ plan, onBuyNow, onAddToCart, purchaseStatus }) => {
  const isWebPlan = plan.type === 'Website Plan';

  return (
    <motion.div
      whileHover={{ y: -8, rotateX: -3, rotateY: 3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1 sm:p-8 md:p-10 pricing-card-el"
      style={{
        background: 'var(--color-surface)',
        border: plan.featured ? '1px solid var(--color-accent)' : '1px solid var(--color-border)',
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
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-[11px] font-sans tracking-wider uppercase font-bold"
          style={{ background: '#0D3B2E', color: '#B88C3A', border: '1px solid #B88C3A' }}>
          Most Popular
        </div>
      )}
      
      {STATUS_BADGES[purchaseStatus] && (
        <div className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-[11px] font-sans uppercase tracking-[0.1em] ${STATUS_BADGES[purchaseStatus].classes}`}>
          {STATUS_BADGES[purchaseStatus].text}
        </div>
      )}

      <div className="mb-8">
        <p className="font-syne font-bold text-[18px] text-[var(--color-text)] mb-3">{plan.name}</p>
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2">
            <span className="font-syne text-[38px] font-[800] leading-none text-[var(--color-text)] md:text-[44px]">{plan.price}</span>
            <span className="font-sans text-[13px] text-[var(--color-text-muted)]">Full Amount</span>
          </div>
          {isWebPlan && (
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-syne text-[22px] font-bold text-[var(--color-text-secondary)]">{plan.advance}</span>
              <span className="font-sans text-[12px] text-[var(--color-text-muted)]/65 italic">Start with Advance</span>
            </div>
          )}
        </div>
      </div>

      <ul className="space-y-4 flex-1 mb-10">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 font-sans text-[14px] leading-[1.55] text-[var(--color-text-secondary)]">
            <span className="mt-[2px] text-[var(--color-accent)] font-bold">✓</span>
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
                  className="block w-full rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] py-3.5 text-center font-sans text-[15px] font-bold text-[#080808] transition-colors duration-150"
                >
                  Pay Advance
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => onBuyNow(plan, false)}
                  className="block w-full rounded-full border border-[var(--color-secondary)]/30 text-white transition-colors duration-150 hover:bg-[var(--color-secondary)]/10 py-3.5 text-center font-sans text-[15px] font-medium"
                >
                  Pay Full Amount
                </motion.button>
                <p className="px-2 text-center font-sans text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
                  Start with a small advance or pay full amount. <span className="text-[var(--color-accent)] font-medium">Advance valid for 7 days.</span> Remaining can be completed later.
                </p>
              </>
            )}
          </>
        ) : (
          <>
            <motion.button
              type="button"
              onClick={() => onBuyNow(plan)}
              className={`block w-full rounded-full py-3.5 text-center font-sans text-[15px] font-medium transition-colors duration-150 ${
                plan.featured
                  ? 'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#080808] font-bold'
                  : 'border border-[var(--color-border)] text-white hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10'
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
              className="mt-3 block w-full rounded-full border border-[var(--color-border)] py-3.5 text-center font-sans text-[15px] font-medium text-[var(--color-text-secondary)] transition-colors duration-150 hover:border-[var(--color-secondary)]/30 hover:text-white"
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

const ServiceCard = ({ item, onAddToCart, onBuyNow }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
    className="relative flex flex-col justify-between rounded-[20px] p-6 transition-all duration-300 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] max-w-[320px] pricing-card-el"
    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
  >
    <div>
      <h3 className="font-syne font-bold text-[17px] text-[var(--color-text)] mb-2">{item.name}</h3>
      <p className="font-sans text-[13px] leading-[1.5] text-text-secondary mb-6">{item.unit}</p>
    </div>
    <div>
      <div className="flex items-baseline gap-1.5 mb-5">
        <span className="font-syne font-extrabold text-[22px] text-[var(--color-text)]">{item.price.replace('Starting from ', '')}</span>
        <span className="font-sans text-[11px] text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">Starting</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onAddToCart(item)}
          className="rounded-full border border-[var(--color-border)] py-2.5 text-center font-sans text-[11px] font-medium text-white transition-all duration-150 hover:border-white/[0.15] hover:text-[var(--color-text-secondary)] hover:bg-white/[0.02]"
        >
          Add to Cart
        </button>
        <button
          type="button"
          onClick={() => onBuyNow(item)}
          className="rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] py-2.5 text-center font-sans text-[11px] font-bold text-[#080808] transition-colors duration-150"
        >
          Buy Now
        </button>
      </div>
    </div>
  </motion.div>
);

const PackageCard = ({ item, onBuyNow, onAddToCart }) => (
  <motion.div
    whileHover={{ y: -8 }}
    transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    className="group relative flex flex-col rounded-[24px] p-8 md:p-10 transition-all duration-300 pricing-card-el"
    style={{
      background: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      boxShadow: '0 5px 20px rgba(0, 0, 0, 0.38)',
    }}
  >
    <div className="mb-8">
      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase text-[var(--color-text-secondary)] border border-[var(--color-border)] mb-4">
        {item.type}
      </div>
      <h3 className="font-syne font-bold text-[22px] text-[var(--color-text)] mb-2">{item.name}</h3>
      <div className="flex items-baseline gap-2 mt-4">
        <span className="font-syne text-[36px] font-[800] leading-none text-[var(--color-text)]">{item.price.split('/')[0].replace('Starting from ', '')}</span>
        {item.price.includes('/month') && (
          <span className="font-sans text-[13px] text-[var(--color-text-secondary)]">/ month</span>
        )}
        {!item.price.includes('/month') && (
          <span className="font-sans text-[11px] text-[var(--color-text-secondary)] uppercase tracking-wider font-semibold">Starting</span>
        )}
      </div>
    </div>

    <div className="flex-1 mb-8">
      <p className="font-sans text-[12px] uppercase tracking-wider text-[var(--color-text-secondary)] mb-4 font-semibold">Includes:</p>
      <ul className="space-y-3">
        {item.features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 font-sans text-[14px] leading-relaxed text-[var(--color-text-secondary)]">
            <span className="text-[var(--color-accent)] mt-[3px]">✦</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>

    <div className="space-y-3">
      <button
        type="button"
        onClick={() => onBuyNow(item)}
        className="block w-full rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] py-3.5 text-center font-sans text-[14px] font-bold text-[#080808] transition-colors duration-150"
      >
        Get Started
      </button>
      <button
        type="button"
        onClick={() => onAddToCart(item)}
        className="block w-full rounded-full border border-[var(--color-border)] py-3.5 text-center font-sans text-[14px] font-medium text-[var(--color-text-secondary)] transition-all duration-150 hover:border-[var(--color-secondary)]/30 hover:text-white"
      >
        Add to Cart
      </button>
    </div>
  </motion.div>
);

// Logical Sections Components
const PricingHeader = () => (
  <section className="mx-auto max-w-[1280px] px-4 pb-8 pt-20 text-center sm:px-6 md:pb-12 md:pt-28">
    <RevealOnScroll>
      <div className="mb-6 flex items-center justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-4 py-1.5 font-sans text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent-hover)] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent)]"></span>
          </span>
          Prices Increase After May 15th
        </div>
      </div>
      <h1 className="mb-4 font-syne text-[40px] font-bold uppercase tracking-wider leading-[1.15] text-[var(--color-text)] md:text-[64px]">Honest Pricing.</h1>
      <p className="font-sans text-[16px] leading-[1.6] text-text-secondary md:text-[18px]">Websites, design support, and online ordering setup without hidden fees.</p>
    </RevealOnScroll>
  </section>
);

const WebsitePlansSection = ({ plans, onBuyNow, onAddToCart, purchasedItems }) => (
  <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
    <RevealOnScroll>
      <p className="mb-10 text-center font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-14 md:text-[13px]">
        Website Packages <span className="text-[var(--color-accent)] font-medium block mt-1 normal-case font-sans text-[11px] tracking-normal">(Note: Domain is excluded from all plans)</span>
      </p>
    </RevealOnScroll>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {plans.map((p, i) => (
        <RevealOnScroll key={i} delay={i * 0.08}>
          <PricingCard
            plan={p}
            onBuyNow={onBuyNow}
            onAddToCart={onAddToCart}
            purchaseStatus={purchasedItems.find(item => item.id === p.id)?.status}
          />
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

const DesignServicesSection = ({ services, onAddToCart, onBuyNow }) => (
  <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
    <RevealOnScroll>
      <div className="mb-10 text-center md:mb-12">
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Individual Services</p>
        <h2 className="font-syne text-[32px] font-bold leading-[1.08] text-[var(--color-text)] md:text-[44px]">Design Services</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {services.map((s, i) => (
          <ServiceCard key={i} item={s} onAddToCart={onAddToCart} onBuyNow={onBuyNow} />
        ))}
      </div>
    </RevealOnScroll>
  </section>
);

const DesignPackagesSection = ({ packages, onBuyNow, onAddToCart }) => (
  <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
    <RevealOnScroll>
      <div className="mb-10 text-center md:mb-12">
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Packages</p>
        <h2 className="font-syne text-[32px] font-bold leading-[1.08] text-[var(--color-text)] md:text-[44px]">Premium Design Packages</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, i) => (
          <PackageCard key={i} item={pkg} onBuyNow={onBuyNow} onAddToCart={onAddToCart} />
        ))}
      </div>
    </RevealOnScroll>
  </section>
);

const CustomSolutionsSection = () => (
  <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
    <RevealOnScroll>
      <div className="relative rounded-[28px] overflow-hidden p-8 md:p-14 text-center border border-[var(--color-border)]"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(184, 140, 58, 0.05) 0%, rgba(0,0,0,0) 80%), var(--color-surface)'
        }}
      >
        <div className="max-w-[640px] mx-auto">
          <div className="inline-block px-3 py-1 rounded-full text-[10px] font-sans tracking-widest uppercase text-[var(--color-text-muted)] border border-[var(--color-border)] mb-6">
            Tailored Creative Solutions
          </div>
          <h2 className="font-syne text-[32px] font-bold leading-tight text-[var(--color-text)] mb-4 md:text-[42px]">Custom Solutions</h2>
          <p className="font-sans text-[16px] leading-relaxed text-text-secondary mb-3 font-semibold">
            Need something specific?
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-[var(--color-text-secondary)]/70 mb-8 max-w-[500px] mx-auto">
            We offer tailored creative solutions designed around your brand goals, campaign requirements, and business needs. Contact us for a custom quote.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-8 py-4 font-sans text-[15px] font-bold text-[#080808] transition-colors duration-150">
            Request Custom Quote
            <span>→</span>
          </Link>
        </div>
      </div>
    </RevealOnScroll>
  </section>
);

const AddOnsSection = ({ addOnsList, onAddToCart }) => (
  <section className="mx-auto max-w-[1280px] px-4 py-12 sm:px-6 md:py-16">
    <RevealOnScroll>
      <div className="mb-10 text-center md:mb-12">
        <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Add-ons</p>
        <h2 className="font-syne text-[32px] font-bold leading-[1.08] text-[var(--color-text)] md:text-[44px]">Upgrade Only What You Need.</h2>
      </div>
    </RevealOnScroll>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {addOnsList.map((item, i) => (
        <RevealOnScroll key={item.name} delay={i * 0.04}>
          <div className="h-full rounded-[16px] p-6 transition-all duration-200 hover:-translate-y-1 pricing-card-el"
            style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
            <p className="mb-3 font-syne text-[16px] font-bold leading-tight text-[var(--color-text)]">{item.name}</p>
            <p className="font-sans text-[15px] text-text-secondary">{item.price}</p>
            <button
              type="button"
              onClick={() => onAddToCart(item)}
              className="mt-6 w-full rounded-full border border-[var(--color-border)] py-3 text-center font-sans text-[14px] font-medium text-[var(--color-text-secondary)] transition-colors duration-150 hover:border-[var(--color-secondary)]/30 hover:text-white"
            >
              Add to Cart
            </button>
          </div>
        </RevealOnScroll>
      ))}
    </div>
  </section>
);

const PricingFooterCTA = () => (
  <RevealOnScroll>
    <div className="px-4 py-14 pb-20 text-center md:py-20 md:pb-36">
      <p className="font-sans text-[15px] text-text-secondary mb-3">Not sure which plan fits?</p>
      <Link to="/contact" className="font-sans text-[16px] text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors duration-150">
        Book a Free Strategy Call →
      </Link>
    </div>
  </RevealOnScroll>
);

export default function Pricing() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [toast, setToast] = useState('');
  const [purchasedItems, setPurchasedItems] = useState([]);

  useEffect(() => {
    document.body.classList.add('bg-forest-page');
    return () => {
      document.body.classList.remove('bg-forest-page');
    };
  }, []);

  useEffect(() => {
    if (!user?.id) return;
    let active = true;
    
    const loadPurchases = async () => {
      const { data, error } = await supabase
        .from('purchased_plans')
        .select('plan_id, status')
        .eq('user_id', user.id);
        
      if (active && data) {
        setPurchasedItems(data.map(item => ({ id: item.plan_id, status: item.status })));
      }
    };
    
    loadPurchases();
    return () => { active = false; };
  }, [user?.id]);

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
        <div className="fixed right-4 top-24 z-[120] rounded-full border border-[var(--color-border)] bg-[#111111]/95 px-5 py-3 font-sans text-[14px] text-white shadow-2xl backdrop-blur-md">
          {toast}
        </div>
      )}

      <PricingHeader />

      <WebsitePlansSection 
        plans={webPlans} 
        onBuyNow={handleBuyNow} 
        onAddToCart={handleAddToCart} 
        purchasedItems={purchasedItems} 
      />

      <DesignServicesSection 
        services={designServices} 
        onAddToCart={handleAddToCart} 
        onBuyNow={handleBuyNow} 
      />

      <DesignPackagesSection 
        packages={designPackages} 
        onBuyNow={handleBuyNow} 
        onAddToCart={handleAddToCart} 
      />

      <CustomSolutionsSection />

      <AddOnsSection 
        addOnsList={addOns} 
        onAddToCart={handleAddToCart} 
      />

      <PricingFooterCTA />
    </Layout>
  );
}
