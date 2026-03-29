'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/features/project/create/ProjectForm';
import ProjectManageShell from './ProjectManageShell';
import { useProjectManageStore } from './store';

type ProjectManageEditProps = {
  projectId: string;
};

export default function ProjectManageEdit({ projectId }: ProjectManageEditProps) {
  const router = useRouter();
  const project = useProjectManageStore((state) => state.getProject(projectId));
  const updateProject = useProjectManageStore((state) => state.updateProject);

  if (!project) {
    return (
      <ProjectManageShell projectId={projectId} activeTab="edit">
        <section className="rounded-3xl border border-border-gray bg-white px-8 py-12 text-center shadow-sm">
          <h2 className="text-xl font-bold text-text-black">프로젝트를 찾을 수 없습니다.</h2>
          <p className="mt-2 text-sm text-text-gray">올바른 프로젝트인지 다시 확인해주세요.</p>
        </section>
      </ProjectManageShell>
    );
  }

  return (
    <ProjectManageShell projectId={projectId} activeTab="edit">
      <ProjectForm
        variant="edit"
        initialValues={{
          projectName: project.projectName,
          githubUrl: project.githubUrl,
          communicationUrl: project.communicationUrl,
          categoryId: project.categoryId,
          description: project.description,
          releasePlatforms: project.releasePlatforms,
          myInterest: project.myInterest,
          recruitInterests: project.recruitInterests,
          recruitTechStacks: project.recruitTechStacks,
          recruitDeadline: project.recruitDeadline,
          isRecruitUntilComplete: project.isRecruitUntilComplete,
        }}
        onSubmit={(values) => {
          updateProject(projectId, values);
          router.push(`/projects/${projectId}/manage`);
        }}
      />
    </ProjectManageShell>
  );
}
