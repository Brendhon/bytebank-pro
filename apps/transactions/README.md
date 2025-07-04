# 💸 Transactions MFE – Bytebank Pro

Este projeto é o **Transações Microfrontend** do Bytebank Pro. Desenvolvido em **Angular 20**, é responsável por listar, criar, editar e excluir transações, além de aplicar filtros e consumir dados da API GraphQL.

Este microfrontend é carregado dinamicamente pelo Shell (Angular) através do **Webpack Module Federation**.

---

## 📝 Sumário

- [💸 Transactions MFE – Bytebank Pro](#-transactions-mfe--bytebank-pro)
  - [📝 Sumário](#-sumário)
  - [✨ Visão Geral](#-visão-geral)
  - [📦 Tecnologias](#-tecnologias)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
  - [📜 Scripts](#-scripts)
  - [🛠️ Qualidade de Código](#️-qualidade-de-código)
  - [🔗 Integração com o Shell](#-integração-com-o-shell)
  - [🔌 Comunicação com o Shell](#-comunicação-com-o-shell)
  - [📡 Comunicação com a API (GraphQL)](#-comunicação-com-a-api-graphql)
  - [🎨 Estilo](#-estilo)
  - [🧪 Testes](#-testes)
  - [🚀 Deploy](#-deploy)
  - [🧰 Boas Práticas](#-boas-práticas)
  - [👥 Autor](#-autor)

---

## ✨ Visão Geral

| App             | Framework | Descrição                                    |
| :-------------- | :-------- | :------------------------------------------- |
| **Transactions**| Angular   | Cadastro, edição e listagem de transações.   |

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
transactions/
├── src/
│   ├── app/
│   │   ├── components/         # Formulários, listas, filtros
│   │   ├── services/           # Apollo Client, data layer
│   │   ├── pages/              # Listagem, criação, edição
│   │   ├── app.routes.ts       # Roteamento local
│   │   └── app.component.ts
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

2.  **Iniciar o MFE (isoladamente):**

    ```bash
    npm run start
    ```

    A aplicação estará disponível em `http://localhost:4202`.

3.  **Iniciar ambiente completo (com Shell e API):**

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

## 🔗 Integração com o Shell

- Configurado como `remote` no Shell Angular.
- O `remoteEntry.js` é carregado via Module Federation.
- O Shell chama a rota `/transactions` para acionar o carregamento remoto.

---

## 🔌 Comunicação com o Shell

- **CustomEvent**: Para emitir eventos como `transactionCreated` ou `transactionUpdated`.
- **URL de Rota**: `/transactions` é a rota principal, com sub-rotas como `/transactions/new` e `/transactions/edit/:id`.

---

## 📡 Comunicação com a API (GraphQL)

- Utiliza **Apollo Client Angular** para executar queries e mutations.
- O JWT armazenado pelo Shell é enviado via `Authorization` no header das requisições.

---

## 🎨 Estilo

- Estilizado com **Tailwind CSS**, usando os tokens de design compartilhados de `packages/shared-design-tokens`.
- Ícones da biblioteca **Lucide Angular** para consistência visual.

---

## 🧪 Testes

- Testes unitários com Karma e Jasmine.
- Arquivos de teste: `*.spec.ts`.

---

## 🚀 Deploy

- Deploy individual na **Render**.
- O `remoteEntry.js` é acessado diretamente pelo Shell via URL pública.

---

## 🧰 Boas Práticas

- **Formulários Reativos**: Para validações e manipulação de dados complexos.
- **Gerenciamento de Estado**: Utilizar **Signals** para estados locais e **RxJS** para operações assíncronas complexas.
- **Rotas Claras**: Manter uma estrutura de rotas intuitiva e alinhada com as funcionalidades.

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)