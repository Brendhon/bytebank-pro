# @bytebank-pro/shared-design-tokens

🎨 **Design tokens compartilhados para o sistema de design do ByteBank Pro**

Este package centraliza todos os tokens de design (cores, tipografia, espaçamentos, etc.) utilizados em todo o monorepo ByteBank Pro, garantindo consistência visual e facilidade de manutenção.

## 🎯 Objetivo

Fornecer uma fonte única da verdade para todos os elementos visuais do sistema de design:

- Cores padronizadas da marca ByteBank
- Tipografia consistente
- Tokens para integração com TailwindCSS
- Facilitar mudanças globais de design

## 📦 Estrutura

```
packages/shared-design-tokens/
├── colors.ts           # Paleta de cores do ByteBank
├── typography.ts       # Configurações tipográficas
├── tailwind.tokens.ts  # Tokens exportados para Tailwind
├── index.ts            # Exportações principais
└── package.json
```

## 🎨 Tokens Disponíveis

### Cores (`colors.ts`)

#### Cores Primárias

- `bytebank-blue`: #004061 - Azul institucional
- `bytebank-orange`: #FF5031 - Laranja de destaque
- `bytebank-green`: #47A13B - Verde para confirmações

#### Cores Neutras

- `bytebank-light-green`: #E4E3E3 - Verde claro
- `bytebank-light-gray`: #F5F5F5 - Cinza claro
- `bytebank-gray`: #888888 - Cinza médio
- `bytebank-dark-gray`: #444444 - Cinza escuro
- `bytebank-dark`: #212121 - Escuro principal

### Tipografia (`typography.ts`)

- Definições de font-family
- Tamanhos de fonte padronizados
- Configurações de line-height
- Pesos de fonte (font-weight)

## 🚀 Como Usar

### Importação Direta

```typescript
import { colors } from '@bytebank-pro/shared-design-tokens';

// Usando as cores
const primaryColor = colors['bytebank-blue'];
```

### Com TailwindCSS

1. Importe no seu `tailwind.config.js`:

```javascript
import { tailwindTokens } from '@bytebank-pro/shared-design-tokens/tailwind.tokens';

export default {
  theme: {
    extend: {
      colors: tailwindTokens.colors,
      fontFamily: tailwindTokens.fontFamily
      // ... outros tokens
    }
  }
};
```

2. Use nas classes do Tailwind:

```html
<div class="bg-bytebank-blue text-bytebank-light-gray">ByteBank Pro</div>
```

### Em Componentes Angular

```typescript
import { colors } from '@bytebank-pro/shared-design-tokens';

@Component({
  template: ` <div [style.background-color]="primaryColor">Conteúdo</div> `
})
export class MyComponent {
  primaryColor = colors['bytebank-blue'];
}
```

## 🛠️ Scripts Disponíveis

```bash
# Build dos tokens
npm run build

# Desenvolvimento com watch
npm run dev

# Limpeza dos arquivos gerados
npm run clean
```

## 📝 Desenvolvimento

### Adicionando Novos Tokens

1. **Cores**: Adicione no arquivo `colors.ts`
2. **Tipografia**: Adicione no arquivo `typography.ts`
3. **TailwindCSS**: Exporte no `tailwind.tokens.ts`
4. **Exportação**: Adicione no `index.ts`

### Processo de Build

O package utiliza TypeScript para compilar os tokens para JavaScript, gerando:

- `dist/index.js` - Arquivo principal compilado
- `dist/index.d.ts` - Definições de tipos
- `dist/*.d.ts` - Tipos para cada arquivo

## 🎨 Design System

Este package é parte do sistema de design do ByteBank Pro e trabalha em conjunto com:

- `@bytebank-pro/ui` - Componentes visuais
- TailwindCSS - Framework de utilitários CSS
- Aplicações Angular - Consumo dos tokens

## 📚 Referências

- [Design Tokens Community Group](https://design-tokens.github.io/community-group/)
- [TailwindCSS Customization](https://tailwindcss.com/docs/theme)
- [Angular Theming](https://material.angular.io/guide/theming)
