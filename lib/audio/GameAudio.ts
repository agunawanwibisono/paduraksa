/**
 * Mesin audio game berbasis Web Audio API.
 * Semua suara (musik latar & efek) dibuat lewat kode, jadi tidak butuh file
 * audio, tidak menambah ukuran unduhan, dan bebas masalah hak cipta.
 *
 * Browser memblokir suara sebelum ada interaksi pengguna, sehingga AudioContext
 * baru dibuat/di-resume lewat unlock() yang dipanggil dari ketukan pertama.
 */

const midiToHz = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// ---- Musik: C mayor, 132 bpm, 8 bar x 8 not seperdelapan = 64 langkah ----
const BPM = 132;
const EIGHTH = 60 / BPM / 2;
const STEPS = 64;
const N = null;

// Melodi per bar (null = jeda). Urutan akor: C - G - Am - F - C - G - F - G
const MELODY: (number | null)[][] = [
  [76, 76, 79, 76, 72, 76, 79, N],
  [74, 74, 79, 74, 71, 74, 79, N],
  [72, 72, 76, 72, 69, 72, 76, N],
  [69, 72, 77, 76, 74, 72, 69, N],
  [67, 72, 76, 79, 76, 72, 76, 79],
  [71, 74, 79, 77, 74, 71, 74, N],
  [69, 72, 77, 81, 79, 77, 76, 74],
  [74, 71, 67, 71, 74, N, 79, N],
];
const BASS_ROOTS = [48, 43, 45, 41, 48, 43, 41, 43];

const MUSIC_LEVEL = 0.2;
const SFX_LEVEL = 0.55;
const SCHEDULE_AHEAD = 0.35; // detik
const TICK_MS = 60;

export class GameAudio {
  private ctx: AudioContext | null = null;
  private musicBus: GainNode | null = null;
  private duck: GainNode | null = null;
  private sfxBus: GainNode | null = null;
  private noise: AudioBuffer | null = null;

  private timer: number | null = null;
  private nextTime = 0;
  private step = 0;
  private musicWanted = false;

