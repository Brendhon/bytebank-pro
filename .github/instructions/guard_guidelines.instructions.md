---
applyTo: '**/*.guard.ts'
---

# 📋 Guia de Boas Práticas para Criação de Guards no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de guards no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### 🛡️ Guards

Guards devem ser colocados em uma pasta `guards` dentro do módulo ou recurso que eles protegem.

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-recurso/
    └── guards/
      ├── nome-do-guard.guard.ts
      └── nome-do-guard.guard.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `auth`)
  - **Arquivo**: `kebab-case.guard.{ext}` (ex: `auth.guard.ts`)
  - **Classe/Função**: `CanActivateFn`, `CanMatchFn`, etc. (ex: `AuthGuard`)

## 🏗️ Angular Modern Best Practices (Angular 20) para Guards

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.

2.  **Injeção de Dependências com `inject()` (Angular 14+)**: Para um código mais limpo e testável, utilize `inject()` em vez de construtores.

    ```typescript
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authGuard: CanActivateFn = (route, state) => {
      const authService = inject(AuthService);
      // ...
    };
    ```

3.  **Guards Baseados em Funções (Angular 15+)**: Prefira funções para Guards (`CanActivateFn`, `CanMatchFn`, `CanDeactivateFn`, `CanLoadFn`, `CanActivateChildFn`) para um código mais conciso e "treeshakeable".

    ```typescript
    // auth.guard.ts
    import { CanActivateFn, Router } from '@angular/router';
    import { inject } from '@angular/core';
    import { AuthService } from './auth.service';

    export const authGuard: CanActivateFn = (route, state) => {
      const authService = inject(AuthService);
      const router = inject(Router);

      if (authService.isAuthenticated()) {
        return true;
      } else {
        return router.createUrlTree(['/login']);
      }
    };
    ```

4.  **Lógica Clara e Concisa**: Mantenha a lógica do guard o mais simples e direta possível. Guards devem focar em uma única responsabilidade (ex: autenticação, autorização).

5.  **Retorno de Valores**: Guards podem retornar:

    - `boolean`: `true` para permitir a navegação, `false` para bloqueá-la.
    - `UrlTree`: Para redirecionar o usuário para outra URL.
    - `Observable<boolean | UrlTree>` ou `Promise<boolean | UrlTree>`: Para lógica assíncrona (ex: verificar autenticação em um serviço).

6.  **Gerenciamento de Erros**: Embora guards geralmente não lidem diretamente com erros de API (isso é responsabilidade dos serviços e interceptors), eles devem ser robustos o suficiente para lidar com estados inesperados dos dados que consultam.

## 📚 Exemplo Moderno

### Guard de Autenticação (Auth Guard)

```typescript
// auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redireciona para a página de login se não estiver autenticado
    return router.createUrlTree(['/login']);
  }
};
```
