import type { Meta, StoryObj } from '@storybook/angular';
import { Calendar, Link, Mail, SearchIcon } from 'lucide-angular';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent> = {
  title: 'Components/Form/Input',
  component: InputComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile input component with support for different variants, sizes, icons, and accessibility features. Date inputs now include automatic calendar icon and improved validation.'
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search', 'date'],
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
      control: 'select',
      options: ['UserRoundIcon', 'Mail', 'SearchIcon', 'Link', 'Calendar'],
      description: 'Icon to display before the input'
    },
    suffixIcon: {
      control: 'select',
      options: ['UserRoundIcon', 'Mail', 'SearchIcon', 'Link', 'Calendar'],
      description: 'Icon to display after the input'
    }
  }
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome'
  }
};

export const WithPrefixIcon: Story = {
  args: {
    type: 'text',
    label: 'Email',
    placeholder: 'Digite seu email',
    prefixIcon: Mail
  }
};

export const WithSuffixIcon: Story = {
  args: {
    type: 'text',
    label: 'Website',
    placeholder: 'Digite a URL',
    suffixIcon: Link
  }
};

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Senha',
    placeholder: 'Digite sua senha',
    showPasswordToggle: true
  }
};

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Digite seu email',
    prefixIcon: Mail
  }
};

export const Number: Story = {
  args: {
    type: 'number',
    label: 'Idade',
    placeholder: 'Digite sua idade'
  }
};

export const Search: Story = {
  args: {
    type: 'search',
    label: 'Buscar',
    placeholder: 'Digite para buscar...',
    prefixIcon: SearchIcon
  }
};

export const Success: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    variant: 'success',
    successMessage: 'Nome válido!'
  }
};

export const Error: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    variant: 'error',
    errorMessage: 'Nome é obrigatório'
  }
};

export const Warning: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    variant: 'warning',
    helperText: 'Este campo é opcional'
  }
};

export const Disabled: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    disabled: true
  }
};

export const Readonly: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    readonly: true,
    value: 'João Silva'
  }
};

export const Required: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    required: true
  }
};

export const WithHelperText: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    helperText: 'Digite seu nome completo'
  }
};

export const Small: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    size: 'sm'
  }
};

export const Medium: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    size: 'md'
  }
};

export const Large: Story = {
  args: {
    type: 'text',
    label: 'Nome',
    placeholder: 'Digite seu nome',
    size: 'lg'
  }
};

export const Date: Story = {
  args: {
    type: 'date',
    label: 'Data de nascimento',
    placeholder: 'dd/mm/yyyy',
    helperText: 'Selecione sua data de nascimento'
  }
};

export const DateWithCustomIcon: Story = {
  args: {
    type: 'date',
    label: 'Data de nascimento',
    placeholder: 'dd/mm/yyyy',
    suffixIcon: Calendar,
    helperText: 'Selecione sua data de nascimento'
  }
};

export const DateWithError: Story = {
  args: {
    type: 'date',
    label: 'Data de nascimento',
    placeholder: 'dd/mm/yyyy',
    variant: 'error',
    errorMessage: 'Data inválida. Digite uma data válida no formato dd/mm/aaaa'
  }
};

export const DateWithSuccess: Story = {
  args: {
    type: 'date',
    label: 'Data de nascimento',
    placeholder: 'dd/mm/yyyy',
    variant: 'success',
    value: '1990-01-15',
    successMessage: 'Data válida!'
  }
};
