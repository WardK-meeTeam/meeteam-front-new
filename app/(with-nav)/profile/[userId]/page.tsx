import ProfileOverview from '@/components/features/profile/ProfileOverview';

export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  await params;

  return <ProfileOverview editable={false} actionLabel="제안 보내기" emptyProject />;
}
