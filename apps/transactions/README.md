# 💸 Transações MFE – Bytebank Pro

Este projeto é o **Transações Microfrontend** do Bytebank Pro, desenvolvido em **React com Next.js 15 (App Router)**. Ele é responsável por:

* Listar o histórico de transações do usuário
* Criar, editar e excluir transações
* Aplicar filtros por tipo, data e categoria
* Enviar e consumir dados via **GraphQL**
* Emitir eventos via **CustomEvent** para o Shell

---

## 🚀 Stack Tecnológica

* **React 19 + Next.js 15 (App Router)**
* **Tailwind CSS** (com design tokens compartilhados)
* **GraphQL (Apollo Client)** para comunicação com a API
* **react-hook-form** + **zod** para validação de formulários
* **CustomEvent** + URL Params para comunicação com o Shell
* **Zustand** para estado global (opcional)
* **TypeScript**, ESLint, Prettier

---

## 📁 Estrutura de Pastas

```
transactions/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                      # Listagem de transações
│   ├── new/page.tsx                  # Criação
│   └── edit/[id]/page.tsx            # Edição
│
├── components/
│   ├── TransactionForm.tsx
│   ├── TransactionList.tsx
│   └── Filters.tsx
│
├── lib/
│   ├── apolloClient.ts               # Apollo Client instância
│   ├── graphql/                      # Queries e mutations
│   └── types.ts                      # Tipagens globais
│
├── styles/
│   └── globals.css
│
├── tailwind.config.js
├── module-federation.config.js
├── webpack.config.js
├── tsconfig.json
└── README.md
```

---

## 🔌 Comunicação com a API (GraphQL)

Todas as operações são feitas via GraphQL com **Apollo Client**.

### Queries

* `getTransactions(limit, page)`
  ```graphql
  query Query($limit: Int!, $page: Int!) {
    transactions(limit: $limit, page: $page) {
      items {,
        _id
        date
        alias
        type
        desc
        value
      }
      total
      page
      totalPages
      hasMore
      totalInPage
    }
  }
  ``` 
  
* `getTransactionById(id)`
  ```graphql
  query Transaction($transactionId: ID!) {
    transaction(id: $transactionId) {
      date
      alias
      type
      desc
      value
    }
  }
  ```

### Mutations

* `createTransaction(input)`
  ```graphql
    mutation CreateTransaction($input: TransactionInput!) {
      createTransaction(input: $input) {
        _id
      }
    }
  ```
* `updateTransaction(input, id)`
  ```graphql
  mutation UpdateTransaction($input: TransactionUpdateInput!, $updateTransactionId: ID!) {
    updateTransaction(input: $input, id: $updateTransactionId) {
      alias,
      date,
      desc,
      type,
      user,
      value
    }
  }
  ```

* `deleteTransaction(id)`
  ```graphql
  mutation DeleteTransaction($deleteTransactionId: ID!) {
    deleteTransaction(id: $deleteTransactionId)
  }
  ```

---

## 🧩 Integração com o Shell

### Via Module Federation

Este microfrontend é exposto como `remote` via `ModuleFederationPlugin`. O Shell Angular carrega a rota `/transactions`.

```js
// webpack.config.js
new ModuleFederationPlugin({
  name: 'transactions',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './app/page.tsx',
  },
  shared: ['react', 'react-dom'],
});
```

---

## 🔁 Comunicação com o Shell

* Via **CustomEvent**, emitindo eventos como:

  ```ts
  window.dispatchEvent(new CustomEvent('transactionCreated', { detail: {...} }));
  ```
* Rotas e URLs seguem o padrão:

  * `/transactions`
  * `/transactions/new`
  * `/transactions/edit/:id`

---

## 🎨 Estilo

* Estilizado com **Tailwind CSS**
* Usa **tokens de design compartilhados** de `packages/shared-design-tokens`
* Ícones via [Lucide](https://lucide.dev/)

---

## 📑 Validação de Formulários

* **react-hook-form** para controle de formulário
* **zod** + `@hookform/resolvers` para validação de schema

```ts
const schema = z.object({
  description: z.string().min(1),
  value: z.number().positive(),
});
```

---

## 📦 Estado

* Zustand para estado global
* Pode ser usado para armazenar filtros, transações carregadas, etc.

---

## 🐳 Desenvolvimento

```bash
npm install
npm run dev
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

* Deploy individual via **Render** (sem Docker)
* Exposição do `remoteEntry.js` para o Shell consumir

---

## ✅ Checklist de padrões

* [x] React + Next.js 15 com App Router
* [x] Tailwind CSS com tokens globais
* [x] Comunicação via GraphQL
* [x] Validação com zod + RHF
* [x] Comunicação com Shell por CustomEvent
* [x] Roteamento em inglês
* [x] Deploy individual por app (MFEs)

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)