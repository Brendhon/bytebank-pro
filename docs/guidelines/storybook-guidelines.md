# 📖 Storybook Patterns

This document defines the patterns and recommended practices for creating and documenting components using Storybook in ByteBank Pro.

---

## 1. Base Story Structure

The base structure for a story file should include `Meta` and `StoryObj`, defining the component, its categorization (`title`), global parameters, argument types (`argTypes`), and tags for automatic documentation.

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ComponenteComponent } from './componente.component';

const meta: Meta<ComponenteComponent> = {
  title: 'Components/ComponentNameFolder/Component', // Category in the Storybook hierarchy
  component: ComponenteComponent, // Main documented component
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A detailed description of the component purpose and usage.' // Component description in the documentation
      }
    }
  },
  argTypes: {
    variant: {
      description: 'Defines the visual style of the component',
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'select' }
    },
    size: {
      description: 'Defines the component size',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    disabled: {
      description: 'Disables the component',
      control: { type: 'boolean' }
    }
    // Other controls...
  },
  tags: ['autodocs'] // Enables automatic documentation
};

export default meta;
type Story = StoryObj<ComponenteComponent>;
```

---

## 2. Essential Stories (Mandatory)

For each component, the following stories are mandatory to ensure comprehensive documentation and testing:

### A. Default

Displays the component in its most common state, with typical default values, representing its fundamental use.

```typescript
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md'
    // Other default values
  },
  render: (args) => ({
    props: args,
    template: `<bb-componente ${argsToTemplate(args)}>Content</bb-componente>`
  })
};
```

### B. All Variants

Shows all visual variations of the component side by side, facilitating visualization and comparison.

```typescript
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex gap-4">
        <bb-componente variant="primary">Primary</bb-componente>
        <bb-componente variant="secondary">Secondary</bb-componente>
        <bb-componente variant="danger">Danger</bb-componente>
      </div>
    `
  })
};
```

### C. Special States

Include stories for each relevant special state the component can assume (e.g., loading, disabled, error).

```typescript
export const LoadingState: Story = {
  args: {
    loading: true,
    loadingText: 'Loading...'
  }
};

export const DisabledState: Story = {
  args: {
    disabled: true
  }
};

export const ErrorState: Story = {
  args: {
    variant: 'error',
    errorMessage: 'This field is required'
  }
};
```

### D. Playground

Allows interactive experimentation with all configurable properties of the component through Storybook controls.

```typescript
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    className: ''
    // All configurable props
  }
};
```

---

## 3. Advanced Story Patterns

These stories demonstrate more complex behaviors or specific use cases.

### A. Complex Interactions

Use `action()` to capture and display events emitted by the component, facilitating debugging and interactivity demonstration.

```typescript
export const WithInteractions: Story = {
  render: (args) => ({
    props: {
      ...args,
      onClick: action('clicked')
    },
    template: `
      <bb-componente (click)="onClick($event)">
        Click me!
      </bb-componente>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates click event capture.'
      }
    }
  }
};
```

### B. Component Composition

Demonstrates how the component can be used in conjunction with other library components to form more complex structures.

```typescript
export const ComposedComponents: Story = {
  render: () => ({
    template: `
      <bb-card>
        <div slot="header">
          <bb-heading>Card with Composed Components</bb-heading>
        </div>
        <bb-input placeholder="Type something"></bb-input>
        <div slot="footer">
          <bb-button variant="primary">Save</bb-button>
          <bb-button variant="secondary">Cancel</bb-button>
        </div>
      </bb-card>
    `
  })
};
```

### C. Responsive Design

Shows the component's behavior on different screen sizes, using Storybook's `viewport` addon.

```typescript
export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div class="w-full">
        <bb-componente class="w-full">Responsive Component</bb-componente>
      </div>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};
```

### D. Dynamic States

Demonstrates the component's interactivity and state changes over time.

```typescript
export const DynamicState: Story = {
  render: () => ({
    props: {
      isOpen: false,
      toggle() {
        this.isOpen = !this.isOpen;
      }
    },
    template: `
      <div>
        <bb-button (click)="toggle()">
          {{ isOpen ? 'Close' : 'Open' }}
        </bb-button>
        <div [class.hidden]="!isOpen" class="mt-4 p-4 border rounded">
          Content visible when open
        </div>
      </div>
    `
  })
};
```

---

## 4. Documentation in Storybook

Clear and complete documentation is crucial for the usability of the Design System.

### A. Component Documentation (Meta Level)

Use `parameters.docs.description.component` in the story's `meta` to describe the component's purpose, use cases, and accessibility considerations.

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    docs: {
      description: {
        component: `
## Description

