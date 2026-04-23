import Link from 'next/link';
import { ArrowRight, GraduationCap, Sparkles } from 'lucide-react';
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
      <section className="relative overflow-hidden rounded-3xl border border-border-gray bg-brand-50 px-5 py-5 md:px-6 md:py-6">
        <div className="pointer-events-none absolute left-6 top-6 h-28 w-28 rounded-full bg-brand-100 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white blur-3xl" />

        <div className="relative grid items-center gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-5 px-2 py-3 hero-fade-up md:px-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-gray bg-white px-4 py-2 text-xs font-bold text-text-gray hero-fade-up hero-delay-1">
              <GraduationCap className="h-4 w-4 text-brand-500" strokeWidth={1.8} />
              대학생 전용 프로젝트 플랫폼
            </div>
            <div className="space-y-3 hero-fade-up hero-delay-2">
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-text-black md:text-4xl xl:text-5xl">
                캠퍼스에서 바로
                <br />
                <span className="text-brand-500">프로젝트를 시작해요</span>
              </h1>
              <p className="max-w-md text-sm leading-6 text-text-gray md:text-base">
                팀원 모집부터 지원 확인까지, 대학생 프로젝트를 더 가볍게 연결해요.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 hero-fade-up hero-delay-3">
              <StartJourneyModalTrigger />
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-border-gray bg-white px-6 py-3 text-base font-bold text-text-gray"
              >
                프로젝트 둘러보기
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>

          <div className="relative hero-fade-up hero-delay-2">
            <div className="absolute inset-x-6 top-10 h-40 rounded-full bg-brand-100 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-border-gray bg-white p-3 shadow-2xl hero-image-settle">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/campus-hero-generated.png"
                  alt="대학교 캠퍼스 전경"
                  className="h-[24rem] w-full object-cover md:h-[32rem] xl:h-[38rem]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-overlay-dark via-transparent to-transparent" />
                <div className="absolute left-5 top-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white bg-overlay-white px-3 py-1.5 text-xs font-bold text-text-black backdrop-blur-sm">
                    <Sparkles className="h-3.5 w-3.5 text-brand-500" strokeWidth={1.8} />
                    CAMPUS PROJECTS
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="max-w-sm rounded-2xl border border-white bg-overlay-white p-4 backdrop-blur-sm">
                    <h2 className="text-xl font-extrabold text-text-black">
                      캠퍼스에서 시작하는 협업
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-text-body">
                      수업, 공모전, 동아리, 포트폴리오 프로젝트까지 대학생의 실제 협업 흐름에 맞춰
                      팀을 찾고 연결해요.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-gray">
                        팀원 모집
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-gray">
                        지원 관리
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-text-gray">
                        캠퍼스 매칭
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
}
