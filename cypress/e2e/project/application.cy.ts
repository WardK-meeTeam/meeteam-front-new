const PROJECT_ID = 101;

const MEMBER_PROFILE = {
  memberId: 42,
  name: '홍길동',
  birthDate: '1998-03-15',
  gender: 'MALE',
  email: 'hello@example.com',
  githubUrl: null,
  blogUrl: null,
  projectExperienceCount: 3,
  representativePosition: '웹 프론트엔드',
  representativePositionEn: 'Frontend Dev',
  groupedSkills: [
    {
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      techStacks: ['React', 'TypeScript'],
    },
  ],
  skills: ['React', 'TypeScript'],
  isParticipating: true,
  projectCount: 2,
  introduce: '안녕하세요.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [],
};

const JOB_OPTIONS = {
  fields: [
    {
      code: 'FRONTEND',
      name: '프론트엔드',
      positions: [
        {
          id: 25,
          code: 'WEB_FRONTEND',
          name: '웹 프론트엔드',
        },
      ],
      techStacks: [
        {
          id: 1,
          name: 'React',
        },
        {
          id: 2,
          name: 'TypeScript',
        },
      ],
    },
  ],
};

const PROJECT_DETAIL = {
  id: PROJECT_ID,
  name: '지원 연동 테스트 프로젝트',
  description: '지원 API 연동을 검증하는 프로젝트입니다.',
  projectCategory: 'AI_TECH',
  platformCategory: 'WEB',
  imageUrl: null,
  recruitmentStatus: 'RECRUITING',
  recruitmentDeadlineType: 'END_DATE',
  startDate: '2026-01-01',
  endDate: '2026-02-01',
  githubRepositoryUrl: null,
  communicationChannelUrl: null,
  leader: {
    id: 1,
    name: '프로젝트 리더',
    profileImageUrl: null,
    jobPositions: [
      {
        jobFieldCode: 'PLANNING',
        jobFieldName: '기획',
        jobPositionName: 'PM 프로덕트 매니저',
      },
    ],
    techStacks: ['Notion'],
  },
  recruitments: [
    {
      jobFieldCode: 'FRONTEND',
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      recruitmentCount: 2,
      currentCount: 1,
      isClosed: false,
      techStacks: ['React', 'TypeScript'],
    },
  ],
  likeCount: 0,
  isLiked: false,
  isLeader: false,
};

const APPLICATION_PAGE = {
  applicant: {
    profileImageUrl: null,
    name: '홍길동',
    jobFieldNames: ['프론트엔드'],
    jobPositionNames: ['웹 프론트엔드'],
    age: 28,
    gender: 'MALE',
    email: 'hello@example.com',
    profileSummary: 'Frontend Dev',
  },
  recruitments: [
    {
      id: 1,
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      techStacks: ['React', 'TypeScript'],
      isClosed: false,
    },
  ],
};

function installApplicationIntercepts() {
  cy.intercept('GET', '**/api/v1/members/me', {
    statusCode: 200,
    body: {
      result: MEMBER_PROFILE,
    },
  }).as('myProfileRequest');

  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
    statusCode: 200,
    body: {
      result: PROJECT_DETAIL,
    },
  }).as('projectDetailRequest');

  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
    statusCode: 200,
    body: {
      result: APPLICATION_PAGE,
    },
  }).as('applicationPageRequest');

  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: JOB_OPTIONS,
    },
  }).as('jobOptionsRequest');

  cy.intercept('POST', `**/api/v1/projects/${PROJECT_ID}/application`, {
    statusCode: 200,
    body: {
      result: {
        applicationId: 9001,
        projectId: PROJECT_ID,
        applicantId: MEMBER_PROFILE.memberId,
        status: 'PENDING',
      },
    },
  }).as('applicationRequest');
}

describe('프로젝트 지원 흐름', () => {
  beforeEach(() => {
    installApplicationIntercepts();
    cy.clearLocalStorage('meeteam-auth-storage');
  });

  it('백엔드 세션이 유효하면 로컬 세션이 비어 있어도 로그인 모달 없이 지원한다', () => {
    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');

    cy.get('[data-cy="project-detail-tab-recruit"]').click();
    cy.contains('button', '지원하기').click();
    cy.wait('@myProfileRequest');

    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}/apply`);
    cy.wait('@applicationPageRequest');
    cy.contains('프로젝트 지원하기').should('be.visible');
    cy.contains('프로젝트 지원 전 로그인이 필요해요').should('not.exist');

    cy.wait('@jobOptionsRequest');
    cy.contains('프론트엔드').should('be.visible');
    cy.contains('웹 프론트엔드').should('be.visible');

    cy.get('textarea').type('프론트엔드 구현 경험을 바탕으로 프로젝트에 기여하고 싶습니다.');
    cy.contains('button', '지원하기').click();

    cy.wait('@applicationRequest').its('request.body').should('deep.equal', {
      jobPositionCode: 'WEB_FRONTEND',
      motivation: '프론트엔드 구현 경험을 바탕으로 프로젝트에 기여하고 싶습니다.',
    });
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);
  });
});

export {};
