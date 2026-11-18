import Link from 'next/link';
import type { FoodItem } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function MakananCard({ food }: { food: FoodItem }) {
  return (
    <Card className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-40 w-full overflow-hidden bg-surface">
        {food.imageUrl && (
          <img
            src={food.imageUrl}
            alt={`Foto ${food.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <Badge tone="lamongan" className="absolute left-3 top-3">
          Kuliner
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display font-semibold">{food.name}</h3>

        <p className="mt-0.5 text-xs text-secondary">{food.mainIngredients.slice(0, 3).join(' · ')}</p>

        <p className="mt-2 flex-1 text-sm text-secondary">{food.description}</p>

        <Link
          href={`/makanan/${food.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-lamongan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lamongan-700"
        >
          Jelajahi
        </Link>
      </div>
    </Card>
  );
}
