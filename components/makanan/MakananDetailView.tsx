'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Lightbulb, UtensilsCrossed } from 'lucide-react';
import type { FoodItem } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { YouTubeVideo } from '@/components/ui/YouTubeVideo';

export function MakananDetailView({ food }: { food: FoodItem }) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/makanan"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Makanan
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 overflow-hidden rounded-xl2 border border-subtle">
          <div className="relative h-64 w-full bg-gradient-to-br from-lamongan-200 to-lamongan-400 dark:from-lamongan-800 dark:to-lamongan-950 sm:h-80">
            {food.imageUrl && (
              <img src={food.imageUrl} alt={`Foto ${food.name}`} className="h-full w-full object-cover" />
            )}
          </div>
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="lamongan">Kuliner</Badge>
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl">{food.name}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-secondary">
          <UtensilsCrossed className="h-4 w-4" aria-hidden /> {food.mainIngredients.join(', ')}
        </p>

        <p className="mt-6 leading-relaxed text-secondary">{food.description}</p>

        <div className="mt-6">
          <h2 className="font-display font-semibold">Asal / Cerita</h2>
          <p className="mt-1 leading-relaxed text-secondary">{food.originStory}</p>
        </div>

        <YouTubeVideo url={food.videoUrl} title={food.name} />

        {food.funFact && (
          <div className="mt-8 rounded-xl2 border border-subtle bg-lamongan-50/60 p-5 dark:bg-lamongan-950/30">
            <h2 className="mb-3 flex items-center gap-2 font-display font-semibold">
              <Lightbulb className="h-5 w-5 text-lamongan-600 dark:text-lamongan-300" aria-hidden />
              Hal Menarik & Fakta Unik
            </h2>
            <p className="flex gap-2 text-sm text-secondary">
              <span className="text-lamongan-500">•</span> {food.funFact}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
