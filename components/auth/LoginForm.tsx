'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, AlertCircle, CheckCircle2, Sparkles, BookOpen, Gamepad2, MapPinned } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { cn } from '@/lib/utils';

const supabaseReady = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const bubbles = [
  { size: 90, left: '8%', delay: 0, duration: 9 },
  { size: 50, left: '24%', delay: 2, duration: 11 },
  { size: 120, left: '48%', delay: 1, duration: 13 },
  { size: 40, left: '68%', delay: 3, duration: 8 },
  { size: 80, left: '84%', delay: 0.5, duration: 12 },
];

const perks = [
  { icon: BookOpen, text: 'Belajar lewat cerita dan budaya Lamongan' },
  { icon: Gamepad2, text: 'Main game edukasi, kumpulkan XP dan badge' },
  { icon: MapPinned, text: 'Jelajahi wisata dan kuliner khas' },
];

const fieldBase =
  'w-full rounded-xl border border-subtle bg-surface py-3 pl-11 pr-4 text-sm outline-none transition focus:border-lamongan-500 focus:ring-2 focus:ring-lamongan-500/30';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!supabaseReady) {
      setError('Login belum aktif: isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY di .env.local, lalu jalankan ulang server.');
      return;
    }
    setLoading(true);
    const supabase = createSupabaseBrowserClient();
    const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setLoading(false);
    if (err) {
      setError(err.message === 'Invalid login credentials' ? 'Email atau password salah.' : 'Gagal masuk. Coba lagi sebentar.');
      return;
    }
    router.push('/');
    router.refresh();
  }

  async function onForgot() {
    setError(null);
    setInfo(null);
    if (!email.trim()) {
      setError('Isi email dulu, lalu tekan "Lupa password?".');
      return;
    }
    if (!supabaseReady) {
      setError('Login belum aktif: konfigurasi Supabase belum diisi.');
      return;
    }
    const supabase = createSupabaseBrowserClient();
    const { error: err } = await supabase.auth.resetPasswordForEmail(email.trim());
    if (err) setError('Tidak bisa mengirim email reset saat ini.');
    else setInfo('Jika email terdaftar, tautan reset password sudah dikirim.');
  }

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-[2rem] border border-subtle bg-surface shadow-soft dark:shadow-soft-dark lg:grid-cols-2">
        {/* Panel brand */}
        <div className="relative overflow-hidden bg-gradient-to-br from-lamongan-600 via-lamongan-700 to-lamongan-900 px-6 py-10 text-white sm:px-10 lg:py-14">
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {bubbles.map((b, i) => (
              <motion.span
                key={i}
                className="absolute -bottom-32 rounded-full bg-white/10 ring-1 ring-white/20"
                style={{ width: b.size, height: b.size, left: b.left }}
                animate={{ y: [0, -520], opacity: [0, 0.9, 0] }}
                transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-sunny-400/30 blur-3xl" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-terracotta-500/30 blur-3xl" />
          </div>

          <div className="relative flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-3xl bg-white/95 p-3 shadow-xl"
            >
              <Image src="/brand/logo-small.png" alt="Logo Gelar Karya Si Lele Bahagia" width={160} height={182} priority className="h-24 w-auto sm:h-28" />
            </motion.div>
            <p className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-sunny-300" aria-hidden /> Media Belajar Anak PAUD Lamongan
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Halo! Yuk masuk dan <span className="text-sunny-300">belajar bareng Si Lele</span>
            </h1>
            <ul className="mt-6 hidden space-y-3 text-sm text-white/90 lg:block">
              {perks.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="flex items-center px-6 py-10 sm:px-10 lg:py-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto w-full max-w-sm">
            <h2 className="font-display text-2xl font-bold">Masuk</h2>
            <p className="mt-1 text-sm text-secondary">Gunakan akun yang sudah terdaftar.</p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" aria-hidden />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className={fieldBase}
                  />
                </div>
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium">Password</label>
                  <button type="button" onClick={onForgot} className="text-xs font-medium text-lamongan-700 hover:underline dark:text-lamongan-300">
                    Lupa password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary" aria-hidden />
                  <input
                    id="password"
                    type={showPw ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className={cn(fieldBase, 'pr-12')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-secondary hover:bg-lamongan-50 dark:hover:bg-white/5"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
                  </button>
                </div>
              </div>

              {error && (
                <p role="alert" className="flex items-start gap-2 rounded-xl bg-terracotta-50 px-3.5 py-2.5 text-sm text-terracotta-700 dark:bg-terracotta-900/30 dark:text-terracotta-200">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {error}
                </p>
              )}
              {info && (
                <p role="status" className="flex items-start gap-2 rounded-xl bg-leaf-50 px-3.5 py-2.5 text-sm text-leaf-700 dark:bg-leaf-900/40 dark:text-leaf-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden /> {info}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={loading || !email || !password}
                whileTap={{ scale: 0.98 }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lamongan-600 to-lamongan-700 px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:from-lamongan-700 hover:to-lamongan-800 disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <LogIn className="h-4 w-4" aria-hidden />}
                {loading ? 'Memproses…' : 'Masuk'}
              </motion.button>
            </form>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
