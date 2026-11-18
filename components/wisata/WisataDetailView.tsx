'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Lightbulb } from 'lucide-react';
import type { Destination } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { YouTubeVideo } from '@/components/ui/YouTubeVideo';

export function WisataDetailView({ destination }: { destination: Destination }) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/wisata"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-current"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Wisata
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Galeri gambar */}
        <div className="mb-6 overflow-hidden rounded-xl2 border border-subtle">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative h-64 w-full bg-gradient-to-br from-lamongan-200 to-lamongan-400 dark:from-lamongan-800 dark:to-lamongan-950 sm:h-80"
          >
            {destination.images[activeImage] && (
              <img
                src={destination.images[activeImage]}
                alt={`Foto ${destination.name} ${activeImage + 1}`}
                className="h-full w-full object-cover"
              />
            )}
          </motion.div>
          {destination.images.length > 1 && (
            <div className="flex gap-2 bg-surface p-3">
              {destination.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  aria-label={`Lihat gambar ${i + 1}`}
                  className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-opacity ${activeImage === i ? 'border-lamongan-600 opacity-100' : 'border-transparent opacity-60'}`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${destination.name} ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge tone="lamongan">{destination.category}</Badge>
          <span className="flex items-center gap-1 text-sm text-amber-500">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden />
            {destination.popularity.toFixed(1)}
          </span>
        </div>

        <h1 className="font-display text-3xl font-bold sm:text-4xl">{destination.name}</h1>
        <p className="mt-2 flex items-center gap-1.5 text-secondary">
          <MapPin className="h-4 w-4" aria-hidden /> {destination.location}
        </p>

        <p className="mt-6 leading-relaxed text-secondary">{destination.longDescription}</p>

        <YouTubeVideo url={destination.videoUrl} title={destination.name} />

        {destination.funFacts.length > 0 && (
          <div className="mt-8 rounded-xl2 border border-subtle bg-lamongan-50/60 p-5 dark:bg-lamongan-950/30">
            <h2 className="mb-3 flex items-center gap-2 font-display font-semibold">
              <Lightbulb className="h-5 w-5 text-lamongan-600 dark:text-lamongan-300" aria-hidden />
              Hal Menarik & Fakta Unik
            </h2>
            <ul className="space-y-2 text-sm text-secondary">
              {destination.funFacts.map((fact, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-lamongan-500">•</span> {fact}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  );
}
