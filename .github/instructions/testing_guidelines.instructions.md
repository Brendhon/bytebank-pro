---
applyTo: '**/*.spec.ts'
---

# 🧪 Angular Testing Patterns (Jasmine and Karma)

This guide defines the patterns and best practices for writing unit tests for Angular components, services, guards, resolvers, pipes, and directives, using Jasmine and Karma.

**Important Notes:**

- Tests and comments within the code must be written in English.
- Focus on basic and essential unit tests for each type of Angular construct, avoiding integration or e2e tests in this guide.
- Use Jasmine and Karma for test execution.
- Tests can be run with the command `npm run test` from the project root.
- To test a specific file (e.g., `input.component.spec.ts`), run:

  ```bash
  npm run test -- --include="\*\*/input.component.spec.ts"
  ```

  This command should be executed in the `packages/ui` folder (or at the project root, depending on your configuration), where the tests are located.

- **Use `data-testid` for test selectors** to ensure robustness against DOM changes.
- **Add a blank line before each `expect`** to improve readability.
- **Always use `fixture.componentRef.setInput()` to set inputs in component tests**.

---

## 1. Test Structure

All tests must follow a basic structure appropriate for the type being tested.

### A. Component Test Structure

```typescript
describe('ComponentComponent', () => {
  let component: ComponentComponent;
  let fixture: ComponentFixture<ComponentComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentComponent] // For standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Element for components can be null if the component does not render an element immediately.
    // Adapt the selector [data-testid="component"] to the root selector of your component.
    element = fixture.debugElement.query(By.css('[data-testid="component"]'))?.nativeElement;
  });

  // Required tests...
});
```

### B. Service Test Structure

```typescript
describe('MyServiceService', () => {
  let service: MyServiceService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    // Create a mock for HttpClient if the service depends on it
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      providers: [
        MyServiceService,
        { provide: HttpClient, useValue: httpClientSpy } // Provide the mock
      ]
    });
    service = TestBed.inject(MyServiceService);
  });

  // Required tests...
});
```

### C. Guard and Resolver Test Structure (Function-Based)

```typescript
// Example for a Guard
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
    (router.createUrlTree as jasmine.Spy).and.returnValue(new UrlTree()); // Mock the return

    const result = TestBed.runInInjectionContext(() =>
      authGuard({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/login']);

    expect(result).toBeInstanceOf(UrlTree);
  });
});

// Example for a Resolver
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

### D. Pipe Test Structure

```typescript
describe('CustomPipe', () => {
  let pipe: CustomPipe;

  beforeEach(() => {
    pipe = new CustomPipe();
  });

  // Required tests...
});
```

### E. Directive Test Structure

```typescript
describe('HighlightDirective', () => {
  @Component({
    template: `<div [bbHighlight]="color">Test</div>`
  })
  class TestHostComponent {
    // Host component to test the directive
    color = 'yellow';
  }

  let fixture: ComponentFixture<TestHostComponent>;
  let divElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightDirective, TestHostComponent] // Import the standalone directive
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    divElement = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  // Required tests...
});
```

### F. Interceptor Test Structure

```typescript
describe('authInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['getAuthToken']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import to test HttpClient
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true } // Provide the interceptor
      ]
    });
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensures no pending requests
  });

  // Required tests...
});
```

---

## 2. Mandatory Test Categories

It is essential to cover the following test categories to ensure the robustness of each type of Angular construct:

### A. Basic Tests

- Verify that the entity is successfully created.

- Confirm that default properties are correctly initialized.

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

### B. Property Tests (Inputs - for Components/Directives)

- Verify that CSS classes are correctly applied based on inputs.

- Test behavior in different input states (e.g., `disabled`, `loading`).

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

### C. Event Tests (Outputs - for Components/Directives)

- Verify that events are correctly emitted when appropriate actions are performed (e.g., click).

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

### D. Accessibility Tests (for Components/Directives)

- Ensure that ARIA attributes and other accessibility properties are correctly defined.

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

## 3. Testing Inputs and Outputs (for Components/Directives)

### A. Testing Inputs

- Always use `fixture.componentRef.setInput()` to assign values to input properties.

- Verify that properties are correctly reflected in the component and the DOM.

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

### B. Testing Outputs

- Use `spyOn(output, 'emit')` to verify that the event was emitted.

- Alternatively, you can subscribe to the output to capture the emitted value.

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

## 4. Testing Forms (for Components)

### A. Template-Driven Forms

- Simulate user interaction with the form element to verify model updates.

  ```typescript
  it('should update model on input', () => {
    const inputElement = fixture.debugElement.query(By.css('input'));
    inputElement.nativeElement.value = 'test@example.com';
    inputElement.nativeElement.dispatchEvent(new Event('input'));

    expect(component.email).toBe('test@example.com');
  });
  ```

### B. Reactive Forms

- Access form controls and set values to test form validation and states.

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

## 5. Testing Asynchronous Operations (for Components/Services/Resolvers/Guards)

- Use `fakeAsync` and `tick()` to control time and simulate asynchronous operations deterministically.

- Mock services that make asynchronous calls to control responses.

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
    req.flush(mockUsers); // Respond to the request
  });
  ```

---

## 6. Testing Conditional Behavior (for Components/Directives)

- Verify that elements are displayed or hidden based on component conditions.

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

## 7. Testing State Changes (for Components/Services)

- Verify that the UI is correctly updated when the component's state changes.

- Verify that the state in a service (via Observable or Signal) is correctly updated.

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
      // First emission (null)
      // Second emission after loadCurrentUser()
      if (user) {
        expect(user).toEqual(mockUser);
        done();
      }
    });

    // If loadCurrentUser is called in the constructor
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

## 8. Testing Host Bindings (for Components/Directives)

- Verify that classes or attributes are applied to the component's host element.

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

## 9. Testing ViewChild References (for Components)

- Verify that the component correctly accesses and interacts with child elements referenced by `ViewChild`.

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

## 10. Testing Content Projection (for Components)

- Create a host component to test if content is correctly projected into the defined slots.

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

## 11. Testing Advanced Accessibility (for Components/Directives)

- Verify contrast requirements (WCAG).

- Test keyboard navigability and focus.

- Confirm the presence and correct values of all necessary ARIA attributes.

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

## 12. Testing Custom Pipes

- Create an instance of the pipe and test its `transform` method with different inputs.

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

## 13. Testing Custom Directives

- Create a test component that uses the directive and verify that the directive applies the expected changes to the DOM.

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

## 14. Testing Injected Services (in Components/Directives/Guards/Resolvers)

- Create mocks (using `jasmine.createSpyObj`) for injected services and provide them via `TestBed.configureTestingModule` to control their behavior.

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

## 15. Testing Error Handling (in Components/Services/Interceptors)

- Simulate error scenarios (e.g., API failure) and verify that the component/service/interceptor reacts and displays appropriate error messages.

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
    expect(req.request.method).toEqual('GET');
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
          'Session expired. Please log in again.'
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
