import ProjectDetailPage from '@/components/features/project/detail/ProjectDetailPage';

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  return <ProjectDetailPage projectId={projectId} />;
}
