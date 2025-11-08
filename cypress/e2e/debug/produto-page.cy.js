const ProdutoPage = require('../../pages/ProdutoPage');

describe('Debug - ProdutoPage', () => {
  beforeEach(() => {
    cy.visit('/produtos');
    cy.wait(2000);
  });

  it('Deve acessar um produto específico', () => {
    cy.get('.product').eq(1).click();
    cy.wait(2000);
    cy.screenshot('pagina-produto-individual');
    
    cy.get('body').then(($body) => {
      if ($body.find('.product_title').length > 1) {
        cy.log(' Título produto: .product_title');
        cy.get('.product_title').should('be.visible');
      }
      
      if ($body.find('.single_add_to_cart_button').length > 1) {
        cy.log(' Botão adicionar: .single_add_to_cart_button');
      }
      
    });
  });
});