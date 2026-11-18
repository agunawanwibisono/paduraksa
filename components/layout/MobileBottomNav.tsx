'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Compass, MapPinned, Gamepad2, UtensilsCrossed, Landmark } from 'lucide-react';
import { cn } from '@/lib/utils';

const MOBILE_LINKS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/eksplorasi', label: 'Eksplorasi', icon: Compass },
  { href: '/wisata', label: 'Wisata', icon: MapPinned },
  { href: '/makanan', label: 'Makanan', icon: UtensilsCrossed },
  { href: '/budaya', label: 'Budaya', icon: Landmark },
  { href: '/game', label: 'Game', icon: Gamepad2 },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-subtle bg-surface/95 backdrop-blur-md md:hidden"
      aria-label="Navigasi utama"
    >
      <ul className="flex items-stretch justify-between px-0.5 pb-[env(safe-area-inset-bottom)]">
        {MOBILE_LINKS.map((link) => {
          const isActive = link.href === '/' ? pathname === '/' : pathname === link.href || pathname.startsWith(`${link.href}/`);
          const Icon = link.icon;
          return (
            <li key={link.href} className="min-w-0 flex-1">
              <Link
                href={link.href}
                className="relative flex flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium text-secondary"
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-nav-active"
                    className="absolute top-0 h-0.5 w-8 rounded-full bg-lamongan-600"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn('h-5 w-5', isActive && 'text-lamongan-600 dark:text-lamongan-300')} aria-hidden />
                <span className={cn(isActive && 'text-lamongan-700 dark:text-lamongan-200')}>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}