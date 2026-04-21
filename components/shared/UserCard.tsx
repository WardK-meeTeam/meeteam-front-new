import Image from 'next/image';
import { BriefcaseBusiness } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';

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
        <div className="relative h-16 w-16 overflow-hidden rounded-2xl shadow-sm">
          <Image
            alt={name}
            className="object-cover transition-transform duration-400 group-hover:scale-115"
            fill
            sizes="64px"
            src={imageUrl}
          />
        </div>

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
          {primarySkill ? (
            <span className="rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-500">
              {primarySkill}
            </span>
          ) : null}

          {secondarySkill ? (
            <span className="rounded-md border border-border-gray bg-white px-2.5 py-1 text-xs font-medium text-text-black">
              {secondarySkill}
            </span>
          ) : null}
        </div>
      </div>
    </AuthLink>
  );
}
