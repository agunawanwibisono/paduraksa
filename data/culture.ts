import { destinationPhoto } from './photos';
import type { CultureEntry, QuizQuestion, OriginTimelineEntry, OriginFigure, OriginValue, OriginSource, CultureArt } from '@/lib/types';

export const cultureTimeline: CultureEntry[] = [
  {
    id: 'c1',
    title: 'Asal-usul nama Lamongan',
    summary: 'Cerita rakyat seputar asal nama daerah.',
    detail: 'Banyak daerah punya cerita rakyat tentang asal namanya, termasuk Lamongan.',
  },
  {
    id: 'c2',
    title: 'Peran Wali Songo di wilayah pesisir',
    summary: 'Jejak penyebaran Islam di kawasan pesisir utara.',
    detail: 'Para Wali Songo berperan penting dalam sejarah wilayah pesisir utara Jawa.',
  },
  {
    id: 'c3',
    title: 'Perkembangan sebagai daerah otonom',
    summary: 'Tonggak administratif dalam sejarah Lamongan.',
    detail: 'Lamongan terus berkembang sebagai daerah dengan pemerintahan sendiri.',
  },
  {
    id: 'c4',
    title: 'Tradisi dan kesenian lokal',
    summary: 'Kesenian dan tradisi yang berkembang di masyarakat Lamongan.',
    detail: 'Kesenian dan tradisi diwariskan dari generasi ke generasi di masyarakat Lamongan.',
  },
];

export const cultureFacts: CultureEntry[] = [
  {
    id: 'fact1',
    title: 'Julukan "Kota Soto"',
    summary: 'Lamongan dikenal luas lewat kuliner Soto Lamongan yang tersebar ke banyak kota.',
    detail: 'Soto Lamongan dijajakan oleh banyak perantau, sehingga dikenal di berbagai kota.',
  },
  {
    id: 'fact2',
    title: 'Kawasan pesisir & agraris',
    summary: 'Lamongan memiliki wilayah pesisir sekaligus dataran pertanian yang luas.',
    detail: 'Pesisir menghasilkan ikan, sedangkan dataran luasnya cocok untuk bertani.',
  },
  {
    id: 'fact3',
    title: 'Pusat wisata religi Wali Songo',
    summary: 'Beberapa situs religi penting terkait Wali Songo berada di wilayah ini.',
    detail: 'Makam Sunan Drajat di Paciran adalah salah satu contohnya.',
  },
  {
    id: 'fact4',
    title: 'Hari jadi dari buku wasiat',
    summary: 'Banyak daerah menetapkan hari jadi dari prasasti atau candi. Lamongan memakai kitab wasiat Sunan Giri yang hanya menyebut tahun 976 H, lalu panitia khusus menelusuri hari dan bulannya hingga ketemu 26 Mei 1569.',
    detail: 'Hari Jadi Lamongan dihitung dari kitab wasiat Sunan Giri yang hanya menyebut tahun 976 H. Panitia lalu menelusuri hari dan bulannya, sampai ditemukan tanggal 26 Mei 1569.',
  },
  {
    id: 'fact5',
    title: 'Dialiri Bengawan Solo',
    summary: 'Lamongan termasuk daerah yang dilalui sungai Bengawan Solo, selain Kali Lamong yang menjadi jalur perjalanan Rangga Hadi.',
    detail: 'Bengawan Solo dan Kali Lamong sama-sama mengalir di Lamongan. Kali Lamong disebut dalam kisah perjalanan Rangga Hadi dengan perahu.',
  },
  {
    id: 'fact6',
    title: 'Makam Mbah Lamong dibuka pada waktu tertentu',
    summary: 'Makam Mbah Lamong di Kelurahan Tumenggungan tidak dibuka setiap hari. Menurut warga sekitar, makam ramai dikunjungi saat hari jadi dan malam Jumat.',
    detail: 'Makam Mbah Lamong tidak dibuka setiap hari. Menurut warga sekitar, makam ramai dikunjungi saat Hari Jadi Lamongan dan pada malam Jumat.',
  },
  {
    id: 'fact7',
    title: 'Tenun ikat Parengan',
    summary: 'Tenun ikat Parengan disebut berakar dari masa pemerintahan Tumenggung Surajaya, sehingga kain tradisional ini ikut menjadi warisan sejarah Lamongan.',
    detail: 'Tenun ikat Parengan adalah kain tradisional Lamongan. Kain ini disebut sudah ada sejak masa pemerintahan Tumenggung Surajaya, sehingga menjadi bagian dari warisan sejarah daerah.',
  },
];

