# 📖 Padrões para Storybook

Este documento estabelece os padrões e práticas recomendadas para criar e documentar componentes usando o Storybook na biblioteca UI do ByteBank Pro.

## 1. Estrutura Base da Story

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ComponenteComponent, ComponentVariant } from './componente.component';

const meta: Meta<ComponenteComponent> = {
  title: 'Components/Componente',
  component: ComponenteComponent,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Uma descrição detalhada do propósito e uso do componente.'
      }
    }
  },
  argTypes: {
    variant: {
      description: 'Define o estilo visual do componente',
      options: ['primary', 'secondary', 'danger'],
      control: { type: 'select' }
    },
    size: {
      description: 'Define o tamanho do componente',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' }
    },
    disabled: {
      description: 'Desativa o componente',
      control: { type: 'boolean' }
    }
    // Outros controles...
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<ComponenteComponent>;
```

### Explicação dos Elementos Principais:

- `title`: Define a localização na hierarquia do Storybook, usando o formato `'Categoria/Componente'`
- `component`: Define o componente principal sendo documentado
- `parameters`: Configura o layout, documentação e outros parâmetros
- `argTypes`: Define quais inputs aparecem nos controles e como eles são apresentados
- `tags`: Use `['autodocs']` para gerar documentação automática

## 2. Stories Obrigatórias

Para cada componente, devem ser implementadas no mínimo as stories listadas abaixo.

### A. Default Story

```typescript
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md'
    // Outros valores padrão
  },
  render: (args) => ({
    props: args,
    template: `<bb-componente ${argsToTemplate(args)}>Conteúdo</bb-componente>`
  })
};
```

A story Default deve mostrar o componente em seu estado mais comum e básico, com valores padrão que representam o uso mais típico.

### B. Todas as Variantes

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

Esta story deve mostrar todas as variantes visuais do componente lado a lado para facilitar comparação.

### C. Estados Especiais

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

Crie stories específicas para cada estado especial que o componente pode ter (loading, disabled, error, etc).

### D. Playground

```typescript
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    loading: false,
    className: ''
    // Todos os props configuráveis
  }
};
```

O Playground deve expor todas as propriedades configuráveis do componente para experimentação interativa.

## 3. Padrões Avançados para Stories

### A. Interações Complexas

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
        story: 'Esta story demonstra a captura de eventos de clique.'
      }
    }
  }
};
```

Use `action()` para capturar e mostrar eventos emitidos pelo componente.

### B. Composição de Componentes

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

Mostre como o componente pode ser usado em conjunto com outros componentes da biblioteca.

### C. Responsive Design

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

Use o parâmetro `viewport` para mostrar como o componente se comporta em diferentes tamanhos de tela.

### D. Estados Dinâmicos

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

Demonstre interatividade e mudanças de estado dentro da própria story.

## 4. Documentação Efetiva no Storybook

### A. Documentação do Componente

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

Use a descrição do componente para explicar seu propósito, casos de uso e considerações de acessibilidade.

### B. Documentação das Stories Individuais

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

Documente cada story individualmente quando necessário explicar casos específicos ou fornecer exemplos de código.

### C. Controls Personalizados

```typescript
argTypes: {
  variant: {
    description: 'Estilo visual do botão',
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
      disable: true // Esconde da tabela de props
    }
  }
}
```

Personalize os controles para melhorar a experiência do usuário na documentação.

## 5. Organização e Hierarquia

### A. Estrutura de Pastas no Storybook

- **Design System/**
  - **Tokens/** - Design tokens, cores, tipografia
  - **Foundation/** - Primitivos de UI, layouts base
- **Components/**
  - **Inputs/** - Form inputs, campos de formulário
  - **Navigation/** - Menus, tabs, breadcrumbs
  - **Feedback/** - Alertas, toasts, modais
  - **Data Display/** - Tables, cards, lists
- **Patterns/**
  - **Forms/** - Padrões de formulário
  - **Layouts/** - Layouts de página
  - **Authentication/** - Padrões de autenticação

### B. Nomenclatura de Stories

- Use PascalCase para os nomes das stories: `Default`, `WithIcon`, `LoadingState`
- Use nomes descritivos que indicam o propósito ou característica: `CompactLayout`, `ExpandedView`
- Prefixe variações por estado ou tipo: `DisabledState`, `ErrorState`, `SuccessState`

## 6. Controle de Versão e Documentação de Mudanças

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
          changes: ['✨ Adicionado suporte para ícones', '🐛 Corrigido contraste em temas escuros']
        },
        {
          version: '1.0.0',
          changes: ['🚀 Versão inicial estável']
        }
      ]
    }
  }
};
```

Documente o histórico de versões e mudanças diretamente no Storybook quando relevante.

## 7. Testes de Acessibilidade no Storybook

```typescript
const meta: Meta<ComponenteComponent> = {
  // ...
  parameters: {
    a11y: {
      // Opções de acessibilidade
      config: {
        rules: [{ id: 'color-contrast', enabled: true }]
      }
    }
  }
};
```

Configure o addon de acessibilidade para testar automaticamente seus componentes.

## 8. Addons Recomendados

- **@storybook/addon-a11y** - Para testes de acessibilidade
- **@storybook/addon-actions** - Para capturar eventos
- **@storybook/addon-controls** - Para manipular props interativamente
- **@storybook/addon-docs** - Para documentação MDX automatizada
- **@storybook/addon-viewport** - Para visualização responsiva
- **@storybook/addon-measure** - Para medições de UI e layouts
- **@storybook/addon-designs** - Para vincular designs do Figma/Sketch

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
