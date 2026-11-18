import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeTone = 'default' | 'lamongan' | 'terracotta' | 'warning';

const toneStyles: Record<BadgeTone, string> = {
  default: 'bg-black/5 dark:bg-white/10 text-secondary',
  lamongan: 'bg-lamongan-100 text-lamongan-800 dark:bg-lamongan-900/40 dark:text-lamongan-200',
  terracotta:
    'bg-terracotta-100 text-terracotta-800 dark:bg-terracotta-900/40 dark:text-terracotta-200',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200',
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ className, tone = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        toneStyles[tone],
        className
      )}
      {...props}
    />
  );
}
