'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { foods } from '@/data/foods';
import { MakananCard } from '@/components/makanan/MakananCard';
import { MakananFilterBar, type FoodSortOption } from '@/components/makanan/MakananFilterBar';
import { EmptyState } from '@/components/ui/States';

export function MakananList() {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<FoodSortOption>('default');

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    const result = foods.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.mainIngredients.some((ing) => ing.toLowerCase().includes(q))
    );
    return sort === 'name' ? [...result].sort((a, b) => a.name.localeCompare(b.name)) : result;
  }, [query, sort]);

  return (
    <>
      <MakananFilterBar query={query} onQueryChange={setQuery} sort={sort} onSortChange={setSort} />

      {filtered.length === 0 ? (
        <EmptyState title="Makanan tidak ditemukan" description="Coba kata kunci lain." />
      ) : (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((food) => (
              <motion.div
                key={food.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <MakananCard food={food} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </>
  );
}
