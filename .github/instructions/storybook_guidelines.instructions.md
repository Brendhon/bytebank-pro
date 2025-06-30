---
applyTo: '**/*.component.stories.ts'
---

# 📖 Padrões para Storybook

Este documento define os padrões e as práticas recomendadas para criar e documentar componentes utilizando o Storybook no ByteBank Pro.

---

## 1\. Estrutura Base da Story

A estrutura base para um arquivo de story deve incluir `Meta` e `StoryObj`, definindo o componente, sua categorização (`title`), parâmetros globais, tipos de argumentos (`argTypes`) e tags para documentação automática.

```typescript
import type { Meta, StoryObj } from '@storybook/angular';
import { argsToTemplate } from '@storybook/angular';
import { ComponenteComponent } from './componente.component';

const meta: Meta<ComponenteComponent> = {
  title: 'Components/NomeDaPastaQueOComponenteEsta/Componente', // Categoria na hierarquia do Storybook
  component: ComponenteComponent, // Componente principal documentado
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A detailed description of the component purpose and usage.' // Descrição do componente na documentação
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
  tags: ['autodocs'] // Habilita documentação automática
};

export default meta;
type Story = StoryObj<ComponenteComponent>;
```

---

## 2\. Stories Essenciais (Obrigatórias)

Para cada componente, as seguintes stories são mandatórias para garantir uma documentação e teste abrangentes:

### A. Default

Exibe o componente em seu estado mais comum, com valores padrão típicos, representando seu uso fundamental.

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

### B. Todas as Variantes

Mostra todas as variações visuais do componente lado a lado, facilitando a visualização e comparação.

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

### C. Estados Especiais

Inclua stories para cada estado especial relevante que o componente pode assumir (ex: carregamento, desabilitado, erro).

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

### D. Playground

Permite a experimentação interativa com todas as propriedades configuráveis do componente através dos controles do Storybook.

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

## 3\. Padrões Avançados de Stories

Estas stories demonstram comportamentos mais complexos ou cenários de uso específicos.

### A. Interações Complexas

Use `action()` para capturar e exibir eventos emitidos pelo componente, facilitando a depuração e demonstração de interatividade.

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

### B. Composição de Componentes

Demonstra como o componente pode ser utilizado em conjunto com outros componentes da biblioteca para formar estruturas mais complexas.

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

### C. Responsive Design

Mostra o comportamento do componente em diferentes tamanhos de tela, utilizando o addon `viewport` do Storybook.

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

### D. Estados Dinâmicos

Demonstra a interatividade e as mudanças de estado do componente ao longo do tempo.

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

---

## 4\. Documentação no Storybook

Uma documentação clara e completa é crucial para a usabilidade do Design System.

### A. Documentação do Componente (Meta Level)

Utilize `parameters.docs.description.component` na `meta` da story para descrever o propósito, casos de uso e considerações de acessibilidade do componente.

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

### B. Documentação das Stories Individuais

Para stories específicas que necessitam de mais contexto, use `parameters.docs.description.story`. Inclua exemplos de código relevantes no formato Markdown.

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

### C. Controles Personalizados (`argTypes`)

Personalize os controles para melhorar a experiência do usuário, adicionando descrições, opções e labels customizados, e configurando como as propriedades são exibidas na tabela de `props`.

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

---

## 5\. Organização e Hierarquia

Mantenha uma estrutura de pastas e nomenclatura consistentes para facilitar a navegação e a descoberta dos componentes.

### A. Estrutura de Pastas

Organize as stories de forma lógica, espelhando a estrutura do Design System.

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

### B. Nomenclatura de Stories

- Use `PascalCase` para os nomes das stories (ex: `Default`, `WithIcon`, `LoadingState`).
- Utilize nomes descritivos que indiquem o propósito da story (ex: `CompactLayout`, `ExpandedView`).
- Prefixe variações de estado (ex: `DisabledState`, `ErrorState`, `SuccessState`).

---

## 6\. Controle de Versão e Mudanças

Documente o histórico de versões e as mudanças relevantes diretamente nas stories, utilizando `parameters.badges`, `componentSubtitle` e `changelog`.

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

---

## 7\. Testes de Acessibilidade

Configure o addon `@storybook/addon-a11y` para realizar testes de acessibilidade automáticos nas stories, garantindo conformidade.

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

## 8\. Addons Recomendados

Aproveite os addons do Storybook para estender sua funcionalidade e melhorar a experiência de desenvolvimento e documentação:

- **`@storybook/addon-a11y`**: Testes de acessibilidade.
- **`@storybook/addon-actions`**: Captura e exibição de eventos.
- **`@storybook/addon-controls`**: Manipulação interativa de propriedades (props).
- **`@storybook/addon-docs`**: Geração de documentação MDX automatizada.
- **`@storybook/addon-viewport`**: Visualização responsiva em diferentes viewports.
- **`@storybook/addon-measure`**: Ferramentas para medição de UI e layouts.
- **`@storybook/addon-designs`**: Vinculação de designs de ferramentas como Figma ou Sketch.

---

## 9\. Checklist para Stories de Alta Qualidade

Utilize este checklist para garantir que as stories de seus componentes atendem aos padrões de qualidade:

- [ ] Story `Default` implementada com valores sensatos.
- [ ] Todas as variantes visuais documentadas.
- [ ] Estados especiais (disabled, loading, error) apresentados.
- [ ] Playground com controles para todas as propriedades relevantes.
- [ ] Descrição do componente com propósito e casos de uso.
- [ ] Exemplos de código úteis na documentação.
- [ ] Testes de acessibilidade configurados.
- [ ] Eventos/interações documentados com actions.
- [ ] Layout responsivo testado em múltiplos viewports.
- [ ] Design tokens e estilos consistentes com o Design System.
