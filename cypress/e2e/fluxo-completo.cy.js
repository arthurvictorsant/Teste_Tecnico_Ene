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
    // 1. CADASTRO
    cy.log('**ETAPA 1: Cadastro de novo usuário**');
    HomePage.irParaMinhaConta();
    
    CadastroPage.preencherCadastro(usuario).as('emailGerado');
    CadastroPage.clicarRegistrar();
    CadastroPage.verificarCadastroSucesso();
    
    // Preencher dados de cobrança
    cy.contains('Endereço').click();
    cy.contains('Editar seu endereço de cobrança').click();
    CadastroPage.preencherDadosCobranca(usuario);
    cy.contains('Salvar endereço').click();
    
    // Fazer logout
    cy.contains('Sair').click();
    
    // 2. LOGIN
    cy.log('**ETAPA 2: Login com usuário cadastrado**');
    cy.wait(2000);
    HomePage.irParaMinhaConta();
    
    cy.get('@emailGerado').then((email) => {
      LoginPage.fazerLogin(email, usuario.senha);
    });
    
    LoginPage.verificarLoginSucesso();
    
    // 3. ADICIONAR PRODUTOS
    cy.log('**ETAPA 3: Adicionar produtos ao carrinho**');
    HomePage.irParaProdutos();
    
    ProdutoPage.adicionarProdutoCompleto(produtos[0]);
    cy.wait(1000);
    
    HomePage.irParaProdutos();
    ProdutoPage.adicionarProdutoCompleto(produtos[1]);
    
    // 4. VERIFICAR CARRINHO
    cy.log('**ETAPA 4: Verificar carrinho**');
    ProdutoPage.irParaCarrinho();
    
    CarrinhoPage.verificarProdutoNoCarrinho(produtos[0].nome);
    CarrinhoPage.verificarProdutoNoCarrinho(produtos[1].nome);
    
    // 5. CHECKOUT
    cy.log('**ETAPA 5: Finalizar compra**');
    CarrinhoPage.continuarParaCheckout();
    
    CheckoutPage.verificarProdutoResumo(produtos[0].nome);
    CheckoutPage.verificarProdutoResumo(produtos[1].nome);
    
    CheckoutPage.selecionarMetodoPagamento('boleto');
    CheckoutPage.adicionarObservacao('Pedido de teste - Automação Cypress');
    
    CheckoutPage.aceitarTermos();
    CheckoutPage.finalizarCompra();
    
    // 6. VERIFICAR CONFIRMAÇÃO
    cy.log('**ETAPA 6: Verificar pedido concluído**');
    CheckoutPage.verificarPedidoConcluido();
    CheckoutPage.obterNumeroPedido();
    
    cy.get('@numeroPedido').then((numero) => {
      cy.log(`✅ Pedido ${numero} criado com sucesso!`);
    });
  });
});