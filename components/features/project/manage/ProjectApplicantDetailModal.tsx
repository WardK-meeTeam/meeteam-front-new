'use client';

import { ExternalLink, Mail, UserRound } from 'lucide-react';
import BaseModal from '@/components/shared/BaseModal';
import MarkdownContent from '@/components/shared/MarkdownContent';
import ToastMessage from '@/components/shared/ToastMessage';
import type { ProjectApplicant } from '@/types/project';

type ProjectApplicantDetailModalProps = {
  applicant: ProjectApplicant | null;
  isOpen: boolean;
  isLoading?: boolean;
  errorMessage?: string | null;
  onClose: () => void;
};

function getGenderLabel(gender: ProjectApplicant['gender']) {
  if (gender === 'FEMALE') {
    return '여성';
  }

  if (gender === 'MALE') {
    return '남성';
  }

  return gender ?? '-';
}

export default function ProjectApplicantDetailModal({
  applicant,
  isOpen,
  isLoading = false,
  errorMessage,
  onClose,
}: ProjectApplicantDetailModalProps) {
  if (!applicant) {
    return null;
  }

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="overflow-hidden rounded-[28px] bg-white shadow-2xl">
        <ToastMessage message={errorMessage} />

        <div className="border-b border-border-gray bg-surface-soft px-6 py-5">
          <p className="text-sm font-bold text-brand-500">지원서 상세</p>
          <h2 className="mt-1 text-2xl font-extrabold text-text-black">{applicant.name}</h2>
          <p className="mt-1 text-sm text-text-gray">
            {applicant.position} / {applicant.specialty}
          </p>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div className="flex flex-wrap gap-3 text-sm text-text-gray">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-500">
              <UserRound className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              {applicant.appliedAt}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-soft px-3 py-1 font-medium text-text-gray">
              <Mail className="h-4 w-4" aria-hidden strokeWidth={1.8} />
              {applicant.email}
            </span>
          </div>

          <div className="rounded-2xl border border-border-gray bg-white p-4">
            <p className="text-xs font-bold text-text-gray">지원자 정보</p>
            <dl className="mt-3 grid gap-3 text-sm leading-5 sm:grid-cols-2">
              <div>
                <dt className="font-bold text-text-black">나이</dt>
                <dd className="mt-1 text-text-gray">
                  {typeof applicant.age === 'number' ? `${applicant.age}세` : '-'}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-text-black">성별</dt>
                <dd className="mt-1 text-text-gray">{getGenderLabel(applicant.gender)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-border-gray bg-white p-4">
            <p className="text-xs font-bold text-text-gray">자기소개</p>
            <div className="mt-2">
              {isLoading ? (
                <p className="text-sm leading-6 text-text-body">
                  지원서 상세 정보를 불러오는 중입니다.
                </p>
              ) : (
                <MarkdownContent
                  value={applicant.introduction}
                  emptyText="아직 자기소개가 비어 있어요."
                  className="text-sm leading-6"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-border-gray px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 rounded-xl border border-border-gray bg-white px-4 py-2.5 text-sm font-bold text-text-gray transition-colors hover:bg-surface-soft"
          >
            <ExternalLink className="h-4 w-4" aria-hidden strokeWidth={1.8} />
            닫기
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
