---
applyTo: '**/*.spec.ts'
---

# 🧪 Padrões de Teste para Aplicações Angular (Jasmine e Karma)

Este guia define os padrões e melhores práticas para a escrita de testes unitários para componentes, serviços, guards, resolvers, pipes e diretivas Angular, utilizando Jasmine e Karma.

**Observações Importantes:**

- Os testes e comentários dentro dos códigos devem ser escritos em english.
- Foque em testes unitários básicos e essenciais para cada tipo de construção Angular, evitando testes de integração ou e2e neste guia.
- Utilize Jasmine e Karma para execução dos testes.
- Os testes podem ser executados com o comando `npm run test` a partir da raiz do projeto.
- Para testar um arquivo específico (ex: `input.component.spec.ts`), execute:

  ```bash
  npm run test -- --include="\*\*/input.component.spec.ts"
  ```

  Esse comando deve ser executado na pasta `packages/ui` (ou na raiz do projeto, dependendo da sua configuração), onde os testes estão localizados.

- **Use `data-testid` para seletores de teste** para garantir robustez frente a mudanças no DOM.
- **Adicione uma linha em branco antes de cada `expect`** para melhorar a legibilidade.
- **Sempre use `fixture.componentRef.setInput()` para definir os inputs nos testes de componente**.

---

## 1\. Estrutura de Testes

Todos os testes devem seguir uma estrutura básica apropriada para o tipo que está sendo testado.

### A. Estrutura de Testes para Componentes

```typescript
describe('ComponenteComponent', () => {
  let component: ComponenteComponent;
  let fixture: ComponentFixture<ComponenteComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Element para componentes pode ser null se o componente não renderizar um elemento imediatamente.
    // Adapte o seletor [data-testid="component"] para o seletor raiz do seu componente.
    element = fixture.debugElement.query(By.css('[data-testid="component"]'))?.nativeElement;
  });

  // Required tests...
});
```

### B. Estrutura de Testes para Serviços

```typescript
describe('MeuServicoService', () => {
  let service: MeuServicoService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Cria um mock para HttpClient se o serviço depender dele
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        MeuServicoService,
        { provide: HttpClient, useValue: httpClientSpy } // Fornece o mock
      ]
    });
    service = TestBed.inject(MeuServicoService);
  });

  // Required tests...
});
```

### C. Estrutura de Testes para Guards e Resolvers (Baseados em Função)

```typescript
// Exemplo para um Guard
describe('authGuard', () => {
  let router: Router;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: { createUrlTree: jasmine.createSpy('createUrlTree') } }
      ]
    });
    router = TestBed.inject(Router);
  });

  it('should return true for an authenticated user', () => {
    authService.isAuthenticated.and.returnValue(true);

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(result).toBe(true);
  });

  it('should redirect to login for an unauthenticated user', () => {
    authService.isAuthenticated.and.returnValue(false);
    (router.createUrlTree as jasmine.Spy).and.returnValue(new UrlTree()); // Mocka o retorno

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);

    expect(result).toBeInstanceOf(UrlTree);
  });
});

// Exemplo para um Resolver
describe('userDataResolver', () => {
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['getUser']);
    TestBed.configureTestingModule({
      providers: [{ provide: UserService, useValue: userService }]
    });
  });

  it('should return user data', () => {
    const mockUser = { id: '1', name: 'Test User' };
    userService.getUser.and.returnValue(of(mockUser));

    const route = { paramMap: convertToParamMap({ id: '1' }) } as ActivatedRouteSnapshot;

    const result = TestBed.runInInjectionContext(() =>
      userDataResolver(route, {} as RouterStateSnapshot)
    );

    expect(result).toBeInstanceOf(Observable);
    result.subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    expect(userService.getUser).toHaveBeenCalledWith('1');
  });
});
```

### D. Estrutura de Testes para Pipes

