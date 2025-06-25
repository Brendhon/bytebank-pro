# ♿ Diretrizes de Acessibilidade

Este documento define os padrões de acessibilidade para todos os componentes da biblioteca UI do ByteBank Pro. Componentes acessíveis são essenciais para garantir que nossos produtos sejam utilizáveis por todas as pessoas, incluindo aquelas com deficiência.

## 1. Princípios Fundamentais

### Perceptível

- Forneça alternativas textuais para conteúdo não textual.
- Ofereça legendas e alternativas para multimídia.
- Permita diferentes formas de apresentação do conteúdo.
- Facilite a visualização e audição do conteúdo.

### Operável

- Toda funcionalidade deve ser acessível via teclado.
- Dê tempo suficiente para leitura e uso do conteúdo.
- Evite conteúdo que possa causar convulsões.
- Ajude na navegação e localização de conteúdo.

### Compreensível

- O texto deve ser legível e compreensível.
- As páginas devem ser previsíveis.
- Ajude a evitar e corrigir erros.

### Robusto

- O conteúdo deve ser compatível com diferentes agentes de usuário, incluindo tecnologias assistivas.

## 2. Atributos ARIA

Os atributos ARIA tornam o conteúdo web mais acessível.

### Exemplos de Atributos ARIA em Componentes

```typescript
// Inputs for accessibility
@Input() ariaLabel?: string;
@Input() ariaDescribedBy?: string;
@Input() ariaExpanded?: boolean; // For expandable components
@Input() role?: string; // When needed
```

### Implementação no Template

```html
<button
  [attr.aria-label]="ariaLabel || defaultAriaLabel"
  [attr.aria-describedby]="ariaDescribedBy"
  [attr.aria-expanded]="ariaExpanded"
  [attr.aria-busy]="loading ? 'true' : 'false'"
  [attr.aria-disabled]="disabled ? 'true' : 'false'"
  [disabled]="disabled || loading"
  [role]="role || 'button'"
>
  <!-- Content -->
</button>
```

### Atributos ARIA Comuns

| Componente      | Atributos ARIA Comuns                                              |
| --------------- | ------------------------------------------------------------------ |
| Botão           | `aria-label`, `aria-pressed`, `aria-disabled`                      |
| Input           | `aria-label`, `aria-describedby`, `aria-invalid`                   |
| Checkbox        | `aria-checked`, `aria-required`                                    |
| Combobox/Select | `aria-expanded`, `aria-activedescendant`, `aria-owns`              |
| Modal/Dialog    | `aria-modal`, `aria-labelledby`, `aria-describedby`                |
| Tabs            | `aria-selected`, `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| Accordion       | `aria-expanded`, `aria-controls`                                   |
| Toast/Alerta    | `role="alert"`, `aria-live="polite"` ou `"assertive"`              |

## 3. Estados Dinâmicos

Os componentes devem refletir corretamente seus estados para tecnologias assistivas.

### Estado de Carregamento

```html
<!-- Example: Button with loading -->
<button
  [attr.aria-busy]="loading ? 'true' : 'false'"
  [disabled]="disabled || loading"
  class="btn"
  [class.btn-loading]="loading"
>
  @if (loading) {
  <span class="spinner" aria-hidden="true"></span>
  <span class="sr-only">Carregando...</span>
  } @else {
  <span>{{ text }}</span>
  }
</button>
```

### Estado de Erro

```html
<div class="form-group" [class.has-error]="hasError">
  <label [for]="id">{{ label }}</label>
  <input
    [id]="id"
    [type]="type"
    [value]="value"
    [attr.aria-invalid]="hasError ? 'true' : 'false'"
    [attr.aria-describedby]="hasError ? errorId : null"
  />

  @if (hasError) {
  <div [id]="errorId" class="error-message" role="alert">{{ errorMessage }}</div>
  }
</div>
```

### Estado Expandido/Colapsado

```html
<div class="accordion-item">
  <button
    class="accordion-header"
    [attr.aria-expanded]="isExpanded"
    [attr.aria-controls]="panelId"
    (click)="toggle()"
  >
    {{ header }}
  </button>

  <div
    [id]="panelId"
    class="accordion-panel"
    [class.hidden]="!isExpanded"
    role="region"
    [attr.aria-labelledby]="headerId"
  >
    <!-- Content -->
  </div>
