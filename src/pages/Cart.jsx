import { Link, useNavigate } from 'react-router-dom';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { useCart } from '../context/cartStore';
import { formatCurrency } from '../data/pricing';
import Layout from '../components/layout/Layout';
import Aurora from '../components/ui/Aurora';

/* ── Palette ── */
const C = {
  deepForest: '#0D3B2E',
  sage:       '#6F8A6E',
  warmStone:  '#D8D2C4',
  gold:       '#B88C3A',
  charcoal:   '#2B2F2E',
};

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, total, requiresAuth, syncing } = useCart();

  const proceedToCheckout = () => {
    if (!items.length) return;
    navigate('/checkout', { state: { items } });
  };

  return (
    <Layout>
      {/* ── Page background with WebGL Aurora (moving green waves) ── */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: '#09221a' }}>
        <Aurora colorStops={['#0D3B2E', '#6F8A6E', '#0D3B2E']} amplitude={1.2} blend={0.6} speed={0.8} />
      </div>

      <section className="relative z-10 mx-auto max-w-[980px] px-4 pb-20 pt-20 sm:px-6 md:pb-28 md:pt-28">
        <RevealOnScroll>
          <div className="mb-10 text-center md:mb-14">
            <p className="mb-4 font-sans text-[12px] uppercase tracking-[0.15em] md:text-[13px]" style={{ color: C.sage }}>Cart</p>
            <h1 className="font-syne text-[40px] font-[800] leading-[1.02] md:text-[64px]" style={{ color: C.warmStone }}>Your Order.</h1>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="rounded-[16px] p-5 sm:p-8"
            style={{ background: C.warmStone, border: '1px solid rgba(13,59,46,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.2)' }}>
            {requiresAuth ? (
              <div className="py-16 text-center">
                <p className="font-syne text-[24px] font-bold" style={{ color: C.deepForest }}>Login to view your cart.</p>
                <p className="mx-auto mt-3 max-w-[420px] font-sans text-[14px] leading-[1.7]" style={{ color: C.deepForest }}>
                  Each cart is connected to a specific account so your items stay private and synced.
                </p>
                <Link
                  to="/login"
                  className="mt-6 inline-block rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-200"
                  style={{ background: C.deepForest, color: C.warmStone }}
                >
                  Continue with Google
                </Link>
              </div>
            ) : syncing ? (
              <div className="py-16 text-center font-sans text-[14px]" style={{ color: C.deepForest }}>Loading your cart...</div>
            ) : items.length ? (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.cartId} className="flex flex-col gap-4 rounded-[14px] p-4 sm:flex-row sm:items-center sm:justify-between"
                    style={{ border: '1px solid rgba(13,59,46,0.12)', background: 'rgba(13,59,46,0.05)' }}>
                    <div>
                      <p className="font-syne text-[18px] font-bold" style={{ color: C.deepForest }}>{item.name}</p>
                      <p className="mt-1 font-sans text-[13px]" style={{ color: C.sage }}>{item.type}</p>
                    </div>
                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <p className="font-sans text-[15px] font-semibold" style={{ color: C.deepForest }}>{item.price}</p>
                      <button
                        type="button"
                        onClick={() => removeItem(item.cartId)}
                        className="font-sans text-[13px] transition-colors duration-200"
                        style={{ color: 'rgba(13,59,46,0.6)' }}
                        onMouseEnter={(e) => e.target.style.color = C.deepForest}
                        onMouseLeave={(e) => e.target.style.color = 'rgba(13,59,46,0.6)'}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex items-center justify-between pt-6" style={{ borderTop: '1px solid rgba(13,59,46,0.15)' }}>
                  <p className="font-sans text-[14px]" style={{ color: C.sage }}>Estimated total</p>
                  <p className="font-syne text-[28px] font-[800]" style={{ color: C.deepForest }}>{formatCurrency(total)}</p>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="font-syne text-[24px] font-bold" style={{ color: C.deepForest }}>Your cart is empty.</p>
                <p className="mx-auto mt-3 max-w-[420px] font-sans text-[14px] leading-[1.7]" style={{ color: C.sage }}>
                  Add a website plan, design service, or add-on from the pricing page to start checkout.
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                to="/pricing"
                className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-medium transition-all duration-200"
                style={{ border: '1px solid rgba(13,59,46,0.3)', color: C.deepForest }}
                onMouseEnter={(e) => e.target.style.borderColor = C.gold}
                onMouseLeave={(e) => e.target.style.borderColor = 'rgba(13,59,46,0.3)'}
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={proceedToCheckout}
                disabled={!items.length || requiresAuth}
                className="rounded-full px-6 py-3.5 text-center font-sans text-[15px] font-semibold transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-35"
                style={{ background: C.deepForest, color: C.warmStone }}
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
