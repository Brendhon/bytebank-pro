# 🧪 Padrões de Teste para Componentes Angular

> **Importante:**
>
> - Todos os comentários nos arquivos de teste devem ser em inglês.
> - **Adicione uma linha em branco antes de cada `expect` em qualquer teste** para melhorar a legibilidade e seguir o padrão do projeto.
> - **Sempre use `fixture.componentRef.setInput()` para definir propriedades de input nos testes** (abordagem recomendada pelo Angular Team).

## 1. Estrutura de Testes

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
    element = fixture.debugElement.query(By.css('[data-testid="component"]')).nativeElement;
  });

  // Required tests...
});
```

## 2. Categorias de Testes Obrigatórios

### A. Testes Básicos

```typescript
describe('Basic Functionality', () => {
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default properties', () => {
    expect(component.variant).toBe('primary');

    expect(component.disabled).toBeFalsy();
  });
});
```

### B. Testes de Propriedades

```typescript
describe('Input Properties', () => {
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

### C. Testes de Eventos

```typescript
describe('Events', () => {
  it('should emit componentClick when clicked', () => {
    spyOn(component.componentClick, 'emit');
    element.click();
    fixture.detectChanges();

    expect(component.componentClick.emit).toHaveBeenCalled();
  });
});
```

### D. Testes de Acessibilidade

```typescript
describe('Accessibility', () => {
  it('should have proper aria attributes', () => {
    fixture.componentRef.setInput('ariaLabel', 'Test label');
    fixture.detectChanges();

    expect(element.getAttribute('aria-label')).toBe('Test label');
  });
});
```

## 3. Testando Inputs e Outputs

### A. Testando Inputs

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

## 4. Testando Forms

### A. Template-Driven Forms

```typescript
it('should update model on input', () => {
  const inputElement = fixture.debugElement.query(By.css('input'));
  inputElement.nativeElement.value = 'test@example.com';
  inputElement.nativeElement.dispatchEvent(new Event('input'));

  expect(component.email).toBe('test@example.com');
});
```

### B. Reactive Forms

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

## 5. Testando Operações Assíncronas

```typescript
it('should load data asynchronously', fakeAsync(() => {
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
```

## 6. Testando Comportamento Condicional

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

## 7. Testando Mudanças de Estado

```typescript
it('should update UI when state changes', () => {
  fixture.componentRef.setInput('isOpen', false);
  fixture.detectChanges();

  expect(element.classList).not.toContain('open');

  fixture.componentRef.setInput('isOpen', true);
  fixture.detectChanges();

  expect(element.classList).toContain('open');
});
```

## 8. Testando Host Bindings

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

## 9. Testando Referências ViewChild

```typescript
it('should access child element with ViewChild', () => {
  fixture.componentRef.setInput('autoFocus', true);
  fixture.detectChanges();

  // The component should autofocus the input element
  const input = component.inputElement.nativeElement;

  expect(document.activeElement).toBe(input);
});
```

## 10. Testando Content Projection

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
    imports: [CardComponent],
    declarations: [TestHostComponent]
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

## 11. Testando Acessibilidade Avançada

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

## 12. Testando Pipes Personalizados

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

## 13. Testando Diretivas Personalizadas

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
      imports: [HighlightDirective],
      declarations: [TestComponent]
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

## 14. Testando Serviços Injetados

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

## 15. Testando Tratamento de Erros

```typescript
it('should handle API errors gracefully', fakeAsync(() => {
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
```

## 16. Testando Componentes Standalone com Dependências

```typescript
describe('StandaloneComponent', () => {
  let component: StandaloneComponent;
  let fixture: ComponentFixture<StandaloneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StandaloneComponent,
        provideHttpClient(), // Provide necessary dependencies
        provideRouter([]) // If needed
      ],
      providers: [
        provideMockStore({
          initialState: {
            /* ... */
          }
        }) // If using NgRx
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(StandaloneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Tests...
});
```

## 🏅 Melhores Práticas

1. **Use data-testid para seletores**: Prefira `data-testid="nome"` em elementos que você precisa selecionar nos testes, tornando-os mais resistentes a mudanças de classe ou estrutura.
2. **Sempre detecte mudanças**: Use `fixture.detectChanges()` após qualquer operação que deva resultar em atualização da UI.
3. **Nunca atribua diretamente às propriedades de input**: Use sempre `fixture.componentRef.setInput()`.
4. **Use fakeAsync para operações assíncronas**: Isso torna os testes mais determinísticos e evita timeouts.
5. **Mock serviços complexos**: Use `jasmine.createSpyObj` ou `TestBed.inject` para configurar mocks.
6. **Encadeie expectativas com contexto**: Adicione descrição ao teste e agrupe expectativas relacionadas.
7. **Uma linha em branco antes de cada assert**: Melhora a legibilidade e é um padrão do projeto.
8. **Teste comportamento, não implementação**: Foque no que o componente deve fazer, não como ele faz.
9. **Use beforeEach para configuração**: Para manter o código DRY e garantir um estado inicial limpo.
10. **Teste estados limite e casos de erro**: Não teste apenas o caminho "feliz", mas também erros e casos limite.

## 📚 Recursos

- [Angular Testing Guide](https://angular.dev/guide/testing)
- [Testing Angular Components](https://angular.dev/guide/testing/components-basics)
- [Testing Component Harnesses](https://material.angular.io/guide/using-component-harnesses)
- [Mocking Services](https://angular.dev/guide/testing/services)
- [Angular Components Testing Scenarios](https://angular.dev/guide/testing/components-scenarios)
