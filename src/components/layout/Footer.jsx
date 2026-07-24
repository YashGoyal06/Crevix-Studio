import { Link } from 'react-router-dom';

const footerLinks = {
  Pages: [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Our Team', to: '/team' },
    { label: 'Pricing', to: '/pricing' },
    { label: 'Contact', to: '/contact' },
  ],
  Services: ['Web Development', 'UI/UX Design', 'Branding', 'Motion Design'],
};

export default function Footer() {
  return (
    <footer className="relative pb-6 pt-4 md:pb-8 md:pt-6 group" style={{ backgroundColor: '#D8D2C4' }}>
      {/* Top Seamless Wavy Curve Transition */}
      <div className="absolute left-0 right-0 -top-[36px] sm:-top-[52px] md:-top-[68px] w-full overflow-hidden leading-none pointer-events-none z-20">
        <svg
          className="relative block w-full h-[36px] sm:h-[52px] md:h-[68px]"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,32 C320,96 640,-16 960,64 C1200,112 1360,32 1440,48 L1440,120 L0,120 Z"
            fill="#D8D2C4"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 relative z-10">
        <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mb-8 md:grid-cols-3 md:gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="group flex flex-col items-start gap-2">
              <img 
                src="/logo.png" 
                alt="Crevix Studio" 
                className="w-12 h-12 object-contain" 
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="font-brand font-[900] text-[18px] flex items-baseline gap-1.5">
                <span className="text-[#0D3B2E]">CREVIX</span>
                <span className="text-[#B88C3A]">STUDIO</span>
              </div>
            </Link>
            <p className="mt-3 text-[16px] text-[#0D3B2E]/90 leading-relaxed max-w-[280px] font-bold">
              Designing the future, one pixel at a time.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-[15px] uppercase tracking-[0.2em] text-[#0D3B2E]/80 mb-3 font-bold">Services</p>
            <ul className="space-y-1.5">
              {footerLinks.Services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-[17px] text-[#0D3B2E] hover:text-[#0D3B2E]/80 font-bold transition-colors duration-150">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[15px] uppercase tracking-[0.2em] text-[#0D3B2E]/80 mb-3 font-bold">Contact</p>
            <ul className="space-y-1.5 text-[17px] text-[#0D3B2E] font-bold">
              <li><a href="mailto:hello@crevixstudio.com" className="hover:text-[#0D3B2E]/80 transition-colors duration-150 font-sans font-semibold">hello@crevixstudio.com</a></li>
              <li>
                <a href="https://wa.me/917817833974" className="hover:text-[#0D3B2E]/80 transition-colors duration-150 font-sans font-semibold font-normal-numbers text-[15px]">
                  +91 78178 33974 (WhatsApp)
                </a>
              </li>
              <li>Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-[#0D3B2E]/25 pt-4 sm:flex-row sm:items-center">
          <p className="text-[15px] text-[#0D3B2E]/80 font-bold">© 2026 Crevix Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[15px] text-[#0D3B2E]/80 font-bold sm:gap-4">
            <a href="#" className="hover:text-[#0D3B2E]/60 transition-colors duration-150">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#0D3B2E]/60 transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
