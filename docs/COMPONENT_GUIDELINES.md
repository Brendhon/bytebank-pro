# 📋 Guia de Boas Práticas para Criação de Componentes

> Guia abrangente para desenvolvimento de componentes na biblioteca `@bytebank-pro/ui`

---

## 🖼️ Ícones

- **Sempre utilize ícones da biblioteca [`lucide-angular`](https://www.npmjs.com/package/lucide-angular)**, que é o equivalente Angular do `lucide-react`.
- **Não utilize SVGs customizados ou outras bibliotecas de ícones**. Padronize todos os ícones com `lucide-angular` para garantir consistência visual e facilidade de manutenção.
- **Importação e uso**: Importe apenas os ícones necessários para cada componente, evitando bundles desnecessários.

---

## 🎯 Visão Geral

Este documento estabelece as boas práticas e padrões para criação de componentes consistentes, acessíveis e reutilizáveis na biblioteca UI do ByteBank Pro. Todos os componentes devem seguir estas diretrizes para garantir qualidade e uniformidade.

---

## 📝 Comentários no Código

- **Todos os comentários em código devem ser escritos em inglês**, independentemente do idioma do restante da documentação ou do projeto.
- Isso inclui comentários de linha, blocos de documentação (JSDoc), e quaisquer anotações explicativas no código-fonte.

---

## 📁 Estrutura de Arquivos

### Estrutura Padrão por Componente

```
src/
└── nome-component/
  ├── nome-component.component.ts      # Lógica do componente
  ├── nome-component.component.html    # Template
  ├── nome-component.component.spec.ts # Testes unitários
  └── nome-component.component.stories.ts # Stories do Storybook
```

### Convenções de Nomenclatura

- **Pasta**: `kebab-case` (ex: `date-picker`, `form-input`)
- **Arquivos**: `kebab-case.component.{ext}` (ex: `date-picker.component.ts`)
- **Classe**: `PascalCase + Component` (ex: `DatePickerComponent`)
- **Seletor**: `bb-kebab-case` (ex: `bb-date-picker`)

---

## 🔧 Estrutura do Componente TypeScript

### Template Base

```typescript
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

// 1. Define specific types for the component
export type ComponentVariant = 'primary' | 'secondary' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bb-nome-component', // 2. 'bb-' prefix is mandatory
  templateUrl: './nome-component.component.html',
  styleUrls: ['../styles/index.css'], // 3. Shared styles
  standalone: true, // 4. Always standalone
  imports: [CommonModule] // 5. Required imports
})
export class NomeComponentComponent {
  // 6. Inputs with sensible default values
  @Input() variant: ComponentVariant = 'primary';
  @Input() size: ComponentSize = 'md';
  @Input() disabled: boolean = false;
  @Input() className: string = ''; // For additional classes

  // 7. Accessibility always present
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;

  // 8. Outputs with descriptive names
  @Output() componentClick = new EventEmitter<Event>();
  @Output() valueChange = new EventEmitter<any>();

  // 9. Getter for computed CSS classes
  get componentClasses(): string {
    return this.computeClasses();
  }

  // 10. Private methods for complex logic
  private computeClasses(): string {
    // Implementation...
  }
}
```

> **Nota:** Todos os comentários no código acima (e em todos os exemplos deste guia) estão em inglês, conforme a diretriz deste documento.

---

## 🎨 Padrões de Estilo e CSS

### 1. Uso do TailwindCSS

- **Sempre usar classes Tailwind** quando possível
- **Evitar CSS customizado** desnecessário
- **Utilizar design tokens** do `@bytebank-pro/shared-design-tokens`

### 2. Estrutura de Classes

```typescript
get componentClasses(): string {
  const baseClasses = 'classe-base tailwind-utilities';
  let variantClasses = '';

  // Switch for variants
  switch (this.variant) {
    case 'primary':
      variantClasses = 'bg-bytebank-blue text-white hover:bg-blue-600';
      break;
    // other cases...
  }

  const stateClasses = this.disabled ? 'opacity-60 cursor-not-allowed' : '';

  return `${baseClasses} ${variantClasses} ${stateClasses} ${this.className}`;
}
```

### 3. Design Tokens Obrigatórios

- **Cores**: `bg-bytebank-blue`, `text-bytebank-green`, etc.
- **Espaçamentos**: Classes Tailwind padrão (`p-4`, `m-2`)
- **Tipografia**: Classes definidas nos design tokens
- **Border radius**: `rounded-md` como padrão

---

## ♿ Diretrizes de Acessibilidade

### 1. Atributos ARIA Obrigatórios

```typescript
// Inputs for accessibility
@Input() ariaLabel?: string;
@Input() ariaDescribedBy?: string;
@Input() ariaExpanded?: boolean; // For expandable components
@Input() role?: string; // When needed
```

### 2. Estados Dinâmicos

```html
<!-- Example: Button with loading -->
<button
  [attr.aria-busy]="loading ? 'true' : 'false'"
  [attr.aria-label]="loading ? loadingAriaLabel : ariaLabel"
  [disabled]="disabled || loading"
>
  <!-- Content -->
</button>
```

### 3. Navegação por Teclado

- **Todos os componentes interativos** devem ser navegáveis por teclado
- **Estados de foco** devem ser visualmente claros
- **Usar classes focus** do Tailwind: `focus:ring-2 focus:ring-offset-2`

### 4. Checklist de Acessibilidade

- [ ] Contraste adequado (WCAG AA)
- [ ] Navegação por teclado
- [ ] Labels descritivos
- [ ] Estados de foco visíveis
- [ ] Suporte a screen readers
- [ ] Textos alternativos quando aplicável
- [ ] ARIA attributes apropriados
- [ ] Roles semânticos corretos
- [ ] Live regions para mudanças dinâmicas
- [ ] Ordem lógica de tabulação

### 5. Checklist de Performance

- [ ] OnPush change detection strategy implementada
- [ ] TrackBy functions em todos os loops
- [ ] Async pipe usado para observables
- [ ] Lazy loading para componentes pesados
- [ ] Memoization para computações caras
- [ ] Cleanup adequado de subscriptions
- [ ] Bundle size otimizado (imports específicos)
- [ ] Images otimizadas e lazy loading
- [ ] Debounce/throttle em inputs frequentes
- [ ] Virtual scrolling para listas grandes

---

## 🏗️ Abordagens Recomendadas pelo Angular Team

> **Sempre utilize as práticas e APIs mais recentes recomendadas pela equipe oficial do Angular.**

### 1. Testing: Use `fixture.componentRef.setInput()`

**✅ Abordagem Moderna (Angular 14+):**

```typescript
it('should set variant property', () => {
  fixture.componentRef.setInput('variant', 'success');
  fixture.detectChanges();

  expect(component.variant).toBe('success');
});

it('should handle disabled state', () => {
  fixture.componentRef.setInput('disabled', true);
  fixture.detectChanges();

  expect(component.disabled).toBeTruthy();
});
```

**❌ Abordagem Antiga (evitar):**

```typescript
it('should set variant property', () => {
  component.variant = 'success'; // Direct property assignment
  fixture.detectChanges();

  expect(component.variant).toBe('success');
});
```

**Vantagens do `setInput()`:**

- Simula o comportamento real do Angular
- Chama automaticamente `ngOnChanges` quando necessário
- Mais limpo e legível
- Abordagem oficial recomendada pela equipe Angular

### 2. Template Syntax: Use Control Flow Blocks

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

### 3. Standalone Components

**✅ Sempre use componentes standalone:**

```typescript
@Component({
  selector: 'bb-component',
  templateUrl: './component.component.html',
  standalone: true, // Sempre true
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
  imports: [CommonModule],
  exports: [ComponentComponent]
})
export class ComponentModule {} // Evitar
```

### 4. Signal-based APIs

**Preparação para Signals (Angular 16+):**

```typescript
// Quando signals estiverem estáveis, migrar para:
export class ComponentComponent {
  // Reactive state with signals
  count = signal(0);
  isVisible = signal(true);

  // Computed values
  doubleCount = computed(() => this.count() * 2);

  // Effects
  constructor() {
    effect(() => {
      console.log('Count changed to:', this.count());
    });
  }
}
```

**O que faz:** Signals são uma nova API reativa do Angular que oferece uma alternativa mais eficiente ao change detection tradicional. Signals permitem criar estado reativo que notifica automaticamente sobre mudanças, computed values que se atualizam automaticamente quando suas dependências mudam, e effects que reagem a mudanças de estado. Isso resulta em melhor performance e código mais declarativo e previsível.

### 5. Dependency Injection com `inject()`

**✅ Função `inject()` (Angular 14+):**

```typescript
export class ComponentComponent {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }
}
```

**O que faz:** A função `inject()` é uma alternativa moderna ao constructor injection que permite injetar dependências em qualquer lugar da classe, não apenas no constructor. Isso torna o código mais limpo, facilita testes unitários (pois elimina a necessidade de mockar no constructor), e é especialmente útil em functional components e composables. É a abordagem recomendada para novos projetos Angular.

**❌ Constructor injection (ainda válido, mas prefer `inject()`):**

```typescript
export class ComponentComponent {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
```

### 6. Required Inputs

**✅ Use `input.required()` quando aplicável:**

```typescript
export class ComponentComponent {
  // Required input with new API
  title = input.required<string>();

  // Optional input with default
  variant = input<ButtonVariant>('primary');

  // Transform input
  disabled = input(false, {
    transform: booleanAttribute
  });
}
```

**O que faz:** A nova API `input()` oferece uma forma mais moderna e type-safe de definir inputs em componentes. `input.required()` força que a propriedade seja fornecida, melhorando a segurança de tipos. A opção `transform` permite converter automaticamente valores (como strings para booleans), e a API é mais concisa que a sintaxe tradicional `@Input()`. Isso resulta em componentes mais robustos e menos propensos a erros.

### 7. Output Functions

**✅ Use output functions:**

```typescript
export class ComponentComponent {
  // Modern output declaration
  buttonClick = output<Event>();
  valueChange = output<string>();

  handleClick(event: Event): void {
    this.buttonClick.emit(event);
  }
}
```

**O que faz:** A função `output()` é a nova API para criar event emitters em componentes, substituindo a sintaxe tradicional `@Output() EventEmitter`. É mais concisa, oferece melhor type safety e é a abordagem recomendada para novas aplicações Angular. A API é mais simples de usar e se integra melhor com outras funcionalidades modernas do framework.

### 8. OnPush Change Detection Strategy

**✅ Use OnPush para melhor performance:** (Quando aplicável)

```typescript
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'bb-component',
  templateUrl: './component.component.html',
  standalone: true,
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

### 9. TrackBy Functions para Loops

**✅ Sempre use trackBy em loops:**

```typescript
@Component({
  template: `
    @for (item of items; track trackByFn($index, item)) {
      <div>{{ item.name }}</div>
    }
  `
})
export class ComponentComponent {
  items = [...];

  // TrackBy function for better performance
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
```

**O que faz:** TrackBy functions permitem ao Angular identificar quais itens da lista mudaram, foram adicionados ou removidos. Sem trackBy, o Angular re-renderiza todos os elementos da lista mesmo quando apenas um item muda. Com trackBy, apenas os itens modificados são atualizados, melhorando drasticamente a performance em listas dinâmicas.

### 10. Async Pipe e Reactive Patterns

**✅ Use async pipe para observables:**

```typescript
export class ComponentComponent {
  // Use observables with async pipe
  data$ = this.dataService.getData();

  // Template usage: {{ data$ | async }}
}
```

**O que faz:** O async pipe automaticamente se inscreve em observables, atualiza a view quando novos valores são emitidos, e se desinscreve automaticamente quando o componente é destruído. Isso elimina vazamentos de memória e simplifica o gerenciamento de subscriptions, além de funcionar perfeitamente com OnPush change detection.

### 11. Lifecycle Hooks com DestroyRef

**✅ Use DestroyRef para cleanup (Angular 16+):**

```typescript
import { DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export class ComponentComponent {
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.dataService
      .getData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        // Handle data
      });
  }
}
```

**O que faz:** DestroyRef fornece uma forma moderna e automática de limpar subscriptions quando o componente é destruído. O operador `takeUntilDestroyed()` automaticamente completa observables quando o componente é destruído, eliminando a necessidade de gerenciar manualmente unsubscribe() no ngOnDestroy. Isso previne vazamentos de memória de forma mais elegante.

### 12. Type Safety com Generic Components

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

### 13. Content Projection com ng-content

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

### 14. Host Bindings e HostListener

**✅ Use host bindings para melhor encapsulamento:**

```typescript
@Component({
  selector: 'bb-button',
  template: `...`,
  host: {
    '[class]': 'buttonClasses',
    '[attr.disabled]': 'disabled || null',
    '[attr.aria-pressed]': 'pressed',
    '(click)': 'handleClick($event)',
    '(keydown.enter)': 'handleClick($event)',
    '(keydown.space)': 'handleClick($event)'
  }
})
export class ButtonComponent {
  @Input() disabled = false;
  @Input() pressed = false;

