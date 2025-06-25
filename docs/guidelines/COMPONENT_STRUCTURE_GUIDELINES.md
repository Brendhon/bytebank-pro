# 🎨 Diretrizes para Componentes e Estilo

Este documento define boas práticas para criação de componentes no ByteBank Pro, incluindo estrutura, estilo e organização.

## 🖼️ Ícones

- **Sempre utilize ícones da biblioteca [`lucide-angular`](https://www.npmjs.com/package/lucide-angular`)**.
- **Não utilize SVGs customizados ou outras bibliotecas de ícones**.
- **Importe apenas os ícones necessários** para cada componente.

## 📁 Estrutura de Arquivos

### Estrutura Padrão

```
src/
└── nome-do-componente/
  ├── nome-do-componente.component.ts
  └── nome-do-componente.component.stories.ts
```

### Convenções de Nomenclatura

- **Pasta**: `kebab-case` (ex: `date-picker`)
- **Arquivo**: `kebab-case.component.{ext}` (ex: `date-picker.component.ts`)
- **Classe**: `PascalCaseComponent` (ex: `DatePickerComponent`)
- **Seletor**: `bb-kebab-case` (ex: `bb-date-picker`)

## 🔧 Estrutura do Componente TypeScript

```typescript
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

// 1. Define specific types for the component
export type ComponentVariant = 'primary' | 'secondary' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'bb-nome-componente', // 2. 'bb-' prefix is mandatory
  standalone: true, // 3. Always use standalone components
  imports: [CommonModule], // 4. Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // 5. OnPush for better performance
  template: `
    <div [class]="componentClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class NomeComponenteComponent {
  // 6. Inputs with sensible default values
  @Input() variant: ComponentVariant = 'primary';
  @Input() size: ComponentSize = 'md';
  @Input() disabled = false;
  @Input() className = '';

  // 7. Outputs with descriptive names
  @Output() componentClick = new EventEmitter<MouseEvent>();

  // 8. Computed classes
  get componentClasses(): string {
    return [
      'base-class',
      `size-${this.size}`,
      `variant-${this.variant}`,
      this.disabled ? 'disabled' : '',
      this.className
    ]
      .filter(Boolean)
      .join(' ');
  }

  // 9. Event handlers
  handleClick(event: MouseEvent): void {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.componentClick.emit(event);
  }
}
```

## 🎨 Padrões de Estilo e CSS

### Uso do TailwindCSS

- **Sempre use classes Tailwind**.
- **Evite CSS customizado** desnecessário.
- **Utilize design tokens** do `@bytebank-pro/shared-design-tokens`.

### Estrutura de Classes

```typescript
get componentClasses(): string {
  const baseClasses = 'classe-base tailwind-utilities';
  const variantClasses = this.variantClasses[this.variant] || '';
  const sizeClasses = this.sizeClasses[this.size] || '';
  const stateClasses = this.disabled ? 'opacity-60 cursor-not-allowed' : '';

  return `${baseClasses} ${variantClasses} ${sizeClasses} ${stateClasses} ${this.className}`;
}

private variantClasses: Record<ComponentVariant, string> = {
  primary: 'bg-bytebank-blue text-white hover:bg-blue-600',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

private sizeClasses: Record<ComponentSize, string> = {
  sm: 'text-sm px-2 py-1',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3'
};
```

### Design Tokens

- **Cores**: `bg-bytebank-blue`, `text-bytebank-green`, etc.
- **Espaçamentos**: Classes Tailwind (`p-4`, `m-2`)
- **Tipografia**: Classes dos design tokens
- **Border radius**: `rounded-md` padrão

### Variáveis CSS

```css
:root {
  --bytebank-blue: #0052cc;
  --bytebank-green: #006644;
  --bytebank-transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}

.btn {
  background-color: var(--bytebank-blue);
  transition: all var(--bytebank-transition);
}
```

### Estilos Responsivos

Utilize breakpoints do Tailwind para responsividade:

```html
<div class="flex flex-col md:flex-row lg:items-center">
  <!-- Responsive content -->
</div>
```

### Estados de Interação

```typescript
const buttonClasses = {
  base: 'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  interactive: {
    hover: 'hover:bg-opacity-90',
    active: 'active:bg-opacity-100',
    focus: 'focus:ring-bytebank-blue focus:ring-opacity-50'
  },
  disabled: 'opacity-50 cursor-not-allowed pointer-events-none'
};
```

## 🎛️ Configuração de Props

### Inputs Recomendados

#### Visuais

```typescript
@Input() variant: ComponentVariant = 'primary';
@Input() size: ComponentSize = 'md';
@Input() className: string = '';
@Input() showIcon: boolean = false;
@Input() position: 'left' | 'right' | 'top' | 'bottom' = 'left';
```

#### Estado

```typescript
@Input() disabled: boolean = false;
@Input() loading: boolean = false;
@Input() readonly: boolean = false;
@Input() selected: boolean = false;
@Input() expanded: boolean = false;
```

#### Acessibilidade

```typescript
@Input() ariaLabel?: string;
@Input() ariaDescribedBy?: string;
@Input() ariaExpanded?: boolean;
@Input() role?: string;
@Input() ariaRequired?: boolean;
@Input() ariaInvalid?: boolean;
```

### Outputs Padronizados

```typescript
@Output() componentClick = new EventEmitter<Event>();
@Output() valueChange = new EventEmitter<T>();
@Output() focusChange = new EventEmitter<boolean>();
@Output() stateChange = new EventEmitter<StateType>();
@Output() selectionChange = new EventEmitter<T>();
@Output() submit = new EventEmitter<FormData>();
```

## 🔄 Gerenciamento de Estado

### Estados Internos

```typescript
export class ComponenteComponent {
  // Private states
  private _isOpen = false;
  private _value: T | null = null;
  private _selectedItems: T[] = [];
  private _currentPage = 1;

