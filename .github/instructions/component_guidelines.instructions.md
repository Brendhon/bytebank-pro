---
applyTo: '**/*.component.ts,**/*.component.html'
---

# 📋 Guia de Boas Práticas para Criação de Componentes no ByteBank Pro

Este guia abrangente define as diretrizes e boas práticas para o desenvolvimento de componentes no ByteBank Pro, abrangendo estrutura, estilo, organização, práticas modernas do Angular e acessibilidade.

## 🎨 Diretrizes Gerais de Componentes e Estilo

### 🖼️ Ícones

- **Utilize apenas ícones da biblioteca `lucide-angular`**.
- **Não utilize SVGs customizados ou outras bibliotecas de ícones**.
- **Importe somente os ícones necessários** para cada componente.
- **Exemplo de Importação:**

  ```typescript
  import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';

  @Component({
    selector: 'i-lucide',
    templateUrl: './i-lucide.component.html',
    standalone: true,
    imports: [LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ILucideComponent {
    // ..

    arrowLeft = ArrowLeft; // Left arrow icon
    arrowRight = ArrowRight; // Right arrow icon

    // ...
  }
  ```

- **Exemplo de Uso no Template:**

  ```html
  <i-lucide [img]="ArrowLeft" [size]="20" aria-hidden="true"></i-lucide>
  <i-lucide [img]="ArrowRight" [size]="20" aria-hidden="true"></i-lucide>
  ```

### 📏 Tamanho dos Componentes

### 🌈 Cores

Para garantir a consistência visual e a padronização da marca ByteBank, **sempre utilize as cores definidas nos design tokens compartilhados**.
Você pode importar e usar essas cores diretamente em seus componentes TypeScript ou integrá-las via TailwindCSS. Para detalhes completos sobre a paleta de cores e como utilizá-las, consulte o arquivo [`README.md`](packages/shared-design-tokens/README.md) do pacote `@bytebank-pro/shared-design-tokens`.

### 📁 Estrutura e Convenções de Nomenclatura

- **Estrutura Padrão:**
  ```
  src/
  └── nome-do-componente/
    ├── nome-do-componente.component.ts
    ├── nome-do-componente.component.spec.ts // create a simple test file - with one basic test
    ├── nome-do-componente.component.html
    └── nome-do-componente.component.css
  ```
- **Convenções de Nomenclatura:**

  - **Pasta**: `kebab-case` (ex: `date-picker`)
  - **Arquivo**: `kebab-case.component.{ext}` (ex: `date-picker.component.ts`)
  - **Classe**: `PascalCaseComponent` (ex: `DatePickerComponent`)
  - **Seletor**: `bb-kebab-case` (ex: `bb-date-picker`)

- **Arquivo de Estilo**: Sempre crie um arquivo CSS separado para estilos específicos do componente, evitando o uso de estilos globais. Utilize `styleUrls` no decorator `@Component` para referenciar o arquivo CSS.

  ```typescript
  @Component({
    selector: 'bb-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'], // Use CSS específico do componente
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class DatePickerComponent {
    // Lógica do componente
  }
  ```

---

## 🏗️ Angular Modern Best Practices (Angular 20)

Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular para garantir performance, segurança e manutenibilidade.

1.  **Comentários no Código**: Todos os comentários (linha, JSDoc, anotações) devem ser escritos em **inglês**.
2.  **Testes**: Use `data-testid="nome"` em elementos para facilitar a seleção em testes, tornando-os mais resilientes a mudanças de classe ou estrutura.
3.  **Sintaxe de Template (Angular 17+)**: Prefira blocos de controle `@if`, `@for`, `@empty`, `@switch` para maior clareza, performance e type safety. **Evite `*ngIf`, `*ngFor`, `ngSwitch`**.
4.  **Componentes Standalone**: **Sempre use componentes standalone** para eliminar `NgModules` desnecessários, reduzir boilerplate e melhorar o tree-shaking.
    ```typescript
    @Component({
      selector: 'bb-component',
      imports: [CommonModule]
    })
    export class ComponentComponent {}
    ```
5.  **APIs Baseadas em Signals (Angular 16+)**: Utilize `signal()` e `computed()` para estado reativo, melhor performance e código mais declarativo.
    ```typescript
    counter = signal(0);
    doubled = computed(() => this.counter() * 2);
    ```
6.  **Injeção de Dependências com `inject()` (Angular 14+)**: Para um código mais limpo e testável, utilize `inject()`.
    ```typescript
    private router = inject(Router);
    ```
7.  **Inputs Requeridos**: Use `input.required<Type>()` para inputs obrigatórios, garantindo segurança e concisão.
    ```typescript
    name = input.required<string>();
    ```
8.  **Outputs Modernos**: Prefira `output<Type>()` em vez de `@Output() EventEmitter` para maior simplicidade e type-safety.
    ```typescript
    click = output<MouseEvent>();
    ```
9.  **Estratégia de Detecção de Mudanças OnPush**: Defina `changeDetection: ChangeDetectionStrategy.OnPush` para otimizar a performance, reduzindo verificações desnecessárias.
    ```typescript
    @Component({
      changeDetection: ChangeDetectionStrategy.OnPush
    })
    ```
