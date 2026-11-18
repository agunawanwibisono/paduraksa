'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { GameAudio } from './GameAudio';

const MUSIC_KEY = 'silele:audio:music';
const SFX_KEY = 'silele:audio:sfx';

function readPref(key: string): boolean {
  try {
    return window.localStorage.getItem(key) !== 'off';
  } catch {
    return true;
  }
}

function writePref(key: string, on: boolean) {
  try {
    window.localStorage.setItem(key, on ? 'on' : 'off');
  } catch {
    /* penyimpanan diblokir: pengaturan berlaku untuk sesi ini saja */
  }
}

export type AudioApi = {
  musicOn: boolean;
  sfxOn: boolean;
  /** true selama musik menyala tapi browser masih menunggu ketukan pertama */
  musicWaiting: boolean;
  toggleMusic: () => void;
  toggleSfx: () => void;
  /** Dipanggil saat video diputar: musik latar dimatikan sementara (pilihan tersimpan tidak berubah). */
  pauseMusicForVideo: () => void;
  playClick: () => void;
  playSuccess: () => void;
  playVictory: () => void;
};

const AudioContextApi = createContext<AudioApi | null>(null);

/**
 * Dipasang sekali di layout utama, sehingga musik latar berjalan di SEMUA halaman
 * dan tidak terputus saat pindah halaman. Musik & efek suara punya saklar terpisah
 * (ON secara bawaan); pilihan pengguna diingat di browser.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const engine = useRef<GameAudio | null>(null);
  if (engine.current === null) engine.current = new GameAudio();

  const [musicOn, setMusicOn] = useState(true);
  const [sfxOn, setSfxOn] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const musicRef = useRef(true);
  const sfxRef = useRef(true);

  const pauseMusicForVideo = useCallback(() => {
    if (!musicRef.current) return;
    musicRef.current = false;
    setMusicOn(false);
    setMusicStarted(false);
    engine.current!.stopMusic();
  }, []);

  useEffect(() => {
    const audio = engine.current!;
    const music = readPref(MUSIC_KEY);
    const sfx = readPref(SFX_KEY);
    musicRef.current = music;
    sfxRef.current = sfx;
    setMusicOn(music);
    setSfxOn(sfx);

    // Browser baru mengizinkan suara setelah ada interaksi. Pada layar sentuh,
    // izin baru diberikan saat jari diangkat, jadi pendengar dipasang pada beberapa
    // event dan terus mencoba sampai musik benar-benar jalan.
    const onGesture = () => {
      audio.unlock();
      if (musicRef.current && !audio.musicPlaying) {
        audio.startMusic();
        setMusicStarted(true);
      }
    };
    const onVisibility = () => audio.setPaused(document.hidden);
    // Pengguna menekan video YouTube (iframe) -> fokus pindah ke iframe: matikan musik latar sementara.
    const onBlur = () =>
      window.setTimeout(() => {
        if (document.activeElement instanceof HTMLIFrameElement) pauseMusicForVideo();
      }, 0);
    window.addEventListener('blur', onBlur);

    const events = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'] as const;
    events.forEach((e) => window.addEventListener(e, onGesture, { passive: true }));
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      events.forEach((e) => window.removeEventListener(e, onGesture));
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('blur', onBlur);
      audio.dispose();
    };
  }, [pauseMusicForVideo]);

  const toggleMusic = useCallback(() => {
    const next = !musicRef.current;
    musicRef.current = next;
    setMusicOn(next);
    writePref(MUSIC_KEY, next);
    if (next) {
      engine.current!.startMusic();
      setMusicStarted(true);
    } else {
      engine.current!.stopMusic();
      setMusicStarted(false);
    }
  }, []);

  const toggleSfx = useCallback(() => {
    const next = !sfxRef.current;
    sfxRef.current = next;
    setSfxOn(next);
    writePref(SFX_KEY, next);
    if (next) engine.current!.playClick(); // contoh suara saat dinyalakan
  }, []);

  const playClick = useCallback(() => { if (sfxRef.current) engine.current!.playClick(); }, []);
  const playSuccess = useCallback(() => { if (sfxRef.current) engine.current!.playSuccess(); }, []);
  const playVictory = useCallback(() => { if (sfxRef.current) engine.current!.playVictory(); }, []);

  const api = useMemo<AudioApi>(
    () => ({ musicOn, sfxOn, musicWaiting: musicOn && !musicStarted, toggleMusic, toggleSfx, pauseMusicForVideo, playClick, playSuccess, playVictory }),
    [musicOn, sfxOn, musicStarted, toggleMusic, toggleSfx, pauseMusicForVideo, playClick, playSuccess, playVictory],
  );

  return <AudioContextApi.Provider value={api}>{children}</AudioContextApi.Provider>;
}

export function useGameAudio(): AudioApi {
  const ctx = useContext(AudioContextApi);
  if (!ctx) throw new Error('useGameAudio harus dipakai di dalam <AudioProvider> (lihat app/layout.tsx).');
  return ctx;
}
