import { ExternalLink } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { LiteYouTube } from '@/components/ui/LiteYouTube';
import { youTubeWatchUrl } from '@/lib/youtube';

const VIDEOS = [
  {
    id: 'xv_pZuSM1CI',
    heading: 'Pemanasan Dulu, Yuk!',
    title: 'Video pemanasan (warming up) Gelar Karya Si Lele Bahagia — Media Belajar Anak PAUD Lamongan',
  },
  {
    id: 'w0_4lxrONNw',
    heading: 'Nonton Bareng Si Lele',
    title: 'Video Gelar Karya Si Lele Bahagia — Media Belajar Anak PAUD Lamongan',
  },
];

export function VideoSection() {
  return (
    <section aria-labelledby="video-heading" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-6 text-center">
          <h2 id="video-heading" className="font-display text-2xl font-bold sm:text-3xl">
            Yuk, Pemanasan dan Nonton Bareng Si Lele!
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-secondary">
            Video seru untuk anak PAUD, orang tua, dan guru.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {VIDEOS.map((video, i) => (
          <Reveal key={video.id} delay={i * 0.1}>
            <figure>
              <div className="overflow-hidden rounded-xl2 border border-subtle shadow-soft dark:shadow-soft-dark">
                <LiteYouTube url={youTubeWatchUrl(video.id)} title={video.title} />
              </div>
              <figcaption className="mt-3 flex flex-col items-center gap-1 text-center">
                <span className="font-display text-sm font-semibold">{video.heading}</span>
                <a
                  href={youTubeWatchUrl(video.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-lamongan-700 underline-offset-2 hover:underline dark:text-lamongan-300"
                >
                  Video tidak muncul? Buka di YouTube <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
