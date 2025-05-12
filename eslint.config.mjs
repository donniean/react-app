// @ts-check

import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
// eslint-disable-next-line import-x/no-unresolved
import typescriptEslint from 'typescript-eslint';

/**
 * References
 *
 * https://biomejs.dev/linter/rules-sources/
 * https://eslint-config.antfu.me/
 * https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/.eslintrc.cjs
 * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
 * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
 *
 */

// https://github.com/francoismassart/eslint-plugin-tailwindcss
// https://github.com/azat-io/eslint-plugin-perfectionist
// https://github.com/Kenneth-Sills/eslint-config-airbnb-typescript
// https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query

export default typescriptEslint.config([
  {
    name: 'custom/ignores',
    ignores: ['.history/', '**/coverage/', '**/dist/', '**/.next/'],
  },
  {
    name: 'custom/javascript',
    languageOptions: {
      parser: typescriptEslint.parser,
      globals: {
        ...globals.es2025,
      },
    },
    rules: {},
  },
  {
    name: 'custom/cjs',
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    ...eslint.configs.recommended,
    name: 'eslint/recommended',
  },
  eslintPluginEslintCommentsConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  eslintPluginSonarjs.configs.recommended,
  {
    name: 'custom/rules',
    rules: {
      'no-unused-vars': 'error',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            kebabCase: true,
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
      'unicorn/no-array-for-each': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
    },
  },
  {
    name: 'simple-import-sort',
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
    name: 'custom/typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.recommendedTypeChecked,
      typescriptEslint.configs.stylisticTypeChecked,
      eslintPluginImportX.flatConfigs.typescript,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import-x/resolver-next': [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
      ],
    },
  },
  {
    name: 'custom/react',
    files: ['src/**'],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
      eslintPluginReactHooks.configs['recommended-latest'],
      eslintPluginJsxA11y.flatConfigs.recommended,
      eslintPluginReactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.devtools,
      },
    },
  },
  {
    files: ['**/*.test.ts'],
    ...eslintPluginVitest.configs.recommended,
  },
  {
    name: 'prettier',
    ...eslintConfigPrettier,
  },
]);
