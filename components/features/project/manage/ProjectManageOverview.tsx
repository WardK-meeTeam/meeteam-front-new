'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { ChevronRight, Crown, Trash2 } from 'lucide-react';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import {
  expelProjectMember,
  fetchProjectTeamManagement,
  type ProjectTeamManagement,
} from '@/components/features/project/projectApi';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import ProjectManageShell, { ProjectManageNotice } from './ProjectManageShell';
import { ProjectManageOverviewSkeleton } from './ProjectManageSkeletons';
import ProjectMemberRemovalModal from './ProjectMemberRemovalModal';
import type { ProjectMember } from '@/types/project';

type ProjectManageOverviewProps = {
  projectId: string;
};

export default function ProjectManageOverview({ projectId }: ProjectManageOverviewProps) {
  const handleAuthRequired = useAuthRequiredModal();
  const [teamManagement, setTeamManagement] = useState<ProjectTeamManagement | null>(null);
  const [selectedMember, setSelectedMember] = useState<ProjectMember | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadTeamManagement = useCallback(async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const nextTeamManagement = await fetchProjectTeamManagement(projectId);

      setTeamManagement(nextTeamManagement);
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage` })) {
        setErrorMessage(null);
        return;
      }

      setErrorMessage(
        error instanceof Error ? error.message : '팀원 관리 정보를 불러오지 못했습니다.',
      );
      setTeamManagement(null);
    } finally {
      setIsLoading(false);
    }
  }, [handleAuthRequired, projectId]);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const nextTeamManagement = await fetchProjectTeamManagement(projectId);

        if (!active) {
          return;
        }

        setTeamManagement(nextTeamManagement);
      } catch (error) {
        if (!active) {
          return;
        }

        if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage` })) {
          setErrorMessage(null);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '팀원 관리 정보를 불러오지 못했습니다.',
        );
        setTeamManagement(null);
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void load();

    return () => {
      active = false;
    };
  }, [handleAuthRequired, projectId]);

  const handleConfirmRemoval = async () => {
    if (!selectedMember || isRemoving) {
      return;
    }

    try {
      setIsRemoving(true);
      setErrorMessage(null);

      await expelProjectMember(projectId, selectedMember.id);
      await loadTeamManagement();
      setSelectedMember(null);
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage` })) {
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : '팀원 방출 중 오류가 발생했습니다.');
    } finally {
      setIsRemoving(false);
    }
  };

  if (isLoading && !teamManagement) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="members">
        <ProjectManageOverviewSkeleton />
      </ProjectManageShell>
    );
  }

  if (!teamManagement) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="members">
        <section className="rounded-3xl border border-border-gray bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text-black">팀원 정보를 불러오지 못했습니다.</h2>
          <p className="mt-2 text-sm text-text-gray">
            {errorMessage ?? '올바른 프로젝트인지 다시 확인해주세요.'}
          </p>
        </section>
      </ProjectManageShell>
    );
  }

  const summaryCards = [
    { label: '현재 멤버', value: `${teamManagement.currentMemberCount}명` },
    { label: '모집 정원', value: `${teamManagement.totalRecruitmentCount}명` },
    {
      label: '대기 중인 지원서',
      value: `${teamManagement.pendingApplicationCount}건`,
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

          {errorMessage ? (
            <p className="border-b border-border-gray/40 bg-danger-soft px-6 py-3 text-sm leading-5 font-medium text-danger-500">
              {errorMessage}
            </p>
          ) : null}

          <ul>
            {teamManagement.members.map((member, index) => (
              <li
                key={member.id}
                className={`${index === 0 ? '' : 'border-t border-border-gray/40'} px-6 py-6`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <ProfileAvatar
                      name={member.name}
                      imageUrl={member.avatarUrl}
                      sizeClassName="h-12 w-12"
                      textClassName="text-sm"
                      className="bg-border-gray text-text-gray"
                    />

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
                      <p className="text-sm leading-5 text-text-gray">
                        {member.role || '포지션 미지정'}
                      </p>
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

          {teamManagement.members.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm leading-6 text-text-gray">
              아직 참여 중인 팀원이 없습니다.
            </div>
          ) : null}
        </div>

        <ProjectManageNotice />
      </div>

      <ProjectMemberRemovalModal
        isOpen={selectedMember !== null}
        isSubmitting={isRemoving}
        memberName={selectedMember?.name ?? ''}
        onClose={() => setSelectedMember(null)}
        onConfirm={handleConfirmRemoval}
      />
    </ProjectManageShell>
  );
}
