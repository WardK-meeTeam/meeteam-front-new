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

const MEMBER_PROFILE_INFO = {
  memberId: 42,
  name: '홍길동',
  birthDate: '1998-03-15',
  gender: 'MALE',
  email: 'hello@example.com',
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
  introduce: '안녕하세요.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [],
};

const JOB_OPTIONS_INFO = {
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
      result: MEMBER_PROFILE_INFO,
    },
  }).as('myProfileRequest');
}

describe('인증 세션 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('로그아웃하면 세션이 초기화되고 보호 페이지에 다시 접근할 수 없다', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('POST', '**/api/v1/auth/logout', {
      statusCode: 200,
      body: {
        result: '로그아웃되었습니다.',
      },
    }).as('logoutRequest');

    cy.visit('/', {
      onBeforeLoad(window) {
        seedAuthSession(window);
      },
    });

    cy.wait('@unreadNotificationCountRequest');
    cy.wait('@myProfileRequest');

    cy.get('button[aria-label="프로필 메뉴"]').click();
    cy.contains('button', '로그아웃').click();

    cy.wait('@logoutRequest');
    cy.location('pathname').should('eq', '/auth/login');

    cy.window().then((window) => {
      const storedSession = window.localStorage.getItem(AUTH_STORAGE_KEY);

      expect(storedSession).to.not.equal(null);
      expect(JSON.parse(storedSession ?? '{}')).to.deep.equal({
        state: {
          memberId: null,
          name: null,
          email: null,
          isAuthenticated: false,
        },
        version: 0,
      });
    });

    cy.visit('/');
    cy.contains('a', '로그인').should('be.visible');
    cy.get('button[aria-label="프로필 메뉴"]').should('not.exist');

    cy.intercept('GET', '**/api/members', {
      statusCode: 401,
      body: {
        message: '인증이 필요합니다.',
      },
    }).as('unauthorizedProfileRequest');

    cy.visit('/profile');
    cy.wait('@unauthorizedProfileRequest');
    cy.location('pathname').should('eq', '/profile');
    cy.contains('내 프로필은 로그인 후 열 수 있어요').should('be.visible');
    cy.contains('로그인하고 프로필을 등록해 스카웃 제안을 받아보세요.').should('be.visible');
  });

  it('저장된 로그인 상태는 새로고침 후에도 유지된다', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('GET', '**/api/v1/jobs/options', {
      statusCode: 200,
      body: {
        result: JOB_OPTIONS_INFO,
      },
    }).as('jobOptionsRequest');

    cy.visit('/profile', {
      onBeforeLoad(window) {
        seedAuthSession(window);
      },
    });

    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');
    cy.contains('button', '프로필 수정').should('be.visible');
    cy.location('pathname').should('eq', '/profile');

    cy.reload();

    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');
    cy.contains('button', '프로필 수정').should('be.visible');
    cy.location('pathname').should('eq', '/profile');

    cy.window().then((window) => {
      expect(JSON.parse(window.localStorage.getItem(AUTH_STORAGE_KEY) ?? '{}')).to.deep.equal(
        AUTH_SESSION,
      );
    });
  });

  it('이미 로그인된 사용자가 로그인 페이지에 접근하면 홈으로 이동한다', () => {
    installAuthenticatedShellIntercepts();

    cy.visit('/auth/login', {
      onBeforeLoad(window) {
        seedAuthSession(window);
      },
    });

    cy.location('pathname').should('eq', '/');
    cy.contains('아이디어가 현실이 되는 곳').should('be.visible');
    cy.get('[data-cy="login-form"]').should('not.exist');
  });

  it('이미 로그인된 사용자가 회원가입 페이지에 접근하면 홈으로 이동한다', () => {
    installAuthenticatedShellIntercepts();

    cy.visit('/auth/sign-up', {
      onBeforeLoad(window) {
        seedAuthSession(window);
      },
    });

    cy.location('pathname').should('eq', '/');
    cy.contains('아이디어가 현실이 되는 곳').should('be.visible');
    cy.get('[data-cy="signup-form"]').should('not.exist');
  });

  it('미인증 사용자가 보호 페이지에 직접 접근하면 로그인 모달과 안내 화면이 노출된다', () => {
    cy.intercept('GET', '**/api/members', {
      statusCode: 401,
      body: {
        message: '인증이 필요합니다.',
      },
    }).as('unauthorizedProfileRequest');

    cy.visit('/profile');

    cy.wait('@unauthorizedProfileRequest');
    cy.location('pathname').should('eq', '/profile');
    cy.contains('내 프로필은 로그인 후 열 수 있어요').should('be.visible');
    cy.contains('로그인하고 프로필을 등록해 스카웃 제안을 받아보세요.').should('be.visible');
    cy.get('[data-cy="login-form"]').should('be.visible');
  });
});

export {};
