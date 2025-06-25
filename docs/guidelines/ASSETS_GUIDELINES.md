# 🎨 Assets Guidelines - ByteBank Pro

Este guia abrangente mostra como configurar, usar e gerenciar os assets compartilhados nos microfrontends do ByteBank Pro.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Estrutura dos Assets](#estrutura-dos-assets)
3. [Integração em Componentes Angular](#integração-em-componentes-angular)
4. [Exemplos de Uso por Contexto](#exemplos-de-uso-por-contexto)
5. [Gerenciamento Dinâmico](#gerenciamento-dinâmico)
6. [Build e Deploy](#build-e-deploy)
7. [Boas Práticas](#boas-práticas)

---

## 🚀 Configuração Inicial

### 1. Adicionar Dependência

Atualize o `package.json` do seu app:

```json
{
  "dependencies": {
    "@bytebank-pro/shared-assets": "*"
  }
}
```

### 2. Configurar angular.json

Adicione os assets compartilhados na configuração de build:

```json
{
  "projects": {
    "seu-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              "src/favicon.ico",
              "src/assets",
              {
                "glob": "**/*",
                "input": "../../packages/shared-assets/assets",
                "output": "/assets"
              }
            ]
          }
        }
      }
    }
  }
}
```

### 3. Configuração de Ambiente

```typescript
// environment.ts (produção)
export const environment = {
  production: true,
  cdnUrl: 'https://cdn.bytebank.com'
};

// environment.development.ts (desenvolvimento)
export const environment = {
  production: false,
  cdnUrl: undefined // usa paths relativos
};
```

---

## 📁 Estrutura dos Assets

```
packages/shared-assets/
├── assets/
│   ├── logos/             # Logos da marca ByteBank
│   │   ├── logo.svg       # Logo principal
│   │   └── icon.svg       # Ícone/símbolo da marca
│   ├── icons/             # Ícones customizados e ferramentas
│   │   ├── icon.svg       # Ícone principal da aplicação
│   │   ├── logo.svg       # Logo em formato de ícone
│   │   ├── figma.svg      # Ícone do Figma
│   │   ├── github.svg     # Ícone do GitHub
│   │   └── storybook.svg  # Ícone do Storybook
│   ├── images/            # Imagens funcionais (PNG)
│   │   ├── box.png        # Imagem de caixa/container
│   │   ├── devices.png    # Imagem de dispositivos
│   │   ├── star.png       # Imagem de estrela/favorito
│   │   └── withdrawal.png # Imagem de saque/retirada
│   └── illustrations/     # Ilustrações para telas/estados (SVG)
│       ├── 404.svg        # Ilustração para página 404
│       ├── home.svg       # Ilustração da tela inicial
│       ├── login.svg      # Ilustração da tela de login
│       ├── register.svg   # Ilustração da tela de cadastro
│       ├── settings.svg   # Ilustração da tela de configurações
│       └── transaction.svg # Ilustração de transações
├── src/
│   └── index.ts           # Constantes e helpers
└── dist/                  # Build gerado
```

### Assets Disponíveis por Categoria

#### 🏷️ Logos da Marca

- `LOGOS.MAIN`: Logo principal da ByteBank
- `LOGOS.ICON`: Ícone/símbolo da marca

#### 🎯 Ícones Customizados

- `ICONS.MAIN_ICON`: Ícone principal da aplicação
- `ICONS.MAIN_LOGO`: Logo em formato de ícone
- `ICONS.FIGMA`: Ícone do Figma
- `ICONS.GITHUB`: Ícone do GitHub
- `ICONS.STORYBOOK`: Ícone do Storybook

#### 🖼️ Imagens Funcionais

- `IMAGES.BOX`: Imagem de caixa/container
- `IMAGES.DEVICES`: Imagem de dispositivos
- `IMAGES.STAR`: Imagem de estrela/favorito
- `IMAGES.WITHDRAWAL`: Imagem de saque/retirada

#### 🎨 Ilustrações

- `ILLUSTRATIONS.ERROR_404`: Ilustração para página 404
- `ILLUSTRATIONS.HOME`: Ilustração da tela inicial
- `ILLUSTRATIONS.LOGIN`: Ilustração da tela de login
- `ILLUSTRATIONS.REGISTER`: Ilustração da tela de cadastro
- `ILLUSTRATIONS.SETTINGS`: Ilustração da tela de configurações
- `ILLUSTRATIONS.TRANSACTION`: Ilustração de transações

---

## 🧩 Integração em Componentes Angular

### Header Component

```typescript
import { Component } from '@angular/core';
import { LOGOS, ICONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="flex items-center justify-between p-4">
      <img [src]="logoPath" alt="ByteBank Logo" class="h-8 w-auto" />
      <nav class="flex space-x-4">
        <a href="/storybook" class="flex items-center space-x-2">
          <img [src]="storybookIcon" alt="" class="w-5 h-5" />
          <span>Storybook</span>
        </a>
        <a href="/github" class="flex items-center space-x-2">
          <img [src]="githubIcon" alt="" class="w-5 h-5" />
          <span>GitHub</span>
        </a>
      </nav>
    </header>
  `
})
export class HeaderComponent {
  logoPath = LOGOS.MAIN;
  storybookIcon = ICONS.STORYBOOK;
  githubIcon = ICONS.GITHUB;
}
```

### Empty State Component

```typescript
import { Component, Input } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="text-center py-12">
      <img [src]="emptyStateImage" alt="Nenhum dado encontrado" class="mx-auto h-32 w-32 mb-4" />
      <h3 class="text-lg font-medium mb-2">{{ title }}</h3>
      <p class="text-gray-500">{{ description }}</p>
    </div>
  `
})
export class EmptyStateComponent {
  @Input() title = 'Nenhum dado encontrado';
  @Input() description = 'Comece criando seu primeiro item.';

  emptyStateImage = ILLUSTRATIONS.ERROR_404;
}
```

### Profile Component com Fallback

```typescript
import { Component, Input } from '@angular/core';
import { LOGOS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-profile-avatar',
  standalone: true,
  template: `
    <div class="relative">
      <img
        [src]="profileImage || placeholderImage"
        [alt]="userName || 'Usuário'"
        class="w-10 h-10 rounded-full object-cover"
        (error)="onImageError()"
      />
    </div>
  `
})
export class ProfileAvatarComponent {
  @Input() profileImage?: string;
  @Input() userName?: string;

  placeholderImage = LOGOS.ICON;

  onImageError() {
    this.profileImage = this.placeholderImage;
  }
}
```

---

## 🎯 Exemplos de Uso por Contexto

### Tela de Login

```typescript
import { Component } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="max-w-md w-full space-y-8">
        <div class="text-center">
          <img [src]="loginIllustration" alt="Login" class="mx-auto h-32 w-auto mb-8" />
          <h2 class="text-3xl font-bold text-gray-900">Faça login em sua conta</h2>
        </div>
        <!-- Formulário de login aqui -->
      </div>
    </div>
  `
})
export class LoginComponent {
  loginIllustration = ILLUSTRATIONS.LOGIN;
}
```

### Tela de Cadastro

```typescript
import { Component } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-register',
  standalone: true,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-8">
            <img [src]="registerIllustration" alt="Cadastro" class="mx-auto h-40 w-auto mb-6" />
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Crie sua conta ByteBank</h1>
            <p class="text-gray-600">Junte-se a milhares de usuários que já confiam na ByteBank</p>
          </div>
          <!-- Formulário de cadastro aqui -->
        </div>
      </div>
    </div>
  `
})
export class RegisterComponent {
  registerIllustration = ILLUSTRATIONS.REGISTER;
}
```

### Dashboard Home

```typescript
import { Component } from '@angular/core';
import { ILLUSTRATIONS, IMAGES } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  template: `
    <div class="space-y-8">
      <!-- Hero Section -->
      <section class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p class="text-blue-100">Vamos ver como estão suas finanças hoje</p>
          </div>
          <img [src]="homeIllustration" alt="Dashboard" class="h-32 w-auto" />
        </div>
      </section>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <img [src]="devicesImage" alt="Dispositivos" class="h-12 w-auto mb-4" />
          <h3 class="font-semibold mb-2">Acesso Multi-dispositivo</h3>
          <p class="text-gray-600 text-sm">Acesse sua conta de qualquer lugar</p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <img [src]="starImage" alt="Premium" class="h-12 w-auto mb-4" />
          <h3 class="font-semibold mb-2">Conta Premium</h3>
          <p class="text-gray-600 text-sm">Benefícios exclusivos para você</p>
        </div>

        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <img [src]="withdrawalImage" alt="Saque" class="h-12 w-auto mb-4" />
          <h3 class="font-semibold mb-2">Saques Rápidos</h3>
          <p class="text-gray-600 text-sm">Retire seu dinheiro quando precisar</p>
        </div>
      </div>
    </div>
  `
})
export class DashboardHomeComponent {
  homeIllustration = ILLUSTRATIONS.HOME;
  devicesImage = IMAGES.DEVICES;
  starImage = IMAGES.STAR;
  withdrawalImage = IMAGES.WITHDRAWAL;
}
```

### Página 404

```typescript
import { Component } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-not-found',
  standalone: true,
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
      <div class="text-center">
        <img
          [src]="notFoundIllustration"
          alt="Página não encontrada"
          class="mx-auto h-64 w-auto mb-8"
        />
        <h1 class="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 class="text-2xl font-semibold text-gray-700 mb-4">Página não encontrada</h2>
        <p class="text-gray-600 mb-8 max-w-md mx-auto">
          A página que você está procurando não existe ou foi movida para outro local.
        </p>
        <button
          routerLink="/"
          class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Voltar ao início
        </button>
      </div>
    </div>
  `
})
export class NotFoundComponent {
  notFoundIllustration = ILLUSTRATIONS.ERROR_404;
}
```

### Configurações com Múltiplas Ilustrações

```typescript
import { Component } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="max-w-4xl mx-auto space-y-8">
      <header class="text-center">
        <img [src]="settingsIllustration" alt="Configurações" class="mx-auto h-32 w-auto mb-6" />
        <h1 class="text-3xl font-bold text-gray-900">Configurações</h1>
        <p class="text-gray-600">Personalize sua experiência ByteBank</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Seção Transações -->
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <div class="flex items-center mb-4">
            <img [src]="transactionIllustration" alt="Transações" class="h-16 w-auto mr-4" />
            <div>
              <h3 class="text-xl font-semibold">Transações</h3>
              <p class="text-gray-600">Configure suas preferências de transação</p>
            </div>
          </div>
          <!-- Configurações de transação aqui -->
        </div>
      </div>
    </div>
  `
})
export class SettingsComponent {
  settingsIllustration = ILLUSTRATIONS.SETTINGS;
  transactionIllustration = ILLUSTRATIONS.TRANSACTION;
}
```

