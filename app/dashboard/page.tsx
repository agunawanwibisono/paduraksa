'use client';

import Link from 'next/link';
import { MapPinned, UtensilsCrossed, Trophy, Flame, ArrowRight } from 'lucide-react';
import { destinations } from '@/data/destinations';
import { foods } from '@/data/foods';
import { achievements } from '@/data/achievements';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';

// Catatan: nilai di bawah adalah contoh statis untuk pengembangan UI.
// Setelah autentikasi Supabase aktif, ganti dengan query ke tabel
// user_progress, game_scores, dan user_achievements (lihat schema.sql).
const MOCK_PROGRESS = {
  displayName: 'Penjelajah',
  destinationsExplored: 2,
  foodsExplored: 1,
  cultureExplored: 1,
  bestColorSortScore: 0,
  bestMatchingScore: 0,
  streakDays: 1,
  xp: 120,
  level: 2,
};

export default function DashboardPage() {
  const destinationPct = (MOCK_PROGRESS.destinationsExplored / destinations.length) * 100;
  const foodPct = (MOCK_PROGRESS.foodsExplored / foods.length) * 100;

  const unlockedAchievements = achievements.filter((a) => {
    if (a.requirementType === 'destinations_count') return MOCK_PROGRESS.destinationsExplored >= a.requirementValue;
    if (a.requirementType === 'foods_count') return MOCK_PROGRESS.foodsExplored >= a.requirementValue;
    if (a.requirementType === 'game_score')
      return Math.max(MOCK_PROGRESS.bestColorSortScore, MOCK_PROGRESS.bestMatchingScore) >= a.requirementValue;
    return false;
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Halo, {MOCK_PROGRESS.displayName}! 👋</h1>
          <p className="mt-2 text-secondary">Ini progres eksplorasi Lamongan-mu sejauh ini.</p>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Kolom kiri: progress utama */}
        <div className="space-y-5 lg:col-span-2">
          <Reveal>
            <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-secondary">Level {MOCK_PROGRESS.level}</p>
                  <p className="font-display text-lg font-semibold">{MOCK_PROGRESS.xp} XP</p>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:bg-orange-900/40 dark:text-orange-300">
                  <Flame className="h-3.5 w-3.5" aria-hidden /> {MOCK_PROGRESS.streakDays} hari streak
                </span>
              </div>
              <ProgressBar value={(MOCK_PROGRESS.xp % 200) / 2} label="Menuju level berikutnya" />
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            <Reveal delay={0.05}>
              <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark">
                <div className="mb-3 flex items-center gap-2">
                  <MapPinned className="h-5 w-5 text-lamongan-600 dark:text-lamongan-300" aria-hidden />
                  <h3 className="font-display font-semibold">Wisata Dipelajari</h3>
                </div>
                <p className="mb-2 text-sm text-secondary">
                  {MOCK_PROGRESS.destinationsExplored} dari {destinations.length} destinasi
                </p>
                <ProgressBar value={destinationPct} />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark">
                <div className="mb-3 flex items-center gap-2">
                  <UtensilsCrossed className="h-5 w-5 text-terracotta-600 dark:text-terracotta-300" aria-hidden />
                  <h3 className="font-display font-semibold">Makanan Dipelajari</h3>
                </div>
                <p className="mb-2 text-sm text-secondary">
                  {MOCK_PROGRESS.foodsExplored} dari {foods.length} makanan
                </p>
                <ProgressBar value={foodPct} barClassName="bg-gradient-to-r from-terracotta-400 to-terracotta-600" />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark">
              <h3 className="mb-4 font-display font-semibold">Skor Game Terbaik</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="font-display text-2xl font-bold">{MOCK_PROGRESS.bestColorSortScore}</p>
                  <p className="text-xs text-secondary">Kelompokkan Warna</p>
                </div>
                <div>
                  <p className="font-display text-2xl font-bold">{MOCK_PROGRESS.bestMatchingScore}</p>
                  <p className="text-xs text-secondary">Mencocokkan Gambar</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Kolom kanan: badge + rekomendasi */}
        <div className="space-y-5">
          <Reveal delay={0.1}>
            <div className="rounded-xl2 border border-subtle bg-surface p-6 shadow-soft dark:shadow-soft-dark">
              <h3 className="mb-4 flex items-center gap-2 font-display font-semibold">
                <Trophy className="h-5 w-5 text-amber-500" aria-hidden /> Achievement
              </h3>
              <div className="space-y-3">
                {achievements.map((a) => {
                  const unlocked = unlockedAchievements.some((u) => u.id === a.id);
                  return (
                    <div
                      key={a.id}
                      className={`flex items-center gap-3 rounded-xl border p-3 ${
                        unlocked ? 'border-lamongan-300 bg-lamongan-50 dark:bg-lamongan-950/30' : 'border-subtle opacity-50'
                      }`}
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900/50 dark:text-lamongan-200">
                        <Trophy className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{a.title}</p>
                        <p className="text-xs text-secondary">{a.description}</p>
                      </div>
                      {unlocked && <Badge tone="lamongan" className="ml-auto shrink-0">Didapat</Badge>}
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-xl2 border border-subtle bg-lamongan-600 p-6 text-white shadow-soft">
              <h3 className="font-display font-semibold">Rekomendasi Berikutnya</h3>
              <p className="mt-1 text-sm text-lamongan-50">
                Kamu belum menjelajahi semua wisata — coba lanjutkan eksplorasi!
              </p>
              <Link
                href="/wisata"
                className="mt-4 inline-flex items-center gap-1 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-lamongan-700"
              >
                Lanjutkan <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
