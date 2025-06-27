import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
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
  title: 'Components/Inputs/Select',
  component: SelectComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Description

The Select component provides a dropdown interface for selecting one or multiple options from a list. It supports advanced features like search, clear functionality, and various visual states.

## When to Use

- For choosing options from a predefined list
- When you need to save space compared to radio buttons
- For filtering or categorizing data
- When users need to select multiple items from a list

## Features

- Single and multiple selection modes
- Searchable options with filtering
- Keyboard navigation support
- Loading and disabled states
- Clear functionality
- Custom placeholder and helper text
- Accessibility compliant with ARIA attributes

## Accessibility

- Full keyboard navigation support (Arrow keys, Enter, Escape)
- Screen reader compatible with proper ARIA attributes
- Focus management and visual indicators
- Semantic HTML structure with proper roles
        `
      }
    },
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }]
      }
    }
  },
  argTypes: {
    variant: {
      description: 'Visual style variant of the select component',
      options: ['default', 'success', 'error', 'warning'],
      control: {
        type: 'select',
        labels: {
          default: '🔵 Default',
          success: '✅ Success',
          error: '❌ Error',
          warning: '⚠️ Warning'
        }
      },
      table: {
        defaultValue: { summary: 'default' },
        type: { summary: 'SelectVariant' }
      }
    },
    size: {
      description: 'Size of the select component',
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio',
        labels: {
          sm: 'Small',
          md: 'Medium',
          lg: 'Large'
        }
      },
      table: {
        defaultValue: { summary: 'sm' },
        type: { summary: 'SelectSize' }
      }
    },
    options: {
      description: 'Array of options to display in the dropdown',
      control: { type: 'object' },
      table: {
        type: { summary: 'SelectOption[]' }
      }
    },
    value: {
      description: 'Currently selected value(s)',
      control: { type: 'text' },
      table: {
        type: { summary: 'T | T[] | undefined' }
      }
    },
    multiple: {
      description: 'Enable multiple selection mode',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    searchable: {
      description: 'Enable search functionality to filter options',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    clearable: {
      description: 'Show clear button to reset selection',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    disabled: {
      description: 'Disable the select component',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    readonly: {
      description: 'Make the select read-only',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    required: {
      description: 'Mark the field as required',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loading: {
      description: 'Show loading state',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    label: {
      description: 'Label text for the select field',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' }
      }
    },
    placeholder: {
      description: 'Placeholder text when no option is selected',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'Select an option' },
        type: { summary: 'string' }
      }
    },
    helperText: {
      description: 'Helper text displayed below the select',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' }
      }
    },
    errorMessage: {
      description: 'Error message displayed when variant is error',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' }
      }
    },
    successMessage: {
      description: 'Success message displayed when variant is success',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' }
      }
    },
    // Hide event outputs from controls
    valueChange: {
      table: { disable: true }
    },
    selectFocus: {
      table: { disable: true }
    },
    selectBlur: {
      table: { disable: true }
    },
    selectKeydown: {
      table: { disable: true }
    },
    searchChange: {
      table: { disable: true }
    },
    optionSelect: {
      table: { disable: true }
    },
    dropdownOpen: {
      table: { disable: true }
    },
    dropdownClose: {
      table: { disable: true }
    }
  },
  args: {
    options: mockOptions,
    placeholder: 'Select a country',
    variant: 'default',
    size: 'sm',
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    readonly: false,
    required: false,
    loading: false
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<SelectComponent>;

// Default story - most common usage
export const Default: Story = {
  args: {
    label: 'Country',
    helperText: 'Choose your country from the list'
  },
  render: (args) => ({
    props: args,
    template: `<bb-select ${argsToTemplate(args)}></bb-select>`
  })
};

// All variants displayed side by side
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6 w-full max-w-md">
        <bb-select 
          [options]="options" 
          variant="default" 
          label="Default Variant" 
          placeholder="Select an option"
        ></bb-select>
        <bb-select 
          [options]="options" 
          variant="success" 
          label="Success Variant" 
          value="br"
          successMessage="Selection confirmed successfully"
        ></bb-select>
        <bb-select 
          [options]="options" 
          variant="error" 
          label="Error Variant" 
          required="true"
          errorMessage="This field is required"
        ></bb-select>
        <bb-select 
          [options]="options" 
          variant="warning" 
          label="Warning Variant" 
          value="us"
          helperText="Please verify your selection"
        ></bb-select>
      </div>
    `,
    props: {
      options: mockOptions
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Displays all available visual variants of the select component for easy comparison.'
      }
    }
  }
};

// All sizes displayed side by side
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-4 w-full max-w-md">
        <bb-select 
          [options]="options" 
          size="sm" 
          label="Small Size" 
          placeholder="Small select"
        ></bb-select>
        <bb-select 
          [options]="options" 
          size="md" 
          label="Medium Size" 
          placeholder="Medium select"
        ></bb-select>
        <bb-select 
          [options]="options" 
          size="lg" 
          label="Large Size" 
          placeholder="Large select"
        ></bb-select>
      </div>
    `,
    props: {
      options: mockOptions
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'Shows the select component in all available sizes (small, medium, large).'
      }
    }
  }
};

// Interactive playground with all configurable properties
export const Playground: Story = {
  args: {
    label: 'Interactive Select',
    helperText: 'Try different configurations using the controls below',
    variant: 'default',
    size: 'sm',
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    readonly: false,
    required: false,
    loading: false,
    placeholder: 'Select an option',
    options: mockOptions
  },
  render: (args) => ({
    props: args,
    template: `<bb-select ${argsToTemplate(args)}></bb-select>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to experiment with all select component properties. Use the controls panel to test different configurations.'
      }
    }
  }
};

