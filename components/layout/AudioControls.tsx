'use client';

import { Music, Volume2, VolumeX } from 'lucide-react';
import { useGameAudio } from '@/lib/audio/AudioProvider';
import { cn } from '@/lib/utils';

const base =
  'relative flex h-10 w-10 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500';

/** Saklar musik latar & efek suara untuk seluruh website (di navbar). */
export function AudioControls() {
  const { musicOn, sfxOn, musicWaiting, toggleMusic, toggleSfx } = useGameAudio();

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={musicOn}
        aria-label={`Musik latar: ${musicOn ? 'menyala' : 'mati'}`}
        title={`Musik latar: ${musicOn ? 'ON' : 'OFF'}`}
        className={cn(base, musicOn ? 'bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900 dark:text-lamongan-200' : 'bg-black/5 text-secondary dark:bg-white/10')}
      >
        <Music className={cn('h-5 w-5', !musicOn && 'opacity-50')} aria-hidden />
        {!musicOn && <span aria-hidden className="absolute h-0.5 w-6 rotate-45 rounded bg-current" />}
      </button>
      <button
        type="button"
        onClick={toggleSfx}
        aria-pressed={sfxOn}
        aria-label={`Efek suara: ${sfxOn ? 'menyala' : 'mati'}`}
        title={`Efek suara: ${sfxOn ? 'ON' : 'OFF'}`}
        className={cn(base, sfxOn ? 'bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900 dark:text-lamongan-200' : 'bg-black/5 text-secondary dark:bg-white/10')}
      >
        {sfxOn ? <Volume2 className="h-5 w-5" aria-hidden /> : <VolumeX className="h-5 w-5 opacity-60" aria-hidden />}
      </button>
      {musicWaiting && (
        <p className="pointer-events-none absolute right-4 top-full mt-1.5 rounded-full bg-lamongan-700 px-3 py-1 text-xs font-semibold text-white shadow-lg sm:right-6 lg:right-8">
          🎵 Ketuk layar untuk memulai musik
        </p>
      )}
    </div>
  );
}
