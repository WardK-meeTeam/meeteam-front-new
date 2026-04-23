import ProfileCard from '@/components/features/profile/ProfileCard';

interface ParticipationStatusCardProps {
  isParticipating: boolean;
  editable?: boolean;
  onToggle?: () => void;
}

export default function ParticipationStatusCard({
  isParticipating,
  editable = false,
  onToggle,
}: ParticipationStatusCardProps) {
  return (
    <ProfileCard className="py-5">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-base leading-6 font-bold text-text-black">프로젝트 참여 여부</h2>
        <button
          type="button"
          onClick={editable ? onToggle : undefined}
          data-cy="profile-participation-toggle"
          className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
            isParticipating ? 'bg-brand-500' : 'bg-divider-soft'
          } ${editable ? 'cursor-pointer' : 'cursor-default'}`}
          aria-label={isParticipating ? '프로젝트 참여 중' : '프로젝트 참여 불가'}
          role="switch"
          aria-checked={isParticipating}
        >
          <span
            className={`h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              isParticipating ? 'ml-auto' : ''
            }`}
          />
        </button>
      </div>
    </ProfileCard>
  );
}
