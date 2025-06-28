# 🎨 Shared Assets - ByteBank Pro

Biblioteca de assets compartilhados (logos, ícones, imagens e ilustrações) para os microfrontends do ByteBank Pro. Este guia abrange a estrutura, uso, configuração no Angular e boas práticas.

## 📁 Estrutura e Organização

Os assets são agrupados por categoria em subpastas dentro de `packages/shared-assets/assets/`. O arquivo `src/index.ts` mantém os paths e constantes para acesso programático.

```
packages/shared-assets/
├── assets/                 # Assets físicos
│   ├── logos/             # Logos da marca ByteBank
│   ├── icons/             # Ícones customizados e de ferramentas
│   ├── images/            # Imagens funcionais (PNG/JPG)
│   └── illustrations/     # Ilustrações para telas e estados
├── src/
│   └── index.ts           # Paths e constantes dos assets
├── dist/                  # Build gerado
├── package.json
├── tsconfig.json
└── README.md
```

## 📋 Assets Disponíveis

Os assets são categorizados para fácil acesso:

| Categoria       | Constante correspondente | Exemplos                               | Descrição                               |
| :-------------- | :----------------------- | :------------------------------------- | :-------------------------------------- |
| **Logos**       | `LOGOS`                  | `MAIN`, `ICON`                         | Logos principais da marca ByteBank.     |
| **Ícones**      | `ICONS`                  | `MAIN_ICON`, `GITHUB`, `STORYBOOK`     | Ícones customizados e de ferramentas.   |
| **Imagens**     | `IMAGES`                 | `BOX`, `DEVICES`, `STAR`, `WITHDRAWAL` | Imagens funcionais (PNG/JPG).           |
| **Ilustrações** | `ILLUSTRATIONS`          | `ERROR_404`, `HOME`, `LOGIN`           | Ilustrações para telas e estados de UI. |

## 🚀 Uso Básico

### 1\. Instalação

Este pacote é automaticamente linkado no monorepo. Para usar em um aplicativo/pacote, adicione ao `dependencies` do `package.json`:

```json
{
  "dependencies": {
    "@bytebank-pro/shared-assets": "*"
  }
}
```

### 2\. Importação e Uso Rápido

Importe as categorias de assets e use os paths diretos:

```typescript
import { LOGOS, ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

// Usar paths diretos
const logoPath = LOGOS.MAIN; // '/assets/logos/logo.svg'
const homeIllustration = ILLUSTRATIONS.HOME; // '/assets/illustrations/home.svg'
```

## 🧩 Integração Angular

### Configuração no `angular.json`

Para que o Angular reconheça os assets, configure o `angular.json` do seu aplicativo:

- **Desenvolvimento:**
  ```json
  {
    "assets": [
      { "glob": "**/*", "input": "./public", "output": "." },
      { "glob": "**/*", "input": "../../packages/shared-assets/assets", "output": "/assets/" }
    ]
  }
  ```
- **Produção:**
  ```json
  {
    "configurations": {
      "production": {
        "assets": [
          { "glob": "**/*", "input": "./public", "output": "." },
          {
            "glob": "**/*",
            "input": "./node_modules/@bytebank-pro/shared-assets/dist/assets",
            "output": "/assets/"
          }
        ]
      }
    }
  }
  ```

### Exemplo em Componentes Angular

