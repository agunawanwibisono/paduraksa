'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useThemeStore } from '@/lib/store/useThemeStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Hindari hydration mismatch: baru render setelah client mount
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme, mounted]);

  if (!mounted) {
    return <div className="h-9 w-16 rounded-full bg-black/5 dark:bg-white/10" />;
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      aria-pressed={isDark}
      className="relative flex h-9 w-16 items-center rounded-full bg-lamongan-100 px-1 transition-colors dark:bg-lamongan-900"
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md dark:bg-lamongan-700"
        style={{ marginLeft: isDark ? 'calc(100% - 1.75rem)' : 0 }}
      >
        {isDark ? (
          <Moon className="h-4 w-4 text-lamongan-200" />
        ) : (
          <Sun className="h-4 w-4 text-terracotta-500" />
        )}
      </motion.div>
    </button>
  );
}
