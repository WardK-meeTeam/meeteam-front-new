import IntroSkillChip from './IntroSkillChip';

interface IntroTechStackCardProps {
  title: string;
  skills: string[];
}

export default function IntroTechStackCard({ title, skills }: IntroTechStackCardProps) {
  return (
    <article className="rounded-2xl border border-border-gray bg-white p-5 shadow-sm">
      <h3 className="text-lg leading-7 font-bold text-text-black">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <IntroSkillChip key={skill} label={skill} />
        ))}
      </div>
    </article>
  );
}
