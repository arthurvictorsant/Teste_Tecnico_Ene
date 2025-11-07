class ProdutoPage {
  elements = {
    listaProdutos: '.products',
    produto: '.product',
    btnAdicionarCarrinho: '.single_add_to_cart_button',
    selectTamanho: '#pa_size',
    selectCor: '#pa_color',
    campoQuantidade: '.qty',
    mensagemSucesso: '.woocommerce-message',
    btnVerCarrinho: '.woocommerce-message a',
    tituloProduto: '.product_title',
    precoProduto: '.price',
  };

  selecionarProduto(nomeProduto) {
    cy.contains('.product', nomeProduto).click();
  }

  selecionarOpcoes(tamanho, cor) {
    if (tamanho) {
      cy.get(this.elements.selectTamanho).select(tamanho);
    }
    if (cor) {
      cy.get(this.elements.selectCor).select(cor);
    }
  }

  definirQuantidade(quantidade) {
    cy.get(this.elements.campoQuantidade).clear().type(quantidade.toString());
  }

  adicionarAoCarrinho() {
    cy.get(this.elements.btnAdicionarCarrinho).click();
  }

  verificarProdutoAdicionado() {
    cy.get(this.elements.mensagemSucesso).should('contain', 'foi adicionado no seu carrinho');
  }

  irParaCarrinho() {
    cy.get(this.elements.btnVerCarrinho).click();
  }

  adicionarProdutoCompleto(produto) {
    this.selecionarProduto(produto.nome);
    this.selecionarOpcoes(produto.tamanho, produto.cor);
    this.definirQuantidade(produto.quantidade);
    this.adicionarAoCarrinho();
    this.verificarProdutoAdicionado();
  }
}

module.exports = new ProdutoPage();