```typescript
describe('CustomPipe', () => {
  let pipe: CustomPipe;

  beforeEach(() => {
    pipe = new CustomPipe();
  });

  // Required tests...
});
```

### E. Estrutura de Testes para Diretivas

```typescript
describe('HighlightDirective', () => {
  @Component({
    template: `<div [bbHighlight]="color">Test</div>`
  })
  class TestHostComponent {
    // Componente host para testar a diretiva
    color = 'yellow';
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let divElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightDirective, TestHostComponent] // Importar a diretiva standalone
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    divElement = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  // Required tests...
});
```

### F. Estrutura de Testes para Interceptors

```typescript
describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getAuthToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Importa para testar o HttpClient
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true } // Fornece o interceptor
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Garante que não há requisições pendentes
  });

  // Required tests...
});
```

---

## 2\. Categorias de Testes Obrigatórios

É essencial cobrir as seguintes categorias de testes para garantir a robustez de cada tipo de construção Angular:

### A. Testes Básicos

- Verificar se a entidade é criada com sucesso.

- Confirmar que as propriedades padrão são inicializadas corretamente.

  ```typescript
  describe('Basic Functionality', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should have default properties (component)', () => {
      expect(component.variant).toBe('primary');
      expect(component.disabled).toBeFalsy();
    });

    it('should create the pipe', () => {
      expect(pipe).toBeTruthy();
    });

    it('should create the directive', () => {
      expect(fixture.debugElement.query(By.directive(HighlightDirective))).toBeTruthy();
    });
  });
  ```

### B. Testes de Propriedades (Inputs - para Componentes/Diretivas)

- Verificar se as classes CSS são aplicadas corretamente com base nos inputs.

- Testar o comportamento em diferentes estados de input (ex: `disabled`, `loading`).

  ```typescript
  describe('Input Properties (Component/Directive)', () => {
    it('should apply variant classes correctly', () => {
      fixture.componentRef.setInput('variant', 'secondary');
      fixture.detectChanges();

      expect(element.classList).toContain('expected-class');
    });

    it('should handle disabled state', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(element.disabled).toBeTruthy();
    });

    it('should update loading state', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(element.classList).toContain('loading-class');
    });
  });
  ```

### C. Testes de Eventos (Outputs - para Componentes/Diretivas)

- Verificar se os eventos são emitidos corretamente quando as ações apropriadas são realizadas (ex: clique).

  ```typescript
  describe('Events (Component/Directive)', () => {
    it('should emit componentClick when clicked', () => {
      spyOn(component.componentClick, 'emit');
      element.click();
      fixture.detectChanges();

      expect(component.componentClick.emit).toHaveBeenCalled();
    });
  });
  ```

### D. Testes de Acessibilidade (para Componentes/Diretivas)

- Garantir que os atributos ARIA e outras propriedades de acessibilidade são definidos corretamente.

  ```typescript
  describe('Accessibility (Component/Directive)', () => {
    it('should have proper aria attributes', () => {
      fixture.componentRef.setInput('ariaLabel', 'Test label');
      fixture.detectChanges();

      expect(element.getAttribute('aria-label')).toBe('Test label');
    });
  });
  ```

---

## 3\. Testando Inputs e Outputs (para Componentes/Diretivas)

### A. Testando Inputs

- Sempre use `fixture.componentRef.setInput()` para atribuir valores às propriedades de input.

- Verifique se as propriedades são refletidas corretamente no componente e no DOM.

  ```typescript
  it('should set input properties correctly', () => {
    // Always use setInput(), do not assign directly
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    expect(component.label).toBe('Test Label');
    expect(component.required).toBe(true);
    expect(element.textContent).toContain('Test Label');
    expect(element.classList).toContain('required');
  });
  ```

### B. Testando Outputs

- Utilize `spyOn(output, 'emit')` para verificar se o evento foi emitido.

