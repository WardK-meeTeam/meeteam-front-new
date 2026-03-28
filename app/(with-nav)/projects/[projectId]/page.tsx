import Link from 'next/link';
import {
  CalendarDays,
  ChevronLeft,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Link2,
  Settings,
} from 'lucide-react';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import ProjectDetailContent from './_components/ProjectDetailContent';
import ProjectActionButtons from './_components/ProjectActionButtons';

const HERO_IMAGE_URLS = {
  first: 'http://localhost:3845/assets/96b5d67a8d8fcae1aba609faa758ade8f623622b.png',
  second: 'http://localhost:3845/assets/6980873dce6f2715a688f71d8dee1ba0a0b80da5.png',
  third: 'http://localhost:3845/assets/89a5ab8b98e9860baa75f2160855571fca81685d.png',
  fourth: 'http://localhost:3845/assets/1fe67e8741734af9ae135ee69b78e3f71cafa55b.png',
};

type RecommendedProject = {
  id: number;
  title: string;
  category: string;
  deadline: string;
  imageUrl: string;
  currentMembers: number;
  maxMembers: number;
  leader: {
    name: string;
    avatar: string;
  };
};

const RECOMMENDED_PROJECTS: RecommendedProject[] = [
  {
    id: 1,
    title: 'AI 기반 뉴스 요약 서비스 개발',
    category: 'AI/테크',
    deadline: '2026-01-23',
    imageUrl: HERO_IMAGE_URLS.first,
    currentMembers: 2,
    maxMembers: 4,
    leader: {
      name: '정연준',
      avatar: 'http://localhost:3845/assets/ba1db031d4fee2753f0a652b54c40e44587f0435.png',
    },
  },
  {
    id: 2,
    title: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
    imageUrl: HERO_IMAGE_URLS.second,
    category: 'AI/테크',
    deadline: '2025-11-19',
    currentMembers: 2,
    maxMembers: 9,
    leader: {
      name: '이우진',
      avatar: 'http://localhost:3845/assets/376c60097782ec7998ff59b2a12be789342ac6b0.png',
    },
  },
  {
    id: 3,
    title: '트립게더: 여행 동행 구하기',
    imageUrl: HERO_IMAGE_URLS.third,
    category: '여행',
    deadline: '2025-11-19',
    currentMembers: 1,
    maxMembers: 10,
    leader: {
      name: '주경현',
      avatar: 'http://localhost:3845/assets/719a1595c614b01fa72ecad4467c0ebc34eddfd1.png',
    },
  },
  {
    id: 4,
    title: '반려식물 케어 다이어리',
    imageUrl: HERO_IMAGE_URLS.fourth,
    category: '친환경',
    deadline: '2025-12-01',
    currentMembers: 3,
    maxMembers: 4,
    leader: {
      name: '김서연',
      avatar: 'http://localhost:3845/assets/a45abb6ed5ec7384c6345774fa96cd300a68957b.png',
    },
  },
];

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-bold text-text-gray transition-colors hover:text-text-black"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50">
          <ChevronLeft className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </span>
        목록으로 돌아가기
      </Link>

      <div className="relative h-96 overflow-hidden rounded-4xl bg-text-black px-12 py-8 text-white">
        <div className="absolute inset-0 bg-linear-to-r from-text-black via-label-dark to-label-dark" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col items-start justify-center">
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold leading-4 text-white">
              AI/테크
            </span>
            <span className="rounded-full border border-brand-400/30 bg-brand-400/30 px-3 py-1 text-xs font-bold leading-4 text-chip-bg">
              WEB
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl leading-12 font-extrabold">
            AI 기반 뉴스 요약 서비스 개발
          </h1>
          <p className="mt-3 text-lg leading-7 font-medium text-divider-soft">
            바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다.
          </p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-chip-bg backdrop-blur-sm">
            <CalendarDays className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            2026-01-23 마감
          </div>
        </div>

        <Link
          href={`/projects/${projectId}/manage`}
          className="absolute right-10 top-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <Settings className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          프로젝트 관리
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 pb-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <ProjectDetailContent />

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-text-black">프로젝트 리더</h2>

            <Link href="/profile/1" className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-brand-50">
                <img
                  alt="정연준"
                  className="h-full w-full object-cover"
                  src="http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png"
                />
              </div>
              <div>
                <p className="text-[18px] leading-7 font-bold text-text-black">정연준</p>
                <p className="text-sm text-text-gray">Frontend Dev</p>
              </div>
            </Link>

            <div className="mt-4 space-y-2">
              <p className="text-xs leading-4 font-bold text-text-gray">리더의 주력 스킬</p>
              <div className="flex flex-wrap gap-1.5">
                <span className="rounded-md border border-border-gray bg-white px-2.25 py-1.25 text-xs leading-4 font-medium text-project-status-closed">
                  React
                </span>
                <span className="rounded-md border border-border-gray bg-white px-2.25 py-1.25 text-xs leading-4 font-medium text-project-status-closed">
                  Next.js
                </span>
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-bold text-text-black">
              <Globe className="h-4 w-4 text-brand-500" aria-hidden strokeWidth={1.8} />
              외부 채널 및 저장소
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs leading-4 font-bold text-muted-gray">
                  <span>깃허브 주소</span>
                  <Copy className="h-3.5 w-3.5 text-muted-gray" aria-hidden strokeWidth={1.8} />
                </div>
                <Link
                  href="https://github.com/meeteam/meeteam-web"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-brand-50 bg-brand-50 px-4 py-3 text-xs leading-4 font-normal text-text-gray transition-colors hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Github
                      className="h-4 w-4 shrink-0 text-text-black"
                      aria-hidden
                      strokeWidth={1.8}
                    />
                    <span className="truncate">github.com/meeteam/meeteam-web</span>
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 text-muted-gray"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs leading-4 font-bold text-muted-gray">
                  <span>소통 채널 주소</span>
                  <Copy className="h-3.5 w-3.5 text-muted-gray" aria-hidden strokeWidth={1.8} />
                </div>
                <Link
                  href="https://open.kakao.com/o/meeteam_main"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-brand-50 bg-brand-50 px-4 py-3 text-xs leading-4 font-normal text-text-gray transition-colors hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Link2
                      className="h-4 w-4 shrink-0 text-brand-500"
                      aria-hidden
                      strokeWidth={1.8}
                    />
                    <span className="truncate">open.kakao.com/o/meeteam_main</span>
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 text-muted-gray"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] leading-4 text-muted-gray">
              외부 링크 이동 시 보안에 유의하시기 바랍니다.
            </p>
          </article>

          <ProjectActionButtons initialLikeCount={24} />
        </aside>
      </div>

      <div className="space-y-8 border-t border-border-gray pt-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl leading-8 font-bold text-text-black">
            다른 프로젝트도 확인해보세요
          </h2>
          <Link
            href="/projects"
            className="text-sm leading-5 font-bold text-brand-500 transition-colors hover:text-brand-400"
          >
            전체보기
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {RECOMMENDED_PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
