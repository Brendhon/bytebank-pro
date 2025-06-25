# @bytebank-pro/typescript-config

⚙️ **Configurações TypeScript padronizadas para o monorepo ByteBank Pro**

Este package fornece configurações TypeScript reutilizáveis e otimizadas para todos os projetos do monorepo, garantindo consistência na compilação e nas regras de tipagem.

## 🎯 Objetivo

Centralizar e padronizar as configurações TypeScript em todos os projetos:

- **Consistência**: Mesmas regras de compilação em todo o monorepo
- **Manutenibilidade**: Atualizações centralizadas
- **Otimização**: Configurações específicas para cada tipo de projeto
- **Produtividade**: Configurações pré-testadas e otimizadas

## 📦 Configurações Disponíveis

### Base (`base.json`)

Configuração fundamental compartilhada por todos os projetos:

- Configurações básicas do TypeScript
- Regras de compilação rigorosas
- Target e module appropriados
- Configurações de resolução de módulos

### Angular (`angular.json`)

Configuração específica para projetos Angular:

- Extends a configuração base
- Configurações otimizadas para Angular
- Suporte a decorators
- Configurações para desenvolvimento e produção

### Next.js (`nextjs.json`)

Configuração para projetos Next.js (futuro uso):

- Extends a configuração base
- Configurações específicas do Next.js
- Suporte a JSX e React
- Otimizações para SSR/SSG

## 🚀 Como Usar

### Em Projetos Angular

Crie um `tsconfig.json` no seu projeto:

```json
{
  "extends": "@bytebank-pro/typescript-config/angular.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### Para Aplicações (App-specific)

```json
{
  "extends": "@bytebank-pro/typescript-config/angular.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/my-app",
    "types": ["node", "@angular/core"]
  },
  "files": ["src/main.ts"],
  "include": ["src/**/*.d.ts"]
}
```

### Para Bibliotecas

```json
{
  "extends": "@bytebank-pro/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "composite": true
  },
  "include": ["src/**/*"]
}
```

## ⚙️ Configurações Incluídas

### Configurações Base

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ES2022",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true
  }
}
```

### Otimizações Angular

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "useDefineForClassFields": false,
    "importHelpers": true,
    "allowJs": false
  }
}
```

## 🔧 Regras Principais

### Rigor de Tipos

- `strict: true` - Todas as verificações rigorosas ativadas
- `noImplicitAny: true` - Proíbe tipos `any` implícitos
- `strictNullChecks: true` - Verificação rigorosa de null/undefined

### Módulos e Importações

- `moduleResolution: "bundler"` - Resolução moderna de módulos
- `esModuleInterop: true` - Compatibilidade ES Module
- `allowSyntheticDefaultImports: true` - Imports default sintéticos

### Arquivos e Saída

- `declaration: true` - Gera arquivos `.d.ts`
- `sourceMap: true` - Gera source maps para debug
- `removeComments: true` - Remove comentários do output

## 🛠️ Desenvolvimento

### Estrutura dos Arquivos

```
packages/typescript-config/
├── base.json        # Configuração base
├── angular.json     # Específica para Angular
├── nextjs.json      # Para futuros projetos Next.js
└── package.json     # Metadados do package
```

### Adicionando Nova Configuração

1. **Crie o arquivo** com extensão `.json`
2. **Estenda a configuração base**:

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    // configurações específicas
  }
}
```

3. **Adicione ao package.json** na seção `files`
4. **Documente** o uso no README

### Testando Configurações

Para testar uma configuração:

```bash
# No projeto que usa a config
npx tsc --noEmit --project tsconfig.json
```

## 📋 Boas Práticas

### Para Apps Angular

- Sempre estenda `angular.json`
- Configure `baseUrl` e `paths` adequadamente
- Use `types` específicos quando necessário

### Para Bibliotecas

- Estenda `base.json`
- Ative `declaration: true`
- Configure `outDir` adequadamente
- Use `composite: true` para project references

### Configurações Customizadas

- Evite sobrescrever configurações rigorosas
- Documente mudanças específicas
- Teste adequadamente antes de aplicar

## 🔗 Integração

Este package é utilizado por:

- **Apps Angular**: `shell`, `dashboard`, `transactions`, `settings`
- **Bibliotecas**: `@bytebank-pro/ui`, `@bytebank-pro/types`
- **Packages**: `@bytebank-pro/shared-design-tokens`

## 📚 Referências

- [TypeScript Configuration](https://www.typescriptlang.org/tsconfig)
- [Angular TypeScript Configuration](https://angular.dev/reference/configs/angular-compiler-options)
- [TypeScript Compiler Options](https://www.typescriptlang.org/tsconfig#compilerOptions)
