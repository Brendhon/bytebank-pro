# 🐚 Shell App – Bytebank Pro

Este projeto é o **Shell (container principal)** do Bytebank Pro. Desenvolvido em **Angular 20**, ele é responsável por orquestrar os microfrontends, gerenciar a autenticação, controlar a navegação e fornecer o layout base da aplicação.

---

## 📝 Sumário

- [🐚 Shell App – Bytebank Pro](#-shell-app--bytebank-pro)
  - [📝 Sumário](#-sumário)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
  - [📜 Scripts](#-scripts)
  - [🛠️ Qualidade de Código](#️-qualidade-de-código)
  - [🔗 Integração com os MFEs](#-integração-com-os-mfes)
  - [🔌 Comunicação com os MFEs](#-comunicação-com-os-mfes)
  - [🔐 Autenticação](#-autenticação)
  - [🎨 Estilo](#-estilo)
  - [🧪 Testes](#-testes)
  - [🚀 Deploy](#-deploy)
  - [🧰 Boas Práticas](#-boas-práticas)
  - [👥 Autor](#-autor)

---

## ✨ Visão Geral

| App       | Framework | Descrição                                                                   |
| :-------- | :-------- | :-------------------------------------------------------------------------- |
| **Shell** | Angular   | App principal (container) responsável pela orquestração dos microfrontends. |

---

## 📦 Tecnologias

- **Framework**: [Angular 20](https://angular.dev/)
- **Module Federation**: [@angular-architects/module-federation](https://github.com/angular-architects/module-federation)
- **Estilo**: [TailwindCSS](https://tailwindcss.com/)
- **Tipagem**: [TypeScript](https://www.typescriptlang.org/)
- **API**: [GraphQL (Apollo Client Angular)](https://www.apollographql.com/docs/angular/)
- **Contêineres**: [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)

---

## 📁 Estrutura de Pastas

```
shell/
├── src/
│   ├── app/
│   │   ├── core/             # Autenticação, serviços globais
│   │   ├── layout/           # Header, Sidebar, Footer
│   │   ├── pages/            # Login, 404, etc.
│   │   ├── app.routes.ts     # Roteamento principal
│   │   └── app.component.ts  # App shell base
│   └── assets/
│
├── tailwind.config.js
├── module-federation.config.ts
├── webpack.config.js
├── angular.json
├── tsconfig.json
└── README.md
```

---

## 🚀 Como Usar

1.  **Instalar dependências:**

    ```bash
    npm install
    ```

2.  **Iniciar o Shell (com os MFEs):**

    ```bash
    npm run start
    ```

    A aplicação estará disponível em `http://localhost:4200`.

3.  **Iniciar ambiente completo (com API):**

    ```bash
    npm run dev
    ```

---

## 📜 Scripts

- `npm run start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera o build de produção.
- `npm run test`: Executa os testes unitários.
- `npm run lint`: Analisa o código com ESLint.
- `npm run format`: Formata o código com Prettier.

---

## 🛠️ Qualidade de Código

- **ESLint**: Para análise estática e identificação de problemas.
- **Prettier**: Para formatação de código consistente.
- **Husky + lint-staged**: Para garantir a qualidade antes dos commits.

---

## 🔗 Integração com os MFEs

O Shell utiliza **Module Federation** para carregar os microfrontends dinamicamente com base nas rotas.

| Rota            | MFE Remoto Carregado |
| :-------------- | :------------------- |
| `/dashboard`    | Dashboard MFE        |
| `/transactions` | Transactions MFE     |
| `/settings`     | Settings MFE         |

---

## 🔌 Comunicação com os MFEs

- **CustomEvent**: O Shell escuta eventos globais (ex: `userUpdated`) para reagir a ações nos MFEs.
- **URL de Rota**: A navegação entre MFEs é gerenciada pelo roteador do Shell.

---

## 🔐 Autenticação

- O processo de login é gerenciado pelo Shell.
- O JWT é armazenado no `localStorage` e injetado nas requisições da API.
- Rotas protegidas utilizam Guards do Angular para garantir que o usuário esteja autenticado.

---

## 🎨 Estilo

- Estilizado com **Tailwind CSS**, usando os tokens de design compartilhados de `packages/shared-design-tokens`.
- Centraliza o layout principal (header, sidebar) para manter a consistência.

---

## 🧪 Testes

- Testes unitários com Karma e Jasmine.
- Arquivos de teste: `*.spec.ts`.

---

## 🚀 Deploy

- Deploy individual na **Vercel**.
- O build de produção é otimizado para servir como uma aplicação estática.

### URLs de Acesso

- **Desenvolvimento (Local):** `http://localhost:4200`
- **Produção (Vercel):** `https://bytebank-pro-shell.vercel.app`

### URLs da API

- **Desenvolvimento (Local):** `http://localhost:3000/graphql`
- **Produção (Render):** `https://bytebank-api.onrender.com/graphql`

---

## 🧰 Boas Práticas

- **Orquestração Centralizada**: O Shell é o único responsável por carregar e descarregar os MFEs.
- **Estado Global Mínimo**: Manter o estado compartilhado no Shell o mais simples possível.
- **Comunicação via Eventos**: Padronizar a comunicação entre o Shell e os MFEs com `CustomEvent`.

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)
