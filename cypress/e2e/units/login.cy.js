const HomePage = require('../../pages/HomePage');
const LoginPage = require('../../pages/LoginPage');

describe('Login de Usuário', () => {
  let usuarioExistente;

  before(() => {
    cy.fixture('usuarios').then((data) => {
      usuarioExistente = data.usuarioExistente;
    });
  });

  beforeEach(() => {
    HomePage.visit();
    HomePage.irParaMinhaConta();
  });

  it('Deve fazer login com credenciais válidas', () => {
    LoginPage.fazerLogin(usuarioExistente.email, usuarioExistente.senha);
    LoginPage.verificarLoginSucesso();
  });

  it('Deve rejeitar email inexistente', () => {
    LoginPage.fazerLogin('emailinvalido@teste.com', 'senhaqualquer');
    LoginPage.verificarErroLogin();
  });

  it('Deve rejeitar senha incorreta', () => {
    LoginPage.fazerLogin(usuarioExistente.email, 'senhaerrada123');
    LoginPage.verificarErroLogin();
  });

  it('Deve validar campos obrigatórios', () => {
    cy.get('.woocommerce-form > .button').click();
    cy.url().should('include', 'minha-conta');
  });

  it('Deve permitir marcar lembrar senha', () => {
    LoginPage.marcarLembrar();
    LoginPage.fazerLogin(usuarioExistente.email, usuarioExistente.senha);
    LoginPage.verificarLoginSucesso();
  });

  it('Deve fazer logout corretamente', () => {
    LoginPage.fazerLogin(usuarioExistente.email, usuarioExistente.senha);
    LoginPage.verificarLoginSucesso();

    cy.contains('Sair').click();
    cy.wait(2000);

    cy.url().should('include', 'minha-conta');
    cy.get('#username').should('be.visible');
  });
});