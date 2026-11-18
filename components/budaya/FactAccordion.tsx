'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { CultureEntry } from '@/lib/types';
import { CulturePictureView } from '@/components/budaya/CulturePictureView';
import { cn } from '@/lib/utils';

export function FactAccordion({ facts }: { facts: CultureEntry[] }) {
  const [openId, setOpenId] = useState<string | null>(facts[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {facts.map((fact) => {
        const isOpen = openId === fact.id;
        return (
          <div key={fact.id} className="overflow-hidden rounded-xl2 border border-subtle bg-surface">
            <button
              type="button"
              onClick={() => setOpenId(isOpen ? null : fact.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-3 px-4 py-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lamongan-500"
            >
              {fact.picture && (
                <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg">
                  <CulturePictureView picture={fact.picture} className="h-14 w-14" />
                </span>
              )}
              <span className="flex-1 font-display text-sm font-semibold">{fact.title}</span>
              <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="h-4 w-4 text-secondary" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className={cn('text-sm text-secondary')}
                >
                  {fact.picture && (
                    <div className="overflow-hidden">
                      <CulturePictureView picture={fact.picture} className="h-44 w-full sm:h-56" showCaption />
                    </div>
                  )}
                  <p className="px-5 py-4">{fact.summary}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
