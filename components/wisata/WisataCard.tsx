import Link from 'next/link';
import { Star } from 'lucide-react';
import type { Destination } from '@/lib/types';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const CATEGORY_LABEL: Record<Destination['category'], string> = {
  alam: 'Alam',
  sejarah: 'Sejarah',
  religi: 'Religi',
  buatan: 'Buatan',
};

export function WisataCard({
  destination,
}: {
  destination: Destination;
}) {
  return (
    <Card className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative h-40 w-full overflow-hidden bg-surface">
        {destination.images[0] && (
          <img
            src={destination.images[0]}
            alt={`Foto ${destination.name}`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
        <Badge tone="lamongan" className="absolute left-3 top-3">
          {CATEGORY_LABEL[destination.category]}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-1.5 flex items-center gap-1 text-xs text-amber-500">
          <Star
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            aria-hidden
          />
          {destination.popularity.toFixed(1)}
        </div>

        <h3 className="font-display font-semibold">
          {destination.name}
        </h3>

        <p className="mt-0.5 text-xs text-secondary">
          {destination.location}
        </p>

        <p className="mt-2 flex-1 text-sm text-secondary">
          {destination.shortDescription}
        </p>

        <Link
          href={`/wisata/${destination.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-lamongan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-lamongan-700"
        >
          Jelajahi
        </Link>
      </div>
    </Card>
  );
}