import type { LucideIcon } from 'lucide-react';
import { Github, Link2, Mail } from 'lucide-react';

export const profileData = {
  name: '홍지연',
  role: 'Product Designer',
  age: '22세',
  gender: '여성',
  fieldCategory: '디자인',
  fieldRole: 'UI/UX디자인',
  field: '디자인, 그래픽디자인',
  projectCount: '2회',
  email: 'gimmilyang542@gmail.com',
  github: 'github.com/hongjiyeon',
  blog: 'velog.io/@hongji',
  introduction: '',
  profileImage: 'https://www.figma.com/api/mcp/asset/fb8f287d-9a11-49ab-a87f-83ff2ebe3644',
};

export interface JoinedProject {
  id: number;
  title: string;
  category: string;
  leader: string;
  currentMembers: number;
  maxMembers: number;
  imageUrl: string;
  leaderImageUrl: string;
}

export const joinedProject: JoinedProject | null = {
  id: 1,
  title: 'AI 기반 뉴스 요약 서비스 개발',
  category: '캡스톤',
  leader: '정연준',
  currentMembers: 2,
  maxMembers: 4,
  imageUrl: 'https://www.figma.com/api/mcp/asset/637f8ee8-cae2-4845-a485-a8d0b1689890',
  leaderImageUrl: 'https://www.figma.com/api/mcp/asset/8de2e79c-fc53-4d9f-aa80-59389cfadc6b',
};

export const profileInfoItems = [
  { label: '나이', value: profileData.age },
  { label: '성별', value: profileData.gender },
  { label: '직군', value: profileData.field },
  { label: '프로젝트 횟수', value: profileData.projectCount },
];

export const skillGroups = [
  {
    category: '프론트엔드',
    role: '웹프론트엔드',
    skills: ['React.js', 'Next.js'],
  },
  {
    category: '디자인',
    role: 'UI/UX 디자이너',
    skills: ['Figma'],
  },
];

export interface ContactItem {
  icon: LucideIcon;
  value: string;
  href: string;
}

export const contactItems: ContactItem[] = [
  {
    icon: Mail,
    value: profileData.email,
    href: `mailto:${profileData.email}`,
  },
  {
    icon: Github,
    value: profileData.github,
    href: `https://${profileData.github}`,
  },
  {
    icon: Link2,
    value: profileData.blog,
    href: `https://${profileData.blog}`,
  },
];
