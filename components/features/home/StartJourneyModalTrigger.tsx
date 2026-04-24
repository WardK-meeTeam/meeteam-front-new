'use client';

import { useCallback, useState } from 'react';
import { ArrowRight, Rocket, Search, UserPlus } from 'lucide-react';

import { useProtectedNavigation } from '@/components/features/auth/useProtectedNavigation';
import BaseModal from '@/components/shared/BaseModal';

interface OptionCardProps {
  title: string;
  icon: 'rocket' | 'search' | 'user';
  onClick: () => void;
}

function OptionIcon({ type }: { type: OptionCardProps['icon'] }) {
  if (type === 'rocket') {
    return <Rocket aria-hidden className="h-5 w-5" strokeWidth={1.8} />;
  }

  if (type === 'search') {
    return <Search aria-hidden className="h-5 w-5" strokeWidth={1.8} />;
  }

  return <UserPlus aria-hidden className="h-5 w-5" strokeWidth={1.8} />;
}

function OptionCard({ title, icon, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex h-14 w-full items-center justify-between rounded-xl border border-mt-border bg-mt-white px-4 text-left text-sm font-bold text-mt-text-primary shadow-sm transition-colors hover:bg-mt-badge-bg"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-mt-badge-bg text-mt-primary">
          <OptionIcon type={icon} />
        </span>
        {title}
      </span>
      <ArrowRight
        aria-hidden
        className="h-4 w-4 text-mt-text-secondary transition-transform group-hover:translate-x-0.5"
        strokeWidth={1.8}
      />
    </button>
  );
}

export default function StartJourneyModalTrigger() {
  const [open, setOpen] = useState(false);
  const { navigateWithProtection } = useProtectedNavigation();

  const handleMove = useCallback(
    (path: string) => {
      setOpen(false);
      navigateWithProtection(path);
    },
    [navigateWithProtection],
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full bg-mt-hero-blue px-7 py-3.5 text-base font-bold text-mt-white shadow-lg transition-colors hover:bg-mt-primary"
      >
        프로젝트 시작하기
      </button>

      <BaseModal isOpen={open} onClose={() => setOpen(false)}>
        <section className="overflow-hidden rounded-3xl border border-mt-border bg-mt-white p-5 shadow-2xl">
          <header className="px-1 pb-4">
            <h2 className="font-brand-display text-2xl text-mt-text-primary">시작하기</h2>
          </header>

          <div className="space-y-2">
            <OptionCard
              title="프로젝트 생성하기"
              icon="rocket"
              onClick={() => handleMove('/projects/create')}
            />
            <OptionCard title="팀 찾기" icon="search" onClick={() => handleMove('/teammates')} />
            <OptionCard title="내 프로필 등록" icon="user" onClick={() => handleMove('/profile')} />
          </div>
        </section>
      </BaseModal>
    </>
  );
}
