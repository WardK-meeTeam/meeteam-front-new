'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Monitor, Settings, Users } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import { getProjectCategoryLabel } from '@/components/features/project/constants';
import ProjectCoverImage from '@/components/features/project/ProjectCoverImage';
import ProjectActionButtons from '@/components/features/project/detail/ProjectActionButtons';
import ProjectDetailContent, {
  type ProjectDetailTab,
} from '@/components/features/project/detail/ProjectDetailContent';
import ProjectDetailSkeleton from '@/components/features/project/detail/ProjectDetailSkeleton';
import {
  fetchProjectDetail,
  fetchProjectTeamManagement,
} from '@/components/features/project/projectApi';
import CategoryBadge from '@/components/shared/CategoryBadge';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import { formatJobRole } from '@/components/shared/jobRoleFormat';
import StatusBadge from '@/components/shared/StatusBadge';
import ToastMessage from '@/components/shared/ToastMessage';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastStore } from '@/stores/useToastStore';
import { useProjectStore } from '@/components/features/project/store';
import type { ProjectMember, ProjectRecord } from '@/types/project';

type RecruitSummary = {
  role: string;
  specialty: string;
  total: number;
  isOpen: boolean;
};

export default function ProjectDetailPage({ projectId }: { projectId: string }) {
  const memberId = useAuthStore((state) => state.memberId);
  const showToast = useToastStore((state) => state.showToast);
  const projectsById = useProjectStore((state) => state.projectsById);
  const localProject = projectsById[projectId] ?? null;
  const [project, setProject] = useState<ProjectRecord | null>(null);
  const [teamMembers, setTeamMembers] = useState<ProjectMember[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ProjectDetailTab>('intro');

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
  const canManageProject =
    project.isLeader === true || (memberId !== null && memberId === project.leaderProfileId);
  const recruitSummaries: RecruitSummary[] =
    project.recruitmentDetails?.map((recruitment) => ({
      role: recruitment.jobFieldName,
      specialty: recruitment.jobPositionName,
      total: recruitment.recruitmentCount,
      isOpen: !recruitment.isClosed && project.status !== 'closed',
    })) ??
    project.recruitInterests.map((interest) => ({
      role: interest.major,
      specialty: interest.minor,
      total: interest.count,
      isOpen: project.status !== 'closed',
    }));
  const recruitCount = recruitSummaries.reduce((sum, position) => sum + position.total, 0);
  const openRecruitmentCount = recruitSummaries.filter((position) => position.isOpen).length;
  const recruitRoleNames = recruitSummaries
    .slice(0, 3)
    .map((position) => formatJobRole(position.role, position.specialty));
  const deadlineText = project.isRecruitUntilComplete
    ? '상시 모집'
    : `${project.recruitDeadline} 마감`;
  const platformText = project.releasePlatforms.join(', ');

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

  const handleMoveToRecruitTab = () => {
    setActiveTab('recruit');

    window.requestAnimationFrame(() => {
      document.getElementById('project-detail-content')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };

  return (
    <section className="mx-auto w-full max-w-6xl pb-20">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge label={getProjectCategoryLabel(project.categoryId)} size="md" />
          <StatusBadge
            status={project.status === 'closed' ? 'closed' : 'open'}
            label={project.status === 'closed' ? '모집 마감' : '모집중'}
            size="md"
          />
        </div>

        <h1 className="mt-5 break-keep text-3xl leading-tight font-extrabold text-mt-text-primary md:text-4xl">
          {project.title}
        </h1>
        <p className="mt-3 break-keep text-base leading-7 font-medium text-mt-text-secondary">
          함께 프로젝트를 만들 팀원을 찾고 있어요.
          {recruitRoleNames.length > 0 ? (
            <>
              {' '}
              {recruitRoleNames.map((roleName, index) => (
                <span key={roleName}>
                  {index > 0 ? ', ' : ''}
                  <strong className="font-extrabold text-mt-text-primary">{roleName}</strong>
                </span>
              ))}{' '}
              포지션을 모집 중입니다.
            </>
          ) : null}
        </p>

        <div className="mt-6 overflow-hidden rounded-3xl border border-mt-border bg-mt-white p-3 shadow-sm">
          <ProjectCoverImage
            src={project.coverImageUrl}
            alt={project.title}
            priority
            className="rounded-2xl"
            imageClassName="object-center"
            overlayClassName="bg-mt-text-primary/10"
          />
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div id="project-detail-content" className="min-w-0 scroll-mt-24 pb-14">
          <ProjectDetailContent
            project={project}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            canApply={!canManageProject}
            onCopyExternalUrl={handleCopyExternalUrl}
          />
        </div>

        <aside className="min-w-0 lg:sticky lg:top-24 lg:flex">
          <article className="flex w-full flex-col self-stretch rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm">
            <div className="space-y-2">
              <p className="text-2xl leading-8 font-extrabold text-mt-text-primary">
                팀원 {members.length} / {recruitCount + 1}명
              </p>
              <div className="flex items-center gap-2 text-sm leading-5 text-mt-text-secondary">
                <CalendarDays className="h-4 w-4 text-mt-primary" aria-hidden />
                <span>{deadlineText}</span>
              </div>
              {platformText ? (
                <div className="flex items-center gap-2 text-sm leading-5 text-mt-text-secondary">
                  <Monitor className="h-4 w-4 text-mt-primary" aria-hidden />
                  <span>{platformText}</span>
                </div>
              ) : null}
              <div className="flex items-center gap-2 text-sm leading-5 text-mt-text-secondary">
                <Users className="h-4 w-4 text-mt-primary" aria-hidden />
                <span>
                  {openRecruitmentCount}개 포지션 · {recruitCount}명 모집
                </span>
              </div>
            </div>

            {canManageProject ? (
              <AuthLink
                href={`/projects/${project.id}/manage`}
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-mt-primary px-4 text-sm font-bold text-mt-white shadow-sm transition-colors hover:bg-mt-logo-blue"
              >
                <Settings className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                프로젝트 관리
              </AuthLink>
            ) : project.status === 'closed' ? (
              <button
                type="button"
                disabled
                className="mt-6 inline-flex h-14 w-full cursor-not-allowed items-center justify-center rounded-xl bg-mt-bg-soft px-4 text-sm font-bold text-mt-text-secondary"
              >
                모집이 마감됐어요
              </button>
            ) : (
              <button
                type="button"
                onClick={handleMoveToRecruitTab}
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-mt-primary px-4 text-sm font-bold text-mt-white shadow-sm transition-colors hover:bg-mt-logo-blue"
              >
                프로젝트 지원하기
                <ArrowRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              </button>
            )}

            <div className="mt-5 border-t border-mt-border pt-5">
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
            </div>

            <div className="mt-auto pt-5">
              <ProjectActionButtons
                projectId={project.id}
                initialLikeCount={project.likeCount ?? 0}
                initialLiked={project.isLiked ?? false}
              />
            </div>
          </article>
        </aside>
      </div>
    </section>
  );
}
