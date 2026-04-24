const AUTH_STORAGE_KEY = 'meeteam-auth-storage';
const PROJECT_ID = 501;

const AUTH_SESSION = {
  state: {
    memberId: 42,
    name: '홍길동',
    email: 'hello@example.com',
    isAuthenticated: true,
  },
  version: 0,
};

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
      name: '프론트',
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
    {
      code: 'BACKEND',
      name: '백엔드',
      positions: [
        {
          id: 31,
          code: 'NODE_JS',
          name: 'Node.js',
        },
      ],
      techStacks: [
        {
          id: 11,
          name: 'Node.js',
        },
        {
          id: 12,
          name: 'PostgreSQL',
        },
      ],
    },
  ],
};

const PROJECT_DETAIL = {
  id: PROJECT_ID,
  name: '프로젝트 상세 테스트',
  description: '상세 페이지 렌더링과 모집 흐름을 검증하는 테스트 프로젝트입니다.',
  projectCategory: 'AI_TECH',
  platformCategory: 'WEB',
  imageUrl: null,
  recruitmentStatus: 'RECRUITING',
  recruitmentDeadlineType: 'END_DATE',
  startDate: '2026-05-01',
  endDate: '2026-06-01',
  githubRepositoryUrl: 'https://github.com/meeteam/project',
  communicationChannelUrl: 'https://discord.gg/meeteam',
  leader: {
    id: 7,
    name: '프로젝트 리더',
    profileImageUrl: null,
    jobPositions: [
      {
        jobFieldCode: 'PLANNING',
        jobFieldName: '기획',
        jobPositionName: 'PM',
      },
    ],
    techStacks: ['Notion'],
  },
  members: [
    {
      memberId: 7,
      name: '프로젝트 리더',
      profileImageUrl: null,
      jobFieldName: '기획',
      jobPositionName: 'PM',
      isLeader: true,
    },
  ],
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
    {
      jobFieldCode: 'BACKEND',
      jobFieldName: '백엔드',
      jobPositionName: 'Node.js',
      recruitmentCount: 1,
      currentCount: 1,
      isClosed: true,
      techStacks: ['Node.js'],
    },
  ],
  likeCount: 3,
  isLiked: false,
  isLeader: false,
};

const LEADER_PROJECT_DETAIL = {
  ...PROJECT_DETAIL,
  leader: {
    ...PROJECT_DETAIL.leader,
    id: 42,
    name: '홍길동',
  },
  members: [
    {
      memberId: 42,
      name: '홍길동',
      profileImageUrl: null,
      jobFieldName: '기획',
      jobPositionName: 'PM',
      isLeader: true,
    },
  ],
  isLeader: true,
};

const CLOSED_PROJECT_DETAIL = {
  ...PROJECT_DETAIL,
  recruitmentStatus: 'CLOSED',
  recruitments: PROJECT_DETAIL.recruitments.map((recruitment) => ({
    ...recruitment,
    isClosed: true,
  })),
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

const TEAM_MANAGEMENT = {
  currentMemberCount: 2,
  totalRecruitmentCount: 4,
  pendingApplicationCount: 1,
  members: [
    {
      memberId: 42,
      name: '홍길동',
      profileImageUrl: null,
      jobFieldName: '기획',
      jobPositionName: 'PM',
      isLeader: true,
    },
    {
      memberId: 99,
      name: '팀원',
      profileImageUrl: null,
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      isLeader: false,
    },
  ],
};

const EDIT_PREFILL = {
  projectId: PROJECT_ID,
  name: '프로젝트 상세 테스트',
  description: '수정 전 프로젝트 설명입니다.',
  projectCategory: 'AI_TECH',
  projectCategoryName: 'AI/테크',
  platformCategory: 'WEB',
  recruitmentDeadlineType: 'END_DATE',
  githubRepositoryUrl: 'https://github.com/meeteam/project',
  communicationChannelUrl: 'https://discord.gg/meeteam',
  endDate: '2026-06-01',
  imageUrl: null,
  leaderJobFieldName: '프론트엔드',
  leaderJobPositionName: '웹 프론트엔드',
  editable: true,
  notEditableReason: null,
  recruitments: [
    {
      recruitmentStateId: 701,
      jobFieldCode: 'FRONTEND',
      jobFieldName: '프론트엔드',
      jobPositionCode: 'WEB_FRONTEND',
      jobPositionName: '웹 프론트엔드',
      recruitmentCount: 2,
      currentCount: 1,
      pendingApplicationCount: 0,
      techStackIds: [1],
      techStackNames: ['React'],
      deletable: true,
      notDeletableReason: null,
      minRecruitmentCount: 1,
    },
  ],
};

function seedAuthSession(window: Window) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(AUTH_SESSION));
}

