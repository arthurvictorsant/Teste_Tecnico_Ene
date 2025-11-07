const LoginPage = require('../../pages/LoginPage');

describe('Debug - LoginPage', () => {
  beforeEach(() => {
    cy.visit('/minha-conta');
    cy.wait(2000);
  });

  it('Deve mostrar erro ao fazer login com credenciais inválidas', () => {
    LoginPage.fazerLogin('teste@invalido.com', 'senhaerrada123');
    cy.screenshot('erro-login');
    cy.get('.woocommerce-error, .woocommerce-message, .alert').should('be.visible');
    cy.log('Erro de login exibido corretamente');
  });
});