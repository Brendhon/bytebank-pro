# Como utilizar o Paginator do ByteBank Pro

O componente `bb-paginator` é usado para navegação entre páginas de conteúdo. Ele exibe os números das páginas, incluindo elipses (`...`) para um grande número de páginas, e setas de navegação.

## Importação

O `PaginatorComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { PaginatorComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [PaginatorComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Para usar o paginador, você precisa fornecer a página atual (`currentPage`), o total de páginas (`totalPages`), e escutar o evento `onPageChange` para atualizar a página.

```typescript
// no seu componente.ts
currentPage = 1;
totalPages = 10;

handlePageChange(page: number) {
  this.currentPage = page;
  // Lógica para buscar os dados da nova página
}
```

```html
<bb-paginator
  [currentPage]="currentPage"
  [totalPages]="totalPages"
  (onPageChange)="handlePageChange($event)"
/>
```

## Integração com a Tabela Genérica

Normalmente, o `bb-paginator` é usado internamente pelo `bb-generic-table`. Você não precisa usá-lo diretamente ao trabalhar com a tabela, basta fornecer a propriedade `pageSize` para a tabela.

No entanto, se você precisar de um paginador desacoplado, o uso acima é o recomendado.

## Comportamento

- O paginador exibe os números de página e elipses de forma inteligente para economizar espaço.
- As setas de navegação permitem ir para a página anterior ou seguinte.
- Os botões são desabilitados apropriadamente quando se está na primeira ou na última página.

## API de Propriedades

### Inputs

| Propriedade   | Tipo (`input()`) | Obrigatório | Descrição                              |
| ------------- | ---------------- | ----------- | -------------------------------------- |
| `currentPage` | `number`         | Sim         | O número da página ativa.              |
| `totalPages`  | `number`         | Sim         | O número total de páginas disponíveis. |

### Outputs

| Propriedade    | Tipo (`output()`) | Descrição                                                    |
| -------------- | ----------------- | ------------------------------------------------------------ |
| `onPageChange` | `number`          | Emitido quando a página muda. Emite o novo número da página. |