export const cultureQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Soto Lamongan biasanya ditaburi dengan bubuk khas bernama apa?',
    options: ['Koya', 'Bumbu kacang', 'Kerupuk udang', 'Serundeng'],
    correctIndex: 0,
    explanation: 'Koya adalah bubuk campuran kerupuk dan bawang putih goreng, ciri khas Soto Lamongan.',
  },
  {
    id: 'q2',
    question: 'Makam salah satu Wali Songo yang berada di Lamongan adalah makam...',
    options: ['Sunan Kalijaga', 'Sunan Drajat', 'Sunan Gunung Jati', 'Sunan Bonang'],
    correctIndex: 1,
    explanation: 'Makam Sunan Drajat berada di kawasan Paciran, Lamongan.',
  },
  {
    id: 'q3',
    question: 'Wisata Bahari Lamongan (WBL) berlokasi di kecamatan mana?',
    options: ['Sugio', 'Brondong', 'Paciran', 'Babat'],
    correctIndex: 2,
    explanation: 'WBL terletak di kawasan pesisir Paciran, Lamongan.',
  },
  {
    id: 'q4',
    question: 'Siapa adipati pertama Lamongan yang bergelar Tumenggung Surajaya?',
    options: ['Rangga Hadi (Mbah Lamong)', 'Sunan Prapen', 'Mbah Sabilan', 'Mbah Bayapati'],
    correctIndex: 0,
    explanation: 'Rangga Hadi, yang dijuluki Mbah Lamong, diwisuda sebagai adipati pertama Lamongan dengan gelar Tumenggung Surajaya.',
  },
  {
    id: 'q5',
    question: 'Hari Jadi Lamongan diperingati setiap tanggal...',
    options: ['17 Agustus', '26 Mei', '10 November', '1 Muharram'],
    correctIndex: 1,
    explanation: 'Hari Jadi Lamongan jatuh pada 26 Mei, merujuk wisuda Tumenggung Surajaya pada 26 Mei 1569.',
  },
  {
    id: 'q6',
    question: 'Nama "Lamongan" berasal dari julukan...',
    options: ['Mbah Lamong', 'Raden Wijaya', 'Kali Brantas', 'Kenduruan'],
    correctIndex: 0,
    explanation: 'Rakyat menjuluki Hadi sebagai Mbah Lamong karena sifatnya yang ngemong atau mengayomi.',
  },
  {
    id: 'q7',
    question: 'Sumber apa yang dipakai untuk menetapkan Hari Jadi Lamongan?',
    options: ['Prasasti batu', 'Candi kuno', 'Kitab wasiat Sunan Giri', 'Peta kolonial'],
    correctIndex: 2,
    explanation: 'Berbeda dari banyak daerah, hari jadi Lamongan ditelusuri dari kitab wasiat yang menyebut tahun 976 H.',
  },
  {
    id: 'q8',
    question: 'Tradisi syukuran seusai panen di Lamongan disebut...',
    options: ['Sedekah Bumi', 'Larung Sesaji', 'Grebeg Suro', 'Kirab Pusaka'],
    correctIndex: 0,
    explanation: 'Sedekah Bumi adalah wujud syukur kepada Tuhan atas hasil bumi.',
  },
];

/* ------------------------------------------------------------------ *
 * Asal-Usul Lamongan
 * Disusun dari sumber yang dapat ditelusuri (lihat `originSources`).
 * Bagian legenda adalah cerita tutur, bukan fakta sejarah yang terbukti.
 * ------------------------------------------------------------------ */
export const originIntro =
  'Di balik namanya yang kini identik dengan soto dan pecel lele, Lamongan menyimpan kisah panjang tentang seorang santri yang dicintai rakyatnya. Mari telusuri bagaimana sebuah wilayah di tepian Kali Lamong tumbuh menjadi kabupaten.';

