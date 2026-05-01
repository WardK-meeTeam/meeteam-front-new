import { CheckCircle2 } from 'lucide-react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AppLogo from '@/components/shared/AppLogo';
import CategoryBadge from '@/components/shared/CategoryBadge';
import ProfileAvatar from '@/components/shared/ProfileAvatar';
import SkeletonBlock from '@/components/shared/SkeletonBlock';
import SkillChip from '@/components/shared/SkillChip';
import StatusBadge from '@/components/shared/StatusBadge';

const meta = {
  title: 'Shared/Display',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logo: Story = {
  render: () => (
    <div className="w-72 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <AppLogo className="h-10 w-full" />
    </div>
  ),
};

export const Badges: Story = {
  render: () => (
    <div className="flex max-w-lg flex-wrap items-center gap-3 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <CategoryBadge label="캡스톤" />
      <CategoryBadge label="창의학기제" />
      <CategoryBadge label="동아리" />
      <CategoryBadge label="기타" />
      <CategoryBadge label="모집 추천" tone="accent" size="md" />
      <StatusBadge status="open" size="md" />
      <StatusBadge status="closed" size="md" />
      <StatusBadge status="pending" size="md" />
      <StatusBadge status="leader" size="md" icon={<CheckCircle2 className="h-4 w-4" />} />
    </div>
  ),
};

export const Avatars: Story = {
  render: () => (
    <div className="flex items-center gap-4 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <ProfileAvatar name="김미팀" sizeClassName="h-16 w-16" textClassName="text-xl" />
      <ProfileAvatar
        name="이지원"
        imageUrl="/brand/meeteam_character.png"
        sizeClassName="h-16 w-16"
        textClassName="text-xl"
      />
      <ProfileAvatar
        name="박프로"
        shape="rounded"
        sizeClassName="h-16 w-16"
        textClassName="text-xl"
      />
    </div>
  ),
};

export const SkillChips: Story = {
  render: () => (
    <div className="flex max-w-lg flex-wrap gap-2 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <SkillChip label="React" variant="primary" size="md" />
      <SkillChip label="Next.js" variant="neutral" size="md" />
      <SkillChip label="TypeScript" variant="outline" size="md" />
      <SkillChip label="Figma" variant="primary" onRemove={() => console.log('remove Figma')} />
    </div>
  ),
};

export const Skeletons: Story = {
  render: () => (
    <div className="w-80 rounded-2xl border border-mt-border bg-mt-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <SkeletonBlock className="h-14 w-14 rounded-full" />
        <div className="flex-1 space-y-2">
          <SkeletonBlock className="h-5 w-32" />
          <SkeletonBlock className="h-4 w-full" />
        </div>
      </div>
      <SkeletonBlock className="mt-6 h-28 w-full" />
    </div>
  ),
};
