'use client';

import { useRouter } from 'next/navigation';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Info } from 'lucide-react';
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

function InfoChip({ label, tone = 'indigo' }: { label: string; tone?: 'indigo' | 'sky' }) {
  const toneClass =
    tone === 'sky'
      ? 'border-brand-100 bg-brand-50 text-brand-500'
      : 'border-brand-100 bg-chip-bg text-brand-700';

  return (
    <span
      className={`inline-flex h-6 items-center rounded-md border px-3 text-xs leading-4 font-bold ${toneClass}`}
    >
      {label}
    </span>
  );
}

function ApplicantInfoRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="w-20 shrink-0 text-sm leading-5 font-bold text-text-black">{label}</span>
      <div className="min-w-0 text-sm leading-5 font-medium text-project-status-closed">
        {value}
      </div>
    </div>
  );
}

function formatAge(age: number | null | undefined) {
  if (typeof age !== 'number') {
    return '-';
  }

  return `${age}세`;
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
    label: `${recruitment.jobFieldName} / ${recruitment.jobPositionName}`,
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
  const profileRole =
    applicant?.profileSummary ||
    [applicant?.jobFieldNames[0], applicant?.jobPositionNames[0]].filter(Boolean).join(' / ');

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
          <div className="h-8 w-32 rounded-xl bg-surface-soft" />
          <div className="h-8 w-48 rounded-xl bg-surface-soft" />
          <div className="h-96 rounded-3xl border border-border-soft bg-white" />
        </div>
      </section>
    );
  }

  if (!applicationPage) {
    return (
      <section className="min-h-screen">
        <ToastMessage message={errorMessage} />

        <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-12">
          <div className="rounded-3xl border border-border-soft bg-white px-8 py-12 text-center shadow-sm">
            <h1 className="text-2xl leading-8 font-extrabold text-text-black">
              지원 정보를 불러오지 못했습니다.
            </h1>
            <p className="mt-2 text-sm leading-6 text-text-gray">
              {errorMessage ?? '프로젝트 상태를 확인한 뒤 다시 시도해 주세요.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6 px-4 py-12">
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl leading-8 font-extrabold text-text-black">프로젝트 지원하기</h1>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-border-soft bg-white p-8 shadow-sm"
        >
          <div className="rounded-xl bg-surface-soft px-3 py-3">
            <div className="flex items-start gap-2 text-xs leading-4 font-normal text-text-gray">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                aria-hidden
                strokeWidth={2}
              />
              <p>
                프로필에 등록된 정보로 지원합니다. 정보 수정이 필요하다면 마이페이지를 이용
                해주세요.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:gap-8">
            <div className="flex w-full shrink-0 flex-col items-center gap-3 sm:w-24">
              <ProfileAvatar
                name={applicant?.name ?? 'M'}
                imageUrl={applicant?.profileImageUrl}
                sizeClassName="h-24 w-24"
                shape="rounded"
                textClassName="text-2xl"
                className="border-4 border-white bg-border-gray text-text-gray shadow-lg"
              />

              <div className="space-y-1 text-center">
                <p className="text-2xl leading-7 font-bold text-text-black">
                  {applicant?.name ?? '-'}
                </p>
                <p className="text-xs leading-4 font-medium text-muted-gray">지원자</p>
              </div>
            </div>

            <div className="flex-1 space-y-4 pt-1">
              <ApplicantInfoRow
                label="지원 분야"
                value={
                  selectedPosition ? (
                    <div className="flex flex-wrap gap-2">
                      <InfoChip label={selectedPosition.fieldName} />
                      <InfoChip label={selectedPosition.positionName} tone="sky" />
                    </div>
                  ) : (
                    '선택 가능한 포지션이 없습니다.'
                  )
                }
              />
              <ApplicantInfoRow label="나이" value={formatAge(applicant?.age)} />
              <ApplicantInfoRow label="성별" value={applicant?.gender ?? '-'} />
              <ApplicantInfoRow label="이메일" value={applicant?.email ?? '-'} />
              <ApplicantInfoRow label="프로필" value={profileRole || '-'} />
            </div>
          </div>

          <div className="my-6 h-px w-full bg-surface-soft" />

          <div className="space-y-3">
            <label
              htmlFor="project-application-position"
              className="block text-sm leading-5 font-bold text-text-black"
            >
              지원 포지션
            </label>
            <select
              id="project-application-position"
              value={selectedJobPositionCode}
              onChange={(event) => setSelectedJobPositionCode(event.target.value)}
              disabled={positionOptions.length === 0 || isSubmitting}
              className="h-12 w-full rounded-xl border border-border-gray bg-white px-4 text-sm leading-5 font-medium text-text-black outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-400/20 disabled:cursor-not-allowed disabled:bg-surface-soft disabled:text-muted-gray"
            >
              {positionOptions.length === 0 ? (
                <option value="">모집 중인 포지션이 없습니다.</option>
              ) : (
                positionOptions.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.label}
                  </option>
                ))
              )}
            </select>
            {selectedPosition?.techStacks.length ? (
              <div className="flex flex-wrap gap-2">
                {selectedPosition.techStacks.map((techStack) => (
                  <InfoChip key={techStack} label={techStack} tone="sky" />
                ))}
              </div>
            ) : null}
          </div>

          <div className="mt-6 space-y-3 pb-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-brand-400" />
              <h2 className="text-base leading-6 font-bold text-text-black">
                지원 사유 및 자기소개
              </h2>
            </div>

            <BaseTextarea
              rows={6}
              value={motivation}
              onChange={(event) => setMotivation(event.target.value)}
              disabled={isSubmitting || positionOptions.length === 0}
              placeholder="이 프로젝트에 지원하게 된 계기와 본인의 강점을 자유롭게 작성해주세요."
              className="min-h-40 rounded-2xl border-border-gray bg-surface-soft px-5 py-5 text-sm leading-6 placeholder:text-muted-gray"
            />
          </div>

          <ToastMessage message={errorMessage} />

          <div className="mt-6 space-y-4">
            <BaseButton
              size="XL"
              variant="primary"
              full
              type="submit"
              disabled={isSubmitting || positionOptions.length === 0}
              className="h-14 rounded-xl shadow-xl shadow-brand-400/40"
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
