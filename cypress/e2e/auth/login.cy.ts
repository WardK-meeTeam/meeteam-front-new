describe('로그인 흐름', () => {
  it('로그인에 성공하면 인증 세션을 저장하고 홈으로 이동한다', () => {
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 200,
      body: {
        data: {
          isNewMember: false,
          code: null,
        },
      },
    }).as('loginRequest');

    cy.intercept('GET', '**/api/v1/members/me', {
      statusCode: 200,
      body: {
        result: {
          memberId: 42,
          name: '홍길동',
          birthDate: '1998-03-15',
          gender: 'MALE',
          email: 'hello@example.com',
          githubUrl: null,
          blogUrl: null,
          projectExperienceCount: 3,
          representativePosition: '백엔드',
          representativePositionEn: 'Backend',
          skills: ['Spring Boot', 'MySQL'],
          isParticipating: true,
          projectCount: 2,
          introduce: '안녕하세요.',
          profileImageUrl: null,
          profileImageName: null,
          projectCards: [],
        },
      },
    }).as('myProfileRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest')
      .its('request.body')
      .should('deep.equal', { studentId: '21013220', password: 'password123' });

    cy.wait('@myProfileRequest');
    cy.location('pathname').should('eq', '/');
    cy.contains('대학생 전용 팀빌딩 플랫폼').should('be.visible');

    cy.window().then((window) => {
      const storedSession = window.localStorage.getItem('meeteam-auth-storage');

      expect(storedSession).to.not.equal(null);
      expect(JSON.parse(storedSession ?? '{}')).to.deep.include({
        state: {
          memberId: 42,
          name: '홍길동',
          email: 'hello@example.com',
          isAuthenticated: true,
        },
      });
    });
  });

  it('필수 입력값이 비어 있으면 유효성 에러를 보여준다', () => {
    cy.visit('/auth/login');

    cy.get('[data-cy="login-submit"]').should('be.disabled');
    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-submit"]').should('be.disabled');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').should('be.disabled');
  });

  it('학번에 숫자가 아닌 값이 들어가면 요청을 보내지 않고 유효성 에러를 보여준다', () => {
    let loginRequestCount = 0;

    cy.intercept('POST', '**/api/v1/auth/login/sejong', () => {
      loginRequestCount += 1;
    }).as('invalidStudentIdLoginRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('abc123');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.contains('학번은 숫자만 입력해 주세요.').should('be.visible');
    cy.then(() => {
      expect(loginRequestCount).to.equal(0);
    });
  });

  it('자격 증명이 올바르지 않으면 백엔드 에러 메시지를 보여준다', () => {
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 401,
      body: {
        code: 'SEJONG401',
        message: '학번 또는 비밀번호가 일치하지 않습니다.',
      },
    }).as('failedLoginRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('wrong-password');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@failedLoginRequest');
    cy.location('pathname').should('eq', '/auth/login');
    cy.contains('학번 또는 비밀번호가 일치하지 않습니다.').should('be.visible');
  });

  it('로그인 요청이 네트워크 수준에서 실패하면 기본 에러 메시지를 보여준다', () => {
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      forceNetworkError: true,
    }).as('networkFailedLoginRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@networkFailedLoginRequest');
    cy.contains('로그인 처리 중 오류가 발생했습니다.').should('be.visible');
  });

  it('로그인 응답 형식이 올바르지 않으면 파싱 에러를 보여준다', () => {
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 200,
      body: {},
    }).as('invalidLoginResponseRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@invalidLoginResponseRequest');
    cy.contains('응답 형식을 해석할 수 없습니다.').should('be.visible');
    cy.location('pathname').should('eq', '/auth/login');
  });

  it('로그인 실패 후 다시 시도하면 다음 성공 요청으로 정상 복구된다', () => {
    let loginAttempt = 0;

    cy.intercept('POST', '**/api/v1/auth/login/sejong', (request) => {
      loginAttempt += 1;

      if (loginAttempt === 1) {
        request.reply({
          statusCode: 401,
          body: {
            message: '학번 또는 비밀번호가 일치하지 않습니다.',
          },
        });
        return;
      }

      request.reply({
        statusCode: 200,
        body: {
          result: {
            isNewMember: false,
            code: null,
          },
        },
      });
    }).as('loginAttemptRequest');

    cy.intercept('GET', '**/api/v1/members/me', {
      statusCode: 200,
      body: {
        result: {
          memberId: 42,
          name: '홍길동',
          birthDate: '1998-03-15',
          gender: 'MALE',
          email: 'hello@example.com',
          githubUrl: null,
          blogUrl: null,
          projectExperienceCount: 3,
          representativePosition: '백엔드',
          representativePositionEn: 'Backend',
          skills: ['Spring Boot', 'MySQL'],
          isParticipating: true,
          projectCount: 2,
          introduce: '안녕하세요.',
          profileImageUrl: null,
          profileImageName: null,
          projectCards: [],
        },
      },
    }).as('retryMyProfileRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('wrong-password');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginAttemptRequest');
    cy.contains('학번 또는 비밀번호가 일치하지 않습니다.').should('be.visible');

    cy.get('[data-cy="login-password"]').clear().type('password123');
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginAttemptRequest');
    cy.wait('@retryMyProfileRequest');
    cy.contains('학번 또는 비밀번호가 일치하지 않습니다.').should('not.exist');
    cy.location('pathname').should('eq', '/');
  });

  it('신규 회원이면 세종대 온보딩 페이지로 이동하고 인증 코드를 저장한다', () => {
    cy.intercept('POST', '**/api/v1/auth/login/sejong', {
      statusCode: 200,
      body: {
        data: {
          isNewMember: true,
          code: 'temp-code',
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

    cy.window().then((window) => {
      expect(window.sessionStorage.getItem('meeteam-sejong-onboarding-code')).to.equal('temp-code');
    });
  });

  it('동의 체크 전에는 로그인 버튼이 비활성화된다', () => {
    cy.visit('/auth/login');

    cy.get('[data-cy="login-student-id"]').type('21013220');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').should('be.disabled');
    cy.get('[data-cy="login-consent"]').check({ force: true });
    cy.get('[data-cy="login-submit"]').should('not.be.disabled');
  });
});
