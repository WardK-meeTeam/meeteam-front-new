describe('login flow', () => {
  it('stores the authenticated session and redirects to the home page', () => {
    cy.intercept('POST', 'http://localhost:8080/api/v1/auth/login', {
      statusCode: 200,
      headers: {
        Authorization: 'Bearer test-access-token',
      },
      body: {
        result: {
          name: '홍길동',
          memberId: 42,
        },
      },
    }).as('loginRequest');

    cy.visit('/auth/login');

    cy.get('[data-cy="login-email"]').type('hello@example.com');
    cy.get('[data-cy="login-password"]').type('password123');
    cy.get('[data-cy="login-submit"]').click();

    cy.wait('@loginRequest')
      .its('request.body')
      .should('deep.equal', { email: 'hello@example.com', password: 'password123' });

    cy.location('pathname').should('eq', '/');
    cy.contains('아이디어가 현실이 되는 곳').should('be.visible');

    cy.window().then((window) => {
      const storedSession = window.localStorage.getItem('meeteam-auth-storage');

      expect(storedSession).to.not.equal(null);
      expect(JSON.parse(storedSession ?? '{}')).to.deep.include({
        state: {
          accessToken: 'test-access-token',
          memberId: 42,
          name: '홍길동',
          isAuthenticated: true,
        },
      });
    });
  });
});
