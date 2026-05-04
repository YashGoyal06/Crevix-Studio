import { useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { useCart } from '../context/cartStore';
import { formatCurrency, getPaymentLinkForItems } from '../data/pricing';
import Layout from '../components/layout/Layout';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  businessName: '',
};

export default function Checkout() {
  const location = useLocation();
  const { items: cartItems, clearCart } = useCart();
  const checkoutItems = location.state?.items?.length ? location.state.items : cartItems;
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');

  const total = useMemo(
    () => checkoutItems.reduce((sum, item) => sum + (item.amount || 0), 0),
    [checkoutItems],
  );

  const paymentLink = getPaymentLinkForItems(checkoutItems);
  const showSuccess = new URLSearchParams(location.search).get('success') === 'true';

  const handleChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }));
    setError('');
  };

  const proceedToPayment = (e) => {
    e.preventDefault();
    if (!checkoutItems.length) return;
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError('Please fill in your name, email, and phone number.');
      return;
    }

    window.localStorage.setItem('crevix-last-checkout', JSON.stringify({
      customer: form,
      items: checkoutItems,
      total,
      createdAt: new Date().toISOString(),
    }));

    clearCart();
    window.location.assign(paymentLink);
  };

  return (
    <Layout>
      <section className="mx-auto max-w-[1120px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Checkout</p>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Complete Your Order.</h1>
            {showSuccess && (
              <p className="mx-auto mt-5 max-w-[520px] rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 font-sans text-[14px] text-emerald-200">
                Payment flow completed. We will contact you shortly.
              </p>
            )}
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <RevealOnScroll>
            <aside className="rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/85 p-5 sm:p-8">
              <p className="mb-6 font-syne text-[22px] font-bold text-white">Order Summary</p>

              {checkoutItems.length ? (
                <div className="space-y-4">
                  {checkoutItems.map((item, index) => (
                    <div key={item.cartId || `${item.id}-${index}`} className="rounded-[14px] border border-white/[0.06] bg-white/[0.025] p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-syne text-[17px] font-bold text-white">{item.name}</p>
                          <p className="mt-1 font-sans text-[13px] text-text-secondary">{item.type}</p>
                        </div>
                        <p className="shrink-0 font-sans text-[14px] text-white">{item.price}</p>
                      </div>
                      {item.features && (
                        <ul className="mt-4 space-y-2">
                          {item.features.slice(0, 4).map((feature) => (
                            <li key={feature} className="flex gap-2 font-sans text-[12px] leading-[1.45] text-text-secondary">
                              <span className="text-white/25">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
                    <p className="font-sans text-[14px] text-text-secondary">Total</p>
                    <p className="font-syne text-[30px] font-[800] text-white">{formatCurrency(total)}</p>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center">
                  <p className="font-sans text-[15px] text-text-secondary">No items selected.</p>
                  <Link to="/pricing" className="mt-5 inline-block rounded-full bg-white px-6 py-3 font-sans text-[14px] font-medium text-[#080808]">
                    Choose a Plan
                  </Link>
                </div>
              )}
            </aside>
          </RevealOnScroll>

          <RevealOnScroll delay={0.08}>
            <form onSubmit={proceedToPayment} className="rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/85 p-5 sm:p-8">
              <p className="mb-6 font-syne text-[22px] font-bold text-white">Your Details</p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Name</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Email</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]"
                    placeholder="you@company.com"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Phone</span>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]"
                    placeholder="+91 99999 99999"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary">Business Name</span>
                  <input
                    name="businessName"
                    value={form.businessName}
                    onChange={handleChange}
                    className="w-full rounded-[12px] border border-white/[0.09] bg-transparent px-[18px] py-[14px] font-sans text-[15px] text-white outline-none transition-colors duration-150 placeholder:text-text-muted focus:border-white/[0.35]"
                    placeholder="Optional"
                  />
                </label>
              </div>

              {error && <p className="mt-5 font-sans text-[13px] text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={!checkoutItems.length}
                className="mt-8 w-full rounded-full bg-white px-6 py-4 text-center font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Proceed to Payment →
              </button>
              <p className="mt-4 text-center font-sans text-[12px] leading-[1.6] text-text-muted">
                You will be redirected to a secure Razorpay/Stripe payment link.
              </p>
            </form>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  );
}