  get buttonClasses() {
    return 'btn ' + (this.disabled ? 'btn-disabled' : '');
  }

  handleClick(event: Event) {
    if (!this.disabled) {
      this.buttonClick.emit(event);
    }
  }
}
```

**O que faz:** Host bindings aplicam propriedades, classes e event listeners diretamente ao elemento host do componente (a tag do componente). Isso melhora o encapsulamento ao manter a lógica de styling e eventos dentro da classe do componente, tornando-o mais autônomo e elimina a necessidade de manipulação manual do DOM ou HostListener decorators.

### 15. Performance: Lazy Loading e Preloading

**✅ Use lazy loading para componentes pesados:**

```typescript
// Lazy load heavy components
export class ComponentComponent {
  private heavyComponent = import('./heavy-component/heavy.component').then(
    (m) => m.HeavyComponent
  );

  async loadHeavyComponent() {
    const component = await this.heavyComponent;
    // Use component when needed
  }
}
```

**O que faz:** Lazy loading permite carregar componentes, módulos ou funcionalidades apenas quando necessário, reduzindo o bundle inicial da aplicação. Usando dynamic imports (`import()`), você pode dividir o código em chunks menores que são carregados sob demanda. Isso melhora significativamente o tempo de carregamento inicial, especialmente em aplicações grandes, pois apenas o código essencial é baixado inicialmente.

### 16. Error Boundaries e Error Handling

**✅ Implemente error handling robusto:**

```typescript
@Component({
  selector: 'bb-error-boundary',
  template: `
    @if (hasError) {
      <div class="error-container" role="alert">
        <ng-content select="[slot=error]"></ng-content>
      </div>
    } @else {
      <ng-content></ng-content>
    }
  `
})
export class ErrorBoundaryComponent implements OnInit {
  @Input() hasError = false;
  @Output() errorOccurred = output<Error>();

