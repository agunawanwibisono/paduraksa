import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getDestinationBySlug, destinations } from '@/data/destinations';
import { WisataDetailView } from '@/components/wisata/WisataDetailView';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const destination = getDestinationBySlug(params.slug);
  return { title: destination?.name ?? 'Wisata tidak ditemukan' };
}

export default function WisataDetailPage({ params }: { params: { slug: string } }) {
  const destination = getDestinationBySlug(params.slug);
  if (!destination) notFound();

  return <WisataDetailView destination={destination} />;
}
