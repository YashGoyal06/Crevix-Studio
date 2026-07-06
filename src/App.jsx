import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import IntroLoader from './pages/IntroLoader';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import GoogleAnalytics from './components/ui/GoogleAnalytics';

const Home      = lazy(() => import('./pages/Home'));
const Services  = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Team      = lazy(() => import('./pages/Team'));
const Pricing   = lazy(() => import('./pages/Pricing'));
const Cart      = lazy(() => import('./pages/Cart'));
const Checkout  = lazy(() => import('./pages/Checkout'));
const Contact   = lazy(() => import('./pages/Contact'));
const Login     = lazy(() => import('./pages/Login'));
const Profile   = lazy(() => import('./pages/Profile'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AgreementCreatePage = lazy(() => import('./modules/agreements/AgreementCreatePage'));
const AgreementPage = lazy(() => import('./modules/agreements/AgreementPage'));

const PageFade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
    transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<PageFade><Home /></PageFade>} />
        <Route path="/services"  element={<PageFade><Services /></PageFade>} />
        <Route path="/portfolio" element={<PageFade><Portfolio /></PageFade>} />
        <Route path="/team"      element={<PageFade><Team /></PageFade>} />
        <Route path="/pricing"   element={<PageFade><Pricing /></PageFade>} />
        <Route path="/cart"      element={<PageFade><Cart /></PageFade>} />
        <Route path="/checkout"  element={<PageFade><ProtectedRoute><Checkout /></ProtectedRoute></PageFade>} />
        <Route path="/contact"   element={<PageFade><Contact /></PageFade>} />
        <Route path="/login"     element={<PageFade><Login /></PageFade>} />
        <Route path="/profile"   element={<PageFade><ProtectedRoute><Profile /></ProtectedRoute></PageFade>} />
        <Route path="/crevix-admin" element={<PageFade><AdminDashboard /></PageFade>} />
        <Route path="/agreement/new" element={<AgreementCreatePage />} />
        <Route path="/agreement/:token" element={<AgreementPage />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
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

            {!showIntro && <AnimatedRoutes />}
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
