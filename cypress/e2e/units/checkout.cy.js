const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');
const ProdutoPage = require('../../pages/ProdutoPage');
const CarrinhoPage = require('../../pages/CarrinhoPage');
const CheckoutPage = require('../../pages/CheckoutPage');

describe('Finalização de Compra', () => {
  let usuario;
  let produtos;

  before(() => {
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
    
    cy.fixture('produtos').then((data) => {
      produtos = data.produtos;
    });
  });

  beforeEach(() => {
    cy.limparCarrinho();
    HomePage.visit();
  });

  it('Deve exibir resumo do pedido', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.verificarProdutoResumo(produtos[0].nome);
  });

  it('Deve preencher dados de cobrança', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.preencherDadosCobranca(usuario);
    
    cy.get('#billing_first_name').should('have.value', usuario.nome);
    cy.get('#billing_last_name').should('have.value', usuario.sobrenome);
  });

  it('Deve selecionar método de pagamento', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.selecionarMetodoPagamento('boleto');
    cy.get('#payment_method_bacs').should('be.checked');
  });

  it('Deve adicionar observações ao pedido', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.adicionarObservacao('Entregar pela manhã');
    cy.get('#order_comments').should('have.value', 'Entregar pela manhã');
  });

  it('Deve validar termos e condições', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.preencherDadosCobranca(usuario);
    CheckoutPage.selecionarMetodoPagamento('boleto');
    CheckoutPage.finalizarCompra();
    
    cy.wait(1000);
  });

  it('Deve finalizar pedido com sucesso', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.preencherDadosCobranca(usuario);
    CheckoutPage.selecionarMetodoPagamento('boleto');
    CheckoutPage.aceitarTermos();
    CheckoutPage.finalizarCompra();
    
    CheckoutPage.verificarPedidoConcluido();
  });

  it('Deve exibir número do pedido', () => {
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    ProdutoPage.irParaCarrinho();
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.preencherDadosCobranca(usuario);
    CheckoutPage.selecionarMetodoPagamento('boleto');
    CheckoutPage.aceitarTermos();
    CheckoutPage.finalizarCompra();
    
    CheckoutPage.verificarPedidoConcluido();
    CheckoutPage.obterNumeroPedido();
    
    cy.get('@numeroPedido').should('not.be.empty');
  });
});