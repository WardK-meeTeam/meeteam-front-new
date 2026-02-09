export default async function Page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  return (
    <section className="space-y-6 md:space-y-8">
      <h1>사용자 {userId}번 프로필 페이지</h1>
    </section>
  );
}
