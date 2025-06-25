# 🏗️ Angular Modern Best Practices

Este documento apresenta as práticas modernas recomendadas pela equipe Angular para desenvolvimento de componentes.

> **Importante:** Sempre utilize as APIs e abordagens mais recentes recomendadas oficialmente pelo Angular.

---

## 1. Comentários no Código

- **Todos os comentários em código devem ser escritos em inglês**, incluindo comentários de linha, JSDoc e anotações explicativas.

---

## 2. Testes: Use `fixture.componentRef.setInput()`

**Moderno (Angular 14+):**

```typescript
fixture.componentRef.setInput('variant', 'success');
expect(component.variant).toBe('success');
```

- Simula o comportamento real do Angular
- Chama `ngOnChanges` automaticamente
- Mais limpo e legível

**Evite:**

```typescript
component.variant = 'success'; // Direct property assignment
```

---

## 3. Sintaxe de Template: Blocos de Controle

**Moderno (Angular 17+):**

```html
@if (isVisible) {
<div>Visible</div>
} @else {
<div>Hidden</div>
} @for (item of items; track item.id) {
<div>{{ item.name }}</div>
} @empty {
<div>No items</div>
} @switch (variant) { @case ('primary') {
<span>Primary</span>
} @default {
<span>Default</span>
} }
```

- Sintaxe mais limpa, melhor performance e type safety

**Evite:** `*ngIf`, `*ngFor`, `ngSwitch`

---

## 4. Componentes Standalone

**Sempre use standalone:**

```typescript
@Component({
  selector: 'bb-component',
  imports: [CommonModule]
})
export class ComponentComponent {}
```

- Elimina NgModules desnecessários
- Reduz boilerplate e melhora tree-shaking

---

## 5. APIs Baseadas em Signals

**Preparação para Signals (Angular 16+):**

```typescript
counter = signal(0);
doubled = computed(() => this.counter() * 2);
```

- Estado reativo, melhor performance e código mais declarativo

---

## 6. Injeção de Dependências com `inject()`

**Use `inject()` (Angular 14+):**

```typescript
private router = inject(Router);
```

- Mais limpo, facilita testes e uso em qualquer lugar da classe

---

## 7. Inputs Requeridos

**Use `input.required()`:**

```typescript
name = input.required<string>();
```

- Mais seguro e conciso que `@Input()`

---

## 8. Outputs Modernos

**Use output functions:**

```typescript
click = output<MouseEvent>();
```

- Substitui `@Output() EventEmitter`, mais simples e type-safe

---

## 9. Estratégia de Detecção de Mudanças OnPush

**Use OnPush para performance:**

```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

- Reduz verificações desnecessárias

---

## 10. Funções TrackBy em Loops

**Sempre use trackBy:**

```typescript
@for (item of items; track trackById(item)) { ... }
```

- Melhora performance em listas dinâmicas

---

## 11. Async Pipe e Padrões Reativos

**Use async pipe:**

```typescript
data$ = this.service.getData();
// {{ data$ | async }}
```

- Gerencia subscriptions automaticamente

---

## 12. Cleanup com DestroyRef

**Use DestroyRef (Angular 16+):**

```typescript
.pipe(takeUntilDestroyed(this.destroyRef))
```

- Limpa subscriptions automaticamente

---

## 13. Type Safety com Generics

**Use generics em componentes:**

```typescript
export class SelectComponent<T = any> { ... }
```

- Componentes reutilizáveis e seguros

---

## 14. Content Projection

**Use ng-content com seletores:**

```html
<ng-content select="[slot=header]"></ng-content>
```

- Permite múltiplos pontos de projeção

---

## 15. Host Bindings

**Use host bindings para encapsulamento:**

```typescript
@Component({
  host: {
    '[class.disabled]': 'disabled',
    '(click)': 'onClick($event)'
  }
})
```

- Aplica propriedades e eventos ao host

---

## 16. Lazy Loading

**Use dynamic imports:**

```typescript
private heavyComponent = import('./heavy-component').then(m => m.HeavyComponent);
```

- Reduz o bundle inicial

---

## 17. Error Handling

**Implemente error boundaries:**

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

- Exibe fallback UI em caso de erro

---

## 18. Internacionalização (i18n)

**Prepare para i18n:**

```typescript
closeButtonLabel = $localize`:@@close-button-aria:Close date picker`;
```

- Use `$localize` e atributos i18n

---

## 19. ViewChild com Type Safety

**Use ElementRef tipado:**

```typescript
@ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;
```

- Acesso seguro ao DOM

---

## 20. Custom Validators

**Crie validators reutilizáveis:**

```typescript
export function customEmailValidator(): ValidatorFn { ... }
```

- Validações específicas e reutilizáveis

---

## 21. Memoization

**Use memoization para computações caras:**

```typescript
get expensiveComputation() { ... }
```

- Evita recálculos desnecessários

---

## 📚 Documentação Oficial

- [Angular Best Practices](https://angular.dev/best-practices)
- [Control Flow Blocks](https://angular.dev/guide/templates/control-flow)
- [Standalone Components](https://angular.dev/guide/components/importing)
- [Testing with setInput()](https://angular.dev/guide/testing/components-scenarios#setting-component-inputs)

---

### Práticas Recomendadas

| Evitar                                  | Recomendada                       |
| --------------------------------------- | --------------------------------- |
| `*ngIf`, `*ngFor`, `ngSwitch`           | `@if`, `@for`, `@switch`          |
| `component.property = value` nos testes | `fixture.componentRef.setInput()` |
| NgModules para novos componentes        | Standalone components             |
| Constructor injection                   | `inject()` function               |
| Default change detection                | `OnPush` strategy                 |
| Manual subscription cleanup             | `takeUntilDestroyed()`            |
| DOM direto                              | `Renderer2` ou host bindings      |
| `@Output() EventEmitter`                | `output()` function               |
| `@Input()` sem transform                | `input()` com transform           |
| Loops sem trackBy                       | `track` em `@for`                 |
| Strings hardcoded                       | i18n                              |
