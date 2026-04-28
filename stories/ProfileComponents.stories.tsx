import { Github, Link2, Mail } from 'lucide-react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BasicInfoCard from '@/components/features/profile/BasicInfoCard';
import IntroductionCard from '@/components/features/profile/IntroductionCard';
import JoinedProjectCard from '@/components/features/profile/JoinedProjectCard';
import ParticipationStatusCard from '@/components/features/profile/ParticipationStatusCard';
import ProfileCard from '@/components/features/profile/ProfileCard';
import ProfileHeader from '@/components/features/profile/ProfileHeader';
import ProfileOverviewSkeleton from '@/components/features/profile/ProfileOverviewSkeleton';
import SkillsCard from '@/components/features/profile/SkillsCard';

const infoItems = [
  { label: '이름', value: '김미팀' },
  { label: '나이', value: '24세' },
  { label: '성별', value: '여성' },
  { label: '직군', value: '개발 / 프론트엔드' },
];

const emailContact = {
  label: '이메일',
  icon: Mail,
  value: 'meeteam@sejong.ac.kr',
  href: 'mailto:meeteam@sejong.ac.kr',
};

const socialContacts = [
  {
    label: 'GitHub',
    icon: Github,
    value: 'github.com/meeteam',
    href: 'https://github.com/meeteam',
  },
  {
    label: '블로그',
    icon: Link2,
    value: 'meeteam.dev',
    href: 'https://meeteam.dev',
  },
];

const skillGroups = [
  {
    category: '개발',
    role: '프론트엔드',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  },
  {
    category: '디자인',
    role: 'UI/UX',
    skills: ['Figma', 'Design System'],
  },
];

const joinedProjects = [
  {
    id: 1,
    title: '세종대 학생 팀빌딩 플랫폼 리뉴얼',
    category: '캡스톤',
    leader: '김미팀',
    currentMembers: 4,
    maxMembers: 6,
    imageUrl: '/campus-hero-generated.png',
    leaderImageUrl: '/brand/meeteam_character.png',
  },
  {
    id: 2,
    title: '교내 동아리 매칭 서비스',
    category: '동아리',
    leader: '이지원',
    currentMembers: 3,
    maxMembers: 5,
    imageUrl: '/campus-hero.jpg',
    leaderImageUrl: null,
  },
];

const meta = {
  title: 'Features/Profile',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ProfileShowcase() {
  const [isParticipating, setIsParticipating] = useState(true);

  return (
    <main className="bg-mt-bg-soft px-4 py-8 sm:px-6">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <ProfileHeader
          name="김미팀"
          role="프론트엔드"
          email="meeteam@sejong.ac.kr"
          profileImageUrl="/brand/meeteam_character_hat.png"
          isParticipating={isParticipating}
          projectCount={3}
          skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']}
          onAction={() => console.log('profile action')}
        />

        <div className="grid gap-6 lg:grid-cols-[309px_minmax(0,1fr)]">
          <aside className="flex flex-col gap-6">
            <ParticipationStatusCard
              isParticipating={isParticipating}
              editable
              onToggle={() => setIsParticipating((current) => !current)}
            />
            <BasicInfoCard
              infoItems={infoItems}
              emailContact={emailContact}
              socialContacts={socialContacts}
            />
          </aside>

          <section className="flex flex-col gap-6">
            <SkillsCard skillGroups={skillGroups} />
            <IntroductionCard
              value={`함께 성장하는 팀을 좋아하는 프론트엔드 개발자입니다.

Next.js와 TypeScript 기반 제품을 만들고, 디자인 시스템과 접근성 개선에도 관심이 많습니다.`}
            />
            <JoinedProjectCard projects={joinedProjects} />
          </section>
        </div>
      </div>
    </main>
  );
}

function EditableBasicInfo() {
  const [formData, setFormData] = useState({
    name: '김미팀',
    age: '24세',
    gender: '여성',
    fieldCategory: '개발',
    fieldRole: '프론트엔드',
    email: 'meeteam@sejong.ac.kr',
    github: 'https://github.com/meeteam',
    blog: 'https://meeteam.dev',
  });

  return (
    <div className="w-full max-w-sm">
      <BasicInfoCard
        editable
        infoItems={infoItems}
        emailContact={emailContact}
        socialContacts={socialContacts}
        categoryOptions={['개발', '디자인', '기획']}
        roleOptions={['프론트엔드', '백엔드', 'UI/UX']}
        formData={formData}
        onFieldChange={(field, value) =>
          setFormData((current) => ({
            ...current,
            [field]: value,
          }))
        }
      />
    </div>
  );
}

export const Overview: Story = {
  render: () => <ProfileShowcase />,
};

export const BasicInfoEditing: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => <EditableBasicInfo />,
};

export const EmptyStates: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="grid w-full max-w-4xl gap-6 md:grid-cols-2">
      <ProfileCard title="프로필 카드">카드 내부 콘텐츠를 자유롭게 배치할 수 있습니다.</ProfileCard>
      <ParticipationStatusCard isParticipating={false} />
      <IntroductionCard value="" />
      <JoinedProjectCard projects={[]} />
    </div>
  ),
};

export const Loading: Story = {
  render: () => <ProfileOverviewSkeleton />,
};
