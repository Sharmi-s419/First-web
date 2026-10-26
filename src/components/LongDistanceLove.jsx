import React, { useState } from 'react';
import { Moon, Heart, Sparkles, Shield } from 'lucide-react';

export default function LongDistanceLove({
  data = {},
  myName = "KD",
  partnerName = "ROWDY"
}) {
  const [hugSent, setHugSent] = useState(false);
  const quote = data.quote || "No matter how many miles separate us, you will always have a special place in my heart. I am proud of you, and I will always be cheering for you.";
  const subtext = data.subtext || "Looking up at the exact same moon and stars. Your devotion and honor make me prouder than words can ever say.";

  const handleSendHug = () => {
    setHugSent(true);
    setTimeout(() => {
      setHugSent(false);
    }, 4000);
  };

  return (
    <section className="section distance-section" id="distance">
      {/* Night Sky Graphic / Backdrop */}
      <div className="sky-overlay" />

      <div className="container">
        <div className="distance-card copper-card">
          {/* Luminous Crescent Moon Graphic */}
          <div className="moon-constellation-wrap">
            <div className="moon-glow" />
            <div className="crescent-moon">
              <div className="moon-inner" />
            </div>
            {/* Constellation stars */}
            <div className="constellation star-1"><Sparkles size={12} /></div>
            <div className="constellation star-2"><Sparkles size={10} /></div>
            <div className="constellation star-3"><Sparkles size={14} /></div>
          </div>

          {/* Section Tag */}
          <div className="section-tag" style={{ margin: '0 auto 20px auto' }}>
            <Moon size={13} />
            <span>Under The Same Sky</span>
          </div>

          {/* Section Title */}
          <h2 className="distance-title copper-gradient-text">
            {data.title || "Miles Apart, Close at Heart"}
          </h2>

          {/* Romantic Quote */}
          <blockquote className="distance-quote text-romance">
            “{quote}”
          </blockquote>

          {/* Subtext honoring dedication */}
          <p className="distance-subtext">
            {subtext}
          </p>

          {/* Virtual Hug Interaction */}
          <div className="hug-interaction-wrap">
            <button
              type="button"
              className={`btn-send-hug ${hugSent ? 'sent' : ''}`}
              onClick={handleSendHug}
              disabled={hugSent}
            >
              <Heart
                size={18}
                fill={hugSent ? '#faebd7' : '#c88151'}
                className={hugSent ? 'hug-heart-pulse' : ''}
              />
              <span>
                {hugSent ? 'Sending Warm Hug Across The Distance... ❤️' : 'Send a Virtual Hug to ROWDY'}
              </span>
            </button>

            {hugSent && (
              <div className="hug-toast animate-float">
                <Sparkles size={16} />
                <span>Hug delivered straight to {partnerName}'s heart!</span>
              </div>
            )}
          </div>

          {/* Subtle Respectful Honor Badge */}
          <div className="military-respect-pill">
            <Shield size={14} className="shield-icon" />
            <span>Honoring your courage, discipline, and steadfast dedication. Forever your safe harbor.</span>
          </div>
        </div>
      </div>

      <style>{`
        .distance-section {
          position: relative;
          background: radial-gradient(circle at 50% 30%, #151322 0%, #08080d 75%, #030305 100%);
          overflow: hidden;
        }

        .sky-overlay {
          position: absolute;
          inset: 0;
          background-image: url('/images/night_sky.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.18;
          mix-blend-mode: screen;
          pointer-events: none;
        }

        .distance-card {
          padding: 64px 44px;
          border-radius: var(--radius-xl);
          background: rgba(15, 14, 22, 0.88);
          backdrop-filter: blur(20px);
          border: 1.5px solid rgba(216, 150, 105, 0.3);
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.85), 0 0 40px rgba(200, 129, 81, 0.15);
          text-align: center;
          max-width: 860px;
          margin: 0 auto;
          position: relative;
        }

        /* Moon and Constellations */
        .moon-constellation-wrap {
          position: relative;
          width: 90px;
          height: 90px;
          margin: 0 auto 28px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .moon-glow {
          position: absolute;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(245, 200, 120, 0.25) 0%, transparent 70%);
          filter: blur(14px);
        }

        .crescent-moon {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          box-shadow: 14px 10px 0 0 #faebd7;
          transform: rotate(-25deg);
          filter: drop-shadow(0 0 12px rgba(250, 235, 215, 0.8));
        }

        .constellation {
          position: absolute;
          color: var(--copper-200);
          animation: gentlePulse 3s infinite ease-in-out;
        }

        .star-1 { top: 0; left: -20px; animation-delay: 0.4s; }
        .star-2 { bottom: 5px; right: -15px; animation-delay: 1.2s; }
        .star-3 { top: 15px; right: -25px; animation-delay: 2.1s; }

        .distance-title {
          font-size: clamp(2rem, 4vw, 2.9rem);
          font-weight: 700;
          margin-bottom: 24px;
        }

        .distance-quote {
          font-size: clamp(1.35rem, 2.8vw, 1.85rem);
          color: var(--cream-100);
          line-height: 1.6;
          font-style: italic;
          max-width: 720px;
          margin: 0 auto 20px auto;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.8);
        }

        .distance-subtext {
          font-size: 1.05rem;
          color: var(--cream-400);
          max-width: 640px;
          margin: 0 auto 36px auto;
          line-height: 1.7;
        }

        .hug-interaction-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          margin-bottom: 36px;
        }

        .btn-send-hug {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(135deg, rgba(200, 129, 81, 0.25) 0%, rgba(140, 37, 53, 0.35) 100%);
          color: var(--cream-100);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: 0.95rem;
          padding: 14px 32px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(216, 150, 105, 0.4);
          cursor: pointer;
          transition: var(--transition-bounce);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6);
        }

        .btn-send-hug:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.03);
          border-color: var(--copper-300);
          box-shadow: 0 10px 30px rgba(200, 129, 81, 0.35);
        }

        .btn-send-hug.sent {
          background: linear-gradient(135deg, #c88151 0%, #8c2535 100%);
          color: #fff;
        }

        .hug-heart-pulse {
          animation: gentlePulse 0.8s infinite ease-in-out;
        }

        .hug-toast {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(20, 19, 28, 0.95);
          border: 1px solid var(--copper-400);
          color: var(--copper-200);
          padding: 8px 20px;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .military-respect-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: var(--cream-muted);
          background: rgba(10, 9, 14, 0.6);
          padding: 10px 22px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(216, 150, 105, 0.15);
          max-width: 90%;
        }

        .shield-icon {
          color: var(--copper-400);
          flex-shrink: 0;
        }

        .distance-textarea {
          width: 100%;
          background: rgba(10, 9, 14, 0.9);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 10px 14px;
          color: var(--cream-100);
          font-family: inherit;
          font-size: 1rem;
          margin-bottom: 12px;
        }

        @media (max-width: 640px) {
          .distance-card {
            padding: 40px 20px;
          }
          .military-respect-pill {
            font-size: 0.74rem;
            padding: 8px 14px;
          }
        }
      `}</style>
    </section>
  );
}
