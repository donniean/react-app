// @ts-check

import { fileURLToPath } from 'node:url';

import { includeIgnoreFile } from '@eslint/compat';
import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintPluginQuery from '@tanstack/eslint-plugin-query';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import * as eslintPluginImportX from 'eslint-plugin-import-x';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginN from 'eslint-plugin-n';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginReactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
// eslint-disable-next-line import-x/no-unresolved
import typescriptEslint from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));

const nodeGlobs = [
  '**/*.stories.{js,jsx,ts,tsx}',
  '**/*.story.{js,jsx,ts,tsx}',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/commitlint.config.{js,mjs,cjs,ts}',
  '**/cspell.config.{js,mjs,cjs,ts}',
  '**/eslint.config.{js,mjs,cjs,ts}',
  '**/jest.config.{js,mjs,cjs,ts}',
  '**/lint-staged.config.{js,mjs,cjs,ts}',
  '**/prettier.config.{js,mjs,cjs,ts}',
  '**/rollup.config.{js,mjs,cjs,ts}',
  '**/stylelint.config.{js,mjs,cjs,ts}',
  '**/tsup.config.{js,mjs,cjs,ts}',
  '**/vite.config.{js,mjs,cjs,ts}',
  '**/vitest.config.{js,mjs,cjs,ts}',
  'scripts/**/*.{js,cjs,mjs,ts}',
];

export default typescriptEslint.config([
  {
    ...includeIgnoreFile(gitignorePath),
    name: 'custom/gitignore',
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
    name: 'custom/node/globals',
    files: ['**/*.cjs', ...nodeGlobs],
    languageOptions: {
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
      'import-x/no-cycle': 'error',
      'import-x/no-duplicates': [
        'error',
        {
          considerQueryString: true,
        },
      ],
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: nodeGlobs,
          optionalDependencies: false,
          peerDependencies: true,
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
    name: 'unused-imports',
    plugins: {
      'unused-imports': eslintPluginUnusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
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
    name: 'custom/node',
    files: ['server/**'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    extends: [eslintPluginN.configs['flat/recommended']],
    rules: {
      'n/no-missing-import': [
        'off',
        {
          ignoreTypeImport: true,
        },
      ],
    },
  },
  {
    files: ['**/*.test.ts'],
    ...eslintPluginVitest.configs.recommended,
  },
  eslintConfigPrettier,
]);
