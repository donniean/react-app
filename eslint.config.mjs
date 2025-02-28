import eslint from '@eslint/js';
import eslintPluginEslintCommentsConfigs from '@eslint-community/eslint-plugin-eslint-comments/configs';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSonarjs from 'eslint-plugin-sonarjs';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
// eslint-disable-next-line import/no-unresolved
import typescriptEslint from 'typescript-eslint';

// eslint-plugin-react
// eslint-plugin-react-hooks
// eslint-plugin-jsx-a11y
// vitest

export default typescriptEslint.config([
  {
    ignores: ['.history/', '**/coverage/', '**/dist/', '**/.next/'],
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      parser: typescriptEslint.parser,
      globals: {
        ...globals.es2025,
      },
    },
    rules: {
      'no-unused-vars': 'error',
    },
  },
  eslint.configs.recommended,
  eslintPluginEslintCommentsConfigs.recommended,
  eslintPluginImport.flatConfigs.recommended,
  eslintPluginPromise.configs['flat/recommended'],
  eslintPluginUnicorn.configs.recommended,
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
      eslintPluginImport.flatConfigs.typescript,
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
        node: true,
      },
      // 'import/extensions': ['.js', '.mjs', '.jsx', '.ts', '.tsx', '.d.ts'],
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
]);
