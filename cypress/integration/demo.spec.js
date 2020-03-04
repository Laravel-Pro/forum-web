describe('The demo test', () => {
  it('Visits the demo page', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/Laravel Pro/i);
  });
});

describe('The channels test', () => {
  it('Visits the Home page', () => {
    cy.visit('http://localhost:3000');
    cy.contains(/vim/i);
    cy.contains('技术');
  });
});