</div>
```

## 4. Navegação por Teclado

Usuários de teclado devem acessar todas as funcionalidades.

### Foco Visível

```typescript
// Classes for visible focus indication
const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bytebank-blue';
```

### Ordem de Tabulação

- Use ordem lógica no DOM.
- Evite `tabindex` maior que 0.
- Use `tabindex="0"` para elementos customizados que devem receber foco.
- Use `tabindex="-1"` para foco programático.

### Teclas de Atalho

```typescript
@HostListener('keydown.enter', ['$event'])
@HostListener('keydown.space', ['$event'])
onKeyActivate(event: KeyboardEvent): void {
  if (this.disabled) return;
  event.preventDefault();
  this.activate.emit();
}
```

### Trap Focus (para Modais)

```typescript
@Component({...})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('container') container!: ElementRef<HTMLElement>;
  private focusableElements!: HTMLElement[];
  private firstFocusableElement!: HTMLElement;
  private lastFocusableElement!: HTMLElement;

  ngAfterViewInit(): void {
    this.trapFocus();
  }

  private trapFocus(): void {
    // Get all focusable elements
    const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    this.focusableElements = Array.from(
      this.container.nativeElement.querySelectorAll(focusableSelectors)
    );
    this.firstFocusableElement = this.focusableElements[0];
    this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
    this.firstFocusableElement.focus();
    this.container.nativeElement.addEventListener('keydown', this.handleTabKey.bind(this));
  }

  private handleTabKey(event: KeyboardEvent): void {
    if (event.key !== 'Tab') return;
    if (event.shiftKey && document.activeElement === this.firstFocusableElement) {
      event.preventDefault();
      this.lastFocusableElement.focus();
    } else if (!event.shiftKey && document.activeElement === this.lastFocusableElement) {
      event.preventDefault();
      this.firstFocusableElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.container.nativeElement.removeEventListener('keydown', this.handleTabKey.bind(this));
  }
}
```

## 5. Roles Semânticos

Use roles ARIA apropriados para garantir interpretação correta por tecnologias assistivas.

| Role                         | Uso                                        |
| ---------------------------- | ------------------------------------------ |
| `button`                     | Elementos clicáveis não `<button>` nativos |
| `link`                       | Links customizados                         |
| `checkbox`                   | Checkboxes customizados                    |
| `tablist`, `tab`, `tabpanel` | Componentes de abas                        |
| `dialog`                     | Modais e diálogos                          |
| `alert`                      | Mensagens de alerta                        |
| `progressbar`                | Indicadores de progresso                   |
| `menu`, `menuitem`           | Menus dropdown                             |
| `combobox`                   | Inputs com autocomplete/dropdown           |

### Exemplo de Combobox

```html
<div
  role="combobox"
  [attr.aria-expanded]="isOpen"
  [attr.aria-owns]="listboxId"
  [attr.aria-activedescendant]="activeItemId"
>
  <input
    type="text"
    [value]="value"
    [attr.aria-autocomplete]="'list'"
    [attr.aria-controls]="listboxId"
  />

  <div [id]="listboxId" role="listbox" [class.hidden]="!isOpen">
    @for (item of items; track item.id) {
    <div
      role="option"
      [id]="'option-' + item.id"
      [attr.aria-selected]="selectedItem?.id === item.id"
      [class.active]="activeItemId === 'option-' + item.id"
    >
      {{ item.label }}
    </div>
    }
  </div>
</div>
```

## 6. Alternativas Textuais

Forneça alternativas textuais para elementos não textuais.

### Imagens e Ícones

```html
<!-- Informative image -->
<img src="chart.png" alt="Gráfico mostrando crescimento de 25% nas vendas em 2023" />

<!-- Decorative icon -->
<LucideIcon name="chevron-right" aria-hidden="true" />

<!-- Functional icon -->
<button aria-label="Fechar diálogo">
  <LucideIcon name="x" aria-hidden="true" />
</button>
```

### Texto Escondido para Leitores de Tela

```html
<span class="sr-only">Instruções adicionais para leitores de tela</span>
<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

## 7. Live Regions

Use live regions para anunciar conteúdo dinâmico a leitores de tela.

```html
<div role="status" aria-live="polite" [class.sr-only]="!message">{{ message }}</div>
<div role="alert" aria-live="assertive" [class.hidden]="!errorMessage">{{ errorMessage }}</div>
```

```typescript
@Component({...})
export class NotificationService {
  private liveRegion: HTMLElement | null = null;

  constructor() {
    this.createLiveRegion();
  }

  announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) return;
    this.liveRegion.textContent = '';
    this.liveRegion.setAttribute('aria-live', priority);
    setTimeout(() => {
      this.liveRegion!.textContent = message;
    }, 100);
  }

  private createLiveRegion(): void {
    this.liveRegion = document.createElement('div');
    this.liveRegion.setAttribute('aria-live', 'polite');
    this.liveRegion.classList.add('sr-only');
    document.body.appendChild(this.liveRegion);
  }
}
```

