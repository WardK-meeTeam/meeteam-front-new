import BasicInfoCard from '@/components/features/profile/BasicInfoCard';
import IntroductionCard from '@/components/features/profile/IntroductionCard';
import JoinedProjectCard from '@/components/features/profile/JoinedProjectCard';
import ParticipationStatusCard from '@/components/features/profile/ParticipationStatusCard';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import SkillsCard from '@/components/features/profile/SkillsCard';

interface ProfileOverviewProps {
  actionLabel?: string;
  emptyProject?: boolean;
}

export default function ProfileOverview({
  actionLabel = '프로필 수정',
  emptyProject = false,
}: ProfileOverviewProps) {
  return (
    <section className="bg-surface-soft px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <ProfileHeader actionLabel={actionLabel} />

        <div className="grid gap-6 lg:grid-cols-[309px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <ParticipationStatusCard />
            <BasicInfoCard />
            <SkillsCard />
          </div>

          <div className="flex flex-col gap-8">
            <IntroductionCard />
            <JoinedProjectCard empty={emptyProject} />
          </div>
        </div>
      </div>
    </section>
  );
}
