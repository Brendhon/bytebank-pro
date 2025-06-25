# 🎨 Shared Assets

Biblioteca de assets compartilhados (logos, ícones, imagens) para os microfrontends do ByteBank Pro.

## 📁 Estr### 3. Organização

- Agrupe assets por categoria (logos, icons, images, illustrations)
- Use subpastas para diferentes variações
- Mantenha o `index.ts` atualizado com novos assetsa

```
packages/shared-assets/
├── assets/                 # Assets físicos
│   ├── logos/             # Logos da marca ByteBank
│   ├── icons/             # Ícones customizados e de ferramentas
│   ├── images/            # Imagens funcionais (PNG/JPG)
│   └── illustrations/     # Ilustrações para telas e estados
├── src/
│   └── index.ts           # Paths e constantes dos assets
├── dist/                  # Build gerado
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Uso

### 📖 Guia Completo

Para exemplos detalhados, configuração e boas práticas, consulte:

**[📋 Assets Guidelines - Guia Completo](../../docs/guidelines/ASSETS_GUIDELINES.md)**

### 🔧 Uso Básico

#### 1. Instalação

Este package é automaticamente linkado no monorepo. Para usar em um app/package:

```json
{
  "dependencies": {
    "@bytebank-pro/shared-assets": "*"
  }
}
```

#### 2. Importação Rápida

```typescript
import { LOGOS, ICONS, IMAGES, ILLUSTRATIONS, getAssetUrl } from '@bytebank-pro/shared-assets';

// Usar paths diretos
const logoPath = LOGOS.MAIN; // '/assets/logos/logo.svg'
const homeIllustration = ILLUSTRATIONS.HOME; // '/assets/illustrations/home.svg'

// Construir URLs completas para diferentes ambientes
const fullLogoUrl = getAssetUrl(LOGOS.MAIN, 'https://cdn.bytebank.com');
```

#### 3. Em Componentes Angular

```typescript
@Component({
  template: `
    <img [src]="logoPath" alt="ByteBank Logo" />
    <img [src]="transactionIllustration" alt="Transações" />
  `
})
export class HeaderComponent {
  logoPath = LOGOS.MAIN;
  transactionIllustration = ILLUSTRATIONS.TRANSACTION;
}
```

## 📋 Assets Disponíveis

### Logos da Marca

- `MAIN`: Logo principal da ByteBank
- `ICON`: Ícone/símbolo da marca

### Ícones Customizados

- `MAIN_ICON`: Ícone principal da aplicação
- `MAIN_LOGO`: Logo em formato de ícone
- `FIGMA`: Ícone do Figma
- `GITHUB`: Ícone do GitHub
- `STORYBOOK`: Ícone do Storybook

### Imagens Funcionais

- `BOX`: Imagem de caixa/container
- `DEVICES`: Imagem de dispositivos
- `STAR`: Imagem de estrela/favorito
- `WITHDRAWAL`: Imagem de saque/retirada

### Ilustrações

- `ERROR_404`: Ilustração para página 404
- `HOME`: Ilustração da tela inicial
- `LOGIN`: Ilustração da tela de login
- `REGISTER`: Ilustração da tela de cadastro
- `SETTINGS`: Ilustração da tela de configurações
- `TRANSACTION`: Ilustração de transações

## 🔧 Scripts

- `npm run build`: Compila TypeScript e copia assets
- `npm run dev`: Modo desenvolvimento com watch
- `npm run copy:assets`: Copia assets para dist/
- `npm run clean`: Limpa arquivos gerados

## 🎯 Exemplo Rápido

```typescript
// Importar assets
import { LOGOS, ILLUSTRATIONS, IMAGES } from '@bytebank-pro/shared-assets';

// Usar em componente Angular
@Component({
  template: `
    <header>
      <img [src]="logo" alt="ByteBank" />
    </header>
    <main>
      <img [src]="homeIllustration" alt="Bem-vindo" />
    </main>
  `
})
export class AppComponent {
  logo = LOGOS.MAIN;
  homeIllustration = ILLUSTRATIONS.HOME;
}
```

## 📋 Assets Disponíveis (Resumo)

| Categoria         | Exemplos                        | Uso                         |
| ----------------- | ------------------------------- | --------------------------- |
| **LOGOS**         | `MAIN`, `ICON`                  | Marca e identidade visual   |
| **ICONS**         | `GITHUB`, `FIGMA`, `STORYBOOK`  | Ícones de ferramentas e app |
| **IMAGES**        | `DEVICES`, `STAR`, `WITHDRAWAL` | Imagens funcionais PNG      |
| **ILLUSTRATIONS** | `LOGIN`, `HOME`, `ERROR_404`    | Ilustrações SVG para telas  |

## 🔗 Links Úteis

- **[📋 Assets Guidelines](../../docs/guidelines/ASSETS_GUIDELINES.md)** - Guia completo com exemplos
- **[🎨 Design Tokens](../shared-design-tokens/README.md)** - Cores e tipografia
- **[🧩 UI Components](../ui/README.md)** - Componentes reutilizáveis

---

> 💡 **Dica**: Para uma configuração completa e exemplos detalhados, sempre consulte o [Assets Guidelines](../../docs/guidelines/ASSETS_GUIDELINES.md)!
