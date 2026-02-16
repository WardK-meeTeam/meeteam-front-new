'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import ProjectTabs, { ProjectTabId } from './ProjectTabs';
import ProjectDetail from './ProjectDetail';
import ProjectTechStack, { TechStackCategory } from './ProjectTechStack';

export interface ProjectTabContentProps {
  detailContent: string;
  techStack: TechStackCategory[];
}

export default function ProjectTabContent({ detailContent, techStack }: ProjectTabContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = (searchParams.get('tab') as ProjectTabId) || 'intro';

  const handleTabChange = (tabId: ProjectTabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      <ProjectTabs value={activeTab} onChange={handleTabChange} />
      {activeTab === 'intro' && (
        <>
          <ProjectDetail content={detailContent} />
          <ProjectTechStack categories={techStack} />
        </>
      )}
      {activeTab === 'recruit' && (
        <div className="rounded-xl border border-border-gray bg-white p-8 text-center">
          <p className="text-text-gray">팀원 모집 기능 준비 중입니다.</p>
        </div>
      )}
      {activeTab === 'qa' && (
        <div className="rounded-xl border border-border-gray bg-white p-8 text-center">
          <p className="text-text-gray">Q&A 기능 준비 중입니다.</p>
        </div>
      )}
    </div>
  );
}
