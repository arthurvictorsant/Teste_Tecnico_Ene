const ProdutoPage = require('../../pages/ProdutoPage');

describe('Debug - ProdutoPage', () => {
  beforeEach(() => {
    cy.visit('/produtos');
    cy.wait(2000);
  });

  it('Deve acessar um produto específico', () => {
    cy.get('.product').first().click();
    cy.wait(2000);
    cy.screenshot('pagina-produto-individual');
    
    cy.get('body').then(($body) => {
      if ($body.find('.product_title').length > 0) {
        cy.log('✅ Título produto: .product_title');
        cy.get('.product_title').should('be.visible');
      }
      
      if ($body.find('.single_add_to_cart_button').length > 0) {
        cy.log('✅ Botão adicionar: .single_add_to_cart_button');
      }
      
      if ($body.find('#pa_size').length > 0) {
        cy.log('✅ Select tamanho: #pa_size');
      } else {
        cy.log('⚠️ Produto não tem opção de tamanho');
      }
      
      if ($body.find('#pa_color').length > 0) {
        cy.log('✅ Select cor: #pa_color');
      } else {
        cy.log('⚠️ Produto não tem opção de cor');
      }
    });
  });
});