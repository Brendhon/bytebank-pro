# ⚙️ @bytebank-pro/typescript-config

Este pacote fornece configurações TypeScript reutilizáveis e otimizadas para garantir consistência na compilação e nas regras de tipagem em todo o monorepo Bytebank Pro.

---

## 📝 Sumário

- [⚙️ @bytebank-pro/typescript-config](#️-bytebank-protypescript-config)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📦 Configurações Disponíveis](#-configurações-disponíveis)
  - [🚀 Como Usar](#-como-usar)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Centralizar as configurações do compilador TypeScript (`tsconfig.json`) para:

-   **Padronização**: Garantir que todos os projetos compilem com as mesmas regras.
-   **Manutenibilidade**: Facilitar a atualização das configurações em um único local.
-   **Otimização**: Fornecer configurações base otimizadas para diferentes tipos de projetos (Angular, bibliotecas, etc.).

---

## 📦 Configurações Disponíveis

-   **`base.json`**: Configuração fundamental com regras estritas, compartilhada por todos.
-   **`angular.json`**: Estende a `base.json` com otimizações específicas para aplicações Angular.
-   **`nextjs.json`**: Configuração preparada para futuros projetos Next.js.

---

## 🚀 Como Usar

No `tsconfig.json` do seu projeto, estenda a configuração apropriada:

**Para uma Aplicação Angular:**

```json
{
  "extends": "@bytebank-pro/typescript-config/angular.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**Para uma Biblioteca:**

```json
{
  "extends": "@bytebank-pro/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true
  }
}
```

---

## 🛠️ Desenvolvimento

Para adicionar uma nova configuração, crie um arquivo `.json`, estenda a configuração `base.json` e adicione as regras específicas. Documente o novo arquivo e seu propósito.

---

## 🔗 Integração

Este pacote é uma dependência de desenvolvimento em todas as **aplicações** (`apps/*`) e **pacotes** (`packages/*`), que estendem as configurações base para alinhar suas regras de compilação.

---

## 📚 Referências

-   [TypeScript `tsconfig.json`](https://www.typescriptlang.org/tsconfig)
-   [Angular Compiler Options](https://angular.dev/reference/configs/angular-compiler-options)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)