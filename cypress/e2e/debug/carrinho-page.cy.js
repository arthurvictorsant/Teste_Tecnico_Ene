const CarrinhoPage = require('../../pages/CarrinhoPage');

describe('Debug - CarrinhoPage', () => {
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
    cy.visit('/carrinho');
    cy.wait(2000);
  });

  it('Deve listar produtos no carrinho', () => {
    cy.get('.cart_item').each(($item, index) => {
      const nome = $item.find('.product-name').text();
      const preco = $item.find('.product-price').text();
      const qtd = $item.find('.qty').val();
      cy.log(`Produto ${index + 1}: ${nome} | Preço: ${preco} | Qtd: ${qtd}`);
    });
  });
});