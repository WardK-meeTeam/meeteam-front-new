const PROJECTS_PATH = '/projects';
const INITIAL_PROJECT_BATCH_SIZE = 8;

type ProjectFixture = {
  projectId: number;
  projectName: string;
  categoryName: string;
  imageUrl: string | null;
  endDate: string | null;
  creatorName: string;
  creatorImageUrl: string | null;
  currentCount: number;
  recruitmentCount: number;
  recruitment: 'RECRUITING' | 'COMPLETED';
  platformCategory: 'WEB' | 'IOS' | 'ANDROID';
  jobFields: string[];
};

const ALL_PROJECTS: ProjectFixture[] = [
  {
    projectId: 11,
    projectName: '핏로그: 운동 루틴 기록 플랫폼',
    categoryName: '헬스케어',
    imageUrl: null,
    endDate: '2025-12-03',
    creatorName: '강예나',
    creatorImageUrl: null,
    currentCount: 3,
    recruitmentCount: 6,
    recruitment: 'RECRUITING',
    platformCategory: 'WEB',
    jobFields: ['FRONTEND', 'DESIGN'],
  },
  {
    projectId: 10,
    projectName: '펫메이트: 반려동물 돌봄 매칭',
    categoryName: '반려동물',
    imageUrl: null,
    endDate: '2025-12-01',
    creatorName: '김서연',
    creatorImageUrl: null,
    currentCount: 2,
    recruitmentCount: 5,
    recruitment: 'RECRUITING',
    platformCategory: 'ANDROID',
    jobFields: ['BACKEND'],
  },
  {
    projectId: 9,
    projectName: '스터디스냅: 학습 인증 커뮤니티',
    categoryName: '교육/학습',
    imageUrl: null,
    endDate: '2025-11-29',
    creatorName: '박수민',
    creatorImageUrl: null,
    currentCount: 4,
    recruitmentCount: 7,
    recruitment: 'RECRUITING',
    platformCategory: 'WEB',
    jobFields: ['PLANNING'],
  },
  {
    projectId: 8,
    projectName: '핀그로우: 개인 재무 습관 트래커',
    categoryName: '금융/핀테크',
    imageUrl: null,
    endDate: '2025-11-27',
    creatorName: '권나은',
    creatorImageUrl: null,
    currentCount: 1,
    recruitmentCount: 4,
    recruitment: 'RECRUITING',
    platformCategory: 'IOS',
    jobFields: ['FRONTEND'],
  },
  {
    projectId: 7,
    projectName: '클로젯노트: 데일리 코디 아카이브',
    categoryName: '패션/뷰티',
    imageUrl: null,
    endDate: '2025-11-25',
    creatorName: '정소윤',
    creatorImageUrl: null,
    currentCount: 2,
    recruitmentCount: 4,
    recruitment: 'COMPLETED',
    platformCategory: 'IOS',
    jobFields: ['DESIGN'],
  },
  {
    projectId: 6,
    projectName: '그린루프: 제로웨이스트 실천 챌린지',
    categoryName: '친환경',
    imageUrl: null,
    endDate: '2025-11-23',
    creatorName: '오하린',
    creatorImageUrl: null,
    currentCount: 5,
    recruitmentCount: 6,
    recruitment: 'RECRUITING',
    platformCategory: 'WEB',
    jobFields: ['BACKEND'],
  },
  {
    projectId: 5,
    projectName: '케어링크: 보호자-병원 소통 노트',
    categoryName: '헬스케어',
    imageUrl: null,
    endDate: '2025-11-21',
    creatorName: '이도현',
    creatorImageUrl: null,
    currentCount: 3,
    recruitmentCount: 5,
    recruitment: 'COMPLETED',
    platformCategory: 'ANDROID',
    jobFields: ['PLANNING'],
  },
  {
    projectId: 4,
    projectName: '펫로그북: 반려동물 성장 기록 앨범',
    categoryName: '반려동물',
    imageUrl: null,
    endDate: '2025-11-19',
    creatorName: '최윤아',
    creatorImageUrl: null,
    currentCount: 2,
    recruitmentCount: 3,
    recruitment: 'RECRUITING',
    platformCategory: 'ANDROID',
    jobFields: ['DESIGN'],
  },
  {
    projectId: 3,
    projectName: '트립게더: 여행 동행 구하기',
    categoryName: '기타',
    imageUrl: null,
    endDate: '2025-11-19',
    creatorName: '이우진',
    creatorImageUrl: null,
    currentCount: 1,
    recruitmentCount: 5,
    recruitment: 'RECRUITING',
    platformCategory: 'WEB',
    jobFields: ['FRONTEND'],
  },
  {
    projectId: 2,
    projectName: 'meeTeam: 사이드 프로젝트 모집 플랫폼',
    categoryName: 'AI/테크',
    imageUrl: null,
    endDate: '2025-11-19',
    creatorName: '이우진',
    creatorImageUrl: null,
    currentCount: 2,
    recruitmentCount: 9,
    recruitment: 'RECRUITING',
    platformCategory: 'WEB',
    jobFields: ['PLANNING', 'BACKEND'],
  },
  {
    projectId: 1,
    projectName: 'AI 기반 뉴스 요약 서비스 개발',
    categoryName: 'AI/테크',
    imageUrl: null,
    endDate: '2026-01-23',
    creatorName: '정연준',
    creatorImageUrl: null,
    currentCount: 2,
    recruitmentCount: 4,
    recruitment: 'RECRUITING',
    platformCategory: 'IOS',
    jobFields: ['BACKEND'],
  },
  {
    projectId: 12,
    projectName: '에코메이트: 친환경 소비 기록장',
    categoryName: '친환경',
    imageUrl: null,
    endDate: '2026-02-10',
    creatorName: '박은서',
    creatorImageUrl: null,
    currentCount: 1,
    recruitmentCount: 4,
    recruitment: 'COMPLETED',
    platformCategory: 'WEB',
    jobFields: ['MARKETING'],
  },
];

