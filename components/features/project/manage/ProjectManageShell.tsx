'use client';

import { type ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Check, ChevronDown, ChevronLeft, Info, Settings, UserPlus, Users } from 'lucide-react';
import { useProjectManageStore } from './store';
import type { ProjectStatus } from '@/types/project';

type ProjectManageShellProps = {
  projectId: string;
  activeTab: 'members' | 'applicants' | 'edit';
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
    count: 2,
  },
  {
    key: 'edit',
    href: '/edit',
    label: '프로젝트 수정',
    icon: Settings,
  },
];

const STATUS_OPTIONS: Array<{ value: ProjectStatus; label: string }> = [
  { value: 'recruiting', label: '모집 중' },
  { value: 'closed', label: '모집 완료' },
];

export function ProjectManageNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl bg-chip-bg px-4 py-4">
      <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-800" aria-hidden strokeWidth={2} />
      <p className="text-sm leading-5 font-bold text-brand-800">
        모집 인원을 변경하고 싶으신가요?
        <br />
        <span className="font-normal">
          [정보 수정] 탭에서 포지션별 모집 인원을 수정하면 자동으로 반영됩니다.
        </span>
      </p>
    </div>
  );
}

export default function ProjectManageShell({
  projectId,
  activeTab,
  children,
}: ProjectManageShellProps) {
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  const statusMenuRef = useRef<HTMLDivElement>(null);
  const project = useProjectManageStore((state) => state.getProject(projectId));
  const updateProjectStatus = useProjectManageStore((state) => state.updateProjectStatus);
  const pendingApplicants =
    project?.applicants.filter((item) => item.status === 'pending').length ?? 0;
  const projectTitle = project?.title ?? `프로젝트 ${projectId}`;
  const projectSubtitle = project?.subtitle ?? '프로젝트 통합 관리';
  const projectStatus = project?.status ?? 'recruiting';
  const projectStatusLabel = projectStatus === 'closed' ? '모집 완료' : '모집 중';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!statusMenuRef.current?.contains(event.target as Node)) {
        setIsStatusMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <div className="space-y-6 md:space-y-8">
        <header className="flex flex-col gap-5 border-b border-border-gray pb-6 md:gap-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
              <Link
                href={`/projects/${projectId}`}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-gray bg-white text-text-gray shadow-sm transition-colors hover:text-text-black"
                aria-label="프로젝트 상세 페이지로 이동"
              >
                <ChevronLeft className="h-6 w-6" aria-hidden strokeWidth={1.8} />
              </Link>

              <div className="space-y-0.5">
                <h1 className="text-2xl leading-8 font-bold text-text-black">{projectTitle}</h1>
                <p className="text-sm leading-5 text-text-gray">{projectSubtitle}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-sm leading-5 font-bold text-project-status-closed">상태:</span>
              <div className="relative" ref={statusMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsStatusMenuOpen((prev) => !prev)}
                  className={`inline-flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm leading-5 font-bold text-white shadow-md transition-colors ${
                    projectStatus === 'closed'
                      ? 'bg-project-status-closed hover:opacity-95'
                      : 'bg-brand-500 hover:bg-brand-400'
                  }`}
                >
                  {projectStatusLabel}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${isStatusMenuOpen ? 'rotate-180' : ''}`}
                    aria-hidden
                    strokeWidth={2}
                  />
                </button>

                {isStatusMenuOpen ? (
                  <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-32 rounded-2xl border border-border-gray bg-white p-2 shadow-[0_20px_25px_-5px_rgba(15,23,42,0.12),0_8px_10px_-6px_rgba(15,23,42,0.12)]">
                    <ul className="space-y-1">
                      {STATUS_OPTIONS.map((option) => {
                        const isSelected = option.value === projectStatus;
                        const toneClass =
                          option.value === 'closed'
                            ? isSelected
                              ? 'bg-project-status-closed text-white shadow-md'
                              : 'bg-project-status-closed/10 text-project-status-closed hover:bg-project-status-closed/15'
                            : isSelected
                              ? 'bg-brand-500 text-white shadow-md'
                              : 'bg-brand-50 text-brand-500 hover:bg-brand-100';

                        return (
                          <li key={option.value}>
                            <button
                              type="button"
                              onClick={() => {
                                updateProjectStatus(projectId, option.value);
                                setIsStatusMenuOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm leading-5 font-bold transition-colors ${toneClass}`}
                            >
                              <span>{option.label}</span>
                              {isSelected ? (
                                <Check className="h-4 w-4" aria-hidden strokeWidth={2.2} />
                              ) : null}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
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
                        <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-brand-100 px-2 py-0.5 text-[10px] leading-5 font-bold text-brand-500">
                          {pendingApplicants}
                        </span>
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
