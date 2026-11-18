import type { CulturePicture } from '@/lib/types';
import { SafeImage } from '@/components/ui/SafeImage';
import { Scene } from '@/components/budaya/Scene';

export function CulturePictureView({ picture, className, showCaption = false }: { picture: CulturePicture; className?: string; showCaption?: boolean }) {
  if (picture.kind === 'scene') return <Scene scene={picture.scene} className={className} />;
  return (
    <figure>
      <SafeImage src={picture.src} alt={picture.caption} className={className ? `${className} object-cover` : 'w-full object-cover'} />
      {showCaption && <figcaption className="px-1 pt-1.5 text-[11px] text-secondary">{picture.caption}</figcaption>}
    </figure>
  );
}
