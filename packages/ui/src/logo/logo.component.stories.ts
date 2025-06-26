import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  title: 'Components/Logo',
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
      options: ['sm', 'md', 'lg'],
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
        <bb-logo variant="full" size="md" className="opacity-75"></bb-logo>
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
