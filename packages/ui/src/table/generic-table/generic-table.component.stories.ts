import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { GenericTableComponent } from './generic-table.component';
import { TableColumn } from '@bytebank-pro/types';
import { TemplateRef } from '@angular/core';

interface SampleData {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  amount: number;
}

const sampleData: SampleData[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', amount: 1500 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive', amount: 2300 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active', amount: 1200 },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active', amount: 3400 },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'inactive', amount: 890 },
  { id: 6, name: 'David Miller', email: 'david@example.com', status: 'active', amount: 2100 },
  { id: 7, name: 'Eva Garcia', email: 'eva@example.com', status: 'inactive', amount: 1750 },
  { id: 8, name: 'Frank Davis', email: 'frank@example.com', status: 'active', amount: 2800 },
  { id: 9, name: 'Grace Lee', email: 'grace@example.com', status: 'active', amount: 3200 },
  { id: 10, name: 'Henry Taylor', email: 'henry@example.com', status: 'inactive', amount: 1950 },
  { id: 11, name: 'Isabel Martinez', email: 'isabel@example.com', status: 'active', amount: 2650 },
  { id: 12, name: 'Jack Anderson', email: 'jack@example.com', status: 'active', amount: 1400 }
];

const sampleColumns: TableColumn<SampleData>[] = [
  { label: 'ID', accessor: 'id' },
  { label: 'Name', accessor: 'name' },
  { label: 'Email', accessor: 'email' },
  { label: 'Status', accessor: 'status' },
  { label: 'Amount', accessor: 'amount' }
];

const meta: Meta<GenericTableComponent<SampleData>> = {
  title: 'Components/Table/GenericTable',
  component: GenericTableComponent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Descrição

O GenericTable é um componente de tabela reutilizável que permite exibir dados tabulares de forma organizada e flexível. Suporta colunas customizáveis, paginação opcional (client-side e server-side) e estados de carregamento.

## Quando Usar

- Para exibir listas de dados estruturados
- Quando precisar de paginação para grandes volumes de dados
- Para criar interfaces de administração e dashboards
- Em relatórios e visualizações de dados

## Tipos de Paginação

### Client-side Pagination
- **Uso**: Para datasets pequenos a médios (até 1000 itens)
- **Comportamento**: Todos os dados são carregados de uma vez e paginados localmente
- **Configuração**: Não forneça \`totalItems\`

### Server-side Pagination
- **Uso**: Para grandes volumes de dados
- **Comportamento**: Dados são paginados no servidor, apenas a página atual é carregada
- **Configuração**: Forneça \`totalItems\` e escute o evento \`pageChange\`

## Acessibilidade

- Suporta navegação por teclado
- Implementa semântica apropriada com elementos table
- Compatível com leitores de tela
- Mantém foco visível durante navegação
        `
      }
    }
  },
  argTypes: {
    data: {
      description: 'Array of data objects to display in the table',
      control: { type: 'object' },
      table: {
        type: { summary: 'T[]' },
        defaultValue: { summary: '[]' }
      }
    },
    columns: {
      description: 'Array of column definitions with label and accessor properties',
      control: { type: 'object' },
      table: {
        type: { summary: 'TableColumn<T>[]' }
      }
    },
    pageSize: {
      description: 'Number of items per page (undefined disables pagination)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: '10' }
      }
    },
    totalItems: {
      description: 'Total number of items available (for server-side pagination)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number | undefined' },
        defaultValue: { summary: 'undefined' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<GenericTableComponent<SampleData>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 10
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-lg font-medium mb-4">Client-side Pagination (5 itens por página)</h3>
          <bb-generic-table
            [data]="data"
            [columns]="columns"
            [pageSize]="5">
          </bb-generic-table>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Server-side Pagination (totalItems: 50, pageSize: 5)</h3>
          <bb-generic-table
            [data]="serverData"
            [columns]="columns"
            [pageSize]="5"
            [totalItems]="50">
          </bb-generic-table>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Sem Paginação</h3>
          <bb-generic-table
            [data]="smallData"
            [columns]="columns">
          </bb-generic-table>
        </div>

        <div>
          <h3 class="text-lg font-medium mb-4">Estado Vazio</h3>
          <bb-generic-table
            [data]="[]"
            [columns]="columns"
            [pageSize]="10">
          </bb-generic-table>
        </div>
      </div>
    `,
    props: {
      data: sampleData,
      serverData: sampleData.slice(0, 5), // Simula dados de uma página do servidor
      smallData: sampleData.slice(0, 3),
      columns: sampleColumns
    }
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra todas as variações visuais do componente GenericTable lado a lado, incluindo paginação client-side e server-side.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 5,
    totalItems: undefined
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Use os controles abaixo para experimentar diferentes configurações do componente, incluindo paginação client-side e server-side.'
      }
    }
  }
};

export const ClientSidePagination: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 3
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Paginação Client-side

Esta story demonstra o uso da tabela com paginação client-side, onde todos os dados são carregados de uma vez e paginados localmente.

**Características:**
- Todos os dados são carregados de uma vez
- Paginação acontece no frontend
- Ideal para datasets pequenos a médios (até 1000 itens)
- Não requer \`totalItems\`

\`\`\`html
<bb-generic-table
  [data]="data"
  [columns]="columns"
  [pageSize]="3">
</bb-generic-table>
\`\`\`
        `
      }
    }
  }
};

