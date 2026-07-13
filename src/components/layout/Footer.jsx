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
    <footer className="relative pb-10 pt-16 md:pb-12 md:pt-24 group" style={{ backgroundColor: '#6F8A6E' }}>
      {/* Top border — dark green with hover transition */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#0D3B2E]/30 group-hover:bg-[#0D3B2E] transition-colors duration-500" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-20 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="group flex flex-col items-start gap-4">
              <img 
                src="/logo.png" 
                alt="Crevix Studio" 
                className="w-16 h-16 object-contain" 
                style={{ mixBlendMode: 'multiply' }}
              />
              <div className="font-brand font-[900] text-[21px] flex items-baseline gap-1.5">
                <span className="text-[#D8D2C4]">CREVIX</span>
                <span className="text-[#B88C3A]">STUDIO</span>
              </div>
            </Link>
            <p className="mt-5 text-[20px] text-[#D8D2C4]/90 leading-relaxed max-w-[280px] font-bold">
              Designing the future, one pixel at a time.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="font-sans text-[18px] uppercase tracking-[0.2em] text-[#D8D2C4]/80 mb-6 font-bold">Pages</p>
            <ul className="space-y-3">
              {footerLinks.Pages.map((p) => (
                <li key={p.to}>
                  <Link to={p.to}
                    className="text-[20px] text-[#D8D2C4] hover:text-[#D8D2C4]/80 font-bold transition-colors duration-150">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-[18px] uppercase tracking-[0.2em] text-[#D8D2C4]/80 mb-6 font-bold">Services</p>
            <ul className="space-y-3">
              {footerLinks.Services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-[20px] text-[#D8D2C4] hover:text-[#D8D2C4]/80 font-bold transition-colors duration-150">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[18px] uppercase tracking-[0.2em] text-[#D8D2C4]/80 mb-6 font-bold">Contact</p>
            <ul className="space-y-3 text-[20px] text-[#D8D2C4] font-bold">
              <li><a href="mailto:hello@crevixstudio.com" className="hover:text-[#D8D2C4]/80 transition-colors duration-150 font-sans font-semibold">hello@crevixstudio.com</a></li>
              <li>
                <a href="https://wa.me/917817833974" className="hover:text-[#D8D2C4]/80 transition-colors duration-150 font-sans font-semibold">
                  +91 78178 33974 (WhatsApp)
                </a>
              </li>
              <li>Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-[#0D3B2E]/15 pt-8 sm:flex-row sm:items-center">
          <p className="text-[18px] text-[#D8D2C4]/80 font-bold">© 2026 Crevix Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[18px] text-[#D8D2C4]/80 font-bold sm:gap-4">
            <a href="#" className="hover:text-[#D8D2C4]/60 transition-colors duration-150">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#D8D2C4]/60 transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
