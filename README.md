# 💻 Bytebank Pro – Microfrontends

[![Render](https://img.shields.io/badge/Render-API-blue?style=for-the-badge&logo=render&logoColor=white)](https://bytebank-api.onrender.com/graphql)

Este repositório reúne a estrutura dos **microfrontends do Bytebank Pro**, desenvolvidos como parte do Tech Challenge (Fase 2) da pós-graduação em Engenharia de Front-end (FIAP). O projeto utiliza **Turborepo** para organizar aplicações Angular independentes, promovendo escalabilidade, manutenção e desempenho.

---

## ✨ Visão Geral

| App                    | Framework | Descrição                                                                                          | Readme                                             |
| ---------------------- | --------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Shell**              | Angular   | App principal (container) responsável pela orquestração dos microfrontends via Module Federation.  | [Shell App](./apps/shell/README.md)                |
| **Dashboard MFE**      | Angular   | Painel inicial com gráficos e informações financeiras do usuário.                                  | [Dashboard MFE](./apps/dashboard/README.md)        |
| **Transações MFE**     | Angular   | Cadastro, edição e listagem de transações.                                                         | [Transactions MFE](./apps/transactions/README.md)  |
| **Configurações MFE**  | Angular   | Tela de preferências e gerenciamento de conta.                                                     | [Settings MFE](./apps/settings/README.md)          |

---

## 📦 Tecnologias

- **Monorepo:** [Turborepo](https://turbo.build/)
- **Framework:** [Angular 20](https://angular.dev/)
- **Module Federation:** [@angular-architects/module-federation](https://github.com/angular-architects/module-federation)
- **Estilo:** [TailwindCSS](https://tailwindcss.com/)
- **Tipagem:** [TypeScript](https://www.typescriptlang.org/)
- **API:** [GraphQL (Apollo Client Angular)](https://www.apollographql.com/docs/angular/)
- **Contêineres:** [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)
- **Qualidade:** [Prettier](https://prettier.io/), [ESLint](https://eslint.org/), [Husky](https://typicode.github.io/husky/), lint-staged, EditorConfig

---

## 📁 Estrutura de Pastas

```
bytebank-pro/
├── apps/
│   ├── shell/                # Angular Shell App
│   ├── dashboard/            # Angular MFE - Dashboard
│   ├── transactions/         # Angular MFE - Transações
│   └── settings/             # Angular MFE - Configurações
│
├── packages/
│   ├── shared-design-tokens/ # Tokens de design reutilizáveis
│   └── ui/                   # Componentes compartilhados
│
├── .gitignore
├── turbo.json
├── package.json
├── tsconfig.base.json
└── docker-compose.yml        # Configuração Docker Compose
```

---

## 🎨 Design Tokens Compartilhados

Local: `packages/shared-design-tokens`

Inclui arquivos como:

- `colors.ts`
- `typography.ts`
- `tailwind.tokens.ts` (usado nos `tailwind.config.js` dos apps)

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

## 🧪 Validação e Padrões de Código

- **Prettier:** formatação automática
- **ESLint:** linting adaptado para Angular
- **EditorConfig:** padronização de indentação e finais de linha
- **Angular Reactive Forms:** para formulários

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

| Comando             | Ambiente utilizado | Descrição                           |
|---------------------|-------------------|-------------------------------------|
| `npm run dev`       | Development       | Desenvolvimento com hot-reload      |
| `npm run start`     | Production        | Produção com otimizações ativadas   |
| `npm run build`     | Production        | Build otimizado para produção       |

---

## 🚀 Instruções de Desenvolvimento

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar ambiente completo (API, MongoDB e MFEs):**
   ```bash
   npm run dev
   ```

3. **Iniciar apenas API e MongoDB:**
   ```bash
   npm run dev:api
   ```

4. **Iniciar apenas microfrontends:**
   ```bash
   npm run dev:frontend
   ```

5. **Parar ambiente de desenvolvimento:**
   ```bash
   npm run dev:stop
   ```

6. **Gerar build completo:**
   ```bash
   npm run build
   ```

7. **Rodar em produção (apenas MFEs):**
   ```bash
   npm run start
   ```
   > **Nota:** Este comando executa os microfrontends em modo produção (usando `environment.ts`). A API deve estar rodando separadamente.

---

**Observações:**

- Os microfrontends dependem da API para funcionar corretamente.
- Lembre-se de parar o Docker após o desenvolvimento para liberar recursos.

---

## API GraphQL

A API GraphQL está em outro repositório e é responsável por autenticação, gerenciamento de usuários, transações e relatórios financeiros.

Veja: [bytebank-api](https://github.com/Brendhon/bytebank-api)

---

## 🚀 Deploy

| Parte  | Plataforma       | Forma de Deploy                |
| ------ | ---------------- | ------------------------------ |
| Shell  | Render           | Deploy via Git                 |
| MFEs   | Render           | Deploy individual por app      |
| API    | Render (Docker)  | Container rodando API GraphQL  |

---

## 🧪 Testes

- Cada app possui seus próprios testes (`.spec.ts`).

---

## 🧰 Boas Práticas

- **Rotas em inglês**, alinhadas com eventos (`/transactions`, `/settings`)
- Use `Signals` + `Service` para estado em Angular (sem NgRx)
- Ícones: Angular Lucide Icons
- Componentes padronizados com **Tailwind**

---

## 👥 Autor

**Brendhon Moreira**

[![Linkedin Badge](https://img.shields.io/badge/-Brendhon-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/brendhon-moreira)](https://www.linkedin.com/in/brendhon-moreira)
