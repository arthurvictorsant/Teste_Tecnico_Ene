const HomePage = require('../../pages/HomePage');
const ProdutoPage = require('../../pages/ProdutoPage');

describe('Listagem e Seleção de Produtos', () => {
  let produtos;

  before(() => {
    cy.fixture('produtos').then((data) => {
      produtos = data.produtos;
    });
  });

  beforeEach(() => {
    HomePage.visit();
    HomePage.irParaProdutos();
  });

  it('Deve exibir lista de produtos', () => {
    cy.get('.product').should('have.length.greaterThan', 0);
    cy.get('.products').should('be.visible');
  });

  it('Deve acessar página de produto específico', () => {
    cy.get('.product').first().click();
    cy.wait(1500);
    
    cy.get('.product_title').should('be.visible');
    cy.get('.single_add_to_cart_button').should('be.visible');
  });

  it('Deve selecionar tamanho e cor', () => {
    ProdutoPage.selecionarProduto(produtos[0].nome);
    cy.wait(2000);
    
    ProdutoPage.selecionarOpcoes(produtos[0].tamanho, produtos[0].cor);
    
    cy.get(`.button-variable-item-${produtos[0].tamanho}`).should('have.class', 'selected');
    cy.get(`.button-variable-item-${produtos[0].cor}`).should('have.class', 'selected');
  });

  it('Deve alterar quantidade do produto', () => {
    cy.get('.product').first().click();
    cy.wait(1500);
    
    ProdutoPage.definirQuantidade(3);
    cy.get('.qty').should('have.value', '3');
  });

  it('Deve adicionar produto ao carrinho', () => {
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.verificarProdutoAdicionado();
  });

  it('Deve adicionar múltiplos produtos', () => {
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    cy.wait(1000);
    
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[1]);
  });

  it('Deve exibir preço do produto', () => {
    cy.get('.product').first().click();
    cy.wait(1500);
    
    cy.get('.price').should('be.visible');
    cy.get('.price .amount').invoke('text').should('not.be.empty');
  });
});