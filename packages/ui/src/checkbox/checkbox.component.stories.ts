import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

const meta: Meta<CheckboxComponent> = {
  title: 'Components/Inputs/Checkbox',
  component: CheckboxComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Description

The Checkbox component provides a selectable input for binary choices or multiple selections in forms and interfaces.

## When to Use

- For binary choices (agree/disagree, yes/no)
- For multiple selections from a list of options
- To confirm actions or acknowledge terms
- In forms requiring user consent or preference selection

## Features

- Support for checked, unchecked, and indeterminate states
- Multiple visual variants (default, success, error, warning)
- Different sizes (sm, md, lg)
- Accessibility compliant with ARIA attributes
- Form integration with validation states
- Helper text and error message support

## Accessibility

- Supports keyboard navigation (Space to toggle)
- Implements proper ARIA attributes and roles
- Screen reader friendly with descriptive labels
- Visual focus indicators for keyboard users
- Color contrast compliant in all states
- Live regions for dynamic state announcements
        `
      }
    }
  },
  argTypes: {
    checked: {
      description: 'Whether the checkbox is checked',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    indeterminate: {
      description: 'Whether the checkbox is in indeterminate state (partially checked)',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    variant: {
      description: 'Visual variant of the checkbox',
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
        type: { summary: 'CheckboxVariant' },
        defaultValue: { summary: 'default' }
      }
    },
    size: {
      description: 'Size of the checkbox',
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio',
        labels: {
          sm: '📦 Small',
          md: '📋 Medium',
          lg: '📊 Large'
        }
      },
      table: {
        type: { summary: 'CheckboxSize' },
        defaultValue: { summary: 'md' }
      }
    },
    disabled: {
      description: 'Whether the checkbox is disabled',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    readonly: {
      description: 'Whether the checkbox is readonly',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    required: {
      description: 'Whether the checkbox is required',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' }
      }
    },
    label: {
      description: 'Label text for the checkbox',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' }
      }
    },
    helperText: {
      description: 'Helper text displayed below the checkbox',
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
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    variant: 'default',
    size: 'md'
  },
  render: (args) => ({
    props: args,
    template: `<bb-checkbox ${argsToTemplate(args)}></bb-checkbox>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-medium text-gray-700">Visual Variants</h3>
          <div class="grid grid-cols-2 gap-4">
            <bb-checkbox label="Default variant" variant="default" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Success variant" variant="success" [checked]="true" successMessage="Validated successfully"></bb-checkbox>
            <bb-checkbox label="Error variant" variant="error" [checked]="false" [required]="true" errorMessage="This field is required"></bb-checkbox>
            <bb-checkbox label="Warning variant" variant="warning" [checked]="true" helperText="Proceed with caution"></bb-checkbox>
          </div>
        </div>
        
        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-medium text-gray-700">Sizes</h3>
          <div class="flex items-center gap-6">
            <bb-checkbox label="Small" size="sm" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Medium" size="md" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Large" size="lg" [checked]="true"></bb-checkbox>
          </div>
        </div>
        
        <div class="flex flex-col gap-3">
          <h3 class="text-sm font-medium text-gray-700">States</h3>
          <div class="grid grid-cols-2 gap-4">
            <bb-checkbox label="Unchecked" [checked]="false"></bb-checkbox>
            <bb-checkbox label="Checked" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Indeterminate" [indeterminate]="true"></bb-checkbox>
            <bb-checkbox label="Disabled" [disabled]="true" [checked]="false"></bb-checkbox>
            <bb-checkbox label="Disabled Checked" [disabled]="true" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Readonly" [readonly]="true" [checked]="true"></bb-checkbox>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'This story displays all available variants, sizes, and states of the checkbox component for easy comparison.'
      }
    }
  }
};

export const LoadingState: Story = {
  args: {
    label: 'Processing selection...',
    disabled: true,
    helperText: 'Please wait while we validate your choice',
    variant: 'default',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Represents a checkbox in a loading/processing state where user interaction is temporarily disabled.'
      }
    }
  }
};

