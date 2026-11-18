import type { Achievement } from '@/lib/types';

export const achievements: Achievement[] = [
  {
    id: 'a1',
    code: 'penjelajah_lamongan',
    title: 'Penjelajah Lamongan',
    description: 'Pelajari 5 destinasi wisata Lamongan.',
    icon: 'MapPinned',
    requirementType: 'destinations_count',
    requirementValue: 5,
  },
  {
    id: 'a2',
    code: 'pecinta_kuliner',
    title: 'Pecinta Kuliner',
    description: 'Pelajari 5 makanan khas Lamongan.',
    icon: 'UtensilsCrossed',
    requirementType: 'foods_count',
    requirementValue: 5,
  },
  {
    id: 'a3',
    code: 'master_matching',
    title: 'Master Matching',
    description: 'Raih skor 500+ di game Mencocokkan Gambar.',
    icon: 'LayoutGrid',
    requirementType: 'game_score',
    requirementValue: 500,
  },
  {
    id: 'a4',
    code: 'jago_warna',
    title: 'Jago Warna',
    description: 'Raih skor 500+ di game Kelompokkan Warna.',
    icon: 'Palette',
    requirementType: 'game_score',
    requirementValue: 500,
  },
];
