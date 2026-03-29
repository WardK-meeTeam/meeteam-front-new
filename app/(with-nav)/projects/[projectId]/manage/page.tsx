import ProjectManageOverview from '@/components/features/project/manage/ProjectManageOverview';

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <ProjectManageOverview projectId={projectId} />;
}
