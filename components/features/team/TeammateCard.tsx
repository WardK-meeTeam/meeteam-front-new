import { BriefcaseBusiness } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import type { Teammate } from '@/types/team';

export function TeammateCard({ teammate }: { teammate: Teammate }) {
  const [primarySkill, secondarySkill] = teammate.skills;

  return (
    <AuthLink
      href={`/profile/${teammate.id}`}
      data-cy="teammate-card"
      data-teammate-id={teammate.id}
      className="group flex h-full min-h-72 flex-col rounded-2xl border border-border-soft bg-white px-6 pt-6 pb-14 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <ProfileAvatar
          name={teammate.name}
          imageUrl={teammate.imageUrl}
          sizeClassName="h-16 w-16"
          shape="rounded"
          textClassName="text-xl"
          className="shadow-sm"
          imageClassName="transition-transform duration-300 group-hover:scale-135"
        />

        <span className="rounded-lg bg-surface-soft px-2 py-1 text-xs leading-4 font-medium text-text-gray">
          {teammate.role}
        </span>
      </div>

      <div className="mt-4 space-y-1">
        <h2 data-cy="teammate-card-name" className="text-base leading-6 font-bold text-text-black">
          {teammate.name}
        </h2>
        <div className="flex items-center gap-1.5 text-xs leading-4 text-text-gray">
          <BriefcaseBusiness aria-hidden className="h-3.5 w-3.5 text-text-gray" strokeWidth={1.8} />
          <span data-cy="teammate-card-experience">프로젝트 {teammate.experienceCount}회 경험</span>
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-xs leading-4 font-semibold tracking-wider text-muted-gray uppercase">
          Main Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {primarySkill ? (
            <span className="rounded-md bg-chip-bg px-2.5 py-1 text-xs leading-4 font-medium text-brand-500">
              {primarySkill}
            </span>
          ) : null}
          {secondarySkill ? (
            <span className="rounded-md bg-surface-soft px-2.5 py-1 text-xs leading-4 font-medium text-label-dark">
              {secondarySkill}
            </span>
          ) : null}
        </div>
      </div>
    </AuthLink>
  );
}
