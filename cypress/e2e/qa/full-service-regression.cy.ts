const AUTH_STORAGE_KEY = 'meeteam-auth-storage';
const PROJECT_ID = 1201;
const APPLICATION_ID = 9001;

const AUTH_SESSION = {
  state: {
    memberId: 42,
    name: '홍길동',
    email: 'leader@example.com',
    isAuthenticated: true,
  },
  version: 0,
};

const MEMBER_PROFILE = {
  memberId: 42,
  name: '홍길동',
  birthDate: '1998-03-15',
  age: 28,
  gender: 'MALE',
  email: 'leader@example.com',
  githubUrl: 'https://github.com/meeteam',
  blogUrl: 'https://blog.example.com',
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
  introduce: 'QA 회귀 테스트용 프로필입니다.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [
    {
      projectId: PROJECT_ID,
      projectName: 'QA 회귀 프로젝트',
      categoryName: '캡스톤',
      imageUrl: null,
      creatorName: '홍길동',
      creatorImageUrl: null,
      currentCount: 2,
      recruitmentCount: 4,
    },
  ],
};

const JOB_OPTIONS = {
  fields: [
    {
      code: 'FRONTEND',
      name: '프론트엔드',
      positions: [{ id: 25, code: 'WEB_FRONTEND', name: '웹 프론트엔드' }],
      techStacks: [
        { id: 1, name: 'React' },
        { id: 2, name: 'TypeScript' },
      ],
    },
    {
      code: 'BACKEND',
      name: '백엔드',
      positions: [{ id: 31, code: 'NODE_NESTJS', name: 'Node.js/NestJS' }],
      techStacks: [
        { id: 11, name: 'Node.js' },
        { id: 12, name: 'PostgreSQL' },
      ],
    },
  ],
};

const PROJECT_DETAIL = {
  id: PROJECT_ID,
  name: 'QA 회귀 프로젝트',
  description: 'QA 관점에서 프로젝트 상세, 모집, Q&A를 검증하는 프로젝트입니다.',
  projectCategory: 'CAPSTONE',
  platformCategory: 'WEB',
  imageUrl: null,
  recruitmentStatus: 'RECRUITING',
  recruitmentDeadlineType: 'END_DATE',
  startDate: '2026-05-01',
  endDate: '2026-06-30',
  githubRepositoryUrl: 'https://github.com/meeteam/qa-regression',
  communicationChannelUrl: 'https://discord.gg/meeteam',
  leader: {
    id: 7,
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
  members: [
    {
      memberId: 7,
      name: '프로젝트 리더',
      profileImageUrl: null,
      jobFieldName: '기획',
      jobPositionName: 'PM 프로덕트 매니저',
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
      jobPositionName: 'Node.js/NestJS',
      recruitmentCount: 1,
      currentCount: 1,
      isClosed: true,
      techStacks: ['Node.js'],
    },
  ],
  likeCount: 2,
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
      jobPositionName: 'PM 프로덕트 매니저',
      isLeader: true,
    },
    {
      memberId: 99,
      name: '기존 팀원',
      profileImageUrl: null,
      jobFieldName: '백엔드',
      jobPositionName: 'Node.js/NestJS',
      isLeader: false,
    },
  ],
  isLeader: true,
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
      jobPositionName: 'PM 프로덕트 매니저',
      isLeader: true,
    },
    {
      memberId: 99,
      name: '기존 팀원',
      profileImageUrl: null,
      jobFieldName: '백엔드',
      jobPositionName: 'Node.js/NestJS',
      isLeader: false,
    },
  ],
};

