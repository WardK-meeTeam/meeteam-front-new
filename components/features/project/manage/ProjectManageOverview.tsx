'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Crown, Trash2 } from 'lucide-react';
import ProjectManageShell, { ProjectManageNotice } from './ProjectManageShell';
import ProjectMemberRemovalModal from './ProjectMemberRemovalModal';
import { useProjectManageStore } from './store';
import type { ProjectMember } from '@/types/project';

type ProjectManageOverviewProps = {
  projectId: string;
};

export default function ProjectManageOverview({ projectId }: ProjectManageOverviewProps) {
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(null);
  const project = useProjectManageStore((state) => state.getProject(projectId));
  const removeMember = useProjectManageStore((state) => state.removeMember);

  if (!project) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="members">
        <section className="rounded-3xl border border-border-gray bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text-black">프로젝트를 찾을 수 없습니다.</h2>
          <p className="mt-2 text-sm text-text-gray">올바른 프로젝트인지 다시 확인해주세요.</p>
        </section>
      </ProjectManageShell>
    );
  }

  const summaryCards = [
    { label: '현재 멤버', value: `${project.members.length}명` },
    { label: '모집 정원', value: `${project.targetMemberCount}명` },
    {
      label: '대기 중인 지원서',
      value: `${project.applicants.filter((item) => item.status === 'pending').length}건`,
      accent: true,
      href: '/applicants',
    },
  ];

  return (
    <ProjectManageShell projectId={projectId} activeTab="members">
      <div className="space-y-6 md:space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          {summaryCards.map((card) => {
            const content = (
              <article className="rounded-2xl border border-border-gray/40 bg-white p-5 shadow-sm">
                <p className="text-sm leading-5 font-medium text-text-gray">{card.label}</p>
                <div className="mt-1 flex items-center gap-1">
                  <p
                    className={`text-2xl leading-8 font-bold ${
                      card.accent ? 'text-brand-500' : 'text-text-black'
                    }`}
                  >
                    {card.value}
                  </p>
                  {card.href ? (
                    <ChevronRight
                      className="mt-0.5 h-5 w-5 shrink-0 text-brand-500"
                      aria-hidden
                      strokeWidth={2}
                    />
                  ) : null}
                </div>
              </article>
            );

            if (!card.href) {
              return <div key={card.label}>{content}</div>;
            }

            return (
              <Link key={card.label} href={`/projects/${projectId}/manage${card.href}`}>
                {content}
              </Link>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-2xl border border-border-gray/40 bg-white shadow-sm">
          <div className="flex flex-col gap-2 border-b border-border-gray/40 bg-surface-soft/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base leading-6 font-bold text-text-black">팀원 목록</h2>
            <p className="text-xs leading-4 text-text-gray">리더는 방출할 수 없습니다.</p>
          </div>

          <ul>
            {project.members.map((member, index) => (
              <li
                key={member.id}
                className={`${index === 0 ? '' : 'border-t border-border-gray/40'} px-6 py-6`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-border-gray">
                      <Image
                        alt={member.name}
                        className="object-cover"
                        fill
                        sizes="48px"
                        src={member.avatarUrl}
                      />
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-base leading-6 font-bold text-text-black">
                          {member.name}
                        </p>
                        {member.isLeader ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-role-leader-bg px-1.5 py-0.5 text-[10px] leading-4 font-bold text-role-leader-text">
                            <Crown className="h-3 w-3" aria-hidden strokeWidth={1.8} />
                            리더
                          </span>
                        ) : null}
                      </div>
                      <p className="text-sm leading-5 text-text-gray">{member.role}</p>
                    </div>
                  </div>

                  {!member.isLeader ? (
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="inline-flex h-8 items-center justify-center gap-1.5 self-start rounded-lg border border-border-gray bg-white px-3 text-xs leading-4 font-bold text-text-gray shadow-sm transition-colors hover:bg-surface-soft sm:self-auto"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden strokeWidth={1.8} />
                      방출
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ProjectManageNotice />
      </div>

      <ProjectMemberRemovalModal
        isOpen={selectedMember !== null}
        memberName={selectedMember?.name ?? ''}
        onClose={() => setSelectedMember(null)}
        onConfirm={() => {
          if (selectedMember) {
            removeMember(projectId, selectedMember.id);
          }
          setSelectedMember(null);
        }}
      />
    </ProjectManageShell>
  );
}
