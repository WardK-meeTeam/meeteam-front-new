import Link from 'next/link';
import { Bell, UserRound } from 'lucide-react';

export default function ProfileSettingsPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-border-gray bg-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <p className="text-sm leading-5 font-semibold text-brand-500">설정</p>
        <h1 className="text-3xl leading-tight font-bold text-text-black">계정 설정</h1>
        <p className="text-sm leading-6 text-text-gray">
          계정 관련 설정 화면은 현재 준비 중입니다. 필요한 정보 확인은 프로필과 알림 페이지에서
          이어서 할 수 있어요.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/profile"
          className="flex min-h-32 flex-col gap-3 rounded-2xl border border-border-gray bg-surface-soft p-5 transition-colors hover:border-brand-100 hover:bg-brand-50"
        >
          <UserRound className="h-5 w-5 text-text-body" aria-hidden strokeWidth={1.8} />
          <div className="space-y-1">
            <p className="text-base leading-6 font-bold text-text-black">내 프로필 보기</p>
            <p className="text-sm leading-6 text-text-gray">
              프로필 정보와 참여 프로젝트 상태를 확인할 수 있습니다.
            </p>
          </div>
        </Link>

        <Link
          href="/notifications"
          className="flex min-h-32 flex-col gap-3 rounded-2xl border border-border-gray bg-surface-soft p-5 transition-colors hover:border-brand-100 hover:bg-brand-50"
        >
          <Bell className="h-5 w-5 text-text-body" aria-hidden strokeWidth={1.8} />
          <div className="space-y-1">
            <p className="text-base leading-6 font-bold text-text-black">알림 보기</p>
            <p className="text-sm leading-6 text-text-gray">
              새 지원자와 프로젝트 업데이트 알림을 바로 확인할 수 있습니다.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
