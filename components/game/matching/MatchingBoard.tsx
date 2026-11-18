'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Target, RotateCcw, Trophy } from 'lucide-react';
import { MatchingCard } from './MatchingCard';
import { Button } from '@/components/ui/Button';
import { destinationPhoto, foodPhoto } from '@/data/photos';
import { cn } from '@/lib/utils';
import { useGameAudio } from '@/lib/audio/AudioProvider';

type Difficulty = 'mudah' | 'sedang' | 'sulit';

const DIFFICULTY_PAIRS: Record<Difficulty, number> = {
  mudah: 4,
  sedang: 6,
  sulit: 8,
};

const THEME_ITEMS = [
  { image: destinationPhoto('wisata-bahari-lamongan'), label: 'Wisata Bahari' },
  { image: destinationPhoto('goa-maharani'), label: 'Goa Maharani' },
  { image: destinationPhoto('makam-sunan-drajat'), label: 'Sunan Drajat' },
  { image: foodPhoto('pecel-lele'), label: 'Pecel Lele' },
  { image: foodPhoto('soto-lamongan'), label: 'Soto Lamongan' },
  { image: foodPhoto('wingko'), label: 'Wingko' },
  { image: destinationPhoto('pantai-kutang'), label: 'Pantai Kutang' },
  { image: destinationPhoto('waduk-gondang'), label: 'Waduk Gondang' },
];

interface CardData {
  key: string;
  pairId: number;
  image?: string;
  label: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function buildDeck(difficulty: Difficulty): CardData[] {
  const pairCount = DIFFICULTY_PAIRS[difficulty];
  const items = THEME_ITEMS.slice(0, pairCount);
  const deck: CardData[] = items.flatMap((item, i) => [
    { key: `${i}-a`, pairId: i, image: item.image, label: item.label },
    { key: `${i}-b`, pairId: i, image: item.image, label: item.label },
  ]);
  return shuffle(deck);
}

export function MatchingBoard() {
  const { playClick, playSuccess, playVictory } = useGameAudio();
  const [difficulty, setDifficulty] = useState<Difficulty>('mudah');
  const [deck, setDeck] = useState<CardData[]>(() => buildDeck('mudah'));
  const [flipped, setFlipped] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState<'idle' | 'playing' | 'won'>('idle');

  const totalPairs = DIFFICULTY_PAIRS[difficulty];

  useEffect(() => {
    if (status !== 'playing') return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    if (matched.size === totalPairs && status === 'playing') {
      setStatus('won');
      playVictory();
    }
  }, [matched, totalPairs, status, playVictory]);

  function handleCardClick(card: CardData) {
    if (status !== 'playing' || flipped.length === 2) return;
    if (flipped.includes(card.key)) return;

    playClick();
    const nextFlipped = [...flipped, card.key];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setAttempts((a) => a + 1);
      const [firstKey, secondKey] = nextFlipped;
      const first = deck.find((c) => c.key === firstKey)!;
      const second = deck.find((c) => c.key === secondKey)!;

      if (first.pairId === second.pairId) {
        if (matched.size + 1 < totalPairs) playSuccess(); // pasangan terakhir diganti suara kemenangan
        setMatched((m) => new Set(m).add(first.pairId));
        setScore((s) => s + 50);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 700);
      }
    }
  }

  function startGame(diff: Difficulty = difficulty) {
    setDifficulty(diff);
    setDeck(buildDeck(diff));
    setFlipped([]);
    setMatched(new Set());
    setAttempts(0);
    setScore(0);
    setSeconds(0);
    setStatus('playing');
  }

  const gridCols = useMemo(() => {
    if (totalPairs <= 4) return 'grid-cols-4';
    if (totalPairs <= 6) return 'grid-cols-4 sm:grid-cols-6';
    return 'grid-cols-4 sm:grid-cols-4';
  }, [totalPairs]);

  return (
    <div>
      {status === 'idle' && (
        <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center">
          <h3 className="mb-4 font-display text-lg font-semibold">Pilih Tingkat Kesulitan</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {(Object.keys(DIFFICULTY_PAIRS) as Difficulty[]).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors',
                  difficulty === diff
                    ? 'bg-lamongan-600 text-white'
                    : 'bg-black/5 text-secondary hover:bg-black/10 dark:bg-white/10'
                )}
              >
                {diff} ({DIFFICULTY_PAIRS[diff]} pasang)
              </button>
            ))}
          </div>
          <Button onClick={() => startGame(difficulty)} className="mt-6">
            Mulai Bermain
          </Button>
        </div>
      )}

      {status !== 'idle' && (
        <>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
              <p className="text-xs text-secondary">Skor</p>
              <p className="font-display text-xl font-bold">{score}</p>
            </div>
            <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
              <p className="flex items-center justify-center gap-1 text-xs text-secondary">
                <Target className="h-3 w-3" aria-hidden /> Percobaan
              </p>
              <p className="font-display text-xl font-bold">{attempts}</p>
            </div>
            <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
              <p className="flex items-center justify-center gap-1 text-xs text-secondary">
                <Timer className="h-3 w-3" aria-hidden /> Waktu
              </p>
              <p className="font-display text-xl font-bold">{seconds}s</p>
            </div>
          </div>

          <div className={cn('relative grid gap-3', gridCols)}>
            {deck.map((card) => (
              <MatchingCard
                key={card.key}
                image={card.image}
                label={card.label}
                isFlipped={flipped.includes(card.key)}
                isMatched={matched.has(card.pairId)}
                onClick={() => handleCardClick(card)}
              />
            ))}

            {status === 'won' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl2 bg-black/50 backdrop-blur-sm"
              >
                <Trophy className="h-10 w-10 text-amber-400" aria-hidden />
                <p className="font-display text-xl font-bold text-white">Selesai!</p>
                <p className="text-sm text-white/90">
                  Skor {score} · {attempts} percobaan · {seconds}s
                </p>
                <Button onClick={() => startGame(difficulty)} size="sm">
                  <RotateCcw className="h-4 w-4" aria-hidden /> Main Lagi
                </Button>
              </motion.div>
            )}
          </div>

          {status === 'playing' && (
            <button
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs font-medium text-secondary hover:underline"
            >
              Ganti tingkat kesulitan
            </button>
          )}
        </>
      )}
    </div>
  );
}
