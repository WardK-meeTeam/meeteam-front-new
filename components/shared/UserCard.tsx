import { BriefcaseBusiness } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import SkillChip from '@/components/shared/SkillChip';

export interface UserCardProps {
  userId: string | number;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  imageUrl: string;
}

export default function UserCard({
  userId,
  name,
  role,
  experience,
  skills,
  imageUrl,
}: UserCardProps) {
  const [primarySkill, secondarySkill] = skills;

  return (
    <AuthLink
      href={`/profile/${userId}`}
      className="group block h-full rounded-2xl border border-border-gray bg-white px-6 pt-6 pb-14 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative h-16 w-full">
        <ProfileAvatar
          name={name}
          imageUrl={imageUrl}
          sizeClassName="h-16 w-16"
          shape="rounded"
          textClassName="text-xl"
          className="shadow-sm"
          imageClassName="transition-transform duration-400 group-hover:scale-135"
        />

        <span className="absolute top-0 right-0 rounded-lg bg-brand-50 px-2 py-1 text-xs font-medium text-text-gray">
          {role}
        </span>
      </div>

      <div className="mt-6 space-y-1">
        <h3 className="text-base font-bold text-text-black">{name}</h3>

        <div className="flex items-center gap-1.5 text-xs text-text-gray">
          <BriefcaseBusiness
            aria-hidden
            className="h-3.5 w-3.5 text-muted-gray"
            strokeWidth={1.8}
          />
          <p>{experience}</p>
        </div>
      </div>

      <div className="mt-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-gray">
          Main Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {primarySkill ? <SkillChip label={primarySkill} variant="primary" /> : null}

          {secondarySkill ? <SkillChip label={secondarySkill} variant="outline" /> : null}
        </div>
      </div>
    </AuthLink>
  );
}