  private errorHandler = inject(ErrorHandler);

  ngOnInit() {
    // Handle global errors
    this.errorHandler.handleError = (error: any) => {
      this.hasError = true;
      this.errorOccurred.emit(error);
    };
  }
}
```

**O que faz:** Error boundaries capturam erros JavaScript que ocorrem em qualquer lugar da árvore de componentes filhos, registram esses erros e exibem uma UI de fallback em vez de quebrar toda a aplicação. Isso melhora a experiência do usuário ao isolar falhas e permite que outras partes da aplicação continuem funcionando normalmente, além de facilitar o monitoramento e debugging de erros em produção.

### 17. Internacionalização (i18n)

**✅ Prepare componentes para i18n:**

```typescript
@Component({
  selector: 'bb-date-picker',
  template: `
    <button [attr.aria-label]="closeButtonLabel" i18n-aria-label="@@close-button">
      <span i18n="@@close">Close</span>
    </button>
  `
})
export class DatePickerComponent {
  // Use i18n attributes for accessibility
  closeButtonLabel = $localize`:@@close-button-aria:Close date picker`;
}
```

**O que faz:** Internacionalização (i18n) prepara seus componentes para suportar múltiplos idiomas e regiões. Usando atributos `i18n` e a função `$localize`, você marca textos para tradução e garante que elementos de acessibilidade também sejam traduzidos. Isso permite que sua aplicação seja facilmente adaptada para diferentes mercados, melhorando a experiência de usuários globais e cumprindo requisitos de acessibilidade em vários idiomas.

### 18. ViewChild e ElementRef Best Practices

**✅ Use ViewChild com type safety:**

```typescript
export class ComponentComponent implements AfterViewInit {
  @ViewChild('inputElement', { static: true })
  inputElement!: ElementRef<HTMLInputElement>;

