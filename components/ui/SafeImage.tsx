'use client';

import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Foto asli dengan cadangan bila gagal dimuat (tautan mati atau offline). */
export function SafeImage({
  src,
  alt,
  className,
  fallbackLabel,
}: {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('flex flex-col items-center justify-center gap-1 bg-lamongan-100 text-lamongan-700 dark:bg-lamongan-900/40 dark:text-lamongan-200', className)}
      >
        <ImageOff className="h-6 w-6 opacity-60" aria-hidden />
        {fallbackLabel && <span className="px-2 text-center text-[11px] font-medium">{fallbackLabel}</span>}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
