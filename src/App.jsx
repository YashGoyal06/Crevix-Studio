import { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';

import IntroLoader from './pages/IntroLoader';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GoogleAnalytics from './components/ui/GoogleAnalytics';

const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Team = lazy(() => import('./pages/Team'));
const Pricing = lazy(() => import('./pages/Pricing'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Profile = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AgreementCreatePage = lazy(() => import('./modules/agreements/AgreementCreatePage'));
const AgreementPage = lazy(() => import('./modules/agreements/AgreementPage'));

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
    <AnimatePresence mode="wait">
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
        <Route path="/agreement/new" element={<AgreementCreatePage />} />
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
          <Suspense fallback={
            <div className="fixed inset-0 bg-void flex items-center justify-center">
              <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
            </div>
          }>
            <AnimatePresence>
              {showIntro && (
                <IntroLoader onComplete={() => setShowIntro(false)} />
              )}
            </AnimatePresence>

            {!showIntro && (
              <AnimatedRoutes />
            )}
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
