/* eslint-env node */
import angular from '@bytebank-pro/eslint-config/angular';

export default [
  ...angular,
  {
    files: ['**/*.ts'],
    rules: {
      // Você pode adicionar ou sobrescrever regras específicas para este projeto
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ]
    }
  }
];
