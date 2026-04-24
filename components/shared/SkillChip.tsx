import { X } from 'lucide-react';

type SkillChipVariant = 'primary' | 'neutral' | 'outline';
type SkillChipSize = 'sm' | 'md';

type SkillChipProps = {
  label: string;
  variant?: SkillChipVariant;
  size?: SkillChipSize;
  onRemove?: () => void;
  className?: string;
};

const VARIANT_CLASS: Record<SkillChipVariant, string> = {
  primary: 'border-transparent bg-home-blue-50 text-home-blue-500',
  neutral: 'border-transparent bg-surface-soft text-label-dark',
  outline: 'border-border-gray bg-white text-project-status-closed',
};

const SIZE_CLASS: Record<SkillChipSize, string> = {
  sm: 'rounded-md px-2.5 py-1 text-xs leading-4',
  md: 'rounded-lg px-3 py-1.5 text-sm leading-5',
};

export default function SkillChip({
  label,
  variant = 'neutral',
  size = 'sm',
  onRemove,
  className = '',
}: SkillChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 border font-medium ${VARIANT_CLASS[variant]} ${SIZE_CLASS[size]} ${className}`}
    >
      {label}
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-muted-gray transition-colors hover:text-danger-400"
          aria-label={`${label} 삭제`}
        >
          <X className="h-3.5 w-3.5" aria-hidden strokeWidth={2} />
        </button>
      ) : null}
    </span>
  );
}
