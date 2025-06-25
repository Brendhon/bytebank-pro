# 🎨 Diretrizes para Componentes e Estilo

Este documento estabelece as boas práticas e padrões para a criação de componentes na biblioteca UI do ByteBank Pro, incluindo estrutura, estilo e organização.

## 🖼️ Ícones

- **Sempre utilize ícones da biblioteca [`lucide-angular`](https://www.npmjs.com/package/lucide-angular)**, que é o equivalente Angular do `lucide-react`.
- **Não utilize SVGs customizados ou outras bibliotecas de ícones**. Padronize todos os ícones com `lucide-angular` para garantir consistência visual e facilidade de manutenção.
- **Importação e uso**: Importe apenas os ícones necessários para cada componente, evitando bundles desnecessários.

## 📁 Estrutura de Arquivos

### Estrutura Padrão por Componente

```
src/
└── nome-component/
  ├── nome-component.component.ts      # Lógica do componente
  └── nome-component.component.stories.ts # Stories do Storybook
```

### Convenções de Nomenclatura

- **Pasta**: `kebab-case` (ex: `date-picker`, `form-input`)
- **Arquivos**: `kebab-case.component.{ext}` (ex: `date-picker.component.ts`)
- **Classe**: `PascalCase + Component` (ex: `DatePickerComponent`)
- **Seletor**: `bb-kebab-case` (ex: `bb-date-picker`)

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
  standalone: true, // 3. Always use standalone components
  imports: [CommonModule], // 4. Required imports
  changeDetection: ChangeDetectionStrategy.OnPush, // 5. OnPush for better performance
  template: `
    <div [class]="componentClasses">
      <ng-content></ng-content>
    </div>
  `
})
export class NomeComponentComponent {
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

### 1. Uso do TailwindCSS

- **Sempre usar classes Tailwind** quando possível
- **Evitar CSS customizado** desnecessário
- **Utilizar design tokens** do `@bytebank-pro/shared-design-tokens`

### 2. Estrutura de Classes

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

### 3. Design Tokens Obrigatórios

- **Cores**: `bg-bytebank-blue`, `text-bytebank-green`, etc.
- **Espaçamentos**: Classes Tailwind padrão (`p-4`, `m-2`)
- **Tipografia**: Classes definidas nos design tokens
- **Border radius**: `rounded-md` como padrão

### 4. Variáveis CSS

Quando necessário, utilize variáveis CSS para valores que precisam ser referenciados em múltiplos lugares:

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

### 5. Estilos Responsivos

Utilize os breakpoints do Tailwind para criar componentes responsivos:

```html
<div class="flex flex-col md:flex-row lg:items-center">
  <!-- Conteúdo responsivo -->
</div>
```

### 6. Estados de Interação

Implemente estilos consistentes para estados de interação:

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

### 1. Inputs Recomendados

#### Props Visuais

```typescript
@Input() variant: ComponentVariant = 'primary'; // Visual variant
@Input() size: ComponentSize = 'md'; // Size
@Input() className: string = ''; // Additional classes
@Input() showIcon: boolean = false; // Optional icon display
@Input() position: 'left' | 'right' | 'top' | 'bottom' = 'left'; // Positioning
```

#### Props de Estado

```typescript
@Input() disabled: boolean = false; // Disabled state
@Input() loading: boolean = false; // Loading state
@Input() readonly: boolean = false; // Read-only (when applicable)
@Input() selected: boolean = false; // Selected state
@Input() expanded: boolean = false; // Expanded state
```

#### Props de Acessibilidade

```typescript
@Input() ariaLabel?: string; // Accessible label
@Input() ariaDescribedBy?: string; // Description
@Input() ariaExpanded?: boolean; // Expanded state
@Input() role?: string; // Custom ARIA role
@Input() ariaRequired?: boolean; // Required state
@Input() ariaInvalid?: boolean; // Invalid state
```

### 2. Outputs Padronizados

```typescript
@Output() componentClick = new EventEmitter<Event>(); // Clicks
@Output() valueChange = new EventEmitter<T>(); // Value changes
@Output() focusChange = new EventEmitter<boolean>(); // Focus changes
@Output() stateChange = new EventEmitter<StateType>(); // State changes
@Output() selectionChange = new EventEmitter<T>(); // Selection changes
@Output() submit = new EventEmitter<FormData>(); // Form submissions
```

## 🔄 Gerenciamento de Estado

### 1. Estados Internos

```typescript
export class ComponenteComponent {
  // Private states
  private _isOpen = false;
  private _value: T | null = null;
  private _selectedItems: T[] = [];
  private _currentPage = 1;

  // Getters/Setters when needed
  get isOpen(): boolean {
    return this._isOpen;
  }

  set isOpen(value: boolean) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this.stateChange.emit({ isOpen: value });
    }
  }

  // Methods to update state
  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  selectItem(item: T): void {
    this._selectedItems = [...this._selectedItems, item];
    this.selectionChange.emit(item);
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

get hasError(): boolean {
  return this.variant === 'error' || this.errors?.length > 0;
}

get displayValue(): string {
  return this.formatter ? this.formatter(this.value) : String(this.value);
}
```

### 3. Computed Styles

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

// Helper class para organizar classes
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

### 1. Design Tokens

```typescript
// Import tokens
import { colors, typography, spacing } from '@bytebank-pro/shared-design-tokens';

// Usage in classes
const colorClass = `bg-bytebank-${this.variant}`;
const spacingClass = `p-${spacing.md}`;
const typographyClass = typography.body;
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
  },
  states: {
    disabled: 'opacity-60 cursor-not-allowed',
    loading: 'relative pointer-events-none',
    focus: 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bytebank-blue'
  }
};
```

## 📱 Design Responsivo

### 1. Breakpoints

Siga os breakpoints definidos pelo Tailwind:

```
'sm': '640px',
'md': '768px',
'lg': '1024px',
'xl': '1280px',
'2xl': '1536px',
```

### 2. Estratégias Mobile-First

```html
<!-- Mobile-first layout -->
<div class="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
  <div class="w-full md:w-1/2"><!-- Conteúdo --></div>
  <div class="w-full md:w-1/2"><!-- Conteúdo --></div>
</div>
```

### 3. Container Queries

Para layouts avançados, considere o uso de container queries quando disponível no browser:

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

### 1. Otimização de Renderização

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
  // other metadata
})
export class OptimizedComponent {
  // Implementation with OnPush strategy
}
```

### 2. Memoização

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

### 3. Lazy Loading

```typescript
// Carregamento lazy de componente pesado
private loadHeavyComponent() {
  if (this.shouldShowHeavy) {
    import('./heavy-component').then(module => {
      // Use o componente pesado quando necessário
    });
  }
}
```

### 4. Virtual Scrolling

```html
<cdk-virtual-scroll-viewport itemSize="50" class="h-[400px]">
  @for (item of items; track item.id) {
  <div class="h-[50px]">{{ item.content }}</div>
  }
