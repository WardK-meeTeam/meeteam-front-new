'use client';

import { useState } from 'react';
import type { ProjectRecord } from '@/types/project';
import ProjectDetailTabs from './ProjectDetailTabs';
import ProjectIntroSection from './ProjectIntroSection';
import ProjectQnaSection from './ProjectQnaSection';
import ProjectRecruitSection from './ProjectRecruitSection';

export type ProjectDetailTab = 'intro' | 'recruit' | 'qna';

export default function ProjectDetailContent({ project }: { project: ProjectRecord }) {
  const [activeTab, setActiveTab] = useState<ProjectDetailTab>('intro');

  return (
    <div className="min-w-0 space-y-8">
      <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'intro' && <ProjectIntroSection project={project} />}
      {activeTab === 'recruit' && <ProjectRecruitSection project={project} />}
      {activeTab === 'qna' && <ProjectQnaSection project={project} />}
    </div>
  );
}
