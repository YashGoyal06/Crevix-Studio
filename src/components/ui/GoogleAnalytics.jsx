import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function GoogleAnalytics() {
  const location = useLocation();
  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;

    // Load Script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    // Initialize GA
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    return () => {
      document.head.removeChild(script);
    };
  }, [GA_MEASUREMENT_ID]);

  // Track Page Views
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: location.pathname + location.search,
    });
  }, [location, GA_MEASUREMENT_ID]);

  return null;
}
