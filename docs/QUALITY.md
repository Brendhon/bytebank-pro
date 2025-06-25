# 🔧 Configuração de Qualidade de Código

Este documento explica como o sistema de qualidade de código está configurado no projeto Bytebank Pro para garantir commits consistentes e código bem formatado.

## 🛠️ Ferramentas Configuradas

### 1. **Prettier** - Formatação de Código

- **Arquivo**: `.prettierrc` e `.prettierignore`
- **Função**: Formata automaticamente o código seguindo padrões definidos
- **Arquivos**: TypeScript, JavaScript, JSON, Markdown, HTML, CSS/SCSS

### 2. **ESLint** - Análise de Código

- **Arquivo**: Configurado via packages compartilhados
- **Função**: Identifica e corrige problemas de código, bugs potenciais e padrões não recomendados

### 3. **Husky** - Git Hooks

- **Diretório**: `.husky/`
- **Função**: Executa scripts automaticamente antes de commits e pushes

### 4. **lint-staged** - Execução Seletiva

- **Arquivo**: `.lintstagedrc.json`
- **Função**: Executa ferramentas apenas nos arquivos que foram modificados (staged)

### 5. **EditorConfig** - Padronização de Editor

- **Arquivo**: `.editorconfig`
- **Função**: Garante configurações consistentes entre diferentes editores/IDEs

## 🚀 Como Funciona

### Antes de Cada Commit (Pre-commit Hook)

Quando você executa `git commit`, automaticamente:

1. **lint-staged** é executado nos arquivos modificados:

   - **Prettier**: Formata arquivos TypeScript, JavaScript, JSON, Markdown, HTML, CSS
   - **ESLint**: Analisa e corrige problemas nos arquivos de código
   - **Git add**: Adiciona as correções ao commit

2. **Verificação de tipos**: Executa `npm run check-types` em todo o projeto

## 📝 Scripts Disponíveis

```bash
# Formatar todos os arquivos do projeto
npm run format

# Verificar se os arquivos estão formatados corretamente
npm run format:check

# Executar lint em todos os arquivos
npm run lint

# Executar lint e corrigir problemas automaticamente
npm run lint:fix

# Executar verificação de tipos
npm run check-types

# Executar lint-staged manualmente
npm run pre-commit
```

## 🎯 Exemplo de Workflow

### Cenário 1: Commit Normal

```bash
# 1. Você modifica arquivos
echo "const test = 'hello world'" > test.ts

# 2. Adiciona ao git
git add test.ts

# 3. Faz commit (hooks são executados automaticamente)
git commit -m "feat: adiciona arquivo de teste"

# ✅ Resultado:
# - Prettier formata o arquivo
# - ESLint verifica problemas
# - Verificação de tipos é executada
# - Commit é realizado se tudo estiver OK
```

### Cenário 2: Commit com Problemas

```bash
# 1. Arquivo com problemas de formatação/lint
git add arquivo-com-problemas.ts

# 2. Tenta fazer commit
git commit -m "fix: corrige bug"

# ❌ Resultado:
# - Prettier formata automaticamente
# - ESLint encontra e corrige problemas
# - Se houver erros críticos, commit é rejeitado
# - Você precisa revisar e tentar novamente
```

## 🔧 Configurações Detalhadas

### .lintstagedrc.json

```json
{
  "*.{ts,tsx,js,jsx}": ["prettier --write", "eslint --fix"],
  "*.{json,md,html,css,scss}": ["prettier --write"]
}
```

### .prettierrc

```json
{
  "singleQuote": true,
  "trailingComma": "none",
  "printWidth": 100
}
```

## 🚫 Bypass (Não Recomendado)

Em casos extremos, você pode pular os hooks:

```bash
# Pular pre-commit (não recomendado)
git commit --no-verify -m "emergency fix"
```

> ⚠️ **Aviso**: Use apenas em emergências. O código não verificado pode introduzir problemas.

## 🎨 Benefícios

✅ **Código Consistente**: Todos os desenvolvedores seguem o mesmo padrão
✅ **Menos Bugs**: ESLint identifica problemas antes do commit  
✅ **Reviews Mais Focados**: Não perde tempo discutindo formatação
✅ **Automático**: Funciona sem intervenção manual
✅ **Rápido**: Processa apenas arquivos modificados

## 🔍 Solução de Problemas

### Hook não está executando

```bash
# Reinstalar hooks
npx husky install
chmod +x .husky/pre-commit
```

### Problemas com Prettier

```bash
# Verificar arquivos que têm problemas
npm run format:check

# Corrigir automaticamente
npm run format
```

### Problemas com ESLint

```bash
# Ver problemas
npm run lint

# Corrigir automaticamente
npm run lint:fix
```

---

## 📚 Documentação Adicional

- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)
- [Husky](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [EditorConfig](https://editorconfig.org/)
