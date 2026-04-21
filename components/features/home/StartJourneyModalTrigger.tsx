'use client';

import { useCallback, useState } from 'react';
import { Rocket, Search, UserPlus } from 'lucide-react';

import { useProtectedNavigation } from '@/components/features/auth/useProtectedNavigation';
import BaseModal from '@/components/shared/BaseModal';

interface OptionCardProps {
  title: string;
  description: string[];
  icon: 'rocket' | 'search';
  onClick: () => void;
}

function OptionIcon({ type }: { type: 'rocket' | 'search' }) {
  if (type === 'rocket') {
    return <Rocket aria-hidden className="h-8 w-8 text-brand-500" strokeWidth={1.8} />;
  }

  return <Search aria-hidden className="h-8 w-8 text-brand-500" strokeWidth={1.8} />;
}

function OptionCard({ title, description, icon, onClick }: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-3xl border border-border-gray bg-white p-6 text-left transition-colors hover:bg-brand-50"
    >
      <div className="mb-4 inline-flex rounded-2xl border border-border-gray bg-white p-4 shadow-sm">
        <OptionIcon type={icon} />
      </div>

      <h3 className="text-xl font-bold text-text-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-gray">
        {description.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
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
        className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-bold text-white shadow-lg"
      >
        ⚡ 프로젝트 시작하기
      </button>

      <BaseModal isOpen={open} onClose={() => setOpen(false)}>
        <section className="overflow-hidden rounded-4xl border border-border-gray bg-white shadow-2xl">
          <header className="border-b border-border-gray px-6 py-6">
            <h2 className="text-2xl font-extrabold text-text-black">어떤 여정을 시작하시겠어요?</h2>
            <p className="mt-2 text-base text-text-gray">meeTeam과 함께할 방식을 선택해주세요.</p>
          </header>

          <div className="grid gap-4 p-6 md:grid-cols-2">
            <OptionCard
              title="프로젝트 생성하기"
              description={['반짝이는 아이디어가 있으신가요?', '리더가 되어 팀원을 모집해보세요.']}
              icon="rocket"
              onClick={() => handleMove('/projects/create')}
            />
            <OptionCard
              title="팀 찾기"
              description={[
                '보유한 기술로 기여하고 싶으신가요?',
                '나에게 딱 맞는 팀을 찾아보세요.',
              ]}
              icon="search"
              onClick={() => handleMove('/teammates')}
            />
          </div>

          <footer className="border-t border-border-gray bg-brand-50 px-6 py-4">
            <button
              type="button"
              onClick={() => handleMove('/profile')}
              className="mx-auto flex items-center gap-2 text-sm font-medium text-text-gray"
            >
              <UserPlus aria-hidden className="h-4 w-4" strokeWidth={1.8} />
              <span>
                <strong className="font-bold">내 프로필 등록</strong>으로 스카웃 제안을 받을 수도
                있어요!
              </span>
            </button>
          </footer>
        </section>
      </BaseModal>
    </>
  );
}
