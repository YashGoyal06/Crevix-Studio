import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { RevealOnScroll, Magnetic, Parallax } from '../hooks/useScrollReveal';
import Layout from '../components/layout/Layout';
import Aurora from '../components/ui/Aurora';

/* ── Palette ── */
const C = {
  deepForest: '#0D3B2E',
  sage: '#6F8A6E',
  warmStone: '#D8D2C4',
  gold: '#B88C3A',
  charcoal: '#2B2F2E',
};

/* ── Boxed input style with Deep Forest fill ── */
const FormInput = ({ label, type = 'text', name, value, onChange, error, placeholder, rows }) => {
  const Tag = rows ? 'textarea' : 'input';
  return (
    <div>
      <label className="font-sans text-[11px] uppercase tracking-[0.2em] mb-2.5 block font-semibold text-[#D8D2C4] group-hover:text-[#0D3B2E] transition-all duration-300">{label}</label>
      <Tag
        type={type} name={name} value={value} onChange={onChange}
        rows={rows} placeholder={placeholder}
        className="w-full font-sans text-[15px] rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-300 resize-none placeholder-[#6F8A6E]/60 bg-[#0D3B2E] border border-[#2b4c42]/45 text-[#D8D2C4] group-hover:bg-[#6F8A6E]/10 group-hover:border-[#0D3B2E]/25 group-hover:text-[#0D3B2E] group-hover:placeholder-[#0D3B2E]/40"
        style={{
          border: error ? '1px solid rgba(239,68,68,0.7)' : undefined,
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
    <label className="font-sans text-[11px] uppercase tracking-[0.2em] mb-2.5 block font-semibold text-[#D8D2C4] group-hover:text-[#0D3B2E] transition-all duration-300">{label}</label>
    <select
      name={name} value={value} onChange={onChange}
      className="w-full font-sans text-[15px] rounded-[12px] px-[18px] py-[14px] outline-none transition-all duration-300 appearance-none cursor-pointer bg-[#0D3B2E] border border-[#2b4c42]/45 text-[#D8D2C4] group-hover:bg-[#6F8A6E]/10 group-hover:border-[#0D3B2E]/25 group-hover:text-[#0D3B2E]"
      style={{
        border: error ? '1px solid rgba(239,68,68,0.7)' : undefined,
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
    className="flex items-center gap-4 rounded-[14px] p-4 transition-all duration-300 group cursor-pointer border border-[#2b4c42]/45 bg-[#0e3b30]/30 hover:bg-[#D8D2C4] hover-bob"
  >
    <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-[#D8D2C4] group-hover:bg-[#0D3B2E] transition-all duration-300">
      <span className="text-[16px] text-[#0D3B2E] group-hover:text-[#D8D2C4] transition-all duration-300">{icon}</span>
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-sans text-[12px] uppercase tracking-[0.12em] mb-0.5 text-[#D8D2C4] group-hover:text-[#0D3B2E] transition-all duration-300">{title}</p>
      <p className="text-[14px] truncate font-semibold font-sans font-normal-numbers text-[#D8D2C4] group-hover:text-[#0D3B2E] transition-all duration-300">{detail}</p>
    </div>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-[#D8D2C4] group-hover:text-[#0D3B2E] transition-all duration-300">
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </a>
);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', preferredTime: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const pxMouseX = useMotionValue(0);
  const pxMouseY = useMotionValue(0);

  const springConfig = { damping: 32, stiffness: 120, mass: 0.5 };
  const circleX = useSpring(pxMouseX, springConfig);
  const circleY = useSpring(pxMouseY, springConfig);

  const negCircleX = useTransform(circleX, (x) => -x);
  const negCircleY = useTransform(circleY, (y) => -y);

  const glowX = useTransform(mouseX, [0, 1], ["30%", "70%"]);
  const glowY = useTransform(mouseY, [0, 1], ["18%", "55%"]);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
      pxMouseX.set(e.clientX - window.innerWidth / 2);
      pxMouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY, pxMouseX, pxMouseY]);

  useEffect(() => {
    document.body.classList.add('bg-forest-page');
    document.documentElement.classList.add('bg-forest-page');
    return () => {
      document.body.classList.remove('bg-forest-page');
      document.documentElement.classList.remove('bg-forest-page');
    };
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.type) e.type = 'Please select a call reason.';
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
      {/* ── Page background with premium animated aurora effect ── */}
      {createPortal(
        <div className="aurora-bg">
          {/* Animated gradient blobs */}
          <div className="aurora-bg__blob aurora-bg__blob--1" />
          <div className="aurora-bg__blob aurora-bg__blob--2" />
          <div className="aurora-bg__blob aurora-bg__blob--3" />

          {/* Mouse cursor spotlight */}
          <motion.div
            className="pointer-events-none absolute h-[850px] w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              left: glowX,
              top: glowY,
              background:
                "radial-gradient(circle, rgba(198,154,69,.20), transparent 70%)",
            }}
          />

          {/* Vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at center, transparent 35%, rgba(0,0,0,.55) 100%)",
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)
              `,
              backgroundSize: "90px 90px",
            }}
          />

          {/* Grain overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
            style={{
              backgroundImage:
                "radial-gradient(rgba(255,255,255,.6) .6px, transparent .6px)",
              backgroundSize: "18px 18px",
            }}
          />
        </div>,
        document.body
      )}

      {/* ── Large Circle with WebGL Aurora backdrop - Viewport level (no borders, no clipping) ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center w-full min-h-screen">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 15,
            mass: 0.9,
            delay: 0.2
          }}
          style={{
            x: circleX,
            y: circleY,
            boxShadow: '0 0 100px rgba(184, 140, 58, 0.08), 0 0 40px rgba(13, 59, 46, 0.15)'
          }}
          className="relative h-[300px] w-[300px] sm:h-[480px] sm:w-[480px] md:h-[680px] md:w-[680px] rounded-full overflow-hidden pointer-events-none bg-[#B88C3A]"
        >
          {/* Subtle warm orange gradient blend overlay inside circle */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#B88C3A]/20 to-transparent mix-blend-color-dodge z-10 pointer-events-none" />
          <div className="w-full h-full scale-[1.15] z-0">
            <Aurora colorStops={['#B88C3A', '#F4E0A5', '#E6D5B8']} amplitude={2.2} blend={0.65} speed={0.75} />
          </div>

          {/* Masked reveal container: perfectly counter-tracks circle movement */}
          <motion.div
            style={{
              x: negCircleX,
              y: negCircleY,
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1280px] h-[2000px] pointer-events-none z-10 pt-32 md:pt-40 lg:pt-48 px-4 sm:px-6"
          >
            {/* Left-half clip wrapper to keep watermark solid reveal only on the left side */}
            <div className="absolute inset-0 w-[40%] overflow-hidden">
              {/* Duplicate watermark heading (Solid Warm Stone / Beige color) */}
              <div className="absolute top-10 left-0 w-[1280px] flex justify-center pointer-events-none select-none overflow-hidden md:top-14 lg:top-16 z-0">
                <span className="font-syne font-[900] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] uppercase leading-none"
                  style={{
                    color: C.warmStone,
                    letterSpacing: '0.04em',
                  }}>
                  CONTACT
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <section className="relative z-10 mx-auto max-w-[1280px] px-4 pt-32 pb-20 sm:px-6 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36">

        {/* ── Large luxury geometric watermark heading (Normal Green Outline & Faint Stone) ── */}
        <div className="absolute top-10 left-0 right-0 flex justify-center pointer-events-none select-none overflow-hidden md:top-14 lg:top-16 z-10">
          <div className="w-full flex justify-center">
            <span className="font-syne font-[900] text-[100px] sm:text-[140px] md:text-[180px] lg:text-[220px] uppercase leading-none"
              style={{
                color: 'rgba(216,210,196,0.12)',
                WebkitTextStroke: `1.5px rgba(13,59,46,0.15)`,
                letterSpacing: '0.04em',
              }}>
              CONTACT
            </span>
          </div>
        </div>

        {/* Spacer to push content down below the watermark with slight overlap */}
        <div className="h-12 sm:h-16 md:h-20 lg:h-24" />

        <div className="relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[42%_52%] lg:gap-16">
          {/* ════════ Left — Info ════════ */}
          <div className="relative z-30">
            <RevealOnScroll direction="left">
              <h1 className="mb-4 font-syne text-[38px] font-[800] leading-[1.06] md:text-[48px]" style={{ color: C.warmStone }}>
                Get in touch
              </h1>
              <p className="mb-10 font-sans text-[15px] leading-[1.75] max-w-[380px]" style={{ color: C.warmStone }}>
                Have questions or ready to transform your business? Reach out and we'll get back to you promptly.
              </p>
            </RevealOnScroll>

            {/* ── Contact info cards ── */}
            <RevealOnScroll delay={0.08} direction="left">
              <div className="space-y-3">
                <Magnetic>
                  <ContactCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" /></svg>}
                    title="Email us"
                    detail="contact@crevix-studio.in"
                    href="mailto:contact@crevix-studio.in"
                  />
                </Magnetic>
                <Magnetic>
                  <ContactCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>}
                    title="Call us"
                    detail="+91 78178 33974"
                    href="tel:+917817833974"
                  />
                </Magnetic>
                <Magnetic>
                  <ContactCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>}
                    title="WhatsApp"
                    detail="Chat with us →"
                    href="https://wa.me/917817833974"
                    target="_blank"
                  />
                </Magnetic>
                <Magnetic>
                  <ContactCard
                    icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>}
                    title="Our location"
                    detail="Delhi, India · Working Worldwide"
                    href="#"
                  />
                </Magnetic>
              </div>
            </RevealOnScroll>
          </div>

          {/* ── Right — Form Container ── */}
          <div className="relative z-30">
            <RevealOnScroll delay={0.12} direction="right">
              <div className="rounded-[20px] p-6 sm:p-8 md:p-10 transition-all duration-500 bg-[#6F8A6E] hover:bg-[#D8D2C4] border border-[#0d3b2e]/15 group hover:border-[#D8D2C4] hover:shadow-[0_20px_50px_rgba(184,140,58,0.15)]"
                style={{
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

                      <Magnetic>
                        <motion.button
                          type="submit"
                          whileHover={{ y: -4, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 rounded-full font-sans font-semibold text-[15px] transition-all duration-250 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                          style={{
                            background: C.deepForest,
                            color: C.warmStone,
                            boxShadow: '0 4px 24px rgba(13,59,46,0.15)',
                          }}
                          onMouseEnter={(e) => { e.target.style.background = '#134e3e'; }}
                          onMouseLeave={(e) => { e.target.style.background = C.deepForest; }}
                        >
                          Request an Appointment →
                        </motion.button>
                      </Magnetic>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </Layout>
  );
}
