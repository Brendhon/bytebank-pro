# @bytebank-pro/eslint-config

📦 **Coleção de configurações ESLint padronizadas para o monorepo ByteBank Pro**

Este package fornece configurações ESLint reutilizáveis e padronizadas para todos os projetos Angular e bibliotecas do monorepo ByteBank Pro.

## 🎯 Objetivo

Centralizar e padronizar as regras de linting em todos os projetos do monorepo, garantindo:

- Consistência de código entre diferentes aplicações
- Melhor manutenibilidade
- Redução de bugs e problemas de qualidade
- Conformidade com as melhores práticas do Angular e TypeScript

## 📋 Configurações Disponíveis

### Angular (`./angular`)

Configuração específica para projetos Angular, incluindo:

- Regras do `@angular-eslint`
- Linting para templates Angular
- Configurações específicas para TypeScript com Angular
- Regras de acessibilidade e performance

### Library (`./library`)

Configuração para bibliotecas e packages do monorepo:

- Regras básicas do TypeScript
- Configurações para desenvolvimento de bibliotecas
- Otimizações para código reutilizável

## 🚀 Como Usar

### Em projetos Angular

1. Instale o package (se não estiver instalado):

```bash
npm install @bytebank-pro/eslint-config --save-dev
```

2. Configure o `eslint.config.mjs`:

```javascript
import angular from '@bytebank-pro/eslint-config/angular';

export default [
  ...angular
  // suas configurações específicas aqui
];
```

### Em bibliotecas/packages

1. Configure o `eslint.config.js`:

```javascript
import library from '@bytebank-pro/eslint-config/library';

export default [
  ...library
  // suas configurações específicas aqui
];
```

## 🔧 Regras Principais

- **TypeScript**: Regras rigorosas para tipagem e qualidade de código
- **Angular**: Conformidade com o Angular Style Guide
- **Templates**: Linting para templates Angular com foco em acessibilidade
- **Import/Export**: Organização consistente de imports
- **Naming**: Convenções de nomenclatura padronizadas

## 📦 Dependências

- `@angular-eslint/eslint-plugin`
- `@angular-eslint/eslint-plugin-template`
- `@angular-eslint/template-parser`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `eslint`

## 🛠️ Desenvolvimento

Para contribuir com este package:

1. Edite os arquivos de configuração (`angular.js`, `library.js`)
2. Teste as mudanças nos projetos que utilizam essas configurações
3. Documente quaisquer mudanças significativas

## 📚 Referências

- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint](https://eslint.org/)
