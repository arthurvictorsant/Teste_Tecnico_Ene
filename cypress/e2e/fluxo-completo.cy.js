const HomePage = require('../pages/HomePage');
const CadastroPage = require('../pages/CadastroPage');
const LoginPage = require('../pages/LoginPage');
const ProdutoPage = require('../pages/ProdutoPage');
const CarrinhoPage = require('../pages/CarrinhoPage');
const CheckoutPage = require('../pages/CheckoutPage');

describe('Fluxo Completo - E-commerce EBAC', () => {
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
    HomePage.visit();
  });

  it('Deve completar fluxo: cadastro → login → adicionar produtos → checkout', () => {

    cy.log('**ETAPA 1: Cadastro de novo usuário**');
    HomePage.irParaMinhaConta();
    
    CadastroPage.preencherCadastro(usuario).as('emailGerado');
    CadastroPage.clicarRegistrar();
    CadastroPage.verificarCadastroSucesso();
  
    cy.contains('Sair').click();
   
    cy.log('**ETAPA 2: Login com usuário cadastrado**');
    cy.wait(2000);
    
    cy.get('@emailGerado').then((email) => {
      LoginPage.fazerLogin(email, usuario.senha);
    });
    
    LoginPage.verificarLoginSucesso();
    
    cy.log('**ETAPA 3: Adicionar produtos ao carrinho**');
    HomePage.irParaProdutos();
    
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    cy.wait(1000);
    
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[1]);
    
  
    cy.log('**ETAPA 4: Verificar carrinho**');
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.verificarProdutoNoCarrinho(produtos[0].nome);
    CarrinhoPage.verificarProdutoNoCarrinho(produtos[1].nome);
    
   
    cy.log('**ETAPA 5: Finalizar compra**');
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.verificarProdutoResumo(produtos[0].nome);
    CheckoutPage.verificarProdutoResumo(produtos[1].nome);
    
    CheckoutPage.selecionarMetodoPagamento('boleto');
    CheckoutPage.adicionarObservacao('Pedido de teste - Automação Cypress');
    
    CheckoutPage.preencherDadosCobranca(usuario);

    CheckoutPage.aceitarTermos();
    CheckoutPage.finalizarCompra();
    
    cy.log('**ETAPA 6: Verificar pedido concluído**');
    CheckoutPage.verificarPedidoConcluido();
    CheckoutPage.obterNumeroPedido();
    
    cy.get('@numeroPedido').then((numero) => {
      cy.log(` Pedido ${numero} criado com sucesso!`);
    });
  });
});