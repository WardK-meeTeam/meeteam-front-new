'use client';

import { useRouter } from 'next/navigation';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';
import { withdrawMember } from '@/components/features/auth/loginApi';
import BaseModal from '@/components/shared/BaseModal';
import ToastMessage from '@/components/shared/ToastMessage';
import { useAuthStore } from '@/stores/useAuthStore';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const clearSession = useAuthStore((state) => state.clearSession);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const closeConfirmModal = () => {
    if (isWithdrawing) {
      return;
    }

    setIsConfirmOpen(false);
  };

  const handleWithdraw = async () => {
    if (isWithdrawing) {
      return;
    }

    try {
      setIsWithdrawing(true);
      setErrorMessage(null);
      await withdrawMember();
      clearSession();
      router.push('/auth/login');
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '회원 탈퇴 처리 중 오류가 발생했습니다.',
      );
      setIsConfirmOpen(false);
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
      <ToastMessage message={errorMessage} />

      <div className="rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm leading-5 font-semibold text-mt-primary">설정</p>
            <br />
            <h2 className="text-lg leading-7 font-bold text-mt-text-primary">회원탈퇴</h2>
            <p className="mt-1 text-sm leading-6 text-mt-text-secondary">
              계정 정보와 활동 내역이 삭제되며, 탈퇴 후에는 복구할 수 없습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsConfirmOpen(true)}
            disabled={isWithdrawing}
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-mt-border bg-mt-white px-4 text-sm font-bold text-mt-text-secondary transition-colors hover:border-mt-text-secondary hover:text-mt-text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isWithdrawing ? '탈퇴 처리 중' : '회원탈퇴'}
          </button>
        </div>
      </div>

      <BaseModal isOpen={isConfirmOpen} onClose={closeConfirmModal}>
        <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-mt-border bg-mt-white shadow-2xl">
          <button
            type="button"
            onClick={closeConfirmModal}
            disabled={isWithdrawing}
            aria-label="모달 닫기"
            className="absolute right-5 top-5 text-mt-text-secondary transition-colors hover:text-mt-text-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="h-5 w-5" aria-hidden strokeWidth={1.8} />
          </button>

          <div className="px-6 pb-6 pt-8 sm:px-8 sm:pb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mt-danger-soft">
              <AlertTriangle className="h-6 w-6 text-mt-danger" aria-hidden strokeWidth={1.8} />
            </div>

            <h2 className="mt-5 text-2xl leading-8 font-bold text-mt-text-primary">
              회원탈퇴를 진행할까요?
            </h2>
            <p className="mt-3 text-sm leading-6 text-mt-text-secondary">
              탈퇴하면 계정 정보와 활동 내역을 복구할 수 없습니다. 진행 전 필요한 정보가
              남아있는지 한 번 더 확인해 주세요.
            </p>

            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeConfirmModal}
                disabled={isWithdrawing}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-mt-border bg-mt-white px-5 text-sm font-bold text-mt-text-secondary transition-colors hover:bg-mt-bg-soft disabled:cursor-not-allowed disabled:opacity-60"
              >
                취소
              </button>
              <button
                type="button"
                onClick={() => void handleWithdraw()}
                disabled={isWithdrawing}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-mt-danger px-5 text-sm font-bold text-mt-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isWithdrawing ? '탈퇴 처리 중' : '탈퇴하기'}
              </button>
            </div>
          </div>
        </div>
      </BaseModal>
    </section>
  );
}
