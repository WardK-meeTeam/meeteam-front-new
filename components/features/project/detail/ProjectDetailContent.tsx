'use client';

import { useState } from 'react';
import ProjectDetailTabs from './ProjectDetailTabs';
import ProjectIntroSection from './ProjectIntroSection';
import ProjectQnaSection from './ProjectQnaSection';
import ProjectRecruitSection from './ProjectRecruitSection';

export type ProjectDetailTab = 'intro' | 'recruit' | 'qna';

export default function ProjectDetailContent({ projectId }: { projectId: string }) {
  const [activeTab, setActiveTab] = useState<ProjectDetailTab>('intro');

  return (
    <div className="min-w-0 space-y-8">
      <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'intro' && <ProjectIntroSection />}
      {activeTab === 'recruit' && <ProjectRecruitSection projectId={projectId} />}
      {activeTab === 'qna' && <ProjectQnaSection />}
    </div>
  );
}
