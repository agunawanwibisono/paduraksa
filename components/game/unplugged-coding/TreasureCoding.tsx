'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Play, RotateCcw, Trash2,
  Star, Trophy, type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CODING_LEVELS, type CodingLevel } from '@/data/coding-levels';
import { cn } from '@/lib/utils';
import { useGameAudio } from '@/lib/audio/AudioProvider';

type Command = 'atas' | 'bawah' | 'kiri' | 'kanan';
type Status = 'idle' | 'running' | 'won' | 'crashed' | 'short';
type Pos = { r: number; c: number };

const COMMANDS: { id: Command; label: string; icon: LucideIcon; dr: number; dc: number }[] = [
  { id: 'atas', label: 'Atas', icon: ArrowUp, dr: -1, dc: 0 },
  { id: 'bawah', label: 'Bawah', icon: ArrowDown, dr: 1, dc: 0 },
  { id: 'kiri', label: 'Kiri', icon: ArrowLeft, dr: 0, dc: -1 },
  { id: 'kanan', label: 'Kanan', icon: ArrowRight, dr: 0, dc: 1 },
];

function parseLevel(level: CodingLevel) {
  const grid = level.map.map((row) => row.split(''));
  let start: Pos = { r: 0, c: 0 };
  let goal: Pos = { r: 0, c: 0 };
  grid.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 'S') start = { r, c };
      if (cell === 'T') goal = { r, c };
    })
  );
  return { grid, start, goal, rows: grid.length, cols: grid[0]!.length };
}

/** Jumlah kartu terpendek untuk mencapai harta karun (BFS). */
function shortestPath(level: CodingLevel): number {
  const { grid, start, goal, rows, cols } = parseLevel(level);
  const seen = new Set([`${start.r},${start.c}`]);
  const queue: { p: Pos; d: number }[] = [{ p: start, d: 0 }];
  while (queue.length) {
    const { p, d } = queue.shift()!;
    if (p.r === goal.r && p.c === goal.c) return d;
    for (const cmd of COMMANDS) {
      const n = { r: p.r + cmd.dr, c: p.c + cmd.dc };
      const key = `${n.r},${n.c}`;
      if (n.r < 0 || n.c < 0 || n.r >= rows || n.c >= cols) continue;
      if (grid[n.r]![n.c] === '#' || seen.has(key)) continue;
      seen.add(key);
      queue.push({ p: n, d: d + 1 });
    }
  }
  return Infinity;
}

const STEP_MS = 500;

function Rock() {
  return (
    <svg viewBox="0 0 64 64" className="h-4/5 w-4/5" aria-hidden>
      <path d="M6 54 L18 24 L30 34 L40 12 L58 54 Z" fill="#6b7a82" />
      <path d="M40 12 L58 54 L44 54 L36 30 Z" fill="#4d5b63" />
      <path d="M18 24 L30 34 L22 54 L6 54 Z" fill="#8a999f" />
    </svg>
  );
}

function Chest() {
  return (
    <svg viewBox="0 0 64 64" className="h-4/5 w-4/5" aria-hidden>
      <rect x="8" y="26" width="48" height="28" rx="4" fill="#933e11" />
      <path d="M8 30 Q8 12 32 12 Q56 12 56 30 Z" fill="#b84e11" />
      <rect x="8" y="28" width="48" height="5" fill="#f9b327" />
      <rect x="28" y="30" width="8" height="12" rx="2" fill="#f9b327" />
      <circle cx="32" cy="36" r="2" fill="#622c14" />
      <circle cx="20" cy="20" r="3" fill="#f9b327" />
      <circle cx="44" cy="20" r="3" fill="#f9b327" />
    </svg>
  );
}