const APPLICATION_PAGE = {
  applicant: {
    profileImageUrl: null,
    name: '홍길동',
    jobFieldNames: ['프론트엔드'],
    jobPositionNames: ['웹 프론트엔드'],
    age: 28,
    gender: 'MALE',
    email: 'leader@example.com',
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

const EDIT_PREFILL = {
  projectId: PROJECT_ID,
  name: 'QA 회귀 프로젝트',
  description: '수정 전 설명입니다.',
  projectCategory: 'CAPSTONE',
  projectCategoryName: '캡스톤',
  platformCategory: 'WEB',
  recruitmentDeadlineType: 'END_DATE',
  githubRepositoryUrl: 'https://github.com/meeteam/qa-regression',
  communicationChannelUrl: 'https://discord.gg/meeteam',
  endDate: '2026-06-30',
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

function visitAuthenticated(path: string) {
  cy.visit(path, {
    onBeforeLoad(window) {
      seedAuthSession(window);
    },
  });
}

function installAuthenticatedShellIntercepts(profile = MEMBER_PROFILE) {
  cy.intercept('GET', '**/api/v1/notifications/unread/count', {
    statusCode: 200,
    body: {
      result: {
        unreadCount: 1,
      },
    },
  }).as('unreadNotificationCountRequest');

  cy.intercept('GET', '**/api/v1/members/me', {
    statusCode: 200,
    body: {
      result: profile,
    },
  }).as('myProfileRequest');
}

function installHomeIntercepts() {
  cy.intercept('GET', '**/api/v1/main/projects*', {
    statusCode: 200,
    body: {
      result: {
        content: [],
        last: true,
        number: 0,
        size: 4,
        empty: true,
      },
    },
  });

  cy.intercept('GET', '**/api/v1/main/members*', {
    statusCode: 200,
    body: {
      result: {
        content: [],
        last: true,
        number: 0,
        size: 5,
        empty: true,
      },
    },
  });
}

function installJobOptionsIntercept() {
  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: JOB_OPTIONS,
    },
  }).as('jobOptionsRequest');
}

function installProjectDetailIntercept(project = PROJECT_DETAIL) {
  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
    statusCode: 200,
    body: {
      result: project,
    },
  }).as('projectDetailRequest');
}

function installProjectLikeIntercepts() {
  cy.intercept('GET', `**/api/v1/project/like/${PROJECT_ID}`, {
    statusCode: 200,
    body: {
      result: {
        isLiked: false,
      },
    },
  }).as('projectLikeStatusRequest');
}