---

## ⚙️ Gerenciamento Dinâmico

### Asset Service para Múltiplos Ambientes

```typescript
import { Injectable } from '@angular/core';
import { getAssetUrl, ASSETS } from '@bytebank-pro/shared-assets';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private readonly baseUrl = environment.cdnUrl;

  getLogoUrl(logoKey: keyof typeof ASSETS.LOGOS): string {
    return getAssetUrl(ASSETS.LOGOS[logoKey], this.baseUrl);
  }

  getIconUrl(iconKey: keyof typeof ASSETS.ICONS): string {
    return getAssetUrl(ASSETS.ICONS[iconKey], this.baseUrl);
  }

  getImageUrl(imageKey: keyof typeof ASSETS.IMAGES): string {
    return getAssetUrl(ASSETS.IMAGES[imageKey], this.baseUrl);
  }

  getIllustrationUrl(illustrationKey: keyof typeof ASSETS.ILLUSTRATIONS): string {
    return getAssetUrl(ASSETS.ILLUSTRATIONS[illustrationKey], this.baseUrl);
  }
}
```

### Illustration Service por Contexto

```typescript
import { Injectable } from '@angular/core';
import { ILLUSTRATIONS, IMAGES } from '@bytebank-pro/shared-assets';

@Injectable({
  providedIn: 'root'
})
export class IllustrationService {
  getPageIllustration(page: string): string {
    const illustrations = {
      login: ILLUSTRATIONS.LOGIN,
      register: ILLUSTRATIONS.REGISTER,
      home: ILLUSTRATIONS.HOME,
      settings: ILLUSTRATIONS.SETTINGS,
      transaction: ILLUSTRATIONS.TRANSACTION,
      '404': ILLUSTRATIONS.ERROR_404
    };

    return illustrations[page as keyof typeof illustrations] || ILLUSTRATIONS.HOME;
  }

  getFeatureImage(feature: string): string {
    const images = {
      devices: IMAGES.DEVICES,
      star: IMAGES.STAR,
      withdrawal: IMAGES.WITHDRAWAL,
      box: IMAGES.BOX
    };

    return images[feature as keyof typeof images] || IMAGES.BOX;
  }

  getRandomIllustration(): string {
    const allIllustrations = Object.values(ILLUSTRATIONS);
    const randomIndex = Math.floor(Math.random() * allIllustrations.length);
    return allIllustrations[randomIndex];
  }
}
```

