type CategoryBadgeTone = 'default' | 'onDark' | 'accent';
type CategoryBadgeSize = 'sm' | 'md';

type CategoryBadgeProps = {
  label: string;
  tone?: CategoryBadgeTone;
  size?: CategoryBadgeSize;
  className?: string;
};

const TONE_CLASS: Record<CategoryBadgeTone, string> = {
  default: 'border-mt-border bg-mt-badge-bg text-mt-primary',
  onDark: 'border-mt-white/10 bg-mt-white/20 text-mt-white backdrop-blur-sm',
  accent: 'border-mt-logo-blue/30 bg-mt-logo-blue/30 text-mt-badge-bg backdrop-blur-sm',
};

const SIZE_CLASS: Record<CategoryBadgeSize, string> = {
  sm: 'px-3 py-1 text-xs leading-4',
  md: 'px-3.5 py-1.5 text-sm leading-5',
};

export default function CategoryBadge({
  label,
  tone = 'default',
  size = 'sm',
  className = '',
}: CategoryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border font-bold ${TONE_CLASS[tone]} ${SIZE_CLASS[size]} ${className}`}
    >
      {label}
    </span>
  );
}
