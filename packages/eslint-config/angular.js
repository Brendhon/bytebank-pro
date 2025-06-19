import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";
import { config as baseConfig } from "./base.js";

/**
 * Uma configuração ESLint para projetos Angular.
 *
 * @type {import("eslint").Linter.Config[]}
 * */
export const angularConfig = [
  ...baseConfig,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    files: ["*.ts"],
    rules: {
      // Regras específicas para Angular
      "@typescript-eslint/explicit-function-return-type": ["warn", {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }],
      "@typescript-eslint/explicit-member-accessibility": ["warn", {
        "accessibility": "explicit",
        "overrides": {
          "accessors": "explicit",
          "constructors": "no-public",
          "methods": "explicit",
          "properties": "explicit",
          "parameterProperties": "explicit"
        }
      }],
      "@typescript-eslint/member-ordering": "warn",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          "selector": "default",
          "format": ["camelCase"]
        },
        {
          "selector": "variable",
          "format": ["camelCase", "UPPER_CASE"]
        },
        {
          "selector": "parameter",
          "format": ["camelCase"],
          "leadingUnderscore": "allow"
        },
        {
          "selector": "memberLike",
          "modifiers": ["private"],
          "format": ["camelCase"],
          "leadingUnderscore": "require"
        },
        {
          "selector": "typeLike",
          "format": ["PascalCase"]
        },
        {
          "selector": "enum",
          "format": ["PascalCase"]
        },
        {
          "selector": "interface",
          "format": ["PascalCase"],
          "prefix": ["I"]
        }
      ]
    }
  }
];