export const ServerSidePagination: Story = {
  args: {
    data: sampleData.slice(0, 5), // Simula dados de uma página do servidor
    columns: sampleColumns,
    pageSize: 10,
    totalItems: 50
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Paginação Server-side

Esta story demonstra o uso da tabela com paginação server-side, onde apenas a página atual é carregada e o total de itens é fornecido separadamente.

**Características:**
- Apenas a página atual é carregada
- Paginação acontece no servidor
- Ideal para grandes volumes de dados
- Requer \`totalItems\` para calcular o número total de páginas
- Emite evento \`pageChange\` para carregar novas páginas

\`\`\`html
<bb-generic-table
  [data]="currentPageData"
  [columns]="columns"
  [pageSize]="5"
  [totalItems]="50"
  (pageChange)="handlePageChange($event)">
</bb-generic-table>
\`\`\`

**Implementação no componente pai:**
\`\`\`typescript
export class TransactionListComponent {
  transactions = signal<ITransaction[]>([]);
  totalItems = signal<number>(0);

  loadTransactions(page: number = 1) {
    this.transactionService.getTransactions(page).subscribe(response => {
      this.transactions.set(response.data);
      this.totalItems.set(response.total);
    });
  }

  handlePageChange(page: number) {
    this.loadTransactions(page);
  }
}
\`\`\`
        `
      }
    }
  }
};

export const WithoutPagination: Story = {
  args: {
    data: sampleData.slice(0, 5),
    columns: sampleColumns,
    pageSize: undefined
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Tabela sem Paginação

Quando \`pageSize\` é undefined, a paginação é desabilitada e todos os dados são exibidos de uma vez.

\`\`\`html
<bb-generic-table
  [data]="data"
  [columns]="columns">
</bb-generic-table>
\`\`\`
        `
      }
    }
  }
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: sampleColumns,
    pageSize: 10
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra como a tabela se comporta quando não há dados para exibir.'
      }
    }
  }
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? 'inactive' : ('active' as 'active' | 'inactive'),
      amount: Math.floor(Math.random() * 5000) + 500
    })),
    columns: sampleColumns,
    pageSize: 10
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra o comportamento da tabela com um grande volume de dados (100 registros) e paginação client-side.'
      }
    }
  }
};

export const LargeDatasetServerSide: Story = {
  args: {
    data: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? 'inactive' : ('active' as 'active' | 'inactive'),
      amount: Math.floor(Math.random() * 5000) + 500
    })),
    columns: sampleColumns,
    pageSize: 10,
    totalItems: 1000
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Dataset Grande com Paginação Server-side

Demonstra o comportamento da tabela com um grande volume de dados (1000 registros) usando paginação server-side.

