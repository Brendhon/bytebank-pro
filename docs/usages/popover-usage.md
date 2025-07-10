# Como utilizar o Popover do ByteBank Pro

O componente `bb-popover` é usado para exibir conteúdo flutuante em relação a um elemento gatilho. É ideal para menus, informações contextuais ou ações secundárias.

## Importação

O `PopoverComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { PopoverComponent } from '@bytebank-pro/ui/ui/popover';

@Component({
  standalone: true,
  imports: [PopoverComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

O popover utiliza projeção de conteúdo com `slot` para o gatilho (`trigger`) e o conteúdo (`content`). O estado de visibilidade é controlado por `isOpen` e `openChange`.

```typescript
// no seu componente.ts
isPopoverOpen = false;

handleOpenChange(isOpen: boolean) {
  this.isPopoverOpen = isOpen;
}
```

```html
<bb-popover [isOpen]="isPopoverOpen" (openChange)="handleOpenChange($event)">
  <button slot="trigger">Abrir Popover</button>

  <div slot="content" class="p-4">
    <p>Este é o conteúdo do popover.</p>
  </div>
</bb-popover>
```

## Posições

Você pode controlar a posição do popover em relação ao gatilho com a propriedade `position`.

```html
<bb-popover position="top-start"> ... </bb-popover>
<bb-popover position="bottom-end"> ... </bb-popover>
```

As posições disponíveis são: `top`, `bottom`, `left`, `right`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.

## Fechamento Automático

O popover pode ser configurado para fechar automaticamente:

- **Ao clicar fora:** `[closeOnClickOutside]="true"` (padrão)
- **Ao pressionar a tecla Escape:** `[closeOnEscape]="true"` (padrão)

## Acessibilidade

O `bb-popover` gerencia atributos ARIA como `aria-haspopup` e `aria-expanded`. O foco é gerenciado para garantir uma experiência de teclado coesa.

## API de Propriedades

### Inputs

| Propriedade           | Tipo (`input()`)  | Padrão           | Descrição                                                       |
| --------------------- | ----------------- | ---------------- | --------------------------------------------------------------- |
| `isOpen`              | `boolean`         | `false`          | Controla a visibilidade do popover.                             |
| `position`            | `PopoverPosition` | `'bottom-start'` | A posição do popover em relação ao gatilho.                     |
| `offset`              | `number`          | `8`              | A distância em pixels entre o popover e o gatilho.              |
| `disabled`            | `boolean`         | `false`          | Desabilita o popover, impedindo que ele seja aberto.            |
| `closeOnClickOutside` | `boolean`         | `true`           | Fecha o popover ao clicar fora dele.                            |
| `closeOnEscape`       | `boolean`         | `true`           | Fecha o popover ao pressionar a tecla Escape.                   |
| `popoverClass`        | `string`          | `''`             | Classes CSS adicionais para o container do conteúdo do popover. |

### Outputs

| Propriedade  | Tipo (`output()`) | Descrição                                     |
| ------------ | ----------------- | --------------------------------------------- |
| `openChange` | `boolean`         | Emitido quando o estado de visibilidade muda. |
| `opened`     | `void`            | Emitido quando o popover é aberto.            |
| `closed`     | `void`            | Emitido quando o popover é fechado.           |