function installAuthenticatedShellIntercepts() {
  cy.intercept('GET', '**/api/notifications/unread/count', {
    statusCode: 200,
    body: {
      result: {
        unreadCount: 0,
      },
    },
  }).as('unreadNotificationCountRequest');

  cy.intercept('GET', '**/api/members', {
    statusCode: 200,
    body: {
      result: MEMBER_PROFILE,
    },
  }).as('myProfileRequest');
}

function installJobOptionsIntercept() {
  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: JOB_OPTIONS,
    },
  }).as('jobOptionsRequest');
}

function visitAuthenticated(path: string) {
  cy.visit(path, {
    onBeforeLoad(window) {
      seedAuthSession(window);
    },
  });
}

function installProjectDetailIntercept(project = PROJECT_DETAIL) {
  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
    statusCode: 200,
    body: {
      result: project,
    },
  }).as('projectDetailRequest');
}

function installTeamManagementIntercept() {
  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/team`, {
    statusCode: 200,
    body: {
      result: TEAM_MANAGEMENT,
    },
  }).as('teamManagementRequest');
}

function fillRequiredProjectForm() {
  cy.get('[data-cy="project-form-name"]').clear();
  cy.get('[data-cy="project-form-name"]').type('E2E 생성 프로젝트');
  cy.get('[data-cy="project-form-github"]').clear();
  cy.get('[data-cy="project-form-github"]').type('https://github.com/meeteam/e2e-project');
  cy.get('[data-cy="project-form-communication"]').clear();
  cy.get('[data-cy="project-form-communication"]').type('https://discord.gg/meeteam');
  cy.get('[data-cy="project-form-category-ai-tech"]').click();
  cy.get('[data-cy="project-form-description"]').clear();
  cy.get('[data-cy="project-form-description"]').type(
    'E2E 테스트에서 프로젝트 생성과 수정 요청을 검증하기 위한 충분한 길이의 설명입니다.',
  );
  cy.get('[data-cy="project-form-my-major"]').click();
  cy.contains('li', '프론트엔드').click();
  cy.get('[data-cy="project-form-my-minor"]').click();
  cy.contains('li', '웹 프론트엔드').click();
  cy.get('[data-cy="project-form-recruit-major-0"]').click();
  cy.contains('li', '프론트엔드').click();
  cy.get('[data-cy="project-form-recruit-minor-0"]').click();
  cy.contains('li', '웹 프론트엔드').click();
  cy.get('[data-cy="project-form-tech-input"]').type('React{enter}');
  cy.get('[data-cy="project-form-until-complete"]').check({ force: true });
}

describe('프로젝트 상세 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('프로젝트 상세 페이지를 렌더링하고 좋아요를 토글한다', () => {
    installProjectDetailIntercept();
    cy.intercept('GET', `**/api/v1/project/like/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          isLiked: false,
        },
      },
    }).as('likeStatusRequest');
    cy.intercept('POST', `**/api/v1/project/like/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          projectId: PROJECT_ID,
          liked: true,
          likeCount: 4,
        },
      },
    }).as('likeToggleRequest');

    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');
    cy.wait('@likeStatusRequest');

    cy.contains('프로젝트 상세 테스트').should('be.visible');
    cy.contains('상세 페이지 렌더링과 모집 흐름을 검증하는 테스트 프로젝트입니다.').should(
      'be.visible',
    );
    cy.contains('프로젝트 리더').should('be.visible');
    cy.get('[data-cy="project-like-button"]').should('contain', '3').click();
    cy.wait('@likeToggleRequest');
    cy.get('[data-cy="project-like-button"]').should('contain', '4');
    cy.get('[data-cy="project-like-button"]').should('have.attr', 'aria-pressed', 'true');
  });

  it('프로젝트 상세 조회가 실패하면 에러 상태를 보여준다', () => {
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
      statusCode: 500,
      body: {
        message: '프로젝트 상세 정보를 불러오지 못했습니다.',
      },
    }).as('failedProjectDetailRequest');

    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@failedProjectDetailRequest');

    cy.contains('프로젝트를 찾을 수 없어요.').should('be.visible');
    cy.contains('프로젝트 상세 정보를 불러오지 못했습니다.').should('be.visible');
  });

  it('모집 마감 또는 정원 초과 포지션은 지원 버튼을 보여주지 않는다', () => {
    installProjectDetailIntercept(CLOSED_PROJECT_DETAIL);
    cy.intercept('GET', `**/api/v1/project/like/${PROJECT_ID}`, {
      statusCode: 401,
      body: {
        message: '인증이 필요합니다.',
      },
    });

    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');
    cy.get('[data-cy="project-detail-tab-recruit"]').click();

    cy.contains('마감').should('be.visible');
    cy.contains('button', '지원하기').should('not.exist');
  });

  it('내가 리더인 프로젝트에서는 관리 링크를 보여주고 지원 동작을 차단한다', () => {
    installAuthenticatedShellIntercepts();
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);
    installTeamManagementIntercept();
    cy.intercept('GET', `**/api/v1/project/like/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          isLiked: false,
        },
      },
    });

    visitAuthenticated(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');
    cy.wait('@teamManagementRequest');

    cy.contains('프로젝트 관리').should('have.attr', 'href', `/projects/${PROJECT_ID}/manage`);
    cy.get('[data-cy="project-detail-tab-recruit"]').click();
    cy.contains('지원하기').click();
    cy.contains('자신의 프로젝트에는 지원할 수 없습니다.').should('be.visible');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);
  });
});

