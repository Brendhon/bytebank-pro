import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input.component';
import { Link, Mail, SearchIcon, UserRoundIcon } from 'lucide-angular';

const meta: Meta<InputComponent> = {
  title: 'Components/Input',
  component: InputComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with support for different variants, sizes, icons, and accessibility features.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The input type'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning'],
      description: 'Visual variant of the input'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    value: {
      control: 'text',
      description: 'Input value'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is readonly'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required'
    },
    label: {
      control: 'text',
      description: 'Label text'
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message (shown when variant is error)'
    },
    successMessage: {
      control: 'text',
      description: 'Success message (shown when variant is success)'
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show password toggle button (for password inputs)'
    },
    prefixIcon: {
      control: 'object',
      description: 'LucideIconData object for icon to show at the start'
    },
    suffixIcon: {
      control: 'object',
      description: 'LucideIconData object for icon to show at the end'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  },
  args: {
    type: 'text',
    variant: 'default',
    size: 'md',
    placeholder: 'Digite algo...',
    value: '',
    disabled: false,
    readonly: false,
    required: false,
    showPasswordToggle: false
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<InputComponent>;

// Default story
export const Default: Story = {
  args: {
    placeholder: 'Digite seu nome'
  }
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Nome completo',
    placeholder: 'Digite seu nome completo'
  }
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    helperText: 'Utilizaremos este email para entrar em contato'
  }
};

// Required field
export const Required: Story = {
  args: {
    label: 'Campo obrigatório',
    placeholder: 'Este campo é obrigatório',
    required: true,
    helperText: 'Este campo deve ser preenchido'
  }
};

// Different sizes
export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Tamanho pequeno',
    placeholder: 'Input pequeno'
  }
};

export const Medium: Story = {
  args: {
    size: 'md',
    label: 'Tamanho médio',
    placeholder: 'Input médio (padrão)'
  }
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Tamanho grande',
    placeholder: 'Input grande'
  }
};

// Different variants
export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Campo válido',
    value: 'Dados corretos',
    successMessage: 'Perfeito! Os dados estão corretos.'
  }
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: 'Campo com erro',
    value: 'dados-incorretos',
    errorMessage: 'Por favor, verifique os dados informados.'
  }
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Campo com aviso',
    value: 'dados-atenção',
    helperText: 'Atenção: verifique se os dados estão corretos.'
  }
};

// Different input types
export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'seu@email.com',
    prefixIcon: Mail
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    showPasswordToggle: true,
    helperText: 'A senha deve ter pelo menos 8 caracteres'
  }
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Idade',
    placeholder: '25'
  }
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Buscar...',
    prefixIcon: SearchIcon
  }
};

// With icons
export const WithPrefixIcon: Story = {
  args: {
    label: 'Usuário',
    placeholder: 'Digite seu usuário',
    prefixIcon: UserRoundIcon
  }
};

export const WithSuffixIcon: Story = {
  args: {
    label: 'Website',
    placeholder: 'https://exemplo.com',
    suffixIcon: Link
  }
};

// States
export const Disabled: Story = {
  args: {
    label: 'Campo desabilitado',
    placeholder: 'Este campo está desabilitado',
    disabled: true,
    value: 'Valor desabilitado'
  }
};

export const Readonly: Story = {
  args: {
    label: 'Campo somente leitura',
    readonly: true,
    value: 'Este valor não pode ser editado'
  }
};

// Complex examples
export const LoginForm: Story = {
  render: () => ({
    template: `
      <div class="space-y-4 w-80">
        <bb-input
          label="Email"
          type="email"
          placeholder="seu@email.com"
          prefixIcon="mail"
          required="true">
        </bb-input>
        
        <bb-input
          label="Senha"
          type="password"
          placeholder="Digite sua senha"
          showPasswordToggle="true"
          required="true">
        </bb-input>
      </div>
    `
  })
};

export const ValidationStates: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 w-80">
        <bb-input
          label="Campo válido"
          variant="success"
          value="dados@corretos.com"
          successMessage="Email válido!">
        </bb-input>
        
        <bb-input
          label="Campo com erro"
          variant="error"
          value="email-inválido"
          errorMessage="Por favor, insira um email válido.">
        </bb-input>
        
        <bb-input
          label="Campo com aviso"
          variant="warning"
          value="exemplo@teste.com"
          helperText="Certifique-se de que este email está correto.">
        </bb-input>
      </div>
    `
  })
};
