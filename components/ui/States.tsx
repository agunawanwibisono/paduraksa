import { cn } from '@/lib/utils';
import { SearchX, AlertTriangle } from 'lucide-react';

export function EmptyState({
  title = 'Belum ada data',
  description = 'Coba ubah filter atau kata kunci pencarian Anda.',
  className,
}: {
  title?: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <SearchX className="h-10 w-10 text-secondary" aria-hidden />
      <p className="font-display font-semibold">{title}</p>
      <p className="max-w-xs text-sm text-secondary">{description}</p>
    </div>
  );
}

export function ErrorState({
  title = 'Terjadi kesalahan',
  description = 'Gagal memuat data. Silakan coba lagi.',
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3 py-16 text-center', className)}>
      <AlertTriangle className="h-10 w-10 text-terracotta-500" aria-hidden />
      <p className="font-display font-semibold">{title}</p>
      <p className="max-w-xs text-sm text-secondary">{description}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-lg bg-lamongan-600 px-4 py-2 text-sm font-medium text-white hover:bg-lamongan-700"
        >
          Coba lagi
        </button>
      )}
    </div>
  );
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-lg bg-black/5 dark:bg-white/10', className)} />;
}

export function CardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl2 border border-subtle bg-surface">
      <Skeleton className="h-40 w-full rounded-none" />
      <div className="space-y-2 p-5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}
