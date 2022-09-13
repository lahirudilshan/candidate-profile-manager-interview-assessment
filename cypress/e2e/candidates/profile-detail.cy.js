/// <reference types="cypress" />

describe('profile detail page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('view candidate details', () => {
        cy.get('[data-cy="candidate-profile"]').click()
        cy.get('[data-cy="candidate-name"]').should('be.visible')
    })
})