  // Getters/Setters
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this.stateChange.emit({ isOpen: value });
    }
  }

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: T): void {
    this._selectedItems = [...this._selectedItems, item];
    this.selectionChange.emit(item);
  }
}
```

### Estados Computados

```typescript
get isInteractive(): boolean {
  return !this.disabled && !this.loading;
}

get computedAriaLabel(): string {
  return this.ariaLabel || this.defaultAriaLabel;
}

get hasError(): boolean {
  return this.variant === 'error' || this.errors?.length > 0;
}

get displayValue(): string {
  return this.formatter ? this.formatter(this.value) : String(this.value);
}
```

### Computed Styles

```typescript
get inputClasses(): string {
  return this.classBuilder
  .base('form-input rounded-md shadow-sm')
  .state({
    'border-red-300 focus:border-red-500 focus:ring-red-500': this.hasError,
    'opacity-50 bg-gray-100': this.disabled,
    'border-green-300': this.variant === 'success'
  })
  .size(this.size, {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2',
    lg: 'px-4 py-3 text-lg'
  })
  .custom(this.className)
  .build();
}

// Helper class for organizing classes
private classBuilder = {
  classes: [] as string[],

  base(classes: string): typeof this {
  this.classes = [classes];
  return this;
  },

  state(conditions: Record<string, boolean>): typeof this {
  Object.entries(conditions)
    .filter(([_, condition]) => condition)
    .forEach(([className]) => this.classes.push(className));
  return this;
  },

  size<T extends string>(size: T, sizeMap: Record<T, string>): typeof this {
  this.classes.push(sizeMap[size] || '');
  return this;
  },

  custom(className: string): typeof this {
  if (className) this.classes.push(className);
  return this;
  },

  build(): string {
  return this.classes.filter(Boolean).join(' ');
  }
};
```

## 🔗 Integração com Design System

### Design Tokens

```typescript
import { colors, typography, spacing } from '@bytebank-pro/shared-design-tokens';

const colorClass = `bg-bytebank-${this.variant}`;
const spacingClass = `p-${spacing.md}`;
const typographyClass = typography.body;
```

### Classes CSS Consistentes

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
  },
  states: {
    disabled: 'opacity-60 cursor-not-allowed',
    loading: 'relative pointer-events-none',
    focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bytebank-blue'
  }
};
```

## 📱 Design Responsivo

### Breakpoints

Siga os breakpoints do Tailwind:

```
'sm': '640px',
'md': '768px',
'lg': '1024px',
'xl': '1280px',
'2xl': '1536px',
```

### Estratégia Mobile-First

```html
<div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
  <div class="w-full md:w-1/2"><!-- Content --></div>
  <div class="w-full md:w-1/2"><!-- Content --></div>
</div>
```

### Container Queries

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## ⚡ Performance

### Otimização de Renderização

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
  // other metadata
})
export class OptimizedComponent {
  // Implementation with OnPush strategy
}
```

### Memoização

```typescript
private _memoizedResults: Map<string, any> = new Map();

getComputedValue(input: string): any {
  if (this._memoizedResults.has(input)) {
  return this._memoizedResults.get(input);
  }
  const result = this.expensiveComputation(input);
  this._memoizedResults.set(input, result);
  return result;
}
```

### Lazy Loading

```typescript
// Lazy load heavy component
private loadHeavyComponent() {
  if (this.shouldShowHeavy) {
  import('./heavy-component').then(module => {
    // Use heavy component when needed
  });
  }
}
```

### Virtual Scrolling

```html
<cdk-virtual-scroll-viewport itemSize="50" class="h-[400px]">
  @for (item of items; track item.id) {
  <div class="h-[50px]">{{ item.content }}</div>
  }
