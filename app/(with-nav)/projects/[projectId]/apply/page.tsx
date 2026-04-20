import RequireAuth from '@/components/features/auth/RequireAuth';
import ProjectApplyPage from '@/components/features/project/apply/ProjectApplyPage';

export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <RequireAuth>
      <ProjectApplyPage projectId={projectId} />
    </RequireAuth>
  );
}
