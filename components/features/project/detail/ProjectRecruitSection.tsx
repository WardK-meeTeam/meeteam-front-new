import type { ProjectRecord } from '@/types/project';
import AuthLink from '@/components/features/auth/AuthLink';
import BaseButton from '@/components/shared/BaseButton';

type RecruitPositionStatus = 'open' | 'closed';

type RecruitPosition = {
  id: number;
  role: string;
  specialty: string;
  joined: number;
  total: number;
  status: RecruitPositionStatus;
  techStack: string[];
};

function RecruitStatusBadge({ status }: { status: RecruitPositionStatus }) {
  if (status === 'open') {
    return (
      <span className="inline-flex items-center rounded-full bg-project-recruiting-bg px-2 py-0.5 text-[10px] leading-4 font-bold text-project-status-progress">
        모집중
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-surface-soft px-2 py-0.5 text-[10px] leading-4 font-bold text-muted-gray">
      마감
    </span>
  );
}

function RecruitTechChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-md bg-surface-soft px-2.5 py-1 text-xs leading-4 font-medium text-label-dark">
      {label}
    </span>
  );
}

function buildApplyHref(projectId: string, position: RecruitPosition) {
  const params = new URLSearchParams({
    jobField: position.role,
    jobPosition: position.specialty,
  });

  return `/projects/${projectId}/apply?${params.toString()}`;
}

export default function ProjectRecruitSection({ project }: { project: ProjectRecord }) {
  const recruitPositions: RecruitPosition[] =
    project.recruitmentDetails?.map((recruitment, index) => ({
      id: index + 1,
      role: recruitment.jobFieldName,
      specialty: recruitment.jobPositionName,
      joined: recruitment.currentCount,
      total: recruitment.recruitmentCount,
      status: recruitment.isClosed || project.status === 'closed' ? 'closed' : 'open',
      techStack: recruitment.techStacks,
    })) ??
    project.recruitInterests.map((interest, index) => {
      const joined = project.members.filter(
        (member) => !member.isLeader && member.role.includes(interest.major),
      ).length;

      return {
        id: index + 1,
        role: interest.major,
        specialty: interest.minor,
        joined,
        total: interest.count,
        status: joined >= interest.count || project.status === 'closed' ? 'closed' : 'open',
        techStack: project.recruitTechStacks[`${interest.major} - ${interest.minor}`] ?? [],
      };
    });

  return (
    <section className="flex w-full flex-col gap-8" data-node-id="97:800">
      {recruitPositions.map((position) => {
        const isOpen = position.status === 'open';

        return (
          <article
            key={position.id}
            className={`w-full rounded-2xl border border-border-gray bg-white px-6 pb-6 pt-7 shadow-sm ${isOpen ? '' : 'opacity-60'}`}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base leading-5 font-bold text-text-black">
                    {position.role} ({position.specialty})
                  </h3>
                  <RecruitStatusBadge status={position.status} />
                </div>

                <p className="text-base leading-5 font-medium text-text-black">
                  {position.joined} / {position.total}명 합류
                </p>
              </div>

              {isOpen ? (
                <AuthLink href={buildApplyHref(project.id, position)}>
                  <BaseButton
                    size="S"
                    className="h-10 min-w-24 rounded-xl bg-text-black px-5 text-xs leading-4 font-bold text-white shadow-none hover:bg-label-dark"
                  >
                    지원하기
                  </BaseButton>
                </AuthLink>
              ) : null}
            </div>

            <div className="my-6 h-px w-full bg-surface-soft" />

            <div className="flex flex-wrap items-center gap-6">
              <span className="text-sm leading-5 font-medium text-project-status-closed">
                기술스택
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {position.techStack.map((tech) => (
                  <RecruitTechChip key={tech} label={tech} />
                ))}
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
