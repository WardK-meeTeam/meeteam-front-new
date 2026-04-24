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

const MY_PROFILE = {
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
  projectCount: 1,
  introduce: '안녕하세요. 프론트엔드 개발자입니다.',
  profileImageUrl: null,
  profileImageName: null,
  projectCards: [
    {
      projectId: 301,
      projectName: 'meeTeam 프론트 개편',
      categoryName: 'AI/테크',
      imageUrl: null,
      creatorName: '이리더',
      creatorImageUrl: null,
      currentCount: 3,
      recruitmentCount: 5,
    },
  ],
};

const UPDATED_PROFILE = {
  ...MY_PROFILE,
  githubUrl: 'https://github.com/meeteam-updated',
  blogUrl: 'https://velog.io/@meeteam',
  groupedSkills: [
    {
      jobFieldName: '백엔드',
      jobPositionName: 'Node.js',
      techStacks: ['Node.js', 'PostgreSQL'],
    },
  ],
  skills: ['Node.js', 'PostgreSQL'],
  isParticipating: false,
  introduce: 'Node.js와 PostgreSQL 기반으로 서비스를 운영해왔습니다.',
  representativePosition: 'Node.js',
  representativePositionEn: 'Node.js',
};

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
  participatedProjectCount: 1,
  profileImageUrl: null,
  participatedProjects: [
    {
      projectId: 401,
      projectName: '디자인 시스템 구축',
      categoryName: 'AI/테크',
      imageUrl: null,
      creatorName: '오너',
      creatorImageUrl: null,
      currentCount: 4,
      recruitmentCount: 6,
    },
  ],
  groupedSkills: [
    {
      jobFieldName: '프론트엔드',
      jobPositionName: '웹 프론트엔드',
      techStacks: ['Next.js', 'React Query'],
    },
  ],
};

const TEAMMATES = [
  {
    memberId: 14,
    name: '권나은',
    jobFieldName: '프론트',
    projectExperienceCount: 8,
    techStacks: [
      { id: 1, name: 'React Query', displayOrder: 1 },
      { id: 2, name: 'Next.js', displayOrder: 2 },
    ],
    profileImageUrl: null,
  },
];

