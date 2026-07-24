import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/cartStore';
import { useAuth } from '../../context/authStore';

const navLinks = [
  { label: 'Home',      to: '/' },
  { label: 'Services',  to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Our Team',  to: '/team' },
  { label: 'Pricing',   to: '/pricing' },
  { label: 'Contact',   to: '/contact' },
];

const HamburgerIcon = ({ open }) => (
  <div className="w-6 h-5 flex flex-col justify-between cursor-pointer py-0.5">
    <motion.span
      animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-[2px] w-full bg-[#0D3B2E] rounded-full block origin-center"
    />
    <motion.span
      animate={{ opacity: open ? 0 : 1, x: open ? 10 : 0 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="h-[2px] w-full bg-[#0D3B2E] rounded-full block"
    />
    <motion.span
      animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="h-[2px] w-full bg-[#0D3B2E] rounded-full block origin-center"
    />
  </div>
);

// Framer motion variants for mobile overlay links
const overlayVariants = {
  closed: {
    opacity: 0,
    y: '-100%',
    transition: {
      duration: 0.35,
      ease: [0.76, 0, 0.24, 1],
      when: 'afterChildren',
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.76, 0, 0.24, 1],
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const linkVariants = {
  closed: { opacity: 0, y: 30, rotate: 2 },
  open: {
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hideForFooter, setHideForFooter] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const location = useLocation();
  const { items, requiresAuth } = useCart();
  const { isAuthenticated, user } = useAuth();
  const clientName = user?.user_metadata?.full_name
    || user?.user_metadata?.name
    || user?.email?.split('@')[0]
    || 'Client';

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - scrollY;
      setScrolled(scrollY > 20);
      setHideForFooter(scrollBottom < 450);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] w-full h-[70px] px-6 sm:px-12 md:px-16 transition-all duration-300 flex items-center justify-between ${
          scrolled
            ? 'bg-[#030A08]/85 backdrop-blur-xl border-b border-[#C69A45]/30 shadow-[0_15px_35px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-transparent'
        }`}
        style={{
          transform: hideForFooter ? 'translateY(-100%)' : 'translateY(0)',
          opacity: hideForFooter ? 0 : 1,
          pointerEvents: hideForFooter ? 'none' : 'auto',
          willChange: 'transform, background-color, border-color',
        }}
      >
        {/* LEFT: BRAND LOGO */}
        <Link to="/" className="flex items-center gap-2.5 font-brand font-bold text-[18px] sm:text-[20px] tracking-wide text-white group shrink-0 z-10">
          <img 
            src="/logo.png" 
            alt="Crevix" 
            className="w-7 h-7 object-contain transition-transform group-hover:scale-110 mix-blend-screen brightness-125" 
          />
          <div className="flex items-baseline gap-1.5">
            <span className="text-white font-sans font-bold tracking-tight">CREVIX</span>
            <span className="text-[#C69A45] font-sans font-bold tracking-tight">STUDIO<span className="text-[13px] relative -top-1">®</span></span>
          </div>
        </Link>

        {/* CENTER: NAV LINKS WITH FROSTED HOVER PILL ANIMATION */}
        <nav
          className="hidden md:flex items-center justify-center gap-1.5 absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const isHovered = hoveredNav === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onMouseEnter={() => setHoveredNav(link.to)}
                className={`relative px-4 py-1.5 text-[14.5px] font-sans font-semibold tracking-wide transition-colors duration-200 z-10 ${
                  isActive ? 'text-white font-bold' : isHovered ? 'text-white' : 'text-white/70'
                }`}
              >
                {/* Floating Frosted Glass Pill on Hover */}
                {isHovered && (
                  <motion.span
                    layoutId="hover-pill"
                    className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/15 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}

                {/* Active Page Luxury Gold Capsule Highlight */}
                {isActive && (
                  <motion.span
                    layoutId="luxury-active-badge"
                    className="absolute inset-0 bg-[#C69A45]/15 border border-[#C69A45]/40 rounded-full -z-10 shadow-[0_0_20px_rgba(198,154,69,0.3)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}

                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* RIGHT: ACTION CIRCLE ICONS */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated && (
            <span className="max-w-[120px] truncate font-sans text-[13.5px] text-white/80 font-medium" title={clientName}>
              {clientName}
            </span>
          )}

          {/* Login / Profile Circle Icon Button */}
          <Link
            to={isAuthenticated ? '/profile' : '/login'}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#030A08] hover:bg-[#00FF9D] hover:scale-105 transition-all duration-200 shadow-md"
            aria-label={isAuthenticated ? 'Profile' : 'Login'}
            title={isAuthenticated ? 'Profile' : 'Login'}
          >
            <User size={18} />
          </Link>

          {/* Cart Icon Circle Button */}
          <Link
            to="/cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white hover:scale-105 transition-all duration-200"
            aria-label="Cart"
            title="Cart"
          >
            <ShoppingCart size={17} />
            {isAuthenticated && items.length > 0 && (
              <motion.span
                key={items.length}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                className="absolute -right-1 -top-1 min-w-[19px] h-[19px] rounded-full bg-[#C69A45] text-white flex items-center justify-center font-mono text-[10px] font-bold border-2 border-[#030A08]"
              >
                {items.length}
              </motion.span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden p-2.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </header>

      {/* LUXURY ANIMATED MOBILE NAVIGATION OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[99] md:hidden flex flex-col justify-between pt-24 pb-8 px-6 overflow-hidden select-none bg-[#050C0A] text-white"
          >
            {/* Ambient Mesh Background Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#0D3B2E] opacity-60 blur-[80px]" />
              <div className="absolute bottom-[10%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#C69A45] opacity-30 blur-[90px]" />
              <div
                className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
            </div>

            {/* Mobile Navigation Links */}
            <div className="relative z-10 flex flex-col gap-4 my-auto">
              <p className="font-mono text-[11px] uppercase tracking-widest text-[#00FF9D] font-semibold mb-1">
                Navigation
              </p>

              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.to;
                return (
                  <motion.div key={link.to} variants={linkVariants}>
                    <Link
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="group flex items-baseline justify-between py-1 border-b border-white/10"
                    >
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[13px] text-white/40 font-medium">
                          0{idx + 1}
                        </span>
                        <span
                          className={`font-syne font-bold text-[32px] sm:text-[36px] tracking-tight transition-colors duration-200 ${
                            isActive ? 'text-[#C69A45]' : 'text-white group-hover:text-[#00FF9D]'
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>
                      <span className="text-[18px] text-white/40 group-hover:text-[#00FF9D] group-hover:translate-x-1 transition-all">
                        →
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile Utility & Action Buttons */}
            <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <Link
                  to={isAuthenticated ? '/profile' : '/login'}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[14px] font-sans font-bold text-[#030A08] bg-[#00FF9D] hover:bg-[#10B981] transition-all shadow-md"
                >
                  {isAuthenticated ? `Profile (${clientName})` : 'Client Login ✦'}
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-[14px] font-sans font-semibold text-white bg-white/10 border border-white/15"
                >
                  <ShoppingCart size={15} />
                  <span>Cart{!requiresAuth && items.length ? ` (${items.length})` : ''}</span>
                </Link>
              </div>

              {/* Socials & Email */}
              <div className="flex items-center justify-between font-mono text-[12px] text-white/60 pt-2">
                <a href="https://wa.me/917817833974" target="_blank" rel="noreferrer" className="hover:text-white">
                  WhatsApp
                </a>
                <a href="mailto:hello@crevixstudio.com" className="hover:text-white">
                  hello@crevixstudio.com
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
