'use client';

import { Search } from 'lucide-react';

export type FoodSortOption = 'default' | 'name';

interface MakananFilterBarProps {
  query: string;
  onQueryChange: (v: string) => void;
  sort: FoodSortOption;
  onSortChange: (v: FoodSortOption) => void;
}

export function MakananFilterBar({ query, onQueryChange, sort, onSortChange }: MakananFilterBarProps) {
  return (
    <div className="mb-8 flex flex-col gap-4">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" aria-hidden />
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Cari nama makanan atau bahan..."
          aria-label="Cari makanan"
          className="w-full rounded-xl border border-subtle bg-surface py-2.5 pl-10 pr-4 text-sm outline-none ring-lamongan-500 focus:ring-2"
        />
      </div>

      <div className="flex justify-end">
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as FoodSortOption)}
          aria-label="Urutkan"
          className="rounded-xl border border-subtle bg-surface px-3 py-2 text-xs font-medium outline-none focus:ring-2 focus:ring-lamongan-500"
        >
          <option value="default">Urutan awal</option>
          <option value="name">Nama A-Z</option>
        </select>
      </div>
    </div>
  );
}
