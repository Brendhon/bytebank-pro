# 💻 Bytebank Pro – Microfrontends

[![Render](https://img.shields.io/badge/Render-API-blue?style=for-the-badge&logo=render&logoColor=white)](https://bytebank-api.onrender.com/graphql)

Este repositório reúne a estrutura dos **microfrontends do Bytebank Pro**, desenvolvidos como parte do Tech Challenge (Fase 2) da pós-graduação em Engenharia de Front-end (FIAP). O projeto utiliza **Turborepo** para organizar aplicações Angular independentes, promovendo escalabilidade, manutenção e desempenho.

---

## 📝 Sumário

- [💻 Bytebank Pro – Microfrontends](#-bytebank-pro--microfrontends)
  - [📝 Sumário](#-sumário)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [📦 Packages Compartilhados](#-packages-compartilhados)
    - [🎨 Design Tokens (`packages/shared-design-tokens`)](#-design-tokens-packagesshared-design-tokens)
    - [🧩 UI Components (`packages/ui`)](#-ui-components-packagesui)
    - [🔷 Types (`packages/types`)](#-types-packagestypes)
    - [⚙️ TypeScript Config (`packages/typescript-config`)](#️-typescript-config-packagestypescript-config)
    - [📋 ESLint Config (`packages/eslint-config`)](#-eslint-config-packageseslint-config)
    - [🎨 Shared Assets (`packages/shared-assets`)](#-shared-assets-packagesshared-assets)
    - [🔧 Utils (`packages/utils`)](#-utils-packagesutils)
  - [🛠️ Qualidade de Código e Padronização](#️-qualidade-de-código-e-padronização)
    - [Ferramentas Configuradas](#ferramentas-configuradas)
    - [Como Funciona](#como-funciona)
    - [Scripts Úteis](#scripts-úteis)
      - [Bypass (Não Recomendado)](#bypass-não-recomendado)
    - [Benefícios](#benefícios)
  - [🔌 Comunicação entre Microfrontends](#-comunicação-entre-microfrontends)
  - [🔐 Autenticação](#-autenticação)
  - [🐳 Desenvolvimento com Docker Compose](#-desenvolvimento-com-docker-compose)
  - [🌐 Ambientes](#-ambientes)
  - [🚀 Instruções de Desenvolvimento](#-instruções-de-desenvolvimento)
  - [API GraphQL](#api-graphql)
  - [🚀 Deploy](#-deploy)
  - [🧪 Testes](#-testes)
  - [🧰 Boas Práticas](#-boas-práticas)
  - [👥 Autor](#-autor)

---

## ✨ Visão Geral

| App                   | Framework | Descrição                                                                                         | Readme                                            |
| :-------------------- | :-------- | :------------------------------------------------------------------------------------------------ | :------------------------------------------------ |
| **Shell**             | Angular   | App principal (container) responsável pela orquestração dos microfrontends via Module Federation. | [Shell App](./apps/shell/README.md)               |
| **Dashboard MFE**     | Angular   | Painel inicial com gráficos e informações financeiras do usuário.                                 | [Dashboard MFE](./apps/dashboard/README.md)       |
| **Transações MFE**    | Angular   | Cadastro, edição e listagem de transações.                                                        | [Transactions MFE](./apps/transactions/README.md) |
| **Configurações MFE** | Angular   | Tela de preferências e gerenciamento de conta.                                                    | [Settings MFE](./apps/settings/README.md)         |

---

## 📦 Tecnologias

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Framework:** [Angular 20](https://angular.dev/)
- **Module Federation:** [@angular-architects/module-federation](https://github.com/angular-architects/module-federation)
- **Estilo:** [TailwindCSS](https://tailwindcss.com/)
- **Tipagem:** [TypeScript](https://www.typescriptlang.org/)
- **API:** [GraphQL (Apollo Client Angular)](https://www.apollographql.com/docs/angular/)
- **Contêineres:** [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- **Qualidade de Código:** [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/), lint-staged, EditorConfig
- **Acessibilidade:** Regras de acessibilidade com [@angular-eslint/template](https://www.npmjs.com/package/@angular-eslint/eslint-plugin-template).

---

## 📁 Estrutura de Pastas

```
bytebank-pro/
├── .husky/                  \# Ganchos Git (pre-commit, etc.) para qualidade de código
│   └── pre-commit
├── apps/                    \# Aplicações principais do monorepo (Microfrontends e Shell)
│   ├── dashboard/           \# Angular MFE - Dashboard
│   ├── settings/            \# Angular MFE - Configurações
│   ├── shell/               \# Angular Shell App (container principal)
│   └── transactions/        \# Angular MFE - Transações
├── docs/                    \# Documentação do projeto
├── packages/                \# Bibliotecas e pacotes reutilizáveis no monorepo
│   ├── eslint-config/       \# Configurações de ESLint compartilhadas
│   ├── shared-assets/       \# Assets compartilhados (logos, ícones, imagens)
│   ├── shared-design-tokens/\# Tokens de design reutilizáveis (cores, spacing, fontes)
│   ├── types/               \# Definições de tipos TypeScript compartilhadas
│   ├── typescript-config/   \# Configurações de TypeScript compartilhadas
│   └── ui/                  \# Biblioteca de componentes de UI compartilhados (ex: Botões, Inputs)
├── .editorconfig            \# Configurações de editor para padronização de código
├── .eslint.config.js        \# Configuração raiz do ESLint
├── .gitignore               \# Arquivos e pastas a serem ignorados pelo Git
├── .lintstagedrc.json       \# Configuração do lint-staged para executar lints em arquivos staged
├── .npmrc                   \# Configurações do NPM
├── .prettierignore          \# Arquivos e pastas a serem ignorados pelo Prettier
├── .prettierrc              \# Configuração do Prettier para formatação de código
├── docker-compose.yml       \# Configuração do Docker Compose para ambiente de desenvolvimento
├── package-lock.json        \# Registro das dependências exatas do projeto
├── package.json             \# Definição de pacotes e scripts do monorepo
├── README.md                \# Este arquivo
└── turbo.json               \# Configurações do pipeline do Turborepo
```

---

## 📦 Packages Compartilhados

O monorepo inclui vários packages para reutilização de código e padronização:

### 🎨 Design Tokens (`packages/shared-design-tokens`)

Centraliza todos os tokens de design do sistema:

- **`colors.ts`**: Paleta de cores da marca ByteBank
- **`typography.ts`**: Configurações tipográficas padronizadas
- **`tailwind.tokens.ts`**: Tokens exportados para uso com TailwindCSS
- **Uso**: Importado em todos os `tailwind.config.js` dos apps

[📖 Ver documentação completa](./packages/shared-design-tokens/README.md)

### 🧩 UI Components (`packages/ui`)

Biblioteca de componentes Angular reutilizáveis:

- **Standalone Components**: Componentes Angular 20+ standalone
- **TailwindCSS**: Integração com design tokens
- **Componentes**: Button (mais componentes em desenvolvimento)
- **Uso**: Importação granular nos microfrontends

[📖 Ver documentação completa](./packages/ui/README.md)

### 🔷 Types (`packages/types`)

Definições TypeScript compartilhadas:

- **`users.ts`**: Interfaces de usuários e autenticação
- **`transactions.ts`**: Tipos para transações financeiras
- **`environment.ts`**: Configurações de ambiente
- **`mfe.ts`**: Tipos específicos da arquitetura de microfrontends

[📖 Ver documentação completa](./packages/types/README.md)

### ⚙️ TypeScript Config (`packages/typescript-config`)

Configurações TypeScript padronizadas:

- **`base.json`**: Configuração fundamental compartilhada
- **`angular.json`**: Otimizações específicas para Angular
- **`nextjs.json`**: Para futuros projetos Next.js
- **Uso**: Extendido em todos os `tsconfig.json` do monorepo

[📖 Ver documentação completa](./packages/typescript-config/README.md)

### 📋 ESLint Config (`packages/eslint-config`)

Configurações ESLint centralizadas:

- **`angular.js`**: Regras específicas para projetos Angular
- **`library.js`**: Configurações para bibliotecas e packages
- **Uso**: Importado em todos os `eslint.config.js` do monorepo

[📖 Ver documentação completa](./packages/eslint-config/README.md)

### 🎨 Shared Assets (`packages/shared-assets`)

Biblioteca de assets compartilhados para todos os microfrontends:

- **`assets/logos/`**: Logos da marca ByteBank (SVG)
- **`assets/icons/`**: Ícones customizados e de ferramentas (SVG)
- **`assets/images/`**: Imagens funcionais (PNG) como dispositivos, estrelas, etc.
- **`assets/illustrations/`**: Ilustrações para telas e estados da aplicação (SVG)
- **`src/index.ts`**: Constantes e helpers para paths dos assets
- **Uso**: Importação granular com paths tipados e otimização de imagens

[📖 Ver documentação completa](./packages/shared-assets/README.md)

### 🔧 Utils (`packages/utils`)

Biblioteca de utilitários e helpers compartilhados

[📖 Ver documentação completa](./packages/utils/README.md)

---

## 🛠️ Qualidade de Código e Padronização

O projeto Bytebank Pro utiliza um conjunto de ferramentas para garantir a consistência, qualidade e padronização do código, facilitando a colaboração e minimizando erros.

### Ferramentas Configuradas

1.  **Prettier**: Ferramenta para formatação automática de código. Garante que todos os arquivos (TypeScript, JavaScript, JSON, Markdown, HTML, CSS/SCSS) sigam um estilo consistente, conforme definido em `.prettierrc`.
2.  **ESLint**: Realiza a análise estática do código para identificar e corrigir problemas, potenciais bugs e padrões de codificação não recomendados. As configurações são compartilhadas através de `packages/eslint-config`.
3.  **Husky**: Permite configurar hooks Git, executando scripts automaticamente em eventos como `pre-commit` e `pre-push`.
4.  **lint-staged**: Em conjunto com o Husky, executa as ferramentas de qualidade de código (Prettier e ESLint) apenas nos arquivos que foram modificados e adicionados ao _stage_ do Git, otimizando o processo. A configuração está em `.lintstagedrc.json`.
5.  **EditorConfig**: Garante configurações de editor/IDE consistentes (como indentação, quebra de linha) para todos os desenvolvedores, através do arquivo `.editorconfig`.

### Como Funciona

Antes de cada `git commit`, um _hook_ `pre-commit` é executado automaticamente:

1.  `lint-staged` atua nos arquivos modificados:
    - **Prettier** formata os arquivos relevantes.
    - **ESLint** analisa e corrige problemas de código.
    - As correções são automaticamente adicionadas ao commit (`git add`).
2.  Uma verificação de tipos (`npm run check-types`) é executada em todo o projeto para garantir a integridade da tipagem.

Se hierros críticos de lint ou tipagem forem encontrados, o commit é rejeitado, permitindo que o desenvolvedor revise e corrija os problemas antes de prosseguir.

### Scripts Úteis

Para gerenciar a qualidade de código manualmente, utilize os seguintes scripts NPM:

- `npm run format`: Formata todos os arquivos do projeto usando Prettier.
- `npm run format:check`: Verifica se todos os arquivos estão formatados corretamente, sem aplicar correções.
- `npm run lint`: Executa o ESLint em todos os arquivos para identificar problemas.
- `npm run lint:fix`: Executa o ESLint e tenta corrigir automaticamente os problemas encontrados.
- `npm run check-types`: Executa a verificação de tipos em todo o projeto.
- `npm run pre-commit`: Simula a execução do hook `pre-commit` manualmente.

#### Bypass (Não Recomendado)

Em situações de emergência, é possível pular os hooks do Git usando `git commit --no-verify -m "sua mensagem"`. **Este comando deve ser usado com extrema cautela**, pois o código não verificado pode introduzir problemas na base de código.

### Benefícios

- **Código Consistente**: Todos os desenvolvedores seguem os mesmos padrões de estilo e qualidade.
- **Menos Bugs**: Problemas e padrões não recomendados são identificados antes mesmo do commit.
- **Reviews Mais Focados**: Revisões de código podem se concentrar na lógica de negócio, e não em discussões de formatação.
- **Automação**: O processo é automático, integrado ao fluxo de trabalho Git.
- **Eficiência**: Processa apenas os arquivos modificados, garantindo rapidez.

---

## 🔌 Comunicação entre Microfrontends

- **Module Federation** com `@angular-architects/module-federation`
- **CustomEvent** (ex: `userUpdated`, `transactionCreated`) para eventos locais
- **Query Params na URL** para sincronização de estado

---

## 🔐 Autenticação

- JWT armazenado no localStorage/sessionStorage
- Shell gerencia login e compartilha token com MFEs via headers
- MFEs usam Apollo Client para chamadas GraphQL autenticadas

---

## 🐳 Desenvolvimento com Docker Compose

O projeto utiliza Docker Compose para subir a API e o MongoDB.

Arquivo: `docker-compose.yml`

```yaml
services:
  mongodb:
    image: mongo:latest
    ports:
      - '27017:27017'
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_DATABASE=bytebankdb

  api:
    image: brendhon/bytebank-api-graphql:latest
    ports:
      - '3000:3000'
    environment:
      - MONGO_URI=mongodb://mongodb:27017/bytebankdb
      - NODE_ENV=development
      - JWT_SECRET=bytebank-pro-jwt-secret-2025
      - PORT=3000
    depends_on:
      - mongodb
    restart: unless-stopped

volumes:
  mongodb_data:
```

---

## 🌐 Ambientes

Cada projeto Angular possui dois arquivos de ambiente:

- **`environment.ts`**: Configurações de produção
- **`environment.development.ts`**: Configurações de desenvolvimento

| Comando         | Ambiente utilizado | Descrição                         |
| :-------------- | :----------------- | :-------------------------------- |
| `npm run dev`   | Development        | Desenvolvimento com hot-reload    |
| `npm run start` | Production         | Produção com otimizações ativadas |
| `npm run build` | Production         | Build otimizado para produção     |

---

## 🚀 Instruções de Desenvolvimento

1.  **Instalar dependências:**

    ```bash
    npm install
    ```

2.  **Iniciar ambiente completo (API, MongoDB e MFEs):**

    ```bash
    npm run dev
    ```

3.  **Iniciar apenas API e MongoDB:**

    ```bash
    npm run dev:api
    ```

4.  **Iniciar apenas microfrontends:**

    ```bash
    npm run dev:front
    ```

5.  **Parar ambiente de desenvolvimento:**

    ```bash
    npm run dev:stop
    ```

6.  **Gerar build completo:**

    ```bash
    npm run build
    ```

7.  **Rodar em produção (apenas MFEs):**

    ```bash
    npm run start
    ```

    > **Nota:** Este comando executa os microfrontends em modo produção (usando `environment.ts`). A API deve estar rodando separadamente.

**Observações:**

- Os microfrontends dependem da API para funcionar corretamente.
- Lembre-se de parar o Docker após o desenvolvimento para liberar recursos.

---

## API GraphQL

A API GraphQL está em outro repositório e é responsável por autenticação, gerenciamento de usuários, transações e relatórios financeiros.

Veja: [bytebank-api](https://github.com/Brendhon/bytebank-api)

---

## 🚀 Deploy

| Parte | Plataforma | Forma de Deploy               |
| :---- | :--------- | :---------------------------- |
| Shell | Render     | Deploy via Git                |
| MFEs  | Render     | Deploy individual por app     |
| API   | Render     | Container rodando API GraphQL |

---

## 🧪 Testes

- Cada app possui seus próprios testes (`.spec.ts`).

---

## 🧰 Boas Práticas

- **Rotas em inglês**, alinhadas com eventos (`/transactions`, `/settings`)
- Para controle de estado usaremos:
  - **RxJS**: Para estados complexos e reativos
  - **Signals**: Para estados simples e locais (ex: contadores, flags)
- Ícones: Angular Lucide Icons
- Componentes padronizados com **Tailwind**

---

## 👥 Autor

**Brendhon Moreira**

[](https://www.linkedin.com/in/brendhon-moreira)