### Uso Responsivo

```typescript
import { Component, HostListener, signal } from '@angular/core';
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-responsive-hero',
  standalone: true,
  template: `
    <section class="relative overflow-hidden">
      <div class="container mx-auto px-4 py-16">
        <div class="flex flex-col lg:flex-row items-center">
          <div class="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 class="text-4xl lg:text-6xl font-bold mb-6">ByteBank Pro</h1>
            <p class="text-xl text-gray-600 mb-8">A evolução do banking digital</p>
          </div>
          <div class="lg:w-1/2">
            <img [src]="homeIllustration" alt="ByteBank Pro" [class]="illustrationClasses()" />
          </div>
        </div>
      </div>
    </section>
  `
})
export class ResponsiveHeroComponent {
  homeIllustration = ILLUSTRATIONS.HOME;
  screenSize = signal<'sm' | 'md' | 'lg'>('lg');

  @HostListener('window:resize', ['$event'])
  onResize() {
    const width = window.innerWidth;
    if (width < 640) {
      this.screenSize.set('sm');
    } else if (width < 1024) {
      this.screenSize.set('md');
    } else {
      this.screenSize.set('lg');
    }
  }

  illustrationClasses(): string {
    const baseClasses = 'w-full h-auto';
    const sizeClasses = {
      sm: 'max-h-48',
      md: 'max-h-64',
      lg: 'max-h-80'
    };

    return `${baseClasses} ${sizeClasses[this.screenSize()]}`;
  }
}
```

