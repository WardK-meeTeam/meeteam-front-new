import Link from 'next/link';
import { BriefcaseBusiness, Users } from 'lucide-react';
import CategoryBadge from '@/components/shared/CategoryBadge';
import ProfileAvatar from '@/components/shared/ProfileAvatar';

interface JoinedProjectData {
  id: number;
  title: string;
  category: string;
  leader: string;
  currentMembers: number;
  maxMembers: number;
  imageUrl: string | null;
  leaderImageUrl: string | null;
}

interface JoinedProjectCardProps {
  projects?: JoinedProjectData[];
  disabled?: boolean;
}

export default function JoinedProjectCard({
  projects = [],
  disabled = false,
}: JoinedProjectCardProps) {
  if (projects.length === 0) {
    return (
      <section className="space-y-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl leading-7 font-bold text-text-black">참여 프로젝트</h2>
          <span className="text-lg leading-7 font-medium text-muted-gray">0</span>
        </div>

        <div
          className={`flex min-h-76 flex-col items-center justify-center rounded-2xl border border-dashed border-divider-soft bg-surface-soft/50 px-6 py-16 text-center ${
            disabled ? 'pointer-events-none opacity-70 blur-[1px]' : ''
          }`}
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-border-soft bg-white text-divider-soft shadow-sm">
            <BriefcaseBusiness className="h-8 w-8" aria-hidden strokeWidth={1.8} />
          </span>

          <p className="mt-4 text-sm leading-5 font-normal text-muted-gray">
            참여중인 프로젝트가 존재하지 않습니다.
          </p>
        </div>
      </section>
    );
  }

  const project = projects[0];
  const memberRatio = `${project.currentMembers}/${project.maxMembers}명`;
  const progressWidth =
    project.maxMembers > 0 ? `${(project.currentMembers / project.maxMembers) * 100}%` : '0%';

  return (
    <section className="space-y-4">
      <div className="flex items-baseline gap-2">
        <h2 className="text-xl leading-7 font-bold text-text-black">참여 프로젝트</h2>
        <span className="text-lg leading-7 font-medium text-muted-gray">{projects.length}</span>
      </div>

      <Link
        href={`/projects/${project.id}`}
        className={`group relative block w-full max-w-78.25 overflow-hidden rounded-3xl bg-text-black shadow-2xl ${
          disabled ? 'pointer-events-none opacity-70 blur-[1px]' : ''
        }`}
      >
        {disabled ? (
          <div
            aria-hidden
            className="absolute inset-0 z-10 rounded-3xl bg-overlay-white backdrop-blur-sm"
          />
        ) : null}

        <div className="absolute inset-0">
          {project.imageUrl ? (
            <img
              alt={project.title}
              className="h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
              src={project.imageUrl}
            />
          ) : (
            <div className="h-full w-full bg-text-black opacity-70" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-text-black via-text-black/50 to-transparent" />
        </div>

        <div className="relative flex min-h-70 flex-col justify-between p-6">
          <div>
            <CategoryBadge label={project.category} tone="onDark" />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl leading-7 font-bold text-white">{project.title}</h3>

            <div className="flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <ProfileAvatar
                  name={project.leader}
                  imageUrl={project.leaderImageUrl}
                  sizeClassName="h-8 w-8"
                  textClassName="text-xs"
                  className="border border-white/30 bg-white/20 text-white"
                />
                <span className="text-xs leading-4 font-medium text-white/90">
                  {project.leader}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-end gap-1 text-[10px] leading-4 font-bold text-white/90">
                  <Users className="h-3 w-3" aria-hidden strokeWidth={1.8} />
                  <span>{memberRatio}</span>
                </div>

                <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full rounded-full bg-brand-400"
                    style={{ width: progressWidth }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
