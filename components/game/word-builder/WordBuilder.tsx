'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Eraser, RotateCcw, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';
import { destinationPhoto, foodPhoto } from '@/data/photos';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useGameAudio } from '@/lib/audio/AudioProvider';

type Difficulty = 'mudah' | 'sedang' | 'sulit';

interface WordItem {
  word: string;
  hint: string;
  fact: string;
  image?: string;
}

// Setiap kata punya foto asli sebagai petunjuk (foto yang sama dengan halaman Wisata dan Makanan).
const WORDS: Record<Difficulty, WordItem[]> = {
  mudah: [
    { word: 'SOTO', hint: 'Makanan berkuah kuning yang hangat, khas Lamongan.', fact: 'Soto Lamongan biasanya ditaburi koya yang gurih.', image: foodPhoto('soto-lamongan') },
    { word: 'TAHU', hint: 'Bahan dari kedelai yang ada di Tahu Campur.', fact: 'Tahu campur adalah salah satu kuliner khas Lamongan.', image: foodPhoto('tahu-campur') },
    { word: 'LELE', hint: 'Ikan berkumis yang jadi ikon Lamongan. Enak jadi pecel!', fact: 'Pecel lele adalah makanan khas yang terkenal dari Lamongan.', image: foodPhoto('pecel-lele') },
    { word: 'GOA', hint: 'Lubang besar di dalam bukit, ada batu yang menggantung.', fact: 'Goa Maharani di Paciran punya stalaktit dan stalagmit.', image: destinationPhoto('goa-maharani') },
  ],
  sedang: [
    { word: 'WADUK', hint: 'Danau buatan untuk menampung air. Di sini ada wisata perahu.', fact: 'Waduk Gondang bisa dinikmati sambil naik perahu.', image: destinationPhoto('waduk-gondang') },
    { word: 'BORAN', hint: 'Nasi yang dijual dengan cara dibawa keliling, namanya nasi ...an.', fact: 'Nasi boranan adalah kuliner khas Lamongan.', image: foodPhoto('nasi-boranan') },
    { word: 'MAKAM', hint: 'Tempat peristirahatan terakhir. Di Paciran ada makam Sunan Drajat.', fact: 'Makam Sunan Drajat sering dikunjungi peziarah dan wisatawan.', image: destinationPhoto('makam-sunan-drajat') },
    { word: 'WINGKO', hint: 'Kue manis dari kelapa, enak untuk oleh-oleh.', fact: 'Wingko adalah jajanan khas yang cocok dibawa pulang.', image: foodPhoto('wingko') },
  ],
  sulit: [
    { word: 'PANTAI', hint: 'Tepi laut yang berpasir, tempat bermain air.', fact: 'Pantai Kutang ada di pesisir Lamongan.', image: destinationPhoto('pantai-kutang') },
    { word: 'WISATA', hint: 'Kata pertama di nama WBL. Artinya jalan-jalan untuk bersenang-senang.', fact: 'Wisata Bahari Lamongan (WBL) ada di pesisir Paciran.', image: destinationPhoto('wisata-bahari-lamongan') },
    { word: 'PERAHU', hint: 'Kendaraan air yang dipakai di foto ini.', fact: 'Perahu dipakai untuk berkeliling di waduk dan juga untuk mencari ikan.', image: destinationPhoto('waduk-gondang') },
    { word: 'MONUMEN', hint: 'Bangunan peringatan untuk mengenang peristiwa atau tokoh.', fact: 'Monumen Van Der Wijck mengingatkan pada kisah kapal Van Der Wijck.', image: destinationPhoto('monumen-van-der-wijck') },
  ],
};

const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  mudah: 'Mudah (4 huruf)',
  sedang: 'Sedang (5–6 huruf)',
  sulit: 'Sulit (6–7 huruf)',
};

