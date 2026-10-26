import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar({
  myName = "KD",
  partnerName = "ROWDY"
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '1st Month', href: '#welcome-screen' },
    { label: 'Counter', href: '#counter' },
    { label: 'Our Story', href: '#story' },
    { label: 'Memories', href: '#memories' },
    { label: 'Reasons', href: '#reasons' },
    { label: 'Letter', href: '#letter' },
    { label: 'Our Song', href: '#music' },
    { label: 'Distance', href: '#distance' }
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand / Logo on the left */}
        <a 
          href="#welcome-screen" 
          className="navbar-brand"
          onClick={(e) => handleLinkClick(e, '#welcome-screen')}
        >
          <Heart size={18} fill="#c88151" color="#faebd7" className="brand-heart" />
          <span className="brand-names">{myName} &amp; {partnerName}</span>
          <span className="brand-dot">•</span>
          <span className="brand-sub">1st Month</span>
        </a>

        {/* Desktop Nav Links: Clean, evenly spaced row */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <span>{link.label}</span>
                <Heart size={12} className="mobile-link-heart" />
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(8, 7, 12, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(216, 150, 105, 0.15);
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .navbar-header.scrolled {
          background: rgba(6, 5, 9, 0.92);
          border-bottom-color: rgba(216, 150, 105, 0.28);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(200, 129, 81, 0.08);
        }

        .navbar-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .navbar-brand {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--cream-100);
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }

        .navbar-brand:hover {
          transform: translateY(-1px);
        }

        .brand-heart {
          filter: drop-shadow(0 0 6px rgba(216, 150, 105, 0.6));
          animation: gentlePulse 2.5s infinite ease-in-out;
        }

        .brand-names {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--cream-100);
        }

        .brand-dot {
          color: var(--copper-500);
          font-size: 0.8rem;
        }

        .brand-sub {
          font-family: var(--font-serif);
          font-size: 0.78rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--copper-300);
          font-weight: 600;
        }

        /* Desktop Nav: Evenly spaced single row */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
        }

        .nav-link {
          font-family: var(--font-sans);
          font-size: 0.83rem;
          font-weight: 500;
          color: var(--cream-300);
          text-decoration: none;
          padding: 6px 12px;
          border-radius: var(--radius-full);
          transition: color 0.25s ease, background 0.25s ease, transform 0.25s ease;
          white-space: nowrap;
          letter-spacing: 0.02em;
        }

        .nav-link:hover {
          color: #faebd7;
          background: rgba(216, 150, 105, 0.14);
          transform: translateY(-1px);
        }

        /* Mobile Hamburger */
        .mobile-menu-btn {
          display: none;
          background: rgba(216, 150, 105, 0.1);
          border: 1px solid rgba(216, 150, 105, 0.3);
          color: var(--copper-200);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .mobile-menu-btn:hover {
          background: rgba(216, 150, 105, 0.2);
          color: var(--cream-100);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          display: none;
          background: rgba(8, 7, 12, 0.98);
          border-bottom: 1px solid rgba(216, 150, 105, 0.25);
          backdrop-filter: blur(20px);
          padding: 16px 20px 24px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.8);
          animation: slideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 16px;
          color: var(--cream-200);
          text-decoration: none;
          font-size: 0.94rem;
          font-weight: 500;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link:active {
          color: #faebd7;
          background: rgba(216, 150, 105, 0.12);
          border-color: rgba(216, 150, 105, 0.25);
        }

        .mobile-link-heart {
          color: var(--copper-400);
          opacity: 0.6;
        }

        @media (max-width: 960px) {
          .navbar-links {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .mobile-drawer {
            display: block;
          }
        }

        @media (max-width: 640px) {
          .navbar-container {
            height: 60px;
            padding: 0 16px;
          }
          .brand-names {
            font-size: 0.95rem;
          }
          .brand-sub {
            display: none;
          }
          .brand-dot {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
