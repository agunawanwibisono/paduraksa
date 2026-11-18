import Link from 'next/link';
import { ArrowRight, UtensilsCrossed } from 'lucide-react';
import { foods } from '@/data/foods';
import { Reveal } from '@/components/ui/Reveal';

export function HighlightMakanan() {
  const preview = foods.slice(0, 4);

  return (
    <section className="bg-lamongan-50/60 py-14 dark:bg-lamongan-950/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold sm:text-3xl">Makanan Khas</h2>
              <p className="mt-1 text-sm text-secondary">Cita rasa autentik yang wajib dicoba.</p>
            </div>
            <Link
              href="/makanan"
              className="hidden shrink-0 items-center gap-1 text-sm font-medium text-lamongan-700 hover:underline dark:text-lamongan-300 sm:flex"
            >
              Lihat semua <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {preview.map((food, i) => (
            <Reveal key={food.id} delay={i * 0.08}>
              <Link
                href={`/makanan/${food.slug}`}
                className="group flex flex-col items-center gap-3 rounded-xl2 border border-subtle bg-surface p-5 text-center shadow-soft transition-transform duration-300 hover:-translate-y-1.5 dark:shadow-soft-dark"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-600 dark:bg-terracotta-900/40 dark:text-terracotta-300">
                  <UtensilsCrossed className="h-6 w-6" aria-hidden />
                </span>
                <span className="font-display text-sm font-semibold group-hover:text-terracotta-600 dark:group-hover:text-terracotta-300">
                  {food.name}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
