---
applyTo: '**/*.resolver.ts'
---

# 📋 Guia de Boas Práticas para Criação de Resolvers no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de resolvers no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### 🔄 Resolvers

Resolvers devem ser colocados em uma pasta `resolvers` dentro do módulo ou recurso onde são utilizados.

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-recurso/
    └── resolvers/
      ├── nome-do-resolver.resolver.ts
      └── nome-do-resolver.resolver.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `user-profile`)
  - **Arquivo**: `kebab-case.resolver.{ext}` (ex: `user-data.resolver.ts`)
  - **Classe/Função**: `ResolveFn` (ex: `UserDataResolver`)

## 🏗️ Angular Modern Best Practices (Angular 20) para Resolvers

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.

2.  **Injeção de Dependências com `inject()` (Angular 14+)**: Para um código mais limpo e testável, utilize `inject()` em vez de construtores.

    ```typescript
    import { inject } from '@angular/core';
    import { HttpClient } from '@angular/common/http';

    export class UserService {
      private http = inject(HttpClient);

      // ...
    }
    ```

3.  **Resolvers Baseados em Funções (Angular 15+)**: Prefira funções para Resolvers (`ResolveFn`) para um código mais conciso e "treeshakeable".

    ```typescript
    // user-data.resolver.ts
    import { ResolveFn } from '@angular/router';
    import { inject } from '@angular/core';
    import { UserService } from '../services/user.service';
    import { User } from '../models/user.model';
    import { Observable } from 'rxjs';

    export const userDataResolver: ResolveFn<User> = (route, state): Observable<User> => {
      const userService = inject(UserService);
      const userId = route.paramMap.get('id');
      return userService.getUser(userId!);
    };
    ```

4.  **Gerenciamento de Erros**: Implemente estratégias robustas de tratamento de erros em resolvers, especialmente para chamadas HTTP, utilizando operadores RxJS como `catchError` e `retry`.

    ```typescript
    import { catchError, retry } from 'rxjs/operators';
    import { throwError } from 'rxjs';

    // ...
    this.http
      .get<User>('/api/users/1')
      .pipe(
        retry(3), // Tenta 3 vezes em caso de erro
        catchError((error) => {
          console.error('Erro ao buscar usuário:', error);
          return throwError(() => new Error('Não foi possível carregar o usuário.'));
        })
      )
      .subscribe();
    ```

5.  **Tipagem Forte**: Sempre use tipagem forte (`interface`, `type`) para dados retornados por APIs ou manipulados em resolvers.

    ```typescript
    export interface Product {
      id: string;
      name: string;
      price: number;
    }
    // ...
    getProduct(id: string): Observable<Product> { /* ... */ }
    ```

## 📚 Exemplo Moderno

### Resolver de Dados do Usuário (User Data Resolver)

```typescript
// user-data.resolver.ts
import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';

export const userDataResolver: ResolveFn<User> = (route, state): Observable<User> => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id'); // Pega o ID da rota

  if (!userId) {
    // Lidar com o caso de ID ausente, talvez redirecionar ou lançar um erro
    throw new Error('User ID not provided in route parameters.');
  }

  return userService.getUser(userId);
};
```
