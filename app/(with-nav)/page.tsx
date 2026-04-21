import Link from 'next/link';
import AuthLink from '@/components/features/auth/AuthLink';
import HomeProjectSection from '@/components/features/home/HomeProjectSection';
import { fetchHomeMembers } from '@/components/features/home/homeApi';
import StartJourneyModalTrigger from '@/components/features/home/StartJourneyModalTrigger';
import UserCard from '@/components/shared/UserCard';

const fallbackTeammateCards = Array.from({ length: 5 }).map((_, index) => ({
  userId: index + 1,
  name: '정연준',
  role: '프론트엔드',
  experience: '프로젝트 0회 경험',
  skills: ['React', 'Next.js'],
  imageUrl: '/next.svg',
}));

export default async function Page() {
  const teammateCardsResult = await fetchHomeMembers(5)
    .then((cards) => ({ status: 'fulfilled' as const, value: cards }))
    .catch(() => ({ status: 'rejected' as const }));
  const teammateCards =
    teammateCardsResult.status === 'fulfilled' && teammateCardsResult.value.length > 0
      ? teammateCardsResult.value
      : fallbackTeammateCards;

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

      <HomeProjectSection />

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold text-text-black">팀을 구해요!</h2>
          <Link href="/teammates" className="text-sm font-semibold text-brand-500">
            더 많은 멤버 보기 &gt;
          </Link>
        </div>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teammateCards.map((teammate) => (
            <li key={teammate.userId}>
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
          <AuthLink
            href="/projects/create"
            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-bold text-text-black shadow-xl"
          >
            무료로 프로젝트 등록하기
          </AuthLink>
        </div>
      </section>
    </div>
  );
}
