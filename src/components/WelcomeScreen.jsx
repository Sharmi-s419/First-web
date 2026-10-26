import React, { useState } from 'react';
import { Heart, Sparkles, MailOpen, ArrowDown } from 'lucide-react';

export default function WelcomeScreen({ data, onOpenSurprise }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenSurprise();
    }, 600);
  };

  return (
    <section
      className={`welcome-screen ${isOpening ? 'fade-out' : ''}`}
      id="welcome-screen"
    >
      {/* Ambient background glows */}
      <div className="ambient-glow-copper" style={{ top: '15%', left: '20%' }} />
      <div className="ambient-glow-wine" style={{ bottom: '15%', right: '20%' }} />

      <div className="welcome-content">
        {/* Intimate couple badge */}
        <div className="welcome-badge">
          <Sparkles size={14} className="sparkle-icon" />
          <span>{data.myName || 'KD'} &amp; {data.partnerName || 'ROWDY'}</span>
          <span className="dot-divider">•</span>
          <span>1 Month of Us</span>
        </div>

        {/* Central glowing heart emblem */}
        <div className="heart-emblem-wrapper">
          <div className="pulse-ring ring-1" />
          <div className="pulse-ring ring-2" />
          <div className="heart-emblem">
            <Heart size={44} className="icon-heart" fill="url(#copperEmblemGrad)" />
            <svg width="0" height="0">
              <linearGradient id="copperEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#faebd7" />
                <stop offset="45%" stopColor="#e5b38d" />
                <stop offset="75%" stopColor="#c88151" />
                <stop offset="100%" stopColor="#8c2535" />
              </linearGradient>
            </svg>
          </div>
        </div>

        {/* Required Welcome Title */}
        <h1 className="welcome-title copper-gradient-text">
          {data.welcome?.title || 'To My Favourite Person ❤️'}
        </h1>

        {/* Required Subtitle */}
        <p className="welcome-subtitle text-romance">
          “{data.welcome?.subtitle || 'One month down, a lifetime of memories to go.'}”
        </p>

        {/* Glowing Button */}
        <div className="welcome-action">
          <button
            type="button"
            className="btn-copper-primary welcome-open-btn"
            onClick={handleOpen}
            aria-label="Open your anniversary surprise"
          >
            <MailOpen size={18} />
            <span>{data.welcome?.buttonText || 'Open Your Surprise 💌'}</span>
          </button>
        </div>

        {/* Hint to scroll */}
        <div className="welcome-hint">
          <span>Click the button above to begin our journey</span>
        </div>
      </div>

      <style>{`
        .welcome-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 40px 24px;
          text-align: center;
          background: radial-gradient(circle at 50% 45%, #15131e 0%, #08080c 70%, #040406 100%);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        .welcome-screen.fade-out {
          opacity: 0;
          transform: scale(0.96);
          pointer-events: none;
        }

        .welcome-content {
          max-width: 760px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .welcome-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--copper-200);
          background: rgba(216, 150, 105, 0.08);
          border: 1px solid rgba(216, 150, 105, 0.25);
          padding: 8px 22px;
          border-radius: var(--radius-full);
          margin-bottom: 36px;
          backdrop-filter: blur(8px);
        }

        .sparkle-icon {
          color: var(--copper-300);
          animation: gentlePulse 2.5s infinite;
        }

        .dot-divider {
          color: var(--copper-500);
        }

        .heart-emblem-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 34px;
        }

        .heart-emblem {
          width: 86px;
          height: 86px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(32, 28, 40, 0.95), rgba(16, 15, 22, 0.95));
          border: 1.5px solid rgba(216, 150, 105, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 24px rgba(200, 129, 81, 0.25);
          position: relative;
          z-index: 2;
        }

        .icon-heart {
          filter: drop-shadow(0 0 8px rgba(216, 150, 105, 0.6));
          animation: gentlePulse 3s ease-in-out infinite;
        }

        .pulse-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(216, 150, 105, 0.25);
          pointer-events: none;
        }

        .ring-1 {
          width: 110px;
          height: 110px;
          animation: pulseExpand 4s infinite ease-out;
        }

        .ring-2 {
          width: 140px;
          height: 140px;
          animation: pulseExpand 4s infinite ease-out 1.2s;
        }

        @keyframes pulseExpand {
          0% {
            transform: scale(0.85);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }

        .welcome-title {
          font-size: clamp(2.3rem, 5.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.18;
          margin-bottom: 20px;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
        }

        .welcome-subtitle {
          font-size: clamp(1.2rem, 2.5vw, 1.65rem);
          color: var(--cream-300);
          font-style: italic;
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 620px;
          font-weight: 400;
        }

        .welcome-action {
          margin-bottom: 24px;
        }

        .welcome-open-btn {
          font-size: 1.05rem;
          padding: 16px 36px;
          cursor: pointer;
        }

        .welcome-hint {
          font-size: 0.85rem;
          color: var(--cream-muted);
          letter-spacing: 0.04em;
          opacity: 0.8;
        }

        @media (max-width: 640px) {
          .welcome-badge {
            font-size: 0.72rem;
            padding: 6px 16px;
            margin-bottom: 24px;
          }
          .heart-emblem-wrapper {
            width: 100px;
            height: 100px;
            margin-bottom: 24px;
          }
          .heart-emblem {
            width: 72px;
            height: 72px;
          }
          .icon-heart {
            width: 34px;
            height: 34px;
          }
          .welcome-open-btn {
            width: 100%;
            padding: 15px 24px;
          }
        }
      `}</style>
    </section>
  );
}
