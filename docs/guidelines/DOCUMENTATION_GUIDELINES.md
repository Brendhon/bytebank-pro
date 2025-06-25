# 📝 Diretrizes de Documentação

Este documento estabelece os padrões para documentação de componentes, serviços e outras partes da biblioteca UI do ByteBank Pro. Uma documentação eficaz é essencial para garantir que todos os membros da equipe entendam e utilizem corretamente os recursos da biblioteca.

## 1. JSDoc Obrigatório

Todo código deve incluir documentação JSDoc completa para melhorar a experiência do desenvolvedor através de autocomplete e informações contextuais.

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

### Elementos Essenciais do JSDoc:

1. **Descrição Geral**: Uma explicação clara e concisa da funcionalidade
2. **@example**: Exemplos de código mostrando o uso comum
3. **@param**: Documentação para cada parâmetro de função/método
4. **@returns**: O que a função/método retorna
5. **@default**: Valores padrão para propriedades/parâmetros
6. **@deprecated**: Marcação para recursos obsoletos (com alternativa)

## 2. README do Componente

Cada componente deve ter documentação clara incluindo os seguintes elementos:

### Estrutura Recomendada

````markdown
# Button Component

## Propósito

O componente Button fornece uma interface interativa para ações do usuário,
com suporte para diferentes variantes visuais, estados, e capacidade de resposta.

## Uso Básico

```html
<bb-button variant="primary">Click me</bb-button>
```
````

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

````

### Seções Obrigatórias:

- **Propósito**: Uma breve descrição do componente e quando usá-lo
- **Uso Básico**: Um exemplo simples para começar
- **Props**: Tabela descrevendo todas as propriedades de input
- **Eventos**: Tabela descrevendo todos os eventos emitidos
- **Exemplos**: Casos de uso comuns com snippets de código
- **Acessibilidade**: Considerações especiais para acessibilidade

## 3. Documentação de Serviços

Para serviços, a documentação deve focar em funcionalidade, configuração e padrões de uso.

```typescript
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

### Elementos Específicos para Serviços:

1. **Responsabilidade**: O propósito principal do serviço
2. **Injeção**: Como injetar e usar o serviço
3. **Configuração**: Opções de configuração, se aplicável
4. **Métodos**: Documentação detalhada para cada método público
5. **Fluxos de Dados**: Explicação de observables, promises, etc.
6. **Tratamento de Erros**: Como erros são gerenciados e comunicados

## 4. Documentação de APIs

Para documentar APIs e interfaces, foque na clareza e completude.

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

### Elementos para Documentação de APIs:

1. **Descrição da Interface**: Propósito geral e casos de uso
2. **Propriedades**: Documentação para cada propriedade
3. **Tipos**: Definições claras dos tipos de dados
4. **Valores Padrão**: Documentar valores padrão
5. **Restrições**: Quaisquer limitações ou regras de validação
6. **Exemplos**: Exemplos de objetos válidos que seguem a interface

## 5. Diretrizes Gerais

### A. Consistência de Linguagem

- Use um tom consistente e profissional
- Evite gírias, humor ou referências culturais específicas
- Use voz ativa e direta ("Use este componente para..." em vez de "Este componente pode ser usado para...")

### B. Comentários no Código

- **Todos os comentários em código devem ser escritos em inglês**, independentemente do idioma do restante da documentação
- Use comentários para explicar "por que", não "o quê" (o código deve ser auto-explicativo)
- Adicione comentários para lógica complexa ou decisões arquiteturais importantes

### C. Manutenção da Documentação

- Atualize a documentação sempre que o código mudar
- Verifique regularmente a precisão da documentação
- Mantenha um registro de mudanças (changelog) para alterações significativas

## 6. Documentação de Tokens de Design

Para design tokens, documente claramente seu propósito e uso:

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

### Informações para Design Tokens:

1. **Propósito**: Para que serve o token
2. **Uso**: Como e onde deve ser usado
3. **Variações**: Qualquer variação ou escala disponível
4. **Considerações de Acessibilidade**: Como WCAG 2.1 AA/AAA
5. **Relações**: Como se relaciona com outros tokens

## 7. Documentação de Use Cases

Para padrões e composições mais complexas, documente casos de uso:

````markdown
# Formulário de Login (Padrão)

## Descrição

Este padrão implementa um formulário de login padrão seguindo as diretrizes de segurança e usabilidade do ByteBank Pro. Inclui validação, tratamento de erros e suporte a multi-fator.

## Componentes Utilizados

- **bb-form**: Contenedor base do formulário
- **bb-input**: Para campos de email/usuário e senha
- **bb-button**: Para ação de submissão
- **bb-alert**: Para mensagens de erro

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
    <a href="/forgot-password" class="text-sm text-bytebank-blue"> Esqueceu a senha? </a>
  </div>

  <bb-button type="submit" variant="primary" class="w-full mt-6"> Entrar </bb-button>
</bb-form>
```
````

## Considerações de Segurança

- Implementar throttling para prevenir ataques de força bruta
- Usar HTTPS para transmissão segura de credenciais
- Oferecer opção de autenticação de dois fatores

## Acessibilidade

- Todos os campos têm labels associados
- Mensagens de erro são anunciadas por leitores de tela
- Foco é gerenciado corretamente após submissão

````

## 8. Documentação de Contribuição

Inclua diretrizes para novos contribuidores:

```markdown
# Guia de Contribuição

## Processo de Desenvolvimento

1. **Crie uma branch**:
   `git checkout -b feature/nome-da-feature`

2. **Implemente sua mudança**:
   Siga os padrões de código e adicione testes

3. **Documente**:
   Atualize ou adicione documentação relacionada

4. **Teste**:
   Execute `npm test` para garantir que tudo está funcionando

5. **Envie um Pull Request**:
   Inclua uma descrição clara do que sua mudança faz

## Padrões de Código

- Siga os padrões de estilo Angular
- Use TypeScript estrito (strict mode)
- Mantenha 100% de cobertura de testes
- Documente com JSDoc

## Equipe e Suporte

Para dúvidas ou ajuda:
- **Slack**: #bytebank-ui-library
- **Email**: ui-team@bytebankpro.com
````

## 9. Checklist de Documentação

Use esta checklist para garantir que a documentação esteja completa:

- [ ] JSDoc presente em todas as classes, métodos e propriedades públicas
- [ ] README com descrição clara do componente/serviço
- [ ] Exemplos de código para todos os casos de uso comuns
- [ ] Tabelas de props/eventos para componentes
- [ ] Documentação de acessibilidade incluída
- [ ] Links para documentação relacionada
- [ ] Imagens/diagramas onde apropriado
- [ ] Todos os parâmetros, retornos e erros documentados
- [ ] Verificado que a documentação está atualizada com o código atual

## 📚 Recursos Adicionais

- [Angular Docs Style Guide](https://angular.dev/style-guide)
- [TypeDoc](https://typedoc.org/) - Gerador de documentação TypeScript
- [JSDoc Reference](https://jsdoc.app/)
- [Microsoft API Documentation](https://docs.microsoft.com/style-guide/developer-content/) - Boas práticas
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
