
import type { Destination } from '@/lib/types';

/**
 * CATATAN VERIFIKASI DATA
 * Data destinasi merupakan MOCK DATA untuk pengembangan UI.
 * Deskripsi, fakta unik, rating, dan gambar belum diverifikasi
 * sepenuhnya melalui sumber resmi.
 * isVerified: false menandai data yang masih perlu diverifikasi.
 */
export const destinations: Destination[] = [
  {
    id: 'd1',
    slug: 'wisata-bahari-lamongan',
    name: 'Wisata Bahari Lamongan (WBL)',
    location: 'Paciran, Lamongan',
    category: 'buatan',
    shortDescription:
      'Taman rekreasi pesisir dengan wahana keluarga dan area pantai.',
    longDescription:
      'Wisata Bahari Lamongan (WBL) berada di Paciran, Lamongan, di tepi pantai utara. Tempat ini adalah taman rekreasi pesisir dengan berbagai wahana keluarga dan area pantai. Anak-anak bisa bermain sambil belajar tentang laut, bersama teman dan keluarga.',
    images: [
      'https://nativeindonesia.com/foto/2024/07/wisata-bahari-lamongan.jpg',
    ],
    funFacts: [
      'WBL (Wisata Bahari Lamongan) merupakan destinasi wisata edukasi dan rekreasi dengan berbagai wahana menarik. Anak-anak dapat belajar, bereksplorasi, dan memperoleh pengalaman baru secara langsung. Kegiatan ini menumbuhkan rasa ingin tahu, keberanian, kebersamaan, dan keceriaan anak.',
    ],
    popularity: 4.4,
    
    videoUrl: 'https://youtu.be/OBZByujrj0U?si=j58w3qP--9mf2ate',
  },
  {
    id: 'd2',
    slug: 'goa-maharani',
    name: 'Goa Maharani',
    location: 'Paciran, Lamongan',
    category: 'alam',
    shortDescription:
      'Gua alami dengan formasi stalaktit dan stalagmit, dikembangkan sebagai wisata edukatif.',
    longDescription:
      'Goa Maharani berada di Paciran, Lamongan. Di dalam goa alami ini ada formasi batu yang menggantung (stalaktit) dan yang tumbuh dari lantai (stalagmit). Di sekitarnya terdapat Maharani Zoo, sehingga anak-anak bisa mengenal alam dan berbagai satwa dalam satu kunjungan.',
    images: [
      'https://www.tempatwisata.pro/users_media/3086/153817387_479786906365520_5986519388863567262_n.jpg',
    ],
    funFacts: [
      'Maharani Zoo dan Goa Lamongan merupakan destinasi wisata edukasi yang menawarkan keindahan goa alami serta beragam koleksi satwa. Anak-anak dapat mengenal berbagai jenis hewan, mengamati keindahan alam, dan belajar tentang kehidupan satwa. Kegiatan ini menumbuhkan rasa ingin tahu, kepedulian terhadap lingkungan, serta kecintaan terhadap alam dan hewan.',
    ],
    popularity: 4.3,
   
    videoUrl: 'https://youtu.be/EXLuYf5tpH4?si=Rtt0NE2zvvmLWy40',
  },
  {
    id: 'd3',
    slug: 'makam-sunan-drajat',
    name: 'Makam Sunan Drajat',
    location: 'Paciran, Lamongan',
    category: 'religi',
    shortDescription:
      'Kompleks makam salah satu Wali Songo, tujuan wisata religi dan edukasi sejarah.',
    longDescription:
      'Makam Sunan Drajat berada di Paciran, Lamongan. Sunan Drajat adalah salah satu tokoh Wali Songo yang menyebarkan agama Islam. Kompleks makam ini menjadi tujuan wisata religi sekaligus tempat belajar sejarah dan keteladanan, seperti sikap peduli dan menghormati sesama.',
    images: [
      'https://assets.pikiran-rakyat.com/crop/0x0%3A0x0/1200x675/webp/photo/2023/01/29/3336985679.jpg',
    ],
    funFacts: [
      'Sunan Drajat Lamongan merupakan salah satu wisata religi dan tempat bersejarah yang menjadi peninggalan penyebaran agama Islam oleh Sunan Drajat. Pengunjung dapat mengenal sejarah, perjuangan, serta nilai-nilai keteladanan Sunan Drajat. Kunjungan ini menumbuhkan sikap religius, rasa hormat, dan kecintaan terhadap sejarah serta budaya.',
    ],
    popularity: 4.6,
    
    videoUrl: 'https://youtu.be/PPCFiWKA5AA?si=dU9KujM58soUCa2X',
  },
  {
    id: 'd4',
    slug: 'waduk-gondang',
    name: 'Waduk Gondang',
    location: 'Sugio, Lamongan',
    category: 'alam',
    shortDescription:
      'Bendungan besar yang juga dimanfaatkan sebagai area wisata air dan pemancingan.',
    longDescription:
      'Waduk Gondang berada di Sugio, Lamongan. Waduk berupa bendungan besar ini dimanfaatkan sebagai tempat wisata air dan pemancingan. Pemandangan danaunya asri, cocok untuk mengenalkan anak pada alam dan lingkungan di sekitar waduk.',
    images: [
      'https://nativeindonesia.com/foto/2024/08/wisata-perahu.jpg',
    ],
    funFacts: [
      'Waduk Gondang merupakan destinasi wisata alam yang menawarkan pemandangan danau yang indah dan suasana yang asri. Anak-anak dapat menikmati keindahan alam, mengenal lingkungan sekitar, serta mengamati kehidupan di sekitar waduk. Kegiatan ini memberikan pengalaman menyenangkan sekaligus menumbuhkan rasa cinta terhadap alam.',
    ],
    popularity: 4.0,
   
    videoUrl: 'https://youtu.be/h1XBXOSafDA?si=7wXoT01C8pQDy_hr',
  },
  {
    id: 'd5',
    slug: 'monumen-van-der-wijck',
    name: 'Monumen Van Der Wijck',
    location: 'Brondong, Lamongan',
    category: 'sejarah',
    shortDescription:
      'Monumen peringatan peristiwa tenggelamnya kapal Van der Wijck di perairan Lamongan.',
    longDescription:
      'Monumen Van Der Wijck berada di Brondong, Lamongan. Monumen ini dibangun untuk mengenang peristiwa tenggelamnya kapal Van der Wijck di perairan Lamongan. Dari sini anak-anak bisa mendengar kisah masa lalu dan belajar menghargai sejarah.',
    images: [
      'https://1.bp.blogspot.com/-hQu_Y5wmGMk/WSW7Bex_ZyI/AAAAAAAAFq0/OZzf_vYcvsErRGYroQanSSRPMAqP4PRlgCLcB/s1600/2.jpg',
    ],
    funFacts: [
      'Monumen Kapal Van der Wijck di Lamongan merupakan bangunan bersejarah yang menjadi pengingat peristiwa tenggelamnya kapal Van der Wijck. Tempat ini menyimpan nilai sejarah dan menjadi sarana untuk mengenal kisah masa lalu. Kunjungan ini menumbuhkan rasa ingin tahu serta kecintaan anak terhadap sejarah dan budaya daerah.',
    ],
    popularity: 3.9,
    
    videoUrl: 'https://www.youtube.com/watch?v=MpXMB_BWzlw',
  },
  {
    id: 'd6',
    slug: 'pantai-kutang',
    name: 'Pantai Kutang',
    location: 'Brondong, Lamongan',
    category: 'alam',
    shortDescription:
      'Pantai dengan hutan mangrove yang menjadi daya tarik ekowisata pesisir.',
    longDescription:
      'Pantai Kutang berada di Brondong, Lamongan. Pantai ini punya hutan mangrove yang menjadi daya tarik wisata pesisir. Anak-anak bisa melihat laut dan pasir, sambil belajar bahwa mangrove perlu dijaga bersama.',
    images: [
      'https://assets.promediateknologi.id/crop/0x0%3A0x0/750x0/webp/photo/p1/741/2023/09/05/002-pantai-kutang-564358875.jpg',
    ],
    funFacts: [
      'Pantai Kutang Lamongan merupakan destinasi wisata bahari yang memiliki pemandangan laut indah dengan hamparan pasir dan suasana pantai yang menenangkan. Pengunjung dapat menikmati keindahan alam, bermain pasir, serta mengenal ekosistem pesisir. Kegiatan ini memberikan pengalaman menyenangkan sekaligus menumbuhkan rasa cinta dan kepedulian terhadap lingkungan laut.',
    ],
    popularity: 4.1,
   
    videoUrl: 'https://www.youtube.com/watch?v=pRdi2RTf24o',
  },
];

export function getDestinationBySlug(
  slug: string
): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
