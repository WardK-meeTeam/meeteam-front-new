import Link from 'next/link';
import { ProjectCard } from '@/components/features/project/ProjectCard';

type ProjectForCard = React.ComponentProps<typeof ProjectCard>['project'];

export interface RelatedProjectsProps {
  projects: ProjectForCard[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  return (
    <section className="border-t border-border-gray pt-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-black">다른 프로젝트도 확인해보세요</h2>
        <Link
          href="/projects"
          className="text-sm font-bold text-brand-500 transition-colors hover:text-brand-600"
        >
          전체보기
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
