import { Bell, UserRound } from 'lucide-react';
import AuthLink from '@/components/features/auth/AuthLink';

export default function ProfileSettingsPage() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-3xl border border-mt-border bg-mt-white p-6 shadow-sm md:p-8">
      <div className="space-y-2">
        <p className="text-sm leading-5 font-semibold text-mt-primary">설정</p>
        <h1 className="text-3xl leading-tight font-bold text-mt-text-primary">계정 설정</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AuthLink
          href="/profile"
          className="flex min-h-32 flex-col gap-3 rounded-2xl border border-mt-border bg-mt-bg-soft p-5 transition-colors hover:border-mt-border hover:bg-mt-badge-bg"
        >
          <UserRound className="h-5 w-5 text-mt-text-nav" aria-hidden strokeWidth={1.8} />
          <div className="space-y-1">
            <p className="text-base leading-6 font-bold text-mt-text-primary">내 프로필 보기</p>
            <p className="text-sm leading-6 text-mt-text-secondary">
              프로필 정보와 참여 프로젝트 상태를 확인할 수 있습니다.
            </p>
          </div>
        </AuthLink>

        <AuthLink
          href="/notifications"
          className="flex min-h-32 flex-col gap-3 rounded-2xl border border-mt-border bg-mt-bg-soft p-5 transition-colors hover:border-mt-border hover:bg-mt-badge-bg"
        >
          <Bell className="h-5 w-5 text-mt-text-nav" aria-hidden strokeWidth={1.8} />
          <div className="space-y-1">
            <p className="text-base leading-6 font-bold text-mt-text-primary">알림 보기</p>
            <p className="text-sm leading-6 text-mt-text-secondary">
              새 지원자와 프로젝트 업데이트 알림을 바로 확인할 수 있습니다.
            </p>
          </div>
        </AuthLink>
      </div>
    </section>
  );
}
