import RequireAuth from '@/components/features/auth/RequireAuth';
import ProfileOverview from '@/components/features/profile/ProfileOverview';

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <RequireAuth>
      <ProfileOverview memberId={Number(userId)} editable={false} actionLabel="제안 보내기" />
    </RequireAuth>
  );
}
