import library from '@bytebank-pro/eslint-config/library';

/**
 * ESLint configuration for the package manager root.
 * This configuration only applies to the root level files.
 */

/** @type {import("eslint").Linter.Config[]} */
export default [
  // Apply library config to root level files
  ...library,
  // Ignore patterns for apps and packages - they have their own configs
  {
    ignores: ['apps/**', 'packages/**', 'node_modules/**', 'dist/**', '.turbo/**']
  }
];