- Alternativamente, pode-se subscrever ao output para capturar o valor emitido.

  ```typescript
  it('should emit valueChange event', () => {
    // Method 1: Spying on EventEmitter
    spyOn(component.valueChange, 'emit');
    component.updateValue('new value');

    expect(component.valueChange.emit).toHaveBeenCalledWith('new value');

    // Method 2: Subscribing to output
    let emittedValue: string | null = null;
    component.valueChange.subscribe((value) => (emittedValue = value));
    component.updateValue('another value');

    expect(emittedValue).toBe('another value');
  });
  ```

---

## 4\. Testando Formulários (para Componentes)

### A. Template-Driven Forms

- Simule a interação do usuário com o elemento do formulário para verificar a atualização do modelo.

  ```typescript
  it('should update model on input', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'test@example.com';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(component.email).toBe('test@example.com');
  });
  ```

### B. Reactive Forms

- Acesse os controles do formulário e defina valores para testar a validação e os estados do formulário.

  ```typescript
  it('should validate the form', () => {
    const form = component.form;
    const emailControl = form.get('email');

    // Initially invalid because it is required
    expect(emailControl?.valid).toBeFalsy();

    // After setting a valid value
    emailControl?.setValue('test@example.com');

    expect(emailControl?.valid).toBeTruthy();

    // With an invalid value
    emailControl?.setValue('invalid-email');

    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.hasError('email')).toBeTruthy();
  });
  ```

---

## 5\. Testando Operações Assíncronas (para Componentes/Serviços/Resolvers/Guards)

- Use `fakeAsync` e `tick()` para controlar o tempo e simular operações assíncronas de forma determinística.

- Mocke os serviços que realizam chamadas assíncronas para controlar as respostas.

  ```typescript
  it('should load data asynchronously (component)', fakeAsync(() => {
    // Setup mock service response
    const service = TestBed.inject(DataService);
    const mockData = ['item1', 'item2'];
    spyOn(service, 'getData').and.returnValue(of(mockData));

    // Trigger data load
    component.loadData();
    tick();

    expect(component.items).toEqual(mockData);
    expect(component.loading).toBeFalsy();
  }));

  it('should fetch data from API (service)', (done) => {
    const mockUsers = [{ id: 1, name: 'User 1' }];
    httpClientSpy.get.and.returnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      done();
    });

    const req = httpTestingController.expectOne('/api/users');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUsers); // Responde a requisição
  });
  ```

---

## 6\. Testando Comportamento Condicional (para Componentes/Diretivas)

- Verifique se os elementos são exibidos ou ocultos com base nas condições do componente.

  ```typescript
  it('should show error message when hasError is true', () => {
    fixture.componentRef.setInput('hasError', false);
    fixture.detectChanges();

    let errorMessage = fixture.debugElement.query(By.css('[data-testid="error-message"]'));

    expect(errorMessage).toBeNull();

    fixture.componentRef.setInput('hasError', true);
    fixture.componentRef.setInput('errorMessage', 'Test error');
    fixture.detectChanges();

    errorMessage = fixture.debugElement.query(By.css('[data-testid="error-message"]'));

    expect(errorMessage).not.toBeNull();
    expect(errorMessage.nativeElement.textContent).toContain('Test error');
  });
  ```

---

## 7\. Testando Mudanças de Estado (para Componentes/Serviços)

- Verifique se a UI é atualizada corretamente quando o estado do componente muda.

- Verifique se o estado em um serviço (via Observable ou Signal) é atualizado corretamente.

  ```typescript
  it('should update UI when state changes (component)', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();

    expect(element.classList).not.toContain('open');

    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();

    expect(element.classList).toContain('open');
  });

  it('should update current user state (service - Observable)', (done) => {
    const mockUser = { id: 1, name: 'Logged In' };
    httpClientSpy.get.and.returnValue(of(mockUser));

    service.currentUser$.subscribe((user) => {
      // Primeira emissão (null)
      // Segunda emissão após loadCurrentUser()
      if (user) {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    // Se o loadCurrentUser for chamado no construtor
    const req = httpTestingController.expectOne('/api/current-user');
    req.flush(mockUser);
  });

  it('should update count (service - Signal)', () => {
    expect(service.count()).toBe(0);
    service.increment();
    expect(service.count()).toBe(1);
    expect(service.doubleCount()).toBe(2);
  });
  ```

