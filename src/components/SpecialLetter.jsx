import React, { useState, useEffect } from 'react';
import { Mail, Edit3, Check, X, Heart, Sparkles, Printer, RotateCcw } from 'lucide-react';

export default function SpecialLetter({
  letterData = {},
  myName = "KD",
  partnerName = "ROWDY",
  onUpdateLetter,
  isEditMode = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [greeting, setGreeting] = useState(letterData.greeting || "En Anbe, Happy One Month to Us ❤️");
  const [paragraphs, setParagraphs] = useState(
    Array.isArray(letterData.paragraphs)
      ? letterData.paragraphs.join('\n\n')
      : (letterData.paragraphs || '')
  );
  const [signoff, setSignoff] = useState(
    letterData.signoff || `Forever cheering for you,\n${myName} ❤️`
  );

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

  const handleSaveEdit = () => {
    const updated = {
      greeting,
      paragraphs: paragraphs.split('\n\n').filter(p => p.trim().length > 0),
      signoff
    };
    onUpdateLetter(updated);
    setIsEditing(false);
  };

  const handlePrint = () => {
    window.print();
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
            A Letter From My Heart 💌
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
              aria-label="Click to break seal and open letter"
            >
              <div className="envelope">
                <div className="envelope-back" />
                <div className="envelope-liner" />

                {/* Wax Seal Stamp */}
                <div className="wax-seal">
                  <div className="seal-emboss">
                    <Heart size={20} fill="#f4d1ba" color="#c88151" />
                    <span className="seal-initials">{myName} &amp; {partnerName}</span>
                  </div>
                </div>

                <div className="envelope-flap" />
                <div className="envelope-pocket" />

                <div className="envelope-front-tag">
                  <span className="tag-to">For My Favourite Person</span>
                  <span className="tag-sub">To be opened with love ❤️</span>
                </div>
              </div>

              <div className="open-prompt">
                <Sparkles size={16} className="sparkle-hint" />
                <span>Tap the envelope to break the wax seal</span>
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

                {isEditing ? (
                  <div className="letter-edit-form">
                    <label className="edit-label">Letter Greeting:</label>
                    <input
                      type="text"
                      value={greeting}
                      onChange={(e) => setGreeting(e.target.value)}
                      className="letter-input greeting-input"
                    />

                    <label className="edit-label">Letter Body (Separate paragraphs with double enter):</label>
                    <textarea
                      value={paragraphs}
                      onChange={(e) => setParagraphs(e.target.value)}
                      rows={8}
                      className="letter-textarea"
                    />

                    <label className="edit-label">Sign-off:</label>
                    <textarea
                      value={signoff}
                      onChange={(e) => setSignoff(e.target.value)}
                      rows={2}
                      className="letter-input"
                    />

                    <div className="letter-actions-bar">
                      <button type="button" className="btn-copper-primary" onClick={handleSaveEdit}>
                        <Check size={16} /> Save Letter
                      </button>
                      <button
                        type="button"
                        className="btn-copper-outline"
                        onClick={() => setIsEditing(false)}
                      >
                        <X size={16} /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="letter-content-render">
                    {/* Header Group with dedicated clearance for the top-right stamp */}
                    <div className="letter-header-group">
                      <span className="first-letter-badge">The First Letter I Wrote for You 💌</span>
                      <p className="first-letter-sub">My first letter to you, filled with feelings I wanted you to know.</p>

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
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="letter-signoff text-romance">
                      {signoff.split('\n').map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>

                    {/* Letter Controls */}
                    <div className="letter-footer-actions">
                      {isEditMode && (
                        <button
                          type="button"
                          className="btn-copper-outline"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit3 size={14} /> Edit Words
                        </button>
                      )}

                      <button
                        type="button"
                        className="btn-copper-outline"
                        onClick={() => setIsOpen(false)}
                        title="Fold back into envelope"
                      >
                        <RotateCcw size={14} /> Fold Envelope
                      </button>

                      <button
                        type="button"
                        className="btn-copper-outline"
                        onClick={handlePrint}
                        title="Print or save as PDF"
                      >
                        <Printer size={14} /> Keep as Memory
                      </button>
                    </div>
                  </div>
                )}
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
          min-height: 480px;
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
          width: 360px;
          height: 240px;
          background: #18151f;
          border-radius: 12px;
          border: 1.5px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 25px rgba(200, 129, 81, 0.15);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .envelope-back {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1d1825 0%, #110f17 100%);
        }

        .envelope-liner {
          position: absolute;
          top: 10px;
          left: 10px;
          right: 10px;
          bottom: 10px;
          border: 1px dashed rgba(216, 150, 105, 0.2);
          border-radius: 8px;
        }

        /* Flap triangle */
        .envelope-flap {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          background: linear-gradient(180deg, #252030 0%, #1b1723 100%);
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          border-bottom: 1px solid rgba(216, 150, 105, 0.3);
          z-index: 2;
        }

        /* Wax Seal in Bronze / Wine Red */
        .wax-seal {
          position: absolute;
          top: 96px;
          left: 50%;
          transform: translateX(-50%);
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #b34a5d 0%, #7d1c2c 50%, #4a0d17 100%);
          border: 2px solid rgba(244, 209, 186, 0.5);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.8), 0 0 16px rgba(179, 74, 93, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 4;
          transition: transform 0.3s ease;
        }

        .envelope-wrapper:hover .wax-seal {
          transform: translateX(-50%) scale(1.08);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.9), 0 0 24px rgba(216, 150, 105, 0.6);
        }

        .seal-emboss {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }

        .seal-initials {
          font-family: var(--font-serif);
          font-size: 0.62rem;
          letter-spacing: 0.12em;
          color: #faebd7;
          font-weight: 700;
        }

        .envelope-front-tag {
          position: absolute;
          bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          z-index: 3;
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
          background: linear-gradient(135deg, rgba(22, 20, 30, 0.95) 0%, rgba(14, 13, 20, 0.98) 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(200, 129, 81, 0.15);
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

        .letter-signoff {
          font-size: 1.45rem;
          color: var(--copper-200);
          font-style: italic;
          line-height: 1.6;
          border-top: 1px solid rgba(216, 150, 105, 0.15);
          padding-top: 24px;
          margin-bottom: 32px;
        }

        .letter-footer-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Edit Form */
        .letter-edit-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .edit-label {
          font-size: 0.82rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--copper-300);
          font-weight: 600;
        }

        .letter-input, .letter-textarea {
          width: 100%;
          background: rgba(10, 9, 14, 0.9);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 12px 16px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 1.05rem;
          line-height: 1.6;
        }

        .letter-input:focus, .letter-textarea:focus {
          outline: none;
          border-color: var(--copper-400);
          box-shadow: 0 0 15px rgba(216, 150, 105, 0.25);
        }

        .letter-actions-bar {
          display: flex;
          gap: 12px;
          margin-top: 12px;
        }

        @media (max-width: 640px) {
          .envelope {
            width: 300px;
            height: 200px;
          }
          .wax-seal {
            top: 76px;
            width: 60px;
            height: 60px;
          }
          .parchment-letter {
            padding: 36px 22px;
          }
          .letter-greeting {
            font-size: 1.6rem;
          }
          .letter-body {
            font-size: 1.15rem;
          }
          .letter-signoff {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
