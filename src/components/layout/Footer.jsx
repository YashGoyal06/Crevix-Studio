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
    <footer className="relative bg-[#D8D2C4] pt-8 pb-4 md:pt-10 md:pb-6 overflow-hidden select-none">
      {/* Top Subtle Arc Curve Transition */}
      <div className="absolute left-0 right-0 -top-[16px] sm:-top-[20px] md:-top-[24px] w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-[16px] sm:h-[20px] md:h-[24px]"
          viewBox="0 0 1440 24"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,24 Q720,-4 1440,24 L1440,24 L0,24 Z"
            fill="#D8D2C4"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 relative z-10">
        {/* Main Content Grid: Navigation, Say Hi CTA, Info & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start mb-6 md:mb-8">

          {/* LEFT: Navigation */}
          <div>
            <p className="font-syne text-[15px] font-bold text-[#0D3B2E] mb-2.5 uppercase tracking-wider">
              Navigation
            </p>
            <ul className="space-y-1">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="font-sans text-[14px] font-medium text-[#0D3B2E]/80 hover:text-[#0D3B2E] transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER: Say Hi CTA */}
          <div className="flex flex-col items-center text-center">
            <p className="font-syne text-[18px] font-bold text-[#0D3B2E] mb-1">
              Say Hi!
            </p>
            <p className="font-sans text-[13.5px] text-[#0D3B2E]/80 mb-3.5 font-medium max-w-[260px]">
              Interested in working with us on your next project?
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#0D3B2E] px-6 py-2.5 font-sans text-[13.5px] font-bold text-[#D8D2C4] shadow-sm transition-all duration-200 hover:bg-[#071D18] hover:scale-105 active:scale-95"
            >
              Let's Chat! ✦
            </Link>
          </div>

          {/* RIGHT: Contact Info & Copyright */}
          <div className="flex flex-col md:items-end text-left md:text-right">
            <p className="font-syne text-[15px] font-bold text-[#0D3B2E] mb-2.5 uppercase tracking-wider">
              Get In Touch
            </p>
            <p className="font-sans text-[14px] text-[#0D3B2E]/80 font-medium mb-0.5">
              hello@crevixstudio.com
            </p>
            <p className="font-sans text-[14px] text-[#0D3B2E]/80 font-medium mb-3">
              +91 78178 33974 (WhatsApp)
            </p>

            {/* Social Icons & Copyright */}
            <div className="flex items-center gap-2.5 mb-2">
              <a
                href="https://wa.me/917817833974"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] text-[13px] transition-transform hover:scale-110"
                title="WhatsApp"
              >
                💬
              </a>
              <a
                href="mailto:hello@crevixstudio.com"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0D3B2E] text-[#D8D2C4] text-[13px] transition-transform hover:scale-110"
                title="Email"
              >
                ✉️
              </a>
            </div>

            <p className="font-sans text-[12px] text-[#0D3B2E]/60 font-semibold">
              © 2026 Crevix Studio. All rights reserved.
            </p>
          </div>
        </div>

        {/* COMPACT FULL-WIDTH BRAND TYPOGRAPHY */}
        <div className="border-t border-[#0D3B2E]/15 pt-3 text-center overflow-hidden">
          <h2
            className="font-syne font-extrabold uppercase tracking-tight leading-none text-[#0D3B2E] block w-full text-center"
            style={{
              fontSize: 'clamp(26px, 8.2vw, 115px)',
            }}
          >
            CREVIX <span className="text-[#B88C3A]">STUDIO</span>
          </h2>
        </div>
      </div>
    </footer>
  );
}
