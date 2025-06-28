import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator } from '@storybook/angular';
import { ToastComponent } from './toast.component'; //

const meta: Meta<ToastComponent> = {
  title: 'Components/UI/Toast', //
  component: ToastComponent, //
  parameters: {
    layout: 'fullscreen', // Toast is positioned, so fullscreen might be better for context
    docs: {
      description: {
        component:
          'Um componente de notificação que exibe mensagens temporárias ao usuário, com suporte a diferentes tipos de variantes (sucesso, erro, informação) e fechamento automático ou manual.' //
      }
    }
  },
  decorators: [
    componentWrapperDecorator(
      (story) => `
      <div style="position: relative; height: 150px;">
      ${story}
      </div>`
    )
  ],
  argTypes: {
    message: {
      control: 'text',
      description: 'A mensagem a ser exibida no toast.',
      defaultValue: 'Esta é uma mensagem de notificação.'
    },
    variant: {
      control: 'select',
      options: ['success', 'error', 'info'],
      description: 'Define a variação visual do toast.',
      defaultValue: 'info'
    },
    show: {
      control: 'boolean',
      description: 'Controla a visibilidade do toast.',
      defaultValue: true
    },
    duration: {
      control: 'number',
      description:
        'Duração em milissegundos para o toast fechar automaticamente. 0 para não fechar.',
      defaultValue: 0
    },
    toastClose: {
      action: 'toastClosed',
      description: 'Evento emitido quando o toast é fechado.'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ToastComponent>; //

export const Default: Story = {
  args: {
    message: 'Esta é uma notificação padrão.',
    variant: 'info',
    show: true,
    duration: 0
  },
  render: (args) => ({
    props: args,
    template: `<bb-toast ${argsToTemplate(args)}></bb-toast>`
  })
};

export const Success: Story = {
  args: {
    ...Default.args,
    message: 'Operação realizada com sucesso!',
    variant: 'success',
    duration: 0
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    message: 'Ocorreu um erro ao processar a solicitação.',
    variant: 'error'
  }
};

export const Info: Story = {
  args: {
    ...Default.args,
    message: 'Informação importante para o usuário.',
    variant: 'info'
  }
};

export const AutoClosing: Story = {
  args: {
    ...Default.args,
    message: 'Este toast fechará em 3 segundos.',
    variant: 'success',
    duration: 3000
  }
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 items-end p-8 w-full h-screen relative">
        <bb-toast message="Mensagem de Sucesso!" variant="success" [show]="true" [duration]="0"></bb-toast>
        <bb-toast message="Mensagem de Erro!" variant="error" [show]="true" [duration]="0"></bb-toast>
        <bb-toast message="Mensagem de Informação!" variant="info" [show]="true" [duration]="0"></bb-toast>
      </div>
    `
  }),
  parameters: {
    // Override default layout for this specific story to display all toasts
    layout: 'padded'
  }
};

export const Playground: Story = {
  args: {
    message: 'Mensagem customizável do Toast.',
    variant: 'info',
    show: true,
    duration: 5000
  }
};
