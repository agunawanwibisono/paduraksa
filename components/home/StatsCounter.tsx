import { MapPinned, UtensilsCrossed, Gamepad2, BookOpen } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { foods } from '@/data/foods';
import { games } from '@/data/games';
import { cultureArts, villageCultureArts } from '@/data/culture';
import { AnimatedCounter } from '@/components/ui/AnimatedCounter';
import { Reveal } from '@/components/ui/Reveal';

const STATS = [
  { icon: MapPinned, label: 'Destinasi Wisata', value: destinations.length, suffix: '' },
  { icon: UtensilsCrossed, label: 'Makanan Khas', value: foods.length, suffix: '' },
  { icon: Gamepad2, label: 'Game Edukasi', value: games.length, suffix: '' },
  { icon: BookOpen, label: 'Kesenian & Warisan Budaya', value: cultureArts.length + villageCultureArts.length, suffix: '' },
];

export function StatsCounter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="flex flex-col items-center rounded-xl2 border border-subtle bg-surface p-6 text-center shadow-soft dark:shadow-soft-dark">
                <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900/50 dark:text-lamongan-200">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-2xl font-bold sm:text-3xl"
                />
                <span className="mt-1 text-xs text-secondary sm:text-sm">{stat.label}</span>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
