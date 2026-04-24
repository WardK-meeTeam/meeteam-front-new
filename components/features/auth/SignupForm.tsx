'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import BaseButton from '@/components/shared/BaseButton';
import ToastMessage from '@/components/shared/ToastMessage';
import type { Interest, JobFieldOption, SignupFormValues } from '@/types/auth';

import AuthSection from '@/components/features/auth/AuthSection';
import InterestSection from '@/components/features/auth/InterestSection';
import ProfileExtraSection from '@/components/features/auth/ProfileExtraSection';
import ProfileSection from '@/components/features/auth/ProfileSection';
import SignupTechStackSection from '@/components/features/auth/SignupTechStackSection';

import { checkEmailDuplicate, fetchJobOptions, registerMember } from './signupApi';
import { signupEmailSchema, signupFormSchema, type SignupFieldErrors } from './schema';
import { buildRegisterRequestPayload, getInterestKey } from './signupTransform';

const INITIAL_INTEREST: Interest = { major: '', minor: '' };

const INITIAL_FORM_VALUES: SignupFormValues = {
  email: '',
  password: '',
  passwordConfirm: '',
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

type EmailCheckState = 'idle' | 'success' | 'error';

export default function SignupForm() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<SignupFormValues>(INITIAL_FORM_VALUES);
  const [jobFields, setJobFields] = useState<JobFieldOption[]>([]);
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});
  const [jobOptionsError, setJobOptionsError] = useState('');
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const [emailCheckState, setEmailCheckState] = useState<EmailCheckState>('idle');
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoadingJobOptions, setIsLoadingJobOptions] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImagePreviewUrl, setProfileImagePreviewUrl] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadJobOptions() {
      try {
        const nextJobFields = await fetchJobOptions();
        if (!isMounted) return;

        setJobFields(nextJobFields);
        setJobOptionsError('');
      } catch (error) {
        if (!isMounted) return;

        setJobOptionsError(
          error instanceof Error ? error.message : '기술 스택 옵션을 불러오지 못했습니다.',
        );
      } finally {
        if (isMounted) {
          setIsLoadingJobOptions(false);
        }
      }
    }

    loadJobOptions();

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

  const updateField = <K extends keyof SignupFormValues>(key: K, value: SignupFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, form: undefined }));
  };

  const buildValidationErrors = () => {
    const result = signupFormSchema.safeParse(formValues);

    const nextErrors: SignupFieldErrors = {};

    if (!result.success) {
      const flattened = result.error.flatten().fieldErrors;

      nextErrors.email = flattened.email?.[0];
      nextErrors.password = flattened.password?.[0];
      nextErrors.passwordConfirm = flattened.passwordConfirm?.[0];
      nextErrors.name = flattened.name?.[0];
      nextErrors.birth = flattened.birth?.[0];
      nextErrors.projectExperienceCount = flattened.projectExperienceCount?.[0];
    }

    const filledInterests = formValues.interests.filter(
      (interest) => interest.major && interest.minor,
    );
    if (filledInterests.length === 0) {
      nextErrors.interests = '분야를 선택해 주세요.';
    }

    if (!isEmailVerified) {
      nextErrors.emailCheck = '이메일 중복 확인을 완료해 주세요.';
    }

    if (!nextErrors.form) {
      nextErrors.form = Object.values(nextErrors).find(Boolean);
    }

    return nextErrors;
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('email', e.target.value);
    setFieldErrors((prev) => ({ ...prev, email: undefined, emailCheck: undefined }));
    setIsEmailVerified(false);
    setEmailCheckMessage('');
    setEmailCheckState('idle');
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('password', e.target.value);
    setFieldErrors((prev) => ({ ...prev, password: undefined, passwordConfirm: undefined }));
  };

  const onChangePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('passwordConfirm', e.target.value);
    setFieldErrors((prev) => ({ ...prev, passwordConfirm: undefined }));
  };

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('name', e.target.value);
    setFieldErrors((prev) => ({ ...prev, name: undefined }));
  };

  const onChangeBirth = (value: string) => {
    updateField('birth', value);
    setFieldErrors((prev) => ({ ...prev, birth: undefined }));
  };

  const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('gender', e.target.value as SignupFormValues['gender']);
  };

  const updateInterest = (index: number, next: Interest) => {
    setFormValues((prev) => {
      const currentInterest = prev.interests[index];
      const nextTechStacksByInterest = { ...prev.techStacksByInterest };

      if (currentInterest) {
        delete nextTechStacksByInterest[getInterestKey(currentInterest)];
      }

      if (!next.major || !next.minor) {
        delete nextTechStacksByInterest[getInterestKey(next)];
      }

      return {
        ...prev,
        interests: [next],
        techStacksByInterest: nextTechStacksByInterest,
      };
    });

    setFieldErrors((prev) => ({ ...prev, interests: undefined, form: undefined }));
  };

  const onChangeProject = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('projectExperienceCount', e.target.value);
    setFieldErrors((prev) => ({ ...prev, projectExperienceCount: undefined }));
  };

  const onChangeGithubLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('githubUrl', e.target.value);
  };

  const onChangeBlogLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField('blogUrl', e.target.value);
  };

  const onChangeProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    updateField('profileImage', file);
    e.target.value = '';
  };

  const onRemoveProfileImage = () => {
    updateField('profileImage', null);
  };

  const handleCheckEmail = async () => {
    const emailResult = signupEmailSchema.safeParse(formValues.email);

    if (!emailResult.success) {
      const message = emailResult.error.issues[0]?.message ?? '이메일 형식을 확인해 주세요.';
      setFieldErrors((prev) => ({ ...prev, email: message, emailCheck: undefined }));
      setEmailCheckMessage('');
      setEmailCheckState('idle');
      setIsEmailVerified(false);
      return;
    }

    try {
      setIsCheckingEmail(true);
      const response = await checkEmailDuplicate(formValues.email);

      setEmailCheckState(response.exists ? 'error' : 'success');
      setEmailCheckMessage(response.message);
      setIsEmailVerified(!response.exists);
      setFieldErrors((prev) => ({ ...prev, email: undefined, emailCheck: undefined }));
    } catch (error) {
      setEmailCheckState('error');
      setEmailCheckMessage(
        error instanceof Error ? error.message : '이메일 중복 확인 중 오류가 발생했습니다.',
      );
      setIsEmailVerified(false);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nextErrors = buildValidationErrors();

    if (Object.values(nextErrors).some(Boolean)) {
      setFieldErrors(nextErrors);
      return;
    }

    if (!hasSelectedTechStacks) {
      setFieldErrors((prev) => ({
        ...prev,
        form: '기술 스택을 1개 이상 선택해 주세요.',
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

      const payload = buildRegisterRequestPayload(formValues, jobFields);
      await registerMember(payload, formValues.profileImage);

      router.push('/auth/login');
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        form: error instanceof Error ? error.message : '회원가입 중 오류가 발생했습니다.',
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailFeedbackTone =
    emailCheckState === 'success' ? 'success' : emailCheckState === 'error' ? 'error' : 'default';
  const selectedInterest = formValues.interests.find(
    (interest) => interest.major && interest.minor,
  );
  const selectedInterestKey = selectedInterest ? getInterestKey(selectedInterest) : '';
  const hasSelectedTechStacks = selectedInterestKey
    ? (formValues.techStacksByInterest[selectedInterestKey]?.length ?? 0) > 0
    : false;

  return (
    <form className="flex w-full flex-col gap-5" onSubmit={handleSubmit} data-cy="signup-form">
      <AuthSection
        email={formValues.email}
        password={formValues.password}
        passwordConfirm={formValues.passwordConfirm}
        onChangeEmail={onChangeEmail}
        onChangePassword={onChangePassword}
        onChangePasswordConfirm={onChangePasswordConfirm}
        onCheckEmail={handleCheckEmail}
        emailFeedback={emailCheckMessage || fieldErrors.emailCheck}
        emailFeedbackTone={fieldErrors.emailCheck ? 'error' : emailFeedbackTone}
        emailError={fieldErrors.email}
        passwordError={fieldErrors.password || fieldErrors.passwordConfirm}
        isCheckingEmail={isCheckingEmail}
      />

      <ProfileSection
        name={formValues.name}
        birth={formValues.birth}
        gender={formValues.gender}
        onChangeName={onChangeName}
        onChangeBirth={onChangeBirth}
        onChangeGender={onChangeGender}
        nameError={fieldErrors.name}
        birthError={fieldErrors.birth}
      />

      <InterestSection
        jobFields={jobFields}
        interests={formValues.interests}
        onChange={updateInterest}
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
        onChangeProject={onChangeProject}
        onChangeGithubLink={onChangeGithubLink}
        onChangeBlogLink={onChangeBlogLink}
        onChangeProfileImage={onChangeProfileImage}
        onRemoveProfileImage={onRemoveProfileImage}
        profileImageName={formValues.profileImage?.name ?? ''}
        profileImagePreviewUrl={profileImagePreviewUrl}
        projectError={fieldErrors.projectExperienceCount}
      />

      <ToastMessage message={fieldErrors.form} />

      <BaseButton
        size="L"
        full={true}
        type="submit"
        disabled={isSubmitting || isLoadingJobOptions}
        data-cy="signup-submit"
      >
        <span className="font-bold">{isSubmitting ? '가입 중...' : '가입하기'}</span>
      </BaseButton>
    </form>
  );
}