</cdk-virtual-scroll-viewport>
```

## 🧩 Composição de Componentes

### Content Projection

```typescript
@Component({
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

// Usage:
// <bb-card>
//   <h2 slot="header">Card Title</h2>
//   <p>Card content</p>
//   <div slot="footer">Card footer</div>
// </bb-card>
```

### Composição com Diretivas

```typescript
@Directive({
  selector: '[bbTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('bbTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

  // Implementation
}

// Usage:
// <button bbTooltip="Ajuda" tooltipPosition="right">?</button>
```

### Componentes Compostos

```typescript
@Component({
  selector: 'bb-form-field',
  template: `
    <div class="form-field">
      <label [for]="inputId" class="form-label">
        {{ label }}
        @if (required) {
          <span class="text-red-500">*</span>
        }
      </label>
      <div class="input-container">
        <ng-content></ng-content>
      </div>
      @if (hint) {
        <div class="form-hint">{{ hint }}</div>
      }
      @if (errorMessage) {
        <div class="form-error">{{ errorMessage }}</div>
      }
    </div>
  `
})
export class FormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() hint = '';
  @Input() errorMessage = '';
  @Input() inputId = `field-${uniqueId()}`;
}

// Usage:
// <bb-form-field label="Email" required="true" errorMessage="Email inválido">
//   <bb-input type="email" [id]="inputId"></bb-input>
// </bb-form-field>
```

## 🌟 Exemplos de Componentes

### Botão

```typescript
@Component({
  selector: 'bb-button',
  template: `
    <button
      type="button"
      [class]="buttonClasses"
      [disabled]="disabled || loading"
      [attr.aria-disabled]="disabled || loading"
      [attr.aria-busy]="loading"
      (click)="handleClick($event)"
    >
      @if (loading) {
        <span class="spinner" aria-hidden="true"></span>
        <span class="sr-only">Carregando...</span>
      }
      <ng-content></ng-content>
    </button>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() className = '';

  @Output() buttonClick = new EventEmitter<MouseEvent>();

  get buttonClasses(): string {
    // Compose classes
    return '';
  }

  handleClick(event: MouseEvent): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      return;
    }
    this.buttonClick.emit(event);
  }
}
```

### Input

```typescript
@Component({
  selector: 'bb-input',
  template: `
    <input
      [type]="type"
      [class]="inputClasses"
      [id]="id"
      [value]="value"
      [disabled]="disabled"
      [readonly]="readonly"
      [placeholder]="placeholder"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-invalid]="invalid ? 'true' : 'false'"
      (input)="onInput($event)"
      (focus)="onFocus($event)"
      (blur)="onBlur($event)"
    />
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent {
  // Inputs, outputs and methods
}
```

### Card

```typescript
@Component({
  selector: 'bb-card',
  template: `
    <div [class]="cardClasses">
      @if (title || titleTemplate) {
        <div class="card-header">
          @if (title) {
            <h3 class="card-title">{{ title }}</h3>
          } @else {
            <ng-container [ngTemplateOutlet]="titleTemplate"></ng-container>
          }
        </div>
      }
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      @if (footer) {
        <div class="card-footer">
          {{ footer }}
        </div>
      }
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() title?: string;
  @Input() titleTemplate?: TemplateRef<any>;
  @Input() footer?: string;
  @Input() variant: 'default' | 'outline' | 'elevated' = 'default';
  @Input() className = '';

  get cardClasses(): string {
    // Card classes
    return '';
  }
}
```

## ✅ Checklist de Criação

### Antes de Começar

- [ ] Nome do componente definido (`kebab-case`)
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
- [ ] Estratégia de detecção de mudanças OnPush aplicada
- [ ] Host bindings implementados quando apropriado
- [ ] Funções trackBy adicionadas aos loops
- [ ] Tratamento de erros implementado
- [ ] Type safety com generics (se aplicável)

### Finalização

- [ ] Componente exportado no `public-api.ts`
- [ ] Testes passando
- [ ] Storybook funcionando
- [ ] Build da biblioteca bem-sucedido
- [ ] Revisão de código realizada
- [ ] Performance validada
- [ ] Acessibilidade validada
- [ ] Bundle size analisado

## 📚 Recursos Adicionais

- [Angular Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Angular Icons](https://lucide.dev/guide/packages/lucide-angular)
- [A11y Style Guide](https://a11y-style-guide.com/style-guide/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