export const originTimeline: OriginTimelineEntry[] = [
  {
    id: 'o1',
    year: 'Abad ke-16',
    title: 'Hadi, santri dari Dusun Cancing',
    summary: 'Seorang pemuda dari Ngimbang menimba ilmu agama dan tata pemerintahan di lingkungan Kesultanan Giri.',
    detail:
      'Hadi berasal dari Dusun Cancing (kini Desa Sendangrejo, Kecamatan Ngimbang). Ia dikenal sebagai santri Giri yang cakap dalam ilmu agama sekaligus seluk-beluk pemerintahan.',
  },
  {
    id: 'o2',
    year: 'Sebelum 1569',
    title: 'Rangga Hadi membuka wilayah baru',
    summary: 'Hadi memperoleh pangkat Rangga, lalu menyusuri Kali Lamong bersama para pengikutnya.',
    detail:
      'Menurut penuturan sejarah lokal, Rangga Hadi dan pengikutnya naik perahu menyusuri Kali Lamong hingga tiba di sebuah tempat bernama Kenduruan. Di sana ia membina masyarakat, mengatur pemerintahan, dan menyebarkan ajaran Islam.',
  },
  {
    id: 'o3',
    year: '26 Mei 1569',
    title: 'Lamongan menjadi kadipaten',
    summary: 'Sunan Giri IV (Sunan Prapen) menaikkan status wilayah Kranggan Lamongan menjadi kadipaten.',
    detail:
      'Dalam sebuah pasamuan agung di Giri, Rangga Hadi diwisuda sebagai adipati pertama bergelar Tumenggung Surajaya. Tanggal ini ditelusuri dari kitab wasiat Sunan Giri yang menyebut tahun 976 H, lalu dihitung bertepatan dengan 10 Dzulhijjah 976 H atau 26 Mei 1569 M.',
  },
  {
    id: 'o4',
    year: '1607',
    title: 'Wafatnya Tumenggung Surajaya',
    summary: 'Sang adipati pertama wafat dan dimakamkan di Kelurahan Tumenggungan, Lamongan.',
    detail:
      'Makam yang dikenal sebagai makam Mbah Lamong berada di tengah permukiman warga dan hingga kini menjadi tujuan ziarah, terutama menjelang Hari Jadi Lamongan.',
  },
  {
    id: 'o5',
    year: '1994',
    title: 'Hari Jadi Lamongan diresmikan',
    summary: 'Pemkab Lamongan menetapkan 26 Mei sebagai Hari Jadi lewat penelusuran naskah kuno.',
    detail:
      'Panitia penyusun naskah hari jadi dan sejarah Lamongan meneliti naskah kuno, lalu hasilnya dimuat dalam buku "Memayu Raharjaning Praja" yang diterbitkan Pemkab Lamongan pada 1994. Hari Jadi Lamongan diperingati setiap 26 Mei, dan pada 2026 memasuki tahun ke-457.',
  },
];

/** Cerita singkat untuk anak PAUD: kalimat pendek, satu ide per gambar. */
export const originKidsStory: { id: string; text: string; scene: import('@/lib/types').SceneName }[] = [
  { id: 'k1', text: 'Dulu ada seorang pemuda bernama Hadi. Ia rajin belajar.', scene: 'book' },
  { id: 'k2', text: 'Hadi naik perahu menyusuri sungai bernama Kali Lamong.', scene: 'river' },
  { id: 'k3', text: 'Hadi menjadi pemimpin yang baik dan sayang pada rakyatnya.', scene: 'palace' },
  { id: 'k4', text: 'Orang-orang memanggilnya Mbah Lamong. Dari nama itu lahirlah nama Lamongan.', scene: 'heart' },
  { id: 'k5', text: 'Setiap tanggal 26 Mei, kita merayakan Hari Jadi Lamongan.', scene: 'calendar' },
];

export const originNameSteps: string[] = ['Hadi', 'Rangga Hadi', 'Mbah Lamong', 'Lamongan'];

export const originNameStory: string[] = [
  'Nama Lamongan berasal dari nama seorang tokoh di masa silam. Pemuda bernama Hadi memperoleh pangkat Rangga sehingga disebut Rangga Hadi. Rakyat kemudian menjulukinya Mbah Lamong, sapaan penuh hormat yang melekat karena sifatnya yang ngemong, yaitu pandai mengayomi, membina daerah, dan penuh kasih sayang.',
  'Menurut penjelasan pihak kebudayaan setempat, kata "Lamong" dimaknai dari bahasa Jawa kuno: "La" atau "Ra" berarti baik, dan "Mong" berarti among, momong, atau ngemong. Setelah Hadi diwisuda sebagai adipati, wilayah yang dipimpinnya pun dikenal dengan nama Lamongan.',
];

