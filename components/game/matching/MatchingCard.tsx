'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { cn } from '@/lib/utils';

interface MatchingCardProps {
  image?: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function MatchingCard({ image, label, isFlipped, isMatched, onClick }: MatchingCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isFlipped || isMatched}
      aria-label={isFlipped || isMatched ? label : 'Kartu tertutup'}
      className="aspect-square w-full rounded-xl [perspective:1000px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped || isMatched ? 180 : 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Tertutup */}
        <div className="absolute inset-0 flex items-center justify-center rounded-xl border border-subtle bg-gradient-to-br from-lamongan-500 to-lamongan-700 [backface-visibility:hidden]">
          <HelpCircle className="h-6 w-6 text-white/70" aria-hidden />
        </div>
        {/* Terbuka: foto asli */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden rounded-xl border-2 bg-surface [backface-visibility:hidden] [transform:rotateY(180deg)]',
            isMatched ? 'border-emerald-500' : 'border-lamongan-400'
          )}
        >
          <SafeImage src={image} alt={label} fallbackLabel={label} className="h-full w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-1 pb-1 pt-4 text-center text-[10px] font-semibold leading-tight text-white">
            {label}
          </span>
        </div>
      </motion.div>
    </button>
  );
}
