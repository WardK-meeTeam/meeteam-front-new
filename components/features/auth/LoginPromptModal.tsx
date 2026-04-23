'use client';

import { X } from 'lucide-react';

import BaseModal from '@/components/shared/BaseModal';
import { useLoginModalStore } from '@/stores/useLoginModalStore';

import LoginForm from './LoginForm';
import SocialLogin from './SocialLogin';

export default function LoginPromptModal() {
  const isOpen = useLoginModalStore((state) => state.isOpen);
  const redirectPath = useLoginModalStore((state) => state.redirectPath);
  const title = useLoginModalStore((state) => state.title);
  const description = useLoginModalStore((state) => state.description);
  const closeLoginModal = useLoginModalStore((state) => state.closeLoginModal);

  return (
    <BaseModal isOpen={isOpen} onClose={closeLoginModal}>
      <section className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl border border-border-gray bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-lg font-bold text-text-black">meeTeam</p>
            <div className="space-y-1">
              <h2 className="text-xl font-extrabold text-text-black">{title}</h2>
              <p className="text-sm leading-6 text-text-gray">{description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeLoginModal}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border-gray text-text-gray transition-colors hover:bg-surface-soft hover:text-text-black"
            aria-label="로그인 모달 닫기"
          >
            <X className="h-4 w-4" aria-hidden strokeWidth={1.8} />
          </button>
        </div>

        <LoginForm redirectPath={redirectPath ?? undefined} onSuccess={closeLoginModal} />
        <SocialLogin />

        <p className="text-center text-sm leading-5 text-text-gray">
          신규 회원은 세종대 포털 로그인 후 가입 단계를 이어서 진행할 수 있어요.
        </p>
      </section>
    </BaseModal>
  );
}
