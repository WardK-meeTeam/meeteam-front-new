import { Camera } from 'lucide-react';
import BaseButton from '@/components/shared/BaseButton';
import { profileData } from '@/components/features/profile/profileData';

interface ProfileHeaderProps {
  actionLabel?: string;
  isEditing?: boolean;
  onAction?: () => void;
}

export default function ProfileHeader({
  actionLabel = '프로필 수정',
  isEditing = false,
  onAction,
}: ProfileHeaderProps) {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-gray bg-white shadow-sm">
      <div className="h-32 bg-linear-to-r from-brand-400/10 to-accent-violet-500/10" />
      <div className="flex flex-col gap-5 px-8 pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="-mt-11 flex flex-col gap-6 sm:flex-row sm:items-end">
          <div className="relative h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
            <img
              alt={profileData.name}
              className="h-full w-full object-cover"
              src={profileData.profileImage}
            />

            {isEditing ? (
              <button
                type="button"
                aria-label="프로필 이미지 수정"
                className="absolute inset-0 flex items-center justify-center bg-overlay-dark text-white"
              >
                <Camera className="h-8 w-8" aria-hidden strokeWidth={2} />
              </button>
            ) : null}
          </div>

          <div className="space-y-0.5 pb-1">
            <h1 className="text-3xl leading-9 font-bold tracking-tight text-text-black">
              {profileData.name}
            </h1>
            <p className="text-base leading-6 font-medium text-text-gray">{profileData.role}</p>
          </div>
        </div>

        <BaseButton
          size="M"
          variant="primary"
          onClick={onAction}
          className="self-start px-5 shadow-[0_4px_6px_-1px_var(--color-brand-100),0_2px_4px_-2px_var(--color-brand-100)] sm:self-auto"
        >
          {actionLabel}
        </BaseButton>
      </div>
    </section>
  );
}
