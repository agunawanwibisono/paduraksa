import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TreasureCoding } from '@/components/game/unplugged-coding/TreasureCoding';

export const metadata = { title: 'Si Lele Cari Harta Karun (Coding Unplugged)' };

export default function CodingUnpluggedPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/game" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Game
      </Link>

      <h1 className="font-display text-2xl font-bold sm:text-3xl">Si Lele Cari Harta Karun</h1>
      <p className="mt-1 mb-6 text-secondary">
        Belajar berpikir runtut seperti coding tanpa komputer. Susun kartu panah agar Si Lele sampai ke harta karun di Wisata Bahari Lamongan (WBL).
      </p>

      <TreasureCoding />
    </div>
  );
}
