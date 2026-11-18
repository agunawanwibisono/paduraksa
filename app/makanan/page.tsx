import { MakananList } from '@/components/makanan/MakananList';
import { Reveal } from '@/components/ui/Reveal';

export const metadata = { title: 'Makanan Khas' };

export default function MakananPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Makanan Khas Lamongan</h1>
          <p className="mt-2 text-secondary">Temukan makanan khas yang ingin kamu kenali.</p>
        </div>
      </Reveal>

      <MakananList />
    </div>
  );
}
