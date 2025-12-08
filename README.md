# Cypress E2E - EBAC Shop

Projeto de automação de testes end-to-end para a loja virtual EBAC utilizando Cypress com JavaScript e padrão Page Object Model.

## Tecnologias

- Cypress 13.6.0
- JavaScript (Node.js 20)
- Mochawesome (relatórios HTML)
- GitHub Actions (CI/CD)

## Estrutura do Projeto

```
desafio-cypress-QA/
├── cypress/
│   ├── e2e/
│   │   ├── units/
│   │   │   ├── cadastro.cy.js
│   │   │   ├── carrinho.cy.js
│   │   │   ├── checkout.cy.js
│   │   │   ├── login.cy.js
│   │   │   └── produtos.cy.js
│   │   └── fluxo-completo.cy.js
│   ├── fixtures/
│   │   ├── usuarios.json
│   │   └── produtos.json
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── CadastroPage.js
│   │   ├── LoginPage.js
│   │   ├── ProdutoPage.js
│   │   ├── CarrinhoPage.js
│   │   └── CheckoutPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── .github/
│   └── workflows/
│       └── cypress-with-reports.yml
├── cypress.config.js
└── package.json
```

## Instalação

```bash
git clone https://github.com/arthurvictorsant/Teste_Tecnico_Ene.git
cd Teste_Tecnico_Ene
npm install
```

## Executar Testes

**IMPORTANTE:** Todos os comandos abaixo geram automaticamente o relatório HTML com vídeos após a execução!

### Executar fluxo completo (RECOMENDADO)

```bash
npm test
```

Executa o teste E2E completo (`fluxo-completo.cy.js`) e gera relatório automaticamente.

### Executar todos os testes

```bash
npm run cy:run
```

Executa todos os testes em modo headless e gera relatório automaticamente.

### Executar com Chrome

```bash
npm run cy:run:chrome
```

Executa todos os testes no navegador Chrome e gera relatório automaticamente.

### Executar mostrando o navegador

```bash
npm run cy:run:headed
```

Executa os testes mostrando o navegador (modo headed) e gera relatório automaticamente.

### Executar todos os specs

```bash
npm run test:all
```

Executa todos os arquivos de teste e gera relatório automaticamente.

## Relatórios

### Localização do Relatório

Após executar qualquer um dos comandos acima, o relatório HTML estará disponível em:

```
cypress/reports/html/report.html
```

### Conteúdo do Relatório

O relatório inclui automaticamente:
- ✅ Estatísticas e gráficos de execução
- ✅ Vídeos completos dos testes
- ✅ Screenshots de falhas (quando ocorrem)
- ✅ Detalhes de cada teste executado
- ✅ Tempo de execução e status

### Comandos Extras

Limpar relatórios antigos:

```bash
npm run clean:reports
```

Gerar relatório manualmente (caso já tenha executado os testes):

```bash
npm run cy:report
```

### Configuração do Mochawesome

Os relatórios incluem:
- Gráficos e estatísticas visuais
- Screenshots embutidas em falhas
- Vídeos da execução
- Timestamp personalizado
- Todos os assets em um único arquivo HTML

## Page Object Model

O projeto utiliza o padrão POM para melhor organização e reusabilidade do código.

### Exemplo de Page Object

```javascript
class LoginPage {
  elements = {
    campoEmail: '#username',
    campoSenha: '#password',
    btnLogin: '.woocommerce-form > .button',
  };

  fazerLogin(email, senha) {
    cy.get(this.elements.campoEmail).type(email);
    cy.get(this.elements.campoSenha).type(senha);
    cy.get(this.elements.btnLogin).click();
  }

  verificarLoginSucesso() {
    cy.url().should('include', 'minha-conta');
    cy.contains('Olá').should('be.visible');
  }
}

module.exports = new LoginPage();
```

### Uso nos testes

```javascript
const LoginPage = require('../pages/LoginPage');

it('Deve fazer login com sucesso', () => {
  LoginPage.fazerLogin('usuario@teste.com', 'senha123');
  LoginPage.verificarLoginSucesso();
});
```

## Fixtures

Os dados de teste são armazenados em arquivos JSON para facilitar manutenção.

**cypress/fixtures/usuarios.json:**

```json
{
  "novoUsuario": {
    "nome": "Teste",
    "sobrenome": "Automacao",
    "senha": "Teste@123456",
    "telefone": "11999999999",
    "endereco": "Rua Teste",
    "cidade": "São Paulo",
    "estado": "São Paulo",
    "cep": "01234-567"
  }
}
```

**cypress/fixtures/produtos.json:**

```json
{
  "produtos": [
    {
      "nome": "Abominable Hoodie",
      "tamanho": "M",
      "cor": "Blue",
      "quantidade": 2
    }
  ]
}
```

## Custom Commands

Comandos customizados disponíveis em `cypress/support/commands.js`:

```javascript
cy.login('email@teste.com', 'senha123');
cy.adicionarProdutoAoCarrinho(produto);
cy.limparCarrinho();
cy.cadastrarUsuario(usuario);
```

### Exemplo de uso