</cdk-virtual-scroll-viewport>
```

## 🧩 Composição de Componentes

### 1. Content Projection

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

// Uso:
// <bb-card>
//   <h2 slot="header">Card Title</h2>
//   <p>Card content</p>
//   <div slot="footer">Card footer</div>
// </bb-card>
```

### 2. Composição com Diretivas

```typescript
@Directive({
  selector: '[bbTooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('bbTooltip') tooltipText = '';
  @Input() tooltipPosition: 'top' | 'right' | 'bottom' | 'left' = 'top';

  // Implementação
}

// Uso:
// <button bbTooltip="Ajuda" tooltipPosition="right">?</button>
```

### 3. Componentes Compostos

```typescript
// Arquivo: form-field.component.ts
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

// Uso:
// <bb-form-field label="Email" required="true" errorMessage="Email inválido">
//   <bb-input type="email" [id]="inputId"></bb-input>
// </bb-form-field>
```

## 🌟 Exemplos por Tipo de Componente

### 1. Botões

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
    // Composição de classes
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

### 2. Inputs

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
  // Inputs, outputs e métodos
}
```

### 3. Card

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
    // Classes do card
  }
}
```

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

### Finalização

- [ ] Componente exportado no `public-api.ts`
- [ ] Testes passando
- [ ] Storybook funcionando
- [ ] Build da biblioteca bem-sucedido
- [ ] Revisão de código realizada
- [ ] **Performance checklist validado**
- [ ] **Acessibilidade checklist validado**
- [ ] **Bundle size analisado**

## 📚 Recursos Adicionais

- [Angular Component Dev Kit (CDK)](https://material.angular.io/cdk/categories)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Angular Icons](https://lucide.dev/guide/packages/lucide-angular)
- [A11y Style Guide](https://a11y-style-guide.com/style-guide/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)
