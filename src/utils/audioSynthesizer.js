// Web Audio API ambient romantic music generator
// Plays a warm, tender, cinematic chord progression with acoustic music-box / soft felt piano timbre
// Ensures the music player works out of the box with zero external dependencies or broken links!

class RomanticMusicSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.6;
    this.intervalId = null;
    this.currentStep = 0;
    this.onStateChange = null;
    this.gainNode = null;

    // Romantic chord progression in D major (Dmaj9 - F#m7 - Gmaj7 - Aadd9)
    // Frequencies in Hz
    this.chords = [
      // Dmaj9 (D3, A3, C#4, E4, F#4)
      [146.83, 220.00, 277.18, 329.63, 369.99],
      // F#m7 (F#3, C#4, E4, A4)
      [185.00, 277.18, 329.63, 440.00],
      // Gmaj7 (G3, D4, F#4, B4)
      [196.00, 293.66, 369.99, 493.88],
      // Aadd9 (A3, E4, B4, C#5)
      [220.00, 329.63, 493.88, 554.37]
    ];

    // Delicate bell-like arpeggio notes floating on top
    this.arpeggios = [
      [554.37, 739.99, 659.25, 554.37],
      [440.00, 659.25, 554.37, 440.00],
      [493.88, 739.99, 587.33, 493.88],
      [554.37, 880.00, 739.99, 659.25]
    ];
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  playTone(freq, time, duration = 3.5, type = 'sine', isArp = false) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    // Warm envelope
    const attack = isArp ? 0.03 : 0.4;
    const peak = isArp ? 0.06 : 0.12;
    noteGain.gain.setValueAtTime(0.0001, time);
    noteGain.gain.exponentialRampToValueAtTime(peak, time + attack);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    // Subtle low-pass filtering for warm vinyl/felt texture
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isArp ? 1800 : 900, time);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.gainNode);

    osc.start(time);
    osc.stop(time + duration + 0.1);
  }

  playChordStep() {
    if (!this.isPlaying || !this.ctx) return;

    const chordIndex = this.currentStep % this.chords.length;
    const chord = this.chords[chordIndex];
    const arp = this.arpeggios[chordIndex];
    const now = this.ctx.currentTime;

    // Play chord base & mid tones
    chord.forEach((freq, idx) => {
      // stagger notes slightly for humanized strum feel
      const noteDelay = idx * 0.09;
      this.playTone(freq, now + noteDelay, 3.8, 'sine');
      // add warm harmonic
      this.playTone(freq * 2, now + noteDelay, 2.2, 'triangle');
    });

    // Play sparkling arpeggios
    arp.forEach((freq, idx) => {
      const arpTime = now + 0.6 + (idx * 0.6);
      this.playTone(freq, arpTime, 1.8, 'sine', true);
    });

    this.currentStep = (this.currentStep + 1) % this.chords.length;
    if (this.onStateChange) {
      this.onStateChange({ step: this.currentStep });
    }
  }

  start() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playChordStep();
    this.intervalId = setInterval(() => {
      this.playChordStep();
    }, 3800); // 3.8 seconds per chord cycle
    if (this.onStateChange) {
      this.onStateChange({ isPlaying: true });
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
    if (this.onStateChange) {
      this.onStateChange({ isPlaying: false });
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
    return this.isPlaying;
  }
}

export const romanticSynth = new RomanticMusicSynth();
