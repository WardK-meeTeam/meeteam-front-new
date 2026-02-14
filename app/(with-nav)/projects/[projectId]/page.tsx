import ProjectHero from '@/components/features/project/ProjectHero';

export default async function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;

  // TODO: API에서 데이터 가져오기
  const projectData = {
    title: 'AI 기반 뉴스 요약 서비스 개발',
    description: '바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다.',
    category: 'AI/테크',
    type: 'WEB',
    deadline: '2026-01-23 마감',
    isOwner: true,
  };

  return (
    <section className="space-y-6 md:space-y-8">
      <ProjectHero
        projectId={projectId}
        title={projectData.title}
        description={projectData.description}
        category={projectData.category}
        type={projectData.type}
        deadline={projectData.deadline}
        isOwner={projectData.isOwner}
      />
    </section>
  );
}
