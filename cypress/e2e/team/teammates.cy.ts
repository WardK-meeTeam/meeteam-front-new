const TEAMMATES_PATH = '/teammates';

function createTechStacks(names: string[]) {
  return names.map((name, index) => ({
    id: index + 1,
    name,
    displayOrder: index + 1,
  }));
}

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

function getTeammateCards() {
  return cy.get('[data-cy="teammate-card"]');
}

function getTeammateNames() {
  return cy.get('[data-cy="teammate-card-name"]');
}

describe('팀원 찾기 흐름', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/v1/main/members*', {
      statusCode: 200,
      body: {
        result: {
          content: ALL_TEAMMATES,
          last: true,
          number: 0,
          size: 100,
          empty: false,
        },
      },
    }).as('allTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@allTeammatesRequest');
  });

  it('기본 진입 시 프로젝트 경험 많은 순으로 팀원 목록을 보여준다', () => {
    cy.contains('h1', '팀원 찾기').should('be.visible');
    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');

    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '김도윤');
    cy.get('[data-cy="teammate-card-experience"]').first().should('contain', '11회');
  });

  it('이름, 분야, 기술 스택 조건을 함께 적용해 팀원을 필터링한다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('권');
    cy.get('[data-cy="teammate-role-filter"][data-role="프론트엔드"]').click();
    cy.get('[data-cy="teammate-skill-input"]').type('React Query');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '1');
    getTeammateCards().should('have.length', 1).first().should('have.attr', 'href', '/profile/14');
    getTeammateNames().should('have.text', '권나은');
  });

  it('정렬을 이름순으로 변경하면 목록 순서가 한글 오름차순으로 바뀐다', () => {
    cy.get('[data-cy="teammate-sort-select"]').select('name-asc');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '24');
    getTeammateCards().should('have.length', 15);
    getTeammateNames().first().should('have.text', '강예나');
    getTeammateNames().eq(1).should('have.text', '권나은');
    getTeammateNames().eq(2).should('have.text', '김도윤');
  });

  it('목록 하단에 도달하면 추가 팀원 카드를 순차적으로 불러온다', () => {
    getTeammateCards().should('have.length', 15);

    cy.get('[data-cy="teammate-load-more-trigger"]').scrollIntoView();
    getTeammateCards().should('have.length', 20);

    cy.get('[data-cy="teammate-load-more-trigger"]').scrollIntoView();
    getTeammateCards().should('have.length', 24);
    cy.get('[data-cy="teammate-load-more-trigger"]').should('not.exist');
  });

  it('조건에 맞는 팀원이 없으면 빈 상태를 보여준다', () => {
    cy.get('[data-cy="teammate-search-input"]').type('없는이름');

    cy.get('[data-cy="teammate-total-count"]').should('contain', '0');
    cy.get('[data-cy="teammate-list"]').find('[data-cy="teammate-card"]').should('have.length', 0);
    cy.get('[data-cy="teammate-empty-state"]')
      .should('be.visible')
      .and('contain', '조건에 맞는 팀원이 아직 없어요.');
  });
});

describe('팀원 찾기 예외 흐름', () => {
  it('초기 팀원 조회가 실패하면 에러 상태를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/main/members*', {
      statusCode: 500,
      body: {
        message: '팀원 목록을 불러오지 못했습니다.',
      },
    }).as('failedTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@failedTeammatesRequest');

    cy.contains('팀원 목록을 불러오지 못했습니다.').should('be.visible');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
    cy.get('[data-cy="teammate-empty-state"]').should('not.exist');
  });

  it('백엔드 에러 메시지가 없어도 기본 에러 문구를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/main/members*', {
      statusCode: 500,
      body: {},
    }).as('fallbackFailedTeammatesRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@fallbackFailedTeammatesRequest');

    cy.contains('팀원 목록을 불러오지 못했습니다.').should('be.visible');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
  });

  it('초기 팀원 응답 형식이 올바르지 않으면 파싱 에러를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/main/members*', {
      statusCode: 200,
      body: {},
    }).as('invalidTeammatesResponseRequest');

    cy.visit(TEAMMATES_PATH);
    cy.wait('@invalidTeammatesResponseRequest');

    cy.contains('응답 형식을 해석할 수 없습니다.').should('be.visible');
    cy.get('[data-cy="teammate-list"]').should('not.exist');
    cy.get('[data-cy="teammate-empty-state"]').should('not.exist');
  });
});
