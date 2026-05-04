import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Pricing',   to: '/pricing' },
  { label: 'Contact',   to: '/contact' },
];

const HamburgerIcon = ({ open }) => (
  <div className="w-5 h-4 flex flex-col justify-between cursor-pointer">
    <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="h-[1px] w-full bg-white block origin-center" />
    <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-[1px] w-full bg-white block" />
    <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="h-[1px] w-full bg-white block origin-center" />
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center"
        style={{
          background: 'rgba(8,8,8,0.85)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-baseline gap-1.5 font-syne font-[800] text-[18px] tracking-wide">
            <span className="text-white">CREVIX</span>
            <span className="text-gradient">STUDIO</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-[14px] font-sans font-medium transition-colors duration-150 ${
                  location.pathname === link.to ? 'text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA — plain text */}
          <div className="hidden md:block">
            <Link
              to="/contact"
              className="text-[15px] font-sans text-white/70 hover:text-white transition-opacity duration-150"
            >
              Start a Project →
            </Link>
          </div>

          {/* Hamburger */}
          <button className="md:hidden" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <motion.div
        className="fixed inset-0 z-[99] md:hidden flex flex-col pt-[72px]"
        style={{
          background: 'rgba(8,8,8,0.95)',
          backdropFilter: 'blur(16px)',
        }}
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: mobileOpen ? 1 : 0,
          y: mobileOpen ? 0 : -10,
          pointerEvents: mobileOpen ? 'auto' : 'none',
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="px-6 py-10 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="font-syne font-bold text-2xl text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/contact" onClick={() => setMobileOpen(false)}>
            <span className="mt-4 text-[15px] font-sans text-white/70">Start a Project →</span>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
