# Como utilizar a Tabela Genérica do ByteBank Pro

O componente `bb-generic-table` oferece uma maneira robusta e flexível de exibir dados tabulares. Ele é projetado para ser altamente reutilizável, com suporte para colunas personalizáveis, paginação e templates customizados para renderização de células.

## Importação

O `GenericTableComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { GenericTableComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [GenericTableComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Para usar a tabela, você precisa fornecer os dados (`data`) e a definição das colunas (`columns`).

```typescript
// no seu componente.ts
import { TableColumn } from '@bytebank-pro/types';

// ...

users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' },
];

columns: TableColumn<any>[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Nome', accessor: 'name' },
  { label: 'E-mail', accessor: 'email' },
];
```

```html
<bb-generic-table [data]="users" [columns]="columns" />
```

## Paginação

A paginação é habilitada automaticamente quando a propriedade `pageSize` é fornecida.

```html
<bb-generic-table [data]="largeDataset" [columns]="columns" [pageSize]="5" />
```

O componente `bb-paginator` é usado internamente e não precisa ser invocado diretamente na maioria dos casos.

## Renderização Customizada

Para uma renderização mais complexa das células, você pode usar templates customizados. O padrão recomendado é definir os templates no HTML e passá-los via método.

### Padrão Recomendado: Templates Inline

Este é o padrão mais eficiente e recomendado para renderização customizada:

```html
<!-- no seu template -->
<ng-template #statusTemplate let-value let-row="row">
  <span [ngClass]="value === 'active' ? 'text-green-500' : 'text-red-500'">
    {{ value === 'active' ? '✓ Ativo' : '✗ Inativo' }}
  </span>
</ng-template>

<ng-template #actionTemplate let-value let-row="row">
  <div class="flex gap-2">
    <button class="btn-edit" (click)="onEdit(row)">
      <i-lucide [img]="editIcon" [size]="16"></i-lucide>
    </button>
    <button class="btn-delete" (click)="onDelete(row)">
      <i-lucide [img]="deleteIcon" [size]="16"></i-lucide>
    </button>
  </div>
</ng-template>

<bb-generic-table
  [data]="usersWithStatus"
  [columns]="getColumnsWithTemplates(statusTemplate, actionTemplate)"
/>
```

```typescript
// no seu componente.ts
import { TemplateRef } from '@angular/core';
import { Edit, Trash } from 'lucide-angular';

export class MyComponent {
  // Ícones para os botões de ação
  editIcon = Edit;
  deleteIcon = Trash;

  // Método para criar colunas com templates
  getColumnsWithTemplates(
    statusTemplate: TemplateRef<any>,
    actionTemplate: TemplateRef<any>
  ): TableColumn<any>[] {
    return [
      { label: 'ID', accessor: 'id' },
      { label: 'Nome', accessor: 'name' },
      { label: 'Status', accessor: 'status', render: statusTemplate },
      { label: 'Ações', accessor: 'id', render: actionTemplate }
    ];
  }

  onEdit(user: any) {
    console.log('Edit user:', user);
  }

  onDelete(user: any) {
    console.log('Delete user:', user);
  }
}
```

### Padrão Alternativo: ViewChild (Menos Recomendado)

Se preferir usar `@ViewChild`, você pode fazer assim:

```html
<!-- no seu template -->
<ng-template #statusTemplate let-value>
  <span [ngClass]="value === 'active' ? 'text-green-500' : 'text-red-500'"> {{ value }} </span>
</ng-template>

<bb-generic-table [data]="usersWithStatus" [columns]="columnsWithTemplate" />
```

```typescript
// no seu componente.ts
import { ViewChild, TemplateRef, AfterViewInit } from '@angular/core';

export class MyComponent implements AfterViewInit {
  @ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

  columnsWithTemplate: TableColumn<any>[] = [];

