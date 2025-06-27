import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { CardComponent, CardVariant } from './card.component';

const meta: Meta<CardComponent> = {
  title: 'Components/Card',
  component: CardComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Descrição

O componente Card é usado para exibir valores numéricos (especialmente monetários) com diferentes estilos visuais. É ideal para dashboards, painéis de controle e exibição de métricas importantes.

## Quando Usar

- Para exibir métricas financeiras em dashboards
- Para mostrar valores de KPIs e indicadores
- Para apresentar dados numéricos de forma destacada
- Para criar layouts de cards informativos

## Acessibilidade

- Implementa \`role="article"\` para melhor navegação por screen readers
- Aria-label dinâmico que inclui label e valor formatado
- Suporta estados de carregamento com feedback adequado
- Contraste de cores otimizado para legibilidade

## Estados

- **Normal**: Exibe o valor formatado como moeda
- **Loading**: Mostra spinner quando valor é null/undefined
- **Variants**: 4 variações de cor (dark, blue, green, orange)
        `
      }
    }
  },
  argTypes: {
    variant: {
      description: 'Define o estilo visual do card afetando a cor de fundo',
      options: ['dark', 'blue', 'green', 'orange'] as CardVariant[],
      control: {
        type: 'select',
        labels: {
          dark: '⚫ Dark',
          blue: '🔵 Blue',
          green: '🟢 Green',
          orange: '🟠 Orange'
        }
      },
      table: {
        defaultValue: { summary: 'dark' },
        type: { summary: 'CardVariant' }
      }
    },
    value: {
      description:
        'Valor numérico a ser exibido. Se null/undefined, mostra spinner de carregamento',
      control: { type: 'number' },
      table: {
        type: { summary: 'number | null | undefined' }
      }
    },
    label: {
      description: 'Texto do rótulo exibido abaixo do valor',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Pagamentos' },
        type: { summary: 'string' }
      }
    },
    className: {
      description: 'Classes CSS adicionais para aplicar no elemento raiz',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: '' },
        type: { summary: 'string' }
      }
    }
  },
  args: {
    variant: 'dark',
    value: 1234.56,
    label: 'Pagamentos',
    className: ''
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<CardComponent>;

// ===== STORIES ESSENCIAIS (OBRIGATÓRIAS) =====

export const Default: Story = {
  args: {
    variant: 'dark',
    value: 1234.56,
    label: 'Total de Vendas'
  },
  render: (args) => ({
    props: args,
    template: `<bb-card ${argsToTemplate(args)}></bb-card>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 flex-wrap">
        <bb-card variant="dark" [value]="1234.56" label="Dark Variant"></bb-card>
        <bb-card variant="blue" [value]="5678.90" label="Blue Variant"></bb-card>
        <bb-card variant="green" [value]="9876.54" label="Green Variant"></bb-card>
        <bb-card variant="orange" [value]="3456.78" label="Orange Variant"></bb-card>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Exibe todas as variantes visuais disponíveis do componente Card lado a lado para facilitar comparação.'
      }
    }
  }
};

export const LoadingState: Story = {
  args: {
    variant: 'dark',
    value: null,
    label: 'Carregando Dados'
  },
  render: (args) => ({
    props: args,
    template: `<bb-card ${argsToTemplate(args)}></bb-card>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Estado de carregamento exibido quando o valor é null ou undefined. Mostra um spinner indicando que os dados estão sendo carregados.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    variant: 'blue',
    value: 2500.75,
    label: 'Playground',
    className: ''
  },
  render: (args) => ({
    props: args,
    template: `<bb-card ${argsToTemplate(args)}></bb-card>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Use os controles abaixo para experimentar todas as propriedades configuráveis do componente.'
      }
    }
  }
};

// ===== STORIES AVANÇADAS =====

export const DifferentValueFormats: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 flex-wrap">
        <bb-card variant="green" [value]="0" label="Valor Zero"></bb-card>
        <bb-card variant="blue" [value]="1000000.50" label="Valor Grande"></bb-card>
        <bb-card variant="orange" [value]="99.99" label="Valor Pequeno"></bb-card>
        <bb-card variant="dark" [value]="-500.25" label="Valor Negativo"></bb-card>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra como o componente lida com diferentes formatos de valores numéricos, incluindo zero, valores grandes, pequenos e negativos.'
      }
    }
  }
};

export const CustomStyling: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4 flex-wrap">
        <bb-card 
          variant="blue" 
          [value]="2500.75" 
          label="Com Sombra" 
          className="shadow-xl">
        </bb-card>
        <bb-card 
          variant="green" 
          [value]="1800.00" 
          label="Com Borda" 
          className="border-2 border-white">
        </bb-card>
        <bb-card 
          variant="orange" 
          [value]="3200.50" 
          label="Escalado" 
          className="scale-110">
        </bb-card>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Customização com CSS

O componente suporta classes CSS adicionais através da propriedade \`className\`.

\`\`\`html
<bb-card 
  variant="blue" 
  [value]="2500.75" 
  label="Customizado" 
  className="shadow-xl border-2 border-white">
</bb-card>
\`\`\`
        `
      }
    }
  }
};

export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <bb-card variant="dark" [value]="1234.56" label="Receita"></bb-card>
        <bb-card variant="blue" [value]="5678.90" label="Vendas"></bb-card>
        <bb-card variant="green" [value]="9876.54" label="Lucro"></bb-card>
        <bb-card variant="orange" [value]="3456.78" label="Despesas"></bb-card>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Layout responsivo demonstrando como os cards se adaptam a diferentes tamanhos de tela usando CSS Grid.'
      }
    },
    viewport: {
      defaultViewport: 'tablet'
    }
  }
};

export const DashboardExample: Story = {
  render: () => ({
    template: `
      <div class="p-6 bg-gray-50 rounded-lg">
        <h2 class="text-xl font-semibold mb-4 text-gray-800">Dashboard Financeiro</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <bb-card variant="green" [value]="125430.75" label="Receita Total"></bb-card>
          <bb-card variant="blue" [value]="89750.25" label="Vendas Mensais"></bb-card>
          <bb-card variant="orange" [value]="45680.50" label="Despesas"></bb-card>
          <bb-card variant="dark" [value]="79750.25" label="Lucro Líquido"></bb-card>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Exemplo prático de uso do componente em um dashboard financeiro real, demonstrando a composição com outros elementos da UI.'
      }
    }
  }
};

// ===== STORIES REMOVIDAS (substituídas pelas padronizadas acima) =====
// As stories individuais Blue, Green, Orange foram substituídas por AllVariants
// Loading foi substituída por LoadingState
// LargeValue, ZeroValue foram incluídas em DifferentValueFormats
// CustomClassName foi substituída por CustomStyling
