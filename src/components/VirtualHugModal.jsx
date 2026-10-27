import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X, Heart, Sparkles } from 'lucide-react';

/**
 * Animated Virtual Hug Modal for KD & ROWDY
 * Features two cute bunnies (soft cream & warm mocha) moving across the distance,
 * embracing in a warm, living hug with floating hearts and an intimate love message.
 */
export default function VirtualHugModal({
  isOpen,
  onClose,
  partnerName = "ROWDY",
  myName = "KD"
}) {
  const [animationKey, setAnimationKey] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [stage, setStage] = useState('approach'); // 'approach' -> 'hug' -> 'message'
  const [burstHearts, setBurstHearts] = useState([]);
  const modalRef = useRef(null);

  // Format display names: format default "ROWDY" as "Rowdy" to match exact specification
  const formattedPartnerName = partnerName === "ROWDY" ? "Rowdy" : (partnerName || "Rowdy");
  const myDisplayName = myName || "KD";

  // Handle ESC key to close modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Orchestrate animation timeline
  useEffect(() => {
    if (!isOpen) {
      setStage('approach');
      return;
    }

    setStage('approach');

    // 1. Approach phase: bunnies run towards center (0s - 2.1s)
    // 2. Embrace phase: bodies meet, arms wrap around each other (at 2.1s)
    const hugTimer = setTimeout(() => {
      setStage('hug');
    }, 2100);

    // 3. Message reveal phase: sweet note smoothly slides up (at 3.1s)
    const messageTimer = setTimeout(() => {
      setStage('message');
    }, 3100);

    return () => {
      clearTimeout(hugTimer);
      clearTimeout(messageTimer);
    };
  }, [isOpen, animationKey]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 320);
  };

  const handleHugAgain = () => {
    // Generate fresh celebratory floating hearts
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      left: 20 + Math.random() * 60,
      size: 14 + Math.floor(Math.random() * 18),
      delay: Math.random() * 0.3,
      duration: 1.8 + Math.random() * 1.2,
      color: ['#e29b8c', '#d89669', '#f2d2ba', '#b3394b', '#faebd7'][i % 5]
    }));
    setBurstHearts(newHearts);

    // Increment key to re-trigger complete animation sequence
    setAnimationKey((prev) => prev + 1);
  };

  if (!isOpen && !isClosing) return null;

  const modalContent = (
    <div
      className={`hug-modal-backdrop ${isClosing ? 'closing' : 'open'}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Virtual Hug for Rowdy"
    >
      {/* Ambient Starry Backdrop Overlay */}
      <div className="hug-ambient-stars" />
      <div className="hug-glow-orb orb-1" />
      <div className="hug-glow-orb orb-2" />

      {/* Main Modal Card */}
      <div
        className={`hug-modal-card ${isClosing ? 'scale-out' : 'scale-in'}`}
        ref={modalRef}
        key={animationKey}
      >
        {/* Elegant Close Button */}
        <button
          type="button"
          className="hug-close-btn"
          onClick={handleClose}
          aria-label="Close hug modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header Tag */}
        <div className="hug-header-tag">
          <Sparkles size={13} className="sparkle-icon" />
          <span>A Virtual Hug Across The Distance</span>
        </div>

        {/* Animated Characters Scene Viewport */}
        <div className="hug-scene-container">
          {/* Ground shadow / soft moonlight spot */}
          <div className="hug-ground-spot" />

          {/* Floating particle hearts and sparkles around the characters */}
          <div className="hug-ambient-hearts-layer" aria-hidden="true">
            {stage !== 'approach' && (
              <>
                <span className="float-heart fh-1">❤️</span>
                <span className="float-heart fh-2">🤎</span>
                <span className="float-heart fh-3">✨</span>
                <span className="float-heart fh-4">💖</span>
                <span className="float-heart fh-5">✨</span>
                <span className="float-heart fh-6">💕</span>
                <span className="float-heart fh-7">❤️</span>
              </>
            )}

            {/* Extra burst hearts when Hug Me Again is clicked */}
            {burstHearts.map((h) => (
              <span
                key={h.id}
                className="burst-float-heart"
                style={{
                  left: `${h.left}%`,
                  fontSize: `${h.size}px`,
                  color: h.color,
                  animationDelay: `${h.delay}s`,
                  animationDuration: `${h.duration}s`
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          {/* Big Glowing Heart above heads when hugging */}
          <div className={`hug-crowning-heart ${stage !== 'approach' ? 'visible' : ''}`} aria-hidden="true">
            <div className="crowning-heart-halo" />
            <Heart size={44} className="crowning-heart-svg" fill="url(#crowningHeartGrad)" />
          </div>

          {/* Unified SVG Canvas for Character Interaction */}
          <div className={`characters-hug-stage stage-${stage}`}>
            <svg
              viewBox="0 0 360 220"
              className="hug-master-svg"
              aria-label="KD and Rowdy cute bunnies hugging"
            >
              <defs>
                {/* Cream Bunny Gradients */}
                <linearGradient id="creamBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fffdf9" />
                  <stop offset="60%" stopColor="#faebd7" />
                  <stop offset="100%" stopColor="#eed8c0" />
                </linearGradient>
                <linearGradient id="creamTummyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#fff4e8" />
                </linearGradient>
                <linearGradient id="creamInnerEar" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#fce4e8" />
                  <stop offset="100%" stopColor="#f7b5be" />
                </linearGradient>

                {/* Mocha / Warm Brown Bunny Gradients */}
                <linearGradient id="mochaBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#cf8c5b" />
                  <stop offset="55%" stopColor="#b36d3c" />
                  <stop offset="100%" stopColor="#8d4a21" />
                </linearGradient>
                <linearGradient id="mochaTummyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#faebd7" />
                  <stop offset="100%" stopColor="#eed8c0" />
                </linearGradient>
                <linearGradient id="mochaInnerEar" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ebaa9d" />
                  <stop offset="100%" stopColor="#c76c5b" />
                </linearGradient>

                {/* Crowning Heart Gradient */}
                <linearGradient id="crowningHeartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f497a7" />
                  <stop offset="45%" stopColor="#c88151" />
                  <stop offset="100%" stopColor="#8c2535" />
                </linearGradient>

                {/* Soft Blush Filter */}
                <filter id="blushBlur" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" />
                </filter>
              </defs>

              {/* 1. LEFT BUNNY (Soft Cream Bunny - KD) */}
              <g className={`g-bunny g-bunny-left ${stage !== 'approach' ? 'is-hugging' : 'is-approaching'}`}>
                {/* Fluffy tail on left */}
                <circle cx="86" cy="154" r="14" fill="#faebd7" stroke="#eed8c0" strokeWidth="1.5" />
                <circle cx="84" cy="152" r="8" fill="#ffffff" />

                {/* Left Ear */}
                <g className="ear-twitch-left">
                  <path
                    d="M 112,88 C 98,46 96,16 116,14 C 132,12 132,48 126,88 Z"
                    fill="url(#creamBodyGrad)"
                    stroke="#eed8c0"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 114,82 C 104,50 104,26 116,24 C 126,22 126,50 122,82 Z"
                    fill="url(#creamInnerEar)"
                  />
                </g>

                {/* Right Ear */}
                <g className="ear-twitch-right">
                  <path
                    d="M 142,86 C 140,46 156,16 170,20 C 184,24 174,54 156,90 Z"
                    fill="url(#creamBodyGrad)"
                    stroke="#eed8c0"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 146,80 C 146,50 158,28 166,30 C 174,32 168,56 156,82 Z"
                    fill="url(#creamInnerEar)"
                  />
                </g>

                {/* Feet */}
                <ellipse cx="118" cy="180" rx="15" ry="9" fill="#faebd7" stroke="#eed8c0" strokeWidth="1.5" />
                <ellipse cx="148" cy="180" rx="15" ry="9" fill="#faebd7" stroke="#eed8c0" strokeWidth="1.5" />
                <ellipse cx="118" cy="182" rx="5" ry="3.5" fill="#f7b5be" opacity="0.6" />
                <ellipse cx="148" cy="182" rx="5" ry="3.5" fill="#f7b5be" opacity="0.6" />

                {/* Body & Cream Tummy */}
                <ellipse cx="134" cy="144" rx="40" ry="36" fill="url(#creamBodyGrad)" stroke="#eed8c0" strokeWidth="1.5" />
                <ellipse cx="138" cy="146" rx="25" ry="23" fill="url(#creamTummyGrad)" />

                {/* Head */}
                <ellipse cx="134" cy="102" rx="38" ry="34" fill="url(#creamBodyGrad)" stroke="#eed8c0" strokeWidth="1.5" />

                {/* Rosy Cheeks */}
                <ellipse cx="112" cy="112" rx="9.5" ry="6" fill="#f497a7" filter="url(#blushBlur)" opacity="0.8" />
                <ellipse cx="158" cy="112" rx="9.5" ry="6" fill="#f497a7" filter="url(#blushBlur)" opacity="0.8" />

                {/* Eyes: Open when approaching, closed happy arcs when hugging */}
                {stage === 'approach' ? (
                  <g className="eyes-open">
                    <ellipse cx="122" cy="99" rx="6" ry="7.5" fill="#1e181c" />
                    <circle cx="120" cy="96" r="2.4" fill="#ffffff" />
                    <circle cx="124" cy="101" r="1.1" fill="#ffffff" />

                    <ellipse cx="150" cy="99" rx="6" ry="7.5" fill="#1e181c" />
                    <circle cx="148" cy="96" r="2.4" fill="#ffffff" />
                    <circle cx="152" cy="101" r="1.1" fill="#ffffff" />
                  </g>
                ) : (
                  <g className="eyes-hugging">
                    <path
                      d="M 115,100 Q 122,92 129,100"
                      fill="none"
                      stroke="#422926"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 143,100 Q 150,92 157,100"
                      fill="none"
                      stroke="#422926"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Nose & Sweet Smile */}
                <path
                  d="M 134,107 C 131.5,107 130,109 132,111.5 L 134,114 L 136,111.5 C 138,109 136.5,107 134,107 Z"
                  fill="#ea8895"
                />
                <path
                  d="M 129,114 Q 132,118 134,115 Q 136,118 139,114"
                  fill="none"
                  stroke="#5d3b36"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Back Left Arm */}
                <ellipse cx="102" cy="140" rx="8" ry="15" transform="rotate(-15 102 140)" fill="url(#creamBodyGrad)" stroke="#eed8c0" strokeWidth="1.2" />

                {/* Front Arm: Reaching when approaching, wrapping around Rowdy when hugging */}
                {stage === 'approach' ? (
                  <g className="arm-reaching">
                    <path
                      d="M 154,134 Q 178,128 196,138 Q 194,148 172,146 Q 154,144 152,138 Z"
                      fill="url(#creamBodyGrad)"
                      stroke="#eed8c0"
                      strokeWidth="1.5"
                    />
                    <circle cx="194" cy="138" r="5.5" fill="#faebd7" />
                  </g>
                ) : (
                  <g className="arm-wrapping-cream">
                    {/* Wraps around Rowdy's back with paw clasping */}
                    <path
                      d="M 152,134 C 176,126 206,134 228,146 C 224,156 198,148 154,148 Z"
                      fill="url(#creamBodyGrad)"
                      stroke="#eed8c0"
                      strokeWidth="1.8"
                    />
                    <ellipse cx="224" cy="146" rx="7.5" ry="6" fill="#fffdf9" stroke="#eed8c0" strokeWidth="1.2" />
                  </g>
                )}
              </g>

              {/* 2. RIGHT BUNNY (Warm Mocha Cinnamon Bunny - ROWDY) */}
              <g className={`g-bunny g-bunny-right ${stage !== 'approach' ? 'is-hugging' : 'is-approaching'}`}>
                {/* Fluffy tail on right */}
                <circle cx="274" cy="154" r="14" fill="#b36d3c" stroke="#8d4a21" strokeWidth="1.5" />
                <circle cx="276" cy="152" r="8" fill="#cf8c5b" />

                {/* Left Ear */}
                <g className="ear-twitch-left">
                  <path
                    d="M 218,86 C 210,50 198,18 212,14 C 226,10 240,42 238,84 Z"
                    fill="url(#mochaBodyGrad)"
                    stroke="#8d4a21"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 218,81 C 210,52 202,26 212,24 C 222,22 232,46 232,77 Z"
                    fill="url(#mochaInnerEar)"
                  />
                </g>

                {/* Right Ear */}
                <g className="ear-twitch-right">
                  <path
                    d="M 248,88 C 242,48 240,12 260,14 C 280,16 280,46 268,88 Z"
                    fill="url(#mochaBodyGrad)"
                    stroke="#8d4a21"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 250,82 C 248,52 246,24 260,24 C 270,26 270,50 262,82 Z"
                    fill="url(#mochaInnerEar)"
                  />
                </g>

                {/* Feet */}
                <ellipse cx="212" cy="180" rx="15" ry="9" fill="#b36d3c" stroke="#8d4a21" strokeWidth="1.5" />
                <ellipse cx="242" cy="180" rx="15" ry="9" fill="#b36d3c" stroke="#8d4a21" strokeWidth="1.5" />
                <ellipse cx="212" cy="182" rx="5" ry="3.5" fill="#e29b8c" opacity="0.6" />
                <ellipse cx="242" cy="182" rx="5" ry="3.5" fill="#e29b8c" opacity="0.6" />

                {/* Body & Warm Chest Patch */}
                <ellipse cx="226" cy="144" rx="40" ry="36" fill="url(#mochaBodyGrad)" stroke="#8d4a21" strokeWidth="1.5" />
                <ellipse cx="222" cy="146" rx="25" ry="23" fill="url(#mochaTummyGrad)" />

                {/* Head */}
                <ellipse cx="226" cy="102" rx="38" ry="34" fill="url(#mochaBodyGrad)" stroke="#8d4a21" strokeWidth="1.5" />

                {/* Warm Rosy Cheeks */}
                <ellipse cx="202" cy="112" rx="9.5" ry="6" fill="#e06c75" filter="url(#blushBlur)" opacity="0.8" />
                <ellipse cx="248" cy="112" rx="9.5" ry="6" fill="#e06c75" filter="url(#blushBlur)" opacity="0.8" />

                {/* Eyes: Open when approaching, closed happy arcs when hugging */}
                {stage === 'approach' ? (
                  <g className="eyes-open">
                    <ellipse cx="210" cy="99" rx="6" ry="7.5" fill="#1e181c" />
                    <circle cx="212" cy="96" r="2.4" fill="#ffffff" />
                    <circle cx="208" cy="101" r="1.1" fill="#ffffff" />

                    <ellipse cx="238" cy="99" rx="6" ry="7.5" fill="#1e181c" />
                    <circle cx="240" cy="96" r="2.4" fill="#ffffff" />
                    <circle cx="236" cy="101" r="1.1" fill="#ffffff" />
                  </g>
                ) : (
                  <g className="eyes-hugging">
                    <path
                      d="M 203,100 Q 210,92 217,100"
                      fill="none"
                      stroke="#2d160e"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 231,100 Q 238,92 245,100"
                      fill="none"
                      stroke="#2d160e"
                      strokeWidth="3.2"
                      strokeLinecap="round"
                    />
                  </g>
                )}

                {/* Nose & Sweet Smile */}
                <path
                  d="M 226,107 C 223.5,107 222,109 224,111.5 L 226,114 L 228,111.5 C 230,109 228.5,107 226,107 Z"
                  fill="#783d25"
                />
                <path
                  d="M 221,114 Q 224,118 226,115 Q 228,118 231,114"
                  fill="none"
                  stroke="#3e1d11"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />

                {/* Back Right Arm */}
                <ellipse cx="258" cy="140" rx="8" ry="15" transform="rotate(15 258 140)" fill="url(#mochaBodyGrad)" stroke="#8d4a21" strokeWidth="1.2" />

                {/* Front Left Arm: Reaching when approaching, wrapping around KD when hugging */}
                {stage === 'approach' ? (
                  <g className="arm-reaching">
                    <path
                      d="M 206,134 Q 182,128 164,138 Q 166,148 188,146 Q 206,144 208,138 Z"
                      fill="url(#mochaBodyGrad)"
                      stroke="#8d4a21"
                      strokeWidth="1.5"
                    />
                    <circle cx="166" cy="138" r="5.5" fill="#cf8c5b" />
                  </g>
                ) : (
                  <g className="arm-wrapping-mocha">
                    {/* Wraps lovingly across KD's waist in front! */}
                    <path
                      d="M 206,136 C 182,128 148,138 126,148 C 130,158 160,150 206,148 Z"
                      fill="url(#mochaBodyGrad)"
                      stroke="#8d4a21"
                      strokeWidth="1.8"
                    />
                    <ellipse cx="130" cy="148" rx="7.5" ry="6" fill="#cf8c5b" stroke="#8d4a21" strokeWidth="1.2" />
                  </g>
                )}
              </g>

              {/* Name Tags (Visible only during approach to clearly identify each lover) */}
              <g className={`g-name-tags ${stage === 'approach' ? 'visible' : 'hidden'}`}>
                {/* KD tag under left bunny */}
                <rect x="114" y="196" width="40" height="18" rx="9" fill="rgba(18, 16, 24, 0.85)" stroke="rgba(216, 150, 105, 0.35)" strokeWidth="1" />
                <text x="134" y="209" textAnchor="middle" fill="#f2d2ba" fontSize="10" fontWeight="bold" fontFamily="sans-serif">KD</text>

                {/* ROWDY tag under right bunny */}
                <rect x="200" y="196" width="52" height="18" rx="9" fill="rgba(18, 16, 24, 0.85)" stroke="rgba(216, 150, 105, 0.35)" strokeWidth="1" />
                <text x="226" y="209" textAnchor="middle" fill="#f2d2ba" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ROWDY</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Romantic Hug Note (Appears smoothly after embrace) */}
        <div className={`hug-message-section ${stage === 'message' ? 'visible' : ''}`}>
          <div className="hug-message-divider">
            <span className="divider-line" />
            <Heart size={14} className="divider-heart" fill="#c88151" />
            <span className="divider-line" />
          </div>

          <h3 className="hug-message-title">
            <span className="copper-gradient-text">A Little Hug, Just for You, {formattedPartnerName}.</span> <span className="emoji-red-heart">❤️</span>
          </h3>

          <p className="hug-message-quote text-romance">
            “Even when I can't be beside you, imagine me holding you close. No distance can change how special you are to me.”
          </p>

          <p className="hug-message-signoff">
            Forever sending you hugs,<br />
            <span className="signoff-name">Your {myDisplayName}</span> <span className="emoji-brown-heart">🤎</span>
          </p>

          {/* Interactive Action Buttons */}
          <div className="hug-actions-row">
            <button
              type="button"
              className="btn-hug-again"
              onClick={handleHugAgain}
              aria-label="Hug Me Again"
            >
              <Heart size={16} fill="#faebd7" className="hug-btn-heart" />
              <span>Hug Me Again ❤️</span>
            </button>

            <button
              type="button"
              className="btn-hug-close"
              onClick={handleClose}
              aria-label="Close"
            >
              <span>Close</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        /* Modal Overlay Backdrop */
        .hug-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: grid;
          place-items: center;
          background: rgba(4, 4, 7, 0.88);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 24px 16px;
          opacity: 0;
          transition: opacity 0.32s ease;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .hug-modal-backdrop.open {
          opacity: 1;
        }

        .hug-modal-backdrop.closing {
          opacity: 0;
          pointer-events: none;
        }

        /* Ambient Stars & Soft Glow */
        .hug-ambient-stars {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #faebd7, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 120px 80px, #f2d2ba, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 240px 150px, #ffffff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 380px 60px, #faebd7, rgba(0,0,0,0)),
            radial-gradient(1px 1px at 520px 220px, #e5b38d, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 700px 110px, #faebd7, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 750px 350px;
          opacity: 0.45;
          pointer-events: none;
        }

        .hug-glow-orb {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.16;
        }

        .orb-1 {
          top: 15%;
          left: 20%;
          background: #c88151;
        }

        .orb-2 {
          bottom: 15%;
          right: 20%;
          background: #8c2535;
        }

        /* Modal Card Container */
        .hug-modal-card {
          position: relative;
          width: 100%;
          max-width: 530px;
          background: linear-gradient(160deg, rgba(18, 16, 25, 0.96) 0%, rgba(10, 9, 15, 0.98) 100%);
          border: 1.5px solid rgba(216, 150, 105, 0.4);
          border-radius: var(--radius-xl, 26px);
          padding: 26px 22px 22px 22px;
          box-shadow: 
            0 25px 70px rgba(0, 0, 0, 0.9),
            0 0 45px rgba(200, 129, 81, 0.22),
            inset 0 1px 0 rgba(250, 235, 215, 0.15);
          text-align: center;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.32s ease;
          overflow: visible;
        }

        .hug-modal-card.scale-in {
          animation: modalPopIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hug-modal-card.scale-out {
          animation: modalPopOut 0.3s ease forwards;
        }

        @keyframes modalPopIn {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes modalPopOut {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.92) translateY(14px);
          }
        }

        /* Close Button */
        .hug-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(30, 26, 38, 0.85);
          border: 1px solid rgba(216, 150, 105, 0.3);
          color: var(--copper-200, #f2d2ba);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.25s ease;
          z-index: 20;
        }

        .hug-close-btn:hover {
          background: rgba(200, 129, 81, 0.35);
          color: #ffffff;
          transform: scale(1.1) rotate(90deg);
          border-color: var(--copper-400, #d89669);
        }

        /* Header Pill Tag */
        .hug-header-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.74rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--copper-300, #e5b38d);
          background: rgba(200, 129, 81, 0.14);
          padding: 6px 16px;
          border-radius: var(--radius-full, 9999px);
          border: 1px solid rgba(216, 150, 105, 0.28);
          margin-bottom: 12px;
        }

        .sparkle-icon {
          color: var(--copper-400, #d89669);
          animation: gentlePulse 2s infinite ease-in-out;
        }

        /* Animation Scene Viewport */
        .hug-scene-container {
          position: relative;
          width: 100%;
          height: 180px;
          margin: 0 auto 6px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hug-master-svg {
          width: 100%;
          max-width: 380px;
          height: 100%;
          overflow: visible;
          filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.5));
        }

        /* Ground spot shadow */
        .hug-ground-spot {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 32px;
          background: radial-gradient(ellipse at center, rgba(200, 129, 81, 0.35) 0%, rgba(140, 37, 53, 0.15) 50%, transparent 75%);
          border-radius: 50%;
          filter: blur(10px);
          pointer-events: none;
        }

        /* Floating Hearts Layer */
        .hug-ambient-hearts-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }

        .float-heart {
          position: absolute;
          animation: floatHeartRise 3.5s infinite ease-in-out;
          opacity: 0;
          font-size: 1.15rem;
        }

        .fh-1 { left: 46%; bottom: 35%; animation-delay: 0.1s; }
        .fh-2 { left: 52%; bottom: 40%; animation-delay: 0.8s; }
        .fh-3 { left: 42%; bottom: 30%; animation-delay: 1.4s; font-size: 0.9rem; }
        .fh-4 { left: 56%; bottom: 38%; animation-delay: 2.1s; }
        .fh-5 { left: 49%; bottom: 45%; animation-delay: 2.7s; font-size: 0.85rem; }
        .fh-6 { left: 38%; bottom: 32%; animation-delay: 3.2s; }
        .fh-7 { left: 60%; bottom: 34%; animation-delay: 1.9s; }

        @keyframes floatHeartRise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6) rotate(0deg);
          }
          25% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            opacity: 0;
            transform: translateY(-90px) scale(1.2) rotate(20deg);
          }
        }

        /* Burst hearts on Replay */
        .burst-float-heart {
          position: absolute;
          bottom: 20%;
          pointer-events: none;
          animation: burstRise 2.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes burstRise {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.3);
          }
          20% {
            opacity: 1;
            transform: translateY(-20px) scale(1.1);
          }
          100% {
            opacity: 0;
            transform: translateY(-130px) scale(0.8) rotate(15deg);
          }
        }

        /* Crowning Heart Above Heads */
        .hug-crowning-heart {
          position: absolute;
          top: -2px;
          left: 50%;
          transform: translateX(-50%) scale(0);
          opacity: 0;
          transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.5s ease;
          z-index: 6;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .hug-crowning-heart.visible {
          opacity: 1;
          transform: translateX(-50%) scale(1);
          animation: crownHeartThrob 2.2s infinite ease-in-out;
        }

        .crowning-heart-halo {
          position: absolute;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(244, 151, 167, 0.5) 0%, rgba(200, 129, 81, 0.28) 50%, transparent 75%);
          filter: blur(12px);
        }

        .crowning-heart-svg {
          filter: drop-shadow(0 0 14px rgba(200, 129, 81, 0.75));
        }

        @keyframes crownHeartThrob {
          0%, 100% {
            transform: translateX(-50%) scale(1);
            filter: drop-shadow(0 0 12px rgba(200, 129, 81, 0.6));
          }
          50% {
            transform: translateX(-50%) scale(1.15);
            filter: drop-shadow(0 0 24px rgba(220, 80, 100, 0.9));
          }
        }

        /* Stage Characters Container */
        .characters-hug-stage {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ear Twitches */
        .ear-twitch-left {
          transform-origin: 120px 88px;
          animation: earWiggleL 3.8s infinite ease-in-out;
        }

        .ear-twitch-right {
          transform-origin: 150px 88px;
          animation: earWiggleR 4.4s infinite ease-in-out;
        }

        @keyframes earWiggleL {
          0%, 80%, 100% { transform: rotate(0deg); }
          86% { transform: rotate(-5deg); }
          92% { transform: rotate(3deg); }
        }

        @keyframes earWiggleR {
          0%, 75%, 100% { transform: rotate(0deg); }
          82% { transform: rotate(5deg); }
          90% { transform: rotate(-3deg); }
        }

        /* Name tags visibility */
        .g-name-tags {
          transition: opacity 0.4s ease;
        }

        .g-name-tags.visible {
          opacity: 0.9;
        }

        .g-name-tags.hidden {
          opacity: 0;
          pointer-events: none;
        }

        /* APPROACH ANIMATIONS (0s - 2.1s): */
        .stage-approach .g-bunny-left {
          animation: gHopApproachLeft 2.1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-origin: 134px 180px;
        }

        .stage-approach .g-bunny-right {
          animation: gHopApproachRight 2.1s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          transform-origin: 226px 180px;
        }

        @keyframes gHopApproachLeft {
          0% {
            transform: translateX(-88px) translateY(0);
          }
          18% {
            transform: translateX(-68px) translateY(-12px) rotate(4deg);
          }
          36% {
            transform: translateX(-48px) translateY(0) rotate(0deg);
          }
          54% {
            transform: translateX(-30px) translateY(-14px) rotate(5deg);
          }
          72% {
            transform: translateX(-14px) translateY(0) rotate(0deg);
          }
          88% {
            transform: translateX(10px) translateY(-8px) rotate(4deg);
          }
          100% {
            transform: translateX(24px) translateY(0) rotate(3deg);
          }
        }

        @keyframes gHopApproachRight {
          0% {
            transform: translateX(88px) translateY(0);
          }
          18% {
            transform: translateX(68px) translateY(-12px) rotate(-4deg);
          }
          36% {
            transform: translateX(48px) translateY(0) rotate(0deg);
          }
          54% {
            transform: translateX(30px) translateY(-14px) rotate(-5deg);
          }
          72% {
            transform: translateX(14px) translateY(0) rotate(0deg);
          }
          88% {
            transform: translateX(-10px) translateY(-8px) rotate(-4deg);
          }
          100% {
            transform: translateX(-24px) translateY(0) rotate(-3deg);
          }
        }

        /* HUG & SWAY PHASE (2.1s onwards): */
        .stage-hug .g-bunny-left,
        .stage-message .g-bunny-left {
          transform: translateX(24px) rotate(3.5deg);
          animation: gEmbraceContactLeft 0.5s ease-out, gSwayTogetherL 3.4s 0.5s infinite ease-in-out;
          transform-origin: 134px 180px;
        }

        .stage-hug .g-bunny-right,
        .stage-message .g-bunny-right {
          transform: translateX(-24px) rotate(-3.5deg);
          animation: gEmbraceContactRight 0.5s ease-out, gSwayTogetherR 3.4s 0.5s infinite ease-in-out;
          transform-origin: 226px 180px;
        }

        @keyframes gEmbraceContactLeft {
          0% {
            transform: translateX(24px) scale(1, 1) rotate(3deg);
          }
          40% {
            transform: translateX(28px) scale(1.06, 0.94) rotate(5.5deg);
          }
          80% {
            transform: translateX(23px) scale(0.98, 1.02) rotate(3deg);
          }
          100% {
            transform: translateX(24px) scale(1, 1) rotate(3.5deg);
          }
        }

        @keyframes gEmbraceContactRight {
          0% {
            transform: translateX(-24px) scale(1, 1) rotate(-3deg);
          }
          40% {
            transform: translateX(-28px) scale(1.06, 0.94) rotate(-5.5deg);
          }
          80% {
            transform: translateX(-23px) scale(0.98, 1.02) rotate(-3deg);
          }
          100% {
            transform: translateX(-24px) scale(1, 1) rotate(-3.5deg);
          }
        }

        @keyframes gSwayTogetherL {
          0%, 100% {
            transform: translateX(24px) translateY(0) rotate(3.5deg);
          }
          50% {
            transform: translateX(26px) translateY(-3.5px) rotate(5.5deg);
          }
        }

        @keyframes gSwayTogetherR {
          0%, 100% {
            transform: translateX(-24px) translateY(0) rotate(-3.5deg);
          }
          50% {
            transform: translateX(-26px) translateY(-3.5px) rotate(-5.5deg);
          }
        }

        /* Romantic Message Section */
        .hug-message-section {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .hug-message-section.visible {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .hug-message-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          margin: 4px 0 14px 0;
        }

        .divider-line {
          height: 1px;
          width: 70px;
          background: linear-gradient(90deg, transparent, rgba(216, 150, 105, 0.45), transparent);
        }

        .divider-heart {
          animation: gentlePulse 2s infinite ease-in-out;
        }

        .hug-message-title {
          font-family: var(--font-romance, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.4rem, 3.4vw, 1.85rem);
          font-weight: 700;
          margin-bottom: 10px;
          letter-spacing: 0.02em;
          line-height: 1.3;
        }

        .emoji-red-heart {
          display: inline-block;
          -webkit-text-fill-color: initial;
          animation: gentlePulse 2s infinite ease-in-out;
        }

        .emoji-brown-heart {
          display: inline-block;
          -webkit-text-fill-color: initial;
        }

        .hug-message-quote {
          font-family: var(--font-romance, 'Cormorant Garamond', Georgia, serif);
          font-size: clamp(1.08rem, 2.6vw, 1.25rem);
          font-style: italic;
          color: var(--cream-100, #fffdf9);
          line-height: 1.55;
          max-width: 480px;
          margin: 0 auto 14px auto;
          text-shadow: 0 2px 14px rgba(0, 0, 0, 0.7);
        }

        .hug-message-signoff {
          font-size: 0.95rem;
          color: var(--cream-300, #ede4d2);
          line-height: 1.55;
          margin-bottom: 22px;
        }

        .signoff-name {
          font-weight: 700;
          color: var(--copper-200, #f2d2ba);
        }

        /* Action Buttons */
        .hug-actions-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-hug-again {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: linear-gradient(135deg, #c88151 0%, #8c2535 100%);
          color: #ffffff;
          font-family: var(--font-sans, sans-serif);
          font-size: 0.95rem;
          font-weight: 600;
          padding: 12px 28px;
          border-radius: var(--radius-full, 9999px);
          border: 1px solid rgba(250, 235, 215, 0.45);
          cursor: pointer;
          transition: var(--transition-bounce, all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1));
          box-shadow: 0 8px 24px rgba(140, 37, 53, 0.4), 0 0 18px rgba(200, 129, 81, 0.25);
        }

        .btn-hug-again:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 12px 30px rgba(140, 37, 53, 0.55), 0 0 25px rgba(216, 150, 105, 0.4);
          border-color: #faebd7;
        }

        .hug-btn-heart {
          animation: gentlePulse 1.2s infinite ease-in-out;
        }

        .btn-hug-close {
          display: inline-flex;
          align-items: center;
          background: rgba(24, 21, 32, 0.9);
          color: var(--cream-300, #ede4d2);
          font-family: var(--font-sans, sans-serif);
          font-size: 0.92rem;
          font-weight: 500;
          padding: 12px 24px;
          border-radius: var(--radius-full, 9999px);
          border: 1px solid rgba(216, 150, 105, 0.28);
          cursor: pointer;
          transition: var(--transition-smooth, all 0.3s ease);
        }

        .btn-hug-close:hover {
          background: rgba(36, 32, 48, 0.95);
          color: var(--cream-100, #fffdf9);
          border-color: rgba(216, 150, 105, 0.5);
        }

        /* Reduced Motion Accessibility Settings */
        @media (prefers-reduced-motion: reduce) {
          .stage-approach .g-bunny-left,
          .stage-approach .g-bunny-right,
          .stage-hug .g-bunny-left,
          .stage-hug .g-bunny-right,
          .stage-message .g-bunny-left,
          .stage-message .g-bunny-right {
            animation: none !important;
            transition: none !important;
          }

          .stage-approach .g-bunny-left {
            transform: translateX(24px) rotate(3deg);
          }
          .stage-approach .g-bunny-right {
            transform: translateX(-24px) rotate(-3deg);
          }

          .float-heart,
          .burst-float-heart,
          .hug-crowning-heart {
            animation: none !important;
          }

          .hug-modal-card.scale-in {
            animation: none !important;
            opacity: 1;
            transform: scale(1);
          }
        }

        /* Mobile & Tablet Responsiveness */
        @media (max-width: 640px) {
          .hug-modal-card {
            padding: 28px 16px 24px 16px;
            border-radius: 20px;
          }

          .hug-scene-container {
            height: 185px;
            margin-bottom: 8px;
          }

          .hug-message-title {
            font-size: 1.35rem;
          }

          .hug-message-quote {
            font-size: 1.05rem;
          }

          .btn-hug-again {
            padding: 11px 22px;
            font-size: 0.9rem;
          }

          .btn-hug-close {
            padding: 11px 20px;
            font-size: 0.88rem;
          }
        }
      `}</style>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
