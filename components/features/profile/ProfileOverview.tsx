import BasicInfoCard from '@/components/features/profile/BasicInfoCard';
import IntroductionCard from '@/components/features/profile/IntroductionCard';
import JoinedProjectCard from '@/components/features/profile/JoinedProjectCard';
import ParticipationStatusCard from '@/components/features/profile/ParticipationStatusCard';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import SkillsCard from '@/components/features/profile/SkillsCard';

export default function ProfileOverview() {
  return (
    <section className="bg-surface-soft px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <ProfileHeader />

        <div className="grid gap-6 lg:grid-cols-[309px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <ParticipationStatusCard />
            <BasicInfoCard />
            <SkillsCard />
          </div>

          <div className="flex flex-col gap-8">
            <IntroductionCard />
            <JoinedProjectCard />
          </div>
        </div>
      </div>
    </section>
  );
}
