'use client';

type Anchor = { href: string; label: string };

/**
 * Navigasi antar-bagian halaman. Menggulir tanpa menambah riwayat browser,
 * supaya tombol Kembali di HP tetap keluar dari halaman Budaya.
 */
export function AnchorNav({ anchors, label }: { anchors: Anchor[]; label: string }) {
  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const el = document.getElementById(href.slice(1));
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav aria-label={label} className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1">
      {anchors.map((a) => (
        <a
          key={a.href}
          href={a.href}
          onClick={(e) => go(e, a.href)}
          className="shrink-0 rounded-full border border-subtle px-3.5 py-1.5 text-xs font-medium text-secondary transition-colors hover:border-lamongan-600 hover:text-lamongan-700 dark:hover:text-lamongan-300"
        >
          {a.label}
        </a>
      ))}
    </nav>
  );
}
