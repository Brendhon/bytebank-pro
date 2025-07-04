# 📋 @bytebank-pro/eslint-config

Este pacote fornece configurações ESLint reutilizáveis e padronizadas para todos os projetos Angular e bibliotecas do monorepo Bytebank Pro.

---

## 📝 Sumário

- [📋 @bytebank-pro/eslint-config](#-bytebank-proeslint-config)
  - [📝 Sumário](#-sumário)
  - [🎯 Objetivo](#-objetivo)
  - [📦 Configurações Disponíveis](#-configurações-disponíveis)
  - [🚀 Como Usar](#-como-usar)
  - [🔧 Regras Principais](#-regras-principais)
    - [♿ Acessibilidade (A11y)](#-acessibilidade-a11y)
  - [🛠️ Desenvolvimento](#️-desenvolvimento)
  - [🔗 Integração](#-integração)
  - [📚 Referências](#-referências)
  - [👥 Autor](#-autor)

---

## 🎯 Objetivo

Centralizar e padronizar as regras de linting para garantir consistência, manutenibilidade e qualidade de código em todo o monorepo, seguindo as melhores práticas de Angular, TypeScript e acessibilidade.

---

## 📦 Configurações Disponíveis

- **`angular`**: Configuração completa para aplicações Angular, incluindo regras para templates, TypeScript e acessibilidade.
- **`library`**: Configuração mais leve para bibliotecas e pacotes do monorepo.

---

## 🚀 Como Usar

Adicione a configuração desejada ao seu arquivo `eslint.config.js` ou `eslint.config.mjs`.

**Para Aplicações Angular:**

```javascript
import angular from '@bytebank-pro/eslint-config/angular';

export default [
  ...angular
  // Suas configurações específicas aqui
];
```

**Para Bibliotecas:**

```javascript
import library from '@bytebank-pro/eslint-config/library';

export default [
  ...library
  // Suas configurações específicas aqui
];
```

---

## 🔧 Regras Principais

- **TypeScript**: Regras rigorosas para tipagem e qualidade.
- **Angular**: Conformidade com o Angular Style Guide.
- **Templates**: Linting para templates com foco em acessibilidade e boas práticas.
- **Import/Export**: Organização consistente de imports.

### ♿ Acessibilidade (A11y)

As configurações incluem regras rigorosas de acessibilidade para garantir que as aplicações sejam inclusivas e sigam as diretrizes WCAG. As verificações incluem:

- `alt-text` para imagens.
- Associação de `label` com controles de formulário.
- Eventos de teclado para ações de clique.
- Uso correto de atributos ARIA.

---

## 🛠️ Desenvolvimento

Para contribuir, edite os arquivos de configuração (`angular.js`, `library.js`) e teste as mudanças nos projetos que as utilizam. Para verificar as regras de acessibilidade, execute:

```bash
# Analisar arquivos HTML em um projeto
npx eslint src/**/*.html --config eslint.config.mjs
```

---

## 🔗 Integração

Este pacote é uma dependência de desenvolvimento em todas as **aplicações** (`apps/*`) e **pacotes** (`packages/*`) que necessitam de linting, garantindo que todo o código do monorepo siga os mesmos padrões.

---

## 📚 Referências

- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint](https://eslint.org/)

---

## 👥 Autor

**Brendhon Moreira**

[LinkedIn](https://www.linkedin.com/in/brendhon-moreira) | [GitHub](https://github.com/Brendhon)