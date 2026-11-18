import Image from 'next/image';

export function Footer() {
  return (
    <footer className="mt-24 border-t border-subtle bg-surface pb-24 pt-10 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center">
            <Image
              src="/brand/logo-small.png"
              alt="Logo Gelar Karya Si Lele Bahagia"
              width={160}
              height={182}
              loading="lazy"
              className="h-20 w-auto"
            />
            <div>
              <p className="font-display text-base font-bold">Gelar Karya Si Lele Bahagia</p>
              <p className="text-sm font-medium text-terracotta-600 dark:text-terracotta-300">
                Media Belajar Anak PAUD Lamongan
              </p>
              <p className="mt-1 max-w-sm text-xs text-secondary">
                SILELE: Sarana Inovasi Literasi, Eksplorasi, dan Lingkungan Edukasi Bahagia
              </p>
            </div>
          </div>
          <div className="space-y-1 text-sm text-secondary md:text-right">
            <p>© {new Date().getFullYear()} Gelar Karya Si Lele Bahagia.</p>
            <p>Dibuat untuk anak PAUD, orang tua, dan guru.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
