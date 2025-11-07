const CadastroPage = require('../../pages/CadastroPage');

describe('Debug - CadastroPage', () => {
  beforeEach(() => {
    cy.visit('/minha-conta');
    cy.wait(2000);
  });

  it('Deve preencher formulário de cadastro', () => {
    const usuario = {
      senha: 'Teste@123456'
    };
    
    const timestamp = new Date().getTime();
    const emailUnico = `teste.${timestamp}@ebac.com.br`;

    cy.get('#reg_email').should('be.visible').type(emailUnico);
    cy.get('#reg_password').type(usuario.senha);
    
    cy.screenshot('formulario-preenchido');
    cy.log('Formulário preenchido com sucesso!');
  });
});