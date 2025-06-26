import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { LogoComponent } from './logo.component';

const meta: Meta<LogoComponent> = {
  title: 'Components/Logo',
  component: LogoComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Descrição

O componente Logo fornece uma representação visual da marca ByteBank Pro, oferecendo duas variantes (completo e ícone) em diferentes tamanhos, com suporte completo a acessibilidade.

## Quando Usar

- No cabeçalho da aplicação para identificação da marca
- Em páginas de login e autenticação
- Em emails e documentos oficiais
- Como favicon ou ícone da aplicação

## Acessibilidade

- Implementa atributos ARIA apropriados
- Suporta texto alternativo descritivo personalizado
- Permite marcação como decorativo quando necessário
- Mantém contraste adequado em todos os tamanhos
- Role "img" explícito para tecnologias assistivas

## Variantes

- **Full**: Exibe o logo completo da ByteBank Pro
- **Icon**: Exibe apenas o ícone da marca

## Tamanhos

- **sm**: 64px de largura (w-16)
- **md**: 128px de largura (w-32) - padrão
- **lg**: 168px de largura (w-42)
        `
      }
    },
    badges: ['stable', 'accessible'],
    componentSubtitle: 'Versão: 1.0.0'
  },
  argTypes: {
    variant: {
      description: 'Visual variant of the logo',
      options: ['full', 'icon'],
      control: {
        type: 'radio',
        labels: {
          full: '🏢 Full Logo',
          icon: '🔷 Icon Only'
        }
      },
      table: {
        defaultValue: { summary: 'full' },
        type: { summary: 'LogoVariant' }
      }
    },
    size: {
      description: 'Size of the logo',
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'radio',
        labels: {
          sm: '📱 Small (64px)',
          md: '💻 Medium (128px)',
          lg: '🖥️ Large (168px)'
        }
      },
      table: {
        defaultValue: { summary: 'md' },
        type: { summary: 'LogoSize' }
      }
    },
    className: {
      description: 'Additional CSS classes to apply',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: "''" },
        type: { summary: 'string' }
      }
    },
    ariaLabel: {
      description: 'Custom aria-label for accessibility',
      control: { type: 'text' },
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'string | undefined' }
      }
    },
    isDecorative: {
      description: 'Mark logo as decorative (hidden from screen readers)',
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' }
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<LogoComponent>;

// Default story showing the most common usage
export const Default: Story = {
  args: {
    variant: 'full',
    size: 'md',
    className: '',
    isDecorative: false
  },
  parameters: {
    docs: {
      description: {
        story: `
### Logo Padrão

Esta é a apresentação mais comum do logo ByteBank Pro, usando a variante completa em tamanho médio.
Ideal para cabeçalhos de aplicação e identificação principal da marca.
        `
      }
    }
  }
};

// Show all variants side by side
export const AllVariants: Story = {
  render: () => ({
    template: `
      <div class="flex items-center gap-8 p-6">
        <div class="text-center">
          <bb-logo variant="full" size="md"></bb-logo>
          <p class="mt-2 text-sm text-gray-600">Full Logo</p>
        </div>
        <div class="text-center">
          <bb-logo variant="icon" size="md"></bb-logo>
          <p class="mt-2 text-sm text-gray-600">Icon Only</p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Todas as Variantes

Comparação visual entre as duas variantes disponíveis do logo:
- **Full**: Logo completo com texto
- **Icon**: Apenas o ícone da marca
        `
      }
    }
  }
};

// Show all sizes for each variant
export const AllSizes: Story = {
  render: () => ({
    template: `
      <div class="space-y-8 p-6">
        <div>
          <h3 class="text-lg font-semibold mb-4">Full Logo - Tamanhos</h3>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <bb-logo variant="full" size="sm"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Small (64px)</p>
            </div>
            <div class="text-center">
              <bb-logo variant="full" size="md"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Medium (128px)</p>
            </div>
            <div class="text-center">
              <bb-logo variant="full" size="lg"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Large (168px)</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-4">Icon - Tamanhos</h3>
          <div class="flex items-center gap-6">
            <div class="text-center">
              <bb-logo variant="icon" size="sm"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Small (64px)</p>
            </div>
            <div class="text-center">
              <bb-logo variant="icon" size="md"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Medium (128px)</p>
            </div>
            <div class="text-center">
              <bb-logo variant="icon" size="lg"></bb-logo>
              <p class="mt-2 text-xs text-gray-600">Large (168px)</p>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Todos os Tamanhos

Demonstração de todos os tamanhos disponíveis para cada variante do logo.
Os tamanhos são otimizados para diferentes contextos de uso:

- **Small (64px)**: Para favicons, menus compactos
- **Medium (128px)**: Para cabeçalhos padrão, uso geral
- **Large (168px)**: Para páginas de destaque, splash screens
        `
      }
    }
  }
};

// Accessibility states
export const AccessibilityStates: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 p-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo com Aria-Label Customizado</h3>
          <bb-logo 
            variant="full" 
            size="md" 
            ariaLabel="ByteBank Pro - Sua plataforma financeira completa">
          </bb-logo>
          <p class="mt-2 text-sm text-gray-600">
            aria-label: "ByteBank Pro - Sua plataforma financeira completa"
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo Decorativo (Oculto para Leitores de Tela)</h3>
          <div class="flex items-center gap-4">
            <bb-logo 
              variant="icon" 
              size="sm" 
              [isDecorative]="true">
            </bb-logo>
            <span class="text-gray-800">ByteBank Pro Dashboard</span>
          </div>
          <p class="mt-2 text-sm text-gray-600">
            aria-hidden="true" - usado quando o logo é apenas decorativo
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo Padrão com Alt Text Descritivo</h3>
          <bb-logo variant="full" size="md"></bb-logo>
          <p class="mt-2 text-sm text-gray-600">
            alt: "ByteBank Pro - Logo da plataforma de gestão financeira"
          </p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Estados de Acessibilidade

Demonstração das diferentes configurações de acessibilidade:

1. **Aria-Label Customizado**: Para contextos específicos onde uma descrição mais detalhada é necessária
2. **Logo Decorativo**: Quando o logo é puramente visual e há texto adjacente que já identifica a marca
3. **Alt Text Padrão**: Descrição automática baseada na variante do logo

Essas opções garantem que o componente seja acessível em todos os contextos de uso.
        `
      }
    }
  }
};

