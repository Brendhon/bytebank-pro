# 🧩 @bytebank-pro/ui

Este pacote contém a biblioteca de componentes Angular reutilizáveis, construída com Standalone Components e estilizada com TailwindCSS, para ser usada em todas as aplicações do monorepo Bytebank Pro.

---

## 📝 Sumário

- [🧩 @bytebank-pro/ui](#-bytebank-proui)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📦 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
  - [📖 Storybook](#-storybook)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
    - [Adicionando Novos Componentes](#adicionando-novos-componentes)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Fornecer um conjunto de componentes de UI consistentes, acessíveis e prontos para uso, acelerando o desenvolvimento e garantindo a padronização visual entre os microfrontends.

---

## 📦 Estrutura de Pastas

```
packages/ui/
├── src/                  # Código-fonte dos componentes
├── .storybook/           # Configurações do Storybook
└── tailwind.config.js    # Configuração do TailwindCSS
```

---

## 🚀 Como Usar

Os componentes são **standalone**, permitindo importação granular diretamente nos módulos ou outros componentes que os utilizam.

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from '@bytebank-pro/ui/button'; // Exemplo

@Component({
  selector: 'bb-example',
  standalone: true,
  imports: [ButtonComponent],
  template: `<bb-button>Clique Aqui</bb-button>`
})
export class ExampleComponent {}
```

---

## 📖 Storybook

O **Storybook** é a ferramenta central para desenvolver, documentar e testar visualmente os componentes de forma isolada.

Para iniciar o Storybook, execute:

```bash
npm run storybook
```

Acesse em `http://localhost:6006`.

---

## 🛠️ Desenvolvimento

O desenvolvimento de novos componentes deve ser feito através do Storybook para garantir o isolamento e a documentação adequada.

### Adicionando Novos Componentes

1.  Crie a pasta do componente em `src/`.
2.  Implemente o componente como um **Standalone Component**.
3.  Crie um arquivo `.stories.ts` para documentar e testar as variações do componente.
4.  Exporte o componente no `public-api.ts`.

---

## 🔗 Integração

Esta biblioteca é consumida por todas as **aplicações** (`apps/*`) que precisam de elementos de interface, garantindo que a UI seja consistente e baseada nos mesmos componentes reutilizáveis.

---

## 📚 Referências

- [Angular Standalone Components](https://angular.dev/guide/components/importing)
- [Storybook for Angular](https://storybook.js.org/docs/angular/get-started/introduction)
- [TailwindCSS](https://tailwindcss.com/)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)
