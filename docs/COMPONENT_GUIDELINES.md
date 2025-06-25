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

---

## 🧪 Padrões de Teste

> **Importante:**
>
> - Todos os comentários nos arquivos de teste devem ser em inglês.
> - **Antes de cada `expect` em qualquer teste, adicione uma linha em branco** para melhorar a legibilidade e seguir o padrão do projeto.

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
    component.variant = 'secondary';
    fixture.detectChanges();

    expect(element.classList).toContain('expected-class');
  });

  it('should handle disabled state', () => {
    component.disabled = true;
    fixture.detectChanges();

    expect(element.disabled).toBeTruthy();
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
- [ ] Template HTML criado
- [ ] Estilos com TailwindCSS aplicados
- [ ] Props e eventos definidos
- [ ] Acessibilidade implementada

### Testes e Documentação

- [ ] Testes unitários escritos (com comentários em inglês e linha em branco antes de cada `expect`)
- [ ] Stories do Storybook criadas
- [ ] Documentação JSDoc adicionada
- [ ] Exemplos de uso documentados

### Finalização

- [ ] Componente exportado no `public-api.ts`
- [ ] Testes passando
- [ ] Storybook funcionando
- [ ] Build da biblioteca bem-sucedido
- [ ] Revisão de código realizada

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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

> **Importante:**  
> Sempre utilize as novas sintaxes de template do Angular (ex: blocos `@if`, `@for`, etc.) conforme introduzidas nas versões recentes do framework.  
> **Não utilize mais as sintaxes antigas como `*ngIf`, `*ngFor` e similares.**  
> Esta regra vale para todos os exemplos e componentes deste guia.

---

## 📚 Recursos Adicionais

- [Angular Component Development Best Practices](https://angular.dev/best-practices)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Storybook Documentation](https://storybook.js.org/docs/angular)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Lucide Angular](https://www.npmjs.com/package/lucide-angular)

---

**Mantido por:** Equipe ByteBank Pro  
**Última atualização:** Junho 2025
