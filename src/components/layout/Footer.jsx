import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Aurora from '../ui/Aurora';

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  // Live IST Time Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="relative min-h-[90vh] bg-[#071B15] text-[#D8D2C4] flex flex-col justify-between pt-8 pb-6 px-6 sm:px-10 md:px-16 overflow-hidden select-none">
      
      {/* ANIMATED FLUID AURORA BACKGROUND (Crevix Studio Colors) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-80">
        <Aurora
          colorStops={['#0D3B2E', '#C69A45', '#10B981']}
          blend={0.7}
          amplitude={1.2}
          speed={0.7}
        />
      </div>

      {/* Dark Ambient Radial Mask */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 100%, transparent 20%, #071B15 90%)',
        }}
      />

      {/* 1. TOP UTILITY BAR: Social Links & Primary Email */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex flex-wrap items-center gap-5 sm:gap-8 font-sans text-[13px] sm:text-[14px] uppercase tracking-wider text-white/70">
          <a
            href="https://wa.me/917817833974"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-150"
          >
            WhatsApp
          </a>
          <a
            href="mailto:hello@crevixstudio.com"
            className="hover:text-white transition-colors duration-150"
          >
            Email
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-150"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors duration-150"
          >
            LinkedIn
          </a>
        </div>

        <a
          href="mailto:hello@crevixstudio.com"
          className="font-mono text-[13px] sm:text-[14px] text-white/80 hover:text-white transition-colors duration-150"
        >
          hello@crevixstudio.com
        </a>
      </div>

      {/* 2. MIDDLE SECTION: Brand Mark, Vertical Nav Links, Studio Statement */}
      <div className="relative z-10 my-10 md:my-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        {/* Brand */}
        <div>
          <Link to="/" className="inline-flex items-center gap-2 group">
            <img
              src="/logo.png"
              alt="Crevix Studio"
              className="w-10 h-10 object-contain brightness-125"
            />
            <span className="font-brand font-[900] text-[20px] tracking-wide text-white">
              Crevix<span className="text-[#C69A45]">®</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-start md:items-center">
          <ul className="space-y-1.5 text-left font-syne text-[20px] sm:text-[24px] font-bold">
            <li>
              <Link to="/" className="text-white hover:text-[#C69A45] transition-colors duration-150">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-white/60 hover:text-white transition-colors duration-150">
                Services
              </Link>
            </li>
            <li>
              <Link to="/portfolio" className="text-white/60 hover:text-white transition-colors duration-150">
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/team" className="text-white/60 hover:text-white transition-colors duration-150">
                Our Team
              </Link>
            </li>
            <li>
              <Link to="/pricing" className="text-white/60 hover:text-white transition-colors duration-150">
                Pricing
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white/60 hover:text-white transition-colors duration-150">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Statement Tagline */}
        <div className="md:text-right">
          <p className="font-sans text-[14px] sm:text-[15px] text-white/70 leading-relaxed max-w-[320px] md:ml-auto">
            Studio based in Delhi, India. We engineer digital perfection and build brand obsessions.
          </p>
        </div>
      </div>

      {/* 3. MASSIVE HIGH-IMPACT STATEMENT TITLE */}
      <div className="relative z-10 my-4 text-left">
        <a
          href="mailto:hello@crevixstudio.com"
          className="group block font-sans font-extrabold text-white leading-none tracking-tight transition-opacity hover:opacity-90"
          style={{
            fontSize: 'clamp(52px, 13vw, 180px)',
          }}
        >
          Get in Touch
        </a>
      </div>

      {/* 4. BOTTOM UTILITY BAR: Copyright & Live Clock */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-[12px] sm:text-[13px] text-white/60">
        <p>Crevix Studio © 2026</p>
        <p className="font-mono tracking-wide">
          Delhi <span className="text-white font-semibold">{timeStr || '10:32:16 AM'}</span>
        </p>
      </div>

    </footer>
  );
}
