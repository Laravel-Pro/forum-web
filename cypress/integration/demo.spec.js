describe('The demo test', function() {
  it('Visits the demo page', function() {
    cy.visit('http://localhost:3000')
    cy.contains(/learn react/i)
  })
})
