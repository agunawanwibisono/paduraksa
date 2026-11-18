// Tipe data bersama untuk seluruh project Gelar Karya Si Lele.
// File ini sebelumnya hilang dari repo — direkonstruksi berdasarkan
// pemakaian nyata di komponen dan data (destinations.ts, foods.ts, dst).

export type ContentCategory = 'alam' | 'sejarah' | 'religi' | 'buatan';

export interface Destination {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: ContentCategory;
  shortDescription: string;
  longDescription: string;
  images: string[];
  funFacts: string[];
  popularity: number;
  /** URL video YouTube yang relevan dengan destinasi. */
  videoUrl: string;
}

export interface FoodItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  mainIngredients: string[];
  originStory: string;
  funFact: string;
  imageUrl: string;
  /** URL video YouTube yang relevan dengan kuliner. */
  videoUrl: string;
}

export type SceneName =
  | 'tomb' | 'scroll' | 'heart' | 'river' | 'drum' | 'cloth'
  | 'rain' | 'book' | 'palace' | 'calendar' | 'fish' | 'mountain';

/** Gambar pendamping: foto asli bila tersedia, kalau tidak ilustrasi sederhana. */
export type CulturePicture =
  | { kind: 'photo'; src: string; caption: string }
  | { kind: 'scene'; scene: SceneName };

export interface CultureEntry {
  id: string;
  year?: string;
  title: string;
  summary: string;
  detail: string;
  picture?: CulturePicture;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type AchievementRequirementType = 'destinations_count' | 'foods_count' | 'game_score';

export interface Achievement {
  id: string;
  code: string;
  title: string;
  description: string;
  icon: string;
  requirementType: AchievementRequirementType;
  requirementValue: number;
}

// ---- Asal-Usul Lamongan (bagian Budaya) ----
export interface OriginTimelineEntry {
  id: string;
  year: string;
  title: string;
  summary: string;
  detail: string;
  picture?: CulturePicture;
}

export interface OriginFigure {
  id: string;
  name: string;
  role: string;
  description: string;
  /** Opsional: path foto di /public (mis. "/images/budaya/mbah-lamong.jpg"). */
  image?: string;
  /** Keterangan foto bila fotonya bukan potret tokoh (mis. lokasi terkait). */
  imageCaption?: string;
}

export interface OriginValue {
  id: string;
  icon: 'heart' | 'users' | 'landmark' | 'wheat' | 'waves' | 'music' | 'shirt';
  title: string;
  description: string;
  /** Opsional: foto asli sebagai pengganti ikon. */
  image?: string;
  imageCaption?: string;
}

export interface OriginSource {
  label: string;
  url: string;
}

export interface CultureArt {
  id: string;
  name: string;
  category: string;
  icon: 'music' | 'mic' | 'wheat' | 'waves' | 'shirt' | 'drama' | 'utensils';
  description: string;
  /** Kata kunci pencarian YouTube bila belum ada video spesifik. */
  searchQuery: string;
  /** Opsional: tautan video YouTube spesifik. Bila diisi, tombol membuka video ini. */
  videoUrl?: string;
  /** Foto cadangan bila belum ada video. */
  image?: string;
  imageCaption?: string;
}
