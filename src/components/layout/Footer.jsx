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
    <footer className="relative bg-[#D8D2C4] pt-12 pb-6 md:pt-16 md:pb-8 overflow-hidden select-none">
      {/* Top Subtle Arc Curve Transition */}
      <div className="absolute left-0 right-0 -top-[20px] sm:-top-[28px] md:-top-[32px] w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-[20px] sm:h-[28px] md:h-[32px]"
          viewBox="0 0 1440 32"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,32 Q720,-8 1440,32 L1440,32 L0,32 Z"
            fill="#D8D2C4"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 relative z-10">
        {/* Main Content Grid: Navigation, Say Hi CTA, Info & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 items-start mb-12 md:mb-16">

          {/* LEFT: Navigation */}
          <div>
            <p className="font-syne text-[18px] font-bold text-[#0D3B2E] mb-4 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-sans text-[16px] font-medium text-[#0D3B2E]/80 hover:text-[#0D3B2E] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: Say Hi CTA */}
          <div className="flex flex-col items-center text-center">
            <p className="font-syne text-[22px] font-bold text-[#0D3B2E] mb-2">
              Say Hi!
            </p>
            <p className="font-sans text-[15px] text-[#0D3B2E]/80 mb-6 font-medium max-w-[280px]">
              Interested in working with us on your next project?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#0D3B2E] px-8 py-3.5 font-sans text-[15px] font-bold text-[#D8D2C4] shadow-md transition-all duration-200 hover:bg-[#071D18] hover:scale-105 active:scale-95"
            >
              Let's Chat! ✦
            </Link>
          </div>

          {/* RIGHT: Contact Info & Copyright */}
          <div className="flex flex-col md:items-end text-left md:text-right">
            <p className="font-syne text-[18px] font-bold text-[#0D3B2E] mb-4 uppercase tracking-wider">
              Get In Touch
            </p>
            <p className="font-sans text-[15px] text-[#0D3B2E]/80 font-medium mb-1">
              hello@crevixstudio.com
            </p>
            <p className="font-sans text-[15px] text-[#0D3B2E]/80 font-medium mb-6">
              +91 78178 33974 (WhatsApp)
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href="https://wa.me/917817833974"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] transition-transform hover:scale-110"
                title="WhatsApp"
              >
                💬
              </a>
              <a
                href="mailto:hello@crevixstudio.com"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] transition-transform hover:scale-110"
                title="Email"
              >
                ✉️
              </a>
            </div>

            <p className="font-sans text-[13px] text-[#0D3B2E]/60 font-semibold">
              © 2026 Crevix Studio. All rights reserved.
            </p>
          </div>
        </div>

        {/* MASSIVE BOTTOM BRAND TYPOGRAPHY (Breaver Style) */}
        <div className="border-t border-[#0D3B2E]/15 pt-6 text-center overflow-hidden">
          <h2
            className="font-syne font-extrabold uppercase tracking-tighter leading-none text-[#0D3B2E] whitespace-nowrap"
            style={{
              fontSize: 'clamp(42px, 12.5vw, 190px)',
              letterSpacing: '-0.03em',
            }}
          >
            CREVIX <span className="text-[#B88C3A]">STUDIO</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
