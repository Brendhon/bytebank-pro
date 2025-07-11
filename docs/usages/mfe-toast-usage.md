# MFE Toast Integration

Este documento explica como funciona a integração de toast entre Micro Frontends (MFEs) e o Shell usando CustomEvents.

## Arquitetura

```
MFE (Transactions) → CustomEvent → Shell → ToastService → ToastComponent
```

## Componentes

### 1. MfeToastService (MFE)

Localizado em: `apps/transactions/src/app/core/services/mfe-toast.service.ts`

Responsável por disparar CustomEvents para o Shell exibir toasts.

**Métodos disponíveis:**

- `showSuccess(message: string, duration?: number)`
- `showError(message: string, duration?: number)`
- `showInfo(message: string, duration?: number)`

### 2. MfeToastListenerService (Shell)

Localizado em: `apps/shell/src/app/core/services/mfe-toast-listener.service.ts`

Responsável por escutar CustomEvents dos MFEs e chamar o ToastService.

### 3. ToastService (Shell)

Localizado em: `apps/shell/src/app/core/services/toast.service.ts`

Serviço principal que exibe os toasts usando o ToastComponent.

## Como Usar

### No MFE (Transactions)

```typescript
import { MfeToastService } from '@/core/services/mfe-toast.service';

export class MyComponent {
  private readonly toastService = inject(MfeToastService);

  handleSuccess(): void {
    this.toastService.showSuccess('Operation completed successfully!');
  }

  handleError(): void {
    this.toastService.showError('Something went wrong!');
  }

  handleInfo(): void {
    this.toastService.showInfo('Processing your request...');
  }
}
```

### Evento CustomEvent

O MfeToastService dispara eventos com a seguinte estrutura:

```typescript
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // in milliseconds, optional
}
```

Evento disparado:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operation completed!',
      duration: 3000
    }
  })
);
```

## Integração Atual

### Transactions MFE

O componente `TransactionsPageComponent` já está integrado com o MfeToastService e exibe toasts para:

- ✅ Criação de transação bem-sucedida
- ✅ Atualização de transação bem-sucedida
- ✅ Exclusão de transação bem-sucedida
- ❌ Erro ao criar transação
- ❌ Erro ao atualizar transação
- ❌ Erro ao excluir transação
- ❌ Erro ao carregar transações

### Shell

O `MfeToastListenerService` é inicializado automaticamente no componente principal do Shell (`App`) e escuta eventos de todos os MFEs.

## Vantagens

1. **Reutilização**: O ToastComponent é reutilizado em todos os MFEs
2. **Consistência**: Todos os toasts seguem o mesmo padrão visual
3. **Desacoplamento**: MFEs não precisam conhecer a implementação do toast
4. **Manutenibilidade**: Mudanças no toast são aplicadas automaticamente em todos os MFEs

## Exemplo de Uso Completo

```typescript
// No MFE
this.transactionsService.createTransaction(data).subscribe({
  next: () => {
    this.toastService.showSuccess('Transaction created successfully!');
    this.loadTransactions();
  },
  error: (error) => {
    console.error('Error:', error);
    this.toastService.showError('Failed to create transaction. Please try again.');
  }
});
```

O toast será exibido no Shell automaticamente através do mecanismo de CustomEvents.
