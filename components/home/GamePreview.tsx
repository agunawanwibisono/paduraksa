import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { games as GAMES } from '@/data/games';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function GamePreview() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">Game Edukasi</h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-secondary">
            Uji ketangkasan dan ingatanmu sambil belajar tentang Lamongan.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {GAMES.map((game, i) => {
          const Icon = game.icon;
          return (
            <Reveal key={game.slug} delay={i * 0.1}>
              <div className="relative overflow-hidden rounded-xl2 border border-subtle bg-surface p-7 shadow-soft dark:shadow-soft-dark">
                <div
                  className={`absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gradient-to-br ${game.color} opacity-20 blur-2xl`}
                  aria-hidden
                />
                <span
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${game.color} text-white`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold">{game.title}</h3>
                <p className="mt-2 text-sm text-secondary">{game.description}</p>
                <Link href={`/game/${game.slug}`} className="mt-5 inline-block">
                  <Button size="sm" variant="outline">
                    Mainkan <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </Button>
                </Link>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
