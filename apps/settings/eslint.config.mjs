// Importa a configuração ESLint compartilhada para Angular
import { angularConfig } from "@bytebank-pro/eslint-config/angular";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...angularConfig,
  {
    files: ["**/*.ts"],
    rules: {
      // Você pode adicionar ou sobrescrever regras específicas para este projeto
    },
  },
];

export default eslintConfig;
