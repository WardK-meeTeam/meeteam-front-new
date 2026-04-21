'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Settings, UserPlus, Users } from 'lucide-react';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import {
  fetchProjectDetail,
  fetchProjectTeamManagement,
  toggleProjectRecruitmentStatus,
} from '@/components/features/project/projectApi';
import SkeletonBlock from '@/components/shared/SkeletonBlock';
import ToastMessage from '@/components/shared/ToastMessage';
import type { ProjectRecruitmentStatus } from '@/types/project';

type ProjectManageShellProps = {
  projectId: string;
  activeTab: 'members' | 'applicants' | 'edit';
  pendingApplicantsCount?: number;
  children: ReactNode;
};

type ManageTab = {
  key: ProjectManageShellProps['activeTab'];
  href: string;
  label: string;
  icon: typeof Users;
  count?: number;
};

const TABS: ManageTab[] = [
  {
    key: 'members',
    href: '',
    label: '팀원 관리',
    icon: Users,
  },
  {
    key: 'applicants',
    href: '/applicants',
    label: '지원자 관리',
    icon: UserPlus,
    count: 0,
  },
  {
    key: 'edit',
    href: '/edit',
    label: '프로젝트 수정',
    icon: Settings,
  },
];

const STATUS_COPY: Record<ProjectRecruitmentStatus, { label: string; actionLabel?: string }> = {
  RECRUITING: { label: '모집 중', actionLabel: '모집 중단' },
  SUSPENDED: { label: '모집 중단', actionLabel: '모집 재개' },
  CLOSED: { label: '모집 완료' },
};

type ProjectManageHeader = {
  title: string;
  status: ProjectRecruitmentStatus;
  pendingApplicants: number;
};

const projectManageHeaderCache = new Map<string, ProjectManageHeader>();

