const PROTECTED_PATH_PATTERNS = [
  /^\/notifications(?:\/|$)/,
  /^\/projects\/?$/,
  /^\/projects\/create(?:\/|$)/,
  /^\/projects\/[^/]+\/apply(?:\/|$)/,
  /^\/projects\/[^/]+\/manage(?:\/|$)/,
  /^\/profile\/?$/,
  /^\/settings(?:\/|$)/,
];

export function normalizeProtectedPath(path: string) {
  return path.split(/[?#]/, 1)[0] || '/';
}

export function isProtectedPath(path: string) {
  const normalizedPath = normalizeProtectedPath(path);

  return PROTECTED_PATH_PATTERNS.some((pattern) => pattern.test(normalizedPath));
}

export function getLoginPromptCopy(path: string) {
  const normalizedPath = normalizeProtectedPath(path);

  if (normalizedPath === '/projects/create') {
    return {
      title: '프로젝트 등록은 로그인 후 가능해요',
      description: '로그인하고 팀원을 모집할 프로젝트를 바로 만들어보세요.',
    };
  }

  if (normalizedPath === '/projects') {
    return {
      title: '프로젝트 목록은 로그인 후 둘러볼 수 있어요',
      description: '로그인하고 참여할 프로젝트를 찾아보세요.',
    };
  }

  if (normalizedPath.startsWith('/projects/') && normalizedPath.includes('/apply')) {
    return {
      title: '프로젝트 지원 전 로그인이 필요해요',
      description: '로그인 후 지원서를 작성하고 프로젝트에 참여해 보세요.',
    };
  }

  if (normalizedPath.startsWith('/projects/') && normalizedPath.includes('/manage')) {
    return {
      title: '프로젝트 관리는 로그인 후 이용할 수 있어요',
      description: '로그인하고 내 프로젝트 현황을 이어서 관리해 보세요.',
    };
  }

  if (normalizedPath === '/profile') {
    return {
      title: '내 프로필은 로그인 후 열 수 있어요',
      description: '로그인하고 프로필을 등록해 스카웃 제안을 받아보세요.',
    };
  }

  if (normalizedPath.startsWith('/notifications')) {
    return {
      title: '알림 확인을 위해 로그인해 주세요',
      description: '로그인 후 팀 초대와 프로젝트 소식을 바로 확인할 수 있어요.',
    };
  }

  if (normalizedPath.startsWith('/settings')) {
    return {
      title: '설정 페이지는 로그인 후 이용할 수 있어요',
      description: '로그인하고 계정과 프로필 설정을 관리해 주세요.',
    };
  }

  return {
    title: '로그인이 필요한 기능이에요',
    description: 'meeTeam 계정으로 로그인하고 계속 진행해 주세요.',
  };
}
