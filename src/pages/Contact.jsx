import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';

/* ── Palette ── */
const C = {
  deepForest: '#0D3B2E',
  sage:       '#6F8A6E',
  warmStone:  '#D8D2C4',
  gold:       '#B88C3A',
  charcoal:   '#2B2F2E',
};

/* ── Boxed input style with Deep Forest fill ── */
const FormInput = ({ label, type = 'text', name, value, onChange, error, placeholder, rows }) => {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <div>
      <label className="font-sans text-[11px] uppercase tracking-[0.2em] mb-2.5 block font-semibold" style={{ color: C.deepForest }}>{label}</label>
      <Tag
        type={type} name={name} value={value} onChange={onChange}
        rows={rows} placeholder={placeholder}
        className="w-full font-sans text-[15px] rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-200 resize-none placeholder-[#6F8A6E]"
        style={{
          color: C.warmStone,
          background: C.deepForest,
          border: error ? '1px solid rgba(239,68,68,0.7)' : 'none',
        }}
      />
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-600 text-[12px] mt-1.5 font-sans font-semibold">
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Select field ── */
const FormSelect = ({ label, name, value, onChange, error, options, placeholder }) => (
  <div>
    <label className="font-sans text-[11px] uppercase tracking-[0.2em] mb-2.5 block font-semibold" style={{ color: C.deepForest }}>{label}</label>
    <select
      name={name} value={value} onChange={onChange}
      className="w-full font-sans text-[15px] rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-200 appearance-none cursor-pointer"
      style={{
        color: value ? C.warmStone : C.sage,
        background: C.deepForest,
        border: error ? '1px solid rgba(239,68,68,0.7)' : 'none',
      }}
    >
      <option value="" disabled style={{ background: C.deepForest, color: C.sage }}>{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} style={{ background: C.deepForest, color: C.warmStone }}>{o}</option>
      ))}
    </select>
    <AnimatePresence>
      {error && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
          className="text-red-600 text-[12px] mt-1.5 font-sans font-semibold">
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

/* ── Contact info card row using Warm Stone (#D8D2C4) ── */
const ContactCard = ({ icon, title, detail, href, target }) => (
  <a
    href={href}
    target={target}
    rel={target === '_blank' ? 'noreferrer' : undefined}
    className="flex items-center gap-4 rounded-[14px] p-4 transition-all duration-250 group cursor-pointer"
    style={{
      background: C.warmStone,
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(216,210,196,0.85)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = C.warmStone;
    }}
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
      style={{ background: C.deepForest, border: `1px solid rgba(216,210,196,0.2)` }}>
      <span className="text-[16px]" style={{ color: C.warmStone }}>{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-sans text-[12px] uppercase tracking-[0.12em] mb-0.5" style={{ color: C.deepForest }}>{title}</p>
      <p className="text-[14px] truncate font-semibold font-sans" style={{ color: C.deepForest }}>{detail}</p>
    </div>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity duration-200" style={{ color: C.deepForest }}>
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const message = `Hi, I'd like to request an appointment.\n\nName: ${form.name}\nEmail: ${form.email}\nCall Reason: ${form.type || 'Not specified'}\nPreferred Time: ${form.preferredTime || 'Not specified'}\nQuery: ${form.message}`;
    const url = `https://wa.me/917817833974?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <Layout>
      {/* ── Page background with gradient effect ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `linear-gradient(135deg, ${C.deepForest} 0%, ${C.sage} 50%, ${C.deepForest} 100%)`,
      }} />

      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">

        {/* ── Large watermark text ── */}
        <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden md:top-14 lg:top-16" aria-hidden="true">
          <span className="font-syne font-[900] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] uppercase leading-none"
            style={{
              color: 'rgba(216,210,196,0.12)',
              WebkitTextStroke: `1.5px rgba(13,59,46,0.15)`,
              letterSpacing: '0.04em',
            }}>
            CONTACT
          </span>
        </div>

        {/* Spacer to push content down below the watermark with slight overlap */}
        <div className="h-12 sm:h-16 md:h-20 lg:h-24" />

        <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[42%_52%] lg:gap-16">
          {/* ════════ Left — Info ════════ */}
          <div>
            <RevealOnScroll>
              {/* Badge pill */}

              <h1 className="mb-4 font-syne text-[38px] font-[800] leading-[1.06] md:text-[48px]" style={{ color: C.warmStone }}>
                Get in touch
              </h1>
              <p className="mb-10 font-sans text-[15px] leading-[1.75] max-w-[380px]" style={{ color: C.warmStone }}>
                Have questions or ready to transform your business? Reach out and we'll get back to you promptly.
              </p>
            </RevealOnScroll>

            {/* ── Contact info cards using C.warmStone ── */}
            <RevealOnScroll delay={0.08}>
              <div className="space-y-3">
                <ContactCard
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>}
                  title="Email us"
                  detail="contact@crevix-studio.in"
                  href="mailto:contact@crevix-studio.in"
                />
                <ContactCard
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>}
                  title="Call us"
                  detail="+91 78178 33974"
                  href="tel:+917817833974"
                />
                <ContactCard
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>}
                  title="WhatsApp"
                  detail="Chat with us →"
                  href="https://wa.me/917817833974"
                  target="_blank"
                />
                <ContactCard
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
                  title="Our location"
                  detail="Delhi, India · Working Worldwide"
                  href="#"
                />
              </div>
            </RevealOnScroll>
          </div>

          {/* ════════ Right — Form Container using C.sage ════════ */}
          <RevealOnScroll delay={0.12}>
            <div className="rounded-[20px] p-6 sm:p-8 md:p-10"
              style={{
                background: C.sage,
                border: `1px solid rgba(13,59,46,0.15)`,
                boxShadow: '0 30px 90px rgba(13,59,46,0.2)',
              }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-6"
                      style={{ border: `1px solid ${C.deepForest}`, color: C.deepForest }}>
                      ✓
                    </div>
                    <h3 className="font-syne font-bold text-[22px] mb-3" style={{ color: C.deepForest }}>Request received.</h3>
                    <p className="font-sans text-[14px]" style={{ color: C.deepForest }}>We'll reach out soon to help with your query.</p>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-14 h-14 rounded-full border flex items-center justify-center text-red-700 text-xl mb-6"
                      style={{ borderColor: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.06)' }}>
                      ✕
                    </div>
                    <h3 className="font-syne font-bold text-[22px] mb-3" style={{ color: C.deepForest }}>Something went wrong.</h3>
                    <p className="font-sans text-[14px] mb-6" style={{ color: C.deepForest }}>Please try again or email us directly.</p>
                    <button onClick={() => setStatus('idle')}
                      className="font-sans text-[13px] underline underline-offset-4 transition-colors duration-200"
                      style={{ color: C.deepForest }}>
                      Try again →
                    </button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-7">
                    <FormInput label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} placeholder="Jane Smith" />
                    <FormInput label="Email" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="jane@company.com" />
                    <FormSelect label="Call Reason" name="type" value={form.type} onChange={handleChange} error={errors.type}
                      placeholder="Select a reason…"
                      options={['Plan Guidance', 'Order / Payment Help', 'Custom Requirement', 'Existing Website Query', 'General Help']} />
                    <FormSelect label="Preferred Time" name="preferredTime" value={form.preferredTime} onChange={handleChange}
                      placeholder="Select preferred time…"
                      options={['Morning', 'Afternoon', 'Evening', 'Anytime']} />
                    <FormInput label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} placeholder="Tell us what you need help with..." rows={4} />

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full font-sans font-semibold text-[15px] transition-all duration-250 flex items-center justify-center gap-2 mt-2"
                      style={{
                        background: C.deepForest,
                        color: C.warmStone,
                        boxShadow: '0 4px 24px rgba(13,59,46,0.15)',
                      }}
                      onMouseEnter={(e) => { e.target.style.background = '#134e3e'; }}
                      onMouseLeave={(e) => { e.target.style.background = C.deepForest; }}
                    >
                      Request an Appointment →
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