```javascript
it('Deve adicionar produto usando command', () => {
  cy.adicionarProdutoAoCarrinho({
    nome: 'Hoodie',
    tamanho: 'M',
    cor: 'Blue',
    quantidade: 2
  });
});
```

## CI/CD - GitHub Actions

O projeto possui integração com GitHub Actions para execução automatizada dos testes.

### Quando os testes são executados

Os testes rodam automaticamente em:

- Push para branches main ou master
- Pull requests
- Execução manual via interface do GitHub

### Como executar manualmente no GitHub Actions

1. Acesse o repositório no GitHub
2. Clique na aba **Actions**
3. No menu lateral, selecione **Cypress Tests with Reports**
4. Clique no botão **Run workflow** (canto superior direito)
5. Selecione a branch desejada
6. Clique em **Run workflow** (botão verde)
7. Aguarde a conclusão da execução

### Visualizar resultados no GitHub Actions

Após a execução:

1. Clique no workflow executado
2. Visualize os logs de cada step
3. Na seção **Artifacts** (final da página), baixe:
   - **test-report-html**: Relatório HTML completo com resultados
   - **cypress-screenshots**: Screenshots das falhas (se houver)
   - **cypress-videos**: Vídeos da execução de todos os testes
   - **test-results-json**: Resultados em formato JSON

### Artefatos disponíveis

Todos os artefatos ficam disponíveis por 30 dias após a execução:

| Artefato | Descrição | Quando é gerado |
|----------|-----------|-----------------|
| test-report-html | Relatório visual com estatísticas | Sempre |
| cypress-screenshots | Capturas de tela de falhas | Apenas em falhas |
| cypress-videos | Gravação da execução | Sempre |
| test-results-json | Dados brutos em JSON | Sempre |

### Configuração do workflow

O arquivo de configuração está em `.github/workflows/cypress-with-reports.yml`

Principais configurações:

- Node.js 20
- Ubuntu 22.04
- Chrome como navegador padrão
- Geração automática de relatórios
- Upload de artefatos

## Casos de Teste

### Cadastro (cadastro.cy.js) --> O cenário de cadastro é o primeiro passo do cliente para a utilização  E2E da plataforma, deve-se garantir o pleno funcionamento.

- Cadastrar novo usuário com sucesso
- Impedir cadastro com email duplicado
- Validar campos obrigatórios
- Aceitar senha com caracteres especiais

### Login (login.cy.js) -- > O cenário de login é importante para a segurança do usuário e da plataforma.

- Fazer login com credenciais válidas
- Rejeitar email inexistente
- Rejeitar senha incorreta
- Validar campos obrigatórios
- Permitir marcar lembrar senha
- Fazer logout corretamente

### Produtos (produtos.cy.js) --> O cenário de produtos é de vital importancia para o negócio e experiencia do cliente.

- Exibir lista de produtos
- Acessar página de produto específico
- Selecionar tamanho e cor
- Alterar quantidade do produto
- Adicionar produto ao carrinho
- Adicionar múltiplos produtos
- Exibir preço do produto

### Carrinho (carrinho.cy.js) --> O cenário de carrinho é uma área com muita lógica de negócio complexa , qualquer bug aqui resulta diretamente em perda de venda e prejudica a experiencia do cliente

- Exibir carrinho vazio
- Adicionar produto no carrinho
- Exibir quantidade correta
- Alterar quantidade no carrinho
- Remover produto do carrinho
- Calcular subtotal corretamente
- Permitir aplicar cupom
- Prosseguir para checkout

### Checkout (checkout.cy.js) --> Última etapa antes da conversão, onde o dinheiro entra e integração costumava ser sensivel.

- Exibir resumo do pedido
- Preencher dados de cobrança
- Selecionar método de pagamento
- Adicionar observações ao pedido
- Validar termos e condições
- Finalizar pedido com sucesso
- Exibir número do pedido


### Fluxo Completo (fluxo-completo.cy.js) -->
Detecta problemas que só aparecem em fluxos completos
Garante que a experiência end-to-end funciona
Teste de regressão mais importante para deploys

Teste E2E que simula jornada completa do usuário:

1. Cadastro de novo usuário
2. Logout
3. Login com usuário cadastrado
4. Navegação para produtos
5. Adição de múltiplos produtos ao carrinho
6. Verificação do carrinho
7. Preenchimento de dados de cobrança
8. Finalização da compra
9. Confirmação com número do pedido

## Configuração

**cypress.config.js:**

```javascript
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
    reportFilename: '[status]_[datetime]-[name]-report',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    experimentalStudio: true,
    setupNodeEvents(on, config) {},
  },
});
```

### Principais configurações

- **baseUrl**: URL base da aplicação testada
- **viewportWidth/Height**: Resolução da viewport
- **defaultCommandTimeout**: Timeout padrão para comandos (10s)
- **video**: Habilita gravação de vídeo
- **screenshotOnRunFailure**: Captura screenshot em falhas
- **experimentalStudio**: Habilita Cypress Studio para gravação

### Limpar cache do Cypress

```bash
npx cypress cache clear
npx cypress cache list
npm install
```

### Erro de dependências

```bash
rm -rf node_modules package-lock.json
npm install
```

