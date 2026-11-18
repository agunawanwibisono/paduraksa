import { Music, Shirt, Play, MapPin } from 'lucide-react';
import type { CultureArt } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { LiteYouTube } from '@/components/ui/LiteYouTube';

const icons = { music: Music, shirt: Shirt } as const;

export function WarisanBudayaDesa({ arts }: { arts: CultureArt[] }) {
  return (
    <section aria-labelledby="warisan-desa-title" className="mt-16">
      <Reveal>
        <div className="mb-7 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-lamongan-700 dark:text-lamongan-300">
            Kearifan lokal Kalitengah
          </p>
          <h2 id="warisan-desa-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">
            Warisan Budaya Desa
          </h2>
          <p className="mt-3 text-sm leading-7 text-secondary">
            Tradisi dan karya masyarakat desa yang menjadi bagian dari identitas lokal.
            Saksikan video dan kenali cerita di balik setiap warisan budaya.
          </p>
        </div>
      </Reveal>

      <div className="grid items-stretch gap-6 md:grid-cols-2">
        {arts.map((art, index) => {
          const Icon = icons[art.icon as keyof typeof icons] ?? Music;
          return (
            <Reveal key={art.id} delay={index * 0.08}>
              <Card className="flex h-full flex-col">
                <div className="relative">
                  {art.videoUrl && <LiteYouTube url={art.videoUrl} title={`Video ${art.name}`} />}
                  <div className="pointer-events-none absolute left-3 top-3">
                    <Badge tone="lamongan" className="bg-white/95 text-lamongan-900 shadow-sm">
                      {art.category}
                    </Badge>
                  </div>
                </div>
                <CardBody className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-start gap-3">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900/40 dark:text-lamongan-200">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold leading-snug">{art.name}</h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-secondary">
                        <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        Kecamatan Kalitengah, Kabupaten Lamongan
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-secondary">{art.description}</p>
                  {art.videoUrl && (
                    <a
                      href={art.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg border border-subtle px-3.5 py-2.5 text-sm font-medium text-lamongan-800 transition-colors hover:bg-lamongan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500 dark:text-lamongan-200 dark:hover:bg-lamongan-900/30"
                    >
                      <Play className="h-4 w-4" aria-hidden />
                      Tonton di YouTube
                    </a>
                  )}
                </CardBody>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
