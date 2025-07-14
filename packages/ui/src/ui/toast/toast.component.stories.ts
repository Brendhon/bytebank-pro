import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate, componentWrapperDecorator } from '@storybook/angular';
import { ToastComponent } from './toast.component';

const meta: Meta<ToastComponent> = {
  title: 'Components/UI/Toast',
  component: ToastComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A notification component that displays temporary messages to users, with support for different variant types (success, error, info) and automatic or manual closing.'
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
      description: 'The message to be displayed in the toast.',
      defaultValue: 'This is a notification message.'
    },
    variant: {
      control: 'select',
      options: ['success', 'error', 'info'],
      description: 'Defines the visual variant of the toast.',
      defaultValue: 'info'
    },
    show: {
      control: 'boolean',
      description: 'Controls the visibility of the toast.',
      defaultValue: true
    },
    duration: {
      control: 'number',
      description:
        'Duration in milliseconds for the toast to close automatically. 0 for no auto close.',
      defaultValue: 0
    },
    toastClose: {
      action: 'toastClosed',
      description: 'Event emitted when the toast is closed.'
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ToastComponent>;

export const Default: Story = {
  args: {
    message: 'This is a default notification.',
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
    message: 'Operation completed successfully!',
    variant: 'success',
    duration: 0
  }
};

export const Error: Story = {
  args: {
    ...Default.args,
    message: 'An error occurred while processing the request.',
    variant: 'error'
  }
};

export const Info: Story = {
  args: {
    ...Default.args,
    message: 'Important information for the user.',
    variant: 'info'
  }
};

export const AutoClosing: Story = {
  args: {
    ...Default.args,
    message: 'This toast will close in 3 seconds.',
    variant: 'success',
    duration: 3000
  }
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 items-end p-8 w-full h-screen relative">
        <bb-toast message="Success Message!" variant="success" [show]="true" [duration]="0"></bb-toast>
        <bb-toast message="Error Message!" variant="error" [show]="true" [duration]="0"></bb-toast>
        <bb-toast message="Info Message!" variant="info" [show]="true" [duration]="0"></bb-toast>
      </div>
    `
  }),
  parameters: {
    layout: 'padded'
  }
};

export const Playground: Story = {
  args: {
    message: 'Customizable Toast message.',
    variant: 'info',
    show: true,
    duration: 5000
  }
};
