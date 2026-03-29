'use client';

import { useState } from 'react';
import BasicInfoCard from '@/components/features/profile/BasicInfoCard';
import IntroductionCard from '@/components/features/profile/IntroductionCard';
import JoinedProjectCard from '@/components/features/profile/JoinedProjectCard';
import ParticipationStatusCard from '@/components/features/profile/ParticipationStatusCard';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import SkillsCard from '@/components/features/profile/SkillsCard';
import { profileData, skillGroups as defaultSkillGroups } from '@/components/features/profile/profileData';

interface ProfileOverviewProps {
  editable?: boolean;
  actionLabel?: string;
  emptyProject?: boolean;
}

interface ProfileFormState {
  age: string;
  gender: string;
  fieldCategory: string;
  fieldRole: string;
  projectCount: string;
  github: string;
  blog: string;
  introduction: string;
}

export default function ProfileOverview({
  editable = true,
  actionLabel = '제안 보내기',
  emptyProject = false,
}: ProfileOverviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState<ProfileFormState>({
    age: profileData.age,
    gender: profileData.gender,
    fieldCategory: profileData.fieldCategory,
    fieldRole: profileData.fieldRole,
    projectCount: profileData.projectCount,
    github: profileData.github,
    blog: profileData.blog,
    introduction: profileData.introduction,
  });
  const [skillGroups, setSkillGroups] = useState(defaultSkillGroups);

  const currentActionLabel = editable ? (isEditing ? '저장하기' : '프로필 수정') : actionLabel;

  const handleAction = () => {
    if (!editable) {
      return;
    }

    setIsEditing((current) => !current);
  };

  const handleFieldChange = (field: keyof ProfileFormState, value: string) => {
    setProfileForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSkillAdd = (groupIndex: number, skill: string) => {
    setSkillGroups((current) =>
      current.map((group, index) =>
        index === groupIndex
          ? { ...group, skills: [...group.skills, skill] }
          : group,
      ),
    );
  };

  return (
    <section className="bg-surface-soft px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <ProfileHeader
          actionLabel={currentActionLabel}
          isEditing={isEditing}
          onAction={handleAction}
        />

        <div className="grid gap-6 lg:grid-cols-[309px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            <ParticipationStatusCard />
            <BasicInfoCard
              editable={isEditing}
              formData={profileForm}
              onFieldChange={handleFieldChange}
            />
            <SkillsCard
              editable={isEditing}
              skillGroups={skillGroups}
              onSkillAdd={handleSkillAdd}
            />
          </div>

          <div className="flex flex-col gap-8">
            <IntroductionCard
              editable={isEditing}
              value={profileForm.introduction}
              onChange={(value) => handleFieldChange('introduction', value)}
            />
            <JoinedProjectCard empty={emptyProject} disabled={isEditing} />
          </div>
        </div>
      </div>
    </section>
  );
}
