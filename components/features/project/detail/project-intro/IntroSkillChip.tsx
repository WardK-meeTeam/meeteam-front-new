interface IntroSkillChipProps {
  label: string;
}

export default function IntroSkillChip({ label }: IntroSkillChipProps) {
  return (
    <span className="inline-flex items-center rounded-lg bg-chip-bg px-2.5 py-1 text-sm leading-5 font-bold text-brand-700">
      {label}
    </span>
  );
}