  ngAfterViewInit() {
    this.columnsWithTemplate = [
      { label: 'Nome', accessor: 'name' },
      {
        label: 'Status',
        accessor: 'status',
        render: this.statusTemplate
      }
    ];
  }
}
```

### Contexto dos Templates

No template customizado, você tem acesso a estas variáveis:

- `let-value`: O valor da propriedade acessada pela coluna
- `let-row="row"`: O objeto completo da linha de dados
- `let-index`: O índice da linha (opcional)

### Exemplo Prático: Tabela de Transações

Aqui está um exemplo completo de uma tabela de transações com renderização customizada:

```html
<!-- Templates para renderização customizada -->
<ng-template #typeTemplate let-value let-row="row">
  <span class="transaction-type">{{ getTransactionDesc(value) }}</span>
</ng-template>

<ng-template #valueTemplate let-value let-row="row">
  <span [class]="getValueClasses(row.type)">
    @if (row.type === 'outflow') { - } {{ value | currencyFormat }}
  </span>
</ng-template>

<ng-template #actionsTemplate let-value let-row="row">
  <div class="action-buttons">
    <button (click)="onEdit(row)" aria-label="Editar transação">
      <i-lucide [img]="editIcon" [size]="12"></i-lucide>
    </button>
    <button (click)="onDelete(row)" aria-label="Deletar transação">
      <i-lucide [img]="deleteIcon" [size]="12"></i-lucide>
    </button>
  </div>
</ng-template>

<!-- Tabela com templates customizados -->
<bb-generic-table
  [data]="transactions"
  [columns]="getTransactionColumns(typeTemplate, valueTemplate, actionsTemplate)"
  [pageSize]="10"
/>
```

```typescript
export class TransactionsComponent {
  editIcon = Edit;
  deleteIcon = Trash;

  getTransactionColumns(
    typeTemplate: TemplateRef<any>,
    valueTemplate: TemplateRef<any>,
    actionsTemplate: TemplateRef<any>
  ): TableColumn<ITransaction>[] {
    return [
      { label: 'Data', accessor: 'date' },
      { label: 'Descrição', accessor: 'desc', render: typeTemplate },
      { label: 'Valor', accessor: 'value', render: valueTemplate },
      { label: 'Ações', accessor: '_id', render: actionsTemplate }
    ];
  }

  getTransactionDesc(type: string): string {
    return TransactionDesc[type] || type;
  }

  getValueClasses(type: string): string {
    return type === 'outflow' ? 'text-red-600' : 'text-green-600';
  }

  onEdit(transaction: ITransaction) {
    // Lógica de edição
  }

  onDelete(transaction: ITransaction) {
    // Lógica de exclusão
  }
}
```

## API de Propriedades

### Inputs

| Propriedade | Tipo (`input()`)   | Obrigatório | Descrição                                                                    |
| ----------- | ------------------ | ----------- | ---------------------------------------------------------------------------- |
| `data`      | `T[]`              | Sim         | O array de objetos de dados a serem exibidos.                                |
| `columns`   | `TableColumn<T>[]` | Sim         | A definição das colunas, incluindo `label`, `accessor`, e `render` opcional. |
| `pageSize`  | `number`           | Não         | O número de itens por página. Habilita a paginação se fornecido.             |

### `TableColumn<T>`

A interface `TableColumn` define a estrutura de cada coluna:

```typescript
export interface TableColumn<T> {
  label: string; // O texto do cabeçalho da coluna
  accessor: keyof T; // A chave do objeto de dados
  render?: TemplateRef<any>; // Template para renderização customizada da célula
}
```

## Boas Práticas

1. **Use o padrão de templates inline** para melhor performance e legibilidade
2. **Defina templates reutilizáveis** quando possível
3. **Use ícones Lucide** com `i-lucide` e propriedade `[img]`
4. **Mantenha acessibilidade** com `aria-label` e `data-testid`
5. **Organize CSS** em classes semânticas ao invés de classes Tailwind inline
6. **Use tipagem forte** com generics para melhor segurança de tipos
