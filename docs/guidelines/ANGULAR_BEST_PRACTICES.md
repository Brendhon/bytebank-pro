# 🏗️ Abordagens e Boas Práticas Modernas do Angular

Este documento descreve as abordagens modernas e boas práticas recomendadas pela equipe do Angular para o desenvolvimento de componentes.

> **Importante**: Sempre utilize as práticas e APIs mais recentes recomendadas pela equipe oficial do Angular.

## 📝 Comentários no Código

- **Todos os comentários em código devem ser escritos em inglês**, independentemente do idioma do restante da documentação ou do projeto.
- Isso inclui comentários de linha, blocos de documentação (JSDoc), e quaisquer anotações explicativas no código-fonte.

---

## 1. Testing: Use `fixture.componentRef.setInput()`

**✅ Abordagem Moderna (Angular 14+):**

```typescript
it('should set variant property', () => {
  fixture.componentRef.setInput('variant', 'success');
  expect(component.variant).toBe('success');
});

it('should handle disabled state', () => {
  fixture.componentRef.setInput('disabled', true);
  expect(component.disabled).toBeTruthy();
});
```

**❌ Abordagem Antiga (evitar):**

```typescript
it('should set variant property', () => {
  component.variant = 'success'; // Direct property assignment
  expect(component.variant).toBe('success');
});
```

**Vantagens do `setInput()`:**

- Simula o comportamento real do Angular
- Chama automaticamente `ngOnChanges` quando necessário
- Mais limpo e legível
- Abordagem oficial recomendada pela equipe Angular

## 2. Template Syntax: Use Control Flow Blocks

**✅ Sintaxe Moderna (Angular 17+):**

```html
<!-- Conditional rendering -->
@if (isVisible) {
<div class="content">Conteúdo visível</div>
} @else {
<div class="placeholder">Conteúdo oculto</div>
}

<!-- Loops -->
@for (item of items; track item.id) {
<div class="item">{{ item.name }}</div>
} @empty {
<div class="no-items">Nenhum item encontrado</div>
}

<!-- Switch statements -->
@switch (variant) { @case ('primary') {
<span class="text-blue-600">Primary</span>
} @case ('secondary') {
<span class="text-gray-600">Secondary</span>
} @default {
<span class="text-black">Default</span>
} }
```

**O que faz:** Os novos blocos de controle de fluxo (`@if`, `@for`, `@switch`) introduzidos no Angular 17 oferecem uma sintaxe mais limpa, melhor performance e type safety superior em comparação com as diretivas estruturais antigas. Eles são compilados de forma mais eficiente, resultam em bundles menores, e oferecem recursos adicionais como o bloco `@empty` para loops e melhor tratamento de tipos.

**❌ Sintaxe Antiga (evitar):**

```html
<!-- Não usar mais *ngIf, *ngFor, ngSwitch -->
<div *ngIf="isVisible" class="content">Conteúdo</div>
<div *ngFor="let item of items" class="item">{{ item.name }}</div>
<div [ngSwitch]="variant">
  <span *ngSwitchCase="'primary'">Primary</span>
</div>
```

## 3. Standalone Components

**✅ Sempre use componentes standalone:**

```typescript
@Component({
  selector: 'bb-component',
  imports: [CommonModule, LucideAngularModule] // Direct imports
})
export class ComponentComponent {
  // Implementation...
}
```

**O que faz:** Componentes standalone eliminam a necessidade de NgModules para componentes simples, reduzindo boilerplate e melhorando a tree-shaking. Eles permitem imports diretos de dependências, tornam os componentes mais portáveis e independentes, e simplificam a configuração de testes. É a abordagem recomendada para novos componentes no Angular moderno.

**❌ Evitar NgModules para novos componentes:**

```typescript
// Não criar NgModules desnecessários
@NgModule({
  declarations: [ComponentComponent],
  exports: [ComponentComponent]
})
export class ComponentModule {} // Evitar
```

## 4. Signal-based APIs

**Preparação para Signals (Angular 16+):**

```typescript
// Quando signals estiverem estáveis, migrar para:
export class ComponentComponent {
  // Reactive state with signals
  counter = signal(0);
  doubled = computed(() => this.counter() * 2);

  increment() {
    this.counter.update((value) => value + 1);
  }
}
```