export const originFigures: OriginFigure[] = [
  {
    id: 'f1',
    name: 'Mbah Lamong (Rangga Hadi)',
    role: 'Tumenggung Surajaya, adipati pertama Lamongan',
    description:
      'Santri Giri asal Ngimbang yang dikenal bijak dan penuh kasih. Namanya diabadikan menjadi nama Lamongan. Makamnya berada di Kelurahan Tumenggungan.',
  },
  {
    id: 'f2',
    name: 'Sunan Giri IV (Sunan Prapen)',
    role: 'Penguasa Giri yang mewisuda sang adipati',
    description:
      'Tokoh Kesultanan Giri di Gresik yang menaikkan status Lamongan menjadi kadipaten dan mewisuda Rangga Hadi pada 1569. Sebagian sumber menyebut nama Sunan Giri yang berbeda, tetapi sebagian besar merujuk Sunan Prapen.',
  },
  {
    id: 'f3',
    name: 'Mbah Sabilan dan Mbah Punuk',
    role: 'Tokoh penting sejarah Lamongan',
    description:
      'Disebut bersama Mbah Lamong sebagai tokoh besar Lamongan. Makam mereka termasuk yang diziarahi pada rangkaian Hari Jadi Lamongan. Nama Mbah Sabilan juga ditulis Sambilan di beberapa sumber.',
  },
  {
    id: 'f4',
    name: 'Syekh Hisamuddin (Sunan Deket)',
    role: 'Penyebar Islam dan penasihat adipati pertama',
    description:
      'Dikenal pula sebagai Mbah Sinuwun. Ia disebut sebagai penasihat Tumenggung Surajaya serta aulia penyebar Islam di Lamongan.',
  },
  {
    id: 'f5',
    name: 'Mbah Bayapati (Boyopati)',
    role: 'Penyebar Islam di Desa Medang, Glagah',
    description:
      'Makamnya di Desa Medang ramai diziarahi dan ditetapkan sebagai cagar budaya lewat SK Bupati. Kisahnya hidup sebagai cerita tutur di tengah warga.',
  },
  {
    id: 'f6',
    name: 'Sunan Drajat',
    role: 'Wali Songo yang makamnya berada di Paciran',
    description:
      'Salah satu Wali Songo yang jejaknya melekat di pesisir Lamongan. Makamnya di Paciran menjadi tujuan wisata religi. Kesenian kentrung pun sering dikaitkan dengan namanya.',
    image: destinationPhoto('makam-sunan-drajat'),
    imageCaption: 'Foto Makam Sunan Drajat di Paciran',
  },
];

export const originLegends: CultureEntry[] = [
  {
    id: 'l1',
    title: 'Perahu Rangga Hadi menyusuri Kali Lamong',
    summary:
      'Dituturkan turun-temurun, Rangga Hadi dan para pengikutnya mengayuh perahu menyusuri Kali Lamong untuk mencari tempat yang cocok membina masyarakat. Perjalanan itu berakhir di Kenduruan, tempat ia mulai membangun pemerintahan dan menyebarkan Islam dengan cara yang ramah. Sejarah Mbah Lamong juga dibacakan kembali saat ziarah makam leluhur menjelang Hari Jadi Lamongan.',
    detail: 'Cerita ini dituturkan turun-temurun. Rangga Hadi dan pengikutnya naik perahu menyusuri Kali Lamong untuk mencari tempat yang cocok, hingga sampai di Kenduruan.',
  },
  {
    id: 'l2',
    title: 'Panji Laras, Panji Liris, dan larangan menikah dengan orang Kediri',
    summary:
      'Konon Adipati Kediri ingin berbesan dengan Adipati Lamongan lewat dua putri kembarnya, Dewi Andansari dan Dewi Andanwangi. Adipati Lamongan mengajukan syarat, lalu iring-iringan pengantin disambut oleh Panji Laras dan Panji Liris bersama Patih Mbah Sabilan. Menurut penuturan pemerhati sejarah, perselisihan berujung pertempuran, dan sebelum gugur sang adipati berpesan agar keturunannya tidak menikah dengan orang Kediri. Hingga kini sebagian orang masih mempercayai pantangan itu, sementara yang lain menganggapnya sekadar cerita tutur.',
    detail: 'Ini cerita tutur dari penuturan pemerhati sejarah, bukan catatan yang bisa dibuktikan. Sebagian orang masih mempercayai pantangannya, sebagian lain menganggapnya cerita saja.',
  },
  {
    id: 'l3',
    title: 'Mbah Bayapati dan pantangan makan lele',
    summary:
      'Di Desa Medang, Glagah, tersebar kisah bahwa Mbah Bayapati pernah diselamatkan oleh ikan lele di sebuah sendang. Karena itu sebagian keturunannya, termasuk yang tinggal di Gresik, berpantang makan lele. Warga Medang rutin menggelar haul akbar setahun sekali di makam beliau. Cerita ini unik karena Lamongan justru dikenal luas lewat pecel lele.',
    detail: 'Kisah dari Desa Medang, Glagah ini menceritakan lele yang menolong Mbah Bayapati. Karena itu sebagian keturunannya berpantang makan lele, padahal Lamongan terkenal dengan pecel lele.',
  },
  {
    id: 'l4',
    title: 'Mitos Gunung Pegat di Babat',
    summary:
      'Di Kecamatan Babat dikenal mitos tentang Gunung Pegat, dengan anjuran melempar ayam sebagai bagian dari kepercayaan setempat. Kata "pegat" dalam bahasa Jawa berarti putus atau bercerai, dan mitos ini sering dikaitkan dengan urusan rumah tangga. Seperti legenda lain, ini kepercayaan lisan yang tidak dapat dibuktikan secara sejarah.',
    detail: 'Ini kepercayaan lisan di Kecamatan Babat dan tidak dapat dibuktikan secara sejarah. Kata "pegat" dalam bahasa Jawa berarti putus atau bercerai.',
  },
];