export function TreasureCoding() {
  const { playClick, playVictory } = useGameAudio();
  const [levelIndex, setLevelIndex] = useState(0);
  const [program, setProgram] = useState<Command[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [step, setStep] = useState(0);
  const level = CODING_LEVELS[levelIndex]!;
  const { grid, start, goal, rows, cols } = useMemo(() => parseLevel(level), [level]);
  const par = useMemo(() => shortestPath(level), [level]);
  const maxCards = par + 4;
  const [pos, setPos] = useState<Pos>(start);
  const [stars, setStars] = useState<Record<number, number>>({});

  useEffect(() => {
    if (status !== 'running') return;

    if (pos.r === goal.r && pos.c === goal.c) {
      const earned = program.length <= par ? 3 : program.length <= par + 2 ? 2 : 1;
      setStars((s) => ({ ...s, [level.id]: Math.max(s[level.id] ?? 0, earned) }));
      setStatus('won');
      playVictory();
      return;
    }
    if (step >= program.length) {
      setStatus('short');
      return;
    }

    const t = setTimeout(() => {
      const cmd = COMMANDS.find((c) => c.id === program[step])!;
      const next = { r: pos.r + cmd.dr, c: pos.c + cmd.dc };
      const blocked =
        next.r < 0 || next.c < 0 || next.r >= rows || next.c >= cols || grid[next.r]![next.c] === '#';
      if (blocked) {
        setStatus('crashed');
        return;
      }
      playClick();
      setPos(next);
      setStep((s) => s + 1);
    }, STEP_MS);
    return () => clearTimeout(t);
  }, [status, step, pos, program, goal, rows, cols, grid, level.id, par, playClick, playVictory]);

  function chooseLevel(i: number) {
    setLevelIndex(i);
    setProgram([]);
    setStatus('idle');
    setStep(0);
    setPos(parseLevel(CODING_LEVELS[i]!).start);
  }

  function resetRun() {
    setStatus('idle');
    setStep(0);
    setPos(start);
  }

  function addCommand(id: Command) {
    if (status !== 'idle' || program.length >= maxCards) return;
    playClick();
    setProgram((p) => [...p, id]);
  }

  function removeCommand(i: number) {
    if (status !== 'idle') return;
    playClick();
    setProgram((p) => p.filter((_, idx) => idx !== i));
  }

  function run() {
    if (program.length === 0) return;
    playClick();
    setStep(0);
    setPos(start);
    setStatus('running');
  }

  const finished = status === 'won' || status === 'crashed' || status === 'short';
  const wonStars = stars[level.id] ?? 0;

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Pilih level">
        {CODING_LEVELS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => chooseLevel(i)}
            aria-pressed={i === levelIndex}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
              i === levelIndex ? 'bg-lamongan-600 text-white' : 'bg-black/5 text-secondary hover:bg-black/10 dark:bg-white/10'
            )}
          >
            Level {l.id}
            {(stars[l.id] ?? 0) > 0 && (
              <span className="flex" aria-label={`${stars[l.id]} bintang`}>
                {Array.from({ length: stars[l.id]! }).map((_, k) => (
                  <Star key={k} className="h-3 w-3 fill-sunny-400 text-sunny-400" aria-hidden />
                ))}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-xl2 border border-subtle bg-surface p-5 shadow-soft dark:shadow-soft-dark">
        <h2 className="font-display text-lg font-semibold">{level.name}</h2>
        <p className="mt-1 text-sm text-secondary">{level.story}</p>

        <div
          className="mx-auto mt-5 grid max-w-sm gap-1.5"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
          role="img"
          aria-label={`Papan permainan ${rows} kali ${cols}. Si Lele di baris ${pos.r + 1}, kolom ${pos.c + 1}. Harta karun di baris ${goal.r + 1}, kolom ${goal.c + 1}.`}
        >
          {grid.flatMap((row, r) =>
            row.map((cell, c) => {
              const isPlayer = pos.r === r && pos.c === c;
              return (
                <div
                  key={`${r}-${c}`}
                  className={cn(
                    'relative flex aspect-square items-center justify-center rounded-lg',
                    cell === '#' ? 'bg-lamongan-200 dark:bg-lamongan-800' : 'bg-lamongan-100 dark:bg-lamongan-900/40'
                  )}
                >
                  {cell === '#' && <Rock />}
                  {cell === 'T' && <Chest />}
                  {isPlayer && (
                    <motion.span
                      layoutId="si-lele"
                      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                      className="absolute inset-0.5 flex items-center justify-center rounded-lg bg-white shadow-soft"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/brand/logo-small.png" alt="" className="h-full w-full object-contain p-0.5" />
                    </motion.span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-secondary">Kartu perintah (tekan untuk menambah)</p>
          <div className="grid grid-cols-4 gap-2">
            {COMMANDS.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  type="button"
                  onClick={() => addCommand(cmd.id)}
                  disabled={status !== 'idle' || program.length >= maxCards}
                  aria-label={`Tambah kartu ${cmd.label}`}
                  className="flex flex-col items-center gap-1 rounded-xl bg-terracotta-500 py-3 text-white shadow-soft transition-colors hover:bg-terracotta-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Icon className="h-5 w-5" aria-hidden />
                  <span className="text-[11px] font-medium">{cmd.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-5">
          <p className="mb-2 text-xs font-medium text-secondary">
            Programmu ({program.length}/{maxCards} kartu)
          </p>
          <ol className="flex min-h-[3rem] flex-wrap gap-1.5 rounded-xl border border-dashed border-subtle p-2" aria-label="Urutan kartu">
            {program.length === 0 && <li className="px-1 py-2 text-xs text-secondary">Belum ada kartu. Tekan kartu panah di atas.</li>}
            {program.map((id, i) => {
              const cmd = COMMANDS.find((c) => c.id === id)!;
              const Icon = cmd.icon;
              const active = status === 'running' && i === step;
              return (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => removeCommand(i)}
                    disabled={status !== 'idle'}
                    aria-label={`Kartu ke-${i + 1}: ${cmd.label}${status === 'idle' ? '. Tekan untuk menghapus' : ''}`}
                    className={cn(
                      'flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
                      active ? 'border-sunny-500 bg-sunny-300 text-lamongan-900' : 'border-lamongan-400 bg-surface',
                      i < step && status === 'running' && 'opacity-50'
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button size="sm" onClick={run} disabled={status !== 'idle' || program.length === 0}>
            <Play className="h-4 w-4" aria-hidden /> Jalankan
          </Button>
          <Button size="sm" variant="outline" onClick={resetRun} disabled={status === 'idle' && step === 0}>
            <RotateCcw className="h-4 w-4" aria-hidden /> Ulangi
          </Button>
          <Button size="sm" variant="outline" onClick={() => { setProgram([]); resetRun(); }} disabled={status === 'running' || program.length === 0}>
            <Trash2 className="h-4 w-4" aria-hidden /> Hapus semua
          </Button>
        </div>

        <div className="mt-4 min-h-[3rem] text-sm" aria-live="polite">
          {status === 'idle' && <p className="text-secondary">Susun kartu dari posisi Si Lele sampai ke harta karun, lalu tekan Jalankan.</p>}
          {status === 'running' && <p className="text-secondary">Si Lele sedang berenang…</p>}
          {status === 'crashed' && (
            <p className="font-medium text-terracotta-600 dark:text-terracotta-300">Ups, Si Lele menabrak karang atau tepi kolam! Tekan Ulangi, lalu perbaiki kartunya.</p>
          )}
          {status === 'short' && (
            <p className="font-medium text-terracotta-600 dark:text-terracotta-300">Kartunya habis, tapi harta karun belum sampai. Tekan Ulangi, lalu tambah kartu.</p>
          )}
          {status === 'won' && (
            <div className="flex flex-wrap items-center gap-2 font-medium text-emerald-600 dark:text-emerald-400">
              <Trophy className="h-4 w-4" aria-hidden />
              Harta karun ketemu dengan {program.length} kartu! ({wonStars} bintang)
              {levelIndex + 1 < CODING_LEVELS.length && (
                <Button size="sm" onClick={() => chooseLevel(levelIndex + 1)}>
                  Level Berikutnya <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              )}
            </div>
          )}
        </div>
        {finished && status === 'won' && program.length > par && (
          <p className="text-xs text-secondary">Tips: ada jalan yang lebih pendek. Coba lagi untuk dapat 3 bintang.</p>
        )}
      </div>

      <details className="mt-6 rounded-xl2 border border-subtle bg-surface p-5">
        <summary className="cursor-pointer font-display text-sm font-semibold">Main tanpa layar (unplugged) di kelas</summary>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-secondary">
          <li>Buat kotak {rows}×{cols} di lantai memakai lakban atau kapur. Letakkan benda sebagai karang dan satu benda sebagai harta karun.</li>
          <li>Siapkan kartu panah dari kertas: atas, bawah, kiri, kanan.</li>
          <li>Satu anak menjadi Si Lele. Teman-temannya menyusun kartu di lantai sampai ke harta karun.</li>
          <li>Si Lele melangkah mengikuti kartu satu per satu. Kalau salah, bersama-sama cari kartu mana yang perlu diganti.</li>
        </ol>
      </details>
    </div>
  );
}