const DEADLINE_SORTED_IDS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 1, 12];

function getProjectCards() {
  return cy.get('[data-cy="project-card"]');
}

function getProjectTitles() {
  return cy.get('[data-cy="project-card-title"]');
}

function installProjectSearchIntercept() {
  cy.intercept('GET', '**/api/v1/projects/search*', (request) => {
    const url = new URL(request.url);
    const keyword = (url.searchParams.get('keyword') ?? '').toLowerCase();
    const projectCategory = url.searchParams.get('projectCategory');
    const recruitment = url.searchParams.get('recruitment');
    const platformCategory = url.searchParams.get('platformCategory');
    const jobField = url.searchParams.get('jobField');
    const sort = url.searchParams.get('sort') ?? 'LATEST';
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '8');

    let projects = [...ALL_PROJECTS];

    if (keyword) {
      projects = projects.filter(
        (project) =>
          project.projectName.toLowerCase().includes(keyword) ||
          project.creatorName.toLowerCase().includes(keyword),
      );
    }

    if (projectCategory) {
      const categoryMap: Record<string, string> = {
        AI_TECH: 'AI/테크',
        ENVIRONMENT: '친환경',
        HEALTHCARE: '헬스케어',
        PET: '반려동물',
        EDUCATION: '교육/학습',
        FASHION_BEAUTY: '패션/뷰티',
        FINANCE_PRODUCTIVITY: '금융/핀테크',
        ETC: '기타',
      };
      projects = projects.filter(
        (project) => project.categoryName === categoryMap[projectCategory],
      );
    }

    if (recruitment) {
      projects = projects.filter((project) => project.recruitment === recruitment);
    }

    if (platformCategory) {
      projects = projects.filter((project) => project.platformCategory === platformCategory);
    }

    if (jobField) {
      projects = projects.filter((project) => project.jobFields.includes(jobField));
    }

    projects.sort((left, right) => {
      if (sort === 'DEADLINE') {
        return (
          DEADLINE_SORTED_IDS.indexOf(left.projectId) - DEADLINE_SORTED_IDS.indexOf(right.projectId)
        );
      }

      return 0;
    });

    const start = page === 0 ? 0 : INITIAL_PROJECT_BATCH_SIZE + (page - 1) * size;
    const content = projects.slice(start, start + size);

    request.reply({
      statusCode: 200,
      body: {
        result: {
          content,
          last: start + size >= projects.length,
          first: page === 0,
          number: page,
          size,
          numberOfElements: content.length,
          empty: content.length === 0,
        },
      },
    });
  }).as('projectSearchRequest');
}

