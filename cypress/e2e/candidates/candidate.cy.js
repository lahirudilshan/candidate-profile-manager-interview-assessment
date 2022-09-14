/// <reference types="cypress" />

describe('candidate test case', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('check at least have once candidate', () => {
        cy.get('.rc-virtual-list-holder-inner').find('[data-cy="candidate-profile"]').should('have.length.at.least', 1);
    })

    it('search candidate failed scenario', () => {
        cy.get('[data-cy="search"]').type('lahirus')
        cy.contains('No candidates found');
    })

    it('search candidate success scenario', () => {
        cy.get('[data-cy="search"]').type('lahiru')
        cy.get('.rc-virtual-list-holder-inner').find('[data-cy="candidate-profile"]').should('have.length.at.least', 1);
    })

    it('view candidate profile', () => {
        cy.get('[data-cy="candidate-profile"]').click();
        cy.get('[data-cy="candidate-name"]').contains('lahiru');
    })
})