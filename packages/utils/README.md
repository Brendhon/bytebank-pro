# 🔧 @bytebank-pro/utils

Este pacote centraliza funções utilitárias reutilizáveis para formatação de dados, validações e outras operações comuns, garantindo consistência e evitando duplicação de código em todo o monorepo Bytebank Pro.

---

## 📝 Sumário

- [🔧 @bytebank-pro/utils](#-bytebank-proutils)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
  - [🧪 Testes](#-testes)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Fornecer um conjunto de helpers puros e testados para tarefas como:

-   Formatação de datas e valores monetários.
-   Validações de tipos de dados.
-   Manipulação de objetos e arrays.

---

## 📁 Estrutura de Pastas

```
packages/utils/
├── index.ts          # Funções utilitárias e exportações
├── index.spec.ts     # Testes unitários para as funções
└── package.json
```

---

## 🚀 Como Usar

Importe as funções necessárias diretamente do pacote.

```typescript
import { formatCurrency, formatDateToLong } from '@bytebank-pro/utils';

const valorFormatado = formatCurrency(1234.56); // "R$ 1.234,56"
const dataFormatada = formatDateToLong(new Date()); // "sexta-feira, 04 de julho de 2025"
```

---

## 🧪 Testes

O pacote possui cobertura de testes unitários para todas as funções. Para executar os testes, utilize:

```bash
npm test # Executa os testes uma vez
npm run test:watch # Executa em modo de observação
```

---

## 🛠️ Desenvolvimento

Para adicionar novas funções, implemente a lógica em `index.ts`, adicione os testes correspondentes em `index.spec.ts` e exporte a nova função.

---

## 🔗 Integração

Este pacote é uma dependência em todas as **aplicações** (`apps/*`) e outros **pacotes** (`packages/*`) que necessitam de funções auxiliares, promovendo a reutilização e a padronização da lógica de negócio.

---

## 📚 Referências

-   [Jest](https://jestjs.io/)
-   [date-fns](https://date-fns.org/)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)