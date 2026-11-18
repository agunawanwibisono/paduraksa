'use client';

import { Search } from 'lucide-react';
import type { ContentCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

export type SortOption = 'popularity' | 'name';

const CATEGORIES: { value: ContentCategory | 'semua'; label: string }[] = [
  { value: 'semua', label: 'Semua' },
  { value: 'alam', label: 'Alam' },
  { value: 'sejarah', label: 'Sejarah' },
  { value: 'religi', label: 'Religi' },
  { value: 'buatan', label: 'Buatan' },
];

interface WisataFilterBarProps {
  query: string;
  onQueryChange: (v: string) => void;
  category: ContentCategory | 'semua';
  onCategoryChange: (v: ContentCategory | 'semua') => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
}

export function WisataFilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: WisataFilterBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari nama destinasi atau lokasi..."
          aria-label="Cari destinasi"
          className="w-full rounded-xl border border-subtle bg-surface py-2.5 pl-10 pr-4 text-sm outline-none ring-lamongan-500 focus:ring-2"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategoryChange(cat.value)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                category === cat.value
                  ? 'bg-lamongan-600 text-white'
                  : 'bg-black/5 text-secondary hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          aria-label="Urutkan"
          className="rounded-xl border border-subtle bg-surface px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-lamongan-500"
        >
          <option value="popularity">Paling populer</option>
          <option value="name">Nama A-Z</option>
        </select>
      </div>
    </div>
  );
}