  @ViewChild(SomeChildComponent)
  childComponent!: SomeChildComponent;

  ngAfterViewInit() {
    // Safe to access ViewChild references here
    this.inputElement.nativeElement.focus();
  }
}
```

**O que faz:** ViewChild permite acessar elementos DOM ou componentes filhos diretamente da classe do componente. Com type safety (usando `ElementRef<HTMLInputElement>`), você tem autocompletar e verificação de tipos. O flag `static: true` carrega a referência durante o ngOnInit, enquanto `static: false` (padrão) carrega no ngAfterViewInit. Isso é útil para operações como foco, animações ou chamadas de métodos em componentes filhos.

### 19. Custom Validators

**✅ Crie validators reutilizáveis:**

```typescript
export function customEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email = control.value;

    if (!email) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : { customEmail: true };
  };
}

// Usage in component
@Component({
  template: `
    <bb-input [formControl]="emailControl" [customValidators]="[customEmailValidator()]">
    </bb-input>
  `
})
export class FormComponent {
  emailControl = new FormControl('', [customEmailValidator()]);
}
```

**O que faz:** Custom validators permitem criar validações reutilizáveis e específicas para suas necessidades de negócio que vão além dos validators padrão do Angular. Eles retornam `null` para valores válidos ou um objeto de erro para valores inválidos. Isso promove reutilização de código, consistência na validação e facilita testes, além de permitir validações complexas que podem envolver lógica de negócio específica.

### 20. Memoization e Pure Functions

**✅ Use memoization para computações caras:**

```typescript
export class ComponentComponent {
  private _computedValue: any;
  private _lastInputs: any[] = [];

