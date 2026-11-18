import type { SceneName } from '@/lib/types';
import { cn } from '@/lib/utils';

const LABELS: Record<SceneName, string> = {
  tomb: 'Gambar makam dengan bunga',
  scroll: 'Gambar gulungan kertas kuno',
  heart: 'Gambar hati besar',
  river: 'Gambar perahu di sungai',
  drum: 'Gambar gendang dan nada musik',
  cloth: 'Gambar kain tenun bermotif',
  rain: 'Gambar awan dan hujan',
  book: 'Gambar buku terbuka',
  palace: 'Gambar pendapa tempat adipati',
  calendar: 'Gambar kalender tanggal 26 Mei',
  fish: 'Gambar ikan lele',
  mountain: 'Gambar gunung dan matahari',
};

function Art({ scene }: { scene: SceneName }) {
  switch (scene) {
    case 'tomb':
      return (
        <>
          <path d="M0 130 Q80 100 160 126 T320 120 V180 H0 Z" fill="#a9ce6d" />
          <ellipse cx="160" cy="132" rx="64" ry="14" fill="#cbb89d" />
          <path d="M142 132 V84 Q160 62 178 84 V132 Z" fill="#8a999f" />
          <path d="M150 128 V90 Q160 76 170 90 V128 Z" fill="#a9b6bb" />
          <circle cx="90" cy="134" r="7" fill="#f9b327" /><rect x="88" y="138" width="4" height="14" fill="#5d8330" />
          <circle cx="232" cy="136" r="7" fill="#d96217" /><rect x="230" y="140" width="4" height="14" fill="#5d8330" />
        </>
      );
    case 'scroll':
      return (
        <>
          <rect x="70" y="40" width="180" height="100" rx="6" fill="#f6e7c1" />
          <rect x="60" y="34" width="14" height="112" rx="7" fill="#e0c48a" />
          <rect x="246" y="34" width="14" height="112" rx="7" fill="#e0c48a" />
          <g stroke="#b84e11" strokeWidth="4" strokeLinecap="round">
            <path d="M92 66 H228" /><path d="M92 86 H210" /><path d="M92 106 H220" />
          </g>
          <circle cx="222" cy="124" r="9" fill="#d96217" />
        </>
      );
    case 'heart':
      return (
        <>
          <path d="M160 142 C80 92 96 38 140 48 C152 51 158 58 160 64 C162 58 168 51 180 48 C224 38 240 92 160 142 Z" fill="#d96217" />
          <path d="M120 66 q8 -10 20 -6" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity=".7" />
          <g fill="#f9b327"><circle cx="70" cy="50" r="6" /><circle cx="258" cy="70" r="5" /><circle cx="244" cy="30" r="4" /><circle cx="86" cy="116" r="4" /></g>
        </>
      );
    case 'river':
      return (
        <>
          <circle cx="250" cy="52" r="24" fill="#f9b327" />
          <path d="M0 96 Q80 70 160 92 T320 88 V120 H0 Z" fill="#a9ce6d" />
          <path d="M0 116 C80 104 160 130 240 118 S300 110 320 116 V180 H0 Z" fill="#4f9ac0" />
          <path d="M0 144 C80 134 160 156 240 146 S300 140 320 144 V180 H0 Z" fill="#3386ab" />
          <path d="M96 108 L200 108 L184 130 L112 130 Z" fill="#d96217" />
          <rect x="146" y="64" width="4" height="46" fill="#124259" />
          <path d="M150 68 L150 104 L186 104 Z" fill="#fff" />
          <path d="M146 72 L146 104 L116 104 Z" fill="#f9b327" />
        </>
      );
    case 'drum':
      return (
        <>
          <path d="M104 80 H216 L206 144 Q160 158 114 144 Z" fill="#933e11" />
          <ellipse cx="160" cy="80" rx="56" ry="14" fill="#f0b458" />
          <ellipse cx="160" cy="80" rx="44" ry="9" fill="#f8d19b" />
          <g stroke="#f0b458" strokeWidth="3"><path d="M120 92 L134 142" /><path d="M160 94 V150" /><path d="M200 92 L186 142" /></g>
          <g stroke="#622c14" strokeWidth="5" strokeLinecap="round"><path d="M96 40 L140 72" /><path d="M224 40 L180 72" /></g>
          <g fill="#287491"><circle cx="58" cy="54" r="7" /><rect x="63" y="28" width="3" height="26" /><circle cx="270" cy="96" r="7" /><rect x="275" y="70" width="3" height="26" /></g>
        </>
      );
    case 'cloth':
      return (
        <>
          <rect x="60" y="34" width="200" height="104" fill="#d96217" />
          <g fill="#f9b327">
            {[0, 1, 2, 3].map((i) => (
              <path key={i} d={`M${92 + i * 44} 86 l16 -16 l16 16 l-16 16 Z`} />
            ))}
          </g>
          <rect x="60" y="48" width="200" height="8" fill="#124259" />
          <rect x="60" y="116" width="200" height="8" fill="#124259" />
          <g stroke="#933e11" strokeWidth="3" strokeLinecap="round">
            {Array.from({ length: 10 }).map((_, i) => (
              <path key={i} d={`M${68 + i * 20} 138 v16`} />
            ))}
          </g>
        </>
      );
    case 'rain':
      return (
        <>
          <g fill="#b3d8e8"><circle cx="120" cy="70" r="28" /><circle cx="158" cy="56" r="34" /><circle cx="200" cy="72" r="26" /><rect x="100" y="70" width="120" height="28" rx="14" /></g>
          <g stroke="#3386ab" strokeWidth="5" strokeLinecap="round">
            <path d="M120 112 l-6 18" /><path d="M150 112 l-6 18" /><path d="M180 112 l-6 18" /><path d="M210 112 l-6 18" />
            <path d="M135 138 l-6 18" /><path d="M165 138 l-6 18" /><path d="M195 138 l-6 18" />
          </g>
        </>
      );
    case 'book':
      return (
        <>
          <path d="M160 52 Q110 36 60 48 V136 Q110 124 160 140 Z" fill="#fff" stroke="#287491" strokeWidth="5" strokeLinejoin="round" />
          <path d="M160 52 Q210 36 260 48 V136 Q210 124 160 140 Z" fill="#fff" stroke="#287491" strokeWidth="5" strokeLinejoin="round" />
          <g stroke="#b3d8e8" strokeWidth="4" strokeLinecap="round"><path d="M80 68 H138" /><path d="M80 86 H138" /><path d="M182 68 H240" /><path d="M182 86 H240" /></g>
          <path d="M214 108 l5 11 12 1 -9 8 3 12 -11 -6 -11 6 3 -12 -9 -8 12 -1 Z" fill="#f9b327" />
        </>
      );
    case 'palace':
      return (
        <>
          <path d="M40 80 L160 30 L280 80 Z" fill="#b84e11" />
          <rect x="60" y="80" width="200" height="12" fill="#933e11" />
          <g fill="#f8d19b"><rect x="76" y="92" width="14" height="52" /><rect x="153" y="92" width="14" height="52" /><rect x="230" y="92" width="14" height="52" /></g>
          <rect x="50" y="144" width="220" height="14" fill="#cbb89d" /><rect x="40" y="158" width="240" height="12" fill="#b9a384" />
          <rect x="158" y="14" width="3" height="18" fill="#124259" /><path d="M161 14 h22 l-6 6 6 6 h-22 Z" fill="#d96217" />
        </>
      );
    case 'calendar':
      return (
        <>
          <rect x="84" y="30" width="152" height="124" rx="12" fill="#fff" stroke="#287491" strokeWidth="5" />
          <path d="M84 42 Q84 30 96 30 H224 Q236 30 236 42 V70 H84 Z" fill="#d96217" />
          <rect x="112" y="18" width="10" height="26" rx="5" fill="#124259" /><rect x="198" y="18" width="10" height="26" rx="5" fill="#124259" />
          <text x="160" y="58" textAnchor="middle" fontSize="20" fontWeight="700" fill="#fff" fontFamily="sans-serif">MEI</text>
          <text x="160" y="126" textAnchor="middle" fontSize="52" fontWeight="800" fill="#124259" fontFamily="sans-serif">26</text>
        </>
      );
    case 'fish':
      return (
        <>
          <path d="M0 140 q20 -10 40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 t40 0 V180 H0 Z" fill="#4f9ac0" />
          <ellipse cx="150" cy="88" rx="70" ry="30" fill="#4d5b63" />
          <path d="M214 88 L268 56 V120 Z" fill="#6b7a82" />
          <path d="M120 60 Q150 40 176 62 Z" fill="#6b7a82" />
          <circle cx="110" cy="80" r="6" fill="#fff" /><circle cx="108" cy="80" r="3" fill="#124259" />
          <g stroke="#4d5b63" strokeWidth="3" strokeLinecap="round" fill="none"><path d="M86 94 q-22 4 -30 -10" /><path d="M86 100 q-22 12 -34 4" /></g>
        </>
      );
    case 'mountain':
      return (
        <>
          <circle cx="250" cy="50" r="24" fill="#f9b327" />
          <path d="M20 150 L110 50 L190 150 Z" fill="#6b7a82" />
          <path d="M130 150 L210 74 L300 150 Z" fill="#8a999f" />
          <path d="M110 50 L132 76 L116 72 L106 84 L92 70 Z" fill="#fff" />
          <path d="M0 140 Q80 124 160 142 T320 138 V180 H0 Z" fill="#a9ce6d" />
        </>
      );
  }
}

/** Ilustrasi sederhana bergaya anak-anak. Warna tetap, latar mengikuti mode gelap. */
export function Scene({ scene, className }: { scene: SceneName; className?: string }) {
  return (
    <svg viewBox="0 0 320 180" role="img" aria-label={LABELS[scene]} className={cn('block w-full', className)} preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill="#fff3dc" className="dark:fill-lamongan-900" />
      <Art scene={scene} />
    </svg>
  );
}