interface Tile {
  id: number;
  char: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function makeTiles(word: string): Tile[] {
  const base = word.split('').map((char, id) => ({ id, char }));
  let tiles = shuffle(base);
  // Hindari susunan awal yang sudah benar.
  for (let i = 0; i < 5 && tiles.map((t) => t.char).join('') === word; i++) tiles = shuffle(base);
  return tiles;
}

export function WordBuilder() {
  const { playClick, playSuccess, playVictory } = useGameAudio();
  const [difficulty, setDifficulty] = useState<Difficulty>('mudah');
  const [phase, setPhase] = useState<'idle' | 'playing' | 'done'>('idle');
  const [words, setWords] = useState<WordItem[]>([]);
  const [index, setIndex] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<(number | null)[]>([]);
  const [result, setResult] = useState<'none' | 'correct' | 'wrong'>('none');
  const [score, setScore] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [hints, setHints] = useState(0);

  const current = words[index];

  function setupWord(item: WordItem) {
    setTiles(makeTiles(item.word));
    setSlots(Array(item.word.length).fill(null));
    setResult('none');
    setWrongs(0);
    setHints(0);
  }

  function startGame(diff: Difficulty) {
    const list = shuffle(WORDS[diff]);
    setDifficulty(diff);
    setWords(list);
    setIndex(0);
    setScore(0);
    setPhase('playing');
    setupWord(list[0]!);
  }

  function evaluate(next: (number | null)[], item: WordItem, currentWrongs: number, currentHints: number) {
    const guess = next.map((id) => tiles.find((t) => t.id === id)?.char ?? '').join('');
    if (guess === item.word) {
      playSuccess();
      setResult('correct');
      setScore((s) => s + Math.max(40, 100 - currentWrongs * 10 - currentHints * 20));
    } else {
      setResult('wrong');
      setWrongs(currentWrongs + 1);
    }
  }

  function placeTile(id: number) {
    if (!current || result === 'correct') return;
    const i = slots.indexOf(null);
    if (i === -1) return;
    playClick();
    const next = [...slots];
    next[i] = id;
    setSlots(next);
    setResult('none');
    if (!next.includes(null)) evaluate(next, current, wrongs, hints);
  }

  function removeSlot(i: number) {
    if (result === 'correct' || slots[i] === null) return;
    playClick();
    const next = [...slots];
    next[i] = null;
    setSlots(next);
    setResult('none');
  }

  function clearAll() {
    if (!current || result === 'correct') return;
    setSlots(Array(current.word.length).fill(null));
    setResult('none');
  }

  function useHint() {
    if (!current || result === 'correct') return;
    const word = current.word;
    let i = 0;
    while (i < word.length) {
      const slotId = slots[i];
      const ch = slotId === null || slotId === undefined ? null : tiles.find((t) => t.id === slotId)?.char;
      if (ch !== word[i]) break;
      i++;
    }
    if (i >= word.length) return;
    playClick();
    const prefix = slots.slice(0, i);
    const tile = tiles.find((t) => t.char === word[i] && !prefix.includes(t.id));
    if (!tile) return;
    const next: (number | null)[] = [...prefix, tile.id, ...Array(word.length - i - 1).fill(null)];
    setSlots(next);
    const nextHints = hints + 1;
    setHints(nextHints);
    setResult('none');
    if (!next.includes(null)) evaluate(next, current, wrongs, nextHints);
  }

  function nextWord() {
    if (index + 1 < words.length) {
      setIndex(index + 1);
      setupWord(words[index + 1]!);
    } else {
      setPhase('done');
      playVictory();
    }
  }

  if (phase === 'idle') {
    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center">
        <h3 className="mb-1 font-display text-lg font-semibold">Pilih Tingkat Kesulitan</h3>
        <p className="mb-4 text-sm text-secondary">Lihat foto petunjuknya, lalu susun huruf acak menjadi kata.</p>
        <div className="flex flex-wrap justify-center gap-2">
          {(Object.keys(WORDS) as Difficulty[]).map((diff) => (
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
    return (
      <div className="rounded-xl2 border border-subtle bg-surface p-8 text-center">
        <Trophy className="mx-auto h-10 w-10 text-amber-400" aria-hidden />
        <h3 className="mt-3 font-display text-xl font-bold">Hebat, semua kata selesai!</h3>
        <p className="mt-1 text-sm text-secondary">Skor akhir kamu: {score}</p>
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

  if (!current) return null;

  return (
    <div>
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Skor</p>
          <p className="font-display text-xl font-bold">{score}</p>
        </div>
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Kata</p>
          <p className="font-display text-xl font-bold">{index + 1} / {words.length}</p>
        </div>
      </div>

      <div className="rounded-xl2 border border-subtle bg-surface p-5 text-center shadow-soft dark:shadow-soft-dark">
        <SafeImage
          src={current.image}
          alt="Foto petunjuk kata"
          fallbackLabel="Foto tidak dapat dimuat, baca petunjuk di bawah"
          className="mx-auto mb-3 h-40 w-full max-w-sm rounded-xl object-cover shadow-soft sm:h-48"
        />
        <p className="text-sm text-secondary">{current.hint}</p>

        <motion.div
          key={`${index}-${wrongs}`}
          animate={result === 'wrong' ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-5 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Susunan hurufmu"
        >
          {slots.map((id, i) => {
            const ch = id === null ? '' : tiles.find((t) => t.id === id)?.char ?? '';
            return (
              <button
                key={i}
                type="button"
                onClick={() => removeSlot(i)}
                disabled={id === null || result === 'correct'}
                aria-label={ch ? `Huruf ke-${i + 1}: ${ch}. Tekan untuk mengembalikan` : `Kotak huruf ke-${i + 1}, kosong`}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl border-2 font-display text-xl font-bold transition-colors sm:h-14 sm:w-14',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
                  result === 'correct' && 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
                  result === 'wrong' && 'border-terracotta-500',
                  result === 'none' && (ch ? 'border-lamongan-500' : 'border-dashed border-subtle')
                )}
              >
                {ch || <span className="text-current opacity-20">{current.word[i]}</span>}
              </button>
            );
          })}
        </motion.div>

        <div className="mt-5 flex flex-wrap justify-center gap-2" role="group" aria-label="Huruf yang tersedia">
          {tiles.map((t) => {
            const used = slots.includes(t.id);
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => placeTile(t.id)}
                disabled={used || result === 'correct'}
                aria-label={`Huruf ${t.char}`}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-500 font-display text-xl font-bold text-white shadow-soft transition-all sm:h-14 sm:w-14',
                  'hover:bg-terracotta-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500 focus-visible:ring-offset-2',
                  used && 'scale-90 opacity-30'
                )}
              >
                {t.char}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button size="sm" variant="outline" onClick={useHint} disabled={result === 'correct'}>
            <Lightbulb className="h-4 w-4" aria-hidden /> Petunjuk
          </Button>
          <Button size="sm" variant="outline" onClick={clearAll} disabled={result === 'correct'}>
            <Eraser className="h-4 w-4" aria-hidden /> Hapus
          </Button>
        </div>

        <div className="mt-4 min-h-[3.5rem]" aria-live="polite">
          {result === 'wrong' && (
            <p className="text-sm font-medium text-terracotta-600 dark:text-terracotta-300">
              Belum tepat. Tekan kotak huruf untuk menukarnya, lalu coba lagi!
            </p>
          )}
          {result === 'correct' && (
            <div className="space-y-3">
              <p className="flex items-center justify-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" aria-hidden /> Benar! Katanya {current.word}.
              </p>
              <p className="text-xs text-secondary">{current.fact}</p>
              <Button size="sm" onClick={nextWord}>
                {index + 1 < words.length ? 'Kata Berikutnya' : 'Lihat Hasil'} <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPhase('idle')}
        className="mt-4 text-xs font-medium text-secondary hover:underline"
      >
        Ganti tingkat kesulitan
      </button>
    </div>
  );
}
