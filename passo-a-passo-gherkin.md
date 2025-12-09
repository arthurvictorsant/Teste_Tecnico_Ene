Funcionalidade: Fluxo completo de compra no e-commerce EBAC
  Como um novo cliente
  Quero me cadastrar, fazer login, adicionar produtos e finalizar a compra
  Para completar uma transação no e-commerce

  Contexto:
    Dado que estou na página inicial do e-commerce EBAC
    E tenho dados de um novo usuário carregados do fixture
    E tenho dados de produtos carregados do fixture

  Cenário: Realizar fluxo completo - cadastro, login, adicionar produtos e checkout

    # ETAPA 1: Cadastro
    Quando eu acesso a página "Minha Conta"
    E preencho o formulário de cadastro com os dados do novo usuário
    E clico no botão "Registrar"
    Então devo ver a confirmação de cadastro com sucesso

    # ETAPA 2: Login
    Quando clico em "Sair"
    E aguardo 2 segundos
    E faço login com o email gerado e a senha cadastrada
    Então devo ver confirmação de login com sucesso

    # ETAPA 3: Adicionar produtos ao carrinho
    Quando acesso a página de produtos
    E adiciono o primeiro produto ao carrinho com tamanho, cor e quantidade definidos
    E aguardo 1 segundo
    E volto para a página de produtos
    E adiciono o segundo produto ao carrinho com tamanho, cor e quantidade definidos

    # ETAPA 4: Verificar carrinho
    Quando acesso o carrinho de compras
    Então devo ver o primeiro produto no carrinho
    E devo ver o segundo produto no carrinho

    # ETAPA 5: Finalizar compra
    Quando clico em continuar para o checkout
    E devo ver o primeiro produto no resumo do pedido
    E devo ver o segundo produto no resumo do pedido
    E seleciono o método de pagamento "boleto"
    E adiciono a observação "Pedido de teste - Automação Cypress"
    E preencho os dados de cobrança com as informações do usuário
    E aceito os termos e condições
    E clico em finalizar compra

    # ETAPA 6: Confirmação
    Então devo ver a mensagem de pedido concluído
    E devo ver o número do pedido gerado
    E registro o número do pedido no log do Cypress