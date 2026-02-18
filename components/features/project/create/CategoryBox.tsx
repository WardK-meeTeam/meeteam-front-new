import { ReactNode } from 'react';

interface CategoryBoxProps {
  icon?: ReactNode;
  label: string;
  selected?: boolean;
  onClick: () => void;
}

export default function CategoryBox({ icon, label, selected = false, onClick }: CategoryBoxProps) {
  const selectedClass = selected
    ? 'border-2 border-brand-500 bg-brand-50'
    : 'border border-border-gray';

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-23 w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl px-4 py-4 text-center text-project-status-closed transition-colors hover:border-2 hover:border-brand-500 hover:bg-brand-50 ${selectedClass}`}
      aria-pressed={selected}
    >
      <span className="text-2xl leading-8">{icon}</span>
      <span className="text-sm font-medium leading-5">{label}</span>
    </button>
  );
}
