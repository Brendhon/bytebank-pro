# 💻 Bytebank Pro – Microfrontends

[![Render](https://img.shields.io/badge/Render-API-blue?style=for-the-badge&logo=render&logoColor=white)](https://bytebank-api.onrender.com/graphql)

Este repositório contém a estrutura completa dos **microfrontends do Bytebank Pro**, criados como parte do Tech Challenge (Fase 2) da pós-graduação em Engenharia de Front-end (FIAP). Utilizando **Turborepo**, o projeto é dividido em aplicações independentes para melhor escalabilidade, manutenção e desempenho, todas desenvolvidas em **Angular**.

---

## ✨ Visão Geral

| App                   | Framework | Descrição                                                                                         | Readme                                            |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Shell**             | Angular   | App principal (container) responsável pela orquestração dos microfrontends via Module Federation. | [Shell App](./apps/shell/README.md)               |
| **Dashboard MFE**     | Angular   | Painel inicial com gráficos e informações financeiras do usuário.                                 | [Dashboard MFE](./apps/dashboard/README.md)       |
| **Transações MFE**    | Angular   | Cadastro, edição e listagem de transações.                                                        | [Transactions MFE](./apps/transactions/README.md) |
| **Configurações MFE** | Angular   | Tela de preferências e gerenciamento de conta.                                                    | [Settings MFE](./apps/settings/README.md)         |

---

## 📦 Tecnologias Globais

- [Turborepo](https://turbo.build/) – Orquestração de monorepo
- [Angular 20](https://angular.dev/) – Framework principal para todos os apps
- [@angular-architects/module-federation](https://github.com/angular-architects/module-federation) – Carregamento remoto dos MFEs
- [TailwindCSS](https://tailwindcss.com/) – Estilização em todos os apps
- [TypeScript](https://www.typescriptlang.org/) – Tipagem em todos os projetos
- [GraphQL (Apollo Client Angular)](https://www.apollographql.com/docs/angular/) – Comunicação com a API
- [Docker](https://www.docker.com/) – Desenvolvimento local com Docker Compose
- [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/) – Padrão de código
- [Husky](https://typicode.github.io/husky/) + lint-staged – Garantia de qualidade nos commits

---

## 📁 Estrutura de Pastas

```
bytebank-pro/
├── apps/
│   ├── shell/               \# Angular Shell App
│   ├── dashboard/           \# Angular MFE - Dashboard
│   ├── transactions/        \# Angular MFE - Transações
│   └── settings/            \# Angular MFE - Configurações
│
├── packages/
│   └── shared-design-tokens/  \# Tokens de design reutilizáveis (cores, spacing, fontes)
│   └── ui/                    \# Biblioteca de componentes compartilhados (ex: Botões, Inputs)
│
├── .gitignore
├── turbo.json
├── package.json
└── tsconfig.base.json

```

---

## 🎨 Design Tokens Compartilhados

Pasta: `packages/shared-design-tokens`

Inclui:

- `colors.ts`
- `typography.ts`
- `tailwind.tokens.ts` → usado nos `tailwind.config.js` de todos os apps

---

## 🔌 Comunicação entre Microfrontends

### Estratégias utilizadas:

- **Module Federation** com `@angular-architects/module-federation`
- **CustomEvent** (ex: `userUpdated`, `transactionCreated`) para eventos locais
- **Query Params na URL** para sincronização de estado (ex: filtros, navegação)

---

## 🔐 Autenticação

- Implementada via **JWT**, armazenado no localStorage/sessionStorage
- O Shell Angular gerencia o login e compartilha o token com os MFEs via headers
- Cada MFE faz chamadas GraphQL à API via Apollo Client com token no `Authorization`

---

## 🧪 Validação e Padrões de Código

- **Prettier**: formatação automática
- **ESLint**: linting com regras adaptadas para Angular
- **EditorConfig**: para padronizar indentação e finais de linha
- **Angular Reactive Forms** (nos MFEs Angular) para formulários

---

## 🐳 Desenvolvimento com Docker Compose

Arquivo: `docker-compose.yml` (fora dos apps)

```bash
docker compose up
```

Isso sobe:

- Shell Angular
- Todos os MFEs Angular

## API GraphQL (separada, em outro repositório)

Este repositório não contém a API GraphQL, que deve ser gerenciada separadamente. A API é responsável por:

- Autenticação
- Gerenciamento de usuários
- Gerenciamento de transações
- Geração de relatórios financeiros

Acesse as informações da API no repositório [bytebank-api](https://github.com/Brendhon/bytebank-api).

Para rodar a API localmente, siga as instruções no README dela.

---

## 🚀 Deploy

### Produção:

| Parte | Plataforma      | Forma de Deploy               |
| ----- | --------------- | ----------------------------- |
| Shell | Render          | Deploy via Git                |
| MFEs  | Render          | Deploy individual por app     |
| API   | Render (Docker) | Container rodando API GraphQL |

---

## 📄 Scripts Globais

Rodar tudo local com Turbo:

```bash
npm install
npm run dev
```

Rodar build completo:

```bash
npm run build
```

---

## 🧪 Testes

- Cada app pode conter seus próprios testes com Jest/Vitest.
- Padronize arquivos de teste com `.spec.ts`.

---

## 🧰 Regras e Boas Práticas

- **Rotas em inglês**, alinhadas com os tópicos dos `CustomEvent` (ex: `/transactions`, `/settings`)
- Use `Signals` + `Service` para estado em Angular (sem NgRx)
- Angular Lucide Icons para ícones
- Componentes seguem padrão com **Tailwind** em todos os apps

---

## 👥 Autor

**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
