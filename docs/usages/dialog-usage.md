# Como utilizar o Dialog do ByteBank Pro

O componente `bb-dialog` é uma janela modal que pode ser usada para exibir informações importantes, solicitar a entrada do usuário ou confirmar ações. Ele foi projetado com foco em acessibilidade, incluindo gerenciamento de foco, navegação por teclado e bloqueio de scroll da página.

## Importação

O `DialogComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { DialogComponent } from '@bytebank-pro/ui/ui/dialog';

@Component({
  standalone: true,
  imports: [DialogComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Para usar o diálogo, você precisa controlar seu estado de visibilidade com a propriedade `isOpen`. O conteúdo do diálogo é projetado usando `ng-content`.

```typescript
// no seu componente.ts
isDialogOpen = false;

openDialog() {
  this.isDialogOpen = true;
}

closeDialog() {
  this.isDialogOpen = false;
}
```

```html
<button (click)="openDialog()">Abrir Diálogo</button>

<bb-dialog [isOpen]="isDialogOpen" (close)="closeDialog()" title="Título do Diálogo">
  <p>Este é o conteúdo do diálogo.</p>
  <footer class="flex justify-end gap-2 mt-4">
    <bb-button variant="outlineGreen" (click)="closeDialog()">Cancelar</bb-button>
    <bb-button (click)="closeDialog()">Confirmar</bb-button>
  </footer>
</bb-dialog>
```

## Funcionalidades

### Fechamento

O diálogo pode ser fechado de várias maneiras, que podem ser configuradas:

- **Botão de Fechar:** Exibido por padrão no canto superior direito. Controle com `[showCloseButton]="false"`.
- **Clique no Backdrop:** Habilitado por padrão. Controle com `[closeOnBackdropClick]="false"`.
- **Tecla Escape:** Habilitada por padrão. Controle com `[closeOnEscape]="false"`.

### Largura Máxima

A largura máxima do diálogo pode ser ajustada com a propriedade `maxWidth`.

```html
<bb-dialog [isOpen]="true" maxWidth="48rem">...</bb-dialog>
```

## Acessibilidade

O `bb-dialog` implementa várias funcionalidades de acessibilidade automaticamente:

- **Gerenciamento de Foco:** O foco é movido para o diálogo quando ele abre e retorna ao elemento focado anteriormente quando fecha.
- **Trap de Foco:** O foco do teclado fica preso dentro do diálogo, impedindo a interação com o conteúdo da página por baixo.
- **ARIA Attributes:** Atributos como `aria-modal`, `aria-labelledby`, e `role="dialog"` são gerenciados automaticamente.
- **Bloqueio de Scroll:** O scroll da página principal é desabilitado enquanto o diálogo está aberto.

Para um controle mais fino, você pode usar a propriedade `ariaLabel` para descrever o propósito do diálogo.

## API de Propriedades

### Inputs

| Propriedade            | Tipo (`input()`) | Padrão    | Descrição                                                               |
| ---------------------- | ---------------- | --------- | ----------------------------------------------------------------------- |
| `isOpen`               | `boolean`        | `false`   | Controla a visibilidade do diálogo.                                     |
| `title`                | `string`         | `''`      | O título exibido no cabeçalho do diálogo.                               |
| `showCloseButton`      | `boolean`        | `true`    | Exibe o botão de fechar no canto superior direito.                      |
| `closeOnBackdropClick` | `boolean`        | `true`    | Fecha o diálogo ao clicar no backdrop (fundo).                          |
| `closeOnEscape`        | `boolean`        | `true`    | Fecha o diálogo ao pressionar a tecla Escape.                           |
| `maxWidth`             | `string`         | `'32rem'` | A largura máxima do diálogo (ex: '400px', '50rem').                     |
| `ariaLabel`            | `string`         | `''`      | Uma etiqueta ARIA para o diálogo, usada se o título não for suficiente. |

### Outputs

| Propriedade | Tipo (`output()`) | Descrição                                       |
| ----------- | ----------------- | ----------------------------------------------- |
| `close`     | `void`            | Emitido quando o diálogo solicita o fechamento. |
