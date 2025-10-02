describe('my first test', () => {
    it('open the login page', () => {
        cy.visit('http://localhost:4200')
    })

    it('log in button is visible', ()=>{
        cy.visit('http://localhost:4200')
        cy.contains('Login')
    })

    it('login test profile',() =>{
        cy.visit('http://localhost:4200')

        cy.get('input[formControlName="name"]').type('Uros')
        cy.get('input[formControlName="password"]').type('jovanovic')

        cy.contains('button', 'Login').click()

        cy.url().should('include','/home')
        cy.contains('Name: Uros')
    })

})