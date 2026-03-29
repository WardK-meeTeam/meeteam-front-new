import IntroSkillChip from './IntroSkillChip';

interface IntroTechStackCardProps {
  title: string;
  subtitle: string;
  skills: string[];
}

export default function IntroTechStackCard({ title, subtitle, skills }: IntroTechStackCardProps) {
  return (
    <article className="min-w-0 rounded-xl border border-border-gray bg-white p-5">
      <div className="flex items-center gap-2">
        <h3 className="text-base leading-6 font-bold text-label-dark">{title}</h3>
        <span className="h-3 w-px bg-divider-soft" aria-hidden />
        <span className="text-xs leading-4 font-medium text-text-gray">{subtitle}</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <IntroSkillChip key={skill} label={skill} />
        ))}
      </div>
    </article>
  );
}
