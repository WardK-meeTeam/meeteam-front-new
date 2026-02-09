export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  return (
    <section className="space-y-6 md:space-y-8">
      <h1>프로젝트 {projectId}번 팀원 관리 페이지</h1>
    </section>
  );
}
