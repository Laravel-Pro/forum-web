describe('Threads', () => {
  it('should see thread list', () => {
    cy.visit('/channel/all');

    cy.get('.thread');
  });

  it('should filter by channel', () => {
    cy.visit('/channel/all');

    cy.get('.thread');

    cy.contains('Vim').click();
    cy.contains('the thread in Idea').should('not.exist');

    cy.contains('Idea').click();
    cy.contains('the thread in Vim').should('not.exist');
  });

  it('should pagination change when click', () => {
    cy.visit('/channel/all');

    cy.get('.thread');

    cy.get('.pagination');

    cy.get('.page-item').contains(2).click();

    cy.get('.page-item').contains(2).parent().should('have.class', 'active');
  });
});
