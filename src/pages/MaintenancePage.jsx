import React from 'react';

export default function MaintenancePage() {
  return (
    <div style={styles.body}>
      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <header style={styles.header}>
        <a href="/" style={styles.logoContainer}>
          <img
            src="/logo.png"
            alt="Crevix Studio Logo"
            style={styles.logoImg}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <span style={styles.logoText}>CREVIX STUDIO</span>
        </a>
        <div style={styles.statusBadge}>
          <span style={styles.statusDot}></span>
          Website Launching Soon
        </div>
      </header>

      <main style={styles.main}>
        <span style={styles.heroTag}>Digital Design & Engineering</span>
        <h1 style={styles.h1}>
          Crafting Something <span style={styles.h1Span}>Extraordinary</span>
        </h1>
        <p style={styles.subtitle}>
          Our official website is currently undergoing a planned transformation. We are refining our platform to bring you a world-class digital experience.
        </p>

        <div style={styles.contactCard}>
          <h3 style={styles.contactTitle}>Have an inquiry or ongoing project?</h3>
          <a href="mailto:hello@crevix-studio.in" style={styles.btnEmail}>
            <svg
              style={{ width: '18px', height: '18px' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
            Contact Our Team
          </a>
        </div>
      </main>

      <footer style={styles.footer}>
        <div style={styles.copyright}>
          &copy; {new Date().getFullYear()} Crevix Studio. All rights reserved.
        </div>
        <div style={{ color: '#9ca3af', fontSize: '0.85rem' }}>
          System Maintenance & Launch Preparation
        </div>
      </footer>
    </div>
  );
}

const styles = {
  body: {
    fontFamily: "'Inter', sans-serif",
    backgroundColor: '#0a0a0c',
    color: '#f3f4f6',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflowX: 'hidden',
    position: 'relative',
    padding: '2rem 1.5rem',
    boxSizing: 'border-box',
  },
  glow1: {
    position: 'absolute',
    top: '-10%',
    left: '20%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(127, 0, 255, 0.25) 0%, rgba(0,0,0,0) 70%)',
    filter: 'blur(80px)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  glow2: {
    position: 'absolute',
    bottom: '-10%',
    right: '15%',
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(0, 242, 254, 0.2) 0%, rgba(0,0,0,0) 70%)',
    filter: 'blur(100px)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  header: {
    zIndex: 10,
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 0',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    textDecoration: 'none',
  },
  logoImg: {
    height: '40px',
    width: 'auto',
  },
  logoText: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.5rem',
    fontWeight: '800',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '0.4rem 0.9rem',
    borderRadius: '9999px',
    fontSize: '0.85rem',
    fontWeight: '500',
    color: '#d1d5db',
    backdropFilter: 'blur(10px)',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    backgroundColor: '#10b981',
    borderRadius: '50%',
    boxShadow: '0 0 10px #10b981',
  },
  main: {
    zIndex: 10,
    maxWidth: '850px',
    textAlign: 'center',
    margin: 'auto 0',
    padding: '3rem 0',
  },
  heroTag: {
    display: 'inline-block',
    fontFamily: "'Syne', sans-serif",
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '0.25em',
    background: 'linear-gradient(90deg, #00f2fe, #7f00ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '1.25rem',
  },
  h1: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
    fontWeight: '800',
    lineHeight: '1.08',
    letterSpacing: '-0.03em',
    marginBottom: '1.5rem',
    color: '#ffffff',
  },
  h1Span: {
    background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 50%, #7f00ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: '#9ca3af',
    fontWeight: '300',
    lineHeight: '1.6',
    maxWidth: '650px',
    margin: '0 auto 2.5rem',
  },
  contactCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(16px)',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.25rem',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
    maxWidth: '500px',
    margin: '0 auto',
  },
  contactTitle: {
    fontFamily: "'Syne', sans-serif",
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#ffffff',
  },
  btnEmail: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.6rem',
    background: 'linear-gradient(135deg, #ffffff 0%, #e4e4e7 100%)',
    color: '#09090b',
    fontWeight: '600',
    padding: '0.85rem 1.75rem',
    borderRadius: '12px',
    textDecoration: 'none',
    boxShadow: '0 4px 20px rgba(255, 255, 255, 0.15)',
  },
  footer: {
    zIndex: 10,
    width: '100%',
    maxWidth: '1100px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 0 0',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    fontSize: '0.875rem',
    color: '#9ca3af',
    flexWrap: 'wrap',
    gap: '0.75rem',
  },
  copyright: {
    fontWeight: '400',
  },
};
