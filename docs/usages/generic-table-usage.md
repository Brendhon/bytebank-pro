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

Para uma renderização mais complexa das células, você pode passar um `TemplateRef` na definição da coluna.

```html
<!-- no seu template -->
<ng-template #statusTemplate let-value>
  <span [ngClass]="value === 'active' ? 'text-green-500' : 'text-red-500'"> {{ value }} </span>
</ng-template>

<bb-generic-table [data]="usersWithStatus" [columns]="columnsWithTemplate" />
```

```typescript
// no seu componente.ts
import { ViewChild, TemplateRef } from '@angular/core';

// ...

@ViewChild('statusTemplate') statusTemplate!: TemplateRef<any>;

ngAfterViewInit() {
  this.columnsWithTemplate = [
    { label: 'Nome', accessor: 'name' },
    {
      label: 'Status',
      accessor: 'status',
      render: this.statusTemplate, // Passando o template
    },
  ];
}
```

No template customizado, você tem acesso a duas variáveis:

- `let-value`: O valor da propriedade acessada.
- `let-row="row"`: O objeto completo da linha de dados.

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
  accessor: keyof T | string; // A chave do objeto de dados ou um caminho aninhado (ex: 'user.name')
  render?: TemplateRef<any>; // Template para renderização customizada da célula
  headerClasses?: string; // Classes CSS para o cabeçalho
  cellClasses?: string; // Classes CSS para as células da coluna
}
```
