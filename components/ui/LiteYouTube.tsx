'use client';

import { useState } from 'react';
import { Play, ImageOff } from 'lucide-react';
import { getYouTubeId } from '@/lib/youtube';
import { useGameAudio } from '@/lib/audio/AudioProvider';

/** Pemutar YouTube ringan: tampil sebagai thumbnail, iframe baru dimuat saat diklik. */
export function LiteYouTube({ url, title }: { url: string; title: string }) {
  const [playing, setPlaying] = useState(false);
  const { pauseMusicForVideo } = useGameAudio();
  const [thumbFailed, setThumbFailed] = useState(false);
  const id = getYouTubeId(url);
  if (!id) return null;

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-lamongan-900">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => { pauseMusicForVideo(); setPlaying(true); }}
          aria-label={`Putar ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sunny-400"
        >
          {thumbFailed ? (
            <span className="flex h-full w-full items-center justify-center text-white/40" aria-hidden>
              <ImageOff className="h-8 w-8" />
            </span>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              onError={() => setThumbFailed(true)}
              className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100"
            />
          )}
          <span className="absolute left-1/2 top-1/2 inline-flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-terracotta-500 text-white shadow-soft transition-transform group-hover:scale-110">
            <Play className="h-6 w-6 translate-x-0.5" aria-hidden />
          </span>
        </button>
      )}
    </div>
  );
}
