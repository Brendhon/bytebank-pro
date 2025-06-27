import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent, SelectOption } from './select.component';

const mockOptions: SelectOption[] = [
  { value: 'br', label: 'Brazil' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'mx', label: 'Mexico' },
  { value: 'ar', label: 'Argentina' },
  { value: 'cl', label: 'Chile' },
  { value: 'pe', label: 'Peru' },
  { value: 'co', label: 'Colombia' }
];

const mockOptionsWithDisabled: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending', disabled: true },
  { value: 'suspended', label: 'Suspended' }
];

const meta: Meta<SelectComponent> = {
  title: 'Components/Select',
  component: SelectComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible select component with support for single/multiple selection, search, and various variants.'
      }
    }
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'success', 'error', 'warning']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    options: {
      control: { type: 'object' }
    },
    value: {
      control: { type: 'text' }
    },
    multiple: {
      control: { type: 'boolean' }
    },
    searchable: {
      control: { type: 'boolean' }
    },
    clearable: {
      control: { type: 'boolean' }
    },
    disabled: {
      control: { type: 'boolean' }
    },
    readonly: {
      control: { type: 'boolean' }
    },
    required: {
      control: { type: 'boolean' }
    },
    loading: {
      control: { type: 'boolean' }
    }
  },
  args: {
    options: mockOptions,
    placeholder: 'Select a country',
    variant: 'default',
    size: 'md',
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    readonly: false,
    required: false,
    loading: false
  }
};

export default meta;
type Story = StoryObj<SelectComponent>;

// Basic select story
export const Default: Story = {
  args: {
    label: 'Country',
    helperText: 'Choose your country from the list'
  }
};

// Select with pre-selected value
export const WithValue: Story = {
  args: {
    label: 'Country',
    value: 'br',
    helperText: 'Brazil is pre-selected'
  }
};

// Multiple selection
export const Multiple: Story = {
  args: {
    label: 'Countries',
    multiple: true,
    value: ['br', 'us'],
    clearable: true,
    helperText: 'You can select multiple countries'
  }
};

// Searchable select
export const Searchable: Story = {
  args: {
    label: 'Country',
    searchable: true,
    clearable: true,
    searchPlaceholder: 'Type to search countries...',
    helperText: 'Start typing to filter options'
  }
};

// Small size
export const Small: Story = {
  args: {
    label: 'Status',
    size: 'sm',
    options: mockOptionsWithDisabled,
    helperText: 'Small size select'
  }
};

// Large size
export const Large: Story = {
  args: {
    label: 'Priority',
    size: 'lg',
    options: [
      { value: 'low', label: 'Low Priority' },
      { value: 'medium', label: 'Medium Priority' },
      { value: 'high', label: 'High Priority' },
      { value: 'urgent', label: 'Urgent' }
    ],
    helperText: 'Large size select'
  }
};

// Success variant
export const Success: Story = {
  args: {
    label: 'Selection',
    variant: 'success',
    value: 'br',
    successMessage: 'Great choice! Brazil selected successfully.'
  }
};

// Error variant
export const Error: Story = {
  args: {
    label: 'Required Field',
    variant: 'error',
    required: true,
    errorMessage: 'Please select a country from the list.'
  }
};

// Warning variant
export const Warning: Story = {
  args: {
    label: 'Country',
    variant: 'warning',
    value: 'us',
    helperText: 'Please verify your selection before proceeding.'
  }
};

// Disabled state
export const Disabled: Story = {
  args: {
    label: 'Country',
    disabled: true,
    value: 'br',
    helperText: 'This field is currently disabled'
  }
};

// Readonly state
export const Readonly: Story = {
  args: {
    label: 'Country',
    readonly: true,
    value: 'br',
    helperText: 'This field is readonly'
  }
};

// Loading state
export const Loading: Story = {
  args: {
    label: 'Country',
    loading: true,
    helperText: 'Loading countries...'
  }
};

// With all features enabled
export const AllFeatures: Story = {
  args: {
    label: 'Countries',
    multiple: true,
    searchable: true,
    clearable: true,
    required: true,
    value: ['br', 'us'],
    helperText: 'A fully-featured select with multiple selection, search, and clear functionality'
  }
};

// No options available
export const NoOptions: Story = {
  args: {
    label: 'Empty Select',
    options: [],
    noOptionsText: 'No options available',
    helperText: 'This select has no options'
  }
};
