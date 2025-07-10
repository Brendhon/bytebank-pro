import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { PopoverComponent, PopoverPosition } from './popover.component';

const meta: Meta<PopoverComponent> = {
  title: 'Components/UI/Popover',
  component: PopoverComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Descrição

O componente Popover fornece uma sobreposição contextual que aparece próxima a um elemento de gatilho. É útil para exibir informações adicionais, menus ou controles.

## Quando Usar

- Para menus de contexto e dropdowns
- Para exibir informações adicionais sobre um elemento
- Para tooltips complexos com conteúdo interativo

## Acessibilidade

- Suporta navegação por teclado (Enter/Space para abrir, Escape para fechar)
- Implementa foco adequado no conteúdo do popover
- Permite fechamento ao clicar fora (configurável)
        `
      }
    }
  },
  argTypes: {
    position: {
      description: 'Define a posição do popover em relação ao elemento trigger',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end'
      ] as PopoverPosition[],
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'bottom-start' }
      }
    },
    disabled: {
      description: 'Desabilita a abertura do popover',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' }
      }
    },
    closeOnClickOutside: {
      description: 'Determina se o popover deve fechar ao clicar fora dele',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    closeOnEscape: {
      description: 'Determina se o popover deve fechar ao pressionar Escape',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'true' }
      }
    },
    offset: {
      description: 'Distância em pixels entre o trigger e o popover',
      control: { type: 'number', min: 0, max: 50, step: 1 },
      table: {
        defaultValue: { summary: '8' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<PopoverComponent>;

export const Default: Story = {
  args: {
    position: 'bottom-start',
    disabled: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    offset: 8
  },
  render: (args) => ({
    props: args,
    template: `
      <bb-popover ${argsToTemplate(args)}>
        <button slot="trigger" class="px-4 py-2 bg-bytebank-blue text-white rounded-lg hover:bg-bytebank-blue/90">
          Click me
        </button>
        <div slot="content" class="p-4">
          <p class="text-sm text-gray-700">Conteúdo do popover</p>
        </div>
      </bb-popover>
    `
  })
};

export const AllPositions: Story = {
  render: () => ({
    template: `
      <div class="grid grid-cols-4 gap-4 p-4">
        <bb-popover position="top">
          <button slot="trigger" class="px-3 py-2 bg-bytebank-blue text-white rounded text-sm">Top</button>
          <div slot="content" class="p-3 text-sm">Acima</div>
        </bb-popover>

        <bb-popover position="bottom">
          <button slot="trigger" class="px-3 py-2 bg-bytebank-green text-white rounded text-sm">Bottom</button>
          <div slot="content" class="p-3 text-sm">Abaixo</div>
        </bb-popover>

        <bb-popover position="left">
          <button slot="trigger" class="px-3 py-2 bg-bytebank-orange text-white rounded text-sm">Left</button>
          <div slot="content" class="p-3 text-sm">Esquerda</div>
        </bb-popover>

        <bb-popover position="right">
          <button slot="trigger" class="px-3 py-2 bg-bytebank-red text-white rounded text-sm">Right</button>
          <div slot="content" class="p-3 text-sm">Direita</div>
        </bb-popover>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra todas as posições básicas disponíveis para o popover.'
      }
    }
  }
};

export const MenuExample: Story = {
  args: {
    position: 'bottom-start',
    closeOnClickOutside: true,
    closeOnEscape: true
  },
  render: (args) => ({
    props: args,
    template: `
      <bb-popover ${argsToTemplate(args)}>
        <button slot="trigger" class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Menu
        </button>
        <div slot="content" class="py-2 min-w-32">
          <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Editar
          </button>
          <button class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Compartilhar
          </button>
          <hr class="my-1">
          <button class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
            Excluir
          </button>
        </div>
      </bb-popover>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Exemplo de uso como menu de ações contextuais.'
      }
    }
  }
};

export const DisabledState: Story = {
  args: {
    disabled: true,
    position: 'bottom-start'
  },
  render: (args) => ({
    props: args,
    template: `
      <bb-popover ${argsToTemplate(args)}>
        <button slot="trigger" class="px-4 py-2 bg-gray-400 text-white rounded cursor-not-allowed">
          Desabilitado
        </button>
        <div slot="content" class="p-4">
          <p class="text-sm text-gray-700">Este conteúdo não deve aparecer.</p>
        </div>
      </bb-popover>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstra o comportamento quando o popover está desabilitado.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    position: 'bottom-start',
    disabled: false,
    closeOnClickOutside: true,
    closeOnEscape: true,
    offset: 8
  },
  render: (args) => ({
    props: args,
    template: `
      <bb-popover ${argsToTemplate(args)}>
        <button slot="trigger" class="px-4 py-2 bg-bytebank-blue text-white rounded-lg hover:bg-bytebank-blue/90">
          Playground
        </button>
        <div slot="content" class="p-4 min-w-52">
          <h3 class="text-sm font-medium text-gray-900 mb-2">Configurações</h3>
          <p class="text-xs text-gray-600">Use os controles para experimentar diferentes opções.</p>
        </div>
      </bb-popover>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Use os controles abaixo para experimentar diferentes configurações do popover.'
      }
    }
  }
};