## 8. Contraste e Legibilidade

Garanta contraste suficiente para textos e elementos interativos.

- **Texto normal (<18pt):** mínimo 4.5:1 (AA)
- **Texto grande (≥18pt):** mínimo 3:1 (AA)
- **Componentes de UI/gráficos:** mínimo 3:1 (AA)

```typescript
// Example of accessible color classes
const TEXT_COLORS = {
  default: 'text-gray-900',
  inverted: 'text-white',
  muted: 'text-gray-600',
  error: 'text-red-700',
  success: 'text-green-700'
};
// Avoid text-gray-400 on light backgrounds (insufficient contrast)
```

## 9. Formulários Acessíveis

### Labels Explícitos

```html
<div class="form-group">
  <label for="username">Nome de usuário</label>
  <input id="username" type="text" [formControl]="usernameControl" />
</div>
```

### Feedback de Validação

```html
<div class="form-group" [class.has-error]="hasError">
  <label for="email">Email</label>
  <input
    id="email"
    type="email"
    [attr.aria-invalid]="isInvalid ? 'true' : 'false'"
    [attr.aria-describedby]="isInvalid ? 'email-error' : null"
  />

  @if (isInvalid) {
  <div id="email-error" class="error-message" role="alert">Por favor, insira um email válido</div>
  }
</div>
```

### Agrupamento de Campos

```html
<fieldset>
  <legend>Informações de Contato</legend>
  <div class="form-group">
    <label for="first-name">Nome</label>
    <input id="first-name" type="text" />
  </div>
  <div class="form-group">
    <label for="last-name">Sobrenome</label>
    <input id="last-name" type="text" />
  </div>
</fieldset>
```

## 10. Touch Targets

Elementos interativos devem ter área mínima de 44x44px e espaçamento de pelo menos 8px.

```html
<button class="min-h-[44px] min-w-[44px] p-2">Salvar</button>
<div class="flex gap-4">
  <button class="btn">Cancelar</button>
  <button class="btn">Confirmar</button>
</div>
```

## 11. Checklist de Acessibilidade

- [ ] Estrutura semântica e landmarks apropriados
- [ ] Cabeçalhos em ordem lógica
- [ ] Todos os controles acessíveis por teclado
- [ ] Ordem de tabulação lógica
- [ ] Indicador de foco visível
- [ ] Sem armadilhas de teclado (exceto modais)
- [ ] Roles e estados ARIA corretos
- [ ] Alternativas textuais para elementos não textuais
- [ ] Live regions para conteúdo dinâmico
- [ ] Labels explícitos em formulários
- [ ] Mensagens de erro acessíveis
- [ ] Feedback e agrupamento lógico de campos
- [ ] Contraste de cor adequado
- [ ] Não depender apenas de cor para transmitir informação
- [ ] Texto redimensionável sem perda de funcionalidade
- [ ] Tamanhos de toque adequados
- [ ] Notificações acessíveis para alterações de conteúdo
- [ ] Modais e overlays gerenciam foco corretamente
- [ ] Animações podem ser pausadas/desativadas

## 12. Testes de Acessibilidade

### Ferramentas Automatizadas

- **Lighthouse** (Chrome DevTools)
- **axe**
- **Angular A11y Codelyzer**

### Testes Manuais

- Navegação por teclado (Tab, Shift+Tab, Enter, Space, setas)
- Leitores de tela: NVDA, VoiceOver, JAWS
- Modo de alto contraste
- Zoom de até 200%

```typescript
// Example: Keyboard navigation test
it('should support keyboard navigation', async () => {
  await userEvent.tab();
  expect(document.activeElement).toBe(buttonElement);
  await userEvent.keyboard('{Enter}');
  expect(onClickSpy).toHaveBeenCalled();
  onClickSpy.calls.reset();
  await userEvent.keyboard(' ');
  expect(onClickSpy).toHaveBeenCalled();
});
```

