import { Suspense } from 'react';
import ProjectHero from '@/components/features/project/ProjectHero';
import ProjectLeaderCard from '@/components/features/project/ProjectLeaderCard';
import ProjectExternalLinks from '@/components/features/project/ProjectExternalLinks';
import ProjectTabContent from '@/components/features/project/ProjectTabContent';
import RelatedProjects from '@/components/features/project/RelatedProjects';
import ProjectTabs, { ProjectTabId } from '@/components/features/project/ProjectTabs';
import BaseButton from '@/components/shared/BaseButton';
import { Heart, Share2 } from 'lucide-react';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ projectId: string }>;
  searchParams: Promise<{ tab?: string }>;
}) {
  const { projectId } = await params;
  const { tab } = await searchParams;
  const activeTab = (tab as ProjectTabId) || 'intro';

  const cat_image =
    'data:image/jpeg;base64,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';
  // TODO: API에서 데이터 가져오기
  const projectData = {
    title: 'AI 기반 뉴스 요약 서비스 개발',
    description: '바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다.',
    category: 'AI/테크',
    type: 'WEB',
    deadline: '2026-01-23 마감',
    isOwner: true,
    detailContent:
      '바쁜 현대인을 위한 3줄 뉴스 요약 서비스입니다. AI를 활용해 뉴스 본문을 요약하고, 사용자 맞춤 피드를 제공합니다.',
    techStack: [
      { domain: '프론트엔드', subdomain: '웹프론트엔드', skills: ['React', 'TypeScript'] },
      { domain: '백엔드', subdomain: 'AI', skills: ['Python', 'FastAPI'] },
    ],
    leader: {
      name: '정연준',
      profile_img: cat_image,
      role: 'Frontend Dev',
      skills: ['React', 'Next.js'],
    },
  };

  // TODO: API에서 관련 프로젝트 목록 가져오기
  const relatedProjects = [
    {
      id: '2',
      title: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
      imageUrl: cat_image,
      category: '여행',
      deadline: '2026-01-23',
      currentMembers: 3,
      maxMembers: 5,
      leader: { name: '김민수', avatar: cat_image },
      tags: ['React', 'Next.js'],
      recruitInfo: [
        { id: 1, role: '백엔드', subRoles: ['Node.js'], status: 'open', current: 1, max: 1 },
        { id: 2, role: '디자이너', status: 'open', current: 0, max: 1 },
      ],
    },
    {
      id: '3',
      title: '친환경 라이프스타일 앱',
      imageUrl: cat_image,
      category: '친환경',
      deadline: '2026-02-01',
      currentMembers: 2,
      maxMembers: 4,
      leader: { name: '이서연', avatar: cat_image },
      tags: ['Flutter', 'Firebase'],
      recruitInfo: [{ id: 1, role: '프론트엔드', status: 'open', current: 1, max: 2 }],
    },
    {
      id: '4',
      title: '여행 로컬 가이드 플랫폼',
      imageUrl: cat_image,
      category: '여행',
      deadline: '2026-01-30',
      currentMembers: 4,
      maxMembers: 6,
      leader: { name: '박지훈', avatar: cat_image },
      tags: ['React Native'],
      recruitInfo: [
        { id: 1, role: '백엔드', status: 'open', current: 1, max: 2 },
        { id: 2, role: '마케팅', status: 'closed', current: 1, max: 1 },
      ],
    },
  ];

  return (
    <section className="space-y-6 md:space-y-8">
      <ProjectHero
        title={projectData.title}
        description={projectData.description}
        category={projectData.category}
        type={projectData.type}
        deadline={projectData.deadline}
        isOwner={projectData.isOwner}
      />
      <div className="sticky top-0 z-100 bg-white">
        <Suspense fallback={<div className="h-10" />}>
          <ProjectTabs />
        </Suspense>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <ProjectTabContent
          activeTab={activeTab}
          detailContent={projectData.detailContent}
          techStack={projectData.techStack}
        />
        <aside className="space-y-6 lg:sticky lg:top-22">
          <ProjectLeaderCard leader={projectData.leader} />
          <ProjectExternalLinks
            githubUrl="github.com/meeteam/meeteam-web"
            chatUrl="open.kakao.com/o/meeteam_main"
          />
          <div className="flex gap-3">
            <BaseButton
              className="flex-1"
              variant="secondary"
              size="XL"
              leftIcon={<Heart className="h-5 w-5 text-text-gray" />}
            >
              24
            </BaseButton>
            <BaseButton
              variant="secondary"
              size="XL"
              leftIcon={<Share2 className="h-5 w-5 text-text-gray" />}
            />
          </div>
        </aside>
        <RelatedProjects projects={relatedProjects} />
      </div>
    </section>
  );
}
