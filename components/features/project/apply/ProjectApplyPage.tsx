'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useAuthRequiredModal } from '@/components/features/auth/useAuthRequiredModal';
import { fetchJobOptions } from '@/components/features/auth/signupApi';
import {
  applyToProject,
  fetchProjectApplicationPage,
  type ProjectApplicationPage,
} from '@/components/features/project/projectApi';
import {
  findProjectJobField,
  findProjectJobPosition,
} from '@/components/features/project/projectJobOptions';
import { projectApplicationSchema } from '@/components/features/project/apply/schema';
import BaseButton from '@/components/shared/BaseButton';
import BaseTextarea from '@/components/shared/BaseTextarea';
import { formatJobRole } from '@/components/shared/jobRoleFormat';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import ToastMessage from '@/components/shared/ToastMessage';
import type { JobFieldOption } from '@/types/auth';

type ProjectApplyPageProps = {
  projectId: string;
  initialJobField?: string;
  initialJobPosition?: string;
  initialJobPositionCode?: string;
};

type ApplicationPositionOption = {
  code: string;
  fieldName: string;
  positionName: string;
  label: string;
  techStacks: string[];
};

function InfoChip({ label, tone = 'position' }: { label: string; tone?: 'position' | 'tech' }) {
  const toneClass =
    tone === 'tech'
      ? 'border-mt-border bg-mt-badge-bg text-mt-primary'
      : 'border-mt-border bg-mt-white text-mt-text-primary';

  return (
    <span
      className={`inline-flex h-6 items-center rounded-md border px-3 text-xs leading-4 font-bold ${toneClass}`}
    >
      {label}
    </span>
  );
}

function getGenderLabel(gender: string | null | undefined) {
  switch (gender) {
    case 'MALE':
    case '남성':
      return '남성';
    case 'FEMALE':
    case '여성':
      return '여성';
    default:
      return '-';
  }
}

function buildApplicantRoleLabels(applicant?: ProjectApplicationPage['applicant']) {
  const fields = applicant?.jobFieldNames ?? [];
  const positions = applicant?.jobPositionNames ?? [];
  const itemCount = Math.max(fields.length, positions.length);

  if (itemCount === 0) {
    return ['-'];
  }

  return Array.from({ length: itemCount }, (_, index) =>
    formatJobRole(fields[index], positions[index]),
  );
}

function buildApplicationPositions(
  applicationPage: ProjectApplicationPage | null,
  jobFields: JobFieldOption[],
): ApplicationPositionOption[] {
  if (!applicationPage || jobFields.length === 0) {
    return [];
  }

  return applicationPage.recruitments
    .filter((recruitment) => !recruitment.isClosed)
    .map((recruitment) => mapRecruitmentToPositionOption(recruitment, jobFields))
    .filter((option): option is ApplicationPositionOption => option !== null);
}

function mapRecruitmentToPositionOption(
  recruitment: ProjectApplicationPage['recruitments'][number],
  jobFields: JobFieldOption[],
) {
  const field = findProjectJobField(jobFields, recruitment.jobFieldName);

  if (!field) {
    return null;
  }

  const position = findProjectJobPosition(field, recruitment.jobPositionName);

  if (!position) {
    return null;
  }

  return {
    code: position.code,
    fieldName: recruitment.jobFieldName,
    positionName: recruitment.jobPositionName,
    label: formatJobRole(recruitment.jobFieldName, recruitment.jobPositionName),
    techStacks: recruitment.techStacks,
  };
}

