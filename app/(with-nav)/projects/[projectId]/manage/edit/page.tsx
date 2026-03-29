import ProjectManageEdit from '@/components/features/project/manage/ProjectManageEdit';

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <ProjectManageEdit projectId={projectId} />;
}
