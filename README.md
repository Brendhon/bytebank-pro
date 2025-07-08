# 💻 Bytebank Pro – Microfrontends

[![Render](https://img.shields.io/badge/Render-API-blue?style=for-the-badge&logo=render&logoColor=white)](https://bytebank-api.onrender.com/graphql)

Este repositório reúne a estrutura dos **microfrontends do Bytebank Pro**, desenvolvidos como parte do Tech Challenge da pós-graduação em Engenharia de Front-end (FIAP). O projeto utiliza **Turborepo** para orquestrar um monorepo com aplicações Angular independentes, promovendo escalabilidade, manutenção e desempenho.

---

## 📝 Sumário

- [💻 Bytebank Pro – Microfrontends](#-bytebank-pro--microfrontends)
  - [📝 Sumário](#-sumário)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [🤖 Desenvolvimento com IA](#-desenvolvimento-com-ia)
    - [🛠️ Ferramentas de IA Utilizadas](#️-ferramentas-de-ia-utilizadas)
    - [📁 Configurações de IA](#-configurações-de-ia)
    - [🎯 Engenharia de Prompt](#-engenharia-de-prompt)
  - [📁 Estrutura do Monorepo](#-estrutura-do-monorepo)
  - [📦 Packages Compartilhados](#-packages-compartilhados)
  - [🛠️ Qualidade de Código](#️-qualidade-de-código)
  - [🔌 Comunicação entre Microfrontends](#-comunicação-entre-microfrontends)
  - [🐳 Desenvolvimento com Docker](#-desenvolvimento-com-docker)
  - [🚀 Instruções de Desenvolvimento](#-instruções-de-desenvolvimento)
  - [🔗 Links Úteis](#-links-úteis)
  - [👥 Autor](#-autor)

---

## ✨ Visão Geral

A arquitetura é composta por um **Shell** (aplicação hospedeira) e três **Microfrontends (MFEs)**, cada um responsável por uma área de negócio específica.

| App              | Descrição                                                   | Readme                                            |
| :--------------- | :---------------------------------------------------------- | :------------------------------------------------ |
| **Shell**        | Orquestra os MFEs, gerencia autenticação e o layout global. | [Ver Documentação](./apps/shell/README.md)        |
| **Dashboard**    | Exibe o painel com informações financeiras do usuário.      | [Ver Documentação](./apps/dashboard/README.md)    |
| **Transactions** | Gerencia o cadastro, edição e listagem de transações.       | [Ver Documentação](./apps/transactions/README.md) |
| **Settings**     | Permite o gerenciamento da conta e preferências do usuário. | [Ver Documentação](./apps/settings/README.md)     |

---

## 📦 Tecnologias

- **Monorepo**: [Turborepo](https://turbo.build/)
- **Framework**: [Angular 20](https://angular.dev/)
- **Module Federation**: [@angular-architects/module-federation](https://github.com/angular-architects/module-federation)
- **Estilo**: [TailwindCSS](https://tailwindcss.com/)
- **API**: [GraphQL (Apollo Client)](https://www.apollographql.com/docs/angular/)
- **Contêineres**: [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- **Qualidade de Código**: ESLint, Prettier, Husky, lint-staged

---

## 🤖 Desenvolvimento com IA

Este projeto também foi desenvolvido como uma oportunidade de **aprendizado e aperfeiçoamento** no uso de ferramentas de Inteligência Artificial para desenvolvimento de software. Durante todo o processo, foram utilizadas tecnologias de IA generativa para acelerar o desenvolvimento e melhorar a qualidade do código.

### 🛠️ Ferramentas de IA Utilizadas

- **[Cursor](https://cursor.sh/)**: IDE com Inteligência Artificial que sugere códigos de forma inteligente e oferece assistência contextual em tempo real, facilitando e acelerando o desenvolvimento.
- **[GitHub Copilot](https://github.com/features/copilot)**: Ferramenta de IA que auxilia na programação, fornecendo sugestões automáticas de código e agentes inteligentes para resolver tarefas de desenvolvimento de maneira mais eficiente.

### 📁 Configurações de IA

O projeto inclui configurações específicas para otimizar o uso das ferramentas de IA:

- **`.cursor/`**: Contém configurações e prompts personalizados para o Cursor, incluindo regras de desenvolvimento e padrões de código específicos do projeto
- **`.github/`**: Inclui workflows e configurações que aproveitam recursos de IA do GitHub, como sugestões de código e análise automática

### 🎯 Engenharia de Prompt

Uma parte fundamental do desenvolvimento foi a **engenharia de prompt** - a prática de criar e refinar prompts específicos para obter os melhores resultados das ferramentas de IA. Isso incluiu:

- Definição de prompts estruturados para geração de componentes Angular
- Criação de templates de prompt para diferentes tipos de funcionalidades
- Refinamento contínuo baseado nos resultados obtidos
- Documentação de prompts eficazes para reutilização futura

Esta abordagem permitiu maximizar a produtividade e manter a consistência do código ao longo do desenvolvimento do projeto.

---

## 📁 Estrutura do Monorepo

O projeto é organizado em duas pastas principais: `apps` para as aplicações executáveis e `packages` para código compartilhado.

```
bytebank-pro/
├── apps/
│   ├── shell/          # Aplicação hospedeira (Container)
│   ├── dashboard/      # MFE de Dashboard
│   ├── transactions/   # MFE de Transações
│   └── settings/       # MFE de Configurações
└── packages/
    ├── ui/             # Biblioteca de componentes Angular
    ├── types/          # Definições de tipos TypeScript
    ├── utils/          # Funções utilitárias compartilhadas
    ├── shared-assets/  # Assets (ícones, logos, ilustrações)
    ├── eslint-config/  # Configurações de ESLint
    ├── typescript-config/ # Configurações de TypeScript
    └── shared-design-tokens/ # Design tokens (cores, fontes)
```

---

## 📦 Packages Compartilhados

Os `packages` garantem a consistência e reutilização de código em todo o projeto.

| Pacote                                   | Descrição                                                                 | Readme                                                        |
| :--------------------------------------- | :------------------------------------------------------------------------ | :------------------------------------------------------------ |
| **`@bytebank-pro/ui`**                   | Biblioteca de componentes Angular (standalone) para a UI.                 | [Ver Documentação](./packages/ui/README.md)                   |
| **`@bytebank-pro/types`**                | Define as interfaces e tipos TypeScript compartilhados.                   | [Ver Documentação](./packages/types/README.md)                |
| **`@bytebank-pro/utils`**                | Oferece funções utilitárias comuns (formatação, validação).               | [Ver Documentação](./packages/utils/README.md)                |
| **`@bytebank-pro/shared-assets`**        | Armazena assets compartilhados como logos, ícones e ilustrações.          | [Ver Documentação](./packages/shared-assets/README.md)        |
| **`@bytebank-pro/shared-design-tokens`** | Centraliza os design tokens (cores, tipografia) para consistência visual. | [Ver Documentação](./packages/shared-design-tokens/README.md) |
| **`@bytebank-pro/eslint-config`**        | Disponibiliza configurações padronizadas do ESLint.                       | [Ver Documentação](./packages/eslint-config/README.md)        |
| **`@bytebank-pro/typescript-config`**    | Fornece configurações base do TypeScript (`tsconfig.json`).               | [Ver Documentação](./packages/typescript-config/README.md)    |

---

## 🛠️ Qualidade de Código

O projeto utiliza um conjunto de ferramentas para garantir a consistência e a qualidade do código. **Prettier** e **ESLint** são executados automaticamente antes de cada commit com **Husky** e **lint-staged** para formatar e analisar os arquivos, prevenindo a introdução de erros e inconsistências.

---

## 🔌 Comunicação entre Microfrontends

A comunicação é feita através de duas estratégias principais:

1.  **Module Federation**: Para carregar os microfrontends dinamicamente.
2.  **Custom Events**: Para notificar o Shell e outros MFEs sobre eventos importantes (ex: `transactionCreated`).

---

## 🐳 Desenvolvimento com Docker

O ambiente de desenvolvimento é gerenciado com **Docker Compose**, que orquestra a API GraphQL e o banco de dados MongoDB.

Para subir o ambiente da API, execute:

```bash
npm run dev:api
```

---

## 🚀 Instruções de Desenvolvimento

1.  **Instale as dependências:**

    ```bash
    npm install
    ```

2.  **Inicie o ambiente completo (API + MFEs):**

    ```bash
    npm run dev
    ```

3.  **Para iniciar apenas os microfrontends:**

    ```bash
    npm run dev:front
    ```

4.  **Para parar o ambiente Docker:**

    ```bash
    npm run dev:stop
    ```

---

## 🔗 Links Úteis

- **API GraphQL**: A API está disponível em um [repositório separado](https://github.com/Brendhon/bytebank-api) e pode ser acessada via [Render](https://bytebank-api.onrender.com/graphql).
- **Deploy**: As aplicações (Shell e MFEs) são implantadas individualmente na [Render](https://render.com/).

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)
