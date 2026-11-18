import Link from 'next/link';
import { MapPinned, UtensilsCrossed, BookOpen, Gamepad2, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { destinations } from '@/data/destinations';
import { foods } from '@/data/foods';

const CATEGORIES = [
  {
    href: '/wisata',
    title: 'Wisata Lamongan',
    description: 'Jelajahi destinasi alam, sejarah, religi, dan buatan di Lamongan.',
    icon: MapPinned,
    count: `${destinations.length} destinasi`,
    color: 'from-lamongan-400 to-lamongan-600',
  },
  {
    href: '/makanan',
    title: 'Makanan Khas',
    description: 'Kenali cita rasa dan cerita di balik kuliner khas Lamongan.',
    icon: UtensilsCrossed,
    count: `${foods.length} makanan`,
    color: 'from-terracotta-400 to-terracotta-600',
  },
  {
    href: '/budaya',
    title: 'Budaya & Lokal',
    description: 'Timeline, fakta unik, dan kuis singkat seputar budaya Lamongan.',
    icon: BookOpen,
    count: 'Timeline & kuis',
    color: 'from-amber-400 to-amber-600',
  },
  {
    href: '/game',
    title: 'Game Edukasi',
    description: 'Uji ketangkasan dan ingatanmu lewat game bertema Lamongan.',
    icon: Gamepad2,
    count: '5 game',
    color: 'from-lamongan-500 to-terracotta-500',
  },
];

export default function EksplorasiPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-10 text-center">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Mulai Eksplorasi</h1>
          <p className="mx-auto mt-2 max-w-md text-secondary">
            Pilih kategori yang ingin kamu jelajahi lebih dulu.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <Reveal key={cat.href} delay={i * 0.08}>
              <Link
                href={cat.href}
                className="group relative block overflow-hidden rounded-xl2 border border-subtle bg-surface p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1.5 dark:shadow-soft-dark"
              >
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${cat.color} opacity-20 blur-2xl`}
                  aria-hidden
                />
                <span
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.color} text-white`}
                >
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h2 className="font-display text-lg font-semibold">{cat.title}</h2>
                <p className="mt-2 text-sm text-secondary">{cat.description}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-secondary">{cat.count}</span>
                  <span className="flex items-center gap-1 font-medium text-lamongan-700 group-hover:underline dark:text-lamongan-300">
                    Jelajahi <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