export default function ProjectApplyPage({
  projectId,
  initialJobField,
  initialJobPosition,
  initialJobPositionCode,
}: ProjectApplyPageProps) {
  const router = useRouter();
  const handleAuthRequired = useAuthRequiredModal();
  const [applicationPage, setApplicationPage] = useState<ProjectApplicationPage | null>(null);
  const [jobFields, setJobFields] = useState<JobFieldOption[]>([]);
  const [selectedJobPositionCode, setSelectedJobPositionCode] = useState('');
  const [motivation, setMotivation] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const positionOptions = useMemo(
    () => buildApplicationPositions(applicationPage, jobFields),
    [applicationPage, jobFields],
  );
  const selectedPosition = positionOptions.find(
    (option) => option.code === selectedJobPositionCode,
  );
  const applicant = applicationPage?.applicant;

  useEffect(() => {
    let active = true;

    const loadApplicationData = async () => {
      try {
        setIsLoading(true);
        setErrorMessage(null);

        const [nextApplicationPage, nextJobFields] = await Promise.all([
          fetchProjectApplicationPage(projectId),
          fetchJobOptions(),
        ]);

        if (!active) {
          return;
        }

        setApplicationPage(nextApplicationPage);
        setJobFields(nextJobFields);
      } catch (error) {
        if (!active) {
          return;
        }

        if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/apply` })) {
          setErrorMessage(null);
          return;
        }

        setErrorMessage(
          error instanceof Error ? error.message : '지원 정보를 불러오지 못했습니다.',
        );
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    void loadApplicationData();

    return () => {
      active = false;
    };
  }, [handleAuthRequired, projectId]);

  useEffect(() => {
    if (selectedJobPositionCode || positionOptions.length === 0) {
      return;
    }

    const queryMatchedOption = positionOptions.find(
      (option) =>
        option.code === initialJobPositionCode ||
        (option.fieldName === initialJobField && option.positionName === initialJobPosition),
    );

    setSelectedJobPositionCode(queryMatchedOption?.code ?? positionOptions[0].code);
  }, [
    initialJobField,
    initialJobPosition,
    initialJobPositionCode,
    positionOptions,
    selectedJobPositionCode,
  ]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = projectApplicationSchema.safeParse({
      jobPositionCode: selectedJobPositionCode,
      motivation,
    });

    if (!result.success) {
      setErrorMessage(result.error.issues[0]?.message ?? '지원 정보를 다시 확인해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);

      await applyToProject(projectId, result.data);
      router.push(`/projects/${projectId}`);
    } catch (error) {
      if (handleAuthRequired(error, { redirectPath: `/projects/${projectId}/apply` })) {
        return;
      }

      setErrorMessage(error instanceof Error ? error.message : '프로젝트 지원에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="min-h-screen">
        <div className="mx-auto flex w-full max-w-xl flex-col gap-4 px-4 py-12">
          <div className="h-8 w-32 rounded-xl bg-mt-bg-soft" />
          <div className="h-8 w-48 rounded-xl bg-mt-bg-soft" />
          <div className="h-96 rounded-3xl border border-mt-border bg-mt-white" />
        </div>
      </section>
    );
  }

  if (!applicationPage) {
    return (
      <section className="min-h-screen">
        <ToastMessage message={errorMessage} />

        <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-12">
          <div className="rounded-3xl border border-mt-border bg-mt-white px-8 py-12 text-center shadow-sm">
            <h1 className="text-2xl leading-8 font-extrabold text-mt-text-primary">
              지원 정보를 불러오지 못했습니다.
            </h1>
            <p className="mt-2 text-sm leading-6 text-mt-text-secondary">
              {errorMessage ?? '프로젝트 상태를 확인한 뒤 다시 시도해 주세요.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-4 py-12">
        <h1 className="text-2xl leading-8 font-extrabold text-mt-text-primary">
          프로젝트 지원하기
        </h1>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-6 border-b border-mt-border pb-7 sm:grid-cols-[7.5rem_minmax(0,1fr)]">
            <div className="flex flex-col items-center text-center">
              <ProfileAvatar
                name={applicant?.name ?? 'M'}
                imageUrl={applicant?.profileImageUrl}
                sizeClassName="h-24 w-24"
                shape="rounded"
                textClassName="text-3xl"
                className="shadow-lg shadow-mt-logo-blue/20"
              />
              <p className="mt-4 text-2xl leading-8 font-extrabold text-mt-text-primary">
                {applicant?.name ?? '-'}
              </p>
              <p className="text-sm leading-5 text-mt-text-secondary">지원자</p>
            </div>

            <dl className="grid content-center gap-4 text-sm leading-5">
              <div className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-center">
                <dt className="font-bold text-mt-text-primary">지원 분야</dt>
                <dd className="flex flex-wrap gap-2">
                  {buildApplicantRoleLabels(applicant).map((roleLabel) => (
                    <InfoChip key={roleLabel} label={roleLabel} tone="tech" />
                  ))}
                </dd>
              </div>
              <div className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)]">
                <dt className="font-bold text-mt-text-primary">나이</dt>
                <dd className="font-medium text-mt-text-secondary">
                  {typeof applicant?.age === 'number' ? `${applicant.age}세` : '-'}
                </dd>
              </div>
              <div className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)]">
                <dt className="font-bold text-mt-text-primary">성별</dt>
                <dd className="font-medium text-mt-text-secondary">
                  {getGenderLabel(applicant?.gender)}
                </dd>
              </div>
              <div className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)]">
                <dt className="font-bold text-mt-text-primary">이메일</dt>
                <dd className="min-w-0 break-words font-medium text-mt-text-secondary">
                  {applicant?.email ?? '-'}
                </dd>
              </div>
              <div className="grid gap-2 sm:grid-cols-[5rem_minmax(0,1fr)]">
                <dt className="font-bold text-mt-text-primary">프로필</dt>
                <dd className="font-medium text-mt-text-secondary">
                  {applicant?.profileSummary ?? '-'}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-7 space-y-3">
            <p className="text-base leading-6 font-bold text-mt-text-primary">지원 포지션</p>
            <div
              data-cy="project-application-position"
              className="flex min-h-14 w-full items-center rounded-xl border border-mt-border bg-mt-bg-soft px-4 text-base leading-6 font-medium text-mt-text-primary"
            >
              {selectedPosition?.label ?? '모집 중인 포지션이 없습니다.'}
            </div>

            {selectedPosition?.techStacks.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedPosition.techStacks.map((techStack) => (
                  <InfoChip key={techStack} label={techStack} tone="tech" />
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-6 space-y-3 pb-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-mt-primary" />
              <h2 className="text-base leading-6 font-bold text-mt-text-primary">
                지원 사유 및 자기소개
              </h2>
            </div>

            <BaseTextarea
              rows={8}
              value={motivation}
              data-cy="project-application-motivation"
              onChange={(event) => setMotivation(event.target.value)}
              disabled={isSubmitting || positionOptions.length === 0}
              placeholder="지원 사유와 자기소개를 입력해 주세요."
              maxLength={1000}
              className="min-h-64 resize-none bg-mt-white text-base leading-7"
            />
            <p className="text-right text-xs leading-4 font-medium text-mt-text-secondary">
              {motivation.length}/1000자
            </p>
          </div>

          <ToastMessage message={errorMessage} />

          <div className="mt-7 space-y-4">
            <BaseButton
              size="XL"
              variant="primary"
              full
              type="submit"
              disabled={isSubmitting || positionOptions.length === 0}
              data-cy="project-application-submit"
              className="h-14 rounded-xl shadow-xl shadow-mt-logo-blue/30"
            >
              {isSubmitting ? '지원 중' : '지원하기'}
            </BaseButton>

            <BaseButton
              size="XL"
              variant="gray"
              full
              type="button"
              disabled={isSubmitting}
              className="h-14 w-full rounded-xl"
              onClick={() => router.push(`/projects/${projectId}`)}
            >
              취소하기
            </BaseButton>
          </div>
        </form>
      </div>
    </section>
  );
}
