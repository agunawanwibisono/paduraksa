import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FoodAddition } from '@/components/game/food-addition/FoodAddition';

export const metadata = { title: 'Penjumlahan Makanan Tradisional' };

export default function FoodAdditionPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/game" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current">
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Game
      </Link>

      <h1 className="font-display text-2xl font-bold sm:text-3xl">Penjumlahan Makanan Tradisional</h1>
      <p className="mt-1 mb-6 text-secondary">Hitung makanan khas Lamongan, jumlahkan, lalu pilih jawaban yang benar.</p>

      <FoodAddition />
    </div>
  );
}
