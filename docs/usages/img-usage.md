# Como utilizar o Img do ByteBank Pro

O componente `bb-img` é responsável por renderizar imagens, sejam elas SVGs dos assets compartilhados ou imagens de fontes externas. Ele gerencia estados de carregamento e erro, e segue as melhores práticas de acessibilidade.

## Importação

O `ImgComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { ImgComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [ImgComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Para usar o componente, forneça o caminho do asset ou a URL da imagem na propriedade `src` e um texto alternativo em `alt`.

```html
<!-- Imagem dos assets compartilhados -->
<bb-img src="logo/bytebank.svg" alt="Logo do ByteBank" />

<!-- Imagem de uma URL externa -->
<bb-img src="https://picsum.photos/200" alt="Imagem aleatória" />
```

## Tamanhos

O componente oferece vários tamanhos predefinidos para padronização.

```html
<bb-img src="logo/bytebank.svg" alt="Logo" size="sm" />
<bb-img src="logo/bytebank.svg" alt="Logo" size="md" />
<bb-img src="logo/bytebank.svg" alt="Logo" size="lg" />
```

## Acessibilidade

### Imagens Decorativas

Se a imagem for puramente decorativa e não transmitir nenhuma informação importante, use a propriedade `isDecorative` para escondê-la de leitores de tela.

```html
<bb-img src="icons/background-pattern.svg" [isDecorative]="true" />
```

Isso aplicará `aria-hidden="true"` e um `alt` vazio.

### Estados de Carregamento e Erro

O componente gerencia automaticamente os estados de carregamento e erro, exibindo ícones e textos apropriados para leitores de tela.

- Durante o carregamento, `aria-busy="true"` é definido.
- Em caso de erro, um ícone de erro é exibido e o `alt` é atualizado para o texto de erro.

## API de Propriedades

### Inputs

| Propriedade    | Tipo (`input()`) | Obrigatório | Padrão                      | Descrição                                                                       |
| -------------- | ---------------- | ----------- | --------------------------- | ------------------------------------------------------------------------------- |
| `src`          | `string`         | Sim         | -                           | O caminho do asset (ex: `logo/bytebank.svg`) ou a URL da imagem.                |
| `alt`          | `string`         | Não         | `''`                        | O texto alternativo para a imagem. Obrigatório se `isDecorative` for `false`.   |
| `size`         | `ImgSize`        | Não         | `'md'`                      | O tamanho da imagem: `'xs'`, `'xsl'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'full'`. |
| `className`    | `string`         | Não         | `''`                        | Classes CSS adicionais para o elemento da imagem.                               |
| `isDecorative` | `boolean`        | Não         | `false`                     | Indica se a imagem é decorativa, escondendo-a de leitores de tela.              |
| `loadingText`  | `string`         | Não         | `'Carregando imagem...'`    | Texto para leitores de tela durante o carregamento.                             |
| `errorText`    | `string`         | Não         | `'Erro ao carregar imagem'` | Texto para leitores de tela quando a imagem falha ao carregar.                  |
