// Importa a configuração ESLint compartilhada para Next.js
import { nextJsConfig } from "@bytebank-pro/eslint-config/next-js";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextJsConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      // Você pode adicionar ou sobrescrever regras específicas para este projeto
    },
  },
];

export default eslintConfig;