// Custom styling examples
export const CustomStyling: Story = {
  render: () => ({
    template: `
      <div class="space-y-6 p-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo com Classes Customizadas</h3>
          <bb-logo 
            variant="full" 
            size="md" 
            className="opacity-75 hover:opacity-100 transition-opacity duration-200">
          </bb-logo>
          <p class="mt-2 text-sm text-gray-600">
            className: "opacity-75 hover:opacity-100 transition-opacity duration-200"
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo com Efeito de Sombra</h3>
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg">
            <bb-logo 
              variant="full" 
              size="lg" 
              className="drop-shadow-lg filter">
            </bb-logo>
          </div>
          <p class="mt-2 text-sm text-gray-600">
            Logo com drop-shadow em fundo colorido
          </p>
        </div>
        
        <div>
          <h3 class="text-lg font-semibold mb-2">Logo Responsivo</h3>
          <bb-logo 
            variant="full" 
            size="md" 
            className="w-24 md:w-32 lg:w-40">
          </bb-logo>
          <p class="mt-2 text-sm text-gray-600">
            className: "w-24 md:w-32 lg:w-40" - tamanho responsivo
          </p>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Estilização Customizada

Exemplos de como aplicar estilos customizados ao logo:

- **Efeitos de Hover**: Transições suaves para interatividade
- **Sombras e Filtros**: Para destacar em fundos coloridos
- **Classes Responsivas**: Adaptar tamanho conforme breakpoints

O componente aceita qualquer classe CSS através da prop \`className\`.
        `
      }
    }
  }
};