// === FEATURE STORIES ===

// Select with pre-selected value
export const WithValue: Story = {
  args: {
    label: 'Country',
    value: 'br',
    helperText: 'Brazil is pre-selected',
    clearable: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows a select with a pre-selected value. Notice the clear button appears when clearable is enabled.'
      }
    }
  }
};

// Multiple selection mode
export const MultipleSelection: Story = {
  args: {
    label: 'Countries',
    multiple: true,
    value: ['br', 'us'],
    clearable: true,
    helperText: 'You can select multiple countries. Selected items appear as tags.'
  },
  parameters: {
    docs: {
      description: {
        story: `
### Multiple Selection

Enables selection of multiple options. Selected items are displayed as removable tags.

\`\`\`html
<bb-select 
  [options]="countries" 
  [multiple]="true" 
  [value]="['br', 'us']"
  [clearable]="true"
  label="Countries">
</bb-select>
\`\`\`
        `
      }
    }
  }
};

// Searchable select with filtering
export const SearchableSelect: Story = {
  args: {
    label: 'Country',
    searchable: true,
    clearable: true,
    searchPlaceholder: 'Type to search countries...',
    helperText: 'Start typing to filter options dynamically'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Searchable select allows users to filter options by typing. Perfect for large lists of options.'
      }
    }
  }
};

// === SPECIAL STATES ===

// Loading state
export const LoadingState: Story = {
  args: {
    label: 'Country',
    loading: true,
    helperText: 'Loading countries from server...'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the loading state with a spinner indicator. Use this while fetching options from an API.'
      }
    }
  }
};

// Disabled state
export const DisabledState: Story = {
  args: {
    label: 'Country',
    disabled: true,
    value: 'br',
    helperText: 'This field is currently disabled and cannot be modified'
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled state prevents any interaction with the select component.'
      }
    }
  }
};

// Readonly state
export const ReadonlyState: Story = {
  args: {
    label: 'Country',
    readonly: true,
    value: 'br',
    helperText: 'This field is readonly - value can be seen but not changed'
  },
  parameters: {
    docs: {
      description: {
        story: 'Readonly state displays the current value but prevents changes.'
      }
    }
  }
};

// Error state with validation
export const ErrorState: Story = {
  args: {
    label: 'Required Field',
    variant: 'error',
    required: true,
    errorMessage: 'Please select a country from the list'
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state for form validation. Shows error styling and message.'
      }
    }
  }
};

// Success state
export const SuccessState: Story = {
  args: {
    label: 'Selection',
    variant: 'success',
    value: 'br',
    successMessage: 'Great choice! Brazil selected successfully'
  },
  parameters: {
    docs: {
      description: {
        story: 'Success state provides positive feedback after a valid selection.'
      }
    }
  }
};

// Warning state
export const WarningState: Story = {
  args: {
    label: 'Country',
    variant: 'warning',
    value: 'us',
    helperText: 'Please verify your selection before proceeding'
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning state draws attention to selections that may need verification.'
      }
    }
  }
};

// === ADVANCED EXAMPLES ===

// Select with disabled options
export const WithDisabledOptions: Story = {
  args: {
    label: 'Status',
    options: mockOptionsWithDisabled,
    helperText: 'Some options are disabled and cannot be selected'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how disabled options appear in the dropdown. They are visually distinct and not selectable.'
      }
    }
  }
};

// All features enabled
export const AllFeatures: Story = {
  args: {
    label: 'Countries',
    multiple: true,
    searchable: true,
    clearable: true,
    required: true,
    value: ['br', 'us'],
    helperText:
      'A fully-featured select with multiple selection, search, clear functionality, and validation'
  },
  parameters: {
    docs: {
      description: {
        story: `
### All Features Combined

This example shows the select component with all features enabled:
- Multiple selection with tag display
- Search functionality for filtering
- Clear button to reset selection
- Required field validation
- Comprehensive helper text

Perfect for complex form scenarios where users need maximum flexibility.
        `
      }
    }
  }
};

// Empty state
export const EmptyState: Story = {
  args: {
    label: 'Empty Select',
    options: [],
    noOptionsText: 'No options available at this time',
    helperText: 'This select has no options to display'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows how the select behaves when no options are available. Displays a custom "no options" message.'
      }
    }
  }
};

// === COMPOSITION EXAMPLES ===

// Form composition example
export const InFormContext: Story = {
  render: () => ({
    template: `
      <form class="space-y-4 w-full max-w-md">
        <bb-select 
          [options]="countries" 
          label="Country" 
          required="true"
          helperText="Select your country of residence"
        ></bb-select>
        
        <bb-select 
          [options]="states" 
          label="State/Province" 
          searchable="true"
          clearable="true"
          helperText="Search and select your state or province"
        ></bb-select>
        
        <bb-select 
          [options]="priorities" 
          label="Priority Level" 
          variant="warning"
          value="medium"
          helperText="Current priority level - change if needed"
        ></bb-select>
      </form>
    `,
    props: {
      countries: mockOptions,
      states: [
        { value: 'ca', label: 'California' },
        { value: 'ny', label: 'New York' },
        { value: 'tx', label: 'Texas' },
        { value: 'fl', label: 'Florida' },
        { value: 'sp', label: 'São Paulo' },
        { value: 'rj', label: 'Rio de Janeiro' }
      ],
      priorities: [
        { value: 'low', label: 'Low Priority' },
        { value: 'medium', label: 'Medium Priority' },
        { value: 'high', label: 'High Priority' },
        { value: 'urgent', label: 'Urgent' }
      ]
    }
  }),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Example of multiple select components working together in a form context with different configurations.'
      }
    }
  }
};
