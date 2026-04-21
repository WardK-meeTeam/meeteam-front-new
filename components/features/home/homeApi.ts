import type { ApiEnvelope } from '@/types/auth';

import { extractApiData } from '@/components/features/auth/signupTransform';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export type HomeProjectCategory =
  | '전체'
  | 'AI/테크'
  | '친환경'
  | '헬스케어'
  | '반려동물'
  | '교육/학습'
  | '패션/뷰티'
  | '금융/핀테크'
  | '기타';

export type HomeProjectCard = {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
  deadline: string;
  currentMembers: number;
  maxMembers: number;
  leader: {
    name: string;
    avatar: string;
  };
  tags: string[];
  recruitInfo: Array<{
    id: string | number;
    role: string;
    subRoles: string[];
    status: string;
    current: number;
    max: number;
  }>;
};

export type HomeMemberCard = {
  userId: number;
  name: string;
  role: string;
  experience: string;
  skills: string[];
  imageUrl: string;
};

type BackendPage<T> = {
  content: T[];
  last: boolean;
  number: number;
  size: number;
  empty: boolean;
};

type BackendProjectCardResponse = {
  projectId: number;
  projectName: string;
  categoryName: string;
  categoryCode: string;
  platformName: string;
  imageUrl: string | null;
  endDate: string | null;
  creatorName: string;
  creatorImageUrl: string | null;
  currentCount: number;
  recruitmentCount: number;
  recruitments: Array<{
    jobFieldName: string;
    jobPositionName: string;
    currentCount: number;
    recruitmentCount: number;
    isClosed?: boolean;
    closed?: boolean;
  }>;
};

type BackendMemberCardResponse = {
  memberId: number;
  profileImageUrl: string | null;
  jobFieldName: string | null;
  name: string;
  projectExperienceCount: number;
  techStacks: Array<{
    id: number;
    name: string;
    displayOrder: number;
  }>;
};

const CATEGORY_API_VALUES: Partial<Record<HomeProjectCategory, string>> = {
  'AI/테크': 'AI_TECH',
  친환경: 'ENVIRONMENT',
  헬스케어: 'HEALTHCARE',
  반려동물: 'PET',
  '교육/학습': 'EDUCATION',
  '패션/뷰티': 'FASHION_BEAUTY',
  '금융/핀테크': 'FINANCE_PRODUCTIVITY',
  기타: 'ETC',
};

async function readPublicEnvelope<T>(response: Response, fallbackMessage: string) {
  const payload = (await response.json().catch(() => null)) as ApiEnvelope<T> | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? fallbackMessage);
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  return extractApiData(payload);
}

function mapJobFieldToRole(jobFieldName: string | null) {
  switch (jobFieldName) {
    case '프론트':
      return '프론트엔드';
    case '백엔드':
      return '백엔드';
    case '디자인':
      return '디자이너';
    case '기획':
      return 'PM/기획';
    default:
      return '기타';
  }
}

function mapHomeProject(project: BackendProjectCardResponse): HomeProjectCard {
  return {
    id: project.projectId,
    title: project.projectName,
    imageUrl: project.imageUrl ?? '',
    category: project.categoryName,
    deadline: project.endDate ?? '',
    currentMembers: project.currentCount,
    maxMembers: project.recruitmentCount,
    leader: {
      name: project.creatorName,
      avatar: project.creatorImageUrl ?? '',
    },
    tags: [project.platformName].filter(Boolean),
    recruitInfo: project.recruitments.map((recruitment, index) => ({
      id: `${project.projectId}-${index + 1}`,
      role: recruitment.jobFieldName,
      subRoles: [recruitment.jobPositionName],
      status: (recruitment.isClosed ?? recruitment.closed) ? 'closed' : 'open',
      current: recruitment.currentCount,
      max: recruitment.recruitmentCount,
    })),
  };
}

function mapHomeMember(member: BackendMemberCardResponse): HomeMemberCard {
  return {
    userId: member.memberId,
    name: member.name,
    role: mapJobFieldToRole(member.jobFieldName),
    experience: `프로젝트 ${member.projectExperienceCount}회 경험`,
    skills: member.techStacks.map((techStack) => techStack.name),
    imageUrl: member.profileImageUrl ?? '',
  };
}

export async function fetchHomeProjects(size = 4, category: HomeProjectCategory = '전체') {
  const params = new URLSearchParams({
    page: '0',
    size: String(size),
    sort: 'createdAt,desc',
  });
  const projectCategory = CATEGORY_API_VALUES[category];

  if (projectCategory) {
    params.set('projectCategory', projectCategory);
  }

  const response = await fetch(`${API_BASE_URL}/api/v1/main/projects?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  const result = await readPublicEnvelope<BackendPage<BackendProjectCardResponse>>(
    response,
    '메인 프로젝트 목록을 불러오지 못했습니다.',
  );

  return result.content.map(mapHomeProject);
}

export async function fetchHomeMembers(size = 5) {
  const params = new URLSearchParams({
    page: '0',
    size: String(size),
    sort: 'createdAt,desc',
  });

  const response = await fetch(`${API_BASE_URL}/api/v1/main/members?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const result = await readPublicEnvelope<BackendPage<BackendMemberCardResponse>>(
    response,
    '메인 팀원 목록을 불러오지 못했습니다.',
  );

  return result.content.map(mapHomeMember);
}
