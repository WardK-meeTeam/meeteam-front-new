'use client';

import Link from 'next/link';
import { ChevronRight, CircleCheck, CircleX, Clock3, UserRoundPlus } from 'lucide-react';
import type { NotificationCardProps, NotificationCardVariant } from './types';

const CARD_VARIANT_STYLES: Record<
  NotificationCardVariant,
  {
    containerClassName: string;
    iconWrapperClassName: string;
    icon: typeof CircleCheck;
    iconClassName: string;
    titleClassName: string;
    descriptionClassName: string;
  }
> = {
  welcome: {
    containerClassName: 'border-brand-100 shadow-sm',
    iconWrapperClassName: 'bg-brand-100',
    icon: CircleCheck,
    iconClassName: 'text-project-status-progress',
    titleClassName: 'text-text-black',
    descriptionClassName: 'text-project-status-closed',
  },
  applicant: {
    containerClassName: 'border-brand-100 shadow-sm',
    iconWrapperClassName: 'bg-brand-100',
    icon: UserRoundPlus,
    iconClassName: 'text-brand-500',
    titleClassName: 'text-text-black',
    descriptionClassName: 'text-project-status-closed',
  },
  rejected: {
    containerClassName: 'border-border-gray opacity-80',
    iconWrapperClassName: 'bg-chip-bg',
    icon: CircleX,
    iconClassName: 'text-danger-500',
    titleClassName: 'text-text-body',
    descriptionClassName: 'text-text-gray',
  },
  submitted: {
    containerClassName: 'border-border-gray opacity-80',
    iconWrapperClassName: 'bg-border-soft',
    icon: Clock3,
    iconClassName: 'text-text-gray',
    titleClassName: 'text-text-body',
    descriptionClassName: 'text-text-gray',
  },
};

export function NotificationCard({
  title,
  description,
  timestamp,
  variant,
  unread = false,
  actionHref,
  actionLabel,
}: NotificationCardProps) {
  const {
    containerClassName,
    iconWrapperClassName,
    icon,
    iconClassName,
    titleClassName,
    descriptionClassName,
  } = CARD_VARIANT_STYLES[variant];
  const Icon = icon;

  return (
    <article
      className={`relative flex items-start gap-4 rounded-2xl border bg-white p-5 ${containerClassName}`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconWrapperClassName}`}
      >
        <Icon className={`h-6 w-6 ${iconClassName}`} aria-hidden strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-start justify-between gap-4 pr-4">
          <h2 className={`text-base leading-6 font-bold ${titleClassName}`}>{title}</h2>
          <div className="relative shrink-0 pt-1 pr-4">
            <span className="text-xs leading-4 font-medium text-muted-gray">{timestamp}</span>

            {unread ? (
              <span
                className="absolute right-0 top-0 block h-2.5 w-2.5 rounded-full bg-danger-500"
                aria-hidden
              />
            ) : null}
          </div>
        </div>

        <p className={`mt-1 text-sm leading-6.5 ${descriptionClassName}`}>{description}</p>

        {actionHref && actionLabel ? (
          <Link
            href={actionHref}
            className="mt-3 inline-flex items-center gap-0.5 text-sm leading-5 font-bold text-brand-500 transition-colors hover:text-brand-700"
          >
            {actionLabel}
            <ChevronRight className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </Link>
        ) : null}
      </div>
    </article>
  );
}
