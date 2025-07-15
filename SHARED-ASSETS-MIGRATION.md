# Migração do @bytebank-pro/shared-assets

Este documento detalha as alterações necessárias para remover o projeto `@bytebank-pro/shared-assets` e reorganizar os assets nos projetos individuais.

## 📋 Resumo das Alterações

### Objetivo

- Remover a dependência do `@bytebank-pro/shared-assets`
- Criar assets locais em cada projeto que os utiliza
- Atualizar todas as importações para usar os assets locais
- **Simplificar componentes** removendo a função `getAssetContent`
- Manter a funcionalidade existente

### Vantagens da Simplificação

- **Performance**: Elimina chamadas fetch desnecessárias
- **Simplicidade**: Código mais limpo e direto
- **Manutenibilidade**: Menos complexidade para manter
- **Build time**: Assets processados em tempo de build
- **Menos dependências**: Remove dependência de função externa

### Projetos Afetados

- `apps/shell` - Usa ilustrações, imagens e ícones
- `apps/settings` - Usa ilustração de configurações
- `apps/transactions` - Usa ilustração de transações
- `packages/ui` - Usa logos e função getAssetContent

## 🗂️ Estrutura de Assets por Projeto

### 1. Apps/Shell

**Assets necessários:**

- `src/assets/illustrations/`
  - `home.svg`
  - `404.svg`
  - `login.svg`
  - `register.svg`
- `src/assets/images/`
  - `box.png`
  - `withdrawal.png`
  - `star.png`
  - `devices.png`
- `src/assets/icons/`
  - `github.svg`
  - `figma.svg`

### 2. Apps/Settings

**Assets necessários:**

- `src/assets/illustrations/`
  - `settings.svg`

### 3. Apps/Transactions

**Assets necessários:**

- `src/assets/illustrations/`
  - `transaction.svg`

### 4. Packages/UI

**Assets necessários:**

- `src/assets/logos/`
  - `logo.svg`
  - `icon.svg`

## 📝 Alterações Necessárias

### Fase 1: Criar Estrutura de Assets Locais

#### 1.1 Apps/Shell

```bash
# Criar diretórios
mkdir -p apps/shell/src/assets/illustrations
mkdir -p apps/shell/src/assets/images
mkdir -p apps/shell/src/assets/icons

# Copiar assets do shared-assets
cp packages/shared-assets/assets/illustrations/home.svg apps/shell/src/assets/illustrations/
cp packages/shared-assets/assets/illustrations/404.svg apps/shell/src/assets/illustrations/
cp packages/shared-assets/assets/illustrations/login.svg apps/shell/src/assets/illustrations/
cp packages/shared-assets/assets/illustrations/register.svg apps/shell/src/assets/illustrations/

cp packages/shared-assets/assets/images/box.png apps/shell/src/assets/images/
cp packages/shared-assets/assets/images/withdrawal.png apps/shell/src/assets/images/
cp packages/shared-assets/assets/images/star.png apps/shell/src/assets/images/
cp packages/shared-assets/assets/images/devices.png apps/shell/src/assets/images/

cp packages/shared-assets/assets/icons/github.svg apps/shell/src/assets/icons/
cp packages/shared-assets/assets/icons/figma.svg apps/shell/src/assets/icons/
```

#### 1.2 Apps/Settings

```bash
# Criar diretórios
mkdir -p apps/settings/src/assets/illustrations

# Copiar assets do shared-assets
cp packages/shared-assets/assets/illustrations/settings.svg apps/settings/src/assets/illustrations/
```

#### 1.3 Apps/Transactions

```bash
# Criar diretórios
mkdir -p apps/transactions/src/assets/illustrations

# Copiar assets do shared-assets
cp packages/shared-assets/assets/illustrations/transaction.svg apps/transactions/src/assets/illustrations/
```

#### 1.4 Packages/UI

```bash
# Criar diretórios
mkdir -p packages/ui/src/assets/logos

# Copiar assets do shared-assets
cp packages/shared-assets/assets/logos/logo.svg packages/ui/src/assets/logos/
cp packages/shared-assets/assets/logos/icon.svg packages/ui/src/assets/logos/
```

### Fase 2: Criar Arquivos de Configuração de Assets

#### 2.1 Apps/Shell - assets.config.ts

```typescript
// apps/shell/src/assets/assets.config.ts
export const ASSETS = {
  ILLUSTRATIONS: {
    HOME: '/assets/illustrations/home.svg',
    ERROR_404: '/assets/illustrations/404.svg',
    LOGIN: '/assets/illustrations/login.svg',
    REGISTER: '/assets/illustrations/register.svg'
  },
  IMAGES: {
    BOX: '/assets/images/box.png',
    WITHDRAWAL: '/assets/images/withdrawal.png',
    STAR: '/assets/images/star.png',
    DEVICES: '/assets/images/devices.png'
  },
  ICONS: {
    GITHUB: '/assets/icons/github.svg',
    FIGMA: '/assets/icons/figma.svg'
  }
} as const;
```

