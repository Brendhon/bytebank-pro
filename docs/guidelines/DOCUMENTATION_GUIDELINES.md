# 📝 Diretrizes de Documentação

Este documento define os padrões para documentação de componentes, serviços e demais partes do ByteBank Pro. Uma documentação clara garante que toda a equipe compreenda e utilize corretamente os recursos disponíveis.

## 1. JSDoc Obrigatório

Todo código deve conter documentação JSDoc completa para aprimorar a experiência do desenvolvedor, fornecendo autocomplete e informações contextuais.

````typescript
/**
 * Flexible button component with multiple variants and states.
 *
 * @example
 * ```html
 * <bb-button variant="primary" (buttonClick)="handleClick()">
 *   Click here
 * </bb-button>
 * ```
 */
@Component({...})
export class ButtonComponent {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  @Input() variant: ButtonVariant = 'primary';

  /**
   * Event emitted when the button is clicked
   */
  @Output() buttonClick = new EventEmitter<Event>();
}
````

**Elementos essenciais do JSDoc:**

- **Descrição geral:** Explicação clara da funcionalidade
- **@example:** Exemplos de uso
- **@param:** Documentação de parâmetros de funções/métodos
- **@returns:** O que a função/método retorna
- **@default:** Valores padrão
- **@deprecated:** Indicação de recursos obsoletos (com alternativa)

> **Observação:** Todos os comentários em código devem ser escritos em inglês, independentemente do idioma do restante da documentação.

## 2. README do Componente

Cada componente deve ter um README claro, contendo:

- **Propósito:** Breve descrição e contexto de uso
- **Uso Básico:** Exemplo simples para começar
- **Props:** Tabela de propriedades de input
- **Eventos:** Tabela de eventos emitidos
- **Exemplos:** Casos de uso comuns com snippets de código
- **Acessibilidade:** Considerações especiais

# Button Component

## Propósito

O componente Button fornece uma interface interativa para ações do usuário, com suporte a diferentes variantes visuais, estados e responsividade.

## Uso Básico

```html
<bb-button variant="primary">Click me</bb-button>
```

## Props

| Propriedade | Tipo                     | Padrão    | Descrição                       |
| ----------- | ------------------------ | --------- | ------------------------------- |
| variant     | 'primary' \| 'secondary' | 'primary' | Estilo visual do botão          |
| size        | 'sm' \| 'md' \| 'lg'     | 'md'      | Tamanho do botão                |
| disabled    | boolean                  | false     | Desativa interações com o botão |

## Eventos

| Evento      | Tipo    | Descrição                           |
| ----------- | ------- | ----------------------------------- |
| buttonClick | Event   | Emitido quando o botão é clicado    |
| focusChange | boolean | Emitido quando o foco do botão muda |

## Exemplos

### Botão Primário

```html
<bb-button variant="primary">Save</bb-button>
```

### Botão Desativado

```html
<bb-button variant="primary" [disabled]="true">Inactive</bb-button>
```

## Acessibilidade

- Navegável por teclado (Tab, Enter, Space)
- Suporta atributos ARIA (aria-label, aria-disabled)
- Atende aos requisitos de contraste WCAG AA

## 3. Documentação de Serviços

A documentação de serviços deve abordar:

- **Responsabilidade:** Propósito principal do serviço
- **Injeção:** Como injetar e utilizar
- **Configuração:** Opções disponíveis, se houver
- **Métodos:** Detalhamento de métodos públicos
- **Fluxos de Dados:** Observables, promises, etc.
- **Tratamento de Erros:** Como erros são tratados

````typescript
/**
 * Service for handling authentication and user sessions.
 *
 * @example
 * ```typescript
 * // Inject the service
 * private authService = inject(AuthService);
 *
 * // Login a user
 * this.authService.login(credentials).subscribe(
 *   user => console.log('Logged in as', user.name)
 * );
 * ```
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   * Authenticates a user with the provided credentials.
   *
   * @param credentials The user login credentials
   * @returns An observable that emits the authenticated user
   * @throws AuthenticationError if credentials are invalid
   */
  login(credentials: LoginCredentials): Observable<User> {
    // ...implementation
  }
}
````

## 4. Documentação de APIs e Interfaces

Foque em clareza e completude:

- **Descrição da Interface:** Propósito e casos de uso
- **Propriedades:** Documentação de cada propriedade
- **Tipos:** Definições claras dos tipos
- **Valores Padrão:** Sempre que aplicável
- **Restrições:** Limitações ou regras de validação
- **Exemplos:** Objetos válidos seguindo a interface

