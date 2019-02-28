describe('Add Account Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    });

    it('Integration Accounts page has Add Acount button', () => {
        cy.get('[data-test="modal-button-Add Account"]').contains('Add Account');
    });

    it('Clicking on Add Account will pop up a modal', () => {
        cy.get('[data-test="modal-button-Add Account"]').click();
        cy.get('.spectrum-Dialog').should('be.visible');
        cy.get('.spectrum-Dialog').contains('Add Account');
        cy.get('.spectrum-Button--secondary').contains('Cancel');
        cy.get('.spectrum-Button--cta').contains('Confirm');
        cy.get('.spectrum-Button--cta').should('be.disabled');
        cy.get('[data-test="dropdown-Add Account"]').click();
        cy.get('#react-spectrum-24-menu > :nth-child(3)').click();
        cy.get('.spectrum-Button--cta').should('not.be.disabled');
        cy.get('.spectrum-Button--cta').click();
        cy.get('.react-spectrum-Dialog-buttons > .spectrum-Button').contains('Close');
        cy.get('.react-spectrum-Dialog-buttons > .spectrum-Button').click();
        cy.get('.spectrum-Dialog').should('not.be.visible');
    });
});

//TODO: need to stub out the get request for integrated accounts page by using authentications.json
describe('Reactivate Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    });
    it('Integration Accounts page has Reactivate button', () => {
        cy.get('[data-test=modal-button-Reactivate]').as('Reactivate');
    });

    it('Clicking on Reactivate will pop up a modal', () => {
        cy.get('[data-test=modal-button-Reactivate]').click();
        cy.get('.spectrum-Dialog').should('be.visible');
        cy.get('#react-spectrum-23').should('be.disabled');
        cy.get('.spectrum-Button--secondary').contains('Cancel');
        cy.get('.spectrum-Button--cta').contains('Confirm');
        cy.get('.spectrum-Button--secondary').click();
        cy.get('.spectrum-Dialog').should('not.be.visible');
    });
});

describe('Add Contact Modal Tests', () => {
    beforeEach(() => {
        cy.seedAndLoadIntegratedAccountsPage();
    });
    it('Integration Accounts page has Add Contact button', () => {
        cy.get('[data-test=modal-button-edit]').eq(0).should('be.visible');
    });

    it('Clicking on Add Contact button will pop up a modal', () => {
        cy.get('[data-test=modal-button-edit]').eq(0).click();
        cy.get('.spectrum-Dialog').should('be.visible');
        cy.get('.spectrum-Button--cta').should('be.disabled');
        cy.get('.spectrum-Button--cta').contains('Save');
        cy.get('.spectrum-Button--secondary').contains('Close');
        cy.get('[data-test="textfield-Add Contacts"]').type('adobe@adobe.com');
        cy.get('.spectrum-Button--cta').should('not.be.disabled');
        cy.get('.spectrum-Button--cta').click();
        cy.get('.spectrum-Dialog').should('not.be.visible');
    });
});