**O que faz:** Signals são uma nova API reativa do Angular que oferece uma alternativa mais eficiente ao change detection tradicional. Signals permitem criar estado reativo que notifica automaticamente sobre mudanças, computed values que se atualizam automaticamente quando suas dependências mudam, e effects que reagem a mudanças de estado. Isso resulta em melhor performance e código mais declarativo e previsível.

## 5. Dependency Injection com `inject()`

**✅ Função `inject()` (Angular 14+):**

```typescript
export class ComponentComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(DataService);
}
```

**O que faz:** A função `inject()` é uma alternativa moderna ao constructor injection que permite injetar dependências em qualquer lugar da classe, não apenas no constructor. Isso torna o código mais limpo, facilita testes unitários (pois elimina a necessidade de mockar no constructor), e é especialmente útil em functional components e composables. É a abordagem recomendada para novos projetos Angular.

**❌ Constructor injection (ainda válido, mas prefer `inject()`):**

```typescript
export class ComponentComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DataService
  ) {}
}
```

## 6. Required Inputs

**✅ Use `input.required()` quando aplicável:**

```typescript
export class ComponentComponent {
  // Required input with new API
  name = input.required<string>();
  age = input<number>({ required: true });
  options = input<string[]>({ required: true, transform: (value) => value ?? [] });
}
```

**O que faz:** A nova API `input()` oferece uma forma mais moderna e type-safe de definir inputs em componentes. `input.required()` força que a propriedade seja fornecida, melhorando a segurança de tipos. A opção `transform` permite converter automaticamente valores (como strings para booleans), e a API é mais concisa que a sintaxe tradicional `@Input()`. Isso resulta em componentes mais robustos e menos propensos a erros.

## 7. Output Functions

**✅ Use output functions:**

```typescript
export class ComponentComponent {
  // Modern output declaration
  click = output<MouseEvent>();
  valueChange = output<string>();

  // Usage
  handleClick(event: MouseEvent) {
    this.click.emit(event);
  }
}
```

**O que faz:** A função `output()` é a nova API para criar event emitters em componentes, substituindo a sintaxe tradicional `@Output() EventEmitter`. É mais concisa, oferece melhor type safety e é a abordagem recomendada para novas aplicações Angular. A API é mais simples de usar e se integra melhor com outras funcionalidades modernas do framework.

## 8. OnPush Change Detection Strategy

**✅ Use OnPush para melhor performance:** (Quando aplicável)

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bb-component',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentComponent {
  // Implementation with OnPush strategy
}
```

**O que faz:** OnPush otimiza drasticamente a performance ao executar change detection apenas quando:

- As referências dos inputs mudam
- Um evento é disparado no componente
- Um observable emite um valor (com async pipe)

Isso reduz significativamente o número de verificações desnecessárias, especialmente em aplicações com muitos componentes.

## 9. TrackBy Functions para Loops

**✅ Sempre use trackBy em loops:**

```typescript
@Component({
  template: `
    @for (item of items; track trackById(item)) {
      <div>{{ item.name }}</div>
    }
  `
})
export class ComponentComponent {
  items = [...];

  trackById(item: any): number {
    return item.id;
  }
}
```

**O que faz:** TrackBy functions permitem ao Angular identificar quais itens da lista mudaram, foram adicionados ou removidos. Sem trackBy, o Angular re-renderiza todos os elementos da lista mesmo quando apenas um item muda. Com trackBy, apenas os itens modificados são atualizados, melhorando drasticamente a performance em listas dinâmicas.

## 10. Async Pipe e Reactive Patterns

**✅ Use async pipe para observables:**

```typescript
export class ComponentComponent {
  data$ = this.service.getData();
  // Template usage: {{ data$ | async }}
}
```

**O que faz:** O async pipe automaticamente se inscreve em observables, atualiza a view quando novos valores são emitidos, e se desinscreve automaticamente quando o componente é destruído. Isso elimina vazamentos de memória e simplifica o gerenciamento de subscriptions, além de funcionar perfeitamente com OnPush change detection.

## 11. Lifecycle Hooks com DestroyRef

**✅ Use DestroyRef para cleanup (Angular 16+):**

```typescript
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class ComponentComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.service
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        // Handle data
      });
  }
}
```

**O que faz:** DestroyRef fornece uma forma moderna e automática de limpar subscriptions quando o componente é destruído. O operador `takeUntilDestroyed()` automaticamente completa observables quando o componente é destruído, eliminando a necessidade de gerenciar manualmente unsubscribe() no ngOnDestroy. Isso previne vazamentos de memória de forma mais elegante.

## 12. Type Safety com Generic Components

**✅ Use generics para type safety:**

```typescript
export interface SelectOption<T = any> {
  label: string;
  value: T;
}

