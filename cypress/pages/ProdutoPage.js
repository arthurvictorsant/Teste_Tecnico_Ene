class ProdutoPage {
  elements = {
    listaProdutos: '.products',
    produto: '.product',
    btnAdicionarCarrinho: '.single_add_to_cart_button',
    campoQuantidade: '.qty',
    mensagemSucesso: '.woocommerce-message',
    btnVerCarrinho: '.woocommerce-message a',
    tituloProduto: '.product_title',
    precoProduto: '.price',
    barraPesquisa: 'input[name="s"]',
  };

  selecionarProduto(nomeProduto) {
    cy.contains('.product', nomeProduto).click();
  }

  pesquisarProduto(nomeProduto) {
    cy.get(this.elements.barraPesquisa)
      .filter(':visible')
      .first()
      .invoke('attr', 'autocomplete', 'off') 
      .clear({ force: true })
      .type(nomeProduto, { delay: 50 }) 
      .wait(300) 
      .type('{enter}', { force: true });
    
    cy.wait(1500);
    
   
    cy.contains('.product', nomeProduto).first().click();
    
    cy.log(`✅ Produto "${nomeProduto}" pesquisado e acessado`);
  }

 validarPaginaProduto(nomeProduto) {
    cy.get(this.elements.tituloProduto)
      .should('be.visible')
      .and('contain', nomeProduto);
  }


  pesquisarProdutoRapido(nomeProduto) {
    cy.get(this.elements.barraPesquisa)
      .filter(':visible')
      .first()
      .clear({ force: true })
      .type(`${nomeProduto}{enter}`, { force: true, delay: 0 });
    
    cy.wait(1500);
    cy.contains('.product', nomeProduto).first().click();
  }

  selecionarOpcoes(tamanho, cor) {
    cy.wait(1500); 

    if (tamanho) {
      const seletorTamanho = `.button-variable-item-${tamanho}`;
      cy.get('body').then(($body) => {
        if ($body.find(seletorTamanho).length > 0) {
          cy.log(`✅ Selecionando tamanho: ${tamanho}`);
          cy.get(seletorTamanho).click();
        } else {
          cy.log(`⚠️ Botão de tamanho ${tamanho} não encontrado`);
        }
      });
    }

    if (cor) {
      const seletorCor = `.button-variable-item-${cor}`;
      cy.get('body').then(($body) => {
        if ($body.find(seletorCor).length > 0) {
          cy.log(`✅ Selecionando cor: ${cor}`);
          cy.get(seletorCor).click();
        } else {
          cy.log(`⚠️ Botão de cor ${cor} não encontrado`);
        }
      });
    }
  }

  definirQuantidade(quantidade) {
    cy.get(this.elements.campoQuantidade).clear().type(quantidade.toString());
  }

  adicionarAoCarrinho() {
    cy.get(this.elements.btnAdicionarCarrinho).click();
  }

  verificarProdutoAdicionado() {
    cy.get(this.elements.mensagemSucesso, { timeout: 10000 })
      .should('be.visible')
      .should('contain', 'adicionado');
  }

  irParaCarrinho() {
    cy.get(this.elements.btnVerCarrinho).click();
  }

  adicionarProdutoCompleto(produto, usarPesquisa = true) {
    if (usarPesquisa) {
      this.pesquisarProduto(produto.nome);
    } else {
      this.selecionarProduto(produto.nome);
    }
    cy.wait(2000)
    this.validarPaginaProduto(produto.nome);
    cy.wait(2000); 
    this.selecionarOpcoes(produto.tamanho, produto.cor);
    cy.wait(500); 
    this.definirQuantidade(produto.quantidade);
    this.adicionarAoCarrinho();
    this.verificarProdutoAdicionado();
  }

  selecionarOpcoesComValidacao(tamanho, cor) {
    cy.wait(1500);

    if (tamanho) {
      const seletorTamanho = `.button-variable-item-${tamanho}`;
      cy.get(seletorTamanho)
        .should('be.visible')
        .should('not.have.class', 'disabled')
        .click();
      cy.log(`✅ Tamanho ${tamanho} selecionado`);
    }

    if (cor) {
      const seletorCor = `.button-variable-item-${cor}`;
      cy.get(seletorCor)
        .should('be.visible')
        .should('not.have.class', 'disabled')
        .click();
      cy.log(`✅ Cor ${cor} selecionada`);
    }
  }

  listarOpcoesDisponiveis() {
    cy.get('.button-variable-item').each(($btn) => {
      const classes = $btn.attr('class');
      const texto = $btn.text();
      cy.log(`Opção: ${texto} | Classes: ${classes}`);
    });
  }
}

module.exports = new ProdutoPage();