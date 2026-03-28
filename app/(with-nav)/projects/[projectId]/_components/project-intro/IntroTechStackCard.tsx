import IntroSkillChip from './IntroSkillChip';

interface IntroTechStackCardProps {
  field: string;
  role: string;
  skills: string[];
}

export default function IntroTechStackCard({ field, role, skills }: IntroTechStackCardProps) {
  return (
    <div className="flex min-h-px min-w-px flex-1 flex-col gap-3 self-stretch rounded-2xl border border-border-gray bg-white p-5">
      <div className="w-full">
        <div className="flex w-full items-center gap-2">
          <p className="text-base leading-6 font-bold text-label-dark">{field}</p>
          <span className="h-3 w-px bg-divider-soft" aria-hidden />
          <p className="text-xs leading-4 font-medium text-text-gray">{role}</p>
        </div>
      </div>

      <div className="flex min-h-7 w-full flex-wrap items-start gap-x-2 gap-y-0">
        {skills.map((skill) => (
          <IntroSkillChip key={skill} label={skill} />
        ))}
      </div>
    </div>
  );
}
