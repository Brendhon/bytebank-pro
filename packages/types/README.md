# 🔷 @bytebank-pro/types

Este pacote centraliza todas as definições de tipos TypeScript (interfaces, types, enums) para garantir consistência, segurança de tipos e reutilização de código em todo o monorepo Bytebank Pro.

---

## 📝 Sumário

- [🔷 @bytebank-pro/types](#-bytebank-protypes)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
    - [Convenções](#convenções)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Fornecer uma fonte única da verdade para os modelos de dados da aplicação, incluindo:

-   **Modelos da API**: Interfaces para usuários, transações, etc.
-   **Comunicação MFE**: Tipos para eventos e dados compartilhados entre microfrontends.
-   **Configurações**: Tipos para ambientes e configurações de build.

---

## 📁 Estrutura de Pastas

```
packages/types/src/
├── users.ts          # Interfaces de usuários e autenticação
├── transactions.ts   # Interfaces de transações financeiras
├── environment.ts    # Tipos para configurações de ambiente
├── mfe.ts            # Tipos para a arquitetura de microfrontends
└── index.ts          # Exportador principal
```

---

## 🚀 Como Usar

Importe os tipos necessários diretamente do pacote em qualquer aplicação ou biblioteca do monorepo.

```typescript
import { IUser, ITransaction } from '@bytebank-pro/types';

// Em um serviço Angular
@Injectable()
export class TransactionService {
  createTransaction(data: ITransaction): Observable<ITransaction> {
    // ...
  }
}

// Em um componente
export class ProfileComponent {
  @Input() user: IUser;
}
```

---

## 🛠️ Desenvolvimento

Para adicionar novos tipos, crie ou modifique os arquivos na pasta `src/` e exporte-os através do `index.ts`.

### Convenções

-   **Interfaces**: Use o prefixo `I` (ex: `IUser`).
-   **Types**: Use `PascalCase` (ex: `TransactionType`).
-   **Enums**: Use `PascalCase` (ex: `UserRole`).
-   **Arquivos**: Use `kebab-case` (ex: `user-settings.ts`).

---

## 🔗 Integração

Este pacote é uma dependência essencial para:

-   **Aplicações** (`apps/*`): Para tipar dados de componentes, serviços e comunicação com a API.
-   **`packages/ui`**: Para tipar as propriedades dos componentes.
-   **`packages/utils`**: Para garantir a segurança de tipos nas funções utilitárias.

---

## 📚 Referências

-   [TypeScript Handbook](https://www.typescriptlang.org/docs/)
-   [Angular Style Guide](https://angular.dev/style-guide)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)