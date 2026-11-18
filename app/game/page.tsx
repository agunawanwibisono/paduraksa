import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { games as GAMES } from '@/data/games';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = { title: 'Game Edukasi' };

export default function GameHubPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Game Edukasi</h1>
          <p className="mx-auto mt-2 max-w-md text-secondary">Pilih game yang ingin kamu mainkan.</p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {GAMES.map((game, i) => {
          const Icon = game.icon;
          return (
            <Reveal key={game.slug} delay={i * 0.1}>
              <Link
                href={`/game/${game.slug}`}
                className="group relative block overflow-hidden rounded-xl2 border border-subtle bg-surface p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1.5 dark:shadow-soft-dark"
              >
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${game.color} opacity-20 blur-2xl`}
                  aria-hidden
                />
                <span className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${game.color} text-white`}>
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="font-display text-lg font-semibold">{game.title}</h2>
                <p className="mt-2 text-sm text-secondary">{game.description}</p>
                <span className="mt-4 flex items-center gap-1 text-sm font-medium text-lamongan-700 group-hover:underline dark:text-lamongan-300">
                  Mainkan <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
