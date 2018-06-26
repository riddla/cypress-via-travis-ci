beforeEach(() => {
  cy.visit('/');
  // cy.visit('https://pizzatime.now.sh/');
});

const addPizza = id => {
  cy.get(`[data-id="${id}"].add-button`).click();
};

const firstPrintedCode = () => {
  return cy.get('.receipt__discount-code-added').first();
};

it('should handle general discounts', () => {
  addPizza('Margherita');
  addPizza('Margherita');

  cy.get('.receipt__discount-code').type('5PROZENTAUFALLES');
  cy.get('.receipt__add-discount-code').click();

  cy.get('[data-test="totalPrize"]').should('contain', '6,65');
});

it('should remove submitted codes', () => {
  cy.get('.receipt__discount-code').type('5PROZENTAUFALLES');
  cy.get('.receipt__add-discount-code').click();
  cy.get('.receipt__remove-discount-code').click();

  firstPrintedCode().should('not.contain', '5PROZENTAUFALLES');
});

it('should mark existing discount codes positive', () => {
  cy.get('.receipt__discount-code').type('5PROZENTAUFALLES');
  cy.get('.receipt__add-discount-code').click();

  firstPrintedCode().should('have.class', 'text-success');
});

it('should mark non existing discount codes', () => {
  cy.get('.receipt__discount-code').type('DOES_NOT_EXIST');
  cy.get('.receipt__add-discount-code').click();

  firstPrintedCode().should('have.class', 'text-danger');
});

it('should disable input after one code is submitted', () => {
  cy.get('.receipt__discount-code').type('DOES_NOT_EXIST');
  cy.get('.receipt__add-discount-code').click();

  cy.get('.receipt__discount-code').should('have.attr', 'disabled');
});
