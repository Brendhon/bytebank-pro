import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="bg-white border-t">
      <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p class="text-sm text-gray-500 text-center">
          © 2025 Bytebank Pro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}
