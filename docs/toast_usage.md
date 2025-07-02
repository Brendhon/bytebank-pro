# Como utilizar o ToastService no ByteBank Pro

O `ToastService` permite exibir notificações temporárias em toda a aplicação Shell de forma simples e padronizada.

## Importante: Disponibilidade do Serviço

> **Nota**: O `ToastService` está disponível **apenas** no projeto **Shell**. Os Micro Frontends (MFEs) devem utilizar a abordagem de CustomEvents descrita abaixo para exibir toasts.

## Para o Shell: Uso Direto do Serviço

### Importação

```typescript
import { ToastService } from '../../core/services/toast.service';
```

### Uso Básico

Injete o serviço no seu componente usando a API moderna do Angular:

```typescript
private toast = inject(ToastService);
```

### Exemplos de Uso

#### Exibir mensagem de sucesso:

```typescript
// Exibe um toast de sucesso que desaparece após 3 segundos
this.toast.showSuccess('Operação realizada com sucesso!');

// Especificar duração personalizada (em milissegundos)
this.toast.showSuccess('Operação concluída!', 5000);
```

#### Exibir mensagem de erro:

```typescript
// Exibe um toast de erro que desaparece após 5 segundos (padrão)
this.toast.showError('Falha ao processar a operação.');
```

#### Exibir mensagem informativa:

```typescript
// Exibe um toast informativo que desaparece após 4 segundos (padrão)
this.toast.showInfo('Sua sessão expira em 5 minutos.');
```

#### Fechar manualmente:

```typescript
// O método retorna uma função para fechar o toast manualmente
const closeToast = this.toastService.showInfo('Processando...');

// Feche o toast quando necessário
someOperation.pipe(finalize(() => closeToast())).subscribe();
```

## Para Micro Frontends: Uso via CustomEvents

Os MFEs devem criar um serviço próprio para utilizar CustomEvents para disparar toasts que serão exibidos pelo Shell:

### Estrutura do evento

```typescript
interface ToastEventDetail {
  type: 'success' | 'error' | 'info';
  message: string;
  duration?: number; // em milissegundos, opcional
}
```

### Exemplos de Uso para MFEs

#### Exibir mensagem de sucesso:

```typescript
// Evento para toast de sucesso (duração padrão: 3 segundos)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operação realizada com sucesso!'
    }
  })
);

// Com duração personalizada
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'success',
      message: 'Operação concluída!',
      duration: 5000 // 5 segundos
    }
  })
);
```

#### Exibir mensagem de erro:

```typescript
// Evento para toast de erro (duração padrão: 5 segundos)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'error',
      message: 'Falha ao processar a operação.'
    }
  })
);
```

#### Exibir mensagem informativa:

```typescript
// Evento para toast informativo (duração padrão: 4 segundos)
window.dispatchEvent(
  new CustomEvent('bytebank:toast', {
    detail: {
      type: 'info',
      message: 'Sua sessão expira em 5 minutos.'
    }
  })
);
```

## Características

- Cada toast é posicionado no topo direito da tela
- Animações suaves de entrada e saída
- As cores seguem os design tokens do ByteBank Pro
- Suporte para diferentes tipos: sucesso, erro e informação
- Fechamento manual ou automático baseado em tempo

## Exemplo de ToastService para MFEs

```typescript
@Injectable({ providedIn: 'root' })
export class MfeToastService {
  showSuccess(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'success',
          message,
          duration
        }
      })
    );
  }

  showError(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'error',
          message,
          duration
        }
      })
    );
  }

  showInfo(message: string, duration?: number): void {
    window.dispatchEvent(
      new CustomEvent('bytebank:toast', {
        detail: {
          type: 'info',
          message,
          duration
        }
      })
    );
  }
}
```
