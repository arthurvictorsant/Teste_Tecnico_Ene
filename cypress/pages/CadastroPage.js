class CadastroPage {
  elements = {
    campoEmail: '#reg_email',
    campoSenha: '#reg_password',
    btnRegistrar: 'button[name="register"]',
    campoNome: '#billing_first_name',
    campoSobrenome: '#billing_last_name',
    campoEmpresa: '#billing_company',
    selectPais: '#select2-billing_country-container',
    campoEndereco: '#billing_address_1',
    campoNumero: '#billing_address_2',
    campoCidade: '#billing_city',
    selectEstado: '#select2-billing_state-container',
    campoCEP: '#billing_postcode',
    campoTelefone: '#billing_phone',
  };

  preencherCadastro(usuario) {
    const timestamp = new Date().getTime();
    const emailUnico = `teste.${timestamp}@ebac.com.br`;

    cy.get(this.elements.campoEmail, { timeout: 10000 }).should('be.visible');
    cy.get(this.elements.campoEmail).clear().type(emailUnico);
    cy.get(this.elements.campoSenha).clear().type(usuario.senha);
    
    return cy.wrap(emailUnico);
  }

  clicarRegistrar() {
    cy.get(this.elements.btnRegistrar).click()
  }

  preencherDadosCobranca(usuario) {
    cy.get(this.elements.campoNome, { timeout: 10000 }).should('be.visible');
    
    cy.get(this.elements.campoNome).clear().type(usuario.nome);
    cy.get(this.elements.campoSobrenome).clear().type(usuario.sobrenome);
    
    if (usuario.empresa) {
      cy.get(this.elements.campoEmpresa).clear().type(usuario.empresa);
    }
    
    cy.get(this.elements.selectPais).click();
    cy.get('.select2-search__field').type('Brasil{enter}');
    
    cy.get(this.elements.campoEndereco).clear().type(usuario.endereco);
    cy.get(this.elements.campoNumero).clear().type(usuario.numero);
    cy.get(this.elements.campoCidade).clear().type(usuario.cidade);
    
    cy.get(this.elements.selectEstado).click();
    cy.get('.select2-search__field').type(`${usuario.estado}{enter}`);
    
    cy.get(this.elements.campoCEP).clear().type(usuario.cep);
    cy.get(this.elements.campoTelefone).clear().type(usuario.telefone);
  }

  verificarCadastroSucesso() {
    cy.url().should('include', 'minha-conta');
    cy.contains('Olá', { timeout: 10000 }).should('be.visible');
  }
}

module.exports = new CadastroPage();