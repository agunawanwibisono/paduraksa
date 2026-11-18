'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { ThemeToggle } from './ThemeToggle';
import { AudioControls } from './AudioControls';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Beranda' },
  { href: '/eksplorasi', label: 'Eksplorasi' },
  { href: '/wisata', label: 'Wisata' },
  { href: '/makanan', label: 'Makanan' },
  { href: '/budaya', label: 'Budaya' },
  { href: '/game', label: 'Game' },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function onLogout() {
    try {
      await createSupabaseBrowserClient().auth.signOut();
    } finally {
      document.cookie = 'silele_session=; path=/; max-age=0';
      router.push('/login');
      router.refresh();
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-subtle bg-surface/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5 font-display text-lg font-bold" aria-label="Gelar Karya Si Lele Bahagia — Beranda">
          <Image
            src="/brand/logo-small.png"
            alt="Logo Gelar Karya Si Lele Bahagia"
            width={160}
            height={182}
            priority
            className="h-12 w-auto"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span>Gelar Karya Si Lele Bahagia</span>
            <span className="text-[11px] font-medium text-secondary">Media Belajar Anak PAUD Lamongan</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href} className="relative">
                <Link
                  href={link.href}
                  className={cn(
                    'relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                    isActive ? 'text-lamongan-700 dark:text-lamongan-200' : 'text-secondary hover:text-current'
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-lamongan-100 dark:bg-lamongan-900/50"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <AudioControls />
          <ThemeToggle />
          <button
            type="button"
            onClick={onLogout}
            aria-label="Keluar"
            className="flex h-10 items-center justify-center gap-1.5 rounded-full bg-lamongan-600 px-3 text-sm font-medium text-white transition-colors hover:bg-lamongan-700 sm:px-4"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
