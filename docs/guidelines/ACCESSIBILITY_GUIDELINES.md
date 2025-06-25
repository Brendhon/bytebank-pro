# ♿ Diretrizes de Acessibilidade

Este documento estabelece os padrões de acessibilidade que devem ser seguidos por todos os componentes da biblioteca UI do ByteBank Pro. Criar componentes acessíveis não é apenas uma boa prática, mas uma necessidade para garantir que nossos produtos sejam utilizáveis por todos os usuários, incluindo pessoas com deficiências.

## 1. Princípios Fundamentais

### A. Perceptível

Os usuários devem ser capazes de perceber a informação apresentada (não pode ser invisível para todos os seus sentidos)

- Forneça alternativas textuais para conteúdo não textual
- Forneça legendas e outras alternativas para multimídia
- Crie conteúdo que possa ser apresentado de diferentes maneiras
- Torne fácil para os usuários ver e ouvir o conteúdo

### B. Operável

Os componentes de interface do usuário devem ser operáveis (a interface não pode exigir interação que um usuário não pode realizar)

- Torne toda funcionalidade disponível a partir de um teclado
- Forneça aos usuários tempo suficiente para ler e usar o conteúdo
- Não projete conteúdo que possa causar convulsões
- Forneça formas de ajudar os usuários a navegar e encontrar conteúdo

### C. Compreensível

A informação e operação da interface do usuário devem ser compreensíveis

- Torne o texto legível e compreensível
- Faça com que as páginas apareçam e funcionem de maneira previsível
- Ajude os usuários a evitar e corrigir erros

### D. Robusto

O conteúdo deve ser suficientemente robusto para poder ser interpretado por uma ampla variedade de agentes de usuário, incluindo tecnologias assistivas

- Maximize a compatibilidade com agentes de usuário atuais e futuros, incluindo tecnologias assistivas

## 2. Atributos ARIA Obrigatórios

Os Accessible Rich Internet Applications (ARIA) são um conjunto de atributos que definem maneiras de tornar o conteúdo da web e aplicações web mais acessíveis.

### A. Atributos ARIA em Componentes

```typescript
// Inputs for accessibility
@Input() ariaLabel?: string;
@Input() ariaDescribedBy?: string;
@Input() ariaExpanded?: boolean; // For expandable components
@Input() role?: string; // When needed
```

### B. Implementação no Template

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

### C. Atributos ARIA Comuns por Tipo de Componente

| Componente      | Atributos ARIA Comuns                                              |
| --------------- | ------------------------------------------------------------------ |
| Botões          | `aria-label`, `aria-pressed`, `aria-disabled`                      |
| Inputs          | `aria-label`, `aria-describedby`, `aria-invalid`                   |
| Checkboxes      | `aria-checked`, `aria-required`                                    |
| Combobox/Select | `aria-expanded`, `aria-activedescendant`, `aria-owns`              |
| Modal/Dialog    | `aria-modal`, `aria-labelledby`, `aria-describedby`                |
| Tabs            | `aria-selected`, `role="tablist"`, `role="tab"`, `role="tabpanel"` |
| Accordion       | `aria-expanded`, `aria-controls`                                   |
| Toast/Alerta    | `role="alert"`, `aria-live="polite"` ou `"assertive"`              |

## 3. Estados Dinâmicos

Os componentes devem refletir corretamente seus estados para tecnologias assistivas.

### A. Loading States

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

### B. Error States

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

### C. Collapsed/Expanded States

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

Usuários que dependem de teclado devem poder acessar todas as funcionalidades da interface.

### A. Foco Visível

```typescript
// Classes para indicação de foco visível
const focusClasses = 'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bytebank-blue';
```

### B. Ordem de Tabulação Lógica

- Use ordem de DOM lógica
- Evite usar `tabindex` maior que 0
- Use `tabindex="0"` para elementos não focalizáveis que devem receber foco
- Use `tabindex="-1"` para elementos que devem poder ser focalizados programaticamente, mas não incluídos na ordem de tabulação

### C. Teclas de Atalho

```typescript
@HostListener('keydown.enter', ['$event'])
@HostListener('keydown.space', ['$event'])
onKeyActivate(event: KeyboardEvent): void {
  if (this.disabled) {
    return;
  }

  event.preventDefault();
  this.activate.emit();
}
```

