import React, { useState, useEffect } from 'react';
import { Mail, Heart, Sparkles, RotateCcw } from 'lucide-react';

export default function SpecialLetter({
  letterData = {},
  myName = "KD",
  partnerName = "ROWDY"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [greeting, setGreeting] = useState(letterData.greeting || "En Anbe ❤️");
  const [paragraphs, setParagraphs] = useState(
    Array.isArray(letterData.paragraphs)
      ? letterData.paragraphs.join('\n\n')
      : (letterData.paragraphs || '')
  );
  const [signoff, setSignoff] = useState(
    letterData.signoff || `Always yours,\n**Ungaloda KD ❤️**`
  );

  // Helper to parse **bold** text in paragraphs & signoff
  const renderFormattedText = (text) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="letter-strong">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  // Keep state synchronized with incoming letterData
  useEffect(() => {
    if (letterData?.greeting) {
      setGreeting(letterData.greeting);
    }
    if (letterData?.paragraphs) {
      setParagraphs(
        Array.isArray(letterData.paragraphs)
          ? letterData.paragraphs.join('\n\n')
          : letterData.paragraphs
      );
    }
    if (letterData?.signoff) {
      setSignoff(letterData.signoff);
    }
  }, [letterData]);

  const handleEnvelopeClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <section className="section letter-section" id="letter">
      {/* Background Ambience */}
      <div className="ambient-glow-wine" style={{ top: '25%', left: '20%' }} />
      <div className="ambient-glow-copper" style={{ bottom: '20%', right: '15%' }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Mail size={13} />
            <span>Private Words</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            A Letter From My Heart
          </h2>

          <p className="section-subtitle text-romance">
            Click the wax seal below to open what I have wanted to tell you from the start.
          </p>
        </div>

        {/* Envelope & Letter Stage */}
        <div className="letter-stage">
          {/* Closed Envelope view when not opened */}
          {!isOpen ? (
            <div 
              className="envelope-wrapper" 
              onClick={handleEnvelopeClick}
              role="button"
              tabIndex={0}
              aria-label="Click to break wax seal and open letter"
            >
              <div className="envelope">
                <div className="envelope-back" />
                <div className="envelope-liner" />

                {/* Left & Right Fold Layers */}
                <div className="envelope-fold-left" />
                <div className="envelope-fold-right" />

                {/* Bottom Pocket Fold */}
                <div className="envelope-pocket-bottom" />

                {/* Top Triangular Flap */}
                <div className="envelope-flap" />

                {/* Symmetrical 3D Copper Wax Seal Centered on Flap Tip */}
                <div className="wax-seal" aria-label="KD &amp; ROWDY Wax Seal">
                  <div className="seal-emboss">
                    <Heart size={20} fill="#faebd7" color="#faebd7" className="seal-heart" />
                    <span className="seal-initials">{myName} &amp; {partnerName}</span>
                  </div>
                </div>

                {/* Front Envelope Tag */}
                <div className="envelope-front-tag">
                  <span className="tag-to">For My Favourite Person</span>
                  <span className="tag-sub">To be opened with love ❤️</span>
                </div>
              </div>

              <div className="open-prompt">
                <Sparkles size={16} className="sparkle-hint" />
                <span>Tap the envelope to open my letter</span>
              </div>
            </div>
          ) : (
            /* Open Letter View */
            <div className="unfolded-letter-wrapper">
              <div className="parchment-letter copper-card">
                {/* Decorative Vintage Border Filigree */}
                <div className="letter-filigree top-left" />
                <div className="letter-filigree top-right" />
                <div className="letter-filigree bottom-left" />
                <div className="letter-filigree bottom-right" />

                {/* Refined Wax Stamp in Top-Right Corner */}
                <div className="parchment-wax-stamp" aria-label="KD &amp; ROWDY Wax Stamp">
                  <div className="seal-circle">
                    <Heart size={18} fill="#faebd7" color="#faebd7" className="stamp-heart-icon" />
                    <span className="seal-text">{myName} &amp; {partnerName}</span>
                  </div>
                </div>

                <div className="letter-content-render">
                  {/* Header Group with dedicated clearance for the top-right stamp */}
                  <div className="letter-header-group">
                    <span className="first-letter-badge">
                      {letterData.firstLetterHeading || "Chapter One: Our Forever Begins ❤️"}
                    </span>
                    <p className="first-letter-sub">
                      {letterData.firstLetterSubtitle || "One little milestone, so many feelings, and a story I want to keep writing with you."}
                    </p>

                    <div className="letter-top-meta">
                      <span className="letter-date">October – November 2026</span>
                      <span className="letter-milestone-tag">1st Month Anniversary</span>
                    </div>

                    <h3 className="letter-greeting text-romance">
                      {greeting}
                    </h3>
                  </div>

                  <div className="letter-body text-romance">
                    {paragraphs.split('\n\n').map((para, i) => (
                      <p key={i} className="letter-paragraph">
                        {renderFormattedText(para)}
                      </p>
                    ))}
                  </div>

                  <div className="letter-signoff text-romance">
                    {signoff.split('\n').map((line, i) => (
                      <div key={i}>{renderFormattedText(line)}</div>
                    ))}
                  </div>

                  {/* Letter Controls: Only Fold Envelope */}
                  <div className="letter-footer-actions">
                    <button
                      type="button"
                      className="btn-copper-primary fold-btn"
                      onClick={() => setIsOpen(false)}
                      title="Fold back into envelope"
                    >
                      <RotateCcw size={16} />
                      <span>Fold Envelope</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .letter-stage {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 500px;
          perspective: 1200px;
        }

        /* 3D Envelope Styling */
        .envelope-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .envelope-wrapper:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .envelope {
          position: relative;
          width: 380px;
          height: 250px;
          background: #14111c;
          border-radius: 14px;
          border: 1.5px solid rgba(216, 150, 105, 0.4);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(200, 129, 81, 0.15);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .envelope-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(145deg, #1d1827 0%, #110e17 100%);
        }

        .envelope-liner {
          position: absolute;
          inset: 10px;
          border: 1px dashed rgba(216, 150, 105, 0.22);
          border-radius: 10px;
        }

        /* Side Folds */
        .envelope-fold-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #171320 0%, #0f0c15 100%);
          clip-path: polygon(0 0, 50% 50%, 0 100%);
          z-index: 2;
        }

        .envelope-fold-right {
          position: absolute;
          inset: 0;
          background: linear-gradient(225deg, #171320 0%, #0f0c15 100%);
          clip-path: polygon(100% 0, 50% 50%, 100% 100%);
          z-index: 2;
        }

        /* Bottom Pocket Fold */
        .envelope-pocket-bottom {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, #1c1727 0%, #13101b 100%);
          clip-path: polygon(0 100%, 50% 46%, 100% 100%);
          border-top: 1px solid rgba(216, 150, 105, 0.15);
          z-index: 3;
        }

        /* Top Triangular Flap */
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 140px;
          background: linear-gradient(180deg, #2a2337 0%, #1e1928 85%, #181321 100%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          border-bottom: 1px solid rgba(216, 150, 105, 0.35);
          filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.65));
          z-index: 4;
          transition: transform 0.5s ease;
        }

        /* Symmetrical 3D Copper Wax Seal Centered on Flap Apex */
        .wax-seal {
          position: absolute;
          top: 102px;
          left: 50%;
          transform: translateX(-50%);
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 32%, #f8b48c 0%, #d87d4a 32%, #b3562d 68%, #6e201c 100%);
          border: 2.5px solid rgba(250, 235, 215, 0.85);
          box-shadow: 
            0 10px 28px rgba(0, 0, 0, 0.85),
            inset 0 3px 5px rgba(255, 235, 220, 0.6),
            inset 0 -3px 6px rgba(50, 12, 10, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-sizing: border-box;
        }

        .wax-seal::before {
          content: '';
          position: absolute;
          inset: 3px;
          border-radius: 50%;
          border: 1px dashed rgba(250, 235, 215, 0.45);
          pointer-events: none;
        }

        .envelope-wrapper:hover .wax-seal {
          transform: translateX(-50%) scale(1.08);
          box-shadow: 
            0 14px 34px rgba(0, 0, 0, 0.95),
            inset 0 3px 6px rgba(255, 235, 220, 0.7),
            0 0 24px rgba(216, 150, 105, 0.5);
        }

        .seal-emboss {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          text-align: center;
        }

        .seal-heart {
          filter: drop-shadow(0 1px 2px rgba(40, 10, 8, 0.9));
        }

        .seal-initials {
          font-family: var(--font-serif);
          font-size: 0.58rem;
          letter-spacing: 0.12em;
          color: #faebd7;
          font-weight: 700;
          text-shadow: 0 1px 2px rgba(40, 10, 8, 0.95);
          line-height: 1;
        }

        .envelope-front-tag {
          position: absolute;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          z-index: 5;
          pointer-events: none;
        }

        .tag-to {
          font-family: var(--font-serif);
          font-size: 0.88rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--copper-200);
          font-weight: 600;
        }

        .tag-sub {
          font-size: 0.76rem;
          color: var(--cream-muted);
        }

        .open-prompt {
          margin-top: 24px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          color: var(--copper-300);
          letter-spacing: 0.05em;
        }

        .sparkle-hint {
          animation: gentlePulse 2s infinite ease-in-out;
        }

        /* Unfolded Parchment Letter */
        .unfolded-letter-wrapper {
          width: 100%;
          max-width: 780px;
          animation: unfoldLetter 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes unfoldLetter {
          0% {
            opacity: 0;
            transform: translateY(30px) scale(0.92);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .parchment-letter {
          position: relative;
          padding: 56px 48px;
          background: linear-gradient(135deg, rgba(22, 20, 30, 0.96) 0%, rgba(14, 13, 20, 0.98) 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(200, 129, 81, 0.15);
          box-sizing: border-box;
        }

        .parchment-wax-stamp {
          position: absolute;
          top: 32px;
          right: 36px;
          z-index: 5;
        }

        .letter-header-group {
          padding-right: 88px;
          display: flex;
          flex-direction: column;
        }

        .first-letter-badge {
          display: inline-block;
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--copper-200);
          letter-spacing: 0.04em;
          margin-bottom: 4px;
        }

        .first-letter-sub {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-style: italic;
          font-size: 1rem;
          color: var(--cream-muted);
          line-height: 1.4;
          margin-bottom: 18px;
        }

        .letter-top-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(216, 150, 105, 0.15);
        }

        .letter-date {
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--copper-400);
        }

        .letter-milestone-tag {
          font-family: var(--font-serif);
          font-size: 0.82rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--copper-200);
        }

        .letter-greeting {
          font-size: 2rem;
          font-weight: 700;
          color: var(--cream-100);
          margin-bottom: 24px;
          line-height: 1.3;
        }

        .letter-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
          font-size: 1.35rem;
          color: var(--cream-200);
          line-height: 1.8;
          margin-bottom: 36px;
        }

        .letter-paragraph {
          position: relative;
          white-space: pre-line;
        }

        .letter-strong {
          font-weight: 700;
          color: var(--copper-200);
        }

        .letter-signoff {
          font-size: 1.45rem;
          color: var(--copper-200);
          text-align: right;
          font-style: italic;
          line-height: 1.6;
          white-space: pre-line;
          margin-bottom: 36px;
          padding-top: 20px;
          border-top: 1px dashed rgba(216, 150, 105, 0.2);
        }

        .letter-footer-actions {
          display: flex;
          justify-content: center;
          padding-top: 12px;
        }

        .fold-btn {
          gap: 8px;
          padding: 12px 28px;
          font-size: 0.95rem;
        }

        /* Filigree corners */
        .letter-filigree {
          position: absolute;
          width: 32px;
          height: 32px;
          border: 1.5px solid var(--copper-500);
          opacity: 0.5;
        }

        .letter-filigree.top-left {
          top: 14px;
          left: 14px;
          border-right: none;
          border-bottom: none;
        }

        .letter-filigree.top-right {
          top: 14px;
          right: 14px;
          border-left: none;
          border-bottom: none;
        }

        .letter-filigree.bottom-left {
          bottom: 14px;
          left: 14px;
          border-right: none;
          border-top: none;
        }

        .letter-filigree.bottom-right {
          bottom: 14px;
          right: 14px;
          border-left: none;
          border-top: none;
        }

        @media (max-width: 640px) {
          .envelope {
            width: 310px;
            height: 205px;
          }
          .envelope-flap {
            height: 115px;
          }
          .wax-seal {
            top: 80px;
            width: 66px;
            height: 66px;
          }
          .seal-initials {
            font-size: 0.5rem;
          }
          .parchment-letter {
            padding: 38px 22px;
          }
          .parchment-wax-stamp {
            top: 20px;
            right: 20px;
          }
          .letter-header-group {
            padding-right: 64px;
          }
          .letter-greeting {
            font-size: 1.55rem;
          }
          .letter-body {
            font-size: 1.15rem;
            line-height: 1.65;
          }
        }
      `}</style>
    </section>
  );
}