export const originValues: OriginValue[] = [
  {
    id: 'v1',
    icon: 'heart',
    title: 'Ngemong: mengayomi dengan kasih',
    description:
      'Julukan Mbah Lamong menjadi cermin nilai kepemimpinan yang merangkul, membina, dan melindungi rakyat.',
  },
  {
    id: 'v2',
    icon: 'landmark',
    image: destinationPhoto('makam-sunan-drajat'),
    imageCaption: 'Foto Makam Sunan Drajat di Paciran',
    title: 'Religius dan menghormati leluhur',
    description:
      'Ziarah ke makam Mbah Lamong, Mbah Sabilan, dan Mbah Punuk pada 25 Mei membuka rangkaian peringatan Hari Jadi Lamongan, disusul Pasamuan Agung pada 26 Mei.',
  },
  {
    id: 'v3',
    icon: 'wheat',
    title: 'Syukur atas hasil bumi',
    description:
      'Sedekah Bumi adalah syukuran seusai panen sebagai wujud terima kasih kepada Tuhan atas berkah hasil bumi.',
  },
  {
    id: 'v4',
    icon: 'waves',
    image: destinationPhoto('pantai-kutang'),
    imageCaption: 'Foto Pantai Kutang, pesisir Lamongan',
    title: 'Dekat dengan laut',
    description:
      'Masyarakat pesisir di Brondong dan Paciran memiliki tradisi sedekah laut atau petik laut yang diisi doa bersama dan kebersamaan para nelayan.',
  },
  {
    id: 'v5',
    icon: 'music',
    title: 'Seni tutur dan pertunjukan rakyat',
    description:
      'Kentrung Lamongan dibawakan secara monolog oleh dalang yang sekaligus menabuh musik. Ada pula Sandur, Jedor dari Sendangagung, dan Tari Boran yang menggambarkan kerja keras, kesederhanaan, dan kebersamaan.',
  },
  {
    id: 'v6',
    icon: 'users',
    title: 'Gotong royong dan silaturahmi',
    description:
      'Tradisi seperti petik laut di Paciran mempererat hubungan antarwarga lewat perlombaan, berbagi makanan, sedekah, dan doa bersama.',
  },
  {
    id: 'v7',
    icon: 'shirt',
    title: 'Tenun ikat Parengan',
    description:
      'Kain tenun ikat dari Parengan disebut berakar dari masa Tumenggung Surajaya dan masih menjadi kebanggaan perajin Lamongan.',
  },
  {
    id: 'v8',
    icon: 'landmark',
    title: 'Ragam upacara adat',
    description:
      'Selain sedekah bumi dan petik laut, masyarakat Lamongan mengenal nyadran (doa bersama dan tabur bunga di laut), upacara tingkeban, serta pagelaran wayang kulit.',
  },
  {
    id: 'v9',
    icon: 'music',
    title: 'Kentrung hadir di banyak hajatan',
    description:
      'Kentrung Lamongan biasa tampil pada pernikahan, sunatan, tingkepan, sedekah bumi, haul, dan peringatan lahirnya suatu desa atau daerah.',
  },
];