10. **Funções TrackBy em Loops**: Sempre utilize `trackBy` em loops `@for` para melhorar a performance em listas dinâmicas.
    ```html
    @for (item of items; track trackById(item)) { ... }
    ```
11. **Async Pipe e Padrões Reativos**: Utilize `async pipe` (`| async`) no template para gerenciar subscriptions de observables automaticamente.
    ```typescript
    data$ = this.service.getData();
    // {{ data$ | async }}
    ```
12. **Cleanup com DestroyRef (Angular 16+)**: Use `takeUntilDestroyed(this.destroyRef)` para limpar subscriptions automaticamente.
    ```typescript
    .pipe(takeUntilDestroyed(this.destroyRef))
    ```
13. **Type Safety com Generics**: Empregue generics em componentes para torná-los mais reutilizáveis e seguros.
    ```typescript
    export class SelectComponent<T = any> { ... }
    ```
14. **Content Projection**: Utilize `ng-content` com seletores (`[slot=header]`) para permitir múltiplos pontos de projeção de conteúdo.
    ```typescript
    <ng-content select="[slot=header]"></ng-content>
    ```
15. **Host Bindings**: Use a propriedade `host` no `@Component` para aplicar propriedades e eventos diretamente ao elemento host.
    ```typescript
    @Component({
      host: {
        '[class.disabled]': 'disabled',
        '(click)': 'onClick($event)'
      }
    })
    ```
16. **Lazy Loading**: Reduza o bundle inicial com importações dinâmicas (`import().then(...)`).
    ```typescript
    private heavyComponent = import('./heavy-component').then(m => m.HeavyComponent);
    ```
17. **Error Handling (Error Boundaries)**: Implemente componentes `error-boundary` para exibir uma UI de fallback em caso de erros, melhorando a experiência do usuário.
    ```typescript
    @Component({
      selector: 'bb-error-boundary',
      template: `
        @if (hasError) {
          <div>{{ errorMessage }}</div>
          <button (click)="resetError()">Retry</button>
        } @else {
          <ng-content></ng-content>
        }
      `
    })
    ```
18. **Internacionalização (i18n)**: Prepare os componentes para i18n utilizando `$localize` e atributos `i18n`.
    ```typescript
    closeButtonLabel = $localize`:@@close-button-aria:Close date picker`;
    ```
19. **ViewChild com Type Safety**: Acesse elementos do DOM de forma segura usando `ElementRef` tipado com `@ViewChild`.
    ```typescript
    @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
    ```
20. **Custom Validators**: Crie funções de validação reutilizáveis para formulários.
    ```typescript
    export function customEmailValidator(): ValidatorFn { ... }
    ```
21. **Memoization**: Utilize memoization para computações caras, evitando recálculos desnecessários e otimizando a performance.
    ```typescript
    get expensiveComputation() { ... }
    ```

---

## ♿ Diretrizes de Acessibilidade

Garanta que todos os componentes da UI do ByteBank Pro sejam usáveis por todas as pessoas, incluindo aquelas com deficiência.

### 1\. Princípios Fundamentais

- **Perceptível**: Forneça alternativas textuais, legendas e apresentação flexível do conteúdo.
- **Operável**: Assegure acesso via teclado, tempo suficiente para interações e navegação facilitada.
- **Compreensível**: Utilize texto claro, crie páginas previsíveis e implemente prevenção/correção de erros.
- **Robusto**: Garanta compatibilidade com diferentes agentes de usuário e tecnologias assistivas.

### 2\. Implementação de Acessibilidade

- **Atributos ARIA**: Use `aria-label`, `aria-describedby`, `aria-expanded`, `role` para tornar o conteúdo acessível a tecnologias assistivas.
  ```html
  <button
    [attr.aria-label]="ariaLabel"
    [attr.aria-expanded]="ariaExpanded"
    [role]="role || 'button'"
  ></button>
  ```
- **Estados Dinâmicos**: Reflita corretamente os estados dos componentes (ex: carregando) para tecnologias assistivas.
  ```html
  <button [attr.aria-busy]="loading ? 'true' : 'false'">
    @if (loading) {
    <span class="sr-only">Carregando...</span>
    }
  </button>
  ```
- **Navegação por Teclado**:
  - Mantenha uma ordem lógica no DOM.
  - Use `tabindex="0"` para elementos customizados interativos.
  - Garanta um indicador de foco visível.
  <!-- end list -->
  ```typescript
  @HostListener('keydown.enter', ['$event'])
  onKeyActivate(event: KeyboardEvent): void {
    event.preventDefault();
    this.activate.emit();
  }
  ```
- **Roles Semânticos**: Utilize roles ARIA apropriados (`button`, `dialog`, `tablist`, `alert`, `combobox`, `listbox`, `tabpanel`).
  ```html
  <div role="combobox" [attr.aria-expanded]="isOpen">
    <input type="text" [attr.aria-controls]="listboxId" />
    <div [id]="listboxId" role="listbox"></div>
  </div>
  ```
