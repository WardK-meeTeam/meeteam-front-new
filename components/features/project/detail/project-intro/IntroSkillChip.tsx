interface IntroSkillChipProps {
  label: string;
}

export default function IntroSkillChip({ label }: IntroSkillChipProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-border-gray bg-white px-3 py-1 text-sm leading-5 font-medium text-project-status-closed">
      {label}
    </span>
  );
}
