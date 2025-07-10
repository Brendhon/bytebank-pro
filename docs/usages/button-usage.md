# Como utilizar o Button do ByteBank Pro

O componente `bb-button` é um botão interativo que pode ser usado para ações em formulários, diálogos e outros elementos da interface. Ele oferece diversas variantes de estilo, tamanhos e estados, como carregamento e desabilitado.

## Importação

O `ButtonComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { ButtonComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [ButtonComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

O uso mais simples do botão envolve o seletor `bb-button` e o evento `(buttonClick)`.

```html
<bb-button (buttonClick)="onSave()">Salvar</bb-button>
```

## Variantes

O botão possui várias variantes de cor para diferentes contextos semânticos.

```html
<bb-button variant="blue">Padrão (Azul)</bb-button>
<bb-button variant="dark">Escuro</bb-button>
<bb-button variant="green">Verde</bb-button>
<bb-button variant="orange">Laranja</bb-button>
<bb-button variant="outlineGreen">Contorno Verde</bb-button>
<bb-button variant="outlineOrange">Contorno Laranja</bb-button>
```

## Tamanhos

O componente está disponível em três tamanhos: `sm`, `md` (padrão), e `lg`.

```html
<bb-button size="sm">Pequeno</bb-button>
<bb-button size="md">Médio</bb-button>
<bb-button size="lg">Grande</bb-button>
```

## Estados

### Carregando (Loading)

Use a propriedade `loading` para indicar uma ação em andamento. O botão ficará desabilitado e exibirá um ícone de carregamento.

```html
<bb-button [loading]="isSubmitting" loadingText="Salvando...">Salvar</bb-button>
```

### Desabilitado

Use a propriedade `disabled` para desativar o botão.

```html
<bb-button [disabled]="form.invalid">Enviar</bb-button>
```

## Acessibilidade

O `bb-button` é construído com acessibilidade em mente. Para fornecer uma experiência melhor para usuários de leitores de tela, use `ariaLabel` quando o botão não tiver um texto descritivo (por exemplo, um botão de ícone).

```html
<bb-button ariaLabel="Fechar diálogo">
  <!-- Ícone de fechar -->
</bb-button>
```

## API de Propriedades

### Inputs

| Propriedade   | Tipo (`input()`) | Padrão         | Descrição                                            |
| ------------- | ---------------- | -------------- | ---------------------------------------------------- |
| `type`        | `ButtonType`     | `'button'`     | O tipo do botão (`'button'`, `'submit'`, `'reset'`). |
| `variant`     | `ButtonVariant`  | `'blue'`       | A variante de cor do botão.                          |
| `size`        | `ButtonSize`     | `'md'`         | O tamanho do botão: `'sm'`, `'md'`, `'lg'`.          |
| `loading`     | `boolean`        | `false`        | Exibe o estado de carregamento.                      |
| `disabled`    | `boolean`        | `false`        | Desabilita o botão.                                  |
| `loadingText` | `string`         | `'Loading...'` | Texto para leitores de tela durante o carregamento.  |
| `className`   | `string`         | `''`           | Classes CSS adicionais para o botão.                 |
| `ariaLabel`   | `string`         | `undefined`    | Etiqueta acessível para o botão.                     |

### Outputs

| Propriedade   | Tipo (`output()`) | Descrição                         |
| ------------- | ----------------- | --------------------------------- |
| `buttonClick` | `Event`           | Emitido quando o botão é clicado. |
