Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/minha-conta');
  cy.get('#username').type(email);
  cy.get('#password').type(senha);
  cy.get('.woocommerce-form > .button').click();
});

Cypress.Commands.add('cadastrarUsuario', (usuario) => {
  const timestamp = new Date().getTime();
  const emailUnico = `teste.${timestamp}@ebac.com.br`;
  
  cy.visit('/minha-conta');
  cy.get('#reg_email').type(emailUnico);
  cy.get('#reg_password').type(usuario.senha);
  cy.get('button[name="register"]').click();
});

Cypress.Commands.add('adicionarProdutoAoCarrinho', (produto) => {
  cy.visit('/produtos');
  cy.contains('.product', produto.nome).click();
  
  if (produto.tamanho) {
    cy.get('#pa_size').select(produto.tamanho);
  }
  if (produto.cor) {
    cy.get('#pa_color').select(produto.cor);
  }
  
  cy.get('.qty').clear().type(produto.quantidade.toString());
  cy.get('.single_add_to_cart_button').click();
});

Cypress.Commands.add('limparCarrinho', () => {
  cy.visit('/carrinho');
  cy.get('body').then(($body) => {
    if ($body.find('.remove').length > 0) {
      cy.get('.remove').each(($el) => {
        cy.wrap($el).click();
        cy.wait(1000);
      });
    }
  });
});