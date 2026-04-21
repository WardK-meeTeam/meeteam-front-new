'use client';

import Link from 'next/link';

type AuthRequiredFallbackProps = {
  title?: string;
  description?: string;
};

export default function AuthRequiredFallback({
  title = '로그인이 필요한 화면이에요',
  description = '로그인 모달에서 이어서 진행하거나 홈으로 돌아갈 수 있어요.',
}: AuthRequiredFallbackProps) {
  return (
    <section className="mx-auto flex min-h-[420px] w-full max-w-3xl items-center justify-center px-4 py-16 text-center">
      <div className="w-full rounded-3xl border border-border-gray bg-white px-6 py-10 shadow-sm">
        <p className="text-sm leading-5 font-bold text-brand-500">meeTeam</p>
        <h1 className="mt-2 text-2xl leading-8 font-extrabold text-text-black">{title}</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-gray">{description}</p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-border-gray bg-white px-5 text-sm leading-5 font-bold text-text-gray transition-colors hover:bg-surface-soft hover:text-text-black"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </section>
  );
}
