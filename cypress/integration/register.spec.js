const testUsername = `e2e_test_user_${(new Date()).getTime().toString().substr(4, 9)}`;

describe('Register new user', () => {
  beforeEach(() => {
    cy.visit('/auth/register');
  });

  it('Visit register page', () => {
    cy.contains('用户名');
    cy.contains('邮箱');
    cy.contains('密码');
    cy.contains('确认密码');
  });

  it('should validate form input', () => {
    cy.get('button[type=submit]').click();

    cy.contains('请输入用户名');
    cy.contains('请输入邮箱');
    cy.contains('请输入密码');
    cy.contains('请确认密码');

    cy.get('#password').type('password');
    cy.get('#confirm_password').type('password2');

    cy.contains('请输入密码').should('not.exist');
    cy.contains('两次密码输入不同');
  });

  it('should register success', () => {
    cy.get('#username').type(testUsername);
    cy.get('#email').type(`${testUsername}@laravel.pro`);
    cy.get('#password').type('password');
    cy.get('#confirm_password').type('password');
    cy.contains('提交').click();
    cy.get('[data-test=profile]').contains(testUsername);
  });

  it('should register fail when username and email exists', () => {
    cy.get('#username').type(testUsername);
    cy.get('#email').type(`${testUsername}@laravel.pro`);
    cy.get('#password').type('password2');
    cy.get('#confirm_password').type('password2');
    cy.contains('提交').click();
    cy.contains('用户名已被使用');
    cy.contains('邮箱已被使用');
  });
});
