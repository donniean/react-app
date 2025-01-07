// @ts-check

import globals from 'globals';
import eslint from '@eslint/js';
import typescriptEslint from 'typescript-eslint';
// import eslintPluginEslintComments from '@eslint-community/eslint-plugin-eslint-comments';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import * as eslintPluginImport from 'eslint-plugin-import';

export default typescriptEslint.config(
  {
    ignores: ['.history/', 'coverage/', 'dist/', '.next/'],
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
    languageOptions: {
      globals: {
        ...globals.es2025,
      },
    },
    rules: {
      'no-unused-vars': 'error',
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
    ...typescriptEslint.configs.recommended,
    ...typescriptEslint.configs.recommendedTypeChecked,
    ...typescriptEslint.configs.stylisticTypeChecked,
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
