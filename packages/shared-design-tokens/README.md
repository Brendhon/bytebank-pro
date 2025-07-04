# 🎨 @bytebank-pro/shared-design-tokens

Este pacote centraliza todos os design tokens (cores, tipografia, espaçamentos, etc.) para garantir consistência visual e facilitar a manutenção em todo o monorepo Bytebank Pro.

---

## 📝 Sumário

- [🎨 @bytebank-pro/shared-design-tokens](#-bytebank-proshared-design-tokens)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📁 Estrutura de Pastas](#-estrutura-de-pastas)
  - [🚀 Como Usar](#-como-usar)
    - [Com TailwindCSS](#com-tailwindcss)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Fornecer uma fonte única da verdade para todos os elementos visuais do sistema de design, como cores, fontes e espaçamentos, para serem consumidos pelas aplicações e bibliotecas de componentes.

---

## 📁 Estrutura de Pastas

```
packages/shared-design-tokens/
├── colors.ts           # Paleta de cores
├── typography.ts       # Configurações de tipografia
├── tailwind.tokens.ts  # Tokens para integração com TailwindCSS
├── index.ts            # Exportador principal
└── package.json
```

---

## 🚀 Como Usar

Os tokens podem ser importados diretamente em arquivos TypeScript ou configurados para uso com TailwindCSS.

### Com TailwindCSS

No seu arquivo `tailwind.config.js`, importe os tokens e estenda o tema:

```javascript
import { tailwindTokens } from '@bytebank-pro/shared-design-tokens/tailwind.tokens';

export default {
  theme: {
    extend: {
      colors: tailwindTokens.colors,
      fontFamily: tailwindTokens.fontFamily
    }
  }
};
```

Agora você pode usar as classes do Tailwind com os tokens customizados:

```html
<h1 class="text-primary font-bold">Título com Design System</h1>
<button class="bg-accent text-white">Botão com Cor de Destaque</button>
```

---

## 🛠️ Desenvolvimento

Para adicionar ou modificar tokens, edite os arquivos na raiz do pacote (`colors.ts`, `typography.ts`) e, se necessário, atualize a exportação para o Tailwind em `tailwind.tokens.ts`.

---

## 🔗 Integração

Este pacote é uma dependência fundamental para:

- **`packages/ui`**: A biblioteca de componentes utiliza esses tokens para estilização.
- **Aplicações** (`apps/*`): As aplicações configuram o TailwindCSS para usar esses tokens, garantindo consistência visual.

---

## 📚 Referências

- [Design Tokens Community Group](https://design-tokens.github.io/community-group/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs/theme)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)