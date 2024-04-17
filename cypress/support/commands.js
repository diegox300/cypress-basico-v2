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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
       Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => { 
      cy.clock()
        cy.get('[id="firstName"]')
       .type('Gervasio')
       cy.get('[id="lastName"]')
       .type('Diego')
       cy.get('[id="email"]')
       .type('Diegox300@gmail.com')
       cy.get('[id="phone"]')
       .type('11 98415 0044')
       cy.get('[id="product"]')
       .select('cursos')
       cy.get('[value="elogio"]')
       .check()
       cy.get('[id="phone-checkbox"]')
       .click({ force: true })
       cy.get('[id="open-text-area"]')
       .type(('este teste teste Teste teste teste testeTeste teste teste teste'),{ delay: 0 })
       cy.get('[id="file-upload"]')
       .selectFile('cypress/fixtures/example.json')
       cy.contains('.button','Enviar')
       .click()
       cy.get('[class="success"]')
       .should('be.visible')

       cy.tick(3000)
       cy.get('[class="success"]')
       .should('not.be.visible')
    });