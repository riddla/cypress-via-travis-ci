beforeEach(() => {
  cy.visit('/');
  // cy.visit('https://pizzatime.now.sh/');
});

const addPizza = id => {
  cy.get(`[data-id="${id}"].add-button`).click();
};

it('should handle promotions for several pizzas', () => {
  addPizza('Margherita');
  addPizza('Margherita');
  addPizza('Margherita');

  cy.get('.receipt__promotion-code').type('DREIKLEINEMARGHERITAFUERZWEI');
  cy.get('.receipt__add-promotion-code').click();

  cy.get('[data-test="totalPrize"]').should('contain', '7,00');
});

it('should apply discount codes twice', () => {
  addPizza('Salami');
  addPizza('Salami');
  addPizza('Salami');
  addPizza('Salami');

  cy.get('.receipt__promotion-code').type('ZWEIKLEINESALAMIFUEREINS');
  cy.get('.receipt__add-promotion-code').click();

  cy.get('[data-test="totalPrize"]').should('contain', '8,40');
});
