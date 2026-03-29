import { Code2 } from 'lucide-react';
import IntroSectionHeading from './IntroSectionHeading';
import IntroTechStackCard from './IntroTechStackCard';

const TECH_STACK_GROUPS = [
  {
    title: '프론트엔드',
    subtitle: '웹프론트엔드',
    skills: ['React', 'TypeScript'],
  },
  {
    title: '백엔드',
    subtitle: 'AI',
    skills: ['Python', 'FastAPI'],
  },
];

export default function ProjectTechStackSection() {
  return (
    <section className="flex w-full flex-col gap-4">
      <IntroSectionHeading
        title="필요 기술 스택"
        icon={<Code2 className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {TECH_STACK_GROUPS.map((group) => (
          <IntroTechStackCard
            key={group.title}
            title={group.title}
            subtitle={group.subtitle}
            skills={group.skills}
          />
        ))}
      </div>
    </section>
  );
}
