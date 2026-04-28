import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectCoverImage from '@/components/features/project/ProjectCoverImage';
import { ProjectCard } from '@/components/features/project/ProjectCard';
import { ProjectCardSkeleton } from '@/components/features/project/ProjectCardSkeleton';

const mockProject = {
  id: 101,
  title: '세종대 학생 팀빌딩 플랫폼 리뉴얼',
  imageUrl: '/campus-hero-generated.png',
  category: '캡스톤',
  deadline: '2026.05.31',
  currentMembers: 4,
  maxMembers: 6,
  leader: {
    name: '김미팀',
    avatar: '/brand/meeteam_character.png',
  },
  tags: ['Next.js', 'TypeScript', 'UI/UX'],
  recruitInfo: [
    {
      id: 'frontend',
      role: '개발',
      subRoles: ['프론트엔드'],
      status: 'open',
      current: 1,
      max: 2,
    },
    {
      id: 'design',
      role: '디자인',
      subRoles: ['UI/UX'],
      status: 'open',
      current: 1,
      max: 1,
    },
    {
      id: 'backend',
      role: '개발',
      subRoles: ['백엔드'],
      status: 'closed',
      current: 2,
      max: 2,
    },
  ],
};

const meta = {
  title: 'Features/Project',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Card: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <ProjectCard project={mockProject} />
    </div>
  ),
};

export const CompactCard: Story = {
  render: () => (
    <div className="w-full max-w-sm">
      <ProjectCard project={mockProject} compact />
    </div>
  ),
};

export const CoverImage: Story = {
  render: () => (
    <div className="w-full max-w-3xl">
      <ProjectCoverImage
        src="/campus-hero.jpg"
        alt="프로젝트 대표 이미지"
        overlayClassName="bg-mt-text-primary/20"
      />
    </div>
  ),
};

export const Skeleton: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <ProjectCardSkeleton />
    </div>
  ),
};