```typescript
/**
 * Configuration options for the notification system.
 */
export interface NotificationConfig {
  /**
   * Duration in milliseconds that the notification will be displayed.
   * Set to 0 for persistent notifications that require manual dismissal.
   * @default 5000
   */
  duration?: number;

  /**
   * Position where notifications should appear on screen
   * @default 'top-right'
   */
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';

  /**
   * Maximum number of notifications to display simultaneously
   * @default 3
   */
  maxCount?: number;
}
```

## 5. Documentação de Tokens de Design

Documente claramente:

- **Propósito:** Para que serve o token
- **Uso:** Como e onde utilizar
- **Variações:** Escalas ou alternativas
- **Acessibilidade:** Exemplo: contraste WCAG
- **Relações:** Relação com outros tokens

```typescript
/**
 * Core color tokens for the ByteBank Pro design system.
 * These tokens should be used via the Tailwind classes (e.g., bg-bytebank-blue)
 * rather than being imported and used directly.
 */
export const colors = {
  /**
   * Primary brand color, used for main actions and primary elements
   * WCAG Contrast (on white): AAA (7.5:1)
   */
  'bytebank-blue': '#0052CC',

  /**
   * Secondary brand color, used for highlights and secondary actions
   * WCAG Contrast (on white): AAA (8:1)
   */
  'bytebank-green': '#006644',

  /**
   * Error state color, used for error messages and destructive actions
   * WCAG Contrast (on white): AAA (7:1)
   */
  'bytebank-red': '#DE350B'
};
```

## 6. Documentação de Use Cases

Para padrões e composições complexas, documente casos de uso:

````markdown
# Formulário de Login (Padrão)

## Descrição

Este padrão implementa um formulário de login seguindo as diretrizes de segurança e usabilidade do ByteBank Pro. Inclui validação, tratamento de erros e suporte a multi-fator.

## Componentes Utilizados

- **bb-form**: Contêiner base do formulário
- **bb-input**: Campos de email/usuário e senha
- **bb-button**: Ação de submissão
- **bb-alert**: Mensagens de erro

## Exemplo de Implementação

```html
<bb-form (ngSubmit)="onSubmit()">
  <bb-input type="email" label="Email" [(ngModel)]="email" required></bb-input>
  <bb-input type="password" label="Senha" [(ngModel)]="password" required></bb-input>

  @if (errorMessage) {
  <bb-alert variant="error">{{ errorMessage }}</bb-alert>
  }

  <div class="flex justify-between items-center mt-4">
    <bb-checkbox [(ngModel)]="rememberMe">Lembrar-me</bb-checkbox>
    <a href="/forgot-password" class="text-sm text-bytebank-blue">Esqueceu a senha?</a>
  </div>

  <bb-button type="submit" variant="primary" class="w-full mt-6">Entrar</bb-button>
</bb-form>
```
````

## Considerações de Segurança

- Implemente throttling para prevenir ataques de força bruta
- Utilize HTTPS para transmissão segura de credenciais
- Ofereça autenticação de dois fatores

## Acessibilidade

- Todos os campos possuem labels associados
- Mensagens de erro são anunciadas por leitores de tela
- Foco gerenciado corretamente após submissão

## 7. Documentação de Contribuição

Inclua um guia para novos contribuidores:

# Guia de Contribuição

## Processo

1. **Crie uma branch:**  
   `git checkout -b feature/nome-da-feature`

2. **Implemente sua mudança:**  
   Siga os padrões de código e adicione testes

3. **Documente:**  
   Atualize ou adicione documentação relacionada

4. **Teste:**  
   Execute `npm test` para garantir que tudo está funcionando

5. **Envie um Pull Request:**  
   Inclua uma descrição clara da sua mudança

## Padrões de Código

- Siga o estilo Angular
- Use TypeScript estrito (strict mode)
- Mantenha 100% de cobertura de testes
- Documente com JSDoc

## Equipe e Suporte

Dúvidas ou ajuda:

- **Slack:** #bytebank-ui-library
- **Email:** ui-team@bytebankpro.com

## 8. Checklist de Documentação

Utilize esta checklist para garantir documentação completa:

- [ ] JSDoc em todas as classes, métodos e propriedades públicas
- [ ] README com descrição clara do componente/serviço
- [ ] Exemplos de código para casos de uso comuns
- [ ] Tabelas de props/eventos para componentes
- [ ] Documentação de acessibilidade
- [ ] Links para documentação relacionada
- [ ] Imagens/diagramas quando apropriado
- [ ] Todos os parâmetros, retornos e erros documentados
- [ ] Documentação atualizada com o código

## 📚 Recursos Adicionais

- [Angular Docs Style Guide](https://angular.dev/style-guide)
- [TypeDoc](https://typedoc.org/) - Gerador de documentação TypeScript
- [JSDoc Reference](https://jsdoc.app/)
- [Microsoft API Documentation](https://docs.microsoft.com/style-guide/developer-content/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
