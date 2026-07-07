import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
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
  <div className="w-5 h-4 flex flex-col justify-between cursor-pointer">
    <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="h-[1px] w-full bg-white block origin-center" />
    <motion.span animate={{ opacity: open ? 0 : 1 }} className="h-[1px] w-full bg-white block" />
    <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="h-[1px] w-full bg-white block origin-center" />
  </div>
);

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <>
      <nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-[1200px] h-[60px] flex items-center bg-[#09090B]/70 backdrop-blur-md rounded-full border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] px-6"
      >
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-brand font-[800] text-[17px] tracking-wide group">
            <img 
              src="/logo.png" 
              alt="Crevix" 
              className="w-7 h-7 object-contain transition-transform group-hover:scale-110" 
              style={{ mixBlendMode: 'screen' }}
            />
            <div className="flex items-baseline gap-1.2 font-brand">
              <span className="text-white">CREVIX</span>
              <span className="text-gradient">STUDIO</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative py-1 text-[13px] font-sans font-medium transition-colors duration-150 ${
                  location.pathname === link.to ? 'text-white' : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
                {location.pathname === link.to && (
                  <motion.span
                    layoutId="nav-active-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <span className="max-w-[140px] truncate font-sans text-[13px] text-white/75" title={clientName}>
                {clientName}
              </span>
            )}
            <Link
              to={isAuthenticated ? '/profile' : '/login'}
              className="px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-[13px] font-sans font-medium text-white/80 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.18] transition-all duration-300"
            >
              {isAuthenticated ? 'Profile' : 'Login'}
            </Link>
            <Link
              to="/cart"
              className={`relative inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-150 ${
                location.pathname === '/cart'
                  ? 'border-white/[0.35] text-white'
                  : 'border-white/[0.06] text-white/65 hover:border-white/[0.35] hover:text-white'
              }`}
              aria-label="Cart"
            >
              <ShoppingCart size={16} />
              {isAuthenticated && items.length > 0 && (
                <motion.span
                  key={items.length}
                  initial={{ scale: 0.5, y: 2, opacity: 0.4 }}
                  animate={{ scale: 1, y: 0, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="absolute -right-1.5 -top-1.5 min-w-[18px] rounded-full bg-white px-1 py-0.5 text-center font-sans text-[10px] font-semibold leading-none text-[#080808]"
                >
                  {items.length}
                </motion.span>
              )}
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
          {isAuthenticated && (
            <p className="font-sans text-[14px] text-white/75">
              {clientName}
            </p>
          )}
          <Link
            to={isAuthenticated ? '/profile' : '/login'}
            className="font-syne font-bold text-2xl text-white"
            onClick={() => setMobileOpen(false)}
          >
            {isAuthenticated ? 'Profile' : 'Login'}
          </Link>
          <Link
            to="/cart"
            className="font-syne font-bold text-2xl text-white"
            onClick={() => setMobileOpen(false)}
          >
            Cart{!requiresAuth && items.length ? ` (${items.length})` : ''}
          </Link>
        </div>
      </motion.div>
    </>
  );
}
