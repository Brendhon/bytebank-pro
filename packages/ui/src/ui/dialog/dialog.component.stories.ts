import { signal } from '@angular/core';
import type { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';

const meta: Meta<DialogComponent> = {
  title: 'Components/UI/Dialog',
  component: DialogComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Descrição

O componente Dialog fornece uma interface modal para exibir conteúdo sobreposto, incluindo formulários de login, registro, confirmações e outros conteúdos de overlay. Oferece suporte a blur de fundo, gerenciamento de foco e acessibilidade.

## Quando Usar

- Para formulários de login e registro
- Para confirmações de ações importantes
- Para exibir conteúdo que requer atenção imediata do usuário
- Para modais com conteúdo customizado

## Acessibilidade

- Suporta navegação por teclado (Tab, Escape)
- Implementa aria-label e aria-labelledby apropriados
- Gerencia foco automaticamente quando aberto/fechado
- Suporta fechamento via tecla Escape
        `
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the dialog is visible',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    title: {
      control: 'text',
      description: 'Title displayed in the dialog header',
      table: {
        defaultValue: { summary: '""' },
        type: { summary: 'string' }
      }
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Whether to show the close button in the header',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    closeOnBackdropClick: {
      control: 'boolean',
      description: 'Whether clicking the backdrop closes the dialog',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Whether pressing escape closes the dialog',
      table: {
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' }
      }
    },
    maxWidth: {
      control: 'text',
      description: 'Maximum width of the dialog container',
      table: {
        defaultValue: { summary: '32rem' },
        type: { summary: 'string' }
      }
    },
    ariaLabel: {
      control: 'text',
      description: 'Custom aria-label for the dialog',
      table: {
        type: { summary: 'string' }
      }
    },
    close: {
      action: 'close',
      description: 'Event emitted when dialog is closed',
      table: {
        disable: true
      }
    }
  }
};

export default meta;
type Story = StoryObj<DialogComponent>;

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Default Dialog',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    maxWidth: '32rem',
    ariaLabel: ''
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <p class="text-gray-600 mb-4">
          This is a generic dialog component that can contain any content.
        </p>
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
            Confirm
          </button>
        </div>
      </bb-dialog>
    `
  })
};

export const LoginForm: Story = {
  args: {
    isOpen: true,
    title: 'Login to ByteBank',
    showCloseButton: true,
    closeOnBackdropClick: false,
    closeOnEscape: true,
    maxWidth: '28rem',
    ariaLabel: 'Login form dialog'
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Login dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <form class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div class="flex items-center justify-between pt-4">
            <a href="#" class="text-sm text-blue-600 hover:text-blue-800">
              Forgot password?
            </a>
            <div class="flex gap-3">
              <button type="button" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
                Cancel
              </button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
                Login
              </button>
            </div>
          </div>
        </form>
      </bb-dialog>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Login Form Dialog

Esta variante demonstra como usar o Dialog para formulários de autenticação. 
Note que o fechamento por clique no backdrop está desabilitado para evitar perda acidental de dados.

**Características:**
- Não permite fechamento por clique no backdrop
- Permite fechamento via Escape
- Tamanho otimizado para formulários de login
- Inclui link para recuperação de senha

\`\`\`html
<bb-dialog 
  [isOpen]="isLoginOpen"
  title="Login to ByteBank"
  [closeOnBackdropClick]="false"
  maxWidth="28rem"
  (close)="handleLoginClose()"
>
  <!-- Form content -->
</bb-dialog>
\`\`\`
        `
      }
    }
  }
};

export const RegisterForm: Story = {
  args: {
    isOpen: true,
    title: 'Create Account',
    showCloseButton: true,
    closeOnBackdropClick: false,
    closeOnEscape: true,
    maxWidth: '32rem',
    ariaLabel: 'Registration form dialog'
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Registration dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <form class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input 
                id="firstName"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John"
              />
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input 
                id="lastName"
                type="text" 
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label for="regEmail" class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="regEmail"
              type="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="john.doe@example.com"
            />
          </div>
          <div>
            <label for="regPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input 
              id="regPassword"
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a strong password"
            />
          </div>
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input 
              id="confirmPassword"
              type="password" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <div class="flex items-center justify-end gap-3 pt-4">
            <button type="button" class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Cancel
            </button>
            <button type="submit" class="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded">
              Create Account
            </button>
          </div>
        </form>
      </bb-dialog>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Registration Form Dialog

Demonstra o uso do Dialog para formulários de registro com múltiplos campos.
Utiliza um layout responsivo em grade para otimizar o espaço.

**Características:**
- Layout em grade para campos de nome
- Validação visual via focus rings
- Tamanho maior para acomodar mais campos
- Botão de ação diferenciado (verde para registro)

\`\`\`html
<bb-dialog 
  [isOpen]="isRegisterOpen"
  title="Create Account"
  [closeOnBackdropClick]="false"
  maxWidth="32rem"
  (close)="handleRegisterClose()"
>
  <!-- Registration form content -->
</bb-dialog>
\`\`\`
        `
      }
    }
  }
};

