/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(() => 
        { 
            cy.visit('../src/index.html')
        }) 
   
    it('verifica o título da aplicação', function() {

        cy.title()
        .should('eq', 'Central de Atendimento ao Cliente TAT')
       
    })

     it('preenche os campos obrigatórios e envia o formulário', function() {
        
       cy.clock()
       cy.get('[id="firstName"]').type('Gervasio')
       cy.get('[id="lastName"]').type('Diego')
       cy.get('[id="email"]').type('Diegox300@gmail.com')
       cy.get('[id="phone"]').type('11 98415 0044')
       cy.get('[id="phone-checkbox"]').click({ force: true })
       cy.get('[id="open-text-area"]').type(('teste testeTeste teste teste'),{ delay: 0 })
       cy.contains('.button','Enviar').click()
       cy.get('[class="success"]').should('be.visible')

       cy.tick(3000)
       cy.get('[class="success"]').should('not.be.visible')
  
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
       cy.clock()
       cy.get('[id="firstName"]').type('Gervasio')
       cy.get('[id="lastName"]').type('Diego')
       cy.get('[id="email"]').type('Diegox300.gmail.com')
       cy.get('[id="open-text-area"]').type('teste teste teste teste teste teste')
       cy.contains('.button','Enviar').click()
       cy.get('[class="error"]').should('be.visible')

       cy.tick(3000)
       cy.get('[class="success"]').should('not.be.visible')

       cy.get('[id="email"]').clear().type('Diegox300@gmail')
       cy.contains('.button','Enviar').click()
       cy.get('[class="error"]').should('be.visible')

       cy.tick(3000)
       cy.get('[class="success"]').should('not.be.visible')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.clock()
        cy.get('[id="firstName"]').type('Gervasio')
        cy.get('[id="lastName"]').type('Diego')
        cy.get('[id="email"]').type('Diegox300.gmail.com')
        cy.get('#phone-checkbox').check()
        cy.contains('.button','Enviar').click()
        cy.get('[class="error"]').should('be.visible')
        
        cy.tick(3000)
        cy.get('[class="success"]').should('not.be.visible')

    })


    it('Valor não numerico no campo telefone, continua vazio o campo', function() {
        cy.get('[id="phone"]').type('diego')
        cy.get('input').should('have.value', '')

    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function() {
      
        cy.get('[id="firstName"]').type('Gervasio').should('have.value', 'Gervasio')
        cy.get('[id="lastName"]').type('Diego').should('have.value', 'Diego')
        cy.get('[id="email"]').type('Diegox300@gmail.com').should('have.value', 'Diegox300@gmail.com')
        cy.get('[id="phone"]').type('11984865456').should('have.value', '11984865456')
        cy.get('[id="firstName"]').clear().should('have.value', '')
        cy.get('[id="lastName"]').clear().should('have.value', '')
        cy.get('[id="email"]').clear().should('have.value', '')
        cy.get('[id="phone"]').clear().should('have.value', '')

    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
      
        cy.clock()
        cy.contains('.button','Enviar').click()
        cy.get('[class="error"]').should('be.visible')

       cy.tick(3000)
       cy.get('[class="success"]').should('not.be.visible')

    })

    it('Seleciona um produto (YouTube) por seu texto', function() {

        cy.get('#product').select('youtube').should('have.value', 'youtube')
   
     })

     it('Seleciona um produto (Mentoria) por seu value', function() {

        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
   
     })

     it('Seleciona um produto (Blog) por seu indice', function() {

        cy.get('#product').select(1).should('have.value', 'blog')
   
     })

     Cypress._.times(5, () => { 
             it('Envia o formuário com sucesso usando um comando customizado', function() {

        cy.fillMandatoryFieldsAndSubmit()
   
     })
    })

     it('Marca o tipo de atendimento Feedback', function() {

        cy.get('input[value="feedback"]').check().should('have.value', 'feedback')
   
     })

     it('Marca cada tipo de atendimento', function() {

        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        
     })

     it('Marca ambos checkboxes, depois desmarca o último', function() {

        cy.get('input[type="checkbox"]').as('checkboxes')
        .check().should('be.checked')
        .last().uncheck().should('not.be.checked')   
   
     })

     it('Seleciona um arquivo da pasta fixtures', function() {

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('Seleciona um arquivo simulando um drag-and-drop', function() {

        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'} )
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })   
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {

        cy.fixture('example.json', { encoding: null } ).as('exampleFile')
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('@exampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })   
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {

        cy.get('#privacy a').should('have.attr', 'target', '_blank')
        
     })

     it('Acessa a página da política de privacidade removendo o target e então clicando no link', function() {

        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.url().should('include', 'privacy.html')
        
     })

     it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function() {
        cy.get('.success').should('not.be.visible').invoke('show').should('be.visible')
        .and('contain', 'Mensagem enviada com sucesso.').invoke('hide').should('not.be.visible')
        cy.get('.error').should('not.be.visible').invoke('show').should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!').invoke('hide').should('not.be.visible')
    })
     
    it('preenche a area de texto usando o comando invoke', function() {
        const longText = Cypress._.repeat('0123456789', 20)
        cy.get('[id="open-text-area"]')
        .invoke('val', longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response) {
            const {status,statusText,body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
            console.log(response)
        })
})

it('Encontra o gato oculto na página.', function() {
    cy.get('[id="cat"]').should('not.be.visible').invoke('show').should('be.visible')

})  

})    