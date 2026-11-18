import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ColorSortCanvas } from '@/components/game/color-sort/ColorSortCanvas';

export const metadata = { title: 'Kelompokkan Warna' };

export default function ColorSortGamePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/game" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Game
      </Link>

      <h1 className="font-display text-2xl font-bold sm:text-3xl">Kelompokkan Warna</h1>
      <p className="mt-1 mb-6 text-secondary">Seret bola ke keranjang warna yang tepat sebelum waktu habis!</p>

      <ColorSortCanvas />
    </div>
  );
}
