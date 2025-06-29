# 🧩 Shell App – Bytebank Pro

Este projeto é o **Shell (container principal)** do Bytebank Pro. Desenvolvido em **Angular 20**, ele é responsável por:

- Orquestrar os microfrontends (`/dashboard`, `/transactions`, `/settings`) via **Module Federation**
- Gerenciar autenticação e estado do usuário
- Controlar a navegação principal da aplicação
- Carregar os MFEs dinamicamente com **rotas em inglês**
- Centralizar o layout base (header, sidebar, footer)

---

## 🚀 Stack Tecnológica

- **Angular 20**
- **@angular-architects/module-federation**
- **Tailwind CSS**
- **Angular Signals + RxJS** para controle de estado
- **CustomEvent** e URL Params para comunicação entre apps
- **JWT** para autenticação (armazenado em localStorage)
- **Apollo Client Angular** (para consumo de API GraphQL)

---

## 📁 Estrutura de Pastas

```
shell/
├── src/
│   ├── app/
│   │   ├── core/             \# Autenticação, serviços globais
│   │   ├── layout/           \# Header, Sidebar, Footer
│   │   ├── pages/            \# Login, 404, etc.
│   │   ├── mfe-loader/       \# Configuração dos remotes
│   │   ├── app.routes.ts     \# Roteamento principal
│   │   └── app.component.ts  \# App shell base
│   └── assets/
│
├── tailwind.config.js
├── module-federation.config.ts
├── webpack.config.js
├── angular.json
├── tsconfig.json
├── Dockerfile
└── README.md
```

---

## 📌 Roteamento

Todas as rotas do Shell seguem o padrão em **inglês**, por exemplo:

| Rota            | Responsável                 |
| --------------- | --------------------------- |
| `/login`        | Shell (rota própria)        |
| `/dashboard`    | MFE Angular (Dashboard)     |
| `/transactions` | MFE Angular (Transações)    |
| `/settings`     | MFE Angular (Configurações) |
| `/not-found`    | Shell (fallback)            |

---

## 🔗 Comunicação com os MFEs

### 1. **Module Federation**

- Usa o `@angular-architects/module-federation` para carregar os MFEs dinamicamente.
- Cada remote é definido em `module-federation.config.ts`.

```ts
remotes: {
  dashboard: "http://localhost:4201/remoteEntry.js",
  transactions: "http://localhost:4202/remoteEntry.js",
  settings: "http://localhost:4203/remoteEntry.js"
}
```

### 2\. **CustomEvent + URL**

- Emite e escuta eventos para comunicação entre MFEs e o Shell.
- Exemplo:

<!-- end list -->

```ts
const event = new CustomEvent('transactionCreated', { detail: {...} });
window.dispatchEvent(event);
```

---

## 🔐 Autenticação

- Login é feito no próprio Shell (`/login`) com envio de `email + senha` para a API GraphQL.
- O JWT retornado é armazenado em `localStorage` e enviado via headers nos MFEs.
- Guards e interceptors são usados para proteger rotas privadas.

---

## 🎨 Estilo com Tailwind

- Tailwind está configurado com tokens importados de `packages/shared-design-tokens`
- Padrão visual idêntico aos demais MFEs.

---

## 🧪 Validação e Lint

- ESLint com preset Angular
- Prettier para formatação
- Husky + lint-staged para garantir qualidade antes dos commits

---

## 🐳 Desenvolvimento

### 1\. Instalar dependências

```bash
npm install
```

### 2\. Rodar localmente

```bash
npm run start
```

- App disponível em: `http://localhost:4200`

---

## 🐳 Docker

> Docker é usado apenas no ambiente **local** para facilitar o desenvolvimento.

### Dockerfile

```dockerfile
# Dockerfile básico para Angular Shell
FROM node:22-alpine
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
CMD ["npx", "http-server", "dist/shell"]
```

---

## 🚀 Deploy

- O Shell pode ser deployado diretamente no **Render** como Web App estático.
- Produzido via `ng build` com `outputPath` configurado para `/dist/shell`.

---

## ✅ Checklist de padrões

- [x] Rotas em inglês
- [x] JWT + Guards
- [x] Comunicação com MFEs via CustomEvent e URL
- [x] Module Federation via `@angular-architects/module-federation`
- [x] Tailwind configurado com tokens compartilhados
- [x] Estado com Signals + RxJS
- [x] Docker local e build de produção funcional

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)
