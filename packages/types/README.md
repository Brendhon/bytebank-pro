# @bytebank-pro/types

🔷 **Definições de tipos TypeScript compartilhadas para o monorepo ByteBank Pro**

Este package centraliza todas as interfaces, types e definições de tipos TypeScript utilizadas em todo o monorepo, garantindo consistência e reutilização de código entre os microfrontends.

## 🎯 Objetivo

Fornecer definições de tipos centralizadas para:
- Modelos de dados da API (usuários, transações, etc.)
- Interfaces de comunicação entre microfrontends
- Configurações de ambiente
- Tipos específicos da arquitetura de microfrontends

## 📦 Estrutura

```
packages/types/src/
├── users.ts          # Interfaces de usuários
├── transactions.ts   # Interfaces de transações
├── environment.ts    # Tipos de configuração de ambiente
├── mfe.ts            # Tipos específicos de microfrontends
└── index.ts          # Exportações principais
```

## 🔷 Tipos Disponíveis

### Usuários (`users.ts`)

```typescript
interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  acceptPrivacy: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Transações (`transactions.ts`)
- `ITransaction` - Interface principal de transação
- `TransactionType` - Tipos de transação (receita/despesa)
- `TransactionCategory` - Categorias de transação
- `TransactionFilters` - Filtros para busca de transações

### Ambiente (`environment.ts`)
- `Environment` - Configurações de ambiente
- `ApiConfig` - Configurações da API
- `MfeConfig` - Configurações de microfrontends

### Microfrontends (`mfe.ts`)
- `MfeEventData` - Tipos de dados para eventos entre MFEs
- `MfeRoutes` - Definições de rotas dos microfrontends
- `MfeManifest` - Manifest de configuração de MFEs

## 🚀 Como Usar

### Instalação

O package já está disponível em todo o monorepo via workspace:

```bash
npm install @bytebank-pro/types
```

### Importação

```typescript
// Importações específicas
import { IUser, ITransaction } from '@bytebank-pro/types';

// Importação geral
import * as ByteBankTypes from '@bytebank-pro/types';

// Usando os tipos
const user: IUser = {
  name: 'João Silva',
  email: 'joao@bytebank.com',
  password: 'senha123',
  acceptPrivacy: true
};
```

### Em Componentes Angular

```typescript
import { Component } from '@angular/core';
import { IUser, ITransaction } from '@bytebank-pro/types';

@Component({
  selector: 'app-dashboard',
  template: '...'
})
export class DashboardComponent {
  user: IUser | null = null;
  transactions: ITransaction[] = [];
}
```

### Em Serviços

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, ITransaction } from '@bytebank-pro/types';

@Injectable()
export class UserService {
  getUser(id: string): Observable<IUser> {
    // implementação
  }
  
  getUserTransactions(userId: string): Observable<ITransaction[]> {
    // implementação
  }
}
```

## 🛠️ Scripts Disponíveis

```bash
# Build dos tipos
npm run build

# Desenvolvimento com watch
npm run dev

# Limpeza dos arquivos gerados
npm run clean
```

## 📝 Desenvolvimento

### Adicionando Novos Tipos

1. **Crie o arquivo** na pasta `src/` com o nome descritivo
2. **Defina as interfaces** seguindo os padrões existentes
3. **Exporte no index.ts**:

```typescript
// src/index.ts
export * from './users';
export * from './transactions';
export * from './nova-funcionalidade'; // Nova exportação
```

### Convenções

- **Interfaces**: Prefixo `I` (ex: `IUser`, `ITransaction`)
- **Types**: PascalCase (ex: `TransactionType`)
- **Enums**: PascalCase (ex: `UserRole`)
- **Arquivos**: kebab-case (ex: `user-settings.ts`)

### Estrutura dos Tipos

```typescript
// Exemplo de estrutura completa
export interface IExemplo {
  id: string;
  name: string;
  optional?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export type ExemploStatus = 'active' | 'inactive' | 'pending';

export enum ExemploType {
  TYPE_A = 'type_a',
  TYPE_B = 'type_b'
}
```

## 🔄 Versionamento

Este package segue o versionamento semântico:
- **Major**: Mudanças que quebram compatibilidade
- **Minor**: Adição de novos tipos sem quebrar existentes
- **Patch**: Correções e melhorias nos tipos existentes

## 🔗 Integração com Outros Packages

Este package é utilizado por:
- **Apps Angular** (`shell`, `dashboard`, `transactions`, `settings`)
- **Package UI** (`@bytebank-pro/ui`)
- **Bibliotecas de serviços** em cada microfrontend

## 📚 Referências

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Best Practices](https://typescript-eslint.io/rules/)
- [Angular TypeScript Guidelines](https://angular.dev/style-guide)
