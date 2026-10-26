import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Settings, 
  Edit3, 
  Eye, 
  Sparkles, 
  Menu, 
  X,
  Gauge
} from 'lucide-react';

export default function Navbar({
  myName = "KD",
  partnerName = "ROWDY",
  isEditMode,
  onToggleEditMode,
  onOpenCustomizer,
  reducedMotion,
  onToggleReducedMotion
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Counter', href: '#counter' },
    { label: 'Our Story', href: '#story' },
    { label: 'Memories', href: '#memories' },
    { label: 'Reasons', href: '#reasons' },
    { label: 'Letter', href: '#letter' },
    { label: 'Our Song', href: '#music' },
    { label: 'Distance', href: '#distance' }
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand / Names */}
        <a href="#welcome-screen" className="navbar-brand">
          <Heart size={18} fill="#c88151" color="#faebd7" className="brand-heart" />
          <span className="brand-names">{myName} &amp; {partnerName}</span>
          <span className="brand-sub">1st Month</span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Reduced Motion Toggle */}
          <button
            type="button"
            className={`btn-nav-control ${reducedMotion ? 'active' : ''}`}
            onClick={onToggleReducedMotion}
            title={reducedMotion ? "Enable full animations" : "Enable reduced motion"}
            aria-label="Toggle animations"
          >
            <Gauge size={15} />
            <span className="control-label">{reducedMotion ? 'Motion Off' : 'Motion On'}</span>
          </button>

          {/* Edit Mode Toggle */}
          <button
            type="button"
            className={`btn-nav-control edit-toggle ${isEditMode ? 'active' : ''}`}
            onClick={onToggleEditMode}
            title={isEditMode ? "Exit edit mode" : "Enter edit mode to customize text and photos"}
            aria-label="Toggle edit mode"
          >
            {isEditMode ? <Eye size={15} /> : <Edit3 size={15} />}
            <span className="control-label">{isEditMode ? 'Preview Mode' : 'Edit Mode'}</span>
          </button>

          {/* Customize Modal Trigger */}
          <button
            type="button"
            className="btn-copper-primary nav-customizer-btn"
            onClick={onOpenCustomizer}
            title="Open website customization settings"
          >
            <Settings size={15} />
            <span>Customize</span>
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mobile-actions">
            <button
              type="button"
              className={`btn-copper-outline w-full ${isEditMode ? 'active' : ''}`}
              onClick={() => {
                onToggleEditMode();
                setMobileMenuOpen(false);
              }}
            >
              {isEditMode ? <Eye size={15} /> : <Edit3 size={15} />}
              <span>{isEditMode ? 'Preview Mode' : 'Edit Mode'}</span>
            </button>

            <button
              type="button"
              className="btn-copper-primary w-full"
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
            >
              <Settings size={15} />
              <span>Customize Site</span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 72px;
          display: flex;
          align-items: center;
          z-index: 100;
          transition: var(--transition-smooth);
          background: transparent;
        }

        .navbar-header.scrolled {
          background: rgba(10, 9, 14, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(216, 150, 105, 0.18);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .navbar-container {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }

        .brand-names {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--cream-100);
        }

        .brand-sub {
          font-size: 0.7rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--copper-400);
          background: rgba(216, 150, 105, 0.1);
          padding: 2px 8px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(216, 150, 105, 0.2);
        }

        .brand-heart {
          filter: drop-shadow(0 0 6px rgba(216, 150, 105, 0.6));
        }

        .navbar-links {
          display: flex;
          align-items: center;
          gap: 22px;
        }

        .nav-link {
          text-decoration: none;
          color: var(--cream-400);
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          color: var(--copper-200);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-nav-control {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(216, 150, 105, 0.2);
          color: var(--cream-300);
          padding: 8px 14px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-nav-control:hover {
          background: rgba(216, 150, 105, 0.12);
          color: var(--copper-200);
        }

        .btn-nav-control.active {
          background: rgba(200, 129, 81, 0.22);
          border-color: var(--copper-400);
          color: var(--copper-100);
        }

        .nav-customizer-btn {
          font-size: 0.82rem;
          padding: 9px 18px;
        }

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--cream-200);
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          background: rgba(14, 13, 20, 0.98);
          border-bottom: 1px solid rgba(216, 150, 105, 0.2);
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          backdrop-filter: blur(20px);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .mobile-nav-link {
          text-decoration: none;
          color: var(--cream-200);
          font-size: 1.1rem;
          padding: 8px 0;
          border-bottom: 1px solid rgba(216, 150, 105, 0.1);
        }

        .mobile-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 992px) {
          .navbar-links {
            display: none;
          }
          .control-label {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}