// Responsive design showcase
export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div class="w-full max-w-4xl mx-auto p-4">
        <div class="bg-white shadow-lg rounded-lg overflow-hidden">
          <!-- Mobile Header -->
          <div class="md:hidden bg-gray-50 p-4 border-b">
            <div class="flex items-center justify-between">
              <bb-logo variant="icon" size="sm"></bb-logo>
              <button class="p-2 rounded-md hover:bg-gray-200">
                <span class="sr-only">Menu</span>
                ☰
              </button>
            </div>
          </div>
          
          <!-- Desktop Header -->
          <div class="hidden md:block bg-gray-50 p-6 border-b">
            <div class="flex items-center justify-between">
              <bb-logo variant="full" size="md"></bb-logo>
              <nav class="space-x-6">
                <a href="#" class="text-gray-700 hover:text-gray-900">Dashboard</a>
                <a href="#" class="text-gray-700 hover:text-gray-900">Transações</a>
                <a href="#" class="text-gray-700 hover:text-gray-900">Configurações</a>
              </nav>
            </div>
          </div>
          
          <!-- Content -->
          <div class="p-6">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Layout Responsivo</h1>
            <p class="text-gray-600">
              Este exemplo demonstra como o logo se adapta em diferentes tamanhos de tela:
            </p>
            <ul class="mt-4 space-y-2 text-sm text-gray-600">
              <li>• <strong>Mobile:</strong> Ícone compacto no cabeçalho</li>
              <li>• <strong>Desktop:</strong> Logo completo com navegação</li>
            </ul>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: `
### Layout Responsivo

Demonstração de como usar diferentes variantes do logo em layouts responsivos:

- **Mobile**: Usa a variante "icon" para economizar espaço
- **Desktop**: Usa a variante "full" para melhor identificação da marca

Teste redimensionando o viewport ou usando os controles de dispositivo do Storybook.
        `
      }
    }
  }
};

// Playground for experimentation
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
  }),
  parameters: {
    docs: {
      description: {
        story: `
### Playground

Use os controles abaixo para experimentar diferentes configurações do componente Logo.
Ideal para testar combinações e ver o resultado em tempo real.
        `
      }
    }
  }
};

// Examples in context
export const InContext: Story = {
  render: () => ({
    template: `
      <div class="space-y-8 p-6">
        <!-- Login Page Context -->
        <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
          <div class="text-center mb-8">
            <bb-logo variant="full" size="lg" className="mx-auto"></bb-logo>
            <h1 class="mt-4 text-2xl font-bold text-gray-900">Bem-vindo de volta</h1>
            <p class="mt-2 text-gray-600">Faça login em sua conta</p>
          </div>
          <div class="space-y-4">
            <input type="email" placeholder="Email" class="w-full p-3 border rounded-md">
            <input type="password" placeholder="Senha" class="w-full p-3 border rounded-md">
            <button class="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Entrar
            </button>
          </div>
        </div>
        
        <!-- App Header Context -->
        <div class="bg-white shadow-sm border-b">
          <div class="max-w-6xl mx-auto px-4 py-3">
            <div class="flex items-center justify-between">
              <bb-logo variant="full" size="md"></bb-logo>
              <div class="flex items-center space-x-4">
                <span class="text-gray-700">João Silva</span>
                <div class="w-8 h-8 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Footer Context -->
        <div class="bg-gray-900 text-white p-8">
          <div class="max-w-6xl mx-auto">
            <div class="flex items-center justify-between">
              <bb-logo 
                variant="full" 
                size="sm" 
                className="opacity-80">
              </bb-logo>
              <p class="text-sm text-gray-400">
                © 2025 ByteBank Pro. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
### Exemplos em Contexto

Demonstração do logo em diferentes contextos reais de uso:

1. **Página de Login**: Logo grande e centralizado para impacto visual
2. **Cabeçalho da Aplicação**: Logo médio alinhado à esquerda
3. **Rodapé**: Logo pequeno com opacidade reduzida

Cada contexto usa o tamanho e posicionamento mais apropriados.
        `
      }
    }
  }
};
