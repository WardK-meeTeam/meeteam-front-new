import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, GraduationCap } from 'lucide-react';
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
      <section className="relative overflow-hidden bg-white px-2 py-8 md:px-4 md:py-12 xl:py-16">
        <div className="pointer-events-none absolute right-0 top-14 h-96 w-96 rounded-full bg-home-blue-50 blur-3xl md:right-16 md:h-[32rem] md:w-[32rem]" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8 px-2 hero-fade-up md:px-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-home-blue-50 px-5 py-2.5 text-sm font-bold text-home-blue-500 hero-fade-up hero-delay-1">
              <GraduationCap className="h-4 w-4 text-home-blue-500" strokeWidth={1.8} />
              대학생 전용 프로젝트 플랫폼
            </div>
            <div className="space-y-6 hero-fade-up hero-delay-2">
              <h1 className="font-brand-display text-4xl leading-tight text-text-black md:text-5xl xl:text-6xl">
                캠퍼스 프로젝트,
                <br />
                <span className="text-home-blue-500">함께할 팀을 쉽게 찾아요</span>
              </h1>
              <p className="max-w-md text-lg leading-8 text-text-gray">
                팀원 모집부터 지원 관리까지
                <br />
                meeTeam에서 한 번에 연결해요.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 hero-fade-up hero-delay-3">
              <StartJourneyModalTrigger />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-home-blue-100 bg-white px-7 py-3.5 text-base font-bold text-home-blue-500 transition-colors hover:border-home-blue-200 hover:bg-home-blue-50 hover:text-text-black"
              >
                프로젝트 둘러보기
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="relative flex min-h-80 items-center justify-center hero-fade-up hero-delay-2">
            <div className="absolute right-2 top-2 h-80 w-80 rounded-full bg-home-blue-50 md:h-[30rem] md:w-[30rem]" />
            <div className="absolute bottom-8 right-10 h-20 w-64 rounded-full bg-home-blue-100/70 blur-xl" />
            <div className="relative hero-image-settle">
              <Image
                src="/brand/meeteam_character.png"
                alt="하트를 들고 있는 meeTeam 캐릭터"
                width={1472}
                height={1472}
                priority
                className="w-full max-w-sm md:max-w-md xl:max-w-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <HomeProjectSection />

      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <h2 className="font-brand-display text-2xl text-text-black">팀을 구해요!</h2>
          <Link href="/teammates" className="text-sm font-semibold text-home-blue-500">
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
    </div>
  );
}
