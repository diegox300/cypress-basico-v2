/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => cy.visit('../src/index.html'))
   
    it('verifica o título da aplicação', function() {
        cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT')
       
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
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
       .click({ force: true })
       cy.get('[id="phone-checkbox"]')
       .click({ force: true })
       cy.get('[id="open-text-area"]')
       .type(('este teste testeTeste teste teste testeTeste teste teste testeTeste teste teste teste'),{ delay: 0 })
       cy.get('[id="file-upload"]')
       .selectFile('C:/Users/55119/Downloads/469029.jpg')
       cy.get('[type="submit"]')
       .click()
       cy.get('[class="success"]')
       .should('be.visible')
  
    })

  })    