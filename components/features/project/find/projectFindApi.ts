import type { ApiEnvelope } from '@/types/auth';

import { createApiError } from '@/components/features/auth/authError';
import { extractApiData } from '@/components/features/auth/signupTransform';
import type {
  CategoryFilter,
  FieldFilter,
  PlatformFilter,
  ProjectFinderFilters,
  RecruitFilter,
  SortFilter,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

export type ProjectSearchCard = {
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
};

interface BackendProjectCardResponse {
  projectId: number;
  projectName: string;
  categoryName: string;
  imageUrl: string | null;
  endDate: string | null;
  creatorName: string;
  creatorImageUrl: string | null;
  currentCount: number;
  recruitmentCount: number;
}

interface ProjectSearchSlice {
  content: BackendProjectCardResponse[];
  last: boolean;
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
}

export async function fetchProjectSearchResults(
  filters: ProjectFinderFilters,
  page: number,
  size: number,
) {
  const unsupportedFieldSelected = filters.field === '마케팅' || filters.field === '기타';
  if (unsupportedFieldSelected) {
    return {
      projects: [] as ProjectSearchCard[],
      hasMore: false,
    };
  }

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  });

  const keyword = filters.searchValue.trim();
  if (keyword.length >= 2) {
    params.set('keyword', keyword);
  }

  const projectCategory = mapCategoryFilter(filters.category);
  if (projectCategory) {
    params.set('projectCategory', projectCategory);
  }

  const recruitment = mapRecruitFilter(filters.recruitOnly);
  if (recruitment) {
    params.set('recruitment', recruitment);
  }

  const platformCategory = mapPlatformFilter(filters.platform);
  if (platformCategory) {
    params.set('platformCategory', platformCategory);
  }

  const jobField = mapFieldFilter(filters.field);
  if (jobField) {
    params.set('jobField', jobField);
  }

  params.set('sort', mapSortFilter(filters.sort));

  const response = await fetch(`${API_BASE_URL}/api/v1/projects/search?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    credentials: 'include',
  });

  const payload = (await response
    .json()
    .catch(() => null)) as ApiEnvelope<ProjectSearchSlice> | null;

  if (!response.ok) {
    throw createApiError(response, payload, '프로젝트 목록을 불러오지 못했습니다.');
  }

  if (!payload) {
    throw new Error('응답 형식을 해석할 수 없습니다.');
  }

  const result = extractApiData(payload);

  return {
    projects: result.content.map(mapProjectCard),
    hasMore: !result.last,
  };
}

function mapProjectCard(project: BackendProjectCardResponse): ProjectSearchCard {
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
  };
}

function mapCategoryFilter(category: CategoryFilter) {
  switch (category) {
    case 'AI/테크':
      return 'AI_TECH';
    case '친환경':
      return 'ENVIRONMENT';
    case '헬스케어':
      return 'HEALTHCARE';
    case '반려동물':
      return 'PET';
    case '교육/학습':
      return 'EDUCATION';
    case '패션/뷰티':
      return 'FASHION_BEAUTY';
    case '금융/핀테크':
      return 'FINANCE_PRODUCTIVITY';
    case '기타':
      return 'ETC';
    default:
      return null;
  }
}

function mapRecruitFilter(recruitOnly: RecruitFilter) {
  return recruitOnly === 'recruiting' ? 'RECRUITING' : null;
}

function mapPlatformFilter(platform: PlatformFilter) {
  switch (platform) {
    case '웹':
      return 'WEB';
    case 'iOS':
      return 'IOS';
    case '안드로이드':
      return 'ANDROID';
    default:
      return null;
  }
}

function mapFieldFilter(field: FieldFilter) {
  switch (field) {
    case '기획':
      return 'PLANNING';
    case '디자인':
      return 'DESIGN';
    case '프론트엔드':
      return 'FRONTEND';
    case '백엔드':
      return 'BACKEND';
    default:
      return null;
  }
}

function mapSortFilter(sort: SortFilter) {
  return sort === 'deadline' ? 'DEADLINE' : 'LATEST';
}