The Button component provides a clickable interface for actions in forms, dialogs, and other UI elements.

## When to Use

- For primary actions in forms or cards
- To trigger a function or navigation
- To confirm or cancel operations

## Accessibility

- Supports keyboard navigation
- Implements aria-disabled when deactivated
- Maintains adequate contrast in all states
        `
      }
    }
  }
};
```

### B. Individual Story Documentation

For specific stories that need more context, use `parameters.docs.description.story`. Include relevant code examples in Markdown format.

````typescript
export const WithIcon: Story = {
  args: {
    // ...
  },
  parameters: {
    docs: {
      description: {
        story: `
### Button with Icon

This variant combines text and an icon for better visual communication.
The icon should always reinforce the text's message, never contradict it.

```html
<bb-button variant="primary">
  <MoveIcon class="w-4 h-4 mr-2" />
  Move Item
</bb-button>
````

        `
      }
    }

}
};

````

### C. Custom Controls (`argTypes`)

Customize controls to improve user experience by adding descriptions, options, and custom labels, and configuring how properties are displayed in the `props` table.

```typescript
argTypes: {
  variant: {
    description: 'Button visual style',
    options: ['primary', 'secondary', 'danger', 'ghost'],
    control: {
      type: 'select',
      labels: {
        primary: '🔵 Primary',
        secondary: '⚪ Secondary',
        danger: '🔴 Danger',
        ghost: '👻 Ghost'
      }
    },
    table: {
      defaultValue: { summary: 'primary' },
      type: { summary: 'ButtonVariant' }
    }
  },
  onClick: {
    action: 'clicked',
    table: {
      disable: true // Hide from props table
    }
  }
}
````

---

## 5. Organization and Hierarchy

Maintain a consistent folder structure and naming convention to facilitate navigation and component discovery.

### A. Folder Structure

Organize stories logically, mirroring the Design System structure.

- **Design System/**
  - **Tokens/**: Design tokens, colors, typography
  - **Foundation/**: UI primitives, base layouts
- **Components/**
  - **Inputs/**: Form fields
  - **Navigation/**: Menus, tabs, breadcrumbs
  - **Feedback/**: Alerts, toasts, modals
  - **Data Display/**: Tables, cards, lists
- **Patterns/**
  - **Forms/**: Form patterns
  - **Layouts/**: Page layouts
  - **Authentication/**: Authentication patterns

### B. Story Naming

- Use `PascalCase` for story names (e.g., `Default`, `WithIcon`, `LoadingState`).
- Use descriptive names that indicate the story's purpose (e.g., `CompactLayout`, `ExpandedView`).
- Prefix state variations (e.g., `DisabledState`, `ErrorState`, `SuccessState`).

---

## 6. Version Control and Changes

Document the version history and relevant changes directly in the stories, using `parameters.badges`, `componentSubtitle`, and `changelog`.

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    badges: ['stable', 'accessible'],
    componentSubtitle: 'Version: 1.2.0',
    changelog: {
      versions: [
        {
          version: '1.2.0',
          changes: ['✨ Added icon support', '🐛 Fixed contrast in dark themes']
        },
        {
          version: '1.0.0',
          changes: ['🚀 Initial stable release']
        }
      ]
    }
  }
};
```

---

## 7. Accessibility Tests

Configure the `@storybook/addon-a11y` addon to perform automatic accessibility tests on stories, ensuring compliance.

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    a11y: {
      config: {
        rules: [{ id: 'color-contrast', enabled: true }]
      }
    }
  }
};
```

---

## 8. Recommended Addons

Leverage Storybook addons to extend its functionality and improve the development and documentation experience:

- **`@storybook/addon-a11y`**: Accessibility tests.
- **`@storybook/addon-actions`**: Event capture and display.
- **`@storybook/addon-controls`**: Interactive property (props) manipulation.
- **`@storybook/addon-docs`**: Automated MDX documentation generation.
- **`@storybook/addon-viewport`**: Responsive viewing in different viewports.
- **`@storybook/addon-measure`**: UI measurement and layout tools.
- **`@storybook/addon-designs`**: Linking designs from tools like Figma or Sketch.

---

## 9. High-Quality Story Checklist

Use this checklist to ensure your component stories meet quality standards:

- [ ] `Default` story implemented with sensible values.
- [ ] All visual variants documented.
- [ ] Special states (disabled, loading, error) presented.
- [ ] Playground with controls for all relevant properties.
- [ ] Component description with purpose and use cases.
- [ ] Useful code examples in the documentation.
- [ ] Accessibility tests configured.
- [ ] Events/interactions documented with actions.
- [ ] Responsive layout tested in multiple viewports.
- [ ] Design tokens and styles consistent with the Design System.
