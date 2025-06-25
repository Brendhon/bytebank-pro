# @bytebank-pro/ui

🎨 **Biblioteca de componentes Angular para o ByteBank Pro**

Uma biblioteca moderna de componentes Angular 20+ desenvolvida especificamente para o ecossistema ByteBank Pro, otimizada para uso com TailwindCSS e design tokens compartilhados.

## 🎯 Objetivo

Fornecer componentes reutilizáveis e consistentes para:

- **Padronização**: UI/UX consistente em todos os microfrontends
- **Produtividade**: Componentes prontos para uso
- **Manutenibilidade**: Centralizacão de mudanças de design
- **Acessibilidade**: Componentes acessíveis por padrão

## 📦 Estrutura

```
packages/ui/
├── src/                  # Componentes
│
├── styles/               # Estilos globais
└── public-api.ts         # Exportações principais
```

## 🚀 Instalação

```bash
npm install @bytebank-pro/ui
```

## 📝 Como Usar

### Importação de Componentes

A biblioteca utiliza **standalone components** do Angular, permitindo importações granulares:

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@bytebank-pro/ui/button';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ButtonComponent],
  template: ` <bb-button variant="primary" (buttonClick)="handleClick()"> Clique aqui </bb-button> `
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

## 🧩 Componentes Disponíveis

### Button (`bb-button`)

Componente de botão versátil com múltiplas variações visuais.

#### Uso Básico

```html
<bb-button variant="primary" size="md" (buttonClick)="handleClick()"> Clique aqui </bb-button>
```

## 🎨 Design System Integration

A biblioteca integra perfeitamente com:

- **@bytebank-pro/shared-design-tokens**: Cores e tipografia
- **TailwindCSS**: Utilitários de estilo

### Configuração do TailwindCSS

Certifique-se de incluir a biblioteca no seu `tailwind.config.js`:

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

## 🛠️ Scripts Disponíveis

```bash
# Build da biblioteca
npm run build

# Desenvolvimento com watch
npm run watch

# Testes
npm run test

# Testes em modo watch
npm run test:watch

# Linting
npm run lint

# Limpeza
npm run clean
```

## 📝 Desenvolvimento

### Adicionando Novos Componentes

1. **Crie a estrutura** na pasta `src/`:

```
src/
└── novo-component/
    ├── novo-component.component.ts
    ├── novo-component.component.html
    ├── novo-component.component.spec.ts
```

2. **Defina o componente**:

```typescript
// novo-component.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'bb-novo-component',
  standalone: true,
  templateUrl: './novo-component.component.html',
  styleUrls: ['../styles/index.css'] // Certifique-se de ter um arquivo CSS correspondente
})
export class NovoComponentComponent {
  @Input() propriedade: string = '';
  @Output() evento = new EventEmitter<void>();
}
```

3. **Adicione ao public-api.ts**:

```typescript
// src/public-api.ts
export * from './novo-component';
```

### Testes

Cada componente deve ter testes unitários:

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

### Melhorias (futuras)

- [ ] **Storybook**: Documentação interativa dos componentes
- [ ] **Testes E2E**: Testes de integração com Cypress
- [ ] **A11y**: Melhorias de acessibilidade
- [ ] **Performance**: Tree-shaking e bundle size optimization

## 🔗 Integração com Microfrontends

A biblioteca é utilizada por:

- **Shell App**: Componentes de layout e navegação
- **Dashboard MFE**: Componentes de visualização de dados
- **Transactions MFE**: Formulários e tabelas
- **Settings MFE**: Componentes de configuração

## 📚 Referências

- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Angular Library Development](https://angular.dev/tools/libraries/creating-libraries)
- [TailwindCSS](https://tailwindcss.com/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
