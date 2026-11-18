'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ContentCategory } from '@/lib/types';
import { destinations } from '@/data/destinations';
import { WisataCard } from '@/components/wisata/WisataCard';
import { WisataFilterBar, type SortOption } from '@/components/wisata/WisataFilterBar';
import { EmptyState } from '@/components/ui/States';
import { Reveal } from '@/components/ui/Reveal';

export default function WisataPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ContentCategory | 'semua'>('semua');
  const [sort, setSort] = useState<SortOption>('popularity');

  const filtered = useMemo(() => {
    let result = destinations.filter((d) => {
      const matchQuery =
        d.name.toLowerCase().includes(query.toLowerCase()) ||
        d.location.toLowerCase().includes(query.toLowerCase());
      const matchCategory = category === 'semua' || d.category === category;
      return matchQuery && matchCategory;
    });

    result = [...result].sort((a, b) =>
      sort === 'popularity' ? b.popularity - a.popularity : a.name.localeCompare(b.name)
    );

    return result;
  }, [query, category, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Wisata Lamongan</h1>
          <p className="mt-2 text-secondary">Temukan destinasi yang ingin kamu jelajahi.</p>
        </div>
      </Reveal>

      <WisataFilterBar
        query={query}
        onQueryChange={setQuery}
        category={category}
        onCategoryChange={setCategory}
        sort={sort}
        onSortChange={setSort}
      />

      {filtered.length === 0 ? (
        <EmptyState title="Destinasi tidak ditemukan" description="Coba kata kunci atau kategori lain." />
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((dest) => (
              <motion.div
                key={dest.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <WisataCard destination={dest} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
