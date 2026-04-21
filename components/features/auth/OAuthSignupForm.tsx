'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import BaseButton from '@/components/shared/BaseButton';
import type { Interest, JobFieldOption, OAuthSignupFormValues } from '@/types/auth';
import { useAuthStore } from '@/stores/useAuthStore';
import { fetchMyProfile } from '@/components/features/profile/profileApi';

import InterestSection from '@/components/features/auth/InterestSection';
import ProfileExtraSection from '@/components/features/auth/ProfileExtraSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import SignupTechStackSection from '@/components/features/auth/SignupTechStackSection';

import { registerOAuthMember } from './oauthApi';
import { fetchJobOptions } from './signupApi';
import { oauthSignupFormSchema, type OAuthSignupFieldErrors } from './schema';
import { buildOAuthRegisterRequestPayload, getInterestKey } from './signupTransform';

const INITIAL_INTEREST: Interest = { major: '', minor: '' };

const INITIAL_FORM_VALUES: OAuthSignupFormValues = {
  name: '',
  birth: '',
  gender: 'male',
  interests: [INITIAL_INTEREST],
  techStacksByInterest: {},
  projectExperienceCount: '0',
  githubUrl: '',
  blogUrl: '',
  profileImage: null,
};

export default function OAuthSignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthCode = searchParams.get('code') ?? '';
  const setSession = useAuthStore((state) => state.setSession);

  const [formValues, setFormValues] = useState<OAuthSignupFormValues>(INITIAL_FORM_VALUES);
  const [jobFields, setJobFields] = useState<JobFieldOption[]>([]);
  const [fieldErrors, setFieldErrors] = useState<OAuthSignupFieldErrors>({});
  const [jobOptionsError, setJobOptionsError] = useState('');
  const [isLoadingJobOptions, setIsLoadingJobOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadJobOptions() {
      try {
        const nextJobFields = await fetchJobOptions();
        if (!isMounted) {
          return;
        }

        setJobFields(nextJobFields);
        setJobOptionsError('');
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setJobOptionsError(
          error instanceof Error ? error.message : '관심 분야 옵션을 불러오지 못했습니다.',
        );
      } finally {
        if (isMounted) {
          setIsLoadingJobOptions(false);
        }
      }
    }

    void loadJobOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!formValues.profileImage) {
      setProfileImagePreviewUrl('');
      return;
    }

    const previewUrl = URL.createObjectURL(formValues.profileImage);
    setProfileImagePreviewUrl(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [formValues.profileImage]);

  const updateField = <K extends keyof OAuthSignupFormValues>(
    key: K,
    value: OAuthSignupFormValues[K],
  ) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, form: undefined }));
  };

  const validateForm = () => {
    const result = oauthSignupFormSchema.safeParse(formValues);

    const nextErrors: OAuthSignupFieldErrors = {};

    if (!result.success) {
      const flattened = result.error.flatten().fieldErrors;
      nextErrors.name = flattened.name?.[0];
      nextErrors.birth = flattened.birth?.[0];
      nextErrors.projectExperienceCount = flattened.projectExperienceCount?.[0];
    }

    const filledInterests = formValues.interests.filter(
      (interest) => interest.major && interest.minor,
    );
    if (filledInterests.length === 0) {
      nextErrors.interests = '최소 1개의 관심 분야를 선택해 주세요.';
    }

    setFieldErrors(nextErrors);

    return Object.values(nextErrors).every((value) => !value);
  };

  const updateInterest = (index: number, next: Interest) => {
    if (
      next.major &&
      next.minor &&
      formValues.interests.some(
        (interest, interestIndex) =>
          interestIndex !== index && interest.major === next.major && interest.minor === next.minor,
      )
    ) {
      setFieldErrors((prev) => ({
        ...prev,
        interests: '같은 관심 분야는 한 번만 선택할 수 있습니다.',
      }));
      return;
    }

    setFormValues((prev) => {
      const currentInterest = prev.interests[index];
      const nextInterests = prev.interests.map((interest, interestIndex) =>
        interestIndex === index ? next : interest,
      );
      const nextTechStacksByInterest = { ...prev.techStacksByInterest };

      if (currentInterest) {
        delete nextTechStacksByInterest[getInterestKey(currentInterest)];
      }

      if (!next.major || !next.minor) {
        delete nextTechStacksByInterest[getInterestKey(next)];
      }

      return {
        ...prev,
        interests: nextInterests,
        techStacksByInterest: nextTechStacksByInterest,
      };
    });

    setFieldErrors((prev) => ({ ...prev, interests: undefined, form: undefined }));
  };

  const addInterest = () => {
    setFormValues((prev) => ({ ...prev, interests: [...prev.interests, INITIAL_INTEREST] }));
  };

  const removeInterest = (index: number) => {
    setFormValues((prev) => {
      const currentInterest = prev.interests[index];
      const nextInterests = prev.interests.filter((_, interestIndex) => interestIndex !== index);
      const nextTechStacksByInterest = { ...prev.techStacksByInterest };

      if (currentInterest) {
        delete nextTechStacksByInterest[getInterestKey(currentInterest)];
      }

      return {
        ...prev,
        interests: nextInterests.length > 0 ? nextInterests : [INITIAL_INTEREST],
        techStacksByInterest: nextTechStacksByInterest,
      };
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!oauthCode) {
      setFieldErrors((prev) => ({
        ...prev,
        form: 'OAuth 인증 코드가 없습니다. 처음부터 다시 시도해 주세요.',
      }));
      return;
    }

    if (jobFields.length === 0) {
      setFieldErrors((prev) => ({
        ...prev,
        form: '회원가입 옵션이 아직 준비되지 않았습니다. 잠시 후 다시 시도해 주세요.',
      }));
      return;
    }

    try {
      setIsSubmitting(true);
      setFieldErrors((prev) => ({ ...prev, form: undefined }));

      const payload = buildOAuthRegisterRequestPayload(formValues, jobFields, oauthCode);
      await registerOAuthMember(payload, formValues.profileImage);

      const profile = await fetchMyProfile();
      setSession({
        memberId: profile.memberId,
        name: profile.name,
        email: profile.email,
      });

      router.replace('/');
      router.refresh();
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : 'OAuth 회원가입 중 오류가 발생했습니다.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex w-full flex-col gap-5"
      onSubmit={handleSubmit}
      data-cy="oauth-signup-form"
    >
      <ProfileSection
        name={formValues.name}
        birth={formValues.birth}
        gender={formValues.gender}
        onChangeName={(event) => {
          updateField('name', event.target.value);
          setFieldErrors((prev) => ({ ...prev, name: undefined }));
        }}
        onChangeBirth={(event) => {
          updateField('birth', event.target.value);
          setFieldErrors((prev) => ({ ...prev, birth: undefined }));
        }}
        onChangeGender={(event) =>
          updateField('gender', event.target.value as OAuthSignupFormValues['gender'])
        }
        nameError={fieldErrors.name}
        birthError={fieldErrors.birth}
      />

      <InterestSection
        jobFields={jobFields}
        interests={formValues.interests}
        onAdd={addInterest}
        onChange={updateInterest}
        onRemove={removeInterest}
        errorText={fieldErrors.interests || jobOptionsError}
        disabled={isLoadingJobOptions}
      />

      <SignupTechStackSection
        jobFields={jobFields}
        interests={formValues.interests}
        value={formValues.techStacksByInterest}
        onChange={(next) => updateField('techStacksByInterest', next)}
        disabled={isLoadingJobOptions}
      />

      <ProfileExtraSection
        project={formValues.projectExperienceCount}
        githubLink={formValues.githubUrl}
        blogLink={formValues.blogUrl}
        onChangeProject={(event) => {
          updateField('projectExperienceCount', event.target.value);
          setFieldErrors((prev) => ({ ...prev, projectExperienceCount: undefined }));
        }}
        onChangeGithubLink={(event) => updateField('githubUrl', event.target.value)}
        onChangeBlogLink={(event) => updateField('blogUrl', event.target.value)}
        onChangeProfileImage={(event) => {
          const file = event.target.files?.[0] ?? null;
          updateField('profileImage', file);
          event.target.value = '';
        }}
        onRemoveProfileImage={() => updateField('profileImage', null)}
        profileImageName={formValues.profileImage?.name ?? ''}
        profileImagePreviewUrl={profileImagePreviewUrl}
        projectError={fieldErrors.projectExperienceCount}
      />

      {fieldErrors.form ? <p className="text-sm text-error-red">{fieldErrors.form}</p> : null}

      <BaseButton
        size="L"
        full={true}
        type="submit"
        disabled={isSubmitting || isLoadingJobOptions}
        data-cy="oauth-signup-submit"
      >
        <span className="font-bold">{isSubmitting ? '가입 중...' : '소셜 회원가입 완료'}</span>
      </BaseButton>
    </form>
  );
}
