import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { ButtonSize, ButtonVariant } from '@bytebank-pro/types';

const meta: Meta<ButtonComponent> = {
  title: 'Components/UI/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Um componente de botão flexível com múltiplas variantes, tamanhos e estados, seguindo as diretrizes de acessibilidade.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'dark',
        'blue',
        'green',
        'orange',
        'outlineGreen',
        'outlineOrange'
      ] as ButtonVariant[],
      description: 'Variante visual do botão'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'] as ButtonSize[],
      description: 'Tamanho do botão'
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Tipo HTML do botão'
    },
    loading: {
      control: 'boolean',
      description: 'Estado de carregamento do botão'
    },
    disabled: {
      control: 'boolean',
      description: 'Se o botão está desabilitado'
    },
    className: {
      control: 'text',
      description: 'Classes CSS adicionais'
    },
    ariaLabel: {
      control: 'text',
      description: 'Label acessível do botão'
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'ID do elemento que descreve o botão'
    },
    ariaPressed: {
      control: 'boolean',
      description: 'Estado pressionado para botões toggle'
    },
    role: {
      control: 'text',
      description: 'Role ARIA customizado'
    },
    loadingText: {
      control: 'text',
      description: 'Texto para leitores de tela durante carregamento'
    },
    buttonClick: {
      action: 'clicked',
      description: 'Evento emitido quando o botão é clicado'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'blue',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Primary Button</bb-button>`
  })
};

export const Secondary: Story = {
  args: {
    variant: 'dark',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Secondary Button</bb-button>`
  })
};

export const Success: Story = {
  args: {
    variant: 'green',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Success Button</bb-button>`
  })
};

export const Warning: Story = {
  args: {
    variant: 'orange',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Warning Button</bb-button>`
  })
};

export const OutlineGreen: Story = {
  args: {
    variant: 'outlineGreen',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Outline Green</bb-button>`
  })
};

export const OutlineOrange: Story = {
  args: {
    variant: 'outlineOrange',
    type: 'button',
    loading: false,
    disabled: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Outline Orange</bb-button>`
  })
};

export const Loading: Story = {
  args: {
    variant: 'blue',
    type: 'button',
    loading: true,
    disabled: false,
    loadingText: 'Carregando, aguarde...'
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Loading Button</bb-button>`
  })
};

export const Disabled: Story = {
  args: {
    variant: 'blue',
    type: 'button',
    loading: false,
    disabled: true
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>Disabled Button</bb-button>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <bb-button variant="dark">Dark</bb-button>
        <bb-button variant="blue">Blue</bb-button>
        <bb-button variant="green">Green</bb-button>
        <bb-button variant="orange">Orange</bb-button>
        <bb-button variant="outlineGreen">Outline Green</bb-button>
        <bb-button variant="outlineOrange">Outline Orange</bb-button>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center;">
        <bb-button size="sm" variant="blue">Small</bb-button>
        <bb-button size="md" variant="blue">Medium</bb-button>
        <bb-button size="lg" variant="blue">Large</bb-button>
      </div>
    `
  })
};

export const WithAccessibility: Story = {
  args: {
    variant: 'blue',
    ariaLabel: 'Save document',
    ariaDescribedBy: 'save-help-text'
  },
  render: (args) => ({
    props: args,
    template: `
      <div>
        <bb-button ${argsToTemplate(args)}>Save</bb-button>
        <p id="save-help-text" style="margin-top: 0.5rem; font-size: 0.875rem; color: #6b7280;">
          This will save your current document to the cloud
        </p>
      </div>
    `
  })
};

export const ToggleButton: Story = {
  args: {
    variant: 'blue',
    ariaPressed: false,
    ariaLabel: 'Toggle notifications'
  },
  render: (args) => ({
    props: args,
    template: `<bb-button ${argsToTemplate(args)}>🔔 Notifications</bb-button>`
  })
};