describe('프로젝트 찾기 흐름', () => {
  beforeEach(() => {
    installProjectSearchIntercept();
    cy.visit(PROJECTS_PATH);
    cy.wait('@projectSearchRequest');
  });

  it('기본 진입 시 최신순으로 프로젝트 목록을 보여준다', () => {
    cy.contains('h1', '프로젝트 찾기').should('be.visible');
    cy.get('[data-cy="project-total-count"]').should('contain', '8+');

    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', '핏로그: 운동 루틴 기록 플랫폼');
  });

  it('검색, 카테고리, 모집 상태, 플랫폼, 분야 조건을 함께 적용해 프로젝트를 필터링한다', () => {
    cy.get('[data-cy="project-search-input"]').type('정연준');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-category-select"]').select('AI/테크');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-recruit-select"]').select('모집 중만 보기');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-platform-filter"][data-value="iOS"]').click();
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-field-filter"][data-value="백엔드"]').click();
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-total-count"]').should('contain', '1');
    getProjectCards().should('have.length', 1).first().should('have.attr', 'href', '/projects/1');
    getProjectTitles().should('have.text', 'AI 기반 뉴스 요약 서비스 개발');
  });

  it('정렬을 마감임박순으로 변경하면 빠른 마감 프로젝트가 먼저 보인다', () => {
    cy.get('[data-cy="project-sort-select"]').select('deadline');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-total-count"]').should('contain', '8+');
    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', 'meeTeam: 사이드 프로젝트 모집 플랫폼');
    getProjectTitles().eq(1).should('have.text', '트립게더: 여행 동행 구하기');
  });

  it('목록 하단에 도달하면 추가 프로젝트 카드를 불러온다', () => {
    getProjectCards().should('have.length', 8);

    cy.get('[data-cy="project-load-more-trigger"]').scrollIntoView();
    cy.wait('@projectSearchRequest');

    getProjectCards().should('have.length', 12);
    cy.get('[data-cy="project-total-count"]').should('contain', '12');
    cy.get('[data-cy="project-load-more-trigger"]').should('not.exist');
  });

  it('조건에 맞는 프로젝트가 없으면 빈 상태를 보여주고 필터를 초기화할 수 있다', () => {
    cy.get('[data-cy="project-search-input"]').type('없는프로젝트');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-category-select"]').select('친환경');
    cy.wait('@projectSearchRequest');

    cy.get('[data-cy="project-total-count"]').should('contain', '0');
    cy.get('[data-cy="project-list"]').should('not.exist');
    cy.get('[data-cy="project-empty-state"]').should('be.visible');
    cy.get('[data-cy="project-reset-filters"]').click();

    cy.wait('@projectSearchRequest');
    cy.get('[data-cy="project-search-input"]').should('have.value', '');
    cy.get('[data-cy="project-category-select"]').should('have.value', '모든 카테고리');
    cy.get('[data-cy="project-recruit-select"]').should('have.value', '전체 상태');
    cy.get('[data-cy="project-total-count"]').should('contain', '8+');
    getProjectCards().should('have.length', 8);
    getProjectTitles().first().should('have.text', '핏로그: 운동 루틴 기록 플랫폼');
  });
});

