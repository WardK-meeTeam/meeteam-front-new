'use client';

import { Github, Link2, Mail } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import AuthRequiredFallback from '@/components/features/auth/AuthRequiredFallback';
import { fetchJobOptions } from '@/components/features/auth/signupApi';
import BasicInfoCard from '@/components/features/profile/BasicInfoCard';
import IntroductionCard from '@/components/features/profile/IntroductionCard';
import JoinedProjectCard from '@/components/features/profile/JoinedProjectCard';
import ParticipationStatusCard from '@/components/features/profile/ParticipationStatusCard';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileOverviewSkeleton from '@/components/features/profile/ProfileOverviewSkeleton';
import SkillsCard from '@/components/features/profile/SkillsCard';
import ToastMessage from '@/components/shared/ToastMessage';
import {
  fetchMemberProfile,
  fetchMyProfile,
  findPositionByName,
  type MemberProfileResponse,
  type ProfileGender,
  updateMyProfile,
} from '@/components/features/profile/profileApi';
import { useAuthStore } from '@/stores/useAuthStore';
import type { JobFieldOption } from '@/types/auth';

interface ProfileOverviewProps {
  memberId?: number;
  editable?: boolean;
  actionLabel?: string;
}

interface ProfileFormState {
  name: string;
  age: string;
  gender: string;
  fieldCategory: string;
  fieldRole: string;
  email: string;
  github: string;
  blog: string;
  introduction: string;
  isParticipating: boolean;
  profileImageUrl: string | null;
  profileImageFile: File | null;
}

