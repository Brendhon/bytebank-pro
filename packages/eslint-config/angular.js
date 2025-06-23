import { resolve } from 'node:path';
import { existsSync } from 'node:fs';
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';
import angularTemplateParser from '@angular-eslint/template-parser';

// Try to find the appropriate tsconfig file
const possibleTsConfigs = ['tsconfig.app.json', 'tsconfig.json'];
let project = null;

for (const config of possibleTsConfigs) {
  const configPath = resolve(process.cwd(), config);
  if (existsSync(configPath)) {
    project = configPath;
    break;
  }
}

/**
 * This is a custom ESLint configuration for use with
 * Angular applications using flat config format
 */

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      // Ignore node_modules and dist directories
      'node_modules/**',
      'dist/**',
      // Ignore karma config as it's a Node.js file
      'karma.conf.js'
    ]
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project,
        sourceType: 'module',
        ecmaVersion: 'latest'
      },
      globals: {
        console: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript,
      '@angular-eslint': angular
    },
    rules: {
      ...js.configs.recommended.rules,
      ...typescript.configs.recommended.rules,
      ...angular.configs.recommended.rules,
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ]
    }
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: angularTemplateParser
    },
    plugins: {
      '@angular-eslint/template': angularTemplate
    },
    rules: {
      ...angularTemplate.configs.recommended.rules,
      ...angularTemplate.configs.accessibility.rules
    }
  }
];