```typescript
import { Component } from '@angular/core';
import { LOGOS, ILLUSTRATIONS } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header>
      <img [src]="logo" alt="ByteBank" />
    </header>
    <main>
      <img [src]="homeIllustration" alt="Bem-vindo" />
    </main>
  `
})
export class AppComponent {
  logo = LOGOS.MAIN;
  homeIllustration = ILLUSTRATIONS.HOME;
}
```

## ⚙️ Gerenciamento Dinâmico (Função `getAssetContent`)

A função `getAssetContent` é uma ferramenta poderosa para lidar com diferentes tipos de assets, especialmente SVGs que podem precisar ter seu conteúdo embutido para permitir a manipulação de estilos como `currentColor`.

### `getAssetContent(assetPath: string): Promise<AssetContent>`

Esta função assíncrona determina o tipo de asset e fornece o conteúdo apropriado para renderização.

- Se o `assetPath` se refere a um arquivo SVG:
  - A função tenta buscar o conteúdo do SVG usando `fetch`.
  - Se a busca for bem-sucedida, retorna um objeto com `type: 'svg'` e o conteúdo do SVG como `content`.
  - Se a busca falhar (por exemplo, erro de rede, arquivo não encontrado), a função faz um fallback e retorna o caminho do asset para carregamento tradicional de imagem.
- Para outros tipos de arquivos (não-SVG), a função retorna um objeto com `type: 'image'` e o `assetPath` como `content`.

**Exemplo de Uso:**

```typescript
import { Component, OnInit } from '@angular/core';
import { ILLUSTRATIONS, getAssetContent, AssetContent } from '@bytebank-pro/shared-assets';

@Component({
  selector: 'app-login',
  standalone: true,
  template: `
    <div *ngIf="loginIllustrationContent">
      <div
        *ngIf="loginIllustrationContent.type === 'svg'; else imgTemplate"
        [innerHTML]="loginIllustrationContent.content"
      ></div>
      <ng-template #imgTemplate>
        <img [src]="loginIllustrationContent.content" alt="Login" />
      </ng-template>
    </div>
  `
})
export class LoginComponent implements OnInit {
  loginIllustrationContent: AssetContent | undefined;

  async ngOnInit() {
    this.loginIllustrationContent = await getAssetContent(ILLUSTRATIONS.LOGIN);
  }
}
```

## 🚀 Build e Deploy

- **Desenvolvimento:** `npm run dev` (assets servidos localmente)
- **Produção:** `npm run build` (assets copiados para `dist/assets`)

## 📝 Boas Práticas

- Use ilustrações da mesma categoria para consistência visual.
- Prefira **SVG** para logos e ilustrações; **PNG/WebP** para imagens complexas.
- Sempre inclua `alt` descritivo nas tags `<img>` para acessibilidade.
- Use classes responsivas (ex: Tailwind CSS) para controle de tamanho.
- Mantenha o arquivo `index.ts` atualizado com novos assets.
- Mantenha o tamanho das imagens abaixo de 500KB, se possível.

## 🔄 Adicionando Novos Assets

1.  Adicione o arquivo físico na subpasta apropriada (ex: `packages/shared-assets/assets/illustrations/`).

2.  Atualize o arquivo `packages/shared-assets/src/index.ts` adicionando a nova constante:

    ```typescript
    export const ILLUSTRATIONS = {
      // ...ilustrações existentes...
      NOVA_ILUSTRACAO: '/assets/illustrations/nova-ilustracao.svg'
    } as const;
    ```

3.  Reconstrua o pacote `shared-assets` executando `npm run build` dentro da pasta `packages/shared-assets`.

4.  Agora você pode importar e usar o novo asset em seus microfrontends.

## 🎯 Troubleshooting

- **Assets não aparecem:**
  - Verifique a configuração do `angular.json`.
  - Confirme se o `npm run build` do `shared-assets` foi executado.
  - Inspecione os caminhos dos assets no console do navegador.
- **Problemas de Tipagem (TypeScript):**
  - Execute `npm run build` no `shared-assets` para gerar os tipos.
  - Reinicie o servidor TypeScript no seu editor (ex: VS Code).
- **Performance:**
  - Considere lazy loading para imagens grandes.
  - Monitore o tamanho do bundle final do seu aplicativo.

---

> 💡 **Dica**: Para uma configuração completa e exemplos detalhados, sempre consulte este `README.md`\!

## 🔗 Links Úteis

- **🎨 Design Tokens**: Cores e tipografia (`../shared-design-tokens/README.md`)
- **🧩 UI Components**: Componentes reutilizáveis (`../ui/README.md`)
