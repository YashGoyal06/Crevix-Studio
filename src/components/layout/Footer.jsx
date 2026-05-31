import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = {
  Pages: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Our Team', to: '/team' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: ['Web Development', 'UI/UX Design', 'Branding', 'Motion Design'],
};

const snakePath =
  'M -180 40 C -120 18 -60 18 0 40 S 120 62 180 40 S 300 18 360 40 S 480 62 540 40 S 660 18 720 40 S 840 62 900 40 S 1020 18 1080 40 S 1200 62 1260 40 S 1380 18 1440 40 S 1560 62 1620 40';

const SnakeZigzag = () => (
  <div className="pointer-events-none absolute left-1/2 top-0 z-10 w-[120vw] -translate-x-1/2 overflow-hidden">
    <motion.svg
      viewBox="-180 0 1800 72"
      preserveAspectRatio="none"
      className="h-16 w-full"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.8 }}
    >
      <defs>
        <linearGradient id="footerSnakeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0EA5E9" />
          <stop offset="22%" stopColor="#14B8A6" />
          <stop offset="48%" stopColor="#FACC15" />
          <stop offset="72%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#BE185D" />
        </linearGradient>
        <filter id="footerSnakeGlow" x="-8%" y="-120%" width="116%" height="340%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.path
        d={snakePath}
        fill="none"
        stroke="url(#footerSnakeGradient)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        filter="url(#footerSnakeGlow)"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1] },
          },
        }}
      />
      <motion.path
        d={snakePath}
        fill="none"
        stroke="rgba(255,255,255,0.76)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 },
          },
        }}
      />
    </motion.svg>
  </div>
);

export default function Footer() {
  return (
    <footer className="relative bg-void pb-10 pt-16 md:pb-12 md:pt-24">
      <SnakeZigzag />
      {/* Top border — subtle */}

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-20 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="group flex flex-col items-start gap-4">
              <img 
                src="/logo.png" 
                alt="Crevix Studio" 
                className="w-16 h-16 object-contain" 
                style={{ mixBlendMode: 'screen' }}
              />
              <div className="font-syne font-[800] text-[18px] flex items-baseline gap-1.5">
                <span className="text-white">CREVIX</span>
                <span className="text-gradient">STUDIO</span>
              </div>
            </Link>
            <p className="mt-5 text-[14px] text-text-secondary leading-relaxed max-w-[220px]">
              Designing the future, one pixel at a time.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Pages</p>
            <ul className="space-y-3">
              {footerLinks.Pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}
                    className="text-[14px] text-text-secondary hover:text-white transition-colors duration-150">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Services</p>
            <ul className="space-y-3">
              {footerLinks.Services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-[14px] text-text-secondary hover:text-white transition-colors duration-150">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Contact</p>
            <ul className="space-y-3 text-[14px] text-text-secondary">
              <li><a href="mailto:hello@crevixstudio.com" className="hover:text-white transition-colors duration-150">hello@crevixstudio.com</a></li>
              <li>
                <a href="https://wa.me/919999999999" className="hover:text-white transition-colors duration-150">
                  WhatsApp →
                </a>
              </li>
              <li>Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-text-muted">© 2026 Crevix Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-text-muted sm:gap-4">
            <a href="#" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
