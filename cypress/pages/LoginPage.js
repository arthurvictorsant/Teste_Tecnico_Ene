class LoginPage {
  elements = {
    campoEmail: '#username',
    campoSenha: '#password',
    btnLogin: '.woocommerce-form > .button',
    btnLembrar: '#rememberme',
    linkPerdeuSenha: '.lost_password',
    mensagemErro: '.woocommerce-error',
  };

  fazerLogin(email, senha) {
    cy.get(this.elements.campoEmail).type(email);
    cy.get(this.elements.campoSenha).type(senha);
    cy.get(this.elements.btnLogin).click();
  }

  marcarLembrar() {
    cy.get(this.elements.btnLembrar).check();
  }

  verificarLoginSucesso() {
    cy.url().should('include', 'minha-conta');
    cy.contains('Olá').should('be.visible');
  }

  verificarErroLogin() {
    cy.get(this.elements.mensagemErro).should('be.visible');
  }
}

module.exports = new LoginPage();