# @bytebank-pro/ui

Uma biblioteca de componentes Angular 20+ para o projeto ByteBank Pro, otimizada para uso com TailwindCSS.

## Instalação

```bash
npm install @bytebank-pro/ui
```

## Uso

Para usar os componentes, importe os componentes standalone diretamente:

```typescript
// OU importando um componente standalone
import { ButtonComponent } from '@bytebank-pro/ui/button';

@Component({
  // ...
  imports: [ButtonComponent],
  // ...
})
export class YourComponent {}
```

## Componentes

### Button

```html
<bb-button variant="primary" size="md" (btnClick)="handleClick()">
  Clique aqui
</bb-button>
```

#### Propriedades

| Nome | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'link' \| 'destructive' | 'primary' | Define o estilo visual do botão |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Define o tamanho do botão |
| disabled | boolean | false | Define se o botão está desabilitado |
| loading | boolean | false | Define se o botão está em estado de carregamento |
| fullWidth | boolean | false | Define se o botão ocupará 100% da largura do container |

#### Eventos

| Nome | Descrição |
|------|-----------|
| btnClick | Emitido ao clicar no botão (não é emitido se o botão estiver desabilitado ou em carregamento) |
