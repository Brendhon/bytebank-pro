import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { GenericTableComponent, TableColumn } from './generic-table.component';

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

O GenericTable é um componente de tabela reutilizável que permite exibir dados tabulares de forma organizada e flexível. Suporta colunas customizáveis, paginação opcional e estados de carregamento.

## Quando Usar

- Para exibir listas de dados estruturados
- Quando precisar de paginação para grandes volumes de dados
- Para criar interfaces de administração e dashboards
- Em relatórios e visualizações de dados

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
          <h3 class="text-lg font-medium mb-4">Com Paginação (5 itens por página)</h3>
          <bb-generic-table 
            [data]="data" 
            [columns]="columns" 
            [pageSize]="5">
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
      smallData: sampleData.slice(0, 3),
      columns: sampleColumns
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra todas as variações visuais do componente GenericTable lado a lado.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    pageSize: 5
  },
  render: (args) => ({
    props: args,
    template: `<bb-generic-table ${argsToTemplate(args)}></bb-generic-table>`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do componente.'
      }
    }
  }
};

export const WithPagination: Story = {
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
### Tabela com Paginação

Esta story demonstra o uso da tabela com paginação habilitada, útil para grandes volumes de dados.

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
          'Demonstra o comportamento da tabela com um grande volume de dados (100 registros) e paginação.'
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
      getCustomColumns: (statusTemplate: any) => [
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
