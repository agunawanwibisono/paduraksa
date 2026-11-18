import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Palet diambil dari logo "Gelar Karya Si Lele".
        // Nama kunci `lamongan` & `terracotta` sengaja dipertahankan agar seluruh class
        // yang sudah dipakai di komponen tetap bekerja; nilainya kini mengikuti logo:
        //   lamongan   -> biru logo (#287491, biru tua #124259)
        //   terracotta -> oranye logo (#d96217, #e58d2b)
        lamongan: {
          50: '#eff7fb',
          100: '#d8ebf4',
          200: '#b3d8e8',
          300: '#82bcd6',
          400: '#4f9ac0',
          500: '#3386ab',
          600: '#287491',
          700: '#1f5d76',
          800: '#184a5f',
          900: '#124259',
          950: '#0a2635',
        },
        terracotta: {
          50: '#fff6ec',
          100: '#ffe8cf',
          200: '#f8d19b',
          300: '#f0b458',
          400: '#e58d2b',
          500: '#d96217',
          600: '#b84e11',
          700: '#933e11',
          800: '#773315',
          900: '#622c14',
        },
        // Aksen tambahan dari logo: hijau daun & kuning bintang.
        leaf: {
          50: '#f4f9ec',
          100: '#e5f1d2',
          200: '#cde5a8',
          300: '#a9ce6d',
          400: '#8fb955',
          500: '#77a23d',
          600: '#5d8330',
          700: '#495e26',
          800: '#3a4b22',
          900: '#323f20',
        },
        sunny: {
          300: '#f7cd7e',
          400: '#f0b458',
          500: '#f9b327',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 30px -12px rgba(18, 66, 89, 0.25)',
        'soft-dark': '0 8px 30px -12px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
