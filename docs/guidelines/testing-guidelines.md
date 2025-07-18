# 🧪 Angular Testing Patterns (Jasmine and Karma)

This guide defines the patterns and best practices for writing unit tests for Angular components, services, guards, resolvers, pipes, and directives, using Jasmine and Karma.

**Important Notes:**

- Tests and comments within the code must be written in English.
- Focus on basic and essential unit tests for each type of Angular construct, avoiding integration or e2e tests in this guide.
- Use Jasmine and Karma for test execution.
- To run all tests in a project, use the command `npm run test` from the root of that specific project.
- To run the test for a specific file (for example, `input.component.spec.ts`), use the following command:

  ```bash
  npm run test -- --include="**/input.component.spec.ts"
  ```

  > **Important:** This command must be executed in the root directory of the project where the component is located. For example, if the `input` component is inside `packages/ui`, you must run the command in the `packages/ui` directory. The command will only work if executed in the correct project root.

- **Use `data-testid` for test selectors** to ensure robustness against DOM changes.
- **Add a blank line before each `expect`** to improve readability.
- **Always use `fixture.componentRef.setInput()` to set inputs in component tests**.

---

## 1. General Test Structure and Setup

All tests should follow a consistent structure for setup and teardown.

```typescript
describe('ComponentName', () => {
  let component: ComponentType; // e.g., ComponentComponent, MyServiceService, CustomPipe
  let fixture: ComponentFixture<ComponentType>; // Only for components/directives
  let element: HTMLElement; // Only for components/directives
  let serviceSpy: jasmine.SpyObj<any>; // For services, guards, resolvers, interceptors

  beforeEach(async () => {
    // Configure TestBed based on the type of entity being tested
    await TestBed.configureTestingModule({
      imports: [ComponentType, HttpClientTestingModule, RouterTestingModule], // Add necessary imports for standalone components/directives/pipes
      providers: [
        // Provide the actual service/guard/resolver or a mock
        ComponentType, // For services, pipes, guards, resolvers
        { provide: ServiceDependency, useValue: serviceSpy }, // Mock dependencies
        { provide: HTTP_INTERCEPTORS, useValue: InterceptorType, multi: true } // For interceptors
      ]
    }).compileComponents();

    // Initialize component, service, or directive
    if (isComponent) {
      // Pseudocode: check if testing a component
      fixture = TestBed.createComponent(ComponentType);
      component = fixture.componentInstance;
      fixture.detectChanges();
      element = fixture.debugElement.query(By.css('[data-testid="component-root"]'))?.nativeElement;
    } else if (isService) {
      // Pseudocode: check if testing a service
      service = TestBed.inject(ServiceType);
    }
    // ... similar for other types
  });

  afterEach(() => {
    // Clean up if necessary, e.g., httpTestingController.verify() for interceptors
  });

  // Tests go here...
});
```

---

## 2. Core Testing Principles

These principles apply across all types of Angular unit tests.

- **Basic Creation**: Verify the entity (component, service, etc.) is created successfully.
  ```typescript
  it('should create the component/service/pipe/directive', () => {
    expect(instance).toBeTruthy(); // Replace 'instance' with component, service, pipe, or fixture.debugElement.query(By.directive(DirectiveType))
  });
  ```
- **Input/Output Handling (Components/Directives)**:
  - Use `fixture.componentRef.setInput('propertyName', value)` for inputs.
  - Use `spyOn(output, 'emit')` or subscribe to outputs for verification.
- **DOM Interaction (Components/Directives)**: Simulate user events (`.click()`, `dispatchEvent(new Event('input'))`) and check DOM changes.
- **Asynchronous Operations**: Use `fakeAsync` and `tick()` for deterministic testing of Promises/Observables. Mock HTTP calls with `HttpClientTestingModule` and `HttpTestingController`.
- **Conditional Rendering**: Test `@if`, `@for`, `@switch` blocks by changing component state and verifying DOM presence/absence.
- **State Management**: Verify state updates in services (Observables, Signals) and their reflection in components.
- **Accessibility**: Test ARIA attributes, keyboard navigation, and visual contrast.
- **Error Handling**: Simulate errors (e.g., API failures) and verify appropriate responses (error messages, notifications).
- **Dependency Mocking**: Use `jasmine.createSpyObj` for services and provide them in `TestBed.configureTestingModule`.

---

## 3. Specific Test Examples

This section provides concise examples for common testing scenarios for each Angular construct.

### A. Component Testing

