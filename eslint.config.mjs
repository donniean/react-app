// @ts-check

import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintConfigPrettier from 'eslint-config-prettier';
import * as eslintPluginImport from 'eslint-plugin-import';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
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

// vitest
// eslint-plugin-import-x
// https://github.com/Kenneth-Sills/eslint-config-airbnb-typescript

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
  eslintPluginImport.flatConfigs?.recommended,
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
      typescriptEslint.configs.strictTypeChecked,
      typescriptEslint.configs.stylisticTypeChecked,
      eslintPluginImport.flatConfigs?.typescript,
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    name: 'custom/react',
    files: ['src/**'],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginReact.configs.flat['jsx-runtime'],
      eslintPluginReactHooks.configs.recommended,
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
    name: 'prettier',
    ...eslintConfigPrettier,
  },
]);
