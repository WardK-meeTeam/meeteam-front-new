'use client';

import { Camera } from 'lucide-react';
import { useId } from 'react';

import BaseButton from '@/components/shared/BaseButton';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import UniversityLogo from '@/components/shared/UniversityLogo';
import { findUniversityByEmail } from '@/components/shared/universityLogoRegistry';

interface ProfileHeaderProps {
  name: string;
  role: string;
  email?: string;
  profileImageUrl?: string | null;
  actionLabel?: string;
  isEditing?: boolean;
  onAction?: () => void;
  onImageChange?: (file: File | null) => void;
  actionDisabled?: boolean;
}

export default function ProfileHeader({
  name,
  role,
  email,
  profileImageUrl,
  actionLabel = '프로필 수정',
  isEditing = false,
  onAction,
  onImageChange,
  actionDisabled = false,
}: ProfileHeaderProps) {
  const inputId = useId();
  const university = findUniversityByEmail(email);

  return (
    <section className="overflow-hidden rounded-3xl border border-mt-border bg-mt-white shadow-md">
      <div className="h-32 bg-mt-white" />
      <div className="flex flex-col gap-5 px-8 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="-mt-11 flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-mt-white bg-mt-white shadow-lg">
            <ProfileAvatar
              name={name}
              imageUrl={profileImageUrl}
              sizeClassName="h-full w-full"
              shape="circle"
              textClassName="text-4xl"
            />

            {isEditing ? (
              <label
                htmlFor={inputId}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-mt-text-primary/40 text-mt-white"
                aria-label="프로필 이미지 수정"
              >
                <Camera className="h-8 w-8" aria-hidden strokeWidth={2} />
              </label>
            ) : null}
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => onImageChange?.(event.target.files?.[0] ?? null)}
            />
          </div>

          <div className="space-y-1.5 pb-1">
            <h1 className="text-3xl leading-9 font-bold tracking-tight text-mt-text-primary">
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <p className="text-base leading-6 font-medium text-mt-text-secondary">{role}</p>
              {university ? (
                <>
                  <span className="h-1 w-1 rounded-full bg-mt-shadow-blue" aria-hidden />
                  <div className="inline-flex items-center gap-2.5">
                    <UniversityLogo
                      universityId={university.id}
                      variant="icon"
                      className="h-6 w-6 shrink-0"
                    />
                    <span className="text-base leading-6 font-semibold text-mt-text-primary">
                      {university.nameKo}
                    </span>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <BaseButton
          size="M"
          variant="primary"
          onClick={onAction}
          disabled={actionDisabled}
          data-cy="profile-action-button"
          className="self-start px-5 shadow-[0_4px_6px_-1px_var(--color-mt-border),0_2px_4px_-2px_var(--color-mt-border)] sm:self-auto"
        >
          {actionLabel}
        </BaseButton>
      </div>
    </section>
  );
}
