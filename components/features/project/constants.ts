import type { ProjectCategoryId, ReleasePlatform } from '@/types/project';

export const PROJECT_CATEGORIES: Array<{
  id: ProjectCategoryId;
  label: string;
  icon: string;
}> = [
  { id: 'ai-tech', label: 'AI/테크', icon: '🤖' },
  { id: 'eco', label: '친환경', icon: '🍀' },
  { id: 'healthcare', label: '헬스케어', icon: '💪' },
  { id: 'pets', label: '반려동물', icon: '🐱' },
  { id: 'education', label: '교육/학습', icon: '📚' },
  { id: 'fashion', label: '패션/뷰티', icon: '💄' },
  { id: 'fintech', label: '금융/핀테크', icon: '💸' },
  { id: 'etc', label: '기타', icon: '⚙️' },
];

export const RELEASE_PLATFORMS: ReleasePlatform[] = ['웹', 'iOS', '안드로이드'];

export const FINDER_PLATFORM_OPTIONS: Array<ReleasePlatform | '전체'> = [
  '전체',
  ...RELEASE_PLATFORMS,
];

export const FINDER_FIELD_OPTIONS = [
  '전체',
  '백엔드',
  '프론트엔드',
  '디자인',
  '기획',
  '마케팅',
  '기타',
] as const;

export const FINDER_CATEGORY_OPTIONS = [
  '모든 카테고리',
  ...PROJECT_CATEGORIES.map((item) => item.label),
];

export function getProjectCategoryLabel(categoryId: ProjectCategoryId | '') {
  return PROJECT_CATEGORIES.find((category) => category.id === categoryId)?.label ?? '기타';
}
