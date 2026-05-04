import { Link, useNavigate } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { useCart } from '../context/cartStore';
import { formatCurrency } from '../data/pricing';
import Layout from '../components/layout/Layout';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, total, requiresAuth, syncing } = useCart();

  const proceedToCheckout = () => {
    if (!items.length) return;
    navigate('/checkout', { state: { items } });
  };

  return (
    <Layout>
      <section className="mx-auto max-w-[980px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:text-[13px]">Cart</p>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] text-white md:text-[64px]">Your Order.</h1>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="rounded-[16px] border border-white/[0.08] bg-[#0E0E0E]/85 p-5 sm:p-8">
            {requiresAuth ? (
              <div className="py-16 text-center">
                <p className="font-syne text-[24px] font-bold text-white">Login to view your cart.</p>
                <p className="mx-auto mt-3 max-w-[420px] font-sans text-[14px] leading-[1.7] text-text-secondary">
                  Each cart is connected to a specific account so your items stay private and synced.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-block rounded-full bg-white px-6 py-3.5 text-center font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85"
                >
                  Continue with Google
                </Link>
              </div>
            ) : syncing ? (
              <div className="py-16 text-center font-sans text-[14px] text-text-secondary">Loading your cart...</div>
            ) : items.length ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.cartId} className="flex flex-col gap-4 rounded-[14px] border border-white/[0.06] bg-white/[0.025] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-syne text-[18px] font-bold text-white">{item.name}</p>
                      <p className="mt-1 font-sans text-[13px] text-text-secondary">{item.type}</p>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <p className="font-sans text-[15px] text-white">{item.price}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartId)}
                        className="font-sans text-[13px] text-white/45 transition-colors duration-150 hover:text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
                  <p className="font-sans text-[14px] text-text-secondary">Estimated total</p>
                  <p className="font-syne text-[28px] font-[800] text-white">{formatCurrency(total)}</p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-syne text-[24px] font-bold text-white">Your cart is empty.</p>
                <p className="mx-auto mt-3 max-w-[420px] font-sans text-[14px] leading-[1.7] text-text-secondary">
                  Add a website plan, design service, or add-on from the pricing page to start checkout.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                to="/pricing"
                className="rounded-full border border-white/[0.12] px-6 py-3.5 text-center font-sans text-[15px] font-medium text-white transition-colors duration-150 hover:border-white/[0.24]"
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={proceedToCheckout}
                disabled={!items.length || requiresAuth}
                className="rounded-full bg-white px-6 py-3.5 text-center font-sans text-[15px] font-medium text-[#080808] transition-opacity duration-150 hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-35"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </Layout>
  );
}