/** Warisan budaya dari desa-desa di Kecamatan Kalitengah. */
export const villageCultureArts: CultureArt[] = [
  {
    id: 'desa-pucangtelu',
    name: 'Budaya Desa Pucangtelu',
    category: 'Tradisi desa',
    icon: 'music',
    description:
      'Budaya Desa Pucangtelu, Kecamatan Kalitengah, Kabupaten Lamongan, merupakan warisan kearifan lokal yang mencerminkan tradisi, nilai kebersamaan, gotong royong, dan kehidupan masyarakat yang religius. Budaya ini tumbuh dan diwariskan secara turun-temurun melalui adat istiadat, kesenian, tradisi masyarakat, serta kegiatan sosial. Kekayaan budaya tersebut menjadi identitas desa yang perlu dijaga, dilestarikan, dan dikenalkan kepada generasi muda.',
    searchQuery: 'Budaya Desa Pucangtelu Lamongan',
    videoUrl: 'https://youtu.be/Y09JMRHbBDc?si=H2zpHC_yXggzYHgL',
  },
  {
    id: 'kopyah-pengangsalan',
    name: 'Kopyah Sultan Kopyah Pengangsalan',
    category: 'Kerajinan lokal',
    icon: 'shirt',
    description:
      'Kopyah Sultan Kopyah Pengangsalan merupakan kerajinan khas Desa Pengangsalan, Kecamatan Kalitengah, Kabupaten Lamongan. Kopyah ini dibuat dengan keterampilan dan ketelitian tangan, memiliki nilai budaya serta menjadi salah satu produk unggulan lokal yang mencerminkan kreativitas, kearifan, dan identitas masyarakat setempat.',
    searchQuery: 'Kopyah Sultan Kopyah Pengangsalan Lamongan',
    videoUrl: 'https://youtu.be/em0NFqpCJl8?si=4qUXyzSx3Z4YGNut',
  },
];

export const originSources: OriginSource[] = [
  { label: 'Kompas.com: Asal Usul Nama Lamongan', url: 'https://www.kompas.com/stori/read/2021/09/23/130000279/asal-usul-nama-lamongan' },
  { label: 'detikJatim: Dari Mana Lamongan Mendapatkan Namanya', url: 'https://news.detik.com/berita-jawa-timur/d-5786797/dari-mana-lamongan-mendapatkan-namanya-begini-ceritanya' },
  { label: 'Beritajatim: Hari Jadi Lamongan dan penelusuran kitab wasiat', url: 'https://beritajatim.com/peristiwa/melacak-asal-usul-hari-jadi-lamongan-dari-kitab-wasiat-sunan-giri/' },
  { label: 'Beritajatim: Hari Jadi Lamongan ke-456 (Navis Abdulrouf)', url: 'https://beritajatim.com/?p=1364380' },
  { label: 'Merdeka.com: Cerita Mbah Lamong dan Kadipaten Lamongan', url: 'https://www.merdeka.com/peristiwa/cerita-mbah-lamong-murid-sunan-giri-sejarah-kadipaten-lamongan.html' },
  { label: 'TIMES Indonesia: Ziarah makam leluhur jelang HJL ke-457', url: 'https://timesindonesia.co.id/peristiwa-daerah/591937/jelang-puncak-hjl-ke457-bupati-lamongan-ziarah-makam-leluhur' },
  { label: 'detikJatim: Syekh Hisamuddin (Sunan Deket)', url: 'https://www.detik.com/jatim/budaya/d-6535390/mengenal-syekh-hisamuddin-alias-sunan-deket-aulia-penyebar-islam-di-lamongan' },
  { label: 'detikJatim: Legenda Panji Laras', url: 'https://www.detik.com/jatim/budaya/d-7159118/legenda-panji-laras-dan-mitos-warga-lamongan-dilarang-nikahi-orang-kediri' },
  { label: 'detikJatim: Sendang Mbah Bayapati', url: 'https://www.detik.com/jatim/budaya/d-7399732/melihat-sendang-di-lamongan-tempat-mbah-bayapati-konon-diselamatkan-lele' },
  { label: 'detikJatim: Kentrung Lamongan', url: 'https://www.detik.com/jatim/budaya/d-6014923/kentrung-lamongan-seni-tutur-monolog-yang-semakin-pudar-tergerus-zaman' },
  { label: 'Jurnal ARIF (UNJ): kajian toponim Lamongan', url: 'https://journal.unj.ac.id/unj/index.php/arif/article/download/44766/19173' },
  { label: 'Merdeka.com: Fakta unik Lamongan dan hari jadi dari buku wasiat', url: 'https://www.merdeka.com/jatim/read/8179641/kini-berusia-455-tahun-ini-fakta-unik-lamongan-yang-hari-jadinya-ditetapkan-pakai-buku-wasiat' },
  { label: 'Mojok: Mitos Gunung Pegat Lamongan', url: 'https://mojok.co/terminal/mitos-gunung-pegat-lamongan-yang-bisa-bikin-pegatan/' },
  { label: 'The Jakarta Post: Tenun Parengan, legacy of Lamongan', url: 'https://newgelora.thejakartapost.com/multimedia/2017/08/24/tenun-parengan-legacy-of-lamongan.html' },
  { label: 'Kumparan: Sejarah, budaya, dan tradisi di Lamongan', url: 'https://kumparan.com/dheen-alvree/sejarah-budaya-dan-tradisi-di-lamongan-240q4ng8SPX' },
];

