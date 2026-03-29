import BaseButton from '@/components/shared/BaseButton';
import { profileData } from '@/components/features/profile/profileData';

export default function ProfileHeader() {
  return (
    <section className="overflow-hidden rounded-3xl border border-border-gray bg-white shadow-sm">
      <div className="h-32 bg-linear-to-r from-brand-50 to-brand-100" />
      <div className="flex flex-col gap-5 px-6 pb-6 sm:px-8 sm:pb-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="-mt-10 flex flex-col gap-5 sm:flex-row sm:items-end">
          <div className="h-32 w-32 overflow-hidden rounded-3xl border-4 border-white bg-white shadow-lg">
            <img
              alt={profileData.name}
              className="h-full w-full object-cover"
              src={profileData.profileImage}
            />
          </div>

          <div className="space-y-1 pb-1">
            <h1 className="text-4xl leading-9 font-bold tracking-tight text-text-black">
              {profileData.name}
            </h1>
            <p className="text-base leading-6 font-medium text-text-gray">{profileData.role}</p>
          </div>
        </div>

        <BaseButton size="M" variant="primary" className="self-start px-5 lg:self-auto">
          프로필 수정
        </BaseButton>
      </div>
    </section>
  );
}
