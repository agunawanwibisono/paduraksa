// Level game "Si Lele Cari Harta Karun" (coding unplugged).
// S = posisi awal Si Lele, T = harta karun, # = karang (tidak bisa dilewati), . = air kosong.

export interface CodingLevel {
  id: number;
  name: string;
  story: string;
  map: string[];
}

export const CODING_LEVELS: CodingLevel[] = [
  {
    id: 1,
    name: 'Latihan di Pantai',
    story: 'Si Lele berenang lurus ke kanan untuk mengambil harta karun.',
    map: ['S..T', '....', '....', '....'],
  },
  {
    id: 2,
    name: 'Menghindari Karang',
    story: 'Ada karang di tengah jalan. Cari jalan memutar!',
    map: ['S.#.', '..#.', '....', '.#.T'],
  },
  {
    id: 3,
    name: 'Lorong Karang',
    story: 'Karang makin banyak. Hati-hati menyusun kartu.',
    map: ['S....', '.##..', '...#.', '.#...', '...#T'],
  },
  {
    id: 4,
    name: 'Jalan Berkelok',
    story: 'Jalannya berkelok seperti ombak di Wisata Bahari Lamongan.',
    map: ['S.#..', '..#.#', '....#', '.##..', '...#T'],
  },
];
