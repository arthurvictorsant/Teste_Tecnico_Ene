class CarrinhoPage {
  elements = {
    tabelaProdutos: '.shop_table',
    linhaProduto: '.cart_item',
    nomeProduto: '.product-name',
    precoProduto: '.product-price',
    quantidade: '.qty',
    subtotal: '.product-subtotal',
    totalCarrinho: '.order-total .amount',
    btnAtualizarCarrinho: '[name="update_cart"]',
    btnRemoverProduto: '.remove',
    btnContinuarComprando: '.checkout-button',
    cupomDesconto: '#coupon_code',
    btnAplicarCupom: '[name="apply_coupon"]',
    mensagemCarrinhoVazio: '.cart-empty',
  };

  verificarProdutoNoCarrinho(nomeProduto) {
    cy.get(this.elements.nomeProduto).should('contain', nomeProduto);
  }

  verificarQuantidade(nomeProduto, quantidade) {
    cy.contains(this.elements.linhaProduto, nomeProduto)
      .find(this.elements.quantidade)
      .should('have.value', quantidade.toString());
  }

  alterarQuantidade(nomeProduto, novaQuantidade) {
    cy.contains(this.elements.linhaProduto, nomeProduto)
      .find(this.elements.quantidade)
      .clear()
      .type(novaQuantidade.toString());
    cy.get(this.elements.btnAtualizarCarrinho).click();
  }

  removerProduto(nomeProduto) {
    cy.contains(this.elements.linhaProduto, nomeProduto)
      .find(this.elements.btnRemoverProduto)
      .click();
  }

  aplicarCupom(cupom) {
    cy.get(this.elements.cupomDesconto).type(cupom);
    cy.get(this.elements.btnAplicarCupom).click();
  }

  continuarParaCheckout() {
    cy.get(this.elements.btnContinuarComprando).click();
  }

  obterTotal() {
    cy.get(this.elements.totalCarrinho).invoke('text').then((texto) => {
      cy.wrap(texto).as('totalCarrinho');
      cy.log(`Total do carrinho: ${texto}`);
    });
  }

  verificarCarrinhoVazio() {
    cy.get(this.elements.mensagemCarrinhoVazio).should('contain', 'Seu carrinho está vazio');
  }
}

module.exports = new CarrinhoPage();