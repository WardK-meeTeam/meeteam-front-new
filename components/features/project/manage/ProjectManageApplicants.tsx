'use client';

import Image from 'next/image';
import { CalendarDays, CheckCircle2, ExternalLink, Mail, XCircle } from 'lucide-react';
import ProjectManageShell, { ProjectManageNotice } from './ProjectManageShell';
import { useState } from 'react';
import ProjectApplicantDetailModal from './ProjectApplicantDetailModal';
import { useProjectManageStore } from './store';
import type { ProjectApplicant } from '@/types/project';

type ProjectManageApplicantsProps = {
  projectId: string;
};

export default function ProjectManageApplicants({ projectId }: ProjectManageApplicantsProps) {
  const [selectedApplicant, setSelectedApplicant] = useState<ProjectApplicant | null>(null);
  const project = useProjectManageStore((state) => state.getProject(projectId));
  const approveApplicant = useProjectManageStore((state) => state.approveApplicant);
  const rejectApplicant = useProjectManageStore((state) => state.rejectApplicant);

  if (!project) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="applicants">
        <section className="rounded-3xl border border-border-gray bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text-black">프로젝트를 찾을 수 없습니다.</h2>
          <p className="mt-2 text-sm text-text-gray">올바른 프로젝트인지 다시 확인해주세요.</p>
        </section>
      </ProjectManageShell>
    );
  }

  const pendingApplicants = project.applicants.filter((item) => item.status === 'pending');

  return (
    <ProjectManageShell projectId={projectId} activeTab="applicants">
      <div className="space-y-6">
        <section className="overflow-hidden rounded-2xl border border-border-gray/40 bg-white shadow-sm">
          <header className="border-b border-border-gray/40 bg-surface-soft/50 px-6 py-4">
            <h2 className="text-base leading-6 font-bold text-text-black">
              지원자 목록 <span className="ml-1 text-brand-500">{pendingApplicants.length}</span>
            </h2>
          </header>

          {pendingApplicants.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-base font-bold text-text-black">대기 중인 지원자가 없습니다.</p>
              <p className="mt-2 text-sm text-text-gray">
                새로운 지원이 들어오면 이곳에서 검토할 수 있습니다.
              </p>
            </div>
          ) : (
            <ul>
              {pendingApplicants.map((applicant, index) => (
                <li
                  key={applicant.id}
                  className={`${index === 0 ? '' : 'border-t border-border-gray/40'} px-6 py-6`}
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="flex min-w-0 gap-4 lg:w-[200px]">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-border-gray">
                        <Image
                          alt={applicant.name}
                          className="object-cover"
                          fill
                          sizes="56px"
                          src={applicant.avatarUrl}
                        />
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <p className="truncate text-[28px] leading-7 font-bold tracking-[-0.01em] text-text-black">
                          {applicant.name}
                        </p>
                        <p className="text-sm leading-5 font-bold text-brand-500">
                          {applicant.position}
                        </p>
                        <p className="text-xs leading-4 text-text-gray">{applicant.specialty}</p>
                      </div>
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-4 text-text-gray">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
                          {applicant.appliedAt}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
                          {applicant.email}
                        </span>
                      </div>

                      <div className="rounded-xl bg-surface-soft px-3 py-3 text-sm leading-[22.75px] text-text-body">
                        "{applicant.introduction}"
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setSelectedApplicant(applicant)}
                          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border-gray bg-white px-4 text-sm leading-5 font-bold text-project-status-closed transition-colors hover:bg-surface-soft"
                        >
                          <ExternalLink className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                          상세 보기
                        </button>

                        <div className="h-6 w-px bg-border-gray" aria-hidden />

                        <button
                          type="button"
                          onClick={() => approveApplicant(projectId, applicant.id)}
                          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-4 text-sm leading-5 font-bold text-white shadow-sm transition-colors hover:bg-brand-400"
                        >
                          <CheckCircle2 className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                          승인
                        </button>

                        <button
                          type="button"
                          onClick={() => rejectApplicant(projectId, applicant.id)}
                          className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-border-gray bg-white px-4 text-sm leading-5 font-bold text-red-500 transition-colors hover:bg-surface-soft"
                        >
                          <XCircle className="h-4 w-4" aria-hidden strokeWidth={1.8} />
                          거절
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <ProjectManageNotice />
      </div>

      <ProjectApplicantDetailModal
        applicant={selectedApplicant}
        isOpen={selectedApplicant !== null}
        onClose={() => setSelectedApplicant(null)}
      />
    </ProjectManageShell>
  );
}