---

## 🚀 Build e Deploy

### Desenvolvimento

```bash
npm run dev  # Assets servidos localmente
```

### Produção

```bash
npm run build  # Assets copiados para dist/assets
```

### CDN (Produção)

1. **Upload dos assets para CDN** após build
2. **Configure `environment.ts`** com URL do CDN:
   ```typescript
   export const environment = {
     production: true,
     cdnUrl: 'https://cdn.bytebank.com'
   };
   ```
3. **Assets serão servidos do CDN** automaticamente

### Exemplo com CDN

```typescript
import { Component } from '@angular/core';
import { LOGOS, getAssetUrl } from '@bytebank-pro/shared-assets';
import { environment } from '../environments/environment';

@Component({
  template: `<img [src]="logoUrl" alt="ByteBank Logo" />`
})
export class AppComponent {
  logoUrl = getAssetUrl(LOGOS.MAIN, environment.cdnUrl);
}
```

---

## 📝 Boas Práticas

### 1. 🎨 **Consistência Visual**

- Use ilustrações da mesma categoria (`ILLUSTRATIONS`) para manter consistência
- Combine com imagens funcionais (`IMAGES`) para criar hierarquia visual
- Mantenha proporções consistentes entre telas similares

### 2. ⚡ **Performance**

- **SVGs** são ideais para ilustrações (escaláveis e pequenos)
- **PNGs** são melhores para fotografias/imagens complexas
- Use `loading="lazy"` para imagens abaixo da dobra
- Considere usar Angular's built-in image optimization

### 3. ♿ **Acessibilidade**

- **Sempre inclua `alt` descritivo** nas imagens
- Use `role="img"` quando necessário
- Considere `aria-hidden="true"` para imagens puramente decorativas
- Garanta contraste adequado para texto sobre imagens

### 4. 📱 **Responsividade**

- Use classes do Tailwind como `h-32 md:h-40 lg:h-48` para tamanhos responsivos
- Considere diferentes ilustrações para mobile vs desktop se necessário
- Teste em diferentes tamanhos de tela

### 5. 🗂️ **Organização**

- Agrupe assets por categoria (logos, icons, images, illustrations)
- Use nomes descritivos e consistentes
- Prefira kebab-case para arquivos
- Use SCREAMING_SNAKE_CASE para constantes

### 6. 🎯 **Formatos Recomendados**

- **Logos**: SVG (escalável e pequeno)
- **Ícones**: SVG ou PNG 24x24, 32x32
- **Imagens**: WebP com fallback PNG/JPG
- **Ilustrações**: SVG para melhor qualidade e tamanho

### 7. ⚙️ **Manutenção**

- Mantenha o `index.ts` atualizado com novos assets
- Use `npm run optimize:images` antes de commits
- Mantenha imagens < 500KB quando possível
- Execute builds regulares para verificar integridade

---

## 🔄 Adicionando Novos Assets

### 1. Adicione o arquivo físico

```bash
# Exemplo: nova ilustração
cp nova-ilustracao.svg packages/shared-assets/assets/illustrations/
```

### 2. Atualize o index.ts

```typescript
export const ILLUSTRATIONS = {
  // ...existing illustrations...
  NOVA_ILUSTRACAO: '/assets/illustrations/nova-ilustracao.svg'
} as const;
```

### 3. Rebuilde o package

```bash
cd packages/shared-assets
npm run build
```

### 4. Use nos apps

```typescript
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';
const novaIlustracao = ILLUSTRATIONS.NOVA_ILUSTRACAO;
```

---

## 🎯 Troubleshooting

### Assets não aparecem

1. Verifique se o `angular.json` está configurado corretamente
2. Confirme se o build foi executado: `npm run build`
3. Verifique os paths no console do navegador

### Tipos TypeScript

1. Execute `npm run build` no package shared-assets
2. Reinicie o TypeScript server no VS Code
3. Verifique se não há conflitos de nomes

### Performance

1. Use `npm run optimize:images` para comprimir
2. Considere lazy loading para imagens grandes
3. Monitore o tamanho do bundle final
