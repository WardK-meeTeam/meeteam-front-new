import ProfileCard from '@/components/features/profile/ProfileCard';

export default function ParticipationStatusCard() {
  return (
    <ProfileCard className="py-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base leading-6 font-bold text-text-black">프로젝트 참여 여부</h2>
        <span
          className="flex h-7 w-12 items-center rounded-full bg-brand-500 px-1"
          aria-label="프로젝트 참여 중"
          role="switch"
          aria-checked={true}
        >
          <span className="ml-auto h-5 w-5 rounded-full bg-white shadow-sm" />
        </span>
      </div>
    </ProfileCard>
  );
}