---

## 8\. Testando Host Bindings (para Componentes/Diretivas)

- Verifique se as classes ou atributos são aplicados ao elemento host do componente.

  ```typescript
  it('should apply host classes correctly', () => {
    const hostElement = fixture.nativeElement;

    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(hostElement.classList).toContain('active');

    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(hostElement.classList).toContain('disabled');
    expect(hostElement.hasAttribute('disabled')).toBeTruthy();
  });
  ```

---

## 9\. Testando Referências ViewChild (para Componentes)

- Verifique se o componente acessa e interage corretamente com os elementos filhos referenciados por `ViewChild`.

  ```typescript
  it('should access child element with ViewChild', () => {
    fixture.componentRef.setInput('autoFocus', true);
    fixture.detectChanges();

    // The component should autofocus the input element
    const input = component.inputElement.nativeElement;

    expect(document.activeElement).toBe(input);
  });
  ```

---

## 10\. Testando Content Projection (para Componentes)

- Crie um componente host para testar se o conteúdo é projetado corretamente nos slots definidos.

  ```typescript
  it('should project content correctly', () => {
    TestBed.resetTestingModule();

    @Component({
      template: `
        <bb-card>
          <div data-testid="projected-content">Projected Content</div>
          <div slot="header" data-testid="header">Header Content</div>
          <div slot="footer" data-testid="footer">Footer Content</div>
        </bb-card>
      `
    })
    class TestHostComponent {}

    TestBed.configureTestingModule({
      imports: [CardComponent, TestHostComponent]
    }).compileComponents();

    const hostFixture = TestBed.createComponent(TestHostComponent);
    hostFixture.detectChanges();

    const projectedContent = hostFixture.debugElement.query(
      By.css('[data-testid="projected-content"]')
    ).nativeElement;

    const headerContent = hostFixture.debugElement.query(
      By.css('[data-testid="header"]')
    ).nativeElement;

    const footerContent = hostFixture.debugElement.query(
      By.css('[data-testid="footer"]')
    ).nativeElement;

    expect(projectedContent.textContent).toBe('Projected Content');
    expect(headerContent.textContent).toBe('Header Content');
    expect(footerContent.textContent).toBe('Footer Content');
  });
  ```

---

## 11\. Testando Acessibilidade Avançada (para Componentes/Diretivas)

- Verificar requisitos de contraste (WCAG).

- Testar a navegabilidade por teclado e o foco.

- Confirmar a presença e os valores corretos de todos os atributos ARIA necessários.

  ```typescript
  describe('Accessibility Tests', () => {
    it('should meet WCAG contrast requirements', () => {
      // Check if colors meet contrast requirements
      const backgroundColor = getComputedStyle(element).backgroundColor;
      const textColor = getComputedStyle(element).color;

      expect(hasAdequateContrast(backgroundColor, textColor)).toBeTruthy();
    });

    it('should be keyboard navigable', () => {
      const button = fixture.debugElement.query(By.css('button')).nativeElement;

      // Simulate keyboard navigation
      button.focus();

      expect(document.activeElement).toBe(button);

      // Simulate key press
      const keyEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      button.dispatchEvent(keyEvent);

      // Check if the action was triggered
      expect(component.wasActivated).toBeTruthy();
    });

    it('should have all required ARIA attributes', () => {
      fixture.componentRef.setInput('expanded', true);
      fixture.componentRef.setInput('controls', 'panel-1');
      fixture.detectChanges();

      expect(element.getAttribute('aria-expanded')).toBe('true');
      expect(element.getAttribute('aria-controls')).toBe('panel-1');
    });
  });
  ```

