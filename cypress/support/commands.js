// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.visit('/auth/login');
  cy.get('#loginAs').type('testUser1');
  cy.get('#password').type('password');
  cy.get('button[type=submit]').click();
  cy.get('.navbar').contains('testUser1');
});

Cypress.Commands.add('logout', () => {
  cy.visit('/auth/logout');
  cy.contains('注册');
  cy.contains('登录');
});

//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