### D. Trap Focus (para Modais)

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

    // Focus first element
    this.firstFocusableElement.focus();

    // Setup key listeners
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

Use os roles ARIA apropriados para garantir que os elementos sejam interpretados corretamente pelas tecnologias assistivas.

### A. Exemplos de Roles Comuns

| Role                         | Uso                                                               |
| ---------------------------- | ----------------------------------------------------------------- |
| `button`                     | Para elementos clicáveis que não são elementos `<button>` nativos |
| `link`                       | Para links não nativos                                            |
| `checkbox`                   | Para checkboxes customizados                                      |
| `tablist`, `tab`, `tabpanel` | Para componentes de tab                                           |
| `dialog`                     | Para modals e diálogos                                            |
| `alert`                      | Para mensagens de alerta                                          |
| `progressbar`                | Para indicadores de progresso                                     |
| `menu`, `menuitem`           | Para menus dropdown                                               |
| `combobox`                   | Para inputs com autocomplete ou dropdown                          |

### B. Implementação

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

## 6. Text Alternatives

Forneça alternativas textuais para todos os elementos não textuais.

### A. Imagens e Ícones

```html
<!-- Imagem informativa -->
<img src="chart.png" alt="Gráfico mostrando crescimento de 25% nas vendas em 2023" />

<!-- Ícone decorativo -->
<LucideIcon name="chevron-right" aria-hidden="true" />

<!-- Ícone funcional -->
<button aria-label="Fechar diálogo">
  <LucideIcon name="x" aria-hidden="true" />
</button>
```

### B. Classes Utilitárias para Texto Escondido

```html
<!-- Visível apenas para leitores de tela -->
<span class="sr-only">Instruções adicionais para leitores de tela</span>

<!-- CSS para sr-only -->
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

Use live regions para anunciar conteúdo dinâmico para usuários de leitores de tela.

### A. Simple Live Region

```html
<div role="status" aria-live="polite" [class.sr-only]="!message">{{ message }}</div>
```

### B. Alert Live Region

```html
<div role="alert" aria-live="assertive" [class.hidden]="!errorMessage">{{ errorMessage }}</div>
```

### C. Implementação Programática

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

    // Use setTimeout to ensure screen readers register the change
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

Garanta que o texto e os elementos interativos tenham contraste suficiente para serem percebidos por usuários com baixa visão.

### A. Requisitos de Contraste WCAG

- **Text normal (menor que 18pt)**: Contraste mínimo de 4.5:1 (AA)
- **Text grande (18pt ou maior)**: Contraste mínimo de 3:1 (AA)
- **Componentes de UI e informações gráficas**: Contraste mínimo de 3:1 (AA)

### B. Classes de Cores Acessíveis

```typescript
// Exemplo de classes de cor com contraste acessível
const TEXT_COLORS = {
  default: 'text-gray-900', // Escuro o suficiente para fundos claros
  inverted: 'text-white', // Para fundos escuros
  muted: 'text-gray-600', // Ainda com contraste adequado (4.5:1)
  error: 'text-red-700', // Vermelho com contraste adequado
  success: 'text-green-700' // Verde com contraste adequado
};

// Evite cores como text-gray-400 em fundos claros (contraste insuficiente)
```

## 9. Forms Acessíveis

Formulários são áreas críticas para acessibilidade. Certifique-se de que todos os controles de formulário sejam acessíveis.

### A. Labels Explícitos

```html
<div class="form-group">
  <label for="username">Nome de usuário</label>
  <input id="username" type="text" [formControl]="usernameControl" />
</div>
```

### B. Feedback de Validação

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

### C. Agrupamento de Campos

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

Certifique-se de que os elementos interativos sejam grandes o suficiente para usuários com deficiências motoras.

### A. Tamanhos Mínimos

- **Elementos interativos**: No mínimo 44x44 pixels
- **Espaçamento**: No mínimo 8px entre elementos interativos

### B. Implementação

```html
<!-- Botão com área de toque adequada -->
<button class="min-h-[44px] min-w-[44px] p-2">Salvar</button>

