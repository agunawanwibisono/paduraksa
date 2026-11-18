
import type { FoodItem } from '@/lib/types';

/**
 * CATATAN VERIFIKASI DATA
 * Data kuliner digunakan untuk pengembangan UI.
 * Informasi sejarah dan fakta kuliner perlu diverifikasi
 * sebelum dipublikasikan sebagai informasi resmi.
 * isVerified: false menandai data yang belum diverifikasi.
 */
export const foods: FoodItem[] = [
  {
    id: 'f1',
    slug: 'soto-lamongan',
    name: 'Soto Lamongan',
    description:
      'Soto ayam dengan kuah bening berbumbu khas, ditaburi koya (bubuk kerupuk dan bawang putih).',
    mainIngredients: ['Ayam', 'Koya', 'Soun', 'Kol', 'Telur rebus'],
    originStory:
      'Soto Lamongan berasal dari Kabupaten Lamongan, Jawa Timur. Kuliner ini berkembang melalui tradisi masyarakat Lamongan yang berdagang makanan dan merantau ke berbagai daerah. Seiring waktu, Soto Lamongan semakin dikenal di seluruh Indonesia dan menjadi salah satu identitas kuliner daerah.',
    funFact:
      'Rahasia keunikan Soto Lamongan terletak pada koya, yaitu taburan gurih yang dibuat dari kerupuk udang dan bawang putih goreng yang dihaluskan. Koya membuat kuah soto terasa lebih gurih dan memiliki cita rasa khas yang membedakannya dari soto daerah lain.',
    imageUrl:
      'https://media.indozone.id/crop/1200x630%3A0x0/smart/photo/indizone/2023/01/25/RMsvRV6/resep-soto-ayam-lamongan-kuah-kuning-topping-koya-simple80.jpg',

    videoUrl: 'https://youtu.be/i2EUvltas1c?si=ar6oI1tiuT-684lV',
  },
  {
    id: 'f2',
    slug: 'tahu-campur',
    name: 'Tahu Campur',
    description:
      'Perpaduan tahu goreng, mi, lentho, dan sayuran dengan kuah petis khas.',
    mainIngredients: ['Tahu', 'Mi kuning', 'Lentho', 'Petis udang'],
    originStory:
      'Tahu Campur merupakan salah satu kuliner khas Jawa Timur yang juga populer di Kabupaten Lamongan. Hidangan ini berkembang sebagai makanan masyarakat dengan perpaduan tahu, sayuran, mi, lentho, dan kuah berbumbu petis. Cita rasanya menjadi bagian dari kekayaan kuliner Lamongan.',
    funFact:
      'Keunikan Tahu Campur terletak pada perpaduan rasa gurih, manis, dan sedikit khas dari petis udang. Salah satu bahan menariknya adalah lentho, yaitu gorengan berbahan dasar singkong parut dan kacang-kacangan yang memberikan tekstur renyah di luar dan lembut di dalam.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Tahu_Campur_1.jpg',

    videoUrl: 'https://youtu.be/XUTC_NYQAMs?si=ZHDxx6GV_THp3zkK',
  },
  {
    id: 'f3',
    slug: 'wingko',
    name: 'Wingko Babat',
    description:
      'Kue manis berbahan dasar kelapa parut dan tepung ketan, dipanggang hingga kecokelatan.',
    mainIngredients: ['Kelapa parut', 'Tepung ketan', 'Gula'],
    originStory:
      'Wingko Babat merupakan makanan tradisional yang dikenal berasal dari Kecamatan Babat, Kabupaten Lamongan. Salah satu kisah perkembangan wingko di Babat berkaitan dengan keluarga Loe Soe Siang yang diperkirakan mulai membuatnya sekitar tahun 1900-an. Sejak itu, wingko berkembang menjadi oleh-oleh khas yang dikenal luas oleh wisatawan.',
    funFact:
      'Wingko memiliki perpaduan rasa manis dan gurih dari kelapa. Bagian luarnya dipanggang hingga kecokelatan, sedangkan bagian dalamnya cenderung lembut dan kenyal. Setiap produsen juga dapat memiliki resep dan variasi rasa tersendiri.',
    imageUrl:
      'https://image.idntimes.com/post/20260327/screenshot_2026_0327_144050-2_ffba340c-637d-4625-a9c2-798a29c57354.jpg?tr=w-1200',

    videoUrl: 'https://youtu.be/h-55wIB2TWM?si=1ZscgHhlVRTEhOt-',
  },
  {
    id: 'f4',
    slug: 'pecel-lele',
    name: 'Pecel Lele',
    description:
      'Lele goreng renyah disajikan dengan sambal dan lalapan segar.',
    mainIngredients: ['Ikan lele', 'Sambal', 'Lalapan'],
    originStory:
      'Pecel Lele sangat lekat dengan tradisi kuliner masyarakat Lamongan. Pedagang asal Lamongan membawa hidangan ini ke berbagai kota melalui kegiatan merantau dan berdagang. Sejak sekitar dekade 1970-an, usaha pecel lele mulai berkembang di luar daerah dan semakin populer di kota-kota besar Indonesia.',
    funFact:
      'Pecel Lele Lamongan dikenal luas melalui warung tenda yang sering buka pada sore hingga malam hari. Hidangan ini biasanya disajikan dengan sambal, lalapan, dan nasi hangat. Setiap warung memiliki racikan sambal yang menjadi ciri khasnya sendiri.',
    imageUrl:
      'https://tangerangsejahtera.com/wp-content/uploads/2025/11/IMG_20251103_180027.jpg',

    videoUrl: 'https://www.youtube.com/watch?v=lMcRvErJgOE',
  },
  {
    id: 'f5',
    slug: 'nasi-boranan',
    name: 'Nasi Boranan',
    description:
      'Nasi dengan aneka lauk pilihan yang disiram bumbu boran khas berwarna kehitaman.',
    mainIngredients: ['Nasi', 'Bumbu boran', 'Aneka lauk'],
    originStory:
      'Nasi Boranan atau Sego Boranan merupakan kuliner tradisional dari Kabupaten Lamongan. Makanan ini dikenal berkembang sejak sekitar tahun 1940-an di lingkungan masyarakat Lamongan. Nama boranan berasal dari wadah anyaman bambu yang dahulu digunakan pedagang untuk membawa nasi dan lauk ketika berjualan.',
    funFact:
      'Nasi Boranan mempunyai lauk khas seperti ikan sili, empuk, dan pletuk yang jarang ditemukan pada sajian nasi dari daerah lain. Hidangan ini juga memiliki sambal dan bumbu khas yang membuat rasanya berbeda. Dahulu, para pedagang menggunakan boran untuk membawa dagangan saat berjualan.',
    imageUrl:
      'https://assets.rakcer.id/main/2025/07/hdnjdb.webp',

    videoUrl: 'https://youtu.be/tNrpLRNEVQ8?si=XknR9itGH7kisC0y',
  },
];

export function getFoodBySlug(
  slug: string
): FoodItem | undefined {
  return foods.find((f) => f.slug === slug);
}
