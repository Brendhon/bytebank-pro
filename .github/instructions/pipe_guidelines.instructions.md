---
applyTo: '**/*.pipe.ts'
---

# 📋 Guia de Boas Práticas para Criação de Pipes no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de pipes no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### ⚙️ Pipes

Pipes devem ser colocados em uma pasta `pipes` dentro do módulo ou recurso que eles atendem.

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-recurso/
    └── pipes/
      ├── nome-do-pipe.pipe.ts
      └── nome-do-pipe.pipe.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `currency-format`)
  - **Arquivo**: `kebab-case.pipe.{ext}` (ex: `currency-format.pipe.ts`)
  - **Classe**: `PascalCasePipe` (ex: `CurrencyFormatPipe`)
  - **Nome do Pipe (no decorator `@Pipe`)**: `camelCase` (ex: `currencyFormat`)

## 🏗️ Angular Modern Best Practices (Angular 20) para Pipes

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.
2.  **Pipes Puros por Padrão**: Por padrão, os pipes são "puros" (`pure: true`). Isso significa que o Angular só reexecutará o pipe se a entrada do pipe mudar. Para a maioria dos casos, mantenha esta configuração para otimização de performance.
    ```typescript
    @Pipe({
      name: 'myPurePipe',
      standalone: true, // Sempre use standalone
      pure: true // Padrão, mas pode ser explícito
    })
    export class MyPurePipe implements PipeTransform {
      transform(value: any): any {
        // Lógica do pipe
        return value;
      }
    }
    ```
3.  **Pipes Impuros (Use com Cautela)**: Se o pipe precisar ser reexecutado em cada ciclo de detecção de mudanças (ex: para dados mutáveis ou que dependem de um estado externo que não é uma entrada direta), defina `pure: false`. **Use pipes impuros com extrema cautela**, pois podem impactar negativamente a performance.
    ```typescript
    @Pipe({
      name: 'myImpurePipe',
      standalone: true,
      pure: false // Reexecuta em cada ciclo de detecção de mudanças
    })
    export class MyImpurePipe implements PipeTransform {
      transform(value: any): any {
        // Lógica do pipe que pode depender de algo externo ou de mutação
        return Math.random(); // Exemplo de algo que muda a cada ciclo
      }
    }
    ```
4.  **Pipes Standalone**: **Sempre use pipes standalone** para eliminar `NgModules` desnecessários, reduzir boilerplate e melhorar o tree-shaking.
    ```typescript
    @Pipe({
      name: 'myPipe',
      standalone: true
    })
    export class MyPipe implements PipeTransform {
      /* ... */
    }
    ```
5.  **Tipagem Forte**: Sempre use tipagem forte para as entradas e saídas do pipe.
    ```typescript
    transform(value: string, maxLength: number): string { /* ... */ }
    ```
6.  **Simplicidade e Reutilização**: Pipes devem ser pequenos, focados em uma única transformação e altamente reutilizáveis. Se a lógica for complexa, considere mover parte dela para um serviço.
7.  **Performance**: Evite operações computacionalmente caras dentro do pipe, especialmente se for um pipe impuro. Se for inevitável, considere memoização.
8.  **Tratamento de Valores Nulos/Indefinidos**: Sempre adicione verificações para `null` ou `undefined` nas entradas do pipe para evitar erros.
    ```typescript
    transform(value: string | null | undefined): string {
      if (value === null || value === undefined) {
        return ''; // Ou um valor padrão apropriado
      }
      // ...
    }
    ```

## 📚 Exemplos Modernos

### Pipe de Formatação de Moeda (Currency Format Pipe)

```typescript
// currency-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat',
  standalone: true
})
export class CurrencyFormatPipe implements PipeTransform {
  transform(
    value: number | null | undefined,
    currencyCode: string = 'BRL',
    display: string = 'symbol'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    // Usar Intl.NumberFormat para formatação robusta e internacionalizada
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: display as 'symbol' | 'code' | 'name' // Type assertion para display
    }).format(value);
  }
}
```

**Exemplo de Uso no Template:**

```html
<p>{{ 1234.56 | currencyFormat }}</p>

<p>{{ 1234.56 | currencyFormat:'USD':'code' }}</p>
```

### Pipe de Truncamento de Texto (Truncate Text Pipe)

```typescript
// truncate-text.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText',
  standalone: true
})
export class TruncateTextPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    maxLength: number = 50,
    ellipsis: string = '...'
  ): string {
    if (value === null || value === undefined) {
      return '';
    }

    if (value.length <= maxLength) {
      return value;
    }

    return value.substring(0, maxLength) + ellipsis;
  }
}
```

**Exemplo de Uso no Template:**

```html
<p>{{ 'Este é um texto longo que será truncado.' | truncateText:30 }}</p>

<p>{{ 'Este é um texto longo que será truncado.' | truncateText:30:' ##' }}</p>
```
