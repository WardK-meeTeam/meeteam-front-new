'use client';

import { CircleAlert, X } from 'lucide-react';
import BaseModal from '@/components/shared/BaseModal';

type ProjectMemberRemovalModalProps = {
  isOpen: boolean;
  isSubmitting?: boolean;
  memberName: string;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export default function ProjectMemberRemovalModal({
  isOpen,
  isSubmitting = false,
  memberName,
  onClose,
  onConfirm,
}: ProjectMemberRemovalModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[32px] bg-mt-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          disabled={isSubmitting}
          className="absolute right-6 top-6 text-mt-shadow-blue transition-colors hover:text-mt-text-secondary"
        >
          <X className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </button>

        <div className="bg-mt-bg-soft px-6 pb-20 pt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mt-white shadow-sm ring-4 ring-mt-white">
            <CircleAlert className="h-8 w-8 text-mt-hero-blue" aria-hidden strokeWidth={1.8} />
          </div>

          <h2 className="mt-6 text-[28px] leading-7 font-extrabold text-mt-text-primary">
            팀원 방출
          </h2>
          <p className="mt-8 text-[15px] leading-[24px] text-mt-text-secondary">
            정말로 <span className="font-bold">{memberName}</span>님을 방출하시겠습니까?
          </p>
        </div>

        <div className="flex gap-3 px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl border border-mt-border bg-mt-white px-4 py-4 text-[15px] leading-[22.5px] font-bold text-mt-text-secondary transition-colors hover:bg-mt-bg-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl bg-mt-hero-blue px-4 py-4 text-[15px] leading-[22.5px] font-bold text-mt-white shadow-sm transition-colors hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? '방출 중' : '방출하기'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
