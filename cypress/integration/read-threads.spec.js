describe('Read Threads', () => {
  it('should see thread list', () => {
    cy.visit('/channel/all');

    cy.get('.thread');
  });

  it('should filter by channel', () => {
    cy.visit('/channel/all');

    cy.get('.thread');

    cy.contains('Vim').click();
    cy.contains('the thread in Idea').should('not.exist');
    cy.contains('the thread in Vim').should('exist');

    cy.contains('Idea').click();
    cy.contains('the thread in Vim').should('not.exist');
    cy.contains('the thread in Idea').should('exist');
  });

  it('should pagination change when click', () => {
    cy.visit('/channel/all');

    cy.get('.thread');

    cy.get('.pagination');

    cy.get('.page-item').contains(2).click();

    cy.get('.page-item').contains(2).parent().should('have.class', 'active');
  });

  it('should view thread detail', () => {
    cy.visit('/channel/all');

    cy.contains('the thread in Vim').click();

    cy.contains('the first thread');
  });

  it('should render markdown', () => {
    cy.visit('/thread/1');

    cy.get('h1').contains('the first thread').should('exist');
  });
});