<!-- Espaçamento adequado entre controles -->
<div class="flex gap-4">
  <button class="btn">Cancelar</button>
  <button class="btn">Confirmar</button>
</div>
```

## 11. Checklist de Acessibilidade

Use esta checklist ao desenvolver ou revisar componentes:

### A. Elementos Estruturais

- [ ] Estrutura semântica (uso apropriado de elementos HTML)
- [ ] Landmarks (role="navigation", role="main", etc.) quando apropriado
- [ ] Cabeçalhos em ordem hierárquica lógica

### B. Teclado e Foco

- [ ] Todos os controles interativos são acessíveis por teclado
- [ ] A ordem de tabulação é lógica
- [ ] O indicador de foco é visível (estilo :focus)
- [ ] Nenhuma armadilha de teclado (exceto quando necessário, como em modais)

### C. ARIA e Semântica

- [ ] Roles ARIA apropriados
- [ ] Estados e propriedades ARIA corretos
- [ ] Todos os elementos não textuais têm alternativas textuais
- [ ] Live regions para conteúdo dinâmico

### D. Formulários

- [ ] Labels explícitos para todos os campos
- [ ] Mensagens de erro acessíveis
- [ ] Validação apropriada e feedback
- [ ] Agrupamento lógico de campos relacionados

### E. Visual

- [ ] Contraste de cor adequado
- [ ] Não depende apenas de cor para transmitir informações
- [ ] Texto redimensionável sem perda de funcionalidade
- [ ] Tamanhos de toque adequados para interfaces móveis

### F. Conteúdo Dinâmico

- [ ] Notificações acessíveis para alterações de conteúdo
- [ ] Modais e overlays gerenciam o foco corretamente
- [ ] Animações podem ser pausadas ou desativadas

## 12. Testes de Acessibilidade

### A. Ferramentas Automatizadas

- **Lighthouse**: Auditoria integrada no Chrome DevTools
- **axe**: Biblioteca de testes de acessibilidade automatizados
- **Angular A11y Codelyzer**: Regras estáticas para código Angular

### B. Testes Manuais

- **Navegação por Teclado**: Tab, Shift+Tab, Enter, Space, Arrow keys
- **Screen Reader**: NVDA (Windows), VoiceOver (macOS), JAWS
- **High Contrast Mode**: Teste no modo de alto contraste
- **Zoom**: Teste com zoom de 200%

### C. Teste de Keyboard-Only

```typescript
// Exemplo de teste para navegação por teclado
it('should support keyboard navigation', async () => {
  // Tab to focused state
  await userEvent.tab();
  expect(document.activeElement).toBe(buttonElement);

  // Activate with Enter key
  await userEvent.keyboard('{Enter}');
  expect(onClickSpy).toHaveBeenCalled();

  // Reset spy
  onClickSpy.calls.reset();

  // Activate with Space key
  await userEvent.keyboard(' ');
  expect(onClickSpy).toHaveBeenCalled();
});
```

## 13. Recursos e Padrões

### A. Especificações e Diretrizes

- [WCAG 2.1](https://www.w3.org/TR/WCAG21/) - Web Content Accessibility Guidelines
- [WAI-ARIA](https://www.w3.org/TR/wai-aria/) - Accessible Rich Internet Applications
- [Inclusive Components](https://inclusive-components.design/) - Padrões de design acessível

### B. Ferramentas

- [axe DevTools](https://www.deque.com/axe/) - Teste de acessibilidade automatizado
- [Contrast Checker](https://webaim.org/resources/contrastchecker/) - Verificação de contraste de cor
- [Accessibility Insights](https://accessibilityinsights.io/) - Extensão para visualização de problemas de acessibilidade

### C. Bibliotecas Angular

- [Angular CDK a11y](https://material.angular.io/cdk/a11y/overview) - Utilitários de acessibilidade
- [ngx-a11y](https://github.com/tilmanpotthof/ngx-a11y) - Ferramentas de acessibilidade para Angular

## 14. Exemplos Específicos para Componentes Comuns

### A. Modal Acessível

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
      // Store current focus
      this.previouslyFocusedElement = document.activeElement as HTMLElement;

      // Set up focus trap
      // ... (implementação do trapFocus como mostrado anteriormente)

      // Focus the first element
      setTimeout(() => {
        this.focusFirstElement();
      });
    }
  }

  private focusFirstElement(): void {
    // Focus logic
  }

  ngOnDestroy(): void {
    // Restore focus when component is destroyed
    if (this.previouslyFocusedElement) {
      this.previouslyFocusedElement.focus();
    }
  }
}

function uniqueId(): string {
  return Math.random().toString(36).substring(2, 11);
}
```

