import type { CultureEntry } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { CulturePictureView } from '@/components/budaya/CulturePictureView';

export function Timeline({ entries }: { entries: CultureEntry[] }) {
  return (
    <div className="relative border-l-2 border-subtle pl-6">
      {entries.map((entry, i) => (
        <Reveal key={entry.id} delay={i * 0.1} className="relative mb-8 last:mb-0">
          <span className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border-2 border-surface bg-lamongan-600" aria-hidden />
          <div className="overflow-hidden rounded-xl2 border border-subtle bg-surface shadow-soft dark:shadow-soft-dark">
            {entry.picture && <CulturePictureView picture={entry.picture} className="h-36 w-full sm:h-44" showCaption />}
            <div className="p-5">
            {entry.year && (
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <Badge tone="lamongan">{entry.year}</Badge>
              </div>
            )}
            <h3 className="font-display font-semibold">{entry.title}</h3>
            <p className="mt-1 text-sm text-secondary">{entry.summary}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
