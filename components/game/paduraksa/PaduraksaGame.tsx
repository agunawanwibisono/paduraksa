'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, ChevronRight, RotateCcw, Trophy, Star, LockKeyhole, Music, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useGameAudio } from '@/lib/audio/useGameAudio';

type PartId =
  | 'pondasi' | 'badan' | 'ambang' | 'mahkota'
  | 'tiang-kiri' | 'tiang-kanan' | 'atap'
  | 'ornamen-kiri' | 'ornamen-kanan';

type Part = {
  id: PartId;
  name: string;
  slot: string;
  hint: string;
};

type Level = {
  number: number;
  name: string;
  description: string;
  parts: Part[];
  hint: boolean;
};

const PARTS: Record<PartId, Part> = {
  pondasi: { id: 'pondasi', name: 'Pondasi bertingkat', slot: 'pondasi', hint: 'Bagian paling bawah untuk menopang gapura.' },
  badan: { id: 'badan', name: 'Badan dan dua tiang', slot: 'badan', hint: 'Dua tiang kokoh yang berdiri seimbang di kiri dan kanan.' },
  ambang: { id: 'ambang', name: 'Ambang / balok atas', slot: 'ambang', hint: 'Balok penghubung di atas kedua tiang.' },
  mahkota: { id: 'mahkota', name: 'Mahkota gapura', slot: 'mahkota', hint: 'Hiasan puncak yang menjadi bagian tertinggi.' },
  'tiang-kiri': { id: 'tiang-kiri', name: 'Tiang kiri', slot: 'tiang-kiri', hint: 'Tiang penyangga di sisi kiri.' },
  'tiang-kanan': { id: 'tiang-kanan', name: 'Tiang kanan', slot: 'tiang-kanan', hint: 'Tiang penyangga di sisi kanan.' },
  atap: { id: 'atap', name: 'Atap bertingkat', slot: 'atap', hint: 'Susunan atap tepat di bawah mahkota.' },
  'ornamen-kiri': { id: 'ornamen-kiri', name: 'Ornamen kiri', slot: 'ornamen-kiri', hint: 'Hiasan kecil di sisi luar kiri gapura.' },
  'ornamen-kanan': { id: 'ornamen-kanan', name: 'Ornamen kanan', slot: 'ornamen-kanan', hint: 'Hiasan kecil di sisi luar kanan gapura.' },
};

const LEVELS: Level[] = [
  {
    number: 1, name: 'Mudah', description: 'Rakit 4 bagian besar dengan panduan posisi.',
    parts: [PARTS.pondasi, PARTS.badan, PARTS.ambang, PARTS.mahkota], hint: true,
  },
  {
    number: 2, name: 'Sedang', description: 'Rakit 6 bagian. Tiang kiri dan kanan dipasang terpisah.',
    parts: [PARTS.pondasi, PARTS['tiang-kiri'], PARTS['tiang-kanan'], PARTS.ambang, PARTS.atap, PARTS.mahkota], hint: true,
  },
  {
    number: 3, name: 'Sulit', description: 'Rakit 8 bagian termasuk ornamen, dengan petunjuk minimal.',
    parts: [PARTS.pondasi, PARTS['tiang-kiri'], PARTS['tiang-kanan'], PARTS.ambang, PARTS.atap, PARTS.mahkota, PARTS['ornamen-kiri'], PARTS['ornamen-kanan']], hint: false,
  },
];