export const originVideoUrl = 'https://youtu.be/D6eGM0NOdTE?si=C-ILpI8WWgOoJjd4';

export const originVideoSource: OriginSource = {
  label: 'YouTube: video referensi Asal-Usul Lamongan',
  url: originVideoUrl,
};

/* Fakta unik tambahan, ditampilkan setelah tiga fakta awal. */
export const moreCultureFacts: CultureEntry[] = [
  {
    id: 'fact4',
    title: 'Hari jadi dari "buku wasiat"',
    summary:
      'Hari Jadi Lamongan tidak ditetapkan dari prasasti atau candi, melainkan dari kitab wasiat Sunan Giri yang hanya menyebut tahun 976 H. Panitia lalu menelusuri hari dan bulannya hingga ditemukan 10 Dzulhijjah 976 H, bertepatan dengan 26 Mei 1569 M.',
    detail: 'Hari Jadi Lamongan dihitung dari kitab wasiat Sunan Giri yang hanya menyebut tahun 976 H. Panitia lalu menelusuri hari dan bulannya, sampai ditemukan tanggal 26 Mei 1569.',
  },
  {
    id: 'fact5',
    title: 'Nama dari kata "ngemong"',
    summary:
      'Nama Lamongan berasal dari julukan Mbah Lamong, tokoh yang dikenal pandai ngemong atau mengayomi rakyat. Pihak kebudayaan setempat memaknai "La" sebagai baik dan "Mong" sebagai among atau momong.',
    detail: 'Nama Lamongan dikaitkan dengan Mbah Lamong, tokoh yang pandai ngemong atau mengayomi rakyat. "La" dimaknai baik dan "Mong" dimaknai among atau momong.',
  },
  {
    id: 'fact6',
    title: 'Dialiri Bengawan Solo',
    summary:
      'Lamongan termasuk daerah yang dilalui Bengawan Solo. Selain itu, namanya sendiri dekat dengan Kali Lamong, sungai yang menurut penuturan sejarah lokal dilalui Rangga Hadi dengan perahu.',
    detail: 'Bengawan Solo dan Kali Lamong sama-sama mengalir di Lamongan. Kali Lamong disebut dalam kisah perjalanan Rangga Hadi dengan perahu.',
  },
  {
    id: 'fact7',
    title: 'Nasi boran dan rekor MURI',
    summary:
      'Nasi boran adalah kuliner khas Lamongan yang menginspirasi Tari Boran. Pada peringatan Hari Jadi ke-454 tahun 2023, Lamongan mencatat dua rekor MURI: 1.569 pelajar menarikan Tari Boran dan 4.540 porsi nasi boran disajikan, angka yang disesuaikan dengan usia Lamongan.',
    detail: 'Pada Hari Jadi ke-454 tahun 2023, Lamongan mencatat dua rekor MURI: 1.569 pelajar menarikan Tari Boran dan 4.540 porsi nasi boran disajikan.',
  },
  {
    id: 'fact8',
    title: 'Kentrung berupa monolog',
    summary:
      'Kentrung Lamongan unik karena dibawakan secara monolog: dalang bercerita sekaligus menabuh musiknya sendiri. Kesenian ini biasa tampil saat hajatan, tingkepan, sedekah bumi, haul, atau peringatan lahirnya sebuah desa.',
    detail: 'Pada Kentrung, satu dalang bercerita sekaligus menabuh musiknya sendiri. Kesenian ini biasa tampil saat hajatan, tingkepan, sedekah bumi, haul, atau peringatan lahirnya sebuah desa.',
  },
  {
    id: 'fact9',
    title: 'Cikal bakal pecel lele, tetapi ada yang berpantang lele',
    summary:
      'Lamongan dikenal sebagai tempat pecel lele menyebar ke berbagai daerah. Namun sebagian keturunan Mbah Bayapati di Desa Medang berpantang makan lele karena kisah turun-temurun tentang leluhur mereka.',
    detail: 'Pecel lele menyebar dari Lamongan ke berbagai daerah. Di Desa Medang, sebagian keturunan Mbah Bayapati justru berpantang makan lele karena kisah leluhur mereka.',
  },
  {
    id: 'fact10',
    title: 'Tenun ikat Parengan',
    summary:
      'Tenun ikat Parengan disebut berakar sejak masa pemerintahan Tumenggung Surajaya (1569 sampai 1607) dan menjadi salah satu warisan kerajinan Lamongan.',
    detail: 'Tenun ikat Parengan adalah kain tradisional Lamongan. Kain ini disebut sudah ada sejak masa pemerintahan Tumenggung Surajaya, sehingga menjadi bagian dari warisan sejarah daerah.',
  },
  {
    id: 'fact11',
    title: 'Wayang kulit untuk memanggil hujan',
    summary:
      'Di sebagian wilayah Lamongan pernah ada tradisi menggelar wayang kulit untuk memohon hujan saat musim kemarau. Tradisi ini kini mulai jarang ditemui sehingga layak dikenali dan dilestarikan.',
    detail: 'Di sebagian wilayah Lamongan pernah ada tradisi wayang kulit untuk memohon hujan saat kemarau. Tradisi ini mulai jarang ditemui, jadi perlu dikenali dan dilestarikan.',
  },
];

