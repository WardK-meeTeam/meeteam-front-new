import type { Teammate } from '@/types/team';

export const TEAMMATE_ROLE_OPTIONS = [
  '전체',
  '프론트엔드',
  '백엔드',
  '디자이너',
  'PM/기획',
  '마케팅',
  '기타',
] as const;

export const TEAMMATE_SORT_OPTIONS = [
  { label: '프로젝트 경험 많은 순', value: 'experience-desc' },
  { label: '이름순', value: 'name-asc' },
] as const;

export const TEAMMATES: Teammate[] = [
  {
    id: 1,
    name: '정연준',
    role: '프론트엔드',
    experienceCount: 7,
    skills: ['React', 'Next.js', 'TypeScript'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 2,
    name: '김서연',
    role: '디자이너',
    experienceCount: 5,
    skills: ['Figma', 'Design System', 'UX Writing'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 3,
    name: '이우진',
    role: '백엔드',
    experienceCount: 8,
    skills: ['NestJS', 'PostgreSQL', 'AWS'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 4,
    name: '주경현',
    role: 'PM/기획',
    experienceCount: 4,
    skills: ['Notion', 'GA4', 'UX Research'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 5,
    name: '박민지',
    role: '마케팅',
    experienceCount: 6,
    skills: ['Meta Ads', 'Branding', 'SEO'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 6,
    name: '최지훈',
    role: '프론트엔드',
    experienceCount: 3,
    skills: ['Vue', 'TypeScript', 'Tailwind'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 7,
    name: '한지수',
    role: '백엔드',
    experienceCount: 9,
    skills: ['Spring', 'Java', 'MySQL'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 8,
    name: '윤도현',
    role: '기타',
    experienceCount: 2,
    skills: ['QA', 'Automation', 'Playwright'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 9,
    name: '서하린',
    role: '디자이너',
    experienceCount: 1,
    skills: ['Illustration', 'Motion', 'Prototype'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 10,
    name: '오세훈',
    role: '프론트엔드',
    experienceCount: 10,
    skills: ['React', 'Next.js', 'Storybook'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 11,
    name: '배지민',
    role: 'PM/기획',
    experienceCount: 5,
    skills: ['PRD', 'Roadmap', 'A/B Test'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 12,
    name: '문예린',
    role: '마케팅',
    experienceCount: 3,
    skills: ['Content', 'SEO', 'CRM'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 13,
    name: '장도윤',
    role: '백엔드',
    experienceCount: 6,
    skills: ['Go', 'Kafka', 'Redis'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 14,
    name: '권나은',
    role: '프론트엔드',
    experienceCount: 4,
    skills: ['React', 'React Query', 'Jest'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 15,
    name: '신유진',
    role: '기타',
    experienceCount: 2,
    skills: ['Data', 'Python', 'Dashboard'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 16,
    name: '김도윤',
    role: '백엔드',
    experienceCount: 11,
    skills: ['Node.js', 'NestJS', 'Prisma'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 17,
    name: '이하은',
    role: '프론트엔드',
    experienceCount: 6,
    skills: ['React', 'Next.js', 'TanStack Query'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 18,
    name: '송지안',
    role: '디자이너',
    experienceCount: 7,
    skills: ['Figma', 'Illustration', 'Design QA'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 19,
    name: '임서준',
    role: '마케팅',
    experienceCount: 4,
    skills: ['CRM', 'Copywriting', 'Brand'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 20,
    name: '조아린',
    role: 'PM/기획',
    experienceCount: 8,
    skills: ['Roadmap', 'Wireframe', 'Data'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 21,
    name: '나재민',
    role: '프론트엔드',
    experienceCount: 5,
    skills: ['React Native', 'Expo', 'TypeScript'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 22,
    name: '백서우',
    role: '백엔드',
    experienceCount: 3,
    skills: ['Go', 'gRPC', 'Docker'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 23,
    name: '강예나',
    role: '디자이너',
    experienceCount: 9,
    skills: ['UX Research', 'Prototype', 'Figma'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
  {
    id: 24,
    name: '유태오',
    role: '기타',
    experienceCount: 4,
    skills: ['QA', 'Cypress', 'Test Plan'],
    imageUrl:
      'http://localhost:3845/assets/f1172eb8cefcbe26d0f11c0aadeea5d533cb00a6.png',
  },
];
