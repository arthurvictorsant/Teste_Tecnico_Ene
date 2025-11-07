class HomePage {
  elements = {
    logo: '.logo',
    menuProdutos: '#menu-item-40',
    menuMinhaLista: '#menu-item-41',
    menuMinhaConta: '.icon-user-unfollow',
    campoBusca: '.search-field',
    btnBuscar: '.search-submit',
    carrinho: '.dropdown-toggle > .mini-cart-icon',
  };

  visit() {
    cy.visit('/');
  }

  irParaProdutos() {
    cy.get(this.elements.menuProdutos).click();
  }

  irParaMinhaConta() {
    cy.get(this.elements.menuMinhaConta).click();
  }

  buscarProduto(nomeProduto) {
    cy.get(this.elements.campoBusca).type(nomeProduto);
    cy.get(this.elements.btnBuscar).click();
  }

  abrirCarrinho() {
    cy.get(this.elements.carrinho).click();
  }

  verificarLogoVisivel() {
    cy.get(this.elements.logo).should('be.visible');
  }
}

module.exports = new HomePage();