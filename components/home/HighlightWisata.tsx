import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';

export function HighlightWisata() {
  const popular = [...destinations].sort((a, b) => b.popularity - a.popularity).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Wisata Populer</h2>
            <p className="mt-1 text-sm text-secondary">Destinasi favorit yang paling banyak dijelajahi.</p>
          </div>
          <Link
            href="/wisata"
            className="hidden shrink-0 items-center gap-1 text-sm font-medium text-lamongan-700 hover:underline dark:text-lamongan-300 sm:flex"
          >
            Lihat semua <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {popular.map((dest, i) => (
          <Reveal key={dest.id} delay={i * 0.1}>
            <Link href={`/wisata/${dest.slug}`} className="group block h-full">
              <Card className="h-full transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                <div className="relative h-44 w-full bg-gradient-to-br from-lamongan-200 to-lamongan-400 dark:from-lamongan-800 dark:to-lamongan-950" />
                <div className="p-5">
                  <div className="mb-1.5 flex items-center gap-1 text-xs text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden />
                    {dest.popularity.toFixed(1)}
                  </div>
                  <h3 className="font-display font-semibold group-hover:text-lamongan-700 dark:group-hover:text-lamongan-300">
                    {dest.name}
                  </h3>
                  <p className="mt-1 text-sm text-secondary">{dest.location}</p>
                </div>
              </Card>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
