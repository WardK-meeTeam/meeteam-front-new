import { Code2 } from 'lucide-react';
import IntroSectionHeading from './IntroSectionHeading';
import IntroTechStackCard from './IntroTechStackCard';

export default function ProjectTechStackSection({
  groups,
}: {
  groups: Array<{ title: string; subtitle: string; skills: string[] }>;
}) {
  return (
    <section className="flex w-full flex-col gap-4">
      <IntroSectionHeading
        title="필요 기술 스택"
        icon={<Code2 className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {groups.map((group) => (
          <IntroTechStackCard
            key={`${group.title}-${group.subtitle}`}
            title={group.title}
            subtitle={group.subtitle}
            skills={group.skills}
          />
        ))}
      </div>
    </section>
  );
}
