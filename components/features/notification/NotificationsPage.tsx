'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { NotificationCard } from './NotificationCard';
import type { NotificationCardProps } from './types';

const INITIAL_NOTIFICATIONS: NotificationCardProps[] = [
  {
    title: '🎉 프로젝트 합류를 환영합니다!',
    description:
      "'트립게더' 프로젝트의 프론트엔드 포지션 지원이 승인되었습니다. 팀 리더와 대화를 시작해보세요.",
    timestamp: '방금 전',
    variant: 'welcome',
    unread: true,
    actionHref: '/projects',
    actionLabel: '자세히 보기',
  },
  {
    title: '새로운 지원자가 있습니다.',
    description:
      "운영 중인 'meeTeam' 프로젝트에 새로운 디자이너 지원자가 있습니다. 프로필을 확인해보세요.",
    timestamp: '2시간 전',
    variant: 'applicant',
    unread: true,
    actionHref: '/projects',
    actionLabel: '자세히 보기',
  },
  {
    title: '지원 결과 안내',
    description:
      "'반려식물 케어 다이어리' 프로젝트 지원이 아쉽게도 거절되었습니다. 다른 멋진 팀들이 기다리고 있어요!",
    timestamp: '1일 전',
    variant: 'rejected',
  },
  {
    title: '지원이 완료되었습니다.',
    description: "'AI 뉴스 요약 서비스'에 성공적으로 지원했습니다. 결과는 알림으로 알려드릴게요.",
    timestamp: '3일 전',
    variant: 'submitted',
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  return (
    <section className="rounded-3xl bg-surface-soft px-4 py-4 md:px-6 md:py-8">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-2 text-sm leading-5 font-bold text-text-gray transition-colors hover:text-text-black"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-gray bg-border-soft">
            <ChevronLeft className="h-5 w-5" aria-hidden strokeWidth={1.8} />
          </span>
          뒤로가기
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl leading-9 font-bold text-text-black">알림 센터</h1>
            <span className="inline-flex items-center rounded-full border border-border-gray bg-white px-3 py-1 text-sm leading-5 font-medium text-text-gray">
              {unreadCount}개의 안 읽은 알림
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              setNotifications((current) =>
                current.map((notification) => ({
                  ...notification,
                  unread: false,
                })),
              )
            }
            className="w-fit text-sm leading-5 font-semibold text-brand-500 transition-colors hover:text-brand-700"
          >
            모두 읽음 처리
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard
              key={`${notification.title}-${notification.timestamp}`}
              {...notification}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
