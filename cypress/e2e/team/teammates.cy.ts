const TEAMMATES_PATH = '/teammates';

function createTechStacks(names: string[]) {
  return names.map((name, index) => ({
    id: index + 1,
    name,
    displayOrder: index + 1,
  }));
}

const JOB_OPTIONS = {
  fields: [
    {
      code: 'FRONTEND',
      name: '프론트',
      positions: [{ id: 1, code: 'WEB_FRONTEND', name: '웹 프론트엔드' }],
      techStacks: createTechStacks(['React Query', 'Next.js', 'React', 'TypeScript', 'Cypress']),
    },
    {
      code: 'BACKEND',
      name: '백엔드',
      positions: [{ id: 2, code: 'JAVA_SPRING', name: 'Java/Spring' }],
      techStacks: createTechStacks(['Spring Boot', 'MySQL', 'NestJS', 'PostgreSQL']),
    },
    {
      code: 'DESIGN',
      name: '디자인',
      positions: [{ id: 3, code: 'UI_UX_DESIGNER', name: 'UI/UX 디자이너' }],
      techStacks: createTechStacks(['Figma', 'Illustrator']),
    },
    {
      code: 'PLANNING',
      name: '기획',
      positions: [{ id: 4, code: 'PRODUCT_MANAGER', name: 'PM 프로덕트 매니저' }],
      techStacks: createTechStacks(['Notion', 'Jira']),
    },
  ],
};