function PartShape({ id }: { id: PartId }) {
  const stone = '#a94f25';
  const edge = '#713318';
  const light = '#e6a06b';
  const common = { fill: stone, stroke: edge, strokeWidth: 3, strokeLinejoin: 'round' as const };
  return (
    <svg viewBox="0 0 320 100" className="h-full w-full" aria-hidden="true">
      {id === 'pondasi' && <g {...common}>
        <path d="M12 75H308V94H12z M28 55H292V75H28z M48 37H272V55H48z"/>
        <path d="M20 82H300M36 63H284M55 45H265" fill="none" stroke={light} strokeWidth="3"/>
        <path d="M75 37v18m85-18v18m85-18v18" stroke={edge} strokeWidth="2"/>
      </g>}
      {(id === 'badan' || id === 'tiang-kiri' || id === 'tiang-kanan') && <g {...common}>
        {(id === 'badan' || id === 'tiang-kiri') && <path d="M48 96V8h48v88z M40 18h64v10H40z M34 38h76v10H34z M28 58h88v10H28z M22 78h100v18H22z"/>}
        {(id === 'badan' || id === 'tiang-kanan') && <path d="M224 96V8h48v88z M216 18h64v10h-64z M210 38h76v10h-76z M204 58h88v10h-88z M198 78h100v18H198z"/>}
        <path d="M58 13h28M234 13h28M48 43h48M224 43h48M38 63h68M214 63h68" stroke={light} strokeWidth="3" fill="none"/>
        {id === 'badan' && <path d="M122 96V54h76v42" fill="#f2d3ae" stroke={edge} strokeWidth="3"/>}
      </g>}
      {id === 'ambang' && <g {...common}>
        <path d="M14 18H306V58H14z M26 58H58V91H26z M262 58H294V91H262z"/>
        <path d="M28 29H292M34 68H50M270 68H286" stroke={light} strokeWidth="3" fill="none"/>
        <path d="M145 18v40m30-40v40" stroke={edge} strokeWidth="2"/>
      </g>}
      {id === 'atap' && <g {...common}>
        <path d="M26 78L160 12l134 66z M48 78H272V94H48z"/>
        <path d="M42 73L160 20l118 53M160 17v59" stroke={light} strokeWidth="3" fill="none"/>
        <path d="M78 78l82-41 82 41" stroke={edge} strokeWidth="2" fill="none"/>
      </g>}
      {id === 'mahkota' && <g {...common}>
        <path d="M104 92h112V76h-18V59h-13V40l-25-29-25 29v19h-13v17h-18z"/>
        <path d="M160 18v57m-27-1h54m-68 12h82" stroke={light} strokeWidth="3" fill="none"/>
        <path d="M145 40h30" stroke={edge} strokeWidth="2"/>
      </g>}
      {(id === 'ornamen-kiri' || id === 'ornamen-kanan') && <g {...common}>
        <path d={id === 'ornamen-kiri' ? 'M47 92V18h28v74z M32 35h58v12H32z M40 55h42v12H40z' : 'M245 92V18h28v74z M230 35h58v12h-58z M238 55h42v12h-42z'}/>
        <path d={id === 'ornamen-kiri' ? 'M61 24v56M46 42h30M52 62h18' : 'M259 24v56m-15-38h30m-24 20h18'} stroke={light} strokeWidth="3" fill="none"/>
      </g>}
    </svg>
  );
}


function CompletedGate() {
  return (
    <svg viewBox="0 0 520 440" role="img" aria-label="Ilustrasi Gapura Paduraksa yang telah selesai dibangun" className="mx-auto h-auto w-full max-w-[420px] drop-shadow-xl">
      <defs>
        <linearGradient id="gateStone" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#e8a16b"/><stop offset="48%" stopColor="#b95f32"/><stop offset="100%" stopColor="#79391f"/>
        </linearGradient>
        <linearGradient id="gateSky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#bae6fd"/><stop offset="100%" stopColor="#ecfccb"/>
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="504" height="424" rx="22" fill="url(#gateSky)"/>
      <path d="M8 355 Q120 320 245 355 T512 350V432H8Z" fill="#86b96c"/>
      <ellipse cx="260" cy="384" rx="190" ry="18" fill="#527e45" opacity=".25"/>
      <g stroke="#713318" strokeWidth="5" strokeLinejoin="round" fill="url(#gateStone)">
        {/* symmetrical side towers */}
        <path d="M92 350V154h62v196z M366 350V154h62v196z"/>
        <path d="M78 180h90v18H78z M352 180h90v18h-90z M68 224h110v18H68z M342 224h110v18H342z M80 270h86v17H80z M354 270h86v17h-86z"/>
        <path d="M76 350h94v25H76z M350 350h94v25h-94z"/>
        {/* central opening */}
        <path d="M154 350V213h212v137z" fill="#f4d7b5"/>
        <path d="M176 350V238h168v112" fill="#8d492d"/>
        <path d="M198 350V260h124v90" fill="#f5dfc4"/>
        {/* lintel */}
        <path d="M70 154h380v42H70z M88 135h344v19H88z"/>
        {/* roof tiers */}
        <path d="M112 135L260 61l148 74z"/>
        <path d="M142 105L260 48l118 57z"/>
        <path d="M176 78L260 29l84 49z"/>
        {/* crown */}
        <path d="M228 61V40h-17l49-31 49 31h-17v21z"/>
        {/* base */}
        <path d="M52 375h416v20H52z M34 395h452v20H34z"/>
      </g>
      <g fill="none" stroke="#f6c18d" strokeWidth="5" strokeLinecap="round">
        <path d="M105 169h36m-43 65h48m-39 55h30M379 169h36m-43 65h48m-39 55h30"/>
        <path d="M155 145h210M180 117l80-40 80 40M225 52l35-19 35 19"/>
      </g>
      <g fill="#f7d8a9" stroke="#713318" strokeWidth="3">
        <circle cx="123" cy="210" r="8"/><circle cx="397" cy="210" r="8"/>
        <path d="M245 130h30v18h-30z M250 112h20v18h-20z"/>
      </g>
    </svg>
  );
}

