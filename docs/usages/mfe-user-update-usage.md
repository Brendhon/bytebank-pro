# MFE User Update Integration

Este documento explica como funciona a integração de atualização de dados do usuário entre Micro Frontends (MFEs) e o Shell usando CustomEvents.

## Arquitetura

```
Settings MFE → CustomEvent → Shell → AuthService → localStorage
```

## Componentes

### 1. MfeUserUpdateService (Settings MFE)

Localizado em: `apps/settings/src/app/core/services/mfe-user-update.service.ts`

Responsável por disparar CustomEvents para o Shell atualizar os dados do usuário no localStorage.

**Métodos disponíveis:**

- `notifyUserUpdated(user: IUser)` - Notifica atualização de dados do usuário
- `notifyUserDeleted()` - Notifica exclusão da conta do usuário

### 2. MfeUserUpdateListenerService (Shell)

Localizado em: `apps/shell/src/app/core/services/mfe-user-update-listener.service.ts`

Responsável por escutar CustomEvents dos MFEs e atualizar o AuthService.

### 3. AuthService (Shell)

Localizado em: `apps/shell/src/app/core/services/auth.service.ts`

Serviço principal que gerencia o estado do usuário e localStorage.

## Como Usar

### No Settings MFE

```typescript
import { MfeUserUpdateService } from '@/core/services/mfe-user-update.service';

export class SettingsComponent {
  private readonly userUpdateService = inject(MfeUserUpdateService);

  handleUserUpdate(updatedUser: IUser): void {
    // Após atualizar com sucesso na API
    this.userUpdateService.notifyUserUpdated(updatedUser);
  }

  handleUserDeletion(): void {
    // Após deletar com sucesso na API
    this.userUpdateService.notifyUserDeleted();
  }
}
```

### Evento CustomEvent

O MfeUserUpdateService dispara eventos com a seguinte estrutura:

```typescript
interface UserUpdateEventDetail {
  type: 'userUpdated' | 'userDeleted';
  user: IUser | null;
}
```

Evento disparado para atualização:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:user-update', {
    detail: {
      type: 'userUpdated',
      user: updatedUserData
    }
  })
);
```

Evento disparado para exclusão:

```typescript
window.dispatchEvent(
  new CustomEvent('bytebank:user-update', {
    detail: {
      type: 'userDeleted',
      user: null
    }
  })
);
```

## Integração Atual

### Settings MFE

O componente `SettingsPageComponent` já está integrado com o MfeUserUpdateService e notifica o Shell sobre:

- ✅ Atualização de dados do usuário (nome, email, senha)
- ✅ Exclusão da conta do usuário

### Shell

O `MfeUserUpdateListenerService` é inicializado automaticamente no componente principal do Shell (`App`) e escuta eventos do Settings MFE.

## Comportamento

### Atualização de Usuário

1. **Settings MFE** atualiza os dados via API
2. **Settings MFE** dispara evento `userUpdated` com novos dados
3. **Shell** recebe o evento e atualiza o localStorage
4. **Shell** preserva o token de autenticação
5. **Shell** atualiza apenas nome e email no StoredUser

### Exclusão de Usuário

1. **Settings MFE** deleta a conta via API
2. **Settings MFE** dispara evento `userDeleted`
3. **Shell** recebe o evento e executa logout
4. **Shell** limpa localStorage e redireciona para login

## Vantagens

1. **Sincronização**: Dados do usuário ficam sincronizados entre MFE e Shell
2. **Consistência**: localStorage sempre reflete os dados mais recentes
3. **Desacoplamento**: MFEs não precisam conhecer a implementação do AuthService
4. **Segurança**: Token de autenticação é preservado durante atualizações
5. **Manutenibilidade**: Mudanças no AuthService são aplicadas automaticamente

## Exemplo de Uso Completo

```typescript
// No Settings MFE
this.settingsService.updateUser(userData).subscribe({
  next: (updatedUser: IUser) => {
    this.currentUser.set(updatedUser);
    this.toastService.showSuccess('Dados atualizados com sucesso!');

    // Notificar Shell sobre a atualização
    this.userUpdateService.notifyUserUpdated(updatedUser);
  },
  error: (error) => {
    console.error('Erro:', error);
    this.toastService.showError('Falha ao atualizar dados.');
  }
});
```

O localStorage do Shell será atualizado automaticamente através do mecanismo de CustomEvents, mantendo a sincronização entre os dados.
