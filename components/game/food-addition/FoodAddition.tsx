'use client';

import { useState } from 'react';
import { RotateCcw, Trophy, ArrowRight, CheckCircle2, Hash } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { SafeImage } from '@/components/ui/SafeImage';
import { foods } from '@/data/foods';
import { cn } from '@/lib/utils';
import { useGameAudio } from '@/lib/audio/AudioProvider';

type Difficulty = 'mudah' | 'sedang';

const MAX_SUM: Record<Difficulty, number> = { mudah: 5, sedang: 10 };
const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  mudah: 'Mudah (jumlah sampai 5)',
  sedang: 'Sedang (jumlah sampai 10)',
};
const QUESTIONS_PER_ROUND = 6;
const UNITS: Record<string, string> = { wingko: 'buah', 'nasi-boranan': 'bungkus' };

interface Question {
  foodName: string;
  image: string;
  unit: string;
  a: number;
  b: number;
  options: number[];
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function makeQuestion(diff: Difficulty): Question {
  const max = MAX_SUM[diff];
  const food = foods[randInt(0, foods.length - 1)]!;
  const sum = randInt(diff === 'mudah' ? 2 : 6, max);
  const a = randInt(1, sum - 1);
  const b = sum - a;
  const options = new Set<number>([sum]);
  while (options.size < 4) {
    const candidate = sum + randInt(-3, 3);
    if (candidate >= 1 && candidate !== sum) options.add(candidate);
  }
  return {
    foodName: food.name,
    image: food.imageUrl,
    unit: UNITS[food.slug] ?? 'porsi',
    a,
    b,
    options: shuffle([...options]).sort((x, y) => x - y),
  };
}

function FoodGroup({ count, image, label, offset, showNumbers }: { count: number; image: string; label: string; offset: number; showNumbers: boolean }) {
  return (
    <div className="flex max-w-[11rem] flex-wrap justify-center gap-1.5 sm:max-w-[16rem]" role="img" aria-label={label}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="relative">
          <SafeImage src={image} alt="" className="h-12 w-12 rounded-full border-2 border-white object-cover shadow-soft sm:h-16 sm:w-16" />
          {showNumbers && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-terracotta-500 text-[11px] font-bold text-white">
              {offset + i + 1}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export function FoodAddition() {
  const { playClick, playSuccess, playVictory } = useGameAudio();
  const [difficulty, setDifficulty] = useState<Difficulty>('mudah');
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrongPicks, setWrongPicks] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  const q = questions[index];

  function startGame(diff: Difficulty) {
    setDifficulty(diff);
    setQuestions(Array.from({ length: QUESTIONS_PER_ROUND }, () => makeQuestion(diff)));
    setIndex(0);
    setScore(0);
    setWrongPicks([]);
    setSolved(false);
    setShowNumbers(false);
    setPhase('playing');
  }

  function pick(n: number) {
    if (!q || solved || wrongPicks.includes(n)) return;
    if (n === q.a + q.b) {
      playSuccess();
      setSolved(true);
      setScore((s) => s + (wrongPicks.length === 0 ? 10 : 5));
    } else {
      playClick();
      setWrongPicks((w) => [...w, n]);
    }
  }

  function next() {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setWrongPicks([]);
      setSolved(false);
      setShowNumbers(false);
    } else {
      setPhase('done');
      playVictory();
    }
  }

  if (phase === 'idle') {
    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center">
        <h3 className="mb-1 font-display text-lg font-semibold">Pilih Tingkat Kesulitan</h3>
        <p className="mb-4 text-sm text-secondary">Hitung makanan tradisional Lamongan, lalu pilih jumlahnya.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(MAX_SUM) as Difficulty[]).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setDifficulty(diff)}
              aria-pressed={difficulty === diff}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
                difficulty === diff ? 'bg-lamongan-600 text-white' : 'bg-black/5 text-secondary hover:bg-black/10 dark:bg-white/10'
              )}
            >
              {DIFFICULTY_LABEL[diff]}
            </button>
          ))}
        </div>
        <Button onClick={() => startGame(difficulty)} className="mt-6">
          Mulai Bermain
        </Button>
      </div>
    );
  }

  if (phase === 'done') {
    const perfect = score === QUESTIONS_PER_ROUND * 10;
    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center">
        <Trophy className="mx-auto h-10 w-10 text-amber-400" aria-hidden />
        <h3 className="mt-3 font-display text-xl font-bold">{perfect ? 'Hebat sekali, semuanya benar!' : 'Hebat, kamu sudah selesai!'}</h3>
        <p className="mt-1 text-sm text-secondary">Skor kamu: {score} dari {QUESTIONS_PER_ROUND * 10}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button onClick={() => startGame(difficulty)} size="sm">
            <RotateCcw className="h-4 w-4" aria-hidden /> Main Lagi
          </Button>
          <Button onClick={() => setPhase('idle')} size="sm" variant="outline">
            Ganti tingkat
          </Button>
        </div>
      </div>
    );
  }

  if (!q) return null;
  const total = q.a + q.b;

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Skor</p>
          <p className="font-display text-xl font-bold">{score}</p>
        </div>
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Soal</p>
          <p className="font-display text-xl font-bold">{index + 1} / {questions.length}</p>
        </div>
      </div>

      <div className="rounded-xl2 border border-subtle bg-surface p-5 text-center shadow-soft dark:shadow-soft-dark">
        <p className="text-sm text-secondary">
          Ada {q.a} {q.unit} {q.foodName}, lalu datang {q.b} {q.unit} lagi. Berapa semuanya?
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-5">
          <FoodGroup count={q.a} image={q.image} offset={0} showNumbers={showNumbers} label={`${q.a} ${q.unit} ${q.foodName}`} />
          <span className="font-display text-3xl font-bold text-terracotta-500" aria-label="ditambah">+</span>
          <FoodGroup count={q.b} image={q.image} offset={q.a} showNumbers={showNumbers} label={`${q.b} ${q.unit} ${q.foodName}`} />
          <span className="font-display text-3xl font-bold text-terracotta-500" aria-label="sama dengan">=</span>
          <span
            className={cn(
              'flex h-14 w-14 items-center justify-center rounded-xl border-2 font-display text-2xl font-bold sm:h-16 sm:w-16',
              solved ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300' : 'border-dashed border-subtle text-secondary'
            )}
          >
            {solved ? total : '?'}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setShowNumbers((v) => !v)}
          aria-pressed={showNumbers}
          className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-subtle px-3 py-1.5 text-xs font-medium text-secondary hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500"
        >
          <Hash className="h-3.5 w-3.5" aria-hidden /> {showNumbers ? 'Sembunyikan nomor' : 'Bantu hitung dengan nomor'}
        </button>

        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="Pilihan jawaban">
          {q.options.map((n) => {
            const wrong = wrongPicks.includes(n);
            const right = solved && n === total;
            return (
              <button
                key={n}
                type="button"
                onClick={() => pick(n)}
                disabled={wrong || solved}
                aria-label={`Jawaban ${n}`}
                className={cn(
                  'h-14 rounded-xl border-2 font-display text-2xl font-bold transition-colors sm:h-16',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500 focus-visible:ring-offset-2',
                  right && 'border-emerald-500 bg-emerald-500 text-white',
                  wrong && 'border-subtle opacity-30',
                  !right && !wrong && 'border-lamongan-400 bg-surface hover:bg-lamongan-50 dark:hover:bg-white/5'
                )}
              >
                {n}
              </button>
            );
          })}
        </div>

        <div className="mt-4 min-h-[3.5rem]" aria-live="polite">
          {!solved && wrongPicks.length > 0 && (
            <p className="text-sm font-medium text-terracotta-600 dark:text-terracotta-300">Belum tepat. Ayo hitung lagi satu per satu!</p>
          )}
          {solved && (
            <div className="space-y-3">
              <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Benar! {q.a} + {q.b} = {total}
              </p>
              <Button size="sm" onClick={next}>
                {index + 1 < questions.length ? 'Soal Berikutnya' : 'Lihat Hasil'} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          )}
        </div>
      </div>

      <button type="button" onClick={() => setPhase('idle')} className="mt-4 text-xs font-medium text-secondary hover:underline">
        Ganti tingkat kesulitan
      </button>
    </div>
  );
}