export function PaduraksaGame() {
  const audio = useGameAudio();
  const [levelIndex, setLevelIndex] = useState(0);
  const [placed, setPlaced] = useState<PartId[]>([]);
  const [selected, setSelected] = useState<PartId | null>(null);
  const [message, setMessage] = useState('Pilih potongan bangunan, lalu pasangkan ke area yang sesuai.');
  const [wrong, setWrong] = useState(false);
  const [checked, setChecked] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<PartId | null>(null);
  const [score, setScore] = useState(0);
  const level = LEVELS[levelIndex] ?? LEVELS[0]!;
  const levelIds = level.parts.map((part) => part.id);
  const finished = placed.length === level.parts.length;
  const available = useMemo(() => level.parts.filter((part) => !placed.includes(part.id)), [level, placed]);
  const progress = Math.round((placed.length / level.parts.length) * 100);
  const earnedScore = Math.max(0, level.parts.length * 100 - (wrong ? 20 : 0));

  function place(id: PartId, target: PartId) {
    if (finished || placed.includes(id)) return;
    if (id !== target || !levelIds.includes(id)) {
      setWrong(true);
      setLastCorrect(null);
      setSelected(id);
      setMessage('Belum tepat. Perhatikan bentuk dan posisi bagian gapura, lalu coba lagi.');
      return;
    }
    audio.playSuccess();
    setPlaced((current) => [...current, id]);
    setLastCorrect(id);
    setSelected(null);
    setWrong(false);
    setChecked(false);
    setMessage(`${PARTS[id].name} berhasil dipasang. Lanjutkan menyusun gapura!`);
  }

  function reset() {
    setPlaced([]);
    setSelected(null);
    setLastCorrect(null);
    setWrong(false);
    setChecked(false);
    setMessage('Pilih potongan bangunan, lalu pasangkan ke area yang sesuai.');
  }

  function checkAnswer() {
    if (!finished) {
      setMessage(`Masih ada ${level.parts.length - placed.length} bagian yang belum terpasang.`);
      setWrong(true);
      return;
    }
    audio.playVictory();
    setChecked(true);
    setScore((current) => Math.max(current, (levelIndex * 600) + earnedScore));
    setMessage(`Hebat! Gapura Paduraksa level ${level.number} berhasil disusun dengan simetris.`);
  }

  function nextLevel() {
    if (levelIndex < LEVELS.length - 1) {
      setLevelIndex((current) => current + 1);
      setPlaced([]);
      setSelected(null);
      setLastCorrect(null);
      setWrong(false);
      setChecked(false);
      setMessage('Level baru dimulai. Susun semua bagian gapura dengan teliti!');
    }
  }

  const targetIds = level.number === 1
    ? ['mahkota', 'ambang', 'badan', 'pondasi'] as PartId[]
    : level.number === 2
      ? ['mahkota', 'atap', 'ambang', 'tiang-kiri', 'tiang-kanan', 'pondasi'] as PartId[]
      : ['mahkota', 'atap', 'ambang', 'ornamen-kiri', 'tiang-kiri', 'tiang-kanan', 'ornamen-kanan', 'pondasi'] as PartId[];

  return (
    <section className="rounded-2xl border border-subtle bg-surface p-4 shadow-soft sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-lamongan-700 dark:text-lamongan-300">Game susun bangunan • 3 level</p>
          <h1 className="font-display text-2xl font-bold">Menyusun Gapura Paduraksa</h1>
          <p className="mt-1 text-sm text-secondary">Bangun gapura yang seimbang dari pondasi hingga mahkota.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={audio.toggleMusic} aria-pressed={audio.musicOn} aria-label={`Musik latar: ${audio.musicOn ? 'menyala' : 'mati'}`}
            className={cn('inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border-2 px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
              audio.musicOn ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'border-subtle bg-black/[0.04] text-secondary dark:bg-white/[0.06]')}>
            <Music className={cn('h-4 w-4', !audio.musicOn && 'opacity-50')}/> Musik: {audio.musicOn ? 'ON' : 'OFF'}
          </button>
          <button type="button" onClick={audio.toggleSfx} aria-pressed={audio.sfxOn} aria-label={`Efek suara: ${audio.sfxOn ? 'menyala' : 'mati'}`}
            className={cn('inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border-2 px-3 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500',
              audio.sfxOn ? 'border-emerald-400 bg-emerald-50 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200' : 'border-subtle bg-black/[0.04] text-secondary dark:bg-white/[0.06]')}>
            {audio.sfxOn ? <Volume2 className="h-4 w-4"/> : <VolumeX className="h-4 w-4"/>} Efek: {audio.sfxOn ? 'ON' : 'OFF'}
          </button>
          <div className="rounded-xl bg-lamongan-50 px-3 py-2 text-sm font-bold text-lamongan-800 dark:bg-lamongan-900/30 dark:text-lamongan-200">
            <Trophy className="mr-1 inline h-4 w-4"/> {score} poin
          </div>
        </div>
      </div>

      <div className="mb-5 grid grid-cols-3 gap-2">
        {LEVELS.map((item, index) => (
          <button key={item.number} type="button" onClick={() => {
            if (index <= levelIndex || (index === levelIndex + 1 && checked)) {
              setLevelIndex(index); setPlaced([]); setSelected(null); setLastCorrect(null); setWrong(false); setChecked(false);
              setMessage(`Level ${item.number} dimulai. ${item.description}`);
            }
          }}
            disabled={index > levelIndex && !(index === levelIndex + 1 && checked)}
            className={cn('rounded-xl border p-3 text-left transition', index === levelIndex ? 'border-lamongan-500 bg-lamongan-50 ring-2 ring-lamongan-200 dark:bg-lamongan-900/20' : 'border-subtle bg-black/[0.02] dark:bg-white/[0.03]', index > levelIndex && !(index === levelIndex + 1 && checked) && 'cursor-not-allowed opacity-50')}>
            <span className="flex items-center justify-between text-xs font-bold"><span>LEVEL {item.number}</span>{index > levelIndex && !(index === levelIndex + 1 && checked) ? <LockKeyhole className="h-3.5 w-3.5"/> : index < levelIndex || (index === levelIndex && checked) ? <CheckCircle2 className="h-3.5 w-3.5"/> : null}</span>
            <span className="mt-1 block text-sm font-semibold">{item.name}</span>
            <span className="mt-1 block text-[11px] text-secondary">{item.parts.length} bagian</span>
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div><h2 className="font-display text-lg font-bold">Level {level.number} — {level.name}</h2><p className="text-sm text-secondary">{level.description}</p></div>
        <span className="rounded-lg bg-black/[0.04] px-3 py-2 text-sm font-bold dark:bg-white/[0.06]">{placed.length}/{level.parts.length} bagian</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
        <div className="rounded-xl border border-sky-200 bg-gradient-to-b from-sky-100 to-emerald-100 p-3 dark:from-sky-950/40 dark:to-emerald-950/30">
          <p className="mb-2 text-center text-sm font-bold text-slate-700 dark:text-slate-200">Area Pembangunan Gapura</p>
          <div className="relative min-h-[350px] overflow-hidden rounded-lg border border-sky-300 bg-gradient-to-b from-sky-300 via-sky-100 to-green-100 p-3">
            <div className="absolute inset-x-0 bottom-0 h-12 bg-green-300/70"/>
            <div className="relative z-10 mx-auto grid min-h-[320px] max-w-[430px] grid-cols-6 grid-rows-[54px_58px_54px_90px_58px_58px] items-stretch justify-items-stretch gap-x-1 gap-y-1">
              {targetIds.map((id) => {
                const part = PARTS[id];
                const isPlaced = placed.includes(id);
                const isSelected = selected !== null;
                return (
                  <div key={id} style={{ gridColumn: `span ${id.startsWith('ornamen') ? 1 : id.startsWith('tiang') ? (level.number === 3 ? 2 : 3) : 6} / span ${id.startsWith('ornamen') ? 1 : id.startsWith('tiang') ? (level.number === 3 ? 2 : 3) : 6}` }} className={cn('flex min-w-0 items-center justify-center', id.startsWith('ornamen') && 'row-span-1')}>
                    {isPlaced ? <div className="h-full w-full"><PartShape id={id}/></div> : (
                      <button type="button" onClick={() => selected && place(selected, id)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={(event) => { event.preventDefault(); const id = event.dataTransfer.getData('text/plain') as PartId; if (id) place(id, part.id); }}
                        className={cn('flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed px-1 text-center text-[11px] font-bold text-slate-600 transition dark:text-slate-300', isSelected ? 'border-amber-500 bg-amber-100/70 dark:bg-amber-900/30' : 'border-slate-400/80 bg-white/30 dark:bg-slate-900/20', level.hint && 'after:content-[""]')}>
                        {level.hint ? part.name : 'Letakkan di sini'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between gap-2"><span className="text-xs font-semibold text-secondary">Progres pembangunan</span><span className="text-xs font-bold tabular-nums">{progress}%</span></div>
          <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-300/70 dark:bg-slate-700"><div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }}/></div>
        </div>

        <div className="rounded-xl border border-subtle bg-black/[0.025] p-3 dark:bg-white/[0.035]">
          <h2 className="mb-1 font-display font-bold">Potongan Bangunan</h2>
          <p className="mb-3 text-xs text-secondary">Seret potongan ke area yang cocok atau ketuk potongan lalu ketuk area pemasangan.</p>
          <div className="grid grid-cols-2 gap-2">
            {available.map((part) => (
              <button key={part.id} type="button" draggable
                onDragStart={(event) => { event.dataTransfer.setData('text/plain', part.id); setSelected(part.id); audio.playClick(); }}
                onClick={() => { audio.playClick(); setSelected(part.id); setLastCorrect(null); setWrong(false); setMessage(`Potongan ${part.name} dipilih. Sekarang pilih area pemasangannya.`); }}
                className={cn('min-h-[112px] rounded-xl border-2 bg-white p-2 text-center transition hover:-translate-y-0.5 hover:border-lamongan-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lamongan-500 dark:bg-slate-900', selected === part.id ? 'border-lamongan-500 ring-2 ring-lamongan-300' : 'border-subtle')}>
                <span className="mx-auto block h-16 w-full max-w-[140px]"><PartShape id={part.id}/></span>
                <span className="mt-1 block text-xs font-bold">{part.name}</span>
                {level.hint && <span className="mt-1 block text-[10px] text-secondary">{part.hint}</span>}
              </button>
            ))}
            {available.length === 0 && <p className="col-span-2 rounded-lg bg-emerald-50 p-4 text-center text-sm font-semibold text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200">Semua potongan sudah terpasang!</p>}
          </div>
        </div>
      </div>

      {lastCorrect && !checked && (
        <div key={lastCorrect} className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-3 font-bold text-emerald-800 shadow-sm correct-pop dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-200">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-30"/>
            <CheckCircle2 className="relative h-6 w-6 animate-bounce"/>
          </span>
          Benar! {PARTS[lastCorrect].name} berhasil dipasang.
        </div>
      )}

      <div aria-live="polite" className={cn('mt-4 rounded-lg px-3 py-3 text-sm font-medium', wrong ? 'bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-200' : checked ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-200' : 'bg-sky-50 text-sky-900 dark:bg-sky-900/20 dark:text-sky-200')}>
        {checked && <Trophy className="mr-1 inline h-4 w-4"/>}{message}
      </div>

      {checked && (
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-center dark:border-amber-800 dark:bg-amber-950/20">
          <div className="flex justify-center gap-1 text-amber-500"><Star className="h-6 w-6 fill-current"/><Star className="h-6 w-6 fill-current"/><Star className="h-6 w-6 fill-current"/></div>
          <div className="my-3 overflow-hidden rounded-xl bg-white/70 p-2 dark:bg-slate-900/50">
            <div className="gate-reveal"><CompletedGate/></div>
            <p className="mt-1 text-xs font-semibold text-emerald-800 dark:text-emerald-200">Gapura Paduraksa berhasil dibangun!</p>
          </div>
          <h3 className="mt-2 font-display text-lg font-bold">Level selesai!</h3>
          <p className="text-sm text-secondary">Kamu mendapatkan {earnedScore} poin. Gapura berhasil dibangun dengan lengkap.</p>
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={reset}><RotateCcw className="h-4 w-4"/> Ulangi level</Button>
        <Button onClick={checkAnswer} disabled={checked}><CheckCircle2 className="h-4 w-4"/> Periksa jawaban</Button>
        {checked && levelIndex < LEVELS.length - 1 && <Button onClick={nextLevel}>Lanjut level <ChevronRight className="h-4 w-4"/></Button>}
        {checked && levelIndex === LEVELS.length - 1 && <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600"><Trophy className="h-4 w-4"/> Semua level selesai!</span>}
      </div>
    </section>
  );
}
