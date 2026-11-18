import { Hero } from '@/components/home/Hero';
import { VideoSection } from '@/components/home/VideoSection';
import { StatsCounter } from '@/components/home/StatsCounter';
import { HighlightWisata } from '@/components/home/HighlightWisata';
import { HighlightMakanan } from '@/components/home/HighlightMakanan';
import { GamePreview } from '@/components/home/GamePreview';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsCounter />
      <VideoSection />
      <HighlightWisata />
      <HighlightMakanan />
      <GamePreview />
    </>
  );
}
