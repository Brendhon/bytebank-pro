# 🎯 Guia de Acessibilidade - ESLint Rules

Este documento complementa as configurações do ESLint com exemplos práticos das regras de acessibilidade implementadas no ByteBank Pro.

## 📋 Regras Implementadas

### 1. **Alt Text em Imagens** (`@angular-eslint/template/alt-text`)

```html
<!-- ❌ Incorreto -->
<img src="chart.png" />
<img src="user-avatar.jpg" alt="" />

<!-- ✅ Correto -->
<img src="chart.png" alt="Gráfico de gastos mensais mostrando aumento de 15%" />
<img src="user-avatar.jpg" alt="Avatar do usuário João Silva" />
<img src="decorative-icon.svg" alt="" role="presentation" />
<!-- Para imagens decorativas -->
```

### 2. **Conteúdo em Elementos** (`@angular-eslint/template/elements-content`)

```html
<!-- ❌ Incorreto -->
<button (click)="delete()"></button>
<a href="/profile"></a>

<!-- ✅ Correto -->
<button (click)="delete()">Excluir transação</button>
<a href="/profile">Ver perfil</a>
<button (click)="close()" aria-label="Fechar modal">×</button>
```

### 3. **Labels Associados** (`@angular-eslint/template/label-has-associated-control`)

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

### 4. **Eventos de Teclado** (`@angular-eslint/template/click-events-have-key-events`)

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
<!-- Melhor opção -->
```

### 5. **Scope em Tabelas** (`@angular-eslint/template/table-scope`)

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

### 6. **ARIA Válido** (`@angular-eslint/template/valid-aria`)

```html
<!-- ❌ Incorreto -->
<div aria-labelledby="nonexistent">Conteúdo</div>
<button aria-expanded="yes">Toggle</button>
<!-- deve ser "true" ou "false" -->

<!-- ✅ Correto -->
<div aria-labelledby="section-title">Conteúdo</div>
<h2 id="section-title">Título da Seção</h2>
<button aria-expanded="true">Toggle</button>
```

### 7. **Foco em Elementos Interativos** (`@angular-eslint/template/interactive-supports-focus`)

```html
<!-- ❌ Incorreto -->
<div role="button" (click)="action()">Clique aqui</div>
<span role="link" (click)="navigate()">Navegar</span>

<!-- ✅ Correto -->
<div role="button" tabindex="0" (click)="action()" (keydown.enter)="action()">Clique aqui</div>
<button (click)="action()">Clique aqui</button>
<!-- Melhor opção -->
<a href="/page" (click)="navigate()">Navegar</a>
<!-- Para navegação -->
```

### 8. **Tabindex Negativo** (`@angular-eslint/template/no-positive-tabindex`)

```html
<!-- ❌ Incorreto -->
<input type="text" tabindex="1" />
<button tabindex="2">Submit</button>

<!-- ✅ Correto -->
<input type="text" />
<!-- Ordem natural -->
<button>Submit</button>
<div tabindex="-1">Foco programático</div>
<!-- Apenas para JS -->
<div tabindex="0" role="button">Elemento customizado</div>
```

## 🎨 Componentes Acessíveis no Angular

### Modal Acessível

```typescript
@Component({
  template: `
    <div
      class="modal-overlay"
      (click)="closeModal()"
      (keydown.escape)="closeModal()"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="modal-content" (click)="$event.stopPropagation()">
        <h2 id="modal-title">{{ title }}</h2>
        <button class="close-btn" (click)="closeModal()" aria-label="Fechar modal">×</button>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class AccessibleModalComponent {
  @Input() title = '';

  ngOnInit() {
    // Focar no modal quando abrir
    setTimeout(() => {
      const modal = document.querySelector('[role="dialog"]') as HTMLElement;
      modal?.focus();
    });
  }
}
```

### Formulário Acessível

```typescript
@Component({
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <fieldset>
        <legend>Dados da Transação</legend>

        <div class="form-group">
          <label for="amount">Valor *</label>
          <input
            id="amount"
            type="number"
            formControlName="amount"
            [attr.aria-describedby]="form.get('amount')?.errors ? 'amount-error' : null"
            [attr.aria-invalid]="form.get('amount')?.errors ? 'true' : 'false'"
            required
          />
          <div id="amount-error" class="error" *ngIf="form.get('amount')?.errors" role="alert">
            Valor é obrigatório
          </div>
        </div>

        <div class="form-group">
          <label for="category">Categoria</label>
          <select id="category" formControlName="category">
            <option value="">Selecione uma categoria</option>
            <option value="food">Alimentação</option>
            <option value="transport">Transporte</option>
          </select>
        </div>

        <button type="submit" [disabled]="form.invalid">Salvar Transação</button>
      </fieldset>
    </form>
  `
})
export class AccessibleFormComponent {
  form = this.fb.group({
    amount: ['', Validators.required],
    category: ['']
  });

  constructor(private fb: FormBuilder) {}
}
```

## 🔍 Ferramentas Complementares

### 1. **Extensões do VS Code**

- **axe Accessibility Linter**: Verificação adicional de acessibilidade
- **WAVE Browser Extension**: Teste visual de acessibilidade

### 2. **Testes Automatizados**

```typescript
// Exemplo com Jest + Testing Library
import { render, screen } from '@testing-library/angular';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('componente deve ser acessível', async () => {
  const { container } = await render(MyComponent);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 3. **Checklist Manual**

- [ ] Navegação apenas com teclado funciona
- [ ] Screen reader consegue ler todo o conteúdo
- [ ] Contraste de cores adequado (4.5:1 para texto normal)
- [ ] Elementos de foco são visíveis
- [ ] Não há elementos que piscam ou se movem automaticamente

## 📚 Recursos Adicionais

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Angular A11y Guide](https://angular.dev/guide/accessibility)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
