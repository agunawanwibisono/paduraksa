import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getFoodBySlug, foods } from '@/data/foods';
import { MakananDetailView } from '@/components/makanan/MakananDetailView';

export function generateStaticParams() {
  return foods.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const food = getFoodBySlug(params.slug);
  return { title: food?.name ?? 'Makanan tidak ditemukan' };
}

export default function MakananDetailPage({ params }: { params: { slug: string } }) {
  const food = getFoodBySlug(params.slug);
  if (!food) notFound();

  return <MakananDetailView food={food} />;
}
