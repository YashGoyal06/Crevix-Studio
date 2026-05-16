import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

const InputField = ({ label, type = 'text', name, value, onChange, error, placeholder, as: Tag = 'input', rows, children }) => (
  <div>
    <label className="font-sans text-[11px] uppercase tracking-[0.15em] text-text-secondary mb-2 block">{label}</label>
    <Tag
      type={type} name={name} value={value} onChange={onChange}
      rows={rows} placeholder={placeholder}
      className={`w-full font-sans text-[15px] text-white placeholder-text-muted rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-150 resize-none ${
        error
          ? 'border border-red-500/40 bg-red-500/5'
          : 'border border-white/[0.09] bg-transparent focus:border-white/[0.35]'
      }`}
    >
      {children}
    </Tag>
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-red-400 text-[12px] mt-1.5 font-sans">
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', preferredTime: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Full name is required.';
    if (!form.email.trim())   e.email   = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.type)           e.type    = 'Please select a call reason.';
    if (!form.message.trim()) e.message = 'A message is required.';
    return e;
  };

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');

    try {
      const payload = {
        access_key: import.meta.env.VITE_WEB3FORMS_KEY,
        subject: `[Crevix Studio] New query: ${form.type || 'Contact Form'}`,
        from_name: form.name,
        name: form.name,
        email: form.email,
        'Call Reason': form.type,
        'Preferred Call Time': form.preferredTime || 'Not specified',
        message: form.message,
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
      } else {
        console.error('Web3Forms error:', data);
        setStatus('error');
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
    }
  };

  return (
    <Layout>
      <section className="mx-auto max-w-[1280px] px-4 py-20 sm:px-6 md:py-28 lg:py-36">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[40%_55%] lg:gap-20">
          {/* Left — Info */}
          <div>
            <RevealOnScroll>
              <p className="mb-5 font-sans text-[12px] uppercase tracking-[0.15em] text-text-secondary md:mb-6 md:text-[13px]">Help & Query Call</p>
              <h1 className="mb-5 font-syne text-[36px] font-bold leading-[1.08] text-white md:mb-6 md:text-[44px]">
                Need Help Choosing The Right Option?
              </h1>
              <p className="mb-8 font-sans text-[15px] leading-[1.75] text-text-secondary md:mb-12">
                Book a quick query call for plan guidance, order help, custom requests, or general questions.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <div className="mb-4 space-y-4 md:mb-12">
                <a href="mailto:contact@crevix-studio.in" className="block font-sans text-[15px] text-text-secondary hover:text-white transition-colors duration-150">
                  contact@crevix-studio.in
                </a>
                <a href="tel:+917817833974" className="block font-sans text-[15px] text-text-secondary hover:text-white transition-colors duration-150">
                  +91 78178 33974
                </a>
                <a href="https://wa.me/919897422911" target="_blank" rel="noreferrer"
                  className="block font-sans text-[15px] text-text-secondary hover:text-white transition-colors duration-150">
                  Chat on WhatsApp →
                </a>
                <p className="font-sans text-[15px] text-text-muted pt-2">Delhi, India · Working Worldwide</p>
              </div>
            </RevealOnScroll>
          </div>

          {/* Right — Form */}
          <RevealOnScroll delay={0.12}>
            <div className="rounded-[16px] p-5 sm:p-8 md:p-12"
              style={{ background: '#0E0E0E', border: '1px solid rgba(255,255,255,0.09)' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white text-lg mb-6">
                      ✓
                    </div>
                    <h3 className="font-syne font-bold text-[22px] text-white mb-3">Request received.</h3>
                    <p className="font-sans text-[14px] text-text-secondary">We'll reach out soon to help with your query.</p>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-12 h-12 rounded-full border border-red-500/40 flex items-center justify-center text-red-400 text-lg mb-6">
                      ✕
                    </div>
                    <h3 className="font-syne font-bold text-[22px] text-white mb-3">Something went wrong.</h3>
                    <p className="font-sans text-[14px] text-text-secondary mb-6">Please try again or email us directly at contact@crevix-studio.in</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="font-sans text-[13px] text-text-secondary hover:text-white underline underline-offset-4 transition-colors duration-150"
                    >Try again →</button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <InputField label="Full Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Jane Smith" />
                    <InputField label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@company.com" />
                    <InputField label="Call Reason" name="type" value={form.type} onChange={handleChange} error={errors.type} as="select">
                      <option value="" disabled style={{ background: '#0E0E0E' }}>Select a reason…</option>
                      {['Plan Guidance', 'Order / Payment Help', 'Custom Requirement', 'Existing Website Query', 'General Help'].map((o) => (
                        <option key={o} value={o} style={{ background: '#0E0E0E' }}>{o}</option>
                      ))}
                    </InputField>
                    <InputField label="Preferred Call Time" name="preferredTime" value={form.preferredTime} onChange={handleChange} as="select">
                      <option value="" style={{ background: '#0E0E0E' }}>Select preferred time…</option>
                      {['Morning', 'Afternoon', 'Evening', 'Anytime'].map((o) => (
                        <option key={o} value={o} style={{ background: '#0E0E0E' }}>{o}</option>
                      ))}
                    </InputField>
                    <InputField label="Your Query" name="message" value={form.message} onChange={handleChange} error={errors.message} placeholder="Tell us what you need help with..." as="textarea" rows={5} />

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 rounded-full bg-white text-[#080808] font-sans font-medium text-[15px] hover:bg-white/[0.88] transition-all duration-150 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="40 60" />
                          </svg>
                          Sending…
                        </>
                      ) : 'Request a Call →'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </Layout>
  );
}
