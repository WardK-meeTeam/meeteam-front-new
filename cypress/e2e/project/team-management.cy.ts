const AUTH_STORAGE_KEY = 'meeteam-auth-storage';
const PROJECT_ID = 501;
const APPLICATION_ID = 9001;

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
  representativePosition: 'PM',
  representativePositionEn: 'PM',
  groupedSkills: [],
  skills: ['Notion'],
  isParticipating: true,
  projectCount: 2,
  introduce: '안녕하세요.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [],
};

const PROJECT_DETAIL = {
  id: PROJECT_ID,
  name: '팀 관리 테스트 프로젝트',
  description: '지원자 관리 흐름을 검증하는 프로젝트입니다.',
  projectCategory: 'AI_TECH',
  platformCategory: 'WEB',
  imageUrl: null,
  recruitmentStatus: 'RECRUITING',
  recruitmentDeadlineType: 'END_DATE',
  startDate: '2026-05-01',
  endDate: '2026-06-01',
  githubRepositoryUrl: null,
  communicationChannelUrl: null,
  leader: {
    id: 42,
    name: '홍길동',
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
  recruitments: [
    {
      jobFieldCode: 'FRONTEND',
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      recruitmentCount: 2,
      currentCount: 1,
      isClosed: false,
      techStacks: ['React'],
    },
  ],
  likeCount: 0,
  isLiked: false,
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
      jobPositionName: 'PM',
      isLeader: true,
    },
    {
      memberId: 99,
      name: '기존 팀원',
      profileImageUrl: null,
      jobFieldName: '백엔드',
      jobPositionName: 'Node.js',
      isLeader: false,
    },
  ],
};

const PENDING_APPLICATION = {
  applicationId: APPLICATION_ID,
  applicantId: 77,
  applicantName: '지원자',
  profileImageUrl: null,
  applicantEmail: 'applicant@example.com',
  jobFieldName: '프론트엔드',
  jobPositionName: '웹 프론트엔드',
  motivation: 'React 경험을 바탕으로 프로젝트에 기여하고 싶습니다.',
  status: 'PENDING',
  appliedAt: '2026-04-23T10:00:00',
  currentCount: 1,
  recruitmentCount: 2,
  isRecruitmentFull: false,
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

function installManageHeaderIntercepts() {
  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
    statusCode: 200,
    body: {
      result: PROJECT_DETAIL,
    },
  }).as('projectDetailRequest');

  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/team`, {
    statusCode: 200,
    body: {
      result: TEAM_MANAGEMENT,
    },
  }).as('teamManagementRequest');
}

function visitAuthenticatedApplicantsPage() {
  cy.visit(`/projects/${PROJECT_ID}/manage/applicants`, {
    onBeforeLoad(window) {
      seedAuthSession(window);
    },
  });
}

function installApplicationsIntercept() {
  let hasPendingApplication = true;

  cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/applications`, (request) => {
    request.reply({
      statusCode: 200,
      body: {
        result: hasPendingApplication ? [PENDING_APPLICATION] : [],
      },
    });
  }).as('applicationsRequest');

  return {
    removePendingApplication() {
      hasPendingApplication = false;
    },
  };
}

describe('팀 지원자 관리 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    installAuthenticatedShellIntercepts();
    installManageHeaderIntercepts();
  });

  it('팀 관리 상세에서 지원자 목록과 상세 정보를 확인한다', () => {
    installApplicationsIntercept();
    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}`, {
      statusCode: 200,
      body: {
        result: {
          applicationId: APPLICATION_ID,
          applicantId: 77,
          applicantName: '지원자',
          profileImageUrl: null,
          age: 27,
          gender: 'FEMALE',
          applicantEmail: 'applicant@example.com',
          jobPosition: {
            jobPositionId: 25,
            jobPositionName: '웹 프론트엔드',
            jobFieldId: 3,
            jobFieldName: '프론트엔드',
          },
          motivation: '상세 지원서에서 확인하는 자기소개입니다.',
          status: 'PENDING',
        },
      },
    }).as('applicationDetailRequest');

    visitAuthenticatedApplicantsPage();
    cy.wait('@applicationsRequest');

    cy.contains('팀 관리 테스트 프로젝트').should('be.visible');
    cy.contains('지원자 목록').should('be.visible');
    cy.contains('지원자').should('be.visible');
    cy.contains('React 경험을 바탕으로 프로젝트에 기여하고 싶습니다.').should('be.visible');

    cy.contains('button', '상세 보기').click();
    cy.wait('@applicationDetailRequest');

    cy.contains('지원서 상세').should('be.visible');
    cy.contains('상세 지원서에서 확인하는 자기소개입니다.').should('be.visible');
    cy.contains('27세').should('be.visible');
    cy.contains('여성').should('be.visible');
  });

  it('지원자를 승인하면 대기 목록에서 제거된다', () => {
    const applications = installApplicationsIntercept();
    cy.intercept(
      'POST',
      `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}/decision`,
      (request) => {
        applications.removePendingApplication();
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

    visitAuthenticatedApplicantsPage();
    cy.wait('@applicationsRequest');

    cy.contains('button', '승인').click();
    cy.wait('@approveApplicationRequest')
      .its('request.body')
      .should('deep.equal', { decision: 'ACCEPTED' });
    cy.wait('@applicationsRequest');

    cy.contains('대기 중인 지원자가 없습니다.').should('be.visible');
  });

  it('지원자를 거절하면 대기 목록에서 제거된다', () => {
    const applications = installApplicationsIntercept();
    cy.intercept(
      'POST',
      `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}/decision`,
      (request) => {
        applications.removePendingApplication();
        request.reply({
          statusCode: 200,
          body: {
            result: {
              applicationId: APPLICATION_ID,
              projectId: PROJECT_ID,
              applicantId: 77,
              decision: 'REJECTED',
            },
          },
        });
      },
    ).as('rejectApplicationRequest');

    visitAuthenticatedApplicantsPage();
    cy.wait('@applicationsRequest');

    cy.contains('button', '거절').click();
    cy.wait('@rejectApplicationRequest')
      .its('request.body')
      .should('deep.equal', { decision: 'REJECTED' });
    cy.wait('@applicationsRequest');

    cy.contains('대기 중인 지원자가 없습니다.').should('be.visible');
  });

  it('지원자 처리 실패 시 에러 메시지를 보여주고 목록을 유지한다', () => {
    installApplicationsIntercept();
    cy.intercept(
      'POST',
      `**/api/v1/projects/${PROJECT_ID}/applications/${APPLICATION_ID}/decision`,
      {
        statusCode: 500,
        body: {
          message: '지원자 처리 중 오류가 발생했습니다.',
        },
      },
    ).as('failedDecisionRequest');

    visitAuthenticatedApplicantsPage();
    cy.wait('@applicationsRequest');

    cy.contains('button', '승인').click();
    cy.wait('@failedDecisionRequest');

    cy.contains('지원자 처리 중 오류가 발생했습니다.').should('be.visible');
    cy.contains('지원자').should('be.visible');
  });
});

export {};
