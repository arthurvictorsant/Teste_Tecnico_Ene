class CheckoutPage {
  elements = {
    campoNome: '#billing_first_name',
    campoSobrenome: '#billing_last_name',
    campoEmpresa: '#billing_company',
    campoPais: '#select2-billing_country-container',
    campoEndereco: '#billing_address_1',
    campoNumero: '#billing_address_2',
    campoCidade: '#billing_city',
    campoEstado: '#select2-billing_state-container',
    campoCEP: '#billing_postcode',
    campoTelefone: '#billing_phone',
    campoEmail: '#billing_email',
    campoObservacoes: '#order_comments',
    metodoPagamentoBoleto: '#payment_method_bacs',
    metodoPagamentoChecque: '#payment_method_cheque',
    produtosResumo: '.cart_item',
    subtotal: '.cart-subtotal .amount',
    total: '.order-total .amount',
    checkboxTermos: '#terms',
    btnFinalizarCompra: '#place_order',
    mensagemSucesso: '.woocommerce-notice--success',
    numeroPedido: '.woocommerce-order-overview__order strong',
  };

  preencherDadosCobranca(usuario) {
    cy.get(this.elements.campoNome, { timeout: 10000 }).should('be.visible');
    
    cy.get(this.elements.campoNome).clear().type(usuario.nome);
    cy.get(this.elements.campoSobrenome).clear().type(usuario.sobrenome);
    
    if (usuario.empresa) {
      cy.get(this.elements.campoEmpresa).clear().type(usuario.empresa);
    }
    
    cy.get(this.elements.campoEndereco).clear().type(usuario.endereco);
    cy.get(this.elements.campoNumero).clear().type(usuario.numero);
    cy.get(this.elements.campoCidade).clear().type(usuario.cidade);
    cy.get(this.elements.campoCEP).clear().type(usuario.cep);
    cy.get(this.elements.campoTelefone).clear().type(usuario.telefone);
    cy.get(this.elements.campoEmail).clear().type(usuario.email);
  }

  selecionarMetodoPagamento(metodo) {
    if (metodo === 'boleto') {
      cy.get(this.elements.metodoPagamentoBoleto).check();
    } else {
      cy.get(this.elements.metodoPagamentoChecque).check();
    }
  }

  adicionarObservacao(observacao) {
    cy.get(this.elements.campoObservacoes).type(observacao);
  }

  verificarProdutoResumo(nomeProduto) {
    cy.get(this.elements.produtosResumo).should('contain', nomeProduto);
  }

  aceitarTermos() {
    cy.get(this.elements.checkboxTermos).check();
  }

  finalizarCompra() {
    cy.get(this.elements.btnFinalizarCompra).click();
  }

  verificarPedidoConcluido() {
    cy.get(this.elements.mensagemSucesso).should('contain', 'Obrigado. Seu pedido foi recebido');
  }

  obterNumeroPedido() {
    cy.get(this.elements.numeroPedido).invoke('text').then((numero) => {
      cy.wrap(numero).as('numeroPedido');
      cy.log(`✅ Pedido criado com sucesso! Número: ${numero}`);
    });
  }
}

module.exports = new CheckoutPage();