describe('Threads', () => {
  it('should see thread list', () => {
    cy.visit('/channel/all');

    cy.get('.thread');
  });

  it('should filter by channel', () => {
    cy.visit('/channel/all');

    cy.get('.thread');

    cy.get('.thread').each((it) => {
      const channel = it.find('.channel-name').text();
      const title = it.find('.thread-title').text();
      cy.contains(channel).click();
      cy.contains(title);

      cy.contains(channel)
        .parent()
        .siblings()
        .last()
        .click();

      cy.contains(title).should('not.exist');
    });
  });
});