export const WithoutTitle: Story = {
  args: {
    isOpen: true,
    title: '',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    maxWidth: '24rem',
    ariaLabel: 'Confirmation dialog'
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Confirmation dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <div class="text-center">
          <div class="w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Delete Account</h3>
          <p class="text-gray-600 mb-6">
            Are you sure you want to delete your account? This action cannot be undone.
          </p>
          <div class="flex gap-3 justify-center">
            <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
              Cancel
            </button>
            <button class="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded">
              Delete
            </button>
          </div>
        </div>
      </bb-dialog>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Dialog Without Header Title

Demonstra um dialog sem título no cabeçalho, útil para confirmações visuais onde o conteúdo é auto-explicativo.

**Características:**
- Sem título no cabeçalho
- Conteúdo centralizado
- Ícone visual para comunicação rápida
- aria-label obrigatório para acessibilidade

\`\`\`html
<bb-dialog 
  [isOpen]="isDeleteOpen"
  title=""
  ariaLabel="Delete confirmation dialog"
  maxWidth="24rem"
  (close)="handleDeleteClose()"
>
  <!-- Centered confirmation content -->
</bb-dialog>
\`\`\`
        `
      }
    }
  }
};

export const WithoutCloseButton: Story = {
  args: {
    isOpen: true,
    title: 'Dialog Without Close Button',
    showCloseButton: false,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    maxWidth: '28rem',
    ariaLabel: 'Important notification dialog'
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <p class="text-gray-600 mb-4">
          This dialog doesn't show a close button. It can only be closed by clicking outside or pressing Escape.
        </p>
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
            Acknowledge
          </button>
        </div>
      </bb-dialog>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Dialog variant without the close button, useful for critical notifications that require user acknowledgment.'
      }
    }
  }
};

export const NoBackdropClose: Story = {
  args: {
    isOpen: true,
    title: 'Cannot Close on Backdrop',
    showCloseButton: true,
    closeOnBackdropClick: false,
    closeOnEscape: false,
    maxWidth: '24rem',
    ariaLabel: 'Modal dialog requiring explicit closure'
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <p class="text-gray-600 mb-4">
          This dialog cannot be closed by clicking outside or pressing Escape. You must use the close button.
        </p>
        <div class="flex justify-end">
          <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
            Close
          </button>
        </div>
      </bb-dialog>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Dialog that requires explicit closure via the close button, useful for important forms or confirmations.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    isOpen: true,
    title: 'Playground Dialog',
    showCloseButton: true,
    closeOnBackdropClick: true,
    closeOnEscape: true,
    maxWidth: '32rem',
    ariaLabel: ''
  },
  render: (args) => ({
    props: {
      ...args,
      dialogOpen: signal(args.isOpen),
      handleClose: () => {
        console.log('Dialog closed');
      }
    },
    template: `
      <bb-dialog 
        [isOpen]="dialogOpen()"
        [title]="title"
        [showCloseButton]="showCloseButton"
        [closeOnBackdropClick]="closeOnBackdropClick"
        [closeOnEscape]="closeOnEscape"
        [maxWidth]="maxWidth"
        [ariaLabel]="ariaLabel"
        (close)="handleClose()"
      >
        <p class="text-gray-600 mb-4">
          Use the controls panel to experiment with all dialog properties and see how they affect the component behavior.
        </p>
        <div class="bg-gray-50 p-4 rounded mb-4">
          <h4 class="font-medium mb-2">Current Settings:</h4>
          <ul class="text-sm text-gray-600 space-y-1">
            <li>Show Close Button: {{ showCloseButton ? 'Yes' : 'No' }}</li>
            <li>Close on Backdrop: {{ closeOnBackdropClick ? 'Yes' : 'No' }}</li>
            <li>Close on Escape: {{ closeOnEscape ? 'Yes' : 'No' }}</li>
            <li>Max Width: {{ maxWidth }}</li>
          </ul>
        </div>
        <div class="flex gap-3 justify-end">
          <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded">
            Apply
          </button>
        </div>
      </bb-dialog>
    `
  })
};
