import type { ProjectRecord } from '@/types/project';
import ProjectDetailDescriptionSection from './project-intro/ProjectDetailDescriptionSection';
import ProjectTechStackSection from './project-intro/ProjectTechStackSection';

export default function ProjectIntroSection({ project }: { project: ProjectRecord }) {
  const techStackGroups =
    project.recruitmentDetails?.map((recruitment) => ({
      title: recruitment.jobFieldName,
      subtitle: recruitment.jobPositionName,
      skills: recruitment.techStacks,
    })) ??
    project.recruitInterests.map((interest) => ({
      title: interest.major,
      subtitle: interest.minor,
      skills: project.recruitTechStacks[`${interest.major} - ${interest.minor}`] ?? [],
    }));

  return (
    <section className="flex min-w-0 w-full flex-col items-start gap-10" data-node-id="97:510">
      <ProjectDetailDescriptionSection description={project.description} />
      <ProjectTechStackSection groups={techStackGroups} />
    </section>
  );
}
