---
applyTo: '**/*.interceptor.ts'
---

# 📋 Guia de Boas Práticas para Criação de Interceptors no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de interceptors no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### ⚙️ Interceptors

Interceptors devem ser colocados em uma pasta `interceptors` na raiz da sua feature ou na pasta `core` se forem de uso global.

- **Estrutura Padrão:**
  ```
  src/
  └── core/
    └── interceptors/
      ├── nome-do-interceptor.interceptor.ts
      └── nome-do-interceptor.interceptor.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `auth`)
  - **Arquivo**: `kebab-case.interceptor.{ext}` (ex: `auth.interceptor.ts`)
  - **Classe/Função**: `HttpInterceptorFn` (ex: `AuthInterceptor`)

## 🏗️ Angular Modern Best Practices (Angular 20) para Interceptors

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.

2.  **Injeção de Dependências com `inject()` (Angular 14+)**: Para um código mais limpo e testável, utilize `inject()` em vez de construtores.

    ```typescript
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authInterceptor: HttpInterceptorFn = (req, next) => {
      const authService = inject(AuthService);
      // ...
    };
    ```

3.  **Interceptors Baseados em Funções (Angular 15+)**: Prefira funções para Interceptors (`HttpInterceptorFn`) para um código mais conciso e "treeshakeable". Esta é a forma recomendada a partir do Angular 15.

    ```typescript
    // auth.interceptor.ts
    import { HttpInterceptorFn } from '@angular/common/http';
    import { inject } from '@angular/core';
    import { AuthService } from '../services/auth.service';

    export const authInterceptor: HttpInterceptorFn = (req, next) => {
      const authService = inject(AuthService);
      const authToken = authService.getAuthToken(); // Exemplo: Obter token de autenticação

      // Clona a requisição e adiciona o cabeçalho Authorization
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });

      // Passa a requisição modificada para o próximo manipulador
      return next(authReq);
    };
    ```

4.  **Imutabilidade da Requisição**: Requisições (`HttpRequest`) são imutáveis. Para modificá-las (ex: adicionar cabeçalhos, alterar URL), você deve cloná-las usando `req.clone()`.

    ```typescript
    const modifiedReq = req.clone({
      setHeaders: {
        'X-Custom-Header': 'Value'
      },
      url: 'nova-url'
    });
    return next(modifiedReq);
    ```

5.  **Manipulação de Respostas**: Interceptors também podem interceptar e modificar respostas, ou lidar com erros de resposta usando operadores RxJS.

    ```typescript
    // error.interceptor.ts
    import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
    import { catchError } from 'rxjs/operators';
    import { throwError } from 'rxjs';
    import { inject } from '@angular/core';
    import { NotificationService } from '../services/notification.service'; // Exemplo de serviço

    export const errorInterceptor: HttpInterceptorFn = (req, next) => {
      const notificationService = inject(NotificationService);

      return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Lógica para 401 (Não Autorizado)
            notificationService.showError('Sessão expirada. Por favor, faça login novamente.');
            // Redirecionar para login, se necessário
          } else if (error.status === 404) {
            notificationService.showError('Recurso não encontrado.');
          } else {
            notificationService.showError('Ocorreu um erro inesperado. Tente novamente.');
          }
          return throwError(() => error); // Propaga o erro para o subscriber original
        })
      );
    };
    ```

6.  **Ordem dos Interceptors**: A ordem em que os interceptors são providos no seu `app.config.ts` (ou `app.module.ts` em projetos não standalone) é crucial. Interceptors são executados na ordem em que são registrados.

    ```typescript
    // app.config.ts (Exemplo de registro de interceptors)
    import { ApplicationConfig } from '@angular/core';
    import { provideRouter } from '@angular/router';
    import { provideHttpClient, withInterceptors } from '@angular/common/http';

    import { routes } from './app.routes';
    import { authInterceptor } from './core/interceptors/auth.interceptor';
    import { errorInterceptor } from './core/interceptors/error.interceptor';
    import { loadingInterceptor } from './core/interceptors/loading.interceptor'; // Exemplo

    export const appConfig: ApplicationConfig = {
      providers: [
        provideRouter(routes),
        provideHttpClient(
          withInterceptors([
            authInterceptor, // Executa primeiro (adiciona token)
            loadingInterceptor, // Executa segundo (mostra/esconde loading)
            errorInterceptor // Executa por último (trata erros)
          ])
        )
      ]
    };
    ```

7.  **Single Responsibility Principle (SRP)**: Cada interceptor deve ter uma única responsabilidade (ex: um para autenticação, um para tratamento de erros, um para indicadores de loading).

## 📚 Exemplos Modernos

### Interceptor de Autenticação (Auth Interceptor)

```typescript
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Assumindo que você tem um AuthService

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const authToken = authService.getAuthToken(); // Método no AuthService para obter o token

  // Se houver um token, adiciona-o ao cabeçalho da requisição
  if (authToken) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
    return next(authReq);
  }

  // Caso contrário, apenas passa a requisição original
  return next(req);
};
```

### Interceptor de Erros (Error Interceptor)

```typescript
// error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service'; // Serviço para exibir notificações

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro inesperado.';

      if (error.error instanceof ErrorEvent) {
        // Erro do lado do cliente ou de rede
        errorMessage = `Erro: ${error.error.message}`;
      } else {
        // Erro retornado pelo backend
        switch (error.status) {
          case 400:
            errorMessage = 'Requisição inválida.';
            if (error.error?.message) {
              // Se a API retornar uma mensagem específica
              errorMessage = error.error.message;
            }
            break;
          case 401:
            errorMessage = 'Não autorizado. Por favor, faça login novamente.';
            router.navigate(['/login']); // Redireciona para a tela de login
            break;
          case 403:
            errorMessage = 'Acesso proibido.';
            break;
          case 404:
            errorMessage = 'Recurso não encontrado.';
            break;
          case 500:
            errorMessage = 'Erro interno do servidor. Tente novamente mais tarde.';
            break;
          default:
            if (error.message) {
              errorMessage = `Erro no servidor: ${error.message}`;
            }
            break;
        }
      }

      console.error(error); // Loga o erro completo para depuração
      notificationService.showError(errorMessage); // Exibe uma notificação amigável ao usuário

      return throwError(() => error); // Propaga o erro para o subscriber original
    })
  );
};
```
