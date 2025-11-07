const CheckoutPage = require('../../pages/CheckoutPage');

describe('Debug - CheckoutPage', () => {
  before(() => {
    cy.visit('/produtos');
    cy.wait(2000);
    cy.get('.product').first().click();
    cy.wait(1000);
    
    cy.get('body').then(($body) => {
      if ($body.find('#pa_size').length > 0) {
        cy.get('#pa_size').select(1);
      }
      if ($body.find('#pa_color').length > 0) {
        cy.get('#pa_color').select(1);
      }
    });
    
    cy.get('.single_add_to_cart_button').click();
    cy.wait(2000);
  });

  beforeEach(() => {
    cy.visit('/checkout');
    cy.wait(3000);
  });


  it('Deve listar todos os inputs da página', () => {
    cy.get('input, select, textarea').each(($el, index) => {
      const tag = $el.prop('tagName');
      const id = $el.attr('id');
      const name = $el.attr('name');
      const type = $el.attr('type');
      cy.log(`${index}: <${tag}> id="${id}" name="${name}" type="${type}"`);
    });
  });
});