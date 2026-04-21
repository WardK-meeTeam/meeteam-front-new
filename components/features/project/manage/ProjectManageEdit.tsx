'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import ProjectForm from '@/components/features/project/create/ProjectForm';
import {
  buildProjectEditPayload,
  fetchProjectEditPrefill,
  type ProjectEditPrefill,
  updateProject,
} from '@/components/features/project/projectApi';
import ProjectManageShell from './ProjectManageShell';
import { ProjectManageEditSkeleton } from './ProjectManageSkeletons';

type ProjectManageEditProps = {
  projectId: string;
};

export default function ProjectManageEdit({ projectId }: ProjectManageEditProps) {
  const router = useRouter();
  const handleAuthRequired = useAuthRequiredModal();
  const [prefill, setPrefill] = useState<ProjectEditPrefill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadPrefill = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const nextPrefill = await fetchProjectEditPrefill(projectId);

        if (!active) {
          return;
        }

        setPrefill(nextPrefill);
      } catch (error) {
        if (!active) {
          return;
        }

        if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/manage/edit` })) {
          setErrorMessage(null);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '프로젝트 수정 정보를 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadPrefill();

    return () => {
      active = false;
    };
  }, [handleAuthRequired, projectId]);

  if (isLoading) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="edit">
        <ProjectManageEditSkeleton />
      </ProjectManageShell>
    );
  }

  if (!prefill) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="edit">
        <section className="rounded-3xl border border-border-gray bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text-black">프로젝트를 찾을 수 없습니다.</h2>
          <p className="mt-2 text-sm text-text-gray">
            {errorMessage ?? '올바른 프로젝트인지 다시 확인해주세요.'}
          </p>
        </section>
      </ProjectManageShell>
    );
  }

  return (
    <ProjectManageShell projectId={projectId} activeTab="edit">
      <ProjectForm
        variant="edit"
        initialValues={prefill.values}
        initialCoverImageUrl={prefill.coverImageUrl}
        editable={prefill.editable}
        notEditableReason={prefill.notEditableReason}
        onSubmit={async (values, { jobFields }) => {
          const payload = buildProjectEditPayload(values, jobFields);
          await updateProject(projectId, payload, values.coverImage);
          router.push(`/projects/${projectId}/manage`);
        }}
      />
    </ProjectManageShell>
  );
}
