'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, Settings, Users } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import { getProjectCategoryLabel } from '@/components/features/project/constants';
import ProjectCoverImage from '@/components/features/project/ProjectCoverImage';
import ProjectActionButtons from '@/components/features/project/detail/ProjectActionButtons';
import ProjectDetailContent from '@/components/features/project/detail/ProjectDetailContent';
import ProjectDetailSkeleton from '@/components/features/project/detail/ProjectDetailSkeleton';
import {
  fetchProjectDetail,
  fetchProjectTeamManagement,
} from '@/components/features/project/projectApi';
import CategoryBadge from '@/components/shared/CategoryBadge';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import SkillChip from '@/components/shared/SkillChip';
import ToastMessage from '@/components/shared/ToastMessage';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';
import { useProjectStore } from '@/components/features/project/store';
import type { ProjectMember, ProjectRecord } from '@/types/project';

export default function ProjectDetailPage({ projectId }: { projectId: string }) {
  const memberId = useAuthStore((state) => state.memberId);
  const showToast = useToastStore((state) => state.showToast);
  const projectsById = useProjectStore((state) => state.projectsById);
  const localProject = projectsById[projectId] ?? null;
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [teamMembers, setTeamMembers] = useState<ProjectMember[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      try {
        setIsLoading(true);
        setProject(null);
        setTeamMembers(null);

        const nextProject = await fetchProjectDetail(projectId);

        if (!active) {
          return;
        }

        setProject(nextProject);
        setTeamMembers(nextProject.members);
        setErrorMessage(null);

        if (nextProject.isLeader) {
          try {
            const nextTeamManagement = await fetchProjectTeamManagement(projectId);

            if (active) {
              setTeamMembers(nextTeamManagement.members);
            }
          } catch {
            if (active) {
              setTeamMembers(nextProject.members);
            }
          }
        }
      } catch (error) {
        if (!active) {
          return;
        }

        setProject(localProject);
        setTeamMembers(localProject?.members ?? null);

        if (!localProject) {
          setErrorMessage(
            error instanceof Error ? error.message : '프로젝트를 불러오지 못했습니다.',
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadProject();

    return () => {
      active = false;
    };
  }, [localProject, projectId]);

  if (isLoading && !project) {
    return <ProjectDetailSkeleton />;
  }

  if (!project) {
    return (
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 py-24 text-center">
        <ToastMessage message={errorMessage} />

        <h1 className="text-3xl font-bold text-mt-text-primary">프로젝트를 찾을 수 없어요.</h1>
        <p className="text-base leading-6 text-mt-text-secondary">
          {errorMessage ?? '목록으로 돌아가서 다른 프로젝트를 확인해보세요.'}
        </p>
      </section>
    );
  }

  const leader = project.members.find((member) => member.isLeader) ?? project.members[0];
  const rawMembers = teamMembers && teamMembers.length > 0 ? teamMembers : project.members;
  const members = rawMembers.filter(
    (member, index, items) => items.findIndex((item) => item.id === member.id) === index,
  );
  const leaderSkillKey = `${project.myInterest.major} - ${project.myInterest.minor}`;
  const leaderSkills = project.leaderTechStacks ?? project.recruitTechStacks[leaderSkillKey] ?? [];
  const canManageProject =
    project.isLeader === true || (memberId !== null && memberId === project.leaderProfileId);

  const handleCopyExternalUrl = async (url: string, label: string) => {
    if (!url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      showToast({ tone: 'success', message: `${label}를 복사했어요.` });
    } catch {
      showToast({ message: '주소를 복사하지 못했습니다. 다시 시도해 주세요.' });
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(20rem,0.7fr)]">
        <ProjectCoverImage
          src={project.coverImageUrl}
          alt={project.title}
          priority
          className="border border-mt-border shadow-sm"
          overlayClassName="bg-mt-text-primary/10"
        />

        <article className="flex min-w-0 flex-col justify-between rounded-4xl border border-mt-border bg-mt-white p-6 shadow-sm md:p-8">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <CategoryBadge label={getProjectCategoryLabel(project.categoryId)} />
              {project.releasePlatforms.map((releasePlatform) => (
                <CategoryBadge key={releasePlatform} label={releasePlatform} tone="default" />
              ))}
            </div>

            <h1 className="break-keep text-3xl leading-tight font-extrabold text-mt-text-primary md:text-4xl">
              {project.title}
            </h1>

            {project.summary ? (
              <p className="mt-4 line-clamp-3 text-base leading-7 font-medium text-mt-text-secondary">
                {project.summary}
              </p>
            ) : null}

            <div className="mt-6 border-t border-mt-border pt-5">
              <p className="text-xs leading-4 font-bold text-mt-text-secondary">프로젝트 리더</p>
              <AuthLink
                href={`/profile/${project.leaderProfileId ?? 1}`}
                className="mt-3 flex items-center gap-3"
              >
                <ProfileAvatar
                  name={leader?.name ?? '프로젝트 리더'}
                  imageUrl={leader?.avatarUrl}
                  sizeClassName="h-12 w-12"
                  shape="rounded"
                  textClassName="text-sm"
                />
                <div className="min-w-0">
                  <p className="truncate text-base leading-6 font-bold text-mt-text-primary">
                    {leader?.name}
                  </p>
                  <p className="truncate text-sm leading-5 text-mt-text-secondary">
                    {project.leaderRole}
                  </p>
                </div>
              </AuthLink>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {leaderSkills.length > 0 ? (
                  leaderSkills
                    .slice(0, 3)
                    .map((tech) => <SkillChip key={tech} label={tech} variant="outline" />)
                ) : (
                  <SkillChip label={project.myInterest.major} variant="outline" />
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-mt-border bg-mt-badge-bg px-4 py-2 text-sm font-bold text-mt-primary">
              <CalendarDays className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              {project.isRecruitUntilComplete ? '상시 모집' : `${project.recruitDeadline} 마감`}
            </div>

            {canManageProject ? (
              <AuthLink
                href={`/projects/${project.id}/manage`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-mt-border bg-mt-white px-4 py-2 text-sm font-bold text-mt-primary shadow-sm transition-colors hover:bg-mt-badge-bg"
              >
                <Settings className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                프로젝트 관리
              </AuthLink>
            ) : null}

            <div className="inline-flex items-center gap-2 rounded-full border border-mt-border bg-mt-white px-4 py-2 text-sm font-bold text-mt-text-secondary">
              <Users className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              {members.length}명
            </div>
          </div>

          <div className="mt-4">
            <ProjectActionButtons
              projectId={project.id}
              initialLikeCount={project.likeCount ?? 0}
              initialLiked={project.isLiked ?? false}
            />
          </div>
        </article>
      </div>

      <div className="mx-auto w-full max-w-4xl pb-14">
        <ProjectDetailContent
          project={project}
          canApply={!canManageProject}
          onCopyExternalUrl={handleCopyExternalUrl}
        />
      </div>
    </section>
  );
}
