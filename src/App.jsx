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

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/team" element={<Team />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/crevix-admin" element={<AdminDashboard />} />
      <Route path="/agreement/new" element={<ProtectedRoute><AgreementCreatePage /></ProtectedRoute>} />
      <Route path="/agreement/:token" element={<AgreementPage />} />
    </Routes>
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
            <AppRoutes />
          )}
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