#### 2.2 Apps/Settings - assets.config.ts

```typescript
// apps/settings/src/assets/assets.config.ts
export const ASSETS = {
  ILLUSTRATIONS: {
    SETTINGS: '/assets/illustrations/settings.svg'
  }
} as const;
```

#### 2.3 Apps/Transactions - assets.config.ts

```typescript
// apps/transactions/src/assets/assets.config.ts
export const ASSETS = {
  ILLUSTRATIONS: {
    TRANSACTION: '/assets/illustrations/transaction.svg'
  }
} as const;
```

#### 2.4 Packages/UI - assets.config.ts

```typescript
// packages/ui/src/assets/assets.config.ts
export const ASSETS = {
  LOGOS: {
    MAIN: '/assets/logos/logo.svg',
    ICON: '/assets/logos/icon.svg'
  }
} as const;
```

### Fase 3: Atualizar Importações

#### 3.1 Apps/Shell

**Arquivos a alterar:**

1. `apps/shell/src/app/pages/home/home.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS, IMAGES } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS, IMAGES } = ASSETS;
```

2. `apps/shell/src/app/pages/not-found/not-found.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS } = ASSETS;
```

3. `apps/shell/src/app/components/login-form/login-form.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS } = ASSETS;
```

4. `apps/shell/src/app/components/register-form/register-form.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS } = ASSETS;
```

5. `apps/shell/src/app/components/header/components/user-actions/user-actions.component.ts`

```typescript
// ANTES
import { ICONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ICONS } = ASSETS;
```

#### 3.2 Apps/Settings

**Arquivos a alterar:**

1. `apps/settings/src/app/components/account-form/account-form.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS } = ASSETS;
```

#### 3.3 Apps/Transactions

**Arquivos a alterar:**

1. `apps/transactions/src/app/components/transaction-form/transaction-form.component.ts`

```typescript
// ANTES
import { ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { ILLUSTRATIONS } = ASSETS;
```

#### 3.4 Packages/UI

**Arquivos a alterar:**

1. `packages/ui/src/ui/img/img.component.ts` - **SIMPLIFICAR COMPONENTE**

```typescript
// ANTES
import { getAssetContent } from '@bytebank-pro/shared-assets';

// DEPOIS - REMOVER getAssetContent E SIMPLIFICAR LÓGICA
// Remover import e simplificar loadImage() para usar src diretamente
```

2. `packages/ui/src/ui/logo/logo.component.ts`

```typescript
// ANTES
import { LOGOS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { LOGOS } = ASSETS;
```

3. `packages/ui/src/ui/logo/logo.component.spec.ts`

```typescript
// ANTES
import { LOGOS } from '@bytebank-pro/shared-assets';

// DEPOIS
import { ASSETS } from '@/assets/assets.config';
const { LOGOS } = ASSETS;
```

### Fase 4: Remover Dependências

#### 4.1 Remover do package.json do UI

```json
// packages/ui/package.json
// Remover da seção peerDependencies:
"@bytebank-pro/shared-assets": "*",
```

#### 4.2 Verificar se outros projetos têm dependência direta

- Apps não têm dependência direta, apenas via UI package
- A remoção da dependência do UI package deve ser suficiente

### Fase 5: Simplificar Componente ImgComponent

#### 5.1 Simplificar lógica do ImgComponent

Com assets locais, podemos simplificar significativamente o componente ImgComponent:

**Arquivo:** `packages/ui/src/ui/img/img.component.ts`

```typescript
// ANTES - Lógica complexa com getAssetContent
private async loadImage(): Promise<void> {
  try {
    this.isLoading = true;
    this.hasError = false;

    const srcValue = this.src();

    // Check if it's an external URL or asset path
    if (this.isExternalUrl(srcValue)) {
      // For external URLs, use standard img src
      this.imageContent = srcValue;
      this.isSvg = false;
    } else {
      // For internal assets, use getAssetContent
      const asset = await getAssetContent(srcValue);

      if (asset.type === 'svg') {
        this.imageContent = this.sanitizer.bypassSecurityTrustHtml(asset.content);
        this.isSvg = true;
      } else {
        this.imageContent = srcValue;
        this.isSvg = false;
      }
    }
  } catch (error: unknown) {
    console.error('Error loading image:', error);
    this.hasError = true;
    this.imageContent = '';
  } finally {
    this.isLoading = false;
    this.cdr.markForCheck();
  }
}

// DEPOIS - Lógica simplificada
private loadImage(): void {
  try {
    this.isLoading = true;
    this.hasError = false;

    const srcValue = this.src();

    // Para assets locais, usar src diretamente
    this.imageContent = srcValue;
    this.isSvg = srcValue.toLowerCase().endsWith('.svg');

  } catch (error: unknown) {
    console.error('Error loading image:', error);
    this.hasError = true;
    this.imageContent = '';
  } finally {
    this.isLoading = false;
    this.cdr.markForCheck();
  }
}
```

