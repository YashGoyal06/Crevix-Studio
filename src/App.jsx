import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import IntroLoader from './pages/IntroLoader';
import { CartProvider } from './context/CartContext';

const Home      = lazy(() => import('./pages/Home'));
const Services  = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Team      = lazy(() => import('./pages/Team'));
const Pricing   = lazy(() => import('./pages/Pricing'));
const Cart      = lazy(() => import('./pages/Cart'));
const Checkout  = lazy(() => import('./pages/Checkout'));
const Contact   = lazy(() => import('./pages/Contact'));

const PageFade = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
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
        <Route path="/checkout"  element={<PageFade><Checkout /></PageFade>} />
        <Route path="/contact"   element={<PageFade><Contact /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <CartProvider>
      <BrowserRouter>
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
  );
}
