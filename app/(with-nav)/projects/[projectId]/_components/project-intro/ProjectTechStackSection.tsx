import { ChevronsLeftRight } from 'lucide-react';
import IntroSectionHeading from './IntroSectionHeading';
import IntroTechStackCard from './IntroTechStackCard';

type StackGroup = {
  field: string;
  role: string;
  skills: string[];
};

const STACK_GROUPS: StackGroup[] = [
  {
    field: '프론트엔드',
    role: '웹프론트엔드',
    skills: ['React', 'TypeScript'],
  },
  {
    field: '백엔드',
    role: 'AI',
    skills: ['Python', 'FastAPI'],
  },
];

export default function ProjectTechStackSection() {
  return (
    <article className="flex w-full flex-col items-start gap-4" data-node-id="97:521">
      <IntroSectionHeading
        icon={<ChevronsLeftRight className="h-5 w-5" aria-hidden strokeWidth={1.8} />}
        title="필요 기술 스택"
      />

      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2" data-node-id="97:527">
        {STACK_GROUPS.map((group) => (
          <IntroTechStackCard key={group.field} {...group} />
        ))}
      </div>
    </article>
  );
}