```typescript
// Basic input/output and DOM interaction
it('should display label and emit click', () => {
  fixture.componentRef.setInput('label', 'Click Me');
  spyOn(component.buttonClick, 'emit');
  fixture.detectChanges();

  expect(element.textContent).toContain('Click Me');
  element.querySelector('button')?.click();
  expect(component.buttonClick.emit).toHaveBeenCalled();
});

// Reactive Forms validation
it('should validate email input', () => {
  const emailControl = component.myForm.get('email');
  emailControl?.setValue('invalid-email');
  expect(emailControl?.invalid).toBeTruthy();
  emailControl?.setValue('valid@example.com');
  expect(emailControl?.valid).toBeTruthy();
});
```

### B. Service Testing

```typescript
// Fetching data from API
it('should fetch users', (done) => {
  const mockUsers = [{ id: 1, name: 'Test User' }];
  serviceSpy.get.and.returnValue(of(mockUsers)); // Assuming serviceSpy is HttpClient mock

  service.getUsers().subscribe((users) => {
    expect(users).toEqual(mockUsers);
    done();
  });
  httpTestingController.expectOne('/api/users').flush(mockUsers);
});

// State management with Signals
it('should increment counter', () => {
  expect(service.count()).toBe(0);
  service.increment();
  expect(service.count()).toBe(1);
});
```

### C. Guard Testing

```typescript
// Authentication guard
it('should allow authenticated user', () => {
  authServiceSpy.isAuthenticated.and.returnValue(true);
  const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  expect(result).toBe(true);
});

it('should redirect unauthenticated user', () => {
  authServiceSpy.isAuthenticated.and.returnValue(false);
  routerSpy.createUrlTree.and.returnValue(new UrlTree());
  const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
  expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  expect(result).toBeInstanceOf(UrlTree);
});
```

### D. Resolver Testing

```typescript
// Data resolver
it('should resolve user data', (done) => {
  const mockUser = { id: '1', name: 'Resolved User' };
  userServiceSpy.getUser.and.returnValue(of(mockUser));
  const route = { paramMap: convertToParamMap({ id: '1' }) } as any;

  const result = TestBed.runInInjectionContext(() => userDataResolver(route, {} as any));
  result.subscribe((user) => {
    expect(user).toEqual(mockUser);
    done();
  });
});
```

### E. Pipe Testing

```typescript
// Custom pipe transformation
it('should format currency', () => {
  expect(pipe.transform(1234.56, 'USD')).toContain('$1,234.56');
});
```

### F. Directive Testing

```typescript
// Applying styles based on input
it('should apply background color', () => {
  fixture.componentInstance.color = 'red';
  fixture.detectChanges();
  expect(divElement.style.backgroundColor).toBe('red');
});
```

### G. Interceptor Testing

```typescript
// Adding auth token to request
it('should add auth token to request', () => {
  authServiceSpy.getAuthToken.and.returnValue('test-token');
  httpClient.get('/api/data').subscribe();

  const req = httpTestingController.expectOne('/api/data');
  expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
  req.flush({});
});
```

---

## 4. General Best Practices

1.  **Use `data-testid` for selectors**: Makes test selectors more resilient to DOM structure changes.
2.  **Always detect changes**: Call `fixture.detectChanges()` after any operation that changes component state and should update the UI.
3.  **Never assign directly to input properties**: Always use `fixture.componentRef.setInput()`.
4.  **Use `fakeAsync` for asynchronous operations**: Ensures deterministic asynchronous tests and avoids timeouts.
5.  **Mock complex services**: Use `jasmine.createSpyObj` or `TestBed.inject` to configure service mocks.
6.  **Chain expectations with context**: Group related expectations and add clear descriptions to tests.
7.  **Blank line before each `expect`**: Improves readability and is a project standard.
8.  **Test behavior, not implementation**: Focus on what the entity should do, rather than how it does it.
9.  **Use `beforeEach` for setup**: Keep code DRY (Don't Repeat Yourself) and ensure a clean initial state for each test.
10. **Test edge cases and error scenarios**: Don't just test the "happy path"; include error scenarios and boundary cases.

---

## Observations

- **Caution with `Intl.NumberFormat`**: The result may contain invisible characters that cause test failures. To avoid issues, use a regular expression as in the example below:

  ```typescript
  const result = formatCurrency(1000000);
  expect(result).toMatch(/^R\$\s1\.000\.000,00$/);
  ```

---

**Command to run tests for a specific file:**

To run tests for a specific spec file (e.g., `my-component.component.spec.ts`), use the command:

```bash
npm run test -- --include="**/my-component.component.spec.ts"
```

Remember to adapt the file path `**/my-component.component.spec.ts` to the actual location of your test file within the `packages/ui` folder or your project root, according to your structure.

---

This guide provides a solid foundation for writing effective and maintainable unit tests in your Angular project. For more advanced scenarios, consult the official Angular documentation.