### B. Dropdown Acessível

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
    if (this.isOpen) {
      this.isOpen = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onOutsideClick(event: Event): void {
    // Close when clicking outside
  }
}

// DropdownItemComponent
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

### C. Tabs Acessíveis

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
    // Implementation to focus the current tab
  }
}

// Tab Directive
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

Este anexo consolida as regras de ESLint implementadas no ByteBank Pro para garantir conformidade com práticas de acessibilidade.

### 1. Alt Text em Imagens (`@angular-eslint/template/alt-text`)

```html
<!-- ❌ Incorreto -->
<img src="chart.png" />
<img src="user-avatar.jpg" alt="" />

<!-- ✅ Correto -->
<img src="chart.png" alt="Gráfico de gastos mensais mostrando aumento de 15%" />
<img src="user-avatar.jpg" alt="Avatar do usuário João Silva" />
<img src="decorative-icon.svg" alt="" role="presentation" />
```

### 2. Conteúdo em Elementos (`@angular-eslint/template/elements-content`)

```html
<!-- ❌ Incorreto -->
<button (click)="delete()"></button>
<a href="/profile"></a>

<!-- ✅ Correto -->
<button (click)="delete()">Excluir transação</button>
<a href="/profile">Ver perfil</a>
<button (click)="close()" aria-label="Fechar modal">×</button>
```

### 3. Labels Associados (`@angular-eslint/template/label-has-associated-control`)

```html
<!-- ❌ Incorreto -->
<label>Nome</label>
<input type="text" [(ngModel)]="name" />

<label for="nonexistent">Email</label>
<input type="email" id="email" [(ngModel)]="email" />

<!-- ✅ Correto -->
<label for="name">Nome</label>
<input type="text" id="name" [(ngModel)]="name" />

<!-- Ou usando nesting -->
<label>
  Email
  <input type="email" [(ngModel)]="email" />
</label>
```

### 4. Eventos de Teclado (`@angular-eslint/template/click-events-have-key-events`)

```html
<!-- ❌ Incorreto -->
<div (click)="toggleMenu()">Menu</div>
<span (click)="selectItem()">Item</span>

<!-- ✅ Correto -->
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

### 5. Scope em Tabelas (`@angular-eslint/template/table-scope`)

```html
<!-- ❌ Incorreto -->
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

<!-- ✅ Correto -->
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

### 6. Aria Válido (`@angular-eslint/template/valid-aria`)

```html
<!-- ❌ Incorreto -->
<div aria-labelledby="nonexistent">Conteúdo</div>
<button aria-expanded="yes">Toggle</button>

<!-- ✅ Correto -->
<div aria-labelledby="section-title">Conteúdo</div>
<h2 id="section-title">Título da Seção</h2>
<button aria-expanded="true">Toggle</button>
```

### 7. Foco em Elementos Interativos (`@angular-eslint/template/interactive-supports-focus`)

```html
<!-- ❌ Incorreto -->
<div role="button" (click)="action()">Clique aqui</div>
<span role="link" (click)="navigate()">Navegar</span>

<!-- ✅ Correto -->
<div role="button" tabindex="0" (click)="action()" (keydown.enter)="action()">Clique aqui</div>
<button (click)="action()">Clique aqui</button>
<a href="/page" (click)="navigate()">Navegar</a>
```

### 8. Tabindex Negativo (`@angular-eslint/template/no-positive-tabindex`)

```html
<!-- ❌ Incorreto -->
<input type="text" tabindex="1" />
<button tabindex="2">Submit</button>

<!-- ✅ Correto -->
<input type="text" />
<button>Submit</button>
<div tabindex="-1">Foco programático</div>
<div tabindex="0" role="button">Elemento customizado</div>
```