/* Kesenian dan tradisi. Video spesifik bisa ditambahkan lewat `videoUrl`. */
export const cultureArts: CultureArt[] = [
  {
    id: 'a1',
    name: 'Tari Boran',
    category: 'Tari kreasi',
    icon: 'music',
    description:
      'Tari kreasi baru ciptaan Tri Kristiani dan Ninin Desinta, guru seni dari Kembangbahu, yang menggambarkan langkah para penjual nasi boran. Maknanya adalah kerja keras, kesederhanaan, dan kebersamaan. Tari ini pernah mewakili Jawa Timur di parade tari tingkat nasional.',
    searchQuery: 'Tari Boran Lamongan',
    videoUrl: 'https://www.youtube.com/watch?v=B4apxUiMvpI',
  },
  {
    id: 'a2',
    name: 'Kentrung',
    category: 'Seni tutur',
    icon: 'mic',
    description:
      'Seni bercerita dengan iringan tabuhan, dibawakan monolog oleh satu dalang. Dikenal pula Kentrung Sunan Drajat sebagai kesenian bernuansa Islami di Lamongan.',
    searchQuery: 'Kentrung Lamongan',
    videoUrl: 'https://www.youtube.com/watch?v=NDJsq13KW1o',
  },
  {
    id: 'a3',
    name: 'Sandur',
    category: 'Teater rakyat',
    icon: 'drama',
    description:
      'Teater tradisional rakyat Lamongan yang masih dilestarikan, misalnya oleh grup Sandhur Jawa Bromo Budoyo di Kecamatan Modo.',
    searchQuery: 'Sandur Lamongan',
    videoUrl: 'https://www.youtube.com/watch?v=AhuwBoHA1TU',
  },
  {
    id: 'a4',
    name: 'Jedor',
    category: 'Musik religi',
    icon: 'music',
    description:
      'Kesenian Islam dari Desa Sendangagung, Paciran, yang berfungsi ganda sebagai hiburan sekaligus sarana ekspresi keagamaan.',
    searchQuery: 'Jedor Sendangagung Paciran',
    videoUrl: 'https://www.youtube.com/watch?v=EpjV0jVjG08',
  },
  {
    id: 'a5',
    name: 'Sedekah Bumi',
    category: 'Upacara adat',
    icon: 'wheat',
    description:
      'Syukuran setelah panen sebagai wujud terima kasih atas hasil bumi. Di banyak desa, acara ini diramaikan kesenian seperti kentrung.',
    searchQuery: 'Sedekah Bumi Lamongan',
    videoUrl: 'https://www.youtube.com/watch?v=cnX80OXGGvY',
  },
  {
    id: 'a6',
    name: 'Sedekah Laut dan Petik Laut',
    category: 'Upacara adat',
    icon: 'waves',
    description:
      'Tradisi nelayan pesisir seperti di Labuhan (Brondong) dan Warulor (Paciran). Rangkaiannya berupa doa bersama, membawa hasil bumi, hingga lomba rakyat seperti sunggi dulang.',
    searchQuery: 'Petik Laut Paciran Lamongan',
    image: destinationPhoto('pantai-kutang'),
    imageCaption: 'Foto pesisir Lamongan (bukan dokumentasi upacara)',
  },
  {
    id: 'a7',
    name: 'Tenun Ikat Parengan',
    category: 'Kerajinan',
    icon: 'shirt',
    description:
      'Kain tenun ikat dari Parengan yang disebut telah ada sejak masa Tumenggung Surajaya, dan menjadi kebanggaan kerajinan Lamongan.',
    searchQuery: 'Tenun Ikat Parengan Lamongan',
    videoUrl: 'https://www.youtube.com/watch?v=OBHfkZiNovo',
  },
];
