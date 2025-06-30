---
applyTo: '**/*.service.ts'
---

# 📋 Guia de Boas Práticas para Criação de Serviços no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de serviços no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### 📦 Serviços (Services)

Serviços devem ser colocados em uma pasta `services` dentro do módulo ou recurso que eles atendem.

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-recurso/
    └── services/
      ├── nome-do-servico.service.ts
      └── nome-do-servico.service.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `user-management`)
  - **Arquivo**: `kebab-case.service.{ext}` (ex: `user.service.ts`)
  - **Classe**: `PascalCaseService` (ex: `UserService`)

## 🏗️ Angular Modern Best Practices (Angular 20) para Serviços

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

3.  **Gerenciamento de Estado em Serviços**:

    - **Para estados complexos e reativos (dados assíncronos, coleções de dados, estados globais/compartilhados)**: Utilize `Observables` (`BehaviorSubject`, `ReplaySubject`) do RxJS para garantir um fluxo de dados reativo e poderoso.

      ```typescript
      // user.service.ts
      import { Injectable, inject } from '@angular/core';
      import { HttpClient } from '@angular/common/http';
      import { BehaviorSubject, Observable, tap } from 'rxjs';
      import { User } from '../models/user.model';

      @Injectable({
        providedIn: 'root'
      })
      export class UserService {
        private http = inject(HttpClient);
        private _currentUser = new BehaviorSubject<User | null>(null);
        readonly currentUser$ = this._currentUser.asObservable(); // Expor como Observable público

        constructor() {
          // Carregar usuário ao inicializar o serviço, se necessário
          this.loadCurrentUser();
        }

        private loadCurrentUser(): void {
          // Exemplo: buscar usuário logado
          this.http
            .get<User>('/api/current-user')
            .pipe(tap((user) => this._currentUser.next(user)))
            .subscribe();
        }

        updateUser(user: User): Observable<User> {
          return this.http.put<User>(`/api/users/${user.id}`, user).pipe(
            tap((updatedUser) => this._currentUser.next(updatedUser)) // Atualiza o estado
          );
        }
      }
      ```

    - **Para estados locais simples, síncronos, ou de UI (ex: contador, flag booleana em um serviço pequeno)**: `Signals` podem ser utilizados para concisão e reatividade fina. **Evite usar Signals para dados assíncronos que precisam de transformações complexas do RxJS.**

      ```typescript
      // counter.service.ts
      import { Injectable, signal, computed } from '@angular/core';

      @Injectable({
        providedIn: 'root'
      })
      export class CounterService {
        count = signal(0);
        doubleCount = computed(() => this.count() * 2);

        increment(): void {
          this.count.update((value) => value + 1);
        }

        decrement(): void {
          this.count.update((value) => value - 1);
        }
      }
      ```

    - **Diretrizes de Escolha de Estado**:
      - **Use Observables**: Quando a origem dos dados é assíncrona (HTTP, WebSockets), para transformações complexas de dados (map, filter, debounce), para operações encadeadas ou para gerenciar um fluxo contínuo de eventos. Eles são ideais para a maioria dos dados de negócio.
      - **Use Signals**: Para dados síncronos simples, estado de UI local que não requer a orquestração do RxJS, ou quando a reatividade granular do Angular Signals é estritamente necessária para otimização de performance em cenários específicos. **Não os utilize para substituir a gestão robusta de fluxos de dados que o RxJS oferece.**

4.  **Serviços `providedIn: 'root'`**: Sempre que possível, declare serviços com `providedIn: 'root'` para que sejam _singleton_ e _tree-shakable_. Isso reduz o tamanho do _bundle_ final da aplicação.
    ```typescript
    @Injectable({
      providedIn: 'root'
    })
    export class MyService {
      /* ... */
    }
    ```
5.  **Gerenciamento de Erros**: Implemente estratégias robustas de tratamento de erros em serviços, especialmente para chamadas HTTP, utilizando operadores RxJS como `catchError` e `retry`.

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

6.  **Limpeza de Subscrições (Cleanup)**: Em serviços com lógica que cria subscrições (ex: Observables de WebSockets, timers), utilize `takeUntilDestroyed` (se o serviço for injetado em um contexto com `DestroyRef`) ou gerencie subscrições manualmente com `Subscription.add()` e `Subscription.unsubscribe()` no `ngOnDestroy`.

    ```typescript
    import { Injectable, DestroyRef, inject, OnDestroy } from '@angular/core';
    import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
    import { interval, Subscription } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class DataStreamService implements OnDestroy {
      private destroyRef = inject(DestroyRef);
      private subscription: Subscription | undefined;

      constructor() {
        // Exemplo com takeUntilDestroyed (se o serviço tem um ciclo de vida ligado a um injetor pai)
        interval(1000)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((value) => console.log('Data stream:', value));

        // Exemplo de gerenciamento manual para serviços singletons ou de longa duração
        // this.subscription = interval(1000).subscribe(value => console.log('Manual stream:', value));
      }

      ngOnDestroy(): void {
        // Se usar gerenciamento manual, descomente:
        // this.subscription?.unsubscribe();
      }
    }
    ```

7.  **Tipagem Forte**: Sempre use tipagem forte (`interface`, `type`) para dados retornados por APIs ou manipulados em serviços.
    ```typescript
    export interface Product {
      id: string;
      name: string;
      price: number;
    }
    // ...
    getProduct(id: string): Observable<Product> { /* ... */ }
    ```
8.  **Reutilização**: Crie serviços genéricos ou abstratos quando a lógica puder ser compartilhada entre diferentes entidades (ex: `CrudService<T>`).
9.  **Single Responsibility Principle (SRP)**: Cada serviço deve ter uma única responsabilidade bem definida. Evite serviços "faz-tudo".
10. **Imutabilidade**: Sempre que possível, trabalhe com dados de forma imutável, especialmente ao atualizar estados complexos em serviços.

## 📚 Exemplos Modernos

### Serviço de Autenticação (Authentication Service)

```typescript
// auth.service.ts
import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User, AuthCredentials } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private _currentUser = signal<User | null>(null); // Usando signal para o estado do usuário logado

  readonly currentUser = this._currentUser.asReadonly(); // Expor como readonly signal

  constructor() {
    // Tenta carregar o usuário do localStorage ao iniciar o serviço
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }
  }

  login(credentials: AuthCredentials): Observable<User> {
    return this.http.post<User>('/api/auth/login', credentials).pipe(
      tap((user) => {
        this._currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout(): void {
    this._currentUser.set(null);
    localStorage.removeItem('currentUser');
    // Chamar API de logout se necessário
  }

  isAuthenticated(): boolean {
    return this._currentUser() !== null;
  }
}
```
