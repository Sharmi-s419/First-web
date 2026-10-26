import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Heart, Sparkles, AlertCircle } from 'lucide-react';

export default function RelationshipCounter({
  startDateStr = "2026-10-04T00:00:00",
  anniversaryDateStr = "2026-11-04T00:00:00",
  myName = "KD",
  partnerName = "ROWDY"
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: true,
    isValid: true,
    totalSeconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      if (!startDateStr) {
        setTimeLeft(prev => ({ ...prev, isValid: false }));
        return;
      }

      const start = new Date(startDateStr);
      if (isNaN(start.getTime())) {
        setTimeLeft(prev => ({ ...prev, isValid: false }));
        return;
      }

      const now = new Date();
      const diffMs = now.getTime() - start.getTime();

      // If startDate is in the future vs now
      const isPast = diffMs >= 0;
      const absDiff = Math.abs(diffMs);

      const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((absDiff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((absDiff / (1000 * 60)) % 60);
      const seconds = Math.floor((absDiff / 1000) % 60);
      const totalSeconds = Math.floor(absDiff / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isPast,
        isValid: true,
        totalSeconds
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDateStr]);

  // Format dates for display
  const formatDateDisplay = (dateString) => {
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString;
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formattedStart = formatDateDisplay(startDateStr);
  const formattedAnniversary = formatDateDisplay(anniversaryDateStr);

  return (
    <section className="counter-section" id="counter">
      <div className="container">
        <div className="counter-wrapper copper-card">
          {/* Header */}
          <div className="counter-header">
            <div className="counter-badge">
              <Clock size={14} className="badge-icon" />
              <span>Live Love Counter</span>
            </div>

            <h2 className="counter-title copper-gradient-text">
              {timeLeft.isPast ? "Every Second Together" : "Counting Down to Our Beginning"}
            </h2>

            <p className="counter-subtitle text-romance">
              {timeLeft.isPast
                ? `Cherishing every heartbeat since ${formattedStart} with you, ${partnerName}.`
                : `Anticipating our beginning on ${formattedStart}.`}
            </p>
          </div>

          {!timeLeft.isValid ? (
            <div className="counter-error">
              <AlertCircle size={20} />
              <span>Please set a valid start date in the customizer to see your live counter.</span>
            </div>
          ) : (
            <>
              {/* Counter Grid */}
              <div className="time-grid">
                <TimeBox value={timeLeft.days} label="Days" />
                <div className="time-separator">:</div>
                <TimeBox value={timeLeft.hours} label="Hours" />
                <div className="time-separator">:</div>
                <TimeBox value={timeLeft.minutes} label="Minutes" />
                <div className="time-separator">:</div>
                <TimeBox value={timeLeft.seconds} label="Seconds" isSeconds />
              </div>

              {/* Total Milestones Ticker */}
              <div className="counter-footer">
                <div className="footer-pill">
                  <Calendar size={14} className="pill-icon" />
                  <span>Start Date: <strong>{formattedStart} (4/10/26)</strong></span>
                </div>
                <div className="heart-dot">
                  <Heart size={14} fill="#c88151" color="#c88151" />
                </div>
                <div className="footer-pill">
                  <Sparkles size={14} className="pill-icon" />
                  <span>1st Month Anniversary: <strong>{formattedAnniversary} (4/11/26)</strong></span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .counter-section {
          padding: 40px 0 70px 0;
          position: relative;
        }

        .counter-wrapper {
          padding: 48px 36px;
          border-radius: var(--radius-xl);
          background: linear-gradient(135deg, rgba(20, 19, 27, 0.85) 0%, rgba(14, 13, 19, 0.95) 100%);
          border: 1px solid rgba(216, 150, 105, 0.25);
          box-shadow: 0 20px 50px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(200, 129, 81, 0.1);
          text-align: center;
        }

        .counter-header {
          margin-bottom: 38px;
        }

        .counter-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.76rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--copper-300);
          background: rgba(216, 150, 105, 0.08);
          border: 1px solid rgba(216, 150, 105, 0.2);
          padding: 6px 16px;
          border-radius: var(--radius-full);
          margin-bottom: 16px;
        }

        .badge-icon {
          color: var(--copper-400);
        }

        .counter-title {
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 10px;
        }

        .counter-subtitle {
          font-size: 1.15rem;
          color: var(--cream-300);
          font-style: italic;
        }

        .time-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 36px;
          flex-wrap: nowrap;
        }

        .time-separator {
          font-family: var(--font-serif);
          font-size: 2.2rem;
          font-weight: 700;
          color: var(--copper-400);
          opacity: 0.7;
          margin-top: -24px;
        }

        .time-box {
          background: rgba(24, 22, 33, 0.85);
          border: 1px solid rgba(216, 150, 105, 0.22);
          border-radius: var(--radius-lg);
          padding: 20px 18px;
          min-width: 110px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 8px 24px rgba(0, 0, 0, 0.5);
          transition: var(--transition-smooth);
        }

        .time-box:hover {
          border-color: rgba(216, 150, 105, 0.45);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(216, 150, 105, 0.15);
        }

        .time-box.seconds {
          border-color: rgba(216, 150, 105, 0.35);
        }

        .time-number {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 4.5vw, 3.2rem);
          font-weight: 700;
          color: var(--cream-100);
          line-height: 1;
          margin-bottom: 6px;
          text-shadow: 0 2px 15px rgba(216, 150, 105, 0.3);
        }

        .time-label {
          font-size: 0.75rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--copper-300);
          font-weight: 600;
        }

        .counter-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
          padding-top: 24px;
          border-top: 1px solid rgba(216, 150, 105, 0.12);
        }

        .footer-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--cream-300);
          background: rgba(16, 15, 22, 0.6);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(216, 150, 105, 0.18);
        }

        .footer-pill strong {
          color: var(--copper-200);
          font-weight: 600;
        }

        .pill-icon {
          color: var(--copper-400);
        }

        .heart-dot {
          display: flex;
          align-items: center;
          animation: gentlePulse 2s infinite ease-in-out;
        }

        .counter-error {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          color: #e59080;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .counter-wrapper {
            padding: 32px 18px;
          }
          .time-grid {
            gap: 8px;
          }
          .time-box {
            min-width: 68px;
            padding: 14px 8px;
          }
          .time-number {
            font-size: 1.8rem;
          }
          .time-label {
            font-size: 0.65rem;
            letter-spacing: 0.1em;
          }
          .time-separator {
            font-size: 1.4rem;
            margin-top: -16px;
          }
          .footer-pill {
            font-size: 0.78rem;
            padding: 6px 14px;
          }
        }

        @media (max-width: 480px) {
          .time-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .time-separator {
            display: none;
          }
          .time-box {
            width: 100%;
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}

function TimeBox({ value, label, isSeconds = false }) {
  const formattedValue = String(value).padStart(2, '0');
  return (
    <div className={`time-box ${isSeconds ? 'seconds' : ''}`}>
      <span className="time-number">{formattedValue}</span>
      <span className="time-label">{label}</span>
    </div>
  );
}
