'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronLeft,
  Copy,
  ExternalLink,
  Github,
  Globe,
  Link2,
  Settings,
} from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import { getProjectCategoryLabel } from '@/components/features/project/constants';
import ProjectActionButtons from '@/components/features/project/detail/ProjectActionButtons';
import ProjectDetailContent from '@/components/features/project/detail/ProjectDetailContent';
import ProjectDetailSkeleton from '@/components/features/project/detail/ProjectDetailSkeleton';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { fetchProjectDetail } from '@/components/features/project/projectApi';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import { useProjectStore } from '@/components/features/project/store';
import type { ProjectRecord } from '@/types/project';

export default function ProjectDetailPage({ projectId }: { projectId: string }) {
  const projectsById = useProjectStore((state) => state.projectsById);
  const localProject = projectsById[projectId] ?? null;
  const [project, setProject] = useState<ProjectRecord | null>(localProject);
  const [isLoading, setIsLoading] = useState(!localProject);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const recommendedProjects = useMemo(
    () =>
      Object.values(projectsById)
        .filter((item) => item.id !== projectId)
        .slice(0, 4)
        .map((item) => ({
          id: item.id,
          title: item.title,
          imageUrl: item.coverImageUrl,
          category: getProjectCategoryLabel(item.categoryId),
          deadline: item.recruitDeadline,
          currentMembers: item.members.length,
          maxMembers: item.targetMemberCount,
          leader: {
            name: item.members.find((member) => member.isLeader)?.name ?? '팀장',
            avatar:
              item.members.find((member) => member.isLeader)?.avatarUrl ??
              item.members[0]?.avatarUrl ??
              '',
          },
        })),
    [projectId, projectsById],
  );

  useEffect(() => {
    let active = true;

    const loadProject = async () => {
      try {
        if (!localProject) {
          setIsLoading(true);
        }

        const nextProject = await fetchProjectDetail(projectId);

        if (!active) {
          return;
        }

        setProject(nextProject);
        setErrorMessage(null);
      } catch (error) {
        if (!active) {
          return;
        }

        setProject(localProject);

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
        <h1 className="text-3xl font-bold text-text-black">프로젝트를 찾을 수 없어요.</h1>
        <p className="text-base leading-6 text-text-gray">
          {errorMessage ?? '목록으로 돌아가서 다른 프로젝트를 확인해보세요.'}
        </p>
        <AuthLink
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-border-gray bg-white px-5 py-3 text-sm font-bold text-text-gray transition-colors hover:text-text-black"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          프로젝트 목록으로
        </AuthLink>
      </section>
    );
  }

  const leader = project.members.find((member) => member.isLeader) ?? project.members[0];
  const leaderSkillKey = `${project.myInterest.major} - ${project.myInterest.minor}`;
  const leaderSkills = project.leaderTechStacks ?? project.recruitTechStacks[leaderSkillKey] ?? [];

  return (
    <section className="mx-auto w-full max-w-7xl space-y-8 pb-20">
      <AuthLink
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-bold text-text-gray transition-colors hover:text-text-black"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-50">
          <ChevronLeft className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </span>
        목록으로 돌아가기
      </AuthLink>

      <div className="relative h-96 overflow-hidden rounded-4xl bg-text-black px-12 py-8 text-white">
        {project.coverImageUrl ? (
          <img
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            src={project.coverImageUrl}
          />
        ) : null}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-text-black via-label-dark to-label-dark" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="relative z-10 flex h-full flex-col items-start justify-center">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold leading-4 text-white">
              {getProjectCategoryLabel(project.categoryId)}
            </span>
            {project.releasePlatforms.map((releasePlatform) => (
              <span
                key={releasePlatform}
                className="rounded-full border border-brand-400/30 bg-brand-400/30 px-3 py-1 text-xs font-bold leading-4 text-chip-bg"
              >
                {releasePlatform}
              </span>
            ))}
          </div>

          <h1 className="max-w-3xl text-5xl leading-12 font-extrabold">{project.title}</h1>
          <p className="mt-3 text-lg leading-7 font-medium text-divider-soft">{project.summary}</p>

          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-chip-bg backdrop-blur-sm">
            <CalendarDays className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            {project.isRecruitUntilComplete ? '상시 모집' : `${project.recruitDeadline} 마감`}
          </div>
        </div>

        <AuthLink
          href={`/projects/${project.id}/manage`}
          className="absolute right-10 top-8 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          <Settings className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          프로젝트 관리
        </AuthLink>
      </div>

      <div className="grid grid-cols-1 gap-8 pb-14 xl:grid-cols-[minmax(0,1fr)_24rem]">
        <ProjectDetailContent project={project} />

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
                  leaderSkills.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border-gray bg-white px-2.5 py-1 text-xs leading-4 font-medium text-project-status-closed"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="rounded-md border border-border-gray bg-white px-2.5 py-1 text-xs leading-4 font-medium text-project-status-closed">
                    {project.myInterest.major}
                  </span>
                )}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-border-gray bg-white p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-sm font-bold text-text-black">
              <Globe className="h-4 w-4 text-brand-500" aria-hidden strokeWidth={1.8} />
              외부 채널 및 저장소
            </h2>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs leading-4 font-bold text-muted-gray">
                  <span>깃허브 주소</span>
                  <Copy className="h-3.5 w-3.5 text-muted-gray" aria-hidden strokeWidth={1.8} />
                </div>
                <Link
                  href={project.githubUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-brand-50 bg-brand-50 px-4 py-3 text-xs leading-4 font-normal text-text-gray transition-colors hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Github
                      className="h-4 w-4 shrink-0 text-text-black"
                      aria-hidden
                      strokeWidth={1.8}
                    />
                    <span className="truncate">
                      {project.githubUrl || '등록된 링크가 없습니다.'}
                    </span>
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 text-muted-gray"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                </Link>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs leading-4 font-bold text-muted-gray">
                  <span>소통 채널 주소</span>
                  <Copy className="h-3.5 w-3.5 text-muted-gray" aria-hidden strokeWidth={1.8} />
                </div>
                <Link
                  href={project.communicationUrl || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-brand-50 bg-brand-50 px-4 py-3 text-xs leading-4 font-normal text-text-gray transition-colors hover:bg-white"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Link2
                      className="h-4 w-4 shrink-0 text-brand-500"
                      aria-hidden
                      strokeWidth={1.8}
                    />
                    <span className="truncate">
                      {project.communicationUrl || '등록된 링크가 없습니다.'}
                    </span>
                  </span>
                  <ExternalLink
                    className="h-3.5 w-3.5 shrink-0 text-muted-gray"
                    aria-hidden
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
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

      <div className="space-y-8 border-t border-border-gray pt-16">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl leading-8 font-bold text-text-black">
            다른 프로젝트도 확인해보세요
          </h2>
          <AuthLink
            href="/projects"
            className="text-sm leading-5 font-bold text-brand-500 transition-colors hover:text-brand-400"
          >
            전체보기
          </AuthLink>
        </div>

        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {recommendedProjects.map((item) => (
            <li key={item.id}>
              <ProjectCard project={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
