import angular from '@bytebank-pro/eslint-config/angular';

export default [
  ...angular,
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'bb',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'bb',
          style: 'camelCase'
        }
      ]
    }
  }
];
