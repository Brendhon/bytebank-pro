# 📖 Padrões para Storybook

Este documento define padrões e práticas recomendadas para criar e documentar componentes usando o Storybook no ByteBank Pro.

## 1. Estrutura Base da Story

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ComponenteComponent } from './componente.component';

const meta: Meta<ComponenteComponent> = {
  title: 'Components/Componente',
  component: ComponenteComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A detailed description of the component purpose and usage.'
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
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ComponenteComponent>;
```

**Principais elementos:**

- `title`: Localização na hierarquia do Storybook, formato `'Categoria/Componente'`
- `component`: Componente principal documentado
- `parameters`: Layout, documentação e outros parâmetros
- `argTypes`: Inputs exibidos nos controles e sua apresentação
- `tags`: Use `['autodocs']` para documentação automática

## 2. Stories Obrigatórias

Implemente, no mínimo, as stories abaixo para cada componente.

### Default

```typescript
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md'
    // Other default values
  },
  render: (args) => ({
    props: args,
    template: `<bb-componente ${argsToTemplate(args)}>Conteúdo</bb-componente>`
  })
};
```

Exibe o componente em seu estado mais comum, com valores padrão típicos.

### Todas as Variantes

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

Mostra todas as variantes visuais do componente lado a lado.

### Estados Especiais

```typescript
export const LoadingState: Story = {
  args: {
    loading: true,
    loadingText: 'Carregando...'
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
    errorMessage: 'Este campo é obrigatório'
  }
};
```

Inclua stories para cada estado especial relevante (loading, disabled, error, etc).

### Playground

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

Permite experimentação interativa com todas as propriedades configuráveis.

## 3. Padrões Avançados

### Interações Complexas

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

Use `action()` para capturar e exibir eventos emitidos.

### Composição de Componentes

```typescript
export const ComposedComponents: Story = {
  render: () => ({
    template: `
      <bb-card>
        <div slot="header">
          <bb-heading>Card com Componentes Compostos</bb-heading>
        </div>
        <bb-input placeholder="Digite algo"></bb-input>
        <div slot="footer">
          <bb-button variant="primary">Salvar</bb-button>
          <bb-button variant="secondary">Cancelar</bb-button>
        </div>
      </bb-card>
    `
  })
};
```

Demonstra o uso do componente junto a outros da biblioteca.

### Responsive Design

```typescript
export const ResponsiveLayout: Story = {
  render: () => ({
    template: `
      <div class="w-full">
        <bb-componente class="w-full">Componente Responsivo</bb-componente>
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

Mostra o comportamento do componente em diferentes tamanhos de tela.

### Estados Dinâmicos

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
          {{ isOpen ? 'Fechar' : 'Abrir' }}
        </bb-button>
        <div [class.hidden]="!isOpen" class="mt-4 p-4 border rounded">
          Conteúdo visível quando aberto
        </div>
      </div>
    `
  })
};
```

Demonstra interatividade e mudanças de estado.

## 4. Documentação no Storybook

### Documentação do Componente

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    docs: {
      description: {
        component: `
## Descrição

O componente Button fornece uma interface clicável para ações em formulários, diálogos e outros elementos da UI.

## Quando Usar

- Para ações primárias em formulários ou cards
- Para acionar uma função ou navegação
- Para confirmar ou cancelar operações

## Acessibilidade

- Suporta navegação por teclado
- Implementa aria-disabled quando desativado
- Mantém contraste adequado em todos os estados
        `
      }
    }
  }
};
```

Explique propósito, casos de uso e acessibilidade do componente.

### Documentação das Stories Individuais

```typescript
export const WithIcon: Story = {
  args: {
    // ...
  },
  parameters: {
    docs: {
      description: {
        story: `
### Botão com Ícone

Esta variante combina texto e ícone para melhor comunicação visual.
O ícone deve sempre reforçar a mensagem do texto, nunca contradizê-la.

\`\`\`html
<bb-button variant="primary">
  <MoveIcon class="w-4 h-4 mr-2" />
  Move Item
</bb-button>
\`\`\`
        `
      }
    }
  }
};
```

Documente stories específicas quando necessário.

### Controls Personalizados

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
```

Personalize controles para melhorar a experiência do usuário.

## 5. Organização e Hierarquia

### Estrutura de Pastas

- **Design System/**
  - **Tokens/**: Design tokens, cores, tipografia
  - **Foundation/**: Primitivos de UI, layouts base
- **Components/**
  - **Inputs/**: Campos de formulário
  - **Navigation/**: Menus, tabs, breadcrumbs
  - **Feedback/**: Alertas, toasts, modais
  - **Data Display/**: Tables, cards, lists
- **Patterns/**
  - **Forms/**: Padrões de formulário
  - **Layouts/**: Layouts de página
  - **Authentication/**: Padrões de autenticação

### Nomenclatura de Stories

- Use PascalCase: `Default`, `WithIcon`, `LoadingState`
- Nomes descritivos: `CompactLayout`, `ExpandedView`
- Prefixe variações: `DisabledState`, `ErrorState`, `SuccessState`

## 6. Controle de Versão e Mudanças

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    badges: ['stable', 'accessible'],
    componentSubtitle: 'Versão: 1.2.0',
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

Documente histórico de versões e mudanças relevantes.

## 7. Testes de Acessibilidade

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

Configure o addon de acessibilidade para testes automáticos.

## 8. Addons Recomendados

- **@storybook/addon-a11y**: Testes de acessibilidade
- **@storybook/addon-actions**: Captura de eventos
- **@storybook/addon-controls**: Manipulação interativa de props
- **@storybook/addon-docs**: Documentação MDX automatizada
- **@storybook/addon-viewport**: Visualização responsiva
- **@storybook/addon-measure**: Medição de UI e layouts
- **@storybook/addon-designs**: Vinculação de designs do Figma/Sketch

## 9. Checklist para Stories de Alta Qualidade

- [ ] Story Default implementada com valores sensatos
- [ ] Todas as variantes visuais documentadas
- [ ] Estados especiais (disabled, loading, error) apresentados
- [ ] Playground com controles para todas as props relevantes
- [ ] Descrição do componente com propósito e casos de uso
- [ ] Exemplos de código úteis na documentação
- [ ] Testes de acessibilidade configurados
- [ ] Eventos/interações documentados com actions
- [ ] Layout responsivo testado em múltiplos viewports
- [ ] Design tokens e estilos consistentes com o Design System

## 📚 Recursos

- [Storybook para Angular](https://storybook.js.org/docs/angular)
- [Escrevendo Stories](https://storybook.js.org/docs/angular/writing-stories/introduction)
- [Controls](https://storybook.js.org/docs/angular/essentials/controls)
- [Documentação MDX](https://storybook.js.org/docs/angular/writing-docs/mdx)
