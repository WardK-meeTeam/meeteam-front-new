export const TEAMMATE_PAGE_COPY = {
  title: '팀원 찾기',
  description:
    '함께 성장할 수 있는 최고의 동료를 찾아보세요. 협업 온도가 높은 열정적인 메이커들이 기다리고 있습니다.',
  searchPlaceholder: '이름으로 검색하세요.',
  skillPlaceholder: '기술 스택을 추가해보세요',
  emptyTitle: '조건에 맞는 팀원이 아직 없어요.',
  emptyDescription: '다른 검색어나 기술 스택으로 다시 찾아보세요.',
} as const;

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

export const TEAMMATE_LIST_CONFIG = {
  initialVisibleCount: 15,
  loadMoreCount: 5,
  loadDelayMs: 800,
} as const;
