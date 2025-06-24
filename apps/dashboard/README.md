# 📊 Dashboard MFE – Bytebank Pro

Este projeto é o **Dashboard Microfrontend** do Bytebank Pro. Desenvolvido em **Angular 20**, é responsável por exibir informações financeiras do usuário, como gráficos de transações, saldo geral, metas e alertas.

Este microfrontend é carregado dinamicamente pelo Shell (Angular) através do **Webpack Module Federation**.

---

## 🚀 Stack Tecnológica

- **Angular 20**
- **@angular-architects/module-federation**
- **Tailwind CSS**
- **Angular Signals** + Services (para estado global)
- **CustomEvent** e URL Params para comunicação entre apps
- **JWT** para autenticação (armazenado em localStorage)
- **Apollo Client** (opcional, caso o Shell consuma a API também)

---

## 🧩 Objetivos do MFE

- Exibir o saldo total do usuário
- Mostrar gráficos de entradas/saídas por categoria
- Ser carregado pelo Shell via rota `/dashboard`
- Utilizar dados reais via API GraphQL

---

## 📁 Estrutura de Pastas

```
dashboard/
├── src/
│   ├── app/
│   │   ├── components/         # Gráficos, cards, widgets
│   │   ├── services/           # Apollo Client, data layer
│   │   ├── pages/              # Página principal do dashboard
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

## 🔗 Integração com o Shell

- Configurado como `remote` no Shell Angular
- O `remoteEntry.js` é carregado via Module Federation
- Shell chama a rota `/dashboard` que aciona o carregamento remoto

---

### 📦 Exemplo do `module-federation.config.ts`

```ts
const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'dashboard',
  exposes: {
    './Component': './src/app/app.Component.ts'
  }
});
```

---

## 🔌 Comunicação com o Shell

### Estratégias:

- **CustomEvent** para emitir eventos como `dashboardUpdated`
- **URL de rota**: `/dashboard` é mapeada no Shell e usada para navegação

---

## 📡 Comunicação com a API (GraphQL)

- Utiliza **Apollo Client Angular** para executar queries como:

```graphql
query GetTransactionSummary {
  getTransactionSummary {
    balance
    breakdown {
      deposit
      transfer
      withdrawal
      payment
    }
  }
}
```

- O JWT armazenado pelo Shell é enviado via `Authorization` no header das requisições.

---

## 🎨 Estilo

- Estilizado com **Tailwind CSS**, usando os tokens de design compartilhados da pasta `packages/shared-design-tokens`
- Padrões visuais consistentes com os outros MFEs e com o Shell

---

## 🧪 Validação e Lint

- ESLint com preset Angular
- Prettier para formatação
- Husky + lint-staged integrados ao repositório global via Turborepo

---

## 🐳 Desenvolvimento Local

```bash
npm install
npm run start
```

A aplicação estará disponível em:

```bash
http://localhost:4201
```

> Certifique-se de que o Shell esteja rodando para consumir o módulo remotamente.

---

## 🐳 Docker (local)

Utilize o Docker Compose do monorepo para rodar o dashboard junto ao Shell, API e demais MFEs:

```bash
docker compose up
```

---

## 🚀 Deploy

- Deploy separado na **Render**
- O `remoteEntry.js` é acessado diretamente pelo Shell via URL pública

---

## ✅ Checklist de padrões

- [x] Angular 20 com Tailwind
- [x] Apollo Client para GraphQL
- [x] Rota única (`/dashboard`)
- [x] Comunicação com Shell via CustomEvent
- [x] JWT via header Authorization
- [x] Docker local via Docker Compose
- [x] Build pronto para deploy estático ou containerizado

---

## 👥 Autor

**Brendhon Moreira**
[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) • [GitHub](https://github.com/Brendhon)
