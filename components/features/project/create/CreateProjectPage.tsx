'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from '@/components/features/project/create/ProjectForm';
import { useProjectStore } from '@/components/features/project/store';

export default function CreateProjectPage() {
  const router = useRouter();
  const createProject = useProjectStore((state) => state.createProject);

  return (
    <ProjectForm
      variant="create"
      onSubmit={(values) => {
        const projectId = createProject(values);
        router.push(`/projects/${projectId}`);
      }}
    />
  );
}
