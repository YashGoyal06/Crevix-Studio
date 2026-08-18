import React, { useState } from 'react';

export default function MaintenancePage() {
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  const changeFontSize = (delta) => {
    if (delta === 0) {
      setFontScale(100);
    } else {
      setFontScale((prev) => {
        const next = prev + delta * 5;
        if (next < 85) return 85;
        if (next > 120) return 120;
        return next;
      });
    }
  };

  const toggleContrast = () => {
    setHighContrast((prev) => !prev);
  };

  return (
    <div
      className={highContrast ? 'high-contrast' : ''}
      style={{ '--font-scale': `${fontScale}%` }}
    >
      <style>{`
        /* Modern Indian Government Web Style Guide Palette */
        :root {
            --gov-navy: #002B49;
            --gov-blue: #005691;
            --gov-saffron: #FF9933;
            --gov-green: #138808;
            --gov-gold: #C59B27;
            --gov-bg: #F4F6F9;
            --gov-card-bg: #FFFFFF;
            --gov-text-dark: #222222;
            --gov-text-muted: #555555;
            --gov-border: #D1D5DB;
            --font-main: 'Inter', system-ui, -apple-system, sans-serif;
            --font-heading: 'Merriweather', serif;
            --font-scale: 100%;
        }

        /* High Contrast Mode Override */
        .high-contrast {
            --gov-navy: #000000;
            --gov-blue: #000066;
            --gov-bg: #000000;
            --gov-card-bg: #111111;
            --gov-text-dark: #FFFFFF;
            --gov-text-muted: #CCCCCC;
            --gov-border: #555555;
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        html, body {
            font-size: var(--font-scale);
            scroll-behavior: smooth;
            font-family: var(--font-main);
            background-color: var(--gov-bg);
            color: var(--gov-text-dark);
            line-height: 1.6;
            min-height: 100vh;
        }

        /* Top Government Accessibility Strip */
        .gov-top-bar {
            background-color: #0d1b2a;
            color: #ffffff;
            font-size: 0.825rem;
            padding: 6px 5%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid var(--gov-gold);
            flex-wrap: wrap;
            gap: 10px;
        }

        .gov-top-bar a {
            color: #e2e8f0;
            text-decoration: none;
            margin-right: 15px;
        }

        .gov-top-bar a:hover {
            text-decoration: underline;
        }

        .access-tools {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .access-btn {
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: #fff;
            padding: 2px 7px;
            font-size: 0.75rem;
            cursor: pointer;
            border-radius: 2px;
        }

        .access-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        /* Tricolor Decorative Ribbon */
        .tricolor-ribbon {
            height: 4px;
            background: linear-gradient(90deg, #FF9933 33.3%, #FFFFFF 33.3%, #FFFFFF 66.6%, #138808 66.6%);
        }

        /* Main Govt Header Section */
        header.main-header {
            background-color: #ffffff;
            padding: 16px 5%;
            border-bottom: 1px solid var(--gov-border);
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
        }

        .brand-container {
            display: flex;
            align-items: center;
            gap: 16px;
        }

        .header-logo {
            height: 52px;
            width: auto;
            object-fit: contain;
        }

        .brand-text h1 {
            font-family: var(--font-heading);
            font-size: 1.4rem;
            color: var(--gov-navy);
            font-weight: 700;
            line-height: 1.2;
        }

        .brand-text p {
            font-size: 0.85rem;
            color: var(--gov-text-muted);
            font-weight: 500;
        }

        .header-meta {
            text-align: right;
            font-size: 0.85rem;
            color: var(--gov-navy);
            font-weight: 600;
            border-left: 3px solid var(--gov-saffron);
            padding-left: 12px;
        }

        /* Navigation Bar */
        nav.nav-bar {
            background-color: var(--gov-navy);
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        }

        .nav-container {
            display: flex;
            list-style: none;
            padding: 0 5%;
            overflow-x: auto;
        }

        .nav-container li a {
            display: block;
            color: #ffffff;
            text-decoration: none;
            padding: 12px 20px;
            font-size: 0.9rem;
            font-weight: 500;
            white-space: nowrap;
            transition: background-color 0.2s ease;
        }

        .nav-container li a:hover,
        .nav-container li a.active {
            background-color: var(--gov-blue);
            border-bottom: 3px solid var(--gov-saffron);
        }

        /* Main Container */
        .main-wrapper {
            max-width: 1200px;
            margin: 25px auto;
            padding: 0 20px;
        }

        /* Alert / Announcement Notice */
        .govt-announcement {
            background-color: #fff9e6;
            border-left: 5px solid var(--gov-gold);
            padding: 14px 18px;
            margin-bottom: 25px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .badge-notice {
            background-color: var(--gov-navy);
            color: #fff;
            font-size: 0.75rem;
            font-weight: 700;
            padding: 4px 8px;
            border-radius: 3px;
            text-transform: uppercase;
        }

        /* Content Grid */
        .grid-layout {
            display: grid;
            grid-template-columns: 2.5fr 1fr;
            gap: 25px;
        }

        @media (max-width: 868px) {
            .grid-layout {
                grid-template-columns: 1fr;
            }
        }

        /* Content Cards */
        .card {
            background-color: var(--gov-card-bg);
            border: 1px solid var(--gov-border);
            border-radius: 4px;
            padding: 24px;
            margin-bottom: 25px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .card-header {
            border-bottom: 2px solid var(--gov-blue);
            padding-bottom: 10px;
            margin-bottom: 18px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .card-title {
            font-family: var(--font-heading);
            color: var(--gov-navy);
            font-size: 1.25rem;
            font-weight: 700;
        }

        /* Detail Tables & Lists */
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        .info-table th, .info-table td {
            padding: 12px 15px;
            border: 1px solid var(--gov-border);
            font-size: 0.92rem;
            text-align: left;
        }

        .info-table th {
            background-color: #f1f5f9;
            color: var(--gov-navy);
            font-weight: 600;
            width: 32%;
        }

        /* Speakers Grid Section */
        .speakers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
            gap: 20px;
            margin-top: 15px;
        }

        .speaker-card {
            background: #ffffff;
            border: 1px solid var(--gov-border);
            border-radius: 8px;
            padding: 20px 15px;
            text-align: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.04);
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .speaker-img-wrapper {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 4px solid #f1f5f9;
            box-shadow: 0 0 0 2px var(--gov-blue);
            overflow: hidden;
            background-color: #e2e8f0;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 14px;
        }

        .speaker-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .speaker-name {
            font-family: var(--font-heading);
            font-size: 1.05rem;
            color: var(--gov-navy);
            font-weight: 700;
            margin-bottom: 4px;
        }

        .speaker-role {
            font-size: 0.825rem;
            color: #7c3aed;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .speaker-bio {
            font-size: 0.83rem;
            color: var(--gov-text-muted);
            line-height: 1.45;
        }

        /* Map Embed Container */
        .map-container {
            width: 100%;
            height: 320px;
            border: 1px solid var(--gov-border);
            border-radius: 4px;
            overflow: hidden;
            margin-top: 15px;
        }

        .map-container iframe {
            width: 100%;
            height: 100%;
            border: 0;
        }

        /* Sidebar Widgets */
        .widget {
            background: var(--gov-card-bg);
            border: 1px solid var(--gov-border);
            border-radius: 4px;
            padding: 18px;
            margin-bottom: 20px;
        }

        .widget-title {
            font-size: 1rem;
            font-weight: 700;
            color: var(--gov-navy);
            border-bottom: 2px solid var(--gov-saffron);
            padding-bottom: 6px;
            margin-bottom: 12px;
        }

        .quick-links {
            list-style: none;
        }

        .quick-links li {
            padding: 8px 0;
            border-bottom: 1px dashed var(--gov-border);
            font-size: 0.88rem;
        }

        .quick-links li:last-child {
            border-bottom: none;
        }

        /* Footer */
        footer {
            background-color: var(--gov-navy);
            color: #ffffff;
            margin-top: 40px;
            border-top: 4px solid var(--gov-saffron);
        }

        .footer-body {
            max-width: 1200px;
            margin: 0 auto;
            padding: 30px 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 25px;
            font-size: 0.85rem;
        }

        .footer-col h4 {
            color: var(--gov-gold);
            font-size: 0.95rem;
            margin-bottom: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .footer-col p, .footer-col a {
            color: #cbd5e1;
            text-decoration: none;
            line-height: 1.8;
        }

        .footer-col a:hover {
            color: #ffffff;
            text-decoration: underline;
        }

        .footer-bottom {
            background-color: #071527;
            text-align: center;
            padding: 15px;
            font-size: 0.8rem;
            color: #94a3b8;
            border-top: 1px solid rgba(255,255,255,0.1);
        }

        .badge-status {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 0.75rem;
            font-weight: bold;
        }
        .badge-verified {
            background: #dcfce7;
            color: #15803d;
        }
      `}</style>

      {/* TOP ACCESSIBILITY STRIP */}
      <div className="gov-top-bar">
        <div>
          <span><strong>Crevix Studio Official Desk</strong> | Seminar Information Portal</span>
        </div>
        <div className="access-tools">
          <span>Font Size:</span>
          <button className="access-btn" onClick={() => changeFontSize(-1)} title="Decrease font size">A-</button>
          <button className="access-btn" onClick={() => changeFontSize(0)} title="Reset font size">A</button>
          <button className="access-btn" onClick={() => changeFontSize(1)} title="Increase font size">A+</button>
          <button className="access-btn" onClick={toggleContrast} title="Toggle High Contrast Mode">High Contrast</button>
        </div>
      </div>

      {/* TRICOLOR DECORATIVE BAR */}
      <div className="tricolor-ribbon"></div>

      {/* MAIN HEADER */}
      <header className="main-header">
        <div className="brand-container">
          <img src="/logo.png" alt="Crevix Studio Logo" className="header-logo" />
          <div className="brand-text">
            <h1>Crevix Studio National Seminar 2026</h1>
            <p>Devi Ahilya University Auditorium, Indore • Official Logistics Portal</p>
          </div>
        </div>
        <div className="header-meta">
          <div>Organizing Company: <strong>Crevix Studio</strong></div>
          <div>Date: <strong>August 20, 2026</strong></div>
        </div>
      </header>

      {/* NAVIGATION BAR */}
      <nav className="nav-bar">
        <ul className="nav-container">
          <li><a href="#overview" className="active">Home / Overview</a></li>
          <li><a href="#speakers">Distinguished Speakers</a></li>
          <li><a href="#schedule">Schedule & Timings</a></li>
          <li><a href="#facilities">Accommodation Guidelines</a></li>
          <li><a href="#venue">Venue & Location Map</a></li>
          <li><a href="#contact">Helpdesk & Support</a></li>
        </ul>
      </nav>

      {/* MAIN CONTENT BODY */}
      <main className="main-wrapper">
        {/* ANNOUNCEMENT BANNER */}
        <div className="govt-announcement">
          <span className="badge-notice">Official Announcement</span>
          <p>Free enrollment is open for all university and college students upon verification of a valid Student ID card. Keynote speaker sessions and intensive hands-on workshops on Blockchain & AI will run until 11:00 PM.</p>
        </div>

        <div className="grid-layout">
          {/* LEFT MAIN CONTENT */}
          <div className="content-column">
            {/* OVERVIEW SECTION */}
            <section id="overview" className="card">
              <div className="card-header">
                <h2 className="card-title">Seminar Overview & Details</h2>
                <span className="badge-status badge-verified">Official Event</span>
              </div>
              <p>
                The <strong>Crevix Studio National Seminar 2026</strong> brings together academic scholars, technology enthusiasts, and industry practitioners for an intensive single-day summit. The morning session will feature insightful keynote addresses and speaker sessions led by esteemed international experts, followed by an intensive hands-on technical workshop on <strong>Blockchain & Artificial Intelligence (AI)</strong> starting from the evening and running until 11:00 PM.
              </p>

              <table className="info-table" style={{ marginTop: '20px' }}>
                <tbody>
                  <tr>
                    <th>Organizing Company</th>
                    <td><strong>Crevix Studio</strong></td>
                  </tr>
                  <tr>
                    <th>Event Date</th>
                    <td>Thursday, 20th August 2026</td>
                  </tr>
                  <tr>
                    <th>Operating Hours</th>
                    <td>09:00 AM to 11:00 PM (Single-Day Session)</td>
                  </tr>
                  <tr>
                    <th>Enrollment Fee</th>
                    <td><strong style={{ color: 'var(--gov-green)' }}>100% Free</strong></td>
                  </tr>
                  <tr>
                    <th>Contact Email</th>
                    <td><a href="mailto:contact@crevix-studio.in" style={{ color: 'var(--gov-blue)', fontWeight: 600 }}>contact@crevix-studio.in</a></td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* DISTINGUISHED SPEAKERS / COMMITTEE SECTION */}
            <section id="speakers" className="card">
              <div className="card-header">
                <h2 className="card-title">Distinguished Speakers & Committee Members</h2>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--gov-text-muted)', marginBottom: '15px' }}>Meet our esteemed speakers and committee members leading sessions during the seminar:</p>

              <div className="speakers-grid">
                {/* Speaker 1 */}
                <div className="speaker-card">
                  <div className="speaker-img-wrapper">
                    <img className="speaker-img" src="/maintenance/image_1.webp" alt="Dr. Tanongsak Moontree" />
                  </div>
                  <h3 className="speaker-name">Dr. Tanongsak Moontree</h3>
                  <div className="speaker-role">Committee Member</div>
                  <p className="speaker-bio">Asst Professor Department of Food Technology and Nutrition, Faculty of Technology, Mahasarakham University, Thailand</p>
                </div>

                {/* Speaker 2 */}
                <div className="speaker-card">
                  <div className="speaker-img-wrapper">
                    <img className="speaker-img" src="/maintenance/image_2.webp" alt="Dr. Tara Shah" />
                  </div>
                  <h3 className="speaker-name">Dr. Tara Shah</h3>
                  <div className="speaker-role">Committee Member</div>
                  <p className="speaker-bio">Professor at Department of Community Health Nursing Affiliation with B.P. Koirala Institute of Health Sciences, Dharan, Sunsari, Nepal</p>
                </div>

                {/* Speaker 3 */}
                <div className="speaker-card">
                  <div className="speaker-img-wrapper">
                    <img className="speaker-img" src="/maintenance/image_3.webp" alt="Dr. Madan Mohan Tito Ayyalasomayajula" />
                  </div>
                  <h3 className="speaker-name">Dr. Madan Mohan Tito Ayyalasomayajula</h3>
                  <div className="speaker-role">Committee Member</div>
                  <p className="speaker-bio">Senior Technology Architect, Doctorate in Computer Science, Aspen University, USA</p>
                </div>
              </div>
            </section>

            {/* SCHEDULE SECTION */}
            <section id="schedule" className="card">
              <div className="card-header">
                <h2 className="card-title">Event Schedule (20th August 2026)</h2>
              </div>
              <table className="info-table">
                <thead>
                  <tr>
                    <th>Time Slot</th>
                    <th>Session / Activity Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>09:00 AM - 10:00 AM</th>
                    <td>Delegate Verification & Student ID Registration Desk Opening</td>
                  </tr>
                  <tr>
                    <th>10:00 AM - 01:00 PM</th>
                    <td>Keynote Addresses & Distinguished Speaker Sessions</td>
                  </tr>
                  <tr>
                    <th>01:00 PM - 02:30 PM</th>
                    <td>Lunch Break</td>
                  </tr>
                  <tr>
                    <th>02:30 PM - 05:30 PM</th>
                    <td>Specialized Speaker Sessions & Industry Panel Discussions</td>
                  </tr>
                  <tr>
                    <th>05:30 PM - 08:30 PM</th>
                    <td>Hands-on Technical Workshop: Blockchain Technology Development</td>
                  </tr>
                  <tr>
                    <th>08:30 PM - 11:00 PM</th>
                    <td>Hands-on Technical Workshop: Artificial Intelligence (AI) Applications, Wrap-up & Closing Keynote</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* FACILITIES SECTION */}
            <section id="facilities" className="card">
              <div className="card-header">
                <h2 className="card-title">Accommodation Guidelines</h2>
              </div>

              <h3 style={{ fontSize: '1.05rem', color: 'var(--gov-navy)', marginBottom: '8px' }}>Free Student Accommodation</h3>
              <p style={{ marginBottom: '12px', fontSize: '0.92rem' }}>Government supported free stay arrangements are provided for all eligible students based on Student ID verification.</p>
              <ul style={{ marginLeft: '20px', fontSize: '0.9rem', color: 'var(--gov-text-muted)', marginBottom: '18px' }}>
                <li><strong>Verification Required:</strong> Free stay is provided freely based on valid Student ID card.</li>
              </ul>
            </section>

            {/* VENUE & MAP SECTION */}
            <section id="venue" className="card">
              <div className="card-header">
                <h2 className="card-title">Venue Details & Embedded Location Map</h2>
              </div>
              <div style={{ background: '#f8fafc', border: '1px solid var(--gov-border)', padding: '15px', borderRadius: '4px' }}>
                <h4 style={{ color: 'var(--gov-navy)', fontSize: '1rem', marginBottom: '6px' }}>Devi Ahilya University Auditorium</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--gov-text-muted)', marginBottom: '8px' }}>
                  <strong>Full Address:</strong> MVPH+VGJ, Khandwa Rd, Near IT Park, DAVV Campus, Davv Takshila Parisar, Indore, Madhya Pradesh 452001
                </p>
                <p style={{ fontSize: '0.85rem', marginBottom: '12px' }}>
                  <strong>Plus Code:</strong> <code>MVPH+VGJ Indore</code>
                </p>

                {/* Google Maps Embed for DAVV Auditorium Indore */}
                <div className="map-container">
                  <iframe
                    title="Devi Ahilya University Auditorium Location Map"
                    src="https://maps.google.com/maps?q=Devi+Ahilya+University+Auditorium+Indore+Madhya+Pradesh+452001&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    loading="lazy"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </section>

            {/* HELPDESK & CONTACT */}
            <section id="contact" className="card">
              <div className="card-header">
                <h2 className="card-title">Helpdesk & Contact Information</h2>
              </div>
              <p style={{ fontSize: '0.92rem', marginBottom: '15px' }}>For queries regarding enrollment or accommodation, write to:</p>

              <div style={{ background: '#eef5ff', borderLeft: '4px solid var(--gov-blue)', padding: '14px', borderRadius: '2px' }}>
                <p style={{ fontSize: '0.9rem' }}><strong>Contact Email:</strong> <a href="mailto:contact@crevix-studio.in" style={{ color: 'var(--gov-navy)', fontWeight: 700 }}>contact@crevix-studio.in</a></p>
                <p style={{ fontSize: '0.85rem', color: 'var(--gov-text-muted)', marginTop: '4px' }}>Organizing Company: Crevix Studio</p>
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR WIDGETS */}
          <div className="sidebar-column">
            <div className="widget">
              <h3 className="widget-title">Quick Information</h3>
              <ul className="quick-links">
                <li><strong>Organizing Company:</strong> Crevix Studio</li>
                <li><strong>Date:</strong> August 20, 2026</li>
                <li><strong>Timings:</strong> 9:00 AM to 11:00 PM</li>
                <li><strong>Enrollment:</strong> Free</li>
                <li><strong>Accommodation:</strong> Free (Student ID)</li>
              </ul>
            </div>

            <div className="widget">
              <h3 className="widget-title">Student Requirements</h3>
              <ul style={{ fontSize: '0.85rem', color: 'var(--gov-text-muted)', marginLeft: '16px', lineHeight: '1.7' }}>
                <li>Original Student ID Card</li>
                <li>Personal Essentials</li>
              </ul>
            </div>

            <div className="widget" style={{ background: '#fff8eb', borderColor: '#fde68a' }}>
              <h3 className="widget-title" style={{ borderColor: 'var(--gov-saffron)' }}>Reporting Time Notice</h3>
              <p style={{ fontSize: '0.825rem', color: '#78350f' }}>
                Delegates are requested to reach Devi Ahilya University Auditorium by 8:30 AM for registration verification.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-body">
          <div className="footer-col">
            <h4>Crevix Studio</h4>
            <p>Organizing Company for National Seminar 2026 at Devi Ahilya University Auditorium, Indore, MP.</p>
          </div>
          <div className="footer-col">
            <h4>Portal Navigation</h4>
            <p><a href="#overview">Home Overview</a></p>
            <p><a href="#speakers">Speakers & Committee</a></p>
            <p><a href="#schedule">Schedule & Timeline</a></p>
            <p><a href="#facilities">Accommodation Guidelines</a></p>
            <p><a href="#venue">Venue Location Map</a></p>
          </div>
          <div className="footer-col">
            <h4>Helpdesk Contact</h4>
            <p>Email: contact@crevix-studio.in</p>
            <p>Venue: DAVV Campus, Indore, MP 452001</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>Copyright 2026 Crevix Studio. All rights reserved. Designed in accordance with official portal UI guidelines.</p>
        </div>
      </footer>
    </div>
  );
}