#### 5.2 Atualizar template do ImgComponent

**Arquivo:** `packages/ui/src/ui/img/img.component.html`

```html
<!-- ANTES - Lógica complexa para SVG vs imagem -->
@else if (isSvg && imageContent) {
<div
  [class]="imageClasses()"
  [innerHTML]="imageContent"
  [attr.alt]="imageAltText()"
  [attr.aria-hidden]="shouldHideFromScreenReaders()"
  role="img"
  data-testid="img-svg"
></div>
}

<!-- DEPOIS - Usar img padrão para todos os tipos -->
@else if (imageContent) {
<img
  [src]="imageContent"
  [alt]="imageAltText()"
  [class]="imageClasses()"
  [attr.aria-hidden]="shouldHideFromScreenReaders()"
  (load)="onImageLoad()"
  (error)="onImageError()"
  loading="lazy"
  data-testid="img-standard"
/>
}
```

### Fase 6: Verificar Templates HTML

Alguns componentes podem usar os assets diretamente nos templates. Verificar:

1. `apps/shell/src/app/pages/home/home.component.html`
2. `apps/shell/src/app/pages/not-found/not-found.component.html`
3. `apps/shell/src/app/components/login-form/login-form.component.html`
4. `apps/shell/src/app/components/register-form/register-form.component.html`
5. `apps/shell/src/app/components/header/components/user-actions/user-actions.component.html`
6. `apps/settings/src/app/components/account-form/account-form.component.html`
7. `apps/transactions/src/app/components/transaction-form/transaction-form.component.html`

**Exemplo de alteração:**

```html
<!-- ANTES -->
<img [src]="ILLUSTRATIONS.HOME" alt="Home illustration" />

<!-- DEPOIS -->
<img [src]="illustrationSrc" alt="Home illustration" />
```

### Fase 7: Testes

#### 7.1 Verificar Build

```bash
# Testar build de cada projeto
npm run build --workspace=apps/shell
npm run build --workspace=apps/settings
npm run build --workspace=apps/transactions
npm run build --workspace=packages/ui
```

#### 7.2 Verificar Testes

```bash
# Testar testes de cada projeto
npm run test --workspace=apps/shell
npm run test --workspace=apps/settings
npm run test --workspace=apps/transactions
npm run test --workspace=packages/ui
```

## ⚠️ Alterações Manuais Necessárias

### 1. Copiar Assets Físicos

Os arquivos de assets precisam ser copiados manualmente do `packages/shared-assets/assets/` para os respectivos projetos.

### 2. Verificar Templates HTML

Alguns templates podem usar os assets diretamente. Verificar e atualizar conforme necessário.

### 3. Testar Funcionalidade

Após todas as alterações, testar:

- Carregamento de imagens
- Funcionalidade dos componentes
- Build e deploy

### 4. Remover shared-assets (Opcional)

Após confirmar que tudo funciona:

```bash
# Remover o projeto shared-assets
rm -rf packages/shared-assets
```

## 🔄 Ordem de Execução

1. **Criar estrutura de diretórios** em cada projeto
2. **Copiar assets físicos** do shared-assets para os projetos
3. **Criar arquivos assets.config.ts** em cada projeto
4. **Atualizar importações** nos componentes
5. **Simplificar ImgComponent** (remover getAssetContent)
6. **Remover dependências** do package.json
7. **Testar builds e funcionalidade**
8. **Remover shared-assets** (opcional)

## 📋 Checklist

- [ ] Criar diretórios de assets em cada projeto
- [ ] Copiar assets físicos do shared-assets
- [ ] Criar arquivos assets.config.ts
- [ ] Atualizar importações no shell app
- [ ] Atualizar importações no settings app
- [ ] Atualizar importações no transactions app
- [ ] Atualizar importações no UI package
- [ ] **Simplificar ImgComponent** (remover getAssetContent)
- [ ] Remover dependência do UI package
- [ ] Testar builds
- [ ] Testar funcionalidade
- [ ] Verificar templates HTML
- [ ] Remover shared-assets (opcional)

## 🚨 Observações Importantes

1. **Backup**: Faça backup antes de iniciar as alterações
2. **Testes**: Teste cada alteração individualmente
3. **Builds**: Verifique se todos os builds funcionam
4. **Assets**: Certifique-se de que todos os assets foram copiados corretamente
5. **Dependências**: Verifique se não há outras dependências do shared-assets
6. **Simplificação**: A remoção da função `getAssetContent` simplifica significativamente o código
7. **Performance**: Assets locais melhoram a performance por eliminar chamadas fetch desnecessárias
