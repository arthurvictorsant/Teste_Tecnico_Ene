const HomePage = require('../../pages/HomePage');

describe('Debug - HomePage', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('Deve navegar para Produtos', () => {
    HomePage.irParaProdutos();
    cy.url().should('include', 'produtos');
    cy.screenshot('navegou-produtos');
  });

  it('Deve navegar para Minha Conta', () => {
    HomePage.irParaMinhaConta();
    cy.url().should('include', 'minha-conta');
    cy.screenshot('navegou-minha-conta');
  });
});