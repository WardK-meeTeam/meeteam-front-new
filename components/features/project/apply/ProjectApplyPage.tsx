'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Info, ChevronLeft } from 'lucide-react';
import BaseButton from '@/components/shared/BaseButton';
import BaseTextarea from '@/components/shared/BaseTextarea';

type ProjectApplyPageProps = {
  projectId: string;
};

const APPLICANT_PROFILE = {
  name: '정연준',
  role: '지원자',
  age: '28세',
  gender: '남성',
  email: 'yeonjun@example.com',
  field: '프론트엔드',
  stack: 'React',
  imageUrl: 'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
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
    <div className="grid grid-cols-[68px_minmax(0,1fr)] items-start gap-3">
      <span className="text-sm leading-5 font-bold text-text-black">{label}</span>
      <div className="min-w-0 text-sm leading-5 font-medium text-project-status-closed">
        {value}
      </div>
    </div>
  );
}

export default function ProjectApplyPage({ projectId }: ProjectApplyPageProps) {
  const router = useRouter();

  return (
    <section className="min-h-[calc(100vh-65px)]">
      <div className="mx-auto flex w-full max-w-[576px] flex-col gap-6 px-4 py-12">
        <div className="space-y-4">
          <Link
            href={`/projects/${projectId}`}
            className="inline-flex items-center gap-2 text-sm leading-5 font-bold text-text-gray transition-colors hover:text-text-black"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-gray bg-surface-soft">
              <ChevronLeft className="h-5 w-5" aria-hidden strokeWidth={1.8} />
            </span>
            뒤로가기
          </Link>

          <h1 className="text-2xl leading-8 font-extrabold text-text-black">프로젝트 지원하기</h1>
        </div>

        <div className="overflow-hidden rounded-[32px] border border-border-soft bg-white p-8 shadow-[0_20px_25px_-5px_rgba(226,232,240,0.5),0_8px_10px_-6px_rgba(226,232,240,0.5)]">
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

          <div className="mt-6 flex gap-8">
            <div className="flex w-24 shrink-0 flex-col items-center gap-3">
              <div className="relative h-24 w-24 overflow-hidden rounded-3xl border-4 border-white bg-border-gray shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)]">
                <Image
                  alt={APPLICANT_PROFILE.name}
                  className="object-cover"
                  fill
                  sizes="96px"
                  src={APPLICANT_PROFILE.imageUrl}
                />
              </div>

              <div className="space-y-1 text-center">
                <p className="text-2xl leading-7 font-bold text-text-black">
                  {APPLICANT_PROFILE.name}
                </p>
                <p className="text-xs leading-4 font-medium text-muted-gray">
                  {APPLICANT_PROFILE.role}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4 pt-1">
              <ApplicantInfoRow
                label="지원 분야"
                value={
                  <div className="flex flex-wrap gap-2">
                    <InfoChip label={APPLICANT_PROFILE.field} />
                    <InfoChip label={APPLICANT_PROFILE.stack} tone="sky" />
                  </div>
                }
              />
              <ApplicantInfoRow label="나이" value={APPLICANT_PROFILE.age} />
              <ApplicantInfoRow label="성별" value={APPLICANT_PROFILE.gender} />
              <ApplicantInfoRow label="이메일" value={APPLICANT_PROFILE.email} />
            </div>
          </div>

          <div className="my-6 h-px w-full bg-surface-soft" />

          <div className="space-y-3 pb-1">
            <div className="flex items-center gap-2">
              <span className="h-6 w-1 rounded-full bg-brand-400" />
              <h2 className="text-base leading-6 font-bold text-text-black">
                지원 사유 및 자기소개
              </h2>
            </div>

            <BaseTextarea
              rows={6}
              placeholder="이 프로젝트에 지원하게 된 계기와 본인의 강점을 자유롭게 작성해주세요."
              className="min-h-40 rounded-2xl border-border-gray bg-surface-soft px-5 py-5 text-sm leading-[22.75px] placeholder:text-muted-gray"
            />
          </div>

          <div className="mt-6 space-y-4">
            <BaseButton
              size="XL"
              variant="primary"
              full
              type="button"
              className="h-14 rounded-xl shadow-xl shadow-brand-400/40"
            >
              지원하기
            </BaseButton>

            <BaseButton
              size="XL"
              variant="gray"
              full
              type="button"
              className="h-14 w-full rounded-xl"
              onClick={() => router.push(`/projects/${projectId}`)}
            >
              취소하기
            </BaseButton>
          </div>
        </div>
      </div>
    </section>
  );
}
