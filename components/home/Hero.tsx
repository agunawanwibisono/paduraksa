'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-lamongan-50 to-transparent dark:from-lamongan-950/40">
      {/* Dekorasi blob background — dekoratif saja, tidak mengganggu konten */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-lamongan-200/40 blur-3xl dark:bg-lamongan-800/20" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-terracotta-200/40 blur-3xl dark:bg-terracotta-900/20" aria-hidden />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8"
      >
        <motion.span
          variants={item}
          className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-lamongan-100 px-3.5 py-1.5 text-xs font-semibold text-lamongan-700 dark:bg-lamongan-900/50 dark:text-lamongan-200"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden />
          Media Belajar Anak PAUD Lamongan
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
        >
          Gelar Karya{' '}
          <span className="bg-gradient-to-r from-terracotta-500 via-sunny-400 to-lamongan-600 bg-clip-text text-transparent">
            Si Lele Bahagia
          </span>
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-5 max-w-2xl text-base text-secondary sm:text-lg">
          Belajar sambil bermain bersama Si Lele: kenali wisata, kuliner khas, dan budaya Lamongan secara
          interaktif — uji pengetahuanmu lewat game edukasi.
        </motion.p>

        <motion.p variants={item} className="mx-auto mt-3 max-w-2xl text-xs font-medium text-lamongan-700 dark:text-lamongan-200 sm:text-sm">
          SILELE: Sarana Inovasi Literasi, Eksplorasi, dan Lingkungan Edukasi Bahagia
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/eksplorasi">
            <Button size="lg">
              Mulai Jelajah <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Link>
          <Link href="/game">
            <Button size="lg" variant="outline">
              Coba Game Edukasi
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
