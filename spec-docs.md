# 📄 Test Documentation

## Summary

- Total Test Files: **6**
- Total Individual Tests: **33**
- Cypress Files (.cy): **6**

---

## File: **fluxo-completo.cy.js**

**Path:** cypress\e2e\fluxo-completo.cy.js

## Describe: **Fluxo Completo - E-commerce EBAC**

### Context: **Fluxo Completo - E-commerce EBAC**

#### Tests
- Deve completar fluxo: cadastro → login → adicionar produtos → checkout

## File: **cadastro.cy.js**

**Path:** cypress\e2e\units\cadastro.cy.js

## Describe: **Cadastro de Usuário**

### Context: **Cadastro de Usuário**

#### Tests
- Deve cadastrar um novo usuário com sucesso
- Deve impedir cadastro com email duplicado
- Deve validar campos obrigatórios
- Deve aceitar senha com caracteres especiais

## File: **carrinho.cy.js**

**Path:** cypress\e2e\units\carrinho.cy.js

## Describe: **Carrinho de Compras**

### Context: **Carrinho de Compras**

#### Tests
- Deve exibir carrinho vazio
- Deve adicionar produto no carrinho
- Deve exibir quantidade correta
- Deve alterar quantidade no carrinho
- Deve remover produto do carrinho
- Deve calcular subtotal corretamente
- Deve permitir aplicar cupom
- Deve prosseguir para checkout

## File: **checkout.cy.js**

**Path:** cypress\e2e\units\checkout.cy.js

## Describe: **Finalização de Compra**

### Context: **Finalização de Compra**

#### Tests
- Deve exibir resumo do pedido
- Deve preencher dados de cobrança
- Deve selecionar método de pagamento
- Deve adicionar observações ao pedido
- Deve validar termos e condições
- Deve finalizar pedido com sucesso
- Deve exibir número do pedido

## File: **login.cy.js**

**Path:** cypress\e2e\units\login.cy.js

## Describe: **Login de Usuário**

### Context: **Login de Usuário**

#### Tests
- Deve fazer login com credenciais válidas
- Deve rejeitar email inexistente
- Deve rejeitar senha incorreta
- Deve validar campos obrigatórios
- Deve permitir marcar lembrar senha
- Deve fazer logout corretamente

## File: **produtos.cy.js**

**Path:** cypress\e2e\units\produtos.cy.js

## Describe: **Listagem e Seleção de Produtos**

### Context: **Listagem e Seleção de Produtos**

#### Tests
- Deve exibir lista de produtos
- Deve acessar página de produto específico
- Deve selecionar tamanho e cor
- Deve alterar quantidade do produto
- Deve adicionar produto ao carrinho
- Deve adicionar múltiplos produtos
- Deve exibir preço do produto