const ALL_TEAMMATES = [
  {
    memberId: 1,
    name: '김도윤',
    jobFieldName: '백엔드',
    projectExperienceCount: 11,
    techStacks: createTechStacks(['Spring Boot', 'MySQL']),
    profileImageUrl: null,
  },
  {
    memberId: 14,
    name: '권나은',
    jobFieldName: '프론트',
    projectExperienceCount: 8,
    techStacks: createTechStacks(['React Query', 'Next.js']),
    profileImageUrl: null,
  },
  {
    memberId: 2,
    name: '강예나',
    jobFieldName: '디자인',
    projectExperienceCount: 7,
    techStacks: createTechStacks(['Figma', 'Illustrator']),
    profileImageUrl: null,
  },
  {
    memberId: 3,
    name: '나지민',
    jobFieldName: '프론트',
    projectExperienceCount: 6,
    techStacks: createTechStacks(['React', 'TypeScript']),
    profileImageUrl: null,
  },
  {
    memberId: 4,
    name: '다은별',
    jobFieldName: '기획',
    projectExperienceCount: 6,
    techStacks: createTechStacks(['Notion', 'Jira']),
    profileImageUrl: null,
  },
  {
    memberId: 5,
    name: '라현우',
    jobFieldName: '백엔드',
    projectExperienceCount: 5,
    techStacks: createTechStacks(['NestJS', 'PostgreSQL']),
    profileImageUrl: null,
  },
  {
    memberId: 6,
    name: '마서준',
    jobFieldName: '디자인',
    projectExperienceCount: 5,
    techStacks: createTechStacks(['Branding', 'Photoshop']),
    profileImageUrl: null,
  },
  {
    memberId: 7,
    name: '박소율',
    jobFieldName: '프론트',
    projectExperienceCount: 5,
    techStacks: createTechStacks(['SwiftUI', 'UIKit']),
    profileImageUrl: null,
  },
  {
    memberId: 8,
    name: '배지훈',
    jobFieldName: '백엔드',
    projectExperienceCount: 4,
    techStacks: createTechStacks(['FastAPI', 'Redis']),
    profileImageUrl: null,
  },
  {
    memberId: 9,
    name: '서하린',
    jobFieldName: '기획',
    projectExperienceCount: 4,
    techStacks: createTechStacks(['Analytics', 'Figma']),
    profileImageUrl: null,
  },
  {
    memberId: 10,
    name: '송이준',
    jobFieldName: '프론트',
    projectExperienceCount: 4,
    techStacks: createTechStacks(['Kotlin', 'Compose']),
    profileImageUrl: null,
  },
  {
    memberId: 11,
    name: '신채은',
    jobFieldName: '디자인',
    projectExperienceCount: 3,
    techStacks: createTechStacks(['After Effects', 'Figma']),
    profileImageUrl: null,
  },
  {
    memberId: 12,
    name: '안도현',
    jobFieldName: '백엔드',
    projectExperienceCount: 3,
    techStacks: createTechStacks(['Java', 'Kafka']),
    profileImageUrl: null,
  },
  {
    memberId: 13,
    name: '오민재',
    jobFieldName: '프론트',
    projectExperienceCount: 3,
    techStacks: createTechStacks(['Vue', 'Pinia']),
    profileImageUrl: null,
  },
  {
    memberId: 15,
    name: '유서진',
    jobFieldName: '기획',
    projectExperienceCount: 3,
    techStacks: createTechStacks(['MVP', 'Wireframe']),
    profileImageUrl: null,
  },
  {
    memberId: 16,
    name: '윤채원',
    jobFieldName: '백엔드',
    projectExperienceCount: 2,
    techStacks: createTechStacks(['Node.js', 'MongoDB']),
    profileImageUrl: null,
  },
  {
    memberId: 17,
    name: '이가은',
    jobFieldName: '프론트',
    projectExperienceCount: 2,
    techStacks: createTechStacks(['React', 'Cypress']),
    profileImageUrl: null,
  },
  {
    memberId: 18,
    name: '이우진',
    jobFieldName: '기획',
    projectExperienceCount: 2,
    techStacks: createTechStacks(['Communication', 'Docs']),
    profileImageUrl: null,
  },
  {
    memberId: 19,
    name: '장하준',
    jobFieldName: '디자인',
    projectExperienceCount: 2,
    techStacks: createTechStacks(['Figma', 'ProtoPie']),
    profileImageUrl: null,
  },
  {
    memberId: 20,
    name: '정연준',
    jobFieldName: '백엔드',
    projectExperienceCount: 2,
    techStacks: createTechStacks(['Spring', 'Docker']),
    profileImageUrl: null,
  },
  {
    memberId: 21,
    name: '조민서',
    jobFieldName: '프론트',
    projectExperienceCount: 1,
    techStacks: createTechStacks(['React', 'Tailwind']),
    profileImageUrl: null,
  },
  {
    memberId: 22,
    name: '최현아',
    jobFieldName: '디자인',
    projectExperienceCount: 1,
    techStacks: createTechStacks(['Illustrator', 'Branding']),
    profileImageUrl: null,
  },
  {
    memberId: 23,
    name: '하윤서',
    jobFieldName: '기획',
    projectExperienceCount: 1,
    techStacks: createTechStacks(['Research', 'Presentation']),
    profileImageUrl: null,
  },
  {
    memberId: 24,
    name: '황지후',
    jobFieldName: '백엔드',
    projectExperienceCount: 1,
    techStacks: createTechStacks(['Python', 'Airflow']),
    profileImageUrl: null,
  },
];

const OTHER_MEMBER_PROFILE = {
  memberId: 14,
  name: '권나은',
  age: 26,
  gender: 'FEMALE',
  email: 'kwon@example.com',
  githubUrl: 'https://github.com/kwon',
  blogUrl: 'https://kwon.blog',
  projectExperienceCount: 8,
  representativePosition: '웹 프론트엔드',
  jobPositions: ['웹 프론트엔드'],
  isParticipating: true,
  introduce: '제품 감도가 높은 프론트엔드 개발자입니다.',
  participatedProjectCount: 0,
  profileImageUrl: null,
  participatedProjects: [],
  groupedSkills: [
    {
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      techStacks: ['React Query', 'Next.js'],
    },
  ],
};

const JOB_FIELD_BY_ID: Record<string, string> = {
  '1': '기획',
  '2': '디자인',
  '3': '프론트',
  '4': '백엔드',
};

