import { Music, Mic, Wheat, Waves, Shirt, Drama, Utensils, Play } from 'lucide-react';
import type { CultureArt } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { LiteYouTube } from '@/components/ui/LiteYouTube';
import { SafeImage } from '@/components/ui/SafeImage';

const icons = { music: Music, mic: Mic, wheat: Wheat, waves: Waves, shirt: Shirt, drama: Drama, utensils: Utensils } as const;

export function KesenianTradisi({ arts }: { arts: CultureArt[] }) {
  return (
    <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {arts.map((a, i) => {
        const Icon = icons[a.icon];
        const href = a.videoUrl ?? `https://www.youtube.com/results?search_query=${encodeURIComponent(a.searchQuery)}`;
        return (
          <Reveal key={a.id} delay={(i % 2) * 0.08}>
            <Card className="flex h-full flex-col">
              {a.videoUrl ? (
                <LiteYouTube url={a.videoUrl} title={`Video ${a.name}`} />
              ) : (
                a.image && (
                  <figure>
                    <SafeImage src={a.image} alt={a.imageCaption ?? `Foto ${a.name}`} className="aspect-video w-full object-cover" />
                    {a.imageCaption && <figcaption className="px-4 pt-2 text-[11px] text-secondary">{a.imageCaption}</figcaption>}
                  </figure>
                )
              )}
              <CardBody className="flex flex-1 flex-col">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900/40 dark:text-lamongan-200">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <Badge tone="terracotta">{a.category}</Badge>
                </div>
                <h4 className="font-display font-semibold">{a.name}</h4>
                <p className="mt-1.5 flex-1 text-sm leading-6 text-secondary">{a.description}</p>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-lamongan-700 underline-offset-2 hover:underline dark:text-lamongan-300"
                >
                  <Play className="h-3.5 w-3.5" aria-hidden />
                  {a.videoUrl ? 'Buka di YouTube' : 'Cari video di YouTube'}
                </a>
              </CardBody>
            </Card>
          </Reveal>
        );
      })}
    </div>
  );
}
