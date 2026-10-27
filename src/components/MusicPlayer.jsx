import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, Music } from 'lucide-react';

export default function MusicPlayer({
  songData = {}
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const audioRef = useRef(null);

  const songTitle = songData?.title || "Our favourite song";
  const songArtist = songData?.artist || "Holding a little piece of us in every note. ❤️";
  const audioSource = songData?.audioUrl || "/audio/apka_baakka.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          setIsPlaying(false);
          setAudioError(true);
        });
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume || 0.7;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  return (
    <section className="section music-section" id="music">
      {/* Background Ambience */}
      <div className="ambient-glow-copper" style={{ top: '20%', right: '10%' }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Music size={13} />
            <span>Soundtrack</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            {songTitle}
          </h2>

          <p className="section-subtitle text-romance">
            {songArtist}
          </p>
        </div>

        {/* Minimal, Elegant Music Player Deck */}
        <div className="music-player-card copper-card">
          <div className="music-left">
            {/* Spinning Vinyl Record */}
            <div className={`vinyl-wrapper ${isPlaying ? 'spinning' : ''}`}>
              <div className="vinyl-disc">
                <div className="vinyl-groove" />
                <div className="vinyl-center">
                  <Heart size={18} fill="#c88151" color="#faebd7" />
                </div>
              </div>
            </div>

            {/* Song Information */}
            <div className="song-info">
              <h3 className="song-title">{songTitle}</h3>
              <p className="song-artist text-romance">{songArtist}</p>

              {/* Subtle animated soundwave bars */}
              <div className={`sound-bars ${isPlaying ? 'active' : ''}`} aria-hidden="true">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
                <span className="bar bar-4" />
                <span className="bar bar-5" />
                <span className="bar bar-6" />
              </div>

              {audioError && (
                <p className="audio-notice">
                  Tap play to listen to “{songTitle}” ❤️
                </p>
              )}
            </div>
          </div>

          {/* Player Controls */}
          <div className="music-controls">
            {/* Play / Pause Button */}
            <button
              type="button"
              className="btn-play-pause"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause Apka Baakka" : "Play Apka Baakka"}
            >
              {isPlaying ? (
                <Pause size={22} className="play-icon" />
              ) : (
                <Play size={22} className="play-icon offset" />
              )}
            </button>

            {/* Volume Control */}
            <div className="volume-control">
              <button
                type="button"
                className="btn-volume"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="volume-slider"
                aria-label="Volume slider"
              />
            </div>
          </div>

          {/* Hidden Audio Element pointing strictly to the requested song */}
          <audio
            ref={audioRef}
            src={audioSource}
            preload="metadata"
            onEnded={handleEnded}
            onError={() => {
              if (isPlaying) {
                setIsPlaying(false);
                setAudioError(true);
              }
            }}
          />
        </div>
      </div>

      <style>{`
        .music-player-card {
          max-width: 720px;
          margin: 0 auto;
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          border-radius: var(--radius-lg);
          background: linear-gradient(135deg, rgba(20, 18, 27, 0.95) 0%, rgba(13, 12, 18, 0.98) 100%);
          border: 1px solid rgba(216, 150, 105, 0.28);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(200, 129, 81, 0.12);
        }

        .music-left {
          display: flex;
          align-items: center;
          gap: 24px;
          flex: 1;
        }

        /* Vinyl Styling */
        .vinyl-wrapper {
          width: 76px;
          height: 76px;
          flex-shrink: 0;
          transition: transform 0.4s ease;
        }

        .vinyl-disc {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #2b2535 0%, #0f0d14 60%, #050508 100%);
          border: 2px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .vinyl-groove {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px dashed rgba(216, 150, 105, 0.2);
        }

        .vinyl-center {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: radial-gradient(circle, #d48b5c 0%, #7d1c2c 100%);
          border: 1.5px solid rgba(250, 235, 215, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .vinyl-wrapper.spinning {
          animation: spinRecord 6s linear infinite;
        }

        @keyframes spinRecord {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .song-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .song-title {
          font-family: var(--font-serif);
          font-size: 1.35rem;
          color: var(--cream-100);
          letter-spacing: 0.04em;
          margin: 0;
        }

        .song-artist {
          font-size: 1.05rem;
          color: var(--copper-300);
          font-style: italic;
          margin: 0;
        }

        /* Soundwave Bars */
        .sound-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 18px;
          margin-top: 6px;
        }

        .bar {
          width: 3px;
          height: 4px;
          background: var(--copper-400);
          border-radius: 2px;
          transition: height 0.2s ease;
        }

        .sound-bars.active .bar-1 { animation: soundPulse 1.2s infinite ease-in-out; }
        .sound-bars.active .bar-2 { animation: soundPulse 0.9s infinite ease-in-out 0.2s; }
        .sound-bars.active .bar-3 { animation: soundPulse 1.4s infinite ease-in-out 0.4s; }
        .sound-bars.active .bar-4 { animation: soundPulse 1.1s infinite ease-in-out 0.1s; }
        .sound-bars.active .bar-5 { animation: soundPulse 1.3s infinite ease-in-out 0.3s; }
        .sound-bars.active .bar-6 { animation: soundPulse 0.8s infinite ease-in-out 0.5s; }

        @keyframes soundPulse {
          0%, 100% { height: 4px; opacity: 0.4; }
          50% { height: 16px; opacity: 1; }
        }

        .audio-notice {
          font-size: 0.78rem;
          color: var(--copper-300);
          font-style: italic;
          margin-top: 4px;
          line-height: 1.3;
        }

        /* Controls */
        .music-controls {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .btn-play-pause {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #e5b38d 0%, #c88151 50%, #8c2535 100%);
          border: 1.5px solid rgba(250, 235, 215, 0.6);
          color: #fffdf9;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px rgba(200, 129, 81, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          flex-shrink: 0;
        }

        .btn-play-pause:hover {
          transform: scale(1.06);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.7), 0 0 28px rgba(200, 129, 81, 0.5);
        }

        .play-icon.offset {
          margin-left: 3px;
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-volume {
          background: transparent;
          border: none;
          color: var(--copper-300);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .btn-volume:hover {
          color: var(--cream-100);
        }

        .volume-slider {
          width: 72px;
          height: 4px;
          accent-color: var(--copper-400);
          background: rgba(216, 150, 105, 0.25);
          border-radius: 2px;
          cursor: pointer;
        }

        @media (max-width: 640px) {
          .music-player-card {
            flex-direction: column;
            padding: 24px 20px;
            text-align: center;
          }
          .music-left {
            flex-direction: column;
            gap: 16px;
          }
          .song-info {
            align-items: center;
          }
          .sound-bars {
            justify-content: center;
          }
          .music-controls {
            width: 100%;
            justify-content: center;
            padding-top: 8px;
            border-top: 1px solid rgba(216, 150, 105, 0.15);
          }
        }
      `}</style>
    </section>
  );
}