@Component({
  selector: 'bb-select',
  template: `...`
})
export class SelectComponent<T = any> {
  @Input() options: SelectOption<T>[] = [];
  @Output() selectionChange = output<T>();
}
```

**O que faz:** Generics permitem criar componentes reutilizáveis que mantêm type safety. Por exemplo, um SelectComponent<User> garante que apenas objetos User sejam passados como opções e que o evento de seleção emita um User. Isso previne erros de tipo em tempo de compilação e melhora a experiência de desenvolvimento com autocompletar mais preciso.

## 13. Content Projection com ng-content

**✅ Use content projection adequadamente:**

```typescript
@Component({
  selector: 'bb-card',
  template: `
    <div class="card">
      <div class="card-header">
        <ng-content select="[slot=header]"></ng-content>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class CardComponent {}
```

**O que faz:** Content projection permite que componentes aceitem conteúdo HTML customizado do componente pai. Com seletores específicos (`select="[slot=header]"`), você pode criar múltiplos pontos de projeção, permitindo layouts flexíveis onde o conteúdo é definido pelos consumidores do componente. Isso torna os componentes mais reutilizáveis e composáveis.

## 14. Host Bindings e HostListener

**✅ Use host bindings para melhor encapsulamento:**

```typescript
@Component({
  selector: 'bb-button',
  host: {
    '[class.disabled]': 'disabled',
    '[attr.disabled]': 'disabled ? true : null',
    '(click)': 'onClick($event)'
  }
})
export class ButtonComponent {
  @Input() disabled = false;

  onClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    // Handle click
  }
}
```

**O que faz:** Host bindings aplicam propriedades, classes e event listeners diretamente ao elemento host do componente (a tag do componente). Isso melhora o encapsulamento ao manter a lógica de styling e eventos dentro da classe do componente, tornando-o mais autônomo e elimina a necessidade de manipulação manual do DOM ou HostListener decorators.

## 15. Performance: Lazy Loading e Preloading

**✅ Use lazy loading para componentes pesados:**

```typescript
// Lazy load heavy components
export class ComponentComponent {
  private heavyComponent = import('./heavy-component/heavy.component').then(
    (m) => m.HeavyComponent
  );
}
```

**O que faz:** Lazy loading permite carregar componentes, módulos ou funcionalidades apenas quando necessário, reduzindo o bundle inicial da aplicação. Usando dynamic imports (`import()`), você pode dividir o código em chunks menores que são carregados sob demanda. Isso melhora significativamente o tempo de carregamento inicial, especialmente em aplicações grandes, pois apenas o código essencial é baixado inicialmente.

## 16. Error Boundaries e Error Handling

**✅ Implemente error handling robusto:**

```typescript
@Component({
  selector: 'bb-error-boundary',
  template: `
    @if (hasError) {
      <div class="error-container">
        <h2>Algo deu errado</h2>
        <p>{{ errorMessage }}</p>
        <button (click)="resetError()">Tentar novamente</button>
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class ErrorBoundaryComponent implements OnInit {
  @Input() hasError = false;
  @Input() errorMessage = 'Ocorreu um erro inesperado.';
  @Output() retry = new EventEmitter<void>();

  resetError(): void {
    this.hasError = false;
    this.retry.emit();
  }
}
```

**O que faz:** Error boundaries capturam erros JavaScript que ocorrem em qualquer lugar da árvore de componentes filhos, registram esses erros e exibem uma UI de fallback em vez de quebrar toda a aplicação. Isso melhora a experiência do usuário ao isolar falhas e permite que outras partes da aplicação continuem funcionando normalmente, além de facilitar o monitoramento e debugging de erros em produção.

## 17. Internacionalização (i18n)

**✅ Prepare componentes para i18n:**

```typescript
@Component({
  selector: 'bb-date-picker',
  template: `
    <div>
      <button [attr.aria-label]="closeButtonLabel">Fechar</button>
    </div>
  `
})
export class DatePickerComponent {
  // Use i18n attributes for accessibility
  closeButtonLabel = $localize`:@@close-button-aria:Close date picker`;
}
```

**O que faz:** Internacionalização (i18n) prepara seus componentes para suportar múltiplos idiomas e regiões. Usando atributos `i18n` e a função `$localize`, você marca textos para tradução e garante que elementos de acessibilidade também sejam traduzidos. Isso permite que sua aplicação seja facilmente adaptada para diferentes mercados, melhorando a experiência de usuários globais e cumprindo requisitos de acessibilidade em vários idiomas.

## 18. ViewChild e ElementRef Best Practices

**✅ Use ViewChild com type safety:**

```typescript
export class ComponentComponent implements AfterViewInit {
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    // Safe access with type information
    this.inputElement.nativeElement.focus();
  }
}
```

**O que faz:** ViewChild permite acessar elementos DOM ou componentes filhos diretamente da classe do componente. Com type safety (usando `ElementRef<HTMLInputElement>`), você tem autocompletar e verificação de tipos. O flag `static: true` carrega a referência durante o ngOnInit, enquanto `static: false` (padrão) carrega no ngAfterViewInit. Isso é útil para operações como foco, animações ou chamadas de métodos em componentes filhos.

## 19. Custom Validators

**✅ Crie validators reutilizáveis:**

```typescript
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return valid ? null : { invalidEmail: true };
  };
}

