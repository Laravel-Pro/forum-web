describe('Reply', () => {
  before(() => {
    cy.login();
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('larapro_session', 'remember_token');
  });

  it('an authenticated user can see reply form', () => {
    cy.visit('/thread/1');

    cy.get('button[type=submit]').contains('评 论').should('exist');
  });

  it('should validate reply body', () => {
    cy.visit('/thread/1');

    cy.get('button[type=submit]').click();

    cy.get('.reply-list').contains('请输入评论内容').should('exist');
  });

  it('an authenticated user may reply a thread ', () => {
    cy.visit('/thread/1');

    cy.get('h1').contains('the first thread');

    cy.get('textarea#body').type('这是一条测试评论');
    cy.get('button[type=submit]').click();

    cy.get('.reply-list').should('contain.text', '这是一条测试评论');
  });
});
