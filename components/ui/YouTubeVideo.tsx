import { ExternalLink, Play } from 'lucide-react';
import { getYouTubeId } from '@/lib/youtube';

export function YouTubeVideo({
  url,
  title,
}: {
  url?: string;
  title: string;
}) {
  if (!url) return null;

  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lamongan-700 underline underline-offset-4 dark:text-lamongan-300"
      >
        <Play className="h-4 w-4" aria-hidden />
        Tonton video {title} di YouTube
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </a>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-xl2 border border-subtle bg-surface shadow-soft dark:shadow-soft-dark">
      <div className="flex items-center justify-between gap-3 border-b border-subtle px-4 py-3 sm:px-5">
        <h2 className="font-display font-semibold">Video {title}</h2>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-secondary hover:text-current"
          aria-label={`Buka video ${title} di YouTube`}
        >
          YouTube <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
      <div className="aspect-video w-full bg-black">
        <iframe
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`Video YouTube tentang ${title}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </section>
  );
}
