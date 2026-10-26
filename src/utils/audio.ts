// Romantic Audio Engine
// Generates dreamy procedural celestial lofi chords & music box chimes using Web Audio API
// Or plays an audio track if proposalConfig.musicUrl is provided.

class RomanticAudioManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private chordIndex: number = 0;

  // Romantic chord progression in C major / F Lydian:
  // Fmaj9, Cmaj9, Am9, Gsus4/add9
  private chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00], // F3, A3, C4, E4, G4 (Fmaj9)
    [130.81, 196.00, 246.94, 261.63, 329.63], // C3, G3, B3, C4, E4 (Cmaj9)
    [110.00, 164.81, 220.00, 261.63, 329.63], // A2, E3, A3, C4, E4 (Am9)
    [146.83, 220.00, 293.66, 329.63, 392.00], // D3, A3, D4, E4, G4 (Dm9)
  ];

  public get playing(): boolean {
    return this.isPlaying;
  }

  public init(customUrl?: string) {
    if (customUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
        this.customAudio.volume = 0.45;
      }
    }
  }

  private ensureAudioContext() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public toggle(customUrl?: string): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play(customUrl);
      return true;
    }
  }

  public play(customUrl?: string) {
    if (customUrl) {
      this.init(customUrl);
      this.customAudio?.play().then(() => {
        this.isPlaying = true;
      }).catch(err => {
        console.warn("Could not play custom audio, falling back to procedural synthesizer", err);
        this.playProcedural();
      });
      return;
    }

    this.playProcedural();
  }

  private playProcedural() {
    this.ensureAudioContext();
    if (!this.audioCtx || !this.masterGain) return;

    this.isPlaying = true;
    // Fade in master gain smoothly
    const now = this.audioCtx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.linearRampToValueAtTime(0.25, now + 2.5);

    this.scheduleNextChord();
  }

  private scheduleNextChord() {
    if (!this.isPlaying || !this.audioCtx || !this.masterGain) return;

    const chord = this.chords[this.chordIndex % this.chords.length];
    this.chordIndex++;
    const now = this.audioCtx.currentTime;
    const duration = 6.5; // slow, gentle breathing pads

    // Create warm pad oscillators for chord notes
    chord.forEach((freq, i) => {
      if (!this.audioCtx || !this.masterGain) return;

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const filter = this.audioCtx.createBiquadFilter();

      // Warm sine + subtle triangle
      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Gentle low-pass filter for cozy warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(700 + i * 80, now);
      filter.Q.setValueAtTime(1.2, now);

      // Envelope: gentle fade in, sustain, soft fade out
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.045 / (i + 1), now + 1.8);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.0);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 1.5);
    });

    // Add a delicate high bell/chime ping for magic
    if (Math.random() > 0.3) {
      const bellFreq = chord[Math.floor(Math.random() * chord.length)] * 2;
      const bellOsc = this.audioCtx.createOscillator();
      const bellGain = this.audioCtx.createGain();

      bellOsc.type = 'sine';
      bellOsc.frequency.setValueAtTime(bellFreq, now + 1.2);

      bellGain.gain.setValueAtTime(0.0001, now + 1.2);
      bellGain.gain.linearRampToValueAtTime(0.035, now + 1.25);
      bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

      bellOsc.connect(bellGain);
      bellGain.connect(this.masterGain);

      bellOsc.start(now + 1.2);
      bellOsc.stop(now + 3.6);
    }

    // Schedule next chord
    this.timerId = window.setTimeout(() => {
      this.scheduleNextChord();
    }, 5500);
  }

  public pause() {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.audioCtx && this.masterGain) {
      const now = this.audioCtx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(0.0001, now + 1.2);
    }
  }
}

export const romanticAudio = new RomanticAudioManager();