describe('프로젝트 찾기 예외 흐름', () => {
  it('초기 프로젝트 조회가 실패하면 에러 상태를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/projects/search*', {
      statusCode: 500,
      body: {
        message: '프로젝트 목록을 불러오지 못했습니다.',
      },
    }).as('failedProjectSearchRequest');

    cy.visit(PROJECTS_PATH);
    cy.wait('@failedProjectSearchRequest');

    cy.contains('프로젝트 목록을 불러오지 못했습니다.').should('be.visible');
    cy.get('[data-cy="project-list"]').should('not.exist');
    cy.get('[data-cy="project-empty-state"]').should('not.exist');
  });

  it('초기 프로젝트 응답 형식이 올바르지 않으면 파싱 에러를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/projects/search*', {
      statusCode: 200,
      body: {},
    }).as('invalidProjectSearchRequest');

    cy.visit(PROJECTS_PATH);
    cy.wait('@invalidProjectSearchRequest');

    cy.contains('응답 형식을 해석할 수 없습니다.').should('be.visible');
    cy.get('[data-cy="project-list"]').should('not.exist');
    cy.get('[data-cy="project-empty-state"]').should('not.exist');
  });

  it('초기 조회 실패 뒤 필터를 바꾸면 에러를 지우고 다시 목록을 불러온다', () => {
    let requestCount = 0;

    cy.intercept('GET', '**/api/v1/projects/search*', (request) => {
      requestCount += 1;

      if (requestCount === 1) {
        request.reply({
          statusCode: 500,
          body: {
            message: '프로젝트 목록을 불러오지 못했습니다.',
          },
        });
        return;
      }

      request.reply({
        statusCode: 200,
        body: {
          result: {
            content: [ALL_PROJECTS[5]],
            last: true,
            first: true,
            number: 0,
            size: 8,
            numberOfElements: 1,
            empty: false,
          },
        },
      });
    }).as('recoveringProjectSearchRequest');

    cy.visit(PROJECTS_PATH);
    cy.wait('@recoveringProjectSearchRequest');

    cy.contains('프로젝트 목록을 불러오지 못했습니다.').should('be.visible');

    cy.get('[data-cy="project-category-select"]').select('친환경');
    cy.wait('@recoveringProjectSearchRequest');

    cy.contains('프로젝트 목록을 불러오지 못했습니다.').should('not.exist');
    cy.get('[data-cy="project-total-count"]').should('contain', '1');
    getProjectCards().should('have.length', 1);
    getProjectTitles().should('have.text', '그린루프: 제로웨이스트 실천 챌린지');
  });

  it('추가 프로젝트 조회가 실패해도 기존 목록은 유지하고 에러 메시지를 보여준다', () => {
    let requestCount = 0;

    cy.intercept('GET', '**/api/v1/projects/search*', (request) => {
      requestCount += 1;

      if (requestCount === 1) {
        const content = ALL_PROJECTS.slice(0, INITIAL_PROJECT_BATCH_SIZE);

        request.reply({
          statusCode: 200,
          body: {
            result: {
              content,
              last: false,
              first: true,
              number: 0,
              size: INITIAL_PROJECT_BATCH_SIZE,
              numberOfElements: content.length,
              empty: false,
            },
          },
        });
        return;
      }

      request.reply({
        statusCode: 500,
        body: {
          message: '프로젝트 목록을 더 불러오지 못했습니다.',
        },
      });
    }).as('projectSearchWithLoadMoreFailure');

    cy.visit(PROJECTS_PATH);
    cy.wait('@projectSearchWithLoadMoreFailure');

    getProjectCards().should('have.length', 8);

    cy.get('[data-cy="project-load-more-trigger"]').scrollIntoView();
    cy.wait('@projectSearchWithLoadMoreFailure');

    getProjectCards().should('have.length', 8);
    cy.contains('프로젝트 목록을 더 불러오지 못했습니다.').should('be.visible');
    cy.get('[data-cy="project-load-more-trigger"]').should('exist');
  });

  it('추가 조회 실패 후 필터를 바꾸면 이전 에러를 지우고 새 결과로 복구한다', () => {
    let requestCount = 0;

    cy.intercept('GET', '**/api/v1/projects/search*', (request) => {
      requestCount += 1;

      if (requestCount === 1) {
        const content = ALL_PROJECTS.slice(0, INITIAL_PROJECT_BATCH_SIZE);

        request.reply({
          statusCode: 200,
          body: {
            result: {
              content,
              last: false,
              first: true,
              number: 0,
              size: INITIAL_PROJECT_BATCH_SIZE,
              numberOfElements: content.length,
              empty: false,
            },
          },
        });
        return;
      }

      if (requestCount === 2) {
        request.reply({
          statusCode: 500,
          body: {
            message: '프로젝트 목록을 더 불러오지 못했습니다.',
          },
        });
        return;
      }

      request.reply({
        statusCode: 200,
        body: {
          result: {
            content: [ALL_PROJECTS[9], ALL_PROJECTS[10]],
            last: true,
            first: true,
            number: 0,
            size: INITIAL_PROJECT_BATCH_SIZE,
            numberOfElements: 2,
            empty: false,
          },
        },
      });
    }).as('projectLoadMoreRecoveryRequest');

    cy.visit(PROJECTS_PATH);
    cy.wait('@projectLoadMoreRecoveryRequest');

    cy.get('[data-cy="project-load-more-trigger"]').scrollIntoView();
    cy.wait('@projectLoadMoreRecoveryRequest');

    cy.contains('프로젝트 목록을 더 불러오지 못했습니다.').should('be.visible');
    getProjectCards().should('have.length', 8);

    cy.get('[data-cy="project-category-select"]').select('AI/테크');
    cy.wait('@projectLoadMoreRecoveryRequest');

    cy.contains('프로젝트 목록을 더 불러오지 못했습니다.').should('not.exist');
    cy.get('[data-cy="project-total-count"]').should('contain', '2');
    getProjectCards().should('have.length', 2);
    getProjectTitles().first().should('have.text', 'meeTeam: 사이드 프로젝트 모집 플랫폼');
  });
});
