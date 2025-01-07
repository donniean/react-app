// @ts-check

import eslint from '@eslint/js';
import eslintPluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';

export default typescriptEslint.config(
  {
    ignores: ['.history/', 'coverage/', 'dist/', '.next/'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser: typescriptEslint.parser,
      /* parserOptions: {
        ecmaVersion: 'latest',
      }, */
      globals: {
        ...globals.es2025,
      },
    },
    rules: {
      'no-unused-vars': 'error',
    },
  },
  eslint.configs.recommended,
  eslintPluginImport.flatConfigs?.recommended,
  // eslintPluginEslintComments.configs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  {
    languageOptions: {
      globals: globals.builtin,
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
  },
  eslintPluginSonarjs.configs.recommended,
  eslintConfigPrettier,
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.{mjs,ts,tsx}'],
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
    },
    rules: {
      'sort-imports': 'off',
      'import/order': 'off',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.recommended,
      typescriptEslint.configs.recommendedTypeChecked,
      typescriptEslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      /* 'import/resolver-next': [
        createTypeScriptImportResolver({
          alwaysTryTypes: true,
        }),
      ], */
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    files: ['src/'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.devtools,
      },
    },
  },
);
