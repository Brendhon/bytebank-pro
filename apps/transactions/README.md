# 💸 Transações MFE – Bytebank Pro

Este projeto é o **Transações Microfrontend** do Bytebank Pro, desenvolvido em **Angular 20**. Ele é responsável por:

- Listar o histórico de transações do usuário
- Criar, editar e excluir transações
- Aplicar filtros por tipo, data e categoria
- Enviar e consumir dados via **GraphQL**
- Emitir eventos via **CustomEvent** para o Shell

---

## 🚀 Stack Tecnológica

- **Angular 20**
- **@angular-architects/module-federation** para integração com o Shell Angular
- **Tailwind CSS** (com design tokens compartilhados)
- **GraphQL (Apollo Client Angular)** para comunicação com a API
- **Angular Reactive Forms** – para formulários mais complexos e **Angular Signals** para estados simples
- **Lucide Angular** para ícones
- **Angular Signals + RxJS** para controle de estado
- **CustomEvent** + URL Params para comunicação com o Shell
- **TypeScript**, ESLint, Prettier

---

## 📁 Estrutura de Pastas

```
transactions/
├── src/
│   ├── app/
│   │   ├── components/         \# Formulários, listas, filtros
│   │   ├── services/           \# Apollo Client, data layer
│   │   ├── pages/              \# Listagem, criação, edição
│   │   ├── app.routes.ts       \# Roteamento local
│   │   └── app.component.ts
│   └── assets/
│
├── tailwind.config.js
├── webpack.config.js
├── angular.json
├── tsconfig.json
└── README.md
```

---

## 🔌 Comunicação com a API (GraphQL)

Todas as operações são feitas via GraphQL com **Apollo Client Angular**. O JWT armazenado pelo Shell é enviado via `Authorization` no header das requisições.

### Queries

- `getTransactions(limit, page)`
- `getTransactionById(id)`

### Mutations

- `createTransaction(input)`
- `updateTransaction(input, id)`
- `deleteTransaction(id)`

---

## 🧩 Integração com o Shell

### Via Module Federation

Este microfrontend é exposto como `remote` via `@angular-architects/module-federation`. O Shell Angular carrega a rota `/transactions`.

```ts
// module-federation.config.ts
const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'transactions',
  exposes: {
    './Component': './src/app/app.Component.ts' // Componente principal do MFE
  }
});
```

---

## 🔁 Comunicação com o Shell

- Via **CustomEvent**, emitindo eventos como:

  ```ts
  window.dispatchEvent(new CustomEvent('transactionCreated', { detail: {...} }));
  ```

- Rotas e URLs seguem o padrão:

  - `/transactions`
  - `/transactions/new`
  - `/transactions/edit/:id`

---

## 🎨 Estilo

- Estilizado com **Tailwind CSS**
- Usa **tokens de design compartilhados** de `packages/shared-design-tokens`
- [Lucide Angular para ícones](https://lucide.dev/guide/packages/lucide-angular)

---

## 📑 Formulários

- **Angular Reactive Forms** – para formulários mais complexos e **Angular Signals** para estados simples

---

## 📦 Estado

- Para controle de estado usaremos:
  - **RxJS**: Para estados complexos e reativos
  - **Signals**: Para estados simples e locais (ex: contadores, flags)

---

## 🐳 Desenvolvimento

```bash
npm install
npm run start
```

A aplicação estará disponível em:

```
http://localhost:4202
```

> Certifique-se de que o Shell Angular está rodando e configurado para consumir esse remote.

---

## 🐳 Docker

Este microfrontend é incluído no `docker-compose.yml` do monorepo para rodar junto com os demais em desenvolvimento local.

---

## 🚀 Deploy

- Deploy individual via **Render**
- Exposição do `remoteEntry.js` para o Shell consumir

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)