export default function ProfileOverview({
  memberId,
  editable = true,
  actionLabel = '제안 보내기',
}: ProfileOverviewProps) {
  const handleAuthRequired = useAuthRequiredModal();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isAuthBlocked, setIsAuthBlocked] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [profile, setProfile] = useState<MemberProfileResponse | null>(null);
  const [jobFields, setJobFields] = useState<JobFieldOption[]>([]);
  const [profileForm, setProfileForm] = useState<ProfileFormState | null>(null);
  const [viewSkillGroups, setViewSkillGroups] = useState<
    Array<{ category: string; role: string; skills: string[] }>
  >([]);
  const [editableSkills, setEditableSkills] = useState<string[]>([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const canEdit = editable && !memberId;

  useEffect(() => {
    if (!profileForm?.profileImageFile) {
      setImagePreviewUrl(null);
      return undefined;
    }

    const nextPreviewUrl = URL.createObjectURL(profileForm.profileImageFile);
    setImagePreviewUrl(nextPreviewUrl);

    return () => URL.revokeObjectURL(nextPreviewUrl);
  }, [profileForm?.profileImageFile]);

  useEffect(() => {
    let active = true;

    const loadProfile = async () => {
      try {
        setIsLoading(true);
        setIsAuthBlocked(false);
        setErrorMessage(null);

        if (memberId) {
          const nextProfile = await fetchMemberProfile(memberId);

          if (!active) {
            return;
          }

          applyProfile(nextProfile, []);
          return;
        }

        if (!isAuthenticated) {
          return;
        }

        const [nextProfile, nextJobFields] = await Promise.all([
          fetchMyProfile(),
          fetchJobOptions(),
        ]);

        if (!active) {
          return;
        }

        applyProfile(nextProfile, nextJobFields);
      } catch (error) {
        if (!active) {
          return;
        }

        if (
          handleAuthRequired(error, {
            redirectPath: memberId ? `/profile/${memberId}` : '/profile',
          })
        ) {
          setIsAuthBlocked(true);
          setErrorMessage(null);
          return;
        }

        setErrorMessage(error instanceof Error ? error.message : '프로필을 불러오지 못했습니다.');
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      active = false;
    };
  }, [handleAuthRequired, isAuthenticated, memberId]);

  const currentActionLabel = canEdit ? (isEditing ? '저장하기' : '프로필 수정') : actionLabel;
  const categoryOptions = useMemo(() => jobFields.map((field) => field.name), [jobFields]);
  const currentField = useMemo(
    () => jobFields.find((field) => field.name === profileForm?.fieldCategory),
    [jobFields, profileForm?.fieldCategory],
  );
  const roleOptions = useMemo(
    () => currentField?.positions.map((position) => position.name) ?? [],
    [currentField],
  );
  const availableSkills = useMemo(
    () => currentField?.techStacks.map((techStack) => techStack.name) ?? [],
    [currentField],
  );
  const editableSkillGroups = useMemo(
    () =>
      profileForm
        ? [
            {
              category: profileForm.fieldCategory,
              role: profileForm.fieldRole,
              skills: editableSkills,
            },
          ]
        : [],
    [editableSkills, profileForm],
  );

  function applyProfile(nextProfile: MemberProfileResponse, nextJobFields: JobFieldOption[]) {
    setProfile(nextProfile);
    setJobFields(nextJobFields);
    setViewSkillGroups(
      nextProfile.groupedSkills.map((group) => ({
        category: group.jobFieldName,
        role: group.jobPositionName,
        skills: group.techStacks,
      })),
    );

    const primaryGroup = nextProfile.groupedSkills[0];
    const ageLabel =
      typeof nextProfile.age === 'number'
        ? `${nextProfile.age}세`
        : nextProfile.birthDate
          ? `${calculateAge(nextProfile.birthDate)}세`
          : '-';

    setEditableSkills(primaryGroup?.techStacks ?? []);
    setProfileForm({
      name: nextProfile.name,
      age: ageLabel,
      gender: nextProfile.gender === 'FEMALE' ? '여성' : '남성',
      fieldCategory: primaryGroup?.jobFieldName ?? '',
      fieldRole: primaryGroup?.jobPositionName ?? nextProfile.representativePosition ?? '',
      email: nextProfile.email,
      github: nextProfile.githubUrl ?? '',
      blog: nextProfile.blogUrl ?? '',
      introduction: nextProfile.introduce ?? '',
      isParticipating: nextProfile.isParticipating,
      profileImageUrl: nextProfile.profileImageUrl,
      profileImageFile: null,
    });
  }

  const handleAction = () => {
    if (!canEdit) {
      return;
    }

    if (!isEditing) {
      setErrorMessage(null);
      setIsEditing(true);
      return;
    }

    void handleSave();
  };

  const handleCancelEdit = () => {
    if (profile) {
      applyProfile(profile, jobFields);
    }

    setErrorMessage(null);
    setIsEditing(false);
  };

  const handleFieldChange = (field: keyof ProfileFormState, value: string) => {
    if (!profileForm) {
      return;
    }

    if (field === 'fieldCategory') {
      const nextField = jobFields.find((item) => item.name === value);
      setProfileForm((current) =>
        current
          ? {
              ...current,
              fieldCategory: value,
              fieldRole: nextField?.positions[0]?.name ?? '',
            }
          : current,
      );
      setEditableSkills([]);
      return;
    }

    setProfileForm((current) => ({
      ...(current ?? profileForm),
      [field]: value,
    }));
  };

  const handleToggleParticipation = () => {
    setProfileForm((current) =>
      current
        ? {
            ...current,
            isParticipating: !current.isParticipating,
          }
        : current,
    );
  };

  const handleImageChange = (file: File | null) => {
    setProfileForm((current) =>
      current
        ? {
            ...current,
            profileImageFile: file,
          }
        : current,
    );
  };

  async function handleSave() {
    if (!canEdit || !isAuthenticated || !profileForm || !profile) {
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage(null);

      const position = findPositionByName(
        jobFields,
        profileForm.fieldCategory,
        profileForm.fieldRole,
      );
      if (!position) {
        throw new Error('선택한 직군 정보를 확인할 수 없습니다.');
      }

      const techStackIds = editableSkills.map((skill) => {
        const techStack = currentField?.techStacks.find((item) => item.name === skill);

        if (!techStack) {
          throw new Error(`'${skill}' 기술 스택을 옵션에서 찾을 수 없습니다.`);
        }

        return techStack.id;
      });

      await updateMyProfile({
        name: profileForm.name,
        age: parseInt(profileForm.age.replace(/\D/g, ''), 10),
        gender: mapGenderLabelToValue(profileForm.gender),
        jobPositionIds: [position.id],
        techStackIds,
        isParticipating: profileForm.isParticipating,
        introduction: profileForm.introduction,
        githubUrl: profileForm.github,
        blogUrl: profileForm.blog,
        profileImage: profileForm.profileImageFile,
      });

      const [nextProfile, nextJobFields] = await Promise.all([fetchMyProfile(), fetchJobOptions()]);
      applyProfile(nextProfile, nextJobFields);
      setIsEditing(false);
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: '/profile' })) {
        setErrorMessage(null);
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : '프로필 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  }

  const profileInfoItems = profileForm
    ? [
        {
          label: '참여 중인 프로젝트',
          value: `${profile?.projectCards.length ?? 0}개`,
        },
        { label: '프로젝트 경험', value: `${profile?.projectExperienceCount ?? 0}회` },
      ]
    : [];

  const emailContact = {
    label: '이메일',
    icon: Mail,
    value: profileForm?.email ?? '-',
    href: `mailto:${profileForm?.email ?? ''}`,
  };

  const socialContacts = [
    {
      label: 'GitHub',
      icon: Github,
      value: profileForm?.github || '등록 안 됨',
      href: profileForm?.github ? ensureUrl(profileForm.github) : '#',
    },
    {
      label: '블로그',
      icon: Link2,
      value: profileForm?.blog || '등록 안 됨',
      href: profileForm?.blog ? ensureUrl(profileForm.blog) : '#',
    },
  ];

  const joinedProjects =
    profile?.projectCards.map((project) => ({
      id: project.projectId,
      title: project.projectName,
      category: project.categoryName,
      leader: project.creatorName,
      currentMembers: project.currentCount,
      maxMembers: project.recruitmentCount,
      imageUrl: project.imageUrl,
      leaderImageUrl: project.creatorImageUrl,
    })) ?? [];

  const roleLabel =
    profile?.representativePositionEn ??
    profile?.representativePosition ??
    profileForm?.fieldRole ??
    '';

  if (isAuthBlocked) {
    return <AuthRequiredFallback />;
  }

  if (isLoading) {
    return <ProfileOverviewSkeleton />;
  }

  if (!profileForm || !profile) {
    return (
      <section className="bg-mt-white px-4 py-6 sm:px-6 sm:py-8">
        <ToastMessage message={errorMessage} />

        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-mt-border bg-mt-white px-6 py-8 text-sm leading-6 text-mt-hero-blue shadow-sm">
          {errorMessage ?? '프로필을 불러오지 못했습니다.'}
        </div>
      </section>
    );
  }

  return (
    <section className="bg-mt-white px-4 py-6 sm:px-6 sm:py-8">
      <ToastMessage message={errorMessage} />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <ProfileHeader
          name={profileForm.name}
          role={roleLabel}
          email={profileForm.email}
          profileImageUrl={imagePreviewUrl ?? profileForm.profileImageUrl}
          isParticipating={profileForm.isParticipating}
          projectCount={joinedProjects.length}
          skills={
            editableSkills.length > 0
              ? editableSkills
              : viewSkillGroups.flatMap((group) => group.skills)
          }
          actionLabel={currentActionLabel}
          isEditing={isEditing}
          onAction={canEdit ? handleAction : undefined}
          onCancel={isEditing ? handleCancelEdit : undefined}
          onImageChange={handleImageChange}
          actionDisabled={isSaving}
        />

        <div className="grid gap-6 lg:grid-cols-[309px_minmax(0,1fr)]">
          <div className="flex flex-col gap-6">
            {canEdit && isEditing ? (
              <ParticipationStatusCard
                editable
                isParticipating={profileForm.isParticipating}
                onToggle={handleToggleParticipation}
              />
            ) : null}
            <BasicInfoCard
              editable={isEditing}
              infoItems={profileInfoItems}
              emailContact={emailContact}
              socialContacts={socialContacts}
              categoryOptions={categoryOptions}
              roleOptions={roleOptions}
              formData={profileForm}
              onFieldChange={handleFieldChange}
            />
            <SkillsCard
              editable={isEditing}
              skillGroups={isEditing ? editableSkillGroups : viewSkillGroups}
              availableSkills={availableSkills}
              onSkillsChange={(_groupIndex, nextSkills) => setEditableSkills(nextSkills)}
            />
          </div>

          <div className="flex flex-col gap-8">
            <IntroductionCard
              editable={isEditing}
              value={profileForm.introduction}
              onChange={(value) => handleFieldChange('introduction', value)}
            />
            <JoinedProjectCard projects={joinedProjects} disabled={isEditing} />
          </div>
        </div>

        {isEditing ? (
          <div className="fixed right-8 bottom-8 z-50 rounded-2xl border border-mt-border bg-mt-white/95 p-3 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                disabled={isSaving}
                className="inline-flex h-11 min-w-20 items-center justify-center rounded-xl border border-mt-border bg-mt-white px-5 text-sm font-bold text-mt-text-secondary disabled:cursor-not-allowed disabled:opacity-60"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => void handleSave()}
                disabled={isSaving}
                className="inline-flex h-11 min-w-26 items-center justify-center rounded-xl bg-mt-primary px-5 text-sm font-bold text-mt-white shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? '저장 중' : '저장하기'}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function calculateAge(birthDate: string) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }

  return age;
}

function mapGenderLabelToValue(gender: string): ProfileGender {
  return gender === '여성' ? 'FEMALE' : 'MALE';
}

function ensureUrl(value: string) {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}
