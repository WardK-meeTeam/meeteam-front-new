'use client';

import { Camera } from 'lucide-react';
import { useId } from 'react';
import BaseButton from '@/components/shared/BaseButton';
import ProfileAvatar from '@/components/shared/ProfileAvatar';

interface ProfileHeaderProps {
  name: string;
  role: string;
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
  profileImageUrl,
  actionLabel = '프로필 수정',
  isEditing = false,
  onAction,
  onImageChange,
  actionDisabled = false,
}: ProfileHeaderProps) {
  const inputId = useId();

  return (
    <section className="overflow-hidden rounded-3xl border border-border-gray bg-white shadow-sm">
      <div className="h-32 bg-linear-to-r from-brand-400/10 to-accent-violet-500/10" />
      <div className="flex flex-col gap-5 px-8 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="-mt-11 flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
            <ProfileAvatar
              name={name}
              imageUrl={profileImageUrl}
              sizeClassName="h-full w-full"
              shape="rounded"
              textClassName="text-4xl"
            />

            {isEditing ? (
              <label
                htmlFor={inputId}
                className="absolute inset-0 flex cursor-pointer items-center justify-center bg-overlay-dark text-white"
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

          <div className="space-y-0.5 pb-1">
            <h1 className="text-3xl leading-9 font-bold tracking-tight text-text-black">{name}</h1>
            <p className="text-base leading-6 font-medium text-text-gray">{role}</p>
          </div>
        </div>

        <BaseButton
          size="M"
          variant="primary"
          onClick={onAction}
          disabled={actionDisabled}
          className="self-start px-5 shadow-[0_4px_6px_-1px_var(--color-brand-100),0_2px_4px_-2px_var(--color-brand-100)] sm:self-auto"
        >
          {actionLabel}
        </BaseButton>
      </div>
    </section>
  );
}