function getTeammateCards() {
  return cy.get('[data-cy="teammate-card"]');
}

function getTeammateNames() {
  return cy.get('[data-cy="teammate-card-name"]');
}

function installJobOptionsIntercept() {
  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: JOB_OPTIONS,
    },
  }).as('jobOptionsRequest');
}

function installTeammateSearchIntercept() {
  cy.intercept('GET', '**/api/v1/members/search*', (request) => {
    const url = new URL(request.url);
    const name = (url.searchParams.get('name') ?? '').toLowerCase();
    const jobFieldId = url.searchParams.get('jobFieldId');
    const techStackNames = url.searchParams.getAll('techStackNames');
    const sort = url.searchParams.get('sort') ?? 'projectExperienceCount,desc';
    const page = Number(url.searchParams.get('page') ?? '0');
    const size = Number(url.searchParams.get('size') ?? '15');

    let teammates = [...ALL_TEAMMATES];

    if (name) {
      teammates = teammates.filter((teammate) => teammate.name.toLowerCase().includes(name));
    }

    if (jobFieldId) {
      teammates = teammates.filter(
        (teammate) => teammate.jobFieldName === JOB_FIELD_BY_ID[jobFieldId],
      );
    }

    if (techStackNames.length > 0) {
      teammates = teammates.filter((teammate) =>
        techStackNames.every((skillName) =>
          teammate.techStacks.some((techStack) => techStack.name === skillName),
        ),
      );
    }

    teammates.sort((left, right) =>
      sort === 'realName,asc'
        ? left.name.localeCompare(right.name, 'ko')
        : right.projectExperienceCount - left.projectExperienceCount,
    );

    const start = page * size;
    const content = teammates.slice(start, start + size);

    request.reply({
      statusCode: 200,
      body: {
        result: {
          content,
          last: start + size >= teammates.length,
          number: page,
          size,
          empty: content.length === 0,
          totalElements: teammates.length,
        },
      },
    });
  }).as('teammateSearchRequest');
}

describe('팀원 찾기 흐름', () => {
  beforeEach(() => {
    installJobOptionsIntercept();
    installTeammateSearchIntercept();
    cy.visit(TEAMMATES_PATH);
    cy.wait('@teammateSearchRequest');
    cy.wait('@jobOptionsRequest');
  });

  it('기본 진입 시 프로젝트 경험 많은 순으로 팀원 목록을 보여준다', () => {
    cy.contains('h1', '팀원 찾기').should('be.visible');
    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');

    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '김도윤');
    cy.get('[data-cy="teammate-card-experience"]').first().should('contain', '11회');
  });

  it('이름, 분야, 기술 스택 조건을 함께 적용해 팀원을 필터링하고 기존 조작으로 초기화한다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('권');
    cy.wait('@teammateSearchRequest');
    cy.get('[data-cy="teammate-role-filter"][data-role="프론트엔드"]').click();
    cy.wait('@teammateSearchRequest');
    cy.get('[data-cy="teammate-skill-input"]').type('React Query{enter}');
    cy.wait('@teammateSearchRequest');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '1');
    getTeammateCards().should('have.length', 1).first().should('have.attr', 'href', '/profile/14');
    getTeammateNames().should('have.text', '권나은');

    cy.get('[data-cy="teammate-search-input"]').clear();
    cy.wait('@teammateSearchRequest');
    cy.get('[data-cy="teammate-role-filter"][data-role="전체"]').click();
    cy.wait('@teammateSearchRequest');
    cy.get('button[aria-label="React Query 삭제"]').click();
    cy.wait('@teammateSearchRequest');
    cy.get('[data-cy="teammate-search-input"]').should('have.value', '');
    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');
    getTeammateCards().should('have.length', 15);
  });

  it('정렬을 이름순으로 변경하면 목록 순서가 한글 오름차순으로 바뀐다', () => {
    cy.get('[data-cy="teammate-sort-select"]').select('name-asc');
    cy.wait('@teammateSearchRequest');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');
    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '강예나');
    getTeammateNames().eq(1).should('have.text', '권나은');
    getTeammateNames().eq(2).should('have.text', '김도윤');
  });

  it('목록 하단에 도달하면 추가 팀원 카드를 불러온다', () => {
    getTeammateCards().should('have.length', 15);

    cy.get('[data-cy="teammate-load-more-trigger"]').scrollIntoView();
    cy.wait('@teammateSearchRequest');

    getTeammateCards().should('have.length', 24);
    cy.get('[data-cy="teammate-load-more-trigger"]').should('not.exist');
  });

  it('조건에 맞는 팀원이 없으면 빈 상태를 보여준다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('없는이름');
    cy.wait('@teammateSearchRequest');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '0');
    cy.get('[data-cy="teammate-list"]').find('[data-cy="teammate-card"]').should('have.length', 0);
    cy.get('[data-cy="teammate-empty-state"]')
      .should('be.visible')
      .and('contain', '조건에 맞는 팀원이 아직 없어요.');
  });

  it('프로필 카드를 클릭하면 다른 유저 프로필 상세로 이동한다', () => {
    cy.intercept('GET', '**/api/v1/members/14', {
      statusCode: 200,
      body: {
        result: OTHER_MEMBER_PROFILE,
      },
    }).as('memberProfileRequest');

    cy.get('[data-cy="teammate-card"][href="/profile/14"]').click();
    cy.wait('@memberProfileRequest');

    cy.location('pathname').should('eq', '/profile/14');
    cy.contains('권나은').should('be.visible');
    cy.contains('제품 감도가 높은 프론트엔드 개발자입니다.').should('be.visible');
  });
});

