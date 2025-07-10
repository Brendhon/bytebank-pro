# Como utilizar o Logo do ByteBank Pro

O componente `bb-logo` é usado para exibir o logotipo do ByteBank Pro. Ele pode renderizar a versão completa do logo ou apenas o ícone, com tamanhos e classes personalizáveis.

## Importação

O `LogoComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { LogoComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [LogoComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

Por padrão, o componente renderiza o logo completo no tamanho médio.

```html
<bb-logo />
```

## Variantes

Existem duas variantes: `full` (padrão) e `icon`.

```html
<!-- Logo completo -->
<bb-logo variant="full" />

<!-- Apenas o ícone -->
<bb-logo variant="icon" />
```

## Tamanhos

O logo está disponível em vários tamanhos predefinidos.

```html
<bb-logo size="sm" />
<bb-logo size="md" />
<bb-logo size="lg" />
```

## Acessibilidade

O componente gera automaticamente um texto alternativo descritivo. Se o logo for puramente decorativo, use a propriedade `isDecorative`.

```html
<bb-logo [isDecorative]="true" />
```

Você também pode fornecer um `ariaLabel` personalizado para o ícone.

```html
<bb-logo variant="icon" ariaLabel="Ir para a página inicial" />
```

## API de Propriedades

### Inputs

| Propriedade    | Tipo (`input()`) | Padrão      | Descrição                                                                     |
| -------------- | ---------------- | ----------- | ----------------------------------------------------------------------------- |
| `variant`      | `LogoVariant`    | `'full'`    | A variante do logo: `'full'` ou `'icon'`.                                     |
| `size`         | `ImgSize`        | `'md'`      | O tamanho do logo: `'xs'`, `'xsl'`, `'sm'`, `'md'`, `'lg'`, `'xl'`, `'full'`. |
| `className`    | `string`         | `''`        | Classes CSS adicionais para o elemento do logo.                               |
| `ariaLabel`    | `string`         | `undefined` | Um `aria-label` personalizado.                                                |
| `isDecorative` | `boolean`        | `false`     | Indica se o logo é decorativo, escondendo-o de leitores de tela.              |