function installTeamManagementIntercept(team = TEAM_MANAGEMENT) {
  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/team`, {
    statusCode: 200,
    body: {
      result: team,
    },
  }).as('teamManagementRequest');
}

function installProjectSearchIntercept() {
  cy.intercept('GET', '**/api/v1/projects/search*', {
    statusCode: 200,
    body: {
      result: {
        content: [
          {
            projectId: PROJECT_ID,
            projectName: 'QA 회귀 프로젝트',
            categoryName: '캡스톤',
            imageUrl: null,
            endDate: '2026-06-30',
            creatorName: '프로젝트 리더',
            creatorImageUrl: null,
            currentCount: 2,
            recruitmentCount: 4,
          },
        ],
        last: true,
        first: true,
        number: 0,
        size: 8,
        numberOfElements: 1,
        empty: false,
      },
    },
  }).as('projectSearchRequest');
}

function installTeammateSearchIntercept() {
  cy.intercept('GET', '**/api/v1/members/search*', {
    statusCode: 200,
    body: {
      result: {
        content: [
          {
            memberId: 77,
            name: '권나은',
            profileImageUrl: null,
            jobFieldName: '프론트',
            projectCount: 5,
            techStacks: [
              { id: 1, name: 'React', displayOrder: 1 },
              { id: 2, name: 'TypeScript', displayOrder: 2 },
            ],
          },
        ],
        last: true,
        number: 0,
        size: 15,
        empty: false,
        totalElements: 1,
      },
    },
  }).as('teammateSearchRequest');
}

function fillMinimalProjectCreateForm() {
  cy.get('[data-cy="project-form-name"]').clear().type('QA 등록 프로젝트');
  cy.get('[data-cy="project-form-category-capstone"]').click();
  cy.contains('button', '다음').click();
  cy.get('[data-cy="project-form-github"]').clear().type('https://github.com/meeteam/qa-create');
  cy.get('[data-cy="project-form-communication"]').clear().type('https://discord.gg/meeteam');
  cy.get('[data-cy="project-form-description"]')
    .clear()
    .type('QA 회귀 테스트에서 프로젝트 등록 요청을 검증하기 위한 설명입니다.');
  cy.contains('button', '다음').click();
  cy.get('[data-cy="project-form-my-major"]').click();
  cy.contains('li', '프론트엔드').click();
  cy.get('[data-cy="project-form-my-minor"]').click();
  cy.contains('li', '웹 프론트엔드').click();
  cy.get('[data-cy="project-form-recruit-major-0"]').click();
  cy.contains('li', '프론트엔드').click();
  cy.get('[data-cy="project-form-recruit-minor-0"]').click();
  cy.contains('li', '웹 프론트엔드').click();
  cy.contains('button', '다음').click();
  cy.get('[data-cy="project-form-tech-input-0"]').type('React{enter}');
  cy.get('[data-cy="project-form-until-complete"]').check({ force: true });
}

describe('QA full-service regression and TDD coverage', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('[S-001][S-003] 로그인 성공 후 세션을 만들고 보호 페이지는 비로그인 접근을 차단한다', () => {
    installHomeIntercepts();
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 200,
      body: {
        result: {
          isNewMember: false,
          code: null,
        },
      },
    }).as('loginRequest');
    cy.intercept('GET', '**/api/v1/notifications/unread/count', {
      statusCode: 200,
      body: { result: { unreadCount: 1 } },
    }).as('unreadNotificationCountRequest');
    cy.intercept(
      { method: 'GET', url: '**/api/v1/members/me', times: 1 },
      {
        statusCode: 200,
        body: { result: MEMBER_PROFILE },
      },
    ).as('myProfileRequest');

    cy.visit('/auth/login');
    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest').then(({ request }) => {
      const requestBody =
        typeof request.body === 'string' ? JSON.parse(request.body) : request.body;

      expect(requestBody).to.deep.equal({
        studentId: '21013220',
        password: 'password123',
      });
    });
    cy.wait('@myProfileRequest');
    cy.location('pathname').should('eq', '/');
    cy.get('button[aria-label="프로필 메뉴"]').should('be.visible');

    cy.clearLocalStorage();
    cy.intercept('GET', '**/api/v1/members/me', {
      statusCode: 401,
      body: {
        message: '인증이 필요합니다.',
      },
    }).as('unauthorizedProfileRequest');

    cy.visit('/projects/create');
    cy.wait('@unauthorizedProfileRequest');
    cy.contains('로그인이 필요한 기능입니다').should('be.visible');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });

  it('[S-002] 회원가입 입력값 검증과 신규 회원 온보딩 진입을 확인한다', () => {
    installJobOptionsIntercept();

    cy.visit('/auth/sign-up');
    cy.wait('@jobOptionsRequest');
    cy.get('[data-cy="signup-form"]').submit();
    cy.contains('올바른 이메일 형식을 입력해 주세요.').should('be.visible');
    cy.contains('비밀번호는 8자 이상이어야 합니다.').should('be.visible');

    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 200,
      body: {
        result: {
          newMember: true,
          code: 'onboarding-code',
        },
      },
    }).as('newMemberLoginRequest');

    cy.visit('/auth/login');
    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@newMemberLoginRequest');
    cy.location('pathname').should('eq', '/auth/sign-up/sejong');
  });

  it('[S-004][S-017] 프로젝트 찾기와 팀원 찾기의 검색/필터 요청 계약을 확인한다', () => {
    installProjectSearchIntercept();

    cy.visit('/projects');
    cy.wait('@projectSearchRequest')
      .its('request.url')
      .should('include', 'sort=LATEST')
      .and('include', 'size=8');
    cy.get('[data-cy="project-total-count"]').should('contain', '1');
    cy.contains('QA 회귀 프로젝트').should('be.visible');
    cy.get('[data-cy="project-search-input"]').type('QA');
    cy.wait('@projectSearchRequest').then((interception) => {
      if (interception.request.url.includes('keyword=QA')) {
        return;
      }

      cy.wait('@projectSearchRequest').its('request.url').should('include', 'keyword=QA');
    });

    installJobOptionsIntercept();
    installTeammateSearchIntercept();
    cy.visit('/teammates');
    cy.wait('@teammateSearchRequest').its('request.url').should('not.include', 'sort=');
    cy.wait('@jobOptionsRequest');
    cy.get('[data-cy="teammate-total-count"]').should('contain', '1');
    cy.contains('권나은').should('be.visible');
    cy.get('[data-cy="teammate-search-input"]').type('권');
    cy.wait('@teammateSearchRequest').then((interception) => {
      if (interception.request.url.includes('name=%EA%B6%8C')) {
        return;
      }

      cy.wait('@teammateSearchRequest').its('request.url').should('include', 'name=%EA%B6%8C');
    });
  });

  it('[S-005][S-015][S-020] 상세, 비밀 Q&A, XSS 방어를 확인한다', () => {
    const alertStub = cy.stub().as('windowAlert');
    cy.on('window:alert', alertStub);
    installProjectDetailIntercept({
      ...PROJECT_DETAIL,
      description: '<img src=x onerror=alert("xss")> 안전한 설명 텍스트',
    });
    installProjectLikeIntercepts();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/qna*`, {
      statusCode: 200,
      body: {
        result: {
          content: [
            {
              qnaId: 501,
              questionerId: 77,
              questionerName: '비밀글',
              questionerProfileImageUrl: null,
              question: '비밀글입니다.',
              createdAt: '2026-04-25T10:00:00',
              isSecret: true,
              answers: [],
            },
          ],
          last: true,
          number: 0,
          totalElements: 1,
        },
      },
    }).as('qnaListRequest');

    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');
    cy.wait('@projectLikeStatusRequest');

    cy.contains('QA 회귀 프로젝트').should('be.visible');
    cy.get('[data-cy="project-detail-tab-intro"]').click();
    cy.contains('<img src=x onerror=alert("xss")> 안전한 설명 텍스트').should('be.visible');
    cy.get('@windowAlert').should('not.have.been.called');

    cy.get('[data-cy="project-detail-tab-qna"]').click();
    cy.wait('@qnaListRequest');
    cy.contains('비밀글').should('be.visible');
    cy.contains('비밀글입니다.').should('be.visible');
    cy.contains('로그인 후 Q&A를 작성할 수 있어요.').should('be.visible');
  });

  it('[S-006][S-007][S-009] 프로젝트 등록, 수정, 모집상태 변경의 핵심 네트워크 계약을 확인한다', () => {
    installAuthenticatedShellIntercepts();
    installJobOptionsIntercept();
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);
    installTeamManagementIntercept();
    cy.intercept('POST', '**/api/v1/projects', {
      statusCode: 200,
      body: {
        result: {
          id: 1301,
          title: 'QA 등록 프로젝트',
          createdAt: '2026-05-01T00:00:00',
        },
      },
    }).as('createProjectRequest');
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
          name: 'QA 수정 프로젝트',
          recruitmentStatus: 'RECRUITING',
          autoRejectedApplicantCount: 0,
        },
      },
    }).as('updateProjectRequest');
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

    visitAuthenticated(`/projects/${PROJECT_ID}/manage/edit`);
    cy.wait('@editPrefillRequest');
    cy.wait('@jobOptionsRequest');
    cy.get('[data-cy="project-form-name"]').clear().type('QA 수정 프로젝트');
    cy.get('[data-cy="project-form-submit"]').click();
    cy.wait('@updateProjectRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage`);
    cy.wait('@teamManagementRequest');
    cy.get('[data-cy="project-manage-status-suspended"]').check({ force: true });
    cy.wait('@toggleRecruitmentRequest');
    cy.get('[data-cy="project-manage-status-suspended"]').should('be.checked');

    visitAuthenticated('/projects/create');
    cy.wait('@jobOptionsRequest');
    cy.contains('button', '다음').click();
    cy.contains('프로젝트 이름을 입력해 주세요.').should('be.visible');
    fillMinimalProjectCreateForm();
    cy.get('[data-cy="project-form-submit"]').click();
    cy.wait('@createProjectRequest');
    cy.location('pathname').should('eq', '/projects/1301');
  });

  it('[S-008] 리더는 프로젝트를 삭제할 수 있어야 한다 (TDD)', () => {
    installAuthenticatedShellIntercepts();
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);
    installTeamManagementIntercept();
    cy.intercept('DELETE', `**/api/v1/projects/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          projectId: PROJECT_ID,
          deleted: true,
        },
      },
    }).as('deleteProjectRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage`);
    cy.wait('@teamManagementRequest');

    cy.get('[data-cy="project-delete-button"]').should('be.visible').click();
    cy.get('[data-cy="project-delete-confirm-input"]').type('QA 회귀 프로젝트');
    cy.contains('button', '삭제하기').click();
    cy.wait('@deleteProjectRequest');
    cy.location('pathname').should('eq', '/projects');
  });

  it('[S-010] 지원 성공, 중복 지원, 마감/정원초과 지원 차단을 확인한다', () => {
    installAuthenticatedShellIntercepts();
    installJobOptionsIntercept();
    installProjectDetailIntercept();
    installProjectLikeIntercepts();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 200,
      body: {
        result: APPLICATION_PAGE,
      },
    }).as('applicationPageRequest');
    cy.intercept('POST', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 200,
      body: {
        result: {
          applicationId: APPLICATION_ID,
          projectId: PROJECT_ID,
          applicantId: 42,
          status: 'PENDING',
        },
      },
    }).as('applicationSubmitRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply`);
    cy.wait('@applicationPageRequest');
    cy.wait('@jobOptionsRequest');
    cy.get('[data-cy="project-application-motivation"]').type(
      '프론트엔드 구현 경험으로 프로젝트에 기여하고 싶습니다.',
    );
    cy.get('[data-cy="project-application-submit"]').click();
    cy.wait('@applicationSubmitRequest');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);

    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/application`, {
      statusCode: 409,
      body: {
        message: '이미 지원한 프로젝트입니다.',
      },
    }).as('duplicateApplicationRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply`);
    cy.wait('@duplicateApplicationRequest');
    cy.contains('이미 지원한 프로젝트입니다.').should('be.visible');

    installProjectDetailIntercept({
      ...PROJECT_DETAIL,
      recruitmentStatus: 'CLOSED',
      recruitments: PROJECT_DETAIL.recruitments.map((recruitment) => ({
        ...recruitment,
        isClosed: true,
      })),
    });

    cy.visit(`/projects/${PROJECT_ID}`);
    cy.wait('@projectDetailRequest');
    cy.get('[data-cy="project-detail-tab-recruit"]').click();
    cy.contains('button', '지원하기').should('not.exist');
  });

  it('[S-011] 지원자는 본인 지원서 상세를 확인하고 지원을 취소할 수 있어야 한다 (TDD)', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}`, {
      statusCode: 200,
      body: {
        result: {
          applicationId: APPLICATION_ID,
          applicantId: 42,
          applicantName: '홍길동',
          profileImageUrl: null,
          age: 28,
          gender: 'MALE',
          applicantEmail: 'leader@example.com',
          jobPosition: {
            jobPositionId: 25,
            jobPositionName: '웹 프론트엔드',
            jobFieldId: 3,
            jobFieldName: '프론트엔드',
          },
          motivation: '지원 취소 TDD 검증용 지원서입니다.',
          status: 'PENDING',
        },
      },
    }).as('applicationDetailRequest');
    cy.intercept('DELETE', `**/api/v1/members/me/applications/${APPLICATION_ID}`, {
      statusCode: 200,
      body: {
        result: {
          applicationId: APPLICATION_ID,
          projectId: PROJECT_ID,
          projectName: '미팀 테스트 프로젝트',
          status: 'CANCELLED',
        },
      },
    }).as('cancelApplicationRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/apply/${APPLICATION_ID}`);
    cy.wait('@applicationDetailRequest');
    cy.contains('지원 취소 TDD 검증용 지원서입니다.').should('be.visible');
    cy.get('[data-cy="application-cancel-button"]').should('be.visible').click();
    cy.contains('button', '지원 취소하기').click();
    cy.wait('@cancelApplicationRequest');
    cy.location('pathname').should('eq', '/profile');
  });

  it('[S-012][S-013] 지원자 승인/거절과 팀원 방출은 목록 상태를 갱신한다', () => {
    installAuthenticatedShellIntercepts();
    installProjectDetailIntercept(LEADER_PROJECT_DETAIL);

    let memberRemoved = false;
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/team`, (request) => {
      request.reply({
        statusCode: 200,
        body: {
          result: memberRemoved
            ? {
                ...TEAM_MANAGEMENT,
                currentMemberCount: 1,
                members: [TEAM_MANAGEMENT.members[0]],
              }
            : TEAM_MANAGEMENT,
        },
      });
    }).as('teamManagementRequest');
    cy.intercept('DELETE', `**/api/v1/projects/${PROJECT_ID}/members/99`, (request) => {
      memberRemoved = true;
      request.reply({
        statusCode: 200,
        body: {
          result: {
            projectId: PROJECT_ID,
            expelledMemberId: 99,
            expelledMemberName: '기존 팀원',
          },
        },
      });
    }).as('expelMemberRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage`);
    cy.wait('@teamManagementRequest');
    cy.contains('기존 팀원').should('be.visible');
    cy.contains('button', '방출').click();
    cy.contains('팀원 방출').should('be.visible');
    cy.contains('button', '방출하기').click();
    cy.wait('@expelMemberRequest');
    cy.wait('@teamManagementRequest');
    cy.contains('기존 팀원').should('not.exist');

    let hasPendingApplication = true;
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/applications`, (request) => {
      request.reply({
        statusCode: 200,
        body: {
          result: hasPendingApplication
            ? [
                {
                  applicationId: APPLICATION_ID,
                  applicantId: 77,
                  applicantName: '지원자',
                  profileImageUrl: null,
                  applicantEmail: 'applicant@example.com',
                  jobFieldName: '프론트엔드',
                  jobPositionName: '웹 프론트엔드',
                  motivation: '지원자 승인 테스트입니다.',
                  status: 'PENDING',
                  appliedAt: '2026-04-23T10:00:00',
                  currentCount: 1,
                  recruitmentCount: 2,
                  isRecruitmentFull: false,
                },
              ]
            : [],
        },
      });
    }).as('applicationsRequest');
    cy.intercept(
      'POST',
      `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}/decision`,
      (request) => {
        hasPendingApplication = false;
        request.reply({
          statusCode: 200,
          body: {
            result: {
              applicationId: APPLICATION_ID,
              projectId: PROJECT_ID,
              applicantId: 77,
              decision: 'ACCEPTED',
            },
          },
        });
      },
    ).as('approveApplicationRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage/applicants`);
    cy.wait('@applicationsRequest');
    cy.contains('지원자').should('be.visible');
    cy.contains('button', '승인').click();
    cy.wait('@approveApplicationRequest')
      .its('request.body')
      .should('deep.equal', { decision: 'ACCEPTED' });
    cy.wait('@applicationsRequest');
    cy.contains('대기 중인 지원자가 없습니다.').should('be.visible');
  });

  it('[S-014] 비리더는 관리 화면과 변경 액션에 접근할 수 없다', () => {
    installAuthenticatedShellIntercepts();
    installProjectDetailIntercept(PROJECT_DETAIL);
    installProjectLikeIntercepts();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/team`, {
      statusCode: 403,
      body: {
        code: 'PROJECT_MEMBER403',
        message: '해당 프로젝트 관리 권한이 없습니다.',
      },
    }).as('forbiddenTeamRequest');

    visitAuthenticated(`/projects/${PROJECT_ID}/manage`);
    cy.wait('@forbiddenTeamRequest');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);
    cy.contains('해당 프로젝트 관리 권한이 없습니다.').should('be.visible');
    cy.contains('로그인이 필요한 기능입니다').should('not.exist');
    cy.contains('button', '방출').should('not.exist');
  });

  it('[S-016] 내 프로필과 타인 공개 프로필은 수정 권한과 개인정보 노출 범위가 다르다', () => {
    installAuthenticatedShellIntercepts();
    installJobOptionsIntercept();
    visitAuthenticated('/profile');
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');
    cy.contains('QA 회귀 테스트용 프로필입니다.').should('be.visible');
    cy.contains('button', '프로필 수정').should('be.visible');

    cy.intercept('GET', '**/api/v1/members/77', {
      statusCode: 200,
      body: {
        result: {
          memberId: 77,
          profileImageUrl: null,
          name: '공개 사용자',
          age: 27,
          gender: 'FEMALE',
          representativePosition: '웹 프론트엔드',
          jobPositions: ['웹 프론트엔드'],
          email: 'public@example.com',
          githubUrl: 'https://github.com/public-user',
          blogUrl: null,
          isParticipating: true,
          introduce: '공개 프로필 소개입니다.',
          participatedProjectCount: 1,
          participatedProjects: [],
          groupedSkills: [
            {
              jobFieldName: '프론트엔드',
              jobPositionName: '웹 프론트엔드',
              techStacks: ['React'],
            },
          ],
        },
      },
    }).as('memberProfileRequest');

    cy.visit('/profile/77');
    cy.wait('@memberProfileRequest');
    cy.contains('공개 사용자').should('be.visible');
    cy.contains('공개 프로필 소개입니다.').should('be.visible');
    cy.contains('button', '프로필 수정').should('not.exist');
  });

  it('[S-018] 알림 목록은 읽음 처리와 액션 이동을 제공한다', () => {
    installAuthenticatedShellIntercepts();
    installProjectDetailIntercept();
    installProjectLikeIntercepts();
    cy.intercept('GET', '**/api/v1/notifications?*', {
      statusCode: 200,
      body: {
        result: {
          content: [
            {
              id: 1,
              type: 'PROJECT_APPROVE',
              isRead: false,
              createdAt: '2026-04-25T10:00:00',
              payload: {
                projectId: PROJECT_ID,
                projectName: 'QA 회귀 프로젝트',
                applicationId: APPLICATION_ID,
              },
            },
          ],
          last: true,
          first: true,
          number: 0,
          size: 20,
          numberOfElements: 1,
          empty: false,
        },
      },
    }).as('notificationsRequest');

    visitAuthenticated('/notifications');
    cy.wait('@notificationsRequest');
    cy.contains('1개의 안 읽은 알림').should('be.visible');
    cy.contains('프로젝트 합류가 승인되었습니다.').should('be.visible');
    cy.contains('button', '모두 읽음 처리').click();
    cy.contains('0개의 안 읽은 알림').should('be.visible');
    cy.contains('a', '프로젝트 보기').click();
    cy.wait('@projectDetailRequest');
    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);
  });

  it('[S-019] 회원탈퇴는 확인 모달과 세션 초기화를 거친다', () => {
    installAuthenticatedShellIntercepts();
    installHomeIntercepts();
    cy.intercept('DELETE', '**/api/v1/auth/withdraw', {
      statusCode: 200,
      body: {
        result: null,
      },
    }).as('withdrawRequest');

    visitAuthenticated('/settings');
    cy.contains('회원탈퇴').should('be.visible');
    cy.contains('button', '회원탈퇴').click();
    cy.contains('회원탈퇴를 진행할까요?').should('be.visible');
    cy.contains('button', '취소').click();
    cy.contains('회원탈퇴를 진행할까요?').should('not.exist');

    cy.contains('button', '회원탈퇴').click();
    cy.contains('button', '탈퇴하기').click();
    cy.wait('@withdrawRequest');
    cy.location('pathname').should('eq', '/');
    cy.contains('로그인이 필요한 기능입니다').should('not.exist');
  });

  it('[S-021][S-022] 모바일 뷰포트에서도 주요 탐색 UI와 검색 입력이 깨지지 않는다', () => {
    cy.viewport(375, 667);
    installProjectSearchIntercept();

    cy.visit('/projects');
    cy.wait('@projectSearchRequest').its('response.statusCode').should('eq', 200);

    cy.contains('팀원 찾기').should('be.visible');
    cy.contains('프로젝트 찾기').should('be.visible');
    cy.get('[data-cy="project-search-input"]').should('be.visible').type('QA');
    cy.wait('@projectSearchRequest');
    cy.get('[data-cy="project-list"]').should('be.visible');
  });
});

export {};