describe('프로젝트 지원 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    installAuthenticatedShellIntercepts();
    installJobOptionsIntercept();
  });

  it('지원 폼 유효성 에러를 보여준다', () => {
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 200,
      body: {
        result: APPLICATION_PAGE,
      },
    }).as('applicationPageRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply`);
    cy.wait('@applicationPageRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="project-application-submit"]').click();
    cy.contains('지원 사유를 10자 이상 입력해 주세요.').should('be.visible');
  });

  it('지원 실패 시 에러를 보여주고 폼에 머문다', () => {
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 200,
      body: {
        result: APPLICATION_PAGE,
      },
    }).as('applicationPageRequest');
    cy.intercept('POST', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 500,
      body: {
        message: '프로젝트 지원에 실패했습니다.',
      },
    }).as('failedApplicationRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply`);
    cy.wait('@applicationPageRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="project-application-motivation"]').type(
      '프론트엔드 구현 경험으로 프로젝트에 기여하고 싶습니다.',
    );
    cy.get('[data-cy="project-application-submit"]').click();
    cy.wait('@failedApplicationRequest');

    cy.contains('프로젝트 지원에 실패했습니다.').should('be.visible');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}/apply`);
  });

  it('이미 지원한 프로젝트는 안내 메시지를 보여준다', () => {
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 409,
      body: {
        message: '이미 지원한 프로젝트입니다.',
      },
    }).as('duplicateApplicationPageRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply`);
    cy.wait('@duplicateApplicationPageRequest');

    cy.contains('지원 정보를 불러오지 못했습니다.').should('be.visible');
    cy.contains('이미 지원한 프로젝트입니다.').should('be.visible');
  });
});

