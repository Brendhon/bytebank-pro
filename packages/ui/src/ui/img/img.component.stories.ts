import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ImgComponent } from './img.component';
import { sizes } from '@bytebank-pro/types';

const meta: Meta<ImgComponent> = {
  title: 'Components/UI/Img',
  component: ImgComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`bb-img\` component is a flexible image component that can handle both internal assets through the shared assets system and external URLs. It supports SVG and standard image formats with loading states, error handling, and accessibility features.

## Features
- Support for internal assets via \`getAssetContent\`
- External URL support
- SVG and standard image format handling
- Loading and error states
- Configurable sizes
- Accessibility compliant
- Custom CSS classes support
        `
      }
    }
  },
  argTypes: {
    src: {
      control: 'text',
      description: 'The source path or URL of the image',
      table: {
        type: { summary: 'string' }
      }
    },
    alt: {
      control: 'text',
      description: 'Alternative text for the image',
      table: {
        type: { summary: 'string' }
      }
    },
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the image',
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'ImageSize' }
      }
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' }
      }
    },
    isDecorative: {
      control: 'boolean',
      description: 'Whether the image is decorative (hidden from screen readers)',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    },
    loadingText: {
      control: 'text',
      description: 'Custom loading text for screen readers',
      table: {
        defaultValue: { summary: 'Carregando imagem...' },
        type: { summary: 'string' }
      }
    },
    errorText: {
      control: 'text',
      description: 'Custom error text for screen readers',
      table: {
        defaultValue: { summary: 'Erro ao carregar imagem' },
        type: { summary: 'string' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ImgComponent>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'A beautiful placeholder image',
    size: 'md'
  },
  render: (args) => ({
    props: args,
    template: `<bb-img ${argsToTemplate(args)}></bb-img>`
  })
};

export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">All Sizes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <bb-img src="https://picsum.photos/100/100" alt="Extra small" size="xs"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Small" size="sm"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Medium" size="md"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Large" size="lg"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Extra large" size="xl"></bb-img>
          </div>
        </div>
        <div>
          <h3 class="text-lg font-semibold mb-2">With Custom Classes</h3>
          <div class="flex gap-4 items-center flex-wrap">
            <bb-img src="https://picsum.photos/100/100" alt="Rounded" size="md" className="rounded-full"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Shadow" size="md" className="shadow-lg"></bb-img>
            <bb-img src="https://picsum.photos/100/100" alt="Border" size="md" className="border-4 border-blue-500"></bb-img>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'padded'
  }
};

export const Small: Story = {
  args: {
    src: 'https://picsum.photos/100/100',
    alt: 'Small image',
    size: 'sm'
  }
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/400/400',
    alt: 'Large image',
    size: 'lg'
  }
};

export const WithCustomClass: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Image with custom styling',
    size: 'md',
    className: 'rounded-full shadow-lg'
  }
};

export const Decorative: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    size: 'md',
    isDecorative: true
  },
  parameters: {
    docs: {
      description: {
        story: "Decorative images are hidden from screen readers and don't require alt text."
      }
    }
  }
};

export const FullWidth: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Full width image',
    size: 'full'
  },
  parameters: {
    layout: 'padded'
  }
};

export const ErrorState: Story = {
  args: {
    src: 'https://invalid-url-that-will-fail.com/image.jpg',
    alt: 'This image will fail to load',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'When an image fails to load, an error state with an icon is displayed.'
      }
    }
  }
};

export const LoadingState: Story = {
  args: {
    src: 'https://httpbin.org/delay/3',
    alt: 'This image will take time to load',
    size: 'md'
  },
  parameters: {
    docs: {
      description: {
        story: 'While loading, a spinner icon is displayed.'
      }
    }
  }
};

export const SizeComparison: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <bb-img src="https://picsum.photos/100/100" alt="Extra small" size="xs"></bb-img>
        <bb-img src="https://picsum.photos/100/100" alt="Small" size="sm"></bb-img>
        <bb-img src="https://picsum.photos/100/100" alt="Medium" size="md"></bb-img>
        <bb-img src="https://picsum.photos/100/100" alt="Large" size="lg"></bb-img>
        <bb-img src="https://picsum.photos/100/100" alt="Extra large" size="xl"></bb-img>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all available sizes: xs, sm, md, lg, xl.'
      }
    }
  }
};

export const Playground: Story = {
  args: {
    src: 'https://picsum.photos/200/200',
    alt: 'Interactive playground image',
    size: 'md',
    className: '',
    isDecorative: false,
    loadingText: 'Carregando imagem...',
    errorText: 'Erro ao carregar imagem'
  },
  render: (args) => ({
    props: args,
    template: `<bb-img ${argsToTemplate(args)}></bb-img>`
  })
};
