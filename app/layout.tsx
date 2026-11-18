import type { Metadata, Viewport } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { AppChrome } from '@/components/layout/AppChrome';
import { AudioProvider } from '@/lib/audio/AudioProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const SITE_NAME = 'Gelar Karya Si Lele Bahagia';
const TAGLINE = 'Media Belajar Anak PAUD Lamongan';
const DESCRIPTION =
  'Gelar Karya Si Lele Bahagia (SILELE: Sarana Inovasi Literasi, Eksplorasi, dan Lingkungan Edukasi Bahagia) — media belajar anak PAUD Lamongan. Kenalkan wisata, kuliner, dan budaya Lamongan lewat cerita, kartu eksplorasi, dan game edukasi bersama maskot Si Lele.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: '/brand/favicon.ico', sizes: 'any' },
      { url: '/brand/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: '/brand/og-image.png',
        width: 1200,
        height: 630,
        alt: `Logo ${SITE_NAME}: maskot ikan lele penjelajah membawa buku dan teropong`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${TAGLINE}`,
    description: DESCRIPTION,
    images: ['/brand/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#287491',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${poppins.variable} ${inter.variable} font-body antialiased`}>
        {/* Script inline: terapkan tema tersimpan sebelum React hydrate, mencegah flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const stored = localStorage.getItem('gelar-karya-si-lele-theme');
                const theme = stored ? JSON.parse(stored).state.theme : 'light';
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            `,
          }}
        />
        <AudioProvider>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-lamongan-600 focus:px-4 focus:py-2 focus:text-white"
        >
          Lewati ke konten utama
        </a>
        <AppChrome>{children}</AppChrome>
        </AudioProvider>
      </body>
    </html>
  );
}
