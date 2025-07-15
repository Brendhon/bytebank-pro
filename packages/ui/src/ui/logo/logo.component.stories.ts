import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { LogoComponent } from './logo.component';
import { sizes } from '@bytebank-pro/types';

const meta: Meta<LogoComponent> = {
  title: 'Components/UI/Logo',
  component: LogoComponent,
  parameters: {
    layout: 'centered',
    badges: ['stable', 'accessible']
  },
  argTypes: {
    variant: {
      options: ['full', 'icon'],
      control: { type: 'radio' }
    },
    size: {
      options: sizes,
      control: { type: 'radio' }
    },
    className: {
      control: { type: 'text' }
    },
    ariaLabel: {
      control: { type: 'text' }
    },
    isDecorative: {
      control: { type: 'boolean' }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<LogoComponent>;

export const Default: Story = {
  args: {
    variant: 'full',
    size: 'md',
    className: '',
    isDecorative: false
  }
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem;">
        <bb-logo variant="full" size="md"></bb-logo>
        <bb-logo variant="icon" size="md"></bb-logo>
      </div>
    `
  })
};

export const AllSizes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 2rem;">
        <bb-logo variant="full" size="sm"></bb-logo>
        <bb-logo variant="full" size="md"></bb-logo>
        <bb-logo variant="full" size="lg"></bb-logo>
        <bb-logo variant="icon" size="sm"></bb-logo>
        <bb-logo variant="icon" size="md"></bb-logo>
        <bb-logo variant="icon" size="lg"></bb-logo>
      </div>
    `
  })
};

export const AccessibilityStates: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <bb-logo variant="full" size="md" ariaLabel="Logo ByteBank Pro"></bb-logo>
        <bb-logo variant="icon" size="sm" [isDecorative]="true"></bb-logo>
        <bb-logo variant="full" size="md"></bb-logo>
      </div>
    `
  })
};

export const CustomStyling: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <bb-logo variant="full" size="md" className="text-green-500"></bb-logo>
        <bb-logo variant="full" size="lg" className="drop-shadow-lg"></bb-logo>
        <bb-logo variant="full" size="md" className="w-24 md:w-32 lg:w-40"></bb-logo>
      </div>
    `
  })
};

export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div>
        <div class="md:hidden">
          <bb-logo variant="icon" size="sm"></bb-logo>
        </div>
        <div class="hidden md:block">
          <bb-logo variant="full" size="md"></bb-logo>
        </div>
      </div>
    `
  })
};

export const Playground: Story = {
  args: {
    variant: 'full',
    size: 'md',
    className: '',
    ariaLabel: undefined,
    isDecorative: false
  },
  render: (args) => ({
    props: args,
    template: `<bb-logo ${argsToTemplate(args)}></bb-logo>`
  })
};

export const InContext: Story = {
  render: () => ({
    template: `
      <div>
        <bb-logo variant="full" size="lg"></bb-logo>
        <bb-logo variant="full" size="md"></bb-logo>
        <bb-logo variant="full" size="sm"></bb-logo>
      </div>
    `
  })
};

export const WithColors: Story = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h3 class="text-lg font-semibold mb-2">Logo com Cores</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <bb-logo variant="full" size="md" className="text-red-500"></bb-logo>
          <bb-logo variant="full" size="md" className="text-blue-600"></bb-logo>
          <bb-logo variant="full" size="md" className="text-green-500"></bb-logo>
          <bb-logo variant="full" size="md" className="text-purple-600"></bb-logo>
        </div>
        <div class="flex gap-4 items-center flex-wrap">
          <bb-logo variant="icon" size="md" className="text-red-500"></bb-logo>
          <bb-logo variant="icon" size="md" className="text-blue-600"></bb-logo>
          <bb-logo variant="icon" size="md" className="text-green-500"></bb-logo>
          <bb-logo variant="icon" size="md" className="text-purple-600"></bb-logo>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra como aplicar cores ao logo usando classes CSS. O SVG agora herda as cores corretamente.'
      }
    }
  }
};