describe('팀원 찾기 예외 흐름', () => {
  beforeEach(() => {
    installJobOptionsIntercept();
  });

  it('초기 팀원 조회가 실패하면 에러 상태를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/members/search*', {
      statusCode: 500,
      body: {
        message: '팀원 목록을 불러오지 못했습니다.',
      },
    }).as('failedTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@failedTeammatesRequest');

    cy.get('[data-cy="teammate-error-state"]').should('be.visible');
    cy.contains('팀원 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.').should('be.visible');
    cy.contains('Failed to fetch').should('not.exist');
    cy.get('[data-cy="teammate-total-count"]').should('not.exist');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
    cy.get('[data-cy="teammate-empty-state"]').should('not.exist');
  });

  it('초기 팀원 네트워크 실패도 사용자 문구로 보여준다', () => {
    cy.intercept('GET', '**/api/v1/members/search*', {
      forceNetworkError: true,
    }).as('networkFailedTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@networkFailedTeammatesRequest');

    cy.get('[data-cy="teammate-error-state"]').should('be.visible');
    cy.contains('팀원 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.').should('be.visible');
    cy.contains('Failed to fetch').should('not.exist');
    cy.get('[data-cy="teammate-empty-state"]').should('not.exist');
  });

  it('백엔드 에러 메시지가 없어도 기본 에러 문구를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/members/search*', {
      statusCode: 500,
      body: {},
    }).as('fallbackFailedTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@fallbackFailedTeammatesRequest');

    cy.get('[data-cy="teammate-error-state"]').should('be.visible');
    cy.contains('팀원 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.').should('be.visible');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
  });

  it('초기 팀원 응답 형식이 올바르지 않아도 사용자 문구로 에러 상태를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/members/search*', {
      statusCode: 200,
      body: {},
    }).as('invalidTeammatesResponseRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@invalidTeammatesResponseRequest');

    cy.get('[data-cy="teammate-error-state"]').should('be.visible');
    cy.contains('팀원 목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.').should('be.visible');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
    cy.get('[data-cy="teammate-empty-state"]').should('not.exist');
  });
});

export {};