export const DisabledState: Story = {
  render: () => ({
    template: `
      <div class="space-y-4">
        <bb-checkbox label="Disabled unchecked" [disabled]="true" [checked]="false"></bb-checkbox>
        <bb-checkbox label="Disabled checked" [disabled]="true" [checked]="true"></bb-checkbox>
        <bb-checkbox label="Disabled indeterminate" [disabled]="true" [indeterminate]="true"></bb-checkbox>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Shows disabled checkboxes in different states. Disabled checkboxes cannot be interacted with.'
      }
    }
  }
};

export const ErrorState: Story = {
  args: {
    label: 'Required agreement',
    errorMessage: 'You must accept the terms to continue',
    checked: false,
    variant: 'error',
    size: 'md',
    required: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates error state with validation message. Used when user input is invalid or required field is empty.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    label: 'Playground checkbox',
    helperText: 'Customize all properties using the controls below',
    checked: false,
    indeterminate: false,
    variant: 'default',
    size: 'md',
    disabled: false,
    readonly: false,
    required: false,
    errorMessage: '',
    successMessage: ''
  },
  render: (args) => ({
    props: args,
    template: `<bb-checkbox ${argsToTemplate(args)}></bb-checkbox>`
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Interactive playground to test all checkbox properties and configurations. Use the controls panel to experiment with different combinations.'
      }
    }
  }
};

export const FormIntegration: Story = {
  render: () => ({
    template: `
      <form class="space-y-6 max-w-md">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Account Preferences</h3>
          
          <bb-checkbox 
            label="Email notifications"
            helperText="Receive updates about your account"
            [checked]="true">
          </bb-checkbox>
          
          <bb-checkbox 
            label="SMS notifications"
            helperText="Get important alerts via text message"
            [checked]="false">
          </bb-checkbox>
          
          <bb-checkbox 
            label="Marketing emails"
            helperText="Receive promotional content and offers"
            variant="warning"
            [checked]="false">
          </bb-checkbox>
        </div>
        
        <div class="border-t pt-4">
          <bb-checkbox 
            label="I agree to the Terms of Service"
            errorMessage="You must accept the terms to continue"
            variant="error"
            [required]="true"
            [checked]="false">
          </bb-checkbox>
          
          <bb-checkbox 
            label="I agree to the Privacy Policy"
            [required]="true"
            [checked]="true">
          </bb-checkbox>
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled>
          Save Preferences
        </button>
      </form>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Form Integration Example

Demonstrates how checkboxes work within forms, showing:
- Different variants for different types of choices
- Required field validation
- Helper text for guidance
- Error states for invalid inputs
- Grouped related options

This pattern is common in settings pages, registration forms, and preference panels.
        `
      }
    }
  }
};

export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div class="w-full max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900">Basic Options</h4>
            <bb-checkbox label="Enable notifications" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Auto-save changes" [checked]="false"></bb-checkbox>
            <bb-checkbox label="Show preview" [checked]="true"></bb-checkbox>
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900">Privacy Settings</h4>
            <bb-checkbox label="Make profile public" [checked]="false"></bb-checkbox>
            <bb-checkbox label="Allow contact from others" [checked]="true"></bb-checkbox>
            <bb-checkbox label="Show online status" [checked]="false"></bb-checkbox>
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900">Advanced Features</h4>
            <bb-checkbox label="Enable beta features" variant="warning" [checked]="false" helperText="May be unstable"></bb-checkbox>
            <bb-checkbox label="Developer mode" [checked]="false"></bb-checkbox>
            <bb-checkbox label="Debug logging" [checked]="false"></bb-checkbox>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        story: `
### Responsive Layout

This story demonstrates how checkboxes adapt to different screen sizes using responsive grid layouts.
The layout automatically adjusts from single column on mobile to three columns on larger screens.
        `
      }
    }
  }
};

export const AccessibilityDemo: Story = {
  render: () => ({
    template: `
      <div class="space-y-6">
        <div class="bg-blue-50 p-4 rounded-lg">
          <h3 class="font-medium text-blue-900 mb-2">Accessibility Features Demo</h3>
          <p class="text-blue-700 text-sm mb-4">
            Try navigating with keyboard (Tab/Space) or screen reader to experience accessibility features.
          </p>
        </div>
        
        <fieldset class="space-y-4">
          <legend class="font-medium text-gray-900">Subscription Preferences</legend>
          
          <bb-checkbox 
            label="Weekly newsletter"
            helperText="Receive our weekly digest every Monday"
            [checked]="true"
            [required]="false">
          </bb-checkbox>
          
          <bb-checkbox 
            label="Product updates"
            helperText="Get notified about new features and improvements"
            [checked]="false">
          </bb-checkbox>
          
          <bb-checkbox 
            label="Marketing communications"
            helperText="Promotional offers and special deals"
            variant="warning"
            [checked]="false">
          </bb-checkbox>
          
          <bb-checkbox 
            label="Terms and Conditions"
            errorMessage="You must accept the terms to continue"
            variant="error"
            [required]="true"
            [checked]="false">
          </bb-checkbox>
        </fieldset>
        
        <div class="text-sm text-gray-600 space-y-2">
          <p><strong>Keyboard Navigation:</strong></p>
          <ul class="list-disc list-inside space-y-1 ml-4">
            <li>Use <kbd class="px-1 py-0.5 bg-gray-200 rounded text-xs">Tab</kbd> to navigate between checkboxes</li>
            <li>Use <kbd class="px-1 py-0.5 bg-gray-200 rounded text-xs">Space</kbd> to toggle checkbox state</li>
            <li>Screen readers will announce label, state, and helper text</li>
          </ul>
        </div>
      </div>
    `
  }),
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: true },
          { id: 'keyboard-navigation', enabled: true },
          { id: 'aria-valid-attr', enabled: true }
        ]
      }
    },
    docs: {
      description: {
        story: `
### Accessibility Demonstration

This story showcases the checkbox component's accessibility features:

- **Keyboard Navigation**: Full keyboard support with Tab and Space keys
- **Screen Reader Support**: Proper ARIA attributes and semantic HTML
- **Focus Management**: Clear visual focus indicators
- **Color Contrast**: WCAG compliant color combinations
- **Error Announcements**: Live regions for dynamic state changes
- **Required Field Indicators**: Visual and programmatic indication

All checkboxes are properly labeled and associated with their help text and error messages.
        `
      }
    }
  }
};
