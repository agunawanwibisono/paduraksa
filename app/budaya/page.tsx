import {
  cultureTimeline,
  cultureQuiz,
  originIntro,
  originTimeline,
  originNameSteps,
  originNameStory,
  originFigures,
  originLegends,
  originValues,
  originSources,
  originVideoUrl,
  originVideoSource,
  originKidsStory,
  cultureArts,
  villageCultureArts,
} from '@/data/culture';
import { Timeline } from '@/components/budaya/Timeline';
import { MiniQuiz } from '@/components/budaya/MiniQuiz';
import { KesenianTradisi } from '@/components/budaya/KesenianTradisi';
import { WarisanBudayaDesa } from '@/components/budaya/WarisanBudayaDesa';
import { AsalUsulLamongan } from '@/components/budaya/AsalUsulLamongan';
import { Reveal } from '@/components/ui/Reveal';
import { withOriginPicture } from '@/data/culture-pictures';

export const metadata = { title: 'Budaya & Edukasi Lokal' };

export default function BudayaPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold sm:text-4xl">Budaya & Edukasi Lokal</h1>
          <p className="mt-2 text-secondary">Kenali Lamongan lewat linimasa, kesenian, tradisi, dan kuis interaktif.</p>
        </div>
      </Reveal>

      <AsalUsulLamongan
        intro={originIntro}
        timeline={originTimeline.map(withOriginPicture)}
        nameSteps={originNameSteps}
        nameStory={originNameStory}
        figures={originFigures}
        legends={originLegends.map(withOriginPicture)}
        values={originValues}
        sources={[originVideoSource, ...originSources]}
        videoUrl={originVideoUrl}
        kidsStory={originKidsStory}
      />

      <Reveal>
        <h2 className="mb-5 font-display text-xl font-semibold">Linimasa Singkat</h2>
      </Reveal>
      <Timeline entries={cultureTimeline} />

      <Reveal className="mt-14">
        <h2 className="mb-1 font-display text-xl font-semibold">Kesenian dan Tradisi</h2>
        <p className="mb-5 text-sm text-secondary">Tari, seni tutur, upacara adat, dan kerajinan yang hidup di masyarakat Lamongan.</p>
      </Reveal>
      <KesenianTradisi arts={cultureArts} />

      <WarisanBudayaDesa arts={villageCultureArts} />

      <Reveal className="mt-14">
        <h2 className="mb-5 font-display text-xl font-semibold">Uji Pengetahuanmu</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <MiniQuiz questions={cultureQuiz} />
      </Reveal>
    </div>
  );
}