## 13. Recursos e Padrões

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
- [WAI-ARIA](https://www.w3.org/TR/wai-aria/)
- [Inclusive Components](https://inclusive-components.design/)
- [axe DevTools](https://www.deque.com/axe/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Angular CDK a11y](https://material.angular.io/cdk/a11y/overview)
- [ngx-a11y](https://github.com/tilmanpotthof/ngx-a11y)

## 14. Exemplos de Componentes Acessíveis

### Modal

```typescript
@Component({
  selector: 'bb-modal',
  template: `
    <div
      class="modal-overlay"
      [class.modal-open]="isOpen"
      (click)="closeOnOverlayClick ? close() : null"
      aria-hidden="true"
    >
      <div
        #modalContainer
        class="modal-container"
        role="dialog"
        [attr.aria-labelledby]="headerId"
        [attr.aria-describedby]="descriptionId || null"
        [attr.aria-modal]="'true'"
        (click)="$event.stopPropagation()"
      >
        <div class="modal-header">
          <h2 [id]="headerId" class="modal-title">{{ title }}</h2>
          <button type="button" class="modal-close" aria-label="Fechar diálogo" (click)="close()">
            <LucideIcon name="x" aria-hidden="true" />
          </button>
        </div>
        @if (description) {
          <div [id]="descriptionId" class="modal-description">
            {{ description }}
          </div>
        }
        <div class="modal-content">
          <ng-content></ng-content>
        </div>
        <div class="modal-footer">
          <ng-content select="[slot=footer]"></ng-content>
        </div>
      </div>
    </div>
  `
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Input() isOpen = false;
  @Input() title = '';
  @Input() description?: string;
  @Input() closeOnOverlayClick = true;
  @Output() close = new EventEmitter<void>();
  @ViewChild('modalContainer') modalContainer!: ElementRef<HTMLElement>;
  private headerId = `modal-title-${uniqueId()}`;
  private descriptionId = `modal-desc-${uniqueId()}`;
  private previouslyFocusedElement?: HTMLElement;

  ngAfterViewInit(): void {
    this.setupFocusTrap();
  }

  private setupFocusTrap(): void {
    if (this.isOpen) {
      this.previouslyFocusedElement = document.activeElement as HTMLElement;
      // Trap focus implementation
      setTimeout(() => {
        this.focusFirstElement();
      });
    }
  }

  private focusFirstElement(): void {
    // Focus logic
  }

  ngOnDestroy(): void {
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }
}

function uniqueId(): string {
  return Math.random().toString(36).substring(2, 11);
}
```

### Dropdown

```typescript
@Component({
  selector: 'bb-dropdown',
  template: `
    <div class="dropdown-container">
      <button
        #triggerButton
        type="button"
        class="dropdown-trigger"
        [attr.aria-expanded]="isOpen"
        [attr.aria-controls]="menuId"
        [attr.id]="triggerId"
        (click)="toggle()"
      >
        {{ label }}
        <LucideIcon name="chevron-down" aria-hidden="true" />
      </button>
      <div
        [id]="menuId"
        class="dropdown-menu"
        [class.hidden]="!isOpen"
        role="menu"
        [attr.aria-labelledby]="triggerId"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class DropdownComponent {
  @Input() label = 'Menu';
  @Input() isOpen = false;
  private triggerId = `dropdown-trigger-${uniqueId()}`;
  private menuId = `dropdown-menu-${uniqueId()}`;

  toggle(): void {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    // Close when clicking outside
  }
}

@Component({
  selector: 'bb-dropdown-item',
  template: `
    <button class="dropdown-item" role="menuitem" [tabindex]="-1" (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `
})
export class DropdownItemComponent {
  @Output() select = new EventEmitter<void>();
  onClick(): void {
    this.select.emit();
  }
}
```

### Tabs

```typescript
@Component({
  selector: 'bb-tabs',
  template: `
    <div class="tabs-container">
      <div role="tablist" class="tabs-list">
        @for (tab of tabs; track tab; let i = $index) {
          <button
            role="tab"
            class="tab"
            [class.active]="activeIndex === i"
            [id]="'tab-' + i"
            [attr.aria-selected]="activeIndex === i"
            [attr.aria-controls]="'panel-' + i"
            (click)="activateTab(i)"
            (keydown.arrowleft)="focusPreviousTab($event)"
            (keydown.arrowright)="focusNextTab($event)"
          >
            {{ tab.label }}
          </button>
        }
      </div>
      @for (tab of tabs; track tab; let i = $index) {
        <div
          role="tabpanel"
          class="tab-panel"
          [class.hidden]="activeIndex !== i"
          [id]="'panel-' + i"
          [attr.aria-labelledby]="'tab-' + i"
          [attr.tabindex]="activeIndex === i ? 0 : -1"
        >
          <ng-container [ngTemplateOutlet]="tab.content"></ng-container>
        </div>
      }
    </div>
  `
})
export class TabsComponent implements AfterContentInit {
  @ContentChildren(TabDirective) tabsContent!: QueryList<TabDirective>;
  tabs: { label: string; content: TemplateRef<any> }[] = [];
  activeIndex = 0;

  ngAfterContentInit(): void {
    this.tabs = this.tabsContent.map((tab) => ({
      label: tab.label,
      content: tab.templateRef
    }));
  }

  activateTab(index: number): void {
    this.activeIndex = index;
  }

  focusPreviousTab(event: KeyboardEvent): void {
    event.preventDefault();
    this.activeIndex = (this.activeIndex - 1 + this.tabs.length) % this.tabs.length;
    this.focusCurrentTab();
  }

  focusNextTab(event: KeyboardEvent): void {
    event.preventDefault();
    this.activeIndex = (this.activeIndex + 1) % this.tabs.length;
    this.focusCurrentTab();
  }

  private focusCurrentTab(): void {
    // Focus logic
  }
}

@Directive({
  selector: '[bbTab]'
})
export class TabDirective {
  @Input() label = '';
  constructor(public templateRef: TemplateRef<any>) {}
}
```

## 15. Recursos Adicionais

- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Web AIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility Guidelines](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Angular Accessibility Guide](https://angular.dev/guide/accessibility)

## 🛠️ Regras de ESLint de Acessibilidade

### 1. Alt Text em Imagens

```html
<!-- Incorrect -->
<img src="chart.png" />
<img src="user-avatar.jpg" alt="" />

<!-- Correct -->
<img src="chart.png" alt="Gráfico de gastos mensais mostrando aumento de 15%" />
<img src="user-avatar.jpg" alt="Avatar do usuário João Silva" />
<img src="decorative-icon.svg" alt="" role="presentation" />
```

### 2. Conteúdo em Elementos

```html
<!-- Incorrect -->
<button (click)="delete()"></button>
<a href="/profile"></a>

<!-- Correct -->
<button (click)="delete()">Excluir transação</button>
<a href="/profile">Ver perfil</a>
<button (click)="close()" aria-label="Fechar modal">×</button>
```

### 3. Labels Associados

```html
<!-- Incorrect -->
<label>Nome</label>
<input type="text" [(ngModel)]="name" />

<label for="nonexistent">Email</label>
<input type="email" id="email" [(ngModel)]="email" />

<!-- Correct -->
<label for="name">Nome</label>
<input type="text" id="name" [(ngModel)]="name" />

<label>
  Email
  <input type="email" [(ngModel)]="email" />
</label>
```

### 4. Eventos de Teclado

```html
<!-- Incorrect -->
<div (click)="toggleMenu()">Menu</div>
<span (click)="selectItem()">Item</span>

<!-- Correct -->
<div
  (click)="toggleMenu()"
  (keydown.enter)="toggleMenu()"
  (keydown.space)="toggleMenu()"
  role="button"
  tabindex="0"
>
  Menu
</div>
<button (click)="selectItem()">Item</button>
```

### 5. Scope em Tabelas

```html
<!-- Incorrect -->
<table>
  <tr>
    <th>Data</th>
    <th>Valor</th>
    <th>Categoria</th>
  </tr>
  <tr>
    <td>01/01/2025</td>
    <td>R$ 50,00</td>
    <td>Alimentação</td>
  </tr>
</table>

<!-- Correct -->
<table>
  <thead>
    <tr>
      <th scope="col">Data</th>
      <th scope="col">Valor</th>
      <th scope="col">Categoria</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>01/01/2025</td>
      <td>R$ 50,00</td>
      <td>Alimentação</td>
    </tr>
  </tbody>
</table>
```

### 6. Aria Válido

```html
<!-- Incorrect -->
<div aria-labelledby="nonexistent">Conteúdo</div>
<button aria-expanded="yes">Toggle</button>

<!-- Correct -->
<div aria-labelledby="section-title">Conteúdo</div>
<h2 id="section-title">Título da Seção</h2>
<button aria-expanded="true">Toggle</button>
```

### 7. Foco em Elementos Interativos

```html
<!-- Incorrect -->
<div role="button" (click)="action()">Clique aqui</div>
<span role="link" (click)="navigate()">Navegar</span>

<!-- Correct -->
<div role="button" tabindex="0" (click)="action()" (keydown.enter)="action()">Clique aqui</div>
<button (click)="action()">Clique aqui</button>
<a href="/page" (click)="navigate()">Navegar</a>
```

### 8. Tabindex Negativo

```html
<!-- Incorrect -->
<input type="text" tabindex="1" />
<button tabindex="2">Submit</button>

<!-- Correct -->
<input type="text" />
<button>Submit</button>
<div tabindex="-1">Foco programático</div>
<div tabindex="0" role="button">Elemento customizado</div>
```
