import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { TeammateCard } from '@/components/features/team/TeammateCard';
import { TeammateCardSkeleton } from '@/components/features/team/TeammateCardSkeleton';
import { TeammateFilterChip } from '@/components/features/team/TeammateFilterChip';
import type { TeammateRole } from '@/types/team';

const roles: TeammateRole[] = ['프론트엔드', '백엔드', '디자이너', 'PM/기획', 'AI'];

const mockTeammate = {
  id: 32,
  name: '이지원',
  role: '프론트엔드' as const,
  experienceCount: 3,
  skills: ['React', 'Next.js', 'TypeScript', 'Zustand'],
  imageUrl: '/brand/meeteam_character_hat.png',
};

const meta = {
  title: 'Features/Team',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function FilterChipGroup() {
  const [selectedRole, setSelectedRole] = useState<TeammateRole>('프론트엔드');

  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-mt-border bg-mt-white p-5 shadow-sm">
      {roles.map((role) => (
        <TeammateFilterChip
          key={role}
          label={role}
          active={selectedRole === role}
          onClick={() => setSelectedRole(role)}
        />
      ))}
    </div>
  );
}

export const Card: Story = {
  render: () => (
    <div className="w-72">
      <TeammateCard teammate={mockTeammate} />
    </div>
  ),
};

export const Filters: Story = {
  render: () => <FilterChipGroup />,
};

export const Skeleton: Story = {
  render: () => (
    <div className="w-72">
      <TeammateCardSkeleton />
    </div>
  ),
};
