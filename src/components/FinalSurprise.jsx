import React, { useState } from 'react';
import { Heart, RotateCcw, Sparkles, PartyPopper } from 'lucide-react';
import { fireCelebrationConfetti } from '../utils/confetti';

export default function FinalSurprise({
  data = {},
  myName = "KD",
  partnerName = "ROWDY",
  onReplayStory
}) {
  const [celebrated, setCelebrated] = useState(false);

  const triggerCelebration = () => {
    setCelebrated(true);
    fireCelebrationConfetti();
    setTimeout(() => {
      fireCelebrationConfetti();
    }, 400);
  };

  return (
    <section className="section final-surprise-section" id="final-surprise">
      {/* Background Ambience */}
      <div className="ambient-glow-copper" style={{ top: '30%', left: '30%' }} />
      <div className="ambient-glow-wine" style={{ bottom: '20%', right: '25%' }} />

      <div className="container">
        <div className="final-surprise-card copper-card">
          {/* Soft Heart Animation Centerpiece */}
          <div className="final-heart-wrapper">
            <div className="pulse-aura aura-1" />
            <div className="pulse-aura aura-2" />
            <div className="pulse-aura aura-3" />
            
            <div className="final-heart-sphere">
              <Heart size={56} className="final-heart-icon" fill="url(#finalHeartGrad)" />
              <svg width="0" height="0">
                <linearGradient id="finalHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="35%" stopColor="#e5b38d" />
                  <stop offset="70%" stopColor="#c88151" />
                  <stop offset="100%" stopColor="#8c2535" />
                </linearGradient>
              </svg>
            </div>
          </div>

          {/* Couple Signet */}
          <div className="final-badge">
            <Sparkles size={14} />
            <span>{myName} &amp; {partnerName}</span>
            <span className="dot">•</span>
            <span>One Month Down</span>
          </div>

          {/* Required Heading */}
          <h2 className="final-heading copper-gradient-text">
            {data.heading || "Our First Month Is Just the Beginning ❤️"}
          </h2>

          {/* Required Subtitle */}
          <p className="final-subheading text-romance">
            “{data.subheading || "Here’s to more memories, more laughter, more love, and more chapters of us."}”
          </p>

          {/* Action Buttons */}
          <div className="final-actions">
            {/* Celebrate Button */}
            <button
              type="button"
              className="btn-copper-primary celebrate-btn"
              onClick={triggerCelebration}
            >
              <PartyPopper size={18} />
              <span>{celebrated ? 'Celebrate Again! 🎉' : 'Celebrate Our 1st Month 🎉'}</span>
            </button>

            {/* Required Replay Button */}
            <button
              type="button"
              className="btn-copper-outline replay-btn"
              onClick={onReplayStory}
            >
              <RotateCcw size={16} />
              <span>{data.replayButtonText || "Replay Our Story"}</span>
            </button>
          </div>

          {/* Final whisper */}
          <div className="final-whisper">
            <p>Made with love for ROWDY by KD ❤️</p>
          </div>
        </div>
      </div>

      <style>{`
        .final-surprise-section {
          padding: 80px 0 120px 0;
          text-align: center;
          position: relative;
        }

        .final-surprise-card {
          padding: 80px 48px;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(22, 20, 31, 0.95) 0%, rgba(13, 12, 18, 0.98) 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(200, 129, 81, 0.2);
          max-width: 860px;
          margin: 0 auto;
          position: relative;
        }

        .final-heart-wrapper {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto 36px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .final-heart-sphere {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          background: linear-gradient(135deg, #221d2c 0%, #13111a 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 25px rgba(200, 129, 81, 0.3);
          z-index: 2;
        }

        .final-heart-icon {
          filter: drop-shadow(0 0 12px rgba(216, 150, 105, 0.7));
          animation: gentlePulse 2.8s ease-in-out infinite;
        }

        .pulse-aura {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(216, 150, 105, 0.2);
          pointer-events: none;
        }

        .aura-1 {
          width: 120px;
          height: 120px;
          animation: pulseExpand 4s infinite ease-out;
        }

        .aura-2 {
          width: 150px;
          height: 150px;
          animation: pulseExpand 4s infinite ease-out 1.3s;
        }

        .aura-3 {
          width: 180px;
          height: 180px;
          animation: pulseExpand 4s infinite ease-out 2.6s;
        }

        .final-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--copper-200);
          background: rgba(216, 150, 105, 0.08);
          border: 1px solid rgba(216, 150, 105, 0.25);
          padding: 8px 22px;
          border-radius: var(--radius-full);
          margin-bottom: 24px;
        }

        .final-badge .dot {
          color: var(--copper-400);
        }

        .final-heading {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 22px;
        }

        .final-subheading {
          font-size: clamp(1.25rem, 2.5vw, 1.7rem);
          color: var(--cream-300);
          font-style: italic;
          line-height: 1.6;
          max-width: 680px;
          margin: 0 auto 44px auto;
        }

        .final-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }

        .celebrate-btn {
          font-size: 1.05rem;
          padding: 16px 36px;
        }

        .replay-btn {
          font-size: 0.95rem;
          padding: 14px 28px;
        }

        .final-whisper {
          font-size: 0.85rem;
          color: var(--cream-muted);
          letter-spacing: 0.08em;
          padding-top: 24px;
          border-top: 1px solid rgba(216, 150, 105, 0.15);
        }

        @media (max-width: 640px) {
          .final-surprise-card {
            padding: 48px 24px;
          }
          .final-actions {
            flex-direction: column;
            width: 100%;
          }
          .celebrate-btn, .replay-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
