import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { PaduraksaGame } from '@/components/game/paduraksa/PaduraksaGame';
export const metadata = { title: 'Menyusun Gapura Paduraksa' };
export default function PaduraksaPage() {
  return <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <Link href="/game" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current"><ArrowLeft className="h-4 w-4"/> Kembali ke Game</Link>
    <PaduraksaGame/>
  </div>;
}
