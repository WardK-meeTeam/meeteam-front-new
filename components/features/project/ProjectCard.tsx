import Image from 'next/image';
import Link from 'next/link';
import { Lock, Users } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string | number;
    title: string;
    imageUrl: string;
    category: string;
    deadline?: string;
    currentMembers: number;
    maxMembers: number;
    leader: {
      name: string;
      avatar: string;
    };
    tags?: string[];
    recruitInfo?: Array<{
      id: string | number;
      role: string;
      subRoles?: string[];
      status: string;
      current: number;
      max: number;
    }>;
  };
  compact?: boolean;
}

export function ProjectCard({ project, compact = false }: ProjectCardProps) {
  const percentage =
    project.maxMembers > 0 ? Math.round((project.currentMembers / project.maxMembers) * 100) : 0;

  const tags = project.tags ?? [];
  const recruitInfo = project.recruitInfo ?? [];

  const heightClass = compact ? 'h-50' : 'h-[380px]';
  const titleClass = compact ? 'mb-3 text-2xl' : 'mb-3 text-2xl';

  return (
    <Link
      data-cy="project-card"
      data-project-id={project.id}
      className={`group relative block ${heightClass} w-full overflow-hidden rounded-3xl bg-text-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transition-all duration-300 hover:ring-1 hover:ring-brand-400/50`}
      href={`/projects/${project.id}`}
    >
      <div className="absolute inset-0 h-full w-full">
        <Image
          alt={project.title}
          className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-110"
          fill
          sizes={compact ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
          src={project.imageUrl}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent transition-opacity duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      <div
        className={`absolute left-0 right-0 top-0 z-10 flex justify-between ${compact ? 'p-4' : 'p-6'}`}
      >
        <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/20 px-3 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-md">
          {project.category}
        </span>
        {project.deadline ? (
          <div className="inline-flex items-center rounded-md bg-brand-500/90 px-2 py-0.5 text-[10px] leading-4 font-bold text-white shadow-sm backdrop-blur-sm">
            {project.deadline} 마감
          </div>
        ) : null}
      </div>

      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end ${compact ? 'p-4' : 'p-6'}`}
      >
        <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
          <h3
            data-cy="project-card-title"
            className={`${titleClass} line-clamp-2 leading-tight font-bold text-white drop-shadow-md`}
          >
            {project.title}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                alt="Leader"
                className="h-8 w-8 rounded-full border border-white/30 object-cover"
                height={32}
                src={project.leader.avatar}
                width={32}
              />
              <span data-cy="project-card-leader" className="text-xs font-medium text-muted-gray">
                {project.leader.name}
              </span>
            </div>

            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1 text-[10px] font-bold text-white/90">
                <Users className="h-3 w-3" aria-hidden strokeWidth={2} />
                {project.currentMembers}/{project.maxMembers}명
              </div>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full bg-brand-500"
                  style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className={
            compact
              ? 'hidden'
              : 'grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:mt-4 group-hover:grid-rows-[1fr] group-hover:opacity-100'
          }
        >
          <div className="overflow-hidden">
            <div className="border-t border-white/20 pt-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="flex items-center gap-2 text-sm font-bold text-white">모집 현황</h4>
                <div className="flex gap-1">
                  {tags.slice(0, 2).map((tag) => (
                    <span
                      className="inline-block rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-white/80"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="max-h-35 space-y-2 overflow-y-auto pr-1">
                {recruitInfo.length > 0 ? (
                  recruitInfo.map((info) => (
                    <div
                      className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 p-2.5 transition-colors hover:bg-white/20"
                      key={info.id}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white">{info.role}</span>
                        <span className="text-[10px] text-white/70">
                          {info.subRoles?.join(', ') || '전체'}
                        </span>
                      </div>

                      {info.status === 'open' ? (
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {info.current}/{info.max}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-danger-500/90">
                          <Lock className="h-3 w-3" aria-hidden strokeWidth={2} />
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-center text-xs text-text-gray">모집 포지션 없음</div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end">
                <span className="cursor-pointer text-xs font-bold text-brand-400 transition-colors hover:text-brand-500">
                  자세히 보기 →
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
