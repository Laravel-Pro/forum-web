describe('Login', () => {

  it('non username or password will get error', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.get('button[type=submit]').click();
    cy.contains('请输入用户名');
  });

  it('a user can login by username and password', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.get('#loginAs').type('testUser1');
    cy.get('#password').type('password');
    cy.contains('提交').click();
    cy.get('[data-test=profile]').contains('testUser1');
  });

  it('invalid credentials will get error', () => {
    cy.visit('http://localhost:3000/auth/login');
    cy.get('#loginAs').type('testUser1');
    cy.get('#password').type('password1');
    cy.contains('提交').click();
    cy.contains('登录凭证无效');
  });
});
