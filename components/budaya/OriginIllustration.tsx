/**
 * Ilustrasi orisinal (SVG) perjalanan perahu di Kali Lamong.
 * Warna mengikuti palet website (lamongan, terracotta, leaf, sunny) dan
 * otomatis menyesuaikan mode gelap.
 */
export function OriginIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-label="Ilustrasi perahu menyusuri sungai pada pagi hari dengan sawah dan pepohonan di tepinya"
      className={className}
    >
      <rect width="640" height="260" className="fill-sunny-300/40 dark:fill-lamongan-900" />
      <circle cx="470" cy="104" r="46" className="fill-sunny-400 dark:fill-sunny-500/70" />
      <circle cx="470" cy="104" r="64" className="fill-sunny-300/40 dark:fill-sunny-500/10" />

      {/* perbukitan jauh */}
      <path d="M0 150 Q90 96 190 144 T380 138 T640 142 V190 H0 Z" className="fill-leaf-200 dark:fill-leaf-900" />
      <path d="M0 168 Q120 130 240 166 T470 162 T640 168 V200 H0 Z" className="fill-leaf-300 dark:fill-leaf-800" />

      {/* pepohonan tepi sungai */}
      <g className="fill-leaf-600 dark:fill-leaf-700">
        <rect x="68" y="150" width="6" height="30" className="fill-terracotta-700" />
        <circle cx="71" cy="142" r="20" />
        <circle cx="54" cy="152" r="14" />
        <circle cx="88" cy="152" r="14" />
        <rect x="566" y="152" width="6" height="28" className="fill-terracotta-700" />
        <circle cx="569" cy="144" r="18" />
        <circle cx="553" cy="153" r="12" />
        <circle cx="585" cy="153" r="12" />
      </g>

      {/* sungai */}
      <path d="M0 190 C120 176 220 206 340 194 S560 178 640 192 V260 H0 Z" className="fill-lamongan-400 dark:fill-lamongan-700" />
      <path d="M0 214 C140 202 240 228 360 216 S560 204 640 216 V260 H0 Z" className="fill-lamongan-500 dark:fill-lamongan-800" />
      <g className="stroke-white/70 dark:stroke-lamongan-300/50" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M70 206 q12 -6 24 0 t24 0" />
        <path d="M430 222 q12 -6 24 0 t24 0" />
        <path d="M180 236 q12 -6 24 0 t24 0" />
      </g>

      {/* perahu dan layar */}
      <g transform="translate(250 150)">
        <path d="M0 52 L138 52 L118 76 L22 76 Z" className="fill-terracotta-600" />
        <rect x="64" y="0" width="4" height="54" className="fill-lamongan-900 dark:fill-lamongan-100" />
        <path d="M70 4 L70 46 L116 46 Z" className="fill-white dark:fill-lamongan-100" />
        <path d="M62 10 L62 46 L28 46 Z" className="fill-sunny-400" />
        <path d="M-10 84 q14 -7 28 0 t28 0 t28 0 t28 0 t28 0 t28 0" className="stroke-white/80 dark:stroke-lamongan-300/60" strokeWidth="3" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
