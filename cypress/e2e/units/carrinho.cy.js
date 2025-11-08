const HomePage = require('../../pages/HomePage');
const ProdutoPage = require('../../pages/ProdutoPage');
const CarrinhoPage = require('../../pages/CarrinhoPage');

describe('Carrinho de Compras', () => {
  let produtos;

  before(() => {
    cy.fixture('produtos').then((data) => {
      produtos = data.produtos;
    });
  });

  beforeEach(() => {
    cy.limparCarrinho();
    HomePage.visit();
  });

  it('Deve exibir carrinho vazio', () => {
    cy.visit('/carrinho');
    CarrinhoPage.verificarCarrinhoVazio();
  });

  it('Deve adicionar produto no carrinho', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.verificarProdutoNoCarrinho(produtos[0].nome);
  });

  it('Deve exibir quantidade correta', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.verificarQuantidade(produtos[0].nome, produtos[0].quantidade);
  });

  it('Deve alterar quantidade no carrinho', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.alterarQuantidade(produtos[0].nome, 5);
    cy.wait(2000);
    
    CarrinhoPage.verificarQuantidade(produtos[0].nome, 5);
  });

  it('Deve remover produto do carrinho', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.removerProduto(produtos[0].nome);
    cy.wait(2000);
    
    CarrinhoPage.verificarCarrinhoVazio();
  });

  it('Deve calcular subtotal corretamente', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    cy.get('.product-subtotal .amount').should('be.visible');
    cy.get('.order-total .amount').should('be.visible');
  });

  it('Deve permitir aplicar cupom', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.aplicarCupom('DESCONTO10');
    cy.wait(2000);
  });

  it('Deve prosseguir para checkout', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.continuarParaCheckout();
    cy.url().should('include', '/checkout/');
  });
});