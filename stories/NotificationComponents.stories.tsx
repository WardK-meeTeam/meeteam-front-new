import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { NotificationCard } from '@/components/features/notification/NotificationCard';
import type { NotificationCardVariant } from '@/components/features/notification/types';

const notifications: Array<{
  variant: NotificationCardVariant;
  title: string;
  description: string;
  timestamp: string;
  unread?: boolean;
  actionHref?: string;
  actionLabel?: string;
}> = [
  {
    variant: 'welcome',
    title: 'meeTeam에 오신 것을 환영합니다.',
    description: '프로필을 완성하면 더 잘 맞는 프로젝트와 팀원을 추천받을 수 있어요.',
    timestamp: '방금 전',
    unread: true,
    actionHref: '/profile',
    actionLabel: '프로필 완성하기',
  },
  {
    variant: 'applicant',
    title: '새로운 지원자가 도착했어요.',
    description: '세종대 학생 팀빌딩 플랫폼 리뉴얼 프로젝트에 지원자가 있습니다.',
    timestamp: '12분 전',
    actionHref: '/profile/applications',
    actionLabel: '지원 내역 보기',
  },
  {
    variant: 'submitted',
    title: '프로젝트 지원이 접수되었습니다.',
    description: '리더가 지원서를 검토한 뒤 결과를 알려드릴 예정입니다.',
    timestamp: '1시간 전',
  },
  {
    variant: 'rejected',
    title: '이번 프로젝트는 함께하지 못하게 되었어요.',
    description: '다른 프로젝트에서도 좋은 팀원을 만날 수 있도록 계속 추천해드릴게요.',
    timestamp: '어제',
  },
  {
    variant: 'ended',
    title: '프로젝트 모집이 종료되었습니다.',
    description: '모집 기간이 종료되어 더 이상 지원을 받을 수 없습니다.',
    timestamp: '3일 전',
  },
];

const meta = {
  title: 'Features/Notification',
  component: NotificationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Applicant: Story = {
  args: notifications[1],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export const Variants: Story = {
  args: notifications[0],
  render: () => (
    <div className="flex w-full max-w-3xl flex-col gap-3">
      {notifications.map((notification) => (
        <NotificationCard key={`${notification.variant}-${notification.title}`} {...notification} />
      ))}
    </div>
  ),
};
