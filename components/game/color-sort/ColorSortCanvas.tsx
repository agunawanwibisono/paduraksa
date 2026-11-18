'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useGameAudio } from '@/lib/audio/AudioProvider';

interface ColorBall {
  id: number;
  x: number;
  y: number;
  radius: number;
  color: string;
  colorName: string;
  vx: number;
  vy: number;
}

const COLORS = [
  { name: 'merah', hex: '#dd5a24' },
  { name: 'biru', hex: '#22949e' },
  { name: 'kuning', hex: '#eab308' },
];

const GAME_DURATION = 60; // detik
const BALL_RADIUS = 26;
// Dibuat pelan untuk anak PAUD. Kecepatan dalam piksel per detik, jadi sama di layar 60 Hz maupun 120 Hz.
const BASE_FALL_SPEED = 22;
const FALL_SPEED_PER_LEVEL = 3;
const MAX_FALL_SPEED = 45;
const MAX_BALLS = 3;

export function ColorSortCanvas() {
  const { playClick, playSuccess, playVictory } = useGameAudio();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const ballsRef = useRef<ColorBall[]>([]);
  const draggingRef = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const idCounter = useRef(0);
  const animationRef = useRef<number>();
  const lastFrameRef = useRef<number>(0);

  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [status, setStatus] = useState<'idle' | 'playing' | 'over'>('idle');
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);
  const [dims, setDims] = useState({ width: 600, height: 400 });

  const zoneHeight = 90;

  const spawnBall = useCallback((width: number) => {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)]!;
    idCounter.current += 1;
    const ball: ColorBall = {
      id: idCounter.current,
      x: BALL_RADIUS + Math.random() * (width - BALL_RADIUS * 2),
      y: BALL_RADIUS + 10,
      radius: BALL_RADIUS,
      color: color.hex,
      colorName: color.name,
      vx: 0,
      vy: 0,
    };
    ballsRef.current.push(ball);
  }, []);

  // Resize responsif
  useEffect(() => {
    function handleResize() {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      setDims({ width, height: 420 });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Timer
  useEffect(() => {
    if (status !== 'playing') return;
    if (timeLeft <= 0) {
      setStatus('over');
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [status, timeLeft]);

  // Waktu habis: suara perayaan bila ada skor
  useEffect(() => {
    if (status === 'over' && score > 0) playVictory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Spawn interval — makin cepat seiring level naik
  useEffect(() => {
    if (status !== 'playing') return;
    const spawnRate = Math.max(3000 - level * 150, 2000);
    const interval = setInterval(() => {
      if (ballsRef.current.length < MAX_BALLS) spawnBall(dims.width);
    }, spawnRate);
    return () => clearInterval(interval);
  }, [status, level, dims.width, spawnBall]);

  // Level naik tiap 100 poin
  useEffect(() => {
    setLevel(Math.floor(score / 100) + 1);
  }, [score]);

  // Render loop
  useEffect(() => {
    function draw(now: number = performance.now()) {
      const dt = lastFrameRef.current ? Math.min((now - lastFrameRef.current) / 1000, 0.05) : 0;
      lastFrameRef.current = now;
      const fallSpeed = Math.min(BASE_FALL_SPEED + level * FALL_SPEED_PER_LEVEL, MAX_FALL_SPEED);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.clearRect(0, 0, dims.width, dims.height);

      // Zona target
      const zoneWidth = dims.width / COLORS.length;
      COLORS.forEach((c, i) => {
        ctx.fillStyle = c.hex + '22';
        ctx.fillRect(i * zoneWidth, dims.height - zoneHeight, zoneWidth, zoneHeight);
        ctx.strokeStyle = c.hex;
        ctx.lineWidth = 2;
        ctx.strokeRect(i * zoneWidth + 2, dims.height - zoneHeight + 2, zoneWidth - 4, zoneHeight - 4);
        ctx.fillStyle = c.hex;
        ctx.font = '600 13px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(c.name.toUpperCase(), i * zoneWidth + zoneWidth / 2, dims.height - zoneHeight / 2 + 5);
      });

      // Bola jatuh (kecuali yang sedang di-drag)
      ballsRef.current.forEach((ball) => {
        const isDragging = draggingRef.current?.id === ball.id;
        if (!isDragging && status === 'playing') {
          ball.y += fallSpeed * dt;
        }
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = 'rgba(0,0,0,0.25)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Buang bola yang lewat batas bawah tanpa masuk zona (miss)
      ballsRef.current = ballsRef.current.filter((ball) => {
        if (ball.y - ball.radius > dims.height && draggingRef.current?.id !== ball.id) {
          return false;
        }
        return true;
      });

      animationRef.current = requestAnimationFrame(draw);
    }
    lastFrameRef.current = 0;
    animationRef.current = requestAnimationFrame(draw);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [dims, status, level]);

  function getPointerPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (status !== 'playing') return;
    const { x, y } = getPointerPos(e);
    const ball = [...ballsRef.current].reverse().find((b) => Math.hypot(b.x - x, b.y - y) <= b.radius + 6);
    if (ball) {
      draggingRef.current = { id: ball.id, offsetX: x - ball.x, offsetY: y - ball.y };
      playClick();
    }
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!draggingRef.current) return;
    const { x, y } = getPointerPos(e);
    const ball = ballsRef.current.find((b) => b.id === draggingRef.current!.id);
    if (ball) {
      ball.x = x - draggingRef.current.offsetX;
      ball.y = y - draggingRef.current.offsetY;
    }
  }

  function handlePointerUp() {
    if (!draggingRef.current) return;
    const ball = ballsRef.current.find((b) => b.id === draggingRef.current!.id);
    draggingRef.current = null;
    if (!ball) return;

    if (ball.y > dims.height - zoneHeight) {
      const zoneWidth = dims.width / COLORS.length;
      const zoneIndex = Math.min(COLORS.length - 1, Math.max(0, Math.floor(ball.x / zoneWidth)));
      const correct = COLORS[zoneIndex]!.name === ball.colorName;

      ballsRef.current = ballsRef.current.filter((b) => b.id !== ball.id);

      if (correct) {
        playSuccess();
        setCombo((c) => c + 1);
        setScore((s) => s + 10 + Math.min(combo, 10) * 2);
        setFeedback({ text: `+${10 + Math.min(combo, 10) * 2} Tepat!`, ok: true });
      } else {
        setCombo(0);
        setFeedback({ text: 'Salah warna!', ok: false });
      }
      setTimeout(() => setFeedback(null), 700);
    }
  }

  function startGame() {
    ballsRef.current = [];
    setScore(0);
    setCombo(0);
    setLevel(1);
    setTimeLeft(GAME_DURATION);
    setStatus('playing');
  }

  return (
    <div ref={containerRef} className="w-full">
      {/* HUD */}
      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Skor</p>
          <p className="font-display text-xl font-bold">{score}</p>
        </div>
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-secondary">
            <Zap className="h-3 w-3" aria-hidden /> Combo
          </p>
          <p className="font-display text-xl font-bold">x{combo}</p>
        </div>
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="text-xs text-secondary">Level</p>
          <p className="font-display text-xl font-bold">{level}</p>
        </div>
        <div className="rounded-xl border border-subtle bg-surface p-3 text-center">
          <p className="flex items-center justify-center gap-1 text-xs text-secondary">
            <Timer className="h-3 w-3" aria-hidden /> Waktu
          </p>
          <p className="font-display text-xl font-bold">{timeLeft}s</p>
        </div>
      </div>

      <ProgressBar value={(timeLeft / GAME_DURATION) * 100} className="mb-4" />

      <div className="relative overflow-hidden rounded-xl2 border border-subtle bg-lamongan-50/40 dark:bg-lamongan-950/20">
        <canvas
          ref={canvasRef}
          width={dims.width}
          height={dims.height}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="touch-none"
        />

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 rounded-full px-4 py-1.5 text-sm font-semibold text-white ${
                feedback.ok ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {status !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/40 backdrop-blur-sm">
            {status === 'over' && (
              <div className="text-center text-white">
                <p className="font-display text-2xl font-bold">Waktu Habis!</p>
                <p className="mt-1 text-sm">Skor akhir: {score}</p>
              </div>
            )}
            <Button onClick={startGame} size="lg">
              <RotateCcw className="h-4 w-4" aria-hidden /> {status === 'over' ? 'Main Lagi' : 'Mulai Game'}
            </Button>
          </div>
        )}
      </div>

      <p className="mt-3 text-center text-xs text-secondary">
        Seret bola berwarna ke keranjang dengan label warna yang sama sebelum jatuh ke dasar.
      </p>
    </div>
  );
}
