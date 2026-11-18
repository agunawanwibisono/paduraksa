import {
  Heart,
  Users,
  Landmark,
  Wheat,
  Waves,
  Music,
  Shirt,
  ScrollText,
  Crown,
  ChevronRight,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import type { CultureEntry, SceneName, OriginFigure, OriginSource, OriginTimelineEntry, OriginValue } from '@/lib/types';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Badge';
import { Card, CardBody } from '@/components/ui/Card';
import { Timeline } from '@/components/budaya/Timeline';
import { AnchorNav } from '@/components/budaya/AnchorNav';
import { FactAccordion } from '@/components/budaya/FactAccordion';
import { OriginIllustration } from '@/components/budaya/OriginIllustration';
import { YouTubeVideo } from '@/components/ui/YouTubeVideo';
import { SafeImage } from '@/components/ui/SafeImage';
import { Scene } from '@/components/budaya/Scene';
import { Sparkles } from 'lucide-react';

const valueIcons = {
  heart: Heart,
  users: Users,
  landmark: Landmark,
  wheat: Wheat,
  waves: Waves,
  music: Music,
  shirt: Shirt,
} as const;

interface Props {
  intro: string;
  timeline: OriginTimelineEntry[];
  nameSteps: string[];
  nameStory: string[];
  figures: OriginFigure[];
  legends: CultureEntry[];
  values: OriginValue[];
  sources: OriginSource[];
  videoUrl?: string;
  kidsStory?: { id: string; text: string; scene: SceneName }[];
}

const anchors = [
  { href: '#cerita-anak', label: 'Cerita Anak' },
  { href: '#sejarah', label: 'Sejarah' },
  { href: '#nama', label: 'Asal Nama' },
  { href: '#tokoh', label: 'Tokoh' },
  { href: '#legenda', label: 'Legenda' },
  { href: '#nilai', label: 'Nilai & Tradisi' },
];

function SubHeading({ id, children, note }: { id: string; children: React.ReactNode; note?: string }) {
  return (
    <Reveal className="mb-5 mt-12 scroll-mt-24" >
      <h3 id={id} className="scroll-mt-24 font-display text-lg font-semibold sm:text-xl">
        {children}
      </h3>
      {note && <p className="mt-1 text-sm text-secondary">{note}</p>}
    </Reveal>
  );
}

export function AsalUsulLamongan({ intro, timeline, nameSteps, nameStory, figures, legends, values, sources, videoUrl, kidsStory }: Props) {
  return (
    <section id="asal-usul" aria-labelledby="asal-usul-title" className="mb-16 scroll-mt-24">
      <Reveal>
        <Card>
          <OriginIllustration className="h-auto w-full" />
          <CardBody className="sm:p-7">
            <Badge tone="terracotta" className="mb-3">
              <ScrollText className="h-3.5 w-3.5" aria-hidden /> Sejarah & Budaya
            </Badge>
            <h2 id="asal-usul-title" className="font-display text-2xl font-bold sm:text-3xl">
              Asal-Usul Lamongan
            </h2>
            <p className="mt-2 text-secondary">{intro}</p>
            <AnchorNav anchors={anchors} label="Bagian Asal-Usul Lamongan" />
          </CardBody>
        </Card>
      </Reveal>

      {kidsStory && kidsStory.length > 0 && (
        <>
          <SubHeading id="cerita-anak" note="Kisah singkat dengan kalimat pendek, cocok dibacakan guru atau orang tua untuk anak PAUD.">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-sunny-500" aria-hidden /> Cerita Singkat untuk Anak PAUD
            </span>
          </SubHeading>
          <div className="grid gap-4 sm:grid-cols-2" role="list" aria-label="Cerita singkat untuk anak PAUD">
            {kidsStory.map((k, i) => (
              <Reveal key={k.id} delay={(i % 2) * 0.08}>
                <div className="h-full" role="listitem">
                  <Card className="h-full">
                    <Scene scene={k.scene} className="h-40 w-full" />
                    <CardBody className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-500 font-display text-sm font-bold text-white" aria-hidden>
                        {i + 1}
                      </span>
                      <p className="text-base font-medium leading-relaxed">{k.text}</p>
                    </CardBody>
                  </Card>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}

      {videoUrl && (
        <Reveal>
          <YouTubeVideo url={videoUrl} title="Asal-Usul Lamongan" />
        </Reveal>
      )}

      {/* Sejarah */}
      <SubHeading id="sejarah" note="Perjalanan dari seorang santri hingga berdirinya Kadipaten Lamongan.">
        Sejarah Terbentuknya Lamongan
      </SubHeading>
      <Timeline entries={timeline.map((t) => ({ id: t.id, year: t.year, title: t.title, summary: `${t.summary} ${t.detail}`, detail: t.detail, picture: t.picture }))} />

      {/* Asal nama */}
      <SubHeading id="nama" note="Dari nama seorang tokoh yang dicintai rakyatnya.">
        Asal-Usul Nama Lamongan
      </SubHeading>
      <Reveal>
        <Card>
          <CardBody className="sm:p-6">
            <ol className="mb-5 flex flex-wrap items-center gap-2" aria-label="Rangkaian asal nama">
              {nameSteps.map((step, i) => (
                <li key={step} className="flex items-center gap-2">
                  <span
                    className={
                      i === nameSteps.length - 1
                        ? 'rounded-full bg-lamongan-600 px-3.5 py-1.5 font-display text-sm font-semibold text-white'
                        : 'rounded-full bg-lamongan-100 px-3.5 py-1.5 font-display text-sm font-medium text-lamongan-800 dark:bg-lamongan-900/40 dark:text-lamongan-200'
                    }
                  >
                    {step}
                  </span>
                  {i < nameSteps.length - 1 && <ChevronRight className="h-4 w-4 text-secondary" aria-hidden />}
                </li>
              ))}
            </ol>
            <div className="space-y-3 text-sm leading-relaxed text-secondary sm:text-base">
              {nameStory.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </CardBody>
        </Card>
      </Reveal>

      {/* Tokoh */}
      <SubHeading id="tokoh" note="Sosok-sosok yang jejaknya masih dikenang hingga kini.">
        Tokoh Sejarah Lamongan
      </SubHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {figures.map((f, i) => (
          <Reveal key={f.id} delay={(i % 2) * 0.08}>
            <Card className="h-full">
              {f.image && (
                <figure>
                  <SafeImage src={f.image} alt={f.imageCaption ?? f.name} className="h-40 w-full object-cover" />
                  {f.imageCaption && <figcaption className="px-5 pt-2 text-[11px] text-secondary">{f.imageCaption}</figcaption>}
                </figure>
              )}
              <CardBody>
                <div className="mb-2 flex items-center gap-2 text-lamongan-600 dark:text-lamongan-300">
                  <Crown className="h-4 w-4" aria-hidden />
                  <span className="text-xs font-medium">{f.role}</span>
                </div>
                <h4 className="font-display font-semibold">{f.name}</h4>
                <p className="mt-1.5 text-sm text-secondary">{f.description}</p>
              </CardBody>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Legenda */}
      <SubHeading id="legenda" note="Cerita tutur yang hidup di tengah masyarakat, bukan catatan sejarah yang terbukti.">
        Cerita Rakyat dan Legenda
      </SubHeading>
      <Reveal delay={0.05}>
        <FactAccordion facts={legends} />
      </Reveal>

      {/* Nilai & tradisi */}
      <SubHeading id="nilai" note="Warisan nilai yang masih dirawat dari desa hingga pesisir.">
        Nilai Budaya dan Tradisi
      </SubHeading>
      <div className="grid gap-4 sm:grid-cols-2">
        {values.map((v, i) => {
          const Icon = valueIcons[v.icon];
          return (
            <Reveal key={v.id} delay={(i % 2) * 0.08}>
              <Card className="h-full">
                {v.image && (
                  <figure>
                    <SafeImage src={v.image} alt={v.imageCaption ?? v.title} className="h-36 w-full object-cover" />
                    {v.imageCaption && <figcaption className="px-5 pt-2 text-[11px] text-secondary">{v.imageCaption}</figcaption>}
                  </figure>
                )}
                <CardBody>
                  {!v.image && (
                    <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta-100 text-terracotta-700 dark:bg-terracotta-900/40 dark:text-terracotta-200">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                  )}
                  <h4 className="font-display font-semibold">{v.title}</h4>
                  <p className="mt-1.5 text-sm text-secondary">{v.description}</p>
                </CardBody>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Sumber */}
      <Reveal className="mt-10">
        <details className="group rounded-xl2 border border-subtle bg-surface px-5 py-4">
          <summary className="flex cursor-pointer list-none items-center gap-2 font-display text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-lamongan-600" aria-hidden />
            Sumber dan catatan
          </summary>
          <p className="mt-3 text-sm text-secondary">
            Sejarah Lamongan ditulis dalam beberapa versi. Informasi di atas dirangkum dari sumber berikut, dan nama tokoh
            maupun detail peristiwa dapat berbeda antarsumber.
          </p>
          <ul className="mt-3 space-y-1.5 text-sm">
            {sources.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-1.5 text-lamongan-700 underline-offset-2 hover:underline dark:text-lamongan-300"
                >
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                  <span>{s.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      </Reveal>
    </section>
  );
}
