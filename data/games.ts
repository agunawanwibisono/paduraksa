import { Palette, LayoutGrid, Type, Route, Plus, Landmark, type LucideIcon } from 'lucide-react';

/** Satu-satunya sumber data daftar game. Hub game, beranda, dan angka statistik memakai daftar ini. */
export interface GameInfo {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export const games: GameInfo[] = [
  {
    slug: 'kelompokkan-warna',
    title: 'Kelompokkan Warna',
    description: 'Seret objek berwarna ke keranjang yang tepat sebelum waktu habis.',
    icon: Palette,
    color: 'from-terracotta-400 to-terracotta-600',
  },
  {
    slug: 'matching',
    title: 'Mencocokkan Gambar',
    description: 'Buka dua kartu bertema Lamongan dan temukan pasangannya.',
    icon: LayoutGrid,
    color: 'from-lamongan-400 to-lamongan-600',
  },
  {
    slug: 'merangkai-huruf',
    title: 'Merangkai Huruf',
    description: 'Lihat foto petunjuk, lalu susun huruf acak menjadi kata tentang wisata dan makanan Lamongan.',
    icon: Type,
    color: 'from-leaf-400 to-leaf-600',
  },
  {
    slug: 'coding-unplugged',
    title: 'Si Lele Cari Harta Karun',
    description: 'Coding unplugged: susun kartu panah agar Si Lele sampai ke harta karun di WBL.',
    icon: Route,
    color: 'from-sunny-400 to-terracotta-500',
  },
  {
    slug: 'menyusun-gapura-paduraksa',
    title: 'Menyusun Gapura Paduraksa',
    description: 'Susun Gapura Paduraksa dalam 3 level: mudah, sedang, dan sulit.',
    icon: Landmark,
    color: 'from-amber-500 to-terracotta-600',
  },
  {
    slug: 'penjumlahan-makanan',
    title: 'Penjumlahan Makanan Tradisional',
    description: 'Hitung soto, pecel lele, wingko, dan makanan khas Lamongan lainnya, lalu jumlahkan.',
    icon: Plus,
    color: 'from-terracotta-300 to-leaf-500',
  },
];
