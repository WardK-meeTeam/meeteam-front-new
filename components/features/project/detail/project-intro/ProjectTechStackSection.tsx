import IntroSectionHeading from './IntroSectionHeading';
import IntroTechStackCard from './IntroTechStackCard';

const TECH_STACK_GROUPS = [
  {
    title: '프론트엔드',
    skills: ['React', 'Next.js', 'Tailwind CSS'],
  },
  {
    title: '백엔드',
    skills: ['Node.js', 'NestJS', 'PostgreSQL'],
  },
];

export default function ProjectTechStackSection() {
  return (
    <section className="flex w-full flex-col gap-5">
      <IntroSectionHeading title="기술 스택" />
      <div className="grid gap-4 md:grid-cols-2">
        {TECH_STACK_GROUPS.map((group) => (
          <IntroTechStackCard key={group.title} title={group.title} skills={group.skills} />
        ))}
      </div>
    </section>
  );
}
