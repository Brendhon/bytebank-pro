import type { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from './footer.component';

const meta: Meta<FooterComponent> = {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Componente de rodapé para a aplicação ByteBank Pro. Exibe informações de contato, logo do ByteBank e links de navegação.'
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<FooterComponent>;

export const Default: Story = {
  render: () => ({
    template: `<bb-footer></bb-footer>`
  })
};

export const WithContainer: Story = {
  render: () => ({
    template: `
      <div style="min-height: 100vh; display: flex; flex-direction: column;">
        <div style="flex: 1; padding: 2rem; background-color: #f9fafb;">
          <h1 style="margin: 0 0 1rem 0; color: #111827;">Conteúdo da Página</h1>
          <p style="margin: 0; color: #6b7280;">
            Este é um exemplo de como o footer aparece no final de uma página.
            O footer mantém sua posição na parte inferior e exibe todas as informações necessárias.
          </p>
        </div>
        <bb-footer></bb-footer>
      </div>
    `
  })
};

export const ResponsiveDemo: Story = {
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px'
          }
        }
      }
    },
    docs: {
      description: {
        story:
          'Demonstra como o footer se adapta a diferentes tamanhos de tela. Em dispositivos móveis, as seções ficam empilhadas verticalmente.'
      }
    }
  },
  render: () => ({
    template: `
      <div style="padding: 1rem 0;">
        <p style="text-align: center; margin-bottom: 2rem; color: #6b7280;">
          Redimensione a viewport para ver o comportamento responsivo
        </p>
        <bb-footer></bb-footer>
      </div>
    `
  })
};

export const AccessibilityFocus: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstra os recursos de acessibilidade do footer, incluindo navegação por teclado e estrutura semântica.'
      }
    }
  },
  render: () => ({
    template: `
      <div>
        <p style="margin-bottom: 1rem; padding: 1rem; background-color: #f3f4f6; border-radius: 0.5rem; color: #374151;">
          <strong>Teste de Acessibilidade:</strong><br>
          Use a tecla Tab para navegar pelos links do footer e verifique o foco visual.
          O footer possui estrutura semântica adequada com elementos nav, ul, li e landmarks apropriados.
        </p>
        <bb-footer></bb-footer>
      </div>
    `
  })
};
