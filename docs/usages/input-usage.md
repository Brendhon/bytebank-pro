# Como utilizar o Input do ByteBank Pro

O componente `bb-input` é um campo de entrada de formulário que oferece uma ampla gama de funcionalidades, incluindo diferentes tipos, variantes, tamanhos e ícones, tudo em conformidade com as diretrizes de design e acessibilidade do ByteBank Pro.

## Importação

O `InputComponent` é standalone, então você pode importá-lo diretamente no seu componente:

```typescript
import { InputComponent } from '@bytebank-pro/ui';

@Component({
  standalone: true,
  imports: [InputComponent]
  // ...
})
export class MyComponent {}
```

## Uso Básico

O uso mais simples do input requer o seletor `bb-input` e o controle do valor através de `value` e `valueChange`.

```html
<bb-input [value]="inputValue" (valueChange)="inputValue = $event" placeholder="Digite seu nome" />
```

## Tipos de Input

O componente suporta vários tipos de HTML5, como `text`, `password`, `email`, `number`, etc.

```html
<bb-input type="email" placeholder="seu-email@exemplo.com" />
<bb-input type="password" placeholder="Sua senha" />
<bb-input type="number" placeholder="0" />
```

### Visibilidade de Senha

Para campos do tipo `password`, você pode habilitar um botão para alternar a visibilidade da senha.

```html
<bb-input type="password" [showPasswordToggle]="true" />
```

## Variantes

As variantes de cor ajudam a comunicar o estado do input, como sucesso ou erro.

```html
<bb-input variant="default" value="Padrão" />
<bb-input variant="success" value="Sucesso" />
<bb-input variant="error" value="Erro" />
<bb-input variant="warning" value="Aviso" />
```

## Tamanhos

O input está disponível em três tamanhos: `sm`, `md` (padrão), e `lg`.

```html
<bb-input size="sm" placeholder="Pequeno" />
<bb-input size="md" placeholder="Médio" />
<bb-input size="lg" placeholder="Grande" />
```

## Labels e Textos de Ajuda

Associe um `label` e um `helperText` para fornecer contexto ao usuário.

```html
<bb-input
  label="Nome de Usuário"
  helperText="Seu nome de usuário público."
  [value]="username"
  (valueChange)="username = $event"
/>
```

### Mensagens de Erro e Sucesso

Use `errorMessage` e `successMessage` para fornecer feedback de validação.

```html
<!-- Estado de Erro -->
<bb-input
  variant="error"
  label="E-mail"
  errorMessage="O e-mail fornecido é inválido."
  value="email-invalido"
/>

<!-- Estado de Sucesso -->
<bb-input
  variant="success"
  label="E-mail"
  successMessage="E-mail válido!"
  value="<!-- Import failed: example.com -->
/>
```

## Ícones

Você pode adicionar ícones de `lucide-angular` no prefixo ou sufixo do input.

```typescript
import { Mail, User } from 'lucide-angular';

@Component({
  /* ... */
})
export class MyComponent {
  mailIcon = Mail;
  userIcon = User;
}
```

```html
<bb-input [prefixIcon]="userIcon" placeholder="Usuário" />
<bb-input [suffixIcon]="mailIcon" placeholder="E-mail" />
```

## Acessibilidade

O `bb-input` gerencia automaticamente atributos ARIA essenciais. Para casos de uso avançados, você pode usar:

- `ariaLabel`: Fornece uma etiqueta acessível.
- `ariaLabelledBy`: Associa o input a um elemento de label externo.
- `ariaDescribedBy`: Associa o input a elementos descritivos.

```html
<span id="search-label">Pesquisar no site</span> <bb-input ariaLabelledBy="search-label" />
```

## API de Propriedades

### Inputs

| Propriedade          | Tipo (`input()`) | Padrão      | Descrição                                                            |
| -------------------- | ---------------- | ----------- | -------------------------------------------------------------------- |
| `type`               | `InputType`      | `'text'`    | O tipo de input: `'text'`, `'password'`, `'email'`, etc.             |
| `variant`            | `InputVariant`   | `'default'` | A variante de cor: `'default'`, `'success'`, `'error'`, `'warning'`. |
| `size`               | `InputSize`      | `'md'`      | O tamanho: `'sm'`, `'md'`, `'lg'`.                                   |
| `placeholder`        | `string`         | `''`        | O texto de placeholder.                                              |
| `value`              | `string`         | `''`        | O valor do input.                                                    |
| `disabled`           | `boolean`        | `false`     | Desabilita o input.                                                  |
| `readonly`           | `boolean`        | `false`     | Torna o input somente leitura.                                       |
| `required`           | `boolean`        | `false`     | Define o input como obrigatório.                                     |
| `label`              | `string`         | `undefined` | O texto do label associado.                                          |
| `helperText`         | `string`         | `undefined` | Texto de ajuda exibido abaixo do input.                              |
| `errorMessage`       | `string`         | `undefined` | Mensagem de erro (visível quando `variant` é `'error'`).             |
| `successMessage`     | `string`         | `undefined` | Mensagem de sucesso (visível quando `variant` é `'success'`).        |
| `showPasswordToggle` | `boolean`        | `false`     | Exibe um botão para alternar a visibilidade da senha.                |
| `prefixIcon`         | `LucideIconData` | `undefined` | Ícone a ser exibido antes do texto do input.                         |
| `suffixIcon`         | `LucideIconData` | `undefined` | Ícone a ser exibido depois do texto do input.                        |
| `className`          | `string`         | `''`        | Classes CSS adicionais para o container.                             |
| `ariaLabel`          | `string`         | `undefined` | Etiqueta acessível para leitores de tela.                            |

### Outputs

| Propriedade    | Tipo (`output()`) | Descrição                                        |
| -------------- | ----------------- | ------------------------------------------------ |
| `valueChange`  | `string`          | Emitido quando o valor do input muda.            |
| `inputFocus`   | `FocusEvent`      | Emitido quando o input recebe foco.              |
| `inputBlur`    | `FocusEvent`      | Emitido quando o input perde o foco.             |
| `inputKeydown` | `KeyboardEvent`   | Emitido quando uma tecla é pressionada no input. |
| `inputKeyup`   | `KeyboardEvent`   | Emitido quando uma tecla é liberada no input.    |