  // Memoized getter
  get expensiveComputation(): any {
    const currentInputs = [this.prop1, this.prop2, this.prop3];

    if (!this.inputsEqual(currentInputs, this._lastInputs)) {
      this._computedValue = this.performExpensiveComputation(currentInputs);
      this._lastInputs = [...currentInputs];
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

---

## 🧪 Padrões de Teste

> **Importante:**
>
> - Todos os comentários nos arquivos de teste devem ser em inglês.
> - **Antes de cada `expect` em qualquer teste, adicione uma linha em branco** para melhorar a legibilidade e seguir o padrão do projeto.
> - **Sempre use `fixture.componentRef.setInput()` para definir propriedades de input nos testes** (abordagem recomendada pelo Angular Team).

### 1. Estrutura de Testes

```typescript
describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement.query(By.css('[data-testid="component"]')).nativeElement;
  });

  // Required tests...
});
```

### 2. Categorias de Testes Obrigatórios

#### A. Testes Básicos

```typescript
describe('Basic Functionality', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.variant).toBe('primary');

    expect(component.disabled).toBeFalsy();
  });
});
```

#### B. Testes de Propriedades

```typescript
describe('Input Properties', () => {
  it('should apply variant classes correctly', () => {
    fixture.componentRef.setInput('variant', 'secondary');
    fixture.detectChanges();

    expect(element.classList).toContain('expected-class');
  });

  it('should handle disabled state', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(element.disabled).toBeTruthy();
  });

  it('should update loading state', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    expect(component.loading).toBeTruthy();

    expect(element.classList).toContain('loading-class');
  });
});
```

#### C. Testes de Eventos

```typescript
describe('Events', () => {
  it('should emit componentClick when clicked', () => {
    spyOn(component.componentClick, 'emit');

    element.click();

    expect(component.componentClick.emit).toHaveBeenCalled();
  });
});
```

#### D. Testes de Acessibilidade

```typescript
describe('Accessibility', () => {
  it('should have proper aria attributes', () => {
    component.ariaLabel = 'Test label';
    fixture.detectChanges();

    expect(element.getAttribute('aria-label')).toBe('Test label');
  });
});
```

---

## 📖 Padrões para Storybook

### 1. Estrutura Base da Story

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ComponenteComponent, ComponentVariant } from './componente.component';

const meta: Meta<ComponenteComponent> = {
  title: 'Components/Componente',
  component: ComponenteComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Descrição clara e concisa do componente e seu propósito.'
      }
    }
  },
  argTypes: {
    // Controls configuration...
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ComponenteComponent>;
```

### 2. Stories Obrigatórias

#### A. Default Story

```typescript
export const Default: Story = {
  args: {
    variant: 'primary'
    // other default values...
  },
  render: (args) => ({
    props: args,
    template: `<bb-componente ${argsToTemplate(args)}>Conteúdo</bb-componente>`
  })
};
```

#### B. Todas as Variantes

```typescript
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4">
        <bb-componente variant="primary">Primary</bb-componente>
        <bb-componente variant="secondary">Secondary</bb-componente>
        <bb-componente variant="danger">Danger</bb-componente>
      </div>
    `
  })
};
```

#### C. Estados Especiais

```typescript
export const LoadingState: Story = {
  args: {
    loading: true,
    loadingText: 'Carregando...'
  }
};

export const DisabledState: Story = {
  args: {
    disabled: true
  }
};
```

#### D. Playground

```typescript
export const Playground: Story = {
  args: {
    variant: 'primary'
    // All configurable props...
  }
};
```

---

## 🎛️ Configuração de Props

### 1. Inputs Recomendados

#### Props Visuais

```typescript
@Input() variant: ComponentVariant = 'primary'; // Visual variant
@Input() size: ComponentSize = 'md'; // Size
@Input() className: string = ''; // Additional classes
```

#### Props de Estado

```typescript
@Input() disabled: boolean = false; // Disabled state
@Input() loading: boolean = false; // Loading state
@Input() readonly: boolean = false; // Read-only (when applicable)
```

#### Props de Acessibilidade

```typescript
@Input() ariaLabel?: string; // Accessible label
@Input() ariaDescribedBy?: string; // Description
@Input() ariaExpanded?: boolean; // Expanded state
@Input() role?: string; // Custom ARIA role
```

### 2. Outputs Padronizados

```typescript
@Output() componentClick = new EventEmitter<Event>(); // Clicks
@Output() valueChange = new EventEmitter<T>(); // Value changes
@Output() focusChange = new EventEmitter<boolean>(); // Focus changes
@Output() stateChange = new EventEmitter<StateType>(); // State changes
```

---

## 🔄 Gerenciamento de Estado

### 1. Estados Internos

```typescript
export class ComponenteComponent {
  // Private states
  private _isOpen = false;
  private _value: T | null = null;

  // Getters/Setters when needed
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    this._isOpen = value;
    this.stateChange.emit({ isOpen: value });
  }
}
```

### 2. Estados Computados

```typescript
get isInteractive(): boolean {
  return !this.disabled && !this.loading;
}

get computedAriaLabel(): string {
  return this.ariaLabel || this.defaultAriaLabel;
}
```

---

## 🔗 Integração com Design System

### 1. Design Tokens

```typescript
// Import tokens
import { colors, typography, spacing } from '@bytebank-pro/shared-design-tokens';

// Usage in classes
const colorClass = `bg-bytebank-${this.variant}`;
const spacingClass = `p-${spacing.md}`;
```

### 2. Classes CSS Consistentes

```typescript
const COMPONENT_CLASSES = {
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  variants: {
    primary: 'bg-bytebank-blue text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  },
  sizes: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
};
```

---

## 📝 Documentação

### 1. JSDoc Obrigatório

````typescript
/**
 * Flexible button component with multiple variants and states.
 *
 * @example
 * ```html
 * <bb-button variant="primary" (buttonClick)="handleClick()">
 *   Click here
 * </bb-button>
 * ```
 */
@Component({...})
export class ButtonComponent {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * Event emitted when the button is clicked
   */
  @Output() buttonClick = new EventEmitter<Event>();
}
````

### 2. README do Componente

Cada componente deve ter documentação clara incluindo:

- **Propósito**: Para que serve o componente
- **Uso básico**: Exemplo mínimo
- **Props**: Todas as propriedades disponíveis
- **Eventos**: Todos os eventos emitidos
- **Exemplos**: Casos de uso comuns
- **Acessibilidade**: Considerações especiais

---

## ✅ Checklist de Criação

### Antes de Começar

- [ ] Nome do componente definido (kebab-case)
- [ ] Propósito e funcionalidade claros
- [ ] Design tokens identificados
- [ ] Requisitos de acessibilidade mapeados

### Durante o Desenvolvimento

- [ ] Estrutura de arquivos criada
- [ ] Componente TypeScript implementado
- [ ] Template HTML criado (usando sintaxe moderna: `@if`, `@for`, `@switch`)
- [ ] Estilos com TailwindCSS aplicados
- [ ] Props e eventos definidos
- [ ] Acessibilidade implementada
- [ ] Componente standalone configurado
- [ ] **OnPush change detection strategy configurada**
- [ ] **Host bindings implementados quando apropriado**
- [ ] **TrackBy functions adicionadas aos loops**
- [ ] **Error handling implementado**
- [ ] **Type safety com generics (se aplicável)**

### Testes e Documentação

- [ ] Testes unitários escritos (com comentários em inglês e linha em branco antes de cada `expect`)
- [ ] **Uso obrigatório de `fixture.componentRef.setInput()` nos testes**
- [ ] Stories do Storybook criadas
- [ ] Documentação JSDoc adicionada
- [ ] Exemplos de uso documentados
- [ ] **Testes de acessibilidade incluídos**
- [ ] **Testes de performance básicos**

### Finalização

- [ ] Componente exportado no `public-api.ts`
- [ ] Testes passando
- [ ] Storybook funcionando
- [ ] Build da biblioteca bem-sucedido
- [ ] Revisão de código realizada
- [ ] **Performance checklist validado**
- [ ] **Acessibilidade checklist validado**
- [ ] **Bundle size analisado**

---

## 🚀 Exemplo Prático: Criando um Input Component

Vamos aplicar todas as boas práticas criando um componente de input:

### 1. Estrutura de Arquivos

```
src/
└── input/
    ├── input.component.ts
    ├── input.component.html
    ├── input.component.spec.ts
    └── input.component.stories.ts
```

### 2. TypeScript (input.component.ts)

```typescript
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'; // If needed for forms

// All comments in this file must be in English

export type InputVariant = 'default' | 'error' | 'success';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputType = 'text' | 'email' | 'password' | 'number';

@Component({
  selector: 'bb-input',
  templateUrl: './input.component.html',
  styleUrls: ['../styles/index.css'],
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {
  @Input() type: InputType = 'text';
  @Input() variant: InputVariant = 'default';
  @Input() size: InputSize = 'md';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() className: string = '';

  // Accessibility
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() errorMessage?: string;

  @Output() inputChange = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<Event>();
  @Output() inputBlur = new EventEmitter<Event>();

  private _value: string = '';
  private onChange = (value: string) => {};
  private onTouched = () => {};

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
    this.inputChange.emit(val);
  }

  get inputClasses(): string {
    const baseClasses =
      'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-colors';

    let variantClasses = '';
    switch (this.variant) {
      case 'default':
        variantClasses = 'ring-gray-300 focus:ring-bytebank-blue';
        break;
      case 'error':
        variantClasses = 'ring-red-300 focus:ring-red-500';
        break;
      case 'success':
        variantClasses = 'ring-green-300 focus:ring-green-500';
        break;
    }

    let sizeClasses = '';
    switch (this.size) {
      case 'sm':
        sizeClasses = 'px-2.5 py-1.5 text-sm';
        break;
      case 'md':
        sizeClasses = 'px-3 py-2 text-sm';
        break;
      case 'lg':
        sizeClasses = 'px-4 py-3 text-base';
        break;
    }

    const disabledClasses = this.disabled ? 'opacity-60 cursor-not-allowed' : '';

    return `${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${this.className}`;
  }

  // ControlValueAccessor implementation
  writeValue(value: string): void {
    this._value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  onFocus(event: Event): void {
    this.inputFocus.emit(event);
  }

  onBlur(event: Event): void {
    this.onTouched();
    this.inputBlur.emit(event);
  }
}
```

### 3. Template (input.component.html)

```html
<div class="space-y-1">
  <input
    [type]="type"
    [ngClass]="inputClasses"
    [placeholder]="placeholder"
    [disabled]="disabled"
    [readonly]="readonly"
    [value]="value"
    [attr.aria-label]="ariaLabel"
    [attr.aria-describedby]="ariaDescribedBy"
    [attr.aria-invalid]="variant === 'error' ? 'true' : 'false'"
    (input)="onInput($event)"
    (focus)="onFocus($event)"
    (blur)="onBlur($event)"
    data-testid="input-field"
  />

  @if (errorMessage && variant === 'error') {
  <p class="text-sm text-red-600" [id]="ariaDescribedBy">{{ errorMessage }}</p>
  }
</div>
```

### 4. Testes (input.component.spec.ts)

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent] // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('[data-testid="input-field"]')).nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Input Properties', () => {
    it('should apply variant styles correctly', () => {
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(inputElement.classList).toContain('ring-red-300');
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(inputElement.disabled).toBeTruthy();

      expect(inputElement.classList).toContain('opacity-60');
    });

    it('should set placeholder text', () => {
      const placeholderText = 'Enter your email';
      fixture.componentRef.setInput('placeholder', placeholderText);
      fixture.detectChanges();

      expect(inputElement.placeholder).toBe(placeholderText);
    });
  });

  describe('Events', () => {
    it('should emit inputChange when value changes', () => {
      spyOn(component.inputChange, 'emit');

      inputElement.value = 'test value';
      inputElement.dispatchEvent(new Event('input'));

      expect(component.inputChange.emit).toHaveBeenCalledWith('test value');
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria attributes', () => {
      fixture.componentRef.setInput('ariaLabel', 'Email input');
      fixture.componentRef.setInput('variant', 'error');
      fixture.detectChanges();

      expect(inputElement.getAttribute('aria-label')).toBe('Email input');

      expect(inputElement.getAttribute('aria-invalid')).toBe('true');
    });
  });
});
```

> **Importante:**  
> Sempre utilize as novas sintaxes de template do Angular (ex: blocos `@if`, `@for`, etc.) conforme introduzidas nas versões recentes do framework.  
> **Não utilize mais as sintaxes antigas como `*ngIf`, `*ngFor` e similares.**  
> Esta regra vale para todos os exemplos e componentes deste guia.

---

## 📚 Recursos Adicionais

### Documentação Oficial Angular

- [Angular Component Development Best Practices](https://angular.dev/best-practices)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Angular Control Flow Blocks (@if, @for, @switch)](https://angular.dev/guide/templates/control-flow)
- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Modern Testing with setInput()](https://angular.dev/guide/testing/components-scenarios#setting-component-inputs)

### Recursos Complementares

- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Storybook Documentation](https://storybook.js.org/docs/angular)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Lucide Angular](https://www.npmjs.com/package/lucide-angular)

### Atualizações Importantes

**🚨 Práticas Descontinuadas:**

- `*ngIf`, `*ngFor`, `*ngSwitch` → Use `@if`, `@for`, `@switch`
- `component.property = value` nos testes → Use `fixture.componentRef.setInput()`
- NgModules para novos componentes → Use standalone components
- Constructor injection → Prefira `inject()` function
- Default change detection → Use `OnPush` strategy
- Manual subscription cleanup → Use `takeUntilDestroyed()` with `DestroyRef`
- Direct DOM manipulation → Use `Renderer2` ou host bindings
- `@Output() EventEmitter` → Use `output()` function
- `@Input()` without transforms → Use `input()` with transforms quando apropriado
- Loops sem trackBy → Sempre use `track` em `@for`
- Synchronous validators → Use async validators quando necessário
- Hardcoded strings → Use i18n para textos visíveis ao usuário

**✅ Práticas Recomendadas:**

- Use `OnPush` change detection strategy por padrão
- Implemente `trackBy` functions em todos os loops
- Use `takeUntilDestroyed()` para cleanup automático
- Prefira `host` bindings para eventos e classes
- Use `async` pipe para observables
- Implemente error boundaries para componentes críticos
- Use type safety com generics quando apropriado
- Prepare componentes para internacionalização (i18n)
- Use memoization para computações caras
- Implemente acessibilidade desde o início

---

**Mantido por:** Equipe ByteBank Pro  
**Última atualização:** Junho 2025
