# @bytebank-pro/ui

🎨 **Biblioteca de componentes Angular para o ByteBank Pro**

Uma biblioteca moderna de componentes Angular 20+, otimizada para uso com TailwindCSS e design tokens compartilhados.

---

## 🎯 Objetivo

Fornecer componentes reutilizáveis e consistentes para:

- **Padronização**: UI/UX consistente em todos os microfrontends
- **Produtividade**: Componentes prontos para uso
- **Manutenibilidade**: Centralização das mudanças de design
- **Acessibilidade**: Componentes acessíveis por padrão

---

## 📦 Estrutura

```
packages/ui/
├── src/                  # Componentes
│   └── button/           # Exemplo: Button component
│       ├── button.component.ts
│       ├── button.component.html
│       ├── button.component.spec.ts
│       └── button.component.stories.ts
├── styles/               # Estilos globais
├── .storybook/           # Configuração do Storybook
└── public-api.ts         # Exportações principais
```

---

## 🚀 Instalação

```bash
npm install @bytebank-pro/ui
```

---

## 📝 Como Usar

### Importação de Componentes (Standalone)

A biblioteca utiliza **standalone components** do Angular, permitindo importações granulares:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@bytebank-pro/ui/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `<bb-button variant="primary" (buttonClick)="handleClick()">Clique aqui</bb-button>`
})
export class ExampleComponent {
  handleClick() {
    console.log('Botão clicado!');
  }
}
```

### Importação em Módulos (Legacy)

```typescript
import { NgModule } from '@angular/core';
import { ButtonComponent } from '@bytebank-pro/ui/button';

@NgModule({
  imports: [ButtonComponent],
  exports: [ButtonComponent]
})
export class SharedModule {}
```

---

## 🧩 Componentes Disponíveis

### Button (`bb-button`)

Componente de botão versátil com múltiplas variações visuais.

**Uso Básico:**

```html
<bb-button variant="primary" size="md" (buttonClick)="handleClick()">Clique aqui</bb-button>
```

---

## 🎨 Integração com Design System

A biblioteca integra com:

- **@bytebank-pro/shared-design-tokens**: Cores e tipografia
- **TailwindCSS**: Utilitários de estilo

**Configuração do TailwindCSS:**

Inclua a biblioteca no seu `tailwind.config.js`:

```javascript
import { tailwindTokens } from '@bytebank-pro/shared-design-tokens/tailwind.tokens';

export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: tailwindTokens.colors
      // ... outros tokens
    }
  }
};
```

---

## 📖 Storybook

O **Storybook** é a principal ferramenta para desenvolvimento, documentação e testes visuais dos componentes.

### Principais Recursos

- **Hot Reload**: Mudanças instantâneas durante desenvolvimento
- **Documentação Automática**: Stories geram docs automaticamente
- **Testes Visuais**: Validação de todas as variantes
- **Controles Interativos**: Teste de props em tempo real
- **Isolamento**: Componentes testados independentemente
- **Acessibilidade**: Ferramentas integradas para testes de A11y

### Quick Start

```bash
# Instale as dependências
npm install

# Inicie o Storybook
npm run storybook

# Acesse: http://localhost:6006
```

---

## 🛠️ Scripts Disponíveis

```bash
npm run build           # Build da biblioteca
npm run watch           # Desenvolvimento com watch
npm run storybook       # Desenvolvimento com Storybook (recomendado)
npm run build-storybook # Build do Storybook
npm run test            # Testes unitários
npm run test:watch      # Testes em modo watch
npm run lint            # Linting
npm run clean           # Limpeza
```

---

## 📝 Desenvolvimento

### Adicionando Novos Componentes

1. **Crie a estrutura** na pasta `src/`:

   ```
   src/
   └── novo-component/
       ├── novo-component.component.ts
       ├── novo-component.component.html
       ├── novo-component.component.spec.ts
       └── novo-component.component.stories.ts
   ```

2. **Defina o componente**:

   ```typescript
   // novo-component.component.ts
   import { Component, Input, Output, EventEmitter } from '@angular/core';

   @Component({
     selector: 'bb-novo-component',
     standalone: true,
     templateUrl: './novo-component.component.html',
     styleUrls: ['../styles/index.css']
   })
   export class NovoComponentComponent {
     @Input() propriedade: string = '';
     @Output() evento = new EventEmitter<void>();
   }
   ```

3. **Crie a Story do componente**:

   ```typescript
   // novo-component.component.stories.ts
   import type { Meta, StoryObj } from '@storybook/angular';
   import { argsToTemplate } from '@storybook/angular';
   import { NovoComponentComponent } from './novo-component.component';

   const meta: Meta<NovoComponentComponent> = {
     title: 'Components/NovoComponent',
     component: NovoComponentComponent,
     parameters: {
       layout: 'centered',
       docs: {
         description: {
           component: 'Descrição do componente e seu propósito.'
         }
       }
     },
     argTypes: {
       propriedade: {
         control: 'text',
         description: 'Descrição da propriedade'
       },
       evento: {
         action: 'evento emitido',
         description: 'Evento emitido pelo componente'
       }
     },
     tags: ['autodocs']
   };

   export default meta;
   type Story = StoryObj<NovoComponentComponent>;

   export const Default: Story = {
     args: {
       propriedade: 'valor padrão'
     },
     render: (args) => ({
       props: args,
       template: `<bb-novo-component ${argsToTemplate(args)}>Conteúdo</bb-novo-component>`
     })
   };

   export const Variant: Story = {
     args: {
       propriedade: 'valor alternativo'
     },
     render: (args) => ({
       props: args,
       template: `<bb-novo-component ${argsToTemplate(args)}>Variação</bb-novo-component>`
     })
   };
   ```

4. **Adicione ao public-api.ts**:

   ```typescript
   // src/public-api.ts
   export * from './novo-component';
   ```

5. **Teste no Storybook**:

   ```bash
   npm run storybook
   ```

   Navegue até `Components/NovoComponent` para ver e testar seu componente.

---

### Testes

Cada componente deve ter:

- **Testes unitários** (`.spec.ts`)
- **Story no Storybook** (documentação viva e testes visuais)

**Exemplo de teste unitário:**

```typescript
// novo-component.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NovoComponentComponent } from './novo-component.component';

describe('NovoComponentComponent', () => {
  let component: NovoComponentComponent;
  let fixture: ComponentFixture<NovoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovoComponentComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NovoComponentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

---

## 🔗 Integração com Microfrontends

A biblioteca é utilizada por:

- **Shell App**: Layout e navegação
- **Dashboard MFE**: Visualização de dados
- **Transactions MFE**: Formulários e tabelas
- **Settings MFE**: Configurações

---

## 📚 Referências

- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Angular Library Development](https://angular.dev/tools/libraries/creating-libraries)
- [Storybook for Angular](https://storybook.js.org/docs/angular/get-started/introduction)
- [TailwindCSS](https://tailwindcss.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