// Usage in component
@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="email" type="email" />
    </form>
  `
})
export class FormComponent {
  emailControl = new FormControl('', [customEmailValidator()]);
}
```

**O que faz:** Custom validators permitem criar validações reutilizáveis e específicas para suas necessidades de negócio que vão além dos validators padrão do Angular. Eles retornam `null` para valores válidos ou um objeto de erro para valores inválidos. Isso promove reutilização de código, consistência na validação e facilita testes, além de permitir validações complexas que podem envolver lógica de negócio específica.

## 20. Memoization e Pure Functions

**✅ Use memoization para computações caras:**

```typescript
export class ComponentComponent {
  private _computedValue: any;
  private _lastInputs: any[] = [];

  // Memoized getter
  get expensiveComputation(): any {
    const currentInputs = [this.prop1, this.prop2, this.prop3];

    if (!this._computedValue || !this.inputsEqual(currentInputs, this._lastInputs)) {
      this._lastInputs = [...currentInputs];
      this._computedValue = this.performExpensiveComputation(currentInputs);
    }

    return this._computedValue;
  }

  private inputsEqual(a: any[], b: any[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }

  private performExpensiveComputation(inputs: any[]): any {
    // Expensive computation here
    return inputs.reduce((acc, curr) => acc + curr, 0);
  }
}
```

**O que faz:** Memoization armazena resultados de computações caras e os reutiliza quando os mesmos inputs são fornecidos, evitando recálculos desnecessários. Isso é especialmente útil em getters que são chamados frequentemente ou em computações que dependem de múltiplas propriedades. A técnica melhora significativamente a performance ao cachear resultados e só recalcular quando os dados de entrada realmente mudam.

## 📚 Documentação Oficial Angular

- [Angular Component Development Best Practices](https://angular.dev/best-practices)
- [Angular Control Flow Blocks (@if, @for, @switch)](https://angular.dev/guide/templates/control-flow)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Modern Testing with setInput()](https://angular.dev/guide/testing/components-scenarios#setting-component-inputs)

### Práticas Descontinuadas x Recomendadas

| Antiga (Evitar)                         | Nova (Recomendada)                         |
| --------------------------------------- | ------------------------------------------ |
| `*ngIf`, `*ngFor`, `*ngSwitch`          | `@if`, `@for`, `@switch`                   |
| `component.property = value` nos testes | `fixture.componentRef.setInput()`          |
| NgModules para novos componentes        | Standalone components                      |
| Constructor injection                   | `inject()` function                        |
| Default change detection                | `OnPush` strategy                          |
| Manual subscription cleanup             | `takeUntilDestroyed()` with `DestroyRef`   |
| Direct DOM manipulation                 | `Renderer2` ou host bindings               |
| `@Output() EventEmitter`                | `output()` function                        |
| `@Input()` without transforms           | `input()` com transforms quando apropriado |
| Loops sem trackBy                       | `track` em `@for`                          |
| Synchronous validators                  | Async validators quando necessário         |
| Hardcoded strings                       | i18n para textos visíveis ao usuário       |
