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
      <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          disabled={isSubmitting}
          className="absolute right-6 top-6 text-divider-soft transition-colors hover:text-text-gray"
        >
          <X className="h-5 w-5" aria-hidden strokeWidth={1.8} />
        </button>

        <div className="bg-surface-soft px-6 pb-20 pt-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-[0_0_0_4px_rgba(255,255,255,1),0_1px_2px_rgba(15,23,42,0.08)]">
            <CircleAlert className="h-8 w-8 text-danger-500" aria-hidden strokeWidth={1.8} />
          </div>

          <h2 className="mt-6 text-[28px] leading-7 font-extrabold text-text-black">팀원 방출</h2>
          <p className="mt-8 text-[15px] leading-[24px] text-text-soft">
            정말로 <span className="font-bold">{memberName}</span>님을 방출하시겠습니까?
          </p>
        </div>

        <div className="flex gap-3 px-6 pb-6 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl border border-border-gray bg-white px-4 py-4 text-[15px] leading-[22.5px] font-bold text-text-soft transition-colors hover:bg-surface-soft disabled:cursor-not-allowed disabled:opacity-70"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="flex-1 rounded-2xl bg-danger-500 px-4 py-4 text-[15px] leading-[22.5px] font-bold text-white shadow-[0_4px_6px_-1px_rgba(240,206,206,1),0_2px_4px_-2px_rgba(240,206,206,1)] transition-colors hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? '방출 중' : '방출하기'}
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
