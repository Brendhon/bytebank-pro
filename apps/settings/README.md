# ⚙️ Settings MFE – Bytebank Pro

Este projeto é o **Configurações Microfrontend (MFE)** do Bytebank Pro, construído com **Next.js 15 (App Router)** e estilizado com **Tailwind CSS**. Ele é responsável pelas funcionalidades de **gerenciamento de conta**, incluindo:

* Alteração de nome
* Troca de senha
* Exclusão de conta

Este microfrontend é carregado dinamicamente pelo Shell (Angular) via **Webpack Module Federation**, utilizando o padrão de rotas em **inglês**.

---

## 🚀 Stack Tecnológica

* **Next.js 15 (App Router)**
* **React 18+**
* **Tailwind CSS**
* **GraphQL (Apollo Client)** – integração com a API
* **Zod + React Hook Form** – para validação de formulários
* **TypeScript**
* **CustomEvent** – para comunicação com o Shell (logout, userUpdated)

---

## 🧩 Objetivos do MFE

* Ser carregado via rota `/settings` a partir do Shell
* Exibir e editar dados do usuário autenticado
* Enviar alterações para a API via GraphQL
* Emitir eventos (`userUpdated`, `userLoggedOut`) para o Shell
* Garantir padronização visual e técnica com os demais apps

---

## 📁 Estrutura de Pastas

```
settings/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── profile/              # Página de edição de perfil
│   ├── preferences/          # Página de preferências
│   └── delete-account/       # Exclusão de conta
├── components/
│   ├── FormField.tsx
│   └── Button.tsx
├── lib/
│   ├── apolloClient.ts       # Apollo setup
│   └── validators/           # Zod schemas
├── tailwind.config.js
├── module-federation.config.js
├── webpack.config.js
├── tsconfig.json
└── README.md
```

---

## 🔌 Integração com o Shell

* Expõe o MFE via **Module Federation**
* Carregado pela rota `/settings` no Shell Angular
* Usa `CustomEvent` para notificar o Shell:

```tsx
window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
```

---

## 🔐 Autenticação

* O Shell fornece o JWT, armazenado em `localStorage`
* O Apollo Client envia esse token via `Authorization` header para cada request:

```ts
Authorization: Bearer <token>
```

---

## 📡 Integração com a API (GraphQL)

### Queries & Mutations usadas:

```graphql
query Query {
  me {
    email,
    name
  }
}

mutation UpdateUser($input: UserUpdateInput!) {
  updateUser(input: $input) {
    name,
    email,
  }
}

mutation Mutation {
  deleteUser
}
```

---

## 🧪 Validação de Formulários

* Usa `react-hook-form` com `zod` como schema resolver.
* Zod schemas organizados na pasta `/lib/validators`.

---

## 🎨 Estilo

* Estilizado com **Tailwind CSS**, configurado com tokens globais importados de `packages/shared-design-tokens`.
* Ícones com **Lucide React**

---

## 🧪 Lint e Padrões

* ESLint com presets React + Tailwind
* Prettier para formatação automática
* Husky + lint-staged configurados no repositório global

---

## 📦 Estado

* Zustand para estado global

---

## 🐳 Desenvolvimento

### Instalar dependências:

```bash
npm install
```

### Rodar localmente:

```bash
npm run dev
```

Disponível em: [http://localhost:4203](http://localhost:4203)

> ⚠️ Certifique-se de que o Shell está rodando para orquestrar a navegação.

---

## 🐳 Docker (local)

Este microfrontend participa do **Docker Compose** local configurado no monorepo. Use:

```bash
docker compose up
```

---

## 🚀 Deploy

* Pode ser deployado como Web App no **Render**
* O Shell consome este microfrontend pelo `remoteEntry.js` exposto

---

## ✅ Checklist de Padrões

* [x] Next.js App Router com rotas em inglês (`/settings/...`)
* [x] Apollo Client + JWT
* [x] Validação com Zod + React Hook Form
* [x] Comunicação com Shell via CustomEvent
* [x] Estilização com Tailwind (tokens globais)
* [x] Docker local com Docker Compose
* [x] Pronto para deploy no Render ou Vercel

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)