---

## 12\. Testando Pipes Personalizados

- Crie uma instância do pipe e teste seu método `transform` com diferentes inputs.

  ```typescript
  describe('CustomPipe', () => {
    let pipe: CustomPipe;

    beforeEach(() => {
      pipe = new CustomPipe();
    });

    it('should transform input correctly', () => {
      expect(pipe.transform('hello')).toBe('HELLO');
      expect(pipe.transform('')).toBe('');
      expect(pipe.transform(null)).toBe('');
    });
  });
  ```

---

## 13\. Testando Diretivas Personalizadas

- Crie um componente de teste que utilize a diretiva e verifique se a diretiva aplica as mudanças esperadas no DOM.

  ```typescript
  describe('HighlightDirective', () => {
    @Component({
      template: `<div [bbHighlight]="color">Test</div>`
    })
    class TestComponent {
      color = 'yellow';
    }

    let fixture: ComponentFixture<TestComponent>;
    let divElement: HTMLElement;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [HighlightDirective, TestComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      divElement = fixture.debugElement.query(By.css('div')).nativeElement;
    });

    it('should apply the highlight color', () => {
      expect(divElement.style.backgroundColor).toBe('yellow');

      fixture.componentInstance.color = 'blue';
      fixture.detectChanges();

      expect(divElement.style.backgroundColor).toBe('blue');
    });
  });
  ```

---

## 14\. Testando Serviços Injetados (em Componentes/Diretivas/Guards/Resolvers)

- Crie mocks (usando `jasmine.createSpyObj`) para os serviços injetados e forneça-os via `TestBed.configureTestingModule` para controlar seu comportamento.

  ```typescript
  describe('ComponentWithService', () => {
    let component: ComponentWithService;
    let fixture: ComponentFixture<ComponentWithService>;
    let mockService: jasmine.SpyObj<DataService>;

    beforeEach(async () => {
      // Create a mock for the service
      mockService = jasmine.createSpyObj('DataService', ['getData', 'saveData']);
      mockService.getData.and.returnValue(of(['item1', 'item2']));

      await TestBed.configureTestingModule({
        imports: [ComponentWithService],
        providers: [{ provide: DataService, useValue: mockService }]
      }).compileComponents();

      fixture = TestBed.createComponent(ComponentWithService);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load data from service on init', () => {
      expect(mockService.getData).toHaveBeenCalled();

      expect(component.items).toEqual(['item1', 'item2']);
    });

    it('should save data using the service', () => {
      component.saveNewItem('item3');

      expect(mockService.saveData).toHaveBeenCalledWith('item3');
    });
  });
  ```

---

## 15\. Testando Tratamento de Erros (em Componentes/Serviços/Interceptors)

- Simule cenários de erro (ex: falha de API) e verifique se o componente/serviço/interceptor reage e exibe mensagens de erro adequadas.

  ```typescript
  it('should handle API errors gracefully (component)', fakeAsync(() => {
    const service = TestBed.inject(DataService);
    spyOn(service, 'getData').and.returnValue(throwError(() => new Error('API Error')));

    component.loadData();
    tick();
    fixture.detectChanges();

    expect(component.hasError).toBeTruthy();

    expect(component.errorMessage).toContain('Failed to load data');

    const errorElement = fixture.debugElement.query(By.css('[data-testid="error-message"]'));

    expect(errorElement).not.toBeNull();
  }));

  it('should handle API errors gracefully (service)', (done) => {
    httpClientSpy.get.and.returnValue(throwError(() => new HttpErrorResponse({ status: 500 })));

    service.getUsers().subscribe({
      next: () => fail('should have failed with 500 error'),
      error: (error) => {
        expect(error.status).toEqual(500);
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/users');
    req.flush('Server Error', { status: 500, statusText: 'Server Error' });
  });

  it('should show error notification for 401 (interceptor)', (done) => {
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showError']);
    TestBed.overrideProvider(NotificationService, { useValue: notificationServiceSpy });

    httpClient.get('/api/protected').subscribe({
      next: () => fail('should have failed'),
      error: (err) => {
        expect(err.status).toBe(401);

        expect(notificationServiceSpy.showError).toHaveBeenCalledWith(
          'Sessão expirada. Por favor, faça login novamente.'
        );
        done();
      }
    });

    const req = httpTestingController.expectOne('/api/protected');
    req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });
  ```

