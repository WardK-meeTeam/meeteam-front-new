import ProjectDetail from './ProjectDetail';
import ProjectTechStack, { TechStackCategory } from './ProjectTechStack';
import { ProjectTabId } from './ProjectTabs';

export interface ProjectTabContentProps {
  activeTab: ProjectTabId;
  detailContent: string;
  techStack: TechStackCategory[];
}

export default function ProjectTabContent({
  activeTab,
  detailContent,
  techStack,
}: ProjectTabContentProps) {
  return (
    <div className="space-y-8">
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
