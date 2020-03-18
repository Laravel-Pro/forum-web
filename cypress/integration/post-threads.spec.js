describe('Post Thread', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('larapro_session', 'remember_token');
  });

  it('authorized user should see post new thread button', () => {
    cy.visit('/channel/all');

    cy.contains('发 帖')
      .click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.eq('/thread/new');
    });
  });

  it('should validate form input', () => {
    cy.visit('/thread/new');

    cy.get('button[type=submit]').click();

    cy.get('form').contains('请选择频道').should('exist');
    cy.get('form').contains('请输入标题').should('exist');
    cy.get('form').contains('请输入正文').should('exist');
  });

  it('authorized user could post new thread', () => {
    cy.visit('/thread/new');

    cy.contains('选择频道').click();
    cy.contains('Vim').click();
    cy.contains('Vim').should('be.visible');

    cy.get('#title').type('这是一个发帖测试');
    cy.get('#body').type('# 这是发帖测试的正文');
    cy.get('button[type=submit]').click();

    cy.location().should((loc) => {
      expect(loc.pathname).to.match(/^\/thread\/\d+/);
    });

    cy.get('h1').contains('这是发帖测试的正文').should('exist');
  });
});
