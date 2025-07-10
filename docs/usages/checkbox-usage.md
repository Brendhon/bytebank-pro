# Como utilizar o Checkbox do ByteBank Pro

O componente `bb-checkbox` é um controle de formulário versátil que permite aos usuários fazer uma seleção binária. Ele segue as diretrizes de design e acessibilidade do ByteBank Pro, oferecendo uma API moderna e flexível baseada em Signals.

## Importação

O `CheckboxComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { CheckboxComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [CheckboxComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

O uso mais simples do checkbox requer apenas o seletor `bb-checkbox`. O estado é controlado pelas propriedades `checked` e `checkedChange`.

```html
<bb-checkbox [checked]="isConfirmed" (checkedChange)="isConfirmed = $event" />
```

## Estados

### Indeterminado

Para cenários como uma seleção "selecionar todos", você pode usar o estado `indeterminate`.

```html
<bb-checkbox [indeterminate]="true" />
```

### Desabilitado e Somente Leitura

Você pode desabilitar o checkbox para impedir a interação do usuário ou torná-lo somente leitura.

```html
<!-- Desabilitado -->
<bb-checkbox [disabled]="true" [checked]="true" />

<!-- Somente Leitura -->
<bb-checkbox [readonly]="true" [checked]="false" />
```

## Variantes

O checkbox suporta múltiplas variantes de cor para refletir diferentes estados, como sucesso ou erro.

```html
<bb-checkbox variant="default" [checked]="true" />
<bb-checkbox variant="success" [checked]="true" />
<bb-checkbox variant="error" [checked]="true" />
<bb-checkbox variant="warning" [checked]="true" />
```

## Tamanhos

O componente está disponível em três tamanhos: `sm`, `md` (padrão), e `lg`.

```html
<bb-checkbox size="sm" [checked]="true" />
<bb-checkbox size="md" [checked]="true" />
<bb-checkbox size="lg" [checked]="true" />
```

## Labels e Textos de Ajuda

Para uma melhor experiência do usuário, associe um `label` e, opcionalmente, um `helperText`.

```html
<bb-checkbox
  label="Aceito os termos de serviço"
  helperText="Leia os termos antes de aceitar."
  [checked]="termsAccepted"
  (checkedChange)="termsAccepted = $event"
/>
```

### Mensagens de Erro e Sucesso

Exiba mensagens de validação diretamente com o componente.

```html
<!-- Estado de Erro -->
<bb-checkbox
  variant="error"
  label="É necessário aceitar a política de privacidade"
  errorMessage="Este campo é obrigatório."
  [checked]="false"
/>

<!-- Estado de Sucesso -->
<bb-checkbox
  variant="success"
  label="Política de privacidade aceita"
  successMessage="Tudo certo!"
  [checked]="true"
/>
```

## Acessibilidade

O componente `bb-checkbox` é construído com acessibilidade em mente. Ele gerencia automaticamente os atributos ARIA, como `aria-checked`, `aria-disabled`, e `aria-invalid`.

Para cenários mais complexos, você pode usar as seguintes propriedades:

- `ariaLabel`: Fornece uma etiqueta acessível quando um `label` visual não está presente.
- `ariaLabelledBy`: Associa o checkbox a um elemento de label externo.
- `ariaDescribedBy`: Associa o checkbox a elementos descritivos.

```html
<span id="external-label">Notificações por E-mail</span>
<bb-checkbox ariaLabelledBy="external-label" />
```

## API de Propriedades

### Inputs

| Propriedade       | Tipo (`input()`)  | Padrão      | Descrição                                                            |
| ----------------- | ----------------- | ----------- | -------------------------------------------------------------------- |
| `checked`         | `boolean`         | `false`     | Controla o estado de seleção do checkbox.                            |
| `indeterminate`   | `boolean`         | `false`     | Define o estado como indeterminado.                                  |
| `variant`         | `CheckboxVariant` | `'default'` | A variante de cor: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`            | `CheckboxSize`    | `'md'`      | O tamanho: `'sm'`, `'md'`, `'lg'`.                                   |
| `disabled`        | `boolean`         | `false`     | Desabilita o checkbox.                                               |
| `readonly`        | `boolean`         | `false`     | Torna o checkbox somente leitura.                                    |
| `required`        | `boolean`         | `false`     | Define o checkbox como obrigatório (para acessibilidade).            |
| `label`           | `string`          | `undefined` | O texto do label associado.                                          |
| `helperText`      | `string`          | `undefined` | Texto de ajuda exibido abaixo do label.                              |
| `errorMessage`    | `string`          | `undefined` | Mensagem de erro (visível quando `variant` é `'error'`).             |
| `successMessage`  | `string`          | `undefined` | Mensagem de sucesso (visível quando `variant` é `'success'`).        |
| `className`       | `string`          | `''`        | Classes CSS adicionais para o container.                             |
| `ariaLabel`       | `string`          | `undefined` | Etiqueta acessível para leitores de tela.                            |
| `ariaLabelledBy`  | `string`          | `undefined` | ID do elemento que rotula o checkbox.                                |
| `ariaDescribedBy` | `string`          | `undefined` | ID do elemento que descreve o checkbox.                              |
| `ariaInvalid`     | `boolean`         | `undefined` | Define o estado `aria-invalid`.                                      |
| `ariaRequired`    | `boolean`         | `undefined` | Define o estado `aria-required`.                                     |

### Outputs

| Propriedade       | Tipo (`output()`) | Descrição                                           |
| ----------------- | ----------------- | --------------------------------------------------- |
| `checkedChange`   | `boolean`         | Emitido quando o estado de `checked` muda.          |
| `checkboxFocus`   | `FocusEvent`      | Emitido quando o checkbox recebe foco.              |
| `checkboxBlur`    | `FocusEvent`      | Emitido quando o checkbox perde o foco.             |
| `checkboxKeydown` | `KeyboardEvent`   | Emitido quando uma tecla é pressionada no checkbox. |
