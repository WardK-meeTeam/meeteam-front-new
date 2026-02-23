import Link from 'next/link';
import StartJourneyModalTrigger from '@/components/features/home/StartJourneyModalTrigger';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import BaseTag from '@/components/shared/BaseTag';
import UserCard from '@/components/shared/UserCard';

const categoryChips = [
  { emoji: '✨', label: '전체', active: true },
  { emoji: '🤖', label: 'AI/테크' },
  { emoji: '🍀', label: '친환경' },
  { emoji: '💪', label: '헬스케어' },
  { emoji: '🐱', label: '반려동물' },
  { emoji: '📚', label: '교육/학습' },
  { emoji: '💄', label: '패션/뷰티' },
];

const projectCards = [
  {
    id: 1,
    title: 'AI 기반 뉴스 요약 서비스 개발',
    imageUrl: '/file.svg',
    category: 'AI/테크',
    deadline: '2026-01-23',
    currentMembers: 2,
    maxMembers: 4,
    leader: {
      name: '정연준',
      avatar: '/next.svg',
    },
  },
  {
    id: 2,
    title: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
    imageUrl: '/window.svg',
    category: 'AI/테크',
    deadline: '2025-11-19',
    currentMembers: 2,
    maxMembers: 9,
    leader: {
      name: '이우진',
      avatar: '/vercel.svg',
    },
  },
  {
    id: 3,
    title: '트립게더: 여행 동행 구하기',
    imageUrl: '/globe.svg',
    category: '여행',
    deadline: '2025-11-19',
    currentMembers: 1,
    maxMembers: 10,
    leader: {
      name: '주경현',
      avatar: '/next.svg',
    },
  },
  {
    id: 4,
    title: '반려식물 케어 다이어리',
    imageUrl: '/file.svg',
    category: '친환경',
    deadline: '2025-12-01',
    currentMembers: 3,
    maxMembers: 4,
    leader: {
      name: '김서연',
      avatar: '/vercel.svg',
    },
  },
];

const teammateCards = Array.from({ length: 5 }).map((_, index) => ({
  id: index + 1,
  userId: index + 1,
  name: '정연준',
  role: '프론트엔드',
  experience: '프로젝트 0회 경험',
  skills: ['React', 'Next.js'],
  imageUrl: '/next.svg',
}));

export default function Page() {
  return (
    <div className="space-y-12 pb-8 md:space-y-16">
      <section className="overflow-hidden rounded-3xl border border-border-gray bg-brand-50 px-6 py-8 md:px-10 md:py-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="space-y-6 hero-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-gray bg-white px-4 py-2 text-xs font-bold text-text-gray hero-fade-up hero-delay-1">
              <span className="h-2 w-2 rounded-full bg-brand-400" />
              사이드 프로젝트 팀빌딩 플랫폼
            </div>
            <div className="space-y-3 hero-fade-up hero-delay-2">
              <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-text-black md:text-5xl">
                아이디어가 현실이 되는 곳,
                <br />
                <span className="text-brand-500">meeTeam</span>
              </h1>
              <p className="text-base leading-7 text-text-gray md:text-lg">
                사이드 프로젝트부터 창업 팀 빌딩까지.
                <br />
                당신의 열정과 함께할 최고의 동료를 지금 바로 만나보세요.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 hero-fade-up hero-delay-3">
              <StartJourneyModalTrigger />
              <Link
                href="/teammates"
                className="inline-flex items-center rounded-full border border-border-gray bg-white px-6 py-3 text-base font-bold text-text-gray"
              >
                팀원 찾기
              </Link>
            </div>
          </div>

          <div className="relative hero-fade-up hero-delay-2">
            <div className="overflow-hidden rounded-3xl border border-border-gray bg-white p-2 shadow-2xl hero-image-settle">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                alt="팀 협업 이미지"
                className="h-72 w-full rounded-2xl object-cover md:h-80"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 flex items-center gap-3 rounded-2xl border border-border-gray bg-white px-4 py-3 shadow-xl hero-badge-animate">
              <div className="flex -space-x-3">
                <img
                  src="https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=120&q=80"
                  alt="사용자 아바타"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=120&q=80"
                  alt="사용자 아바타"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=120&q=80"
                  alt="사용자 아바타"
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              </div>
              <p className="text-sm font-bold text-brand-500">1,204개의 팀 매칭</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-10 -mx-4 border-y border-border-gray bg-white px-4 py-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categoryChips.map((chip) => (
            <BaseTag
              key={chip.label}
              size="M"
              selected={chip.active}
              leftIcon={<span>{chip.emoji}</span>}
              className="shrink-0"
            >
              {chip.label}
            </BaseTag>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-black">프로젝트</h2>
          <Link href="/projects" className="text-sm font-semibold text-brand-500">
            전체보기 &gt;
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projectCards.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-black">팀을 구해요!</h2>
          <Link href="/teammates" className="text-sm font-semibold text-brand-500">
            더 많은 멤버 보기 &gt;
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teammateCards.map((teammate) => (
            <li key={teammate.id}>
              <UserCard
                userId={teammate.userId}
                name={teammate.name}
                role={teammate.role}
                experience={teammate.experience}
                skills={teammate.skills}
                imageUrl={teammate.imageUrl}
              />
            </li>
          ))}
        </ul>
      </section>

      <section className="relative overflow-hidden rounded-3xl bg-text-black px-8 py-10 md:px-12">
        <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-400 opacity-20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-brand-500 opacity-20 blur-3xl" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              나만의 팀을 만들 준비가 되셨나요?
            </h2>
            <p className="mt-3 text-base text-muted-gray md:text-lg">
              망설이지 마세요. 1분이면 프로젝트를 등록하고 멋진 동료들을 모집할 수 있습니다.
            </p>
          </div>
          <Link
            href="/projects/create"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-text-black shadow-xl"
          >
            무료로 프로젝트 등록하기
          </Link>
        </div>
      </section>
    </div>
  );
}
