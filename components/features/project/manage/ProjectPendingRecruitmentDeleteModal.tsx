'use client';

import { AlertTriangle, X } from 'lucide-react';
import BaseModal from '@/components/shared/BaseModal';
import type { PendingRecruitmentDeleteTarget } from './projectEditGuards';

type ProjectPendingRecruitmentDeleteModalProps = {
  isOpen: boolean;
  isSubmitting?: boolean;
  targets: PendingRecruitmentDeleteTarget[];
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function ProjectPendingRecruitmentDeleteModal({
  isOpen,
  isSubmitting = false,
  targets,
  onClose,
  onConfirm,
}: ProjectPendingRecruitmentDeleteModalProps) {
  const totalPendingCount = targets.reduce(
    (sum, target) => sum + target.pendingApplicationCount,
    0,
  );

  return (
    <BaseModal isOpen={isOpen} onClose={isSubmitting ? () => undefined : onClose}>
      <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-mt-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          disabled={isSubmitting}
          className="absolute top-6 right-6 text-mt-shadow-blue transition-colors hover:text-mt-text-secondary disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </button>

        <div className="bg-mt-bg-soft px-6 pt-12 pb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mt-white shadow-sm ring-4 ring-mt-white">
            <AlertTriangle className="h-8 w-8 text-mt-hero-blue" aria-hidden strokeWidth={1.8} />
          </div>

          <h2 className="mt-6 text-2xl leading-8 font-extrabold text-mt-text-primary">
            대기 지원자가 있어요
          </h2>
          <p className="mt-4 text-sm leading-6 text-mt-text-secondary">
            삭제하려는 모집 분야에 대기 중인 지원자가 있습니다. 계속 저장하면 해당 지원서는 자동으로
            거절됩니다.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div className="rounded-2xl border border-mt-border bg-mt-white px-4 py-3">
            <p className="text-sm leading-5 font-bold text-mt-text-primary">
              자동 거절 예정 지원자 {totalPendingCount}명
            </p>

            {targets.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {targets.map((target) => (
                  <li
                    key={target.recruitmentStateId}
                    className="flex items-center justify-between gap-3 text-sm leading-5 text-mt-text-secondary"
                  >
                    <span className="min-w-0 truncate">{target.label}</span>
                    <span className="shrink-0 font-bold text-mt-hero-blue">
                      {target.pendingApplicationCount}명
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-2 text-sm leading-5 text-mt-text-secondary">
                백엔드가 대기 지원자 충돌을 감지했습니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-3 px-6 pt-1 pb-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl border border-mt-border bg-mt-white px-4 py-4 text-sm leading-5 font-bold text-mt-text-secondary transition-colors hover:bg-mt-bg-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl bg-mt-hero-blue px-4 py-4 text-sm leading-5 font-bold text-mt-white shadow-sm transition-colors hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? '저장 중' : '자동 거절 후 저장'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
