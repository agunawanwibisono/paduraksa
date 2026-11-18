import type { CultureEntry, CulturePicture, OriginTimelineEntry, SceneName } from '@/lib/types';
import { destinationPhoto, foodPhoto } from './photos';

const scene = (s: SceneName): CulturePicture => ({ kind: 'scene', scene: s });
function photo(src: string | undefined, caption: string, fallback: SceneName): CulturePicture {
  return src ? { kind: 'photo', src, caption } : scene(fallback);
}

/** Kunci dibuat dari judul tanpa tanda baca dan huruf kapital, supaya tahan perbedaan penulisan. */
const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]/g, '');

const factPictures: Record<string, CulturePicture> = {
  [norm('Julukan "Kota Soto"')]: photo(foodPhoto('soto-lamongan'), 'Foto Soto Lamongan', 'heart'),
  [norm('Kawasan pesisir & agraris')]: photo(destinationPhoto('pantai-kutang'), 'Foto Pantai Kutang di pesisir Lamongan', 'river'),
  [norm('Pusat wisata religi Wali Songo')]: photo(destinationPhoto('makam-sunan-drajat'), 'Foto Makam Sunan Drajat di Paciran', 'tomb'),
  [norm('Makam Mbah Lamong dibuka pada waktu tertentu')]: scene('tomb'),
  [norm('Hari jadi dari "buku wasiat"')]: scene('scroll'),
  [norm('Nama dari kata "ngemong"')]: scene('heart'),
  [norm('Dialiri Bengawan Solo')]: scene('river'),
  [norm('Nasi boran dan rekor MURI')]: photo(foodPhoto('nasi-boranan'), 'Foto nasi boranan', 'heart'),
  [norm('Kentrung berupa monolog')]: scene('drum'),
  [norm('Cikal bakal pecel lele, tetapi ada yang berpantang lele')]: photo(foodPhoto('pecel-lele'), 'Foto pecel lele', 'fish'),
  [norm('Tenun ikat Parengan')]: scene('cloth'),
  [norm('Wayang kulit untuk memanggil hujan')]: scene('rain'),
};

const originPictures: Record<string, CulturePicture> = {
  o1: scene('book'),
  o2: scene('river'),
  o3: scene('palace'),
  o4: scene('tomb'),
  o5: scene('calendar'),
  l1: scene('river'),
  l2: scene('palace'),
  l3: scene('fish'),
  l4: scene('mountain'),
};

export function withFactPicture(entry: CultureEntry): CultureEntry {
  return { ...entry, picture: factPictures[norm(entry.title)] };
}

export function withOriginPicture<T extends CultureEntry | OriginTimelineEntry>(entry: T): T & { picture?: CulturePicture } {
  return { ...entry, picture: originPictures[entry.id] };
}

/** Gabungkan fakta awal dan tambahan tanpa duplikat judul, dengan id unik. */
export function mergeFacts(first: CultureEntry[], more: CultureEntry[]): CultureEntry[] {
  const moreTitles = new Set(more.map((m) => norm(m.title)));
  // Fakta "Hari jadi dari buku wasiat" versi awal sama isinya dengan versi tambahan.
  const kept = first.filter((f) => !moreTitles.has(norm(f.title)));
  return [...kept.map((f) => ({ ...f, id: `a-${f.id}` })), ...more.map((m) => ({ ...m, id: `b-${m.id}` }))].map(withFactPicture);
}
