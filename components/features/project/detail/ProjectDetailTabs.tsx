import type { ProjectDetailTab } from './ProjectDetailContent';
import ProjectDetailTabButton from './ProjectDetailTabButton';

interface ProjectDetailTabsProps {
  activeTab: ProjectDetailTab;
  onTabChange: (tab: ProjectDetailTab) => void;
}

const TABS: Array<{ key: ProjectDetailTab; label: string }> = [
  { key: 'intro', label: '프로젝트 소개' },
  { key: 'recruit', label: '팀원 모집' },
  { key: 'qna', label: 'Q&A' },
];

export default function ProjectDetailTabs({ activeTab, onTabChange }: ProjectDetailTabsProps) {
  return (
    <div className="w-full overflow-x-auto border-b border-border-gray bg-white pt-2 pb-px">
      <nav className="flex min-w-max items-start gap-6">
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;

          return (
            <ProjectDetailTabButton
              key={tab.key}
              tab={tab.key}
              label={tab.label}
              isActive={isActive}
              onSelect={onTabChange}
            />
          );
        })}
      </nav>
    </div>
  );
}