---

## 16\. Testando Componentes Standalone com Dependências (para Componentes/Diretivas/Pipes)

- Ao testar componentes, diretivas ou pipes standalone com dependências como `HttpClient` ou `Router`, forneça-as usando `provideHttpClient()` ou `provideRouter([])` no `TestBed.configureTestingModule`.

- Para gerenciamento de estado (ex: NgRx), use `provideMockStore()`.

  ```typescript
  describe('StandaloneComponent', () => {
    let component: StandaloneComponent;
    let fixture: ComponentFixture<StandaloneComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [
          StandaloneComponent,
          HttpClientModule, // ou provideHttpClient()
          RouterTestingModule // ou provideRouter([])
        ],
        providers: [
          // provideHttpClient(), // Fornecer HttpClient via provideHttpClient()
          // provideRouter([]), // Fornecer Router via provideRouter([])
          // provideMockStore({ // If using NgRx
          //   initialState: { /* ... */ }
          // })
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(StandaloneComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    // Tests...
  });
  ```

---

## 🏅 Melhores Práticas Gerais para Testes

1.  **Use `data-testid` para seletores**: Torna os seletores de teste mais resistentes a mudanças na estrutura ou classes do DOM.
2.  **Sempre detecte mudanças**: Chame `fixture.detectChanges()` após qualquer operação que altere o estado do componente e que deva resultar em atualização da UI.
3.  **Nunca atribua diretamente às propriedades de input (de componentes/diretivas)**: Sempre use `fixture.componentRef.setInput()`.
4.  **Use `fakeAsync` para operações assíncronas**: Garante que os testes assíncronos sejam determinísticos e evita timeouts.
5.  **Mock serviços complexos**: Utilize `jasmine.createSpyObj` ou `TestBed.inject` para configurar mocks de serviços.
6.  **Encadeie expectativas com contexto**: Agrupe expectativas relacionadas e adicione descrições claras aos testes.
7.  **Uma linha em branco antes de cada `expect`**: Melhora a legibilidade e é um padrão do projeto.
8.  **Teste comportamento, não implementação**: Concentre-se no que a entidade deve fazer, em vez de como ela faz.
9.  **Use `beforeEach` para configuração**: Mantenha o código DRY (Don't Repeat Yourself) e garanta um estado inicial limpo para cada teste.
10. **Teste estados limite e casos de erro**: Não teste apenas o "caminho feliz"; inclua cenários de erro e casos de borda.

---

## Observações

- **Cuidado ao testar `Intl.NumberFormat`**: O resultado pode conter caracteres invisíveis que causam falhas nos testes. Para evitar problemas, utilize uma expressão regular como no exemplo abaixo:

  ```typescript
  const result = formatCurrency(1000000);
  expect(result).toMatch(/^R\$\s1\.000\.000,00$/);
  ```

---

**Comando para executar os testes de um arquivo específico:**

Para executar os testes de um arquivo de especificação específico (por exemplo, `meu-componente.component.spec.ts`), use o comando:

```bash
npm run test -- --include="\*\*/meu-componente.component.spec.ts"
```

Lembre-se de adaptar o caminho do arquivo `*\*/meu-componente.component.spec.ts` para o local real do seu arquivo de teste dentro da pasta `packages/ui` ou da raiz do seu projeto, conforme sua estrutura.
