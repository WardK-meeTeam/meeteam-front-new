import { ReactNode } from 'react';

interface CategoryBoxProps {
  icon?: ReactNode;
  label: string;
  selected?: boolean;
  dataCy?: string;
  onClick: () => void;
}

export default function CategoryBox({
  icon,
  label,
  selected = false,
  dataCy,
  onClick,
}: CategoryBoxProps) {
  const selectedClass = selected
    ? 'border-2 border-mt-primary bg-mt-badge-bg'
    : 'border border-mt-border';

  return (
    <button
      type="button"
      onClick={onClick}
      data-cy={dataCy}
      className={`flex h-23 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl px-4 py-4 text-center text-mt-text-nav transition-colors hover:border-2 hover:border-mt-primary hover:bg-mt-badge-bg ${selectedClass}`}
      aria-pressed={selected}
    >
      <span className="text-2xl leading-8">{icon}</span>
      <span className="text-sm font-medium leading-5">{label}</span>
    </button>
  );
}
