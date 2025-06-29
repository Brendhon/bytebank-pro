# ⚙️ Settings MFE – Bytebank Pro

Este projeto é o **Configurações Microfrontend (MFE)** do Bytebank Pro, construído com **Angular 20** e estilizado com **Tailwind CSS**. Ele é responsável pelas funcionalidades de **gerenciamento de conta**, incluindo:

- Alteração de nome
- Troca de senha
- Exclusão de conta

Este microfrontend é carregado dinamicamente pelo Shell (Angular) via **Webpack Module Federation**, utilizando o padrão de rotas em **inglês**.

---

## 🚀 Stack Tecnológica

- **Angular 20**
- **@angular-architects/module-federation**
- **Tailwind CSS**
- **GraphQL (Apollo Client Angular)** – integração com a API
- **Angular Reactive Forms** – para formulários
- **Angular Signals + RxJS** – para controle de estado
- **CustomEvent** – para comunicação com o Shell (logout, userUpdated)
- **TypeScript**

---

## 🧩 Objetivos do MFE

- Ser carregado via rota `/settings` a partir do Shell
- Exibir e editar dados do usuário autenticado
- Enviar alterações para a API via GraphQL
- Emitir eventos (`userUpdated`, `userLoggedOut`) para o Shell
- Garantir padronização visual e técnica com os demais apps

---

## 📁 Estrutura de Pastas

```
settings/
├── src/
│   ├── app/
│   │   ├── components/         \# Formulários, botões
│   │   ├── services/           \# Apollo Client, data layer
│   │   ├── pages/              \# Edição de perfil, preferências, exclusão de conta
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

## 🔌 Integração com o Shell

- Expõe o MFE via **Module Federation**
- Carregado pela rota `/settings` no Shell Angular
- Usa `CustomEvent` para notificar o Shell:

  ```ts
  window.dispatchEvent(new CustomEvent('userUpdated', { detail: updatedUser }));
  ```

---

## 🔐 Autenticação

- O Shell fornece o JWT, armazenado em `localStorage`
- O Apollo Client Angular envia esse token via `Authorization` header para cada request.

---

## 📡 Integração com a API (GraphQL)

### Queries & Mutations usadas:

- `me`
- `updateUser(input)`
- `deleteUser`

---

## 📝 Formulários

- Usa **Angular Reactive Forms** para formulários

---

## 🎨 Estilo

- Estilizado com **Tailwind CSS**, configurado com tokens globais importados de `packages/shared-design-tokens`.
- Ícones com **Heroicons** (Angular via SVG) ou Lucide (se houver uma biblioteca Angular para ele)

---

## 🧪 Lint e Padrões

- ESLint com presets Angular + Tailwind
- Prettier para formatação automática
- Husky + lint-staged configurados no repositório global

---

## 📦 Estado

- Para controle de estado usaremos:
  - **RxJS**: Para estados complexos e reativos
  - **Signals**: Para estados simples e locais (ex: contadores, flags)

---

## 🐳 Desenvolvimento

### Instalar dependências:

```bash
npm install
```

### Rodar localmente:

```bash
npm run start
```

Disponível em: [http://localhost:4203](https://www.google.com/search?q=http://localhost:4203)

> ⚠️ Certifique-se de que o Shell está rodando para orquestrar a navegação.

---

## 🐳 Docker (local)

Este microfrontend participa do **Docker Compose** local configurado no monorepo. Use:

```bash
docker compose up
```

---

## 🚀 Deploy

- Pode ser deployado como Web App no **Render**
- O Shell consome este microfrontend pelo `remoteEntry.js` exposto

---

## ✅ Checklist de Padrões

- [x] Angular 20 e rotas em inglês (`/settings/...`)
- [x] Apollo Client + JWT
- [x] Formulários com Angular Reactive Forms
- [x] Comunicação com Shell via CustomEvent
- [x] Estilização com Tailwind (tokens globais)
- [x] Docker local com Docker Compose
- [x] Pronto para deploy no Render

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)
