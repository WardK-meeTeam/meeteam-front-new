const SIGNUP_PATH = '/auth/sign-up';

const JOB_FIELDS = [
  {
    code: 'BACKEND',
    name: '백엔드',
    positions: [
      {
        id: 11,
        code: 'JAVA_SPRING',
        name: 'Java/Spring',
      },
    ],
    techStacks: [
      {
        id: 1,
        name: 'Java',
      },
      {
        id: 2,
        name: 'Spring Boot',
      },
    ],
  },
  {
    code: 'FRONTEND',
    name: '프론트엔드',
    positions: [
      {
        id: 21,
        code: 'WEB_FRONTEND',
        name: '웹 프론트엔드',
      },
    ],
    techStacks: [
      {
        id: 10,
        name: 'React',
      },
      {
        id: 11,
        name: 'TypeScript',
      },
    ],
  },
];

function installJobOptionsIntercept() {
  cy.intercept('GET', '**/api/v1/jobs/options', {
    statusCode: 200,
    body: {
      result: {
        fields: JOB_FIELDS,
      },
    },
  }).as('jobOptionsRequest');
}

function fillRequiredSignupFields() {
  cy.get('[data-cy="signup-email"]').type('hello@example.com');
  cy.get('[data-cy="signup-email-check"]').click();
  cy.wait('@emailDuplicateRequest')
    .its('request.url')
    .should('include', 'email=hello%40example.com');
  cy.contains('사용 가능한 이메일입니다.').should('be.visible');

  cy.get('[data-cy="signup-password"]').type('password123');
  cy.get('[data-cy="signup-password-confirm"]').type('password123');

  cy.get('[data-cy="signup-name"]').type('홍길동');
  cy.get('[data-cy="signup-birth"]').type('1998-03-15');
  cy.get('[data-cy="signup-gender-female"]').check({ force: true });

  cy.contains('label', '분야').should('be.visible');
  cy.get('[data-cy="signup-interest-add"]').should('not.exist');
  cy.get('[data-cy="signup-interest-major-0"]').click();
  cy.contains('li', '백엔드').click();
  cy.get('[data-cy="signup-interest-minor-0"]').click();
  cy.contains('li', 'Java/Spring').click();

  cy.contains('label', '기술 스택').should('be.visible');
  cy.get('[data-cy="signup-tech-interest"]').should('not.exist');
  cy.get('[data-cy="signup-tech-input"]').type('React{enter}');
  cy.get('[data-cy="signup-tech-selected"]').should('contain', 'React');

  cy.get('[data-cy="signup-github-url"]').type('github.com/wardk');
  cy.get('[data-cy="signup-blog-url"]').type('https://blog.example.com');
}

describe('회원가입 흐름', () => {
  beforeEach(() => {
    installJobOptionsIntercept();
  });

  it('회원가입에 성공하면 로그인 페이지로 이동한다', () => {
    cy.intercept('POST', '**/api/v1/auth/email*', {
      statusCode: 200,
      body: {
        result: {
          exists: false,
          message: '사용 가능한 이메일입니다.',
        },
      },
    }).as('emailDuplicateRequest');

    cy.intercept('POST', '**/api/v1/auth/register', {
      statusCode: 200,
      body: {
        result: {
          memberId: 1,
          username: '홍길동',
        },
      },
    }).as('registerRequest');

    cy.visit(SIGNUP_PATH);
    cy.wait('@jobOptionsRequest');

    fillRequiredSignupFields();
    cy.get('[data-cy="signup-submit"]').click();

    cy.wait('@registerRequest');
    cy.location('pathname').should('eq', '/auth/login');
  });

  it('필수 입력값이 비어 있으면 유효성 에러를 보여준다', () => {
    cy.visit(SIGNUP_PATH);
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="signup-form"]').submit();

    cy.contains('올바른 이메일 형식을 입력해 주세요.').should('be.visible');
    cy.contains('비밀번호는 8자 이상이어야 합니다.').should('be.visible');
    cy.contains('이름을 입력해 주세요.').should('be.visible');
    cy.contains('생년월일을 선택해 주세요.').should('be.visible');
    cy.contains('분야를 선택해 주세요.').should('be.visible');
    cy.contains('이메일 중복 확인을 완료해 주세요.').should('be.visible');
  });

  it('회원가입 화면에 모든 입력 섹션을 처음부터 보여준다', () => {
    cy.visit(SIGNUP_PATH);
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="signup-email"]').should('be.visible');
    cy.get('[data-cy="signup-name"]').should('be.visible');
    cy.contains('label', '분야').should('be.visible');
    cy.contains('label', '기술 스택').should('be.visible');
    cy.contains('프로젝트 경험 횟수').should('not.exist');
    cy.get('[data-cy="signup-submit"]').should('be.visible');

    cy.get('[data-cy="signup-interest-major-0"]').click();
    cy.contains('li', '백엔드').click();
    cy.get('[data-cy="signup-interest-minor-0"]').click();
    cy.contains('li', 'Java/Spring').click();

    cy.get('[data-cy="signup-tech-interest"]').should('not.exist');
    cy.get('[data-cy="signup-tech-input"]').type('React{enter}');

    cy.get('[data-cy="signup-tech-selected"]').should('contain', 'React');
  });

  it('중복된 이메일이면 중복 안내 메시지를 보여준다', () => {
    cy.intercept('POST', '**/api/v1/auth/email*', {
      statusCode: 200,
      body: {
        result: {
          exists: true,
          message: '이미 사용 중인 이메일입니다.',
        },
      },
    }).as('emailDuplicateRequest');

    cy.visit(SIGNUP_PATH);
    cy.wait('@jobOptionsRequest');

    cy.get('[data-cy="signup-email"]').type('taken@example.com');
    cy.get('[data-cy="signup-email-check"]').click();

    cy.wait('@emailDuplicateRequest')
      .its('request.url')
      .should('include', 'email=taken%40example.com');
    cy.contains('이미 사용 중인 이메일입니다.').should('be.visible');
  });

  it('회원가입 요청이 실패하면 에러 메시지를 보여주고 현재 페이지에 머문다', () => {
    cy.intercept('POST', '**/api/v1/auth/email*', {
      statusCode: 200,
      body: {
        result: {
          exists: false,
          message: '사용 가능한 이메일입니다.',
        },
      },
    }).as('emailDuplicateRequest');

    cy.intercept('POST', '**/api/v1/auth/register', {
      statusCode: 400,
      body: {
        message: '회원가입에 실패했습니다.',
      },
    }).as('failedRegisterRequest');

    cy.visit(SIGNUP_PATH);
    cy.wait('@jobOptionsRequest');

    fillRequiredSignupFields();
    cy.get('[data-cy="signup-submit"]').click();

    cy.wait('@failedRegisterRequest');
    cy.location('pathname').should('eq', '/auth/sign-up');
    cy.contains('회원가입에 실패했습니다.').should('be.visible');
  });
});
