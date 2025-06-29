# @bytebank-pro/utils

🔷 **Funções auxiliares compartilhadas para o monorepo ByteBank Pro**

Este package centraliza todas as funções utilitárias que serão reutilizadas em todo o projeto, garantindo consistência e redução de duplicação em diferentes microfrontends e serviços.

## 🎯 Objetivo

Fornecer funções auxiliares para:

- Formatação de dados e strings
- Validações comuns
- Manipulação de datas
- Outras utilidades gerais para o projeto

## 📦 Estrutura

```
packages/utils/
├── index.ts            # Todas as funções utilitárias e exportações
├── package.json        # Configurações do package
├── tsconfig.json       # Configuração TypeScript
└── dist/               # Arquivos compilados (gerados)
    ├── index.js
    └── index.d.ts
```

## 🔷 Funções Disponíveis

### Formatação de Datas

```typescript
// Formata data para formato longo: 'quinta-feira, 18/04/2025'
export const formatDateToLong = (date: Date): string

// Formata data para formato curto: '18/04/2025'
export const formatDateToShort = (date: Date): string
```

### Formatação Monetária

```typescript
// Formata valor monetário no padrão brasileiro (R$)
export const formatCurrency = (value: number): string
```

### Utilitários Gerais

```typescript
// Verifica se um valor é um número válido
export const isNumber = (value: any): value is number

// Converte string 'dd/mm/yyyy' para objeto Date
export const parseDate = (dateStr: string): Date

// Ordena array de objetos por propriedade de data
export const sortByDate = <T>(arr: T[], dateKey: keyof T): T[]

// Remove campos vazios de um objeto
export const removeEmptyFields = <T>(obj: T): Partial<T>
```

## 🚀 Como Usar

### Instalação

O package já está disponível em todo o monorepo via workspace:

```bash
npm install @bytebank-pro/utils
```

### Importação

```typescript
// Importações específicas
import { formatCurrency, formatDateToLong, isNumber } from '@bytebank-pro/utils';

// Importação geral
import * as ByteBankUtils from '@bytebank-pro/utils';

// Exemplos de uso
const formatted = formatCurrency(2500); // R$ 2.500,00
const dateFormatted = formatDateToLong(new Date()); // quinta-feira, 27/06/2025
const isValidNumber = isNumber(42); // true
```

### Em Componentes Angular

```typescript
import { Component } from '@angular/core';
import { formatCurrency, formatDateToShort } from '@bytebank-pro/utils';

@Component({
  selector: 'bb-dashboard',
  template: `
    <p>Saldo: {{ formattedValue }}</p>
    <p>Data: {{ formattedDate }}</p>
  `
})
export class DashboardComponent {
  formattedValue = formatCurrency(1000); // R$ 1.000,00
  formattedDate = formatDateToShort(new Date()); // 27/06/2025
}
```

### Em Serviços

```typescript
import { Injectable } from '@angular/core';
import { formatCurrency, sortByDate, removeEmptyFields } from '@bytebank-pro/utils';

@Injectable()
export class FinanceService {
  getFormattedRevenue(revenue: number): string {
    return formatCurrency(revenue);
  }

  sortTransactionsByDate(transactions: any[]) {
    return sortByDate(transactions, 'date');
  }

  cleanFormData(formData: any) {
    return removeEmptyFields(formData);
  }
}
```

## 🛠️ Scripts Disponíveis

```bash
# Build dos utilitários
npm run build

# Desenvolvimento com watch
npm run dev

# Executar testes unitários
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:coverage

# Limpeza dos arquivos gerados
npm run clean
```

## 📝 Desenvolvimento

### Adicionando Novas Funções

1. **Edite o arquivo `index.ts`** na raiz do projeto.
2. **Implemente as funções** seguindo os padrões existentes com JSDoc.
3. **Exporte as funções** diretamente no mesmo arquivo:

```typescript
// index.ts
/**
 * Descrição da nova função
 * @param param Parâmetro da função
 */
export const novaFuncao = (param: string): string => {
  // implementação
  return resultado;
};
```

### Convenções

- **Funções**: camelCase (ex: formatCurrency, isNumber)
- **Documentação**: Use JSDoc para todas as funções exportadas
- **Tipos**: Use TypeScript para garantir tipagem forte

## 🧪 Testes

O projeto inclui testes unitários para todas as funções utilitárias:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch (útil durante desenvolvimento)
npm run test:watch

# Executar testes com relatório de cobertura
npm run test:coverage
```

### Estrutura dos Testes

Os testes estão localizados em `index.spec.ts` e cobrem:

- ✅ Formatação de datas (longa e curta)
- ✅ Formatação monetária brasileira
- ✅ Validação de números
- ✅ Parse de datas em string
- ✅ Ordenação por data
- ✅ Remoção de campos vazios

### Executando Testes Específicos

```bash
# Executar apenas testes de formatação
npm test -- --testNamePattern="format"

# Executar com verbose para mais detalhes
npm test -- --verbose
```

## 🔗 Integração com Outros Packages

Este package é utilizado por:

- **Apps Angular** (ex.: shell, dashboard, transactions, settings)
- **Package UI** (`@bytebank-pro/ui`)
- **Bibliotecas de serviços** em cada microfrontend

## 📚 Dependências

- **date-fns**: Biblioteca para manipulação de datas
- **TypeScript**: Para tipagem estática e melhor desenvolvimento

## 📚 Referências

- [date-fns Documentation](https://date-fns.org/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Angular Documentation](https://angular.io/docs)
