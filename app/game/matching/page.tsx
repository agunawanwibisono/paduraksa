import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MatchingBoard } from '@/components/game/matching/MatchingBoard';

export const metadata = { title: 'Mencocokkan Gambar' };

export default function MatchingGamePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/game" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Game
      </Link>

      <h1 className="font-display text-2xl font-bold sm:text-3xl">Mencocokkan Gambar</h1>
      <p className="mt-1 mb-6 text-secondary">Buka dua kartu dan temukan pasangan bertema Lamongan.</p>

      <MatchingBoard />
    </div>
  );
}
