import ProjectDetailDescriptionSection from './project-intro/ProjectDetailDescriptionSection';
import ProjectTechStackSection from './project-intro/ProjectTechStackSection';

export default function ProjectIntroSection() {
  return (
    <section className="flex w-full flex-col items-start gap-10" data-node-id="97:510">
      <ProjectDetailDescriptionSection />
      <ProjectTechStackSection />
    </section>
  );
}
