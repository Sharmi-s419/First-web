import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Upload, 
  Link as LinkIcon, 
  Edit2, 
  Check, 
  Radio, 
  Heart,
  Disc3
} from 'lucide-react';
import { romanticSynth } from '../utils/audioSynthesizer';
import { saveMediaItem, getMediaItem } from '../utils/storage';

export default function MusicPlayer({
  songData = {},
  onUpdateSong,
  isEditMode = false
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [sourceType, setSourceType] = useState(songData.audioSourceType || 'synth'); // 'synth' | 'url' | 'file'
  const [customAudioUrl, setCustomAudioUrl] = useState(songData.audioUrl || '');
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [title, setTitle] = useState(songData.title || "Golden Hour Melody");
  const [artist, setArtist] = useState(songData.artist || "Dedicated to KD & ROWDY");
  const [showUrlInput, setShowUrlInput] = useState(false);

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load custom uploaded file if previously saved
  useEffect(() => {
    async function loadSavedAudio() {
      if (sourceType === 'file') {
        const savedBlob = await getMediaItem('custom_song_file');
        if (savedBlob && audioRef.current) {
          audioRef.current.src = URL.createObjectURL(savedBlob);
        }
      }
    }
    loadSavedAudio();
  }, [sourceType]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (sourceType === 'synth') {
      if (isPlaying) {
        romanticSynth.stop();
        setIsPlaying(false);
      } else {
        romanticSynth.setVolume(isMuted ? 0 : volume);
        romanticSynth.start();
        setIsPlaying(true);
      }
    } else {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.warn('Audio play error, falling back to synth:', err);
            // Fallback to synth if custom url failed
            setSourceType('synth');
            romanticSynth.setVolume(volume);
            romanticSynth.start();
            setIsPlaying(true);
          });
      }
    }
  };

  // Handle Volume change
  const handleVolumeChange = (newVol) => {
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (sourceType === 'synth') {
      romanticSynth.setVolume(newVol);
    } else if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      handleVolumeChange(volume || 0.5);
    } else {
      setIsMuted(true);
      if (sourceType === 'synth') {
        romanticSynth.setVolume(0);
      } else if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
  };

  // Switch to Built-in Romantic Ambient Synth
  const handleUseSynth = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSourceType('synth');
    const wasPlaying = isPlaying;
    if (wasPlaying) {
      romanticSynth.setVolume(volume);
      romanticSynth.start();
    }
    onUpdateSong({
      ...songData,
      title,
      artist,
      audioSourceType: 'synth'
    });
  };

  // File Upload
  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (isPlaying) {
      romanticSynth.stop();
    }

    try {
      await saveMediaItem('custom_song_file', file);
      const objectUrl = URL.createObjectURL(file);
      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
      setSourceType('file');
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
      onUpdateSong({
        ...songData,
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Our Song',
        audioSourceType: 'file',
        customName: file.name
      });
    } catch (err) {
      alert('Could not load audio file. Using romantic synthesizer instead.');
      handleUseSynth();
    }
  };

  // Save URL
  const handleSaveUrl = () => {
    if (!customAudioUrl.trim()) return;
    if (isPlaying) {
      romanticSynth.stop();
    }
    setSourceType('url');
    if (audioRef.current) {
      audioRef.current.src = customAudioUrl;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
    setShowUrlInput(false);
    onUpdateSong({
      ...songData,
      audioUrl: customAudioUrl,
      audioSourceType: 'url'
    });
  };

  // Save Meta
  const handleSaveInfo = () => {
    setIsEditingInfo(false);
    onUpdateSong({
      ...songData,
      title,
      artist
    });
  };

  return (
    <section className="section music-section" id="music">
      {/* Background Ambience */}
      <div className="ambient-glow-copper" style={{ top: '20%', right: '10%' }} />

      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Music size={13} />
            <span>Our Melody</span>
          </div>

          <h2 className="section-title copper-gradient-text">
            Our Song 🎵
          </h2>

          <p className="section-subtitle text-romance">
            The soundtrack to our quiet moments and late-night thoughts.
          </p>
        </div>

        {/* Music Player Deck */}
        <div className="music-player-card copper-card">
          <div className="music-left">
            {/* Spinning Vinyl Record */}
            <div className={`vinyl-wrapper ${isPlaying ? 'spinning' : ''}`}>
              <div className="vinyl-disc">
                <div className="vinyl-groove" />
                <div className="vinyl-center">
                  <Heart size={20} fill="#c88151" color="#faebd7" />
                </div>
              </div>
            </div>

            {/* Song Meta */}
            <div className="song-info">
              {isEditingInfo ? (
                <div className="song-info-edit">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Song Title"
                    className="music-input"
                  />
                  <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Artist Name"
                    className="music-input"
                  />
                  <button type="button" className="btn-action save" onClick={handleSaveInfo}>
                    <Check size={14} /> Done
                  </button>
                </div>
              ) : (
                <>
                  <div className="song-title-row">
                    <h3 className="song-title">{title}</h3>
                    {isEditMode && (
                      <button
                        type="button"
                        className="btn-edit-title"
                        onClick={() => setIsEditingInfo(true)}
                        title="Edit title & artist"
                      >
                        <Edit2 size={13} />
                      </button>
                    )}
                  </div>
                  <p className="song-artist text-romance">{artist}</p>
                  <span className="source-badge">
                    {sourceType === 'synth' && '✨ Ambient Romantic Chords'}
                    {sourceType === 'file' && '📁 Uploaded Track'}
                    {sourceType === 'url' && '🔗 Custom Web Audio'}
                  </span>
                </>
              )}

              {/* Animated visualizer bars */}
              <div className="visualizer-bars">
                {[40, 75, 55, 90, 60, 85, 45, 95, 70, 50].map((h, i) => (
                  <span
                    key={i}
                    className={`bar ${isPlaying ? 'active' : ''}`}
                    style={{
                      height: isPlaying ? `${h}%` : '15%',
                      animationDelay: `${i * 0.15}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Controls Right */}
          <div className="music-right">
            {/* Play/Pause Button */}
            <button
              type="button"
              className={`btn-play-pause ${isPlaying ? 'playing' : ''}`}
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause song' : 'Play song'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: 3 }} />}
            </button>

            {/* Volume Control */}
            <div className="volume-control">
              <button
                type="button"
                className="btn-volume-mute"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
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
        </div>

        {/* Source Switcher Toolbar */}
        <div className="music-toolbar">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            style={{ display: 'none' }}
          />

          <button
            type="button"
            className={`btn-toolbar ${sourceType === 'synth' ? 'active' : ''}`}
            onClick={handleUseSynth}
          >
            <Radio size={14} />
            <span>Romantic Melody (Built-in)</span>
          </button>

          <button
            type="button"
            className={`btn-toolbar ${sourceType === 'file' ? 'active' : ''}`}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
          >
            <Upload size={14} />
            <span>Upload Our Song (MP3)</span>
          </button>

          <button
            type="button"
            className={`btn-toolbar ${sourceType === 'url' ? 'active' : ''}`}
            onClick={() => setShowUrlInput(!showUrlInput)}
          >
            <LinkIcon size={14} />
            <span>Audio URL</span>
          </button>
        </div>

        {/* URL Input dropdown */}
        {showUrlInput && (
          <div className="url-input-card copper-card">
            <input
              type="url"
              value={customAudioUrl}
              onChange={(e) => setCustomAudioUrl(e.target.value)}
              placeholder="Paste direct audio URL (https://...mp3)"
              className="music-input"
            />
            <button type="button" className="btn-copper-primary" onClick={handleSaveUrl}>
              Load URL
            </button>
          </div>
        )}

        {/* Hidden HTML5 Audio Element for custom files/urls */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            console.warn('Audio tag failed, falling back to synth');
            handleUseSynth();
          }}
          preload="none"
        />
      </div>

      <style>{`
        .music-player-card {
          padding: 36px 42px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(20, 18, 27, 0.9) 0%, rgba(13, 12, 18, 0.95) 100%);
          gap: 32px;
          margin-bottom: 24px;
        }

        .music-left {
          display: flex;
          align-items: center;
          gap: 28px;
          flex: 1;
        }

        /* Vinyl Record */
        .vinyl-wrapper {
          position: relative;
          width: 90px;
          height: 90px;
          flex-shrink: 0;
        }

        .vinyl-disc {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #2b2836 20%, #15141c 60%, #09080c 100%);
          border: 2px solid rgba(216, 150, 105, 0.35);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.8), 0 0 15px rgba(200, 129, 81, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .spinning .vinyl-disc {
          animation: spinRecord 6s linear infinite;
        }

        @keyframes spinRecord {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .vinyl-groove {
          position: absolute;
          width: 68px;
          height: 68px;
          border-radius: 50%;
          border: 1px dashed rgba(216, 150, 105, 0.18);
        }

        .vinyl-center {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #100f16;
          border: 1.5px solid var(--copper-400);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        }

        .song-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .song-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .song-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: var(--cream-100);
          line-height: 1.2;
        }

        .btn-edit-title {
          background: transparent;
          border: none;
          color: var(--copper-300);
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
        }

        .btn-edit-title:hover {
          opacity: 1;
        }

        .song-artist {
          font-size: 1.1rem;
          color: var(--copper-300);
          font-style: italic;
        }

        .source-badge {
          font-size: 0.72rem;
          color: var(--cream-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* Visualizer */
        .visualizer-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 22px;
          margin-top: 6px;
        }

        .visualizer-bars .bar {
          width: 3px;
          background: linear-gradient(180deg, var(--copper-300), var(--copper-600));
          border-radius: 2px;
          transition: height 0.3s ease;
        }

        .visualizer-bars .bar.active {
          animation: barBounce 1.2s ease-in-out infinite alternate;
        }

        @keyframes barBounce {
          0% { height: 20%; }
          50% { height: 95%; }
          100% { height: 35%; }
        }

        /* Controls Right */
        .music-right {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .btn-play-pause {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #c88151 0%, #854823 100%);
          border: 1.5px solid rgba(250, 235, 215, 0.4);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 6px 25px rgba(200, 129, 81, 0.45);
          transition: var(--transition-bounce);
        }

        .btn-play-pause:hover {
          transform: scale(1.08);
          box-shadow: 0 8px 30px rgba(200, 129, 81, 0.65);
        }

        .volume-control {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-volume-mute {
          background: transparent;
          border: none;
          color: var(--cream-300);
          cursor: pointer;
        }

        .volume-slider {
          -webkit-appearance: none;
          width: 90px;
          height: 5px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.15);
          outline: none;
        }

        .volume-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--copper-400);
          cursor: pointer;
        }

        /* Toolbar */
        .music-toolbar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-toolbar {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(18, 17, 24, 0.7);
          border: 1px solid rgba(216, 150, 105, 0.2);
          color: var(--cream-300);
          padding: 8px 18px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-toolbar:hover, .btn-toolbar.active {
          background: rgba(216, 150, 105, 0.15);
          border-color: var(--copper-400);
          color: var(--copper-200);
        }

        .url-input-card {
          margin-top: 16px;
          padding: 16px;
          display: flex;
          gap: 12px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .music-input {
          flex: 1;
          background: rgba(10, 9, 14, 0.9);
          border: 1px solid rgba(216, 150, 105, 0.3);
          border-radius: var(--radius-sm);
          padding: 8px 12px;
          color: var(--cream-100);
        }

        @media (max-width: 768px) {
          .music-player-card {
            flex-direction: column;
            padding: 28px 20px;
            text-align: center;
          }
          .music-left {
            flex-direction: column;
            align-items: center;
          }
          .music-right {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
