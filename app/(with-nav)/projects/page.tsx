import RequireAuth from '@/components/features/auth/RequireAuth';
import ProjectFindPage from '@/components/features/project/find/ProjectFindPage';

export default function Page() {
  return (
    <RequireAuth>
      <ProjectFindPage />
    </RequireAuth>
  );
}
