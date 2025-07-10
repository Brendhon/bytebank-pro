# Como utilizar o Select do ByteBank Pro

O componente `bb-select` é um controle de formulário avançado e performático para seleção de opções, construído com as mais recentes práticas do Angular, incluindo Signals para um gerenciamento de estado reativo e eficiente.

## Importação

O `SelectComponent` é standalone, permitindo sua importação direta no seu componente:

```typescript
import { SelectComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [SelectComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Para o uso básico, forneça uma lista de `options` e controle o valor selecionado com `value` e `valueChange`.

```typescript
// no seu componente.ts
options = [
  { value: '1', label: 'Conta Corrente' },
  { value: '2', label: 'Conta Poupança' },
  { value: '3', label: 'Conta Investimento' }
];
selectedValue = '1';
```

```html
<bb-select
  [options]="options"
  [value]="selectedValue"
  (valueChange)="selectedValue = $event"
  placeholder="Selecione um tipo de conta"
/>
```

## Seleção Múltipla

Habilite a seleção múltipla com a propriedade `multiple`. O valor será um array.

```html
<bb-select [options]="options" [multiple]="true" [(value)]="selectedValues" />
```

## Pesquisa e Limpeza

Torne o select pesquisável com `searchable` e permita limpar a seleção com `clearable`.

```html
<bb-select
  [options]="options"
  [searchable]="true"
  [clearable]="true"
  [(value)]="selectedValue"
  searchPlaceholder="Pesquisar por produto..."
/>
```

## Variantes e Tamanhos

O componente suporta variantes de cor e tamanhos para se adaptar a diferentes contextos de UI.

```html
<!-- Variantes -->
<bb-select variant="success" [options]="options" />
<bb-select variant="error" [options]="options" />

<!-- Tamanhos -->
<bb-select size="sm" [options]="options" />
<bb-select size="lg" [options]="options" />
```

## Labels e Textos de Ajuda

Forneça contexto adicional com `label`, `helperText`, e mensagens de validação.

```html
<bb-select label="Categoria" helperText="Escolha a categoria do lançamento." [options]="options" />

<!-- Com mensagem de erro -->
<bb-select
  variant="error"
  label="Categoria"
  errorMessage="Este campo é obrigatório."
  [options]="options"
/>
```

## Estado de Carregamento

Indique que as opções estão sendo carregadas com a propriedade `loading`.

```html
<bb-select [loading]="true" placeholder="Carregando dados..." />
```

## Opções Agrupadas

Para uma organização mais clara, você pode agrupar as opções utilizando a propriedade `groups`.

```typescript
// no seu componente.ts
groupedOptions = [
  {
    label: 'Contas',
    options: [
      { value: '1', label: 'Conta Corrente' },
      { value: '2', label: 'Conta Poupança' }
    ]
  },
  {
    label: 'Investimentos',
    options: [{ value: '3', label: 'Ações' }]
  }
];
```

```html
<bb-select [groups]="groupedOptions" [(value)]="selectedValue" />
```

## Acessibilidade

O `bb-select` é projetado para ser acessível, gerenciando atributos ARIA como `aria-expanded` e `role="combobox"`. Para cenários personalizados, utilize `ariaLabel`, `ariaLabelledBy`, e `ariaDescribedBy`.

## API de Propriedades

### Inputs

| Propriedade         | Tipo (`input()`)    | Padrão               | Descrição                                                            |
| ------------------- | ------------------- | -------------------- | -------------------------------------------------------------------- | -------------------------------- |
| `value`             | `T                  | T[]`                 | `undefined`                                                          | O valor ou valores selecionados. |
| `options`           | `SelectOption<T>[]` | `[]`                 | A lista de opções para o select.                                     |
| `groups`            | `SelectGroup[]`     | `undefined`          | A lista de grupos de opções.                                         |
| `multiple`          | `boolean`           | `false`              | Permite a seleção de múltiplos valores.                              |
| `searchable`        | `boolean`           | `false`              | Habilita a funcionalidade de pesquisa.                               |
| `clearable`         | `boolean`           | `false`              | Exibe um botão para limpar a seleção.                                |
| `variant`           | `SelectVariant`     | `'default'`          | A variante de cor: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`              | `SelectSize`        | `'md'`               | O tamanho: `'sm'`, `'md'`, `'lg'`.                                   |
| `disabled`          | `boolean`           | `false`              | Desabilita o select.                                                 |
| `readonly`          | `boolean`           | `false`              | Torna o select somente leitura.                                      |
| `loading`           | `boolean`           | `false`              | Exibe um indicador de carregamento.                                  |
| `placeholder`       | `string`            | `'Select an option'` | O texto exibido quando nenhum valor é selecionado.                   |
| `searchPlaceholder` | `string`            | `'Search...'`        | O placeholder para o campo de pesquisa.                              |
| `noResultsText`     | `string`            | `'No results found'` | Texto exibido quando a pesquisa não retorna resultados.              |
| `label`             | `string`            | `undefined`          | O texto do label associado.                                          |
| `helperText`        | `string`            | `undefined`          | Texto de ajuda exibido abaixo do select.                             |
| `errorMessage`      | `string`            | `undefined`          | Mensagem de erro (visível quando `variant` é `'error'`).             |

### Outputs

| Propriedade     | Tipo (`output()`) | Descrição                                               |
| --------------- | ----------------- | ------------------------------------------------------- | ---------------------------------------- |
| `valueChange`   | `T                | T[]`                                                    | Emitido quando o valor selecionado muda. |
| `searchChange`  | `string`          | Emitido quando o termo de pesquisa muda (com debounce). |
| `optionSelect`  | `SelectOption<T>` | Emitido quando uma opção é selecionada.                 |
| `dropdownOpen`  | `void`            | Emitido quando o dropdown é aberto.                     |
| `dropdownClose` | `void`            | Emitido quando o dropdown é fechado.                    |
