// @ts-check

import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginQuery from '@tanstack/eslint-plugin-query';
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
 * https://github.com/antfu/eslint-config
 * https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/.eslintrc.cjs
 * https://github.com/iamturns/eslint-config-airbnb-typescript/blob/master/lib/shared.js
 * https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/index.js
 *
 */

export default typescriptEslint.config([
  {
    name: 'custom/ignores',
    ignores: ['.history/', '**/coverage/', '**/dist/', '**/.next/'],
  },
  {
    name: 'custom/javascript/setup',
    languageOptions: {
      parser: typescriptEslint.parser,
      globals: {
        ...globals.es2025,
      },
    },
  },
  {
    name: 'custom/cjs/setup',
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    name: 'eslint/recommended',
    ...eslint.configs.recommended,
  },
  eslintPluginEslintCommentsConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
  eslintPluginSonarjs.configs.recommended,
  {
    name: 'custom/javascript/rules',
    rules: {
      'no-console':
        globalThis.process.env.NODE_ENV === 'development'
          ? 'warn'
          : ['error', { allow: ['warn', 'error'] }],
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: [
            'acc', // for reduce accumulators
            'accumulator', // for reduce accumulators
            'e', // for e.returnvalue
            'ctx', // for Koa routing
            'context', // for Koa routing
            'req', // for Express requests
            'request', // for Express requests
            'res', // for Express responses
            'response', // for Express responses
            '$scope', // for Angular 1 scopes
            'staticContext', // for ReactRouter context
            'draft', // for immer
          ],
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['../..'],
        },
      ],
      'no-useless-call': 'error',
    },
  },
  {
    name: 'custom/import-x/rules',
    rules: {
      'import-x/no-duplicates': [
        'error',
        {
          considerQueryString: true,
        },
      ],
      // 'import-x/no-named-as-default': 'off',
      // 'import-x/no-named-as-default-member': 'off',
      'import-x/order': [
        'warn',
        {
          groups: [
            // 'type',
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'unknown',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            orderImportKind: 'asc',
          },
          named: true,
          warnOnUnassignedImports: true,
          // sortTypesGroup: true,
          // 'newlines-between-types': 'always',
        },
      ],
    },
  },
  {
    name: 'custom/unicorn/rules',
    rules: {
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
      'import-x/order': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    name: 'custom/typescript',
    files: ['**/*.{ts,tsx}'],
    extends: [
      typescriptEslint.configs.strictTypeChecked,
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
    rules: {
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
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
      eslintPluginQuery.configs['flat/recommended'],
      /**
       * dependencies @next/eslint-plugin-next
       */
      /* https://nextjs.org/docs/app/building-your-application/configuring/eslint#migrating-existing-config */
      // 'plugin:@next/next/recommended',
      // 'plugin:@next/next/core-web-vitals',
    ],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.devtools,
      },
    },
    rules: {
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          multiline: 'last',
          reservedFirst: true,
        },
      ],
      'react/require-default-props': [
        'error',
        {
          forbidDefaultForRequired: true,
          functions: 'defaultArguments',
        },
      ],
      'react/sort-comp': 'warn',
      'react/sort-default-props': 'warn',
      'react/sort-prop-types': [
        'warn',
        {
          callbacksLast: true,
          requiredFirst: true,
          sortShapeProp: true,
          checkTypes: true,
        },
      ],
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
