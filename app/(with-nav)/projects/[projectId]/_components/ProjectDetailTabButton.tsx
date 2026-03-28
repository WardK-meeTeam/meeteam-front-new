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
      className={
        isActive
          ? 'border-b-2 border-brand-500 pb-4 text-sm leading-5 font-bold text-brand-500'
          : 'pb-4 text-sm leading-5 font-bold text-text-gray transition-colors hover:text-text-black'
      }
    >
      {label}
    </button>
  );
}