**Características:**
- Apenas 10 registros são carregados por vez
- Total de 1000 itens disponíveis no servidor
- 100 páginas no total
- Performance otimizada para grandes volumes de dados

\`\`\`html
<bb-generic-table
  [data]="currentPageData"
  [columns]="columns"
  [pageSize]="10"
  [totalItems]="1000"
  (pageChange)="handlePageChange($event)">
</bb-generic-table>
\`\`\`
        `
      }
    }
  }
};

export const ResponsiveLayout: Story = {
  args: {
    data: sampleData.slice(0, 5),
    columns: sampleColumns,
    pageSize: undefined
  },
  render: (args) => ({
    props: args,
    template: `
      <div class="w-full">
        <bb-generic-table ${argsToTemplate(args)}></bb-generic-table>
      </div>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story:
          'Visualiza como a tabela se adapta em diferentes tamanhos de tela. Use o controle de viewport para testar.'
      }
    }
  }
};

export const WithCustomRender: Story = {
  render: () => ({
    template: `
      <div>
        <ng-template #statusTemplate let-value let-row="row">
          <span class="px-2 py-1 rounded-full text-xs"
                [ngClass]="{
                  'bg-green-100 text-green-800': value === 'active',
                  'bg-red-100 text-red-800': value === 'inactive'
                }">
            {{ value === 'active' ? '✓ Ativo' : '✗ Inativo' }}
          </span>
        </ng-template>

        <bb-generic-table
          [data]="customData"
          [columns]="getCustomColumns(statusTemplate)">
        </bb-generic-table>
      </div>
    `,
    props: {
      customData: [
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'active' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'active' },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', status: 'inactive' }
      ],
      getCustomColumns: (statusTemplate: TemplateRef<unknown>) => [
        { label: 'ID', accessor: 'id' },
        { label: 'Name', accessor: 'name' },
        { label: 'Email', accessor: 'email' },
        { label: 'Status', accessor: 'status', render: statusTemplate }
      ]
    }
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Tabela com Renderização Customizada

Esta story demonstra como usar a propriedade \`render\` das colunas com templates Angular para customizar a exibição dos dados:

- **Status**: Exibe badges coloridos com ícones para status ativo/inativo
\`\`\`
<!-- Uso na tabela -->
<bb-generic-table
  [data]="data"
  [columns]="[{ label: 'Status', accessor: 'status', render: statusTemplate }]">
</bb-generic-table>
\`\`\`
        `
      }
    }
  }
};

export const WithPageChangeEvent: Story = {
  render: () => ({
    template: `
      <div>
        <div class="mb-4 p-4 bg-gray-100 rounded">
          <p class="text-sm"><strong>Evento pageChange:</strong> {{ lastPageChange || 'Nenhum evento emitido' }}</p>
        </div>

        <bb-generic-table
          [data]="data"
          [columns]="columns"
          [pageSize]="3"
          [totalItems]="12"
          (pageChange)="onPageChange($event)">
        </bb-generic-table>
      </div>
    `,
    props: {
      data: sampleData.slice(0, 3),
      columns: sampleColumns,
      lastPageChange: null,
      onPageChange(page: number) {
        (this as any).lastPageChange = `Página ${page} selecionada`;
        // Em uma implementação real, aqui você faria a chamada para o servidor
        console.log('Page changed to:', page);
      }
    }
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Evento pageChange

Esta story demonstra como capturar o evento \`pageChange\` para implementar paginação server-side.

**Características:**
- Mostra o último evento de mudança de página
- Simula a integração com um serviço de backend
- Demonstra como implementar paginação server-side

\`\`\`typescript
export class TransactionListComponent {
  lastPageChange: string | null = null;

  onPageChange(page: number) {
    this.lastPageChange = \`Página \${page} selecionada\`;
    this.loadTransactions(page);
  }

  loadTransactions(page: number) {
    this.transactionService.getTransactions(page).subscribe(response => {
      this.transactions.set(response.data);
    });
  }
}
\`\`\`
        `
      }
    }
  }
};
