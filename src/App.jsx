import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';

import IntroLoader from './pages/IntroLoader';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GoogleAnalytics from './components/ui/GoogleAnalytics';

import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Pricing from './pages/Pricing';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AgreementCreatePage from './modules/agreements/AgreementCreatePage';
import AgreementPage from './modules/agreements/AgreementPage';

import PageTransition from './components/ui/PageTransition';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="sync">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><Pricing /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><ProtectedRoute><Checkout /></ProtectedRoute></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><ProtectedRoute><Profile /></ProtectedRoute></PageTransition>} />
        <Route path="/crevix-admin" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="/agreement/new" element={<ProtectedRoute><AgreementCreatePage /></ProtectedRoute>} />
        <Route path="/agreement/:token" element={<AgreementPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  useLenisSmoothScroll();

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GoogleAnalytics />

          <AnimatePresence>
            {showIntro && (
              <IntroLoader onComplete={() => setShowIntro(false)} />
            )}
          </AnimatePresence>

          {!showIntro && (
            <AnimatedRoutes />
          )}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