  /** Dipanggil dari gestur pengguna (tap/klik/tombol) agar suara boleh diputar. */
  unlock(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return null;
      const ctx = new AC();
      const comp = ctx.createDynamicsCompressor();
      comp.connect(ctx.destination);

      const duck = ctx.createGain();
      duck.connect(comp);
      const musicBus = ctx.createGain();
      musicBus.gain.value = 0;
      musicBus.connect(duck);
      const sfxBus = ctx.createGain();
      sfxBus.gain.value = SFX_LEVEL;
      sfxBus.connect(comp);

      const len = Math.floor(ctx.sampleRate * 0.1);
      const noise = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = noise.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

      this.ctx = ctx;
      this.duck = duck;
      this.musicBus = musicBus;
      this.sfxBus = sfxBus;
      this.noise = noise;
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  get isUnlocked() {
    return this.ctx !== null;
  }

  get musicPlaying() {
    return this.musicWanted;
  }

  // ---------- Musik latar ----------

  startMusic() {
    const ctx = this.unlock();
    if (!ctx || !this.musicBus) return;
    this.musicBus.gain.cancelScheduledValues(ctx.currentTime);
    this.musicBus.gain.setTargetAtTime(MUSIC_LEVEL, ctx.currentTime, 0.15);
    if (this.musicWanted) return;
    this.musicWanted = true;
    this.nextTime = ctx.currentTime + 0.08;
    this.timer = window.setInterval(this.tick, TICK_MS);
  }

  stopMusic() {
    this.musicWanted = false;
    if (this.timer !== null) {
      window.clearInterval(this.timer);
      this.timer = null;
    }
    if (this.ctx && this.musicBus) {
      this.musicBus.gain.cancelScheduledValues(this.ctx.currentTime);
      this.musicBus.gain.setTargetAtTime(0, this.ctx.currentTime, 0.08);
    }
  }

  /** Jeda total saat tab disembunyikan, lanjut saat tab kembali. */
  setPaused(paused: boolean) {
    if (!this.ctx) return;
    if (paused && this.ctx.state === 'running') void this.ctx.suspend();
    if (!paused && this.ctx.state === 'suspended') void this.ctx.resume();
  }

  dispose() {
    this.stopMusic();
    const ctx = this.ctx;
    this.ctx = this.musicBus = this.duck = this.sfxBus = this.noise = null;
    if (ctx && ctx.state !== 'closed') void ctx.close();
  }

  private tick = () => {
    const ctx = this.ctx;
    if (!ctx || !this.musicWanted) return;
    while (this.nextTime < ctx.currentTime + SCHEDULE_AHEAD) {
      this.scheduleStep(this.step, this.nextTime);
      this.nextTime += EIGHTH;
      this.step = (this.step + 1) % STEPS;
    }
  };

  private scheduleStep(step: number, t: number) {
    const bar = Math.floor(step / 8);
    const pos = step % 8;
    const bus = this.musicBus;
    if (!bus) return;

    const note = MELODY[bar]?.[pos] ?? null;
    if (note !== null) {
      this.tone(bus, 'triangle', midiToHz(note), t, EIGHTH * 1.6, 0.5, 0.01);
      this.tone(bus, 'sine', midiToHz(note + 12), t, EIGHTH * 1.0, 0.1, 0.005); // kilau lonceng
    }

    const root = BASS_ROOTS[bar] ?? 48;
    if (pos === 0 || pos === 4) this.tone(bus, 'triangle', midiToHz(root), t, EIGHTH * 1.8, 0.55, 0.01);
    if (pos === 2 || pos === 6) this.tone(bus, 'triangle', midiToHz(root + 7), t, EIGHTH * 1.0, 0.3, 0.01);

    if (pos % 2 === 1) this.hat(bus, t, 0.07); // ketukan tipis seperti kerincingan
  }

  // ---------- Efek suara ----------

  /** Potongan gapura ditekan. */
  playClick() {
    const ctx = this.unlock();
    if (!ctx || !this.sfxBus) return;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(720, t);
    osc.frequency.exponentialRampToValueAtTime(360, t + 0.07);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.6, t + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    osc.connect(g);
    g.connect(this.sfxBus);
    osc.start(t);
    osc.stop(t + 0.12);
  }

  /** Potongan terpasang dengan benar: "ting-ting" naik. */
  playSuccess() {
    const ctx = this.unlock();
    if (!ctx || !this.sfxBus) return;
    const t = ctx.currentTime;
    this.tone(this.sfxBus, 'sine', midiToHz(84), t, 0.35, 0.55, 0.004);
    this.tone(this.sfxBus, 'triangle', midiToHz(84), t, 0.25, 0.2, 0.004);
    this.tone(this.sfxBus, 'sine', midiToHz(91), t + 0.1, 0.55, 0.55, 0.004);
    this.tone(this.sfxBus, 'triangle', midiToHz(91), t + 0.1, 0.35, 0.2, 0.004);
    this.tone(this.sfxBus, 'sine', midiToHz(103), t + 0.1, 0.4, 0.12, 0.004);
  }

  /** Gapura selesai dibangun: fanfare pendek + akor panjang + kilau. */
  playVictory() {
    const ctx = this.unlock();
    if (!ctx || !this.sfxBus) return;
    const bus = this.sfxBus;
    const t = ctx.currentTime;

    [72, 76, 79, 84].forEach((n, i) => {
      this.tone(bus, 'square', midiToHz(n), t + i * 0.13, 0.2, 0.18, 0.006);
      this.tone(bus, 'triangle', midiToHz(n), t + i * 0.13, 0.22, 0.4, 0.006);
    });
    [72, 76, 79, 84].forEach((n) => {
      this.tone(bus, 'triangle', midiToHz(n), t + 0.55, 1.3, 0.32, 0.02);
      this.tone(bus, 'sine', midiToHz(n + 12), t + 0.55, 1.0, 0.1, 0.02);
    });
    [96, 100, 103, 108].forEach((n, i) => {
      this.tone(bus, 'sine', midiToHz(n), t + 0.6 + i * 0.1, 0.35, 0.14, 0.004);
    });

    // Musik latar mengecil sebentar supaya fanfare terdengar jelas.
    if (this.duck) {
      this.duck.gain.cancelScheduledValues(t);
      this.duck.gain.setTargetAtTime(0.2, t, 0.05);
      this.duck.gain.setTargetAtTime(1, t + 2.0, 0.35);
    }
  }

  // ---------- Pembangun suara ----------

  private tone(
    dest: AudioNode,
    type: OscillatorType,
    freq: number,
    t: number,
    dur: number,
    vol: number,
    attack: number,
  ) {
    const ctx = this.ctx;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(vol, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(t);
    osc.stop(t + dur + 0.05);
  }

  private hat(dest: AudioNode, t: number, vol: number) {
    const ctx = this.ctx;
    if (!ctx || !this.noise) return;
    const src = ctx.createBufferSource();
    const hp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    src.buffer = this.noise;
    hp.type = 'highpass';
    hp.frequency.value = 6500;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
    src.connect(hp);
    hp.connect(g);
    g.connect(dest);
    src.start(t);
    src.stop(t + 0.06);
  }
}
