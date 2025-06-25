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

### ♿ Acessibilidade (A11y)

Este package inclui configurações rigorosas de acessibilidade para garantir que todas as aplicações do ByteBank Pro sejam inclusivas e seguem as diretrizes WCAG:

#### Regras de Acessibilidade Ativas:

- **`alt-text`**: Força a inclusão de texto alternativo em imagens
- **`elements-content`**: Garante que elementos interativos tenham conteúdo acessível
- **`label-has-associated-control`**: Valida associação correta entre labels e controles
- **`table-scope`**: Força uso correto de scope em tabelas
- **`valid-aria`**: Valida atributos ARIA válidos
- **`click-events-have-key-events`**: Garante que eventos de click tenham equivalentes de teclado
- **`mouse-events-have-key-events`**: Assegura que eventos de mouse tenham alternativas de teclado
- **`no-autofocus`**: Avisa sobre uso de autofocus (pode ser prejudicial para screen readers)
- **`no-distracting-elements`**: Impede uso de elementos que podem causar distração
- **`role-has-required-aria`**: Valida que roles ARIA tenham os atributos obrigatórios
- **`interactive-supports-focus`**: Garante que elementos interativos sejam focáveis
- **`no-positive-tabindex`**: Impede uso de tabindex positivo

#### Benefícios:

- **Conformidade WCAG**: Ajuda a cumprir diretrizes de acessibilidade web
- **Experiência Inclusiva**: Garante que usuários com deficiências possam usar a aplicação
- **Melhores Práticas**: Força o desenvolvimento pensando em acessibilidade desde o início
- **Qualidade de Código**: Melhora a semântica e estrutura do HTML

#### Exemplo de Uso:

```html
<!-- ❌ Erro: Imagem sem alt -->
<img src="logo.png" />

<!-- ✅ Correto: Imagem com alt text -->
<img src="logo.png" alt="Logo do ByteBank Pro" />

<!-- ❌ Erro: Botão sem conteúdo acessível -->
<button (click)="save()"></button>

<!-- ✅ Correto: Botão com conteúdo -->
<button (click)="save()">Salvar</button>

<!-- ❌ Erro: Click sem evento de teclado -->
<div (click)="toggle()">Toggle</div>

<!-- ✅ Correto: Click com evento de teclado -->
<div
  (click)="toggle()"
  (keydown.enter)="toggle()"
  (keydown.space)="toggle()"
  role="button"
  tabindex="0"
>
  Toggle
</div>
```

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

### 🧪 Testando Regras de Acessibilidade

Para verificar se suas mudanças estão seguindo as regras de acessibilidade:

```bash
# Execute o lint em um projeto Angular
npx eslint src/**/*.html --config eslint.config.mjs

# Para corrigir automaticamente problemas simples
npx eslint src/**/*.html --config eslint.config.mjs --fix
```

### 📋 Checklist de Acessibilidade

Antes de fazer commit, verifique:

- [ ] Todas as imagens têm texto alternativo apropriado
- [ ] Formulários têm labels associados corretamente
- [ ] Elementos interativos são acessíveis via teclado
- [ ] Uso correto de roles e atributos ARIA
- [ ] Elementos de foco estão visíveis e funcionais
- [ ] Contraste de cores adequado (verificar no design)

## 📚 Referências

- [Angular ESLint](https://github.com/angular-eslint/angular-eslint)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [ESLint](https://eslint.org/)
- [Guia Detalhado de Acessibilidade](./ACCESSIBILITY.md) 📋
