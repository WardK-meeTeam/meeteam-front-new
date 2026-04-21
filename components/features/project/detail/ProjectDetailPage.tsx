'use client';

import { type ReactNode, useEffect, useState } from 'react';
import { CalendarDays, Copy, ExternalLink, Github, Globe, Link2, Settings } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import { getProjectCategoryLabel } from '@/components/features/project/constants';
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

type ExternalProjectLinkProps = {
  label: string;
  url: string;
  icon: ReactNode;
  onCopy: (url: string, label: string) => void;
};

function ExternalProjectLink({ label, url, icon, onCopy }: ExternalProjectLinkProps) {
  const hasUrl = Boolean(url);
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2">
        {icon}
        <span className="truncate">{hasUrl ? url : '등록된 링크가 없습니다.'}</span>
      </span>
      <ExternalLink
        className={`h-3.5 w-3.5 shrink-0 ${hasUrl ? 'text-muted-gray' : 'text-divider-soft'}`}
        aria-hidden
        strokeWidth={1.8}
      />
    </>
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs leading-4 font-bold text-muted-gray">
        <span>{label}</span>
        <button
          type="button"
          onClick={() => onCopy(url, label)}
          disabled={!hasUrl}
          className="rounded-md p-1 text-muted-gray transition-colors hover:bg-surface-soft hover:text-text-black disabled:cursor-not-allowed disabled:text-divider-soft disabled:hover:bg-transparent"
          aria-label={`${label} 복사`}
        >
          <Copy className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
        </button>
      </div>

      {hasUrl ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between rounded-xl border border-brand-50 bg-brand-50 px-4 py-3 text-xs leading-4 font-normal text-text-gray transition-colors hover:bg-white"
        >
          {content}
        </a>
      ) : (
        <div
          className="flex items-center justify-between rounded-xl border border-border-gray bg-surface-soft px-4 py-3 text-xs leading-4 font-normal text-muted-gray"
          aria-disabled
        >
          {content}
        </div>
      )}
    </div>
  );
}

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

        <h1 className="text-3xl font-bold text-text-black">프로젝트를 찾을 수 없어요.</h1>
        <p className="text-base leading-6 text-text-gray">
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
      <div className="relative h-96 overflow-hidden rounded-4xl bg-text-black px-12 py-8 text-white">
        {project.coverImageUrl ? (
          <img
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
            src={project.coverImageUrl}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full flex-col items-start justify-center">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <CategoryBadge label={getProjectCategoryLabel(project.categoryId)} tone="onDark" />
            {project.releasePlatforms.map((releasePlatform) => (
              <CategoryBadge key={releasePlatform} label={releasePlatform} tone="accent" />
            ))}
          </div>

          <h1 className="max-w-3xl text-5xl leading-12 font-extrabold">{project.title}</h1>
          <p className="mt-3 text-lg leading-7 font-medium text-divider-soft">{project.summary}</p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-chip-bg backdrop-blur-sm">
            <CalendarDays className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            {project.isRecruitUntilComplete ? '상시 모집' : `${project.recruitDeadline} 마감`}
          </div>
        </div>

        {canManageProject ? (
          <AuthLink
            href={`/projects/${project.id}/manage`}
            className="absolute right-10 top-8 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            <Settings className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            프로젝트 관리
          </AuthLink>
        ) : null}
      </div>

      <div className="grid grid-cols-1 gap-8 pb-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <ProjectDetailContent project={project} canApply={!canManageProject} />

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold text-text-black">프로젝트 리더</h2>

            <AuthLink
              href={`/profile/${project.leaderProfileId ?? 1}`}
              className="mt-4 flex items-center gap-4"
            >
              <ProfileAvatar
                name={leader?.name ?? '프로젝트 리더'}
                imageUrl={leader?.avatarUrl}
                sizeClassName="h-16 w-16"
                shape="rounded"
                textClassName="text-lg"
              />
              <div>
                <p className="text-[18px] leading-7 font-bold text-text-black">{leader?.name}</p>
                <p className="text-sm text-text-gray">{project.leaderRole}</p>
              </div>
            </AuthLink>

            <div className="mt-4 space-y-2">
              <p className="text-xs leading-4 font-bold text-text-gray">리더의 주력 스킬</p>
              <div className="flex flex-wrap gap-1.5">
                {leaderSkills.length > 0 ? (
                  leaderSkills
                    .slice(0, 3)
                    .map((tech) => <SkillChip key={tech} label={tech} variant="outline" />)
                ) : (
                  <SkillChip label={project.myInterest.major} variant="outline" />
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-border-gray pt-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs leading-4 font-bold text-text-gray">참여 팀원</p>
                <span className="text-xs leading-4 font-bold text-muted-gray">
                  {members.length}명
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {members.map((member) => (
                  <AuthLink
                    key={member.id}
                    href={`/profile/${member.id}`}
                    className="group inline-flex rounded-full"
                    aria-label={`${member.name} 프로필로 이동`}
                    title={member.role ? `${member.name} · ${member.role}` : member.name}
                  >
                    <ProfileAvatar
                      name={member.name}
                      imageUrl={member.avatarUrl}
                      sizeClassName="h-10 w-10"
                      textClassName="text-sm"
                      className="ring-2 ring-white transition group-hover:ring-brand-100"
                    />
                  </AuthLink>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-bold text-text-black">
              <Globe className="h-4 w-4 text-brand-500" aria-hidden strokeWidth={1.8} />
              외부 채널 및 저장소
            </h2>

            <div className="mt-4 space-y-4">
              <ExternalProjectLink
                label="깃허브 주소"
                url={project.githubUrl}
                onCopy={handleCopyExternalUrl}
                icon={
                  <Github
                    className="h-4 w-4 shrink-0 text-text-black"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                }
              />

              <ExternalProjectLink
                label="소통 채널 주소"
                url={project.communicationUrl}
                onCopy={handleCopyExternalUrl}
                icon={
                  <Link2
                    className="h-4 w-4 shrink-0 text-brand-500"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                }
              />
            </div>

            <p className="mt-4 text-center text-[10px] leading-4 text-muted-gray">
              외부 링크 이동 시 보안에 유의하시기 바랍니다.
            </p>
          </article>

          <ProjectActionButtons
            projectId={project.id}
            initialLikeCount={project.likeCount ?? 0}
            initialLiked={project.isLiked ?? false}
          />
        </aside>
      </div>
    </section>
  );
}
