import type { ProjectDetailTab } from './ProjectDetailContent';

interface ProjectDetailTabButtonProps {
  tab: ProjectDetailTab;
  label: string;
  isActive: boolean;
  onSelect: (tab: ProjectDetailTab) => void;
}

export default function ProjectDetailTabButton({
  tab,
  label,
  isActive,
  onSelect,
}: ProjectDetailTabButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(tab)}
      className={`shrink-0 border-b-2 pb-4 text-sm leading-5 font-bold transition-colors ${
        isActive
          ? 'border-brand-500 text-brand-500'
          : 'border-transparent text-text-gray hover:text-text-black'
      }`}
    >
      {label}
    </button>
  );
}
