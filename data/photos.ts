// Foto asli yang sudah dipakai di halaman Wisata dan Makanan, dipakai ulang oleh game dan halaman Budaya.
import { destinations } from './destinations';
import { foods } from './foods';

export function destinationPhoto(slug: string): string | undefined {
  return destinations.find((d) => d.slug === slug)?.images[0];
}

export function foodPhoto(slug: string): string | undefined {
  return foods.find((f) => f.slug === slug)?.imageUrl;
}