export default function ProjectManageShell({
  projectId,
  activeTab,
  pendingApplicantsCount,
  children,
}: ProjectManageShellProps) {
  const handleAuthRequired = useAuthRequiredModal();
  const cachedHeader = projectManageHeaderCache.get(projectId);
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [isHeaderLoading, setIsHeaderLoading] = useState(!cachedHeader);
  const [projectTitle, setProjectTitle] = useState(cachedHeader?.title ?? '');
  const [projectStatus, setProjectStatus] = useState<ProjectRecruitmentStatus>(
    cachedHeader?.status ?? 'RECRUITING',
  );
  const [pendingApplicants, setPendingApplicants] = useState(cachedHeader?.pendingApplicants ?? 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const statusCopy = STATUS_COPY[projectStatus];
  const canToggleStatus = projectStatus !== 'CLOSED' && Boolean(statusCopy.actionLabel);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!statusMenuRef.current?.contains(event.target as Node)) {
        setIsStatusMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let active = true;

    const loadManageHeader = async () => {
      const nextCachedHeader = projectManageHeaderCache.get(projectId);

      if (nextCachedHeader) {
        setProjectTitle(nextCachedHeader.title);
        setProjectStatus(nextCachedHeader.status);
        setPendingApplicants(pendingApplicantsCount ?? nextCachedHeader.pendingApplicants);
        setIsHeaderLoading(false);
      } else {
        setIsHeaderLoading(true);
      }

      try {
        setErrorMessage(null);

        const [project, team] = await Promise.all([
          fetchProjectDetail(projectId),
          fetchProjectTeamManagement(projectId),
        ]);

        if (!active) {
          return;
        }

        const nextHeader = {
          title: project.title,
          status: project.recruitmentStatus ?? 'RECRUITING',
          pendingApplicants: team.pendingApplicationCount,
        } satisfies ProjectManageHeader;

        projectManageHeaderCache.set(projectId, nextHeader);
        setProjectTitle(nextHeader.title);
        setProjectStatus(nextHeader.status);
        setPendingApplicants(pendingApplicantsCount ?? nextHeader.pendingApplicants);
      } catch (error) {
        if (!active) {
          return;
        }

        if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage` })) {
          setErrorMessage(null);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '프로젝트 관리 정보를 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsHeaderLoading(false);
        }
      }
    };

    void loadManageHeader();

    return () => {
      active = false;
    };
  }, [handleAuthRequired, pendingApplicantsCount, projectId]);

  useEffect(() => {
    if (typeof pendingApplicantsCount === 'number') {
      setPendingApplicants(pendingApplicantsCount);
      const cached = projectManageHeaderCache.get(projectId);

      if (cached) {
        projectManageHeaderCache.set(projectId, {
          ...cached,
          pendingApplicants: pendingApplicantsCount,
        });
      }
    }
  }, [pendingApplicantsCount, projectId]);

  const handleToggleStatus = async () => {
    if (!canToggleStatus || isStatusUpdating) {
      setIsStatusMenuOpen(false);
      return;
    }

    try {
      setIsStatusUpdating(true);
      setErrorMessage(null);

      const nextStatus = await toggleProjectRecruitmentStatus(projectId);

      setProjectStatus(nextStatus.recruitmentStatus);
      const cached = projectManageHeaderCache.get(projectId);

      if (cached) {
        projectManageHeaderCache.set(projectId, {
          ...cached,
          status: nextStatus.recruitmentStatus,
        });
      }

      setIsStatusMenuOpen(false);
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage` })) {
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : '모집 상태 변경 중 오류가 발생했습니다.',
      );
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="space-y-6 md:space-y-8">
        <ToastMessage message={errorMessage} />

        <header className="flex flex-col gap-5 border-b border-border-gray pb-6 md:gap-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="space-y-0.5">
              {isHeaderLoading ? (
                <SkeletonBlock className="h-8 w-64 max-w-full" />
              ) : (
                <h1 className="text-2xl leading-8 font-bold text-text-black">{projectTitle}</h1>
              )}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-sm leading-5 font-bold text-project-status-closed">상태:</span>
              <div className="relative" ref={statusMenuRef}>
                {isHeaderLoading ? (
                  <SkeletonBlock className="h-10 w-28 rounded-xl" />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsStatusMenuOpen((prev) => !prev)}
                    disabled={isStatusUpdating}
                    className={`inline-flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm leading-5 font-bold text-white shadow-md transition-colors ${
                      projectStatus === 'CLOSED'
                        ? 'bg-project-status-closed hover:opacity-95'
                        : 'bg-brand-500 hover:bg-brand-400'
                    } disabled:cursor-not-allowed disabled:opacity-70`}
                  >
                    {isStatusUpdating ? '변경 중' : statusCopy.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${isStatusMenuOpen ? 'rotate-180' : ''}`}
                      aria-hidden
                      strokeWidth={2}
                    />
                  </button>
                )}

                {isStatusMenuOpen && !isHeaderLoading ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-32 rounded-2xl border border-border-gray bg-white p-2 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.12)]">
                    <button
                      type="button"
                      onClick={handleToggleStatus}
                      disabled={!canToggleStatus || isStatusUpdating}
                      className="flex w-full items-center justify-between rounded-xl bg-brand-50 px-4 py-2.5 text-sm leading-5 font-bold text-brand-500 transition-colors hover:bg-brand-100 disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-text-gray"
                    >
                      {statusCopy.actionLabel ?? '변경 불가'}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <nav className="-mb-6 overflow-x-auto">
            <ul className="flex min-w-max items-center">
              {TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.key === activeTab;

                return (
                  <li key={tab.label}>
                    <Link
                      href={`/projects/${projectId}/manage${tab.href}`}
                      className={`inline-flex items-center gap-2 border-b-2 px-6 py-3.5 text-sm leading-5 font-bold transition-colors ${
                        isActive
                          ? 'border-brand-500 text-brand-500'
                          : 'border-transparent text-text-gray hover:text-text-black'
                      }`}
                    >
                      <Icon className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                      <span>{tab.label}</span>
                      {typeof tab.count === 'number' ? (
                        isHeaderLoading ? (
                          <SkeletonBlock className="h-5 w-6 rounded-full" />
                        ) : (
                          <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] leading-5 font-bold text-brand-500">
                            {pendingApplicants}
                          </span>
                        )
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </header>

        {children}
      </div>
    </section>
  );
}
