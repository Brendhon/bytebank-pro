// No arquivo packages/eslint-config/angular.js
import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import { config as baseConfig } from "./base.js";

/**
 * Uma configuração ESLint para projetos Angular.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const angularConfig = [
  ...baseConfig,
  js.configs.recommended,
  eslintConfigPrettier,
  {
    // Regras específicas para Angular
  },
];