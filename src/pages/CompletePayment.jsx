import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { webPlans, formatCurrency } from '../data/pricing';
import {
  createRazorpayOrder,
  loadRazorpayScript,
  PUBLIC_RAZORPAY_KEY_ID,
  verifyRazorpayPayment,
} from '../lib/payments';

export default function CompletePayment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    planId: '',
  });
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);

  const selectedPlan = useMemo(() => {
    return webPlans.find((p) => p.id === formData.planId);
  }, [formData.planId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;
    
    setError('');
    setProcessing(true);

    try {
      await loadRazorpayScript();

      const order = await createRazorpayOrder({
        amountPaise: selectedPlan.remainingPrice * 100,
        notes: {
          customer_name: formData.name,
          customer_phone: formData.phone,
          plan_name: selectedPlan.name,
          payment_type: 'remaining_balance',
        },
      });

      const options = {
        key: PUBLIC_RAZORPAY_KEY_ID || order.key_id,
        amount: order.amount_paise,
        currency: order.currency,
        order_id: order.razorpay_order_id,
        name: 'Crevix Studio',
        description: `Remaining balance for ${selectedPlan.name}`,
        prefill: {
          name: formData.name,
          contact: formData.phone,
        },
        theme: {
          color: '#FFFFFF',
        },
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            navigate('/checkout?success=true');
          } catch (verifyError) {
            setError('Payment verification failed. Please contact support.');
          } finally {
            setProcessing(false);
          }
        },
        modal: {
          ondismiss: () => {
            setError('Payment was cancelled.');
            setProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError(err.message || 'Unable to start payment.');
      setProcessing(true);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] pt-28 pb-20 px-4">
        <section className="mx-auto max-w-[600px]">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h1 className="font-syne text-[40px] font-[800] leading-tight text-white mb-4">
                Complete Your <span className="text-gradient">Payment</span>
              </h1>
              <p className="font-sans text-white/50 text-[16px]">
                Settle your remaining balance and let's get your project live.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div 
              className="rounded-[24px] p-8 md:p-10"
              style={{ 
                background: '#0E0E0E', 
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
              }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] uppercase tracking-wider text-white/40 ml-1">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 font-sans text-white focus:outline-none focus:border-white/30 transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] uppercase tracking-wider text-white/40 ml-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 font-sans text-white focus:outline-none focus:border-white/30 transition-colors"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Plan Selection */}
                <div className="space-y-2">
                  <label className="block font-sans text-[13px] uppercase tracking-wider text-white/40 ml-1">
                    Selected Plan
                  </label>
                  <select
                    required
                    className="w-full rounded-xl bg-white/[0.03] border border-white/10 px-5 py-4 font-sans text-white focus:outline-none focus:border-white/30 transition-colors appearance-none cursor-pointer"
                    value={formData.planId}
                    onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                  >
                    <option value="" className="bg-[#0E0E0E]">Select your plan</option>
                    {webPlans.map((p) => (
                      <option key={p.id} value={p.id} className="bg-[#0E0E0E]">
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                {error && (
                  <p className="font-sans text-[13px] text-red-400 text-center">{error}</p>
                )}

                {/* Remaining Amount Display */}
                <AnimatePresence mode="wait">
                  {selectedPlan && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="rounded-xl bg-white/5 p-6 border border-white/10 flex justify-between items-center"
                    >
                      <div>
                        <p className="font-sans text-[12px] uppercase tracking-wider text-white/40 mb-1">Remaining Balance</p>
                        <p className="font-syne text-2xl font-bold text-white">
                          {formatCurrency(selectedPlan.remainingPrice)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-sans text-[12px] text-white/30 italic">Total: {selectedPlan.price}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={!selectedPlan || processing}
                  className={`w-full rounded-full py-4 font-sans font-bold text-[16px] transition-all duration-300 ${
                    selectedPlan && !processing
                      ? 'bg-white text-black hover:scale-[1.02] active:scale-[0.98]' 
                      : 'bg-white/10 text-white/20 cursor-not-allowed'
                  }`}
                >
                  {processing ? 'Processing...' : 'Complete Payment'}
                </button>
              </form>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="mt-8 text-center">
              <p className="font-sans text-[14px] text-white/30">
                Having issues? <a href="/contact" className="text-white/60 hover:text-white underline underline-offset-4">Contact Support</a>
              </p>
            </div>
          </RevealOnScroll>
        </section>
      </div>
    </Layout>
  );
}