const EDITABLE_JOB_OPTIONS = {
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

const INVALID_JOB_OPTIONS = {
  fields: [
    ...EDITABLE_JOB_OPTIONS.fields,
    {
      code: 'MARKETING',
      name: '마케팅',
      positions: [],
      techStacks: [],
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
}

function visitAuthenticatedProfile(path = '/profile') {
  cy.visit(path, {
    onBeforeLoad(window) {
      seedAuthSession(window);
    },
  });
}

describe('프로필 흐름', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
  });

  it('내 프로필을 조회하고 기본 정보와 참여 프로젝트를 보여준다', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('GET', '**/api/members', {
      statusCode: 200,
      body: {
        result: MY_PROFILE,
      },
    }).as('myProfileRequest');

    cy.intercept('GET', '**/api/v1/jobs/options', {
      statusCode: 200,
      body: {
        result: EDITABLE_JOB_OPTIONS,
      },
    }).as('jobOptionsRequest');

    visitAuthenticatedProfile();

    cy.wait('@unreadNotificationCountRequest');
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');

    cy.contains('홍길동').should('be.visible');
    cy.contains('Frontend Dev').should('be.visible');
    cy.contains('활동 및 링크').should('be.visible');
    cy.contains('안녕하세요. 프론트엔드 개발자입니다.').should('be.visible');
    cy.get('[data-cy="profile-joined-project"]').should('have.attr', 'href', '/projects/301');
    cy.contains('meeTeam 프론트 개편').should('be.visible');
    cy.get('[data-cy="profile-action-button"]').should('contain', '프로필 수정');
  });

  it('프로필 수정 시 링크, 자기소개, 기술 스택, 참여 여부를 변경하고 저장한다', () => {
    installAuthenticatedShellIntercepts();
    let profileFetchCount = 0;
    cy.intercept('GET', '**/api/members', (request) => {
      profileFetchCount += 1;

      request.reply({
        statusCode: 200,
        body: {
          result: profileFetchCount > 1 ? UPDATED_PROFILE : MY_PROFILE,
        },
      });
    }).as('myProfileRequest');

    cy.intercept('GET', '**/api/v1/jobs/options', {
      statusCode: 200,
      body: {
        result: EDITABLE_JOB_OPTIONS,
      },
    }).as('jobOptionsRequest');

    cy.intercept('PUT', '**/api/members', {
      statusCode: 200,
      body: {
        result: {
          memberId: 42,
          name: '홍길동',
          message: '프로필이 저장되었습니다.',
          profileImageUrl: null,
        },
      },
    }).as('updateProfileRequest');

    visitAuthenticatedProfile();
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="profile-action-button"]').click();
    cy.get('[data-cy="profile-field-category"]').click();
    cy.contains('li', '백엔드').click();
    cy.get('[data-cy="profile-field-role"]').click();
    cy.contains('li', 'Node.js').click();
    cy.get('[data-cy="profile-participation-toggle"]').click();
    cy.get('[data-cy="profile-github-input"]').clear();
    cy.get('[data-cy="profile-github-input"]').type('github.com/meeteam-updated');
    cy.get('[data-cy="profile-blog-input"]').clear();
    cy.get('[data-cy="profile-blog-input"]').type('https://velog.io/@meeteam');
    cy.get('[data-cy="profile-introduction-input"]').clear();
    cy.get('[data-cy="profile-introduction-input"]').type(
      'Node.js와 PostgreSQL 기반으로 서비스를 운영해왔습니다.',
    );
    cy.get('[data-cy="profile-skills-input-0"]').type('Node.js{enter}');
    cy.get('[data-cy="profile-skills-input-0"]').type('PostgreSQL{enter}');
    cy.contains('button', '저장하기').click();

    cy.wait('@updateProfileRequest');
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('body').should('contain', 'Node.js');
    cy.get('body').should('contain', 'PostgreSQL');
    cy.contains('Node.js와 PostgreSQL 기반으로 서비스를 운영해왔습니다.').should('be.visible');
    cy.contains('https://velog.io/@meeteam').should('be.visible');
    cy.get('[data-cy="profile-action-button"]').should('contain', '프로필 수정');
  });

  it('유효하지 않은 직군 상태에서는 저장하지 않고 에러를 보여준다', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('GET', '**/api/members', {
      statusCode: 200,
      body: {
        result: MY_PROFILE,
      },
    }).as('myProfileRequest');

    cy.intercept('GET', '**/api/v1/jobs/options', {
      statusCode: 200,
      body: {
        result: INVALID_JOB_OPTIONS,
      },
    }).as('jobOptionsRequest');

    let updateCount = 0;
    cy.intercept('PUT', '**/api/members', () => {
      updateCount += 1;
    }).as('updateProfileRequest');

    visitAuthenticatedProfile();
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="profile-action-button"]').click();
    cy.get('[data-cy="profile-field-category"]').click();
    cy.contains('li', '마케팅').click();
    cy.contains('button', '저장하기').click();

    cy.contains('선택한 직군 정보를 확인할 수 없습니다.').should('be.visible');
    cy.then(() => {
      expect(updateCount).to.equal(0);
    });
    cy.contains('button', '저장하기').should('be.visible');
  });

  it('프로필 저장이 실패해도 수정 상태를 유지하고 다음 시도로 복구할 수 있다', () => {
    installAuthenticatedShellIntercepts();
    cy.intercept('GET', '**/api/members', {
      statusCode: 200,
      body: {
        result: MY_PROFILE,
      },
    }).as('myProfileRequest');

    cy.intercept('GET', '**/api/v1/jobs/options', {
      statusCode: 200,
      body: {
        result: EDITABLE_JOB_OPTIONS,
      },
    }).as('jobOptionsRequest');

    let saveAttempt = 0;
    cy.intercept('PUT', '**/api/members', (request) => {
      saveAttempt += 1;

      if (saveAttempt === 1) {
        request.reply({
          statusCode: 500,
          body: {
            message: '프로필 저장에 실패했습니다.',
          },
        });
        return;
      }

      request.reply({
        statusCode: 200,
        body: {
          result: {
            memberId: 42,
            name: '홍길동',
            message: '프로필이 저장되었습니다.',
            profileImageUrl: null,
          },
        },
      });
    }).as('updateProfileRequest');

    visitAuthenticatedProfile();
    cy.wait('@myProfileRequest');
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="profile-action-button"]').click();
    cy.get('[data-cy="profile-introduction-input"]').clear();
    cy.get('[data-cy="profile-introduction-input"]').type('실패 후 재시도 소개글');
    cy.contains('button', '저장하기').click();

    cy.wait('@updateProfileRequest');
    cy.contains('프로필 저장에 실패했습니다.').should('be.visible');
    cy.get('[data-cy="profile-introduction-input"]').should('have.value', '실패 후 재시도 소개글');
    cy.contains('button', '저장하기').should('be.visible');

    cy.intercept('GET', '**/api/members', {
      statusCode: 200,
      body: {
        result: {
          ...MY_PROFILE,
          introduce: '실패 후 재시도 소개글',
        },
      },
    }).as('recoveredProfileRequest');

    cy.contains('button', '저장하기').click();
    cy.wait('@updateProfileRequest');
    cy.wait('@recoveredProfileRequest');
    cy.contains('실패 후 재시도 소개글').should('be.visible');
    cy.get('[data-cy="profile-action-button"]').should('contain', '프로필 수정');
  });

  it('팀원 목록에서 다른 유저 프로필 상세로 진입한다', () => {
    cy.intercept('GET', '**/api/v1/members/search*', {
      statusCode: 200,
      body: {
        result: {
          content: TEAMMATES,
          last: true,
          number: 0,
          size: 100,
          empty: false,
        },
      },
    }).as('teammatesRequest');

    cy.intercept('GET', '**/api/v1/members/14', {
      statusCode: 200,
      body: {
        result: OTHER_MEMBER_PROFILE,
      },
    }).as('memberProfileRequest');

    cy.visit('/teammates');
    cy.wait('@teammatesRequest');

    cy.get('[data-cy="teammate-card"]').first().click();
    cy.wait('@memberProfileRequest');

    cy.location('pathname').should('eq', '/profile/14');
    cy.contains('권나은').should('be.visible');
    cy.contains('제품 감도가 높은 프론트엔드 개발자입니다.').should('be.visible');
    cy.get('[data-cy="profile-action-button"]').should('not.exist');
    cy.get('[data-cy="profile-joined-project"]').should('have.attr', 'href', '/projects/401');
  });
});

export {};
