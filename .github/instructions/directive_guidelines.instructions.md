---
applyTo: '**/*.directive.ts'
---

# 📋 Guia de Boas Práticas para Criação de Diretivas no ByteBank Pro

Este guia define as diretrizes e boas práticas para o desenvolvimento de diretivas no ByteBank Pro, abrangendo estrutura, estilo, organização e práticas modernas do Angular.

## 📁 Estrutura e Convenções de Nomenclatura

### ⚙️ Diretivas Personalizadas (Custom Directives)

Diretivas devem ser colocadas em uma pasta `directives` dentro do módulo ou recurso que elas atendem, ou em uma pasta `shared/directives` se forem de uso mais amplo.

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-recurso/
    └── directives/
      ├── nome-da-diretiva.directive.ts
      └── nome-da-diretiva.directive.spec.ts // Crie um arquivo de teste simples com um teste básico
  ```
  Ou, para diretivas compartilhadas:
  ```
  src/
  └── shared/
    └── directives/
      ├── nome-da-diretiva.directive.ts
      └── nome-da-diretiva.directive.spec.ts
  ```
- **Convenções de Nomenclatura:**
  - **Pasta**: `kebab-case` (ex: `click-outside`)
  - **Arquivo**: `kebab-case.directive.{ext}` (ex: `highlight.directive.ts`)
  - **Classe**: `PascalCaseDirective` (ex: `HighlightDirective`)
  - **Seletor**: Prefira prefixos específicos do projeto para evitar conflitos. Use `camelCase` para seletores de atributo (ex: `[bbHighlight]`) ou `kebab-case` para seletores de elemento (se a diretiva for usada como um elemento próprio, o que é menos comum para diretivas de atributo). Ex: `bb-tooltip` ou `[bbTooltip]`.

## 🏗️ Angular Modern Best Practices (Angular 20) para Diretivas

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.
2.  **Diretivas Standalone**: **Sempre use diretivas standalone** para eliminar `NgModules` desnecessários, reduzir boilerplate e melhorar o tree-shaking.
    ```typescript
    @Directive({
      selector: '[bbHighlight]', // Seletor de atributo é o mais comum
      standalone: true
    })
    export class HighlightDirective {
      /* ... */
    }
    ```
3.  **Injeção de Dependências com `inject()` (Angular 14+)**: Utilize `inject()` para injetar serviços e outras dependências no construtor.

    ```typescript
    import { Directive, ElementRef, inject } from '@angular/core';

    @Directive({
      selector: '[bbHighlight]',
      standalone: true
    })
    export class HighlightDirective {
      private el = inject(ElementRef);
      // private renderer = inject(Renderer2); // Se precisar manipular o DOM de forma mais segura

      constructor() {
        this.el.nativeElement.style.backgroundColor = 'yellow';
      }
    }
    ```

4.  **Entradas (`@Input()`) e Saídas (`output()`)**: Use as sintaxes modernas para `Input` e `Output`.

    ```typescript
    import { Directive, Input, output, HostListener } from '@angular/core';

    @Directive({
      selector: '[bbClickOutside]',
      standalone: true
    })
    export class ClickOutsideDirective {
      // Input moderno
      @Input({ required: true }) bbClickOutsideEnabled!: boolean;

      // Output moderno
      clickOutside = output<MouseEvent>();

      @HostListener('document:click', ['$event'])
      onClick(event: MouseEvent): void {
        if (this.bbClickOutsideEnabled && !this.isInside(event.target as Node)) {
          this.clickOutside.emit(event);
        }
      }

      private isInside(target: Node): boolean {
        // Lógica para verificar se o clique foi dentro do elemento da diretiva
        return false; // Implementar de acordo com a necessidade
      }
    }
    ```

5.  **Manipulação do DOM**:

    - **Prefira `Renderer2`**: Para manipular o DOM de forma segura e independente da plataforma, utilize `Renderer2`.
    - **Use `ElementRef` com cautela**: `ElementRef` permite acesso direto ao elemento nativo do DOM, mas deve ser usado com moderação e apenas quando `Renderer2` não for suficiente, pois pode dificultar a testabilidade e a portabilidade (ex: renderização em servidor, web workers).
    <!-- end list -->

    ```typescript
    import { Directive, ElementRef, Renderer2, Input, OnInit, inject } from '@angular/core';

    @Directive({
      selector: '[bbSetBackgroundColor]',
      standalone: true
    })
    export class SetBackgroundColorDirective implements OnInit {
      @Input() bbSetBackgroundColor: string = 'blue';

      private el = inject(ElementRef);
      private renderer = inject(Renderer2);

      ngOnInit(): void {
        this.renderer.setStyle(
          this.el.nativeElement,
          'background-color',
          this.bbSetBackgroundColor
        );
      }
    }
    ```

6.  **Host Bindings (`host` property ou `@HostBinding`/`@HostListener`)**: Utilize a propriedade `host` no decorator `@Directive` para vincular propriedades, atributos ou eventos diretamente ao elemento host da diretiva. Isso é mais conciso e "treeshakeable" do que usar `@HostBinding` e `@HostListener` individualmente, embora estes ainda sejam válidos.

    ```typescript
    import { Directive, Input } from '@angular/core';

    @Directive({
      selector: '[bbToggleClass]',
      standalone: true,
      host: {
        '[class.active]': 'isActive', // Binda a classe 'active' baseada na propriedade 'isActive'
        '(click)': 'onClick()' // Binda o evento 'click' ao método 'onClick'
      }
    })
    export class ToggleClassDirective {
      @Input() isActive: boolean = false;

      onClick(): void {
        this.isActive = !this.isActive;
        console.log('Class toggled:', this.isActive);
      }
    }
    ```

7.  **Limpeza de Subscrições (Cleanup)**: Se sua diretiva se subscrever a Observables ou configurar listeners que precisam ser limpos, utilize `takeUntilDestroyed(this.destroyRef)` (disponível através do `DestroyRef` injetável) para gerenciamento automático do ciclo de vida.

    ```typescript
    import { Directive, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
    import { fromEvent } from 'rxjs';
    import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

    @Directive({
      selector: '[bbTrackMouse]',
      standalone: true
    })
    export class TrackMouseDirective implements OnInit {
      private destroyRef = inject(DestroyRef);

      ngOnInit(): void {
        fromEvent<MouseEvent>(document, 'mousemove')
          .pipe(
            takeUntilDestroyed(this.destroyRef) // Limpa automaticamente quando a diretiva é destruída
          )
          .subscribe((event) => {
            console.log(`Mouse at: ${event.clientX}, ${event.clientY}`);
          });
      }
    }
    ```

8.  **Reutilização e Simplicidade**: Diretivas devem ser pequenas, focadas em uma única funcionalidade e altamente reutilizáveis. Se a lógica for muito complexa, considere se não seria melhor um componente ou um serviço.

## 📚 Exemplos Modernos

### Diretiva de Foco Automático (AutoFocus Directive)

```typescript
// auto-focus.directive.ts
import { Directive, ElementRef, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[bbAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements OnInit {
  private el = inject(ElementRef);

  ngOnInit(): void {
    // Garante que o foco seja aplicado após a renderização inicial
    setTimeout(() => {
      this.el.nativeElement.focus();
    });
  }
}
```

**Exemplo de Uso no Template:**

```html
<input type="text" bbAutoFocus placeholder="Este campo terá foco automático" />
```

### Diretiva de Validação Visual de Input (Input Validation Directive)

```typescript
// input-validation.directive.ts
import {
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';
import { NgControl } from '@angular/forms'; // Para acessar o estado do FormControl

@Directive({
  selector: '[bbInputValidation]',
  standalone: true
})
export class InputValidationDirective implements OnInit, OnChanges {
  @Input() bbInputValidation: boolean = false; // Input para controlar a validação externa, se necessário

  private el = inject(ElementRef);
  private ngControl = inject(NgControl, { optional: true }); // Injeta NgControl, pode ser nulo

  @HostBinding('class.is-invalid') isValid = false;

  ngOnInit(): void {
    if (this.ngControl && this.ngControl.statusChanges) {
      this.ngControl.statusChanges.subscribe((status) => {
        this.isValid =
          (this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched)) ||
          this.bbInputValidation;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['bbInputValidation']) {
      // Atualiza o estado da classe se o input externo mudar
      this.isValid =
        (this.ngControl?.invalid && (this.ngControl?.dirty || this.ngControl?.touched)) ||
        this.bbInputValidation;
    }
  }
}
```

**Exemplo de Uso no Template (com Reactive Forms):**

```html
<form [formGroup]="myForm">
  <input type="email" formControlName="email" bbInputValidation placeholder="E-mail" />
  <div
    *ngIf="myForm.get('email')?.invalid && (myForm.get('email')?.dirty || myForm.get('email')?.touched)"
    class="error-message"
  >
    E-mail inválido.
  </div>
</form>
```
