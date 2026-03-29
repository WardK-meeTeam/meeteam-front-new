export type NotificationCardVariant = 'welcome' | 'applicant' | 'rejected' | 'submitted';

export interface NotificationCardProps {
  title: string;
  description: string;
  timestamp: string;
  variant: NotificationCardVariant;
  unread?: boolean;
  actionHref?: string;
  actionLabel?: string;
}
