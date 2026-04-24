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
  groupedSkills: [],
  skills: ['React', 'TypeScript'],
  isParticipating: true,
  projectCount: 2,
  introduce: '안녕하세요.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [],
};

const PROJECT_DETAIL = {
  id: PROJECT_ID,
  name: '알림 이동 테스트 프로젝트',
  description: '알림 클릭 후 프로젝트 상세 이동을 검증합니다.',
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
  isLeader: false,
};

function seedAuthSession(window: Window) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(AUTH_SESSION));
}

function installAuthenticatedShellIntercepts() {
  cy.intercept('GET', '**/api/v1/notifications/unread/count', {
    statusCode: 200,
    body: {
      result: {
        unreadCount: 2,
      },
    },
  }).as('unreadNotificationCountRequest');

  cy.intercept('GET', '**/api/v1/members/me', {
    statusCode: 200,
    body: {
      result: MEMBER_PROFILE,
    },
  }).as('myProfileRequest');
}

function visitAuthenticatedNotifications() {
  cy.visit('/notifications', {
    onBeforeLoad(window) {
      seedAuthSession(window);
    },
  });
}

describe('알림 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    installAuthenticatedShellIntercepts();
  });

  it('알림 목록을 조회하고 모두 읽음 처리한다', () => {
    cy.intercept('GET', '**/api/v1/notifications?page=0&size=20', {
      statusCode: 200,
      body: {
        result: {
          content: [
            {
              id: 1,
              type: 'PROJECT_APPLY',
              isRead: false,
              createdAt: '2026-04-23T10:00:00',
              payload: {
                projectId: PROJECT_ID,
                projectName: '알림 이동 테스트 프로젝트',
                applicantName: '지원자',
              },
            },
            {
              id: 2,
              type: 'PROJECT_MY_APPLY',
              isRead: false,
              createdAt: '2026-04-22T10:00:00',
              payload: {
                projectId: PROJECT_ID,
                projectName: '알림 이동 테스트 프로젝트',
              },
            },
          ],
          last: true,
          number: 0,
          size: 20,
          empty: false,
        },
      },
    }).as('notificationsRequest');

    visitAuthenticatedNotifications();
    cy.wait('@notificationsRequest');

    cy.contains('h1', '알림 센터').should('be.visible');
    cy.contains('2개의 안 읽은 알림').should('be.visible');
    cy.contains('새로운 지원자가 있습니다.').should('be.visible');
    cy.contains('지원이 완료되었습니다.').should('be.visible');

    cy.contains('button', '모두 읽음 처리').click();
    cy.contains('0개의 안 읽은 알림').should('be.visible');
    cy.contains('button', '모두 읽음 처리').should('be.disabled');
  });

  it('알림 액션을 클릭하면 프로젝트 상세로 이동한다', () => {
    cy.intercept('GET', '**/api/v1/notifications?page=0&size=20', {
      statusCode: 200,
      body: {
        result: {
          content: [
            {
              id: 10,
              type: 'PROJECT_MY_APPLY',
              isRead: false,
              createdAt: '2026-04-23T10:00:00',
              payload: {
                projectId: PROJECT_ID,
                projectName: '알림 이동 테스트 프로젝트',
              },
            },
          ],
          last: true,
          number: 0,
          size: 20,
          empty: false,
        },
      },
    }).as('notificationsRequest');

    cy.intercept('GET', `**/api/v1/projects/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: PROJECT_DETAIL,
      },
    }).as('projectDetailRequest');

    cy.intercept('GET', `**/api/v1/project/like/${PROJECT_ID}`, {
      statusCode: 200,
      body: {
        result: {
          isLiked: false,
        },
      },
    }).as('projectLikeStatusRequest');

    visitAuthenticatedNotifications();
    cy.wait('@notificationsRequest');

    cy.contains('a', '프로젝트 보기').click();
    cy.wait('@projectDetailRequest');
    cy.wait('@projectLikeStatusRequest');

    cy.location('pathname').should('eq', `/projects/${PROJECT_ID}`);
    cy.contains('알림 이동 테스트 프로젝트').should('be.visible');
  });

  it('알림 목록 조회가 실패하면 에러 메시지를 보여준다', () => {
    cy.intercept('GET', '**/api/v1/notifications?page=0&size=20', {
      statusCode: 500,
      body: {
        message: '알림 목록을 불러오지 못했습니다.',
      },
    }).as('failedNotificationsRequest');

    visitAuthenticatedNotifications();
    cy.wait('@failedNotificationsRequest');

    cy.contains('알림 목록을 불러오지 못했습니다.').should('be.visible');
    cy.contains('도착한 알림이 없습니다.').should('be.visible');
  });
});

export {};
