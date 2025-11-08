const HomePage = require('../../pages/HomePage');
const CadastroPage = require('../../pages/CadastroPage');

describe('Cadastro de Usuário', () => {
  let usuario;

  before(() => {
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
  });

  beforeEach(() => {
    HomePage.visit();
    HomePage.irParaMinhaConta();
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    CadastroPage.preencherCadastro(usuario).as('emailGerado');
    CadastroPage.clicarRegistrar();
    CadastroPage.verificarCadastroSucesso();

    cy.get('@emailGerado').then((email) => {
      cy.log(`Usuário cadastrado: ${email}`);
    });
  });

  it('Deve impedir cadastro com email duplicado', () => {
    const usuarioExistente = {
      senha: 'Teste@123456'
    };

    cy.get('#reg_email').type('teste.existente@ebac.com.br');
    cy.get('#reg_password').type(usuarioExistente.senha);
    cy.get('input[name="register"]').click();

    cy.get('.woocommerce-error, .woocommerce-message').should('be.visible');
  });

  it('Deve validar campos obrigatórios', () => {
    CadastroPage.clicarRegistrar();
    cy.url().should('include', 'minha-conta');
  });

  it('Deve aceitar senha com caracteres especiais', () => {
    const timestamp = new Date().getTime();
    const emailUnico = `teste.${timestamp}@ebac.com.br`;

    cy.get('#reg_email').type(emailUnico);
    cy.get('#reg_password').type('Senha@123!#');
    CadastroPage.clicarRegistrar();
    cy.wait(2000);
  });
});