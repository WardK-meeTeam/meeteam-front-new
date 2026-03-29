'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, Info, Settings, UserPlus, Users } from 'lucide-react';
import { useProjectManageStore } from './store';

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
  const project = useProjectManageStore((state) => state.getProject(projectId));
  const pendingApplicants =
    project?.applicants.filter((item) => item.status === 'pending').length ?? 0;
  const projectTitle = project?.title ?? `프로젝트 ${projectId}`;
  const projectSubtitle = project?.subtitle ?? '프로젝트 통합 관리';
  const projectStatus = project?.status === 'closed' ? '모집 완료' : '모집 중';

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
              <button
                type="button"
                className="inline-flex items-center gap-3 rounded-xl bg-brand-500 px-4 py-2.5 text-sm leading-5 font-bold text-white shadow-md transition-colors hover:bg-brand-400"
              >
                {projectStatus}
                <ChevronDown className="h-4 w-4" aria-hidden strokeWidth={2} />
              </button>
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
