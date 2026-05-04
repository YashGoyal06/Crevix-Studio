import { Link } from 'react-router-dom';

const footerLinks = {
  Pages:    ['Home', 'Services', 'Portfolio', 'Pricing', 'Contact'],
  Services: ['Web Development', 'UI/UX Design', 'Branding', 'Motion Design'],
};

export default function Footer() {
  return (
    <footer className="relative bg-void pb-10 pt-16 md:pb-12 md:pt-24">
      {/* Top border — subtle */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/[0.06]" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:mb-20 md:grid-cols-4 md:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="font-syne font-[800] text-[18px] flex items-baseline gap-1.5">
              <span className="text-white">CREVIX</span>
              <span className="text-gradient">STUDIO</span>
            </Link>
            <p className="mt-5 text-[14px] text-text-secondary leading-relaxed max-w-[220px]">
              Designing the future, one pixel at a time.
            </p>
          </div>

          {/* Pages */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Pages</p>
            <ul className="space-y-3">
              {footerLinks.Pages.map((p) => (
                <li key={p}>
                  <Link to={`/${p === 'Home' ? '' : p.toLowerCase()}`}
                    className="text-[14px] text-text-secondary hover:text-white transition-colors duration-150">
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Services</p>
            <ul className="space-y-3">
              {footerLinks.Services.map((s) => (
                <li key={s}>
                  <Link to="/services" className="text-[14px] text-text-secondary hover:text-white transition-colors duration-150">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-text-muted mb-6">Contact</p>
            <ul className="space-y-3 text-[14px] text-text-secondary">
              <li><a href="mailto:hello@crevixstudio.com" className="hover:text-white transition-colors duration-150">hello@crevixstudio.com</a></li>
              <li>
                <a href="https://wa.me/919999999999" className="hover:text-white transition-colors duration-150">
                  WhatsApp →
                </a>
              </li>
              <li>Delhi, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-text-muted">© 2025 Crevix Studio. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-text-muted sm:gap-4">
            <a href="#" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors duration-150">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
