describe('Add Account Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    })

    it('Integration Accounts page has Add Acount button', () => {
        cy.get(':nth-child(2) > [data-test=add-account-modal-button]')
          .contains('Add Account')
    })

    it('Clicking on Add Account will pop up a modal', () => {
        cy.get(':nth-child(2) > [data-test=add-account-modal-button]').click();
        cy.get('.spectrum-Dialog').should('have.length', 1);
        cy.get('.spectrum-Dialog').contains('Add Account');
        cy.get('.spectrum-Button--secondary').contains('Cancel');
        cy.get('.spectrum-Button--cta').contains('Confirm');
        cy.get('.spectrum-Button--cta').should('be.disabled');
        cy.get('#react-spectrum-23').click();
        cy.get('#react-spectrum-24-menu > :nth-child(3)').click();
        cy.get('.spectrum-Button--cta').click();
        cy.get('.spectrum-Button--cta').should('not.be.disabled');
        cy.get('.react-spectrum-Dialog-buttons > .spectrum-Button').contains('Close');
        cy.get('.react-spectrum-Dialog-buttons > .spectrum-Button').click();
        cy.get('.spectrum-Dialog').should('have.length', 0);
    })
})

//TODO: need to stub out the get request for integrated accounts page by using authentications.json
describe('Reactivate Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    })
    it('Integration Accounts page has Reactivate button', () => {
        cy.get('#react-spectrum-9-5 >  > [data-test=add-account-modal-button]').as('Reactivate')
    })

    it('Clicking on Reactivate will pop up a modal', () => {
        cy.get('#react-spectrum-9-5 >  > [data-test=add-account-modal-button]').click();
        cy.get('.spectrum-Dialog').should('have.length', 1);
        cy.get('#react-spectrum-23').should('be.disabled');
        cy.get('.spectrum-Button--secondary').contains('Cancel');
        cy.get('.spectrum-Button--cta').contains('Confirm');
        cy.get('.spectrum-Button--secondary').click();
        cy.get('.spectrum-Dialog').should('have.length', 0);
    })
})

describe('Add Contact Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    })
    it('Integration Accounts page has Add Contact button', () => {
        cy.get('#react-spectrum-9-3 > ._27wJwuERo2LdjjC4KC73YX > [data-test=add-account-modal-button]').should('have.length', 1);
    })

    it('Clicking on Add Contact button will pop up a modal', () => {
        cy.get('#react-spectrum-9-3 > ._27wJwuERo2LdjjC4KC73YX > [data-test=add-account-modal-button]').click();
        cy.get('.spectrum-Dialog').should('have.length', 1);
        cy.get('.spectrum-Button--cta').should('be.disabled');
        cy.get('.spectrum-Button--cta').contains('Save');
        cy.get('.spectrum-Button--secondary').contains('Close');
        cy.get('.spectrum-Textfield').type('adobe@adobe.com');
        cy.get('.spectrum-Button--cta').should('not.be.disabled');
        cy.get('.spectrum-Button--cta').click();
        cy.get('.spectrum-Dialog').should('have.length', 0);
    })
})

