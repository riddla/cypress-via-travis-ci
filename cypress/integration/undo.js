beforeEach(() => {
  cy.visit('/');
});

const addPizza = id => {
  cy.get(`[data-id="${id}"].add-button`).click();
};
const removePizza = index => {
  cy.get('.cart__remove-button')
    .eq(index)
    .click();
};

it('should undo adding a product to the cart', () => {
  addPizza('Margherita');
  cy.get('#undo').click();
  cy.get('.cart__item').should('have.length', 0);
});

it('should undo removing a product to the cart', () => {
  addPizza('Margherita');
  removePizza(0);
  cy.wait(300); // animation
  cy.get('#undo').click();
  cy.get('.cart__item').should('have.length', 1);
});
