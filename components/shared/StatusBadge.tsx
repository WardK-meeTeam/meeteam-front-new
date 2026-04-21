import type { ReactNode } from 'react';

type StatusBadgeStatus =
  | 'open'
  | 'closed'
  | 'deadline'
  | 'suspended'
  | 'completed'
  | 'pending'
  | 'leader';
type StatusBadgeSize = 'xs' | 'sm';

type StatusBadgeProps = {
  status: StatusBadgeStatus;
  label?: string;
  size?: StatusBadgeSize;
  icon?: ReactNode;
  className?: string;
};

const STATUS_CLASS: Record<StatusBadgeStatus, string> = {
  open: 'border-transparent bg-project-recruiting-bg text-project-status-progress',
  closed: 'border-transparent bg-surface-soft text-muted-gray',
  deadline: 'border-transparent bg-brand-500/90 text-white backdrop-blur-sm',
  suspended: 'border-transparent bg-surface-soft text-project-status-closed',
  completed: 'border-transparent bg-project-status-closed text-white',
  pending: 'border-transparent bg-brand-100 text-brand-500',
  leader: 'border-transparent bg-role-leader-bg text-role-leader-text',
};

const DEFAULT_LABEL: Record<StatusBadgeStatus, string> = {
  open: '모집중',
  closed: '마감',
  deadline: '마감',
  suspended: '모집 중단',
  completed: '모집 완료',
  pending: '대기',
  leader: '리더',
};

const SIZE_CLASS: Record<StatusBadgeSize, string> = {
  xs: 'px-1.5 py-0.5 text-[10px] leading-4',
  sm: 'px-2 py-0.5 text-xs leading-4',
};

export default function StatusBadge({
  status,
  label = DEFAULT_LABEL[status],
  size = 'xs',
  icon,
  className = '',
}: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-bold ${STATUS_CLASS[status]} ${SIZE_CLASS[size]} ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
