import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator } from '@storybook/angular';
import { ButtonComponent, ButtonVariant } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Um componente de botão flexível com múltiplas variantes e estados.'
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
    loadingAriaLabel: {
      control: 'text',
      description: 'Label acessível durante carregamento'
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
    loadingAriaLabel: 'Carregando, aguarde...'
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
