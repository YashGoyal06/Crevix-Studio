import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// REAL HTML5 CANVAS FLUID WAVE ANIMATION (Make-b.studio style)
function FluidWaveCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Render fluid animated silk waves
    const render = () => {
      step += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // Wave 1: Massive Glowing Emerald Liquid Wave
      const grad1 = ctx.createLinearGradient(0, h * 0.2, w, h);
      grad1.addColorStop(0, 'rgba(0, 255, 157, 0.85)');
      grad1.addColorStop(0.5, 'rgba(13, 59, 46, 0.9)');
      grad1.addColorStop(1, 'rgba(3, 10, 8, 0.95)');

      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.45);
      for (let x = 0; x <= w; x += 15) {
        const y = Math.sin(x * 0.003 + step) * 70 + Math.cos(x * 0.002 - step * 1.2) * 50 + h * 0.55;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Wave 2: Silk Gold & Emerald Secondary Wave
      const grad2 = ctx.createLinearGradient(w * 0.3, 0, w, h);
      grad2.addColorStop(0, 'rgba(198, 154, 69, 0.7)');
      grad2.addColorStop(0.6, 'rgba(16, 185, 129, 0.85)');
      grad2.addColorStop(1, 'rgba(3, 10, 8, 0.9)');

      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.6);
      for (let x = 0; x <= w; x += 15) {
        const y = Math.cos(x * 0.004 - step * 1.5) * 80 + Math.sin(x * 0.0015 + step) * 60 + h * 0.62;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      // Wave 3: Deep Liquid Fluid Highlight
      const grad3 = ctx.createLinearGradient(0, h * 0.5, w * 0.8, h);
      grad3.addColorStop(0, 'rgba(0, 255, 157, 0.6)');
      grad3.addColorStop(1, 'rgba(13, 59, 46, 0.95)');

      ctx.fillStyle = grad3;
      ctx.beginPath();
      ctx.moveTo(0, h * 0.7);
      for (let x = 0; x <= w; x += 20) {
        const y = Math.sin(x * 0.005 + step * 2) * 45 + Math.cos(x * 0.003 + step) * 35 + h * 0.72;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none filter blur-[35px] opacity-90 mix-blend-screen"
    />
  );
}

export default function Footer() {
  const [timeStr, setTimeStr] = useState('');

  // Live IST Time Clock (Delhi IST)
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
    <footer className="relative min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full bg-[#030A08] text-white flex flex-col justify-between pt-6 pb-5 px-4 sm:px-8 md:px-10 overflow-hidden select-none">
      
      {/* REAL HTML5 CANVAS FLUID ANIMATED BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <FluidWaveCanvas />

        {/* Fine Noise Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* 1. TOP UTILITY BAR: Social Links & Primary Email */}
      <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-4">
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 font-sans text-[13px] sm:text-[14px] font-semibold tracking-wide text-white/80">
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
          className="font-mono text-[13px] sm:text-[14px] text-white/90 hover:text-white transition-colors duration-150"
        >
          hello@crevixstudio.com
        </a>
      </div>

      {/* 2. MIDDLE SECTION: 2-Column Layout (Exact Make-b.studio Structure) */}
      <div className="relative z-20 my-auto py-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
        {/* LEFT COLUMN: Vertical Navigation Links */}
        <div>
          <ul className="space-y-1 text-left font-sans text-[18px] sm:text-[22px] font-bold tracking-tight">
            <li>
              <Link to="/" className="text-white hover:text-[#00FF9D] transition-colors duration-150">
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

        {/* RIGHT COLUMN: Studio Statement & Minimal Brand Title */}
        <div className="md:text-right flex flex-col items-start md:items-end">
          <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
            <span className="font-sans font-bold text-[20px] sm:text-[22px] tracking-wide text-white uppercase">
              CREVIX STUDIO<span className="text-[#C69A45]">®</span>
            </span>
          </Link>

          <p className="font-sans text-[13.5px] sm:text-[14.5px] text-white/70 leading-relaxed max-w-[320px] font-normal">
            Studio based in Delhi, India. Engineering digital perfection & brand obsessions.
          </p>
        </div>
      </div>

      {/* 3. MASSIVE FULL-WIDTH EDGE-TO-EDGE "Get in Touch" STATEMENT TITLE */}
      <div className="relative z-20 my-auto text-left w-full">
        <a
          href="mailto:hello@crevixstudio.com"
          className="group block font-sans font-extrabold text-white leading-[0.85] tracking-tighter transition-opacity hover:opacity-90 whitespace-nowrap w-full"
          style={{
            fontSize: 'clamp(52px, 14.8vw, 220px)',
          }}
        >
          Get in Touch
        </a>
      </div>

      {/* 4. BOTTOM UTILITY BAR: Copyright & Live IST Clock */}
      <div className="relative z-20 pt-4 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans text-[12px] sm:text-[13px] text-white/75">
        <p>Crevix Studio © 2026</p>
        <p className="font-mono tracking-wide">
          Delhi <span className="text-white font-bold">{timeStr || '10:32:16 AM'}</span>
        </p>
      </div>

    </footer>
  );
}