- **Alternativas Textuais**: Forneça textos alternativos (`alt`) para imagens e ícones. Utilize `aria-hidden="true"` para elementos puramente decorativos.
  ```html
  <img src="chart.png" alt="Gráfico de vendas" />
  <LucideIcon name="chevron-right" aria-hidden="true" />
  <button aria-label="Fechar diálogo"></button>
  ```
- **Live Regions**: Use `role="status"` ou `role="alert"` com `aria-live="polite"`/`assertive` para anunciar atualizações de conteúdo dinâmico.
  ```html
  <div role="status" aria-live="polite">{{ message }}</div>
  ```
- **Contraste e Legibilidade**:
  - Texto normal: mínimo 4.5:1
  - Texto grande: mínimo 3:1
- **Formulários Acessíveis**:
  - Sempre utilize `<label>` explícitos associados a inputs.
  - Forneça feedback de validação claro.
  - Agrupe campos relacionados.
  <!-- end list -->
  ```html
  <label for="username">Nome de usuário</label> <input id="username" type="text" />
  ```
- **Touch Targets**: Elementos interativos devem ter um tamanho mínimo de 44x44px.
  ```html
  <button class="min-h-[44px] min-w-[44px]">Salvar</button>
  ```

### 3\. Checklist e Testes de Acessibilidade

#### Checklist Rápido

- Estrutura semântica (`<header>`, `<nav>`, `<main>`, etc.).
- Controles acessíveis por teclado (todos os elementos interativos).
- Indicador de foco visível e claro.
- Alternativas textuais para imagens e ícones.
- Contraste adequado entre texto e fundo.
- Labels explícitos para todos os campos de formulário.
- Uso de live regions para conteúdo dinâmico.

#### Ferramentas e Métodos de Teste

- **Ferramentas Automatizadas**: Lighthouse, axe (extensão de navegador).
- **Testes Manuais**:
  - Navegação apenas com teclado.
  - Uso de leitores de tela (NVDA, VoiceOver).
  - Verificação de contraste e zoom.

---

## 📚 Exemplos de Componentes Acessíveis

### Modal

```typescript
@Component({
  selector: 'bb-modal',
  template: `
    <div role="dialog" [attr.aria-modal]="'true'">
      <h2>{{ title }}</h2>
      <button aria-label="Fechar diálogo"></button>
      <ng-content></ng-content>
    </div>
  `
})
export class ModalComponent {}
```

### Dropdown

```typescript
@Component({
  selector: 'bb-dropdown',
  template: `
    <button [attr.aria-expanded]="isOpen">{{ label }}</button>
    <div role="menu" [class.hidden]="!isOpen">
      <ng-content></ng-content>
    </div>
  `
})
export class DropdownComponent {}
```

### Tabs

```typescript
@Component({
  selector: 'bb-tabs',
  template: `
    <div role="tablist">
      <button role="tab" [attr.aria-selected]="activeIndex === i"></button>
    </div>
    <div role="tabpanel"></div>
  `
})
export class TabsComponent {}
```

---

## 📦 Diretrizes Específicas para o Pacote ByteBank UI (`@bytebank-pro/ui`)

> ⚠️ **IMPORTANTE**: As diretrizes desta seção aplicam-se **EXCLUSIVAMENTE** aos componentes desenvolvidos dentro do pacote `@bytebank-pro/ui` (localizado em `packages/ui/`).
>
> **Não se aplicam aos componentes dos aplicativos** (`apps/dashboard`, `apps/settings`, `apps/shell`, `apps/transactions`).

### 📖 Documentação com Storybook

Para componentes do pacote UI, **obrigatoriamente** inclua um arquivo de story do Storybook na estrutura do componente:

```
src/
└── nome-do-componente/
  ├── nome-do-componente.component.ts
  ├── nome-do-componente.component.spec.ts
  ├── nome-do-componente.component.html
  ├── nome-do-componente.component.css
  └── nome-do-componente.component.stories.ts // create a simple story file
```

**Exemplo básico de story:**

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { NomeDoComponenteComponent } from './nome-do-componente.component';

const meta: Meta<NomeDoComponenteComponent> = {
  title: 'Components/NomeDoComponente',
  component: NomeDoComponenteComponent
};

export default meta;
type Story = StoryObj<NomeDoComponenteComponent>;

export const Default: Story = {
  args: {
    // propriedades padrão do componente
  }
};
```

### 🎨 Importação de Estilos Globais

**Sempre importe os estilos globais** do ByteBank Pro UI no início do arquivo CSS do componente (`nome-do-componente.component.css`):

```css
@import '../../../styles/global.css';

/* 
 * Estilos específicos do componente (evite quando possível)
 * Prefira utilizar classes utilitárias do TailwindCSS
 */
```

Esta importação garante que:

- O componente mantenha a identidade visual da marca ByteBank
- As variáveis CSS e design tokens estejam disponíveis
- A consistência visual seja mantida em toda a biblioteca de componentes

---