describe('프로젝트 생성 및 관리 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    installAuthenticatedShellIntercepts();
    installJobOptionsIntercept();
  });

  it('프로젝트를 생성한다', () => {
    cy.intercept('POST', '**/api/v1/projects', {
      statusCode: 200,
      body: {
        result: {
          id: 777,
          title: 'E2E 생성 프로젝트',
          createdAt: '2026-05-01T00:00:00',
        },
      },
    }).as('createProjectRequest');

    visitAuthenticated('/projects/create');
    cy.wait('@jobOptionsRequest');

    fillRequiredProjectForm();
    cy.get('[data-cy="project-form-submit"]').click();
    cy.wait('@createProjectRequest');
    cy.location('pathname').should('eq', '/projects/777');
  });

  it('프로젝트를 수정한다', () => {
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);
    installTeamManagementIntercept();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/edit`, {
      statusCode: 200,
      body: {
        result: EDIT_PREFILL,
      },
    }).as('editPrefillRequest');
    cy.intercept('PUT', `**/api/v1/projects/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          projectId: PROJECT_ID,
          name: 'E2E 수정 프로젝트',
          recruitmentStatus: 'RECRUITING',
          autoRejectedApplicantCount: 0,
        },
      },
    }).as('updateProjectRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage/edit`);
    cy.wait('@editPrefillRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="project-form-name"]').clear();
    cy.get('[data-cy="project-form-name"]').type('E2E 수정 프로젝트');
    cy.get('[data-cy="project-form-description"]').clear();
    cy.get('[data-cy="project-form-description"]').type(
      'E2E 테스트에서 프로젝트 수정 요청을 검증하기 위한 충분한 길이의 설명입니다.',
    );
    cy.get('[data-cy="project-form-submit"]').click();

    cy.wait('@updateProjectRequest');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}/manage`);
  });

  it('프로젝트 모집 상태를 중단 처리한다', () => {
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);
    installTeamManagementIntercept();
    cy.intercept('POST', `**/api/v1/projects/${PROJECT_ID}/recruitment/toggle`, {
      statusCode: 200,
      body: {
        result: {
          projectId: PROJECT_ID,
          recruitmentStatus: 'SUSPENDED',
          isRecruiting: false,
        },
      },
    }).as('toggleRecruitmentRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage`);
    cy.wait('@teamManagementRequest');

    cy.get('[data-cy="project-manage-status-suspended"]').check({ force: true });
    cy.wait('@toggleRecruitmentRequest');
    cy.get('[data-cy="project-manage-status-suspended"]').should('be.checked');
  });

  it('내가 만든 프로젝트와 참여 프로젝트는 내 프로필에서 확인한다', () => {
    cy.intercept('GET', '**/api/members', {
      statusCode: 200,
      body: {
        result: {
          ...MEMBER_PROFILE,
          projectCards: [
            {
              projectId: 901,
              projectName: '내가 만든 프로젝트',
              categoryName: 'AI/테크',
              imageUrl: null,
              creatorName: '홍길동',
              creatorImageUrl: null,
              currentCount: 2,
              recruitmentCount: 5,
            },
            {
              projectId: 902,
              projectName: '참여 중인 프로젝트',
              categoryName: '헬스케어',
              imageUrl: null,
              creatorName: '팀리더',
              creatorImageUrl: null,
              currentCount: 4,
              recruitmentCount: 6,
            },
          ],
        },
      },
    }).as('profileProjectsRequest');

    visitAuthenticated('/profile');
    cy.wait('@profileProjectsRequest');
    cy.wait('@jobOptionsRequest');

    cy.contains('참여 프로젝트').should('be.visible');
    cy.contains('내가 만든 프로젝트').should('be.visible');
    cy.contains('참여 중인 프로젝트').should('be.visible');
    cy.get('[data-cy="profile-joined-project"]').should('have.length', 2);
  });
});

export {};
