import Link from 'next/link';
import { BriefcaseBusiness, Users } from 'lucide-react';
import { joinedProject } from '@/components/features/profile/profileData';

export default function JoinedProjectCard() {
  if (!joinedProject) {
    return (
      <section className="space-y-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl leading-7 font-bold text-text-black">참여 프로젝트</h2>
          <span className="text-lg leading-7 font-medium text-muted-gray">0</span>
        </div>

        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-divider-soft bg-surface-soft/50 px-6 py-16 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-icon-gray bg-white text-divider-soft shadow-sm">
            <BriefcaseBusiness className="h-8 w-8" aria-hidden strokeWidth={1.8} />
          </span>

          <div className="mt-5 space-y-1">
            <h3 className="text-lg leading-7 font-bold text-text-body">
              진행한 프로젝트가 없나요?
            </h3>
            <p className="text-sm leading-5 font-normal text-muted-gray">
              첫 번째 프로젝트를 시작하거나, 생성해보세요!
            </p>
          </div>

          <div className="mt-6">
            <Link
              href="/projects"
              className="inline-flex rounded-full bg-white px-6 py-2 text-sm leading-5 font-bold text-brand-500 shadow-sm ring-1 ring-inset ring-border-gray transition-colors hover:text-brand-700"
            >
              프로젝트 찾아보기
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const project = joinedProject;
  const memberRatio = `${project.currentMembers}/${project.maxMembers}명`;
  const progressWidth = `${(project.currentMembers / project.maxMembers) * 100}%`;

  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl leading-7 font-bold text-text-black">참여 프로젝트</h2>
        <span className="text-lg leading-7 font-medium text-muted-gray">1</span>
      </div>

      <Link
        href={`/projects/${project.id}`}
        className="group relative block w-full max-w-78.25 overflow-hidden rounded-3xl bg-text-black shadow-2xl"
      >
        <div className="absolute inset-0">
          <img
            alt={project.title}
            className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
            src={project.imageUrl}
          />
          <div className="absolute inset-0 bg-linear-to-t from-text-black via-text-black/50 to-transparent" />
        </div>

        <div className="relative flex min-h-70 flex-col justify-between p-6">
          <div>
            <span className="inline-flex rounded-full border border-white/10 bg-white/20 px-3 py-1 text-xs leading-4 font-bold text-white backdrop-blur-sm">
              {project.category}
            </span>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl leading-7 font-bold text-white">{project.title}</h3>

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="h-8 w-8 overflow-hidden rounded-full border border-white/30">
                  <img
                    alt={project.leader}
                    className="h-full w-full object-cover"
                    src={project.leaderImageUrl}
                  />
                </span>
                <span className="text-xs leading-4 font-medium text-white/90">{project.leader}</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-end gap-1 text-[10px] leading-4 font-bold text-white/90">
                  <Users className="h-3 w-3" aria-hidden strokeWidth={1.8} />
                  <span>{memberRatio}</span>
                </div>

                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
                  <div className="h-full rounded-full bg-brand-400" style={{ width: progressWidth }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
