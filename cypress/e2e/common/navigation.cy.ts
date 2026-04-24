const AUTH_STORAGE_KEY = 'meeteam-auth-storage';

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

function seedAuthSession(window: Window) {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(AUTH_SESSION));
}

function installProjectSearchIntercept() {
  cy.intercept('GET', '**/api/v1/projects/search*', {
    statusCode: 200,
    body: {
      result: {
        content: [],
        last: true,
        first: true,
        number: 0,
        size: 8,
        numberOfElements: 0,
        empty: true,
      },
    },
  }).as('projectSearchRequest');
}

function installTeammateIntercepts() {
  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: {
        fields: [],
      },
    },
  }).as('jobOptionsRequest');

  cy.intercept('GET', '**/api/v1/members/search*', {
    statusCode: 200,
    body: {
      result: {
        content: [],
        last: true,
        number: 0,
        size: 15,
        empty: true,
        totalElements: 0,
      },
    },
  }).as('teammateSearchRequest');
}

function installAuthenticatedShellIntercepts() {
  cy.intercept('GET', '**/api/v1/notifications/unread/count', {
    statusCode: 200,
    body: {
      result: {
        unreadCount: 0,
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

describe('내비게이션과 공통 UI', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('미로그인 상태의 헤더는 로그인 CTA를 보여준다', () => {
    installProjectSearchIntercept();

    cy.visit('/projects');
    cy.wait('@projectSearchRequest');

    cy.contains('a', '로그인').should('be.visible').and('have.attr', 'href', '/auth/login');
    cy.get('button[aria-label="프로필 메뉴"]').should('not.exist');
    cy.get('button[aria-label="알림"]').should('not.exist');
  });

  it('로그인 상태의 헤더는 알림과 프로필 메뉴를 보여주고 로그아웃 후 로그인 CTA로 돌아간다', () => {
    installProjectSearchIntercept();
    installAuthenticatedShellIntercepts();
    cy.intercept('POST', '**/api/v1/auth/logout', {
      statusCode: 200,
      body: {
        result: '로그아웃되었습니다.',
      },
    }).as('logoutRequest');

    cy.visit('/projects', {
      onBeforeLoad(window) {
        seedAuthSession(window);
      },
    });
    cy.wait('@projectSearchRequest');
    cy.wait('@unreadNotificationCountRequest');
    cy.wait('@myProfileRequest');

    cy.contains('a', '로그인').should('not.exist');
    cy.get('button[aria-label="알림"]').should('be.visible');
    cy.get('button[aria-label="프로필 메뉴"]').click();
    cy.contains('[role="menu"]', '내 프로필').should('be.visible');
    cy.contains('button', '로그아웃').click();
    cy.wait('@logoutRequest');

    cy.location('pathname').should('eq', '/projects');
    cy.contains('a', '로그인').should('exist').and('have.attr', 'href', '/auth/login');
  });

  it('모바일 viewport에서도 주요 헤더 링크로 이동할 수 있다', () => {
    installProjectSearchIntercept();
    installTeammateIntercepts();
    cy.viewport('iphone-6');

    cy.visit('/');
    cy.contains('a', '팀원 찾기').click({ force: true });
    cy.wait('@teammateSearchRequest');
    cy.location('pathname').should('eq', '/teammates');

    cy.contains('a', '프로젝트 찾기').click({ force: true });
    cy.wait('@projectSearchRequest');
    cy.location('pathname').should('eq', '/projects');
  });

  it('잘못된 URL은 Next 기본 404 화면을 보여준다', () => {
    cy.visit('/not-existing-route-for-e2e', { failOnStatusCode: false });

    cy.contains('404').should('be.visible');
    cy.contains('This page could not be found').should('be.visible');
  });

  it('클라이언트 서버 에러는 공통 토스트로 노출된다', () => {
    cy.intercept('GET', '**/api/v1/main/projects*', {
      statusCode: 500,
      body: {
        message: '메인 프로젝트 목록을 불러오지 못했습니다.',
      },
    }).as('failedHomeProjectsRequest');

    cy.visit('/');
    cy.wait('@failedHomeProjectsRequest');

    cy.contains('메인 프로젝트 목록을 불러오지 못했습니다.').should('be.visible');
  });
});

export {};
