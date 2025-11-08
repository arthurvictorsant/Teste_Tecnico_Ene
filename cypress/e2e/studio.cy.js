describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://lojaebac.ebaconline.art.br')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#tab-1vnLW-0 > .btn').click();
    cy.get('.post-3111 > .product-block > .block-inner > .image > .product-image > .attachment-shop_catalog').click();
    cy.get('.button-variable-item-S').click();
    cy.get('.button-variable-item-Brown').click();
    cy.get('.single_add_to_cart_button').click();
    /* ==== End Cypress Studio ==== */
  })

  /* ==== Test Created with Cypress Studio ==== */
  it('opening products', function() {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('http://lojaebac.ebaconline.art.br/');
    cy.get('#tab-7fksq-0 > .btn').click();
    /* ==== End Cypress Studio ==== */
  });
})