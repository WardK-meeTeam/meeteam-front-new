export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string; applicationId: string }>;
}) {
  const { projectId, applicationId } = await params;

  return (
    <section className="space-y-6 md:space-y-8">
      <h1>
        프로젝트 {projectId}번 지원서 {applicationId}번 상세 페이지
      </h1>
    </section>
  );
}
