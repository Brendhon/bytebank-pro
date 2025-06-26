# 🎨 Assets Guidelines - ByteBank Pro

Este guia mostra como configurar, usar e gerenciar os assets compartilhados nos microfrontends do ByteBank Pro.

## 📋 Índice

1. [Configuração Inicial](#configuração-inicial)
2. [Estrutura dos Assets](#estrutura-dos-assets)
3. [Integração Angular](#integração-angular)
4. [Exemplos de Uso](#exemplos-de-uso)
5. [Gerenciamento Dinâmico](#gerenciamento-dinâmico)
6. [Build e Deploy](#build-e-deploy)
7. [Boas Práticas](#boas-práticas)
8. [Adicionando Novos Assets](#adicionando-novos-assets)
9. [Troubleshooting](#troubleshooting)

---

## 🚀 Configuração Inicial

### 1. Adicione a dependência

Atualize o `package.json` do seu app:

```json
{
  "dependencies": {
    "@bytebank-pro/shared-assets": "*"
  }
}
```

### 2. Configure o `angular.json`

### Configuração Base (Development)

Para desenvolvimento, usamos path relativo que aponta diretamente para o package:

```json
{
  "assets": [
    {
      "glob": "**/*",
      "input": "./public",
      "output": "."
    },
    {
      "glob": "**/*",
      "input": "../../packages/shared-assets/assets",
      "output": "/assets/"
    }
  ]
}
```

### Configuração de Produção

Para produção, sobrescrevemos os assets para usar o `node_modules`:

```json
{
  "configurations": {
    "production": {
      "assets": [
        {
          "glob": "**/*",
          "input": "./public",
          "output": "."
        },
        {
          "glob": "**/*",
          "input": "./node_modules/@bytebank-pro/shared-assets/dist/assets",
          "output": "/assets/"
        }
      ]
      // ...other production configs
    }
  }
}
```

---

## 📁 Estrutura dos Assets

```
packages/shared-assets/
├── assets/
│   ├── logos/
│   ├── icons/
│   ├── images/
│   └── illustrations/
├── src/
│   └── index.ts
└── dist/
```

### Categorias e Constantes

- **Logos** (`LOGOS`): Logo principal, ícone da marca
- **Ícones** (`ICONS`): Ícone principal, Figma, GitHub, Storybook
- **Imagens** (`IMAGES`): Caixa, dispositivos, estrela, saque
- **Ilustrações** (`ILLUSTRATIONS`): 404, home, login, cadastro, configurações, transações

---

## 🧩 Integração Angular

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

## 🎯 Exemplos de Uso

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
        <!-- Login form here -->
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
          <!-- Register form here -->
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
      <section class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-8 text-white">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-3xl font-bold mb-2">Bem-vindo de volta!</h1>
            <p class="text-blue-100">Vamos ver como estão suas finanças hoje</p>
          </div>
          <img [src]="homeIllustration" alt="Dashboard" class="h-32 w-auto" />
        </div>
      </section>
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

### Configurações

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
        <div class="bg-white rounded-lg p-6 shadow-sm border">
          <div class="flex items-center mb-4">
            <img [src]="transactionIllustration" alt="Transações" class="h-16 w-auto mr-4" />
            <div>
              <h3 class="text-xl font-semibold">Transações</h3>
              <p class="text-gray-600">Configure suas preferências de transação</p>
            </div>
          </div>
          <!-- Transaction settings here -->
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

### Asset Service

```typescript
import { Injectable } from '@angular/core';
import { getAssetUrl, ASSETS } from '@bytebank-pro/shared-assets';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
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

### Illustration Service

```typescript
import { Injectable } from '@angular/core';
import { ILLUSTRATIONS, IMAGES } from '@bytebank-pro/shared-assets';

@Injectable({ providedIn: 'root' })
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
    if (width < 640) this.screenSize.set('sm');
    else if (width < 1024) this.screenSize.set('md');
    else this.screenSize.set('lg');
  }

  illustrationClasses(): string {
    const baseClasses = 'w-full h-auto';
    const sizeClasses = { sm: 'max-h-48', md: 'max-h-64', lg: 'max-h-80' };
    return `${baseClasses} ${sizeClasses[this.screenSize()]}`;
  }
}
```

---

## 🚀 Build e Deploy

### Desenvolvimento

```bash
npm run dev  # Assets served locally
```

### Produção

```bash
npm run build  # Assets copied to dist/assets
```

### CDN

1. Faça upload dos assets para o CDN após o build.
2. Configure o `environment.ts` com a URL do CDN:
   ```typescript
   export const environment = {
     production: true,
     cdnUrl: 'https://cdn.bytebank.com'
   };
   ```
3. Os assets serão servidos do CDN automaticamente.

#### Exemplo com CDN

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

- Use ilustrações da mesma categoria para consistência visual.
- Prefira SVG para logos e ilustrações; PNG/WebP para imagens complexas.
- Sempre inclua `alt` descritivo nas imagens.
- Use classes responsivas do Tailwind para tamanhos de imagem.
- Agrupe assets por categoria e use nomes descritivos.
- Mantenha o `index.ts` atualizado.
- Mantenha imagens abaixo de 500KB quando possível.

---

## 🔄 Adicionando Novos Assets

1. Adicione o arquivo físico:
   ```bash
   cp nova-ilustracao.svg packages/shared-assets/assets/illustrations/
   ```
2. Atualize o `index.ts`:
   ```typescript
   export const ILLUSTRATIONS = {
     // ...existing illustrations...
     NOVA_ILUSTRACAO: '/assets/illustrations/nova-ilustracao.svg'
   } as const;
   ```
3. Rebuild o package:
   ```bash
   cd packages/shared-assets
   npm run build
   ```
4. Use nos apps:
   ```typescript
   import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';
   const novaIlustracao = ILLUSTRATIONS.NOVA_ILUSTRACAO;
   ```

---

## 🎯 Troubleshooting

**Assets não aparecem**

- Verifique o `angular.json`
- Confirme o build: `npm run build`
- Cheque os paths no console do navegador

**Tipos TypeScript**

- Rode `npm run build` no shared-assets
- Reinicie o TypeScript server no VS Code

**Performance**

- Considere lazy loading para imagens grandes
- Monitore o tamanho do bundle final
