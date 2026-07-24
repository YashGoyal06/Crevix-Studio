import { Link } from 'react-router-dom';

const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Our Team', to: '/team' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#D8D2C4] pt-20 pb-4 md:pt-28 md:pb-6 overflow-hidden select-none">
      {/* BOLD GRAPHIC FLAME & PEAKING MASCOT TOP TRANSITION (Exact Breaver Style) */}
      <div className="absolute left-0 right-0 -top-[70px] sm:-top-[90px] md:-top-[115px] w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-[70px] sm:h-[90px] md:h-[115px]"
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Flame Graphic Silhouette */}
          <path
            d="M0,140 L0,50 C40,20 70,60 100,20 C130,70 170,10 210,50 C250,90 280,30 320,60 C360,90 400,20 450,55 C500,90 530,10 580,45 C620,80 660,25 700,50 C720,20 740,20 760,50 C800,25 840,80 880,45 C930,10 960,90 1010,55 C1060,20 1100,90 1140,60 C1180,30 1210,90 1250,50 C1290,10 1330,70 1360,20 C1390,60 1420,20 1440,50 L1440,140 Z"
            fill="#D8D2C4"
          />
        </svg>

        {/* Center Peaking Mascot Graphic */}
        <div className="absolute top-[2px] sm:top-[6px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-[#0D3B2E] rounded-t-full flex items-center justify-center border-2 border-[#D8D2C4] shadow-lg">
            {/* Mascot Eyes */}
            <div className="flex gap-2.5 items-center mt-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#B88C3A] animate-pulse" />
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#B88C3A] animate-pulse" />
            </div>
            {/* Exclamation Sparkle */}
            <div className="absolute -top-3 right-1 text-[#B88C3A] font-bold text-xs sm:text-sm animate-bounce">
              !
            </div>
          </div>
        </div>
      </div>

      {/* Tactile Noise Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 relative z-10">
        {/* Main Content Grid: Navigation, Say Hi CTA, Info & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start mb-6 md:mb-8">

          {/* LEFT: Navigation */}
          <div>
            <p className="font-syne text-[16px] font-bold text-[#0D3B2E] mb-3 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-1.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-sans text-[14px] font-semibold text-[#0D3B2E]/80 hover:text-[#0D3B2E] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: Say Hi CTA */}
          <div className="flex flex-col items-center text-center">
            <p className="font-syne text-[20px] font-bold text-[#0D3B2E] mb-1">
              Say Hi!
            </p>
            <p className="font-sans text-[14px] text-[#0D3B2E]/80 mb-4 font-semibold max-w-[260px]">
              Interested in working with us on your next project?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#0D3B2E] px-7 py-3 font-sans text-[14px] font-bold text-[#D8D2C4] shadow-md transition-all duration-200 hover:bg-[#071D18] hover:scale-105 active:scale-95"
            >
              Let's Chat! ✦
            </Link>
          </div>

          {/* RIGHT: Socials, Contact Info & Copyright */}
          <div className="flex flex-col md:items-end text-left md:text-right">
            <div className="flex items-center gap-2.5 mb-3">
              <a
                href="https://wa.me/917817833974"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] text-[14px] transition-transform hover:scale-110"
                title="WhatsApp"
              >
                💬
              </a>
              <a
                href="mailto:hello@crevixstudio.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] text-[14px] transition-transform hover:scale-110"
                title="Email"
              >
                ✉️
              </a>
            </div>

            <p className="font-sans text-[14px] text-[#0D3B2E] font-bold mb-1">
              hello@crevixstudio.com
            </p>
            <p className="font-sans text-[14px] text-[#0D3B2E] font-bold mb-4">
              +91 78178 33974 (WhatsApp)
            </p>

            <p className="font-sans text-[12px] text-[#0D3B2E]/70 font-bold">
              © 2026 Crevix Studio. All rights reserved.
            </p>
          </div>
        </div>

        {/* MASSIVE EDGE-TO-EDGE BRAND TYPOGRAPHY */}
        <div className="border-t border-[#0D3B2E]/15 pt-3 text-center overflow-hidden">
          <h2
            className="font-syne font-extrabold uppercase tracking-tight leading-none text-[#0D3B2E] block w-full text-center"
            style={{
              fontSize: 'clamp(28px, 8.6vw, 120px)',
            }}
          >
            CREVIX <span className="text-[#B88C3A]">STUDIO</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
